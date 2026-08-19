-- =========================================================
-- JobGist Database Schema
-- สำหรับรันใน Supabase SQL Editor
-- =========================================================
-- วิธีใช้: copy ทั้งไฟล์ไปวางใน Supabase > SQL Editor > Run
-- รันได้ครั้งเดียวจบ (ตารางจะถูกสร้างตามลำดับที่ถูกต้อง)
-- =========================================================


-- =========================================================
-- 1. USER_PROFILES
-- ส่วนขยายของ auth.users (Supabase สร้าง auth.users ให้อัตโนมัติ
-- อยู่แล้วสำหรับ email/password/login เราไม่สร้างตาราง users เอง
-- แต่สร้างตารางนี้มาเก็บข้อมูลเพิ่มเติมที่ auth.users ไม่มี เช่น role)
-- =========================================================
create table user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('worker', 'employer')),
  phone text,
  created_at timestamptz not null default now()
);

comment on table user_profiles is 'ข้อมูลเสริมของผู้ใช้ ผูกกับ auth.users ของ Supabase โดยตรง';
comment on column user_profiles.role is 'บอกว่าบัญชีนี้เป็น worker หรือ employer ใช้แยกสิทธิ์การเข้าถึง';


-- =========================================================
-- 2. WORKER_PROFILES
-- โปรไฟล์ของคนหางาน หัวใจของฝั่ง worker
-- =========================================================
create table worker_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references user_profiles(id) on delete cascade,
  full_name text not null,
  skills text,
  experience_raw text,
  ai_bio text,
  verified boolean not null default false,
  lat float8,
  lng float8,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table worker_profiles is 'โปรไฟล์คนหางาน แยกข้อมูลดิบจากฟอร์มกับผลลัพธ์ที่ AI generate ออกจากกัน';
comment on column worker_profiles.experience_raw is 'คำตอบดิบจากฟอร์ม step-by-step ก่อนผ่าน AI';
comment on column worker_profiles.ai_bio is 'โปรไฟล์ฉบับที่ AI สร้างให้ ยังไม่ publish จนกว่า worker จะกด verified';
comment on column worker_profiles.verified is 'true เมื่อ worker รีวิวและกดยืนยันโปรไฟล์ที่ AI สร้าง (human-in-the-loop)';

create index idx_worker_profiles_user_id on worker_profiles(user_id);


-- =========================================================
-- 3. DOCUMENTS
-- รูปใบรับรอง/เอกสารที่ worker อัปโหลด ผ่าน OCR แล้ว
-- =========================================================
create table documents (
  id uuid primary key default gen_random_uuid(),
  worker_profile_id uuid not null references worker_profiles(id) on delete cascade,
  file_url text not null,
  doc_type text,
  ocr_text text,
  created_at timestamptz not null default now()
);

comment on table documents is 'ไฟล์รูปเอกสาร/ใบรับรอง พร้อมข้อความที่ OCR ดึงออกมาแล้ว';
comment on column documents.doc_type is 'ประเภทเอกสาร เช่น certificate, id_card, training_doc';
comment on column documents.ocr_text is 'ข้อความที่ OCR อ่านได้จากรูป ใช้ป้อนให้ AI generate โปรไฟล์ต่อ';

create index idx_documents_worker_profile_id on documents(worker_profile_id);


-- =========================================================
-- 4. EMPLOYERS
-- ข้อมูลฝั่งนายจ้าง/ธุรกิจ SME
-- =========================================================
create table employers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references user_profiles(id) on delete cascade,
  company_name text not null,
  description text,
  lat float8,
  lng float8,
  created_at timestamptz not null default now()
);

comment on table employers is 'ข้อมูลธุรกิจ/นายจ้าง มักเป็น SME ที่ไม่มีฝ่าย HR';

create index idx_employers_user_id on employers(user_id);


-- =========================================================
-- 5. JOBS
-- ประกาศงาน เขียนแบบภาษาพูด แล้ว AI แปลงเป็นโครงสร้าง
-- =========================================================
create table jobs (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid not null references employers(id) on delete cascade,
  raw_text text not null,
  parsed_json jsonb,
  status text not null default 'draft' check (status in ('draft', 'open', 'closed')),
  created_at timestamptz not null default now()
);

comment on table jobs is 'ประกาศงาน เก็บทั้งข้อความดิบที่นายจ้างพิมพ์ และผลลัพธ์ที่ AI แปลงเป็น JSON โครงสร้าง';
comment on column jobs.raw_text is 'ข้อความภาษาไทยแบบพูดที่นายจ้างพิมพ์เข้ามาตรงๆ';
comment on column jobs.parsed_json is 'โครงสร้างงาน (ตำแหน่ง, เงินเดือน, เวลา, สถานที่ ฯลฯ) ที่ AI แปลงจาก raw_text ต้อง match กับ prompt output ให้ตรงกัน';

create index idx_jobs_employer_id on jobs(employer_id);
create index idx_jobs_status on jobs(status);


-- =========================================================
-- 6. APPLICATIONS
-- จุดเชื่อม worker กับ job ที่สมัคร พร้อม fit score จาก AI
-- =========================================================
create table applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs(id) on delete cascade,
  worker_profile_id uuid not null references worker_profiles(id) on delete cascade,
  fit_score float8,
  ai_summary text,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'accepted', 'rejected')),
  created_at timestamptz not null default now(),
  unique (job_id, worker_profile_id)
);

