import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, ExternalLink } from 'lucide-react';
import { ExhibitItem } from './ExhibitLightbox';

export const HERO_EXHIBIT_ITEMS: ExhibitItem[] = [
  {
    id: 'opportunity',
    titleVi: 'Ảnh chân dung đầu tiên của Opportunity',
    titleEn: "Opportunity's First Selfie",
    yearStatus: '2018 · Sol 5.000 (Perseverance Valley)',
    badge: 'Ảnh do thiết bị chụp',
    caption: 'Ảnh chân dung tự chụp kỷ niệm sol 5.000 ghép từ camera hiển vi Microscopic Imager trên cánh tay robot.',
    longDescription: 'Bức ảnh selfie lịch sử kỷ niệm 5.000 ngày hoạt động (sol) của xe tự hành Opportunity tại Thung lũng Kiên trì (Perseverance Valley) trên sườn miệng núi lửa Endeavour. Ảnh ghép từ các khung hình do Microscopic Imager – camera chụp hiển vi gắn ở đầu cánh tay robot – thực hiện vào các sol 5000 và 5006. Cánh tay robot đã được xử lý kỹ thuật số đưa ra khỏi khung hình cuối cùng.',
    credit: 'NASA/JPL-Caltech',
    imageId: 'PIA22222',
    nssdcId: '2003-032A',
    sourceUrl: 'https://science.nasa.gov/photojournal/opportunitys-first-selfie/',
    imageSrc: '/assets/nasa/opportunity_first_selfie_PIA22222.jpg',
    altText: "Chân dung tự chụp sol 5.000 của rover Opportunity trên Sao Hỏa (PIA22222)",
    downloadFilename: 'opportunity_first_selfie_PIA22222.jpg',
    targetRoute: '/trien-lam/opportunity'
  },
  {
    id: 'viking-1',
    titleVi: 'Bức ảnh đầu tiên từ bề mặt Sao Hỏa',
    titleEn: 'First Mars Surface Photo',
    yearStatus: '1976 · Hạ cánh Chryse Planitia',
    badge: 'Ảnh do thiết bị chụp',
    caption: 'Ảnh lịch sử đầu tiên từ bề mặt Sao Hỏa thể hiện chân đế đổ bộ của Viking 1 trên lớp đá Chryse Planitia.',
    longDescription: 'Ngày 20 tháng 7 năm 1976, chỉ ít phút sau khi hạ cánh thành công xuống vùng đồng bằng Chryse Planitia, camera quét cơ học của tàu đổ bộ Viking 1 Lander đã truyền về Trái Đất bức ảnh đầu tiên được chụp trực tiếp từ bề mặt của một hành tinh khác. Bức ảnh ghi lại chi tiết một chân đế hạ cánh vững vàng cùng địa hình đá sỏi và lớp cát mịn Sao Hỏa xung quanh.',
    credit: 'NASA/JPL',
    imageId: 'PIA00381',
    nssdcId: '1975-075C',
    sourceUrl: 'https://photojournal.jpl.nasa.gov/catalog/PIA00381',
    imageSrc: '/assets/nasa/viking1_first_mars_surface_photo_PIA00381.jpg',
    altText: 'Bức ảnh đầu tiên trong lịch sử chụp từ bề mặt Sao Hỏa thể hiện chân đế hạ cánh của Viking 1 năm 1976',
    downloadFilename: 'viking1_first_mars_surface_photo_PIA00381.jpg',
    targetRoute: '/luu-tru'
  },
  {
    id: 'pioneer-11',
    titleVi: 'Sơ đồ kỹ thuật cấu tạo tàu Pioneer',
    titleEn: 'Pioneer Spacecraft Diagram (Pioneer 10/11 cùng thiết kế)',
    yearStatus: '1973 · Thám hiểm không gian sâu',
    badge: 'Hình minh họa NASA',
    caption: 'Sơ đồ kỹ thuật NASA chú thích vị trí các thiết bị khoa học dùng chung cho tàu Pioneer 10 và 11.',
    longDescription: 'Sơ đồ kỹ thuật chính thức do Trung tâm Nghiên cứu Ames của NASA phát hành (mã ACD97-0036-2), chú thích chi tiết ăng-ten parabol đường kính 2,74 m, nguồn điện hạt nhân đồng vị phóng xạ SNAP-19 RTG, cùng vị trí các cảm biến từ trường, plasma và bức xạ vũ trụ được trang bị trên hai con tàu thăm dò không gian sâu Pioneer 10 và Pioneer 11.',
    credit: 'NASA/Ames',
    imageId: 'ACD97-0036-2',
    nssdcId: '1973-019A',
    sourceUrl: 'https://science.nasa.gov/resource/pioneer-spacecraft-diagram/',
    imageSrc: '/assets/nasa/pioneer_spacecraft_instrument_diagram.jpg',
    altText: 'Sơ đồ kỹ thuật NASA chú thích các thiết bị khoa học trên tàu Pioneer 10 và Pioneer 11',
    downloadFilename: 'pioneer_spacecraft_instrument_diagram.jpg',
    targetRoute: '/trien-lam/pioneer-11'
  }
];

