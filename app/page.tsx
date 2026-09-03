"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    lineId: "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation Rules
  const cleanPhone = formData.phone.replace(/[-\s]/g, "");

  const errors = {
    fullName:
      formData.fullName.trim().length === 0
        ? "กรุณากรอกชื่อ-นามสกุล"
        : formData.fullName.trim().length < 3
        ? "ชื่อ-นามสกุลต้องมีความยาวอย่างน้อย 3 ตัวอักษร"
        : null,
    email:
      formData.email.trim().length === 0
        ? "กรุณากรอกอีเมล"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
        ? "รูปแบบอีเมลไม่ถูกต้อง (เช่น example@gmail.com)"
        : null,
    phone:
      formData.phone.trim().length === 0
        ? "กรุณากรอกเบอร์โทรศัพท์"
        : !/^0[0-9]{9}$/.test(cleanPhone)
        ? "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลักและขึ้นต้นด้วย 0 (เช่น 0812345678)"
        : null,
  };

  const isFormValid = !errors.fullName && !errors.email && !errors.phone;

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
    });

    if (!isFormValid) return;

    setIsSubmitting(true);

    // Save to localStorage
    try {
      localStorage.setItem(
        "jobgist_user",
        JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: cleanPhone,
          lineId: formData.lineId.trim(),
          registeredAt: new Date().toISOString(),
        })
      );
    } catch (err) {
      console.error("Storage error", err);
    }

    // Redirect to select-role page
    setTimeout(() => {
      router.push("/select-role");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[var(--page-bg)] p-4 sm:p-6 md:p-10 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-[var(--shadow)] border border-[var(--line)] view-enter">
        {/* Brand Logo & Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/logo-auth.png"
              alt="JobGist Logo"
              width={260}
              height={60}
              className="h-14 sm:h-16 w-auto object-contain drop-shadow-xs"
              priority
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--ink)] tracking-tight">
            ลงทะเบียนเข้าใช้งาน
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ink-soft)] mt-1">
            กรอกข้อมูลเพื่อเริ่มต้นค้นหางานหรือรับสมัครงาน
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Field 1: Full Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[var(--ink)]">
              ชื่อ-นามสกุล <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                onBlur={() => handleBlur("fullName")}
                placeholder="เช่น สมศรี ใจดี หรือ สมชาย ตั้งใจทำ"
                className={`w-full pl-10 pr-10 py-3 rounded-2xl border text-xs sm:text-sm text-[var(--ink)] outline-none transition ${
                  touched.fullName && errors.fullName
                    ? "border-rose-400 bg-rose-50/40 focus:ring-2 focus:ring-rose-200"
                    : touched.fullName && !errors.fullName
                    ? "border-emerald-500 bg-emerald-50/20 focus:ring-2 focus:ring-emerald-100"
                    : "border-[var(--line)] focus:border-[var(--purple-600)] focus:ring-2 focus:ring-[var(--purple-100)]"
                }`}
              />
              <User className="w-4 h-4 text-[var(--ink-faint)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              {touched.fullName && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  {errors.fullName ? (
                    <AlertCircle className="w-4 h-4 text-rose-500" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
              )}
            </div>
            {touched.fullName && errors.fullName && (
              <p className="text-[11px] text-rose-600 font-medium pl-1 animate-fadeIn">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Field 2: Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[var(--ink)]">
              อีเมล <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="เช่น somchai@gmail.com"
                className={`w-full pl-10 pr-10 py-3 rounded-2xl border text-xs sm:text-sm text-[var(--ink)] outline-none transition ${
                  touched.email && errors.email
                    ? "border-rose-400 bg-rose-50/40 focus:ring-2 focus:ring-rose-200"
                    : touched.email && !errors.email
                    ? "border-emerald-500 bg-emerald-50/20 focus:ring-2 focus:ring-emerald-100"
                    : "border-[var(--line)] focus:border-[var(--purple-600)] focus:ring-2 focus:ring-[var(--purple-100)]"
                }`}
              />
              <Mail className="w-4 h-4 text-[var(--ink-faint)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              {touched.email && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  {errors.email ? (
                    <AlertCircle className="w-4 h-4 text-rose-500" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
              )}
            </div>
            {touched.email && errors.email && (
              <p className="text-[11px] text-rose-600 font-medium pl-1 animate-fadeIn">
                {errors.email}
              </p>
            )}
          </div>

          {/* Field 3: Phone */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[var(--ink)]">
              เบอร์โทรศัพท์ <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                placeholder="เช่น 0812345678 หรือ 081-234-5678"
                maxLength={12}
                className={`w-full pl-10 pr-10 py-3 rounded-2xl border text-xs sm:text-sm text-[var(--ink)] outline-none transition ${
                  touched.phone && errors.phone
                    ? "border-rose-400 bg-rose-50/40 focus:ring-2 focus:ring-rose-200"
                    : touched.phone && !errors.phone
                    ? "border-emerald-500 bg-emerald-50/20 focus:ring-2 focus:ring-emerald-100"
                    : "border-[var(--line)] focus:border-[var(--purple-600)] focus:ring-2 focus:ring-[var(--purple-100)]"
                }`}
              />
              <Phone className="w-4 h-4 text-[var(--ink-faint)] absolute left-3.5 top-1/2 -translate-y-1/2" />
              {touched.phone && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  {errors.phone ? (
                    <AlertCircle className="w-4 h-4 text-rose-500" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
              )}
            </div>
            {touched.phone && errors.phone && (
              <p className="text-[11px] text-rose-600 font-medium pl-1 animate-fadeIn">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Field 4: LINE ID */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[var(--ink)]">
                ไอดีไลน์ (LINE ID)
              </label>
              <span className="text-[11px] text-[var(--ink-faint)] font-medium">
                (ไม่บังคับ)
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                value={formData.lineId}
                onChange={(e) => handleChange("lineId", e.target.value)}
                placeholder="เช่น somchai.line หรือ @somchai"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[var(--line)] focus:border-[var(--purple-600)] focus:ring-2 focus:ring-[var(--purple-100)] text-xs sm:text-sm text-[var(--ink)] outline-none transition"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none">
                <Image
                  src="/line-icon.png"
                  alt="LINE"
                  width={18}
                  height={18}
                  className="w-4 h-4 object-contain opacity-70"
                />
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3 bg-[var(--purple-50)]/70 rounded-2xl border border-[var(--purple-100)] flex items-center gap-2 text-[11px] text-[var(--ink-soft)]">
            <ShieldCheck className="w-4 h-4 text-[var(--purple-600)] flex-shrink-0" />
            <span>
              ข้อมูลของคุณจะถูกเก็บรักษาอย่างปลอดภัยเพื่อใช้ในการจับคู่งาน
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-3.5 rounded-full font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isFormValid && !isSubmitting
                ? "bg-[var(--purple-600)] hover:bg-[var(--purple-700)] text-white active:scale-98"
                : "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
            }`}
          >
            <span>{isSubmitting ? "กำลังบันทึก..." : "ลงทะเบียนและเลือกประเภทผู้ใช้"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
