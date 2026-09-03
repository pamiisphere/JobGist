"use client";

import React, { useState, useEffect } from "react";
import {
  ClipboardList,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  PlusCircle,
  TrendingUp,
  RefreshCw,
  SlidersHorizontal,
  Play,
  Pause,
} from "lucide-react";

// ================= Data Types =================
export interface DashboardStatItem {
  id: string;
  iconName: "clipboard" | "users" | "clock";
  value: string | number;
  label: string;
  badge?: string;
  badgeType?: "green" | "amber" | "blue";
}

export interface TopApplicantTag {
  text: string;
  emoji?: string;
  isHighlight?: boolean;
}

export interface TopApplicantData {
  id: string;
  fitScore: number;
  name: string;
  targetRole: string;
  experience: string;
  distance: string;
  summary: string;
  tags: TopApplicantTag[];
  totalApplicantsForRole: number;
}

export interface OpenPositionItem {
  id: string;
  title: string;
  openCount: number;
  applicantsCount: number;
  statusLabel: string;
  statusType: "amber" | "blue" | "green";
}

export interface BusinessDashboardProfile {
  id: string;
  businessName: string;
  businessType: string;
  greetingSubtitle: string;
  stats: DashboardStatItem[];
  topApplicant: TopApplicantData;
  openPositions: OpenPositionItem[];
}

