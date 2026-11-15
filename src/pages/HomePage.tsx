import React, { useState } from 'react';
import {
  NASA_MEDIA_CATALOG,
  NasaMediaItem
} from '../data/museumData';
import {
  ArrowRight,
  Cpu,
  Database,
  ExternalLink,
  Headphones,
  MapPin,
  Maximize2,
  ShieldCheck
} from 'lucide-react';

export interface HomePageProps {
  onNavigate: (route: string) => void;
  onOpenLightbox: (item: NasaMediaItem) => void;
  lang?: 'vi' | 'en';
  onOpenStoryPlayer?: (machineId?: 'opportunity' | 'pioneer-11') => void;
}

interface HeroShowcaseSlide {
  id: 'opportunity' | 'pioneer-11' | 'surveyor-3';
  mediaKey: string;
  nssdcaId: string;
  imageId: string;
  realmVi: string;
  realmEn: string;
  badgeVi: string;
  badgeEn: string;
  titleVi: string;
  titleEn: string;
  captionVi: string;
  captionEn: string;
  credit: string;
  sourceUrl: string;
  journeyRoute: string;
}

const HERO_SHOWCASE_SLIDES: HeroShowcaseSlide[] = [
  {
    id: 'opportunity',
    mediaKey: 'IMG-OPP-01',
    nssdcaId: '2003-032A',
    imageId: 'PIA22222',
    realmVi: 'Sao Hỏa · Meridiani Planum → Perseverance Valley',
    realmEn: 'Mars · Meridiani Planum → Perseverance Valley',
    badgeVi: 'Ảnh do thiết bị chụp (NASA/JPL)',
    badgeEn: 'Instrument Photograph (NASA/JPL)',
    titleVi: 'Opportunity (MER-B) — Chân dung tự chụp Sol 5.000',
    titleEn: 'Opportunity (MER-B) — Sol 5,000 Self-Portrait',
    captionVi:
      'Ghép từ camera hiển vi Microscopic Imager trên cánh tay robot tại Perseverance Valley. Thiết kế cho 90 sol nhưng hoạt động bền bỉ suốt 5.111 sol (45,16 km).',
    captionEn:
      'Mosaic captured by the Microscopic Imager on the rover’s robotic arm at Perseverance Valley. Designed for 90 sols, Opportunity operated for 5,111 sols (45.16 km).',
    credit: 'NASA/JPL-Caltech/Cornell/ASU',
    sourceUrl: 'https://science.nasa.gov/photojournal/opportunitys-first-selfie/',
    journeyRoute: '/hanh-trinh?mission=opportunity'
  },
  {
    id: 'pioneer-11',
    mediaKey: 'IMG-PIO-01',
    nssdcaId: '1973-019A',
    imageId: 'AC79-9107',
    realmVi: 'Không gian sâu · Sao Mộc & Sao Thổ',
    realmEn: 'Deep Space · Jupiter & Saturn Flybys',
    badgeVi: 'Ảnh quan sát từ tàu (NASA/Ames)',
    badgeEn: 'Spacecraft Observation (NASA/Ames)',
    titleVi: 'Pioneer 11 — Sao Thổ, Vành đai và Vệ tinh Titan (1979)',
    titleEn: 'Pioneer 11 — Saturn, Its Rings, and Moon Titan (1979)',
    captionVi:
      'Bức ảnh lịch sử do Pioneer 11 chụp ngày 01/09/1979 khi trở thành tàu vũ trụ đầu tiên của nhân loại bay ngang qua Sao Thổ và phát hiện vành đai F.',
    captionEn:
      'Historic frame captured on September 1, 1979 as Pioneer 11 became humanity’s first spacecraft to fly by Saturn, discovering the narrow F ring.',
    credit: 'NASA/Ames Research Center',
    sourceUrl: 'https://science.nasa.gov/resource/pioneer-11-at-saturn/',
    journeyRoute: '/hanh-trinh?mission=pioneer-11'
  },
  {
    id: 'surveyor-3',
    mediaKey: 'IMG-SUR-01',
    nssdcaId: '1967-035A',
    imageId: 'AS12-48-7134',
    realmVi: 'Mặt Trăng · Oceanus Procellarum',
    realmEn: 'The Moon · Oceanus Procellarum',
    badgeVi: 'Ảnh tư liệu lịch sử (Apollo 12)',
    badgeEn: 'Archival Photograph (Apollo 12)',
    titleVi: 'Surveyor 3 & Cuộc hội ngộ với Apollo 12 (1969)',
    titleEn: 'Surveyor 3 & the Apollo 12 Rendezvous (1969)',
    captionVi:
      'Phi hành gia Pete Conrad kiểm tra tàu đổ bộ Surveyor 3 (hạ cánh ngày 20/04/1967) và thu hồi camera truyền hình về Trái Đất để nghiên cứu.',
    captionEn:
      'Astronaut Pete Conrad inspects Surveyor 3 (landed April 20, 1967) during Apollo 12 in November 1969, returning its TV camera to Earth for study.',
    credit: 'NASA / Johnson Space Center',
    sourceUrl: 'https://science.nasa.gov/resource/apollo-12-and-surveyor-3/',
    journeyRoute: '/hanh-trinh?mission=surveyor-3'
  }
];

interface CompactSeedPreview {
  id: 'surveyor-3' | 'viking-1' | 'sojourner';
  codeId: string;
  mediaKey: string;
  nameVi: string;
  nameEn: string;
  realmVi: string;
  realmEn: string;
  site: string;
  keyDatesVi: string;
  keyDatesEn: string;
  summaryVi: string;
  summaryEn: string;
  metricsVi: string[];
  metricsEn: string[];
  credit: string;
}

