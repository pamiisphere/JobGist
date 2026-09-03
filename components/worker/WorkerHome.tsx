"use client";

import React, { useState, useEffect } from "react";
import {
  UserCheck,
  MessageSquare,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  SlidersHorizontal,
  Play,
  Pause,
} from "lucide-react";

// ================= Data Types =================
export interface WorkerDashboardStat {
  id: string;
  iconName: "user-check" | "message-square" | "map-pin";
  value: string | number;
  label: string;
  badge?: string;
  badgeType?: "green" | "amber";
}

export interface WorkerProfileCardData {
  name: string;
  role: string;
  experience: string;
  location: string;
  bio: string;
  skills: string[];
  aiModelBadge: string;
}

export interface RecommendedJobItem {
  id: string;
  title: string;
  location: string;
  distance: string;
  salary: string;
  matchScore: number;
}

export interface WorkerDashboardMockData {
  id: string;
  profileName: string;
  roleTitle: string;
  greetingSubtitle: string;
  stats: WorkerDashboardStat[];
  profileCard: WorkerProfileCardData;
  recommendedJobs: RecommendedJobItem[];
}

// ================= Mock Datasets =================
const MOCK_WORKER_DATASETS: WorkerDashboardMockData[] = [
  {
    id: "worker-maid",
    profileName: "สมชาย ตั้งใจ",
    roleTitle: "แม่บ้านทำความสะอาด / งานบริการ",
    greetingSubtitle: "โปรไฟล์ของคุณพร้อม 90% แล้ว ลองอัปเดตข้อมูลให้ครบเพื่อเพิ่มโอกาสได้งาน",
    stats: [
      {
        id: "stat-completion",
        iconName: "user-check",
        value: "90%",
        label: "ความสมบูรณ์โปรไฟล์",
      },
      {
        id: "stat-contacts",
        iconName: "message-square",
        value: 5,
        label: "ร้านค้าติดต่อเข้ามา",
        badge: "+2 ใหม่",
        badgeType: "green",
      },
      {
        id: "stat-jobs",
        iconName: "map-pin",
        value: 12,
        label: "งานใกล้บ้านที่แนะนำ",
      },
    ],
    profileCard: {
      name: "สมชาย ตั้งใจ",
      role: "แม่บ้านทำความสะอาด",
      experience: "ประสบการณ์ 8 ปี",
      location: "กรุงเทพฯ",
      bio: "มีประสบการณ์ทำความสะอาดบ้านและออฟฟิศมากว่า 8 ปี ถนัดงานซักรีด จัดระเบียบบ้าน และดูแลผู้สูงอายุเบื้องต้น ผ่านการอบรมแม่บ้านมืออาชีพปี 2023 ตรงต่อเวลาและไว้ใจได้",
      skills: [
        "🧹 ทำความสะอาดบ้าน/ออฟฟิศ",
        "🧺 ซักรีด",
        "👵 ดูแลเด็ก/ผู้สูงอายุเบื้องต้น",
        "⏰ ตรงเวลา ไว้ใจได้",
      ],
      aiModelBadge: "สร้างโดย AI (Typhoon 2)",
    },
    recommendedJobs: [
      {
        id: "job-rec-1",
        title: "แม่บ้านประจำออฟฟิศ",
        location: "ลาดพร้าว",
        distance: "1.2 กม.",
        salary: "12,000 บาท/เดือน",
        matchScore: 92,
      },
      {
        id: "job-rec-2",
        title: "พนักงานทำความสะอาดโรงแรม",
        location: "รัชดา",
        distance: "3.5 กม.",
        salary: "380 บาท/วัน",
        matchScore: 85,
      },
    ],
  },
  {
    id: "worker-barista",
    profileName: "นิดา พูลสวัสดิ์",
    roleTitle: "บาริสต้า / พนักงานร้านอาหาร",
    greetingSubtitle: "มี 3 ร้านกาแฟในพื้นที่เปิดดูโปรไฟล์ของคุณในรอบ 24 ชั่วโมงที่ผ่านมา",
    stats: [
      {
        id: "stat-completion",
        iconName: "user-check",
        value: "95%",
        label: "ความสมบูรณ์โปรไฟล์",
      },
      {
        id: "stat-contacts",
        iconName: "message-square",
        value: 8,
        label: "ร้านค้าติดต่อเข้ามา",
        badge: "+4 ใหม่",
        badgeType: "green",
      },
      {
        id: "stat-jobs",
        iconName: "map-pin",
        value: 15,
        label: "งานใกล้บ้านที่แนะนำ",
      },
    ],
    profileCard: {
      name: "นิดา พูลสวัสดิ์",
      role: "บาริสต้า & บริการหน้าร้าน",
      experience: "ประสบการณ์ 4 ปี",
      location: "ลาดพร้าว-จตุจักร",
      bio: "มีความเชี่ยวชาญการสกัดช็อตกาแฟ ลาเต้อาร์ต และดูแลแคชเชียร์หน้าร้าน อัธยาศัยดี มีใจรักงานบริการ สะดวกทำงานทั้งกะเช้าและวันเสาร์-อาทิตย์",
      skills: [
        "☕ ชงกาแฟ Specialty",
        "🎨 ลาเต้อาร์ต",
        "💵 ใช้งานระบบ POS",
        "😊 ยิ้มแย้ม บุคลิกภาพดี",
      ],
      aiModelBadge: "สร้างโดย AI (Typhoon 2)",
    },
    recommendedJobs: [
      {
        id: "job-rec-3",
        title: "บาริสต้า (Full-time)",
        location: "อารีย์",
        distance: "2.1 กม.",
        salary: "15,000 บาท/เดือน",
        matchScore: 96,
      },
      {
        id: "job-rec-4",
        title: "พนักงานเสิร์ฟและบริการหน้าร้าน",
        location: "พหลโยธิน",
        distance: "1.8 กม.",
        salary: "450 บาท/วัน",
        matchScore: 89,
      },
    ],
  },
  {
    id: "worker-warehouse",
    profileName: "อนันต์ วงศ์สุวรรณ",
    roleTitle: "พนักงานคลังสินค้า / ขับรถโฟล์คลิฟท์",
    greetingSubtitle: "โปรไฟล์ของคุณได้รับการยืนยันใบขับขี่โฟล์คลิฟท์เรียบร้อยแล้ว",
    stats: [
      {
        id: "stat-completion",
        iconName: "user-check",
        value: "92%",
        label: "ความสมบูรณ์โปรไฟล์",
      },
      {
        id: "stat-contacts",
        iconName: "message-square",
        value: 6,
        label: "ร้านค้าติดต่อเข้ามา",
        badge: "+3 ใหม่",
        badgeType: "green",
      },
      {
        id: "stat-jobs",
        iconName: "map-pin",
        value: 18,
        label: "งานใกล้บ้านที่แนะนำ",
      },
    ],
    profileCard: {
      name: "อนันต์ วงศ์สุวรรณ",
      role: "ขับรถโฟล์คลิฟท์ & จัดสต็อก",
      experience: "ประสบการณ์ 5 ปี",
      location: "รามอินทรา-บางเขน",
      bio: "ขับรถโฟล์คลิฟท์ทั้งไฟฟ้าและน้ำมันได้อย่างชำนาญ จัดเรียงพาเลท เช็คสต็อกสินค้าด้วยแฮนด์เฮลด์ มีความรับผิดชอบ แข็งแรง และพร้อมทำโอที",
      skills: [
        "🚜 ขับโฟล์คลิฟท์ไฟฟ้า/น้ำมัน",
        "📦 ตรวจนับสต็อกสินค้า",
        "💪 ร่างกายแข็งแรง",
        "⏰ ยินดีทำโอที",
      ],
      aiModelBadge: "สร้างโดย AI (Typhoon 2)",
    },
    recommendedJobs: [
      {
        id: "job-rec-5",
        title: "พนักงานขับรถโฟล์คลิฟท์",
        location: "บางเขน",
        distance: "3.2 กม.",
        salary: "16,000 บาท/เดือน",
        matchScore: 94,
      },
      {
        id: "job-rec-6",
        title: "พนักงานจัดและแพ็คสินค้าคลัง",
        location: "รามอินทรา",
        distance: "2.4 กม.",
        salary: "450 บาท/วัน",
        matchScore: 88,
      },
    ],
  },
];

