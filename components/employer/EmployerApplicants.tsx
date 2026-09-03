"use client";

import React, { useState } from "react";
import {
  Users,
  Sparkles,
  ChevronDown,
  Filter,
  Eye,
  CheckCircle,
  Phone,
  Calendar,
  XCircle,
  Clock,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export interface ApplicantItem {
  id: string;
  name: string;
  role: string;
  experience: string;
  distance: string;
  fitScore: number;
  summary: string;
  phone: string;
  tags: string[];
  certifications?: string[];
  positionApplied: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  appliedAt: string;
}

interface EmployerApplicantsProps {
  onSelectApplicant: (applicant: ApplicantItem) => void;
  applicantsList?: ApplicantItem[];
  onUpdateApplicantStatus?: (id: string, newStatus: "pending" | "reviewed" | "accepted" | "rejected") => void;
}

export const EmployerApplicants: React.FC<EmployerApplicantsProps> = ({
  onSelectApplicant,
  applicantsList,
  onUpdateApplicantStatus,
}) => {
  const [selectedPosition, setSelectedPosition] = useState<string>("waiter");
  const [selectedStatusTab, setSelectedStatusTab] = useState<"all" | "pending" | "reviewed" | "accepted" | "rejected">("all");

  const [applicants, setApplicants] = useState<ApplicantItem[]>(
    applicantsList || [
      {
        id: "app-1",
        name: "สมชาย ตั้งใจทำ",
        role: "พนักงานเสิร์ฟ",
        experience: "เคยเป็นพนักงานเสิร์ฟ 3 ปี",
        distance: "800 ม.",
        fitScore: 94,
        summary:
          "ทำงานร้านอาหารมาก่อน 3 ปี บุคลิกดี พูดจาสุภาพ ว่างเริ่มงานได้ทันที เหมาะกับกะเย็น-ค่ำ ตรงต่อเวลา และมีประสบการณ์ใช้งานระบบ POS พื้นฐาน",
        phone: "081-234-5678",
        tags: ["เสิร์ฟอาหาร", "ใช้ POS ได้", "สะดวกกะดึก", "อยู่ใกล้มาก"],
        certifications: ["ใบผ่านการฝึกอบรมการบริการร้านอาหารมาตรฐาน"],
        positionApplied: "waiter",
        status: "pending",
        appliedAt: "19 ส.ค. 2026",
      },
      {
        id: "app-2",
        name: "นิดา พูลสวัสดิ์",
        role: "พนักงานบริการหน้าร้าน",
        experience: "ไม่มีประสบการณ์เสิร์ฟตรง แต่เคยขายของหน้าร้าน 2 ปี",
        distance: "2.4 กม.",
        fitScore: 81,
        summary:
          "มีทักษะพูดคุยกับลูกค้าดีจากงานขายของหน้าร้าน ยิ้มแย้ม เรียนรู้ไว สะดวกทำงานกะเย็นทุกวัน ไม่มีข้อจำกัดเรื่องเวลา",
        phone: "089-876-5432",
        tags: ["งานขายหน้าร้าน", "อัธยาศัยดี", "เรียนรู้ไว"],
        positionApplied: "waiter",
        status: "reviewed",
        appliedAt: "18 ส.ค. 2026",
      },
      {
        id: "app-3",
        name: "อนันต์ ใจเย็น",
        role: "นักศึกษา / ฟรีแลนซ์",
        experience: "นักศึกษาจบใหม่ ไม่มีประสบการณ์ร้านอาหาร",
        distance: "6.1 กม.",
        fitScore: 68,
        summary:
          "ยังไม่มีประสบการณ์ตรงด้านร้านอาหาร แต่สะดวกเวลาที่ต้องการ มีมอเตอร์ไซค์ส่วนตัว แต่อยู่ไกลจากร้านพอสมควร",
        phone: "086-555-1234",
        tags: ["พร้อมเรียนรู้", "มีรถส่วนตัว"],
        positionApplied: "waiter",
        status: "pending",
        appliedAt: "16 ส.ค. 2026",
      },
      {
        id: "app-4",
        name: "สมศรี ฝีมือดี",
        role: "ผู้ช่วยกุ๊ก",
        experience: "เคยช่วยร้านตามสั่ง 5 ปี",
        distance: "1.5 กม.",
        fitScore: 91,
        summary:
          "เชี่ยวชาญการหั่น เตรียมวัตถุดิบ ทอด ย่าง คล่องแคล่ว รักษาความสะอาดในครัวอย่างดีเยี่ยม",
        phone: "083-999-8877",
        tags: ["เตรียมวัตถุดิบ", "ล้างจานสะอาด", "ทนแรงกดดันได้"],
        positionApplied: "kitchen",
        status: "accepted",
        appliedAt: "15 ส.ค. 2026",
      },
      {
        id: "app-5",
        name: "วิชัย รวดเร็ว",
        role: "พนักงานครัว / ล้างจาน",
        experience: "เคยล้างจานร้านชาบู 1 ปี",
        distance: "3.0 กม.",
        fitScore: 78,
        summary:
          "ขยัน ไม่เกี่ยงงาน ล้างจานไว พร้อมเริ่มงานทันที",
        phone: "085-444-3322",
        tags: ["ล้างจานไว", "ตรงเวลา"],
        positionApplied: "kitchen",
        status: "pending",
        appliedAt: "14 ส.ค. 2026",
      },
      {
        id: "app-6",
        name: "ประภาส คิดเงินเก่ง",
        role: "แคชเชียร์",
        experience: "แคชเชียร์มินิมาร์ท 2 ปี",
        distance: "1.8 กม.",
        fitScore: 89,
        summary:
          "นับเงินรอบคอบ ใช้โปรแกรม POS คล่อง ไม่เคยทำเงินขาด",
        phone: "082-111-9988",
        tags: ["ใช้ POS คล่อง", "นับเงินรอบคอบ"],
        positionApplied: "cashier",
        status: "reviewed",
        appliedAt: "12 ส.ค. 2026",
      },
    ]
  );

  const positions = [
    { id: "waiter", title: "พนักงานเสิร์ฟ", count: applicants.filter(a => a.positionApplied === "waiter").length },
    { id: "kitchen", title: "ผู้ช่วยครัว", count: applicants.filter(a => a.positionApplied === "kitchen").length },
    { id: "cashier", title: "แคชเชียร์", count: applicants.filter(a => a.positionApplied === "cashier").length },
  ];

  const handleUpdateStatus = (id: string, newStatus: "pending" | "reviewed" | "accepted" | "rejected") => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    if (onUpdateApplicantStatus) {
      onUpdateApplicantStatus(id, newStatus);
    }
  };

  const filteredApplicants = applicants.filter((app) => {
    const matchesPosition = app.positionApplied === selectedPosition;
    const matchesStatus = selectedStatusTab === "all" || app.status === selectedStatusTab;
    return matchesPosition && matchesStatus;
  });

  return (
    <div className="view-enter space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
            รายชื่อผู้สมัครงาน
          </h1>
          <p className="text-sm md:text-base text-[var(--ink-soft)]">
            AI คัดกรองและจัดอันดับผู้สมัครตามความเหมาะสม (ตาราง applications)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--ink-soft)] font-medium">ตำแหน่งงาน:</span>
          <div className="flex bg-white border border-[var(--line)] rounded-xl p-1 shadow-2xs">
            {positions.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPosition(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedPosition === p.id
                    ? "bg-[var(--purple-600)] text-white shadow-xs"
                    : "text-[var(--ink-soft)] hover:text-[var(--purple-700)]"
                }`}
              >
                {p.title} ({p.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-3 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-[var(--ink)] mr-1">สถานะใบสมัคร:</span>
          <button
            onClick={() => setSelectedStatusTab("all")}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              selectedStatusTab === "all"
                ? "bg-[var(--purple-100)] text-[var(--purple-800)]"
                : "text-[var(--ink-soft)] hover:bg-zinc-100"
            }`}
          >
            ทั้งหมด ({applicants.filter(a => a.positionApplied === selectedPosition).length})
          </button>
          <button
            onClick={() => setSelectedStatusTab("pending")}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              selectedStatusTab === "pending"
                ? "bg-amber-100 text-amber-900"
                : "text-[var(--ink-soft)] hover:bg-zinc-100"
            }`}
          >
            🟡 รอพิจารณา
          </button>
          <button
            onClick={() => setSelectedStatusTab("reviewed")}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              selectedStatusTab === "reviewed"
                ? "bg-blue-100 text-blue-900"
                : "text-[var(--ink-soft)] hover:bg-zinc-100"
            }`}
          >
            🔵 นัดสัมภาษณ์แล้ว
          </button>
          <button
            onClick={() => setSelectedStatusTab("accepted")}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              selectedStatusTab === "accepted"
                ? "bg-emerald-100 text-emerald-900"
                : "text-[var(--ink-soft)] hover:bg-zinc-100"
            }`}
          >
            🟢 รับเข้าทำงานแล้ว
          </button>
          <button
            onClick={() => setSelectedStatusTab("rejected")}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              selectedStatusTab === "rejected"
                ? "bg-rose-100 text-rose-900"
                : "text-[var(--ink-soft)] hover:bg-zinc-100"
            }`}
          >
            🔴 ปฏิเสธแล้ว
          </button>
        </div>

        <div className="text-[11px] text-[var(--ink-faint)] flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[var(--purple-600)]" />
          <span>เรียงลำดับตาม AI Fit Score สูงสุด</span>
        </div>
      </div>

      {/* Candidate Cards List */}
      <div className="space-y-4">
        {filteredApplicants.length > 0 ? (
          filteredApplicants.map((app, index) => {
            const statusBadge =
              app.status === "accepted"
                ? { label: "✓ รับเข้าทำงานแล้ว", style: "bg-emerald-100 text-emerald-800 border-emerald-300" }
                : app.status === "reviewed"
                ? { label: "🗓️ นัดสัมภาษณ์แล้ว", style: "bg-blue-100 text-blue-800 border-blue-300" }
                : app.status === "rejected"
                ? { label: "✕ ปฏิเสธแล้ว", style: "bg-rose-100 text-rose-800 border-rose-300" }
                : { label: "⏳ รอพิจารณา", style: "bg-amber-100 text-amber-800 border-amber-300" };

            return (
              <div
                key={app.id}
                className="bg-white border border-[var(--line)] hover:border-[var(--purple-400)] rounded-[var(--radius-lg)] p-5 sm:p-6 shadow-xs transition hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
                  {/* Left Column: Fit Score + Basic Info */}
                  <div className="flex items-start gap-4">
                    {/* Radial Conic Fit Score Gauge */}
                    <div
                      className="fit-score shadow-xs flex-shrink-0"
                      style={{ "--pct": `${app.fitScore}%` } as React.CSSProperties}
                    >
                      <span>{app.fitScore}%</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-extrabold text-[var(--ink)]">
                          {app.name}
                        </h3>
                        {index === 0 && (
                          <span className="bg-[var(--purple-600)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                            <Sparkles className="w-3 h-3" />
                            Top Match
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadge.style}`}>
                          {statusBadge.label}
                        </span>
                      </div>

                      <div className="text-xs font-semibold text-[var(--purple-700)]">
                        {app.role} · {app.experience}
                      </div>

                      <div className="text-xs text-[var(--ink-soft)] flex items-center gap-3 pt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[var(--purple-600)]" />
                          ใกล้ร้าน {app.distance}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-[var(--ink-faint)]">
                          <Calendar className="w-3 h-3" />
                          สมัครเมื่อ {app.appliedAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-start flex-shrink-0">
                    <button
                      onClick={() => onSelectApplicant(app)}
                      className="px-4 py-2 rounded-full border border-[var(--purple-600)] text-[var(--purple-700)] hover:bg-[var(--purple-50)] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>ดูข้อมูลเต็ม</span>
                    </button>

                    <a
                      href={`tel:${app.phone}`}
                      className="px-4 py-2 rounded-full bg-[var(--purple-600)] hover:bg-[var(--purple-700)] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-98"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>โทร {app.phone}</span>
                    </a>
                  </div>
                </div>

                {/* AI Summary Rationale (schema ai_summary) */}
                <div className="mt-3.5 p-3 rounded-xl bg-[var(--purple-50)]/70 border border-[var(--purple-100)] text-xs text-[var(--ink)] leading-relaxed">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--purple-700)] uppercase tracking-wider mb-0.5">
                    <Sparkles className="w-3 h-3 text-[var(--purple-600)]" />
                    <span>เหตุผลที่ AI แนะนำ (AI Match Rationale):</span>
                  </div>
                  {app.summary}
                </div>

                {/* Tags & Status Buttons */}
                <div className="mt-3.5 pt-3 border-t border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {app.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-white border border-[var(--line)] text-[11px] text-[var(--ink-soft)] px-2.5 py-0.5 rounded-md font-medium"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>

                  {/* Quick Status Action Controls */}
                  <div className="flex items-center gap-1.5 flex-shrink-0 text-xs">
                    <span className="text-[11px] text-[var(--ink-faint)] mr-1">เปลี่ยนสถานะ:</span>
                    <button
                      onClick={() => handleUpdateStatus(app.id, "accepted")}
                      className={`px-2.5 py-1 rounded-md font-bold transition cursor-pointer ${
                        app.status === "accepted"
                          ? "bg-emerald-600 text-white"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                      }`}
                      title="รับผู้สมัครเข้าทำงาน"
                    >
                      ✓ รับงาน
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(app.id, "reviewed")}
                      className={`px-2.5 py-1 rounded-md font-bold transition cursor-pointer ${
                        app.status === "reviewed"
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                      }`}
                      title="บันทึกว่านัดสัมภาษณ์แล้ว"
                    >
                      🗓️ นัดสัมภาษณ์
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(app.id, "rejected")}
                      className={`px-2.5 py-1 rounded-md font-bold transition cursor-pointer ${
                        app.status === "rejected"
                          ? "bg-rose-600 text-white"
                          : "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                      }`}
                      title="ปฏิเสธใบสมัคร"
                    >
                      ✕ ปฏิเสธ
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-[var(--line)] p-8">
            <Users className="w-12 h-12 text-[var(--ink-faint)] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[var(--ink)]">ไม่พบผู้สมัครในสถานะนี้</h3>
            <p className="text-xs text-[var(--ink-soft)] mt-1">
              ลองเลือกแท็บสถานะ "ทั้งหมด" เพื่อดูผู้สมัครทุกราย
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
