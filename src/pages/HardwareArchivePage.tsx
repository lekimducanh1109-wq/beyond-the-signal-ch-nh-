import React, { useState, useMemo } from 'react';
import {
  ARCHIVE_RECORDS,
  NASA_MEDIA_CATALOG,
  SOURCES_CATALOG,
  ArchiveRecord,
  NasaMediaItem
} from '../data/museumData';
import { NasaImage } from '../components/NasaImage';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Cpu,
  ExternalLink,
  Info,
  MapPin,
  Search,
  ShieldAlert,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface HardwareArchivePageProps {
  onNavigate: (route: string) => void;
  onOpenLightbox: (item: NasaMediaItem) => void;
}

export const HardwareArchivePage: React.FC<HardwareArchivePageProps> = ({
  onNavigate,
  onOpenLightbox
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [realmFilter, setRealmFilter] = useState<'ALL' | 'THE MOON' | 'MARS' | 'DEEP SPACE'>('ALL');
  const [expandedExhibitId, setExpandedExhibitId] = useState<string | null>('surveyor-3');
  const [openSourceDrawerId, setOpenSourceDrawerId] = useState<string | null>(null);

  const filteredRecords = useMemo(() => {
    return ARCHIVE_RECORDS.filter((rec) => {
      if (realmFilter !== 'ALL' && rec.realm !== realmFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        rec.name.toLowerCase().includes(q) ||
        rec.display_name_vi.toLowerCase().includes(q) ||
        rec.mission_name.toLowerCase().includes(q) ||
        rec.destination.toLowerCase().includes(q) ||
        rec.summary_vi.toLowerCase().includes(q) ||
        rec.quick_identity.what_is_it.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, realmFilter]);

  const toggleExhibitStory = (id: string) => {
    setExpandedExhibitId((prev) => (prev === id ? null : id));
  };

  const toggleSourceDrawer = (id: string) => {
    setOpenSourceDrawerId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-[#070E1E] text-[#E2E8F0] min-h-screen">
      {/* Page Header / Observatory Archival Banner with Galaxy Glow & HUD Circuits */}
      <section className="relative overflow-hidden border-b border-[#22D3EE]/25 py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070E1E] via-[#0B142C] to-[#070E1E]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 900px 450px at 50% -10%, rgba(34,211,238,0.22) 0%, transparent 65%), radial-gradient(ellipse 800px 400px at 80% 80%, rgba(245,158,11,0.2) 0%, transparent 60%), radial-gradient(circle 500px at 15% 50%, rgba(99,102,241,0.18) 0%, transparent 60%)'
          }}
        />

        {/* HUD Circuit Traces */}
        <svg
          className="absolute top-0 right-0 w-[550px] h-[320px] pointer-events-none hidden lg:block opacity-35"
          viewBox="0 0 550 320"
          fill="none"
        >
          <path d="M 80 0 L 220 140 L 550 140" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="6 6" />
          <path d="M 180 0 L 280 100 L 480 100" stroke="#F59E0B" strokeWidth="1.2" />
          <circle cx="220" cy="140" r="4" fill="#22D3EE" />
          <circle cx="280" cy="100" r="3" fill="#F59E0B" />
        </svg>

        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#38BDF8] flex items-center gap-2 bg-[#0B142C]/90 px-3 py-1 border border-[#22D3EE]/40 rounded-xs shadow-[0_0_12px_rgba(34,211,238,0.25)]">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]" />
              NASA SCIENTIFIC ARCHIVE · KHO THIẾT BỊ HAI TẦNG THÔNG TIN
            </span>
            <span className="font-mono text-xs text-[#94A3B8]">
              {ARCHIVE_RECORDS.length} Hồ sơ chuẩn hóa · {Object.keys(SOURCES_CATALOG).length} Nguồn đối chiếu (Tham chiếu: 11/11/2026)
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8FAFC] tracking-tight leading-tight">
            Kho thiết bị thám hiểm không gian
          </h1>

          <p className="text-base sm:text-lg text-[#CBD5E1] max-w-3xl leading-relaxed">
            Mỗi hồ sơ được biên soạn theo hai tầng: <strong>Tầng 1 (Hồ sơ tổng quan)</strong> giúp nhận diện nhanh thiết bị là gì, được gửi đi làm gì và đóng góp điều gì đáng nhớ; <strong>Tầng 2 (Triển lãm 6 chương)</strong> mở rộng câu chuyện khoa học kèm bảng đối chiếu nguồn tư liệu <code>SRC-*</code>.
          </p>

          {/* Search & Realm Filter Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-[#38BDF8] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên thiết bị, nhiệm vụ (Pathfinder, Viking, Surveyor, Spirit, InSight...)"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#0B142C]/90 text-[#F8FAFC] border border-[#22D3EE]/35 focus:border-[#F59E0B] focus:shadow-[0_0_15px_rgba(245,158,11,0.25)] focus:outline-none rounded-xs placeholder-[#94A3B8]/60 transition-all"
              />
            </div>

            <div className="md:col-span-7 flex flex-wrap gap-2">
              {[
                { id: 'ALL', label: `Tất cả (${ARCHIVE_RECORDS.length})` },
                { id: 'THE MOON', label: `THE MOON · Mặt Trăng (${ARCHIVE_RECORDS.filter(r => r.realm === 'THE MOON').length})` },
                { id: 'MARS', label: `MARS · Sao Hỏa (${ARCHIVE_RECORDS.filter(r => r.realm === 'MARS').length})` },
                { id: 'DEEP SPACE', label: `DEEP SPACE · Không gian sâu (${ARCHIVE_RECORDS.filter(r => r.realm === 'DEEP SPACE').length})` }
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setRealmFilter(btn.id as typeof realmFilter)}
                  className={`px-3.5 py-2 font-mono text-xs uppercase tracking-wider border transition-all duration-300 cursor-pointer rounded-xs ${
                    realmFilter === btn.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold border-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.4)]'
                      : 'bg-[#0B142C]/80 text-[#94A3B8] border-[#22D3EE]/30 hover:border-[#22D3EE] hover:text-[#38BDF8] hover:shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Device Records List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {filteredRecords.map((rec: ArchiveRecord) => {
          const primaryMedia = NASA_MEDIA_CATALOG[rec.media_id];
          const secondaryMediaList = (rec.secondary_media_ids || [])
            .map((id) => NASA_MEDIA_CATALOG[id])
            .filter(Boolean);
          const isStoryOpen = expandedExhibitId === rec.id;
          const isSourcesOpen = openSourceDrawerId === rec.id;

          return (
            <article
              key={rec.id}
              id={`device-${rec.id}`}
              className="hud-card bg-[#0B142C]/85 backdrop-blur-md border border-[#22D3EE]/35 rounded-md shadow-[0_0_24px_rgba(34,211,238,0.12)] hover:border-[#F59E0B]/60 transition-all duration-300 overflow-hidden"
            >
              {/* Top Archival Metadata Bar */}
              <div className="px-6 py-3.5 bg-[#07111F]/90 border-b border-[#22D3EE]/25 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-[#0B142C] text-[#38BDF8] border border-[#22D3EE]/40 font-mono text-xs font-semibold uppercase rounded-xs shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                    {rec.code_id}
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#0B142C]/80 border border-[#22D3EE]/20 font-mono text-xs text-[#E2E8F0] rounded-xs">
                    Miền: {rec.realm} · {rec.destination}
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#0B142C]/80 border border-[#22D3EE]/20 font-mono text-xs text-[#94A3B8] rounded-xs">
                    {rec.record_depth === 'featured' ? 'Hồ sơ triển lãm trọng tâm' : 'Hồ sơ nhập môn chuẩn hóa'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {rec.verification_state === 'verified' ? (
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-[#38BDF8]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
                      Đã đối chiếu nguồn ({rec.source_ids.length} nguồn)
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1 font-mono text-xs text-[#FBBF24]"
                      title="Mốc ngày ngừng hoạt động của Viking 1 Lander trong tháng 11/1982 được hiển thị cấp tháng/năm để đảm bảo tính chính xác"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-[#FBBF24]" />
                      Có mục hiển thị cấp tháng/năm (needs_review)
                    </span>
                  )}
                </div>
              </div>

              {/* LEVEL 1 — QUICK DEVICE OVERVIEW */}
              <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* Left Column: Overview + 3 Core Questions + Key Facts + Semantic Dates */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="font-mono text-xs text-[#FBBF24] uppercase tracking-wider font-semibold">
                      Nhiệm vụ: {rec.mission_name} · Phân loại: {rec.hardware_tags.join(' / ')}
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] mt-1">
                      {rec.display_name_vi}
                    </h2>
                    <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed mt-2.5">
                      {rec.summary_vi}
                    </p>
                  </div>

                  {rec.host_mission_note_vi && (
                    <div className="p-3.5 bg-[#07111F]/90 border-l-4 border-[#FB923C] text-xs text-[#E2E8F0] leading-relaxed rounded-r-xs shadow-inner">
                      <strong className="text-[#FB923C]">Lưu ý phân biệt nhiệm vụ & phần cứng:</strong> {rec.host_mission_note_vi}
                    </div>
                  )}

                  {/* Three Quick Questions - rendered on cosmic glass HUD cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="p-4 bg-[#07111F]/90 text-[#E2E8F0] border border-[#22D3EE]/30 rounded-xs hover:border-[#22D3EE]/60 transition-colors shadow-inner">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#38BDF8] block font-bold">
                        Câu hỏi 01 · Nhận diện
                      </span>
                      <div className="font-display font-bold text-xs uppercase text-[#94A3B8] mt-0.5">
                        Đây là thiết bị gì?
                      </div>
                      <p className="text-xs sm:text-[13px] font-semibold text-[#F8FAFC] mt-1.5 leading-snug">
                        {rec.quick_identity.what_is_it}
                      </p>
                    </div>

                    <div className="p-4 bg-[#07111F]/90 text-[#E2E8F0] border border-[#22D3EE]/30 rounded-xs hover:border-[#22D3EE]/60 transition-colors shadow-inner">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#FBBF24] block font-bold">
                        Câu hỏi 02 · Sứ mệnh
                      </span>
                      <div className="font-display font-bold text-xs uppercase text-[#94A3B8] mt-0.5">
                        NASA gửi nó đi để làm gì?
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#CBD5E1] mt-1.5 leading-snug">
                        {rec.quick_identity.why_sent}
                      </p>
                    </div>

                    <div className="p-4 bg-[#07111F]/90 text-[#E2E8F0] border border-[#22D3EE]/30 rounded-xs hover:border-[#22D3EE]/60 transition-colors shadow-inner">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#38BDF8] block font-bold">
                        Câu hỏi 03 · Dấu ấn
                      </span>
                      <div className="font-display font-bold text-xs uppercase text-[#94A3B8] mt-0.5">
                        Đóng góp điều gì đáng nhớ?
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#CBD5E1] mt-1.5 leading-snug">
                        {rec.quick_identity.what_makes_it_special}
                      </p>
                    </div>
                  </div>

                  {/* Key Metrics with Units & Source IDs */}
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-[#E9EDF2] mb-2.5">
                      Thông số định lượng & đơn vị (kèm mã nguồn):
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {rec.quick_identity.key_metrics.map((m, idx) => (
                        <div key={idx} className="p-3 bg-[#14243A] border border-[#283A58] rounded-xs">
                          <div className="font-mono text-[10px] text-[#A9B4C4]">{m.label}</div>
                          <div className="font-display text-lg font-bold text-[#E9EDF2] mt-0.5">
                            {m.value}{' '}
                            {m.unit && (
                              <span className="font-mono text-xs font-normal text-[#C5A46A]">
                                {m.unit}
                              </span>
                            )}
                          </div>
                          <div className="font-mono text-[10px] text-[#A9B4C4] mt-1">
                            Nguồn: {m.source_id}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Distinct Semantic Mission Dates */}
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-[#E9EDF2] mb-2.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A46A]" />
                      <span>Các mốc thời gian tách biệt theo ngữ nghĩa (Không gộp chung “Ngày kết thúc”):</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {rec.quick_identity.date_milestones.map((dm, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-[#14243A] border border-[#283A58] rounded-xs flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[#C5A46A]">
                              {dm.label_vi}
                            </span>
                            {dm.needs_review && (
                              <span className="px-1.5 py-0.5 bg-[#C5A46A]/20 text-[#C5A46A] font-mono text-[10px]">
                                Cấp tháng/năm
                              </span>
                            )}
                          </div>
                          <div className="font-mono text-sm font-bold text-[#E9EDF2] mt-1">
                            {dm.value_display}
                          </div>
                          {dm.convention_note_vi && (
                            <div className="text-[11px] text-[#A9B4C4] mt-1">
                              {dm.convention_note_vi}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Location & Editorial Note */}
                  <div className="p-3.5 bg-[#14243A] border-l-3 border-[#C5A46A] text-xs text-[#E9EDF2] space-y-1">
                    <div className="font-mono text-[11px] text-[#C5A46A] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C96F46]" />
                      <span>Địa điểm hạ cánh / hoạt động: {rec.quick_identity.landing_or_operation_site}</span>
                    </div>
                    <p className="text-[#A9B4C4] leading-relaxed">
                      <strong className="text-[#E9EDF2]">Ghi chú biên tập khoa học:</strong> {rec.editorial_note_vi}
                    </p>
                  </div>

                  {/* Action Bar: Expand 6-Part Story, Dedicated Exhibit Route, Source Drawer, Verified 3D Model */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    {rec.is_complete_exhibit && rec.exhibit_slug && (
                      <button
                        type="button"
                        onClick={() => onNavigate(rec.exhibit_slug!)}
                        className="btn-primary-rust inline-flex items-center gap-2 cursor-pointer font-mono text-xs uppercase"
                      >
                        <span>Khám phá triển lãm chuyên sâu</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}

                    {rec.verified_model_3d_url && (
                      <a
                        href={rec.verified_model_3d_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#C5A46A]/20 hover:bg-[#C5A46A]/30 text-[#C5A46A] hover:text-[#E9EDF2] border border-[#C5A46A]/50 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Mô hình 3D NASA xác minh (MER-B)</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleExhibitStory(rec.id)}
                      className="btn-secondary-outline inline-flex items-center gap-2 cursor-pointer font-mono text-xs uppercase"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#C5A46A]" />
                      <span>
                        {isStoryOpen
                          ? 'Thu gọn Tầng 2 (Câu chuyện 6 chương)'
                          : 'Mở Tầng 2: Câu chuyện triển lãm 6 chương'}
                      </span>
                      {isStoryOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleSourceDrawer(rec.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#14243A] hover:bg-[#283A58] text-[#A9B4C4] hover:text-[#E9EDF2] border border-[#283A58] font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer rounded-xs"
                    >
                      <Info className="w-3.5 h-3.5 text-[#6FB7C9]" />
                      <span>Nguồn tư liệu ({rec.source_ids.length})</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Verified NASA Image + Secondary Thumbnails */}
                <div className="lg:col-span-5 space-y-4">
                  {primaryMedia && (
                    <div className="border border-[#283A58] rounded-sm overflow-hidden shadow-lg">
                      <NasaImage
                        item={primaryMedia}
                        onOpenLightbox={onOpenLightbox}
                        aspectRatio="wide"
                      />
                    </div>
                  )}

                  {secondaryMediaList.length > 0 && (
                    <div className="space-y-2">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#A9B4C4] block">
                        Tư liệu hình ảnh & sơ đồ bổ sung ({secondaryMediaList.length}):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {secondaryMediaList.slice(0, 2).map((secItem) => (
                          <div key={secItem.id} className="border border-[#283A58] rounded-xs overflow-hidden">
                            <NasaImage
                              item={secItem}
                              onOpenLightbox={onOpenLightbox}
                              aspectRatio="video"
                              compactCaption
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SOURCE DRAWER ("Nguồn tư liệu" Control per Section 7) */}
              {isSourcesOpen && (
                <div className="px-6 sm:px-8 lg:px-10 py-6 bg-[#07111F] border-t border-[#283A58] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-base font-bold text-[#E9EDF2]">
                      Danh mục Nguồn tư liệu đối chiếu cho {rec.name} ({rec.code_id})
                    </h3>
                    <span className="font-mono text-xs text-[#C5A46A]">
                      Ngày kiểm tra gần nhất: 11/11/2026
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {rec.source_ids.map((sid) => {
                      const src = SOURCES_CATALOG[sid];
                      if (!src) return null;
                      return (
                        <div
                          key={src.id}
                          className="p-4 bg-[#0D1B2E] border border-[#283A58] rounded-xs flex flex-col justify-between gap-2"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="px-2 py-0.5 bg-[#14243A] text-[#C5A46A] border border-[#C5A46A]/30 font-mono text-[11px]">
                                {src.id}
                              </span>
                              <span className="font-mono text-[11px] text-[#A9B4C4]">
                                {src.source_type}
                              </span>
                            </div>
                            <h4 className="font-display font-bold text-sm text-[#E9EDF2] mt-1.5">
                              {src.title}
                            </h4>
                            <p className="text-xs text-[#A9B4C4] mt-1 leading-relaxed">
                              <strong>Nội dung xác minh:</strong> {src.supports.join(' · ')}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-[#283A58] flex items-center justify-between font-mono text-[11px]">
                            <span className="text-[#A9B4C4]/70">Kiểm tra: {src.last_checked}</span>
                            <a
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[#C5A46A] hover:text-[#E9EDF2] underline underline-offset-4"
                            >
                              <span>Mở liên kết gốc</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* LEVEL 2 — FULL SIX-SECTION EXHIBIT NARRATIVE */}
              {isStoryOpen && (
                <div className="px-6 sm:px-8 lg:px-10 py-8 bg-[#07111F] border-t border-[#283A58] space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#283A58] pb-4">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-[#C96F46]">
                        TẦNG 2 · TRIỂN LÃM 6 CHƯƠNG · {rec.code_id}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#E9EDF2]">
                        Hành trình khoa học của {rec.name} qua 6 lát cắt
                      </h3>
                    </div>
                    {rec.is_complete_exhibit && rec.exhibit_slug && (
                      <button
                        type="button"
                        onClick={() => onNavigate(rec.exhibit_slug!)}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#C5A46A] hover:text-[#E9EDF2] underline underline-offset-4 cursor-pointer"
                      >
                        <span>Mở toàn trang triển lãm tương tác của {rec.name}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Six Narrative Sections Grid - Cosmic Glass HUD Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { num: '01', code: 'THE QUESTION', vi: 'Câu hỏi dẫn đường', text: rec.story.question },
                      { num: '02', code: 'THE MACHINE', vi: 'Cỗ máy & Cấu tạo', text: rec.story.machine },
                      { num: '03', code: 'THE JOURNEY', vi: 'Hành trình & Cột mốc', text: rec.story.journey },
                      { num: '04', code: 'THE DISCOVERY', vi: 'Phát hiện khoa học', text: rec.story.discovery },
                      { num: '05', code: 'THE LAST SIGNAL', vi: 'Tín hiệu cuối cùng', text: rec.story.last_signal },
                      { num: '06', code: 'THE LEGACY', vi: 'Di sản để lại', text: rec.story.legacy }
                    ].map((chap) => (
                      <div
                        key={chap.code}
                        className="p-5 bg-[#07111F]/90 backdrop-blur-md text-[#E2E8F0] border border-[#22D3EE]/30 hover:border-[#F59E0B]/70 rounded-xs flex flex-col justify-between shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all duration-300"
                      >
                        <div>
                          <div className="flex items-center justify-between font-mono text-xs mb-2">
                            <span className="font-bold text-[#FBBF24]">{chap.num} · {chap.code}</span>
                            <span className="text-[#38BDF8] font-semibold">{chap.vi}</span>
                          </div>
                          <p className="text-sm text-[#CBD5E1] leading-relaxed">
                            {chap.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Hardware Components & Semantic Timeline Split */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                    {/* Components List */}
                    <div className="lg:col-span-5 space-y-3">
                      <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-[#E9EDF2] flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-[#C5A46A]" />
                        <span>Cấu tạo & Thiết bị khoa học chính ({rec.components.length})</span>
                      </h4>
                      <div className="space-y-2.5">
                        {rec.components.map((comp, i) => (
                          <div key={i} className="p-3.5 bg-[#0D1B2E] border border-[#283A58] rounded-xs">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-display font-bold text-sm text-[#E9EDF2]">
                                {comp.name}
                              </span>
                              <span className="font-mono text-[10px] text-[#C5A46A]">
                                {comp.source_ids.join(', ')}
                              </span>
                            </div>
                            <p className="text-xs text-[#A9B4C4] mt-1 leading-relaxed">
                              {comp.role}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Semantic Timeline */}
                    <div className="lg:col-span-7 space-y-3">
                      <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-[#E9EDF2] flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#C96F46]" />
                        <span>Trục thời gian nhiệm vụ (Phân tách từng mốc sự kiện)</span>
                      </h4>
                      <div className="space-y-2.5">
                        {rec.timeline.map((ev, i) => (
                          <div
                            key={i}
                            className="p-3.5 bg-[#0D1B2E] border border-[#283A58] rounded-xs flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                          >
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-xs font-bold text-[#C5A46A]">
                                  {ev.date}
                                </span>
                                {ev.semantic_label_vi && (
                                  <span className="px-2 py-0.5 bg-[#14243A] border border-[#283A58] font-mono text-[10px] text-[#A9B4C4]">
                                    {ev.semantic_label_vi}
                                  </span>
                                )}
                              </div>
                              <div className="font-display font-bold text-sm text-[#E9EDF2]">
                                {ev.title_vi}
                              </div>
                              <p className="text-xs text-[#A9B4C4] leading-relaxed">
                                {ev.detail_vi}
                              </p>
                              {ev.timezone_note_vi && (
                                <p className="font-mono text-[11px] text-[#6FB7C9]">
                                  • {ev.timezone_note_vi}
                                </p>
                              )}
                            </div>
                            {ev.source_ids && (
                              <span className="font-mono text-[10px] text-[#A9B4C4]/70 shrink-0">
                                {ev.source_ids.join(', ')}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