interface HeroExhibitStackProps {
  onNavigate: (route: string) => void;
  onOpenLightbox: (item: ExhibitItem, triggerBtnRef: React.RefObject<HTMLElement>) => void;
  lang?: 'vi' | 'en';
}

export const HeroExhibitStack: React.FC<HeroExhibitStackProps> = ({ onNavigate, onOpenLightbox, lang = 'vi' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerBtnRef = useRef<HTMLButtonElement>(null);

  const activeItem = HERO_EXHIBIT_ITEMS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_EXHIBIT_ITEMS.length) % HERO_EXHIBIT_ITEMS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_EXHIBIT_ITEMS.length);
  };

  // Keyboard Left / Right navigation on stack container
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Navigation when card itself is pressed
  const handleCardClick = () => {
    onNavigate(activeItem.targetRoute);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onNavigate(activeItem.targetRoute);
    }
  };

  const isEn = lang === 'en';

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg mx-auto focus:outline-none"
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      role="region"
      aria-roledescription={isEn ? "exhibition card stack" : "bộ thẻ triển lãm"}
      aria-label={isEn ? "NASA Exhibition Deck: Use Left/Right arrow keys to switch cards" : "Bộ thẻ triển lãm NASA: Sử dụng phím mũi tên Trái/Phải để chuyển thẻ"}
    >
      {/* Screen Reader Polite Live Region */}
      <div className="sr-only" aria-live="polite">
        {isEn
          ? `Showing card ${activeIndex + 1} of ${HERO_EXHIBIT_ITEMS.length}: ${activeItem.titleEn}`
          : `Đang hiển thị thẻ ${activeIndex + 1} trên ${HERO_EXHIBIT_ITEMS.length}: ${activeItem.titleVi} (${activeItem.titleEn}).`}
      </div>

      {/* Centered Luminous Golden Accretion Ring & Light Vortex Radiating Behind Exhibition Stack */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible" aria-hidden="true">
        <div className="cosmic-singularity-glow pointer-events-none" />
        <div className="cosmic-accretion-ring pointer-events-none" />
        <div className="cosmic-accretion-void pointer-events-none" />
        <div className="cosmic-light-beam pointer-events-none" />
      </div>

      {/* STACK CONTROLS HEADER (Sleek compact selector pills & Navigation arrows - No overflow scrollbars) */}
      <div className="flex items-center justify-between gap-2 mb-3 px-1 text-xs font-mono" aria-label={isEn ? "Exhibition cards" : "Các thẻ trong bộ sưu tập"}>
        <div className="flex items-center gap-1.5 py-1 overflow-x-hidden">
          {HERO_EXHIBIT_ITEMS.map((item, idx) => {
            const isCurrent = idx === activeIndex;
            const shortLabel = item.id === 'opportunity' ? 'Opportunity' : item.id === 'viking-1' ? 'Viking 1' : 'Pioneer 11';
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs border text-[11px] font-mono transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none min-h-[34px] ${
                  isCurrent
                    ? 'bg-[#0E1E42] border-[#22D3EE] text-[#38BDF8] font-bold shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                    : 'bg-[#081226]/85 border-[#22D3EE]/25 text-[#94A3B8] hover:text-[#F1F5F9] hover:border-[#F59E0B]/60'
                }`}
                aria-label={isEn ? `Go to card ${idx + 1}: ${item.titleEn}` : `Chuyển đến thẻ ${idx + 1}: ${item.titleVi}`}
                aria-pressed={isCurrent}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-[#F59E0B] shadow-[0_0_6px_#F59E0B]' : 'bg-[#94A3B8]/50'}`} />
                <span className="font-semibold">{shortLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-[#081226] hover:bg-[#10224A] border border-[#22D3EE]/30 hover:border-[#22D3EE] text-[#94A3B8] hover:text-[#38BDF8] rounded-xs transition-colors focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none cursor-pointer"
            aria-label={isEn ? "Previous card" : "Thẻ trước đó"}
            title={isEn ? "Previous card (Left Arrow)" : "Thẻ trước đó (Mũi tên trái)"}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-[#081226] hover:bg-[#10224A] border border-[#22D3EE]/30 hover:border-[#22D3EE] text-[#94A3B8] hover:text-[#38BDF8] rounded-xs transition-colors focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none cursor-pointer"
            aria-label={isEn ? "Next card" : "Thẻ kế tiếp"}
            title={isEn ? "Next card (Right Arrow)" : "Thẻ kế tiếp (Mũi tên phải)"}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CARD CONTAINER WITH CLEAN ELEVATED FRAME (No awkward overlapping tabs) */}
      <div className="relative mt-2">
        {/* Subtle Cyber Underlay Glow Frame */}
        <div className="absolute -inset-1 bg-gradient-to-b from-[#22D3EE]/15 via-transparent to-[#F59E0B]/10 rounded-sm blur-sm -z-10 pointer-events-none" />

        {/* ACTIVE FRONT CARD — Solid, Opaque (#081226), Strict 6 Items */}
        <div
          key={activeItem.id}
          onClick={handleCardClick}
          onKeyDown={handleCardKeyDown}
          tabIndex={0}
          role="link"
          aria-label={`Mở hồ sơ chi tiết thiết bị ${activeItem.titleVi}. Nhấn Enter để chuyển trang.`}
          className="group relative bg-[#081226] border border-[#22D3EE]/45 hover:border-[#F59E0B] p-4 sm:p-5 rounded-xs shadow-[0_12px_36px_rgba(0,0,0,0.65)] hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none animate-card-swap"
        >
          {/* Cyber Corner Tick Accents */}
          <span className="corner-tick-tl" />
          <span className="corner-tick-tr" />
          <span className="corner-tick-bl" />
          <span className="corner-tick-br" />

          {/* ITEM 2 & 3: Mission Status / Year + Representation Badge + Lightbox Trigger Button */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#22D3EE]/30 gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Item 3: Representation Badge */}
              <span className="px-2 py-0.5 bg-[#0C1A38] text-[#FBBF24] border border-[#F59E0B]/40 font-mono text-[11px] font-semibold tracking-wider rounded-xs">
                {activeItem.badge}
              </span>

              {/* Item 2: Year or Mission Status */}
              <span className="font-mono text-[11px] text-[#38BDF8]">
                {activeItem.yearStatus}
              </span>
            </div>

            {/* Phóng lớn Icon Button (Accessible Lightbox Trigger) */}
            <button
              ref={triggerBtnRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenLightbox(activeItem, triggerBtnRef);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0C1A38] hover:bg-[#16274E] text-[#38BDF8] hover:text-[#FBBF24] border border-[#22D3EE]/40 hover:border-[#F59E0B]/60 font-mono text-[11px] font-semibold rounded-xs transition-colors focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none cursor-pointer shrink-0"
              aria-label={isEn ? `Enlarge image ${activeItem.titleEn}` : `Phóng lớn ảnh ${activeItem.titleVi}`}
              title={isEn ? "Enlarge image and inspect archival data (Open modal)" : "Phóng lớn ảnh và xem dữ liệu chi tiết (Mở hộp thoại)"}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{isEn ? 'Enlarge' : 'Phóng lớn'}</span>
            </button>
          </div>

          {/* Genuine Authentic NASA Photograph (Clean, No HUD Overlays, No Overlay Buttons) */}
          <div className="relative aspect-[16/10] bg-[#030611] border border-[#22D3EE]/35 overflow-hidden rounded-xs group-hover:border-[#F59E0B]/60 transition-colors">
            <img
              src={activeItem.imageSrc}
              alt={activeItem.altText}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* CARD FACE BODY: Max 6 Items, High Contrast AA, Caption >= 15px */}
          <div className="mt-4 space-y-2.5 text-left">
            {/* ITEM 1: Title */}
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#F8FAFC] leading-snug group-hover:text-[#FDE68A] transition-colors">
                {isEn ? activeItem.titleEn : activeItem.titleVi}
              </h3>
              <div className="font-mono text-xs text-[#94A3B8] mt-0.5">
                {isEn ? activeItem.titleVi : activeItem.titleEn}
              </div>
            </div>

            {/* ITEM 4: ONE caption line <= 120 chars, >= 15px text, AA contrast on solid panel */}
            <p className="text-[15px] text-[#F1F5F9] leading-relaxed font-sans bg-[#0B1733] border-l-2 border-[#22D3EE]/80 p-2.5 rounded-xs">
              {activeItem.caption}
            </p>

            {/* ITEM 5 & 6: Credit ONCE + ONE Image ID + Single "Nguồn NASA ↗" Link */}
            <div className="pt-2 border-t border-[#22D3EE]/20 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              {/* Item 5: Credit ONCE */}
              <div className="text-[#94A3B8]">
                {isEn ? 'Credit:' : 'Ghi công:'} <span className="text-[#E2E8F0] font-medium">{activeItem.credit}</span>
              </div>

              {/* Item 6: ONE Image ID + Single "Nguồn NASA ↗" Link */}
              <div className="flex items-center gap-2">
                <span className="text-[#38BDF8] font-bold">{activeItem.imageId}</span>
                <span className="text-[#22D3EE]/40">·</span>
                <a
                  href={activeItem.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-[#FBBF24] hover:text-[#FDE68A] hover:underline transition-colors focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none rounded-xs py-0.5"
                  aria-label={isEn ? `Open official NASA source page for ${activeItem.imageId} in new tab` : `Mở trang nguồn chính thức NASA cho ảnh ${activeItem.imageId} trong thẻ mới`}
                >
                  <span>Nguồn NASA ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DOT INDICATORS (Interactive, accessible tablist/pagination) */}
      <div className="flex items-center justify-center gap-2 mt-3" role="tablist" aria-label="Bộ chọn thẻ">
        {HERO_EXHIBIT_ITEMS.map((item, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none cursor-pointer ${
                isSelected
                  ? 'w-8 bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]'
                  : 'w-2.5 bg-[#22D3EE]/35 hover:bg-[#22D3EE]/70'
              }`}
              aria-label={`Xem thẻ ${idx + 1}: ${item.titleVi}`}
            />
          );
        })}
      </div>
    </div>
  );
};
