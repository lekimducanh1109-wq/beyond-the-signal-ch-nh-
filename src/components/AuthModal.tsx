import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, RotateCcw, Edit3 } from 'lucide-react';

export interface ExplorerPassProfile {
  idCode: string;
  fullName: string;
  age: string;
  gender: 'nam' | 'nu' | 'khac' | 'tuy_chon';
  gmail: string;
  phone: string;
  issuedAt: string;
}

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAlias: string | null;
  onSetAlias: (alias: string | null) => void;
  lang?: 'vi' | 'en';
}

const STORAGE_KEY = 'beyond_the_signal_explorer_pass';

function generatePassCode(name: string): string {
  const clean = name.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  const prefix = (clean.slice(0, 3) || 'EXP').padEnd(3, 'X');
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % 9000;
  }
  const num = (1000 + Math.abs(hash)).toString().slice(0, 4);
  return `BTS-${prefix}-${num}`;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentAlias,
  onSetAlias,
  lang,
}) => {
  const [resolvedLang, setResolvedLang] = useState<'vi' | 'en'>('vi');
  const [profile, setProfile] = useState<ExplorerPassProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'nam' | 'nu' | 'khac' | 'tuy_chon'>('tuy_chon');
  const [gmail, setGmail] = useState('');
  const [phone, setPhone] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Resolve language from prop or localStorage/document
  useEffect(() => {
    if (lang === 'en' || lang === 'vi') {
      setResolvedLang(lang);
      return;
    }
    try {
      const storedLang = localStorage.getItem('beyond_the_signal_lang');
      if (storedLang === 'en' || storedLang === 'vi') {
        setResolvedLang(storedLang);
        return;
      }
    } catch {}
    setResolvedLang(document.documentElement.lang === 'en' ? 'en' : 'vi');
  }, [lang, isOpen]);

  // Load stored Explorer Pass on open
  useEffect(() => {
    if (!isOpen) return;
    setErrorMsg(null);
    setSuccessToast(null);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ExplorerPassProfile;
        if (parsed && parsed.fullName) {
          setProfile(parsed);
          setFullName(parsed.fullName);
          setAge(parsed.age || '');
          setGender(parsed.gender || 'tuy_chon');
          setGmail(parsed.gmail || '');
          setPhone(parsed.phone || '');
          setIsEditing(false);
          return;
        }
      }
    } catch {}

    if (currentAlias) {
      const fallbackProfile: ExplorerPassProfile = {
        idCode: generatePassCode(currentAlias),
        fullName: currentAlias,
        age: '',
        gender: 'tuy_chon',
        gmail: '',
        phone: '',
        issuedAt: new Date().toISOString().slice(0, 10),
      };
      setProfile(fallbackProfile);
      setFullName(currentAlias);
      setIsEditing(false);
    } else {
      setProfile(null);
      setFullName('');
      setAge('');
      setGender('tuy_chon');
      setGmail('');
      setPhone('');
      setIsEditing(true);
    }
  }, [isOpen, currentAlias]);

  if (!isOpen) return null;

  const isEn = resolvedLang === 'en';

  const genderLabel = (g: ExplorerPassProfile['gender']) => {
    switch (g) {
      case 'nam':
        return isEn ? 'Male' : 'Nam';
      case 'nu':
        return isEn ? 'Female' : 'Nữ';
      case 'khac':
        return isEn ? 'Other' : 'Khác';
      case 'tuy_chon':
      default:
        return isEn ? 'Prefer not to say' : 'Tuỳ chọn';
    }
  };

  const maskGmail = (email: string) => {
    if (!email) return isEn ? 'Not provided (Local only)' : 'Chưa cung cấp (Chỉ lưu cục bộ)';
    const parts = email.split('@');
    if (parts.length !== 2) return email;
    const namePart = parts[0];
    const masked =
      namePart.length <= 2
        ? `${namePart[0] || '*'}*`
        : `${namePart.slice(0, 2)}***${namePart.slice(-1)}`;
    return `${masked}@${parts[1]}`;
  };

  const handleSavePass = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedName = fullName.trim();
    if (!trimmedName) {
      setErrorMsg(
        isEn
          ? 'Please enter your Full Name or choose "Continue as Guest".'
          : 'Vui lòng nhập Họ và tên hoặc chọn "Tiếp tục với tư cách Khách".'
      );
      return;
    }

    const trimmedAge = age.trim();
    if (trimmedAge) {
      const numericAge = Number(trimmedAge);
      if (Number.isNaN(numericAge) || numericAge < 5 || numericAge > 120) {
        setErrorMsg(
          isEn
            ? 'Please enter a valid age between 5 and 120.'
            : 'Vui lòng nhập độ tuổi hợp lệ (từ 5 đến 120 tuổi).'
        );
        return;
      }
    }

    const trimmedGmail = gmail.trim().toLowerCase();
    if (trimmedGmail && !/^[a-z0-9._%+-]+@gmail\.com$/i.test(trimmedGmail)) {
      setErrorMsg(
        isEn
          ? 'Gmail address must end with @gmail.com (e.g., explorer@gmail.com).'
          : 'Địa chỉ Gmail cần có định dạng hợp lệ kết thúc bằng @gmail.com.'
      );
      return;
    }

    const newProfile: ExplorerPassProfile = {
      idCode: profile?.idCode || generatePassCode(trimmedName),
      fullName: trimmedName,
      age: trimmedAge,
      gender,
      gmail: trimmedGmail,
      phone: phone.trim(),
      issuedAt: profile?.issuedAt || new Date().toISOString().slice(0, 10),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    } catch {}

    onSetAlias(trimmedName);
    setProfile(newProfile);
    setIsEditing(false);
    setSuccessToast(
      isEn
        ? `Explorer ID Pass issued for ${trimmedName}`
        : `Đã cấp Thẻ ID Nhà Thám Hiểm cho ${trimmedName}`
    );
  };

  const handleContinueAsGuest = () => {
    setErrorMsg(null);
    onClose();
  };

  const handleResetPass = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('beyond_the_signal_alias');
    } catch {}
    onSetAlias(null);
    setProfile(null);
    setFullName('');
    setAge('');
    setGender('tuy_chon');
    setGmail('');
    setPhone('');
    setIsEditing(true);
    setSuccessToast(
      isEn
        ? 'Explorer Pass cleared from this device.'
        : 'Đã xóa dữ liệu Thẻ ID trên thiết bị này.'
    );
  };

  const previewName = fullName.trim() || (isEn ? 'VISITOR / GUEST EXPLORER' : 'KHÁCH THAM QUAN TỰ DO');
  const previewCode = profile?.idCode || (fullName.trim() ? generatePassCode(fullName.trim()) : 'BTS-GST-0000');
  const previewDate = profile?.issuedAt || new Date().toISOString().slice(0, 10);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? 'Explorer ID Pass' : 'Thẻ ID Nhà Thám Hiểm'}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#07111F] border border-white/[0.12] text-[#F3F0E8] shadow-2xl rounded-xs overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="px-6 py-4 bg-[#030712] border-b border-white/[0.08] flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#C5A46A] block">
              {isEn
                ? 'BEYOND THE SIGNAL · VISITOR CREDENTIAL'
                : 'BEYOND THE SIGNAL · ĐỊNH DANH NGƯỜI THAM QUAN'}
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold text-[#F3F0E8] mt-0.5">
              {isEn ? 'Explorer ID Pass' : 'Thẻ ID Nhà Thám Hiểm'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-[#F3F0E8] transition-colors cursor-pointer rounded-xs"
            aria-label={isEn ? 'Close modal' : 'Đóng cửa sổ'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          {successToast && (
            <div className="p-3 bg-[#0D1B2E] border border-[#C5A46A]/60 text-[#F3F0E8] text-xs font-mono flex items-center gap-2 rounded-xs">
              <CheckCircle2 className="w-4 h-4 text-[#C5A46A] shrink-0" />
              <span>{successToast}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs font-sans rounded-xs">
              {errorMsg}
            </div>
          )}

          {/* Virtual NASA-Style Explorer Badge Card (Always visible as live preview or issued pass) */}
          <div className="relative bg-[#030712] border border-[#C5A46A]/45 rounded-xs p-5 shadow-inner overflow-hidden">
            {/* Top Archival Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C96F46]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C5A46A]">
                  NASA ARCHIVAL EXHIBITION PASS
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#F3F0E8] bg-[#07111F] px-2 py-0.5 border border-white/[0.1] rounded-xs">
                ID: {previewCode}
              </span>
            </div>

            {/* Main Credential Content */}
            <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="sm:col-span-2 space-y-2">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#94A3B8] block">
                    {isEn ? 'HOLDER FULL NAME' : 'HỌ VÀ TÊN NHÀ THÁM HIỂM'}
                  </span>
                  <div className="font-display text-xl sm:text-2xl font-bold text-[#F3F0E8] tracking-tight truncate">
                    {previewName}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#94A3B8] block">
                      {isEn ? 'AGE' : 'ĐỘ TUỔI'}
                    </span>
                    <span className="font-mono text-xs text-[#F3F0E8]">
                      {age.trim() ? `${age.trim()}` : '—'}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#94A3B8] block">
                      {isEn ? 'GENDER' : 'GIỚI TÍNH'}
                    </span>
                    <span className="font-mono text-xs text-[#F3F0E8]">
                      {genderLabel(gender)}
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#94A3B8] block">
                      {isEn ? 'ISSUED DATE' : 'NGÀY CẤP THẺ'}
                    </span>
                    <span className="font-mono text-xs text-[#C5A46A]">
                      {previewDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Stamp / Clearance Box */}
              <div className="bg-[#07111F] border border-white/[0.08] p-3 rounded-xs flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#94A3B8]">
                    {isEn ? 'CLEARANCE' : 'QUYỀN TRUY CẬP'}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="font-mono text-xs font-semibold text-[#C5A46A]">
                  {profile && !isEditing
                    ? isEn
                      ? 'VERIFIED EXPLORER'
                      : 'ĐÃ ĐỊNH DANH'
                    : isEn
                    ? 'GUEST / DRAFT'
                    : 'KHÁCH / ĐANG TẠO'}
                </div>
                <div className="font-mono text-[9px] text-[#94A3B8] truncate">
                  {maskGmail(gmail.trim())}
                </div>
              </div>
            </div>

            {/* Bottom Telemetry Barcode Strip */}
            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
              <span>SECTORS: 01-JOURNEYS · 02-SIMULATIONS · 03-OPEN-DATA</span>
              <span className="tracking-[0.25em] text-[#C5A46A]/70 hidden sm:inline">
                ||| | |||| || | |||
              </span>
            </div>
          </div>

          {/* Issued View vs Form Edit View */}
          {profile && !isEditing ? (
            <div className="space-y-4">
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {isEn
                  ? 'Your Explorer Pass is stored locally on this browser. You can freely access all Journeys, STEM Simulations, and Open Science Data.'
                  : 'Thẻ ID Nhà Thám Hiểm của bạn được lưu cục bộ trên trình duyệt này. Bạn có thể tự do trải nghiệm toàn bộ Hành Trình, Mô Phỏng STEM và Dữ Liệu Khoa Học Mở.'}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-3.5 py-2 bg-[#0D1B2E] hover:bg-[#14243A] text-[#F3F0E8] border border-white/[0.12] text-xs font-mono flex items-center gap-1.5 rounded-xs cursor-pointer transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#C5A46A]" />
                    <span>{isEn ? 'Edit Pass Info' : 'Chỉnh sửa thông tin'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetPass}
                    className="px-3.5 py-2 bg-[#030712] hover:bg-rose-950/40 text-rose-300 border border-rose-500/30 text-xs font-mono flex items-center gap-1.5 rounded-xs cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Reset Pass' : 'Xóa thẻ / Đặt lại'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="btn-primary-rust text-xs font-mono uppercase tracking-wider"
                >
                  {isEn ? 'Continue Exploring' : 'Tiếp tục khám phá'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSavePass} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Họ và tên / Full Name */}
                <div className="sm:col-span-2">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#F3F0E8] mb-1.5">
                    {isEn ? 'Full Name / Explorer Name' : 'Họ và tên Nhà Thám Hiểm'}{' '}
                    <span className="text-[#C96F46]">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={
                      isEn
                        ? 'e.g., Nguyen Minh Anh'
                        : 'Ví dụ: Nguyễn Minh Anh'
                    }
                    className="w-full px-3.5 py-2.5 bg-[#030712] border border-white/[0.14] focus:border-[#C5A46A] text-[#F3F0E8] placeholder-[#94A3B8]/50 font-sans text-sm focus:outline-none rounded-xs"
                  />
                </div>

                {/* 2. Tuổi / Age */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#F3F0E8] mb-1.5">
                    {isEn ? 'Age' : 'Độ tuổi'}{' '}
                    <span className="text-[#94A3B8] font-normal">
                      ({isEn ? 'Optional' : 'Tuỳ chọn'})
                    </span>
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={120}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder={isEn ? 'e.g., 14' : 'Ví dụ: 14'}
                    className="w-full px-3.5 py-2.5 bg-[#030712] border border-white/[0.14] focus:border-[#C5A46A] text-[#F3F0E8] placeholder-[#94A3B8]/50 font-sans text-sm focus:outline-none rounded-xs"
                  />
                </div>

                {/* 3. Giới tính / Gender */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#F3F0E8] mb-1.5">
                    {isEn ? 'Gender' : 'Giới tính'}
                  </label>
                  <select
                    value={gender}
                    onChange={(e) =>
                      setGender(e.target.value as ExplorerPassProfile['gender'])
                    }
                    className="w-full px-3.5 py-2.5 bg-[#030712] border border-white/[0.14] focus:border-[#C5A46A] text-[#F3F0E8] font-sans text-sm focus:outline-none rounded-xs"
                  >
                    <option value="tuy_chon">
                      {isEn ? 'Prefer not to say' : 'Tuỳ chọn (Không tiết lộ)'}
                    </option>
                    <option value="nam">{isEn ? 'Male' : 'Nam'}</option>
                    <option value="nu">{isEn ? 'Female' : 'Nữ'}</option>
                    <option value="khac">{isEn ? 'Other' : 'Khác'}</option>
                  </select>
                </div>

                {/* 4. Gmail */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#F3F0E8] mb-1.5">
                    Gmail{' '}
                    <span className="text-[#94A3B8] font-normal">
                      (@gmail.com · {isEn ? 'Optional' : 'Tuỳ chọn'})
                    </span>
                  </label>
                  <input
                    type="email"
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)}
                    placeholder="explorer@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-[#030712] border border-white/[0.14] focus:border-[#C5A46A] text-[#F3F0E8] placeholder-[#94A3B8]/50 font-mono text-xs focus:outline-none rounded-xs"
                  />
                </div>

                {/* 5. Số điện thoại / Phone */}
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#F3F0E8] mb-1.5">
                    {isEn ? 'Phone Number' : 'Số điện thoại'}{' '}
                    <span className="text-[#94A3B8] font-normal">
                      ({isEn ? 'Optional' : 'Không bắt buộc'})
                    </span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={isEn ? 'Optional contact number' : 'Không bắt buộc'}
                    className="w-full px-3.5 py-2.5 bg-[#030712] border border-white/[0.14] focus:border-[#C5A46A] text-[#F3F0E8] placeholder-[#94A3B8]/50 font-mono text-xs focus:outline-none rounded-xs"
                  />
                </div>
              </div>

              {/* Privacy Note */}
              <div className="p-3 bg-[#030712]/90 border border-white/[0.07] rounded-xs flex items-start gap-2.5 text-xs text-[#94A3B8]">
                <ShieldCheck className="w-4 h-4 text-[#C5A46A] shrink-0 mt-0.5" />
                <span>
                  {isEn
                    ? 'Privacy Guarantee: Your information is stored strictly in your browser localStorage to personalize your Explorer Pass and quiz progress. Emails and phone numbers are never publicly exposed.'
                    : 'Cam kết quyền riêng tư: Thông tin chỉ lưu cục bộ trên trình duyệt của bạn để cá nhân hóa Thẻ ID và tiến độ khám phá. Gmail và số điện thoại không bao giờ hiển thị công khai.'}
                </span>
              </div>

              {/* Action Buttons: Guest, Reset, Issue Pass */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/[0.08]">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleContinueAsGuest}
                    className="px-3.5 py-2.5 bg-[#030712] hover:bg-[#0D1B2E] text-[#F3F0E8] border border-white/[0.14] text-xs font-mono rounded-xs cursor-pointer transition-colors"
                  >
                    {isEn ? 'Continue as Guest' : 'Tiếp tục với tư cách Khách'}
                  </button>

                  {(profile || currentAlias) && (
                    <button
                      type="button"
                      onClick={handleResetPass}
                      className="px-3 py-2.5 bg-[#030712] hover:bg-rose-950/40 text-rose-300 border border-rose-500/30 text-xs font-mono flex items-center gap-1.5 rounded-xs cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Reset Pass' : 'Xóa thẻ'}</span>
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary-rust text-xs font-mono uppercase tracking-wider"
                >
                  {isEn ? 'Issue Explorer Pass' : 'Cấp Thẻ ID Nhà Thám Hiểm'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