interface WorkerHomeProps {
  onNavigate: (page: string) => void;
  onSelectJob?: (jobTitle: string) => void;
  userName?: string;
}

export const WorkerHome: React.FC<WorkerHomeProps> = ({
  onNavigate,
  onSelectJob,
  userName,
}) => {
  const [profileIndex, setProfileIndex] = useState<number>(0);
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const currentDataset = MOCK_WORKER_DATASETS[profileIndex];
  const activeUserName = userName || currentDataset.profileName;

  // Auto-cycle simulation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isAutoCycling) {
      interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setProfileIndex((prev) => (prev + 1) % MOCK_WORKER_DATASETS.length);
          setIsTransitioning(false);
        }, 150);
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoCycling]);

  const handleSelectProfile = (index: number) => {
    if (index === profileIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setProfileIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <div className="view-enter space-y-6">
      {/* Demo State Controller Bar */}
      <div className="bg-white border border-[var(--line)] rounded-2xl p-3 px-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[var(--purple-600)]" />
          <span className="font-bold text-[var(--ink)]">
            สลับสายงานจำลอง (Dynamic Mock State):
          </span>
          <div className="flex flex-wrap items-center gap-1.5 ml-1">
            {MOCK_WORKER_DATASETS.map((d, idx) => {
              const isSelected = idx === profileIndex;
              return (
                <button
                  key={d.id}
                  onClick={() => handleSelectProfile(idx)}
                  className={`px-3 py-1 rounded-full font-semibold transition cursor-pointer ${
                    isSelected
                      ? "bg-[var(--purple-600)] text-white shadow-xs"
                      : "bg-[var(--purple-50)] text-[var(--purple-700)] hover:bg-[var(--purple-100)]"
                  }`}
                >
                  {d.roleTitle.split("/")[0]}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => setIsAutoCycling(!isAutoCycling)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold border transition cursor-pointer ${
            isAutoCycling
              ? "bg-amber-50 border-amber-300 text-amber-800"
              : "bg-zinc-50 border-[var(--line)] text-[var(--ink-soft)] hover:bg-zinc-100"
          }`}
          title="สลับข้อมูลอัตโนมัติทุก 5 วินาที"
        >
          {isAutoCycling ? (
            <>
              <Pause className="w-3.5 h-3.5 text-amber-700" />
              <span>หยุดหมุนเวียน</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-emerald-600" />
              <span>เล่นอัตโนมัติ (5s)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <div
        className={`space-y-6 transition-opacity duration-200 ${
          isTransitioning ? "opacity-30" : "opacity-100"
        }`}
      >
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
            สวัสดี คุณ{activeUserName} 👋
          </h1>
          <p className="text-sm md:text-base text-[var(--ink-soft)] font-normal">
            {currentDataset.greetingSubtitle}
          </p>
        </div>

        {/* 3 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {currentDataset.stats.map((stat) => {
            const Icon =
              stat.iconName === "user-check"
                ? UserCheck
                : stat.iconName === "message-square"
                ? MessageSquare
                : MapPin;

            const iconColor =
              stat.iconName === "user-check"
                ? "text-emerald-400"
                : stat.iconName === "message-square"
                ? "text-amber-300"
                : "text-purple-300";

            return (
              <div
                key={stat.id}
                className="bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-5 flex items-center gap-4 shadow-xs hover:border-[var(--purple-500)] transition"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--ink)] text-white flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <div>
                  <div className="text-2xl font-black text-[var(--ink)] tracking-tight flex items-center gap-2">
                    <span>{stat.value}</span>
                    {stat.badge && (
                      <span className="text-xs font-bold text-[var(--green)] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                        {stat.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[var(--ink-soft)] font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: AI Profile Preview (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[var(--ink)]">
                    โปรไฟล์ล่าสุดที่ AI สร้างให้
                  </h3>
                  <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                    อัปเดตจากแบบฟอร์มและใบเซอร์ที่คุณอัปโหลดล่าสุด
                  </p>
                </div>
                <ShieldCheck className="w-5 h-5 text-[var(--green)]" />
              </div>

              <hr className="border-t border-[var(--line)] my-4" />

              {/* Profile Preview Card */}
              <div className="border border-[var(--purple-100)] rounded-2xl p-5 bg-[var(--purple-50)]/70 relative overflow-hidden">
                <div className="inline-flex items-center gap-1.5 bg-[var(--purple-600)] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentDataset.profileCard.aiModelBadge}</span>
                </div>

                <div className="text-lg font-extrabold text-[var(--ink)]">
                  {activeUserName}
                </div>
                <div className="text-xs font-semibold text-[var(--purple-700)] mt-0.5 mb-3">
                  {currentDataset.profileCard.role} ·{" "}
                  {currentDataset.profileCard.experience} ·{" "}
                  {currentDataset.profileCard.location}
                </div>

                <p className="text-xs text-[var(--ink-soft)] leading-relaxed mb-4">
                  {currentDataset.profileCard.bio}
                </p>

                {/* Tag Row */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentDataset.profileCard.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-white border border-[var(--line)] rounded-lg px-2.5 py-1 text-xs text-[var(--ink)] font-medium shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <button
                onClick={() => onNavigate("worker-profile")}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[var(--purple-600)] text-[var(--purple-700)] hover:bg-[var(--purple-50)] text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ดู/แก้ไขโปรไฟล์เต็ม</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Recommended Jobs (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[var(--ink)]">
                    งานแนะนำใกล้คุณ
                  </h3>
                  <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                    คัดจากระยะทางและทักษะที่ตรงกับโปรไฟล์
                  </p>
                </div>
                <Building className="w-5 h-5 text-[var(--purple-600)]" />
              </div>

              <hr className="border-t border-[var(--line)] my-4" />

              {/* Job Items */}
              <div className="space-y-3">
                {currentDataset.recommendedJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() =>
                      onSelectJob
                        ? onSelectJob(job.title)
                        : onNavigate("worker-jobs")
                    }
                    className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--line)] hover:border-[var(--purple-500)] hover:bg-[var(--purple-50)]/40 transition cursor-pointer group"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-sm font-bold text-[var(--ink)] group-hover:text-[var(--purple-700)] transition">
                        {job.title}
                      </div>
                      <div className="text-xs text-[var(--ink-soft)] mt-1 flex items-center gap-1.5 flex-wrap">
                        <span>{job.location}</span>
                        <span>·</span>
                        <span>{job.distance}</span>
                        <span>·</span>
                        <span className="font-semibold text-emerald-600">
                          {job.salary}
                        </span>
                      </div>
                    </div>
                    <span className="bg-[var(--purple-100)] text-[var(--purple-700)] text-[11px] font-bold px-2.5 py-1 rounded-lg flex-shrink-0">
                      ตรง {job.matchScore}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <button
                onClick={() => onNavigate("worker-jobs")}
                className="w-full py-2.5 rounded-full bg-[var(--purple-600)] hover:bg-[var(--purple-700)] text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
              >
                <span>ดูงานทั้งหมด ({currentDataset.recommendedJobs.length} ตำแหน่ง)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
