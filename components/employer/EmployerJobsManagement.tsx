"use client";

import React, { useState } from "react";
import {
  Briefcase,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Users,
  Eye,
  Edit3,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  MapPin,
  Calendar,
  DollarSign,
  AlertCircle,
  FileText,
} from "lucide-react";

export interface JobPostingItem {
  id: string;
  title: string;
  category: string;
  rawText: string;
  openCount: number;
  applicantsCount: number;
  salary: string;
  workHours: string;
  location: string;
  tags: string[];
  status: "open" | "closed" | "draft";
  createdAt: string;
}

interface EmployerJobsManagementProps {
  onNavigate: (page: string) => void;
  onViewApplicantsForJob?: (jobId: string) => void;
}

export const EmployerJobsManagement: React.FC<EmployerJobsManagementProps> = ({
  onNavigate,
  onViewApplicantsForJob,
}) => {
  const [jobs, setJobs] = useState<JobPostingItem[]>([
    {
      id: "job-1",
      title: "พนักงานเสิร์ฟ",
      category: "บริการ / ร้านอาหาร",
      rawText: "รับสมัครพนักงานเสิร์ฟร้านอาหาร 2 ตำแหน่ง กะบ่ายถึงค่ำ 11:00-20:00 น. มีอาหาร 2 มื้อ เงินเดือน 13,000 บาท ขยัน ซื่อสัตย์",
      openCount: 2,
      applicantsCount: 14,
      salary: "13,000 บาท/เดือน",
      workHours: "11:00 - 20:00 น.",
      location: "ลาดพร้าว ซอย 10",
      tags: ["มีอาหาร 2 มื้อ", "ทิปรวม", "ประกันสังคม"],
      status: "open",
      createdAt: "18 ส.ค. 2026",
    },
    {
      id: "job-2",
      title: "ผู้ช่วยครัว / ล้างจาน",
      category: "งานครัว / เตรียมอาหาร",
      rawText: "หาผู้ช่วยครัวช่วยเตรียมผัก หั่นเนื้อ ล้างจาน มีประสบการณ์ร้านอาหารจะดีมาก ค่าจ้างวันละ 450 บาท เริ่มงานทันที",
      openCount: 1,
      applicantsCount: 9,
      salary: "450 บาท/วัน",
      workHours: "09:00 - 18:00 น.",
      location: "ลาดพร้าว ซอย 10",
      tags: ["เริ่มงานทันที", "มีข้าวกลางวัน"],
      status: "open",
      createdAt: "15 ส.ค. 2026",
    },
    {
      id: "job-3",
      title: "พนักงานแคชเชียร์",
      category: "การเงิน / ขายหน้าร้าน",
      rawText: "รับแคชเชียร์ดูแลหน้าร้านและคิดเงินระบบ POS ใช้งานคอมพิวเตอร์เบื้องต้นได้ เงินเดือน 14,000 บาท",
      openCount: 1,
      applicantsCount: 4,
      salary: "14,000 บาท/เดือน",
      workHours: "10:00 - 19:00 น.",
      location: "ลาดพร้าว ซอย 10",
      tags: ["ใช้งาน POS", "หยุดสัปดาห์ละ 1 วัน"],
      status: "open",
      createdAt: "10 ส.ค. 2026",
    },
    {
      id: "job-4",
      title: "พนักงานส่งอาหารเดลิเวอรี่",
      category: "ขับรถ / ส่งของ",
      rawText: "รับพนักงานส่งอาหาร มีมอเตอร์ไซค์และใบขับขี่ รู้เส้นทางลาดพร้าว-รัชดาเป็นอย่างดี",
      openCount: 2,
      applicantsCount: 6,
      salary: "15,000 บาท/เดือน + ค่าน้ำมัน",
      workHours: "11:00 - 20:00 น.",
      location: "ลาดพร้าว-รัชดา",
      tags: ["ค่าน้ำมัน", "มีใบขับขี่"],
      status: "closed",
      createdAt: "1 ส.ค. 2026",
    },
  ]);

  const [activeTab, setActiveTab] = useState<"all" | "open" | "closed" | "draft">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleStatus = (id: string) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id === id) {
          const nextStatus = job.status === "open" ? "closed" : "open";
          showToast(
            nextStatus === "open"
              ? `เปิดรับสมัครตำแหน่ง "${job.title}" เรียบร้อยแล้ว`
              : `ปิดรับสมัครตำแหน่ง "${job.title}" ชั่วคราวแล้ว`
          );
          return { ...job, status: nextStatus };
        }
        return job;
      })
    );
  };

  const handleDeleteJob = (id: string, title: string) => {
    if (confirm(`คุณต้องการลบประกาศงาน "${title}" ใช่หรือไม่?`)) {
      setJobs((prev) => prev.filter((j) => j.id !== id));
      showToast(`ลบประกาศงาน "${title}" เรียบร้อยแล้ว`);
    }
  };

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    const matchesTab = activeTab === "all" || job.status === activeTab;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.rawText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalOpen = jobs.filter((j) => j.status === "open").length;
  const totalClosed = jobs.filter((j) => j.status === "closed").length;
  const totalDraft = jobs.filter((j) => j.status === "draft").length;
  const totalApplicants = jobs.reduce((acc, curr) => acc + curr.applicantsCount, 0);

  return (
    <div className="view-enter space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-zinc-700 flex items-center gap-2 text-xs font-medium animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
            จัดการประกาศงาน
          </h1>
          <p className="text-sm md:text-base text-[var(--ink-soft)] mt-0.5">
            ควบคุมสถานะประกาศงาน ตรวจสอบผู้สมัคร และแก้ไขรายละเอียดตำแหน่งงาน (ตาราง jobs)
          </p>
        </div>

        <button
          onClick={() => onNavigate("emp-post")}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[var(--purple-600)] hover:bg-[var(--purple-700)] text-white text-xs font-bold shadow-md transition active:scale-98 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ โพสต์งานใหม่ด้วย AI</span>
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-4 shadow-xs">
          <div className="flex items-center justify-between text-[var(--ink-soft)] mb-1">
            <span className="text-xs font-medium">เปิดรับสมัครอยู่</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-[var(--ink)]">{totalOpen}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
            พร้อมรับผู้สมัครใหม่
          </div>
        </div>

        <div className="bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-4 shadow-xs">
          <div className="flex items-center justify-between text-[var(--ink-soft)] mb-1">
            <span className="text-xs font-medium">ปิดรับสมัครแล้ว</span>
            <Clock className="w-4 h-4 text-zinc-400" />
          </div>
          <div className="text-2xl font-black text-[var(--ink)]">{totalClosed}</div>
          <div className="text-[11px] text-[var(--ink-soft)] font-medium mt-0.5">
            พักการรับสมัคร
          </div>
        </div>

        <div className="bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-4 shadow-xs">
          <div className="flex items-center justify-between text-[var(--ink-soft)] mb-1">
            <span className="text-xs font-medium">ฉบับร่าง (Draft)</span>
            <FileText className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-[var(--ink)]">{totalDraft}</div>
          <div className="text-[11px] text-amber-700 font-medium mt-0.5">
            ยังไม่เผยแพร่
          </div>
        </div>

        <div className="bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-4 shadow-xs">
          <div className="flex items-center justify-between text-[var(--ink-soft)] mb-1">
            <span className="text-xs font-medium">ผู้สมัครทั้งหมด</span>
            <Users className="w-4 h-4 text-[var(--purple-600)]" />
          </div>
          <div className="text-2xl font-black text-[var(--ink)]">{totalApplicants}</div>
          <div className="text-[11px] text-[var(--purple-700)] font-semibold mt-0.5">
            คนในพื้นที่รอบร้าน
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-zinc-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === "all"
                  ? "bg-white text-[var(--purple-700)] shadow-xs"
                  : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              ทั้งหมด ({jobs.length})
            </button>
            <button
              onClick={() => setActiveTab("open")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === "open"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              🟢 เปิดรับสมัคร ({totalOpen})
            </button>
            <button
              onClick={() => setActiveTab("closed")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === "closed"
                  ? "bg-white text-zinc-700 shadow-xs"
                  : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              ⚪ ปิดรับสมัคร ({totalClosed})
            </button>
            <button
              onClick={() => setActiveTab("draft")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === "draft"
                  ? "bg-white text-amber-700 shadow-xs"
                  : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
              }`}
            >
              🟡 แบบร่าง ({totalDraft})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อตำแหน่งงาน หรือทักษะ..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[var(--line)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--purple-600)] focus:ring-1 focus:ring-[var(--purple-200)]"
            />
            <Search className="w-4 h-4 text-[var(--ink-faint)] absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            const isOpen = job.status === "open";
            return (
              <div
                key={job.id}
                className={`bg-white border rounded-[var(--radius-lg)] p-5 sm:p-6 shadow-xs transition-all ${
                  isOpen
                    ? "border-[var(--line)] hover:border-[var(--purple-400)]"
                    : "border-zinc-200 bg-zinc-50/60 opacity-80"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left: Job Info & AI Parsed Structure */}
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-base sm:text-lg font-extrabold text-[var(--ink)]">
                        {job.title}
                      </h3>
                      <span className="text-xs text-[var(--ink-soft)] bg-zinc-100 px-2.5 py-0.5 rounded-md font-medium">
                        {job.category}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          job.status === "open"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : job.status === "closed"
                            ? "bg-zinc-100 text-zinc-600 border border-zinc-300"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {job.status === "open"
                          ? "● เปิดรับสมัคร"
                          : job.status === "closed"
                          ? "✕ ปิดรับสมัครแล้ว"
                          : "✎ แบบร่าง"}
                      </span>
                    </div>

                    {/* Metadata Grid */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[var(--ink-soft)]">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[var(--purple-600)]" />
                        <span>เปิดรับ <strong>{job.openCount}</strong> อัตรา</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-semibold text-emerald-700">{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{job.workHours}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[var(--purple-600)]" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[var(--ink-faint)]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>โพสต์เมื่อ {job.createdAt}</span>
                      </div>
                    </div>

                    {/* Natural Language Prompt Preview (raw_text from schema.sql) */}
                    <div className="p-3 rounded-xl bg-[var(--purple-50)]/50 border border-[var(--purple-100)] text-xs text-[var(--ink-soft)] leading-relaxed">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--purple-700)] uppercase tracking-wider mb-1">
                        <Sparkles className="w-3 h-3 text-[var(--purple-600)]" />
                        <span>ข้อความประกาศภาษาพูดเดิม (raw_text):</span>
                      </div>
                      <p className="italic text-[var(--ink)]">"{job.rawText}"</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {job.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-white border border-[var(--line)] text-[11px] text-[var(--ink-soft)] px-2.5 py-0.5 rounded-md font-medium shadow-2xs"
                        >
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Applicants Action & Control buttons */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-[var(--line)] flex-shrink-0">
                    {/* View Applicants Badge */}
                    <button
                      onClick={() => onNavigate("emp-applicants")}
                      className="px-4 py-2 rounded-xl bg-[var(--purple-50)] hover:bg-[var(--purple-100)] text-[var(--purple-700)] border border-[var(--purple-200)] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-2xs"
                    >
                      <Users className="w-4 h-4 text-[var(--purple-600)]" />
                      <span>ผู้สมัคร ({job.applicantsCount} คน)</span>
                    </button>

                    {/* Quick Control Actions */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleToggleStatus(job.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                          isOpen
                            ? "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
                            : "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                        }`}
                        title={isOpen ? "คลิกเพื่อปิดรับสมัคร" : "คลิกเพื่อเปิดรับสมัครใหม่"}
                      >
                        {isOpen ? "ปิดรับสมัคร" : "เปิดรับต่อ"}
                      </button>

                      <button
                        onClick={() => handleDeleteJob(job.id, job.title)}
                        className="p-1.5 rounded-lg border border-[var(--line)] bg-white hover:bg-rose-50 text-zinc-400 hover:text-rose-600 transition cursor-pointer"
                        title="ลบประกาศงาน"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-[var(--line)] p-8">
            <Briefcase className="w-12 h-12 text-[var(--ink-faint)] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[var(--ink)]">ไม่พบประกาศงานที่ตรงกับเงื่อนไข</h3>
            <p className="text-xs text-[var(--ink-soft)] mt-1">
              ลองเปลี่ยนแท็บสถานะหรือคำค้นหา หรือสร้างประกาศงานใหม่ด้วย AI
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
