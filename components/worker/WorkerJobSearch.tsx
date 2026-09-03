"use client";

import React, { useState } from "react";
import {
  Home,
  Factory,
  Package,
  UtensilsCrossed,
  DollarSign,
  Navigation,
  MapPin,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export interface JobItem {
  id: string;
  title: string;
  category: string;
  location: string;
  distance: string;
  salary: string;
  matchScore: number;
  tags: string[];
  company: string;
  description: string;
  mapPos: { top: string; left: string };
}

interface WorkerJobSearchProps {
  onSelectJob: (job: JobItem) => void;
}

export const WorkerJobSearch: React.FC<WorkerJobSearchProps> = ({
  onSelectJob,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activePinId, setActivePinId] = useState<string | null>(null);

  const filters = [
    { id: "all", label: "งานทั้งหมด", emoji: "✨" },
    { id: "maid", label: "งานบ้าน", emoji: "🏡" },
    { id: "factory", label: "โรงงาน", emoji: "🏭" },
    { id: "warehouse", label: "คลังสินค้า", emoji: "📦" },
    { id: "restaurant", label: "ร้านอาหาร", emoji: "🍽️" },
    { id: "highest_pay", label: "เงินเดือนสูงสุด", emoji: "💵" },
    { id: "nearest", label: "ใกล้ที่สุด", emoji: "📍" },
  ];

  const allJobs: JobItem[] = [
    {
      id: "job-1",
      title: "แม่บ้านประจำออฟฟิศ",
      category: "maid",
      location: "ลาดพร้าว",
      distance: "1.2 กม.",
      salary: "12,000 บาท/เดือน",
      matchScore: 92,
      tags: ["ทำงาน จ.-ศ.", "08:00-17:00", "มีประกันสังคม", "มีอาหารกลางวัน"],
      company: "บริษัท เอ็กซ์เพรส ออฟฟิศ จำกัด",
      description:
        "ต้องการแม่บ้านดูแลความสะอาดพื้นที่สำนักงาน 3 ชั้น กวาด ถู ดูดฝุ่น ล้างห้องน้ำ และจัดเตรียมห้องประชุม",
      mapPos: { top: "40%", left: "35%" },
    },
    {
      id: "job-2",
      title: "พนักงานทำความสะอาดโรงแรม",
      category: "maid",
      location: "รัชดา",
      distance: "3.5 กม.",
      salary: "380 บาท/วัน",
      matchScore: 85,
      tags: ["กะเช้า-บ่าย", "เบี้ยขยัน", "มียูนิฟอร์ม"],
      company: "โรงแรม เดอะ การ์เดน สวีท",
      description:
        "ทำความสะอาดห้องพัก ปูเตียง เปลี่ยนผ้าปู และทำความสะอาดบริเวณล็อบบี้โรงแรม",
      mapPos: { top: "60%", left: "55%" },
    },
    {
      id: "job-3",
      title: "แม่บ้านรายวัน (พาร์ทไทม์)",
      category: "maid",
      location: "บางกะปิ",
      distance: "4.1 กม.",
      salary: "400 บาท/วัน",
      matchScore: 78,
      tags: ["สัปดาห์ละ 3 วัน", "รับเงินสดรายวัน", "เลือกวันได้"],
      company: "บ้านเดี่ยว นวธานี",
      description:
        "ทำความสะอาดบ้านเดี่ยว 2 ชั้น ซักรีดเสื้อผ้า สัปดาห์ละ 3 วัน (จันทร์ พุธ ศุกร์)",
      mapPos: { top: "30%", left: "65%" },
    },
    {
      id: "job-4",
      title: "ผู้ช่วยดูแลผู้สูงอายุ",
      category: "maid",
      location: "วังทองหลาง",
      distance: "5.0 กม.",
      salary: "15,000 บาท/เดือน",
      matchScore: 74,
      tags: ["มีที่พักให้", "ดูแลผู้สูงอายุเดินได้", "ทำงาน จ.-ส."],
      company: "ครอบครัววัฒนา",
      description:
        "ดูแลคุณยายอายุ 75 ปี (ช่วยเหลือตัวเองได้) เตรียมอาหาร ยา และพูดคุยเป็นเพื่อน",
      mapPos: { top: "25%", left: "45%" },
    },
    {
      id: "job-5",
      title: "พนักงานแพ็คสินค้าคลัง",
      category: "warehouse",
      location: "บึงกุ่ม",
      distance: "5.8 กม.",
      salary: "420 บาท/วัน",
      matchScore: 72,
      tags: ["กะปกติ", "มีโอที", "ไม่จำกัดวุฒิ"],
      company: "คลังสินค้า สยามโลจิสติกส์",
      description:
        "แพ็คสินค้าลงกล่อง ติดป้ายบาร์โค้ด และจัดเรียงสินค้าตามออเดอร์",
      mapPos: { top: "75%", left: "70%" },
    },
    {
      id: "job-6",
      title: "พนักงานเสิร์ฟและช่วยงานหน้าร้าน",
      category: "restaurant",
      location: "ลาดพร้าว",
      distance: "2.1 กม.",
      salary: "12,000 บาท/เดือน",
      matchScore: 70,
      tags: ["กะเย็น", "มีทิปรวม", "อาหารฟรี 2 มื้อ"],
      company: "ร้านอาหารสมศรี",
      description:
        "รับออเดอร์ เสิร์ฟอาหาร ดูแลความสะอาดโต๊ะ และบริการลูกค้าอย่างสุภาพ",
      mapPos: { top: "48%", left: "30%" },
    },
  ];

  const filteredJobs = allJobs
    .filter((job) => {
      if (selectedFilter === "all") return true;
      if (selectedFilter === "maid") return job.category === "maid";
      if (selectedFilter === "factory") return job.category === "factory";
      if (selectedFilter === "warehouse") return job.category === "warehouse";
      if (selectedFilter === "restaurant") return job.category === "restaurant";
      if (selectedFilter === "highest_pay") return true;
      if (selectedFilter === "nearest") return true;
      return true;
    })
    .sort((a, b) => {
      if (selectedFilter === "highest_pay") return b.matchScore - a.matchScore;
      if (selectedFilter === "nearest")
        return parseFloat(a.distance) - parseFloat(b.distance);
      return b.matchScore - a.matchScore;
    });

  return (
    <div className="view-enter space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
          ค้นหางานใกล้คุณ
        </h1>
        <p className="text-sm md:text-base text-[var(--ink-soft)]">
          เลือกตัวกรองด้วยไอคอน ไม่ต้องพิมพ์ค้นหา
        </p>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
        {filters.map((f) => {
          const isSel = selectedFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                isSel
                  ? "bg-[var(--purple-50)] border-[var(--purple-600)] text-[var(--purple-700)] shadow-xs"
                  : "bg-white border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--purple-50)]/60"
              }`}
            >
              <span>{f.emoji}</span>
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Job Cards List (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[var(--ink)]">
              งานที่พบ ({filteredJobs.length})
            </h3>
            <span className="text-xs text-[var(--ink-soft)]">
              เรียงตามความเหมาะสม AI
            </span>
          </div>

          <hr className="border-t border-[var(--line)] my-4" />

          {/* Job Rows */}
          <div className="space-y-3">
            {filteredJobs.map((job) => {
              const isHovered = activePinId === job.id;
              return (
                <div
                  key={job.id}
                  onMouseEnter={() => setActivePinId(job.id)}
                  onMouseLeave={() => setActivePinId(null)}
                  onClick={() => onSelectJob(job)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                    isHovered
                      ? "border-[var(--purple-600)] bg-[var(--purple-50)]/70 shadow-sm translate-x-1"
                      : "border-[var(--line)] hover:border-[var(--purple-500)] hover:bg-[var(--purple-50)]/40"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[var(--ink)]">
                        {job.title}
                      </span>
                    </div>
                    <div className="text-xs text-[var(--ink-soft)] mt-1 flex items-center gap-1.5 flex-wrap">
                      <span className="font-medium text-[var(--ink)]">
                        {job.company}
                      </span>
                      <span>·</span>
                      <span>{job.location}</span>
                      <span>·</span>
                      <span>{job.distance}</span>
                      <span>·</span>
                      <span className="font-bold text-emerald-600">
                        {job.salary}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {job.tags.slice(0, 2).map((t, idx) => (
                        <span
                          key={idx}
                          className="bg-white/80 border border-[var(--line)] text-[10px] text-[var(--ink-soft)] px-2 py-0.5 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="bg-[var(--purple-100)] text-[var(--purple-700)] text-xs font-extrabold px-3 py-1.5 rounded-xl">
                      ตรง {job.matchScore}%
                    </span>
                    <ChevronRight className="w-4 h-4 text-[var(--ink-faint)]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Visual Map Card (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[var(--ink)]">
                  แผนที่งานใกล้คุณ
                </h3>
                <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                  แตะหมุดเพื่อดูงานในพื้นที่
                </p>
              </div>
              <Navigation className="w-5 h-5 text-[var(--purple-600)]" />
            </div>

            <hr className="border-t border-[var(--line)] my-4" />

            {/* Simulated Interactive Map */}
            <div className="relative rounded-2xl h-[280px] overflow-hidden bg-gradient-to-br from-[#EDEBFA] to-[#DAD6F5] border border-[var(--line)] p-4 shadow-inner">
              {/* Map grid lines simulation */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(#6C56E8 1px, transparent 1px), linear-gradient(90deg, #6C56E8 1px, transparent 1px)",
                  backgroundSize: "36px 36px",
                }}
              />

              {/* User Location Pin */}
              <div
                className="map-pin map-pin-user"
                style={{ top: "70%", left: "25%" }}
                title="ตำแหน่งของคุณ (ลาดพร้าว)"
              >
                <span className="absolute -bottom-6 -left-6 bg-[var(--ink)] text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap shadow-sm">
                  คุณอยู่ที่นี่ 📍
                </span>
              </div>

              {/* Job Pins */}
              {allJobs.map((job) => {
                const isActive = activePinId === job.id;
                return (
                  <div
                    key={job.id}
                    className="map-pin"
                    style={{
                      top: job.mapPos.top,
                      left: job.mapPos.left,
                      transform: isActive ? "scale(1.4)" : "scale(1)",
                      zIndex: isActive ? 30 : 10,
                    }}
                    onMouseEnter={() => setActivePinId(job.id)}
                    onMouseLeave={() => setActivePinId(null)}
                    onClick={() => onSelectJob(job)}
                    title={`${job.title} (${job.distance})`}
                  >
                    {isActive && (
                      <div className="absolute -top-10 -left-16 bg-white border border-[var(--purple-200)] text-[var(--purple-900)] text-[11px] font-bold px-2.5 py-1 rounded-xl whitespace-nowrap shadow-lg animate-bounce pointer-events-none">
                        {job.title} ({job.distance})
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-[var(--ink-soft)] mt-3 text-center">
              จุดสีม่วง = งานที่เปิดรับ · จุดสีเข้ม = ตำแหน่งของคุณ
            </p>
          </div>

          <div className="mt-4 p-3.5 rounded-2xl bg-[var(--purple-50)] border border-[var(--purple-100)] flex items-center justify-between text-xs text-[var(--purple-700)]">
            <span className="font-semibold">
              ค้นพบ {filteredJobs.length} ตำแหน่งในรัศมี 6 กม.
            </span>
            <span className="font-bold">อัปเดตวันนี้</span>
          </div>
        </div>
      </div>
    </div>
  );
};
