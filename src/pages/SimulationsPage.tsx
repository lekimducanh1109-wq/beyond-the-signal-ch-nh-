import React, { useState, useMemo, useEffect } from 'react';
import {
  NASA_MEDIA_CATALOG,
  HOTSPOTS_OPPORTUNITY,
  HOTSPOTS_PIONEER_DIAGRAM,
  HOTSPOTS_PLAQUE,
  NasaMediaItem
} from '../data/museumData';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  ExternalLink,
  HelpCircle,
  Info,
  Layers,
  Maximize2,
  Milestone,
  Orbit,
  Pause,
  Play,
  Radio,
  RotateCcw,
  ShieldCheck,
  Shuffle,
  Sparkles,
  XCircle,
  Zap
} from 'lucide-react';

export interface SimulationsPageProps {
  lang: 'vi' | 'en';
  onNavigate: (route: string) => void;
  onOpenLightbox?: (item: NasaMediaItem) => void;
}

/* ============================================================================
 * 5-STEP LEARNING FLOW RIBBON COMPONENT
 * 1. Khám phá -> 2. Tìm hiểu -> 3. Mô phỏng -> 4. Thử thách -> 5. Giải thích
 * ============================================================================ */
interface SimStepRibbonProps {
  lang: 'vi' | 'en';
  simDone: boolean;
  quizSolved: number;
  quizTotal: number;
}

