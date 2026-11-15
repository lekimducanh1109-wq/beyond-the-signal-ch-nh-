import React, { useState } from 'react';
import {
  ARCHIVE_RECORDS,
  MISSIONS_DATA,
  NASA_MEDIA_CATALOG,
  SOURCES_CATALOG,
  HOTSPOTS_PIONEER_DIAGRAM,
  HOTSPOTS_PLAQUE,
  NasaMediaItem
} from '../data/museumData';
import { NasaImage } from '../components/NasaImage';
import {
  Calendar,
  Cpu,
  ExternalLink,
  Info,
  Radio,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';
import { StoryMode } from '../components/StoryMode';
import { TeamProducts } from '../components/TeamProducts';

interface Pioneer11ExhibitPageProps {
  onOpenLightbox: (item: NasaMediaItem) => void;
}

export const Pioneer11ExhibitPage: React.FC<Pioneer11ExhibitPageProps> = ({
  onOpenLightbox
}) => {
  const mission = MISSIONS_DATA['pioneer-11'];
  const record = ARCHIVE_RECORDS.find((r) => r.id === 'pioneer-11')!;
  const [activeDiagramIdx, setActiveDiagramIdx] = useState(0);
  const [activePlaqueIdx, setActivePlaqueIdx] = useState(0);
  const [showAllInstruments, setShowAllInstruments] = useState(false);
  const [showSourcesDrawer, setShowSourcesDrawer] = useState(true);

  const chapters = [
    { id: 'cau-chuyen', code: '🔊 NGHE', label: 'Lời kể sáng tác dựa trên dữ kiện' },
    { id: 'san-pham-doi', code: 'SẢN PHẨM', label: 'Video · Nhạc · Truyện tranh' },
    { id: 'the-question', code: '01 · THE QUESTION', label: 'Câu hỏi dẫn đường' },
    { id: 'the-machine', code: '02 · THE MACHINE', label: 'Cỗ máy & Sơ đồ thiết bị' },
    { id: 'the-journey', code: '03 · THE JOURNEY', label: 'Hành trình qua Sao Mộc & Sao Thổ' },
    { id: 'the-discovery', code: '04 · THE DISCOVERY', label: 'Phát hiện khoa học' },
    { id: 'the-last-signal', code: '05 · THE LAST SIGNAL', label: 'Hai mốc tín hiệu cuối (1995)' },
    { id: 'the-legacy', code: '06 · THE LEGACY', label: 'Pioneer Plaque & Nguồn tư liệu' }
  ];

  const currentDiagramSpot = HOTSPOTS_PIONEER_DIAGRAM[activeDiagramIdx] || HOTSPOTS_PIONEER_DIAGRAM[0];
  const currentPlaqueSpot = HOTSPOTS_PLAQUE[activePlaqueIdx] || HOTSPOTS_PLAQUE[0];

  return (
    <div className="bg-[#070E1E] text-[#E2E8F0] min-h-screen">
      {/* Cinematic Threshold Header with Galaxy Glow & HUD Circuit Traces */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#070E1E] via-[#0B142C] to-[#070E1E] border-b border-[#22D3EE]/25 py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        {/* Galaxy Nebula Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 900px 500px at 45% -10%, rgba(34,211,238,0.22) 0%, transparent 65%), radial-gradient(ellipse 800px 450px at 85% 75%, rgba(245,158,11,0.2) 0%, transparent 60%), radial-gradient(circle 500px at 15% 50%, rgba(99,102,241,0.18) 0%, transparent 60%)'
          }}
        />

        {/* HUD Circuit Traces */}
        <svg
          className="absolute top-0 right-0 w-[550px] h-[340px] pointer-events-none hidden lg:block opacity-35"
          viewBox="0 0 550 340"
          fill="none"
        >
          <path d="M 100 0 L 260 160 L 550 160" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="6 6" />
          <path d="M 200 0 L 320 120 L 500 120" stroke="#F59E0B" strokeWidth="1.2" />
          <circle cx="260" cy="160" r="4" fill="#22D3EE" />
          <circle cx="320" cy="120" r="3" fill="#F59E0B" />
        </svg>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold rounded-xs shadow-[0_0_12px_rgba(245,158,11,0.35)]">
                TRIỂN LÃM CHUYÊN SÂU · MIỀN III: DEEP SPACE
              </span>
              <span className="px-2.5 py-0.5 bg-[#0B142C]/90 text-[#38BDF8] border border-[#22D3EE]/40 rounded-xs shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                {mission.official_designation}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8FAFC] tracking-tight">
              {record.display_name_vi}
            </h1>

            <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed">
              {record.summary_vi}
            </p>

            {/* Level 1 Key Fact Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-[#07111F]/90 border border-[#22D3EE]/30 rounded-xs hover:border-[#22D3EE]/60 transition-colors shadow-inner">
                <div className="font-mono text-[10px] uppercase text-[#38BDF8] font-bold">Khối lượng &amp; Thiết bị</div>
                <div className="font-display text-lg font-bold text-[#F8FAFC] mt-0.5">258,5 kg</div>
                <div className="font-mono text-[10px] text-[#FBBF24]">12 thiết bị khoa học</div>
              </div>
              <div className="p-3 bg-[#07111F]/90 border border-[#22D3EE]/30 rounded-xs hover:border-[#22D3EE]/60 transition-colors shadow-inner">
                <div className="font-mono text-[10px] uppercase text-[#38BDF8] font-bold">Bay qua Sao Thổ</div>
                <div className="font-display text-lg font-bold text-[#F8FAFC] mt-0.5">01/09/1979</div>
                <div className="font-mono text-[10px] text-[#94A3B8]">Tàu đầu tiên trong lịch sử</div>
              </div>
              <div className="p-3 bg-[#07111F]/90 border border-[#22D3EE]/30 rounded-xs hover:border-[#22D3EE]/60 transition-colors shadow-inner">
                <div className="font-mono text-[10px] uppercase text-[#38BDF8] font-bold">Liên lạc cuối</div>
                <div className="font-display text-lg font-bold text-[#F8FAFC] mt-0.5">30/09/1995</div>
                <div className="font-mono text-[10px] text-[#94A3B8]">NASA Ames (SRC-PIO-01)</div>
              </div>
              <div className="p-3 bg-[#07111F]/90 border border-[#F59E0B]/40 rounded-xs hover:border-[#F59E0B]/70 transition-colors shadow-inner">
                <div className="font-mono text-[10px] uppercase text-[#FBBF24] font-bold">Dữ liệu kỹ thuật cuối</div>
                <div className="font-display text-lg font-bold text-[#FBBF24] mt-0.5">24/11/1995</div>
                <div className="font-mono text-[10px] text-[#94A3B8]">Mốc độc lập (SRC-PIO-01)</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-[#22D3EE]/35 rounded-md overflow-hidden shadow-[0_0_24px_rgba(34,211,238,0.18)]">
              <NasaImage
                item={NASA_MEDIA_CATALOG['IMG-PIO-01']}
                onOpenLightbox={onOpenLightbox}
                aspectRatio="square"
                priority
                darkSurface
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky 6-Chapter Navigation */}
      <nav
        aria-label="Điều hướng 6 chương triển lãm Pioneer 11"
        className="sticky top-16 z-30 bg-[#070E1E]/90 backdrop-blur-md border-b border-[#22D3EE]/30 shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-2 overflow-x-auto">
          {chapters.map((ch) => (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              className="px-3 py-1.5 bg-[#0B142C]/80 hover:bg-[#22D3EE]/15 hover:border-[#22D3EE] hover:text-[#38BDF8] text-[#94A3B8] border border-[#22D3EE]/25 font-mono text-xs whitespace-nowrap rounded-xs transition-colors"
            >
              <strong className="text-[#FBBF24]">{ch.code}</strong> · {ch.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Story-first: first-person narration with listen mode */}
      <StoryMode storyId="pioneer-11" onOpenLightbox={onOpenLightbox} />

      {/* Team creative products (video / music / comic) */}
      <TeamProducts missionId="pioneer-11" />

      <div id="ho-so-chi-tiet" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-bold">Dành cho bạn muốn tìm hiểu sâu hơn</span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] mt-1">Hồ sơ khoa học chi tiết</h2>
      </div>

      {/* Main 6-Part Story Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* 01. THE QUESTION */}
        <section id="the-question" className="hud-card bg-[#0B142C]/85 backdrop-blur-md border border-[#22D3EE]/35 shadow-[0_0_24px_rgba(34,211,238,0.12)] hover:border-[#F59E0B]/60 p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-[#E2E8F0] rounded-md transition-all duration-300">
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-bold">
              01 · THE QUESTION · CÂU HỎI DẪN ĐƯỜNG
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
              “{record.story.question}”
            </h2>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
              {mission.science_goal_vi}
            </p>
            <div className="p-4 bg-[#07111F]/90 border-l-4 border-[#F59E0B] text-xs text-[#CBD5E1] space-y-1 rounded-r-xs shadow-inner">
              <strong className="text-[#FBBF24] block">Lưu ý quan trọng về bức ảnh “Pioneer 11 at Saturn” (IMG-PIO-01):</strong>
              <span>
                Bức ảnh nổi tiếng chụp ngày 01/09/1979 từ khoảng cách ~2.846.000 km là hình ảnh <strong>Sao Thổ, hệ thống vành đai và mặt trăng Titan do chính Pioneer 11 chụp</strong>, không phải bức ảnh chụp thân tàu Pioneer 11.
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-[#22D3EE]/30 rounded-md overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.15)]">
              <NasaImage
                item={NASA_MEDIA_CATALOG['IMG-PIO-01']}
                onOpenLightbox={onOpenLightbox}
                aspectRatio="video"
                darkSurface
              />
            </div>
          </div>
        </section>

        {/* 02. THE MACHINE */}
        <section id="the-machine" className="hud-card bg-[#0B142C]/85 backdrop-blur-md border border-[#22D3EE]/35 shadow-[0_0_24px_rgba(34,211,238,0.12)] hover:border-[#F59E0B]/60 p-6 sm:p-8 lg:p-10 space-y-8 text-[#E2E8F0] rounded-md transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#22D3EE]/20 pb-5">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-bold">
                02 · THE MACHINE · CỖ MÁY & SƠ ĐỒ THIẾT BỊ KHOA HỌC
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] mt-1">
                Kiến trúc tàu bay ngang (Flyby) dùng nguồn điện đồng vị phóng xạ SNAP-19 RTG
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setShowAllInstruments(!showAllInstruments)}
              className="px-4 py-2 bg-[#07111F]/90 hover:bg-[#22D3EE]/15 border border-[#22D3EE]/40 hover:border-[#22D3EE] text-[#38BDF8] font-mono text-xs uppercase tracking-wider cursor-pointer self-start rounded-xs transition-colors shadow-[0_0_12px_rgba(34,211,238,0.15)]"
            >
              {showAllInstruments ? 'Thu gọn danh sách thiết bị' : 'Xem danh sách thiết bị khoa học (Expand)'}
            </button>
          </div>

          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed max-w-4xl">
            {record.story.machine} {mission.power_system_vi}
          </p>

          {/* Interactive Pioneer Spacecraft Diagram (IMG-PIO-02) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-[#07111F]/95 p-4 border border-[#22D3EE]/30 rounded-md shadow-[0_0_20px_rgba(34,211,238,0.12)]">
              <div className="mb-2 flex items-center justify-between font-mono text-[11px]">
                <span className="px-2 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold uppercase tracking-wider rounded-xs">
                  Minh họa giáo dục · Sơ đồ cấu tạo tương tác
                </span>
                <span className="text-[#38BDF8]">Tương tác điểm nóng #1–#4</span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden bg-[#070E1E] rounded-sm border border-[#22D3EE]/25">
                <img
                  src={
                    NASA_MEDIA_CATALOG['IMG-PIO-02'].local_asset_url ||
                    NASA_MEDIA_CATALOG['IMG-PIO-02'].direct_asset_url ||
                    ''
                  }
                  alt={NASA_MEDIA_CATALOG['IMG-PIO-02'].alt_vi}
                  className="w-full h-full object-contain"
                />
                {HOTSPOTS_PIONEER_DIAGRAM.map((spot, idx) => (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveDiagramIdx(idx)}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className={`-translate-x-1/2 -translate-y-1/2 absolute w-8 h-8 rounded-full font-mono text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                      idx === activeDiagramIdx
                        ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/50 scale-110 shadow-[0_0_15px_#F59E0B]'
                        : 'bg-[#0B142C]/90 text-[#38BDF8] border border-[#22D3EE]/60 shadow-[0_0_10px_rgba(34,211,238,0.25)]'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <div className="pt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#94A3B8]">
                <span>Sơ đồ dùng chung cho tàu Pioneer 10 và Pioneer 11 (IMG-PIO-02 · Credit: NASA)</span>
                <button
                  type="button"
                  onClick={() => onOpenLightbox(NASA_MEDIA_CATALOG['IMG-PIO-02'])}
                  className="text-[#FBBF24] hover:underline cursor-pointer font-bold"
                >
                  Phóng lớn sơ đồ gốc
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 bg-[#07111F]/90 border-l-4 border-[#38BDF8] rounded-r-xs space-y-2 shadow-inner">
                <span className="font-mono text-xs uppercase text-[#38BDF8] font-bold">
                  Điểm chú thích #{activeDiagramIdx + 1}
                </span>
                <h3 className="font-display text-lg font-bold text-[#F8FAFC]">
                  {currentDiagramSpot.title_vi}
                </h3>
                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                  {currentDiagramSpot.description_vi}
                </p>
              </div>

              <div className="space-y-2">
                {HOTSPOTS_PIONEER_DIAGRAM.map((spot, idx) => (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveDiagramIdx(idx)}
                    className={`w-full p-3 text-left border font-mono text-xs rounded-xs transition-colors cursor-pointer ${
                      idx === activeDiagramIdx
                        ? 'bg-[#070E1E] text-[#FBBF24] border-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                        : 'bg-[#07111F]/80 text-[#CBD5E1] border-[#22D3EE]/25 hover:border-[#22D3EE]/60 hover:text-[#38BDF8]'
                    }`}
                  >
                    0{idx + 1}. {spot.title_vi}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {showAllInstruments && (
            <div className="pt-4 border-t border-[#22D3EE]/20 grid grid-cols-1 md:grid-cols-3 gap-3">
              {mission.instruments.map((inst, i) => (
                <div key={i} className="p-4 bg-[#07111F]/90 border border-[#22D3EE]/25 rounded-xs flex flex-col justify-between shadow-inner">
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#F8FAFC]">
                      {inst.name}
                    </h4>
                    <p className="text-xs text-[#CBD5E1] mt-1 leading-relaxed">
                      {inst.function_vi}
                    </p>
                  </div>
                  <div className="font-mono text-[10px] text-[#94A3B8] mt-3 pt-2 border-t border-[#22D3EE]/20">
                    Nguồn: {(inst.source_ids || ['SRC-PIO-01']).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 03. THE JOURNEY */}
        <section id="the-journey" className="hud-card bg-[#0B142C]/85 backdrop-blur-md border border-[#22D3EE]/35 shadow-[0_0_24px_rgba(34,211,238,0.12)] hover:border-[#F59E0B]/60 p-6 sm:p-8 lg:p-10 space-y-6 text-[#E2E8F0] rounded-md transition-all duration-300">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#FBBF24] font-bold">
              03 · THE JOURNEY · HÀNH TRÌNH QUA SAO MỘC, SAO THỔ &amp; KHÔNG GIAN SÂU
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] mt-1">
              Trục thời gian 22 năm truyền tín hiệu (1973 – 1995)
            </h2>
            <p className="text-sm sm:text-base text-[#CBD5E1] mt-2 max-w-3xl leading-relaxed">
              {record.story.journey}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mission.timeline.map((ev, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#07111F]/90 border border-[#22D3EE]/25 hover:border-[#F59E0B]/60 rounded-xs flex flex-col justify-between gap-2 shadow-inner transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#FBBF24] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#FBBF24]" />
                      {ev.date}
                    </span>
                    {ev.semantic_label_vi && (
                      <span className="px-2 py-0.5 bg-[#0B142C] border border-[#22D3EE]/30 font-mono text-[10px] text-[#38BDF8] rounded-xs">
                        {ev.semantic_label_vi}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-base text-[#F8FAFC] mt-1.5">
                    {ev.title_vi}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] mt-1 leading-relaxed">
                    {ev.detail_vi}
                  </p>
                  {ev.timezone_note_vi && (
                    <p className="font-mono text-[11px] text-[#38BDF8] mt-1">
                      • {ev.timezone_note_vi}
                    </p>
                  )}
                </div>
                <div className="pt-2 border-t border-[#22D3EE]/20 font-mono text-[10px] text-[#94A3B8]">
                  Nguồn: {(ev.source_ids || ['SRC-PIO-01']).join(', ')}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 04. THE DISCOVERY */}
        <section id="the-discovery" className="hud-card bg-[#0B142C]/85 backdrop-blur-md border border-[#22D3EE]/35 shadow-[0_0_24px_rgba(34,211,238,0.12)] hover:border-[#F59E0B]/60 p-6 sm:p-8 lg:p-10 space-y-6 text-[#E2E8F0] rounded-md transition-all duration-300">
          <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-bold">
            04 · THE DISCOVERY · PHÁT HIỆN KHOA HỌC
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
            Khám phá vùng cực Sao Mộc, vành F Sao Thổ và môi trường từ quyển
          </h2>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed max-w-4xl">
            {record.story.discovery}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mission.key_discoveries_vi.map((disc, i) => (
              <div key={i} className="p-4 bg-[#07111F]/90 border border-[#22D3EE]/25 rounded-xs flex items-start gap-3 shadow-inner hover:border-[#22D3EE]/60 transition-colors">
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#0B142C] text-[#38BDF8] border border-[#22D3EE]/30 rounded-xs shrink-0">
                  0{i + 1}
                </span>
                <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed">{disc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#07111F]/90 border-l-4 border-[#F59E0B] rounded-r-xs space-y-1.5 shadow-inner">
            <div className="font-mono text-xs uppercase tracking-wider font-semibold text-[#FBBF24] flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-[#FBBF24]" />
              <span>Quy chuẩn phân biệt khái niệm khoa học (Content Rules &amp; QA)</span>
            </div>
            <ul className="list-disc list-inside text-xs text-[#CBD5E1] space-y-1">
              {(mission.do_not_claim_vi || []).map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 05. THE LAST SIGNAL */}
        <section id="the-last-signal" className="hud-card bg-[#070E1E]/95 text-[#E2E8F0] border border-[#22D3EE]/40 shadow-[0_0_30px_rgba(34,211,238,0.15)] p-6 sm:p-8 lg:p-10 space-y-6 relative overflow-hidden rounded-md">
          {/* Signal waveform divider */}
          <div className="signal-waveform-divider my-2">
            <svg viewBox="0 0 100 20" className="w-32 h-6">
              <path
                d="M 0 10 Q 15 2, 25 10 T 50 10 T 70 10 L 100 10"
                fill="none"
                stroke="#22D3EE"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <span className="font-mono text-xs uppercase tracking-widest text-[#FBBF24] flex items-center gap-1.5 font-bold">
            <Radio className="w-4 h-4 text-[#22D3EE]" />
            <span>05 · THE LAST SIGNAL · HAI MỐC TÍN HIỆU CUỐI TÁCH BIỆT NĂM 1995</span>
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
            Vì sao 30/09/1995 và 24/11/1995 không được gộp làm một?
          </h2>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed max-w-4xl">
            {record.story.last_signal}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-mono text-xs">
            <div className="p-5 bg-[#0B142C]/90 border border-[#F59E0B]/50 rounded-xs space-y-2 shadow-inner">
              <span className="text-[10px] uppercase tracking-wider text-[#FBBF24] font-bold">
                Mốc 1 · Lần liên lạc điều hành cuối của NASA Ames
              </span>
              <div className="font-display text-2xl font-bold text-[#F8FAFC]">
                30/09/1995
              </div>
              <p className="text-xs text-[#CBD5E1] font-sans leading-relaxed">
                NASA Ames Research Center chấm dứt các phiên liên lạc điều hành thường xuyên khi nguồn điện từ các máy phát RTG không còn đủ duy trì các thiết bị và việc điều hướng ăng-ten về phía Trái Đất (Nguồn: SRC-PIO-01).
              </p>
            </div>

            <div className="p-5 bg-[#0B142C]/90 border border-[#22D3EE]/30 rounded-xs space-y-2 shadow-inner">
              <span className="text-[10px] uppercase tracking-wider text-[#38BDF8] font-bold">
                Mốc 2 · Dữ liệu kỹ thuật cuối cùng nhận được
              </span>
              <div className="font-display text-2xl font-bold text-[#F8FAFC]">
                24/11/1995
              </div>
              <p className="text-xs text-[#CBD5E1] font-sans leading-relaxed">
                Các nhà khoa học thu nhận được thêm vài phút dữ liệu kỹ thuật cuối cùng từ Pioneer 11 trước khi con tàu hoàn toàn im lặng trên hành trình hướng ra ngoài Hệ Mặt Trời (Nguồn: SRC-PIO-01, SRC-PIO-03).
              </p>
            </div>
          </div>
        </section>

        {/* 06. THE LEGACY — PIONEER PLAQUE & SOURCE DRAWER */}
        <section id="the-legacy" className="hud-card bg-[#0B142C]/85 backdrop-blur-md border border-[#22D3EE]/35 shadow-[0_0_24px_rgba(34,211,238,0.12)] hover:border-[#F59E0B]/60 p-6 sm:p-8 lg:p-10 space-y-8 text-[#E2E8F0] rounded-md transition-all duration-300">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-bold">
              06 · THE LEGACY · DI SẢN & TẤM BẢNG PIONEER PLAQUE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
              Thông điệp trực quan về nguồn gốc của con tàu và con người
            </h2>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed max-w-4xl">
              {record.story.legacy}
            </p>
          </div>

          {/* Interactive Pioneer Plaque Diagram + Original Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-[#07111F]/95 p-4 border border-[#22D3EE]/30 rounded-md space-y-3 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold uppercase tracking-wider rounded-xs">
                  Minh họa giáo dục · Giải mã ký hiệu Pioneer Plaque
                </span>
                <span className="text-[#38BDF8]">Tương tác điểm nóng #1–#4</span>
              </div>
              <div className="relative aspect-[16/10] bg-[#070E1E] border border-[#22D3EE]/25 rounded-sm overflow-hidden">
                <img
                  src={
                    NASA_MEDIA_CATALOG.pioneer_plaque_diagram.local_asset_url ||
                    NASA_MEDIA_CATALOG.pioneer_plaque_diagram.direct_asset_url ||
                    ''
                  }
                  alt={NASA_MEDIA_CATALOG.pioneer_plaque_diagram.alt_vi}
                  className="w-full h-full object-contain p-3"
                />
                {HOTSPOTS_PLAQUE.map((spot, idx) => (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActivePlaqueIdx(idx)}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className={`-translate-x-1/2 -translate-y-1/2 absolute w-7 h-7 rounded-full font-mono text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                      idx === activePlaqueIdx
                        ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/50 scale-110 shadow-[0_0_15px_#F59E0B]'
                        : 'bg-[#0B142C]/90 text-[#38BDF8] border border-[#22D3EE]/60 shadow-[0_0_10px_rgba(34,211,238,0.25)]'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#94A3B8]">
                <span>Bản Detail of Diagram từ trang nguồn NASA Pioneer Plaque (SRC-PIO-05)</span>
                <a
                  href="https://science.nasa.gov/resource/pioneer-plaque/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#38BDF8] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <span>Trang nguồn NASA</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-[#07111F]/90 border-l-4 border-[#F59E0B] rounded-r-xs space-y-1.5 shadow-inner">
                <span className="font-mono text-xs uppercase text-[#38BDF8] font-bold">
                  Giải mã ký hiệu #{activePlaqueIdx + 1}
                </span>
                <h3 className="font-display font-bold text-base text-[#F8FAFC]">
                  {currentPlaqueSpot.title_vi}
                </h3>
                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                  {currentPlaqueSpot.description_vi}
                </p>
              </div>

              <div className="border border-[#22D3EE]/30 rounded-md overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                <NasaImage
                  item={NASA_MEDIA_CATALOG['IMG-PIO-03']}
                  onOpenLightbox={onOpenLightbox}
                  aspectRatio="video"
                  compactCaption
                  darkSurface
                />
              </div>
            </div>
          </div>

          {/* Provenance & Citations Control */}
          <div className="pt-6 border-t border-[#22D3EE]/20 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
                <h3 className="font-display text-lg font-bold text-[#F8FAFC]">
                  Nguồn tư liệu chính thức của triển lãm Pioneer 11 ({mission.source_ids.length} nguồn)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSourcesDrawer(!showSourcesDrawer)}
                className="px-3.5 py-1.5 bg-[#07111F]/90 hover:bg-[#22D3EE]/15 border border-[#22D3EE]/35 hover:border-[#22D3EE] text-[#38BDF8] font-mono text-xs cursor-pointer rounded-xs transition-colors shadow-[0_0_10px_rgba(34,211,238,0.15)]"
              >
                {showSourcesDrawer ? 'Thu gọn danh mục nguồn' : 'Hiện danh mục nguồn'}
              </button>
            </div>

            {showSourcesDrawer && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mission.source_ids.map((sid) => {
                  const src = SOURCES_CATALOG[sid];
                  if (!src) return null;
                  return (
                    <div key={src.id} className="p-4 bg-[#07111F]/90 border border-[#22D3EE]/25 hover:border-[#22D3EE]/60 rounded-xs flex flex-col justify-between gap-2 shadow-inner transition-colors">
                      <div>
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="px-2 py-0.5 bg-[#0B142C] text-[#38BDF8] border border-[#22D3EE]/30 rounded-xs">{src.id}</span>
                          <span className="text-[#94A3B8]">{src.source_type}</span>
                        </div>
                        <h4 className="font-display font-bold text-sm text-[#F8FAFC] mt-1.5">
                          {src.title}
                        </h4>
                        <p className="text-xs text-[#CBD5E1] mt-1">
                          Hỗ trợ dữ kiện: {src.supports.join(' · ')}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-[#22D3EE]/20 flex items-center justify-between font-mono text-[11px]">
                        <span className="text-[#94A3B8]">Kiểm tra: {src.last_checked}</span>
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#FBBF24] hover:text-[#F59E0B] underline underline-offset-4"
                        >
                          <span>Mở nguồn NASA</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