// ================= Mock Datasets =================
const MOCK_EMPLOYER_PROFILES: BusinessDashboardProfile[] = [
  {
    id: "profile-restaurant",
    businessName: "ร้านอาหารสมศรี",
    businessType: "ธุรกิจร้านอาหาร / เครื่องดื่ม",
    greetingSubtitle: "ภาพรวมการรับสมัครงานของคุณในเดือนนี้",
    stats: [
      {
        id: "stat-open",
        iconName: "clipboard",
        value: 3,
        label: "ตำแหน่งที่เปิดรับ",
      },
      {
        id: "stat-applicants",
        iconName: "users",
        value: 27,
        label: "ผู้สมัครทั้งหมด",
        badge: "+9 ใหม่",
        badgeType: "green",
      },
      {
        id: "stat-time",
        iconName: "clock",
        value: "4 นาที",
        label: "เวลาเฉลี่ยในการดูผู้สมัคร",
      },
    ],
    topApplicant: {
      id: "app-somchai",
      fitScore: 94,
      name: "สมชาย ตั้งใจทำ",
      targetRole: "พนักงานเสิร์ฟ",
      experience: "เคยเป็นพนักงานเสิร์ฟ 3 ปี",
      distance: "800 ม.",
      summary:
        "ทำงานร้านอาหารมาก่อน 3 ปี บุคลิกดี พูดจาสุภาพ ว่างเริ่มงานได้ทันที เหมาะกับกะเย็น-ค่ำ ตรงต่อเวลา และมีประสบการณ์ใช้งานระบบ POS พื้นฐาน",
      tags: [
        { text: "ประสบการณ์เสิร์ฟ 3 ปี", emoji: "🍽️" },
        { text: "ใกล้ร้าน 800 ม.", emoji: "🚶" },
        { text: "เริ่มงานได้ทันที", emoji: "✓", isHighlight: true },
      ],
      totalApplicantsForRole: 14,
    },
    openPositions: [
      {
        id: "pos-waiter",
        title: "พนักงานเสิร์ฟ",
        openCount: 2,
        applicantsCount: 14,
        statusLabel: "กำลังคัดเลือก",
        statusType: "amber",
      },
      {
        id: "pos-kitchen",
        title: "ผู้ช่วยครัว",
        openCount: 1,
        applicantsCount: 9,
        statusLabel: "กำลังคัดเลือก",
        statusType: "amber",
      },
      {
        id: "pos-cashier",
        title: "แคชเชียร์",
        openCount: 1,
        applicantsCount: 4,
        statusLabel: "เพิ่งเปิด",
        statusType: "blue",
      },
    ],
  },
  {
    id: "profile-cafe",
    businessName: "สยามการ์เดน คาเฟ่ & เบเกอรี่",
    businessType: "คาเฟ่ & เบเกอรี่โฮมเมด",
    greetingSubtitle: "สรุปสถานะการสรรหาพนักงานประจำสาขาลาดพร้าว",
    stats: [
      {
        id: "stat-open",
        iconName: "clipboard",
        value: 2,
        label: "ตำแหน่งที่เปิดรับ",
      },
      {
        id: "stat-applicants",
        iconName: "users",
        value: 19,
        label: "ผู้สมัครทั้งหมด",
        badge: "+5 ใหม่",
        badgeType: "green",
      },
      {
        id: "stat-time",
        iconName: "clock",
        value: "3 นาที",
        label: "เวลาเฉลี่ยในการดูผู้สมัคร",
      },
    ],
    topApplicant: {
      id: "app-nida",
      fitScore: 96,
      name: "นิดา พูลสวัสดิ์",
      targetRole: "บาริสต้า",
      experience: "มีใบรับรองชงกาแฟ Barista Specialty 4 ปี",
      distance: "1.2 กม.",
      summary:
        "เชี่ยวชาญการสกัดช็อตเอสเปรสโซและลาเต้อาร์ต อัธยาศัยดี ยิ้มแย้ม สื่อสารภาษาอังกฤษเบื้องต้นได้ พร้อมเริ่มงานกะเช้า",
      tags: [
        { text: "บาริสต้า 4 ปี", emoji: "☕" },
        { text: "ทำลาเต้อาร์ตได้", emoji: "🎨" },
        { text: "มีใบเซอร์กาแฟ", emoji: "✓", isHighlight: true },
      ],
      totalApplicantsForRole: 12,
    },
    openPositions: [
      {
        id: "pos-barista",
        title: "บาริสต้า (Full-time)",
        openCount: 1,
        applicantsCount: 12,
        statusLabel: "กำลังคัดเลือก",
        statusType: "amber",
      },
      {
        id: "pos-service",
        title: "พนักงานบริการหน้าร้าน",
        openCount: 2,
        applicantsCount: 7,
        statusLabel: "เพิ่งเปิด",
        statusType: "blue",
      },
    ],
  },
  {
    id: "profile-logistics",
    businessName: "บจก. สยามเอ็กซ์เพรส โลจิสติกส์",
    businessType: "คลังสินค้า & กระจายสินค้า",
    greetingSubtitle: "ความคืบหน้ารับสมัครพนักงานฝ่ายปฏิบัติการคลัง",
    stats: [
      {
        id: "stat-open",
        iconName: "clipboard",
        value: 4,
        label: "ตำแหน่งที่เปิดรับ",
      },
      {
        id: "stat-applicants",
        iconName: "users",
        value: 45,
        label: "ผู้สมัครทั้งหมด",
        badge: "+14 ใหม่",
        badgeType: "green",
      },
      {
        id: "stat-time",
        iconName: "clock",
        value: "5 นาที",
        label: "เวลาเฉลี่ยในการดูผู้สมัคร",
      },
    ],
    topApplicant: {
      id: "app-anan",
      fitScore: 92,
      name: "อนันต์ วงศ์สุวรรณ",
      targetRole: "พนักงานขับรถโฟล์คลิฟท์",
      experience: "มีใบขับขี่โฟล์คลิฟท์ ประสบการณ์คลัง 5 ปี",
      distance: "2.1 กม.",
      summary:
        "ขับโฟล์คลิฟท์ไฟฟ้าและน้ำมันได้อย่างปลอดภัย จัดเรียงพาเลทในที่สูงคล่องแคล่ว แข็งแรง ผ่านการตรวจสุขภาพประจำปี",
      tags: [
        { text: "ใบขับขี่โฟล์คลิฟท์", emoji: "🚜" },
        { text: "คลังสินค้า 5 ปี", emoji: "📦" },
        { text: "ทำโอทีได้", emoji: "⏰", isHighlight: true },
      ],
      totalApplicantsForRole: 18,
    },
    openPositions: [
      {
        id: "pos-forklift",
        title: "พนักงานขับรถโฟล์คลิฟท์",
        openCount: 2,
        applicantsCount: 18,
        statusLabel: "กำลังคัดเลือก",
        statusType: "amber",
      },
      {
        id: "pos-packer",
        title: "พนักงานแพ็คพัสดุ",
        openCount: 3,
        applicantsCount: 21,
        statusLabel: "กำลังคัดเลือก",
        statusType: "amber",
      },
      {
        id: "pos-warehouse-admin",
        title: "ธุรการคลังสินค้า",
        openCount: 1,
        applicantsCount: 6,
        statusLabel: "เพิ่งเปิด",
        statusType: "blue",
      },
    ],
  },
];

interface EmployerHomeProps {
  onNavigate: (page: string) => void;
  onViewApplicant?: (applicantId: string) => void;
  userName?: string;
}

