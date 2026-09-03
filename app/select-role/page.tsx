"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserCheck, Building2, ArrowRight, Sparkles, User, Briefcase } from "lucide-react";

export default function SelectRolePage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // Retrieve registered user data from localStorage
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

  return (
    <div className="min-h-screen bg-[var(--page-bg)] p-4 sm:p-6 md:p-10 flex flex-col justify-center items-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-[var(--shadow)] border border-[var(--line)]">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/logo-auth.png"
              alt="JobGist Logo"
              width={280}
              height={65}
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-xs"
              priority
            />
          </div>
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
            ✓ ลงทะเบียนสำเร็จ
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
            ยินดีต้อนรับ{userName ? ` คุณ${userName}` : ""} 
          </h1>
          <p className="text-sm sm:text-base text-[var(--ink-soft)] mt-1 max-w-md">
            กรุณาเลือกประเภทการใช้งานที่คุณต้องการ เพื่อเข้าสู่หน้าจอที่เหมาะสมกับคุณ
          </p>
        </div>

        {/* 2 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {/* Card 1: Worker */}
          <div
            onClick={() => router.push("/worker")}
            className="group relative bg-white border-2 border-[var(--line)] hover:border-[var(--purple-600)] hover:bg-[var(--purple-50)]/40 rounded-3xl p-6 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--purple-100)] text-[var(--purple-700)] flex items-center justify-center group-hover:scale-110 transition duration-200 shadow-xs">
                <UserCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-extrabold text-[var(--ink)] group-hover:text-[var(--purple-700)] transition">
                    ฉันต้องการหางาน
                  </h3>
                  <span className="bg-[var(--purple-100)] text-[var(--purple-700)] text-[10px] font-bold px-2 py-0.5 rounded-md">
                    คนหางาน
                  </span>
                </div>
                <p className="text-xs text-[var(--ink-soft)] mt-2 leading-relaxed">
                  สร้างโปรไฟล์ง่ายๆ ด้วย AI ไม่ต้องพิมพ์เรซูเม่ แนบรูปใบรับรอง
                  และค้นหางานใกล้บ้านพร้อมคะแนนความเหมาะสม
                </p>
              </div>
              <ul className="text-xs text-[var(--ink)] space-y-1.5 font-medium pt-1">
                <li className="flex items-center gap-1.5 text-emerald-700">
                  <span>✓</span> AI ช่วยสังเคราะห์โปรไฟล์ภาษาไทย
                </li>
                <li className="flex items-center gap-1.5 text-emerald-700">
                  <span>✓</span> แผนที่ค้นหางานใกล้บ้าน
                </li>
                <li className="flex items-center gap-1.5 text-emerald-700">
                  <span>✓</span> สมัครงานด้วย 1 คลิก
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between text-[var(--purple-700)] font-bold text-xs">
              <span>เข้าสู่หน้าจอคนหางาน (/worker)</span>
              <div className="w-8 h-8 rounded-full bg-[var(--purple-600)] text-white flex items-center justify-center group-hover:translate-x-1 transition">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 2: Employer */}
          <div
            onClick={() => router.push("/employer")}
            className="group relative bg-white border-2 border-[var(--line)] hover:border-[var(--purple-600)] hover:bg-[var(--purple-50)]/40 rounded-3xl p-6 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-110 transition duration-200 shadow-xs">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-extrabold text-[var(--ink)] group-hover:text-[var(--purple-700)] transition">
                    ฉันเป็นผู้ประกอบการ
                  </h3>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    เจ้าของร้าน / SME
                  </span>
                </div>
                <p className="text-xs text-[var(--ink-soft)] mt-2 leading-relaxed">
                  โพสต์รับสมัครงานด้วยภาษาพูดธรรมดา AI ช่วยจัดรูปแบบประกาศ
                  พร้อมคัดกรองผู้สมัครด้วย AI Fit Score และสรุปเหตุผลให้ทันที
                </p>
              </div>
              <ul className="text-xs text-[var(--ink)] space-y-1.5 font-medium pt-1">
                <li className="flex items-center gap-1.5 text-emerald-700">
                  <span>✓</span> โพสต์งานภาษาพูด AI จัดรูปแบบให้
                </li>
                <li className="flex items-center gap-1.5 text-emerald-700">
                  <span>✓</span> คะแนนความเหมาะสมผู้สมัคร (Fit Score)
                </li>
                <li className="flex items-center gap-1.5 text-emerald-700">
                  <span>✓</span> โทรติดต่อคนหางานในพื้นที่ได้ทันที
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between text-[var(--purple-700)] font-bold text-xs">
              <span>เข้าสู่หน้าจอผู้ประกอบการ (/employer)</span>
              <div className="w-8 h-8 rounded-full bg-[var(--purple-600)] text-white flex items-center justify-center group-hover:translate-x-1 transition">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Back / Re-register Link */}
        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs text-[var(--ink-soft)] hover:text-[var(--purple-700)] font-semibold transition"
          >
            ← แก้ไขข้อมูลลงทะเบียน
          </Link>
        </div>
      </div>
    </div>
  );
}
