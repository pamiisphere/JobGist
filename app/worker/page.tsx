"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Topbar } from "@/components/Topbar";
import { Sidebar } from "@/components/Sidebar";
import { WorkerHome } from "@/components/worker/WorkerHome";
import { WorkerProfile } from "@/components/worker/WorkerProfile";
import { WorkerJobSearch, JobItem } from "@/components/worker/WorkerJobSearch";
import { JobDetailModal } from "@/components/modals/JobDetailModal";
import { NotificationsModal } from "@/components/modals/NotificationsModal";
import { Search, X, Globe, Bell, Shield, ArrowLeft } from "lucide-react";

export default function WorkerPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<string>("worker-home");
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userName, setUserName] = useState<string>("ป้าแดง");

  useEffect(() => {
    const savedUser = localStorage.getItem("jobgist_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed.fullName) {
          setUserName(parsed.fullName);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleNavigate = (page: string) => {
    if (page.startsWith("emp-")) {
      router.push("/employer");
      return;
    }
    setCurrentPage(page);
  };

  const handleRoleChange = (role: "worker" | "employer") => {
    if (role === "employer") {
      router.push("/employer");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--page-bg)] p-3 sm:p-5 md:p-7 flex flex-col justify-center">
      <div className="app-container flex flex-col min-h-[90vh]">
        {/* Topbar */}
        <Topbar
          role="worker"
          setRole={handleRoleChange}
          onNavigate={handleNavigate}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Body Layout */}
        <div className="flex flex-1 min-h-0 bg-white">
          {/* Sidebar */}
          <Sidebar
            role="worker"
            currentPage={currentPage}
            onNavigate={handleNavigate}
            isOpenMobile={isMobileMenuOpen}
            onCloseMobile={() => setIsMobileMenuOpen(false)}
            userName={userName}
          />

          {/* Main Content */}
          <main className="flex-1 p-5 sm:p-7 md:p-10 min-w-0 overflow-y-auto bg-zinc-50/40">
            {currentPage === "worker-home" && (
              <WorkerHome
                userName={userName}
                onNavigate={handleNavigate}
                onSelectJob={(title) => {
                  setSelectedJob({
                    id: "job-quick",
                    title,
                    category: "maid",
                    location: "ลาดพร้าว",
                    distance: "1.2 กม.",
                    salary: "12,000 บาท/เดือน",
                    matchScore: 92,
                    tags: ["จ.-ศ.", "08:00-17:00", "มีประกันสังคม"],
                    company: "บริษัท เอ็กซ์เพรส ออฟฟิศ จำกัด",
                    description:
                      "ต้องการแม่บ้านประจำ ดูแลความสะอาดพื้นที่สำนักงาน 3 ชั้น มีอาหารกลางวันและประกันสังคม",
                    mapPos: { top: "40%", left: "35%" },
                  });
                }}
              />
            )}

            {currentPage === "worker-profile" && <WorkerProfile userName={userName} />}

            {currentPage === "worker-jobs" && (
              <WorkerJobSearch onSelectJob={(job) => setSelectedJob(job)} />
            )}

            {currentPage === "worker-settings" && (
              <div className="view-enter space-y-6 max-w-2xl bg-white p-7 rounded-[var(--radius-lg)] border border-[var(--line)] shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-[var(--ink)]">
                      ตั้งค่าบัญชีคนหางาน
                    </h1>
                    <p className="text-xs text-[var(--ink-soft)]">
                      ผู้ใช้งาน: {userName}
                    </p>
                  </div>
                  <button
                    onClick={() => router.push("/select-role")}
                    className="text-xs text-[var(--purple-700)] bg-[var(--purple-50)] hover:bg-[var(--purple-100)] border border-[var(--purple-200)] px-3 py-1.5 rounded-full font-bold transition cursor-pointer"
                  >
                    สลับบทบาทผู้ใช้
                  </button>
                </div>
                <hr className="border-t border-[var(--line)]" />
                <div className="space-y-4 text-xs text-[var(--ink)]">
                  <div className="flex items-center justify-between p-3.5 bg-[var(--purple-50)] rounded-xl border border-[var(--purple-100)]">
                    <div>
                      <div className="font-bold">สถานะเปิดรับงาน</div>
                      <div className="text-[11px] text-[var(--ink-soft)]">
                        ให้ร้านค้าค้นหาและติดต่อคุณได้ทันที
                      </div>
                    </div>
                    <span className="bg-emerald-600 text-white font-bold text-[11px] px-3 py-1 rounded-full">
                      เปิดใช้งาน
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3.5 border border-[var(--line)] rounded-xl">
                    <div>
                      <div className="font-bold">ภาษาที่ใช้งาน</div>
                      <div className="text-[11px] text-[var(--ink-soft)]">
                        ภาษาไทย (Thai)
                      </div>
                    </div>
                    <Globe className="w-4 h-4 text-[var(--purple-600)]" />
                  </div>
                  <div className="flex items-center justify-between p-3.5 border border-[var(--line)] rounded-xl">
                    <div>
                      <div className="font-bold">การแจ้งเตือนงานใกล้บ้าน</div>
                      <div className="text-[11px] text-[var(--ink-soft)]">
                        แจ้งเตือนเมื่องานใหม่อยู่ในรัศมี 5 กม.
                      </div>
                    </div>
                    <Bell className="w-4 h-4 text-[var(--purple-600)]" />
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modals */}
      <JobDetailModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />

      <NotificationsModal
        role="worker"
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-[var(--line)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
                <Search className="w-4 h-4 text-[var(--purple-600)]" />
                <span>ค้นหาตำแหน่งงาน / ทักษะ</span>
              </h3>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 rounded-full hover:bg-zinc-100 text-[var(--ink-soft)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="เช่น แม่บ้าน, ลาดพร้าว, 12000..."
                className="w-full pl-4 pr-10 py-3 border border-[var(--line)] focus:border-[var(--purple-600)] focus:ring-2 focus:ring-[var(--purple-100)] rounded-2xl text-xs text-[var(--ink)] outline-none"
                autoFocus
              />
              <Search className="w-4 h-4 text-[var(--ink-faint)] absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-[var(--ink-soft)]">
              <span className="font-semibold text-[var(--ink-faint)]">
                คำค้นหายอดนิยม:
              </span>
              <button
                onClick={() => {
                  setSearchQuery("แม่บ้าน");
                  setIsSearchOpen(false);
                  setCurrentPage("worker-jobs");
                }}
                className="bg-[var(--purple-50)] text-[var(--purple-700)] px-2.5 py-1 rounded-full border border-[var(--purple-100)] hover:bg-[var(--purple-100)]"
              >
                แม่บ้าน
              </button>
              <button
                onClick={() => {
                  setSearchQuery("ลาดพร้าว");
                  setIsSearchOpen(false);
                  setCurrentPage("worker-jobs");
                }}
                className="bg-[var(--purple-50)] text-[var(--purple-700)] px-2.5 py-1 rounded-full border border-[var(--purple-100)] hover:bg-[var(--purple-100)]"
              >
                ลาดพร้าว
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