export const EmployerHome: React.FC<EmployerHomeProps> = ({
  onNavigate,
  onViewApplicant,
  userName,
}) => {
  // Dynamic State
  const [profileIndex, setProfileIndex] = useState<number>(0);
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const currentProfile = MOCK_EMPLOYER_PROFILES[profileIndex];

  // Optional: Dynamic greeting name (prioritizes registered name or active profile name)
  const headerDisplayName = userName
    ? userName.startsWith("ร้าน")
      ? userName
      : `คุณ${userName}`
    : currentProfile.businessName;

  // Auto-cycle demo interval simulation (when enabled by user)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isAutoCycling) {
      interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setProfileIndex((prev) => (prev + 1) % MOCK_EMPLOYER_PROFILES.length);
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
            สลับโปรไฟล์จำลอง (Dynamic Mock State):
          </span>
          <div className="flex flex-wrap items-center gap-1.5 ml-1">
            {MOCK_EMPLOYER_PROFILES.map((p, idx) => {
              const isSelected = idx === profileIndex;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectProfile(idx)}
                  className={`px-3 py-1 rounded-full font-semibold transition cursor-pointer ${
                    isSelected
                      ? "bg-[var(--purple-600)] text-white shadow-xs"
                      : "bg-[var(--purple-50)] text-[var(--purple-700)] hover:bg-[var(--purple-100)]"
                  }`}
                >
                  {p.businessName}
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

      {/* Main Content Area with Transition Support */}
      <div
        className={`space-y-6 transition-opacity duration-200 ${
          isTransitioning ? "opacity-30" : "opacity-100"
        }`}
      >
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
            สวัสดี {headerDisplayName} 👋
          </h1>
          <p className="text-sm md:text-base text-[var(--ink-soft)] font-normal">
            {currentProfile.greetingSubtitle}
          </p>
        </div>

        {/* 3 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {currentProfile.stats.map((stat) => {
            const Icon =
              stat.iconName === "clipboard"
                ? ClipboardList
                : stat.iconName === "users"
                ? Users
                : Clock;

            const iconColor =
              stat.iconName === "clipboard"
                ? "text-purple-300"
                : stat.iconName === "users"
                ? "text-emerald-400"
                : "text-amber-300";

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
          {/* Left Column: Top Match Applicant (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[var(--ink)]">
                    ผู้สมัครที่เหมาะที่สุดตอนนี้
                  </h3>
                  <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                    จัดอันดับโดย AI จากตำแหน่ง &quot;
                    {currentProfile.topApplicant.targetRole}&quot;
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--purple-700)] bg-[var(--purple-50)] px-2.5 py-1 rounded-full border border-[var(--purple-100)]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Ranked</span>
                </span>
              </div>

              <hr className="border-t border-[var(--line)] my-4" />

              {/* Top Applicant Card */}
              <div className="border border-[var(--purple-200)] rounded-2xl p-5 bg-[var(--purple-50)]/70 flex items-start gap-4">
                {/* Conic Fit Score Gauge */}
                <div
                  className="fit-score shadow-xs"
                  style={
                    {
                      "--pct": `${currentProfile.topApplicant.fitScore}%`,
                    } as React.CSSProperties
                  }
                >
                  <span>{currentProfile.topApplicant.fitScore}%</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-base font-extrabold text-[var(--ink)]">
                    {currentProfile.topApplicant.name}
                  </div>
                  <div className="text-xs font-semibold text-[var(--purple-700)] mt-0.5 mb-2">
                    {currentProfile.topApplicant.experience} · อยู่ใกล้ร้าน{" "}
                    {currentProfile.topApplicant.distance}
                  </div>
                  <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                    {currentProfile.topApplicant.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {currentProfile.topApplicant.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                          tag.isHighlight
                            ? "bg-emerald-100 text-emerald-800 font-bold"
                            : "bg-white border border-[var(--line)] text-[var(--ink-soft)]"
                        }`}
                      >
                        {tag.emoji ? `${tag.emoji} ` : ""}
                        {tag.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={() => onNavigate("emp-applicants")}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full border border-[var(--purple-600)] text-[var(--purple-700)] hover:bg-[var(--purple-50)] text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  ดูผู้สมัครทั้งหมด (
                  {currentProfile.topApplicant.totalApplicantsForRole} คน)
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Open Job Positions (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[var(--ink)]">
                    ตำแหน่งที่เปิดรับ
                  </h3>
                  <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                    ความคืบหน้าการรับสมัคร
                  </p>
                </div>
                <span className="text-xs font-bold text-[var(--purple-600)]">
                  {currentProfile.openPositions.length} ตำแหน่ง
                </span>
              </div>

              <hr className="border-t border-[var(--line)] my-4" />

              {/* Position Rows */}
              <div className="space-y-3">
                {currentProfile.openPositions.map((pos) => {
                  const badgeStyle =
                    pos.statusType === "amber"
                      ? "bg-amber-100 text-amber-800"
                      : pos.statusType === "blue"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-emerald-100 text-emerald-800";

                  return (
                    <div
                      key={pos.id}
                      onClick={() => onNavigate("emp-applicants")}
                      className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--line)] hover:border-[var(--purple-500)] hover:bg-[var(--purple-50)]/40 transition cursor-pointer group"
                    >
                      <div>
                        <div className="text-sm font-bold text-[var(--ink)] group-hover:text-[var(--purple-700)] transition">
                          {pos.title}
                        </div>
                        <div className="text-xs text-[var(--ink-soft)] mt-0.5">
                          เปิดรับ {pos.openCount} อัตรา · ผู้สมัคร{" "}
                          {pos.applicantsCount} คน
                        </div>
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${badgeStyle}`}
                      >
                        {pos.statusLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5">
              <button
                onClick={() => onNavigate("emp-post")}
                className="w-full py-2.5 rounded-full bg-[var(--purple-600)] hover:bg-[var(--purple-700)] text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ โพสต์ตำแหน่งใหม่</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
