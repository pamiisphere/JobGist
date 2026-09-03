"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  MapPin,
  Sparkles,
  Save,
  CheckCircle2,
  Phone,
  Clock,
  Sliders,
  Shield,
  Navigation,
  RefreshCw,
  Cpu,
  Layers,
} from "lucide-react";

interface EmployerSettingsProps {
  userName?: string;
  onSaveSuccess?: (newName: string) => void;
}

export const EmployerSettings: React.FC<EmployerSettingsProps> = ({
  userName,
  onSaveSuccess,
}) => {
  // Form States (mapped to employers table in schema.sql)
  const [companyName, setCompanyName] = useState<string>(userName || "ร้านอาหารสมศรี");
  const [businessType, setBusinessType] = useState<string>("ร้านอาหาร / อาหารตามสั่ง");
  const [description, setDescription] = useState<string>(
    "ร้านอาหารไทย-อีสาน รสชาติต้นตำรับ เปิดให้บริการลูกค้าในย่านลาดพร้าวกว่า 5 ปี ต้องการบุคลากรที่ตรงต่อเวลาและรักงานบริการ"
  );
  const [phone, setPhone] = useState<string>("089-123-4567");
  const [operatingHours, setOperatingHours] = useState<string>("10:00 - 21:00 น. (หยุดวันจันทร์)");
  const [address, setAddress] = useState<string>("128/4 ถ.ลาดพร้าว ซอย 10 แขวงจอมพล เขตจตุจักร กรุงเทพฯ");
  const [lat, setLat] = useState<number>(13.8055);
  const [lng, setLng] = useState<number>(100.5742);
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);

  // AI Matching & Routing Settings (mapped to ai_logs & research routing in schema.sql)
  const [minFitScore, setMinFitScore] = useState<number>(75);
  const [preferredAiModel, setPreferredAiModel] = useState<"typhoon" | "hybrid" | "gpt">(
    "hybrid"
  );
  const [autoNotifyHighScore, setAutoNotifyHighScore] = useState<boolean>(true);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("jobgist_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.fullName) setCompanyName(parsed.fullName);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.companyName) setCompanyName(parsed.companyName);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleDetectGPS = () => {
    setIsDetectingLocation(true);
    setTimeout(() => {
      setLat(13.8055);
      setLng(100.5742);
      setIsDetectingLocation(false);
      setToastMessage("ตรวจจับพิกัดร้านค้าสำเร็จ: 13.8055° N, 100.5742° E");
      setTimeout(() => setToastMessage(null), 3000);
    }, 800);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const savedUser = localStorage.getItem("jobgist_user");
      const current = savedUser ? JSON.parse(savedUser) : {};
      localStorage.setItem(
        "jobgist_user",
        JSON.stringify({
          ...current,
          fullName: companyName,
          companyName,
          phone,
          address,
          lat,
          lng,
          businessType,
          description,
        })
      );
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => {
      setIsSaving(false);
      setToastMessage("บันทึกการตั้งค่าข้อมูลร้านค้าและระบบ AI เรียบร้อยแล้ว!");
      if (onSaveSuccess) onSaveSuccess(companyName);
      setTimeout(() => setToastMessage(null), 3500);
    }, 500);
  };

  return (
    <div className="view-enter space-y-6 max-w-4xl pb-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-zinc-700 flex items-center gap-2 text-xs font-medium animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--ink)] tracking-tight">
          ตั้งค่าข้อมูลร้านค้าและระบบ AI
        </h1>
        <p className="text-sm md:text-base text-[var(--ink-soft)]">
          จัดการข้อมูลสถานประกอบการ พิกัดแผนที่ (ตาราง employers) และเกณฑ์การประเมินคะแนน AI
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Business Profile Information */}
        <div className="bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[var(--line)]">
            <Building2 className="w-5 h-5 text-[var(--purple-600)]" />
            <h2 className="text-base font-bold text-[var(--ink)]">
              1. ข้อมูลธุรกิจและสถานประกอบการ (Company Profile)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Company Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[var(--ink)]">
                ชื่อร้าน / บริษัท <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="เช่น ร้านอาหารสมศรี, คาเฟ่ลาดพร้าว"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] text-xs sm:text-sm text-[var(--ink)] focus:border-[var(--purple-600)] focus:ring-1 focus:ring-[var(--purple-200)] outline-none"
                required
              />
            </div>

            {/* Business Type */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[var(--ink)]">
                ประเภทธุรกิจ / อุตสาหกรรม
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] text-xs sm:text-sm text-[var(--ink)] focus:border-[var(--purple-600)] focus:ring-1 focus:ring-[var(--purple-200)] outline-none bg-white"
              >
                <option value="ร้านอาหาร / อาหารตามสั่ง">ร้านอาหาร / อาหารตามสั่ง</option>
                <option value="คาเฟ่ / เบเกอรี่ / เครื่องดื่ม">คาเฟ่ / เบเกอรี่ / เครื่องดื่ม</option>
                <option value="ร้านสะดวกซื้อ / ค้าปลีก">ร้านสะดวกซื้อ / ค้าปลีก</option>
                <option value="คลังสินค้า / ขนส่งโลจิสติกส์">คลังสินค้า / ขนส่งโลจิสติกส์</option>
                <option value="โรงแรม / ที่พัก / งานบริการ">โรงแรม / ที่พัก / งานบริการ</option>
                <option value="โรงงาน / งานฝ่ายผลิต">โรงงาน / งานฝ่ายผลิต</option>
              </select>
            </div>

            {/* Contact Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[var(--ink)]">
                เบอร์โทรศัพท์สำหรับติดต่อ
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08X-XXX-XXXX"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[var(--line)] text-xs sm:text-sm text-[var(--ink)] focus:border-[var(--purple-600)] focus:ring-1 focus:ring-[var(--purple-200)] outline-none"
                />
                <Phone className="w-4 h-4 text-[var(--ink-faint)] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Operating Hours */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[var(--ink)]">
                เวลาทำการ
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={operatingHours}
                  onChange={(e) => setOperatingHours(e.target.value)}
                  placeholder="เช่น 10:00 - 20:00 น."
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[var(--line)] text-xs sm:text-sm text-[var(--ink)] focus:border-[var(--purple-600)] focus:ring-1 focus:ring-[var(--purple-200)] outline-none"
                />
                <Clock className="w-4 h-4 text-[var(--ink-faint)] absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[var(--ink)]">
              คำอธิบายร้านค้า / ลักษณะงานโดยรวม (description)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="แนะนำร้านค้า เพื่อให้ผู้สมัครทำความรู้จัก..."
              className="w-full p-3 rounded-xl border border-[var(--line)] text-xs sm:text-sm text-[var(--ink)] focus:border-[var(--purple-600)] focus:ring-1 focus:ring-[var(--purple-200)] outline-none resize-y"
            />
          </div>
        </div>

        {/* Section 2: Location & GPS Map Coordinates */}
        <div className="bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[var(--purple-600)]" />
              <h2 className="text-base font-bold text-[var(--ink)]">
                2. ตำแหน่งที่ตั้งและพิกัดแผนที่ (Location & GPS Coordinates)
              </h2>
            </div>
            <button
              type="button"
              onClick={handleDetectGPS}
              disabled={isDetectingLocation}
              className="px-3 py-1.5 rounded-full border border-[var(--purple-200)] bg-[var(--purple-50)] text-[var(--purple-700)] hover:bg-[var(--purple-100)] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              {isDetectingLocation ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Navigation className="w-3.5 h-3.5" />
              )}
              <span>ตรวจจับพิกัดปัจจุบัน (GPS)</span>
            </button>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[var(--ink)]">
                ที่อยู่ร้านค้า / สถานประกอบการ
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="ระบุบ้านเลขที่ ถนน ซอย แขวง/ตำบล เขต/อำเภอ"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--line)] text-xs sm:text-sm text-[var(--ink)] focus:border-[var(--purple-600)] focus:ring-1 focus:ring-[var(--purple-200)] outline-none"
              />
            </div>

            {/* GPS Coordinates & Visual Map Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-[var(--line)] flex items-center justify-between text-xs">
                <span className="text-[var(--ink-soft)]">ละติจูด (lat):</span>
                <span className="font-mono font-bold text-[var(--ink)]">{lat.toFixed(6)}° N</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-[var(--line)] flex items-center justify-between text-xs">
                <span className="text-[var(--ink-soft)]">ลองจิจูด (lng):</span>
                <span className="font-mono font-bold text-[var(--ink)]">{lng.toFixed(6)}° E</span>
              </div>
            </div>

            {/* Visual Interactive Map Mock */}
            <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-[var(--line)] bg-[#E8ECEF] flex items-center justify-center">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 flex flex-col items-center gap-1.5 text-center">
                <div className="w-10 h-10 rounded-full bg-[var(--purple-600)] text-white flex items-center justify-center shadow-lg animate-bounce">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-bold text-[var(--ink)] shadow-xs border border-[var(--line)]">
                  หมุดร้านค้า: {companyName}
                </div>
              </div>
            </div>
            <p className="text-[11px] text-[var(--ink-faint)]">
              * พิกัด GPS นี้จะใช้คำนวณระยะทางจริง (เช่น ใกล้ร้าน 800 ม.) เมื่อคนหางานค้นหางานรอบตัว
            </p>
          </div>
        </div>

        {/* Section 3: AI Model & Match Criteria Routing */}
        <div className="bg-white border border-[var(--line)] rounded-[var(--radius-lg)] p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[var(--line)]">
            <Sparkles className="w-5 h-5 text-[var(--purple-600)]" />
            <h2 className="text-base font-bold text-[var(--ink)]">
              3. การตั้งค่าการจับคู่ AI (AI Matching & LLM Routing)
            </h2>
          </div>

          <div className="space-y-4">
            {/* Min Fit Score Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[var(--ink)]">
                <span>เกณฑ์คะแนนความเหมาะสมขั้นต่ำ (Minimum AI Fit Score):</span>
                <span className="text-[var(--purple-700)] font-black text-sm bg-[var(--purple-50)] px-2.5 py-0.5 rounded-lg border border-[var(--purple-200)]">
                  {minFitScore}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={minFitScore}
                onChange={(e) => setMinFitScore(Number(e.target.value))}
                className="w-full accent-[var(--purple-600)] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[var(--ink-faint)]">
                <span>50% (คัดกรองกว้าง)</span>
                <span>75% (แนะนำ)</span>
                <span>95% (เข้มงวดมาก)</span>
              </div>
            </div>

            {/* Model Selection */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-[var(--ink)]">
                สถาปัตยกรรมโมเดล AI สำหรับประมวลผล (LLM Routing Strategy):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setPreferredAiModel("hybrid")}
                  className={`p-3.5 rounded-xl border-2 transition cursor-pointer ${
                    preferredAiModel === "hybrid"
                      ? "border-[var(--purple-600)] bg-[var(--purple-50)]/60"
                      : "border-[var(--line)] bg-white hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[var(--ink)] mb-1">
                    <Layers className="w-4 h-4 text-[var(--purple-600)]" />
                    <span>Hybrid Routing (แนะนำ)</span>
                  </div>
                  <p className="text-[11px] text-[var(--ink-soft)] leading-relaxed">
                    ใช้ Typhoon 2 สกัดภาษาไทย และ GPT-4o-mini คำนวณ Fit Score
                  </p>
                </div>

                <div
                  onClick={() => setPreferredAiModel("typhoon")}
                  className={`p-3.5 rounded-xl border-2 transition cursor-pointer ${
                    preferredAiModel === "typhoon"
                      ? "border-[var(--purple-600)] bg-[var(--purple-50)]/60"
                      : "border-[var(--line)] bg-white hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[var(--ink)] mb-1">
                    <Cpu className="w-4 h-4 text-[var(--purple-600)]" />
                    <span>Typhoon 2 100%</span>
                  </div>
                  <p className="text-[11px] text-[var(--ink-soft)] leading-relaxed">
                    เน้นบริบทภาษาไทยถิ่น ภาษาพูด และความคุ้มค่าด้านต้นทุน
                  </p>
                </div>

                <div
                  onClick={() => setPreferredAiModel("gpt")}
                  className={`p-3.5 rounded-xl border-2 transition cursor-pointer ${
                    preferredAiModel === "gpt"
                      ? "border-[var(--purple-600)] bg-[var(--purple-50)]/60"
                      : "border-[var(--line)] bg-white hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[var(--ink)] mb-1">
                    <Sparkles className="w-4 h-4 text-[var(--purple-600)]" />
                    <span>GPT-4o-mini 100%</span>
                  </div>
                  <p className="text-[11px] text-[var(--ink-soft)] leading-relaxed">
                    เน้น Structured JSON output และความเร็วสูง
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-full bg-[var(--purple-600)] hover:bg-[var(--purple-700)] active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>กำลังบันทึกข้อมูล...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>บันทึกการตั้งค่าทั้งหมด</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
