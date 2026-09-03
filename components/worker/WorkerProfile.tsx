"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Phone,
  MapPin,
  Camera,
  FileCheck,
  Sparkles,
  Check,
  Edit3,
  Mic,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Trash2,
  Plus,
  ShieldCheck,
  Briefcase,
  Award,
} from "lucide-react";

interface WorkerProfileProps {
  userName?: string;
}

export const WorkerProfile: React.FC<WorkerProfileProps> = ({ userName }) => {
  // ================= State: Multi-Step Form =================
  const [currentStep, setCurrentStep] = useState<number>(1);

  // ================= State: Step 1 (Basic Info) =================
  const [fullName, setFullName] = useState<string>(userName || "สมชาย ตั้งใจ");
  const [phoneNumber, setPhoneNumber] = useState<string>("081-234-5678");
  const [location, setLocation] = useState<string>("");

  // Load from localStorage if available
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("jobgist_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.fullName) setFullName(parsed.fullName);
        if (parsed.phone) setPhoneNumber(parsed.phone);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // ================= State: Step 2 (Skills & Experience) =================
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [experienceYears, setExperienceYears] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const availableCategories = [
    "งานบ้าน/ทำความสะอาด",
    "งานโรงงาน",
    "งานคลังสินค้า",
    "งานบริการ/ร้านอาหาร",
    "งานดูแลผู้สูงอายุ",
    "พนักงานขับรถ/ส่งของ",
    "แคชเชียร์/งานขาย",
  ];

  const experienceOptions = [
    "น้อยกว่า 1 ปี",
    "1 - 3 ปี",
    "3 - 5 ปี",
    "มากกว่า 5 ปี",
  ];

  // ================= State: Step 3 (Evidence / OCR) =================
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // ================= State: Step 4 (Verification & Bio) =================
  const [isEditingBio, setIsEditingBio] = useState<boolean>(false);
  const [isProfileSaved, setIsProfileSaved] = useState<boolean>(false);
  const [bioText, setBioText] = useState<string>(
    "กรุณากรอกข้อมูลในขั้นตอนต่างๆ เพื่อให้ AI ช่วยสังเคราะห์และจัดเรียงโปรไฟล์ให้โดยอัตโนมัติ"
  );

  // ================= Dynamic Bio Generator =================
  const updateBioDynamically = () => {
    const cats = selectedCategories.length > 0 ? selectedCategories.join(", ") : "งานทั่วไป";
    const expNote = experienceYears ? ` (ประสบการณ์ ${experienceYears})` : "";
    const certNote = uploadedFiles.length > 0 ? " ผ่านการอบรมและยืนยันเอกสารแล้ว" : "";
    const locNote = location.trim() ? ` สะดวกทำงานพื้นที่ ${location}` : "";
    const extraNotes = notes.trim() ? ` ${notes.trim()}` : "";
    const newBio = `มีความเชี่ยวชาญด้าน ${cats}${expNote}${locNote}${certNote}${extraNotes}`;
    setBioText(newBio);
  };

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleSimulateVoice = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setNotes((prev) =>
        prev
          ? `${prev} และสามารถทำอาหารไทยพื้นฐานได้ สะอาด ปลอดภัย`
          : "สามารถทำอาหารไทยพื้นฐานได้ สะอาด ปลอดภัย"
      );
    }, 1200);
  };

  const handleSimulateOCRUpload = () => {
    const sampleFiles = [
      "ใบรับรองการอบรมความปลอดภัย_2024.pdf",
      "ใบผ่านงานร้านอาหาร_สมศรี.jpg",
      "ใบขับขี่ประเภท2.pdf",
    ];
    const randomDoc = sampleFiles[uploadedFiles.length % sampleFiles.length];
    if (!uploadedFiles.includes(randomDoc)) {
      setUploadedFiles((prev) => [...prev, randomDoc]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ================= Step Validation =================
  const isCurrentStepValid = (() => {
    if (currentStep === 1) {
      return (
        fullName.trim().length > 0 &&
        phoneNumber.trim().length > 0 &&
        location.trim().length > 0
      );
    }
    if (currentStep === 2) {
      return selectedCategories.length > 0 && experienceYears.trim().length > 0;
    }
    if (currentStep === 3) {
      return uploadedFiles.length > 0;
    }
    return true;
  })();

  const handleNextStep = () => {
    if (!isCurrentStepValid) return;
    if (currentStep === 2) {
      updateBioDynamically();
    }
    if (currentStep === 3) {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        updateBioDynamically();
        setCurrentStep(4);
      }, 500);
      return;
    }
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSaveProfile = () => {
    setIsProfileSaved(true);
    // Save updated profile to localStorage
    try {
      const savedUser = localStorage.getItem("jobgist_user");
      const current = savedUser ? JSON.parse(savedUser) : {};
      localStorage.setItem(
        "jobgist_user",
        JSON.stringify({
          ...current,
          fullName,
          phone: phoneNumber,
          location,
          categories: selectedCategories,
          experience: experienceYears,
          bio: bioText,
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="view-enter space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
          สร้างโปรไฟล์ของคุณ
        </h1>
        <p className="text-sm md:text-base text-[var(--ink-soft)]">
          ตอบคำถามง่ายๆ ทีละขั้น ไม่ต้องเขียนเรซูเม่เอง AI จะช่วยเรียบเรียงให้
        </p>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Multi-Step Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-6 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            {/* Stepper Progress Bar */}
            <div className="mb-6">
              <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                      currentStep >= step
                        ? "bg-[var(--purple-600)]"
                        : "bg-[var(--line)]"
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[11px] font-semibold">
                <span
                  className={
                    currentStep === 1
                      ? "text-[var(--purple-700)] font-bold"
                      : currentStep > 1
                      ? "text-[var(--purple-700)]"
                      : "text-[var(--ink-faint)]"
                  }
                >
                  1. ข้อมูลพื้นฐาน
                </span>
                <span
                  className={
                    currentStep === 2
                      ? "text-[var(--purple-700)] font-bold"
                      : currentStep > 2
                      ? "text-[var(--purple-700)]"
                      : "text-[var(--ink-faint)]"
                  }
                >
                  2. ทักษะ
                </span>
                <span
                  className={
                    currentStep === 3
                      ? "text-[var(--purple-700)] font-bold"
                      : currentStep > 3
                      ? "text-[var(--purple-700)]"
                      : "text-[var(--ink-faint)]"
                  }
                >
                  3. แนบหลักฐาน
                </span>
                <span
                  className={
                    currentStep === 4
                      ? "text-[var(--purple-700)] font-bold"
                      : "text-[var(--ink-faint)]"
                  }
                >
                  4. ตรวจความถูกต้อง
                </span>
              </div>
            </div>

            {/* Step 1: ข้อมูลพื้นฐาน */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-base font-bold text-[var(--ink)]">
                    ขั้นตอนที่ 1: ข้อมูลส่วนตัวพื้นฐาน
                  </h3>
                  <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                    ข้อมูลนี้ดึงมาจากขั้นตอนลงทะเบียนโดยอัตโนมัติ คุณสามารถแก้ไขเพิ่มเติมได้
                  </p>
                </div>

                <div className="space-y-3.5 pt-1">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
                      ชื่อ-นามสกุล
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="ชื่อ-นามสกุลของคุณ"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--line)] focus:border-[var(--purple-600)] focus:ring-2 focus:ring-[var(--purple-100)] text-xs md:text-sm text-[var(--ink)] outline-none transition"
                      />
                      <User className="w-4 h-4 text-[var(--ink-faint)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
                      เบอร์โทรศัพท์สำหรับติดต่อ
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="08X-XXX-XXXX"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--line)] focus:border-[var(--purple-600)] focus:ring-2 focus:ring-[var(--purple-100)] text-xs md:text-sm text-[var(--ink)] outline-none transition"
                      />
                      <Phone className="w-4 h-4 text-[var(--ink-faint)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
                      ที่อยู่ปัจจุบัน / ย่านที่สะดวกทำงาน
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="กรุณากรอกที่อยู่"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--line)] focus:border-[var(--purple-600)] focus:ring-2 focus:ring-[var(--purple-100)] text-xs md:text-sm text-[var(--ink)] outline-none transition"
                      />
                      <MapPin className="w-4 h-4 text-[var(--ink-faint)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: ทักษะและประสบการณ์ */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-base font-bold text-[var(--ink)]">
                    ขั้นตอนที่ 2: ทักษะและประสบการณ์
                  </h3>
                  <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                    เลือกประเภทงานที่เคยทำและระบุประสบการณ์เพื่อให้ระบบจับคู่งานที่ตรงที่สุด
                  </p>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
                    ประเภทงานที่เคยทำ (เลือกได้มากกว่า 1)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableCategories.map((cat) => {
                      const isSel = selectedCategories.includes(cat);
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => toggleCategory(cat)}
                          className={`px-3.5 py-2 rounded-full text-xs font-semibold transition cursor-pointer border ${
                            isSel
                              ? "bg-[var(--purple-600)] border-[var(--purple-600)] text-white shadow-xs"
                              : "bg-white border-[var(--line)] text-[var(--ink-soft)] hover:bg-[var(--purple-50)] hover:text-[var(--purple-700)]"
                          }`}
                        >
                          {isSel && "✓ "}
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Experience Years */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
                    ระยะเวลาประสบการณ์ทำงาน
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {experienceOptions.map((opt) => {
                      const isSel = experienceYears === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setExperienceYears(opt)}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border transition cursor-pointer text-center ${
                            isSel
                              ? "bg-[var(--purple-50)] border-[var(--purple-600)] text-[var(--purple-700)] shadow-xs"
                              : "bg-white border-[var(--line)] text-[var(--ink-soft)] hover:bg-zinc-50"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Notes & Voice Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
                      รายละเอียดเพิ่มเติม / สิ่งที่ถนัด
                    </label>
                    <button
                      type="button"
                      onClick={handleSimulateVoice}
                      className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border transition cursor-pointer ${
                        isRecording
                          ? "bg-red-500 text-white border-red-500 animate-pulse"
                          : "bg-[var(--purple-50)] text-[var(--purple-700)] border-[var(--purple-200)] hover:bg-[var(--purple-100)]"
                      }`}
                    >
                      <Mic className="w-3 h-3" />
                      <span>{isRecording ? "กำลังฟัง..." : "พูดด้วยเสียง"}</span>
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="เช่น สะดวกทำงานวันธรรมดา 8:00-17:00 น. มีมอเตอร์ไซค์ส่วนตัว"
                    className="w-full border border-[var(--line)] focus:border-[var(--purple-600)] focus:ring-2 focus:ring-[var(--purple-100)] rounded-xl p-3 text-xs md:text-sm text-[var(--ink)] outline-none resize-y transition"
                  />
                </div>
              </div>
            )}

            {/* Step 3: แนบหลักฐาน / ใบรับรอง (OCR) */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-base font-bold text-[var(--ink)]">
                    ขั้นตอนที่ 3: แนบหลักฐาน / ใบรับรอง (OCR)
                  </h3>
                  <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                    ถ่ายรูปใบรับรองหรือบัตรประชาชน ระบบจะอ่านข้อมูลให้อัตโนมัติเพื่อเพิ่มความน่าเชื่อถือ
                  </p>
                </div>

                {/* OCR Upload Box */}
                <div
                  onClick={handleSimulateOCRUpload}
                  className="border-2 border-dashed border-[var(--purple-500)]/70 hover:border-[var(--purple-600)] rounded-2xl p-5 text-center bg-[var(--purple-50)]/50 hover:bg-[var(--purple-50)] transition cursor-pointer group"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-white shadow-xs flex items-center justify-center text-[var(--purple-600)] group-hover:scale-110 transition mb-2">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-[var(--purple-700)]">
                    ถ่ายรูปหรือแตะเพื่ออัปโหลดไฟล์
                  </div>
                  <div className="text-[11px] text-[var(--ink-soft)] mt-0.5">
                    รองรับ JPG, PNG, PDF (จำลองการดึงชื่อหลักสูตรอัตโนมัติ)
                  </div>
                </div>

                {/* Uploaded Files List */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[var(--ink-soft)] uppercase tracking-wider">
                    เอกสารที่อัปโหลดแล้ว ({uploadedFiles.length})
                  </label>
                  {uploadedFiles.length > 0 ? (
                    <div className="space-y-1.5">
                      {uploadedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 font-medium animate-fadeIn"
                        >
                          <div className="flex items-center gap-2 min-w-0 pr-2">
                            <FileCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span className="truncate">{file}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(idx)}
                            className="p-1 hover:bg-emerald-100 text-rose-500 rounded-md transition cursor-pointer"
                            title="ลบไฟล์"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-xs text-[var(--ink-faint)] bg-zinc-50 rounded-xl border border-dashed border-[var(--line)]">
                      ยังไม่มีเอกสารที่อัปโหลด (แตะกล่องด้านบนเพื่ออัปโหลดใบรับรอง / บัตรประชาชน)
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: ตรวจความถูกต้อง (Human Verification) */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-base font-bold text-[var(--ink)]">
                    ขั้นตอนที่ 4: ตรวจสอบและยืนยันข้อมูลโปรไฟล์
                  </h3>
                  <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                    AI ได้เรียบเรียงโปรไฟล์ให้พร้อมใช้งานแล้ว ตรวจสอบและกดยืนยันบันทึกข้อมูล
                  </p>
                </div>

                {/* Summary Card */}
                <div className="p-4 rounded-2xl bg-[var(--purple-50)]/70 border border-[var(--purple-200)] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-extrabold text-[var(--ink)]">
                      {fullName}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--purple-700)] bg-white px-2.5 py-0.5 rounded-full border border-[var(--purple-200)] shadow-2xs">
                      <Sparkles className="w-3 h-3 text-[var(--purple-600)]" />
                      Thai LLM (Typhoon 2)
                    </span>
                  </div>

                  <div className="text-xs text-[var(--purple-700)] font-semibold">
                    {selectedCategories.join(", ") || "คนหางาน"}
                    {experienceYears ? ` · ประสบการณ์ ${experienceYears}` : ""}
                    {location ? ` · ${location}` : ""}
                  </div>

                  {isEditingBio ? (
                    <textarea
                      rows={4}
                      value={bioText}
                      onChange={(e) => setBioText(e.target.value)}
                      className="w-full text-xs text-[var(--ink)] p-2.5 border border-[var(--purple-300)] rounded-xl bg-white focus:outline-none"
                    />
                  ) : (
                    <p className="text-xs text-[var(--ink-soft)] leading-relaxed">
                      {bioText}
                    </p>
                  )}

                  <div className="flex items-center gap-2 pt-2 border-t border-[var(--purple-200)]/60">
                    <button
                      type="button"
                      onClick={() => setIsEditingBio(!isEditingBio)}
                      className="px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-white hover:bg-zinc-50 text-[var(--ink)] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3 text-[var(--ink-soft)]" />
                      <span>{isEditingBio ? "เสร็จสิ้นการแก้ไข" : "✎ แก้ไขข้อความ"}</span>
                    </button>
                  </div>
                </div>

                {isProfileSaved && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-fadeIn">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <div className="font-bold">บันทึกโปรไฟล์สำเร็จ!</div>
                      <div className="text-[11px] text-emerald-700">
                        ข้อมูลของคุณพร้อมเปิดให้ร้านค้าและผู้ประกอบการจับคู่งานแล้ว
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Action Buttons (Bottom) */}
          <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between gap-3 mt-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-2.5 rounded-full border border-[var(--line)] bg-white hover:bg-zinc-50 text-xs font-bold text-[var(--ink)] transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>ย้อนกลับ</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                disabled={!isCurrentStepValid || isGenerating}
                className={`px-6 py-2.5 rounded-full font-bold text-xs shadow-md transition-all flex items-center gap-2 ${
                  isCurrentStepValid && !isGenerating
                    ? "bg-[var(--purple-600)] hover:bg-[var(--purple-700)] active:scale-98 text-white cursor-pointer shadow-md"
                    : "bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none"
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>กำลังส่งต่อ AI...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {currentStep === 1
                        ? "ถัดไป: เลือกทักษะ"
                        : currentStep === 2
                        ? "ถัดไป: แนบหลักฐาน"
                        : "ถัดไป: ให้ AI สังเคราะห์โปรไฟล์"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveProfile}
                className={`px-6 py-2.5 rounded-full font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer ${
                  isProfileSaved
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-[var(--purple-600)] hover:bg-[var(--purple-700)] active:scale-98 text-white"
                }`}
              >
                <Check className="w-4 h-4" />
                <span>
                  {isProfileSaved
                    ? "✓ บันทึกเรียบร้อยแล้ว"
                    : "✓ ยืนยันข้อมูลและบันทึกโปรไฟล์"}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Live AI Preview Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[var(--ink)]">
                  ตัวอย่างโปรไฟล์ที่ AI สร้างให้ (Live Preview)
                </h3>
                <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                  อัปเดตแบบ Realtime ตามข้อมูลที่คุณกรอก
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-[var(--purple-600)]" />
            </div>

            <hr className="border-t border-[var(--line)] my-4" />

            {/* Profile Box */}
            <div
              className={`border border-[var(--purple-200)] rounded-2xl p-5 bg-[var(--purple-50)] transition-all duration-300 ${
                isGenerating ? "opacity-40 ai-shimmer" : "opacity-100"
              }`}
            >
              <div className="inline-flex items-center gap-1.5 bg-[var(--purple-600)] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>สร้างโดย AI (Typhoon 2)</span>
              </div>

              <div className="text-lg font-extrabold text-[var(--ink)]">
                {fullName || "สมชาย ตั้งใจ"}
              </div>
              <div className="text-xs font-semibold text-[var(--purple-700)] mt-0.5 mb-2.5">
                {selectedCategories[0] || "คนหางาน"}
                {experienceYears ? ` · ประสบการณ์ ${experienceYears}` : ""}
                {location ? ` · ${location}` : ""}
              </div>

              <p className="text-xs text-[var(--ink-soft)] leading-relaxed mb-3">
                {bioText}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedCategories.map((c) => (
                  <span
                    key={c}
                    className="bg-white border border-[var(--line)] rounded-lg px-2.5 py-1 text-[11px] text-[var(--ink)] font-medium shadow-2xs"
                  >
                    {c}
                  </span>
                ))}
                {uploadedFiles.length > 0 && (
                  <span className="bg-emerald-100/80 border border-emerald-300 text-emerald-800 rounded-lg px-2.5 py-1 text-[11px] font-semibold">
                    ✓ เอกสารยืนยัน ({uploadedFiles.length})
                  </span>
                )}
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 pt-2 border-t border-[var(--purple-200)]/60 text-xs">
                <span className="text-[var(--ink-soft)]">สถานะ:</span>
                {isProfileSaved ? (
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> พร้อมรับงานแล้ว
                  </span>
                ) : (
                  <span className="font-semibold text-[var(--purple-700)]">
                    กำลังจัดทำขั้นตอนที่ {currentStep}/4
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 p-3.5 rounded-2xl bg-zinc-50 border border-[var(--line)] flex items-center gap-2.5 text-xs text-[var(--ink-soft)]">
            <ShieldCheck className="w-4 h-4 text-[var(--purple-600)] flex-shrink-0" />
            <span>
              ระบบจะนำโปรไฟล์นี้ไปจับคู่งานใกล้บ้าน พร้อมคำนวณ AI Fit Score อัตโนมัติ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
