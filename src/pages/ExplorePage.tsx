import React, { useState } from 'react';
import {
  NASA_MEDIA_CATALOG,
  NasaMediaItem
} from '../data/museumData';
import {
  ArrowRight,
  Compass,
  Cpu,
  Database,
  ExternalLink,
  Headphones,
  MapPin,
  Maximize2,
  Orbit,
  ShieldCheck
} from 'lucide-react';

export interface ExplorePageProps {
  lang?: 'vi' | 'en';
  onNavigate: (route: string) => void;
  onOpenLightbox: (item: NasaMediaItem) => void;
}

type DestinationFilter = 'ALL' | 'THE MOON' | 'MARS' | 'DEEP SPACE';

interface HubMachineItem {
  id: 'surveyor-3' | 'viking-1' | 'sojourner' | 'opportunity' | 'pioneer-11';
  nssdcaId: string;
  realm: 'THE MOON' | 'MARS' | 'DEEP SPACE';
  realmLabelVi: string;
  realmLabelEn: string;
  isFeaturedExhibit: boolean;
  nameVi: string;
  nameEn: string;
  typeVi: string;
  typeEn: string;
  site: string;
  distanceLabelVi: string;
  distanceLabelEn: string;
  activeDatesVi: string;
  activeDatesEn: string;
  pitchVi: string;
  pitchEn: string;
  highlightsVi: string[];
  highlightsEn: string[];
  mediaKey: string;
  fallbackImg: string;
  credit: string;
  nasaUrl: string;
  journeyRoute: string;
  hasSimulation: boolean;
}

