import React, { useState, useRef } from 'react';
import { X, Upload, ShieldCheck, FileCheck, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { YoungExplorerSubmission } from '../data/museumData';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userAlias: string | null;
  onAddSubmission: (sub: YoungExplorerSubmission) => void;
}

const MAX_FILE_SIZE_MB = 25;

export const SubmissionModal: React.FC<SubmissionModalProps> = ({
  isOpen,
  onClose,
  userAlias,
  onAddSubmission
}) => {
  const [title, setTitle] = useState('');
  const [creatorAlias, setCreatorAlias] = useState(userAlias || '');
  const [ageOrGrade, setAgeOrGrade] = useState('');
  const [schoolOrClub, setSchoolOrClub] = useState('');
  const [relatedMission, setRelatedMission] = useState('OPPORTUNITY');
  const [submissionType, setSubmissionType] = useState<YoungExplorerSubmission['submission_type']>('Tranh / Poster');
  const [category, setCategory] = useState<YoungExplorerSubmission['category']>('artistic_expression');
  const [artistStatement, setArtistStatement] = useState('');
  const [optionalSource, setOptionalSource] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileSelect = (file: File | undefined) => {
    setFileError(null);
    if (!file) return;
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(`Dung lượng tệp vượt quá giới hạn ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }
    setSelectedFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !creatorAlias.trim() || !artistStatement.trim()) {
      return;
    }

    const newSub: YoungExplorerSubmission = {
      id: `sub-${Date.now()}`,
      title: title.trim(),
      creator_alias: creatorAlias.trim(),
      age_or_grade: ageOrGrade.trim() || (schoolOrClub.trim() ? schoolOrClub.trim() : 'Học sinh / Độc giả trẻ'),
      related_mission: relatedMission,
      submission_type: submissionType,
      category: category,
      artist_statement: artistStatement.trim(),
      optional_source_link: optionalSource.trim() || undefined,
      file_name: selectedFile ? selectedFile.name : undefined,
      file_size_mb: selectedFile ? +(selectedFile.size / (1024 * 1024)).toFixed(2) : undefined,
      created_at: new Date().toISOString().split('T')[0],
      summary_vi: artistStatement.trim(),
      summary_en: artistStatement.trim()
    };

    // Save to parent state
    if (onAddSubmission) {
      onAddSubmission(newSub);
    }

    // Persist to localStorage
    try {
      const existing = localStorage.getItem('beyond_the_signal_user_submissions');
      const list: YoungExplorerSubmission[] = existing ? JSON.parse(existing) : [];
      list.unshift(newSub);
      localStorage.setItem('beyond_the_signal_user_submissions', JSON.stringify(list));
    } catch {
      // Ignore localStorage error
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#08132B] border-2 border-[#22D3EE]/50 text-[#E2E8F0] shadow-[0_0_50px_rgba(34,211,238,0.25)] rounded-xs my-8 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#050C1B] border-b border-[#22D3EE]/30 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#FBBF24] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>CỔNG ĐĂNG TẢI SẢN PHẨM SÁNG TẠO &amp; BÀI HỌC HỌC SINH</span>
            </span>
            <h3 className="font-display text-lg font-bold text-[#F8FAFC]">
              Gửi sản phẩm sáng tạo &amp; Bài nghiên cứu vào bảo tàng
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-[#F8FAFC] cursor-pointer rounded-xs hover:bg-[#0C1A38] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#10B981]/20 border-2 border-[#10B981] flex items-center justify-center text-[#10B981]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-display text-xl font-bold text-[#F8FAFC]">
              Đăng tải thành công!
            </h4>
            <p className="text-sm text-[#CBD5E1] max-w-md mx-auto leading-relaxed">
              Tác phẩm của bạn đã được lưu và hiển thị trực tiếp trên Phòng Trưng Bày Sáng Tạo Học Sinh với nhãn nhận thức minh bạch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Epistemic Transparency Notice */}
            <div className="p-3.5 bg-[#050C1B] border-l-3 border-[#F59E0B] text-xs text-[#CBD5E1] flex items-start gap-2.5 rounded-r-xs">
              <ShieldCheck className="w-4 h-4 text-[#FBBF24] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#F8FAFC]">Cam kết dữ liệu thực &amp; Minh bạch khoa học (Open Science)</p>
                <p className="text-[#94A3B8] mt-0.5 leading-relaxed">
                  Bảo tàng Beyond The Signal bảo lưu 100% dữ liệu thực từ học sinh và người yêu thiên văn. Tác phẩm của bạn sẽ được hiển thị công khai cùng nhãn phân loại nhận thức do bạn chọn bên dưới.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#38BDF8] mb-1 font-bold">
                  Tên tác phẩm / Bài nghiên cứu *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Thiết kế bánh xe vượt địa hình cho Opportunity"
                  className="w-full px-3 py-2 text-sm bg-[#050C1B] border border-[#22D3EE]/30 focus:border-[#F59E0B] focus:outline-none text-[#F8FAFC] rounded-xs"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#38BDF8] mb-1 font-bold">
                  Tên tác giả / Biệt danh thật *
                </label>
                <input
                  type="text"
                  required
                  value={creatorAlias}
                  onChange={(e) => setCreatorAlias(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A (Bạn đọc yêu khoa học)"
                  className="w-full px-3 py-2 text-sm bg-[#050C1B] border border-[#22D3EE]/30 focus:border-[#F59E0B] focus:outline-none text-[#F8FAFC] rounded-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-1">
                  Trường / CLB Thiên văn
                </label>
                <input
                  type="text"
                  value={schoolOrClub}
                  onChange={(e) => setSchoolOrClub(e.target.value)}
                  placeholder="Ví dụ: THPT Chuyên / CLB Thiên văn Trẻ"
                  className="w-full px-3 py-2 text-sm bg-[#050C1B] border border-[#22D3EE]/30 focus:border-[#F59E0B] focus:outline-none text-[#F8FAFC] rounded-xs"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-1">
                  Nhiệm vụ / Thiết bị liên quan *
                </label>
                <select
                  value={relatedMission}
                  onChange={(e) => setRelatedMission(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#050C1B] border border-[#22D3EE]/30 focus:border-[#F59E0B] focus:outline-none text-[#F8FAFC] rounded-xs"
                >
                  <option value="OPPORTUNITY">Opportunity (MER-B / Sao Hỏa)</option>
                  <option value="PIONEER-11">Pioneer 11 (Sao Thổ &amp; Không gian sâu)</option>
                  <option value="SOJOURNER">Sojourner (Mars Pathfinder)</option>
                  <option value="VIKING-1">Viking 1 Lander (Sao Hỏa 1976)</option>
                  <option value="APOLLO-LRRR">Apollo 14 LRRR (Mặt Trăng)</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-1">
                  Thể loại sản phẩm *
                </label>
                <select
                  value={submissionType}
                  onChange={(e) => setSubmissionType(e.target.value as YoungExplorerSubmission['submission_type'])}
                  className="w-full px-3 py-2 text-sm bg-[#050C1B] border border-[#22D3EE]/30 focus:border-[#F59E0B] focus:outline-none text-[#F8FAFC] rounded-xs"
                >
                  <option value="Tranh / Poster">Tranh vẽ / Poster nghệ thuật</option>
                  <option value="Truyện / Bài viết">Bài nghiên cứu / Bài thu hoạch STEM</option>
                  <option value="Mô hình 3D (GLB/GLTF)">Mô hình 3D / Chế tạo vật lý</option>
                  <option value="Audio">Bản ghi âm / Âm nhạc vũ trụ</option>
                  <option value="Video / Animation">Video / Hoạt hình diễn giải</option>
                  <option value="Truyện tranh / PDF">Tài liệu / Truyện tranh PDF</option>
                </select>
              </div>
            </div>

            {/* Epistemic Label Selector */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#FBBF24] mb-1.5 font-bold">
                Nhãn phân loại mức độ xác thực khoa học *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'verified_fact', label: 'Verified Fact', desc: 'Nghiên cứu đối chiếu 100% từ hồ sơ khoa học NASA' },
                  { id: 'scientific_interpretation', label: 'Scientific Interpretation', desc: 'Mô hình hóa hoặc diễn giải nguyên lý kỹ thuật' },
                  { id: 'artistic_expression', label: 'Artistic Expression', desc: 'Tranh vẽ, âm nhạc hoặc tác phẩm nghệ thuật cảm hứng' },
                  { id: 'fiction_reconstruction', label: 'Creative Storytelling', desc: 'Tái dựng câu chuyện nhập vai hoặc kịch bản giả tưởng' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setCategory(opt.id as YoungExplorerSubmission['category'])}
                    className={`p-2.5 text-left border rounded-xs transition-colors cursor-pointer ${
                      category === opt.id
                        ? 'bg-[#0E224D] text-[#F8FAFC] border-[#F59E0B] shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                        : 'bg-[#050C1B] text-[#94A3B8] border-[#22D3EE]/20 hover:text-[#F1F5F9]'
                    }`}
                  >
                    <div className="font-mono text-xs font-bold text-[#38BDF8]">{opt.label}</div>
                    <div className="text-[11px] mt-0.5 text-[#CBD5E1]">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* File Upload Box */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-1">
                Tệp đính kèm (Ảnh, Poster, PDF, Mô hình ≤ {MAX_FILE_SIZE_MB} MB)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.mp3,.wav,.ogg,.mp4,.webm,.pdf,.glb,.gltf"
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
                className="hidden"
              />
              {!selectedFile ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-4 border border-dashed border-[#22D3EE]/40 bg-[#050C1B] hover:bg-[#0A1633] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors rounded-xs"
                >
                  <Upload className="w-5 h-5 text-[#38BDF8]" />
                  <span className="text-xs font-semibold text-[#F8FAFC]">
                    Nhấn vào đây để tải tệp lên từ máy tính
                  </span>
                  <span className="font-mono text-[10px] text-[#94A3B8]">
                    Hỗ trợ PNG, JPG, PDF, GLB, MP3 (Tối đa {MAX_FILE_SIZE_MB} MB)
                  </span>
                </button>
              ) : (
                <div className="p-3 bg-[#050C1B] border border-[#22D3EE]/40 flex items-center justify-between gap-3 rounded-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileCheck className="w-5 h-5 text-[#38BDF8] shrink-0" />
                    <div className="truncate">
                      <p className="text-xs font-semibold text-[#F8FAFC] truncate">{selectedFile.name}</p>
                      <p className="font-mono text-[10px] text-[#94A3B8]">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · {selectedFile.type || 'Tệp đa phương tiện'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2 py-1 text-[11px] font-mono bg-[#0A1633] border border-[#22D3EE]/30 text-[#38BDF8] hover:text-[#FBBF24] cursor-pointer rounded-xs"
                    >
                      Đổi tệp
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      className="px-2 py-1 text-[11px] font-mono text-[#EF4444] hover:underline cursor-pointer"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              )}
              {fileError && (
                <p className="mt-1.5 text-xs text-[#EF4444] flex items-center gap-1 font-mono">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{fileError}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#38BDF8] mb-1 font-bold">
                Tóm tắt ý tưởng &amp; Bài học khoa học *
              </label>
              <textarea
                rows={3}
                required
                value={artistStatement}
                onChange={(e) => setArtistStatement(e.target.value)}
                placeholder="Mô tả ngắn gọn sản phẩm của bạn: Bạn lấy cảm hứng từ chi tiết kỹ thuật nào của cỗ máy, và khám phá được bài học khoa học gì?"
                className="w-full px-3 py-2 text-sm bg-[#050C1B] border border-[#22D3EE]/30 focus:border-[#F59E0B] focus:outline-none text-[#F8FAFC] rounded-xs"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-[#94A3B8] mb-1">
                Liên kết dự án / Google Drive / Github / Link ảnh (Tùy chọn)
              </label>
              <input
                type="url"
                value={optionalSource}
                onChange={(e) => setOptionalSource(e.target.value)}
                placeholder="https://drive.google.com/... hoặc link dự án của bạn"
                className="w-full px-3 py-2 text-sm bg-[#050C1B] border border-[#22D3EE]/30 focus:border-[#F59E0B] focus:outline-none text-[#F8FAFC] rounded-xs"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#22D3EE]/20">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono text-[#94A3B8] hover:text-[#F8FAFC] border border-[#22D3EE]/20 hover:border-[#22D3EE]/40 cursor-pointer rounded-xs"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="btn-primary-cinematic px-5 py-2 text-xs font-mono uppercase tracking-wider font-bold cursor-pointer inline-flex items-center gap-1.5"
              >
                <Upload className="w-4 h-4 text-[#FBBF24]" />
                <span>Đăng tải sản phẩm lên triển lãm</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