const COMPACT_SEED_PREVIEWS: CompactSeedPreview[] = [
  {
    id: 'surveyor-3',
    codeId: '1967-035A',
    mediaKey: 'IMG-SUR-01',
    nameVi: 'Surveyor 3',
    nameEn: 'Surveyor 3 Lunar Lander',
    realmVi: 'Mặt Trăng (The Moon)',
    realmEn: 'The Moon',
    site: 'Oceanus Procellarum',
    keyDatesVi: 'Hạ cánh: 20/04/1967 · Apollo 12 tiếp cận: 11/1969',
    keyDatesEn: 'Landed: 1967-04-20 · Apollo 12 Visit: Nov 1969',
    summaryVi:
      'Tàu đổ bộ tự động chứng minh lớp đất regolith Mặt Trăng đủ sức chịu tải cho tàu Apollo. Tháng 11/1969, phi hành gia Apollo 12 đã trực tiếp đến thăm và tháo camera truyền hình mang về Trái Đất.',
    summaryEn:
      'Robotic lunar lander that proved the regolith could bear the weight of Apollo landers. Visited by Apollo 12 astronauts in November 1969, who returned its TV camera and scoop to Earth.',
    metricsVi: ['6.326 ảnh truyền hình', 'Đào rãnh sâu ~18 cm', 'Apollo 12 thu hồi bộ phận'],
    metricsEn: ['6,326 TV pictures', '~18 cm trench depth', 'Parts returned by Apollo 12'],
    credit: 'NASA (AS12-48-7134)'
  },
  {
    id: 'viking-1',
    codeId: '1975-075C',
    mediaKey: 'IMG-VIK-01',
    nameVi: 'Viking 1 Lander',
    nameEn: 'Viking 1 Mars Lander',
    realmVi: 'Sao Hỏa (Mars)',
    realmEn: 'Mars',
    site: 'Chryse Planitia',
    keyDatesVi: 'Hạ cánh: 20/07/1976 · Liên lạc cuối: 11/1982',
    keyDatesEn: 'Landed: 1976-07-20 · Final Contact: Nov 1982',
    summaryVi:
      'Cuộc đổ bộ thành công trọn vẹn đầu tiên của NASA xuống bề mặt Sao Hỏa, truyền về bức ảnh chụp trực tiếp đầu tiên từ bề mặt Hành tinh Đỏ (PIA00381) và tiến hành các thí nghiệm sinh học đất.',
    summaryEn:
      'NASA’s first truly successful landing on Mars, transmitting the first photograph ever taken directly on the Martian surface (PIA00381) and conducting pioneering biological and atmospheric studies.',
    metricsVi: ['Ảnh bề mặt đầu tiên PIA00381', '2 máy phát RTG SNAP-19', 'Hoạt động hơn 6 năm'],
    metricsEn: ['First surface photo PIA00381', 'Dual SNAP-19 RTGs', 'Operated over 6 years'],
    credit: 'NASA/JPL (PIA00381)'
  },
  {
    id: 'sojourner',
    codeId: '1996-068A',
    mediaKey: 'IMG-SOJ-01',
    nameVi: 'Sojourner (Mars Pathfinder)',
    nameEn: 'Sojourner / Mars Pathfinder',
    realmVi: 'Sao Hỏa (Mars)',
    realmEn: 'Mars',
    site: 'Ares Vallis',
    keyDatesVi: 'Hạ cánh: 04/07/1997 · Tín hiệu cuối: 27/09/1997',
    keyDatesEn: 'Landed: 1997-07-04 · Last Signal: 1997-09-27',
    summaryVi:
      'Xe tự hành có bánh xe đầu tiên trên Sao Hỏa thuộc sứ mệnh Mars Pathfinder. Thiết kế cho nhiệm vụ chính 7 ngày nhưng đã hoạt động suốt 83 ngày Sao Hỏa (sol), khảo sát đá bằng phổ kế APXS.',
    summaryEn:
      'The first wheeled rover to explore Mars, deployed by the Mars Pathfinder lander. Designed for a 7-day primary mission, Sojourner operated for 83 days, analyzing Martian rocks with its APXS spectrometer.',
    metricsVi: ['83 ngày hoạt động / 7 ngày thiết kế', 'Khối lượng 11,5 kg (6 bánh)', 'Phổ kế hạt alpha APXS'],
    metricsEn: ['83 days active vs 7-day plan', '11.5 kg 6-wheel micro-rover', 'APXS rock spectrometer'],
    credit: 'NASA/JPL (PIA00766)'
  }
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenLightbox,
  lang = 'vi'
}) => {
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const isEn = lang === 'en';

  const activeSlide = HERO_SHOWCASE_SLIDES[activeSlideIdx] || HERO_SHOWCASE_SLIDES[0];
  const activeMediaItem = NASA_MEDIA_CATALOG[activeSlide.mediaKey];

  const resolveMediaImageSrc = (mediaKey: string, fallbackPath: string): string => {
    const item = NASA_MEDIA_CATALOG[mediaKey];
    if (!item) return fallbackPath;
    return item.direct_asset_url || (item.local_asset_url ? item.local_asset_url.replace(/^\/public\//, '/') : fallbackPath);
  };

  return (
    <div className="bg-[#060912] text-[#f8fafc] selection:bg-[#e8a86b]/30 selection:text-[#f8fafc]">
      {/* =====================================================================
          SECTION 1: CINEMATIC DEEP-SPACE HERO (Strict Dark Deep-Space Telemetry UI)
      ===================================================================== */}
      <section className="relative overflow-hidden border-b border-[#182333] pt-10 sm:pt-14 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-[#060912]">
        {/* Layer 1: Diagonal Milky Way / Nebula Stream & Base Gradients (Teal/Cyan #0ea5e9, Blue #1d4ed8 at 0.28-0.35, amber #d97706 at 0.15) */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
          style={{
            backgroundImage: `
              /* Diagonal Nebula Ribbon (bottom-left to top-right) */
              linear-gradient(55deg, transparent 10%, rgba(14, 165, 233, 0.28) 35%, rgba(29, 78, 216, 0.35) 48%, rgba(14, 165, 233, 0.32) 60%, transparent 84%),
              /* Upper-right celestial nebula expansion */
              radial-gradient(ellipse 980px 580px at 78% 20%, rgba(14, 165, 233, 0.35) 0%, rgba(29, 78, 216, 0.25) 45%, transparent 75%),
              /* Lower-left deep nebula cloud */
              radial-gradient(ellipse 760px 480px at 16% 82%, rgba(14, 165, 233, 0.30) 0%, rgba(29, 78, 216, 0.20) 45%, transparent 70%),
              /* Warm amber glow around the celestial radar orbits */
              radial-gradient(circle 520px at 20% 36%, rgba(217, 119, 6, 0.15) 0%, transparent 70%),
              /* Base deep-space linear gradient */
              linear-gradient(135deg, #060912 0%, #0b1426 55%, #070c17 100%)
            `
          }}
        />

        {/* Layer 2: Dense 3D Cosmic Starfield (Multi-layer 1px, 1.5px, 2px white #ffffff & warm gold #fde68a, denser along nebula path) */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
          style={{
            backgroundImage: `
              /* 1px sharp white stars */
              radial-gradient(1px 1px at 35px 45px, #ffffff, transparent),
              radial-gradient(1px 1px at 155px 195px, #ffffff, transparent),
              radial-gradient(1px 1px at 290px 80px, #ffffff, transparent),
              radial-gradient(1px 1px at 395px 250px, #ffffff, transparent),
              radial-gradient(1px 1px at 95px 310px, #ffffff, transparent),
              radial-gradient(1px 1px at 220px 380px, #ffffff, transparent),
              /* 1.5px bright white and pale gold stars */
              radial-gradient(1.5px 1.5px at 105px 130px, #fde68a, transparent),
              radial-gradient(1.5px 1.5px at 240px 55px, #ffffff, transparent),
              radial-gradient(1.5px 1.5px at 330px 185px, #fde68a, transparent),
              radial-gradient(1.5px 1.5px at 175px 325px, #ffffff, transparent),
              radial-gradient(1.5px 1.5px at 370px 355px, #fde68a, transparent),
              /* 2px glowing prominent stars */
              radial-gradient(2px 2px at 190px 160px, rgba(255, 255, 255, 0.95), transparent),
              radial-gradient(2px 2px at 320px 300px, rgba(253, 230, 138, 0.95), transparent),
              radial-gradient(2px 2px at 70px 230px, rgba(14, 165, 233, 0.9), transparent)
            `,
            backgroundSize: `
              280px 280px, 280px 280px, 280px 280px, 280px 280px, 280px 280px, 280px 280px,
              390px 390px, 390px 390px, 390px 390px, 390px 390px, 390px 390px,
              520px 520px, 520px 520px, 520px 520px
            `
          }}
        />

        {/* Layer 3: NASA Telemetry Grid (40px x 40px, rgba(255, 255, 255, 0.04)) */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Layer 4: NASA Telemetry Orbits, Radar Concentric Circles & Trajectories */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 820"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter id="beacon-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* NASA Radar / Concentric Celestial Orbit Telemetry on Left (Enhanced to rgba(232, 168, 107, 0.25)) */}
            <g transform="translate(180, 290)">
              <circle cx="0" cy="0" r="130" stroke="rgba(232, 168, 107, 0.25)" strokeWidth="1.2" fill="none" />
              <circle cx="0" cy="0" r="230" stroke="rgba(232, 168, 107, 0.25)" strokeWidth="1.2" strokeDasharray="4 6" fill="none" />
              <circle cx="0" cy="0" r="350" stroke="rgba(232, 168, 107, 0.18)" strokeWidth="1" fill="none" />
              <circle cx="0" cy="0" r="490" stroke="rgba(232, 168, 107, 0.12)" strokeWidth="1" strokeDasharray="3 7" fill="none" />
              <line x1="-250" y1="0" x2="250" y2="0" stroke="rgba(232, 168, 107, 0.16)" strokeWidth="1" strokeDasharray="2 4" />
              <line x1="0" y1="-250" x2="0" y2="250" stroke="rgba(232, 168, 107, 0.16)" strokeWidth="1" strokeDasharray="2 4" />
              {/* Amber Glowing Positioning Beacon Dots (#e8a86b) with glow filter */}
              <circle cx="92" cy="-92" r="4" fill="#e8a86b" filter="url(#beacon-glow)" />
              <circle cx="92" cy="-92" r="8.5" stroke="#e8a86b" strokeOpacity="0.45" strokeWidth="1" fill="none" />
              <circle cx="-162" cy="162" r="3" fill="#e8a86b" filter="url(#beacon-glow)" />
              <circle cx="225" cy="55" r="3.5" fill="#e8a86b" filter="url(#beacon-glow)" />
            </g>

            {/* Right-side Primary Keplerian Ellipse with coordinate dashes */}
            <ellipse
              cx="1080"
              cy="390"
              rx="540"
              ry="250"
              transform="rotate(-15 1080 390)"
              stroke="#0ea5e9"
              strokeOpacity="0.32"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />
            {/* Outer Transfer Orbit */}
            <ellipse
              cx="1080"
              cy="390"
              rx="760"
              ry="350"
              transform="rotate(-15 1080 390)"
              stroke="#e8a86b"
              strokeOpacity="0.25"
              strokeWidth="1"
            />
            {/* Curved Interplanetary Flight Path */}
            <path
              d="M 120 720 Q 640 450 1410 130"
              stroke="#38bdf8"
              strokeOpacity="0.30"
              strokeWidth="1.2"
              strokeDasharray="3 5"
            />
            {/* Celestial coordinate markers */}
            <circle cx="485" cy="550" r="2.5" fill="#fde68a" fillOpacity="0.8" />
            <circle cx="785" cy="395" r="3.5" fill="#e8a86b" fillOpacity="0.85" filter="url(#beacon-glow)" />
            <circle cx="1180" cy="212" r="3.5" fill="#0ea5e9" fillOpacity="0.85" />

            {/* Prominent High-Density Stars along Diagonal Milky Way */}
            <circle cx="180" cy="650" r="2" fill="#ffffff" fillOpacity="0.85" />
            <circle cx="280" cy="580" r="1.5" fill="#fde68a" fillOpacity="0.9" />
            <circle cx="390" cy="510" r="2.2" fill="#ffffff" fillOpacity="0.9" />
            <circle cx="490" cy="460" r="1.8" fill="#38bdf8" fillOpacity="0.8" />
            <circle cx="590" cy="400" r="2.5" fill="#fde68a" fillOpacity="0.95" />
            <circle cx="680" cy="350" r="2" fill="#ffffff" fillOpacity="0.9" />
            <circle cx="790" cy="300" r="2.8" fill="#ffffff" fillOpacity="0.95" />
            <circle cx="910" cy="240" r="2.2" fill="#38bdf8" fillOpacity="0.9" />
            <circle cx="1020" cy="190" r="2.5" fill="#fde68a" fillOpacity="0.9" />
            <circle cx="1140" cy="140" r="2" fill="#ffffff" fillOpacity="0.85" />
            <circle cx="1260" cy="95" r="2.5" fill="#ffffff" fillOpacity="0.95" />
            <circle cx="1380" cy="60" r="1.8" fill="#fde68a" fillOpacity="0.8" />

            {/* Additional scattered field stars */}
            <circle cx="210" cy="180" r="1.5" fill="#ffffff" fillOpacity="0.75" />
            <circle cx="340" cy="90" r="2" fill="#e8a86b" fillOpacity="0.85" />
            <circle cx="620" cy="140" r="1.8" fill="#ffffff" fillOpacity="0.8" />
            <circle cx="890" cy="80" r="2" fill="#38bdf8" fillOpacity="0.8" />
            <circle cx="1320" cy="290" r="1.8" fill="#ffffff" fillOpacity="0.75" />
            <circle cx="150" cy="420" r="1.5" fill="#fde68a" fillOpacity="0.7" />
            <circle cx="50" cy="200" r="1.2" fill="#ffffff" fillOpacity="0.6" />
            <circle cx="1000" cy="450" r="1.6" fill="#ffffff" fillOpacity="0.75" />
            <circle cx="1200" cy="380" r="1.5" fill="#fde68a" fillOpacity="0.7" />
          </svg>
        </div>

        <div className="max-w-[1536px] mx-auto relative z-10 px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* LEFT COLUMN: Editorial Narrative strictly based on image_10.png */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Archival Eyebrow: Glowing amber concentric beacon */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#0e1726]/85 border border-[#D2A071]/40 rounded-full shadow-[0_0_15px_rgba(210,160,113,0.18)]">
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D2A071] opacity-40" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D2A071]" />
                </span>
                <span className="font-mono text-xs sm:text-[13px] text-[#D2A071] font-medium tracking-wide">
                  BEYOND THE SIGNAL · {isEn ? 'NASA Space Exploration Heritage Museum' : 'Bảo tàng Số Di sản Thám hiểm Vũ trụ NASA'}
                </span>
              </div>

              {/* Editorial Display Headline (Clean Sans-Serif Be Vietnam Pro with glowing amber accent) */}
              <div className="space-y-3">
                <h1 className="font-sans text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#f8fafc] tracking-tight leading-[1.14]">
                  {isEn ? (
                    <>
                      The signal may fade.<br />
                      <span className="text-[#e8a86b] italic drop-shadow-[0_0_25px_rgba(232,168,107,0.35)]">
                        The story remains.
                      </span>
                    </>
                  ) : (
                    <>
                      Tín hiệu có thể tắt.<br />
                      <span className="text-[#e8a86b] italic drop-shadow-[0_0_25px_rgba(232,168,107,0.35)]">
                        Nhưng câu chuyện còn mãi mãi.
                      </span>
                    </>
                  )}
                </h1>
                <p className="font-mono text-xs sm:text-[13px] font-semibold text-[#e8a86b] tracking-wide">
                  {isEn
                    ? 'EVERY MIND SEES A DIFFERENT UNIVERSE'
                    : 'EVERY MIND SEES A DIFFERENT UNIVERSE — Mỗi tâm trí nhìn thấy một vũ trụ khác nhau'}
                </p>
              </div>

              {/* Exact Vietnamese Body Text matching reference */}
              <p className="text-[15px] sm:text-[16px] text-[#AAB8C7] leading-[1.75] max-w-2xl font-sans">
                {isEn
                  ? 'On the lunar regolith, across the rust plains of Mars, and beyond the rings of Saturn, humanity’s greatest robotic explorers rest where their final transmissions faded. Explore their verified historical journeys, mission-based STEM physics challenges, and human-friendly open science dossiers.'
                  : 'Trên lớp bụi Mặt Trăng, giữa bình nguyên đỏ Sao Hỏa và ngoài vành đai Sao Thổ, những cỗ máy thăm dò vĩ đại nhất của nhân loại vẫn nằm lại nơi tín hiệu cuối cùng tắt lịm. Khám phá hành trình lịch sử đa phương tiện, các thử thách mô phỏng STEM gắn liền câu chuyện và hồ sơ khoa học dễ hiểu.'}
              </p>

              {/* Primary Action Button: Exact 100% match */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/hanh-trinh')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 bg-[#e8a86b] hover:bg-[#f3bc85] text-[#060912] font-sans text-base font-bold rounded-sm shadow-[0_0_25px_rgba(232,168,107,0.35)] transition-all cursor-pointer"
                >
                  <span>{isEn ? '01 Explore Journeys & Story Studio →' : '01 Trải nghiệm Hành Trình & Viết Truyện →'}</span>
                </button>
              </div>

              {/* Quick Orientation Strip: 4 Archival Pillars & Provenance */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#182333] text-left">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#e8a86b] font-semibold">
                    {isEn ? '01 CORE PILLARS' : '01 TRỤ CỘT CHÍNH'}
                  </div>
                  <div className="text-sm font-semibold text-[#f8fafc] mt-1">
                    {isEn ? 'Journeys • Simulations • Data' : 'Hành Trình • Mô Phỏng • Dữ Liệu'}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#e8a86b] font-semibold">
                    {isEn ? '02 MAIN JOURNEYS' : '02 HÀNH TRÌNH CHÍNH'}
                  </div>
                  <div className="text-sm font-semibold text-[#f8fafc] mt-1">
                    {isEn ? 'Opportunity & Pioneer 11' : 'Opportunity (MER-B) & Pioneer 11'}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#e8a86b] font-semibold">
                    {isEn ? '03 DEMO RECORDS' : '03 HỒ SƠ TƯ LIỆU MẪU'}
                  </div>
                  <div className="text-sm font-semibold text-[#f8fafc] mt-1">
                    {isEn ? 'Surveyor 3 • Viking 1 • Sojourner' : 'Surveyor 3 • Viking 1 • Sojourner'}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#e8a86b] font-semibold">
                    {isEn ? '100% NASA PROVENANCE' : '100% NGUỒN NASA'}
                  </div>
                  <div className="text-sm font-semibold text-[#f8fafc] mt-1">
                    {isEn ? 'Cross-checked NSSDCA & JPL' : 'Đối chiếu NSSDCA & JPL'}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Glassmorphic Telemetry Card strictly based on image_10.png */}
            <div className="lg:col-span-5 relative block">
              {/* Outer Card with Glassmorphic styling strictly following spec: rgba(12, 19, 34, 0.78), blur(12px), 1px solid rgba(232, 168, 107, 0.35) */}
              <div
                className="relative rounded-md p-4 sm:p-5 shadow-[0_0_60px_rgba(6,9,18,0.9)]"
                style={{
                  backgroundColor: 'rgba(12, 19, 34, 0.78)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(232, 168, 107, 0.35)'
                }}
              >
                {/* 180° Right Coordinate Marker matching image_10.png */}
                <div className="hidden sm:flex absolute -right-7 top-10 items-center gap-1.5 font-mono text-[10px] text-[#AAB8C7]/60 select-none">
                  <div className="w-3.5 h-px bg-[#7BA7BC]/40" />
                  <span>180°</span>
                </div>

                {/* Plate Switcher Header */}
                <div className="flex items-center justify-between gap-2 border-b border-[#3b5978]/40 pb-3">
                  <div className="flex items-center gap-1.5">
                    {HERO_SHOWCASE_SLIDES.map((slide, idx) => {
                      const isSelected = idx === activeSlideIdx;
                      return (
                        <button
                          key={slide.id}
                          type="button"
                          onClick={() => setActiveSlideIdx(idx)}
                          className={`px-3 py-1.5 font-mono text-xs transition-all cursor-pointer rounded-sm ${
                            isSelected
                              ? 'bg-[#1e344d]/90 text-[#F0EDE5] border border-[#7BA7BC]/70 font-semibold shadow-inner'
                              : 'text-[#AAB8C7]/70 hover:text-[#F0EDE5] border border-transparent'
                          }`}
                        >
                          {slide.id === 'opportunity'
                            ? 'Opportunity'
                            : slide.id === 'pioneer-11'
                            ? 'Pioneer 11'
                            : 'Surveyor 3'}
                        </button>
                      );
                    })}
                  </div>
                  <span className="font-mono text-xs text-[#AAB8C7]/90">
                    NSSDCA: {activeSlide.nssdcaId}
                  </span>
                </div>

                {/* Authentic NASA Black-and-White Opportunity Photograph Container */}
                <div className="relative aspect-[16/10] bg-[#070b13] overflow-hidden rounded-sm border border-[#3b5978]/40 my-3.5 group">
                  <img
                    src={resolveMediaImageSrc(
                      activeSlide.mediaKey,
                      activeMediaItem?.direct_asset_url || '/assets/nasa/opportunity_first_selfie_PIA22222.jpg'
                    )}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (activeMediaItem?.direct_asset_url && target.src !== activeMediaItem.direct_asset_url) {
                        target.src = activeMediaItem.direct_asset_url;
                      } else if (activeMediaItem?.local_asset_url) {
                        target.src = activeMediaItem.local_asset_url.replace(/^\/public\//, '/');
                      }
                    }}
                    alt={isEn ? activeSlide.titleEn : activeSlide.titleVi}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b13]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Lightbox Enlarge Button */}
                  {activeMediaItem && (
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(activeMediaItem)}
                      className="absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#070b13]/85 hover:bg-[#1a2d42] text-[#F0EDE5] border border-[#7BA7BC]/50 font-mono text-xs rounded-xs transition-colors cursor-pointer shadow-sm"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#7BA7BC]" />
                      <span>{isEn ? 'Inspect Plate' : 'Phóng lớn'}</span>
                    </button>
                  )}

                  {/* Bottom Badges inside Image */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 bg-[#070b13]/90 border border-[#7BA7BC]/40 font-mono text-[10px] uppercase tracking-wider text-[#AAB8C7]">
                      {isEn ? activeSlide.badgeEn : activeSlide.badgeVi}
                    </span>
                    <span className="px-2 py-0.5 bg-[#070b13]/90 border border-[#7BA7BC]/40 font-mono text-[10px] text-[#F0EDE5] font-semibold">
                      {activeSlide.imageId}
                    </span>
                  </div>
                </div>

                {/* Archival Plate Caption Footer */}
                <div className="pt-1 text-left space-y-1">
                  <div className="font-mono text-xs text-[#D2A071] font-semibold uppercase tracking-wider">
                    {isEn ? activeSlide.realmEn : activeSlide.realmVi}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-sans text-lg sm:text-xl font-bold text-[#F0EDE5] leading-snug">
                      {isEn ? activeSlide.titleEn : activeSlide.titleVi}
                    </h3>
                    <svg
                      className="w-5 h-5 text-[#7BA7BC] shrink-0 opacity-80"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =====================================================================
          SECTION 2: THE 3 CORE PILLARS HUB (Ba Trụ Cột Khám Phá)
      ===================================================================== */}
      <section
        id="core-pillars"
        className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#AAB8C7]/20 bg-[#101E30]"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#AAB8C7]/20 pb-8">
            <div className="space-y-2.5 max-w-2xl">
              <span className="font-mono text-[13px] font-medium text-[#D2A071]">
                {isEn ? '01 · MUSEUM ARCHITECTURE' : '01 · CẤU TRÚC TRẢI NGHIỆM BẢO TÀNG'}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F0EDE5]">
                {isEn ? 'Four Connected Pillars of Exploration' : 'Bốn Trụ Cột Khám Phá & Sáng Tạo'}
              </h2>
            </div>
            <p className="text-base text-[#AAB8C7] max-w-md leading-relaxed">
              {isEn
                ? 'Every spacecraft is explored through connected lenses: multimedia storytelling, STEM labs, scientific dossiers, and core student-created artistic expressions.'
                : 'Mỗi cỗ máy không gian được tiếp cận qua các lăng kính liên kết: kể chuyện đa phương tiện, thử thách mô phỏng STEM, hồ sơ khoa học và bộ tác phẩm sáng tạo cốt lõi.'}
            </p>
          </div>

          {/* 3 Pillar Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* PILLAR 1: HÀNH TRÌNH / JOURNEYS */}
            <article className="bg-[#162A40] border border-[#AAB8C7]/20 hover:border-[#D2A071]/70 transition-colors p-7 flex flex-col justify-between rounded-sm shadow-xl">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-[#AAB8C7]/18 pb-4">
                  <span className="font-mono text-[13px] font-semibold text-[#D2A071]">
                    {isEn ? 'PILLAR 01 · STORYTELLING' : 'TRỤ CỘT 01 · KỂ CHUYỆN'}
                  </span>
                  <Headphones className="w-5 h-5 text-[#D2A071]" />
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-[#F0EDE5]">
                    {isEn ? 'Journeys' : 'Hành Trình'}
                  </h3>
                  <p className="font-mono text-[13px] text-[#D2A071] mt-1">
                    /hanh-trinh · Slide, Audio &amp; Nhật ký
                  </p>
                </div>

                <p className="text-base text-[#AAB8C7] leading-relaxed">
                  {isEn
                    ? 'Synchronized NASA archival slides, bilingual voice narration, live transcripts, and 5-act stories from launch to the final fading radio signal.'
                    : 'Trình chiếu Slide ảnh NASA đồng bộ giọng đọc thuyết minh song ngữ và nhật ký 5 chặng từ lúc rời bệ phóng đến khi tín hiệu cuối cùng lặng im.'}
                </p>

                <ul className="space-y-2.5 text-sm text-[#AAB8C7] font-sans border-t border-[#AAB8C7]/18 pt-4">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D2A071] font-mono font-semibold">01</span>
                    <span>
                      {isEn
                        ? 'Synchronized Slide & Audio stage for Opportunity & Pioneer 11'
                        : 'Sân khấu Slide & Âm thanh đồng bộ cho Opportunity & Pioneer 11'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D2A071] font-mono font-semibold">02</span>
                    <span>
                      {isEn
                        ? 'Historical stories for Surveyor 3, Viking 1 & Sojourner'
                        : 'Câu chuyện lịch sử cho Surveyor 3, Viking 1 & Sojourner'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D2A071] font-mono font-semibold">03</span>
                    <span>
                      {isEn
                        ? 'Printable Exhibition Posters & Multimodal Reading Room'
                        : 'Phòng đọc nền sáng dễ theo dõi & Poster triển lãm A2'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-[#AAB8C7]/18">
                <button
                  type="button"
                  onClick={() => onNavigate('/hanh-trinh')}
                  className="w-full py-3.5 px-4 bg-[#21374D] hover:bg-[#D2A071] text-[#F0EDE5] hover:text-[#0B1422] font-sans text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer rounded-sm"
                >
                  <span>{isEn ? 'Enter Journeys' : 'Vào khu Hành Trình'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>

            {/* PILLAR 2: THỬ THÁCH & MÔ PHỎNG / CHALLENGES & SIMULATIONS */}
            <article className="bg-[#162A40] border border-[#D2A071]/35 hover:border-[#D2A071] transition-colors p-7 flex flex-col justify-between rounded-sm shadow-xl">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-[#AAB8C7]/18 pb-4">
                  <span className="font-mono text-[13px] font-semibold text-[#D2A071]">
                    {isEn ? 'PILLAR 02 · CHALLENGES & LAB' : 'TRỤ CỘT 02 · THỬ THÁCH STEM'}
                  </span>
                  <Cpu className="w-5 h-5 text-[#D2A071]" />
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-[#F0EDE5]">
                    {isEn ? 'Challenges & Simulations' : 'Thử Thách & Mô Phỏng'}
                  </h3>
                  <p className="font-mono text-[13px] text-[#D2A071] mt-1">
                    /mo-phong · 5-Step Mission Learning Flow
                  </p>
                </div>

                <p className="text-base text-[#AAB8C7] leading-relaxed">
                  {isEn
                    ? 'Every simulation directly answers a real engineering challenge through a clear 5-step flow: Discover → Explore → Simulate → Test → Explain.'
                    : 'Mỗi mô phỏng gắn chặt với một thử thách thực tế theo lộ trình 5 bước: Khám phá câu hỏi → Tìm hiểu kiến thức → Thực hành mô phỏng → Trả lời thử thách → Giải thích khoa học.'}
                </p>

                <ul className="space-y-2.5 text-sm text-[#AAB8C7] font-sans border-t border-[#AAB8C7]/18 pt-4">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D2A071] font-mono font-semibold">01</span>
                    <span>
                      {isEn
                        ? 'Track 1: Spacecraft X-Ray Anatomy, Optics & Extreme Materials'
                        : 'Chặng 1: Giải phẫu X-Ray Tàu Vũ Trụ & Vật liệu Khắc nghiệt'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D2A071] font-mono font-semibold">02</span>
                    <span>
                      {isEn
                        ? 'Track 2 & 3: Signal Delay (t=d/c), Solar Flux (1/r²), Dust τ & RTGs'
                        : 'Chặng 2 & 3: Độ trễ tín hiệu, Bão bụi Sao Hỏa & Năng lượng RTG'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D2A071] font-mono font-semibold">03</span>
                    <span>
                      {isEn
                        ? 'Track 4: Mission Chronology Sorter & Space Archaeology'
                        : 'Chặng 4: Sắp xếp Dòng thời gian Lịch sử & Khảo cổ học Không gian'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-[#AAB8C7]/18">
                <button
                  type="button"
                  onClick={() => onNavigate('/mo-phong')}
                  className="w-full py-3.5 px-4 bg-[#D2A071] hover:bg-[#DFB58C] text-[#0B1422] font-sans text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer rounded-sm"
                >
                  <span>{isEn ? 'Launch Challenges & Lab' : 'Khám phá 4 Thử thách Mô phỏng'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>

            {/* PILLAR 3: DỮ LIỆU KHOA HỌC DỄ HIỂU / UNDERSTANDABLE DATA */}
            <article className="bg-[#162A40] border border-[#AAB8C7]/20 hover:border-[#D2A071]/70 transition-colors p-7 flex flex-col justify-between rounded-sm shadow-xl">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-[#AAB8C7]/18 pb-4">
                  <span className="font-mono text-[13px] font-semibold text-[#AAB8C7]">
                    {isEn ? 'PILLAR 03 · OPEN ARCHIVE' : 'TRỤ CỘT 03 · HỒ SƠ KHOA HỌC'}
                  </span>
                  <Database className="w-5 h-5 text-[#D2A071]" />
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-[#F0EDE5]">
                    {isEn ? 'Science Data Catalogue' : 'Dữ Liệu Khoa Học'}
                  </h3>
                  <p className="font-mono text-[13px] text-[#D2A071] mt-1">
                    /du-lieu · 4 Clear Categories · 7-Part Profiles
                  </p>
                </div>

                <p className="text-base text-[#AAB8C7] leading-relaxed">
                  {isEn
                    ? 'Plain-language scientific archive organized into Missions, Spacecraft, Scientific Instruments, and Technical Sources — with readable 7-section detail sheets.'
                    : 'Kho dữ liệu tổ chức khoa học theo 4 nhóm rõ ràng: Sứ mệnh, Tàu thăm dò, Thiết bị Khoa học và Tài liệu NASA — kèm hồ sơ chi tiết 7 phần dễ đọc cho mọi lứa tuổi.'}
                </p>

                <ul className="space-y-2.5 text-sm text-[#AAB8C7] font-sans border-t border-[#AAB8C7]/18 pt-4">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D2A071] font-mono font-semibold">01</span>
                    <span>
                      {isEn
                        ? '4 clear categories: Missions, Spacecraft, Instruments & Docs'
                        : '4 danh mục trực quan: Sứ mệnh, Tàu vũ trụ, Thiết bị & Nguồn tài liệu'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D2A071] font-mono font-semibold">02</span>
                    <span>
                      {isEn
                        ? 'Plain-language verification badges without raw database jargon'
                        : 'Nhãn kiểm chứng bằng tiếng Việt dễ hiểu, không hiển thị biến thô'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D2A071] font-mono font-semibold">03</span>
                    <span>
                      {isEn
                        ? 'Clean 5-counter statistics overview & expandable technical export'
                        : 'Bảng thống kê minh bạch 5 chỉ số & bộ lọc chuyên sâu tùy chọn'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-[#AAB8C7]/18">
                <button
                  type="button"
                  onClick={() => onNavigate('/du-lieu')}
                  className="w-full py-3.5 px-4 bg-[#21374D] hover:bg-[#F0EDE5] text-[#F0EDE5] hover:text-[#0B1422] font-sans text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer rounded-sm"
                >
                  <span>{isEn ? 'Browse Open Science Data' : 'Tra cứu Hồ sơ Dữ liệu'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          </div>

          {/* KHÔNG GIAN NGHỆ THUẬT & TRUYỀN THÔNG (HUMAN EXPRESSIONS GALLERY) */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#162A40] via-[#1F3854] to-[#162A40] border border-[#D2A071]/50 rounded-sm shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl text-left">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-1 bg-[#D2A071]/20 border border-[#D2A071]/50 text-[#D2A071] font-mono text-xs font-semibold uppercase tracking-wider rounded-xs">
                  HUMAN EXPRESSIONS GALLERY
                </span>
                <span className="px-2.5 py-1 bg-[#070B14]/80 text-[#CBD5E1] border border-white/10 font-mono text-xs uppercase tracking-wider rounded-xs">
                  GÓC SÁNG TẠO &amp; NGHỆ THUẬT
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F0EDE5]">
                {isEn ? 'Human Expressions: Art, Music & Visual Stories' : 'Một câu chuyện khoa học — Nhiều cách để cảm nhận'}
              </h3>
              <p className="text-base text-[#CBD5E1] leading-relaxed">
                {isEn
                  ? 'Explore the creative works inspired by NASA mission science: LITTLE WHEELS Music Video (03:41) & Poster (Opportunity), and the 15-page Surveyor 3 Graphic Novel & PDF.'
                  : 'Không gian trưng bày các tác phẩm nghệ thuật lấy cảm hứng từ dữ liệu NASA: MV Ca nhạc “LITTLE WHEELS” (03:41), Poster nghệ thuật A2 (Opportunity), và Bộ truyện tranh 15 trang “Người bạn cô độc trên Mặt Trăng” kèm PDF gốc (Surveyor 3).'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('/san-pham')}
                className="px-5 py-3 bg-[#D2A071] hover:bg-[#DFB58C] text-[#070B14] font-sans text-sm font-semibold flex items-center gap-2 rounded-xs transition-colors cursor-pointer shadow-md"
              >
                <span>{isEn ? 'Explore Art Gallery' : 'Khám phá Không Gian Nghệ Thuật'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/hanh-trinh?format=multimedia')}
                className="px-4 py-3 bg-[#101E30] hover:bg-[#21374D] text-[#F0EDE5] border border-[#D2A071]/40 font-mono text-xs uppercase rounded-xs transition-colors cursor-pointer"
              >
                {isEn ? 'View in Journeys →' : 'Xem MV & Truyện Tranh →'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: SCROLLYTELLING PREVIEW OF FEATURED LEGENDS & ARCHIVAL SIGNALS
      ===================================================================== */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#0B1422]">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* -----------------------------------------------------------------
              3A. FEATURED LEGEND 01: OPPORTUNITY (MER-B)
          ----------------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start border-b border-[#AAB8C7]/18 pb-20">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-2.5 py-0.5 bg-[#C96F46]/20 border border-[#C96F46]/50 font-mono text-[11px] uppercase tracking-wider text-[#C96F46]">
                  {isEn ? 'FEATURED LEGEND 01 · MARS' : 'TRIỂN LÃM TRỌNG TÂM 01 · SAO HỎA'}
                </span>
                <span className="font-mono text-xs text-[#AAB8C7]">
                  NSSDCA ID: 2003-032A · MER-B
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#F0EDE5] leading-tight">
                {isEn
                  ? 'Opportunity (MER-B) — 90 Sols Planned, 5,111 Sols Across the Martian Plains'
                  : 'Opportunity (MER-B) — 90 Sol dự kiến và hành trình 5.111 Sol trên Sao Hỏa'}
              </h2>

              <p className="text-base text-[#AAB8C7] leading-relaxed">
                {isEn
                  ? 'Landing in Eagle Crater at Meridiani Planum on January 25, 2004 (UTC), Opportunity was engineered for a 90-sol primary mission. Instead, it drove 45.16 kilometers over nearly 15 Earth years, discovering hematite "blueberries" and gypsum veins that proved ancient Mars once hosted liquid water.'
                  : 'Hạ cánh xuống miệng hố Eagle tại vùng bình nguyên Meridiani Planum ngày 25/01/2004 (UTC), Opportunity ban đầu chỉ được thiết kế cho nhiệm vụ kéo dài 90 ngày Sao Hỏa (sol). Thế nhưng cỗ máy đã lăn bánh tổng cộng 45,16 km suốt gần 15 năm, tìm ra các viên đá giàu hematite ("blueberries") và mạch thạch cao chứng minh Sao Hỏa cổ đại từng có nước lỏng.'}
              </p>

              {/* Editorial Endurance Comparison Panel */}
              <div className="p-6 bg-[#162A40] border border-[#AAB8C7]/18 rounded-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <span className="uppercase tracking-wider text-[#D2A071]">
                    {isEn
                      ? 'OPERATIONAL ENDURANCE VS. DESIGN BASELINE'
                      : 'ĐỐI CHIẾU THỜI GIAN HOẠT ĐỘNG THỰC TẾ VÀ THIẾT KẾ'}
                  </span>
                  <span className="text-[#AAB8C7]">
                    {isEn ? '56.8× longer than planned' : 'Vượt 56,8 lần thiết kế ban đầu'}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between font-mono text-xs text-[#AAB8C7] mb-1">
                      <span>{isEn ? 'Primary NASA Mission Plan' : 'Nhiệm vụ thiết kế ban đầu'}</span>
                      <span>90 sols (~3 {isEn ? 'months' : 'tháng'})</span>
                    </div>
                    <div className="h-2.5 w-full bg-[#0B1422] border border-[#AAB8C7]/18">
                      <div className="h-full bg-[#AAB8C7] w-[1.8%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-mono text-xs text-[#F0EDE5] mb-1">
                      <span className="text-[#C96F46] font-semibold">
                        {isEn ? 'Actual Martian Odyssey' : 'Thực tế hoạt động trên Sao Hỏa'}
                      </span>
                      <span className="text-[#C96F46] font-semibold">
                        5,111 sols · 45.16 km (2004 – 2018)
                      </span>
                    </div>
                    <div className="h-3 w-full bg-[#0B1422] border border-[#C96F46]/40">
                      <div className="h-full bg-gradient-to-r from-[#C96F46] to-[#C5A46A] w-full" />
                    </div>
                  </div>
                </div>

                {/* Key Milestones Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#AAB8C7]/18 font-mono text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-[#AAB8C7] block">
                      {isEn ? 'Launch Date' : 'Ngày phóng'}
                    </span>
                    <span className="text-[#F0EDE5] font-semibold">2003-07-07</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#AAB8C7] block">
                      {isEn ? 'Total Odometry' : 'Tổng quãng đường'}
                    </span>
                    <span className="text-[#D2A071] font-semibold">45.16 km</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#AAB8C7] block">
                      {isEn ? 'Last Contact' : 'Tín hiệu cuối'}
                    </span>
                    <span className="text-[#C96F46] font-semibold">2018-06-10</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#AAB8C7] block">
                      {isEn ? 'Mission Complete' : 'Tuyên bố kết thúc'}
                    </span>
                    <span className="text-[#F0EDE5] font-semibold">2019-02-13</span>
                  </div>
                </div>
              </div>

              {/* Navigation Actions for Opportunity */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/hanh-trinh?mission=opportunity')}
                  className="inline-flex items-center gap-2.5 px-5 py-3 bg-[#C96F46] hover:bg-[#b85f37] text-[#F0EDE5] font-mono text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors cursor-pointer"
                >
                  <Headphones className="w-4 h-4" />
                  <span>
                    {isEn
                      ? 'Opportunity Journey (Slide & Audio)'
                      : 'Hành trình Opportunity (Slide & Audio)'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/mo-phong')}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#162A40] hover:bg-[#21374D] text-[#F0EDE5] border border-[#AAB8C7]/22 hover:border-[#D2A071] font-mono text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-[#D2A071]" />
                  <span>
                    {isEn ? 'Rover X-Ray & Solar Lab' : 'Cấu tạo Rover & Thí nghiệm Bão bụi'}
                  </span>
                </button>
              </div>
            </div>

            {/* Opportunity Visual Plate */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#162A40] border border-[#AAB8C7]/22 p-3 rounded-xs">
                <div className="relative aspect-[4/3] bg-[#0B1422] overflow-hidden group">
                  <img
                    src="/assets/nasa/opportunity_self_portrait_2007_PIA15114.jpg"
                    alt={
                      isEn
                        ? 'Opportunity Rover Self-Portrait from 2007 (PIA15114)'
                        : 'Chân dung tự chụp ghép mosaic từ Pancam của rover Opportunity năm 2007 (PIA15114)'
                    }
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  {NASA_MEDIA_CATALOG['IMG-OPP-PIA15114'] && (
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(NASA_MEDIA_CATALOG['IMG-OPP-PIA15114'])}
                      className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0B1422]/85 hover:bg-[#21374D] text-[#F0EDE5] border border-[#AAB8C7]/28 font-mono text-[11px] rounded-xs cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#D2A071]" />
                      <span>{isEn ? 'Enlarge' : 'Phóng lớn'}</span>
                    </button>
                  )}
                </div>
                <div className="pt-3 px-1 space-y-1.5 text-left">
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#D2A071]">
                    <span>NASA ID: PIA15114</span>
                    <span>Credit: NASA/JPL-Caltech/Cornell</span>
                  </div>
                  <p className="text-xs text-[#AAB8C7] leading-relaxed">
                    {isEn
                      ? 'Pancam mosaic self-portrait taken on Sols 1282–1284 (2007) overlooking Victoria Crater, assessing dust accumulation on the solar arrays.'
                      : 'Ảnh tự chụp ghép (mosaic) từ camera toàn cảnh Pancam năm 2007 (Sol 1282–1284) đánh giá độ phủ bụi trên cánh pin mặt trời tại miệng hố Victoria.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              3B. FEATURED LEGEND 02: PIONEER 11
          ----------------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start border-b border-[#AAB8C7]/18 pb-20">
            {/* Pioneer 11 Visual Plate (Left on Desktop for Editorial Rhythm) */}
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-4">
              <div className="bg-[#162A40] border border-[#AAB8C7]/22 p-3 rounded-xs">
                <div className="relative aspect-[4/3] bg-[#0B1422] overflow-hidden group">
                  <img
                    src="/assets/nasa/pioneer_spacecraft_instrument_diagram.jpg"
                    alt={
                      isEn
                        ? 'Pioneer Spacecraft Technical Diagram (ACD97-0036-2)'
                        : 'Sơ đồ kỹ thuật cấu tạo tàu Pioneer 10 và Pioneer 11 (ACD97-0036-2)'
                    }
                    className="w-full h-full object-contain p-2 bg-[#0B1422] transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  {NASA_MEDIA_CATALOG['IMG-PIO-02'] && (
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(NASA_MEDIA_CATALOG['IMG-PIO-02'])}
                      className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0B1422]/85 hover:bg-[#21374D] text-[#F0EDE5] border border-[#AAB8C7]/28 font-mono text-[11px] rounded-xs cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#D2A071]" />
                      <span>{isEn ? 'Enlarge Diagram' : 'Phóng lớn sơ đồ'}</span>
                    </button>
                  )}
                </div>
                <div className="pt-3 px-1 space-y-1.5 text-left">
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#D2A071]">
                    <span>NASA ID: ACD97-0036-2</span>
                    <span>Credit: NASA Ames</span>
                  </div>
                  <p className="text-xs text-[#AAB8C7] leading-relaxed">
                    {isEn
                      ? 'Official NASA Ames technical diagram illustrating the 2.74m high-gain dish antenna, 4 SNAP-19 RTG nuclear power units, magnetometer boom, and 12 science instruments.'
                      : 'Sơ đồ kỹ thuật chính thức của NASA Ames thể hiện ăng-ten parabol 2,74 m, 4 nguồn điện hạt nhân SNAP-19 RTG, cần từ kế và 12 thiết bị khoa học.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-2.5 py-0.5 bg-[#D2A071]/20 border border-[#D2A071]/50 font-mono text-[11px] uppercase tracking-wider text-[#D2A071]">
                  {isEn ? 'FEATURED LEGEND 02 · DEEP SPACE' : 'TRIỂN LÃM TRỌNG TÂM 02 · KHÔNG GIAN SÂU'}
                </span>
                <span className="font-mono text-xs text-[#AAB8C7]">
                  NSSDCA ID: 1973-019A · PIONEER-G
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#F0EDE5] leading-tight">
                {isEn
                  ? 'Pioneer 11 — First Spacecraft at Saturn and Bearer of the Pioneer Plaque'
                  : 'Pioneer 11 — Sứ giả đầu tiên chạm tới Sao Thổ và tấm bảng Pioneer Plaque'}
              </h2>

              <p className="text-base text-[#AAB8C7] leading-relaxed">
                {isEn
                  ? 'Launched on April 6, 1973, Pioneer 11 braved the asteroid belt, used Jupiter’s gravity on December 3, 1974 to hurl itself across the Solar System, and on September 1, 1979 became the first spacecraft to fly by Saturn. Powered by four SNAP-19 radioisotope thermoelectric generators (RTGs), it transmitted science until autumn 1995.'
                  : 'Rời bệ phóng ngày 06/04/1973, Pioneer 11 vượt qua vành đai tiểu hành tinh, tận dụng lực hấp dẫn của Sao Mộc (03/12/1974) để văng sang phía bên kia Hệ Mặt Trời và trở thành tàu vũ trụ đầu tiên bay ngang qua Sao Thổ ngày 01/09/1979. Nhờ 4 máy phát nhiệt điện đồng vị phóng xạ SNAP-19 (RTG), tàu duy trì liên lạc ở khoảng cách hàng tỷ km tới mùa thu năm 1995.'}
              </p>

              {/* Key Milestones & Provenance Distinction */}
              <div className="p-6 bg-[#162A40] border border-[#AAB8C7]/18 rounded-xs space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-[#AAB8C7] block">
                      {isEn ? 'Launch (UTC)' : 'Ngày phóng'}
                    </span>
                    <span className="text-[#F0EDE5] font-semibold">1973-04-06</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#AAB8C7] block">
                      {isEn ? 'Jupiter Flyby' : 'Bay qua Sao Mộc'}
                    </span>
                    <span className="text-[#F0EDE5] font-semibold">1974-12-03</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#AAB8C7] block">
                      {isEn ? 'Saturn Flyby' : 'Bay qua Sao Thổ'}
                    </span>
                    <span className="text-[#D2A071] font-semibold">1979-09-01</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#AAB8C7] block">
                      {isEn ? 'Last Contact / Data' : 'Liên lạc / Dữ liệu cuối'}
                    </span>
                    <span className="text-[#C96F46] font-semibold">1995-09-30 / 11-24</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#AAB8C7]/18 text-xs text-[#AAB8C7] leading-relaxed">
                  <strong className="text-[#D2A071] font-mono uppercase mr-1.5">
                    {isEn ? 'Provenance Note:' : 'Lưu ý chuẩn xác tư liệu:'}
                  </strong>
                  {isEn
                    ? 'Pioneer 11 carries the gold-anodized aluminum Pioneer Plaque (A73-9015-2) showing human figures and a pulsar map relative to the Sun — distinct from the Voyager Golden Record phonograph carried aboard Voyager 1 and 2.'
                    : 'Pioneer 11 mang theo tấm bảng nhôm mạ vàng Pioneer Plaque (A73-9015-2) khắc hình ảnh con người và bản đồ định vị Mặt Trời bằng 14 sao xung — hoàn toàn khác với đĩa âm thanh Voyager Golden Record trên tàu Voyager 1 & 2.'}
                </div>
              </div>

              {/* Navigation Actions for Pioneer 11 */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/hanh-trinh?mission=pioneer-11')}
                  className="inline-flex items-center gap-2.5 px-5 py-3 bg-[#D2A071] hover:bg-[#b59357] text-[#0B1422] font-mono text-xs uppercase tracking-wider font-bold rounded-xs transition-colors cursor-pointer"
                >
                  <Headphones className="w-4 h-4" />
                  <span>
                    {isEn
                      ? 'Pioneer 11 Journey (Slide & Audio)'
                      : 'Hành trình Pioneer 11 (Slide & Audio)'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/mo-phong')}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#162A40] hover:bg-[#21374D] text-[#F0EDE5] border border-[#AAB8C7]/22 hover:border-[#D2A071] font-mono text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-[#D2A071]" />
                  <span>
                    {isEn
                      ? 'Decode Pioneer Plaque & RTG Lab'
                      : 'Giải mã Pioneer Plaque & Nguồn RTG'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              3C. SLEEPING EXPLORERS PREVIEW STRIP (Surveyor 3, Viking 1, Sojourner)
          ----------------------------------------------------------------- */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 text-left">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#AAB8C7]">
                  {isEn
                    ? '03 · ARCHIVAL SEED PROFILES (MOON & MARS)'
                    : '03 · HỒ SƠ TƯ LIỆU MẪU TRÊN MẶT TRĂNG & SAO HỎA'}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#F0EDE5]">
                  {isEn
                    ? 'Foundational Landers & Rovers Resting Across the Solar System'
                    : 'Những Cỗ Máy Tiên Phong Đang Yên Nghỉ'}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('/du-lieu')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#162A40] hover:bg-[#21374D] text-[#F0EDE5] border border-[#AAB8C7]/22 hover:border-[#D2A071] font-mono text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer self-start md:self-end"
              >
                <Database className="w-4 h-4 text-[#D2A071]" />
                <span>
                  {isEn
                    ? 'Open All 17 NSSDCA Records in Data Catalog'
                    : 'Xem toàn bộ 17 vật thể tại kho Dữ Liệu'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {COMPACT_SEED_PREVIEWS.map((item) => {
                const mediaObj = NASA_MEDIA_CATALOG[item.mediaKey];
                const imgSrc = resolveMediaImageSrc(
                  item.mediaKey,
                  '/assets/nasa/apollo12_surveyor3_AS12-48-7134.jpg'
                );
                const metrics = isEn ? item.metricsEn : item.metricsVi;

                return (
                  <article
                    key={item.id}
                    className="bg-[#162A40] border border-[#AAB8C7]/18 hover:border-white/25 transition-colors rounded-xs overflow-hidden flex flex-col justify-between text-left"
                  >
                    <div>
                      {/* Card Top Bar with Demo Record Badge */}
                      <div className="px-4 py-2.5 bg-[#101E30]/80 border-b border-[#AAB8C7]/18 flex items-center justify-between gap-2 font-mono text-[11px]">
                        <span className="text-[#D2A071] font-semibold">{item.codeId}</span>
                        <span className="px-2 py-0.5 bg-[#21374D] text-[#F0EDE5] border border-[#AAB8C7]/22 text-[10px] uppercase tracking-wider rounded-xs">
                          {isEn ? 'Demo Record' : 'Hồ sơ tư liệu mẫu'}
                        </span>
                      </div>

                      {/* Image */}
                      <div className="relative aspect-[16/10] bg-[#0B1422] overflow-hidden group">
                        <img
                          src={imgSrc}
                          alt={isEn ? item.nameEn : item.nameVi}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {mediaObj && (
                          <button
                            type="button"
                            onClick={() => onOpenLightbox(mediaObj)}
                            className="absolute top-2.5 right-2.5 px-2 py-1 bg-[#0B1422]/85 hover:bg-[#21374D] text-[#F0EDE5] border border-[#AAB8C7]/28 font-mono text-[10px] rounded-xs inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Maximize2 className="w-3 h-3 text-[#D2A071]" />
                            <span>{isEn ? 'Zoom' : 'Phóng lớn'}</span>
                          </button>
                        )}
                        <div className="absolute bottom-2 left-2.5 px-2 py-0.5 bg-[#0B1422]/85 font-mono text-[10px] text-[#AAB8C7] border border-[#AAB8C7]/18">
                          {item.credit}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-center justify-between font-mono text-[11px] text-[#C96F46]">
                          <span>{isEn ? item.realmEn : item.realmVi}</span>
                          <span className="inline-flex items-center gap-1 text-[#AAB8C7]">
                            <MapPin className="w-3 h-3 text-[#D2A071]" />
                            {item.site}
                          </span>
                        </div>

                        <h3 className="font-display text-xl font-bold text-[#F0EDE5]">
                          {isEn ? item.nameEn : item.nameVi}
                        </h3>

                        <p className="font-mono text-[11px] text-[#D2A071]">
                          {isEn ? item.keyDatesEn : item.keyDatesVi}
                        </p>

                        <p className="text-xs sm:text-sm text-[#AAB8C7] leading-relaxed">
                          {isEn ? item.summaryEn : item.summaryVi}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {metrics.map((m, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 bg-[#0B1422] border border-[#AAB8C7]/18 font-mono text-[10px] text-[#E9EDF2]"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="px-5 py-3.5 bg-[#101E30]/75 border-t border-[#AAB8C7]/18 flex items-center justify-between gap-2 font-mono text-xs">
                      <button
                        type="button"
                        onClick={() => onNavigate(`/hanh-trinh?mission=${item.id}`)}
                        className="text-[#C96F46] hover:text-[#F0EDE5] inline-flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                      >
                        <span>{isEn ? 'Read Story' : 'Xem Hành trình'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onNavigate('/du-lieu')}
                        className="text-[#AAB8C7] hover:text-[#D2A071] inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>{isEn ? 'NSSDCA Spec' : 'Thông số gốc'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Independent Educational Museum Disclaimer Bar */}
          <div className="mt-16 p-4 sm:p-5 bg-[#162A40]/80 border border-[#AAB8C7]/18 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#AAB8C7] font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D2A071] shrink-0" />
              <span>
                {isEn
                  ? 'Independent educational digital museum. Sourced from NASA Science, JPL, and NTRS archives. Not affiliated with or endorsed by NASA.'
                  : 'Bảo tàng số giáo dục độc lập. Dữ liệu trích xuất từ kho lưu trữ NASA Science, JPL và NTRS. Không phải là trang web chính thức của NASA.'}
              </span>
            </div>
            <a
              href="https://science.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D2A071] hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <span>NASA Science Official Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
