"use client";

import React from "react";
import Image from "next/image";
import { Bell, Search, Menu, PlusCircle, Sparkles } from "lucide-react";

interface TopbarProps {
  role: "worker" | "employer";
  setRole: (role: "worker" | "employer") => void;
  onNavigate: (page: string) => void;
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  onToggleMobileMenu?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  role,
  setRole,
  onNavigate,
  onOpenNotifications,
  onOpenSearch,
  onToggleMobileMenu,
}) => {
  const isWorker = role === "worker";

  return (
    <header className="bg-gradient-to-r from-[var(--purple-700)] to-[var(--purple-600)] px-6 py-4 md:px-8 md:py-5 flex items-center justify-between text-white shadow-md">
      {/* Brand Logo & Mobile Toggle */}
      <div className="flex items-center gap-3 md:gap-4">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-xl bg-white/15 hover:bg-white/25 transition text-white"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none"
          onClick={() => onNavigate(isWorker ? "worker-home" : "emp-home")}
        >
          <div className="bg-white px-3.5 py-1.5 rounded-xl shadow-sm flex items-center justify-center hover:opacity-95 transition">
            <Image
              src="/logo.png"
              alt="JobGist"
              width={110}
              height={32}
              className="h-7 w-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Role Toggle Switcher */}
      <div className="hidden sm:flex items-center bg-white/15 backdrop-blur-sm p-1 rounded-full border border-white/20 shadow-inner">
        <button
          id="btn-worker"
          onClick={() => {
            setRole("worker");
            onNavigate("worker-home");
          }}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
            isWorker
              ? "bg-white text-[var(--purple-700)] shadow-sm scale-100"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          มุมมองคนหางาน
        </button>
        <button
          id="btn-employer"
          onClick={() => {
            setRole("employer");
            onNavigate("emp-home");
          }}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
            !isWorker
              ? "bg-white text-[var(--purple-700)] shadow-sm scale-100"
              : "text-white/80 hover:text-white hover:bg-white/10"
          }`}
        >
          มุมมองผู้ประกอบการ
        </button>
      </div>

      {/* Top Right Action Buttons */}
      <div className="flex items-center gap-2 md:gap-3.5">
        <button
          onClick={onOpenNotifications}
          className="relative w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition cursor-pointer"
          aria-label="แจ้งเตือน"
          title="การแจ้งเตือน"
        >
          <Bell className="w-4 h-4 md:w-4.5 md:h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--amber)] ring-2 ring-[var(--purple-600)]" />
        </button>

        <button
          onClick={onOpenSearch}
          className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition cursor-pointer"
          aria-label="ค้นหา"
          title="ค้นหา"
        >
          <Search className="w-4 h-4 md:w-4.5 md:h-4.5" />
        </button>

        <button
          id="cta-btn"
          onClick={() => onNavigate(isWorker ? "worker-profile" : "emp-post")}
          className="bg-white text-[var(--purple-700)] hover:bg-purple-50 active:scale-95 transition-all duration-150 px-4 py-2 md:px-5 md:py-2.5 rounded-full font-semibold text-xs md:text-sm shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          {isWorker ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-[var(--purple-600)]" />
              <span>สร้างโปรไฟล์</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-3.5 h-3.5 text-[var(--purple-600)]" />
              <span>โพสต์งานใหม่</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
