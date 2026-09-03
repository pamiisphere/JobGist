"use client";

import React, { useState } from "react";
import {
  X,
  Phone,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  MapPin,
  Calendar,
  UserCheck,
  Clock,
  XCircle,
} from "lucide-react";
import { ApplicantItem } from "../employer/EmployerApplicants";

interface ApplicantDetailModalProps {
  applicant: ApplicantItem | null;
  onClose: () => void;
  onUpdateStatus?: (id: string, newStatus: "pending" | "reviewed" | "accepted" | "rejected") => void;
}

export const ApplicantDetailModal: React.FC<ApplicantDetailModalProps> = ({
  applicant,
  onClose,
  onUpdateStatus,
}) => {
  const [called, setCalled] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<"pending" | "reviewed" | "accepted" | "rejected">(
    applicant?.status || "pending"
  );

  if (!applicant) return null;

  const handleStatusChange = (newStatus: "pending" | "reviewed" | "accepted" | "rejected") => {
    setCurrentStatus(newStatus);
    if (onUpdateStatus) {
      onUpdateStatus(applicant.id, newStatus);
    }
  };

  const statusBadge =
    currentStatus === "accepted"
      ? { label: "✓ รับเข้าทำงานแล้ว (Accepted)", style: "bg-emerald-100 text-emerald-800 border-emerald-300" }
      : currentStatus === "reviewed"
      ? { label: "🗓️ นัดสัมภาษณ์แล้ว (Reviewed)", style: "bg-blue-100 text-blue-800 border-blue-300" }
      : currentStatus === "rejected"
      ? { label: "✕ ปฏิเสธแล้ว (Rejected)", style: "bg-rose-100 text-rose-800 border-rose-300" }
      : { label: "⏳ รอพิจารณา (Pending)", style: "bg-amber-100 text-amber-800 border-amber-300" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-[var(--line)] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-zinc-100 text-[var(--ink-soft)] cursor-pointer transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className="fit-score shadow-md flex-shrink-0"
            style={{ "--pct": `${applicant.fitScore}%` } as React.CSSProperties}
          >
            <span>{applicant.fitScore}%</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-[var(--ink)]">
                {applicant.name}
              </h2>
            </div>
            <div className="text-xs font-semibold text-[var(--purple-700)] mt-0.5">
              {applicant.role} · {applicant.experience}
            </div>
            <div className="text-[11px] text-[var(--ink-soft)] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-[var(--purple-600)]" />
              <span>ระยะทาง {applicant.distance} จากร้าน</span>
            </div>
          </div>
        </div>

        {/* Status Badge Indicator */}
        <div className="mb-4 flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 border border-[var(--line)]">
          <span className="text-xs text-[var(--ink-soft)] font-medium">สถานะการสมัคร:</span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusBadge.style}`}>
            {statusBadge.label}
          </span>
        </div>

        {/* AI Analysis Card */}
        <div className="bg-[var(--purple-50)] border border-[var(--purple-200)] rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--purple-700)] mb-1.5">
            <Sparkles className="w-4 h-4" />
            <span>บทวิเคราะห์ความเหมาะสมโดย AI (Thai LLM - Typhoon 2)</span>
          </div>
          <p className="text-xs text-[var(--ink)] leading-relaxed">
            {applicant.summary}
          </p>
        </div>

        {/* Skills and Verification */}
        <div className="space-y-2 mb-4">
          <h4 className="text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
            ทักษะและความสามารถ
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {applicant.tags.map((t, idx) => (
              <span
                key={idx}
                className="bg-zinc-50 border border-[var(--line)] text-xs text-[var(--ink)] px-3 py-1 rounded-lg font-medium"
              >
                ✓ {t}
              </span>
            ))}
          </div>
        </div>

        {/* Verified Certifications */}
        <div className="space-y-2 mb-5">
          <h4 className="text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
            เอกสารที่ผ่านการตรวจยืนยัน (OCR Verified)
          </h4>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
              <FileCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>บัตรประจำตัวประชาชน (ยืนยันตัวตนเรียบร้อย)</span>
            </div>
            {applicant.certifications &&
              applicant.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800 font-medium"
                >
                  <FileCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Application Status Action Buttons */}
        <div className="p-3.5 rounded-2xl bg-zinc-50 border border-[var(--line)] mb-4 space-y-2">
          <div className="text-xs font-bold text-[var(--ink)]">
            อัปเดตสถานะผู้สมัคร (ตาราง applications):
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleStatusChange("accepted")}
              className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
                currentStatus === "accepted"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>รับเข้าทำงาน</span>
            </button>

            <button
              onClick={() => handleStatusChange("reviewed")}
              className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
                currentStatus === "reviewed"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white border border-blue-300 text-blue-800 hover:bg-blue-50"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>นัดสัมภาษณ์</span>
            </button>

            <button
              onClick={() => handleStatusChange("rejected")}
              className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1 ${
                currentStatus === "rejected"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-white border border-rose-300 text-rose-800 hover:bg-rose-50"
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>ปฏิเสธ</span>
            </button>
          </div>
        </div>

        {/* Call Action Button */}
        <div className="pt-2 border-t border-[var(--line)]">
          <a
            href={`tel:${applicant.phone}`}
            onClick={() => setCalled(true)}
            className="w-full py-3 rounded-full bg-[var(--purple-600)] hover:bg-[var(--purple-700)] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Phone className="w-4 h-4" />
            <span>โทรติดต่อ {applicant.phone}</span>
          </a>
        </div>

        {called && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>เปิดเบอร์ติดต่อและบันทึกการติดต่อเข้าสู่ระบบแล้ว</span>
          </div>
        )}
      </div>
    </div>
  );
};
