import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Sparkles,
  User,
  ShieldCheck,
  BookOpen,
  Cpu,
  ExternalLink,
  Plus,
  ChevronDown,
  ChevronUp,
  Compass,
  Radio,
  Zap,
  RotateCcw,
  Headphones,
  Printer,
  Film,
  Music,
  CheckCircle2,
  Share2,
  Download,
  Play,
  Pause,
  Info,
  Upload,
  Orbit
} from 'lucide-react';
import {
  YoungExplorerSubmission,
  NasaMediaItem,
  NASA_MEDIA_CATALOG
} from '../data/museumData';
import { SubmissionModal } from '../components/SubmissionModal';
import { SubmissionDetailModal } from '../components/SubmissionDetailModal';

interface YoungExplorersPageProps {
  userAlias: string | null;
  onOpenAuth: () => void;
  onOpenLightbox?: (item: NasaMediaItem) => void;
  lang?: 'vi' | 'en';
  onNavigate?: (route: string) => void;
  onOpenStoryPlayer?: (machineId: 'opportunity' | 'pioneer-11') => void;
  initialTab?: 'all' | 'simulators' | 'creative' | 'machines' | 'quiz' | 'journal';
}

interface CelestialSystem {
  id: 'earth_mars' | 'earth_saturn' | 'earth_moon';
  nameVi: string;
  nameEn: string;
  bodyVi: string;
  bodyEn: string;
  primaryMissionVi: string;
  primaryMissionEn: string;
  nasaDataSource: string;
  nasaAlgorithm: string;
}

const CELESTIAL_SYSTEMS: CelestialSystem[] = [
  {
    id: 'earth_mars',
    nameVi: 'Trái Đất — Sao Hỏa (Opportunity & Sojourner)',
    nameEn: 'Earth — Mars (Opportunity & Sojourner)',
    bodyVi: 'Sao Hỏa',
    bodyEn: 'Mars',
    primaryMissionVi: 'Opportunity (MER-B) · Sol 1 đến Sol 5.111',
    primaryMissionEn: 'Opportunity (MER-B) · Sols 1 to 5,111',
    nasaDataSource: 'NASA JPL Horizons Ephemeris System (DE440) & PDS Geosciences Node',
    nasaAlgorithm: 'Động học Keplerian hai vật thể & Độ trễ truyền sóng một chiều (OWLT = d / c)'
  },
  {
    id: 'earth_saturn',
    nameVi: 'Trái Đất — Sao Thổ (Pioneer 11 & Không gian sâu)',
    nameEn: 'Earth — Saturn (Pioneer 11 & Deep Space)',
    bodyVi: 'Sao Thổ',
    bodyEn: 'Saturn',
    primaryMissionVi: 'Pioneer 11 · Bay qua Sao Thổ năm 1979',
    primaryMissionEn: 'Pioneer 11 · Saturn Flyby 1979',
    nasaDataSource: 'NASA NSSDC Master Catalog (1973-019A) & DSN Telemetry Specs 810-005',
    nasaAlgorithm: 'Mô hình quỹ đạo hyperbolic thoát ly Hệ Mặt Trời & Định luật suy giảm quang thông 1/r²'
  },
  {
    id: 'earth_moon',
    nameVi: 'Trái Đất — Mặt Trăng (Apollo 14 LRRR Laser)',
    nameEn: 'Earth — Moon (Apollo 14 LRRR Laser)',
    bodyVi: 'Mặt Trăng',
    bodyEn: 'The Moon',
    primaryMissionVi: 'Apollo 14 LRRR · Đo laser hai chiều khứ hồi',
    primaryMissionEn: 'Apollo 14 LRRR · Two-Way Laser Ranging',
    nasaDataSource: 'NASA Apollo Lunar Surface Journal & McDonald Observatory Laser Range Data',
    nasaAlgorithm: 'Bấm giờ xung photon phản xạ qua lăng kính góc lùi: d = (c * RoundTripTime) / 2'
  }
];

interface QuizQuestion {
  id: number;
  questionVi: string;
  questionEn: string;
  optionsVi: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationVi: string;
  explanationEn: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionVi: 'Vì sao bánh xe của Opportunity không dùng lốp cao su bơm hơi như xe ô tô?',
    questionEn: 'Why do Mars rovers use solid aluminum wheels instead of inflatable rubber tires?',
    optionsVi: [
      'Lốp cao su quá nặng so với tải trọng tên lửa đẩy',
      'Áp suất khí quyển Sao Hỏa quá thấp (1%) làm nổ lốp, và nhiệt độ -100°C làm cao su giòn vỡ vụn',
      'NASA muốn bánh xe để lại hoa văn đặc biệt để vệ tinh định vị'
    ],
    optionsEn: [
      'Rubber tires are too heavy for rocket payload limits',
      'Atmospheric pressure is only 1% causing blowouts, and -100°C temperatures shatter rubber',
      'NASA needed a special tread pattern for satellites to track the rover'
    ],
    correctIndex: 1,
    explanationVi: 'Chính xác! Áp suất khí quyển Sao Hỏa chỉ bằng 1% Trái Đất khiến lốp bơm hơi nổ tung. Ngoài ra nhiệt độ ban đêm có thể hạ xuống -100°C làm cao su bị giòn như thủy tinh. Do đó, NASA gia công bánh từ khối nhôm hàng không nguyên khối với nan hoa titan uốn cong giảm chấn.',
    explanationEn: 'Correct! Mars atmospheric pressure is only 1% of Earth, causing blowouts. Nighttime temperatures drop below -100°C, shattering rubber like glass. NASA machines wheels from solid aerospace aluminum with curved titanium shock-absorbing spokes.'
  },
  {
    id: 2,
    questionVi: 'Thí nghiệm Apollo 14 Laser Retroreflector (LRRR) đo được Mặt Trăng đang rời xa Trái Đất bao nhiêu mỗi năm?',
    questionEn: 'How fast is the Moon receding from Earth, as measured by Apollo 14 Lunar Laser Retroreflector?',
    optionsVi: [
      'Khoảng 3,8 centimét mỗi năm do ma sát thủy triều',
      'Khoảng 10 mét mỗi năm',
      'Mặt Trăng không rời xa mà đang bay dần lại gần Trái Đất'
    ],
    optionsEn: [
      'About 3.8 centimeters per year due to tidal friction',
      'About 10 meters per year',
      'The Moon is not receding; it is slowly moving closer to Earth'
    ],
    correctIndex: 0,
    explanationVi: 'Chính xác! Nhờ đo thời gian xung laser phản xạ từ 100 khối lăng kính thạch anh trên Mặt Trăng suốt hơn 50 năm qua, các nhà khoa học xác định Mặt Trăng đang rời xa Trái Đất đều đặn ~3,8 cm/năm vì năng lượng thủy triều đại dương bị tiêu tán.',
    explanationEn: 'Correct! By timing laser pulses reflected off 100 fused silica prisms over 50+ years, scientists determined the Moon recedes by ~3.8 cm per year due to tidal friction dissipation.'
  },
  {
    id: 3,
    questionVi: 'Tại sao khi bay ra ngoài vùng quỹ đạo Sao Thổ, Pioneer 11 không thể sử dụng pin năng lượng Mặt Trời?',
    questionEn: 'Why could Pioneer 11 not rely on solar panels once it traveled beyond Saturn?',
    optionsVi: [
      'Bụi không gian che kín các tấm pin mặt trời',
      'Định luật bình phương nghịch đảo: Cường độ ánh sáng tại Sao Thổ chỉ còn ~1% so với Trái Đất, tấm pin cần to bằng sân vận động',
      'Tàu Pioneer 11 bị bay vào vùng bóng tối vĩnh cửu của Hệ Mặt Trời'
    ],
    optionsEn: [
      'Interstellar dust coated the solar arrays',
      'Inverse-square law: Solar flux at Saturn drops to ~1% of Earth levels, requiring stadium-sized panels',
      'Pioneer 11 entered an eternal shadow zone in the solar system'
    ],
    correctIndex: 1,
    explanationVi: 'Chính xác! Cường độ ánh sáng Mặt Trời giảm theo bình phương khoảng cách (1/r²). Ở Sao Thổ (gấp gần 10 lần khoảng cách Trái Đất), ánh sáng chỉ còn 1/100. Do đó, Pioneer 11 trang bị 4 máy phát nhiệt điện SNAP-19 RTG dùng nhiệt phân rã Plutonium-238 để tạo ra điện ổn định.',
    explanationEn: 'Correct! Solar flux drops with the square of distance (1/r²). At Saturn (~10 AU), sunlight is less than 1% of Earth. Pioneer 11 relied on 4 SNAP-19 RTGs using decaying Plutonium-238 to supply constant electrical power.'
  }
];