comment on table applications is 'การสมัครงาน หนึ่งแถวคือ worker หนึ่งคนสมัครหนึ่ง job';
comment on column applications.fit_score is 'คะแนนความเหมาะสม 0-1 ที่ AI คำนวณจากการเทียบ worker กับ job';
comment on column applications.ai_summary is 'สรุปสั้นๆ ภาษาที่นายจ้างไม่ต้องมีพื้นฐาน HR ก็เข้าใจได้';

create index idx_applications_job_id on applications(job_id);
create index idx_applications_worker_profile_id on applications(worker_profile_id);


-- =========================================================
-- 7. AI_LOGS
-- log ทุกครั้งที่เรียกใช้ LLM ใช้สำหรับงานวิจัยเปรียบเทียบโมเดล
-- =========================================================
create table ai_logs (
  id uuid primary key default gen_random_uuid(),
  related_type text not null check (related_type in ('worker_profile', 'job_parse', 'application_summary')),
  related_id uuid not null,
  model_used text not null,
  input_tokens int,
  output_tokens int,
  latency_ms int,
  cost_usd numeric(10,6),
  created_at timestamptz not null default now()
);

comment on table ai_logs is 'บันทึกทุกการเรียกโมเดล ใช้เทียบต้นทุน/ความเร็ว/คุณภาพระหว่าง Typhoon 2 กับ GPT-4o-mini คือหัวใจของงานวิจัย';
comment on column ai_logs.related_type is 'บอกว่า log นี้มาจากงานสร้างโปรไฟล์, แปลงประกาศงาน, หรือสรุปผู้สมัคร';
comment on column ai_logs.related_id is 'ชี้ไปที่ id ของแถวใน worker_profiles/jobs/applications ที่เกี่ยวข้อง';

create index idx_ai_logs_related on ai_logs(related_type, related_id);


-- =========================================================
-- 8. FEEDBACK_CORRECTIONS
-- worker/employer แก้ไข output ของ AI ใช้เป็น labeled data
-- =========================================================
create table feedback_corrections (
  id uuid primary key default gen_random_uuid(),
  ai_log_id uuid references ai_logs(id) on delete set null,
  corrected_by uuid references user_profiles(id),
  original_text text,
  corrected_text text,
  created_at timestamptz not null default now()
);

comment on table feedback_corrections is 'คำแก้ไขจากผู้ใช้เมื่อ AI สร้างข้อมูลผิด ใช้เป็นข้อมูลป้อนกลับและ labeled data สำหรับ evaluation';


-- =========================================================
-- ROW LEVEL SECURITY (RLS)
-- เปิดใช้งานทุกตาราง แล้วกำหนดว่าใครเห็นอะไรได้บ้าง
-- =========================================================

alter table user_profiles enable row level security;
alter table worker_profiles enable row level security;
alter table documents enable row level security;
alter table employers enable row level security;
alter table jobs enable row level security;
alter table applications enable row level security;
alter table ai_logs enable row level security;
alter table feedback_corrections enable row level security;

-- user_profiles: เห็นได้แค่ของตัวเอง
create policy "user can view own profile"
  on user_profiles for select
  using (auth.uid() = id);

-- worker_profiles: worker แก้ไข/ดูได้แค่ของตัวเอง แต่ทุกคนที่ login แล้วดู profile ที่ verified แล้วได้ (สำหรับให้ employer ค้นหา)
create policy "worker can manage own profile"
  on worker_profiles for all
  using (auth.uid() = user_id);

create policy "anyone can view verified worker profiles"
  on worker_profiles for select
  using (verified = true);

-- documents: เห็นได้เฉพาะเจ้าของโปรไฟล์
create policy "worker can manage own documents"
  on documents for all
  using (
    worker_profile_id in (
      select id from worker_profiles where user_id = auth.uid()
    )
  );

-- employers: จัดการได้แค่ของตัวเอง แต่ทุกคนดูได้ (โชว์หน้าบริษัท)
create policy "employer can manage own record"
  on employers for all
  using (auth.uid() = user_id);

create policy "anyone can view employers"
  on employers for select
  using (true);

-- jobs: employer จัดการงานตัวเอง ส่วนงานที่ status = open ทุกคนค้นหาได้
create policy "employer can manage own jobs"
  on jobs for all
  using (
    employer_id in (
      select id from employers where user_id = auth.uid()
    )
  );

create policy "anyone can view open jobs"
  on jobs for select
  using (status = 'open');

-- applications: worker เห็นใบสมัครตัวเอง, employer เห็นใบสมัครที่เข้ามาที่งานตัวเอง
create policy "worker can manage own applications"
  on applications for all
  using (
    worker_profile_id in (
      select id from worker_profiles where user_id = auth.uid()
    )
  );

create policy "employer can view applications to own jobs"
  on applications for select
  using (
    job_id in (
      select id from jobs where employer_id in (
        select id from employers where user_id = auth.uid()
      )
    )
  );

-- ai_logs: ไม่เปิดให้ user ทั่วไปเข้าถึง เฉพาะ backend (service role) เท่านั้น
-- ไม่สร้าง policy ใดๆ ไว้ = default ปิดหมด เข้าถึงได้แค่ผ่าน service role key ฝั่ง backend

-- feedback_corrections: ผู้ใช้เห็นเฉพาะที่ตัวเองแก้ไข
create policy "user can view own corrections"
  on feedback_corrections for select
  using (auth.uid() = corrected_by);

create policy "user can insert own corrections"
  on feedback_corrections for insert
  with check (auth.uid() = corrected_by);
