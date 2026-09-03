"use client";

import React, { useState } from "react";
import {
  X,
  Building,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Send,
  Phone,
} from "lucide-react";
import { JobItem } from "../worker/WorkerJobSearch";

interface JobDetailModalProps {
  job: JobItem | null;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
}) => {
  const [applied, setApplied] = useState(false);

  if (!job) return null;

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

        {/* Header Badge */}
        <div className="inline-flex items-center gap-1.5 bg-[var(--purple-100)] text-[var(--purple-700)] text-xs font-bold px-3 py-1 rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ตรงกับโปรไฟล์คุณ {job.matchScore}%</span>
        </div>

        {/* Title & Company */}
        <h2 className="text-xl font-extrabold text-[var(--ink)] pr-8">
          {job.title}
        </h2>
        <div className="text-sm font-semibold text-[var(--purple-700)] mt-1 flex items-center gap-2">
          <Building className="w-4 h-4" />
          <span>{job.company}</span>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="bg-[var(--purple-50)] rounded-2xl p-3 border border-[var(--purple-100)]">
            <div className="text-[11px] text-[var(--ink-soft)] font-medium">
              ค่าตอบแทน
            </div>
            <div className="text-sm font-bold text-emerald-600 mt-0.5">
              {job.salary}
            </div>
          </div>
          <div className="bg-[var(--purple-50)] rounded-2xl p-3 border border-[var(--purple-100)]">
            <div className="text-[11px] text-[var(--ink-soft)] font-medium">
              สถานที่ / ระยะทาง
            </div>
            <div className="text-sm font-bold text-[var(--ink)] mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[var(--purple-600)]" />
              <span>
                {job.location} ({job.distance})
              </span>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-2 mb-4">
          <h4 className="text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
            รายละเอียดงาน
          </h4>
          <p className="text-xs text-[var(--ink)] leading-relaxed bg-zinc-50 p-3.5 rounded-xl border border-[var(--line)]">
            {job.description}
          </p>
        </div>

        {/* Tags */}
        <div className="space-y-2 mb-6">
          <h4 className="text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
            สวัสดิการและเงื่อนไข
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {job.tags.map((t, idx) => (
              <span
                key={idx}
                className="bg-white border border-[var(--line)] text-xs text-[var(--ink-soft)] px-3 py-1 rounded-lg font-medium"
              >
                ✓ {t}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-[var(--line)] flex items-center gap-3">
          <button
            onClick={() => setApplied(true)}
            disabled={applied}
            className={`flex-1 py-3 rounded-full font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
              applied
                ? "bg-emerald-600 text-white"
                : "bg-[var(--purple-600)] hover:bg-[var(--purple-700)] text-white active:scale-98"
            }`}
          >
            {applied ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>ยื่นโปรไฟล์เรียบร้อยแล้ว ✓</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>สมัครงานด้วยโปรไฟล์ AI (1 คลิก)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
