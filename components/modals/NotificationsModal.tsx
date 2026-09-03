"use client";

import React from "react";
import { X, Bell, Sparkles, MessageSquare, Briefcase, Check } from "lucide-react";

interface NotificationsModalProps {
  role: "worker" | "employer";
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  role,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const workerNotifications = [
    {
      id: "1",
      title: "ร้านอาหารสมศรี สนใจโปรไฟล์ของคุณ",
      desc: "ร้านค้าเปิดดูโปรไฟล์และต้องการติดต่อสัมภาษณ์ตำแหน่งแม่บ้าน/ช่วยงาน",
      time: "10 นาทีที่แล้ว",
      icon: MessageSquare,
      unread: true,
    },
    {
      id: "2",
      title: "มีงานใหม่ตรงกับโปรไฟล์คุณ 92%",
      desc: "แม่บ้านประจำออฟฟิศ ย่านลาดพร้าว (ห่างจากคุณ 1.2 กม.)",
      time: "1 ชั่วโมงที่แล้ว",
      icon: Sparkles,
      unread: true,
    },
    {
      id: "3",
      title: "โปรไฟล์ AI อัปเดตสมบูรณ์",
      desc: "ระบบดึงข้อมูลจากใบเซอร์ของคุณและอัปเดตแท็กทักษะเรียบร้อยแล้ว",
      time: "เมื่อวานนี้",
      icon: Check,
      unread: false,
    },
  ];

  const employerNotifications = [
    {
      id: "1",
      title: "มีผู้สมัครใหม่ 2 คนในตำแหน่ง พนักงานเสิร์ฟ",
      desc: "สมชาย ตั้งใจทำ (Fit Score 94%) และ นิดา พูลสวัสดิ์ (Fit Score 81%)",
      time: "15 นาทีที่แล้ว",
      icon: Sparkles,
      unread: true,
    },
    {
      id: "2",
      title: "AI สรุปรายงานการสมัครงานประจำสัปดาห์",
      desc: "มีผู้สนใจประกาศงานของคุณรวม 27 คน อัตราตอบรับเร็วขึ้น 30%",
      time: "3 ชั่วโมงที่แล้ว",
      icon: Briefcase,
      unread: true,
    },
  ];

  const notifs = role === "worker" ? workerNotifications : employerNotifications;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-[var(--line)] max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--line)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--purple-100)] text-[var(--purple-700)] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[var(--ink)]">
              การแจ้งเตือน
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 text-[var(--ink-soft)] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {notifs.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className={`p-3.5 rounded-2xl border transition ${
                  n.unread
                    ? "bg-[var(--purple-50)]/70 border-[var(--purple-200)]"
                    : "bg-white border-[var(--line)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white shadow-2xs border border-[var(--line)] flex items-center justify-center text-[var(--purple-600)] flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[var(--ink)]">
                      {n.title}
                    </div>
                    <div className="text-[11px] text-[var(--ink-soft)] mt-0.5 leading-relaxed">
                      {n.desc}
                    </div>
                    <div className="text-[10px] text-[var(--ink-faint)] mt-1.5 font-medium">
                      {n.time}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 pt-3 border-t border-[var(--line)]">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-[var(--ink)] transition cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