const HUB_MACHINES: HubMachineItem[] = [
  {
    id: 'opportunity',
    nssdcaId: '2003-032A',
    realm: 'MARS',
    realmLabelVi: 'Sao Hỏa (Mars)',
    realmLabelEn: 'Mars',
    isFeaturedExhibit: true,
    nameVi: 'Opportunity (MER-B)',
    nameEn: 'Opportunity Rover (MER-B)',
    typeVi: 'Xe tự hành địa chất 6 bánh',
    typeEn: 'Six-Wheeled Geological Rover',
    site: 'Meridiani Planum → Perseverance Valley',
    distanceLabelVi: '~225 triệu km',
    distanceLabelEn: '~225 million km',
    activeDatesVi: 'Hạ cánh: 25/01/2004 · Tín hiệu cuối: 10/06/2018 (Kết thúc: 13/02/2019)',
    activeDatesEn: 'Landed: 2004-01-25 · Last Contact: 2018-06-10 (Complete: 2019-02-13)',
    pitchVi:
      'Thiết kế cho 90 sol nhưng hoạt động suốt 5.111 sol và đi được 45,16 km, phát hiện khoáng vật hematite và mạch thạch cao chứng minh nước cổ đại trên Sao Hỏa.',
    pitchEn:
      'Planned for 90 sols, Opportunity operated for 5,111 sols and drove 45.16 km, uncovering hematite spherules and gypsum veins formed by ancient Martian water.',
    highlightsVi: ['90 sol thiết kế vs 5.111 sol thực tế', 'Tổng quãng đường 45,16 km', 'Bão bụi toàn hành tinh 2018'],
    highlightsEn: ['90 sols planned vs 5,111 sols actual', '45.16 km total odometry', '2018 global dust storm'],
    mediaKey: 'IMG-OPP-01',
    fallbackImg: '/assets/nasa/opportunity_first_selfie_PIA22222.jpg',
    credit: 'NASA/JPL-Caltech (PIA22222)',
    nasaUrl: 'https://science.nasa.gov/mission/mer-opportunity/',
    journeyRoute: '/hanh-trinh?mission=opportunity',
    hasSimulation: true
  },
  {
    id: 'pioneer-11',
    nssdcaId: '1973-019A',
    realm: 'DEEP SPACE',
    realmLabelVi: 'Không gian sâu (Deep Space)',
    realmLabelEn: 'Deep Space',
    isFeaturedExhibit: true,
    nameVi: 'Pioneer 11',
    nameEn: 'Pioneer 11 Deep Space Probe',
    typeVi: 'Tàu thăm dò liên hành tinh & không gian sâu',
    typeEn: 'Outer Planets & Deep Space Probe',
    site: 'Sao Mộc · Sao Thổ · Quỹ đạo thoát Hệ Mặt Trời',
    distanceLabelVi: '> 11 tỷ km',
    distanceLabelEn: '> 11 billion km',
    activeDatesVi: 'Phóng: 06/04/1973 · Sao Mộc: 03/12/1974 · Sao Thổ: 01/09/1979 · Cuối: 1995',
    activeDatesEn: 'Launch: 1973-04-06 · Jupiter: 1974-12-03 · Saturn: 1979-09-01 · Final: 1995',
    pitchVi:
      'Tàu vũ trụ đầu tiên bay ngang qua Sao Thổ (01/09/1979), phát hiện vành đai F, vận hành bằng 4 máy phát điện đồng vị phóng xạ SNAP-19 RTG và mang theo tấm bảng Pioneer Plaque.',
    pitchEn:
      'First spacecraft in history to fly by Saturn (1979-09-01) and discover the F ring, powered by four SNAP-19 RTG units and carrying the gold-anodized Pioneer Plaque.',
    highlightsVi: ['4 máy phát hạt nhân SNAP-19 RTG', 'Tấm bảng Pioneer Plaque', 'Liên lạc cuối 30/09/1995 (Dữ liệu: 24/11/1995)'],
    highlightsEn: ['4 × SNAP-19 RTG nuclear power', 'Gold-anodized Pioneer Plaque', 'Last contact 1995-09-30 (Data: 1995-11-24)'],
    mediaKey: 'IMG-PIO-01',
    fallbackImg: '/assets/nasa/pioneer11_saturn_titan_739460main.jpg',
    credit: 'NASA/Ames (AC79-9107)',
    nasaUrl: 'https://science.nasa.gov/mission/pioneer-11/',
    journeyRoute: '/hanh-trinh?mission=pioneer-11',
    hasSimulation: true
  },
  {
    id: 'surveyor-3',
    nssdcaId: '1967-035A',
    realm: 'THE MOON',
    realmLabelVi: 'Mặt Trăng (The Moon)',
    realmLabelEn: 'The Moon',
    isFeaturedExhibit: false,
    nameVi: 'Surveyor 3',
    nameEn: 'Surveyor 3 Lunar Lander',
    typeVi: 'Tàu đổ bộ khảo sát bề mặt Mặt Trăng',
    typeEn: 'Robotic Lunar Surface Lander',
    site: 'Oceanus Procellarum',
    distanceLabelVi: '384.400 km',
    distanceLabelEn: '384,400 km',
    activeDatesVi: 'Hạ cánh: 20/04/1967 · Liên lạc cuối: 04/05/1967 · Apollo 12 thăm: 11/1969',
    activeDatesEn: 'Landed: 1967-04-20 · Last Contact: 1967-05-04 · Apollo 12 Visit: Nov 1969',
    pitchVi:
      'Hạ cánh mềm xuống Mặt Trăng, đào rãnh kiểm tra độ chịu lực của đất và gửi về 6.326 ảnh truyền hình trước khi được các phi hành gia Apollo 12 đến thăm năm 1969.',
    pitchEn:
      'Soft-landed on the Moon, dug trenches up to 18 cm deep to test soil bearing strength for Apollo, and was visited in November 1969 by Apollo 12 astronauts.',
    highlightsVi: ['6.326 ảnh truyền hình', 'Bộ lấy mẫu vươn ~1,5 m', 'Apollo 12 thu hồi camera TV'],
    highlightsEn: ['6,326 TV pictures transmitted', 'Surface sampler (~1.5 m reach)', 'TV camera returned by Apollo 12'],
    mediaKey: 'IMG-SUR-01',
    fallbackImg: '/assets/nasa/apollo12_surveyor3_AS12-48-7134.jpg',
    credit: 'NASA (AS12-48-7134)',
    nasaUrl: 'https://science.nasa.gov/mission/surveyor-3/',
    journeyRoute: '/hanh-trinh?mission=surveyor-3',
    hasSimulation: false
  },
  {
    id: 'viking-1',
    nssdcaId: '1975-075C',
    realm: 'MARS',
    realmLabelVi: 'Sao Hỏa (Mars)',
    realmLabelEn: 'Mars',
    isFeaturedExhibit: false,
    nameVi: 'Viking 1 Lander',
    nameEn: 'Viking 1 Mars Lander',
    typeVi: 'Trạm đổ bộ cố định nghiên cứu khí quyển & đất',
    typeEn: 'Stationary Surface & Biology Lander',
    site: 'Chryse Planitia',
    distanceLabelVi: '~225 triệu km',
    distanceLabelEn: '~225 million km',
    activeDatesVi: 'Hạ cánh: 20/07/1976 · Liên lạc cuối: 11/1982',
    activeDatesEn: 'Landed: 1976-07-20 · Final Contact: Nov 1982',
    pitchVi:
      'Tàu đổ bộ thành công trọn vẹn đầu tiên của NASA trên bề mặt Sao Hỏa, gửi về bức ảnh chụp trực tiếp đầu tiên từ bề mặt Hành tinh Đỏ (PIA00381) và đo đạc khí tượng suốt hơn 6 năm.',
    pitchEn:
      'NASA’s first truly successful Mars landing, capturing the first photograph directly on the Martian surface (PIA00381) and operating for over six years at Chryse Planitia.',
    highlightsVi: ['Ảnh bề mặt đầu tiên PIA00381', 'Thí nghiệm sinh học đất Sao Hỏa', '2 máy phát RTG SNAP-19'],
    highlightsEn: ['First Mars surface photo PIA00381', 'Martian soil biology experiments', 'Dual SNAP-19 RTG power'],
    mediaKey: 'IMG-VIK-01',
    fallbackImg: '/assets/nasa/viking1_first_mars_surface_photo_PIA00381.jpg',
    credit: 'NASA/JPL (PIA00381)',
    nasaUrl: 'https://science.nasa.gov/mission/viking-1/',
    journeyRoute: '/hanh-trinh?mission=viking-1',
    hasSimulation: false
  },
  {
    id: 'sojourner',
    nssdcaId: '1996-068A',
    realm: 'MARS',
    realmLabelVi: 'Sao Hỏa (Mars)',
    realmLabelEn: 'Mars',
    isFeaturedExhibit: false,
    nameVi: 'Sojourner (Mars Pathfinder)',
    nameEn: 'Sojourner / Mars Pathfinder',
    typeVi: 'Rover tự hành 6 bánh thế hệ đầu tiên',
    typeEn: 'First-Generation Six-Wheeled Mars Rover',
    site: 'Ares Vallis',
    distanceLabelVi: '~225 triệu km',
    distanceLabelEn: '~225 million km',
    activeDatesVi: 'Hạ cánh: 04/07/1997 · Tín hiệu cuối: 27/09/1997 (83 ngày)',
    activeDatesEn: 'Landed: 1997-07-04 · Last Signal: 1997-09-27 (83 days)',
    pitchVi:
      'Xe tự hành đầu tiên lăn bánh trên Sao Hỏa thuộc sứ mệnh Mars Pathfinder. Vượt xa kế hoạch 7 ngày ban đầu để khảo sát địa chất khu vực Ares Vallis trong 83 ngày.',
    pitchEn:
      'First wheeled rover to operate on Mars, deployed by the Mars Pathfinder lander. Explored Ares Vallis for 83 days against a planned 7-day mission.',
    highlightsVi: ['Hoạt động 83 ngày / 7 ngày dự kiến', 'Phổ kế hạt alpha APXS', 'Hạ cánh bằng hệ thống túi khí'],
    highlightsEn: ['83 days active vs 7-day plan', 'APXS rock composition sensor', 'Airbag-cushioned landing system'],
    mediaKey: 'IMG-SOJ-01',
    fallbackImg: '/assets/nasa/sojourner_yogi_PIA00766.jpg',
    credit: 'NASA/JPL (PIA00766)',
    nasaUrl: 'https://science.nasa.gov/mission/mars-pathfinder/',
    journeyRoute: '/hanh-trinh?mission=sojourner',
    hasSimulation: false
  }
];

