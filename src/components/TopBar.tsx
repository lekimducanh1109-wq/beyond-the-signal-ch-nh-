import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { ARCHIVE_RECORDS } from '../data/museumData';

export interface TopBarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenAuth: () => void;
  userAlias: string | null;
  lang?: 'vi' | 'en';
  onToggleLang?: () => void;
  onOpenStoryPlayer?: (machineId?: 'opportunity' | 'pioneer-11') => void;
}

interface SearchItem {
  id: string;
  pillar: 'journeys' | 'simulations' | 'data';
  badgeVi: string;
  badgeEn: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  routeLabel: string;
  keywords: string[];
  route: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentRoute,
  onNavigate,
  onOpenAuth,
  userAlias,
  lang = 'vi',
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'journeys' | 'simulations' | 'data'>('all');
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const isEn = lang === 'en';

  useEffect(() => {
    document.documentElement.lang = isEn ? 'en' : 'vi';
  }, [isEn]);

  const handleNav = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setSearchOverlayOpen(false);
    setSearchQuery('');
  };

  // Keyboard shortcuts: Escape to close overlays, Cmd/Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOverlayOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (searchOverlayOpen) {
          setSearchOverlayOpen(false);
        } else if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOverlayOpen, mobileMenuOpen]);

  // Focus input when search overlay opens
  useEffect(() => {
    if (searchOverlayOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOverlayOpen]);

  // Unified Search Index navigating strictly to /hanh-trinh, /mo-phong, /du-lieu
  const searchIndex: SearchItem[] = [
    // 1. JOURNEYS (/hanh-trinh)
    {
      id: 'journey-opportunity',
      pillar: 'journeys',
      badgeVi: 'HÀNH TRÌNH · SLIDE & AUDIO',
      badgeEn: 'JOURNEYS · SLIDE & AUDIO',
      titleVi: 'Hành trình Opportunity (MER-B): 5.111 Sol trên Sao Hỏa',
      titleEn: 'Opportunity (MER-B) Journey: 5,111 Sols on Mars',
      descVi: 'Trình chiếu đa phương tiện toàn trang: Slide tư liệu NASA, thuyết minh âm thanh, phụ đề trực tiếp và bằng chứng nước cổ đại tại Meridiani Planum.',
      descEn: 'Full-page multimedia storytelling: synchronized NASA archival slides, audio narration, live transcript, and ancient water evidence at Meridiani Planum.',
      routeLabel: '/hanh-trinh?mission=opportunity',
      keywords: ['hành trình', 'journey', 'story', 'audio', 'slide', 'opportunity', 'mer-b', 'sao hỏa', 'mars', '5111', 'bão bụi'],
      route: '/hanh-trinh?mission=opportunity',
    },
    {
      id: 'journey-pioneer-11',
      pillar: 'journeys',
      badgeVi: 'HÀNH TRÌNH · SLIDE & AUDIO',
      badgeEn: 'JOURNEYS · SLIDE & AUDIO',
      titleVi: 'Hành trình Pioneer 11: Vượt qua Sao Mộc, Sao Thổ & Rìa Hệ Mặt Trời',
      titleEn: 'Pioneer 11 Journey: Jupiter, Saturn & Beyond the Solar Frontier',
      descVi: 'Trình chiếu đa phương tiện: Quỹ đạo bay ngang Sao Mộc (1974), phát hiện vành đai F Sao Thổ (1979), máy phát nhiệt điện RTG SNAP-19 và Pioneer Plaque.',
      descEn: 'Multimedia chronicle: Jupiter flyby (1974), Saturn F-ring discovery (1979), SNAP-19 RTGs, and the gold-anodized Pioneer Plaque.',
      routeLabel: '/hanh-trinh?mission=pioneer-11',
      keywords: ['hành trình', 'journey', 'story', 'audio', 'slide', 'pioneer 11', 'pioneer', 'sao thổ', 'saturn', 'sao mộc', 'jupiter', 'plaque'],
      route: '/hanh-trinh?mission=pioneer-11',
    },
    {
      id: 'journey-surveyor-3',
      pillar: 'journeys',
      badgeVi: 'HÀNH TRÌNH · TRUYỆN TRANH 15 TRANG',
      badgeEn: 'JOURNEYS · 15-PAGE COMIC',
      titleVi: 'Hành trình Surveyor 3: Người bạn cô độc trên Mặt Trăng & Apollo 12',
      titleEn: 'Surveyor 3 Journey: The Lonely Explorer of the Moon & Apollo 12',
      descVi: 'Truyện tranh 15 trang & PDF kể lại cú hạ cánh Oceanus Procellarum (1967), gầu đào đất 18 cm và cuộc hội ngộ Apollo 12 cách 180 m.',
      descEn: '15-page graphic novel & PDF chronicling the 1967 Oceanus Procellarum landing, 18 cm soil scoop tests, and Apollo 12 reunion.',
      routeLabel: '/hanh-trinh?mission=surveyor-3&format=multimedia',
      keywords: ['hành trình', 'surveyor 3', 'surveyor', 'mặt trăng', 'moon', 'apollo 12', 'comic', 'truyện tranh', 'pdf', 'gầu đào'],
      route: '/hanh-trinh?mission=surveyor-3&format=multimedia',
    },
    {
      id: 'journey-little-wheels',
      pillar: 'journeys',
      badgeVi: 'HÀNH TRÌNH · MV & POSTER CỐT LÕI',
      badgeEn: 'JOURNEYS · LITTLE WHEELS MV & POSTER',
      titleVi: 'LITTLE WHEELS — A Song for Opportunity (MV 03:41 & Poster)',
      titleEn: 'LITTLE WHEELS — A Song for Opportunity (Music Video & Poster)',
      descVi: 'Video ca nhạc 3:41 và Poster nghệ thuật kể câu chuyện 15 năm phi thường (45,16 km) của robot Opportunity trên Sao Hỏa.',
      descEn: 'Original 3:41 music video and creative poster celebrating Opportunity\'s 15-year (45.16 km) Mars odyssey.',
      routeLabel: '/hanh-trinh?mission=opportunity&format=multimedia',
      keywords: ['little wheels', 'mv', 'ca khúc', 'bài hát', 'song', 'poster', 'video', 'opportunity', 'sao hỏa'],
      route: '/hanh-trinh?mission=opportunity&format=multimedia',
    },
    {
      id: 'journey-hub',
      pillar: 'journeys',
      badgeVi: 'HÀNH TRÌNH · BẢO TÀNG KỂ CHUYỆN',
      badgeEn: 'JOURNEYS · STORYTELLING HALL',
      titleVi: 'Không gian Kể chuyện Đa phương tiện (Slide + Audio + Transcript)',
      titleEn: 'Multimedia Storytelling Hall (Synchronized Slide + Audio + Transcript)',
      descVi: 'Khám phá toàn bộ các chương kể chuyện khoa học kèm nguồn trích dẫn chính thức từ NASA/JPL.',
      descEn: 'Explore all full-page mission chapters with synchronized audio, transcripts, and official NASA/JPL provenance.',
      routeLabel: '/hanh-trinh',
      keywords: ['hành trình', 'journeys', 'kể chuyện', 'multimedia', 'podcast', 'video', 'transcript'],
      route: '/hanh-trinh',
    },

    // 2. SIMULATIONS (/mo-phong)
    {
      id: 'sim-xray',
      pillar: 'simulations',
      badgeVi: 'MÔ PHỎNG · CẤU TẠO KỸ THUẬT',
      badgeEn: 'SIMULATIONS · HARDWARE X-RAY',
      titleVi: 'Mô phỏng X-Ray & Địa chất Mặt Trăng: Opportunity, Pioneer 11 & Surveyor 3',
      titleEn: 'Interactive Spacecraft X-Ray & Lunar Mechanics: Opportunity, Pioneer 11 & Surveyor 3',
      descVi: 'Giải phẫu Pancam, cánh tay Surface Sampler Surveyor 3 (đào 18 cm), camera TV Apollo 12 thu hồi, ăng-ten đĩa và RTG SNAP-19.',
      descEn: 'Inspect Pancam mast, Surveyor 3 18 cm Surface Sampler scoop, Apollo 12 TV camera, high-gain dish antenna, and SNAP-19 RTGs.',
      routeLabel: '/mo-phong?mission=surveyor-3',
      keywords: ['mô phỏng', 'simulation', 'x-ray', 'cấu tạo', 'thiết bị', 'pancam', 'rtg', 'surveyor 3', 'gầu đào', 'cơ học đất', 'sơ đồ', 'stem'],
      route: '/mo-phong?mission=surveyor-3',
    },
    {
      id: 'sim-physics',
      pillar: 'simulations',
      badgeVi: 'MÔ PHỎNG · VẬT LÝ KHÔNG GIAN',
      badgeEn: 'SIMULATIONS · SPACE PHYSICS LAB',
      titleVi: 'Phòng Thí nghiệm Độ trễ Tín hiệu Ánh sáng, Năng lượng Mặt Trời & Quỹ đạo',
      titleEn: 'Radio Light-Time Delay, Inverse-Square Solar Power & Keplerian Lab',
      descVi: 'Tính toán thời gian truyền sóng vô tuyến từ Trái Đất tới Mặt Trăng, Sao Hỏa và Không gian sâu (AU) cùng mức suy giảm quang năng 1/r².',
      descEn: 'Compute one-way radio light-time delay across Moon, Mars, and Deep Space (AU) alongside 1/r² solar irradiance attenuation.',
      routeLabel: '/mo-phong',
      keywords: ['mô phỏng', 'vật lý', 'physics', 'tín hiệu', 'radio', 'quỹ đạo', 'kepler', 'năng lượng mặt trời', 'au'],
      route: '/mo-phong',
    },
    {
      id: 'sim-timeline-quiz',
      pillar: 'simulations',
      badgeVi: 'MÔ PHỎNG · TIMELINE & TRẮC NGHIỆM',
      badgeEn: 'SIMULATIONS · TIMELINE & QUIZ',
      titleVi: 'Thử thách Sắp xếp Dòng thời gian Nhiệm vụ & Trắc nghiệm Khoa học NASA',
      titleEn: 'Mission Timeline Ordering & Verified NASA Science Quiz',
      descVi: 'Kiểm tra kiến thức với bộ câu hỏi xác thực từ hồ sơ NASA/NSSDCA kèm giải thích khoa học chi tiết.',
      descEn: 'Test your understanding with verified NASA/NSSDCA questions and detailed scientific explanations.',
      routeLabel: '/mo-phong',
      keywords: ['mô phỏng', 'quiz', 'trắc nghiệm', 'timeline', 'dòng thời gian', 'học sinh', 'stem'],
      route: '/mo-phong',
    },

    // 3. DATA (/du-lieu)
    {
      id: 'data-catalog-16',
      pillar: 'data',
      badgeVi: 'DỮ LIỆU · DANH MỤC 16 TÀU VŨ TRỤ',
      badgeEn: 'DATA · 16 SPACECRAFT CATALOG',
      titleVi: 'Danh mục Dữ liệu Mở: 16 Cỗ máy Thám hiểm trên Mặt Trăng, Sao Hỏa & Không gian sâu',
      titleEn: 'Open Science Data Catalog: 16 Abandoned Spacecraft (Moon, Mars & Deep Space)',
      descVi: 'Tra cứu tọa độ hạ cánh, hệ quy chiếu CRS, ngày mất liên lạc, mã định danh COSPAR/NSSDCA và trạng thái bộ dữ liệu.',
      descEn: 'Query landing coordinates, CRS datum, last contact dates, COSPAR/NSSDCA identifiers, and dataset verification status.',
      routeLabel: '/du-lieu',
      keywords: ['dữ liệu', 'data', 'catalog', '16', 'tọa độ', 'cospar', 'nssdc', 'apollo', 'luna', 'ranger', 'voyager'],
      route: '/du-lieu',
    },
    ...ARCHIVE_RECORDS.map((rec): SearchItem => ({
      id: `data-record-${rec.id}`,
      pillar: 'data',
      badgeVi: 'DỮ LIỆU · HỒ SƠ THIẾT BỊ NASA',
      badgeEn: 'DATA · NASA HARDWARE DOSSIER',
      titleVi: `${rec.display_name_vi} (${rec.code_id})`,
      titleEn: `${rec.name} (${rec.code_id})`,
      descVi: `Điểm đến: ${rec.destination} · Nhiệm vụ: ${rec.mission_name} · ${rec.quick_identity.what_is_it}`,
      descEn: `Destination: ${rec.destination} · Mission: ${rec.mission_name} · ${rec.quick_identity.what_is_it}`,
      routeLabel: `/du-lieu#device-${rec.id}`,
      keywords: [
        rec.name.toLowerCase(),
        rec.display_name_vi.toLowerCase(),
        rec.code_id.toLowerCase(),
        rec.destination.toLowerCase(),
        rec.mission_name.toLowerCase(),
        'dữ liệu',
        'data',
        'thông số',
        'hardware',
      ],
      route: `/du-lieu#device-${rec.id}`,
    })),
  ];

  const filteredSearchResults = searchIndex.filter((item) => {
    if (activeFilter !== 'all' && item.pillar !== activeFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.titleVi.toLowerCase().includes(q) ||
      item.titleEn.toLowerCase().includes(q) ||
      item.descVi.toLowerCase().includes(q) ||
      item.descEn.toLowerCase().includes(q) ||
      item.keywords.some((kw) => kw.includes(q))
    );
  });

  // Active state detection for the 4 primary sections
  const basePath = currentRoute.split('?')[0].split('#')[0];
  const isJourneysActive =
    basePath === '/hanh-trinh' ||
    basePath === '/journeys' ||
    basePath.startsWith('/trien-lam/');
  const isSimulationsActive =
    basePath === '/mo-phong' ||
    basePath === '/simulations' ||
    basePath === '/young-explorers';
  const isDataActive =
    basePath === '/du-lieu' ||
    basePath === '/data' ||
    basePath === '/luu-tru' ||
    basePath === '/sleeping-explorers';
  const isProductsActive =
    basePath === '/san-pham' ||
    basePath === '/san-pham-doi' ||
    basePath.startsWith('/poster/');

  const navItems = [
    {
      index: '01',
      labelVi: 'Hành Trình',
      labelEn: 'Journeys',
      subVi: 'Slide · Audio · Kể chuyện',
      subEn: 'Slide · Audio · Stories',
      route: '/hanh-trinh',
      active: isJourneysActive,
    },
    {
      index: '02',
      labelVi: 'Mô Phỏng STEM',
      labelEn: 'Challenges & Lab',
      subVi: '5 bước khám phá STEM',
      subEn: '5-Step STEM Challenges',
      route: '/mo-phong',
      active: isSimulationsActive,
    },
    {
      index: '03',
      labelVi: 'Dữ Liệu',
      labelEn: 'Science Data',
      subVi: 'Hồ sơ sứ mệnh · Thiết bị',
      subEn: 'Missions · Instruments',
      route: '/du-lieu',
      active: isDataActive,
    },
    {
      index: '',
      labelVi: 'Góc Nghệ Thuật',
      labelEn: 'Art Gallery',
      subVi: 'MV · Poster · Truyện tranh',
      subEn: 'MV · Poster · Comic',
      route: '/san-pham',
      active: isProductsActive,
    },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full h-20 border-b border-[#182333] text-[#F0EDE5] shadow-xl"
        style={{ backgroundColor: '#060912' }}
      >
        <div className="max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-6 xl:px-8 h-full flex items-center justify-between gap-2 xl:gap-4">
          {/* Left: Editorial Wordmark & Archival Subtitle */}
          <button
            type="button"
            onClick={() => handleNav('/')}
            className="group flex items-center gap-2.5 sm:gap-3 py-1.5 min-h-[44px] text-left cursor-pointer focus-visible:outline-none shrink-0"
            aria-label={isEn ? 'Home — Beyond The Signal' : 'Trang chủ — Beyond The Signal'}
          >
            {/* Minimal Orbital Emblem */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D2A071]/50 group-hover:border-[#D2A071] bg-[#162A40] flex items-center justify-center transition-colors shrink-0">
              <svg viewBox="0 0 32 32" className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true">
                <ellipse
                  cx="16"
                  cy="16"
                  rx="12"
                  ry="5.5"
                  transform="rotate(-28 16 16)"
                  fill="none"
                  stroke="#D2A071"
                  strokeWidth="1.4"
                  strokeOpacity="0.9"
                />
                <circle cx="16" cy="16" r="2.2" fill="#F0EDE5" />
                <circle cx="24.5" cy="11.5" r="1.9" fill="#C96F46" />
              </svg>
            </div>

            <div className="flex flex-col whitespace-nowrap shrink-0">
              <span className="font-sans text-base sm:text-lg xl:text-xl font-bold tracking-tight text-[#F0EDE5] group-hover:text-[#D2A071] transition-colors leading-none whitespace-nowrap">
                BEYOND THE SIGNAL
              </span>
              <span className="font-sans text-[11px] sm:text-xs font-medium text-[#AAB8C7] mt-1 leading-none whitespace-nowrap hidden sm:inline">
                {isEn
                  ? 'NASA Space Exploration Museum'
                  : 'Bảo tàng Di sản Thám hiểm NASA'}
              </span>
              <div className="flex items-center gap-1 mt-0.5 text-[#D2A071] text-[8px] select-none" aria-hidden="true">
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
              </div>
            </div>
          </button>

          {/* Center Navigation: 4 Main Museum Pillars */}
          <nav
            className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 h-full shrink"
            aria-label={isEn ? 'Primary Museum Navigation' : 'Điều hướng chính của bảo tàng'}
          >
            {navItems.map((item) => (
              <button
                key={item.route}
                type="button"
                onClick={() => handleNav(item.route)}
                aria-current={item.active ? 'page' : undefined}
                className={`relative h-full px-2.5 xl:px-3.5 flex items-center gap-1.5 transition-colors cursor-pointer group ${
                  item.active
                    ? 'text-[#F0EDE5]'
                    : 'text-[#AAB8C7] hover:text-[#F0EDE5]'
                }`}
              >
                {item.index ? (
                  <span
                    className={`font-mono text-[12px] xl:text-[13px] transition-colors ${
                      item.active ? 'text-[#D2A071] font-semibold' : 'text-[#D2A071]/70 group-hover:text-[#D2A071]'
                    }`}
                  >
                    {item.index}
                  </span>
                ) : (
                  <span className="text-[#D2A071] text-xs">✦</span>
                )}
                <span className="font-sans text-[13.5px] xl:text-[15px] font-medium whitespace-nowrap">
                  {isEn ? item.labelEn : item.labelVi}
                </span>
                {item.active && (
                  <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#D2A071] rounded-t-sm" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Tools: Universal Search + Explorer ID Pass + Prominent VI | EN Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* 1. Universal Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOverlayOpen(true)}
              className="min-h-[38px] sm:min-h-[42px] flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-[#101E30] hover:bg-[#162A40] border border-[#2B4461]/60 hover:border-[#D2A071]/60 text-[#AAB8C7] hover:text-[#F0EDE5] text-xs sm:text-sm transition-colors cursor-pointer rounded-sm whitespace-nowrap shrink-0"
              aria-label={
                isEn
                  ? 'Search journeys, simulations, and NASA hardware data'
                  : 'Tìm kiếm hành trình, mô phỏng và dữ liệu tàu NASA'
              }
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D2A071] shrink-0" />
              <span className="font-sans text-xs sm:text-sm whitespace-nowrap">
                {isEn ? 'Search...' : 'Tra cứu...'}
              </span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] sm:text-xs font-mono text-[#AAB8C7] bg-[#070B14] border border-[#2B4461]/60 rounded-sm ml-0.5">
                ⌘K
              </kbd>
            </button>

            {/* 2. Thẻ ID / Explorer Pass Button */}
            <button
              type="button"
              onClick={onOpenAuth}
              className={`min-h-[38px] sm:min-h-[42px] inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm border transition-colors cursor-pointer rounded-sm whitespace-nowrap shrink-0 ${
                userAlias
                  ? 'bg-[#162A40] text-[#F0EDE5] border-[#D2A071]/65 hover:border-[#D2A071]'
                  : 'bg-[#101E30] text-[#F0EDE5] border-[#2B4461]/60 hover:border-[#D2A071]/60 hover:bg-[#162A40]'
              }`}
              aria-label={
                userAlias
                  ? `${isEn ? 'Explorer Pass:' : 'Thẻ ID Nhà Thám Hiểm:'} ${userAlias}`
                  : isEn
                  ? 'Open Explorer Pass'
                  : 'Mở Thẻ ID Nhà Thám Hiểm'
              }
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  userAlias ? 'bg-[#D2A071]' : 'bg-[#AAB8C7]/70'
                }`}
              />
              <span className="font-sans text-xs sm:text-sm font-medium text-[#D2A071] hidden sm:inline">
                {isEn ? 'Explorer Pass' : 'Thẻ ID'}
              </span>
              {userAlias ? (
                <span className="font-sans font-medium text-xs sm:text-sm text-[#F0EDE5] max-w-[90px] sm:max-w-[110px] truncate border-l border-[#AAB8C7]/20 pl-1.5">
                  {userAlias}
                </span>
              ) : (
                <span className="font-sans text-xs sm:text-sm text-[#F0EDE5] sm:hidden">
                  {isEn ? 'Pass' : 'Thẻ ID'}
                </span>
              )}
            </button>

            {/* 3. Prominent VI | EN Language Switcher */}
            {onToggleLang && (
              <button
                type="button"
                onClick={onToggleLang}
                className="min-h-[38px] sm:min-h-[42px] inline-flex items-center p-0.5 sm:p-1 bg-[#101E30] border border-[#2B4461]/60 hover:border-[#D2A071]/65 rounded-sm text-xs font-mono transition-colors cursor-pointer shrink-0"
                aria-label={isEn ? 'Switch language to Vietnamese' : 'Chuyển ngôn ngữ sang Tiếng Anh'}
                title={isEn ? 'Switch language (VI / EN)' : 'Chuyển đổi ngôn ngữ (VI / EN)'}
              >
                <span
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[2px] transition-colors font-bold ${
                    !isEn
                      ? 'bg-[#D2A071] text-[#070B14]'
                      : 'text-[#AAB8C7] hover:text-[#F0EDE5]'
                  }`}
                >
                  VI
                </span>
                <span
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[2px] transition-colors font-bold ${
                    isEn
                      ? 'bg-[#D2A071] text-[#070B14]'
                      : 'text-[#AAB8C7] hover:text-[#F0EDE5]'
                  }`}
                >
                  EN
                </span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-w-[42px] min-h-[42px] flex items-center justify-center p-2 text-[#F0EDE5] hover:text-[#D2A071] bg-[#162A40] border border-[#AAB8C7]/20 rounded-sm cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={
                mobileMenuOpen
                  ? isEn
                    ? 'Close navigation menu'
                    : 'Đóng menu điều hướng'
                  : isEn
                  ? 'Open navigation menu'
                  : 'Mở menu điều hướng'
              }
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer (<lg) */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label={isEn ? 'Mobile navigation' : 'Menu di động'}
            className="lg:hidden bg-[#101E30]/98 backdrop-blur-xl border-b border-[#AAB8C7]/20 px-4 py-4 space-y-2.5 shadow-2xl"
          >
            {navItems.map((item) => (
              <button
                key={item.route}
                type="button"
                onClick={() => handleNav(item.route)}
                aria-current={item.active ? 'page' : undefined}
                className={`min-h-[52px] w-full text-left px-4 py-3 rounded-sm border flex items-center justify-between transition-colors cursor-pointer ${
                  item.active
                    ? 'bg-[#21374D] border-[#D2A071]/70 text-[#F0EDE5]'
                    : 'bg-[#162A40] border-[#AAB8C7]/15 text-[#F0EDE5] hover:border-[#D2A071]/45'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="font-mono text-sm font-semibold text-[#D2A071]">
                    {item.index || '✦'}
                  </span>
                  <div>
                    <div className="font-sans text-base font-semibold">
                      {isEn ? item.labelEn : item.labelVi}
                    </div>
                    <div className="font-sans text-sm text-[#AAB8C7]">
                      {isEn ? item.subEn : item.subVi}
                    </div>
                  </div>
                </div>
                <span className="font-mono text-sm text-[#D2A071]">→</span>
              </button>
            ))}

            <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#AAB8C7]/15">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="flex-1 min-h-[44px] px-4 py-2.5 bg-[#162A40] border border-[#D2A071]/45 text-sm font-sans font-medium text-[#F0EDE5] rounded-sm text-center cursor-pointer"
              >
                {userAlias
                  ? `${isEn ? 'Explorer Pass:' : 'Thẻ ID:'} ${userAlias}`
                  : isEn
                  ? 'Issue Explorer ID Pass'
                  : 'Mở Thẻ ID Nhà Thám Hiểm'}
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* Universal Archival Search Modal */}
      {searchOverlayOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={
            isEn
              ? 'Search Journeys, Simulations, and Open Science Data'
              : 'Tìm kiếm Hành trình, Mô phỏng và Dữ liệu Khoa học'
          }
          className="fixed inset-0 z-50 bg-[#0B1422]/85 backdrop-blur-md flex flex-col p-4 sm:p-8"
          onClick={() => setSearchOverlayOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full mx-auto my-auto bg-[#101E30] border border-[#D2A071]/30 shadow-2xl rounded-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-[#162A40] border-b border-[#AAB8C7]/15 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D2A071]" />
                <span className="font-sans text-sm font-semibold text-[#D2A071]">
                  {isEn
                    ? 'Museum Archive Index · Journeys · Challenges · Data'
                    : 'Tra cứu toàn Bảo tàng · Hành trình · Thử thách · Dữ liệu'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSearchOverlayOpen(false)}
                className="p-2 text-[#AAB8C7] hover:text-[#F0EDE5] cursor-pointer rounded-sm"
                aria-label={isEn ? 'Close search' : 'Đóng cửa sổ tìm kiếm'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input & Pillar Filters */}
            <div className="p-5 space-y-4 border-b border-[#AAB8C7]/15">
              <div className="relative">
                <Search className="w-4 h-4 text-[#D2A071] absolute left-3.5 top-3.5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isEn
                      ? 'Search Opportunity, Pioneer 11, instruments, signal delay...'
                      : 'Nhập tên tàu (Opportunity, Pioneer 11, Viking 1), mô phỏng vật lý, thiết bị...'
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0B1422] border border-[#AAB8C7]/25 focus:border-[#D2A071] text-[#F0EDE5] placeholder-[#AAB8C7]/60 font-sans text-base focus:outline-none rounded-sm"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', vi: 'Tất cả mục', en: 'All Sections' },
                  { id: 'journeys', vi: '01 · Hành Trình', en: '01 · Journeys' },
                  { id: 'simulations', vi: '02 · Thử Thách & Mô Phỏng', en: '02 · Challenges & Lab' },
                  { id: 'data', vi: '03 · Dữ Liệu Khoa Học', en: '03 · Science Data' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                    className={`px-3.5 py-1.5 text-sm font-sans font-medium rounded-sm border transition-colors cursor-pointer ${
                      activeFilter === tab.id
                        ? 'bg-[#D2A071] text-[#0B1422] border-[#D2A071] font-semibold'
                        : 'bg-[#162A40] text-[#AAB8C7] border-[#AAB8C7]/20 hover:text-[#F0EDE5]'
                    }`}
                  >
                    {isEn ? tab.en : tab.vi}
                  </button>
                ))}
              </div>
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto divide-y divide-[#AAB8C7]/12">
              {filteredSearchResults.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.route)}
                  className="w-full text-left px-6 py-4 hover:bg-[#162A40] transition-colors flex items-start justify-between gap-4 group cursor-pointer"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[13px] font-sans font-medium px-2.5 py-0.5 rounded-sm border ${
                          item.pillar === 'journeys'
                            ? 'bg-[#C96F46]/18 border-[#C96F46]/45 text-[#F0EDE5]'
                            : item.pillar === 'simulations'
                            ? 'bg-[#D2A071]/18 border-[#D2A071]/45 text-[#DFB58C]'
                            : 'bg-[#21374D] border-[#AAB8C7]/25 text-[#AAB8C7]'
                        }`}
                      >
                        {isEn ? item.badgeEn : item.badgeVi}
                      </span>
                      <span className="font-mono text-[13px] text-[#AAB8C7]">
                        {item.routeLabel}
                      </span>
                    </div>
                    <div className="font-display font-semibold text-lg text-[#F0EDE5] group-hover:text-[#D2A071] transition-colors">
                      {isEn ? item.titleEn : item.titleVi}
                    </div>
                    <p className="font-sans text-sm text-[#AAB8C7] line-clamp-2 leading-relaxed">
                      {isEn ? item.descEn : item.descVi}
                    </p>
                  </div>
                  <span className="font-sans text-sm font-medium text-[#D2A071] group-hover:translate-x-1 transition-transform shrink-0 pt-1">
                    {isEn ? 'Open →' : 'Mở →'}
                  </span>
                </button>
              ))}

              {filteredSearchResults.length === 0 && (
                <div className="p-10 text-center text-base font-sans text-[#AAB8C7]">
                  {isEn
                    ? `No archival entries found matching "${searchQuery}".`
                    : `Không tìm thấy mục nào khớp với từ khóa "${searchQuery}".`}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 bg-[#162A40] border-t border-[#AAB8C7]/15 flex items-center justify-between text-[13px] font-sans text-[#AAB8C7]">
              <span>
                {isEn
                  ? 'Direct navigation to Journeys, Challenges & Open Data'
                  : 'Điều hướng trực tiếp tới Hành Trình, Thử Thách & Dữ Liệu'}
              </span>
              <span className="font-mono">ESC {isEn ? 'to close' : 'để đóng'}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