const SimChallengeStepRibbon: React.FC<SimStepRibbonProps> = ({
  lang,
  simDone,
  quizSolved,
  quizTotal
}) => {
  const isEn = lang === 'en';
  const steps = [
    {
      num: '1',
      vi: 'Khám phá',
      en: 'Discover',
      descVi: 'Câu hỏi cốt lõi',
      descEn: 'Core mission puzzle',
      done: true
    },
    {
      num: '2',
      vi: 'Tìm hiểu',
      en: 'Explore',
      descVi: 'Nguyên lý NASA',
      descEn: 'Science & context',
      done: true
    },
    {
      num: '3',
      vi: 'Mô phỏng',
      en: 'Simulate',
      descVi: 'Thực hành tương tác',
      descEn: 'Hands-on model',
      done: simDone
    },
    {
      num: '4',
      vi: 'Thử thách',
      en: 'Test',
      descVi: `${quizSolved}/${quizTotal} câu hỏi`,
      descEn: `${quizSolved}/${quizTotal} solved`,
      done: quizSolved >= quizTotal
    },
    {
      num: '5',
      vi: 'Giải thích',
      en: 'Explain',
      descVi: 'Kết luận xác minh',
      descEn: 'Verified takeaway',
      done: simDone && quizSolved >= quizTotal
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
      {steps.map((s) => (
        <div
          key={s.num}
          className={`px-3.5 py-2.5 rounded-lg border transition-colors ${
            s.done
              ? 'bg-[#21374D]/80 border-[#D2A071]/45 text-[#F0EDE5]'
              : 'bg-[#0B1422]/70 border-[#AAB8C7]/15 text-[#AAB8C7]'
          }`}
        >
          <div className="flex items-center justify-between gap-1.5">
            <span className="font-mono text-[13px] font-semibold text-[#D2A071]">
              {isEn ? `Step ${s.num}` : `Bước ${s.num}`}
            </span>
            {s.done && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          </div>
          <div className="font-sans text-sm font-semibold text-[#F0EDE5] mt-0.5">
            {isEn ? s.en : s.vi}
          </div>
          <div className="font-sans text-[13px] text-[#AAB8C7] mt-0.5">
            {isEn ? s.descEn : s.descVi}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ============================================================================
 * STEP 5 EXPLANATION & SCIENTIFIC PROVENANCE FOOTER
 * ============================================================================ */
interface SimTrackExplanationProps {
  lang: 'vi' | 'en';
  trackCode: string;
  takeawayVi: string;
  takeawayEn: string;
  dataUsedVi: string;
  dataUsedEn: string;
  assumptionsVi: string;
  assumptionsEn: string;
  limitationsVi: string;
  limitationsEn: string;
  journeyRoute: string;
  dataRoute: string;
  onNavigate: (route: string) => void;
}

const SimTrackExplanationFooter: React.FC<SimTrackExplanationProps> = ({
  lang,
  trackCode,
  takeawayVi,
  takeawayEn,
  dataUsedVi,
  dataUsedEn,
  assumptionsVi,
  assumptionsEn,
  limitationsVi,
  limitationsEn,
  journeyRoute,
  dataRoute,
  onNavigate
}) => {
  const isEn = lang === 'en';
  return (
    <div className="mt-8 pt-6 border-t border-[#AAB8C7]/15 space-y-5">
      <div className="p-5 sm:p-6 bg-[#162A40] border border-[#D2A071]/35 rounded-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 font-mono text-[13px] text-[#D2A071] font-semibold uppercase tracking-wide">
            <BookOpen className="w-4 h-4" />
            <span>
              {isEn
                ? `Step 5 · Verified Explanation (${trackCode})`
                : `Bước 5 · Giải thích Khoa học & Tư liệu Xác minh (${trackCode})`}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/75 text-emerald-300 border border-emerald-500/40 rounded-full font-mono text-[13px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isEn ? 'NASA Verified' : 'Đã xác minh nguồn NASA'}</span>
          </span>
        </div>

        <p className="text-base text-[#F0EDE5] leading-relaxed font-sans">
          {isEn ? takeawayEn : takeawayVi}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-[#101E30] border border-[#AAB8C7]/15 rounded-lg">
            <div className="font-mono text-[13px] text-[#D2A071] font-semibold mb-1.5">
              {isEn ? 'Verified Data Used' : 'Dữ liệu NASA sử dụng'}
            </div>
            <p className="text-sm text-[#AAB8C7] leading-relaxed">
              {isEn ? dataUsedEn : dataUsedVi}
            </p>
          </div>
          <div className="p-4 bg-[#101E30] border border-[#AAB8C7]/15 rounded-lg">
            <div className="font-mono text-[13px] text-[#D2A071] font-semibold mb-1.5">
              {isEn ? 'Model Assumptions' : 'Giả định mô hình'}
            </div>
            <p className="text-sm text-[#AAB8C7] leading-relaxed">
              {isEn ? assumptionsEn : assumptionsVi}
            </p>
          </div>
          <div className="p-4 bg-[#101E30] border border-[#AAB8C7]/15 rounded-lg">
            <div className="font-mono text-[13px] text-[#D2A071] font-semibold mb-1.5">
              {isEn ? 'Scope & Limitations' : 'Giới hạn phạm vi'}
            </div>
            <p className="text-sm text-[#AAB8C7] leading-relaxed">
              {isEn ? limitationsEn : limitationsVi}
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate(journeyRoute)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D2A071] hover:bg-[#e0b287] text-[#0B1422] font-sans text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <span>{isEn ? 'Read Mission Story in Journeys' : 'Xem câu chuyện tại Hành Trình'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate(dataRoute)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#21374D] hover:bg-[#2a4560] text-[#F0EDE5] border border-[#AAB8C7]/25 font-sans text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            <span>{isEn ? 'Inspect Full Dataset in Catalog' : 'Tra cứu thông số chi tiết'}</span>
            <ExternalLink className="w-4 h-4 text-[#D2A071]" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * MODULE 1 DATA: SPACECRAFT X-RAY & ANATOMY EXPLORER
 * Combines HOTSPOTS_OPPORTUNITY, HOTSPOTS_PIONEER_DIAGRAM, HOTSPOTS_PLAQUE
 * with bilingual engineering breakdowns (Materials, Why Built, Discoveries)
 * ============================================================================ */
interface AnatomyPartDetail {
  id: string;
  x: number;
  y: number;
  code: string;
  titleVi: string;
  titleEn: string;
  subsystemVi: string;
  subsystemEn: string;
  locationVi?: string;
  locationEn?: string;
  materialsVi: string;
  materialsEn: string;
  whyBuiltVi: string;
  whyBuiltEn: string;
  discoveredVi: string;
  discoveredEn: string;
  sourceIds: string[];
}

const OPPORTUNITY_ANATOMY_PARTS: AnatomyPartDetail[] = [
  {
    id: HOTSPOTS_OPPORTUNITY[0].id,
    x: HOTSPOTS_OPPORTUNITY[0].x,
    y: HOTSPOTS_OPPORTUNITY[0].y,
    code: 'PMA · PANCAM / NAVCAM (MAST HEAD)',
    titleVi: 'Cột Camera Toàn Cảnh & Định Hướng (Pancam & Navcam)',
    titleEn: 'Panoramic & Navigation Camera Mast (Pancam & Navcam)',
    subsystemVi: 'Quang học từ xa & Định hướng lập thể',
    subsystemEn: 'Remote Sensing & Stereo Navigation Optics',
    locationVi: 'Đỉnh cột quan sát (PMA mast head), ở độ cao 1,5 mét ngang tầm mắt người quan sát.',
    locationEn: 'Top of the Panoramic Mast Assembly (PMA mast head), elevated 1.5 m at human eye level.',
    materialsVi: 'Cột sợi carbon và nhôm tổ ong cao ~1,5 m; cặp camera CCD 1024×1024 pixel kèm bánh xe 8 kính lọc màu quang phổ (400–1000 nm) với khoảng cách hai mắt 30 cm.',
    materialsEn: 'Carbon-fiber & aluminum honeycomb mast (~1.5 m height); dual 1024×1024 CCD stereo cameras with 8-filter spectral wheels (400–1000 nm) and 30 cm stereo baseline.',
    whyBuiltVi: 'Đặt ở độ cao ngang tầm mắt người (1,5 m) để chụp ảnh toàn cảnh 360° phân tích khoáng vật từ xa và tạo bản đồ địa hình 3D giúp rover tự định hướng an toàn.',
    whyBuiltEn: 'Positioned at human eye-level (1.5 m) to capture 360° multispectral panoramas, identify minerals remotely, and build 3D terrain elevation maps for autonomous navigation.',
    discoveredVi: 'Chụp hơn 217.000 bức ảnh Sao Hỏa, phát hiện các lớp đá trầm tích phân lớp tại miệng hố Victoria và Endeavour (rộng 22 km), cũng như chụp 2 khung hình Mặt Trời mờ ảo cuối cùng ngày 10/06/2018.',
    discoveredEn: 'Captured over 217,000 raw images, revealed cross-bedded sedimentary layers at Victoria and Endeavour Craters (22 km wide), and recorded the final dim solar images on 2018-06-10.',
    sourceIds: ['SRC-OPP-01', 'SRC-OPP-03', 'SRC-OPP-06']
  },
  {
    id: HOTSPOTS_OPPORTUNITY[1].id,
    x: HOTSPOTS_OPPORTUNITY[1].x,
    y: HOTSPOTS_OPPORTUNITY[1].y,
    code: 'MINI-TES · THERMAL EMISSION SPECTROMETER',
    titleVi: 'Quang Phổ Kế Phát Xạ Nhiệt Thu Nhỏ (Mini-TES)',
    titleEn: 'Miniature Thermal Emission Spectrometer (Mini-TES)',
    subsystemVi: 'Khoáng vật học Hồng ngoại Nhiệt & Thăm dò Khí quyển',
    subsystemEn: 'Thermal Infrared Mineralogy & Atmospheric Sounding',
    locationVi: 'LƯU Ý THIẾT KẾ: Đặt bên trong khoang điện tử thân xe (Warm Electronics Box - WEB) để giữ ấm; nhìn ra đường chân trời Sao Hỏa qua hệ thống gương tiềm vọng bên trong cột mast (KHÔNG gắn trên đỉnh cột).',
    locationEn: 'ENGINEERING ARCHITECTURE: Insulated inside the rover body Warm Electronics Box (WEB) for thermal survival; views Mars via periscope fold mirrors inside the mast (NOT mounted on the mast head).',
    materialsVi: 'Giao thoa kế Michelson thu nhỏ, dải phổ hồng ngoại nhiệt 5,0 đến 29,0 µm (339,5 đến 1997,1 cm⁻¹); độ phân giải 10 cm⁻¹; bộ thu tín hiệu nhiệt điện DTGS cách nhiệt Aerogel.',
    materialsEn: 'Miniature Michelson interferometer spanning 5.0 to 29.0 µm thermal infrared (339.5 to 1997.1 cm⁻¹); 10 cm⁻¹ spectral resolution; Aerogel-insulated uncooled DTGS detector.',
    whyBuiltVi: 'Kỹ sư NASA không thể đặt Mini-TES trên đỉnh cột mast vì thiết bị hồng ngoại nhạy cảm này cần nhiệt độ ổn định. Đặt Mini-TES an toàn bên trong thân xe (hộp WEB giữ ấm khí Aerogel) và dẫn ánh sáng xuống qua hệ thống gương tiềm vọng periscope trong cột mast giúp đo khoáng vật từ xa mà không bị đóng băng trong đêm đông Sao Hỏa (-100°C).',
    whyBuiltEn: 'NASA engineers could not place Mini-TES on the cold mast head because sensitive IR optics require strict thermal insulation. Placing it inside the Aerogel-insulated Warm Electronics Box (WEB) and channeling light via fold mirrors protected it from freezing Martian nights (-100°C).',
    discoveredVi: 'Xác định từ xa các khoáng vật olivine, pyroxene và hematite xám tại Meridiani Planum từ cự ly hàng cây số, dẫn lối cho Opportunity lăn bánh trực tiếp tới các mỏm đá trầm tích chứa bằng chứng nước lỏng cổ đại.',
    discoveredEn: 'Remotely identified olivine, pyroxene, and coarse gray hematite outcrops across Meridiani Planum from kilometers away, guiding Opportunity directly to historic aqueous deposits.',
    sourceIds: ['SRC-OPP-01', 'SRC-OPP-03']
  },
  {
    id: HOTSPOTS_OPPORTUNITY[2].id,
    x: HOTSPOTS_OPPORTUNITY[2].x,
    y: HOTSPOTS_OPPORTUNITY[2].y,
    code: 'EPS · TRIPLE-JUNCTION SOLAR ARRAYS',
    titleVi: 'Hệ Thống Cánh Pin Mặt Trời Ba Lớp Tiếp Giáp (Solar Arrays)',
    titleEn: 'Triple-Junction Gallium Arsenide Solar Arrays',
    subsystemVi: 'Hệ thống Năng lượng Điện & Kiểm soát Nhiệt (WEB)',
    subsystemEn: 'Electrical Power & Warm Electronics Box (WEB)',
    locationVi: 'Bề mặt trên cùng của thân xe (Rover Equipment Deck), diện tích khoảng 1,3 m².',
    locationEn: 'Top surface of the rover equipment deck, covering an area of approximately 1.3 m².',
    materialsVi: 'Các tế bào quang điện Gallium Indium Phosphide / Gallium Arsenide (GaInP/GaAs/Ge) gắn trên tấm nền composite nhẹ, nạp điện cho 2 pin sạc Lithium-ion bên trong hộp giữ ấm khí Aerogel.',
    materialsEn: 'Triple-junction GaInP/GaAs/Ge photovoltaic cells mounted on lightweight honeycomb wings, charging dual Lithium-ion batteries housed inside an Aerogel-insulated Warm Electronics Box.',
    whyBuiltVi: 'Ở khoảng cách 1,52 AU của Sao Hỏa, cánh pin mở rộng tối đa diện tích thu nắng (~1,3 m²) để tạo ra ~900 Wh/sol khi sạch bụi, giúp giảm khối lượng so với lò hạt nhân.',
    whyBuiltEn: 'At Mars (1.52 AU), deployable wings maximized surface area (~1.3 m²) to generate ~900 Wh/sol when clean, fitting strict Delta II launch mass limits.',
    discoveredVi: 'Nhờ các cơn lốc bụi tự nhiên (cleaning events) thổi sạch cát trên pin, Opportunity vượt mốc thiết kế 90 sol để sống gần 15 năm — cho đến khi bão bụi toàn hành tinh tháng 6/2018 chặn đứng ánh sáng.',
    discoveredEn: 'Thanks to natural wind "cleaning events" sweeping dust off the panels, Opportunity outlived its 90-sol plan to operate nearly 15 years until the June 2018 global dust storm blocked sunlight.',
    sourceIds: ['SRC-OPP-01', 'SRC-OPP-04']
  },
  {
    id: HOTSPOTS_OPPORTUNITY[3].id,
    x: HOTSPOTS_OPPORTUNITY[3].x,
    y: HOTSPOTS_OPPORTUNITY[3].y,
    code: 'IDD · RAT / MÖSSBAUER / APXS / MI',
    titleVi: 'Cánh Tay Robot & Cụm Thiết Bị Địa Chất Tiếp Xúc (IDD)',
    titleEn: 'Instrument Deployment Device (Robotic Arm: RAT, Mössbauer, APXS, MI)',
    subsystemVi: 'Phòng thí nghiệm Khoáng vật & Hiển vi Tiếp xúc',
    subsystemEn: 'In-Situ Contact Mineralogy & Micro-Imaging Turret',
    locationVi: 'Gắn phía trước mũi thân xe, khớp xoay 5 bậc tự do có thể vươn dài 1,02 m đến bề mặt đá đất.',
    locationEn: 'Mounted on the front chassis, featuring a 5-DOF articulated arm extending up to 1.02 m.',
    materialsVi: 'Cánh tay titan 5 bậc tự do mang mâm xoay 4 thiết bị: Mũi mài đá kim cương RAT (quay 3.000 vòng/phút), Quang phổ kế Mössbauer (nguồn Cobalt-57), Quang phổ kế tia X/hạt alpha APXS (nguồn Curium-244) và Camera hiển vi MI.',
    materialsEn: '5-degree-of-freedom titanium arm carrying a 4-instrument turret: diamond-toothed Rock Abrasion Tool (RAT), Cobalt-57 Mössbauer Spectrometer, Curium-244 APXS, and Microscopic Imager (MI).',
    whyBuiltVi: 'Đá Sao Hỏa luôn bị phủ một lớp bụi và vỏ phong hóa. Mũi mài RAT phải bào mòn sâu 5 mm lớp vỏ ngoài để APXS và Mössbauer phân tích thành phần nguyên tố và khoáng vật sắt nguyên bản bên trong.',
    whyBuiltEn: 'Martian rocks are coated in dust and weathering rinds. The RAT grinds 5 mm into rock interiors so APXS and Mössbauer can measure pristine elemental and iron-bearing mineral compositions.',
    discoveredVi: 'Xác nhận các hạt vi cầu giàu khoáng vật hematite ("blueberries"), đá trầm tích jarosite và mạch thạch cao (gypsum) — bằng chứng trực tiếp rằng nước lỏng từng chảy và đọng lại trên Sao Hỏa.',
    discoveredEn: 'Confirmed hematite concretions ("blueberries"), jarosite sulfates, and gypsum veins—definitive geological evidence that liquid water once soaked and flowed across Mars.',
    sourceIds: ['SRC-OPP-01', 'SRC-OPP-03']
  },
  {
    id: HOTSPOTS_OPPORTUNITY[4].id,
    x: HOTSPOTS_OPPORTUNITY[4].x,
    y: HOTSPOTS_OPPORTUNITY[4].y,
    code: 'MOBILITY · 6-WHEEL ROCKER-BOGIE',
    titleVi: 'Hệ Thống 6 Bánh Xe Nhôm Nguyên Khối & Khung Rocker-Bogie',
    titleEn: 'Six-Wheel Solid Aluminum & Rocker-Bogie Mobility System',
    subsystemVi: 'Cơ học Di chuyển Địa hình & Giảm chấn Thụ động',
    subsystemEn: 'All-Terrain Locomotion & Passive Suspension',
    locationVi: 'Khung truyền động Rocker-Bogie phân bổ đều 6 bánh xe nhôm hai bên thân xe.',
    locationEn: 'Titanium rocker-bogie linkages distributing 6 machined aluminum wheels across both flanks.',
    materialsVi: '6 bánh xe đường kính 25 cm tiện từ nhôm hàng không nguyên khối với nan hoa titan uốn cong hấp thụ xung lực; hệ thống treo khớp nối Rocker-Bogie bằng ống titan không dùng lò xo.',
    materialsEn: 'Six 25 cm wheels machined from solid aerospace aluminum with curved titanium shock-absorbing spokes; springless titanium Rocker-Bogie articulated suspension.',
    whyBuiltVi: 'Áp suất khí quyển Sao Hỏa chỉ bằng 1% Trái Đất và nhiệt độ ban đêm xuống dưới -100°C khiến cao su nổ hoặc vỡ giòn. Khung Rocker-Bogie giúp cả 6 bánh luôn bám đất khi leo qua đá cao gấp đôi đường kính bánh.',
    whyBuiltEn: 'At 1% Earth atmospheric pressure and -100°C nights, rubber tires would burst or shatter. The Rocker-Bogie linkage keeps all 6 wheels grounded over rocks twice the wheel diameter.',
    discoveredVi: 'Lăn bánh khỏi bệ đổ bộ ngày 31/01/2004 (PST) và hoàn thành tổng quãng đường 45,16 km qua Meridiani Planum đến Perseverance Valley (giữ kỷ lục ngoài Trái Đất suốt hơn một thập kỷ cho tới 11/10/2026).',
    discoveredEn: 'Rolled off the lander on 2004-01-31 (PST) and drove 45.16 km from Eagle Crater to Perseverance Valley (holding the off-world driving record until Perseverance surpassed it on 2026-10-11).',
    sourceIds: ['SRC-OPP-01', 'SRC-OPP-02', 'SRC-OPP-05']
  },
  {
    id: HOTSPOTS_OPPORTUNITY[5].id,
    x: HOTSPOTS_OPPORTUNITY[5].x,
    y: HOTSPOTS_OPPORTUNITY[5].y,
    code: 'TELECOM · HGA / LGA / UHF ANTENNA SUITE',
    titleVi: 'Hệ Thống Ăng-ten Vô Tuyến Viễn Thông (HGA / LGA / UHF)',
    titleEn: 'Telecommunications Antenna Suite (HGA / LGA / UHF)',
    subsystemVi: 'Viễn thông Không gian Sâu X-Band & Chuyển tiếp UHF',
    subsystemEn: 'Deep Space X-Band Direct & UHF Orbiter Relay',
    locationVi: 'Trên boong thiết bị phía sau thân xe: chảo HGA định hướng hai trục, cọc LGA đẳng hướng và ăng-ten cọc UHF.',
    locationEn: 'Mounted on the rear equipment deck: steerable parabolic High-Gain dish, omni Low-Gain mast, and UHF whip.',
    materialsVi: 'Chảo HGA đường kính 28 cm xoay 2 trục kết nối trực tiếp X-band (~8,4 GHz) với Deep Space Network; ăng-ten cọc UHF (400 MHz) liên lạc với tàu quỹ đạo Mars Odyssey và MRO.',
    materialsEn: '28 cm steerable 2-axis parabolic dish for direct-to-Earth X-band (~8.4 GHz) links; UHF monopole (400 MHz) transceivers relaying to Mars Odyssey and MRO orbiters.',
    whyBuiltVi: 'Ở khoảng cách 1,52 AU, chảo HGA nhỏ 28 cm gửi tín hiệu yếu trực tiếp về Trái Đất (tốc độ vài kbps). Kỹ sư NASA bổ sung liên lạc UHF chuyển tiếp qua vệ tinh quỹ đạo Sao Hỏa (tốc độ lên tới 128–256 kbps), tăng gấp hàng chục lần khối lượng dữ liệu khoa học gửi về.',
    whyBuiltEn: 'At 1.52 AU, a compact 28 cm dish achieves modest direct-to-Earth data rates. Adding UHF relay through Mars orbiters boosted data downlink speeds up to 256 kbps, allowing hundreds of daily photos.',
    discoveredVi: 'Truyền thành công hơn 217.000 bức ảnh thô và toàn bộ dữ liệu khoa học 5.111 sol về Trái Đất trước khi truyền đi gói telemetry cuối cùng vào ngày 10/06/2018.',
    discoveredEn: 'Downlinked over 217,000 raw frames and 5,111 sols of continuous telemetry before transmitting its final radio packet on 2018-06-10.',
    sourceIds: ['SRC-OPP-01', 'SRC-OPP-02']
  }
];

const PIONEER_ANATOMY_PARTS: AnatomyPartDetail[] = [
  {
    id: HOTSPOTS_PIONEER_DIAGRAM[0].id,
    x: HOTSPOTS_PIONEER_DIAGRAM[0].x,
    y: HOTSPOTS_PIONEER_DIAGRAM[0].y,
    code: 'TELECOM · 2.74M HIGH-GAIN DISH ANTENNA',
    titleVi: 'Ăng-ten Chảo Parabol Độ Lợi Cao (Đường kính 2,74 m)',
    titleEn: '2.74-Meter High-Gain Parabolic Dish Antenna',
    subsystemVi: 'Viễn thông Không gian Sâu & Ổn định Quay (Spin-Stabilized)',
    subsystemEn: 'Deep Space S-Band Telecommunications & Spin Stabilization',
    materialsVi: 'Chảo nhôm tổ ong đường kính 2,74 m (9 feet), bộ thu phát sóng S-band (2,1–2,3 GHz) công suất phát chỉ 8 Watt, kết hợp ổn định con quay thân tàu tự xoay ~4,8 vòng/phút.',
    materialsEn: '2.74 m (9 ft) aluminum honeycomb parabolic dish with an 8-Watt S-band (2.1–2.3 GHz) traveling-wave tube amplifier, spin-stabilized at ~4.8 RPM.',
    whyBuiltVi: 'Ở khoảng cách hàng tỷ km ngoài Sao Thổ, công suất phát 8W (tương đương một bóng đèn ngủ) phải được hội tụ thành chùm tia cực hẹp hướng thẳng về các chảo ăng-ten 70m của mạng lưới Deep Space Network trên Trái Đất.',
    whyBuiltEn: 'Across billions of kilometers beyond Saturn, an 8-Watt transmitter (like a nightlight bulb) must be focused into a razor-thin beam aimed directly at NASA’s 70-meter Deep Space Network dishes on Earth.',
    discoveredVi: 'Truyền thành công dữ liệu ảnh chụp vành F Sao Thổ, Titan (từ cự ly ~2,846 triệu km) và duy trì liên lạc suốt hơn 22 năm cho đến lần liên lạc điều hành cuối ngày 30/09/1995.',
    discoveredEn: 'Successfully transmitted close-up imagery of Saturn’s F ring and Titan (~2,846,000 km away) and maintained communication for 22+ years until final operational contact on 1995-09-30.',
    sourceIds: ['SRC-PIO-01', 'SRC-PIO-02', 'SRC-PIO-04']
  },
  {
    id: HOTSPOTS_PIONEER_DIAGRAM[1].id,
    x: HOTSPOTS_PIONEER_DIAGRAM[1].x,
    y: HOTSPOTS_PIONEER_DIAGRAM[1].y,
    code: 'POWER · 4× SNAP-19 RTG & 12× RHU',
    titleVi: '4 Máy Phát Nhiệt Điện Đồng Vị Phóng Xạ SNAP-19 (RTG) & 12 Bộ Sưởi RHU',
    titleEn: 'Four SNAP-19 Radioisotope Thermoelectric Generators (RTGs) & 12 RHUs',
    subsystemVi: 'Hệ thống Năng lượng Hạt nhân & Kiểm soát Nhiệt Không gian Sâu',
    subsystemEn: 'Nuclear Radioisotope Power & Deep-Space Thermal Control',
    materialsVi: '4 máy phát SNAP-19 RTG chứa nhiên liệu Plutonium-238 dioxide đặt trên 2 cần vươn dài ~3 m (tạo ra ~155 W điện khi phóng), đi kèm 12 bộ sưởi đồng vị phóng xạ (RHU) mỗi bộ 1 Watt nhiệt.',
    materialsEn: 'Four SNAP-19 RTGs fueled by Plutonium-238 dioxide mounted on two ~3 m deployable trusses (~155 W electrical at launch), plus 12 one-watt Radioisotope Heater Units (RHUs).',
    whyBuiltVi: 'Theo định luật nghịch đảo bình phương (1/r²), ánh sáng Mặt Trời tại Sao Mộc chỉ còn ~3,7% và tại Sao Thổ chỉ còn ~1,1% so với Trái Đất. Pin mặt trời không thể hoạt động; RTG được đặt trên cần dài để bức xạ không gây nhiễu thiết bị khoa học.',
    whyBuiltEn: 'By the inverse-square law (1/r²), sunlight drops to ~3.7% at Jupiter and ~1.1% at Saturn. Solar panels are unviable; mounting RTGs on extended booms shielded scientific sensors from radiation.',
    discoveredVi: 'Cung cấp điện liên tục cho 12 thiết bị khoa học vượt qua vành đai tiểu hành tinh, Sao Mộc, Sao Thổ và quỹ đạo Sao Hải Vương cho tới gói dữ liệu kỹ thuật cuối cùng ngày 24/11/1995.',
    discoveredEn: 'Powered 12 scientific instruments past the asteroid belt, Jupiter, Saturn, and Neptune’s orbit until the final engineering telemetry was received on 1995-11-24.',
    sourceIds: ['SRC-PIO-01', 'SRC-PIO-03', 'SRC-PIO-04']
  },
  {
    id: HOTSPOTS_PIONEER_DIAGRAM[2].id,
    x: HOTSPOTS_PIONEER_DIAGRAM[2].x,
    y: HOTSPOTS_PIONEER_DIAGRAM[2].y,
    code: 'SCIENCE · HELIUM VECTOR MAGNETOMETER & 12 INSTRUMENTS',
    titleVi: 'Cần Từ Kế Helium Vector & Tổ Hợp 12 Thiết Bị Khoa Học',
    titleEn: 'Helium Vector Magnetometer Boom & 12-Instrument Science Suite',
    subsystemVi: 'Đo đạc Từ quyển, Bức xạ Vũ trụ, Plasma & Quang phân cực (IPP)',
    subsystemEn: 'Magnetosphere, Cosmic Ray, Plasma & Imaging Photopolarimeter Suite',
    materialsVi: 'Cần vươn bằng sợi thủy tinh không từ tính dài 6,5 m đưa cảm biến Helium Vector Magnetometer tách xa thân tàu; khoang lục giác chứa Imaging Photopolarimeter (IPP), Plasma Analyzer, Cosmic Ray Telescope, Geiger Tube và Meteoroid Detectors.',
    materialsEn: '6.5 m non-magnetic fiberglass boom isolating the Helium Vector Magnetometer; hexagonal bus housing the Imaging Photopolarimeter (IPP), Plasma Analyzer, Cosmic Ray Telescope, Geiger Tube, and Meteoroid Detectors.',
    whyBuiltVi: 'Từ trường riêng của dòng điện và kim loại trên thân tàu có thể làm sai lệch phép đo từ trường yếu ngoài không gian. Đặt từ kế trên cần dài 6,5 m giúp đo chính xác từ quyển Sao Mộc và Sao Thổ.',
    whyBuiltEn: 'Spacecraft electrical currents generate stray magnetic fields. Extending the magnetometer 6.5 m away on a non-magnetic boom ensured pure measurements of planetary magnetospheres.',
    discoveredVi: 'Lập bản đồ từ quyển khổng lồ và vành đai bức xạ dữ dội của Sao Mộc (03/12/1974), chụp vùng cực Sao Mộc, phát hiện từ quyển Sao Thổ, vành đai F và 2 mặt trăng mới (01/09/1979).',
    discoveredEn: 'Mapped Jupiter’s intense radiation belts and polar regions (1974-12-03), and discovered Saturn’s magnetic field, its narrow F-ring, and new moons during history’s first Saturn flyby (1979-09-01).',
    sourceIds: ['SRC-PIO-01', 'SRC-PIO-02', 'SRC-PIO-04']
  },
  {
    id: HOTSPOTS_PIONEER_DIAGRAM[3].id,
    x: HOTSPOTS_PIONEER_DIAGRAM[3].x,
    y: HOTSPOTS_PIONEER_DIAGRAM[3].y,
    code: 'ARTIFACT · PIONEER PLAQUE MOUNT',
    titleVi: 'Vị Trí Gắn Tấm Bảng Nhôm Mạ Vàng Pioneer Plaque',
    titleEn: 'Gold-Anodized Aluminum Pioneer Plaque Structural Mount',
    subsystemVi: 'Thông điệp Vật lý & Thiên văn Gửi Không gian Giữa các Vì sao',
    subsystemEn: 'Interstellar Astrophysical Message & Time Capsule',
    materialsVi: 'Tấm hợp kim nhôm 6061 mạ vàng kích thước 152 × 229 mm (6 × 9 inch), dày 1,27 mm, nặng ~120 gram, gắn vào khung giàn đỡ ăng-ten để được che chắn khỏi bụi vi thiên thạch.',
    materialsEn: '6061 gold-anodized aluminum plate measuring 152 × 229 mm (6 × 9 inches), 1.27 mm thick (~120 g), bolted to the antenna support struts for micrometeoroid shielding.',
    whyBuiltVi: 'Vì Pioneer 10 và Pioneer 11 đạt vận tốc thoát ly khỏi Hệ Mặt Trời, Carl Sagan và Frank Drake đã thiết kế tấm bảng dùng hằng số vật lý của nguyên tử Hydro và 14 ẩn tinh (pulsar) để ghi lại tọa độ Trái Đất và hình ảnh con người.',
    whyBuiltEn: 'Because Pioneer 10 and 11 achieved solar system escape velocity, Carl Sagan and Frank Drake etched a universal diagram using hydrogen hyperfine transitions and 14 pulsars to identify Earth and humanity.',
    discoveredVi: 'Trở thành một trong những hiện vật biểu tượng nhất của lịch sử thám hiểm không gian (Lưu ý: Pioneer 10 & 11 mang tấm bảng Pioneer Plaque, tuyệt đối không phải đĩa âm thanh Voyager Golden Record).',
    discoveredEn: 'Became an iconic artifact of space exploration history (Note: Pioneer 10 & 11 carry the visual Pioneer Plaque, distinct from the phonograph Voyager Golden Record carried by Voyagers 1 & 2).',
    sourceIds: ['SRC-PIO-05']
  }
];

const PLAQUE_ANATOMY_PARTS: AnatomyPartDetail[] = [
  {
    id: HOTSPOTS_PLAQUE[0].id,
    x: HOTSPOTS_PLAQUE[0].x,
    y: HOTSPOTS_PLAQUE[0].y,
    code: 'SYMBOL 01 · HYPERFINE HYDROGEN (21 CM / 1420 MHz)',
    titleVi: 'Chuyển Mức Siêu Mịn Của Nguyên Tử Hydro Trung Hòa',
    titleEn: 'Hyperfine Transition of Neutral Hydrogen Atom',
    subsystemVi: 'Thước đo Chiều dài (21,1 cm) & Thời gian (0,704 ns) Phổ quát',
    subsystemEn: 'Universal Cosmic Ruler for Length (21.1 cm) & Time (0.704 ns)',
    materialsVi: 'Hình khắc sơ đồ hai trạng thái spin (song song và đối song song) của electron và proton trong nguyên tử Hydro — nguyên tố phổ biến nhất vũ trụ — kèm ký hiệu nhị phân số 1.',
    materialsEn: 'Engraved diagram of parallel vs. antiparallel electron-proton spin states in neutral hydrogen—the most abundant element in the cosmos—with binary digit 1.',
    whyBuiltVi: 'Một nền văn minh ngoài Trái Đất sẽ không biết "mét" hay "giây" của con người là gì. Nhưng bất kỳ nhà vật lý thiên văn nào cũng biết bước sóng bức xạ vạch 21,1 cm (tần số 1420,4 MHz) của nguyên tử Hydro.',
    whyBuiltEn: 'An extraterrestrial scientist would not know human "meters" or "seconds", but any astrophysicist knows the universal 21.1 cm wavelength (1420.4 MHz frequency) of hydrogen spin-flip radiation.',
    discoveredVi: 'Đơn vị 21,1 cm này được dùng trực tiếp để nhân với số nhị phân 8 (1000₂) bên cạnh hình người phụ nữ, cho kết quả chiều cao trung bình: 8 × 21,1 cm ≈ 168,8 cm.',
    discoveredEn: 'This 21.1 cm unit multiplies the binary number 8 (1000₂) beside the woman’s figure, yielding her exact scale height: 8 × 21.1 cm ≈ 168.8 cm.',
    sourceIds: ['SRC-PIO-05']
  },
  {
    id: HOTSPOTS_PLAQUE[1].id,
    x: HOTSPOTS_PLAQUE[1].x,
    y: HOTSPOTS_PLAQUE[1].y,
    code: 'SYMBOL 02 · RADIAL 14-PULSAR GALACTIC MAP',
    titleVi: 'Bản Đồ 14 Ẩn Tinh (Pulsar) Định Vị Hệ Mặt Trời & Thời Điểm Phóng',
    titleEn: 'Radial Map of 14 Pulsars & Galactic Center Vector',
    subsystemVi: 'Hệ tọa độ Không gian 3D & Đồng hồ Vũ trụ',
    subsystemEn: '3D Galactic Triangulation & Cosmic Epoch Clock',
    materialsVi: '15 đường thẳng tỏa ra từ tâm (Mặt Trời): 14 đường ghi chu kỳ xung cực kỳ chính xác bằng mã nhị phân của 14 sao neutron quay nhanh (pulsar), đường thứ 15 kéo dài sang phải chỉ khoảng cách tới tâm Ngân Hà.',
    materialsEn: '15 radial lines originating from the Sun: 14 lines encode binary pulse periods of known neutron star pulsars; the 15th horizontal line marks the relative distance to the Galactic Center.',
    whyBuiltVi: 'Các sao pulsar giống như những ngọn hải đăng vũ trụ phát xung đều đặn nhưng chậm dần theo thời gian với tốc độ xác định. Đo chu kỳ thực tế so với con số khắc trên bảng sẽ tính ra chính xác cả vị trí Mặt Trời lẫn năm phóng tàu (thập niên 1970).',
    whyBuiltEn: 'Pulsars act as cosmic lighthouses whose spin rates slow down predictably over millions of years. Comparing current pulse periods with the binary values etched on the plaque reveals both the Sun’s 3D position and the 1970s launch epoch.',
    discoveredVi: 'Một thiết kế toán học thiên tài giúp định vị cả Không gian (Space) và Thời gian (Time) trên một mặt phẳng 2D.',
    discoveredEn: 'An ingenious mathematical encoding that triangulates both 3D Galactic Space and Cosmic Time on a flat 2D surface.',
    sourceIds: ['SRC-PIO-05']
  },
  {
    id: HOTSPOTS_PLAQUE[2].id,
    x: HOTSPOTS_PLAQUE[2].x,
    y: HOTSPOTS_PLAQUE[2].y,
    code: 'SYMBOL 03 · HUMAN FIGURES & SPACECRAFT SILHOUETTE',
    titleVi: 'Hình Ảnh Con Người Đặt Cạnh Đường Nét Thân Tàu Pioneer',
    titleEn: 'Human Figures Scaled Against Pioneer Spacecraft Silhouette',
    subsystemVi: 'Thông tin Sinh học & Tỷ lệ Kích thước Thực tế',
    subsystemEn: 'Biological Morphology & True Hardware Scale Reference',
    materialsVi: 'Bản vẽ đường nét người đàn ông giơ tay chào thiện chí và người phụ nữ (do Linda Salzman Sagan phác họa) đứng ngay trước hình chiếu đúng tỷ lệ của chảo ăng-ten tàu Pioneer.',
    materialsEn: 'Line drawings of a man raising a hand in goodwill and a woman (illustrated by Linda Salzman Sagan) standing in front of a true-to-scale silhouette of the Pioneer spacecraft.',
    whyBuiltVi: 'Ngay cả khi người tìm thấy không giải mã được phép tính nhị phân của nguyên tử Hydro, họ chỉ cần nhìn vào thân tàu Pioneer thật trước mắt và đối chiếu với hình vẽ thân tàu phía sau hai người để biết chính xác kích thước cơ thể con người.',
    whyBuiltEn: 'Even without decoding the binary hydrogen math, anyone finding the spacecraft can compare the physical Pioneer dish with its etched silhouette behind the figures to deduce human size.',
    discoveredVi: 'Bàn tay giơ lên vừa là cử chỉ chào hòa bình, vừa cho thấy cấu tạo 5 ngón tay với ngón cái đối diện của loài người.',
    discoveredEn: 'The raised hand serves both as a universal gesture of peace and an anatomical demonstration of human five-fingered opposable thumbs.',
    sourceIds: ['SRC-PIO-05']
  },
  {
    id: HOTSPOTS_PLAQUE[3].id,
    x: HOTSPOTS_PLAQUE[3].x,
    y: HOTSPOTS_PLAQUE[3].y,
    code: 'SYMBOL 04 · SOLAR SYSTEM & ESCAPE TRAJECTORY',
    titleVi: 'Sơ Đồ Hệ Mặt Trời & Quỹ Đạo Rời Hành Tinh Thứ Ba (Trái Đất)',
    titleEn: 'Solar System Diagram & Trajectory from the Third Planet',
    subsystemVi: 'Nguồn gốc Hành tinh & Hành trình Liên hành tinh',
    subsystemEn: 'Planetary Origin & Flyby Escape Trajectory',
    materialsVi: 'Sơ đồ Mặt Trời ở bên trái cùng 9 hành tinh theo thứ tự khoảng cách tương đối bằng số nhị phân, kèm đường mũi tên xuất phát từ hành tinh thứ 3 (Trái Đất) lướt qua hành tinh thứ 5 (Sao Mộc) có vẽ vành đai tượng trưng cho các hành tinh khí khổng lồ.',
    materialsEn: 'Diagram of the Sun and planets with binary relative distances, showing an arrowed trajectory departing the 3rd planet (Earth) and swinging past the 5th planet (Jupiter) outward.',
    whyBuiltVi: 'Chỉ rõ điểm xuất phát của con tàu là hành tinh thứ ba tính từ Mặt Trời và giải thích cách con tàu dùng lực hấp dẫn của hành tinh khổng lồ để bay thoát ra ngoài Hệ Mặt Trời.',
    whyBuiltEn: 'Pinpoints the third planet from the Sun as humanity’s homeworld and illustrates the gravity-assist flyby trajectory out of the Solar System.',
    discoveredVi: 'Lưu ý lịch sử: Sơ đồ trên tấm bảng được khắc chung cho cả Pioneer 10 và Pioneer 11; sau khi bay qua Sao Mộc (1974), Pioneer 11 được điều chỉnh quỹ đạo để tiếp tục bay qua Sao Thổ năm 1979.',
    discoveredEn: 'Historical note: The plaque engraving was shared by Pioneer 10 and 11; after its 1974 Jupiter flyby, Pioneer 11 retargeted to complete the first Saturn flyby in 1979.',
    sourceIds: ['SRC-PIO-01', 'SRC-PIO-05']
  }
];

const SURVEYOR_ANATOMY_PARTS: AnatomyPartDetail[] = [
  {
    id: 'sur-tv-camera',
    x: 55,
    y: 47,
    code: 'SUR-OPT-01',
    titleVi: 'Camera Truyền hình 600 dòng (TV Camera)',
    titleEn: '600-Line Slow-Scan TV Camera',
    subsystemVi: 'Gương xoay thẳng đứng & Hệ quang học thu hồi',
    subsystemEn: 'Elevating Mirror Turret & Apollo-Retrieved Optics',
    locationVi: 'Đặt trên trục đứng giữa thân tam giác để quét toàn cảnh 360° quanh miệng hố va chạm.',
    locationEn: 'Mounted upright on the central mast to sweep 360° panoramas across the surrounding crater.',
    materialsVi: 'Thân ống sơn trắng phản nhiệt, gương xoay góc cao/góc phương vị, ống vidicon quét chậm truyền ảnh về Trái Đất.',
    materialsEn: 'White thermal-coated housing, azimuth/elevation mirror turret, and slow-scan vidicon tube transmitting frames to Earth.',
    whyBuiltVi: 'Phi hành gia Apollo cần xem tận mắt địa hình gồ ghề, đá tảng và rãnh đào đất trên Mặt Trăng trước khi dám cho tàu có người lái đáp xuống.',
    whyBuiltEn: 'NASA needed direct surface imagery of boulders, slopes, and soil behavior before committing crewed Apollo landings.',
    discoveredVi: 'Gửi về 6.326 ảnh truyền hình từ ngày 20/04 đến 03/05/1967; ngày 20/11/1969, phi hành gia Apollo 12 Pete Conrad & Alan Bean tháo mang về Trái Đất nghiên cứu tác động suốt 2,5 năm.',
    discoveredEn: 'Returned 6,326 television pictures in 1967; on 1969-11-20, Apollo 12 astronauts Pete Conrad and Alan Bean retrieved it for Earth laboratory inspection after 31 months on the Moon.',
    sourceIds: ['SRC-SUR-01', 'SRC-SUR-03', 'SRC-SUR-04']
  },
  {
    id: 'sur-sampler',
    x: 64,
    y: 56,
    code: 'SUR-ARM-02',
    titleVi: 'Cánh tay Kéo giãn & Gầu đào Đất (SMSS)',
    titleEn: 'Soil Mechanics Surface Sampler (Pantograph Arm)',
    subsystemVi: 'Thí nghiệm Cơ học Đất Mặt Trăng (Tầm với ~1,5 m)',
    subsystemEn: 'Lunar Soil Mechanics Tester (~1.5 m Reach)',
    locationVi: 'Vươn ngang theo cơ cấu kéo zíc-zắc pantograph về phía bên phải khung tàu trên ảnh AS12-48-7121.',
    locationEn: 'Extends rightwards on a motorized pantograph scissor linkage visible along the crater slope.',
    materialsVi: 'Khung thanh giằng nhôm cắt kéo dẫn động điện, đầu gầu thép nhỏ dài ~12 cm có lưỡi gạt và cảm biến dòng điện động cơ.',
    materialsEn: 'Motor-driven aluminum pantograph scissor arm tipped with a small scoop, blade, and motor-current resistance telemetry.',
    whyBuiltVi: 'Năm 1967 có giả thuyết lo ngại lớp bụi Mặt Trăng xốp sâu sẽ nuốt chửng tàu Apollo. Gầu đào phải trực tiếp ấn, nện và xẻ đất để đo sức chịu tải.',
    whyBuiltEn: 'Scientists feared astronauts might sink into deep lunar dust; NASA sent a physical scoop to press, impact, and trench real regolith.',
    discoveredVi: 'Vươn xa ~1,5 m đào 4 rãnh sâu tới ~18 cm, thực hiện phép thử chịu tải (bearing tests) và đập va chạm (impact tests), khẳng định đất regolith đủ cứng vững cho chân tàu Apollo.',
    discoveredEn: 'Reached ~1.5 m to dig four trenches ~18 cm deep plus bearing and impact tests, proving lunar regolith easily supports Apollo landers.',
    sourceIds: ['SRC-SUR-01', 'SRC-SUR-02']
  },
  {
    id: 'sur-solar-antenna',
    x: 50,
    y: 31,
    code: 'SUR-PWR-03',
    titleVi: 'Tấm Pin Mặt Trời & Ăng-ten Phẳng',
    titleEn: 'Solar Array Panel & High-Gain Planar Antenna',
    subsystemVi: 'Phát điện Quang năng (~85 W) & Kênh vô tuyến',
    subsystemEn: 'Photovoltaic Power (~85 W) & S-Band High-Gain Telemetry',
    materialsVi: 'Pin mặt trời silicon gắn trên đỉnh cột trung tâm, ăng-ten phẳng hướng Trái Đất và ắc-quy Bạc-Kẽm (Silver-Zinc) không có sưởi hạt nhân.',
    materialsEn: 'Silicon photovoltaic array and flat planar high-gain antenna above the central mast, paired with rechargeable silver-zinc batteries.',
    whyBuiltVi: 'Surveyor 3 được thiết kế hoạt động ban ngày Mặt Trăng với khối lượng nhẹ tối đa (khối lượng phóng 997,9 kg) dưới thời tên lửa Atlas-Centaur.',
    whyBuiltEn: 'Engineered strictly for daytime lunar operation within Atlas-Centaur launch mass limits (997.9 kg total launch mass).',
    discoveredVi: 'Hoạt động bền bỉ suốt ban ngày đầu tiên tới 04/05/1967, rồi rơi vào im lặng vĩnh viễn khi đêm Mặt Trăng 14 ngày lạnh xuống khoảng -150°C làm cạn kiệt nguồn ắc-quy.',
    discoveredEn: 'Operated smoothly until last contact on 1967-05-04 when the freezing 14-day lunar night (~-150°C) drained its battery.',
    sourceIds: ['SRC-SUR-01', 'SRC-SUR-02']
  },
  {
    id: 'sur-radar-vernier',
    x: 49,
    y: 61,
    code: 'SUR-GNC-04',
    titleVi: 'Radar Hạ cánh & Động cơ Tinh chỉnh Vernier',
    titleEn: 'Descent Doppler Radar & Vernier Thrusters',
    subsystemVi: 'Dẫn đường Hạ cánh Mềm (Sự cố Nảy 2 lần)',
    subsystemEn: 'Soft-Landing Propulsion (Double-Bounce Anomaly)',
    materialsVi: 'Radar vận tốc & đo độ cao Doppler, 3 động cơ tên lửa lỏng điều chỉnh lực đẩy quanh khung tam giác nhôm.',
    materialsEn: 'RADVS Doppler altitude/velocity radar paired with three throttleable liquid vernier rocket engines.',
    whyBuiltVi: 'Tàu phải triệt tiêu vận tốc rơi từ hơn 2,6 km/s xuống gần 0 m/s trước khi chạm bề mặt đá xốp.',
    whyBuiltEn: 'Required to brake from cosmic velocity to a gentle vertical touchdown on untested cratered terrain.',
    discoveredVi: 'Phản xạ giả từ rìa miệng hố khiến radar mất khóa khi cách đất ~4,3 m, làm động cơ Vernier không tự tắt — tàu nảy 2 lần (~10 m rồi ~3 m) trước khi mặt đất gửi lệnh tắt động cơ ở ~3,4 m.',
    discoveredEn: 'Specular crater glare caused premature radar lock loss; vernier thrusters stayed firing through touchdown, causing two bounces (~10 m, then ~3 m) before manual cutoff at ~3.4 m.',
    sourceIds: ['SRC-SUR-01', 'SRC-SUR-02']
  },
  {
    id: 'sur-footpads',
    x: 44,
    y: 72,
    code: 'SUR-STR-05',
    titleVi: '3 Chân Tổ ong Nhôm Giảm chấn',
    titleEn: 'Crushable Aluminum Honeycomb Footpads',
    subsystemVi: 'Khung 3 chân & Tiếp đất trên Sườn dốc 12°',
    subsystemEn: 'Tripod Landing Gear & 12° Crater Slope Stability',
    materialsVi: 'Ba chân gập ống hợp kim nhẹ kèm khối nhôm tổ ong biến dạng dẻo và bộ giảm chấn thủy lực chịu được cú nảy liên hoàn.',
    materialsEn: 'Articulated lightweight aluminum tripod legs equipped with crushable aluminum honeycomb pads and hydraulic shock absorbers.',
    whyBuiltVi: 'Phân tán xung lực va chạm khi hạ cánh trên độ dốc nghiêng không bằng phẳng mà không làm đổ nghiêng khung tàu.',
    whyBuiltEn: 'Absorbed kinetic shock across three rapid impacts without tipping over on an inclined inner crater wall.',
    discoveredVi: 'Chịu trọn 3 lần tiếp đất liên tiếp trên sườn dốc ~12° ở Oceanus Procellarum; dấu lún chân tàu năm 1967 vẫn còn in rõ khi Apollo 12 chụp ảnh vào năm 1969.',
    discoveredEn: 'Survived three successive touchdowns on a ~12° crater slope in Oceanus Procellarum, leaving crisp regolith imprints later photographed by Apollo 12 in November 1969.',
    sourceIds: ['SRC-SUR-01', 'SRC-SUR-03']
  }
];

/* ============================================================================
 * MODULE 3A DATA: MISSION TIMELINE ORDERING CHALLENGE
 * ============================================================================ */
interface TimelineChallengeItem {
  id: string;
  orderIndex: number;
  isoDate: string;
  displayDateVi: string;
  displayDateEn: string;
  titleVi: string;
  titleEn: string;
  detailVi: string;
  detailEn: string;
  sourceId: string;
}

const OPPORTUNITY_TIMELINE_CHALLENGE: TimelineChallengeItem[] = [
  {
    id: 'opp-launch',
    orderIndex: 1,
    isoDate: '2003-07-07',
    displayDateVi: '07/07/2003',
    displayDateEn: '2003-07-07',
    titleVi: 'Phóng tàu Opportunity (MER-B) từ Mũi Canaveral',
    titleEn: 'Launch of Opportunity (MER-B) on Delta II Rocket',
    detailVi: 'Rời Trái Đất bắt đầu hành trình gần 7 tháng tới Sao Hỏa.',
    detailEn: 'Departed Cape Canaveral for a nearly 7-month interplanetary cruise to Mars.',
    sourceId: 'SRC-OPP-01'
  },
  {
    id: 'opp-landing',
    orderIndex: 2,
    isoDate: '2004-01-25',
    displayDateVi: '24/01/2004 PST (25/01/2004 UTC)',
    displayDateEn: '2004-01-24 PST (2004-01-25 UTC)',
    titleVi: 'Hạ cánh bằng túi khí tại vùng đồng bằng Meridiani Planum',
    titleEn: 'Airbag Touchdown at Meridiani Planum (Eagle Crater)',
    detailVi: 'Lăn bánh khỏi bệ đổ bộ ngày 31/01/2004 (PST) để bắt đầu khảo sát địa chất.',
    detailEn: 'Rolled off the lander platform on 2004-01-31 (PST) to begin surface geology.',
    sourceId: 'SRC-OPP-01 · SRC-OPP-02'
  },
  {
    id: 'opp-90sols',
    orderIndex: 3,
    isoDate: '2004-04-26',
    displayDateVi: 'Tháng 04/2004 (Mốc 90 Sol)',
    displayDateEn: 'April 2004 (90-Sol Primary Milestone)',
    titleVi: 'Hoàn thành nhiệm vụ thiết kế ban đầu 90 sol và phát hiện hạt Hematite',
    titleEn: 'Completed 90-Sol Planned Primary Mission & Hematite Discovery',
    detailVi: 'Tìm thấy các hạt vi cầu giàu hematite ("blueberries") chứng minh môi trường nước lỏng cổ đại.',
    detailEn: 'Confirmed hematite concretions ("blueberries") proving ancient liquid water at Meridiani.',
    sourceId: 'SRC-OPP-01'
  },
  {
    id: 'opp-endeavour',
    orderIndex: 4,
    isoDate: '2011-08-09',
    displayDateVi: 'Tháng 08/2011',
    displayDateEn: 'August 2011',
    titleVi: 'Chạm vành miệng hố va chạm khổng lồ Endeavour (rộng 22 km)',
    titleEn: 'Reached Rim of 22-km-wide Endeavour Crater',
    detailVi: 'Khảo sát các mạch thạch cao (gypsum) và khoáng sét hình thành trong nước ít axit.',
    detailEn: 'Investigated gypsum veins and clay minerals formed in neutral-pH ancient water.',
    sourceId: 'SRC-OPP-03'
  },
  {
    id: 'opp-last-contact',
    orderIndex: 5,
    isoDate: '2018-06-10',
    displayDateVi: '10/06/2018 (Sol 5.111)',
    displayDateEn: '2018-06-10 (Sol 5111)',
    titleVi: 'Nhận tín hiệu cuối cùng sau tổng quãng đường 45,16 km',
    titleEn: 'Final Communication Received After Driving 45.16 km',
    detailVi: 'Cơn bão bụi toàn hành tinh tại Perseverance Valley che khuất ánh sáng Mặt Trời đến pin.',
    detailEn: 'A planet-encircling dust storm at Perseverance Valley cut off solar power.',
    sourceId: 'SRC-OPP-01 · SRC-OPP-04'
  },
  {
    id: 'opp-mission-end',
    orderIndex: 6,
    isoDate: '2019-02-13',
    displayDateVi: '13/02/2019',
    displayDateEn: '2019-02-13',
    titleVi: 'NASA chính thức tuyên bố kết thúc sứ mệnh Opportunity',
    titleEn: 'NASA Formally Declares Opportunity Mission Complete',
    detailVi: 'Khép lại sứ mệnh sau hơn 8 tháng gửi hơn 1.000 lệnh khôi phục liên lạc không có phản hồi.',
    detailEn: 'Concluded the mission after 8+ months and over 1,000 recovery commands went unanswered.',
    sourceId: 'SRC-OPP-04'
  }
];

const PIONEER_TIMELINE_CHALLENGE: TimelineChallengeItem[] = [
  {
    id: 'pio-launch',
    orderIndex: 1,
    isoDate: '1973-04-06',
    displayDateVi: '06/04/1973 (UTC)',
    displayDateEn: '1973-04-06 (UTC)',
    titleVi: 'Phóng tàu thăm dò Pioneer 11 rời Trái Đất',
    titleEn: 'Launch of Pioneer 11 Deep-Space Probe (UTC)',
    detailVi: 'Bắt đầu sứ mệnh xuyên qua vành đai tiểu hành tinh hướng tới các hành tinh khí khổng lồ.',
    detailEn: 'Launched aboard an Atlas-Centaur rocket toward the outer giant planets.',
    sourceId: 'SRC-PIO-01'
  },
  {
    id: 'pio-jupiter',
    orderIndex: 2,
    isoDate: '1974-12-03',
    displayDateVi: '03/12/1974',
    displayDateEn: '1974-12-03',
    titleVi: 'Bay ngang qua Sao Mộc (Jupiter Flyby) & Chụp ảnh vùng cực',
    titleEn: 'Jupiter Closest Approach & Polar Region Imaging',
    detailVi: 'Đo từ quyển dữ dội của Sao Mộc và mượn lực hấp dẫn (gravity assist) hướng tới Sao Thổ.',
    detailEn: 'Sampled Jupiter’s radiation belts, imaged its poles, and executed a gravity assist toward Saturn.',
    sourceId: 'SRC-PIO-01'
  },
  {
    id: 'pio-saturn',
    orderIndex: 3,
    isoDate: '1979-09-01',
    displayDateVi: '01/09/1979',
    displayDateEn: '1979-09-01',
    titleVi: 'Tàu vũ trụ đầu tiên trong lịch sử bay qua Sao Thổ (Saturn Flyby)',
    titleEn: 'First Spacecraft in History to Fly By Saturn',
    detailVi: 'Phát hiện vành đai F, các mặt trăng mới và chụp ảnh Sao Thổ cùng Titan từ cự ly ~2,846 triệu km.',
    detailEn: 'Discovered Saturn’s F ring and new moons, and imaged Saturn & Titan from ~2,846,000 km.',
    sourceId: 'SRC-PIO-01 · SRC-PIO-02'
  },
  {
    id: 'pio-neptune',
    orderIndex: 4,
    isoDate: '1990-02-23',
    displayDateVi: '23/02/1990',
    displayDateEn: '1990-02-23',
    titleVi: 'Vượt qua quỹ đạo của Sao Hải Vương (Neptune Orbit Crossing)',
    titleEn: 'Crossed Beyond the Orbit of Neptune',
    detailVi: 'Tiếp tục hành trình hướng ra không gian sâu với tấm bảng nhôm mạ vàng Pioneer Plaque.',
    detailEn: 'Continued outward on its solar-system escape trajectory carrying the Pioneer Plaque.',
    sourceId: 'SRC-PIO-01'
  },
  {
    id: 'pio-last-contact',
    orderIndex: 5,
    isoDate: '1995-09-30',
    displayDateVi: '30/09/1995',
    displayDateEn: '1995-09-30',
    titleVi: 'NASA Ames kết thúc liên lạc điều hành thường xuyên (Last Contact)',
    titleEn: 'Final Routine Operational Contact by NASA Ames',
    detailVi: 'Nguồn điện từ 4 máy phát RTG giảm xuống dưới mức duy trì thiết bị và điều hướng ăng-ten.',
    detailEn: 'RTG power decayed below the threshold needed to operate instruments and point the antenna.',
    sourceId: 'SRC-PIO-01'
  },
  {
    id: 'pio-last-data',
    orderIndex: 6,
    isoDate: '1995-11-24',
    displayDateVi: '24/11/1995',
    displayDateEn: '1995-11-24',
    titleVi: 'Thu nhận những phút dữ liệu kỹ thuật cuối cùng (Last Engineering Data)',
    titleEn: 'Final Minutes of Engineering Telemetry Received',
    detailVi: 'Mốc độc lập sau ngày 30/09/1995 trước khi Pioneer 11 hoàn toàn im lặng giữa không gian sâu.',
    detailEn: 'Distinct milestone following 1995-09-30 before Pioneer 11 fell permanently silent.',
    sourceId: 'SRC-PIO-01 · SRC-PIO-03'
  }
];

const SURVEYOR_TIMELINE_CHALLENGE: TimelineChallengeItem[] = [
  {
    id: 'sur-launch',
    orderIndex: 1,
    isoDate: '1967-04-17',
    displayDateVi: '17/04/1967 (UTC)',
    displayDateEn: '1967-04-17 (UTC)',
    titleVi: 'Phóng tàu Surveyor 3 (997,9 kg) bằng tên lửa Atlas-Centaur',
    titleEn: 'Launch of Surveyor 3 (997.9 kg) atop Atlas-Centaur',
    detailVi: 'Mang camera truyền hình 600 dòng và cánh tay đào đất lên thẳng Mặt Trăng tiền trạm cho Apollo.',
    detailEn: 'Carried a 600-line TV camera and soil mechanics sampler toward the Moon ahead of Apollo.',
    sourceId: 'SRC-SUR-01'
  },
  {
    id: 'sur-landing',
    orderIndex: 2,
    isoDate: '1967-04-20',
    displayDateVi: '20/04/1967 (00:04 UT)',
    displayDateEn: '1967-04-20 (00:04 UT)',
    titleVi: 'Hạ cánh tại Oceanus Procellarum sau 2 cú nảy (10 m & 3 m)',
    titleEn: 'Soft Landing at Oceanus Procellarum After Double Bounce',
    detailVi: 'Động cơ Vernier chưa kịp tắt ở 4,3 m khiến tàu nảy hai lần trước khi ổn định trên sườn dốc 12°.',
    detailEn: 'Radar echo delay prevented engine cutoff until manual command, leaving Surveyor 3 steady on a 12° slope.',
    sourceId: 'SRC-SUR-01 · SRC-SUR-02'
  },
  {
    id: 'sur-trench',
    orderIndex: 3,
    isoDate: '1967-04-22',
    displayDateVi: '20/04 – 03/05/1967',
    displayDateEn: '1967-04-20 – 05-03',
    titleVi: 'Gửi 6.326 ảnh TV & đào 4 rãnh sâu ~18 cm thử độ cứng đất',
    titleEn: 'Transmitted 6,326 TV Frames & Dug Four ~18 cm Trenches',
    detailVi: 'Cánh tay vươn ~1,5 m chứng minh đất Mặt Trăng chịu tải vững chắc cho tàu đổ bộ Apollo.',
    detailEn: 'Surface sampler extended ~1.5 m, proving lunar regolith bearing strength for Apollo landers.',
    sourceId: 'SRC-SUR-01 · SRC-SUR-02'
  },
  {
    id: 'sur-last',
    orderIndex: 4,
    isoDate: '1967-05-04',
    displayDateVi: '04/05/1967 (UTC)',
    displayDateEn: '1967-05-04 (UTC)',
    titleVi: 'Tín hiệu liên lạc cuối cùng khi đêm Mặt Trăng lạnh giá ập xuống',
    titleEn: 'Final Radio Contact as Lunar Night Depleted Battery',
    detailVi: 'Nhiệt độ sụt xuống khoảng -150°C suốt 14 ngày đêm làm cạn nguồn điện ắc-quy Bạc-Kẽm.',
    detailEn: 'Severe ~-150°C cooling during the 14-day lunar night ended radio transmissions.',
    sourceId: 'SRC-SUR-01'
  },
  {
    id: 'sur-apollo12-land',
    orderIndex: 5,
    isoDate: '1969-11-19',
    displayDateVi: '19/11/1969',
    displayDateEn: '1969-11-19',
    titleVi: 'Apollo 12 Intrepid hạ cánh chính xác cách Surveyor 3 chỉ ~180 m',
    titleEn: 'Apollo 12 Lunar Module Pinpoint Landing (~180 m Away)',
    detailVi: 'Phi hành đoàn Apollo 12 đáp ngay trên vành miệng hố chứa con tàu im lặng suốt 2,5 năm.',
    detailEn: 'Proved precision lunar landing directly beside the silent crater site after 2.5 years.',
    sourceId: 'SRC-SUR-03'
  },
  {
    id: 'sur-retrieve',
    orderIndex: 6,
    isoDate: '1969-11-20',
    displayDateVi: '20/11/1969',
    displayDateEn: '1969-11-20',
    titleVi: 'Conrad & Bean tới thăm, thu hồi Camera TV & mẫu bộ phận về Trái Đất',
    titleEn: 'Conrad & Bean Inspect Surveyor 3 & Retrieve TV Camera',
    detailVi: 'Tạo nên cột mốc khảo cổ học vũ trụ duy nhất nơi con người mang bộ phận tàu cũ về phòng thí nghiệm.',
    detailEn: 'Enabled rare space-archaeology analysis of lunar exposure on retrieved spacecraft hardware.',
    sourceId: 'SRC-SUR-03 · SRC-SUR-04'
  }
];

/* ============================================================================
 * STEP 4 CHALLENGE QUESTIONS (BOUND TO TRACKS 01-04)
 * ============================================================================ */
interface StemQuizItem {
  id: number;
  tagVi: string;
  tagEn: string;
  questionVi: string;
  questionEn: string;
  optionsVi: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationVi: string;
  explanationEn: string;
  sourceCite: string;
}

const STEM_QUIZ_ITEMS: StemQuizItem[] = [
  {
    id: 1,
    tagVi: 'PHÂN BIỆT HIỆN VẬT LỊCH SỬ · PIONEER 11',
    tagEn: 'HISTORICAL ARTIFACT DISTINCTION · PIONEER 11',
    questionVi: 'Tàu thăm dò Pioneer 11 (phóng ngày 06/04/1973, tàu đầu tiên bay qua Sao Thổ ngày 01/09/1979) mang theo thông điệp nào của nhân loại?',
    questionEn: 'Which message from humanity is carried aboard Pioneer 11 (launched 1973-04-06, first spacecraft to fly by Saturn on 1979-09-01)?',
    optionsVi: [
      'Đĩa đồng mạ vàng Voyager Golden Record chứa âm thanh và 115 bức ảnh Trái Đất',
      'Tấm bảng nhôm mạ vàng Pioneer Plaque khắc hình hai con người, nguyên tử Hydro và bản đồ 14 ẩn tinh (pulsar)',
      'Một ổ cứng kỹ thuật số chứa toàn bộ bách khoa toàn thư Wikipedia'
    ],
    optionsEn: [
      'The Voyager Golden Record phonograph disc containing Earth sounds and 115 images',
      'The gold-anodized aluminum Pioneer Plaque engraved with human figures, a hydrogen atom, and a 14-pulsar map',
      'A solid-state digital memory bank storing an encyclopedia of Earth'
    ],
    correctIndex: 1,
    explanationVi: 'Chính xác! Pioneer 10 và Pioneer 11 mang tấm bảng khắc hình trực quan Pioneer Plaque (15 × 23 cm) do Carl Sagan và Frank Drake thiết kế. Tuyệt đối không nhầm Pioneer 11 với tàu Voyager 1 & 2 (vốn mang đĩa âm thanh Voyager Golden Record phóng năm 1977).',
    explanationEn: 'Correct! Pioneer 10 and Pioneer 11 carry the gold-anodized aluminum Pioneer Plaque (15 × 23 cm) designed by Carl Sagan and Frank Drake. Never confuse Pioneer 11 with the Voyager spacecraft or the Voyager Golden Record (launched in 1977).',
    sourceCite: 'SRC-PIO-01 · SRC-PIO-05 (NASA Science)'
  },
  {
    id: 2,
    tagVi: 'DỮ KIỆN CHÍNH XÁC · OPPORTUNITY (MER-B)',
    tagEn: 'VERIFIED METRICS · OPPORTUNITY (MER-B)',
    questionVi: 'Đâu là bộ thông số chính xác được NASA công bố cho sứ mệnh của rover Opportunity trên Sao Hỏa?',
    questionEn: 'Which set of mission parameters is officially verified by NASA for the Opportunity Mars Exploration Rover?',
    optionsVi: [
      'Thiết kế ban đầu: 90 sol · Tổng quãng đường: 45,16 km · Tín hiệu cuối: 10/06/2018 · Tuyên bố kết thúc: 13/02/2019',
      'Thiết kế ban đầu: 365 sol · Tổng quãng đường: 100 km · Tín hiệu cuối: 13/02/2019 · Chạy bằng lò hạt nhân RTG',
      'Thiết kế ban đầu: 7 ngày · Tổng quãng đường: 45,16 km · Đã phát hiện hóa thạch vi khuẩn sống trên Sao Hỏa'
    ],
    optionsEn: [
      'Planned lifetime: 90 sols · Final odometry: 45.16 km · Last communication: 2018-06-10 · Mission declared complete: 2019-02-13',
      'Planned lifetime: 365 sols · Final odometry: 100 km · Last communication: 2019-02-13 · Powered by RTG nuclear generator',
      'Planned lifetime: 7 days · Final odometry: 45.16 km · Discovered living microbial fossils on Mars'
    ],
    correctIndex: 0,
    explanationVi: 'Chính xác! Opportunity được thiết kế cho 90 sol nhưng hoạt động tới 5.111 sol và đi được 45,16 km. Tàu gửi tín hiệu cuối ngày 10/06/2018 trong trận bão bụi toàn cầu và NASA tuyên bố kết thúc sứ mệnh ngày 13/02/2019. Rover tìm thấy bằng chứng địa chất về nước lỏng cổ đại (hematite, thạch cao), không phải phát hiện sự sống.',
    explanationEn: 'Correct! Opportunity had a planned 90-sol primary mission, drove 45.16 km, sent its last signal on 2018-06-10 during a global dust storm, and was declared complete on 2019-02-13. It found geological evidence of ancient liquid water, not life.',
    sourceCite: 'SRC-OPP-01 · SRC-OPP-04 (NASA / JPL)'
  },
  {
    id: 3,
    tagVi: 'KHẢO CỔ HỌC KHÔNG GIAN · SURVEYOR 3 & APOLLO 12',
    tagEn: 'SPACE ARCHAEOLOGY · SURVEYOR 3 & APOLLO 12',
    questionVi: 'Điều đặc biệt lịch sử nào đã diễn ra với tàu đổ bộ Mặt Trăng Surveyor 3 (hạ cánh ngày 20/04/1967 UTC tại Oceanus Procellarum)?',
    questionEn: 'What unique historical event occurred with the Surveyor 3 lunar lander (which landed on 1967-04-20 UTC at Oceanus Procellarum)?',
    optionsVi: [
      'Nó tự phóng trở lại Trái Đất mang theo 5 kg đá Mặt Trăng',
      'Tháng 11/1969, hai phi hành gia Apollo 12 (Pete Conrad và Alan Bean) đã đi bộ đến thăm Surveyor 3 và tháo camera truyền hình của nó mang về Trái Đất nghiên cứu',
      'Nó là tàu tự hành có bánh xe đầu tiên chạy quanh Mặt Trăng suốt 10 năm'
    ],
    optionsEn: [
      'It launched itself back to Earth carrying 5 kg of lunar soil',
      'In November 1969, Apollo 12 astronauts Pete Conrad and Alan Bean walked to Surveyor 3 and returned its TV camera and parts to Earth for study',
      'It was a wheeled rover that drove across the Moon for 10 years'
    ],
    correctIndex: 1,
    explanationVi: 'Chính xác! Surveyor 3 hạ cánh ngày 20/04/1967 (UTC), truyền về 6.326 ảnh TV và dùng cánh tay đào rãnh sâu ~18 cm để chứng minh đất Mặt Trăng chịu được tải trọng tàu Apollo. Tháng 11/1969, phi hành đoàn Apollo 12 hạ cánh ngay gần đó và thu hồi camera TV của Surveyor 3 về Trái Đất để phân tích tác động của 2,5 năm phơi nhiễm môi trường Mặt Trăng.',
    explanationEn: 'Correct! Surveyor 3 landed on 1967-04-20 (UTC), transmitted 6,326 TV photos, and dug ~18 cm trenches proving the lunar regolith could support Apollo landers. In November 1969, Apollo 12 astronauts visited Surveyor 3 and returned its TV camera to Earth.',
    sourceCite: 'SRC-SUR-01 · SRC-SUR-03 (NASA Science)'
  },
  {
    id: 4,
    tagVi: 'CỘT MỐC SAO HỎA · VIKING 1 & SOJOURNER',
    tagEn: 'MARS MILESTONES · VIKING 1 & SOJOURNER',
    questionVi: 'Nhận định nào sau đây diễn đạt ĐÚNG và CHÍNH XÁC NHẤT về tàu đổ bộ Viking 1 (1976) và rover Sojourner / Mars Pathfinder (1997)?',
    questionEn: 'Which statement accurately describes both Viking 1 (1976) and Sojourner / Mars Pathfinder (1997)?',
    optionsVi: [
      'Viking 1 Lander hạ cánh ngày 20/07/1976 là tàu đầu tiên của NASA hạ cánh thành công và gửi ảnh từ bề mặt Sao Hỏa; còn Sojourner là rover 6 bánh thuộc sứ mệnh Mars Pathfinder hoạt động 83 sol (so với kế hoạch 7 ngày)',
      'Viking 1 là nỗ lực chạm bề mặt Sao Hỏa đầu tiên của mọi quốc gia trong lịch sử; còn Mars Pathfinder là tên của chiếc xe tự hành 6 bánh',
      'Cả Viking 1 Lander và Sojourner đều tìm thấy vi sinh vật sống trong đất Sao Hỏa'
    ],
    optionsEn: [
      'Viking 1 Lander (landed 1976-07-20) was NASA’s first truly successful Mars surface landing and transmitted the first surface photos; Sojourner was the 6-wheel rover deployed by Mars Pathfinder that operated for 83 sols against a planned 7-day rover mission',
      'Viking 1 was the first Mars landing attempt by any nation in history, and Mars Pathfinder was the name of the 6-wheeled rover itself',
      'Both Viking 1 Lander and Sojourner discovered living microbes in Martian soil'
    ],
    correctIndex: 0,
    explanationVi: 'Chính xác! Cần diễn đạt chuẩn xác: Viking 1 Lander (20/07/1976) là tàu đầu tiên của NASA hạ cánh thành công và hoạt động trọn vẹn trên bề mặt Sao Hỏa (Liên Xô từng có các tàu Mars 2 & 3 thử nghiệm trước đó nhưng mất liên lạc). Đồng thời, Mars Pathfinder là tên nhiệm vụ và trạm đổ bộ, còn Sojourner là chiếc micro-rover 6 bánh đi kèm đã hoạt động 83 sol so với kế hoạch 7 ngày.',
    explanationEn: 'Correct! Viking 1 (1976-07-20) must be phrased carefully as NASA’s first truly successful Mars landing (not the first attempt by any nation). And Mars Pathfinder was the mission/lander station, while Sojourner was the 6-wheel rover that explored for 83 sols vs. its 7-day planned mission.',
    sourceCite: 'SRC-VIK-01 · SRC-SOJ-01 · SRC-SOJ-03'
  },
  {
    id: 5,
    tagVi: 'VẬT LÝ NĂNG LƯỢNG & QUANG HỌC · APOLLO LRRR vs RTG',
    tagEn: 'POWER & OPTICS PHYSICS · APOLLO LRRR vs RTG',
    questionVi: 'Vì sao mảng gương phản xạ laser Apollo LRRR trên Mặt Trăng vẫn hoạt động sau hơn 55 năm mà không cần pin, trong khi Pioneer 11 phải dùng 4 máy phát nhiệt điện hạt nhân SNAP-19 RTG?',
    questionEn: 'Why has the Apollo Lunar Laser Ranging Retroreflector (LRRR) operated for 55+ years with 0 Watts of power, whereas Pioneer 11 required four SNAP-19 RTGs?',
    optionsVi: [
      'Apollo LRRR gồm các lăng kính góc khối thạch anh thụ động phản xạ tia laser từ Trái Đất 180° ngược lại nguồn phát (0 Watt); còn Pioneer 11 bay tới Sao Thổ (~9,58 AU, nơi ánh sáng Mặt Trời giảm còn ~1,1% theo định luật 1/r²) và cần điện phát sóng vô tuyến',
      'Apollo LRRR có các tấm pin mặt trời ẩn bên dưới lớp bụi Mặt Trăng để nạp điện cho gương',
      'Pioneer 11 dùng nhiên liệu hạt nhân để đốt động cơ phản lực bay liên tục suốt 22 năm'
    ],
    optionsEn: [
      'Apollo LRRR uses passive fused-silica corner-cube prisms that reflect Earth laser pulses 180° back without electricity (0 W), whereas Pioneer 11 needed continuous electrical power for instruments and radio transmitters at Saturn (~9.58 AU, where solar flux drops to ~1.1% by 1/r²)',
      'Apollo LRRR has hidden solar cells underneath the lunar dust that power its mirrors',
      'Pioneer 11 burned Plutonium-238 inside its rocket thrusters for propulsion'
    ],
    correctIndex: 0,
    explanationVi: 'Chính xác! Mảng gương LRRR (Apollo 11, 14, 15) hoàn toàn là thiết bị quang học thụ động (0 Watt), giúp đo tốc độ Mặt Trăng rời xa Trái Đất ~3,8 cm/năm. Ngược lại, Pioneer 11 là tàu thăm dò chủ động cần điện nuôi 12 thiết bị và phát sóng vô tuyến từ cự ly hàng tỷ km nơi ánh sáng Mặt Trời suy giảm theo định luật 1/r².',
    explanationEn: 'Correct! Apollo LRRR arrays are 100% passive corner-cube optical prisms (0 Watts), measuring the Moon’s ~3.8 cm/year recession. Pioneer 11 needed continuous electricity for 12 active instruments and radio uplinks at Saturn (~9.58 AU), where sunlight is only ~1.1% of Earth levels.',
    sourceCite: 'SRC-LRR-01 · SRC-PIO-03'
  },
  {
    id: 6,
    tagVi: 'KỸ THUẬT VẬT LIỆU · BÁNH XE NHÔM & ROCKER-BOGIE',
    tagEn: 'MATERIALS ENGINEERING · ALUMINUM WHEELS & ROCKER-BOGIE',
    questionVi: 'Tại sao NASA dùng 6 bánh xe nhôm nguyên khối kết hợp hệ treo Titan Rocker-Bogie cho Opportunity thay vì lốp cao su bơm hơi như xe trên Trái Đất?',
    questionEn: 'Why did NASA equip Opportunity with six solid machined aluminum wheels and a titanium Rocker-Bogie suspension instead of pneumatic rubber tires?',
    optionsVi: [
      'Khí quyển Sao Hỏa áp suất chỉ ~1% Trái Đất khiến lốp bơm hơi dễ nổ, nhiệt độ ban đêm xuống dưới -100°C làm cao su giòn nứt; khung Rocker-Bogie giúp cả 6 bánh luôn bám đất khi leo đá cao gấp đôi đường kính bánh',
      'Bánh xe nhôm giúp tàu phản xạ ánh sáng để liên lạc bằng laser với Mặt Trăng',
      'Cao su không thể chịu được lực hấp dẫn mạnh gấp đôi Trái Đất trên Sao Hỏa'
    ],
    optionsEn: [
      'Martian atmospheric pressure is only ~1% of Earth’s and night temperatures fall below -100°C (making rubber brittle and pressurized tires risky); the titanium Rocker-Bogie keeps all six aluminum wheels grounded over rocks twice their diameter',
      'Aluminum wheels reflect sunlight for Earth laser ranging',
      'Rubber cannot survive Mars gravity being twice Earth’s gravity'
    ],
    correctIndex: 0,
    explanationVi: 'Chính xác! Áp suất khí quyển Sao Hỏa chỉ bằng ~1% Trái Đất và nhiệt độ đêm giảm xuống dưới -100°C. Nhôm phay nguyên khối (đường kính ~25 cm) không bao giờ bị thủng, còn liên kết Rocker-Bogie bằng titan giữ độ ổn định khi vượt chướng ngại vật.',
    explanationEn: 'Correct! With ~1% Earth pressure and sub--100°C nights, pressurized rubber tires would fail. Solid machined aluminum cleats (~25 cm diameter) and a titanium Rocker-Bogie linkage enabled 45.16 km of off-road driving.',
    sourceCite: 'SRC-OPP-01 · SRC-OPP-05 (NASA / JPL)'
  },
  {
    id: 7,
    tagVi: 'ĐIỀU KHIỂN KHÔNG GIAN SÂU · ĐỘ TRỄ ÁNH SÁNG t = d/c',
    tagEn: 'DEEP-SPACE TELEOPERATION · LIGHT-TIME DELAY t = d/c',
    questionVi: 'Khi kiểm tra mô phỏng Quỹ đạo Trái Đất ↔ Sao Hỏa và Sao Thổ, vì sao kỹ sư NASA không thể dùng tay cầm điều khiển trực tiếp (real-time joystick) để né hố sâu cho tàu?',
    questionEn: 'When running the Earth–Mars and Earth–Saturn delay simulations, why can NASA engineers never steer rovers or flyby probes with a real-time joystick?',
    optionsVi: [
      'Vì tín hiệu vô tuyến chạy ở tốc độ ánh sáng (299.792,458 km/s) vẫn mất 3–22 phút một chiều tới Sao Hỏa và 72–87 phút tới Sao Thổ; khi nhìn thấy nguy hiểm trên màn hình, tàu đã di chuyển từ lâu trước khi lệnh phanh tới nơi',
      'Vì sóng vô tuyến bị gió Sao Hỏa thổi lệch hướng nên không bao giờ tới được rover',
      'Vì phần mềm Deep Space Network chỉ cho phép gửi 1 lệnh mỗi tháng'
    ],
    optionsEn: [
      'Radio waves travel at the speed of light (299,792.458 km/s), which still takes 3–22 minutes one-way to Mars and 72–87 minutes to Saturn; by the time telemetry reaches Earth, any immediate joystick brake arrives far too late',
      'Martian winds deflect radio beams away from the planet',
      'The Deep Space Network only permits one command per month'
    ],
    correctIndex: 0,
    explanationVi: 'Chính xác! Độ trễ khứ hồi lên tới ~6–45 phút đối với Sao Hỏa và gần 3 giờ đối với Sao Thổ. Vì thế Opportunity phải dùng phần mềm tự hành AutoNav lập bản đồ 3D né đá, còn Pioneer 11 phải chạy chuỗi lệnh lập trình sẵn khi bay ngang Sao Thổ.',
    explanationEn: 'Correct! Round-trip light delay ranges from ~6–45 min for Mars and nearly 3 hours for Saturn. That forced Opportunity to rely on onboard AutoNav stereo hazard avoidance and Pioneer 11 to run pre-loaded flyby sequences.',
    sourceCite: 'SRC-OPP-01 · SRC-PIO-01 (NASA Deep Space Network)'
  },
  {
    id: 8,
    tagVi: 'ĐO ĐẠC LASER MẶT TRĂNG · APOLLO 14 LRRR',
    tagEn: 'LUNAR LASER RANGING · APOLLO 14 LRRR',
    questionVi: 'Với độ trễ khứ hồi ~2,56 giây giữa Trái Đất và Mặt Trăng (384.400 km), mảng gương phản xạ góc khối thụ động Apollo LRRR đã giúp khoa học đo được phát hiện nào?',
    questionEn: 'Using ~2.56-second round-trip laser pulses across the ~384,400 km Earth–Moon distance, what key physical measurement does Apollo’s passive LRRR enable?',
    optionsVi: [
      'Đo khoảng cách Trái Đất – Mặt Trăng chính xác tới từng milimet, chứng minh Mặt Trăng đang dịch chuyển ra xa Trái Đất khoảng 3,8 cm mỗi năm',
      'Truyền phát điện năng không dây bằng tia laser cho tàu Surveyor 3',
      'Đo vận tốc gió trong bầu khí quyển dày đặc của Mặt Trăng'
    ],
    optionsEn: [
      'Measures the Earth–Moon distance to millimeter precision, proving the Moon is slowly receding from Earth at roughly 3.8 cm per year',
      'Beams wireless electrical power to Surveyor 3',
      'Measures wind speeds in the Moon’s dense atmosphere'
    ],
    correctIndex: 0,
    explanationVi: 'Chính xác! Xung laser từ đài quan sát Trái Đất mất ~1,28 giây lên tới mảng lăng kính thạch anh (Apollo 11, 14, 15) và ~1,28 giây phản xạ ngược về đúng hướng nguồn phát (~2,56 giây khứ hồi), giúp đo quỹ đạo Mặt Trăng với sai số chỉ vài milimet.',
    explanationEn: 'Correct! Earth-based laser pulses take ~1.28 seconds up and ~1.28 seconds back (~2.56 s round-trip) from the Apollo 11, 14, and 15 fused-silica corner-cube arrays, measuring Earth–Moon separation to millimeters.',
    sourceCite: 'SRC-LRR-01 · SRC-LRR-02 (NASA Science)'
  },
  {
    id: 9,
    tagVi: 'CƠ HỌC ĐẤT MẶT TRĂNG · SURVEYOR 3 (1967)',
    tagEn: 'LUNAR SOIL MECHANICS · SURVEYOR 3 (1967)',
    questionVi: 'Trong mô phỏng Giải phẫu & Đất Mặt Trăng, cánh tay đào đất Surface Sampler của Surveyor 3 (vươn ~1,5 m, đào sâu ~18 cm) đã giúp NASA giải tỏa nỗi lo nào trước thềm Apollo?',
    questionEn: 'In the X-Ray & Soil Mechanics lab, what critical pre-Apollo fear did Surveyor 3’s ~1.5 m Surface Sampler (~18 cm deep trenches) resolve?',
    optionsVi: [
      'Chứng minh lớp đất regolith Mặt Trăng tuy xốp ở bề mặt nhưng có sức chịu tải vững chắc khi nén xuống, hoàn toàn đủ sức đỡ chân tàu Apollo không bị lún chìm',
      'Chứng minh Mặt Trăng có mạch nước ngầm chảy ngay dưới độ sâu 18 cm',
      'Dùng gầu đào để sửa chữa tấm pin mặt trời bị hỏng do bão bụi Mặt Trăng'
    ],
    optionsEn: [
      'Proved that lunar regolith builds strong bearing resistance under compression, ensuring crewed Apollo landers would not sink into loose dust',
      'Discovered flowing liquid groundwater just 18 cm below Oceanus Procellarum',
      'Cleaned Martian dust off the solar panels during a lunar storm'
    ],
    correctIndex: 0,
    explanationVi: 'Chính xác! Qua 4 rãnh sâu tới ~18 cm và các phép thử ấn chịu tải – va chạm, Surveyor 3 khẳng định nền đất regolith tại Oceanus Procellarum chịu tải an toàn cho tàu đổ bộ Apollo.',
    explanationEn: 'Correct! Through four ~18 cm trenches plus bearing and impact tests, Surveyor 3 confirmed Oceanus Procellarum regolith could safely bear an Apollo Lunar Module.',
    sourceCite: 'SRC-SUR-01 · SRC-SUR-02 (NASA Science)'
  },
  {
    id: 10,
    tagVi: 'KHẢO CỔ HỌC KHÔNG GIAN · APOLLO 12 & SURVEYOR 3 (1969)',
    tagEn: 'SPACE ARCHAEOLOGY · APOLLO 12 & SURVEYOR 3 (1969)',
    questionVi: 'Điều gì khiến Surveyor 3 (hạ cánh 20/04/1967) trở thành hiện vật có một không hai khi Apollo 12 đáp xuống cách đó ~180 m vào tháng 11/1969?',
    questionEn: 'What made Surveyor 3 (landed 1967-04-20) historically unique when Apollo 12 touched down ~180 m away in November 1969?',
    optionsVi: [
      'Các phi hành gia Pete Conrad & Alan Bean đã đi bộ tới thăm, chụp ảnh dấu tích tàu cũ và tháo Camera TV cùng bộ phận gầu đào đưa về Trái Đất phân tích tác động môi trường Mặt Trăng',
      'Phi hành gia đã nạp lại nhiên liệu tên lửa để Surveyor 3 bay ngược về Trái Đất',
      'Surveyor 3 tự lăn bánh bằng 6 bánh xe nhôm tới đón phi hành gia Apollo 12'
    ],
    optionsEn: [
      'Astronauts Pete Conrad & Alan Bean walked to the crater, photographed the 1967 lander, and retrieved its TV camera & sampler components for Earth analysis',
      'Astronauts refueled Surveyor 3 and launched it straight back to Earth intact',
      'Surveyor 3 drove on six aluminum wheels up to Apollo 12 Intrepid'
    ],
    correctIndex: 0,
    explanationVi: 'Chính xác! Chuyến viếng thăm ngày 19–20/11/1969 đã biến Surveyor 3 thành cột mốc khảo cổ học ngoài Trái Đất hiếm có, cung cấp mẫu vật thật về độ bào mòn bức xạ – vi thiên thạch suốt 2,5 năm.',
    explanationEn: 'Correct! The November 19–20, 1969 rendezvous allowed NASA to inspect real spacecraft materials exposed for ~2.5 years on the Moon.',
    sourceCite: 'SRC-SUR-03 · SRC-SUR-04 (NASA / JSC)'
  }
];

const SIM_QUIZ_TRACK_MAP: Record<number, 1 | 2 | 3 | 4> = {
  1: 1,
  6: 1,
  9: 1,
  7: 2,
  8: 2,
  2: 3,
  5: 3,
  3: 4,
  4: 4,
  10: 4
};

export const SimulationsPage: React.FC<SimulationsPageProps> = ({
  lang,
  onNavigate,
  onOpenLightbox
}) => {
  const isEn = lang === 'en';

  const initialMissionFromUrl = useMemo<'opportunity' | 'pioneer-11' | 'surveyor-3'>(() => {
    if (typeof window === 'undefined') return 'opportunity';
    try {
      const params = new URLSearchParams(window.location.search);
      const m = params.get('mission');
      if (m === 'pioneer-11') return 'pioneer-11';
      if (m === 'surveyor-3') return 'surveyor-3';
    } catch {
      // Fallback
    }
    return 'opportunity';
  }, []);

  /* Active Track Filter Tab */
  const [activeTrackFilter, setActiveTrackFilter] = useState<'all' | '1' | '2' | '3' | '4'>('all');

  /* ==========================================================================
   * TRACK 01 STATE: SPACECRAFT ANATOMY & EXTREME MATERIALS
   * ========================================================================== */
  const [activeAnatomyTarget, setActiveAnatomyTarget] = useState<
    'opportunity' | 'pioneer-11' | 'surveyor-3' | 'pioneer-plaque'
  >(initialMissionFromUrl);
  const [selectedSpotIndex, setSelectedSpotIndex] = useState<number>(0);
  const [inspectedPartIds, setInspectedPartIds] = useState<Record<string, boolean>>(() => {
    const initialList =
      initialMissionFromUrl === 'pioneer-11'
        ? PIONEER_ANATOMY_PARTS
        : initialMissionFromUrl === 'surveyor-3'
        ? SURVEYOR_ANATOMY_PARTS
        : OPPORTUNITY_ANATOMY_PARTS;
    return initialList[0] ? { [initialList[0].id]: true } : {};
  });

  const currentAnatomyParts = useMemo(() => {
    if (activeAnatomyTarget === 'opportunity') return OPPORTUNITY_ANATOMY_PARTS;
    if (activeAnatomyTarget === 'pioneer-11') return PIONEER_ANATOMY_PARTS;
    if (activeAnatomyTarget === 'surveyor-3') return SURVEYOR_ANATOMY_PARTS;
    return PLAQUE_ANATOMY_PARTS;
  }, [activeAnatomyTarget]);

  const currentAnatomyMedia: NasaMediaItem = useMemo(() => {
    if (activeAnatomyTarget === 'opportunity') {
      return NASA_MEDIA_CATALOG.opportunity_self_portrait_2004;
    }
    if (activeAnatomyTarget === 'pioneer-11') {
      return NASA_MEDIA_CATALOG['IMG-PIO-02'];
    }
    if (activeAnatomyTarget === 'surveyor-3') {
      return NASA_MEDIA_CATALOG['IMG-SUR-02'];
    }
    return NASA_MEDIA_CATALOG.pioneer_plaque_diagram || NASA_MEDIA_CATALOG['IMG-PIO-03'];
  }, [activeAnatomyTarget]);

  const activePart = currentAnatomyParts[selectedSpotIndex] || currentAnatomyParts[0];

  const handleSelectHotspot = (idx: number) => {
    setSelectedSpotIndex(idx);
    const chosen = currentAnatomyParts[idx];
    if (chosen) {
      setInspectedPartIds((prev) => ({ ...prev, [chosen.id]: true }));
    }
  };

  const handleSwitchAnatomyTarget = (target: 'opportunity' | 'pioneer-11' | 'surveyor-3' | 'pioneer-plaque') => {
    setActiveAnatomyTarget(target);
    setSelectedSpotIndex(0);
    const firstList =
      target === 'opportunity'
        ? OPPORTUNITY_ANATOMY_PARTS
        : target === 'pioneer-11'
        ? PIONEER_ANATOMY_PARTS
        : target === 'surveyor-3'
        ? SURVEYOR_ANATOMY_PARTS
        : PLAQUE_ANATOMY_PARTS;
    if (firstList[0]) {
      setInspectedPartIds((prev) => ({ ...prev, [firstList[0].id]: true }));
    }
  };

  const track1SimDone = Object.keys(inspectedPartIds).length >= 3;

  /* ==========================================================================
   * TRACK 02 STATE: LIGHT-TIME DELAY (t = d/c), TELEOPERATION & SURVEYOR SOIL LAB
   * ========================================================================== */
  const [selectedOrbitSystem, setSelectedOrbitSystem] = useState<'earth_mars' | 'earth_saturn' | 'earth_moon'>(
    initialMissionFromUrl === 'pioneer-11'
      ? 'earth_saturn'
      : initialMissionFromUrl === 'surveyor-3'
      ? 'earth_moon'
      : 'earth_mars'
  );
  const [scoopDepthCm, setScoopDepthCm] = useState<number>(18);
  const [radarCutoffMode, setRadarCutoffMode] = useState<'auto_anomaly' | 'manual_cutoff'>('auto_anomaly');
  const soilMetrics = useMemo(() => {
    // Surveyor 3 SMSS pedagogical mechanical soil model (0.7 psi surface to ~8.5 psi compacted depth at 18 cm)
    const bearingPsi = Number((0.7 + (scoopDepthCm / 18) * 7.8).toFixed(1));
    const apolloLanderPsi = 2.0; // Apollo LM footpad ground load benchmark (~1.9–2.1 psi)
    const safetyMargin = Number((bearingPsi / apolloLanderPsi).toFixed(1));
    return { bearingPsi, apolloLanderPsi, safetyMargin, safeForApollo: bearingPsi >= apolloLanderPsi };
  }, [scoopDepthCm]);
  const [orbitalAngle, setOrbitalAngle] = useState<number>(52);
  const [isAutoOrbit, setIsAutoOrbit] = useState<boolean>(true);
  const [uplinkCommand, setUplinkCommand] = useState<string | null>(null);
  const [isPulseActive, setIsPulseActive] = useState<boolean>(false);
  const [testedOrbitInteractions, setTestedOrbitInteractions] = useState<number>(0);

  useEffect(() => {
    if (!isAutoOrbit) return;
    const timer = setInterval(() => {
      setOrbitalAngle((prev) => (prev + 0.5) % 360);
    }, 60);
    return () => clearInterval(timer);
  }, [isAutoOrbit]);

  const ephemerisMetrics = useMemo(() => {
    const SPEED_OF_LIGHT_KM_S = 299792.458;
    const AU_IN_KM = 149597870.7;

    if (selectedOrbitSystem === 'earth_moon') {
      const distanceKm = 384400;
      const distanceAU = distanceKm / AU_IN_KM;
      const oneWaySec = distanceKm / SPEED_OF_LIGHT_KM_S;
      const roundTripSec = oneWaySec * 2;
      return {
        distanceKm,
        distanceAU: distanceAU.toFixed(5),
        oneWaySec,
        roundTripSec,
        earthPos: { x: 220, y: 150 },
        targetPos: { x: 310, y: 150 },
        phaseVi: 'Khoảng cách Địa – Nguyệt Trung bình (Đo đạc Laser Apollo LRRR)',
        phaseEn: 'Mean Earth–Moon Distance (Apollo LRRR Laser Ranging)',
        noteVi: 'Xung laser từ đài quan sát Trái Đất mất ~1,28 giây để chạm mảng 100 lăng kính thạch anh Apollo 11/14 (hoặc 300 lăng kính Apollo 15) và ~1,28 giây phản xạ ngược về.',
        noteEn: 'An Earth observatory laser pulse takes ~1.28 s to reach Apollo 11/14/15 fused-silica prisms and ~1.28 s to return.'
      };
    }

    if (selectedOrbitSystem === 'earth_saturn') {
      const rad = (orbitalAngle * Math.PI) / 180;
      const eX = 250 + 42 * Math.cos(rad * 2.5);
      const eY = 150 + 42 * Math.sin(rad * 2.5);
      const sX = 250 + 185 * Math.cos(rad * 0.4);
      const sY = 150 + 130 * Math.sin(rad * 0.4);

      const distanceAU = 9.58 - 0.85 * Math.cos(rad * 2.1);
      const distanceKm = distanceAU * AU_IN_KM;
      const oneWaySec = distanceKm / SPEED_OF_LIGHT_KM_S;
      const roundTripSec = oneWaySec * 2;

      return {
        distanceKm,
        distanceAU: distanceAU.toFixed(2),
        oneWaySec,
        roundTripSec,
        earthPos: { x: eX, y: eY },
        targetPos: { x: sX, y: sY },
        phaseVi: 'Liên kết Trái Đất – Sao Thổ (Pioneer 11 Flyby 01/09/1979)',
        phaseEn: 'Earth–Saturn Interplanetary Link (Pioneer 11 Flyby 1979-09-01)',
        noteVi: 'Ở cự ly ~8,7 đến 10,5 AU (~1,3–1,57 tỷ km), tín hiệu vô tuyến đi một chiều mất ~72 đến ~87 phút. Mọi chuỗi thao tác bay ngang qua Sao Thổ phải được lập trình trước hàng giờ.',
        noteEn: 'At ~8.7–10.5 AU (~1.3–1.57B km), one-way S-band radio takes ~72–87 min. Every Saturn ring-plane crossing maneuver had to be pre-programmed hours ahead.'
      };
    }

    const rad = (orbitalAngle * Math.PI) / 180;
    const earthAngle = rad * 1.8808;
    const eX = 250 + 75 * Math.cos(earthAngle);
    const eY = 150 + 75 * Math.sin(earthAngle);
    const mX = 250 + 120 * Math.cos(rad);
    const mY = 150 + 114 * Math.sin(rad);

    const dX = (mX - eX) / 75;
    const dY = (mY - eY) / 75;
    const distanceAU = Math.max(0.38, Math.min(2.67, Math.sqrt(dX * dX + dY * dY)));
    const distanceKm = distanceAU * AU_IN_KM;
    const oneWaySec = distanceKm / SPEED_OF_LIGHT_KM_S;
    const roundTripSec = oneWaySec * 2;

    let phaseVi = 'Pha Quỹ đạo Trung gian (Quadrature)';
    let phaseEn = 'Intermediate Orbital Phase (Quadrature)';
    let noteVi = 'Độ trễ một chiều từ 8 đến 15 phút. Nếu điều khiển bằng tay cầm trực tiếp khi thấy hố sâu trên màn hình, rover sẽ lăn xuống vực trước khi lệnh phanh kịp bay tới.';
    let noteEn = 'One-way light time is 8–15 minutes. A real-time joystick brake cannot stop the rover before hazard contact.';

    if (distanceAU < 0.65) {
      phaseVi = 'Vị trí Xung đối (Opposition) — Gần Trái Đất Nhất (~55–85 triệu km)';
      phaseEn = 'Planetary Opposition — Closest Approach (~55–85M km)';
      noteVi = 'Ngay cả khi Trái Đất và Sao Hỏa gần nhau nhất (26 tháng/lần), sóng ánh sáng vẫn mất ~3–4,5 phút một chiều (~6–9 phút khứ hồi).';
      noteEn = 'Even at closest approach every 26 months, speed-of-light signals still need ~3–4.5 minutes one-way.';
    } else if (distanceAU > 2.25) {
      phaseVi = 'Vị trí Giao hội qua Mặt Trời (Solar Conjunction) — Xa Nhất';
      phaseEn = 'Solar Conjunction — Maximum Separation';
      noteVi = 'Mặt Trời nằm chắn giữa Trái Đất và Sao Hỏa (~350–401 triệu km, độ trễ ~20–22 phút một chiều). Rover chuyển sang chế độ tự vận hành an toàn.';
      noteEn = 'The Sun blocks direct sightlines (~350–401M km, ~20–22 min one-way). Solar corona noise forces autonomous safe mode.';
    }

    return {
      distanceKm,
      distanceAU: distanceAU.toFixed(3),
      oneWaySec,
      roundTripSec,
      earthPos: { x: eX, y: eY },
      targetPos: { x: mX, y: mY },
      phaseVi,
      phaseEn,
      noteVi,
      noteEn
    };
  }, [selectedOrbitSystem, orbitalAngle]);

  const formatTimeDuration = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds.toFixed(2)} ${isEn ? 'sec' : 'giây'}`;
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    if (mins < 60) {
      return `${mins} ${isEn ? 'min' : 'phút'} ${secs} ${isEn ? 's' : 'giây'}`;
    }
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hours} ${isEn ? 'hr' : 'giờ'} ${remMins} ${isEn ? 'min' : 'phút'}`;
  };

  const handleTriggerCommand = (cmdVi: string, cmdEn: string) => {
    setUplinkCommand(isEn ? cmdEn : cmdVi);
    setIsPulseActive(true);
    setTestedOrbitInteractions((c) => c + 1);
    setTimeout(() => {
      setIsPulseActive(false);
    }, 2400);
  };

  const track2SimDone = testedOrbitInteractions >= 1;

  /* ==========================================================================
   * TRACK 03 STATE: SOLAR FLUX (1/r²), DUST STORM (τ) & RTG POWER
   * ========================================================================== */
  const [heliocentricAU, setHeliocentricAU] = useState<number>(
    initialMissionFromUrl === 'pioneer-11' ? 9.58 : initialMissionFromUrl === 'surveyor-3' ? 1.0 : 1.52
  );
  const [marsDustTau, setMarsDustTau] = useState<number>(0.5);
  const [lunarNightMode, setLunarNightMode] = useState<boolean>(false);
  const [testedSolarLab, setTestedSolarLab] = useState<boolean>(false);

  const solarPowerMetrics = useMemo(() => {
    const SOLAR_CONSTANT_1AU = 1361;
    const topOfAtmosphereFlux = SOLAR_CONSTANT_1AU / (heliocentricAU * heliocentricAU);
    const percentOfEarth = (topOfAtmosphereFlux / SOLAR_CONSTANT_1AU) * 100;

    const isNearMars = heliocentricAU >= 1.35 && heliocentricAU <= 1.7;
    const effectiveAttenuation = lunarNightMode ? 0 : isNearMars ? Math.exp(-0.38 * Math.max(0, marsDustTau - 0.5)) : 1;
    const effectiveSurfaceFlux = topOfAtmosphereFlux * effectiveAttenuation;
    const estimatedOpportunityWh = lunarNightMode ? 0 : Math.round(760 * (effectiveSurfaceFlux / (1361 / (1.52 * 1.52))));

    return {
      topOfAtmosphereFlux: topOfAtmosphereFlux.toFixed(1),
      percentOfEarth: percentOfEarth.toFixed(2),
      effectiveSurfaceFlux: effectiveSurfaceFlux.toFixed(1),
      estimatedOpportunityWh,
      isNearMars
    };
  }, [heliocentricAU, marsDustTau, lunarNightMode]);

  const track3SimDone = testedSolarLab;

  /* ==========================================================================
   * TRACK 04 STATE: SPACE ARCHAEOLOGY & MISSION CHRONOLOGY SORTER
   * ========================================================================== */
  const [timelineMission, setTimelineMission] = useState<'opportunity' | 'pioneer-11' | 'surveyor-3'>(
    initialMissionFromUrl
  );
  const [userTimelineOrder, setUserTimelineOrder] = useState<TimelineChallengeItem[]>(() => {
    const base =
      initialMissionFromUrl === 'pioneer-11'
        ? PIONEER_TIMELINE_CHALLENGE
        : initialMissionFromUrl === 'surveyor-3'
        ? SURVEYOR_TIMELINE_CHALLENGE
        : OPPORTUNITY_TIMELINE_CHALLENGE;
    return [base[2], base[0], base[4], base[1], base[5], base[3]];
  });
  const [timelineChecked, setTimelineChecked] = useState<boolean>(false);

  const handleSwitchTimelineMission = (m: 'opportunity' | 'pioneer-11' | 'surveyor-3') => {
    setTimelineMission(m);
    const base =
      m === 'opportunity'
        ? OPPORTUNITY_TIMELINE_CHALLENGE
        : m === 'pioneer-11'
        ? PIONEER_TIMELINE_CHALLENGE
        : SURVEYOR_TIMELINE_CHALLENGE;
    setUserTimelineOrder([base[2], base[0], base[4], base[1], base[5], base[3]]);
    setTimelineChecked(false);
  };

  const handleMoveTimelineItem = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= userTimelineOrder.length) return;
    const copy = [...userTimelineOrder];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    setUserTimelineOrder(copy);
    setTimelineChecked(false);
  };

  const handleShuffleTimeline = () => {
    const copy = [...userTimelineOrder];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    setUserTimelineOrder(copy);
    setTimelineChecked(false);
  };

  const handleSolveTimeline = () => {
    const base =
      timelineMission === 'opportunity'
        ? OPPORTUNITY_TIMELINE_CHALLENGE
        : timelineMission === 'pioneer-11'
        ? PIONEER_TIMELINE_CHALLENGE
        : SURVEYOR_TIMELINE_CHALLENGE;
    setUserTimelineOrder([...base]);
    setTimelineChecked(true);
  };

  const timelineCorrectCount = useMemo(() => {
    return userTimelineOrder.reduce((acc, item, idx) => (item.orderIndex === idx + 1 ? acc + 1 : acc), 0);
  }, [userTimelineOrder]);

  const track4SimDone = timelineChecked && timelineCorrectCount === 6;

  /* ==========================================================================
   * UNIFIED CHALLENGE TEST STATE ACROSS TRACKS 01-04
   * ========================================================================== */
  const [quizSelections, setQuizSelections] = useState<Record<number, number>>({});

  const getTrackQuizStats = (trackNum: 1 | 2 | 3 | 4) => {
    const items = STEM_QUIZ_ITEMS.filter((q) => SIM_QUIZ_TRACK_MAP[q.id] === trackNum);
    const solved = items.filter((q) => quizSelections[q.id] === q.correctIndex).length;
    return { items, solved, total: items.length };
  };

  const track1Quiz = getTrackQuizStats(1);
  const track2Quiz = getTrackQuizStats(2);
  const track3Quiz = getTrackQuizStats(3);
  const track4Quiz = getTrackQuizStats(4);

  const trackCompletion = {
    1: track1SimDone && track1Quiz.solved === track1Quiz.total,
    2: track2SimDone && track2Quiz.solved === track2Quiz.total,
    3: track3SimDone && track3Quiz.solved === track3Quiz.total,
    4: track4SimDone && track4Quiz.solved === track4Quiz.total
  };

  const completedTracksCount = Object.values(trackCompletion).filter(Boolean).length;
  const totalQuizSolved = STEM_QUIZ_ITEMS.filter((q) => quizSelections[q.id] === q.correctIndex).length;

  const handleResetAllTracks = () => {
    setQuizSelections({});
    setTestedOrbitInteractions(0);
    setTestedSolarLab(false);
    setLunarNightMode(false);
    setScoopDepthCm(18);
    setRadarCutoffMode('auto_anomaly');
    const currentFirst = currentAnatomyParts[0];
    setInspectedPartIds(currentFirst ? { [currentFirst.id]: true } : {});
    handleSwitchTimelineMission(timelineMission);
  };

  const renderTrackQuizSection = (trackNum: 1 | 2 | 3 | 4) => {
    const { items, solved, total } = getTrackQuizStats(trackNum);
    return (
      <div className="mt-8 pt-6 border-t border-[#AAB8C7]/15 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 font-mono text-[13px] font-semibold uppercase tracking-wide text-[#D2A071]">
            <HelpCircle className="w-4 h-4" />
            <span>
              {isEn
                ? `Step 4 · Test Your Discovery (${solved}/${total} Correct)`
                : `Bước 4 · Thử thách Kiểm chứng Sau Mô phỏng (${solved}/${total} câu đúng)`}
            </span>
          </div>
          {solved === total && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/75 text-emerald-300 border border-emerald-500/40 rounded-full font-mono text-[13px]">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isEn ? 'All Track Challenges Solved' : 'Đã hoàn thành câu hỏi thử thách'}</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {items.map((q) => {
            const picked = quizSelections[q.id];
            const hasAnswered = picked !== undefined;
            const isCorrect = picked === q.correctIndex;
            const options = isEn ? q.optionsEn : q.optionsVi;

            return (
              <div
                key={q.id}
                className="p-5 sm:p-6 bg-[#101E30] border border-[#AAB8C7]/20 rounded-xl flex flex-col justify-between gap-4"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[13px] text-[#D2A071]">
                    <span>{isEn ? q.tagEn : q.tagVi}</span>
                    {hasAnswered && (
                      <span
                        className={`inline-flex items-center gap-1 font-semibold ${
                          isCorrect ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {isCorrect ? <Check className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        <span>
                          {isCorrect
                            ? isEn
                              ? 'Verified'
                              : 'Chính xác'
                            : isEn
                            ? 'Try another answer'
                            : 'Chọn lại'}
                        </span>
                      </span>
                    )}
                  </div>

                  <h4 className="font-sans text-base sm:text-lg font-semibold text-[#F0EDE5] leading-snug">
                    {isEn ? q.questionEn : q.questionVi}
                  </h4>

                  <div className="space-y-2.5">
                    {options.map((opt, idx) => {
                      const isThisPicked = picked === idx;
                      const showRight = hasAnswered && idx === q.correctIndex;
                      const showWrong = isThisPicked && idx !== q.correctIndex;

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setQuizSelections((prev) => ({ ...prev, [q.id]: idx }))}
                          className={`w-full text-left p-3.5 rounded-lg border text-sm sm:text-base leading-relaxed transition-colors cursor-pointer flex items-start gap-3 ${
                            showRight
                              ? 'bg-emerald-950/60 border-emerald-400/70 text-[#F0EDE5]'
                              : showWrong
                              ? 'bg-rose-950/60 border-rose-400/70 text-rose-100'
                              : isThisPicked
                              ? 'bg-[#21374D] border-[#D2A071] text-[#F0EDE5]'
                              : 'bg-[#162A40] hover:bg-[#21374D] border-[#AAB8C7]/20 text-[#F0EDE5]'
                          }`}
                        >
                          <span className="font-mono text-[13px] font-bold text-[#D2A071] shrink-0 mt-0.5">
                            {String.fromCharCode(65 + idx)}.
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {hasAnswered && (
                  <div
                    className={`p-4 rounded-lg border text-sm leading-relaxed space-y-1.5 ${
                      isCorrect
                        ? 'bg-emerald-950/35 border-emerald-500/40 text-emerald-100'
                        : 'bg-[#162A40] border-[#D2A071]/40 text-[#F0EDE5]'
                    }`}
                  >
                    <p>{isEn ? q.explanationEn : q.explanationVi}</p>
                    <div className="font-mono text-[13px] text-[#D2A071]">{q.sourceCite}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const resolveMediaPath = (item: NasaMediaItem) =>
    item.direct_asset_url ||
    (item.local_asset_url ? item.local_asset_url.replace(/^\/public/, '') : '') ||
    '';

  return (
    <div className="bg-[#0B1422] text-[#F0EDE5] min-h-screen selection:bg-[#D2A071]/30 selection:text-[#F0EDE5]">
      {/* =====================================================================
       * HERO HEADER & 4 CHALLENGE-SIMULATION TRACK NAVIGATOR
       * ===================================================================== */}
      <section className="relative overflow-hidden border-b border-[#AAB8C7]/15 bg-gradient-to-b from-[#101E30] via-[#0E1929] to-[#0B1422] py-14 lg:py-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle NASA Archival Backdrop */}
        <img
          src="/assets/nasa/opportunity_self_portrait_2007_PIA15114.jpg"
          alt="NASA Opportunity Mars rover archival backdrop"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.14] pointer-events-none select-none mix-blend-luminosity"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 850px 420px at 18% 5%, rgba(210,160,113,0.14) 0%, transparent 70%), radial-gradient(ellipse 750px 420px at 85% 90%, rgba(33,55,77,0.45) 0%, transparent 70%)'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#162A40]/90 border border-[#D2A071]/40 rounded-full text-[13px] font-mono text-[#D2A071]">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>
                {isEn
                  ? 'Challenge-Integrated STEM Lab · Discover → Simulate → Test'
                  : 'Phòng Thí Nghiệm Gắn Với Thử Thách · Khám phá → Mô phỏng → Kiểm chứng'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-1.5 bg-[#162A40]/90 border border-[#AAB8C7]/25 rounded-full font-mono text-[13px] text-[#F0EDE5]">
                {isEn
                  ? `Progress: ${completedTracksCount}/4 Tracks · ${totalQuizSolved}/${STEM_QUIZ_ITEMS.length} Questions`
                  : `Tiến độ: ${completedTracksCount}/4 Thử thách · ${totalQuizSolved}/${STEM_QUIZ_ITEMS.length} Câu hỏi`}
              </div>
              <button
                type="button"
                onClick={handleResetAllTracks}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#101E30] hover:bg-[#21374D] text-[#AAB8C7] hover:text-[#F0EDE5] border border-[#AAB8C7]/25 rounded-full text-sm transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{isEn ? 'Reset Progress' : 'Làm lại'}</span>
              </button>
            </div>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-semibold tracking-tight text-[#F0EDE5] leading-[1.12]">
              {isEn
                ? 'Learn Space Engineering by Solving Real NASA Challenges'
                : 'Thử Thách Kỹ Thuật Vũ Trụ & Mô Phỏng Vật Lý NASA'}
            </h1>
            <p className="text-base sm:text-lg text-[#AAB8C7] leading-relaxed max-w-3xl">
              {isEn
                ? 'Every simulation below directly answers a real engineering problem NASA solved on the Moon, Mars, and Saturn—guiding you step by step from the challenge question to hands-on physics testing and verified proof.'
                : 'Mỗi mô phỏng dưới đây gắn trực tiếp với một bài toán thật mà NASA phải giải quyết trên Mặt Trăng, Sao Hỏa và Sao Thổ. Bạn sẽ đi theo lộ trình 5 bước rõ ràng: Khám phá câu hỏi → Tìm hiểu nguyên lý → Chạy mô phỏng → Kiểm chứng ngay tại chỗ → Xem giải thích.'}
            </p>
          </div>

          {/* 5-Step Flow Overview Pills */}
          <div className="p-4 sm:p-5 bg-[#101E30]/90 border border-[#AAB8C7]/15 rounded-xl flex flex-wrap items-center gap-3 text-sm text-[#F0EDE5]">
            <span className="font-mono text-[13px] font-semibold text-[#D2A071] mr-1">
              {isEn ? 'HOW EVERY TRACK WORKS:' : 'QUY TRÌNH 5 BƯỚC:'}
            </span>
            {[
              isEn ? '1. Discover Challenge' : '1. Khám phá câu hỏi',
              isEn ? '2. Explore Principle' : '2. Tìm hiểu kiến thức',
              isEn ? '3. Interactive Simulation' : '3. Tự tay mô phỏng',
              isEn ? '4. Instant Test' : '4. Thử thách trắc nghiệm',
              isEn ? '5. Verified Explanation' : '5. Giải thích NASA'
            ].map((label, i) => (
              <React.Fragment key={label}>
                <span className="px-3 py-1 bg-[#162A40] border border-[#AAB8C7]/20 rounded-md font-sans text-sm text-[#F0EDE5]">
                  {label}
                </span>
                {i < 4 && <ArrowRight className="w-4 h-4 text-[#D2A071] hidden sm:inline" />}
              </React.Fragment>
            ))}
          </div>

          {/* Interactive Track Filter & Progress Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
            <button
              type="button"
              onClick={() => setActiveTrackFilter('all')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                activeTrackFilter === 'all'
                  ? 'bg-[#21374D] border-[#D2A071] text-[#F0EDE5] shadow-md'
                  : 'bg-[#101E30]/90 border-[#AAB8C7]/15 text-[#AAB8C7] hover:bg-[#162A40]'
              }`}
            >
              <span className="font-mono text-[13px] font-semibold text-[#D2A071]">
                {isEn ? 'ALL TRACKS' : 'TẤT CẢ'}
              </span>
              <span className="font-sans text-base font-semibold text-[#F0EDE5]">
                {isEn ? 'View All 4 Challenges' : 'Hiện cả 4 Thử thách'}
              </span>
              <span className="text-[13px] text-[#AAB8C7]">
                {completedTracksCount}/4 {isEn ? 'Completed' : 'Hoàn thành'}
              </span>
            </button>

            {[
              {
                key: '1' as const,
                code: 'TRACK 01',
                titleVi: 'Giải phẫu & Vật liệu Tàu',
                titleEn: 'Spacecraft & Materials',
                done: trackCompletion[1],
                detail: `${Object.keys(inspectedPartIds).length} ${isEn ? 'parts' : 'bộ phận'} · ${track1Quiz.solved}/${track1Quiz.total}`
              },
              {
                key: '2' as const,
                code: 'TRACK 02',
                titleVi: 'Độ trễ Sóng Ánh sáng',
                titleEn: 'Light Delay & Laser',
                done: trackCompletion[2],
                detail: `${track2SimDone ? 'DSN OK' : isEn ? 'Run sim' : 'Chưa chạy'} · ${track2Quiz.solved}/${track2Quiz.total}`
              },
              {
                key: '3' as const,
                code: 'TRACK 03',
                titleVi: 'Năng lượng 1/r² & Bão bụi',
                titleEn: 'Solar 1/r² & RTG Power',
                done: trackCompletion[3],
                detail: `${track3SimDone ? 'Power OK' : isEn ? 'Run sim' : 'Chưa thử'} · ${track3Quiz.solved}/${track3Quiz.total}`
              },
              {
                key: '4' as const,
                code: 'TRACK 04',
                titleVi: 'Khảo cổ & Dòng thời gian',
                titleEn: 'Timeline & Archaeology',
                done: trackCompletion[4],
                detail: `${timelineCorrectCount}/6 ${isEn ? 'events' : 'mốc'} · ${track4Quiz.solved}/${track4Quiz.total}`
              }
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveTrackFilter(item.key)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  activeTrackFilter === item.key
                    ? 'bg-[#21374D] border-[#D2A071] text-[#F0EDE5] shadow-md'
                    : 'bg-[#101E30]/90 border-[#AAB8C7]/15 text-[#AAB8C7] hover:bg-[#162A40]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[13px] font-semibold text-[#D2A071]">{item.code}</span>
                  {item.done && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                </div>
                <span className="font-sans text-base font-semibold text-[#F0EDE5]">
                  {isEn ? item.titleEn : item.titleVi}
                </span>
                <span className="font-mono text-[13px] text-[#AAB8C7]">{item.detail}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
       * MAIN 4 CHALLENGE -> SIMULATION TRACKS
       * ===================================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
        {/* -------------------------------------------------------------------
         * TRACK 01: SPACECRAFT ANATOMY, OPTICS & EXTREME MATERIALS
         * ------------------------------------------------------------------- */}
        {(activeTrackFilter === 'all' || activeTrackFilter === '1') && (
          <section
            id="track-01-anatomy"
            className="bg-[#101E30] border border-[#AAB8C7]/20 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl space-y-8"
          >
            {/* Steps 1 & 2 Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 font-mono text-[13px] font-semibold text-[#D2A071] uppercase">
                  <Cpu className="w-4 h-4" />
                  <span>
                    {isEn
                      ? 'Challenge Track 01 · Spacecraft Architecture & Extreme Materials'
                      : 'Thử thách 01 · Giải phẫu Tàu Vũ Trụ & Vật liệu Khắc nghiệt'}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full font-mono text-[13px] border ${
                    trackCompletion[1]
                      ? 'bg-emerald-950/75 text-emerald-300 border-emerald-500/40'
                      : 'bg-[#162A40] text-[#D2A071] border-[#D2A071]/40'
                  }`}
                >
                  {trackCompletion[1]
                    ? isEn
                      ? 'Completed'
                      : 'Đã hoàn thành Thử thách 01'
                    : isEn
                    ? 'In Progress · Click 3+ Hotspots & Solve Quiz'
                    : 'Mục tiêu: Khám phá 3+ bộ phận & trả lời 2 câu hỏi'}
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-[36px] font-semibold text-[#F0EDE5] leading-tight">
                {isEn
                  ? 'Why place a delicate spectrometer inside the belly—and drive on solid aluminum wheels?'
                  : 'Vì sao phải giấu máy quang phổ trong bụng xe và chế tạo bánh xe bằng nhôm đặc?'}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
                <div className="p-4 sm:p-5 bg-[#162A40] border border-[#D2A071]/30 rounded-xl space-y-1.5">
                  <div className="font-mono text-[13px] font-semibold text-[#D2A071]">
                    {isEn ? 'STEP 1 · THE CHALLENGE QUESTION' : 'BƯỚC 1 · KHÁM PHÁ BÀI TOÁN'}
                  </div>
                  <p className="text-base text-[#F0EDE5] leading-relaxed">
                    {isEn
                      ? 'Mars nights plunge below -100°C and Pioneer 11 flies blindly into deep interstellar space. Where must sensitive instruments sit to survive—and what cosmic map guides extraterrestrials to Earth?'
                      : 'Đêm Sao Hỏa lạnh dưới -100°C làm giòn cao su, còn Pioneer 11 bay mãi ra khỏi Hệ Mặt Trời. Kỹ sư phải giấu thiết bị nhạy cảm ở đâu, chọn vật liệu gì cho bánh xe, và khắc ký hiệu gì lên tấm bảng Pioneer Plaque?'}
                  </p>
                </div>

                <div className="p-4 sm:p-5 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl space-y-1.5">
                  <div className="font-mono text-[13px] font-semibold text-[#D2A071]">
                    {isEn ? 'STEP 2 · ENGINEERING PRINCIPLE' : 'BƯỚC 2 · TÌM HIỂU KIẾN THỨC'}
                  </div>
                  <p className="text-base text-[#AAB8C7] leading-relaxed">
                    {isEn
                      ? 'Opportunity protects Mini-TES inside the insulated Warm Electronics Box (WEB), looking out through a mast periscope; machined aluminum wheels + titanium Rocker-Bogie prevent blowouts. Meanwhile, Pioneer 11 carries the visual Pioneer Plaque (not Voyager Golden Record).'
                      : 'Opportunity giữ ấm Mini-TES trong khoang thân xe WEB và nhìn lên qua gương tiềm vọng (không gắn đỉnh cột như Pancam), chạy bằng 6 bánh nhôm đặc không sợ nổ ở áp suất 1%. Còn Pioneer 11 mang tấm bảng khắc hình Pioneer Plaque.'}
                  </p>
                </div>
              </div>

              <SimChallengeStepRibbon
                lang={lang}
                simDone={track1SimDone}
                quizSolved={track1Quiz.solved}
                quizTotal={track1Quiz.total}
              />
            </div>

            {/* Step 3 Interactive Simulator: X-Ray Hotspot Explorer */}
            <div className="space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="font-mono text-[13px] font-semibold text-[#D2A071] uppercase">
                  {isEn
                    ? 'Step 3 · Interactive Spacecraft X-Ray Explorer (Click numbered pins)'
                    : 'Bước 3 · Mô phỏng Giải phẫu Tàu Vũ Trụ (Bấm vào từng điểm số để kiểm tra)'}
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'opportunity' as const, vi: 'Opportunity (6 bộ phận)', en: 'Opportunity (6 Parts)' },
                    { id: 'surveyor-3' as const, vi: 'Surveyor 3 · Demo (5 bộ phận)', en: 'Surveyor 3 · Demo (5 Parts)' },
                    { id: 'pioneer-11' as const, vi: 'Pioneer 11 (4 bộ phận)', en: 'Pioneer 11 (4 Parts)' },
                    { id: 'pioneer-plaque' as const, vi: 'Bảng Pioneer Plaque', en: 'Pioneer Plaque' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleSwitchAnatomyTarget(tab.id)}
                      className={`px-4 py-2 rounded-lg font-sans text-sm font-medium border transition-colors cursor-pointer ${
                        activeAnatomyTarget === tab.id
                          ? 'bg-[#D2A071] text-[#0B1422] border-[#D2A071] font-semibold'
                          : 'bg-[#162A40] text-[#F0EDE5] border-[#AAB8C7]/20 hover:bg-[#21374D]'
                      }`}
                    >
                      {isEn ? tab.en : tab.vi}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Canvas */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="bg-[#0B1422] border border-[#AAB8C7]/20 rounded-xl overflow-hidden">
                    <div className="px-4 py-3 bg-[#162A40] border-b border-[#AAB8C7]/15 flex items-center justify-between gap-2">
                      <span className="font-mono text-[13px] text-[#F0EDE5] truncate">
                        {currentAnatomyMedia.title}
                      </span>
                      {onOpenLightbox && (
                        <button
                          type="button"
                          onClick={() => onOpenLightbox(currentAnatomyMedia)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#21374D] hover:bg-[#2a4560] text-[#D2A071] rounded-md text-[13px] font-mono shrink-0 cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>{isEn ? 'Enlarge' : 'Phóng lớn'}</span>
                        </button>
                      )}
                    </div>

                    <div className="relative aspect-[16/10] w-full bg-[#0B1422] flex items-center justify-center overflow-hidden">
                      <img
                        src={resolveMediaPath(currentAnatomyMedia)}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (currentAnatomyMedia.direct_asset_url && target.src !== currentAnatomyMedia.direct_asset_url) {
                            target.src = currentAnatomyMedia.direct_asset_url;
                          }
                        }}
                        alt={currentAnatomyMedia.alt_vi}
                        className={`w-full h-full ${
                          activeAnatomyTarget === 'opportunity' ? 'object-cover' : 'object-contain p-4 bg-[#101E30]'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1422]/60 via-transparent to-transparent pointer-events-none" />

                      {currentAnatomyParts.map((spot, idx) => {
                        const isSelected = idx === selectedSpotIndex;
                        const isVisited = Boolean(inspectedPartIds[spot.id]);
                        return (
                          <button
                            key={spot.id}
                            type="button"
                            onClick={() => handleSelectHotspot(idx)}
                            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                            aria-label={isEn ? spot.titleEn : spot.titleVi}
                            className={`-translate-x-1/2 -translate-y-1/2 absolute w-9 h-9 rounded-full font-mono text-sm font-bold flex items-center justify-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#D2A071] text-[#0B1422] ring-4 ring-[#D2A071]/40 scale-125 z-20 shadow-lg'
                                : isVisited
                                ? 'bg-emerald-900/90 text-emerald-200 border-2 border-emerald-400 hover:scale-110 z-10'
                                : 'bg-[#101E30]/95 text-[#F0EDE5] border-2 border-[#D2A071] hover:scale-110 z-10 shadow-md'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-3 bg-[#162A40] border-t border-[#AAB8C7]/15 grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {currentAnatomyParts.map((spot, idx) => (
                        <button
                          key={spot.id}
                          type="button"
                          onClick={() => handleSelectHotspot(idx)}
                          className={`p-3 rounded-lg text-left border transition-colors cursor-pointer ${
                            idx === selectedSpotIndex
                              ? 'bg-[#21374D] text-[#F0EDE5] border-[#D2A071]'
                              : 'bg-[#101E30] text-[#AAB8C7] border-[#AAB8C7]/15 hover:text-[#F0EDE5]'
                          }`}
                        >
                          <div className="flex items-center justify-between font-mono text-[13px] text-[#D2A071]">
                            <span>#{idx + 1}</span>
                            {inspectedPartIds[spot.id] && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                          </div>
                          <div className="font-sans text-sm font-medium mt-0.5 line-clamp-1">
                            {isEn ? spot.titleEn : spot.titleVi}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Warm Museum Ivory Engineering Breakdown Card */}
                <div className="lg:col-span-5 bg-[#F0EDE5] text-[#172233] rounded-xl border border-[#D2A071]/50 p-6 sm:p-7 shadow-xl space-y-5">
                  <div className="border-b border-[#172233]/15 pb-4 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-mono text-[13px] font-semibold text-[#8A4F24]">
                        {activePart.code}
                      </div>
                      {activeAnatomyTarget === 'surveyor-3' && (
                        <span className="px-2.5 py-0.5 bg-[#E6E0D3] border border-[#9E592C]/40 rounded-full font-mono text-[11px] font-semibold text-[#8A4F24]">
                          {isEn ? 'Demo Record' : 'Hồ sơ tư liệu mẫu'}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#172233] leading-snug">
                      {isEn ? activePart.titleEn : activePart.titleVi}
                    </h3>
                    <div className="text-sm font-medium text-[#3B4A5E]">
                      {isEn ? activePart.subsystemEn : activePart.subsystemVi}
                    </div>
                  </div>

                  {(activePart.locationVi || activePart.locationEn) && (
                    <div className="p-4 bg-[#E6E0D3] border-l-4 border-[#9E592C] rounded-r-lg">
                      <div className="font-mono text-[13px] font-bold text-[#8A4F24] mb-1">
                        {isEn ? 'PLACEMENT & ARCHITECTURE' : 'VỊ TRÍ LẮP ĐẶT QUAN TRỌNG'}
                      </div>
                      <p className="text-sm text-[#172233] leading-relaxed">
                        {isEn ? activePart.locationEn : activePart.locationVi}
                      </p>
                    </div>
                  )}

                  <div className="space-y-4 text-base leading-relaxed">
                    <div>
                      <div className="font-mono text-[13px] font-bold text-[#3B4A5E] uppercase mb-1">
                        {isEn ? 'Materials & Build' : 'Vật liệu & Cấu tạo'}
                      </div>
                      <p className="text-sm sm:text-base text-[#172233]">
                        {isEn ? activePart.materialsEn : activePart.materialsVi}
                      </p>
                    </div>

                    <div>
                      <div className="font-mono text-[13px] font-bold text-[#3B4A5E] uppercase mb-1">
                        {isEn ? 'Why NASA Built It This Way' : 'Vì sao cần bộ phận này?'}
                      </div>
                      <p className="text-sm sm:text-base text-[#172233]">
                        {isEn ? activePart.whyBuiltEn : activePart.whyBuiltVi}
                      </p>
                    </div>

                    <div>
                      <div className="font-mono text-[13px] font-bold text-[#3B4A5E] uppercase mb-1">
                        {isEn ? 'Real Mission Impact' : 'Kết quả Thực tế'}
                      </div>
                      <p className="text-sm sm:text-base text-[#172233]">
                        {isEn ? activePart.discoveredEn : activePart.discoveredVi}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#172233]/15 flex items-center justify-between font-mono text-[13px] text-[#3B4A5E]">
                    <span>{activePart.sourceIds.join(' · ')}</span>
                    <span>
                      {isEn
                        ? `Explored: ${Object.keys(inspectedPartIds).length} parts`
                        : `Đã xem: ${Object.keys(inspectedPartIds).length} bộ phận`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {renderTrackQuizSection(1)}

            <SimTrackExplanationFooter
              lang={lang}
              trackCode="TRACK 01"
              takeawayVi="Kỹ thuật chế tạo tàu vũ trụ NASA luôn đặt độ bền môi trường lên hàng đầu: giấu cảm biến hồng ngoại Mini-TES bên trong thân xe ấm WEB nhìn qua gương tiềm vọng, dùng bánh nhôm nguyên khối và khung Titan Rocker-Bogie cho địa hình Sao Hỏa, đồng thời khắc thông điệp nhân loại bền vững hàng tỷ năm lên Pioneer Plaque."
              takeawayEn="Spacecraft engineering prioritizes extreme survivability: sheltering Mini-TES inside the insulated WEB body via a mast periscope, relying on solid aluminum cleats with titanium Rocker-Bogie linkages, and engraving the Pioneer Plaque for billion-year interstellar endurance."
              dataUsedVi="Tọa độ điểm cấu trúc và thông số kỹ thuật từ JPL MER Handbook (SRC-OPP-01/03/05) và NASA Ames Pioneer 11 Documentation (SRC-PIO-02/04/05)."
              dataUsedEn="Subsystem placements and specifications from JPL MER Handbooks (SRC-OPP-01/03/05) and NASA Ames Pioneer 11 Documentation (SRC-PIO-02/04/05)."
              assumptionsVi="Các điểm đánh dấu (hotspot) căn theo góc nhìn chính diện ảnh tư liệu NASA; không tự động suy diễn vị trí bên trong khi chưa có bản vẽ cắt lớp."
              assumptionsEn="Hotspots align to documented reference imagery rather than unverified internal CAD slices."
              limitationsVi="Bản 2D giúp nhận diện chức năng; có thể mở rộng xem mô hình 3D MER-B chính thức trên cổng NASA Science."
              limitationsEn="2D pin explorer focuses on functional clarity; an external link leads to NASA’s official 3D MER-B viewer."
              journeyRoute="/hanh-trinh?mission=opportunity"
              dataRoute="/du-lieu?mission=opportunity"
              onNavigate={onNavigate}
            />
          </section>
        )}

        {/* -------------------------------------------------------------------
         * TRACK 02: LIGHT-TIME DELAY (t = d/c), TELEOPERATION & LASER RANGING
         * ------------------------------------------------------------------- */}
        {(activeTrackFilter === 'all' || activeTrackFilter === '2') && (
          <section
            id="track-02-signal-delay"
            className="bg-[#101E30] border border-[#AAB8C7]/20 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl space-y-8"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 font-mono text-[13px] font-semibold text-[#D2A071] uppercase">
                  <Radio className="w-4 h-4" />
                  <span>
                    {isEn
                      ? 'Challenge Track 02 · Speed-of-Light Delay & Laser Ranging'
                      : 'Thử thách 02 · Độ trễ Tín hiệu Ánh sáng & Đo đạc Laser'}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full font-mono text-[13px] border ${
                    trackCompletion[2]
                      ? 'bg-emerald-950/75 text-emerald-300 border-emerald-500/40'
                      : 'bg-[#162A40] text-[#D2A071] border-[#D2A071]/40'
                  }`}
                >
                  {trackCompletion[2]
                    ? isEn
                      ? 'Completed'
                      : 'Đã hoàn thành Thử thách 02'
                    : isEn
                    ? 'Goal: Transmit 1 Uplink Command & Solve 2 Questions'
                    : 'Mục tiêu: Gửi 1 lệnh mô phỏng & trả lời 2 câu hỏi'}
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-[36px] font-semibold text-[#F0EDE5] leading-tight">
                {isEn
                  ? 'Why can’t you drive a Mars rover with a joystick—and how does a lunar mirror measure millimeters?'
                  : 'Vì sao không thể dùng tay cầm điều khiển xe trên Sao Hỏa theo thời gian thực?'}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
                <div className="p-4 sm:p-5 bg-[#162A40] border border-[#D2A071]/30 rounded-xl space-y-1.5">
                  <div className="font-mono text-[13px] font-semibold text-[#D2A071]">
                    {isEn ? 'STEP 1 · THE CHALLENGE QUESTION' : 'BƯỚC 1 · KHÁM PHÁ BÀI TOÁN'}
                  </div>
                  <p className="text-base text-[#F0EDE5] leading-relaxed">
                    {isEn
                      ? 'Even radio waves traveling at c = 299,792 km/s fall far behind across the Solar System. How long does an emergency brake command actually take to reach Mars or Saturn—and how long for a laser to bounce back from Apollo 14 LRRR?'
                      : 'Ngay cả sóng vô tuyến chạy nhanh nhất vũ trụ (299.792 km/s) vẫn bị không gian sâu kìm chân. Một lệnh phanh khẩn cấp mất bao nhiêu phút tới Sao Hỏa hay Sao Thổ—và tia laser cần bao nhiêu giây để dội lại từ gương Apollo 14 LRRR?'}
                  </p>
                </div>

                <div className="p-4 sm:p-5 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl space-y-1.5">
                  <div className="font-mono text-[13px] font-semibold text-[#D2A071]">
                    {isEn ? 'STEP 2 · PHYSICS FORMULA (t = d / c)' : 'BƯỚC 2 · TÌM HIỂU CÔNG THỨC t = d / c'}
                  </div>
                  <p className="text-base text-[#AAB8C7] leading-relaxed">
                    {isEn
                      ? 'Earth–Moon averages ~384,400 km (~2.56 s round-trip). Mars varies between ~0.38 AU and ~2.67 AU (~3 to ~22 min one-way). Pioneer 11 at Saturn (~9.58 AU) faced ~72–87 min one-way lag, making pre-programmed autonomy essential.'
                      : 'Khoảng cách Trái Đất–Mặt Trăng là 384.400 km (~2,56 giây khứ hồi). Sao Hỏa thay đổi từ 0,38 AU tới 2,67 AU (trễ 3–22 phút một chiều). Pioneer 11 ở Sao Thổ (~9,58 AU) trễ 72–87 phút một chiều, buộc tàu phải tự thực hiện chuỗi lệnh lập trình sẵn.'}
                  </p>
                </div>
              </div>

              <SimChallengeStepRibbon
                lang={lang}
                simDone={track2SimDone}
                quizSolved={track2Quiz.solved}
                quizTotal={track2Quiz.total}
              />
            </div>

            {/* Step 3 Interactive Orbital & Command Delay Lab */}
            <div className="space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="font-mono text-[13px] font-semibold text-[#D2A071] uppercase">
                  {isEn
                    ? 'Step 3 · Interactive 2D Orbital Mechanics & Deep Space Network Uplink'
                    : 'Bước 3 · Mô phỏng Quỹ đạo 2D & Thử gửi Lệnh Điều khiển qua Mạng DSN'}
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'earth_mars' as const, vi: 'Trái Đất ↔ Sao Hỏa', en: 'Earth ↔ Mars' },
                    { id: 'earth_saturn' as const, vi: 'Trái Đất ↔ Sao Thổ', en: 'Earth ↔ Saturn' },
                    { id: 'earth_moon' as const, vi: 'Trái Đất ↔ Mặt Trăng (Surveyor 3 & LRRR)', en: 'Earth ↔ Moon (Surveyor 3 & LRRR)' }
                  ].map((sys) => (
                    <button
                      key={sys.id}
                      type="button"
                      onClick={() => {
                        setSelectedOrbitSystem(sys.id);
                        setTestedOrbitInteractions((c) => c + 1);
                      }}
                      className={`px-4 py-2 rounded-lg font-sans text-sm font-medium border transition-colors cursor-pointer ${
                        selectedOrbitSystem === sys.id
                          ? 'bg-[#D2A071] text-[#0B1422] border-[#D2A071] font-semibold'
                          : 'bg-[#162A40] text-[#F0EDE5] border-[#AAB8C7]/20 hover:bg-[#21374D]'
                      }`}
                    >
                      {isEn ? sys.en : sys.vi}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* 2D Orbital Map */}
                <div className="lg:col-span-7 relative bg-[#0B1422] border border-[#AAB8C7]/20 rounded-xl overflow-hidden aspect-[16/10] flex items-center justify-center">
                  <svg viewBox="0 0 500 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                    <line x1="0" y1="150" x2="500" y2="150" stroke="#21374D" strokeWidth="0.75" strokeDasharray="4 4" />
                    <line x1="250" y1="0" x2="250" y2="300" stroke="#21374D" strokeWidth="0.75" strokeDasharray="4 4" />

                    {selectedOrbitSystem === 'earth_mars' && (
                      <>
                        <circle cx="250" cy="150" r="75" fill="none" stroke="#60A5FA" strokeWidth="1.2" strokeOpacity="0.45" strokeDasharray="3 3" />
                        <text x="328" y="146" fill="#93C5FD" fontSize="9" fontFamily="monospace">
                          1.00 AU ({isEn ? 'Earth' : 'Trái Đất'})
                        </text>
                        <ellipse cx="250" cy="150" rx="120" ry="114" fill="none" stroke="#D2A071" strokeWidth="1.4" strokeOpacity="0.6" strokeDasharray="4 4" />
                        <text x="374" y="146" fill="#D2A071" fontSize="9" fontFamily="monospace">
                          1.52 AU ({isEn ? 'Mars' : 'Sao Hỏa'})
                        </text>
                      </>
                    )}

                    {selectedOrbitSystem === 'earth_saturn' && (
                      <>
                        <circle cx="250" cy="150" r="42" fill="none" stroke="#60A5FA" strokeWidth="1.2" strokeOpacity="0.45" strokeDasharray="3 3" />
                        <ellipse cx="250" cy="150" rx="185" ry="130" fill="none" stroke="#D2A071" strokeWidth="1.4" strokeOpacity="0.6" strokeDasharray="5 5" />
                        <text x="360" y="36" fill="#D2A071" fontSize="9" fontFamily="monospace">
                          9.58 AU ({isEn ? 'Saturn Orbit' : 'Quỹ đạo Sao Thổ'})
                        </text>
                      </>
                    )}

                    {selectedOrbitSystem === 'earth_moon' && (
                      <>
                        <circle cx="220" cy="150" r="90" fill="none" stroke="#AAB8C7" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="3 3" />
                        <text x="315" y="146" fill="#F0EDE5" fontSize="9" fontFamily="monospace">
                          384,400 km (Apollo LRRR)
                        </text>
                      </>
                    )}

                    {selectedOrbitSystem !== 'earth_moon' && (
                      <g>
                        <circle cx="250" cy="150" r="18" fill="#D2A071" opacity="0.22" />
                        <circle cx="250" cy="150" r="7" fill="#FDE68A" />
                        <text x="250" y="174" textAnchor="middle" fill="#FDE68A" fontSize="9" fontFamily="monospace">
                          {isEn ? 'SUN' : 'MẶT TRỜI'}
                        </text>
                      </g>
                    )}

                    <line
                      x1={ephemerisMetrics.earthPos.x}
                      y1={ephemerisMetrics.earthPos.y}
                      x2={ephemerisMetrics.targetPos.x}
                      y2={ephemerisMetrics.targetPos.y}
                      stroke={isPulseActive ? '#FDE68A' : '#60A5FA'}
                      strokeWidth={isPulseActive ? '3' : '1.6'}
                      strokeDasharray={isPulseActive ? '6 3' : '4 4'}
                    />

                    <g transform={`translate(${ephemerisMetrics.earthPos.x}, ${ephemerisMetrics.earthPos.y})`}>
                      <circle r="7" fill="#2563EB" stroke="#F0EDE5" strokeWidth="1.5" />
                      <text x="0" y="-12" textAnchor="middle" fill="#93C5FD" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                        {isEn ? 'EARTH (DSN)' : 'TRÁI ĐẤT'}
                      </text>
                    </g>

                    <g transform={`translate(${ephemerisMetrics.targetPos.x}, ${ephemerisMetrics.targetPos.y})`}>
                      <circle
                        r={selectedOrbitSystem === 'earth_saturn' ? '8' : '6.5'}
                        fill={
                          selectedOrbitSystem === 'earth_mars'
                            ? '#D2A071'
                            : selectedOrbitSystem === 'earth_saturn'
                            ? '#E5C396'
                            : '#AAB8C7'
                        }
                        stroke="#F0EDE5"
                        strokeWidth="1.5"
                      />
                      {selectedOrbitSystem === 'earth_saturn' && (
                        <ellipse rx="15" ry="3.5" fill="none" stroke="#F0EDE5" strokeWidth="1.2" transform="rotate(-18)" />
                      )}
                      <text x="0" y="-13" textAnchor="middle" fill="#F0EDE5" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                        {selectedOrbitSystem === 'earth_mars'
                          ? isEn
                            ? 'MARS'
                            : 'SAO HỎA'
                          : selectedOrbitSystem === 'earth_saturn'
                          ? isEn
                            ? 'SATURN'
                            : 'SAO THỔ'
                          : isEn
                          ? 'MOON (LRRR)'
                          : 'MẶT TRĂNG'}
                      </text>
                    </g>
                  </svg>

                  {selectedOrbitSystem !== 'earth_moon' && (
                    <button
                      type="button"
                      onClick={() => setIsAutoOrbit(!isAutoOrbit)}
                      className="absolute bottom-3 right-3 px-3.5 py-2 bg-[#162A40]/95 hover:bg-[#21374D] text-[#F0EDE5] border border-[#AAB8C7]/25 rounded-lg text-sm inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      {isAutoOrbit ? <Pause className="w-4 h-4 text-[#D2A071]" /> : <Play className="w-4 h-4 text-emerald-400" />}
                      <span>{isAutoOrbit ? (isEn ? 'Pause' : 'Dừng quay') : (isEn ? 'Play' : 'Chạy quỹ đạo')}</span>
                    </button>
                  )}
                </div>

                {/* Telemetry & Command Uplink Panel */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl space-y-4">
                    <div className="font-mono text-[13px] font-semibold text-[#D2A071]">
                      {isEn ? ephemerisMetrics.phaseEn : ephemerisMetrics.phaseVi}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 bg-[#101E30] border border-[#AAB8C7]/15 rounded-lg">
                        <div className="text-[13px] text-[#AAB8C7]">
                          {isEn ? 'Distance (d)' : 'Khoảng cách (d)'}
                        </div>
                        <div className="font-mono text-lg font-bold text-[#F0EDE5] mt-0.5">
                          {ephemerisMetrics.distanceAU} AU
                        </div>
                        <div className="font-mono text-[13px] text-[#AAB8C7]">
                          {Math.round(ephemerisMetrics.distanceKm).toLocaleString()} km
                        </div>
                      </div>

                      <div className="p-3.5 bg-[#101E30] border border-[#D2A071]/45 rounded-lg">
                        <div className="text-[13px] text-[#D2A071] font-medium">
                          {isEn ? 'One-Way Delay' : 'Độ trễ 1 chiều'}
                        </div>
                        <div className="font-mono text-lg font-bold text-[#D2A071] mt-0.5">
                          {formatTimeDuration(ephemerisMetrics.oneWaySec)}
                        </div>
                        <div className="font-mono text-[13px] text-[#AAB8C7]">
                          {isEn ? '2-Way:' : 'Khứ hồi:'} {formatTimeDuration(ephemerisMetrics.roundTripSec)}
                        </div>
                      </div>
                    </div>

                    {selectedOrbitSystem !== 'earth_moon' && (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-sm text-[#AAB8C7]">
                          <span>{isEn ? 'Orbital Phase Angle' : 'Góc lệch quỹ đạo'}</span>
                          <span className="font-mono text-[#F0EDE5]">{Math.round(orbitalAngle)}°</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={359}
                          value={orbitalAngle}
                          onChange={(e) => {
                            setIsAutoOrbit(false);
                            setOrbitalAngle(Number(e.target.value));
                            setTestedOrbitInteractions((c) => c + 1);
                          }}
                          className="w-full accent-[#D2A071] cursor-pointer"
                        />
                      </div>
                    )}

                    <p className="text-sm text-[#F0EDE5] leading-relaxed bg-[#101E30] p-3.5 rounded-lg border border-[#AAB8C7]/15">
                      {isEn ? ephemerisMetrics.noteEn : ephemerisMetrics.noteVi}
                    </p>

                    <div className="space-y-2">
                      <div className="font-mono text-[13px] text-[#D2A071] font-semibold">
                        {isEn ? 'TEST COMMAND TRANSMISSION:' : 'THỬ PHÁT LỆNH TỪ TRÁI ĐẤT:'}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { vi: 'Phanh Khẩn Cấp', en: 'Emergency Brake' },
                          { vi: 'Lái Tự Hành AutoNav', en: 'AutoNav Drive' },
                          { vi: 'Bắn Laser LRRR', en: 'Fire LRRR Laser' },
                          { vi: 'Đào Rãnh Đất 18cm', en: 'Dig 18 cm Trench' },
                          { vi: 'Quét Ảnh TV 600 Dòng', en: 'Scan 600-Line TV' },
                          { vi: 'Ghi Phổ Kế APXS', en: 'Sample APXS' }
                        ].map((cmd) => (
                          <button
                            key={cmd.en}
                            type="button"
                            onClick={() => handleTriggerCommand(cmd.vi, cmd.en)}
                            className="px-3 py-2.5 bg-[#21374D] hover:bg-[#2c4763] text-[#F0EDE5] border border-[#AAB8C7]/25 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                          >
                            {isEn ? cmd.en : cmd.vi}
                          </button>
                        ))}
                      </div>

                      {uplinkCommand && (
                        <div className="p-3 bg-[#0B1422] border border-[#D2A071]/50 rounded-lg text-sm text-[#F0EDE5]">
                          {isEn
                            ? `Transmitting "${uplinkCommand}" → Total confirmation round-trip waits ${formatTimeDuration(
                                ephemerisMetrics.roundTripSec
                              )}.`
                            : `Đang truyền lệnh "${uplinkCommand}" → Phải chờ ${formatTimeDuration(
                                ephemerisMetrics.roundTripSec
                              )} mới nhận được xác nhận từ tàu!`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-Module 2B: Surveyor 3 Lunar Soil Bearing & Radar Double-Bounce Lab */}
              <div className="p-6 bg-[#162A40] border border-[#D2A071]/35 rounded-xl space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="font-mono text-[12px] font-semibold uppercase tracking-wider text-[#D2A071]">
                      {isEn
                        ? 'LUNAR SURFACE MECHANICS & TELEOPERATION LAB · SURVEYOR 3 (DEMO RECORD)'
                        : 'PHÒNG THÍ NGHIỆM CƠ HỌC ĐẤT & HẠ CÁNH MẶT TRĂNG · SURVEYOR 3 (HỒ SƠ MẪU)'}
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#F0EDE5] mt-1">
                      {isEn
                        ? 'Surface Sampler Trench Depth (~18 cm) vs. 1967 Radar Double-Bounce Recovery'
                        : 'Thử nghiệm Đào rãnh đất 18 cm (Apollo Bearing Check) & Sự cố Radar Nảy 2 lần'}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#D2A071]/15 border border-[#D2A071]/40 font-mono text-[12px] font-semibold text-[#D2A071]">
                    t ≈ 2.56s {isEn ? 'Earth–Moon Loop' : 'Khứ hồi'}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Soil Trench Depth Simulator */}
                  <div className="lg:col-span-6 p-5 bg-[#0B1422] border border-[#AAB8C7]/20 rounded-xl space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[13px] font-semibold text-[#D2A071]">
                        {isEn ? 'SURFACE SAMPLER TRENCH DEPTH' : 'ĐỘ SÂU RÃNH ĐÀO ĐẤT MẶT TRĂNG'}
                      </span>
                      <span className="font-mono text-base font-bold text-[#F0EDE5]">
                        {scoopDepthCm} cm <span className="text-xs text-[#AAB8C7]">/ 18 cm max</span>
                      </span>
                    </div>

                    <input
                      type="range"
                      min={2}
                      max={18}
                      step={1}
                      value={scoopDepthCm}
                      onChange={(e) => {
                        setScoopDepthCm(Number(e.target.value));
                        setTestedOrbitInteractions((c) => c + 1);
                      }}
                      className="w-full accent-[#D2A071] cursor-pointer"
                    />

                    {/* Visual Regolith Cross-Section Bar */}
                    <div className="p-3.5 rounded-lg bg-[#101E30] border border-[#AAB8C7]/15 space-y-2.5">
                      <div className="flex items-center justify-between text-xs font-mono text-[#AAB8C7]">
                        <span>{isEn ? '0 cm (Loose Surface Dust)' : '0 cm (Bụi mặt xốp)'}</span>
                        <span>{isEn ? '18 cm (Compacted Regolith)' : '18 cm (Đất nén chặt)'}</span>
                      </div>
                      <div className="h-5 w-full rounded-md bg-[#0B1422] overflow-hidden border border-[#AAB8C7]/20 flex">
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${(scoopDepthCm / 18) * 100}%`,
                            background: soilMetrics.safeForApollo
                              ? 'linear-gradient(90deg, #D2A071 0%, #34D399 100%)'
                              : '#F43F5E'
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                        <div className="p-2 rounded bg-[#0B1422]/80 border border-[#AAB8C7]/15">
                          <div className="text-[11px] text-[#AAB8C7]">{isEn ? 'Soil Bearing' : 'Sức chịu tải'}</div>
                          <div className="text-sm font-bold text-[#F0EDE5]">{soilMetrics.bearingPsi} psi</div>
                        </div>
                        <div className="p-2 rounded bg-[#0B1422]/80 border border-[#AAB8C7]/15">
                          <div className="text-[11px] text-[#AAB8C7]">{isEn ? 'Apollo LM Load' : 'Tải tàu Apollo'}</div>
                          <div className="text-sm font-bold text-[#D2A071]">~{soilMetrics.apolloLanderPsi} psi</div>
                        </div>
                        <div className="p-2 rounded bg-[#0B1422]/80 border border-emerald-500/35">
                          <div className="text-[11px] text-[#AAB8C7]">{isEn ? 'Safety Factor' : 'Hệ số an toàn'}</div>
                          <div className={`text-sm font-bold ${soilMetrics.safeForApollo ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {soilMetrics.safetyMargin}× {soilMetrics.safeForApollo ? 'OK' : 'LOW'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#AAB8C7] leading-relaxed">
                      {isEn
                        ? 'Surveyor 3 dug four trenches up to ~18 cm deep across ~1.5 m reach (SRC-SUR-01/02), proving that beneath a thin fluffy top layer, lunar regolith supports crewed Apollo landings cleanly.'
                        : 'Cánh tay SMSS vươn ~1,5 m đã đào 4 rãnh sâu tới ~18 cm (SRC-SUR-01/02), chứng minh chỉ vài cm bên dưới lớp bụi mịn là tầng đất cứng vững vượt xa tải trọng ~2 psi của chân tàu Apollo.'}
                    </p>
                  </div>

                  {/* 1967 Radar Double-Bounce Interactive Toggle */}
                  <div className="lg:col-span-6 p-5 bg-[#0B1422] border border-[#AAB8C7]/20 rounded-xl space-y-4">
                    <div className="font-mono text-[13px] font-semibold text-[#D2A071]">
                      {isEn ? '1967-04-20 LANDING TELEMETRY SIMULATION' : 'MÔ PHỎNG SỰ CỐ RADAR HẠ CÁNH (20/04/1967)'}
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setRadarCutoffMode('auto_anomaly');
                          setTestedOrbitInteractions((c) => c + 1);
                        }}
                        className={`px-3 py-2.5 rounded-lg text-left text-xs sm:text-sm font-medium border transition-colors cursor-pointer ${
                          radarCutoffMode === 'auto_anomaly'
                            ? 'bg-[#D2A071] text-[#0B1422] border-[#D2A071] font-semibold'
                            : 'bg-[#162A40] text-[#F0EDE5] border-[#AAB8C7]/25 hover:bg-[#21374D]'
                        }`}
                      >
                        {isEn ? 'Auto Radar Glare (2 Bounces)' : 'Radar nhiễu sáng (Nảy 2 lần)'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setRadarCutoffMode('manual_cutoff');
                          setTestedOrbitInteractions((c) => c + 1);
                        }}
                        className={`px-3 py-2.5 rounded-lg text-left text-xs sm:text-sm font-medium border transition-colors cursor-pointer ${
                          radarCutoffMode === 'manual_cutoff'
                            ? 'bg-emerald-400 text-[#0B1422] border-emerald-400 font-semibold'
                            : 'bg-[#162A40] text-[#F0EDE5] border-[#AAB8C7]/25 hover:bg-[#21374D]'
                        }`}
                      >
                        {isEn ? 'Earth Cutoff Command (~3.4 m)' : 'Lệnh cắt động cơ từ Trái Đất (~3,4 m)'}
                      </button>
                    </div>

                    <div className="p-4 rounded-lg bg-[#101E30] border border-[#AAB8C7]/20 space-y-2.5">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-[#AAB8C7]">
                          {radarCutoffMode === 'auto_anomaly'
                            ? isEn ? 'STATE: VERNIER THRUSTERS FIRING AT TOUCHDOWN' : 'TRẠNG THÁI: ĐỘNG CƠ VERNIER CHƯA TẮT'
                            : isEn ? 'STATE: ENGINE CUTOFF EXECUTED BY DSN' : 'TRẠNG THÁI: TẮT ĐỘNG CƠ · ĐỨNG VỮNG'}
                        </span>
                        <span className={radarCutoffMode === 'auto_anomaly' ? 'text-amber-300 font-bold' : 'text-emerald-300 font-bold'}>
                          {radarCutoffMode === 'auto_anomaly' ? '10 m → 3 m BOUNCE' : '12° CRATER SLOPE OK'}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center">
                        <div className="p-2 rounded bg-[#0B1422]/80 border border-[#AAB8C7]/15">
                          <div className="text-[#AAB8C7]">{isEn ? 'Target Cutoff' : 'Cắt chuẩn'}</div>
                          <div className="text-[#F0EDE5] font-bold">4.3 m</div>
                        </div>
                        <div className="p-2 rounded bg-[#0B1422]/80 border border-[#AAB8C7]/15">
                          <div className="text-[#AAB8C7]">{isEn ? 'Bounce Peak' : 'Độ nảy'}</div>
                          <div className="text-[#D2A071] font-bold">
                            {radarCutoffMode === 'auto_anomaly' ? '10 m & 3 m' : '0 m (Settled)'}
                          </div>
                        </div>
                        <div className="p-2 rounded bg-[#0B1422]/80 border border-[#AAB8C7]/15">
                          <div className="text-[#AAB8C7]">{isEn ? 'Final Slope' : 'Độ nghiêng'}</div>
                          <div className="text-emerald-300 font-bold">~12° Crater</div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#AAB8C7] leading-relaxed">
                      {radarCutoffMode === 'auto_anomaly'
                        ? isEn
                          ? 'Bright crater glare disrupted Doppler radar lock near 4.3 m, leaving vernier thrusters active through two touchdowns (~10 m & ~3 m bounces)!'
                          : 'Ánh sáng phản xạ từ rìa miệng hố làm radar mất khóa gần mốc 4,3 m: động cơ tinh chỉnh tiếp tục đẩy tàu nảy vọt lên 10 m rồi 3 m!'
                        : isEn
                          ? 'Because Earth–Moon round-trip delay is only ~2.56 seconds, NASA engineers transmitted a timely emergency engine cutoff command at ~3.4 m altitude before tip-over!'
                          : 'Vì trễ khứ hồi Trái Đất–Mặt Trăng chỉ ~2,56 giây, kỹ sư mặt đất kịp phát lệnh ngắt động cơ thủ công ở độ cao ~3,4 m, cứu tàu đứng vững trên sườn dốc 12°!'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {renderTrackQuizSection(2)}

            <SimTrackExplanationFooter
              lang={lang}
              trackCode="TRACK 02"
              takeawayVi="Tốc độ ánh sáng là giới hạn tuyệt đối của tự nhiên (299.792,458 km/s). Ở cự ly Mặt Trăng, trễ khứ hồi 2,56 giây giúp ta đo khoảng cách chuẩn tới từng milimet bằng gương Apollo LRRR. Nhưng tới Sao Hỏa (6–45 phút khứ hồi) và Sao Thổ (gần 3 giờ khứ hồi), mọi rover và tàu thăm dò đều bắt buộc phải tự hành thông minh."
              takeawayEn="The finite speed of light (299,792.458 km/s) makes real-time human steering impossible beyond the Moon. Apollo LRRR harnesses the ~2.56-second laser round-trip for millimeter science, while Mars rovers and outer-planet probes rely on autonomy and pre-scheduled command sequences."
              dataUsedVi="Bán trục lớn quỹ đạo Trái Đất (1,00 AU), Sao Hỏa (1,524 AU), Sao Thổ (9,58 AU), cự ly Mặt Trăng (384.400 km) và hằng số c từ NASA Deep Space Network (SRC-LRR-01, SRC-OPP-01, SRC-PIO-01)."
              dataUsedEn="Standard NASA semi-major radii, 384,400 km Earth–Moon distance, and c = 299,792.458 km/s (SRC-LRR-01, SRC-OPP-01, SRC-PIO-01)."
              assumptionsVi="Quỹ đạo Trái Đất–Sao Hỏa–Sao Thổ chiếu trên mặt phẳng hoàng đạo 2D; tốc độ truyền sóng tính trong chân không lý tưởng."
              assumptionsEn="Planetary orbits projected onto a simplified 2D ecliptic plane assuming vacuum light propagation."
              limitationsVi="Không thay thế bảng lịch thiên văn JPL Horizons DE440 theo ngày cụ thể, nhưng giữ chuẩn tỷ lệ thời gian trễ vật lý."
              limitationsEn="Pedagogical 2D ephemeris illustrates accurate magnitude scaling rather than exact epoch JPL Horizons DE440 tables."
              journeyRoute="/hanh-trinh?mission=pioneer-11"
              dataRoute="/du-lieu?mission=apollo-lrrr"
              onNavigate={onNavigate}
            />
          </section>
        )}

        {/* -------------------------------------------------------------------
         * TRACK 03: INVERSE-SQUARE SOLAR FLUX (1/r²), DUST STORMS & RTG POWER
         * ------------------------------------------------------------------- */}
        {(activeTrackFilter === 'all' || activeTrackFilter === '3') && (
          <section
            id="track-03-power-dust"
            className="bg-[#101E30] border border-[#AAB8C7]/20 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl space-y-8"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 font-mono text-[13px] font-semibold text-[#D2A071] uppercase">
                  <Zap className="w-4 h-4" />
                  <span>
                    {isEn
                      ? 'Challenge Track 03 · 1/r² Sunlight Decay, Mars Dust τ & RTG Power'
                      : 'Thử thách 03 · Suy giảm Ánh sáng 1/r², Bão bụi Sao Hỏa & Nguồn RTG'}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full font-mono text-[13px] border ${
                    trackCompletion[3]
                      ? 'bg-emerald-950/75 text-emerald-300 border-emerald-500/40'
                      : 'bg-[#162A40] text-[#D2A071] border-[#D2A071]/40'
                  }`}
                >
                  {trackCompletion[3]
                    ? isEn
                      ? 'Completed'
                      : 'Đã hoàn thành Thử thách 03'
                    : isEn
                    ? 'Goal: Adjust Distance/Dust & Solve 2 Questions'
                    : 'Mục tiêu: Thử chỉnh cự ly/bão bụi & trả lời 2 câu hỏi'}
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-[36px] font-semibold text-[#F0EDE5] leading-tight">
                {isEn
                  ? 'Why did Opportunity survive 5,111 sols until a dust storm—while Pioneer 11 ignored darkness at Saturn?'
                  : 'Vì sao bão bụi 2018 đánh gục Opportunity sau 5.111 sol, còn Pioneer 11 vẫn hoạt động nơi bóng tối Sao Thổ?'}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
                <div className="p-4 sm:p-5 bg-[#162A40] border border-[#D2A071]/30 rounded-xl space-y-1.5">
                  <div className="font-mono text-[13px] font-semibold text-[#D2A071]">
                    {isEn ? 'STEP 1 · THE CHALLENGE QUESTION' : 'BƯỚC 1 · KHÁM PHÁ BÀI TOÁN'}
                  </div>
                  <p className="text-base text-[#F0EDE5] leading-relaxed">
                    {isEn
                      ? 'Sunlight fades with the square of distance (1/r²) and vanishes under thick Martian dust (τ ≈ 10.8). Compare how solar panels behave against plutonium SNAP-19 RTG generators and passive 0W Apollo mirrors.'
                      : 'Ánh nắng giảm theo bình phương khoảng cách (1/r²) và bị che khuất bởi bão bụi (τ ≈ 10,8). Hãy kéo thanh trượt để quan sát lúc tấm pin của Opportunity sụt xuống dưới ngưỡng sinh tồn 150 Wh/sol so với máy phát hạt nhân SNAP-19 RTG của Pioneer 11.'}
                  </p>
                </div>

                <div className="p-4 sm:p-5 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl space-y-1.5">
                  <div className="font-mono text-[13px] font-semibold text-[#D2A071]">
                    {isEn ? 'STEP 2 · ENERGY PHYSICS (S = 1361 / r²)' : 'BƯỚC 2 · TÌM HIỂU NĂNG LƯỢNG KHÔNG GIAN'}
                  </div>
                  <p className="text-base text-[#AAB8C7] leading-relaxed">
                    {isEn
                      ? 'Opportunity drove 45.16 km over 5,111 sols (vs 90 sols planned); its last signal arrived 2018-06-10 and mission ended 2019-02-13. At Saturn (9.58 AU), sunlight drops to ~1.1% of Earth’s, making solar panels useless without RTGs.'
                      : 'Opportunity thiết kế cho 90 sol nhưng đi được 45,16 km suốt 5.111 sol tới liên lạc cuối ngày 10/06/2018 (kết thúc sứ mệnh 13/02/2019). Ở Sao Thổ (9,58 AU), nắng chỉ còn ~1,1% Trái Đất nên Pioneer 11 cần 4 lò SNAP-19 RTG; còn Apollo LRRR hoàn toàn thụ động (0 Watt).'}
                  </p>
                </div>
              </div>

              <SimChallengeStepRibbon
                lang={lang}
                simDone={track3SimDone}
                quizSolved={track3Quiz.solved}
                quizTotal={track3Quiz.total}
              />
            </div>

            {/* Step 3 Interactive Solar Flux & Dust Lab */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Sliders Column */}
              <div className="lg:col-span-5 p-6 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl space-y-6">
                <div className="font-mono text-[13px] font-semibold text-[#D2A071] uppercase">
                  {isEn ? 'Step 3 · Adjust Distance (r) & Dust Storm (τ)' : 'Bước 3 · Chỉnh Khoảng cách r & Bão bụi τ'}
                </div>

                {/* Preset Buttons */}
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { label: isEn ? 'Earth (1.0 AU)' : 'Trái Đất (1,00 AU)', au: 1.0, tau: 0.5 },
                    { label: isEn ? 'Clear Mars (1.52 AU)' : 'Sao Hỏa Trời quang (1,52)', au: 1.52, tau: 0.5 },
                    { label: isEn ? '2018 Dust Storm (τ 10.8)' : 'Bão bụi 2018 (τ 10,8)', au: 1.52, tau: 10.8 },
                    { label: isEn ? 'Saturn (9.58 AU)' : 'Sao Thổ Pioneer 11 (9,58)', au: 9.58, tau: 0.5 }
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        setHeliocentricAU(p.au);
                        setMarsDustTau(p.tau);
                        setLunarNightMode(false);
                        setTestedSolarLab(true);
                      }}
                      className={`px-3 py-2.5 border rounded-lg text-sm font-medium text-left transition-colors cursor-pointer ${
                        !lunarNightMode &&
                        Math.abs(heliocentricAU - p.au) < 0.02 &&
                        Math.abs(marsDustTau - p.tau) < 0.2
                          ? 'bg-[#D2A071] text-[#0B1422] border-[#D2A071] font-semibold'
                          : 'bg-[#101E30] hover:bg-[#21374D] border-[#AAB8C7]/25 hover:border-[#D2A071] text-[#F0EDE5]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setHeliocentricAU(1.0);
                      setMarsDustTau(0.5);
                      setLunarNightMode(true);
                      setTestedSolarLab(true);
                    }}
                    className={`col-span-2 px-3 py-2.5 border rounded-lg text-sm font-medium text-left transition-colors cursor-pointer ${
                      lunarNightMode
                        ? 'bg-[#D2A071] text-[#0B1422] border-[#D2A071] font-semibold'
                        : 'bg-[#101E30] hover:bg-[#21374D] border-[#D2A071]/40 text-[#F0EDE5]'
                    }`}
                  >
                    {isEn
                      ? 'Moon: 14-Day Lunar Night -150°C · Surveyor 3 Battery Cutoff (1967-05-04)'
                      : 'Mặt Trăng: Đêm 14 ngày -150°C · Surveyor 3 cạn ắc-quy (04/05/1967)'}
                  </button>
                </div>

                {/* Distance Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#AAB8C7]">{isEn ? 'Distance from Sun (r):' : 'Khoảng cách tới Mặt Trời (r):'}</span>
                    <span className="font-mono font-bold text-[#D2A071]">{heliocentricAU.toFixed(2)} AU</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={10.0}
                    step={0.05}
                    value={heliocentricAU}
                    onChange={(e) => {
                      setLunarNightMode(false);
                      setHeliocentricAU(Number(e.target.value));
                      setTestedSolarLab(true);
                    }}
                    className="w-full accent-[#D2A071] cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[13px] text-[#AAB8C7]">
                    <span>0.5 AU</span>
                    <span>1.52 Mars</span>
                    <span>5.2 Jupiter</span>
                    <span>9.58 Saturn</span>
                  </div>
                </div>

                {/* Mars Dust τ Slider */}
                <div className="space-y-2 pt-2 border-t border-[#AAB8C7]/15">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#AAB8C7]">{isEn ? 'Mars Dust Optical Depth (τ):' : 'Độ dày bụi Sao Hỏa (τ):'}</span>
                    <span className="font-mono font-bold text-[#F0EDE5]">{marsDustTau.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={10.8}
                    step={0.1}
                    value={marsDustTau}
                    onChange={(e) => {
                      setLunarNightMode(false);
                      setHeliocentricAU(1.52);
                      setMarsDustTau(Number(e.target.value));
                      setTestedSolarLab(true);
                    }}
                    className="w-full accent-[#D2A071] cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[13px] text-[#AAB8C7]">
                    <span>τ 0.5 ({isEn ? 'Clear' : 'Trời quang'})</span>
                    <span>τ 5.0</span>
                    <span>τ 10.8 ({isEn ? '2018 Storm' : 'Bão 2018'})</span>
                  </div>
                </div>
              </div>

              {/* Live Comparison Readouts Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl">
                    <div className="text-[13px] text-[#AAB8C7]">
                      {isEn ? 'Solar Constant S(r)' : 'Quang thông ngoài trời S(r)'}
                    </div>
                    <div className="font-mono text-2xl font-bold text-[#F0EDE5] mt-1">
                      {solarPowerMetrics.topOfAtmosphereFlux} W/m²
                    </div>
                    <div className="font-mono text-[13px] text-[#D2A071] mt-1">
                      {solarPowerMetrics.percentOfEarth}% {isEn ? 'of Earth' : 'so với Trái Đất'}
                    </div>
                  </div>

                  <div className="p-4 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl">
                    <div className="text-[13px] text-[#AAB8C7]">
                      {isEn ? 'Surface Solar Flux' : 'Quang thông tới pin mặt trời'}
                    </div>
                    <div className="font-mono text-2xl font-bold text-[#F0EDE5] mt-1">
                      {solarPowerMetrics.effectiveSurfaceFlux} W/m²
                    </div>
                    <div className="text-[13px] text-[#AAB8C7] mt-1">
                      {lunarNightMode
                        ? isEn
                          ? 'Lunar Night (~-150°C · 0 W/m²)'
                          : 'Đêm Mặt Trăng (~-150°C · 0 W/m²)'
                        : solarPowerMetrics.isNearMars
                        ? `${isEn ? 'Mars Dust τ =' : 'Áp dụng bụi τ ='} ${marsDustTau.toFixed(1)}`
                        : isEn
                        ? 'Vacuum (No Mars dust)'
                        : 'Ngoài Sao Hỏa'}
                    </div>
                  </div>

                  <div
                    className={`p-4 border rounded-xl ${
                      lunarNightMode || solarPowerMetrics.estimatedOpportunityWh < 150
                        ? 'bg-rose-950/50 border-rose-400/50'
                        : 'bg-emerald-950/40 border-emerald-400/40'
                    }`}
                  >
                    <div className="text-[13px] text-[#F0EDE5]">
                      {lunarNightMode
                        ? isEn
                          ? 'Lunar Solar & Ag-Zn Battery'
                          : 'Pin Mặt Trời & Ắc-quy Mặt Trăng'
                        : isEn
                        ? 'Opportunity Solar Output'
                        : 'Điện năng Opportunity'}
                    </div>
                    <div className="font-mono text-2xl font-bold text-[#F0EDE5] mt-1">
                      {lunarNightMode ? '0 W (~-150°C)' : `~${solarPowerMetrics.estimatedOpportunityWh} Wh/sol`}
                    </div>
                    <div className="font-mono text-[13px] mt-1 text-[#F0EDE5]">
                      {lunarNightMode
                        ? isEn
                          ? 'LUNAR NIGHT CUTOFF (1967-05-04)'
                          : 'CẠN ẮC-QUY ĐÊM LẠNH (04/05/1967)'
                        : solarPowerMetrics.estimatedOpportunityWh < 150
                        ? isEn
                          ? 'LOW POWER FAULT (<150 Wh)'
                          : 'NGUY HIỂM · NGỦ ĐÔNG (<150 Wh)'
                        : isEn
                        ? 'Nominal Rover Ops'
                        : 'Đủ điện vận hành'}
                    </div>
                  </div>
                </div>

                {/* Comparison Cards */}
                <div className="p-5 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-sans text-base font-semibold text-[#F0EDE5]">
                      {isEn
                        ? 'NASA Power Architectures: Mars Solar vs. Lunar Battery vs. RTG vs. Passive LRRR'
                        : 'So sánh 4 kiến trúc năng lượng NASA'}
                    </span>
                    <span className="font-mono text-[13px] text-emerald-300">
                      {isEn ? 'RTG unaffected by distance or dust' : 'RTG & LRRR miễn nhiễm bão bụi'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="p-3.5 bg-[#101E30] border border-[#AAB8C7]/15 rounded-lg space-y-1">
                      <div className="font-mono text-[13px] font-bold text-[#D2A071]">OPPORTUNITY (GaAs SOLAR)</div>
                      <p className="text-[#AAB8C7] leading-relaxed">
                        {isEn
                          ? 'Gained clean air from Martian winds for 14+ years, then fell silent when τ ≈ 10.8 blocked sunlight in June 2018.'
                          : 'Nhờ gió Sao Hỏa thổi sạch bụi, xe trụ 5.111 sol rồi ngưng khi bão bụi τ ≈ 10,8 che kín bầu trời tháng 06/2018.'}
                      </p>
                    </div>
                    <div className="p-3.5 bg-[#101E30] border border-[#D2A071]/40 rounded-lg space-y-1">
                      <div className="font-mono text-[13px] font-bold text-[#D2A071]">
                        {isEn ? 'SURVEYOR 3 (SOLAR + Ag-Zn BATTERY · DEMO)' : 'SURVEYOR 3 (PIN + ẮC-QUY Ag-Zn · MẪU)'}
                      </div>
                      <p className="text-[#AAB8C7] leading-relaxed">
                        {isEn
                          ? 'Silicon panel (~85 W) powered 6,326 TV frames in daylight, then fell permanently silent on 1967-05-04 in the ~-150°C 14-day lunar night.'
                          : 'Tấm pin silicon (~85W) nuôi tàu suốt ban ngày (6.326 ảnh), rồi tắt liên lạc ngày 04/05/1967 khi đêm Mặt Trăng 14 ngày lạnh ~-150°C.'}
                      </p>
                    </div>
                    <div className="p-3.5 bg-[#101E30] border border-[#D2A071]/40 rounded-lg space-y-1">
                      <div className="font-mono text-[13px] font-bold text-[#D2A071]">PIONEER 11 (4× SNAP-19 RTG)</div>
                      <p className="text-[#AAB8C7] leading-relaxed">
                        {isEn
                          ? 'Pu-238 decay yielded ~165 W at launch (decayed to ~100 W at Saturn 9.58 AU), independent of sunlight.'
                          : 'Nhiệt phân rã Plutonium-238 cấp điện liên tục từ 165W còn ~100W khi qua Sao Thổ, độc lập với Mặt Trời.'}
                      </p>
                    </div>
                    <div className="p-3.5 bg-[#101E30] border border-emerald-500/35 rounded-lg space-y-1">
                      <div className="font-mono text-[13px] font-bold text-emerald-300">APOLLO 14 LRRR (0 WATT)</div>
                      <p className="text-[#AAB8C7] leading-relaxed">
                        {isEn
                          ? '100 fused-silica corner cubes need zero electricity and remain measurable 55+ years after Apollo.'
                          : '100 lăng kính thạch anh thụ động hoàn toàn (0W), vẫn phản xạ tia laser từ Trái Đất sau hơn nửa thế kỷ.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {renderTrackQuizSection(3)}

            <SimTrackExplanationFooter
              lang={lang}
              trackCode="TRACK 03"
              takeawayVi="Định luật bình phương nghịch đảo 1/r² lý giải ranh giới công nghệ của NASA: hành tinh vòng trong như Sao Hỏa (1,52 AU) có thể dùng pin mặt trời nhưng chịu rủi ro bão bụi (τ ≈ 10,8 kết thúc Opportunity); từ Sao Mộc trở ra (5,2–9,58 AU), năng lượng hạt nhân RTG là chìa khóa sống còn; riêng thiết bị thụ động như Apollo LRRR tồn tại 0 Watt hàng thập kỷ."
              takeawayEn="The 1/r² inverse-square law defines NASA spacecraft power architecture: solar arrays work at Mars until global dust events (τ ≈ 10.8), RTGs sustain deep-space probes past Jupiter and Saturn, and passive optical corner-cubes need 0 Watts."
              dataUsedVi="Hằng số Mặt Trời S₀ = 1361 W/m², thông số Opportunity (90 sol kế hoạch, 45,16 km, 10/06/2018 & 13/02/2019, τ ≈ 10,8) và Pioneer 11 SNAP-19 RTG (SRC-OPP-04, SRC-PIO-03, SRC-LRR-01)."
              dataUsedEn="Solar constant S₀ = 1361 W/m², Opportunity odometry & 2018 storm τ ≈ 10.8, and Pioneer 11 SNAP-19 RTG benchmarks (SRC-OPP-04, SRC-PIO-03, SRC-LRR-01)."
              assumptionsVi="Độ suy giảm ánh sáng bởi bụi Sao Hỏa dùng mô hình hàm mũ giáo dục chuẩn hóa theo mức năng lượng sinh tồn 150 Wh/sol."
              assumptionsEn="Martian dust attenuation applies a pedagogical Beer-Lambert scaling anchored to Opportunity’s 150 Wh/sol critical threshold."
              limitationsVi="Không mô phỏng chi tiết tán xạ hạt bụi 3D theo góc Mặt Trời trong từng ngày (sol)."
              limitationsEn="Does not simulate seasonal diurnal solar zenith variations or 3D Mie scattering."
              journeyRoute="/hanh-trinh?mission=opportunity"
              dataRoute="/du-lieu?mission=opportunity"
              onNavigate={onNavigate}
            />
          </section>
        )}

        {/* -------------------------------------------------------------------
         * TRACK 04: SPACE ARCHAEOLOGY & MISSION CHRONOLOGY SORTER
         * ------------------------------------------------------------------- */}
        {(activeTrackFilter === 'all' || activeTrackFilter === '4') && (
          <section
            id="track-04-chronology"
            className="bg-[#101E30] border border-[#AAB8C7]/20 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl space-y-8"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 font-mono text-[13px] font-semibold text-[#D2A071] uppercase">
                  <Milestone className="w-4 h-4" />
                  <span>
                    {isEn
                      ? 'Challenge Track 04 · Space Archaeology & Mission Chronology'
                      : 'Thử thách 04 · Khảo cổ học Không gian & Dòng thời gian Lịch sử'}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full font-mono text-[13px] border ${
                    trackCompletion[4]
                      ? 'bg-emerald-950/75 text-emerald-300 border-emerald-500/40'
                      : 'bg-[#162A40] text-[#D2A071] border-[#D2A071]/40'
                  }`}
                >
                  {trackCompletion[4]
                    ? isEn
                      ? 'Completed'
                      : 'Đã hoàn thành Thử thách 04'
                    : isEn
                    ? 'Goal: Sort All 6 Milestones & Solve 2 Questions'
                    : 'Mục tiêu: Sắp xếp đúng 6 mốc & trả lời 2 câu hỏi'}
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-[36px] font-semibold text-[#F0EDE5] leading-tight">
                {isEn
                  ? 'Reconstruct NASA’s exploration timeline—and avoid the classic myths around Surveyor 3, Viking 1 & Sojourner'
                  : 'Khôi phục dòng thời gian sứ mệnh & phân biệt đúng các cột mốc Surveyor 3, Viking 1, Sojourner'}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
                <div className="p-4 sm:p-5 bg-[#162A40] border border-[#D2A071]/30 rounded-xl space-y-1.5">
                  <div className="font-mono text-[13px] font-semibold text-[#D2A071]">
                    {isEn ? 'STEP 1 · THE CHALLENGE QUESTION' : 'BƯỚC 1 · KHÁM PHÁ BÀI TOÁN'}
                  </div>
                  <p className="text-base text-[#F0EDE5] leading-relaxed">
                    {isEn
                      ? 'Can you place all six mission events of Opportunity (2003–2019) or Pioneer 11 (1973–1995) in exact chronological order, accounting for UTC vs PDT conventions and distinguishing spacecraft roles accurately?'
                      : 'Bạn có thể sắp xếp đúng trình tự 6 sự kiện lịch sử của Opportunity (2003–2019) hoặc Pioneer 11 (1973–1995) từ lúc phóng đến tín hiệu cuối cùng, đồng thời nắm vững câu chuyện phi hành gia Apollo 12 ghé thăm Surveyor 3 hay vai trò của Viking 1 & Sojourner?'}
                  </p>
                </div>

                <div className="p-4 sm:p-5 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl space-y-1.5">
                  <div className="font-mono text-[13px] font-semibold text-[#D2A071]">
                    {isEn ? 'STEP 2 · HISTORICAL ACCURACY HIGHLIGHTS' : 'BƯỚC 2 · TÌM HIỂU CÁC CỘT MỐC CHUẨN'}
                  </div>
                  <p className="text-base text-[#AAB8C7] leading-relaxed">
                    {isEn
                      ? 'Surveyor 3 landed 1967-04-20 and was visited by Apollo 12 in Nov 1969; Viking 1 (1976-07-20) was NASA’s first truly successful Mars landing; Mars Pathfinder carried the 6-wheel rover Sojourner (83 sols vs 7-day baseline).'
                      : 'Surveyor 3 hạ cánh ngày 20/04/1967 và được Apollo 12 thăm tháng 11/1969 mang camera về Trái Đất. Viking 1 (20/07/1976) là cuộc hạ cánh thành công thực sự đầu tiên của NASA trên Sao Hỏa. Sojourner (thuộc Mars Pathfinder) hoạt động 83 sol so với kế hoạch 7 ngày.'}
                  </p>
                </div>
              </div>

              <SimChallengeStepRibbon
                lang={lang}
                simDone={track4SimDone}
                quizSolved={track4Quiz.solved}
                quizTotal={track4Quiz.total}
              />
            </div>

            {/* Step 3 Interactive Chronology Sorter */}
            <div className="space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="font-mono text-[13px] font-semibold text-[#D2A071] uppercase">
                  {isEn
                    ? 'Step 3 · Interactive Chronology Sorter (Move cards Top → Bottom)'
                    : 'Bước 3 · Xếp thứ tự Dòng thời gian (Trên = Sớm nhất → Dưới = Muộn nhất)'}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleSwitchTimelineMission('opportunity')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                      timelineMission === 'opportunity'
                        ? 'bg-[#D2A071] text-[#0B1422] border-[#D2A071] font-semibold'
                        : 'bg-[#162A40] text-[#F0EDE5] border-[#AAB8C7]/20 hover:bg-[#21374D]'
                    }`}
                  >
                    Opportunity (2003–2019)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchTimelineMission('surveyor-3')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                      timelineMission === 'surveyor-3'
                        ? 'bg-[#D2A071] text-[#0B1422] border-[#D2A071] font-semibold'
                        : 'bg-[#162A40] text-[#F0EDE5] border-[#AAB8C7]/20 hover:bg-[#21374D]'
                    }`}
                  >
                    {isEn ? 'Surveyor 3 & Apollo 12 · Demo (1967–1969)' : 'Surveyor 3 & Apollo 12 · Mẫu (1967–1969)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchTimelineMission('pioneer-11')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                      timelineMission === 'pioneer-11'
                        ? 'bg-[#D2A071] text-[#0B1422] border-[#D2A071] font-semibold'
                        : 'bg-[#162A40] text-[#F0EDE5] border-[#AAB8C7]/20 hover:bg-[#21374D]'
                    }`}
                  >
                    Pioneer 11 (1973–1995)
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {userTimelineOrder.map((item, idx) => {
                  const isPositionCorrect = item.orderIndex === idx + 1;
                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                        timelineChecked
                          ? isPositionCorrect
                            ? 'bg-emerald-950/35 border-emerald-400/50'
                            : 'bg-rose-950/35 border-rose-400/50'
                          : 'bg-[#162A40] border-[#AAB8C7]/20'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-lg bg-[#21374D] border border-[#D2A071]/40 font-mono text-sm font-bold text-[#D2A071] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>
                        <div className="space-y-1">
                          <div className="font-sans text-base font-semibold text-[#F0EDE5]">
                            {isEn ? item.titleEn : item.titleVi}
                          </div>
                          <p className="text-sm text-[#AAB8C7]">
                            {isEn ? item.detailEn : item.detailVi}
                          </p>
                          {timelineChecked && (
                            <div className="font-mono text-[13px] text-[#D2A071] pt-0.5">
                              {isEn ? item.displayDateEn : item.displayDateVi} · {item.sourceId}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => handleMoveTimelineItem(idx, 'up')}
                          disabled={idx === 0}
                          aria-label="Move event up"
                          className="p-2.5 bg-[#101E30] hover:bg-[#21374D] disabled:opacity-40 text-[#F0EDE5] border border-[#AAB8C7]/20 rounded-lg cursor-pointer"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveTimelineItem(idx, 'down')}
                          disabled={idx === userTimelineOrder.length - 1}
                          aria-label="Move event down"
                          className="p-2.5 bg-[#101E30] hover:bg-[#21374D] disabled:opacity-40 text-[#F0EDE5] border border-[#AAB8C7]/20 rounded-lg cursor-pointer"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTimelineChecked(true)}
                    className="px-5 py-2.5 bg-[#D2A071] hover:bg-[#e0b287] text-[#0B1422] font-sans text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    {isEn ? 'Check Chronological Order' : 'Kiểm tra Thứ tự'}
                  </button>
                  <button
                    type="button"
                    onClick={handleSolveTimeline}
                    className="px-4 py-2.5 bg-[#21374D] hover:bg-[#2a4560] text-[#F0EDE5] border border-[#AAB8C7]/25 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                  >
                    {isEn ? 'Auto-Sort Verified Order' : 'Xếp đáp án chuẩn'}
                  </button>
                  <button
                    type="button"
                    onClick={handleShuffleTimeline}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#162A40] hover:bg-[#21374D] text-[#AAB8C7] hover:text-[#F0EDE5] border border-[#AAB8C7]/20 rounded-lg text-sm transition-colors cursor-pointer"
                  >
                    <Shuffle className="w-4 h-4" />
                    <span>{isEn ? 'Shuffle' : 'Xáo trộn lại'}</span>
                  </button>
                </div>

                {timelineChecked && (
                  <div className="font-mono text-sm font-semibold text-[#D2A071]">
                    {isEn
                      ? `Score: ${timelineCorrectCount} / 6 Milestones in Exact Order`
                      : `Kết quả: ${timelineCorrectCount} / 6 cột mốc đúng vị trí`}
                  </div>
                )}
              </div>
            </div>

            {renderTrackQuizSection(4)}

            <SimTrackExplanationFooter
              lang={lang}
              trackCode="TRACK 04"
              takeawayVi="Lịch sử thám hiểm không gian đòi hỏi sự chuẩn xác từng ngày và múi giờ: Surveyor 3 phóng 17/04/1967, hạ cánh 20/04/1967 (00:04 UT), liên lạc cuối 04/05/1967 và đón Apollo 12 tới thăm thu hồi camera 19–20/11/1969; Opportunity phóng 07/07/2003, hạ cánh tháng 01/2004, liên lạc cuối 10/06/2018 và kết thúc 13/02/2019; Pioneer 11 phóng 06/04/1973, qua Sao Mộc 03/12/1974, Sao Thổ 01/09/1979, liên lạc cuối 30/09/1995 và nhận dữ liệu cuối 24/11/1995."
              takeawayEn="Space history depends on verified dates and UTC/PST conventions: Surveyor 3 launched 1967-04-17, landed 1967-04-20 (00:04 UT), sent its last signal 1967-05-04, and met Apollo 12 on 1969-11-19/20; Opportunity launched 2003-07-07, landed Jan 2004, signaled last on 2018-06-10, and ended 2019-02-13; Pioneer 11 launched 1973-04-06, flew past Jupiter 1974-12-03, Saturn 1979-09-01, had last contact 1995-09-30, and last data 1995-11-24."
              dataUsedVi="Chuỗi sự kiện đối chiếu chính thức từ NASA Science / JPL / Ames End-of-Mission Reports (SRC-OPP-01/02/04, SRC-PIO-01/03, SRC-SUR-01/02/03/04)."
              dataUsedEn="Verified chronologies cross-checked against NASA Science, JPL, and Ames reports (SRC-OPP-01/02/04, SRC-PIO-01/03, SRC-SUR-01/02/03/04)."
              assumptionsVi="Các ngày hạ cánh của Opportunity và Surveyor 3 ghi nhận rõ sự khác biệt hợp lệ giữa giờ UTC quốc tế và giờ địa phương tại Mỹ."
              assumptionsEn="Landing dates for Opportunity and Surveyor 3 explicitly distinguish UTC timestamps from local US observatory dates."
              limitationsVi="Tập trung vào chuỗi 6 cột mốc trọng tâm phục vụ giáo dục; đầy đủ bảng sự kiện chi tiết xem thêm tại Hành Trình và Dữ Liệu."
              limitationsEn="Curated 6-event teaching sequence per spacecraft; full extended chronologies reside in Journeys and Science Data."
              journeyRoute={`/hanh-trinh?mission=${timelineMission}`}
              dataRoute={`/du-lieu?mission=${timelineMission}`}
              onNavigate={onNavigate}
            />
          </section>
        )}
      </main>
    </div>
  );
};

export default SimulationsPage;