export const ExplorePage: React.FC<ExplorePageProps> = ({
  lang = 'vi',
  onNavigate,
  onOpenLightbox
}) => {
  const [selectedRealm, setSelectedRealm] = useState<DestinationFilter>('ALL');
  const isEn = lang === 'en';

  const visibleMachines =
    selectedRealm === 'ALL'
      ? HUB_MACHINES
      : HUB_MACHINES.filter((m) => m.realm === selectedRealm);

  const resolveMediaImageSrc = (mediaKey: string, fallbackPath: string): string => {
    const item = NASA_MEDIA_CATALOG[mediaKey];
    if (!item) return fallbackPath;
    return item.direct_asset_url || (item.local_asset_url ? item.local_asset_url.replace(/^\/public\//, '/') : fallbackPath);
  };

  return (
    <div className="bg-[#0B1422] text-[#E9EDF2] min-h-screen selection:bg-[#D2A071]/30 selection:text-[#F0EDE5]">
      {/* =====================================================================
          SECTION 1: CENTRAL EXPLORE HUB ORIENTATION & 3 DIRECT PILLAR PORTALS
      ===================================================================== */}
      <section className="relative overflow-hidden border-b border-[#AAB8C7]/18 py-14 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#0B1422]">
        <div
          className="absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 850px 450px at 50% 0%, rgba(197, 164, 106, 0.10) 0%, transparent 70%),
              radial-gradient(ellipse 650px 400px at 85% 75%, rgba(201, 111, 70, 0.08) 0%, transparent 65%)
            `
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          {/* Header & Orientation */}
          <div className="max-w-3xl space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#162A40] border border-[#AAB8C7]/22 rounded-xs font-mono text-[11px] uppercase tracking-[0.2em] text-[#D2A071]">
              <Compass className="w-3.5 h-3.5 text-[#C96F46]" />
              <span>
                {isEn
                  ? 'CENTRAL EXPLORE HUB · ORIENTATION & MISSION DIRECTORY'
                  : 'TRUNG TÂM KHÁM PHÁ · ĐỊNH HƯỚNG TRẢI NGHIỆM & DANH MỤC TÀU'}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[52px] font-bold text-[#F0EDE5] tracking-tight leading-[1.15]">
              {isEn
                ? 'Choose Your Path Through the Archive'
                : 'Chọn Lộ Trình Khám Phá Bảo Tàng'}
            </h1>

            <p className="text-base sm:text-[17px] text-[#AAB8C7] leading-relaxed">
              {isEn
                ? 'Enter one of the three primary museum sections below, or filter the verified NASA spacecraft by destination (The Moon, Mars, Deep Space) to go directly to their multimedia story, STEM challenge lab, or plain-language scientific dossier.'
                : 'Đi thẳng vào một trong ba phân khu chính của bảo tàng bên dưới, hoặc lọc theo từng miền không gian (Mặt Trăng, Sao Hỏa, Không gian sâu) để mở câu chuyện thuyết minh, thử thách mô phỏng hay hồ sơ khoa học dễ hiểu.'}
            </p>
          </div>

          {/* 3 Direct Portals into Journeys, Simulations, and Data */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* PORTAL 1: JOURNEYS */}
            <div
              onClick={() => onNavigate('/hanh-trinh')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate('/hanh-trinh');
                }
              }}
              className="group bg-[#162A40] hover:bg-[#21374D] border border-[#AAB8C7]/22 hover:border-[#D2A071] p-6 rounded-sm flex flex-col justify-between transition-all cursor-pointer text-left shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-[13px]">
                  <span className="text-[#D2A071] font-semibold">
                    {isEn ? '01 · MULTIMEDIA STORY' : '01 · KỂ CHUYỆN ĐA PHƯƠNG TIỆN'}
                  </span>
                  <Headphones className="w-5 h-5 text-[#D2A071]" />
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-[#F0EDE5] group-hover:text-[#D2A071] transition-colors">
                    {isEn ? 'Journeys (Hành Trình)' : 'Hành Trình (Journeys)'}
                  </h2>
                  <p className="font-mono text-[13px] text-[#D2A071] mt-1">
                    Slide · Audio Narration · Bilingual Transcript
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#AAB8C7] leading-relaxed">
                  {isEn
                    ? 'Watch authentic NASA slides synchronized with voice narration, live bilingual transcripts, and 5-act mission stories.'
                    : 'Trình chiếu Slide ảnh NASA đồng bộ giọng đọc thuyết minh, phụ đề song ngữ và 5 chặng nhật ký hành trình chi tiết.'}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-[#AAB8C7]/18 flex items-center justify-between font-sans text-sm text-[#F0EDE5]">
                <span className="group-hover:text-[#D2A071] font-semibold">
                  {isEn ? 'Open Journeys (/hanh-trinh)' : 'Vào khu Hành Trình (/hanh-trinh)'}
                </span>
                <ArrowRight className="w-4 h-4 text-[#D2A071] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* PORTAL 2: CHALLENGES & SIMULATIONS */}
            <div
              onClick={() => onNavigate('/mo-phong')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate('/mo-phong');
                }
              }}
              className="group bg-[#162A40] hover:bg-[#21374D] border border-[#D2A071]/35 hover:border-[#D2A071] p-6 rounded-sm flex flex-col justify-between transition-all cursor-pointer text-left shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-[13px]">
                  <span className="text-[#D2A071] font-semibold">
                    {isEn ? '02 · CHALLENGES & LAB' : '02 · THỬ THÁCH & MÔ PHỎNG'}
                  </span>
                  <Cpu className="w-5 h-5 text-[#D2A071]" />
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-[#F0EDE5] group-hover:text-[#D2A071] transition-colors">
                    {isEn ? 'Challenges & Simulations' : 'Thử Thách & Mô Phỏng'}
                  </h2>
                  <p className="font-mono text-[13px] text-[#D2A071] mt-1">
                    5 Steps: Discover · Explore · Simulate · Test · Explain
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#AAB8C7] leading-relaxed">
                  {isEn
                    ? 'Solve real space engineering challenges using interactive X-ray anatomy, orbital light-time labs, dust storm simulators, and timeline sorters.'
                    : 'Giải quyết 4 thử thách khoa học thực tế bằng cách tự tay điều khiển sơ đồ giải phẫu X-Ray, phòng thí nghiệm độ trễ tín hiệu và bão bụi Sao Hỏa.'}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-[#AAB8C7]/18 flex items-center justify-between font-sans text-sm text-[#F0EDE5]">
                <span className="group-hover:text-[#D2A071] font-semibold">
                  {isEn ? 'Start Challenges (/mo-phong)' : 'Vào Thử thách & Mô phỏng'}
                </span>
                <ArrowRight className="w-4 h-4 text-[#D2A071] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* PORTAL 3: PLAIN-LANGUAGE DATA */}
            <div
              onClick={() => onNavigate('/du-lieu')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate('/du-lieu');
                }
              }}
              className="group bg-[#162A40] hover:bg-[#21374D] border border-[#AAB8C7]/22 hover:border-[#D2A071] p-6 rounded-sm flex flex-col justify-between transition-all cursor-pointer text-left shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-[13px]">
                  <span className="text-[#AAB8C7] font-semibold">
                    {isEn ? '03 · OPEN SCIENCE DATA' : '03 · DỮ LIỆU KHOA HỌC MỞ'}
                  </span>
                  <Database className="w-5 h-5 text-[#D2A071]" />
                </div>

                <div>
                  <h2 className="font-display text-2xl font-bold text-[#F0EDE5] group-hover:text-[#D2A071] transition-colors">
                    {isEn ? 'Science Data (Dữ Liệu)' : 'Dữ Liệu Khoa Học'}
                  </h2>
                  <p className="font-mono text-[13px] text-[#D2A071] mt-1">
                    4 Categories · 7-Part Profiles · NASA Provenance
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#AAB8C7] leading-relaxed">
                  {isEn
                    ? 'Browse Missions, Spacecraft, Scientific Instruments, and Technical Documents in plain language with readable 7-part profiles.'
                    : 'Tra cứu dễ hiểu theo 4 nhóm: Sứ mệnh, Tàu thăm dò, Thiết bị Khoa học và Tài liệu NASA với hồ sơ chi tiết 7 phần trực quan.'}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-[#AAB8C7]/18 flex items-center justify-between font-sans text-sm text-[#F0EDE5]">
                <span className="group-hover:text-[#D2A071] font-semibold">
                  {isEn ? 'Open Science Data (/du-lieu)' : 'Vào khu Dữ Liệu (/du-lieu)'}
                </span>
                <ArrowRight className="w-4 h-4 text-[#D2A071] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: DESTINATION FILTER & VERIFIED NASA SPACECRAFT DIRECTORY
      ===================================================================== */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#101E30]">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Destination Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#AAB8C7]/18 pb-6">
            <div className="space-y-2 text-left">
              <span className="font-mono text-[13px] font-medium text-[#D2A071]">
                {isEn
                  ? 'FILTER BY COSMIC DESTINATION'
                  : 'LỌC THEO MIỀN KHÔNG GIAN THÁM HIỂM'}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F0EDE5]">
                {isEn
                  ? '5 Core NASA Hardware Profiles Across 3 Realms'
                  : '5 Hồ Sơ Phần Cứng Trọng Tâm Qua 3 Miền Không Gian'}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                {
                  id: 'ALL' as const,
                  labelVi: 'Tất cả (05)',
                  labelEn: 'All Destinations (05)'
                },
                {
                  id: 'THE MOON' as const,
                  labelVi: 'I. Mặt Trăng (01)',
                  labelEn: 'I. The Moon (01)'
                },
                {
                  id: 'MARS' as const,
                  labelVi: 'II. Sao Hỏa (03)',
                  labelEn: 'II. Mars (03)'
                },
                {
                  id: 'DEEP SPACE' as const,
                  labelVi: 'III. Không gian sâu (01)',
                  labelEn: 'III. Deep Space (01)'
                }
              ].map((tab) => {
                const isSelected = selectedRealm === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedRealm(tab.id)}
                    className={`px-4 py-2 font-sans text-sm font-medium border rounded-sm transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#D2A071] text-[#0B1422] border-[#D2A071] font-semibold'
                        : 'bg-[#162A40] text-[#AAB8C7] border-[#AAB8C7]/22 hover:border-[#D2A071]/60 hover:text-[#F0EDE5]'
                    }`}
                  >
                    {isEn ? tab.labelEn : tab.labelVi}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Spacecraft Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {visibleMachines.map((machine) => {
              const mediaObj = NASA_MEDIA_CATALOG[machine.mediaKey];
              const imgSrc = resolveMediaImageSrc(machine.mediaKey, machine.fallbackImg);
              const highlights = isEn ? machine.highlightsEn : machine.highlightsVi;

              return (
                <article
                  key={machine.id}
                  className="bg-[#162A40] border border-[#AAB8C7]/20 hover:border-[#D2A071]/60 rounded-sm overflow-hidden flex flex-col justify-between transition-colors text-left shadow-xl"
                >
                  <div>
                    {/* Top Metadata Strip */}
                    <div className="px-5 py-3 bg-[#21374D]/80 border-b border-[#AAB8C7]/18 flex flex-wrap items-center justify-between gap-2 font-mono text-[13px]">
                      <div className="flex items-center gap-2">
                        <span className="text-[#D2A071] font-semibold">
                          NSSDCA: {machine.nssdcaId}
                        </span>
                        <span className="text-[#AAB8C7]/40">·</span>
                        <span className="text-[#AAB8C7]">
                          {isEn ? machine.realmLabelEn : machine.realmLabelVi}
                        </span>
                      </div>

                      {machine.isFeaturedExhibit ? (
                        <span className="px-2.5 py-0.5 bg-[#D2A071]/20 text-[#D2A071] border border-[#D2A071]/50 text-[13px] font-sans font-semibold rounded-sm">
                          {isEn ? 'Featured Deep Exhibit' : 'Triển lãm chuyên sâu'}
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-[#101E30] text-[#F0EDE5] border border-[#AAB8C7]/22 text-[13px] font-sans rounded-sm">
                          {isEn ? 'Demo Record' : 'Hồ sơ tư liệu mẫu'}
                        </span>
                      )}
                    </div>

                    {/* Visual & Summary Row */}
                    <div className="p-6 space-y-5">
                      <div className="relative aspect-[16/9] bg-[#0B1422] border border-[#AAB8C7]/18 overflow-hidden rounded-sm group">
                        <img
                          src={imgSrc}
                          alt={isEn ? machine.nameEn : machine.nameVi}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                        {mediaObj && (
                          <button
                            type="button"
                            onClick={() => onOpenLightbox(mediaObj)}
                            className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B1422]/85 hover:bg-[#21374D] text-[#F0EDE5] border border-[#AAB8C7]/30 font-sans text-[13px] rounded-sm cursor-pointer"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-[#D2A071]" />
                            <span>{isEn ? 'Zoom' : 'Phóng lớn'}</span>
                          </button>
                        )}
                        <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 bg-[#0B1422]/90 border border-[#AAB8C7]/20 font-mono text-[13px] text-[#AAB8C7] rounded-sm">
                          Credit: {machine.credit}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 font-sans text-sm text-[#AAB8C7]">
                          <span>{isEn ? machine.typeEn : machine.typeVi}</span>
                          <span className="inline-flex items-center gap-1.5 text-[#D2A071]">
                            <MapPin className="w-4 h-4 text-[#D2A071]" />
                            {machine.site} ({isEn ? machine.distanceLabelEn : machine.distanceLabelVi})
                          </span>
                        </div>

                        <h3 className="font-display text-2xl font-bold text-[#F0EDE5]">
                          {isEn ? machine.nameEn : machine.nameVi}
                        </h3>

                        <p className="font-mono text-[13px] text-[#D2A071]">
                          {isEn ? machine.activeDatesEn : machine.activeDatesVi}
                        </p>

                        <p className="text-base text-[#AAB8C7] leading-relaxed">
                          {isEn ? machine.pitchEn : machine.pitchVi}
                        </p>
                      </div>

                      {/* Key Verified Fact Chips */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {highlights.map((h, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-[#21374D]/80 border border-[#AAB8C7]/20 font-sans text-[13px] text-[#F0EDE5] rounded-sm"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Direct Navigation Footer: Story (/hanh-trinh), Simulations (/mo-phong), Data (/du-lieu) */}
                  <div className="px-6 py-4 bg-[#101E30]/90 border-t border-[#AAB8C7]/18 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => onNavigate(machine.journeyRoute)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#D2A071] hover:bg-[#DFB58C] text-[#0B1422] font-sans text-sm font-semibold rounded-sm transition-colors cursor-pointer"
                      >
                        <Headphones className="w-4 h-4" />
                        <span>{isEn ? 'Story & Audio' : 'Hành trình & Audio'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {machine.hasSimulation && (
                        <button
                          type="button"
                          onClick={() => onNavigate('/mo-phong')}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#21374D] hover:bg-[#2A4560] text-[#D2A071] border border-[#D2A071]/40 font-sans text-sm font-medium rounded-sm transition-colors cursor-pointer"
                        >
                          <Cpu className="w-4 h-4" />
                          <span>{isEn ? 'Challenge & Lab' : 'Thử thách & Mô phỏng'}</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onNavigate('/du-lieu')}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#162A40] hover:bg-[#21374D] text-[#AAB8C7] hover:text-[#F0EDE5] border border-[#AAB8C7]/25 font-sans text-sm rounded-sm transition-colors cursor-pointer"
                      >
                        <Database className="w-4 h-4" />
                        <span>{isEn ? 'Science Data' : 'Hồ sơ dữ liệu'}</span>
                      </button>
                    </div>

                    <a
                      href={machine.nasaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[13px] text-[#AAB8C7] hover:text-[#D2A071] underline underline-offset-4"
                    >
                      <span>NASA</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