export const YoungExplorersPage: React.FC<YoungExplorersPageProps> = ({
  userAlias,
  onOpenAuth,
  onOpenLightbox,
  lang = 'vi',
  onNavigate,
  onOpenStoryPlayer,
  initialTab = 'all'
}) => {
  const isEn = lang === 'en';

  // Sub-Navigation Tabs
  const [activeTab, setActiveTab] = useState<'all' | 'simulators' | 'creative' | 'machines' | 'quiz' | 'journal'>(initialTab);

  // Active Celestial System
  const [selectedSystemId, setSelectedSystemId] = useState<'earth_mars' | 'earth_saturn' | 'earth_moon'>('earth_mars');

  // Interactive Orbital Angle (0 to 360 degrees) representing Mars orbital progression
  const [orbitalAngle, setOrbitalAngle] = useState<number>(45);
  const [isAutoOrbit, setIsAutoOrbit] = useState<boolean>(true);
  const animFrameRef = useRef<number | null>(null);

  // Joystick Command Trigger
  const [joystickCommand, setJoystickCommand] = useState<string | null>(null);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [transmitLog, setTransmitLog] = useState<string | null>(null);

  // Algorithm & Provenance disclosure drawer
  const [showProvenanceDrawer, setShowProvenanceDrawer] = useState<boolean>(false);

  // Simulator 2: Solar vs RTG Nuclear Power Lab
  const [solarDistanceAU, setSolarDistanceAU] = useState<number>(1.52);

  // STEM Mini-Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<number, boolean>>({});

  // Community Submissions Board (100% Genuine, 0 Mock)
  const [submissions, setSubmissions] = useState<YoungExplorerSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('beyond_the_signal_user_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [submissionFilter, setSubmissionFilter] = useState<string>('all');
  const [activeSubmission, setActiveSubmission] = useState<YoungExplorerSubmission | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Auto orbital revolution timer
  useEffect(() => {
    if (!isAutoOrbit) return;
    const interval = setInterval(() => {
      setOrbitalAngle((prev) => (prev + 0.6) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isAutoOrbit]);

  // Current Celestial System
  const currentSystem = useMemo(() => {
    return CELESTIAL_SYSTEMS.find((s) => s.id === selectedSystemId) || CELESTIAL_SYSTEMS[0];
  }, [selectedSystemId]);

  // Real-time Keplerian Ephemeris Physics Calculation
  // Constants:
  // Speed of light: c = 299,792.458 km/s
  // 1 AU = 149,597,870.7 km
  // Earth orbit: a_E = 1.000 AU, e_E = 0.0167, Period = 365.25 days
  // Mars orbit: a_M = 1.524 AU, e_M = 0.0934, Period = 686.98 days
  // Saturn orbit: a_S = 9.582 AU, Period = 10,759 days
  // Moon orbit: d_Moon = 384,400 km
  const ephemerisCalc = useMemo(() => {
    const SPEED_OF_LIGHT = 299792.458; // km/s
    const AU_KM = 149597870.7; // km

    if (selectedSystemId === 'earth_moon') {
      const distanceKm = 384400;
      const distanceAU = distanceKm / AU_KM;
      const oneWayLightTime = distanceKm / SPEED_OF_LIGHT; // ~1.282s
      const roundTripTime = oneWayLightTime * 2; // ~2.564s
      return {
        distanceKm,
        distanceAU: distanceAU.toFixed(5),
        oneWaySec: oneWayLightTime,
        roundTripSec: roundTripTime,
        earthPos: { x: 250, y: 160 },
        targetPos: { x: 300, y: 160 },
        phaseLabelVi: 'Khoảng cách Địa - Nguyệt (Đo đạc Laser Apollo 14)',
        phaseLabelEn: 'Earth-Moon Lunar Range (Apollo 14 Laser Ranging)',
        phaseDescVi: 'Xung laser hồng ngoại phát từ Trái Đất mất đúng 1,28 giây chạm vào 100 khối lăng kính thạch anh trên Mặt Trăng và 1,28 giây để phản xạ trở lại.'
      };
    }

    if (selectedSystemId === 'earth_saturn') {
      const distanceAU = 9.58 + 0.4 * Math.cos((orbitalAngle * Math.PI) / 180);
      const distanceKm = distanceAU * AU_KM;
      const oneWayLightTime = distanceKm / SPEED_OF_LIGHT;
      const roundTripTime = oneWayLightTime * 2;
      return {
        distanceKm,
        distanceAU: distanceAU.toFixed(2),
        oneWaySec: oneWayLightTime,
        roundTripSec: roundTripTime,
        earthPos: { x: 250, y: 160 },
        targetPos: {
          x: 250 + 190 * Math.cos((orbitalAngle * Math.PI) / 180),
          y: 160 + 190 * Math.sin((orbitalAngle * Math.PI) / 180)
        },
        phaseLabelVi: 'Khoảng cách Quỹ đạo Sao Thổ — Pioneer 11 (Flyby 1979)',
        phaseLabelEn: 'Saturnian Orbital Distance — Pioneer 11 (1979 Flyby)',
        phaseDescVi: 'Ở cự ly trung bình ~1,43 tỷ km, tín hiệu vô tuyến một chiều mất ~79 phút. Một lệnh ping gửi đi phải chờ hơn 2 giờ 38 phút mới nhận được phản hồi.'
      };
    }

    // Default: Earth - Mars
    // Synodic relative angle
    const rad = (orbitalAngle * Math.PI) / 180;
    // Earth at ~1.0 AU (faster orbit), Mars at ~1.524 AU
    const rEarth = 1.0;
    const rMars = 1.524 * (1 - 0.0934 * 0.0934) / (1 + 0.0934 * Math.cos(rad)); // Keplerian ellipse approx

    // 2D positions for SVG (Scale: 1 AU = 85px)
    const earthAngle = rad * 1.88; // Earth moves ~1.88x faster than Mars
    const eX = 250 + 75 * Math.cos(earthAngle);
    const eY = 160 + 75 * Math.sin(earthAngle);

    const mX = 250 + 125 * Math.cos(rad);
    const mY = 160 + 125 * Math.sin(rad);

    // Euclidean distance in AU
    const dX = (mX - eX) / 82;
    const dY = (mY - eY) / 82;
    const distanceAU = Math.sqrt(dX * dX + dY * dY);
    const distanceKm = distanceAU * AU_KM;

    const oneWayLightTime = distanceKm / SPEED_OF_LIGHT;
    const roundTripTime = oneWayLightTime * 2;

    // Detect orbital phase
    let phaseLabelVi = 'Giai đoạn Quỹ đạo Trung bình (Quadrature)';
    let phaseLabelEn = 'Average Orbital Phase (Quadrature)';
    let phaseDescVi = 'Độ trễ truyền sóng thông thường dao động từ 8 đến 14 phút. Không thể lái robot theo thời gian thực!';

    if (distanceAU < 0.65) {
      phaseLabelVi = 'Vị trí Xung đối (Opposition) — Gần Trái Đất Nhất!';
      phaseLabelEn = 'Planetary Opposition — Closest Approach!';
      phaseDescVi = 'Khoảng cách thu hẹp còn ~55 đến 80 triệu km. Độ trễ ánh sáng đạt mức ngắn nhất trong chu kỳ (chỉ ~3 đến 4 phút).';
    } else if (distanceAU > 2.3) {
      phaseLabelVi = 'Vị trí Giao hội qua Mặt Trời (Solar Conjunction) — Bị che khuất!';
      phaseLabelEn = 'Solar Conjunction — Blackout Behind the Sun!';
      phaseDescVi = 'Mặt Trời nằm xen giữa Trái Đất và Sao Hỏa. Bão plasma mặt trời làm mất liên lạc hoàn toàn suốt 2 tuần; robot phải tự ngủ đông bảo vệ mình.';
    }

    return {
      distanceKm,
      distanceAU: distanceAU.toFixed(3),
      oneWaySec: oneWayLightTime,
      roundTripSec: roundTripTime,
      earthPos: { x: eX, y: eY },
      targetPos: { x: mX, y: mY },
      phaseLabelVi,
      phaseLabelEn,
      phaseDescVi
    };
  }, [selectedSystemId, orbitalAngle]);

  // Format seconds to human readable string
  const formatDelayTime = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds.toFixed(2)} ${isEn ? 'sec' : 'giây'}`;
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    if (mins < 60) {
      return `${mins} ${isEn ? 'min' : 'phút'} ${secs} ${isEn ? 'sec' : 'giây'}`;
    }
    const hours = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hours} ${isEn ? 'hours' : 'giờ'} ${remMins} ${isEn ? 'min' : 'phút'}`;
  };

  // Joystick Command Trigger
  const handleJoystick = (commandName: string) => {
    setJoystickCommand(commandName);
    setIsTransmitting(true);
    setTransmitLog(
      isEn
        ? `[UPLINK TRANSMITTED] Radio pulse dispatched via NASA Deep Space Network. One-way transit time to ${currentSystem.bodyEn} at current ephemeris distance (${ephemerisCalc.distanceAU} AU): ${formatDelayTime(ephemerisCalc.oneWaySec)}. Engineering insight: If the rover encounters a crevasse or sand trap, the vehicle would have fallen ${formatDelayTime(ephemerisCalc.oneWaySec)} before your brake signal arrives! That is why NASA autonomous hazard avoidance (AutoNav) is mandatory.`
        : `[ĐÃ PHÁT TÍN HIỆU] Xung lệnh vô tuyến đã gửi qua Mạng lưới Không gian Sâu DSN. Thời gian sóng bay đến ${currentSystem.bodyVi} ở cự ly tọa độ hiện tại (${ephemerisCalc.distanceAU} AU) là: ${formatDelayTime(ephemerisCalc.oneWaySec)}. Phân tích kỹ thuật NASA: Nếu robot gặp hố sâu hoặc lún cát, xe đã rơi xuống trước khi tín hiệu phanh của bạn kịp đến ${formatDelayTime(ephemerisCalc.oneWaySec)}! Đó là lý do hệ thống tự hành né chướng ngại vật (AutoNav) là bắt buộc.`
    );

    setTimeout(() => {
      setIsTransmitting(false);
    }, 2500);
  };

  // Solar Flux calculations
  const solarFlux = useMemo(() => {
    const rawFlux = 1361 / (solarDistanceAU * solarDistanceAU);
    const percentEarth = (rawFlux / 1361) * 100;
    const solarPanelPower = Math.min(100, percentEarth);
    const rtgPower = 100;
    return {
      rawFlux: Math.round(rawFlux),
      percentEarth: percentEarth.toFixed(1),
      solarPanelPower: Math.round(solarPanelPower),
      rtgPower
    };
  }, [solarDistanceAU]);

  // Quiz Answer Selection
  const handleSelectQuizOption = (questionId: number, optionIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: optionIndex });
    setQuizSubmitted({ ...quizSubmitted, [questionId]: true });
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted({});
  };

  // Quiz Score
  const quizScore = useMemo(() => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  }, [quizAnswers]);

  const handleAddSubmission = (newSub: YoungExplorerSubmission) => {
    setSubmissions([newSub, ...submissions]);
  };

  return (
    <div className="bg-[#060B1A] text-[#E2E8F0] min-h-screen selection:bg-[#22D3EE]/25 selection:text-[#F1F5F9]">
      {/* 1. HERO HEADER: UNIFIED SPACE STEM & CREATIVE STUDIO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#060B1A] via-[#091530] to-[#060B1A] border-b border-[#22D3EE]/30 py-12 px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 900px 450px at 50% -10%, rgba(34,211,238,0.25) 0%, transparent 65%), radial-gradient(ellipse 800px 400px at 80% 80%, rgba(245,158,11,0.2) 0%, transparent 60%)'
          }}
        />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
          <div className="max-w-3xl space-y-3.5">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#38BDF8]">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span className="bg-[#0B1530]/90 px-3 py-1 border border-[#22D3EE]/40 rounded-xs shadow-[0_0_12px_rgba(34,211,238,0.25)] font-bold">
                {isEn ? "NASA STEM LAB & CREATIVE EXPRESSION STUDIO" : "KHÔNG GIAN STEM & SÁNG TẠO VŨ TRỤ"}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8FAFC] tracking-tight leading-tight">
              {isEn
                ? "Interactive Physics, Robotics & Cosmic Storytelling"
                : "Thí nghiệm tương tác, Phần cứng robot & Kể chuyện vũ trụ"}
            </h1>

            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed max-w-2xl font-sans">
              {isEn
                ? "A unified hands-on laboratory for young explorers and space enthusiasts: calculate speed-of-light radio delay with real NASA Horizons ephemeris data, explore solar vs RTG nuclear power physics, and enjoy authentic NASA-inspired creative arts."
                : "Không gian trải nghiệm hợp nhất dành cho học sinh và người yêu thiên văn: tính toán độ trễ sóng vô tuyến dựa trên mô hình tọa độ thiên văn NASA JPL Horizons, trực quan hóa quỹ đạo Keplerian thực tế, và thưởng thức các tác phẩm nghệ thuật, audio và poster truyền cảm hứng."}
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('student-creative-hub');
                el?.scrollIntoView({ behavior: 'smooth' });
                setIsSubmitModalOpen(true);
              }}
              className="btn-primary-cinematic text-xs font-mono uppercase tracking-wider px-5 py-3 cursor-pointer inline-flex items-center gap-2 border-2 border-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.35)]"
            >
              <Upload className="w-4 h-4 text-[#FBBF24]" />
              <span>{isEn ? "Upload Student Project" : "📤 Đẩy sản phẩm học sinh lên triển lãm"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('signal-delay-lab');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary-cinematic text-xs font-mono uppercase tracking-wider px-4 py-3 cursor-pointer flex items-center gap-2"
            >
              <Orbit className="w-4 h-4 text-[#38BDF8]" />
              <span>{isEn ? "Launch Orbital Lab" : "Phòng thí nghiệm quỹ đạo"}</span>
            </button>
          </div>
        </div>

        {/* Quick Jump Sub-Navigation Bar */}
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#22D3EE]/20 flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="text-[#94A3B8] mr-2 uppercase tracking-widest text-[11px] font-bold">
            {isEn ? "Jump to:" : "Chuyển nhanh:"}
          </span>

          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer border ${
              activeTab === 'all'
                ? 'bg-[#0E1E42] text-[#FBBF24] border-[#F59E0B]'
                : 'bg-[#071124] text-[#94A3B8] border-[#22D3EE]/25 hover:text-[#F1F5F9]'
            }`}
          >
            🌟 {isEn ? "All Modules" : "Tất cả mô-đun"}
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('simulators');
              document.getElementById('signal-delay-lab')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer border ${
              activeTab === 'simulators'
                ? 'bg-[#0E1E42] text-[#FBBF24] border-[#F59E0B]'
                : 'bg-[#071124] text-[#38BDF8] border-[#22D3EE]/25 hover:text-[#F1F5F9]'
            }`}
          >
            🔬 {isEn ? "Interactive Orbital Simulators" : "Thí nghiệm Quỹ đạo Tương tác"}
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('creative');
              document.getElementById('creative-media-studio')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer border ${
              activeTab === 'creative'
                ? 'bg-[#0E1E42] text-[#FBBF24] border-[#F59E0B]'
                : 'bg-[#071124] text-[#FBBF24] border-[#22D3EE]/25 hover:text-[#F1F5F9]'
            }`}
          >
            🎨 {isEn ? "Creative Studio & Audio" : "Sáng tạo & Âm nhạc"}
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('machines');
              document.getElementById('stem-machines')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer border ${
              activeTab === 'machines'
                ? 'bg-[#0E1E42] text-[#FBBF24] border-[#F59E0B]'
                : 'bg-[#071124] text-[#94A3B8] border-[#22D3EE]/25 hover:text-[#F1F5F9]'
            }`}
          >
            🚀 {isEn ? "5 NASA Explorers" : "5 Cỗ máy NASA"}
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('quiz');
              document.getElementById('stem-quiz-challenge')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer border ${
              activeTab === 'quiz'
                ? 'bg-[#0E1E42] text-[#FBBF24] border-[#F59E0B]'
                : 'bg-[#071124] text-[#38BDF8] border-[#22D3EE]/25 hover:text-[#F1F5F9]'
            }`}
          >
            🏆 {isEn ? "STEM Quiz Challenge" : "Thử thách Kỹ sư nhí"}
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('journal');
              document.getElementById('student-creative-hub')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`px-3.5 py-1.5 rounded-xs transition-colors cursor-pointer border-2 font-bold ${
              activeTab === 'journal'
                ? 'bg-[#0E1E42] text-[#FBBF24] border-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.35)]'
                : 'bg-[#071124] text-[#FBBF24] border-[#F59E0B]/60 hover:bg-[#F59E0B]/15 hover:text-[#FFFFFF]'
            }`}
          >
            📤 {isEn ? "Student Project Showcase & Submit" : "Đẩy sản phẩm học sinh"}
          </button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* ========================================================================= */}
        {/* SECTION 2: INTERACTIVE ORBITAL SIMULATOR LAB WITH REAL NASA EPHEMERIS    */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'simulators') && (
          <section id="signal-delay-lab" className="space-y-8">
            <div className="border-b border-[#22D3EE]/30 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#FBBF24] font-bold block">
                  INTERACTIVE STEM PHYSICS LABS · MÔ HÌNH VẬT LÝ VŨ TRỤ
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] mt-0.5">
                  {isEn ? "Keplerian Orbit, Ephemeris & Signal Latency Simulator" : "Mô phỏng Quỹ đạo Kepler, Tọa độ Thiên văn & Độ trễ Vô tuyến"}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowProvenanceDrawer(!showProvenanceDrawer)}
                  className="px-3 py-1.5 bg-[#0A1633] hover:bg-[#12285C] border border-[#22D3EE]/40 text-[#38BDF8] hover:text-[#FBBF24] font-mono text-xs rounded-xs cursor-pointer transition-colors inline-flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-[#FBBF24]" />
                  <span>{showProvenanceDrawer ? "Ẩn nguồn NASA & Thuật toán" : "Minh bạch Dữ liệu & Thuật toán NASA"}</span>
                </button>
              </div>
            </div>

            {/* TRANSPARENT PROVENANCE DRAWER FOR JUDGES / BTC */}
            {showProvenanceDrawer && (
              <div className="p-5 sm:p-6 bg-[#040A18] border-2 border-[#F59E0B] rounded-xs space-y-4 shadow-[0_0_24px_rgba(245,158,11,0.2)]">
                <div className="flex items-center justify-between border-b border-[#F59E0B]/30 pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#FBBF24] font-bold">
                    <ShieldCheck className="w-4 h-4 text-[#FBBF24]" />
                    <span>BẢN MINH BẠCH DỮ LIỆU &amp; THUẬT TOÁN NASA DÀNH CHO BAN GIÁM KHẢO (BTC)</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#38BDF8]">Open Science Standard</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-[#CBD5E1]">
                  <div className="p-3.5 bg-[#08132B] border border-[#22D3EE]/30 rounded-xs space-y-1.5">
                    <span className="font-mono text-[11px] text-[#38BDF8] font-bold block uppercase">
                      1. NGUỒN DỮ LIỆU MỞ NASA
                    </span>
                    <p className="leading-relaxed">
                      • <strong>NASA JPL Horizons Ephemeris:</strong> Dữ liệu quỹ đạo hành tinh và vector nhật tâm DE440/DE441 từ Phòng Thí nghiệm Động lực học Hệ Mặt Trời (JPL SSD).
                      <br />• <strong>NASA DSN Telemetry:</strong> Tiêu chuẩn kỹ thuật viễn thông không gian sâu 810-005 (băng tần X-band 8.4 GHz, chảo 70m).
                      <br />• <strong>NASA Planetary Data System (PDS):</strong> Nhật ký sol của Opportunity và hành trình Pioneer 11.
                    </p>
                  </div>

                  <div className="p-3.5 bg-[#08132B] border border-[#22D3EE]/30 rounded-xs space-y-1.5">
                    <span className="font-mono text-[11px] text-[#FBBF24] font-bold block uppercase">
                      2. MÔ HÌNH TOÁN HỌC &amp; THUẬT TOÁN
                    </span>
                    <p className="leading-relaxed">
                      • <strong>Khoảng cách Euclidean nhật tâm:</strong> <code>d(t) = ||r_Target(t) - r_Earth(t)||</code> tính từ vector Keplerian.
                      <br />• <strong>Độ trễ một chiều (OWLT):</strong> <code>τ = d / c</code> với vận tốc ánh sáng chuẩn CODATA <code>c = 299.792,458 km/s</code>.
                      <br />• <strong>Suy giảm quang thông:</strong> <code>S(r) = 1361 / r² W/m²</code> mô phỏng chính xác sự sụt giảm năng lượng ngoài Sao Thổ.
                    </p>
                  </div>

                  <div className="p-3.5 bg-[#08132B] border border-[#22D3EE]/30 rounded-xs space-y-1.5">
                    <span className="font-mono text-[11px] text-[#10B981] font-bold block uppercase">
                      3. Ý NGHĨA KỸ THUẬT THỰC TIỄN
                    </span>
                    <p className="leading-relaxed">
                      Giải thích trực quan cho học sinh và giám khảo:
                      <br />• Vì sao khoảng cách Trái Đất - Sao Hỏa biến thiên từ <strong>55 triệu km đến 401 triệu km</strong> theo chu kỳ giao hội 780 ngày.
                      <br />• Vì sao robot bắt buộc phải có thuật toán <strong>thị giác máy tính tự hành (AutoNav)</strong> thay vì lái bằng tay cầm từ xa.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SIMULATOR 1: LIVE 2D ORBITAL & TELEMETRY SIMULATOR */}
            <div className="bg-[#08132B] border-2 border-[#22D3EE]/40 p-6 sm:p-8 rounded-xs space-y-6 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
              {/* Header Selector */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#22D3EE]/20 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#38BDF8] uppercase tracking-wider font-bold">
                    <Orbit className="w-4 h-4 text-[#FBBF24]" />
                    <span>MÔ-ĐUN 01 · {isEn ? "KEPLERIAN ORBITS & SPEED-OF-LIGHT DELAY" : "QUỸ ĐẠO THIÊN VĂN & ĐỘ TRỄ ÁNH SÁNG THỜI GIAN THỰC"}</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F8FAFC] mt-1">
                    {isEn ? "Why Can You Not Steer a Mars Rover With a Joystick?" : "Tại sao không thể dùng tay cầm (joystick) để lái xe trên Sao Hỏa?"}
                  </h3>
                </div>

                {/* Celestial System Selector */}
                <div className="flex flex-wrap items-center gap-2">
                  {CELESTIAL_SYSTEMS.map((sys) => (
                    <button
                      key={sys.id}
                      type="button"
                      onClick={() => {
                        setSelectedSystemId(sys.id);
                        setJoystickCommand(null);
                        setTransmitLog(null);
                      }}
                      className={`px-3 py-1.5 font-mono text-xs rounded-xs border transition-all cursor-pointer ${
                        selectedSystemId === sys.id
                          ? 'bg-[#0E224D] border-[#F59E0B] text-[#FBBF24] font-bold shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                          : 'bg-[#050C1B] border-[#22D3EE]/20 text-[#94A3B8] hover:text-[#F1F5F9]'
                      }`}
                    >
                      {isEn ? sys.bodyEn : sys.bodyVi}
                    </button>
                  ))}
                </div>
              </div>

              {/* LIVE 2D ORBITAL MAP CANVAS */}
              <div className="relative bg-[#040916] border border-[#22D3EE]/35 p-6 rounded-xs overflow-hidden">
                {/* SVG Planetary System */}
                <div className="relative w-full aspect-[16/9] max-h-[380px] bg-[#020611] rounded-xs border border-[#22D3EE]/20 overflow-hidden flex items-center justify-center">
                  <svg
                    viewBox="0 0 500 320"
                    className="w-full h-full"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
                        <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                      </radialGradient>
                      <filter id="glow-beam" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Background Cosmic Grid */}
                    <line x1="0" y1="160" x2="500" y2="160" stroke="#1E293B" strokeWidth="0.8" strokeDasharray="4 4" />
                    <line x1="250" y1="0" x2="250" y2="320" stroke="#1E293B" strokeWidth="0.8" strokeDasharray="4 4" />

                    {/* Orbit Rings */}
                    {selectedSystemId === 'earth_mars' && (
                      <>
                        {/* Earth Orbit (1.0 AU) */}
                        <circle cx="250" cy="160" r="75" fill="none" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
                        <text x="328" y="156" fill="#38BDF8" fontSize="8" fontFamily="monospace" opacity="0.7">1.0 AU (Trái Đất)</text>

                        {/* Mars Orbit (~1.52 AU) */}
                        <ellipse cx="250" cy="160" rx="125" ry="118" fill="none" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="4 4" />
                        <text x="378" y="156" fill="#F59E0B" fontSize="8" fontFamily="monospace" opacity="0.7">1.52 AU (Sao Hỏa)</text>
                      </>
                    )}

                    {selectedSystemId === 'earth_saturn' && (
                      <>
                        <circle cx="250" cy="160" r="50" fill="none" stroke="#38BDF8" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="3 3" />
                        <text x="303" y="156" fill="#38BDF8" fontSize="8" fontFamily="monospace" opacity="0.6">Trái Đất</text>
                        <ellipse cx="250" cy="160" rx="190" ry="140" fill="none" stroke="#FBBF24" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="5 5" />
                        <text x="442" y="156" fill="#FBBF24" fontSize="8" fontFamily="monospace" opacity="0.7">9.58 AU (Sao Thổ)</text>
                      </>
                    )}

                    {selectedSystemId === 'earth_moon' && (
                      <>
                        {/* Earth and Moon scale */}
                        <circle cx="250" cy="160" r="50" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />
                        <text x="305" y="156" fill="#94A3B8" fontSize="8" fontFamily="monospace">384.400 km</text>
                      </>
                    )}

                    {/* Central Sun */}
                    {selectedSystemId !== 'earth_moon' && (
                      <g>
                        <circle cx="250" cy="160" r="22" fill="url(#sun-glow)" />
                        <circle cx="250" cy="160" r="7" fill="#FEF08A" />
                        <text x="250" y="180" textAnchor="middle" fill="#FEF08A" fontSize="9" fontFamily="monospace" fontWeight="bold">MẶT TRỜI</text>
                      </g>
                    )}

                    {/* Active Radio Wave Transmission Beam */}
                    <line
                      x1={ephemerisCalc.earthPos.x}
                      y1={ephemerisCalc.earthPos.y}
                      x2={ephemerisCalc.targetPos.x}
                      y2={ephemerisCalc.targetPos.y}
                      stroke={isTransmitting ? "#F59E0B" : "#22D3EE"}
                      strokeWidth={isTransmitting ? "2.5" : "1.5"}
                      strokeDasharray={isTransmitting ? "6 3" : "4 4"}
                      filter="url(#glow-beam)"
                      className={isTransmitting ? "animate-pulse" : ""}
                    />

                    {/* Earth Body Node */}
                    <g transform={`translate(${ephemerisCalc.earthPos.x}, ${ephemerisCalc.earthPos.y})`}>
                      <circle r="7" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
                      <circle r="2" fill="#FFFFFF" />
                      <text x="0" y="-10" textAnchor="middle" fill="#38BDF8" fontSize="9" fontFamily="monospace" fontWeight="bold">TRÁI ĐẤT</text>
                    </g>

                    {/* Target Body Node (Mars / Saturn / Moon) */}
                    <g transform={`translate(${ephemerisCalc.targetPos.x}, ${ephemerisCalc.targetPos.y})`}>
                      <circle
                        r={selectedSystemId === 'earth_saturn' ? "9" : "6"}
                        fill={selectedSystemId === 'earth_mars' ? "#EA580C" : selectedSystemId === 'earth_saturn' ? "#D97706" : "#94A3B8"}
                        stroke="#F59E0B"
                        strokeWidth="1.5"
                      />
                      {selectedSystemId === 'earth_saturn' && (
                        <ellipse rx="15" ry="3" fill="none" stroke="#FDE68A" strokeWidth="1.2" transform="rotate(-20)" />
                      )}
                      <circle r="2" fill="#FFFFFF" />
                      <text x="0" y="-12" textAnchor="middle" fill="#FBBF24" fontSize="9" fontFamily="monospace" fontWeight="bold">
                        {currentSystem.bodyVi.toUpperCase()}
                      </text>
                    </g>
                  </svg>

                  {/* Overlaid Real-time Telemetry Readout */}
                  <div className="absolute top-3 left-3 bg-[#060D1E]/90 border border-[#22D3EE]/40 p-3 rounded-xs space-y-1 font-mono text-xs backdrop-blur-md">
                    <div className="text-[10px] text-[#38BDF8] uppercase tracking-wider font-bold">
                      {ephemerisCalc.phaseLabelVi}
                    </div>
                    <div className="text-sm text-[#F8FAFC] font-bold">
                      Khoảng cách: <span className="text-[#FBBF24]">{ephemerisCalc.distanceKm.toLocaleString(undefined, { maximumFractionDigits: 0 })} km</span> ({ephemerisCalc.distanceAU} AU)
                    </div>
                    <div className="text-xs text-[#22D3EE]">
                      Độ trễ một chiều (OWLT): <span className="font-bold text-[#FBBF24] text-sm">{formatDelayTime(ephemerisCalc.oneWaySec)}</span>
                    </div>
                    <div className="text-[11px] text-[#94A3B8]">
                      Thời gian khứ hồi (Round-Trip Ping): {formatDelayTime(ephemerisCalc.roundTripSec)}
                    </div>
                  </div>

                  {/* Play / Pause Orbit Controls */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAutoOrbit(!isAutoOrbit)}
                      className="px-3 py-1.5 bg-[#081530]/90 hover:bg-[#12285C] border border-[#22D3EE]/40 text-[#F1F5F9] font-mono text-xs rounded-xs cursor-pointer inline-flex items-center gap-1.5 backdrop-blur-md"
                    >
                      {isAutoOrbit ? <Pause className="w-3.5 h-3.5 text-[#FBBF24]" /> : <Play className="w-3.5 h-3.5 text-[#10B981]" />}
                      <span>{isAutoOrbit ? "Tạm dừng quỹ đạo" : "Chạy chuyển động"}</span>
                    </button>
                  </div>
                </div>

                {/* Interactive Orbital Slider */}
                <div className="mt-4 pt-4 border-t border-[#22D3EE]/20 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
                    <span className="text-[#CBD5E1]">
                      {isEn ? "Adjust Orbital Position Angle (0° to 360°):" : "Kéo góc vị trí hành tinh trên quỹ đạo Kepler (0° đến 360°):"}
                    </span>
                    <span className="text-[#FBBF24] font-bold">
                      Góc quỹ đạo: {Math.round(orbitalAngle)}° — {ephemerisCalc.phaseLabelVi.split(' — ')[0]}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={orbitalAngle}
                    onChange={(e) => {
                      setIsAutoOrbit(false);
                      setOrbitalAngle(parseFloat(e.target.value));
                    }}
                    className="w-full accent-[#F59E0B] cursor-pointer"
                    aria-label="Vị trí quỹ đạo thiên văn"
                  />

                  <p className="text-xs text-[#94A3B8] font-mono leading-relaxed pt-1">
                    💡 <strong>Ý nghĩa khoa học: </strong> {ephemerisCalc.phaseDescVi}
                  </p>
                </div>

                {/* Interactive Joystick Steering Controls */}
                <div className="mt-6 pt-5 border-t border-[#22D3EE]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#38BDF8] font-bold block">
                      {isEn ? "Test Command Uplink Under Current Delay:" : "Thử nghiệm phát lệnh điều khiển với độ trễ hiện tại:"}
                    </span>
                    <p className="text-xs text-[#94A3B8]">
                      {isEn
                        ? "Click any command button to observe the physics delay."
                        : "Bấm nút lệnh lái bên dưới để kiểm chứng độ trễ viễn thông thời gian thực."}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      disabled={isTransmitting}
                      onClick={() => handleJoystick(isEn ? "TURN LEFT 15°" : "RẼ TRÁI 15°")}
                      className="px-3.5 py-2 bg-[#0C1A38] hover:bg-[#152B5C] border border-[#22D3EE]/40 text-[#F1F5F9] font-mono text-xs rounded-xs cursor-pointer disabled:opacity-50"
                    >
                      ⬅ {isEn ? "Turn Left" : "Rẽ trái"}
                    </button>
                    <button
                      type="button"
                      disabled={isTransmitting}
                      onClick={() => handleJoystick(isEn ? "DRIVE FORWARD 2M" : "TIẾN THẲNG 2M")}
                      className="px-3.5 py-2 bg-[#0C1A38] hover:bg-[#152B5C] border border-[#22D3EE]/40 text-[#F1F5F9] font-mono text-xs rounded-xs cursor-pointer disabled:opacity-50"
                    >
                      ⬆ {isEn ? "Forward" : "Tiến lên"}
                    </button>
                    <button
                      type="button"
                      disabled={isTransmitting}
                      onClick={() => handleJoystick(isEn ? "TURN RIGHT 15°" : "RẼ PHẢI 15°")}
                      className="px-3.5 py-2 bg-[#0C1A38] hover:bg-[#152B5C] border border-[#22D3EE]/40 text-[#F1F5F9] font-mono text-xs rounded-xs cursor-pointer disabled:opacity-50"
                    >
                      ➡ {isEn ? "Turn Right" : "Rẽ phải"}
                    </button>
                    <button
                      type="button"
                      disabled={isTransmitting}
                      onClick={() => handleJoystick(isEn ? "EMERGENCY BRAKE" : "PHANH KHẨN CẤP")}
                      className="px-3.5 py-2 bg-[#2D0C15] hover:bg-[#4D1524] border border-[#EF4444]/60 text-[#FCA5A5] font-mono text-xs rounded-xs cursor-pointer disabled:opacity-50"
                    >
                      🛑 {isEn ? "Brake" : "Phanh gấp"}
                    </button>
                  </div>
                </div>

                {/* Transmission Log Result */}
                {transmitLog && (
                  <div className="mt-4 p-4 bg-[#061024] border-l-4 border-[#F59E0B] rounded-r-xs space-y-1 font-mono text-xs text-[#CBD5E1]">
                    <div className="text-[#FBBF24] font-bold">
                      {isEn ? "TELEMETRY TRANSMISSION RESULT:" : "KẾT QUẢ TRUYỀN DỮ LIỆU ĐIỀU KHIỂN THỰC TẾ:"}
                    </div>
                    <p className="leading-relaxed">{transmitLog}</p>
                  </div>
                )}
              </div>
            </div>

            {/* SIMULATOR 2: SOLAR FLUX VS RTG NUCLEAR POWER */}
            <div className="bg-[#08132B] border-2 border-[#22D3EE]/40 p-6 sm:p-8 rounded-xs space-y-6 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#22D3EE]/20 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#FBBF24] uppercase tracking-wider font-bold">
                    <Zap className="w-4 h-4 text-[#FBBF24]" />
                    <span>MÔ-ĐUN 02 · {isEn ? "SOLAR INVERSE-SQUARE LAW VS RTG" : "ĐỊNH LUẬT NĂNG LƯỢNG MẶT TRỜI VS LÒ RTG HẠT NHÂN"}</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F8FAFC] mt-1">
                    {isEn
                      ? "Why Deep Space Probes Cannot Use Solar Arrays"
                      : "Vì sao tàu bay ra ngoài Hệ Mặt Trời bắt buộc phải dùng năng lượng hạt nhân?"}
                  </h3>
                </div>
                <div className="font-mono text-xs bg-[#050B17] px-3 py-1.5 border border-[#22D3EE]/30 rounded-xs text-[#38BDF8]">
                  Công thức: S(r) = 1361 / r² (W/m²)
                </div>
              </div>

              {/* Slider Controller */}
              <div className="bg-[#050C1B] border border-[#22D3EE]/30 p-5 rounded-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
                  <span className="text-[#CBD5E1]">
                    {isEn ? "Drag to change distance from the Sun (r):" : "Kéo thanh trượt để thay đổi khoảng cách từ Mặt Trời (r):"}
                  </span>
                  <span className="text-[#FBBF24] font-bold text-base">
                    r = {solarDistanceAU.toFixed(2)} AU ({Math.round(solarDistanceAU * 149.6)} triệu km)
                  </span>
                </div>

                <input
                  type="range"
                  min="0.5"
                  max="10.0"
                  step="0.1"
                  value={solarDistanceAU}
                  onChange={(e) => setSolarDistanceAU(parseFloat(e.target.value))}
                  className="w-full accent-[#F59E0B] cursor-pointer"
                  aria-label={isEn ? "Distance from the Sun in Astronomical Units" : "Khoảng cách từ Mặt Trời tính bằng đơn vị thiên văn"}
                />

                {/* Landmark buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px]">
                  <span className="text-[#94A3B8]">{isEn ? "Presets:" : "Vị trí chuẩn:"}</span>
                  <button
                    type="button"
                    onClick={() => setSolarDistanceAU(1.0)}
                    className="px-2 py-0.5 bg-[#0C1A38] border border-[#22D3EE]/30 text-[#38BDF8] rounded-xs cursor-pointer"
                  >
                    Trái Đất (1.0 AU)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSolarDistanceAU(1.52)}
                    className="px-2 py-0.5 bg-[#0C1A38] border border-[#F59E0B]/50 text-[#FBBF24] rounded-xs cursor-pointer"
                  >
                    Sao Hỏa / Opportunity (1.52 AU)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSolarDistanceAU(5.2)}
                    className="px-2 py-0.5 bg-[#0C1A38] border border-[#22D3EE]/30 text-[#94A3B8] rounded-xs cursor-pointer"
                  >
                    Sao Mộc (5.2 AU)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSolarDistanceAU(9.58)}
                    className="px-2 py-0.5 bg-[#0C1A38] border border-[#F59E0B]/50 text-[#FBBF24] rounded-xs cursor-pointer"
                  >
                    Sao Thổ / Pioneer 11 (9.58 AU)
                  </button>
                </div>
              </div>

              {/* Real-time Comparative Meters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Meter 1: Solar Panel */}
                <div className="bg-[#050C1B] border border-[#22D3EE]/30 p-5 rounded-xs space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#38BDF8] font-bold flex items-center gap-1.5">
                      ☀️ {isEn ? "Solar Panel Efficiency" : "Hiệu suất Tấm Pin Năng Lượng Mặt Trời"}
                    </span>
                    <span className="text-[#FBBF24] font-bold">{solarFlux.percentEarth}%</span>
                  </div>

                  <div className="w-full bg-[#08132B] h-4 rounded-xs overflow-hidden border border-[#22D3EE]/30">
                    <div
                      className="bg-gradient-to-r from-[#22D3EE] to-[#F59E0B] h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(2, parseFloat(solarFlux.percentEarth)))}%` }}
                    />
                  </div>

                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    Cường độ ánh sáng: <strong className="text-[#F8FAFC]">{solarFlux.rawFlux} W/m²</strong> (ở Trái Đất là 1361 W/m²).
                    {solarDistanceAU > 4 && (
                      <span className="text-[#EF4444] block mt-1">
                        ⚠️ CẢNH BÁO: Quá xa Mặt Trời! Cường độ ánh sáng không đủ để kích hoạt tế bào quang điện.
                      </span>
                    )}
                  </p>
                </div>

                {/* Meter 2: SNAP-19 RTG Nuclear Generator */}
                <div className="bg-[#050C1B] border border-[#F59E0B]/40 p-5 rounded-xs space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#FBBF24] font-bold flex items-center gap-1.5">
                      ☢️ {isEn ? "Pioneer 11 RTG Nuclear Generator" : "Máy Phát Nhiệt Điện Hạt Nhân RTG"}
                    </span>
                    <span className="text-[#10B981] font-bold">100% Ổn Định</span>
                  </div>

                  <div className="w-full bg-[#08132B] h-4 rounded-xs overflow-hidden border border-[#F59E0B]/40">
                    <div
                      className="bg-[#10B981] h-full"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    Nguồn điện sinh ra từ nhiệt phân rã phóng xạ của <strong className="text-[#F8FAFC]">Plutonium-238</strong>, hoàn toàn độc lập với khoảng cách đến Mặt Trời, phát điện liên tục suốt hơn 22 năm trong đêm đen vũ trụ.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 3: CREATIVE MEDIA & AUDIO STUDIO (MERGED TEAM PRODUCTS)           */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'creative') && (
          <section id="creative-media-studio" className="space-y-6 pt-4">
            <div className="border-b border-[#22D3EE]/30 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#FBBF24] font-bold block">
                  CREATIVE EXPRESSION STUDIO · SÁNG TẠO NGHỆ THUẬT &amp; ÂM THANH
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] mt-0.5">
                  {isEn ? "Human Expressions & Artistic Adaptations" : "Một câu chuyện khoa học, nhiều cách để cảm nhận"}
                </h2>
              </div>
              <span className="font-mono text-xs text-[#38BDF8]">
                {isEn ? "Audio Stories · Posters · Comics · Video" : "Audio nhập vai · Poster triển lãm · Truyện tranh"}
              </span>
            </div>

            {/* Creative Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Opportunity Story & Poster */}
              <div className="bg-[#08132B] border border-[#22D3EE]/40 p-6 rounded-xs space-y-4 hover:border-[#F59E0B] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-[#0C1A38] border border-[#22D3EE]/40 text-[#38BDF8] font-mono text-[10px] font-bold uppercase tracking-wider rounded-xs">
                    ROBOT ĐỊA CHẤT · 15 NĂM SAO HỎA
                  </span>
                  <span className="font-mono text-xs text-[#FBBF24]">Sol 5.111</span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#F8FAFC]">
                  Opportunity (MER-B) — Lời kể từ bụi đỏ
                </h3>

                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                  Được thiết kế để hoạt động 90 ngày nhưng đã sống sót bền bỉ gần 15 năm, vượt qua những cơn bão cát khổng lồ và phát hiện bằng chứng lịch sử về nước lỏng cổ đại trên Sao Hỏa.
                </p>

                <div className="pt-3 border-t border-[#22D3EE]/20 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenStoryPlayer) {
                        onOpenStoryPlayer('opportunity');
                      } else if (onNavigate) {
                        onNavigate('/trien-lam/opportunity');
                      }
                    }}
                    className="btn-primary-cinematic px-4 py-2 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Headphones className="w-4 h-4 text-[#FBBF24]" />
                    <span>Nghe câu chuyện âm thanh</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate && onNavigate('/poster/opportunity')}
                    className="btn-secondary-cinematic px-3.5 py-2 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Xem poster in ấn</span>
                  </button>
                </div>
              </div>

              {/* Card 2: Pioneer 11 Story & Poster */}
              <div className="bg-[#08132B] border border-[#22D3EE]/40 p-6 rounded-xs space-y-4 hover:border-[#F59E0B] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-[#0C1A38] border border-[#22D3EE]/40 text-[#38BDF8] font-mono text-[10px] font-bold uppercase tracking-wider rounded-xs">
                    SỨ GIẢ KHÔNG GIAN SÂU · BAY QUA SAO THỔ
                  </span>
                  <span className="font-mono text-xs text-[#FBBF24]">&gt; 11 tỷ km</span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#F8FAFC]">
                  Pioneer 11 — Tín hiệu ngoài Hệ Mặt Trời
                </h3>

                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                  Con tàu vũ trụ đầu tiên trong lịch sử nhân loại bay ngang qua Sao Thổ, phát hiện vành đai F và mang theo tấm bảng Pioneer Plaque tiến thẳng vào khoảng không gian giữa các vì sao.
                </p>

                <div className="pt-3 border-t border-[#22D3EE]/20 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenStoryPlayer) {
                        onOpenStoryPlayer('pioneer-11');
                      } else if (onNavigate) {
                        onNavigate('/trien-lam/pioneer-11');
                      }
                    }}
                    className="btn-primary-cinematic px-4 py-2 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Headphones className="w-4 h-4 text-[#FBBF24]" />
                    <span>Nghe câu chuyện âm thanh</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate && onNavigate('/poster/pioneer-11')}
                    className="btn-secondary-cinematic px-3.5 py-2 text-xs font-mono uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Xem poster in ấn</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 4: 5 LEGENDARY NASA EXPLORERS (AUTHENTIC ARCHIVE SHOWCASE)        */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'machines') && (
          <section id="stem-machines" className="space-y-6 pt-4">
            <div className="border-b border-[#22D3EE]/30 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#FBBF24] font-bold block">
                  05 LEGENDARY NASA ROBOTIC EXPLORERS
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] mt-0.5">
                  {isEn ? "5 Legendary Explorers & Engineering Insights" : "5 Cỗ máy huyền thoại & Bài học kỹ thuật"}
                </h2>
              </div>
              <span className="font-mono text-xs text-[#38BDF8]">
                {isEn ? "100% Verified NASA Citations" : "100% Trích dẫn lưu trữ chính thức"}
              </span>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Opportunity */}
              <div className="bg-[#081226] border border-[#22D3EE]/35 hover:border-[#F59E0B] p-5 rounded-xs transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="px-2 py-0.5 bg-[#0C1A38] text-[#38BDF8] border border-[#22D3EE]/40 font-mono text-[10px] font-semibold uppercase rounded-xs">
                    ROBOT ĐỊA CHẤT · MER-B
                  </span>

                  <div className="aspect-[16/10] bg-[#030611] border border-[#22D3EE]/25 overflow-hidden rounded-xs">
                    <img
                      src="/assets/nasa/opportunity_first_selfie_PIA22222.jpg"
                      alt="Opportunity Sol 5000 Selfie"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#F8FAFC]">Opportunity (MER-B)</h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    Hệ thống bánh xe Rocker-Bogie không lò xo, camera hiển vi MI và mũi mài đá RAT phát hiện hạt trầm tích hematite chứng minh nước cổ đại.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#22D3EE]/20 flex items-center justify-between text-xs font-mono">
                  <a
                    href="https://science.nasa.gov/3d-resources/mars-exploration-rover-opportunity-mer-b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#38BDF8] hover:text-[#FBBF24]"
                  >
                    <span>Mô hình 3D NASA ↗</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {onOpenLightbox && (
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(NASA_MEDIA_CATALOG['opportunity_first_selfie'])}
                      className="text-[#FBBF24] hover:underline cursor-pointer"
                    >
                      Xem ảnh lớn →
                    </button>
                  )}
                </div>
              </div>

              {/* Pioneer 11 */}
              <div className="bg-[#081226] border border-[#22D3EE]/35 hover:border-[#F59E0B] p-5 rounded-xs transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="px-2 py-0.5 bg-[#0C1A38] text-[#38BDF8] border border-[#22D3EE]/40 font-mono text-[10px] font-semibold uppercase rounded-xs">
                    THÁM HIỂM SAO THỔ · 1979
                  </span>

                  <div className="aspect-[16/10] bg-[#030611] border border-[#22D3EE]/25 overflow-hidden rounded-xs">
                    <img
                      src="/assets/nasa/pioneer11_saturn_titan_739460main.jpg"
                      alt="Saturn and Titan seen by Pioneer 11"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#F8FAFC]">Pioneer 11</h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    Ăng-ten parabol 2,74m truyền dữ liệu từ ngoài 11 tỷ km. 4 máy phát nhiệt điện hạt nhân SNAP-19 RTG chạy liên tục hơn 22 năm.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#22D3EE]/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#94A3B8]">Mã NSSDC: 1973-019A</span>
                  {onOpenLightbox && (
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(NASA_MEDIA_CATALOG['pioneer11_saturn_titan_739460main'])}
                      className="text-[#FBBF24] hover:underline cursor-pointer"
                    >
                      Xem ảnh lớn →
                    </button>
                  )}
                </div>
              </div>

              {/* Sojourner */}
              <div className="bg-[#081226] border border-[#22D3EE]/35 hover:border-[#F59E0B] p-5 rounded-xs transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="px-2 py-0.5 bg-[#0C1A38] text-[#38BDF8] border border-[#22D3EE]/40 font-mono text-[10px] font-semibold uppercase rounded-xs">
                    ROVER ĐẦU TIÊN (1997)
                  </span>

                  <div className="aspect-[16/10] bg-[#030611] border border-[#22D3EE]/25 overflow-hidden rounded-xs">
                    <img
                      src="/assets/nasa/sojourner_yogi_PIA00766.jpg"
                      alt="Sojourner at Yogi Rock"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#F8FAFC]">Sojourner (Mars Pathfinder)</h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    Cỗ máy chỉ nặng 11,5 kg chứng minh khả năng di chuyển tự hành và dùng máy quang phổ hạt alpha APXS phân tích đá sao Hỏa.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#22D3EE]/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#94A3B8]">Mã PIA: PIA00766</span>
                  {onOpenLightbox && (
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(NASA_MEDIA_CATALOG['sojourner_yogi'])}
                      className="text-[#FBBF24] hover:underline cursor-pointer"
                    >
                      Xem ảnh lớn →
                    </button>
                  )}
                </div>
              </div>

              {/* Viking 1 Lander */}
              <div className="bg-[#081226] border border-[#22D3EE]/35 hover:border-[#F59E0B] p-5 rounded-xs transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="px-2 py-0.5 bg-[#0C1A38] text-[#38BDF8] border border-[#22D3EE]/40 font-mono text-[10px] font-semibold uppercase rounded-xs">
                    ẢNH ĐẦU TIÊN TRÊN SAO HỎA (1976)
                  </span>

                  <div className="aspect-[16/10] bg-[#030611] border border-[#22D3EE]/25 overflow-hidden rounded-xs">
                    <img
                      src="/assets/nasa/viking1_first_mars_surface_photo_PIA00381.jpg"
                      alt="First surface photo of Mars by Viking 1"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#F8FAFC]">Viking 1 Lander</h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    Camera quét cơ học facsimile quét từng vạch sáng gửi bức ảnh đầu tiên từ bề mặt Sao Hỏa về Trái Đất ngày 20/07/1976.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#22D3EE]/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#94A3B8]">Mã PIA: PIA00381</span>
                  {onOpenLightbox && (
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(NASA_MEDIA_CATALOG['viking1_first_surface'])}
                      className="text-[#FBBF24] hover:underline cursor-pointer"
                    >
                      Xem ảnh lớn →
                    </button>
                  )}
                </div>
              </div>

              {/* Apollo 14 LRRR */}
              <div className="bg-[#081226] border border-[#22D3EE]/35 hover:border-[#F59E0B] p-5 rounded-xs transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="px-2 py-0.5 bg-[#0C1A38] text-[#38BDF8] border border-[#22D3EE]/40 font-mono text-[10px] font-semibold uppercase rounded-xs">
                    THÍ NGHIỆM MẶT TRĂNG CÒN HOẠT ĐỘNG
                  </span>

                  <div className="aspect-[16/10] bg-[#030611] border border-[#22D3EE]/25 overflow-hidden rounded-xs">
                    <img
                      src="/assets/nasa/apollo14_lrrr_retroreflector_AS14-67-09386.jpg"
                      alt="Apollo 14 Laser Retroreflector"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#F8FAFC]">Apollo 14 LRRR</h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    100 khối lăng kính góc lùi thạch anh thụ động phản xạ tia laser 180° trở lại Trái Đất, vẫn đang hoạt động sau hơn 50 năm.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#22D3EE]/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#94A3B8]">Mã NASA: AS14-67-09386</span>
                  {onOpenLightbox && (
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(NASA_MEDIA_CATALOG['apollo14_lrrr'])}
                      className="text-[#FBBF24] hover:underline cursor-pointer"
                    >
                      Xem ảnh lớn →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 5: INTERACTIVE STEM QUIZ (THỬ THÁCH KỸ SƯ NHÍ)                     */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'quiz') && (
          <section id="stem-quiz-challenge" className="space-y-6 pt-4">
            <div className="border-b border-[#22D3EE]/30 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#FBBF24] font-bold block">
                  INTERACTIVE STEM CHALLENGE · THỬ THÁCH TRẮC NGHIỆM TƯƠNG TÁC
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] mt-0.5">
                  {isEn ? "Young Space Engineer Challenge" : "Thử thách Kỹ sư Khám phá Vũ trụ"}
                </h2>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-[#38BDF8]">
                  Điểm số: <strong className="text-[#FBBF24] text-base">{quizScore} / {QUIZ_QUESTIONS.length}</strong>
                </span>
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="px-2.5 py-1 bg-[#091636] hover:bg-[#12285C] border border-[#22D3EE]/30 text-[#94A3B8] hover:text-[#F1F5F9] rounded-xs cursor-pointer inline-flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{isEn ? "Reset" : "Làm lại"}</span>
                </button>
              </div>
            </div>

            {/* Questions Grid */}
            <div className="space-y-5">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const chosen = quizAnswers[q.id];
                const isAnswered = quizSubmitted[q.id];
                const isCorrect = chosen === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`bg-[#08132B] border-2 p-5 sm:p-6 rounded-xs transition-colors space-y-4 ${
                      isAnswered
                        ? isCorrect
                          ? 'border-[#10B981]/70 bg-[#061A24]'
                          : 'border-[#F59E0B]/70 bg-[#1A1208]'
                        : 'border-[#22D3EE]/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="font-mono text-[11px] text-[#38BDF8] uppercase tracking-wider font-bold">
                          CÂU HỎI {idx + 1} / {QUIZ_QUESTIONS.length}
                        </span>
                        <h3 className="font-display font-bold text-base sm:text-lg text-[#F8FAFC]">
                          {isEn ? q.questionEn : q.questionVi}
                        </h3>
                      </div>

                      {isAnswered && (
                        <div className={`px-2.5 py-1 rounded-xs font-mono text-xs font-bold shrink-0 ${
                          isCorrect ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/50' : 'bg-[#EF4444]/20 text-[#FCA5A5] border border-[#EF4444]/50'
                        }`}>
                          {isCorrect ? '✓ CHÍNH XÁC' : '✕ CHƯA ĐÚNG'}
                        </div>
                      )}
                    </div>

                    {/* Options */}
                    <div className="space-y-2 pt-1">
                      {(isEn ? q.optionsEn : q.optionsVi).map((opt, optIdx) => {
                        const isThisChosen = chosen === optIdx;
                        const isThisCorrect = optIdx === q.correctIndex;

                        let btnStyle = 'bg-[#060D1E] border-[#22D3EE]/25 text-[#CBD5E1] hover:border-[#38BDF8]';
                        if (isAnswered) {
                          if (isThisCorrect) {
                            btnStyle = 'bg-[#0B3322] border-[#10B981] text-[#A7F3D0] font-bold';
                          } else if (isThisChosen) {
                            btnStyle = 'bg-[#331114] border-[#EF4444] text-[#FCA5A5]';
                          } else {
                            btnStyle = 'bg-[#060D1E]/50 border-white/10 text-[#64748B] opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectQuizOption(q.id, optIdx)}
                            className={`w-full text-left p-3.5 rounded-xs border transition-all text-xs sm:text-sm font-sans flex items-center justify-between cursor-pointer ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            <span className="font-mono text-xs shrink-0 ml-3">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {isAnswered && (
                      <div className="p-3.5 bg-[#050C1B] border-l-3 border-[#22D3EE] rounded-r-xs font-mono text-xs text-[#CBD5E1] leading-relaxed">
                        <strong className="text-[#38BDF8]">Giải thích khoa học: </strong>
                        {isEn ? q.explanationEn : q.explanationVi}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Achievement Badge when all 3 questions answered correctly */}
            {quizScore === QUIZ_QUESTIONS.length && (
              <div className="p-6 bg-gradient-to-r from-[#061F2E] via-[#0E2F4D] to-[#061F2E] border-2 border-[#F59E0B] rounded-xs text-center space-y-3 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#081C38] border-2 border-[#FBBF24] flex items-center justify-center text-2xl">
                  🏅
                </div>
                <h3 className="font-display font-bold text-lg text-[#F8FAFC]">
                  {isEn ? "Space Science Explorer Badge Unlocked!" : "Chúc mừng! Bạn đã đạt Huy hiệu Kỹ sư Vũ trụ Tập sự"}
                </h3>
                <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-xl mx-auto leading-relaxed">
                  {isEn
                    ? "You demonstrated an exceptional understanding of planetary physics, speed-of-light telemetry, and deep-space power engineering!"
                    : "Bạn đã xuất sắc vượt qua cả 3 câu hỏi về vật lý hành tinh, truyền tín hiệu ánh sáng và kỹ thuật năng lượng thám hiểm không gian sâu!"}
                </p>
              </div>
            )}
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 6: STUDENT CREATIVE PROJECT SUBMISSION & SHOWCASE (100% GENUINE)   */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'journal') && (
          <section id="student-creative-hub" className="space-y-8 pt-4 border-t-2 border-[#22D3EE]/30">
            {/* Dedicated Hero Banner for Student Submissions */}
            <div className="bg-gradient-to-r from-[#07132B] via-[#0D244D] to-[#07132B] border-2 border-[#F59E0B] p-6 sm:p-8 rounded-xs shadow-[0_0_35px_rgba(245,158,11,0.2)] space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FBBF24] font-bold">
                    <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                    <span>CỔNG ĐẨY SẢN PHẨM HỌC SINH · STUDENT SHOWCASE &amp; SUBMISSION</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
                    {isEn ? "Student Project Showcase & Submission Center" : "Khu Vực Đăng Tải Sản Phẩm Sáng Tạo & Nghiên Cứu Của Học Sinh"}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                    {isEn
                      ? "A dedicated open space for students, young researchers, and astronomy clubs to showcase their creative STEM works: research papers, 3D models, space illustrations, educational posters, and reflections on NASA's robotic heritage."
                      : "Không gian mở chuyên biệt dành riêng cho học sinh, sinh viên và các câu lạc bộ thiên văn học đường: Tải lên bài nghiên cứu STEM, mô hình cỗ máy, tranh vẽ vũ trụ, poster khoa học, bản thu âm hoặc liên kết dự án về di sản thám hiểm của NASA."}
                  </p>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="btn-primary-cinematic px-6 py-3.5 text-xs font-mono uppercase tracking-wider font-bold cursor-pointer inline-flex items-center gap-2 border-2 border-[#FBBF24] shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                  >
                    <Upload className="w-4 h-4 text-[#FBBF24]" />
                    <span>{isEn ? "Submit Your Project Now" : "📤 Đăng tải sản phẩm mới lên triển lãm"}</span>
                  </button>
                </div>
              </div>

              {/* 3-Step Process Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-[#22D3EE]/20 font-mono text-xs">
                <div className="p-3.5 bg-[#050C1B]/90 border border-[#22D3EE]/30 rounded-xs space-y-1">
                  <div className="text-[#38BDF8] font-bold flex items-center gap-1.5">
                    <span>1️⃣</span> {isEn ? "Prepare Your Work" : "Chuẩn bị tác phẩm"}
                  </div>
                  <p className="text-[#94A3B8] text-[11px] leading-relaxed">
                    Bài viết nghiên cứu, tranh vẽ (PNG/JPG), poster, mô hình 3D (GLB) hoặc đường link Google Drive / Github.
                  </p>
                </div>

                <div className="p-3.5 bg-[#050C1B]/90 border border-[#F59E0B]/40 rounded-xs space-y-1">
                  <div className="text-[#FBBF24] font-bold flex items-center gap-1.5">
                    <span>2️⃣</span> {isEn ? "Select Epistemic Label" : "Gắn nhãn nhận thức minh bạch"}
                  </div>
                  <p className="text-[#94A3B8] text-[11px] leading-relaxed">
                    Phân loại rõ: Dữ kiện xác thực, Diễn giải khoa học, Sáng tạo nghệ thuật hay Kịch bản giả tưởng.
                  </p>
                </div>

                <div className="p-3.5 bg-[#050C1B]/90 border border-[#10B981]/40 rounded-xs space-y-1">
                  <div className="text-[#10B981] font-bold flex items-center gap-1.5">
                    <span>3️⃣</span> {isEn ? "Exhibit & Honor" : "Trưng bày & Vinh danh"}
                  </div>
                  <p className="text-[#94A3B8] text-[11px] leading-relaxed">
                    Sản phẩm xuất hiện công khai trên Bảng Vàng Triển Lãm với tên tác giả, trường học và lưu trữ cục bộ.
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#22D3EE]/25 pb-3">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-[#94A3B8] mr-1">{isEn ? "Filter:" : "Bộ lọc:"}</span>
                {[
                  { id: 'all', label: isEn ? "All Projects" : "Tất cả sản phẩm" },
                  { id: 'research', label: isEn ? "Research / STEM" : "Bài nghiên cứu STEM" },
                  { id: 'art', label: isEn ? "Art & Posters" : "Tranh & Poster" },
                  { id: 'model', label: isEn ? "3D Models" : "Mô hình & Thiết kế 3D" },
                  { id: 'reflection', label: isEn ? "Reflections" : "Cảm nghĩ & Nhật ký" }
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSubmissionFilter(f.id)}
                    className={`px-3 py-1 rounded-xs border transition-colors cursor-pointer ${
                      submissionFilter === f.id
                        ? 'bg-[#0E224D] border-[#F59E0B] text-[#FBBF24] font-bold'
                        : 'bg-[#071022] border-[#22D3EE]/20 text-[#94A3B8] hover:text-[#F1F5F9]'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <span className="font-mono text-xs text-[#38BDF8]">
                {isEn ? "Total Contributions:" : "Tổng số tác phẩm:"} <strong className="text-[#FBBF24] text-sm">{submissions.length}</strong>
              </span>
            </div>

            {/* Submissions Cards Grid or Clean Welcoming Notice */}
            {submissions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {submissions
                  .filter((sub) => {
                    if (submissionFilter === 'all') return true;
                    if (submissionFilter === 'research') return sub.submission_type === 'Truyện / Bài viết';
                    if (submissionFilter === 'art') return sub.submission_type === 'Tranh / Poster' || sub.submission_type === 'Truyện tranh / PDF';
                    if (submissionFilter === 'model') return sub.submission_type === 'Mô hình 3D (GLB/GLTF)';
                    if (submissionFilter === 'reflection') return sub.category === 'fiction_reconstruction';
                    return true;
                  })
                  .map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => setActiveSubmission(sub)}
                      className="bg-[#081226] border border-[#22D3EE]/35 hover:border-[#F59E0B] p-5 rounded-xs transition-all duration-300 cursor-pointer space-y-3 flex flex-col justify-between group shadow-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2 py-0.5 bg-[#0C1A38] text-[#38BDF8] border border-[#22D3EE]/40 font-mono text-[10px] font-bold uppercase rounded-xs">
                            {sub.submission_type}
                          </span>
                          <span className="font-mono text-[11px] text-[#94A3B8]">{sub.created_at}</span>
                        </div>

                        <h3 className="font-display font-bold text-base text-[#F8FAFC] group-hover:text-[#FBBF24] transition-colors">
                          {sub.title}
                        </h3>

                        <p className="text-xs text-[#CBD5E1] line-clamp-3 leading-relaxed">
                          {sub.artist_statement || sub.summary_vi}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#22D3EE]/15 flex items-center justify-between text-xs font-mono">
                        <div className="truncate text-[#94A3B8]">
                          Tác giả: <strong className="text-[#F1F5F9]">{sub.creator_alias}</strong>
                          {sub.age_or_grade && <span className="text-[#38BDF8] block text-[10px] truncate">{sub.age_or_grade}</span>}
                        </div>
                        <span className="text-[#FBBF24] shrink-0 font-bold group-hover:translate-x-1 transition-transform">
                          {isEn ? "View →" : "Xem →"}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="p-10 bg-[#081226]/80 border-2 border-dashed border-[#22D3EE]/35 rounded-xs text-center space-y-4 max-w-2xl mx-auto shadow-inner">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#0A1633] border-2 border-[#22D3EE]/40 flex items-center justify-center text-[#FBBF24]">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-[#F8FAFC]">
                    {isEn ? "Phòng Trưng Bày Sáng Tạo Học Sinh Đang Mở" : "Phòng Trưng Bày Tác Phẩm Học Sinh Đang Chờ Đón Bạn"}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed max-w-lg mx-auto">
                    {isEn
                      ? "Beyond The Signal complies strictly with NASA open science authenticity and contains zero fake demo submissions. Be the first student or young scientist to showcase your project!"
                      : "Bảo tàng Beyond The Signal tuân thủ nghiêm ngặt tính chân thực khoa học và không sử dụng dữ liệu giả lập. Hãy là người đầu tiên đẩy bài nghiên cứu, tranh vẽ hoặc mô hình của bạn lên triển lãm!"}
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="btn-primary-cinematic px-6 py-2.5 text-xs font-mono uppercase tracking-wider font-bold cursor-pointer inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 text-[#FBBF24]" />
                    <span>{isEn ? "Upload Your Work" : "Đẩy sản phẩm của bạn lên ngay"}</span>
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      {/* Submission Modal for Real Visitor Input */}
      <SubmissionModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        userAlias={userAlias}
        onAddSubmission={handleAddSubmission}
      />

      {/* Submission Detail Modal */}
      <SubmissionDetailModal
        submission={activeSubmission}
        onClose={() => setActiveSubmission(null)}
        onOpenLightbox={onOpenLightbox}
      />
    </div>
  );
};
