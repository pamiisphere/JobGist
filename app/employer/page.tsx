"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Topbar } from "@/components/Topbar";
import { Sidebar } from "@/components/Sidebar";
import { EmployerHome } from "@/components/employer/EmployerHome";
import { EmployerPostJob } from "@/components/employer/EmployerPostJob";
import { EmployerJobsManagement } from "@/components/employer/EmployerJobsManagement";
import { EmployerSettings } from "@/components/employer/EmployerSettings";
import {
  EmployerApplicants,
  ApplicantItem,
} from "@/components/employer/EmployerApplicants";
import { ApplicantDetailModal } from "@/components/modals/ApplicantDetailModal";
import { NotificationsModal } from "@/components/modals/NotificationsModal";
import { Search, X, Building, Shield, Bell } from "lucide-react";

export default function EmployerPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<string>("emp-home");
  const [selectedApplicant, setSelectedApplicant] =
    useState<ApplicantItem | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userName, setUserName] = useState<string>("ร้านอาหารสมศรี");

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
    if (page.startsWith("worker-")) {
      router.push("/worker");
      return;
    }
    setCurrentPage(page);
  };

  const handleRoleChange = (role: "worker" | "employer") => {
    if (role === "worker") {
      router.push("/worker");
    }
  };

  const handleUpdateApplicantStatus = (
    id: string,
    newStatus: "pending" | "reviewed" | "accepted" | "rejected"
  ) => {
    if (selectedApplicant && selectedApplicant.id === id) {
      setSelectedApplicant({ ...selectedApplicant, status: newStatus });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--page-bg)] p-3 sm:p-5 md:p-7 flex flex-col justify-center">
      <div className="app-container flex flex-col min-h-[90vh]">
        {/* Topbar */}
        <Topbar
          role="employer"
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
            role="employer"
            currentPage={currentPage}
            onNavigate={handleNavigate}
            isOpenMobile={isMobileMenuOpen}
            onCloseMobile={() => setIsMobileMenuOpen(false)}
            userName={userName}
          />

          {/* Main Content */}
          <main className="flex-1 p-5 sm:p-7 md:p-10 min-w-0 overflow-y-auto bg-zinc-50/40">
            {currentPage === "emp-home" && (
              <EmployerHome
                userName={userName}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === "emp-jobs" && (
              <EmployerJobsManagement onNavigate={handleNavigate} />
            )}

            {currentPage === "emp-post" && <EmployerPostJob />}

            {currentPage === "emp-applicants" && (
              <EmployerApplicants
                onSelectApplicant={(app) => setSelectedApplicant(app)}
                onUpdateApplicantStatus={handleUpdateApplicantStatus}
              />
            )}

            {currentPage === "emp-settings" && (
              <EmployerSettings
                userName={userName}
                onSaveSuccess={(newName) => setUserName(newName)}
              />
            )}
          </main>
        </div>
      </div>

      {/* Modals */}
      <ApplicantDetailModal
        applicant={selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
        onUpdateStatus={handleUpdateApplicantStatus}
      />

      <NotificationsModal
        role="employer"
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
                <span>ค้นหาผู้สมัคร / ทักษะ</span>
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
                placeholder="เช่น เสิร์ฟอาหาร, ลาดพร้าว, มีประสบการณ์..."
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
                  setSearchQuery("พนักงานเสิร์ฟ");
                  setIsSearchOpen(false);
                  setCurrentPage("emp-applicants");
                }}
                className="bg-[var(--purple-50)] text-[var(--purple-700)] px-2.5 py-1 rounded-full border border-[var(--purple-100)] hover:bg-[var(--purple-100)]"
              >
                พนักงานเสิร์ฟ
              </button>
              <button
                onClick={() => {
                  setSearchQuery("ผู้ช่วยครัว");
                  setIsSearchOpen(false);
                  setCurrentPage("emp-applicants");
                }}
                className="bg-[var(--purple-50)] text-[var(--purple-700)] px-2.5 py-1 rounded-full border border-[var(--purple-100)] hover:bg-[var(--purple-100)]"
              >
                ผู้ช่วยครัว
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
