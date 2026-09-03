"use client";

import React from "react";
import {
  Home,
  User,
  MapPin,
  Settings,
  FileEdit,
  Users,
  Building2,
  Briefcase,
  X,
} from "lucide-react";

interface SidebarProps {
  role: "worker" | "employer";
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  userName?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  role,
  currentPage,
  onNavigate,
  isOpenMobile = false,
  onCloseMobile,
  userName,
}) => {
  const isWorker = role === "worker";
  const displayName = userName || (isWorker ? "คุณสมชาย" : "ร้านอาหารสมศรี");
  const avatarInitials = displayName.slice(0, 2);

  const workerNavItems = [
    { id: "worker-home", label: "หน้าหลัก", icon: Home },
    { id: "worker-profile", label: "สร้าง/แก้ไขโปรไฟล์", icon: User },
    { id: "worker-jobs", label: "ค้นหางาน", icon: MapPin },
  ];

  const employerNavItems = [
    { id: "emp-home", label: "แดชบอร์ด", icon: Home },
    { id: "emp-jobs", label: "จัดการประกาศงาน", icon: Briefcase },
    { id: "emp-post", label: "โพสต์งานใหม่", icon: FileEdit },
    { id: "emp-applicants", label: "ผู้สมัคร", icon: Users },
  ];

  const currentNav = isWorker ? workerNavItems : employerNavItems;

  const content = (
    <div className="w-[260px] flex-shrink-0 p-6 border-r border-[var(--line)] flex flex-col justify-between h-full bg-white">
      <div>
        {/* Mobile close header */}
        <div className="md:hidden flex items-center justify-between pb-4 mb-2 border-b border-[var(--line)]">
          <span className="font-bold text-[var(--purple-700)] text-base">
            เมนูหลัก
          </span>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg hover:bg-zinc-100 text-[var(--ink-soft)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="space-y-1.5">
          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-[var(--purple-600)] text-white shadow-sm font-semibold"
                    : "text-[var(--ink-soft)] hover:bg-[var(--purple-50)] hover:text-[var(--purple-700)]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-current"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Section Label: บัญชี */}
        <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-faint)] mt-6 px-3.5 mb-2">
          บัญชี
        </div>

        {/* Account Settings */}
        <button
          onClick={() => {
            onNavigate(isWorker ? "worker-settings" : "emp-settings");
            if (onCloseMobile) onCloseMobile();
          }}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 cursor-pointer ${
            currentPage.includes("settings")
              ? "bg-[var(--purple-600)] text-white font-semibold"
              : "text-[var(--ink-soft)] hover:bg-[var(--purple-50)] hover:text-[var(--purple-700)]"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>{isWorker ? "ตั้งค่าบัญชี" : "ตั้งค่าร้าน"}</span>
        </button>
      </div>

      {/* Sidebar Footer: User Card */}
      <div className="pt-5 border-t border-[var(--line)] mt-6">
        <div className="flex items-center gap-3 p-2 rounded-2xl bg-[var(--purple-50)] border border-[var(--purple-100)]">
          <div className="w-9 h-9 rounded-full bg-[var(--purple-600)] text-white flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
            {isWorker ? avatarInitials : <Building2 className="w-4 h-4" />}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-[var(--ink)] truncate">
              {displayName}
            </div>
            <div className="text-[11px] text-[var(--ink-soft)] truncate">
              {isWorker ? "คนหางาน · กรุงเทพฯ" : "ผู้ประกอบการ · SME"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block">{content}</aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 w-[270px] bg-white h-full shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
