import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
  ExternalLink,
  BookOpen,
  Headphones,
  Film,
  Compass,
  Database,
  CheckCircle2,
  Clock,
  FileText,
  Sparkles,
  ShieldCheck,
  Info,
  ChevronRight,
  ChevronLeft,
  Radio,
  Layers,
  Printer,
  Download,
  X
} from 'lucide-react';
import {
  ARCHIVE_RECORDS,
  NASA_MEDIA_CATALOG,
  SOURCES_CATALOG,
  NasaMediaItem
} from '../data/museumData';
import { MACHINE_STORIES } from '../data/stories';

export type JourneyMissionId =
  | 'opportunity'
  | 'pioneer-11'
  | 'surveyor-3'
  | 'viking-1'
  | 'sojourner'
  | 'custom';

export interface JourneysPageProps {
  lang: 'vi' | 'en';
  initialMissionId?: JourneyMissionId;
  onNavigate: (route: string) => void;
  onOpenLightbox?: (item: NasaMediaItem) => void;
}

type FormatTab = 'slide-audio' | 'scrollytelling' | 'multimedia' | 'custom-story';

interface BilingualSlideChapter {
  id: string;
  code_vi: string;
  code_en: string;
  phase_vi: string;
  phase_en: string;
  title_vi: string;
  title_en: string;
  narration_vi: string;
  narration_en: string;
  hardware_part_vi: string;
  hardware_part_en: string;
  hardware_to_science_vi: string;
  hardware_to_science_en: string;
  facts: { label_vi: string; label_en: string; value_vi: string; value_en: string }[];
  media_id: string;
  source_ids: string[];
}

interface BilingualJourneyConfig {
  id: JourneyMissionId;
  isFeatured: boolean;
  isDemoRecord: boolean;
  realm_vi: string;
  realm_en: string;
  badge_vi: string;
  badge_en: string;
  accent: string;
  title_vi: string;
  title_en: string;
  official_designation: string;
  tagline_vi: string;
  tagline_en: string;
  intro_vi: string;
  intro_en: string;
  where_now_vi: string;
  where_now_en: string;
  closing_line: string;
  EditorialWarning_vi: string;
  EditorialWarning_en: string;
  slides: BilingualSlideChapter[];
}

const JOURNEY_DATA: Record<JourneyMissionId, BilingualJourneyConfig> = {
  opportunity: {
    id: 'opportunity',
    isFeatured: true,
    isDemoRecord: false,
    realm_vi: 'SAO HỎA · MERIDIANI PLANUM → ENDEAVOUR CRATER',
    realm_en: 'MARS · MERIDIANI PLANUM → ENDEAVOUR CRATER',
    badge_vi: 'Triển lãm chuyên sâu · Lời kể sáng tác dựa trên dữ kiện',
    badge_en: 'Featured Deep Journey · Creative Narrative from NASA Logs',
    accent: '#C96F46',
    title_vi: 'Opportunity (MER-B)',
    title_en: 'Opportunity (MER-B)',
    official_designation: 'Mars Exploration Rover – Opportunity (MER-B)',
    tagline_vi: MACHINE_STORIES.opportunity.tagline,
    tagline_en: 'They expected me to live for 90 sols. I stayed for nearly 15 years.',
    intro_vi: MACHINE_STORIES.opportunity.intro,
    intro_en:
      'Hello. I am Opportunity, a six-wheeled solar-powered robotic geologist. I still rest in Perseverance Valley on Mars. Listen to my journey—a creative first-person narrative grounded strictly in verified NASA mission logs.',
    where_now_vi: MACHINE_STORIES.opportunity.where_now,
    where_now_en: 'Perseverance Valley, Endeavour Crater rim — Mars',
    closing_line: MACHINE_STORIES.opportunity.closing_line,
    EditorialWarning_vi:
      'Lưu ý khoa học: Opportunity tìm thấy bằng chứng địa chất về nước lỏng cổ đại (hạt hematite, mạch thạch cao, khoáng sét), không phải bằng chứng trực tiếp về sự sống. Ngày hạ cánh 24/01/2004 (PST) tương ứng 25/01/2004 (UTC). Phân biệt ngày nhận tín hiệu cuối (10/06/2018) và ngày kết thúc sứ mệnh (13/02/2019).',
    EditorialWarning_en:
      'Scientific note: Opportunity discovered geological evidence of ancient liquid water (hematite spherules, gypsum veins, clay minerals), not direct evidence of life. Landing on 2004-01-24 (PST) corresponds to 2004-01-25 (UTC). Last signal (2018-06-10) is distinct from formal mission end (2019-02-13).',
    slides: [
      {
        id: 'opp-1',
        code_vi: '01 · KHỞI ĐẦU & CÂU HỎI',
        code_en: '01 · ORIGIN & THE QUESTION',
        phase_vi: 'Khởi đầu',
        phase_en: 'Origin',
        title_vi: 'Sao Hỏa đã từng có nước không?',
        title_en: 'Did Liquid Water Once Flow on Mars?',
        narration_vi: MACHINE_STORIES.opportunity.chapters[0].narration,
        narration_en:
          'Scientists on Earth had a profound question: did Mars ever have liquid water in its ancient past? Humans could not yet fly there in person, so they sent me ahead. On July 7, 2003, I left Earth atop a Delta II rocket and cruised for over six months across interplanetary space.',
        hardware_part_vi: MACHINE_STORIES.opportunity.chapters[0].hardware_part,
        hardware_part_en: 'Robotic Field Geologist Architecture',
        hardware_to_science_vi: MACHINE_STORIES.opportunity.chapters[0].hardware_to_science,
        hardware_to_science_en:
          'Water leaves chemical and mineral signatures in rock. I was built as a "geologist on wheels" to look, touch, grind, and analyze Martian outcrops.',
        facts: [
          { label_vi: 'Ngày phóng', label_en: 'Launch Date', value_vi: '07/07/2003', value_en: '2003-07-07' },
          { label_vi: 'Mục tiêu khoa học', label_en: 'Science Goal', value_vi: 'Tìm dấu vết nước lỏng cổ đại', value_en: 'Follow the water in ancient rocks' }
        ],
        media_id: 'IMG-OPP-02',
        source_ids: ['SRC-OPP-01', 'SRC-OPP-02']
      },
      {
        id: 'opp-2',
        code_vi: '02 · CỖ MÁY KHOA HỌC',
        code_en: '02 · THE MACHINE',
        phase_vi: 'Cỗ máy',
        phase_en: 'The Machine',
        title_vi: 'Cơ thể của một nhà địa chất robot',
        title_en: 'Anatomy of a Robotic Geologist',
        narration_vi: MACHINE_STORIES.opportunity.chapters[1].narration,
        narration_en:
          'I have six wheels, a panoramic camera mast at human eye level, and a robotic arm. Across my back are solar arrays: sunlight is my lifeblood. At the tip of my arm sits the Rock Abrasion Tool (RAT), which grinds away weathered rock crusts so my spectrometers can inspect the pristine interior.',
        hardware_part_vi: MACHINE_STORIES.opportunity.chapters[1].hardware_part,
        hardware_part_en: 'Rock Abrasion Tool (RAT) & Solar Arrays',
        hardware_to_science_vi: MACHINE_STORIES.opportunity.chapters[1].hardware_to_science,
        hardware_to_science_en:
          'Grinding removes surface dust so APXS and Mössbauer spectrometers read true rock chemistry. Meanwhile, solar panel dust factor dictates how much energy I have each sol.',
        facts: [
          { label_vi: 'Nguồn điện', label_en: 'Power System', value_vi: 'Tấm pin Mặt Trời', value_en: 'Solar Arrays' },
          { label_vi: 'Thiết bị đầu cánh tay', label_en: 'Arm Instruments', value_vi: 'RAT, MI, APXS, Mössbauer', value_en: 'RAT, MI, APXS, Mössbauer' }
        ],
        media_id: 'IMG-OPP-PIA15114',
        source_ids: ['SRC-OPP-01', 'SRC-OPP-06']
      },
      {
        id: 'opp-3',
        code_vi: '03 · HÀNH TRÌNH VƯỢT KẾ HOẠCH',
        code_en: '03 · THE JOURNEY',
        phase_vi: 'Hành trình',
        phase_en: 'Journey',
        title_vi: 'Từ 90 ngày thành gần 15 năm',
        title_en: 'From 90 Sols to Nearly 15 Years',
        narration_vi: MACHINE_STORIES.opportunity.chapters[2].narration,
        narration_en:
          'On January 24, 2004 (PST) — January 25 UTC — I bounced to a landing in Eagle Crater on Meridiani Planum. Engineers designed my primary mission for 90 sols. Yet I kept rolling from crater to crater—Eagle, Endurance, Victoria, and finally the 22-kilometer-wide Endeavour Crater—operating for 5,111 sols.',
        hardware_part_vi: MACHINE_STORIES.opportunity.chapters[2].hardware_part,
        hardware_part_en: 'Six-Wheel Rocker-Bogie Mobility & Navcam',
        hardware_to_science_vi: MACHINE_STORIES.opportunity.chapters[2].hardware_to_science,
        hardware_to_science_en:
          'Every kilometer driven opened older geological strata, allowing scientists to read deeper chapters of Martian planetary history.',
        facts: [
          { label_vi: 'Hạ cánh', label_en: 'Landing Date', value_vi: '24/01/2004 (PST) · 25/01 (UTC)', value_en: '2004-01-24 PST (01-25 UTC)' },
          { label_vi: 'Thiết kế vs Thực tế', label_en: 'Planned vs Actual', value_vi: '90 sol → 5.111 sol', value_en: '90 sols → 5,111 sols' }
        ],
        media_id: 'opportunity_final_panorama',
        source_ids: ['SRC-OPP-01', 'SRC-OPP-03']
      },
      {
        id: 'opp-4',
        code_vi: '04 · KHÁM PHÁ ĐỊA CHẤT',
        code_en: '04 · THE DISCOVERY',
        phase_vi: 'Khám phá',
        phase_en: 'Discovery',
        title_vi: 'Những viên đá kể chuyện về nước',
        title_en: 'Rocks That Tell the Story of Ancient Water',
        narration_vi: MACHINE_STORIES.opportunity.chapters[3].narration,
        narration_en:
          'At Meridiani Planum and the rim of Endeavour Crater, I discovered iron-rich hematite spherules ("blueberries"), bright gypsum veins, and clay minerals that form in neutral-pH liquid water. Long ago, Mars had wet environments potentially favorable for microbial life—though remember: I found geological evidence of water, not life itself.',
        hardware_part_vi: MACHINE_STORIES.opportunity.chapters[3].hardware_part,
        hardware_part_en: 'APXS, Mössbauer, Mini-TES & Microscopic Imager',
        hardware_to_science_vi: MACHINE_STORIES.opportunity.chapters[3].hardware_to_science,
        hardware_to_science_en:
          'Spectrometers and microscopic imaging identified hematite spherules, sulfate evaporites, and smectite clays—direct mineralogical proof of ancient aqueous activity.',
        facts: [
          { label_vi: 'Bằng chứng địa chất', label_en: 'Mineral Evidence', value_vi: 'Hematite, thạch cao (gypsum), khoáng sét', value_en: 'Hematite, gypsum veins, clay minerals' },
          { label_vi: 'Độ chuẩn xác khoa học', label_en: 'Scientific Rigor', value_vi: 'Chứng minh nước cổ đại (không phải sự sống)', value_en: 'Proved ancient water (not life)' }
        ],
        media_id: 'IMG-OPP-01',
        source_ids: ['SRC-OPP-01', 'SRC-OPP-03']
      },
      {
        id: 'opp-5',
        code_vi: '05 · KHI TÍN HIỆU IM LẶNG',
        code_en: '05 · WHEN THE SIGNAL FADED',
        phase_vi: 'Khi tín hiệu im lặng',
        phase_en: 'When the Signal Faded',
        title_vi: 'Khi bầu trời tối lại tại Perseverance Valley',
        title_en: 'When the Sky Turned Dark Over Perseverance Valley',
        narration_vi: MACHINE_STORIES.opportunity.chapters[4].narration,
        narration_en:
          'In June 2018, a planet-encircling dust storm swallowed Mars. The sky darkened until sunlight could no longer reach my solar panels. On June 10, 2018 (Sol 5,111), I transmitted my final status from Perseverance Valley. After months of listening and over 1,000 recovery commands, NASA declared my mission complete on February 13, 2019.',
        hardware_part_vi: MACHINE_STORIES.opportunity.chapters[4].hardware_part,
        hardware_part_en: 'Solar Arrays & Internal Mission Clock Heaters',
        hardware_to_science_vi: MACHINE_STORIES.opportunity.chapters[4].hardware_to_science,
        hardware_to_science_en:
          'Extreme atmospheric opacity blocked solar power, draining batteries below survival heater thresholds—highlighting why later rovers like Curiosity and Perseverance use MMRTG nuclear power.',
        facts: [
          { label_vi: 'Tín hiệu cuối cùng', label_en: 'Last Communication', value_vi: '10/06/2018 (Sol 5.111)', value_en: '2018-06-10 (Sol 5,111)' },
          { label_vi: 'Tuyên bố kết thúc sứ mệnh', label_en: 'Formal Mission End', value_vi: '13/02/2019 (hai mốc riêng biệt)', value_en: '2019-02-13 (distinct milestone)' }
        ],
        media_id: 'opportunity_last_message',
        source_ids: ['SRC-OPP-01', 'SRC-OPP-04']
      },
      {
        id: 'opp-6',
        code_vi: '06 · DI SẢN VĨNH CỬU',
        code_en: '06 · ENDURING LEGACY',
        phase_vi: 'Di sản',
        phase_en: 'Legacy',
        title_vi: '45,16 kilômét dấu bánh xe trên Sao Hỏa',
        title_en: '45.16 Kilometers of Tracks Across Mars',
        narration_vi: MACHINE_STORIES.opportunity.chapters[5].narration,
        narration_en:
          'I drove 45.16 kilometers across Mars—for years the longest off-world distance ever driven by any machine, until Perseverance surpassed my record on October 11, 2026. Every lesson learned from my wheels, cameras, and spectrometers lives on in the explorers that followed me.',
        hardware_part_vi: MACHINE_STORIES.opportunity.chapters[5].hardware_part,
        hardware_part_en: 'Complete MER-B Heritage System',
        hardware_to_science_vi: MACHINE_STORIES.opportunity.chapters[5].hardware_to_science,
        hardware_to_science_en:
          'Transformed Mars exploration from brief site visits into multi-decade overland geological expeditions.',
        facts: [
          { label_vi: 'Tổng quãng đường', label_en: 'Total Odometry', value_vi: '45,16 km (28,06 dặm)', value_en: '45.16 km (28.06 miles)' },
          { label_vi: 'Cập nhật kỷ lục', label_en: 'Record Update', value_vi: 'Perseverance vượt qua ngày 11/10/2026', value_en: 'Surpassed by Perseverance on 2026-10-11' }
        ],
        media_id: 'opportunity_self_portrait_2004',
        source_ids: ['SRC-OPP-01', 'SRC-OPP-05']
      }
    ]
  },
  'pioneer-11': {
    id: 'pioneer-11',
    isFeatured: true,
    isDemoRecord: false,
    realm_vi: 'KHÔNG GIAN SÂU · SAO MỘC, SAO THỔ & QUỸ ĐẠO RỜI HỆ MẶT TRỜI',
    realm_en: 'DEEP SPACE · JUPITER, SATURN & HELIOCENTRIC ESCAPE',
    badge_vi: 'Triển lãm chuyên sâu · Lời kể sáng tác dựa trên dữ kiện',
    badge_en: 'Featured Deep Journey · Creative Narrative from NASA Logs',
    accent: '#C5A46A',
    title_vi: 'Pioneer 11 (Pioneer-G)',
    title_en: 'Pioneer 11 (Pioneer-G)',
    official_designation: 'Pioneer 11 Deep-Space Flyby Spacecraft',
    tagline_vi: MACHINE_STORIES['pioneer-11'].tagline,
    tagline_en: 'I was the first spacecraft to fly past Saturn, and I am still coasting into the dark.',
    intro_vi: MACHINE_STORIES['pioneer-11'].intro,
    intro_en:
      'Hello. I am Pioneer 11, a deep-space planetary flyby probe—not a lander or a rover. I flew past the giant planets Jupiter and Saturn and continue outward beyond the Solar System. Listen to my story, grounded in verified NASA archival records.',
    where_now_vi: MACHINE_STORIES['pioneer-11'].where_now,
    where_now_en: 'Coasting outward into deep space, silent since 1995',
    closing_line: MACHINE_STORIES['pioneer-11'].closing_line,
    EditorialWarning_vi:
      'Lưu ý khoa học: Pioneer 11 là tàu bay ngang (flyby probe) mang tấm bảng Pioneer Plaque (không phải tàu Voyager và không mang đĩa Golden Record). Ảnh "Pioneer 11 at Saturn" (IMG-PIO-01) là ảnh do Pioneer 11 chụp Sao Thổ và Titan, không phải ảnh chụp thân tàu. Tách bạch mốc liên lạc cuối của NASA Ames (30/09/1995) và dữ liệu kỹ thuật cuối cùng (24/11/1995).',
    EditorialWarning_en:
      'Scientific note: Pioneer 11 is a flyby probe carrying the Pioneer Plaque (not a Voyager spacecraft and not the Golden Record). Image IMG-PIO-01 ("Pioneer 11 at Saturn") was taken BY Pioneer 11 showing Saturn and Titan, not the spacecraft body. Last NASA Ames contact (1995-09-30) and last engineering data (1995-11-24) are distinct.',
    slides: [
      {
        id: 'pio-1',
        code_vi: '01 · KHỞI ĐẦU & CÂU HỎI',
        code_en: '01 · ORIGIN & THE QUESTION',
        phase_vi: 'Khởi đầu',
        phase_en: 'Origin',
        title_vi: 'Có thể vượt vành đai tiểu hành tinh để đến Sao Thổ không?',
        title_en: 'Can a Spacecraft Survive Jupiter and Reach Saturn?',
        narration_vi: MACHINE_STORIES['pioneer-11'].chapters[0].narration,
        narration_en:
          'In 1973, no spacecraft had ever visited Saturn. Could a probe cross the asteroid belt, survive Jupiter’s intense radiation belts, and use gravity assist to reach the ringed planet? On April 6, 1973 (UTC), I launched from Cape Canaveral to find out.',
        hardware_part_vi: MACHINE_STORIES['pioneer-11'].chapters[0].hardware_part,
        hardware_part_en: 'Spin-Stabilized Planetary Flyby Architecture',
        hardware_to_science_vi: MACHINE_STORIES['pioneer-11'].chapters[0].hardware_to_science,
        hardware_to_science_en:
          'As a flyby spacecraft, I did not land; I swept past giant planets at high velocity, measuring magnetic fields, cosmic rays, plasma, and dust along the way.',
        facts: [
          { label_vi: 'Ngày phóng (UTC)', label_en: 'Launch Date (UTC)', value_vi: '06/04/1973 (05/04 giờ Mỹ)', value_en: '1973-04-06 UTC (04-05 EDT)' },
          { label_vi: 'Loại phương tiện', label_en: 'Vehicle Type', value_vi: 'Tàu bay ngang (Flyby probe)', value_en: 'Spin-stabilized flyby probe' }
        ],
        media_id: 'IMG-PIO-02',
        source_ids: ['SRC-PIO-01', 'SRC-PIO-04']
      },
      {
        id: 'pio-2',
        code_vi: '02 · CỖ MÁY KHOA HỌC',
        code_en: '02 · THE MACHINE',
        phase_vi: 'Cỗ máy',
        phase_en: 'The Machine',
        title_vi: 'Trái tim hạt nhân giữa bóng tối không gian sâu',
        title_en: 'Nuclear Heart in the Outer Solar System',
        narration_vi: MACHINE_STORIES['pioneer-11'].chapters[1].narration,
        narration_en:
          'Far from the Sun, sunlight is too faint for solar panels. I carried four SNAP-19 radioisotope thermoelectric generators (RTGs) and 12 radioisotope heater units (RHUs). Weighing 258.5 kilograms, I kept my high-gain dish antenna aimed toward Earth across billions of kilometers.',
        hardware_part_vi: MACHINE_STORIES['pioneer-11'].chapters[1].hardware_part,
        hardware_part_en: '4 SNAP-19 RTGs, 12 RHUs & High-Gain Dish Antenna',
        hardware_to_science_vi: MACHINE_STORIES['pioneer-11'].chapters[1].hardware_to_science,
        hardware_to_science_en:
          'RTGs convert heat from radioactive decay into electricity, powering 12 scientific instruments in the freezing outer Solar System.',
        facts: [
          { label_vi: 'Khối lượng tàu', label_en: 'Spacecraft Mass', value_vi: '258,5 kg', value_en: '258.5 kg' },
          { label_vi: 'Nguồn năng lượng', label_en: 'Power System', value_vi: '4 máy phát SNAP-19 RTG & 12 RHU', value_en: '4 SNAP-19 RTGs & 12 RHUs' }
        ],
        media_id: 'IMG-PIO-02',
        source_ids: ['SRC-PIO-01', 'SRC-PIO-03', 'SRC-PIO-04']
      },
      {
        id: 'pio-3',
        code_vi: '03 · HÀNH TRÌNH LIÊN HÀNH TINH',
        code_en: '03 · THE JOURNEY',
        phase_vi: 'Hành trình',
        phase_en: 'Journey',
        title_vi: 'Mượn lực hấp dẫn Sao Mộc để vươn tới Sao Thổ',
        title_en: 'Slingshot Past Jupiter Toward Saturn',
        narration_vi: MACHINE_STORIES['pioneer-11'].chapters[2].narration,
        narration_en:
          'On December 3, 1974, I flew past Jupiter, capturing dramatic views of its polar regions. Jupiter’s immense gravity flung me across the Solar System toward Saturn. Nearly five years later, on September 1, 1979, I became the first spacecraft in human history to fly past Saturn.',
        hardware_part_vi: MACHINE_STORIES['pioneer-11'].chapters[2].hardware_part,
        hardware_part_en: 'Imaging Photopolarimeter (IPP)',
        hardware_to_science_vi: MACHINE_STORIES['pioneer-11'].chapters[2].hardware_to_science,
        hardware_to_science_en:
          'As the spacecraft spun, the IPP scanned strips of light to reconstruct close-up images of Jupiter’s poles and Saturn’s rings.',
        facts: [
          { label_vi: 'Bay ngang Sao Mộc', label_en: 'Jupiter Flyby', value_vi: '03/12/1974', value_en: '1974-12-03' },
          { label_vi: 'Bay ngang Sao Thổ', label_en: 'Saturn Flyby', value_vi: '01/09/1979 (Đầu tiên trong lịch sử)', value_en: '1979-09-01 (First in history)' }
        ],
        media_id: 'IMG-PIO-01',
        source_ids: ['SRC-PIO-01', 'SRC-PIO-02']
      },
      {
        id: 'pio-4',
        code_vi: '04 · KHÁM PHÁ TẠI SAO THỔ',
        code_en: '04 · THE DISCOVERY',
        phase_vi: 'Khám phá',
        phase_en: 'Discovery',
        title_vi: 'Vành F, từ quyển và bức ảnh Sao Thổ cùng Titan',
        title_en: 'Saturn’s F Ring, Magnetosphere, and Titan',
        narration_vi: MACHINE_STORIES['pioneer-11'].chapters[3].narration,
        narration_en:
          'At Saturn, I discovered the narrow F ring, new moons, and mapped the planet’s magnetic field. I also photographed Saturn and its largest moon Titan from about 2.846 million kilometers away—remember, that famous photograph was taken BY me looking at Saturn, so my own body is not in the frame.',
        hardware_part_vi: MACHINE_STORIES['pioneer-11'].chapters[3].hardware_part,
        hardware_part_en: 'Helium Vector Magnetometer, IPP & Infrared Radiometer',
        hardware_to_science_vi: MACHINE_STORIES['pioneer-11'].chapters[3].hardware_to_science,
        hardware_to_science_en:
          'Magnetometer and particle detectors proved Saturn possesses a strong magnetosphere and radiation belts, scouting a safe path for Voyager.',
        facts: [
          { label_vi: 'Phát hiện nổi bật', label_en: 'Key Discoveries', value_vi: 'Vành F, mặt trăng mới, từ quyển Sao Thổ', value_en: 'F Ring, new moons, Saturn magnetosphere' },
          { label_vi: 'Lưu ý ảnh IMG-PIO-01', label_en: 'Image Provenance Note', value_vi: 'Ảnh do Pioneer 11 chụp Sao Thổ & Titan', value_en: 'Photo taken BY Pioneer 11 of Saturn & Titan' }
        ],
        media_id: 'IMG-PIO-01',
        source_ids: ['SRC-PIO-01', 'SRC-PIO-02', 'SRC-PIO-06']
      },
      {
        id: 'pio-5',
        code_vi: '05 · KHI TÍN HIỆU IM LẶNG',
        code_en: '05 · WHEN THE SIGNAL FADED',
        phase_vi: 'Khi tín hiệu im lặng',
        phase_en: 'When the Signal Faded',
        title_vi: 'Hai mốc chia tay năm 1995',
        title_en: 'Two Farewell Milestones in Autumn 1995',
        narration_vi: MACHINE_STORIES['pioneer-11'].chapters[4].narration,
        narration_en:
          'After more than 22 years in flight, my RTG power decayed until I could no longer power my transmitter and point my antenna toward Earth. NASA Ames had its last routine contact with me on September 30, 1995, and engineers received a final few minutes of engineering data on November 24, 1995.',
        hardware_part_vi: MACHINE_STORIES['pioneer-11'].chapters[4].hardware_part,
        hardware_part_en: ' Plutonium-238 RTG Decay & Deep Space Antenna',
        hardware_to_science_vi: MACHINE_STORIES['pioneer-11'].chapters[4].hardware_to_science,
        hardware_to_science_en:
          'Radioisotope decay follows a strict physical half-life, setting the ultimate operational clock for every deep-space probe.',
        facts: [
          { label_vi: 'Liên lạc cuối (NASA Ames)', label_en: 'Last NASA Ames Contact', value_vi: '30/09/1995', value_en: '1995-09-30' },
          { label_vi: 'Dữ liệu kỹ thuật cuối', label_en: 'Last Engineering Data', value_vi: '24/11/1995 (tách biệt)', value_en: '1995-11-24 (distinct date)' }
        ],
        media_id: 'IMG-PIO-02',
        source_ids: ['SRC-PIO-01', 'SRC-PIO-03']
      },
      {
        id: 'pio-6',
        code_vi: '06 · DI SẢN VĨNH CỬU',
        code_en: '06 · ENDURING LEGACY',
        phase_vi: 'Di sản',
        phase_en: 'Legacy',
        title_vi: 'Tấm bảng Pioneer Plaque gửi tới những vì sao',
        title_en: 'The Pioneer Plaque: A Message to the Stars',
        narration_vi: MACHINE_STORIES['pioneer-11'].chapters[5].narration,
        narration_en:
          'Bolted to my antenna support struts is a gold-anodized aluminum plate called the Pioneer Plaque (not the Voyager Golden Record). It depicts a man and a woman, the hyperfine transition of hydrogen, and a pulsar map pinpointing the Sun. My radio is silent, but I still carry humanity’s greeting into deep space.',
        hardware_part_vi: MACHINE_STORIES['pioneer-11'].chapters[5].hardware_part,
        hardware_part_en: 'Gold-Anodized Aluminum Pioneer Plaque (A73-9015-2)',
        hardware_to_science_vi: MACHINE_STORIES['pioneer-11'].chapters[5].hardware_to_science,
        hardware_to_science_en:
          'Uses universal physical constants—the hydrogen spin-flip transition and 14 pulsar periods—to encode time and Earth’s galactic location.',
        facts: [
          { label_vi: 'Hiện vật mang theo', label_en: 'Artifact Aboard', value_vi: 'Pioneer Plaque (không phải Golden Record)', value_en: 'Pioneer Plaque (not Golden Record)' },
          { label_vi: 'Trạng thái hiện tại', label_en: 'Current Status', value_vi: 'Đang bay ra ngoài Hệ Mặt Trời', value_en: 'Coasting outward on escape trajectory' }
        ],
        media_id: 'IMG-PIO-03',
        source_ids: ['SRC-PIO-01', 'SRC-PIO-05']
      }
    ]
  },
  'surveyor-3': {
    id: 'surveyor-3',
    isFeatured: false,
    isDemoRecord: true,
    realm_vi: 'MẶT TRĂNG · OCEANUS PROCELLARUM (ĐẠI DƯƠNG BÃO TỐ)',
    realm_en: 'THE MOON · OCEANUS PROCELLARUM (OCEAN OF STORMS)',
    badge_vi: 'Hồ sơ tư liệu mẫu · Demo Record · Truyện tranh 15 trang',
    badge_en: 'Archival Demo Record · Hồ sơ tư liệu mẫu · 15-Page Comic',
    accent: '#C9C7C0',
    title_vi: 'Surveyor 3',
    title_en: 'Surveyor 3 Lunar Lander',
    official_designation: 'Surveyor 3 Lunar Lander',
    tagline_vi: 'Tôi đào những rãnh đất đầu tiên để mở đường cho bước chân Apollo, rồi được các phi hành gia Apollo 12 ghé thăm.',
    tagline_en: 'I dug the lunar soil to pave the way for Apollo—and two and a half years later, Apollo 12 astronauts walked up to me.',
    intro_vi:
      'Hồ sơ hành trình 6 chương của tàu đổ bộ Mặt Trăng Surveyor 3 (Hồ sơ tư liệu mẫu / Demo Record), đối chiếu trực tiếp từ tư liệu NASA Science và NSSDCA — kèm truyện tranh minh họa 15 trang.',
    intro_en:
      'Expanded 6-chapter journey for the Surveyor 3 lunar lander (Demo Record), compiled directly from verified NASA Science and NSSDCA records — accompanied by our 15-page graphic novel.',
    where_now_vi: 'Oceanus Procellarum, Mặt Trăng (camera TV & một số bộ phận được Apollo 12 đưa về Trái Đất)',
    where_now_en: 'Oceanus Procellarum, The Moon (TV camera returned to Earth by Apollo 12)',
    closing_line: 'Tested the lunar soil in 1967; visited by human explorers in 1969.',
    EditorialWarning_vi:
      'Lưu ý quy ước thời gian: Trang nhiệm vụ NASA và NSSDCA ghi thời điểm hạ cánh là 00:04 UT ngày 20/04/1967 (một số tư liệu ảnh ghi tối 19/04/1967 theo giờ Mỹ). Đây là Hồ sơ tư liệu mẫu (Demo Record).',
    EditorialWarning_en:
      'Time convention note: NASA mission pages and NSSDCA record landing at 00:04 UT on April 20, 1967 (some photo captions list April 19, 1967 US local time). Marked as Demo Record.',
    slides: [
      {
        id: 'sur-1',
        code_vi: '01 · KHỞI ĐẦU TỪ MŨI CANAVERAL',
        code_en: '01 · LIFTOFF & THE APOLLO QUESTION',
        phase_vi: 'Khởi đầu (17/04/1967)',
        phase_en: 'Origin (Apr 17, 1967)',
        title_vi: 'Mặt đất Mặt Trăng có đủ vững cho tàu Apollo không?',
        title_en: 'Can the Lunar Surface Support an Apollo Lander?',
        narration_vi:
          'Trước khi phi hành gia Apollo đặt chân lên Mặt Trăng, giới khoa học lo ngại lớp bụi mịn có thể nhấn chìm tàu đổ bộ có người lái. Ngày 17/04/1967, Surveyor 3 (khối lượng phóng 997,9 kg) rời Mũi Canaveral trên tên lửa Atlas-Centaur mang theo camera truyền hình và cánh tay đào đất để tự mình kiểm chứng.',
        narration_en:
          'Before Apollo astronauts could walk on the Moon, engineers needed to know if the regolith could bear a human lander or swallow it in dust. Surveyor 3 launched from Cape Canaveral on April 17, 1967 aboard Atlas-Centaur to test the lunar surface firsthand.',
        hardware_part_vi: 'Tàu đổ bộ tự động Surveyor 3 & tên lửa Atlas-Centaur',
        hardware_part_en: 'Surveyor 3 Soft Lander & Atlas-Centaur Launch Vehicle',
        hardware_to_science_vi: ARCHIVE_RECORDS[0].story.machine,
        hardware_to_science_en:
          'Equipped with a slow-scan television camera and a mechanical surface sampler capable of reaching ~1.5 meters and digging trenches ~18 cm deep.',
        facts: [
          { label_vi: 'Ngày phóng (UTC)', label_en: 'Launch Date (UTC)', value_vi: '17/04/1967', value_en: '1967-04-17' },
          { label_vi: 'Khối lượng phóng (NASA)', label_en: 'Launch Mass (NASA)', value_vi: '997,9 kg', value_en: '997.9 kg' }
        ],
        media_id: 'IMG-SUR-02',
        source_ids: ['SRC-SUR-01', 'SRC-SUR-02']
      },
      {
        id: 'sur-2',
        code_vi: '02 · HAI CÚ NẢY NGHẸT THỞ',
        code_en: '02 · DOUBLE BOUNCE TOUCHDOWN',
        phase_vi: 'Hạ cánh (20/04/1967)',
        phase_en: 'Touchdown (Apr 20, 1967)',
        title_vi: 'Nhiễu Radar & Hai Cú Nảy Xuống Oceanus Procellarum',
        title_en: 'Reflective Rocks & Two Bounces in Oceanus Procellarum',
        narration_vi:
          'Lúc 00:04 UT ngày 20/04/1967, các tảng đá sáng bên trong miệng hố phản xạ mạnh gây nhiễu radar độ cao khiến động cơ tinh chỉnh không tự tắt ở độ cao 4,3 m. Surveyor 3 nảy vọt lên cao hai lần (khoảng 10 m rồi 3 m) trước khi mặt đất gửi lệnh ngắt động cơ ở 3,4 m. Khung tam giác và ba chân tổ ong nhôm vẫn đứng vững an toàn trên sườn dốc 12°.',
        narration_en:
          'At 00:04 UT on April 20, 1967, bright crater rocks confused the descent radar so the vernier engines stayed firing at 4.3 m. Surveyor 3 bounced twice (~10 m and ~3 m) before manual cutoff at 3.4 m, settling intact on a 12° inner crater slope in Oceanus Procellarum.',
        hardware_part_vi: 'Radar Doppler, động cơ Vernier & 3 chân giảm chấn tổ ong',
        hardware_part_en: 'Descent Radar, Vernier Propulsion & Honeycomb Footpads',
        hardware_to_science_vi: 'Hệ thống chân hấp thụ xung lực nhôm tổ ong bảo vệ toàn bộ thiết bị qua 3 lần chạm đất.',
        hardware_to_science_en:
          'Crushable aluminum honeycomb footpads absorbed three touchdowns on a crater slope without damaging the camera or sampler.',
        facts: [
          { label_vi: 'Hạ cánh (UTC)', label_en: 'Landing Date (UTC)', value_vi: '20/04/1967 (00:04 UT)', value_en: '1967-04-20 (00:04 UT)' },
          { label_vi: 'Tọa độ hạ cánh', label_en: 'Landing Site', value_vi: 'Oceanus Procellarum (3°S, 23,41°W)', value_en: 'Oceanus Procellarum (3°S, 23.41°W)' }
        ],
        media_id: 'IMG-SUR-02',
        source_ids: ['SRC-SUR-01', 'SRC-SUR-02', 'SRC-SUR-04']
      },
      {
        id: 'sur-3',
        code_vi: '03 · ĐÔI MẮT TV & GẦU ĐÀO 18 CM',
        code_en: '03 · 6,326 PHOTOS & 18 CM SOIL TRENCHES',
        phase_vi: 'Khảo sát đất (04–05/1967)',
        phase_en: 'Soil Mechanics (Apr–May 1967)',
        title_vi: '6.326 Bức Ảnh & Chứng Minh Đất Đủ Cứng Cho Apollo',
        title_en: '6,326 TV Pictures & Proving Lunar Bearing Strength (~10 psi)',
        narration_vi:
          'Chỉ một giờ sau khi chạm đất, Camera TV ống kính 25mm/100mm gắn gương xoay truyền về những ảnh quét 200 & 600 dòng đầu tiên trong tổng số 6.326 bức ảnh. Tay đào cơ học Surface Sampler vươn xa ~1,5 m, đào 4 rãnh sâu tới ~18 cm, thực hiện 13 lần gõ va chạm và 7 phép thử chịu tải — chứng minh đất Mặt Trăng chịu lực khoảng 10 psi (~70 kPa), hoàn toàn an toàn cho mô-đun Apollo.',
        narration_en:
          'Within an hour, the dual-focal TV camera transmitted the first of 6,326 pictures. The 1.5 m Surface Sampler scoop dug 4 trenches up to ~18 cm deep, performing impact and bearing tests that proved ~10 psi (~70 kPa) soil strength — clearing the surface for Apollo landers.',
        hardware_part_vi: 'Camera TV 25mm/100mm & Tay lấy mẫu Surface Sampler (1,5 m)',
        hardware_part_en: 'Dual-Focal TV Camera & Surface Sampler Scoop (1.5 m reach)',
        hardware_to_science_vi: 'Đo trực tiếp độ bền chịu tải cơ học của lớp regolith thông qua dòng điện mô-tơ tay đào và quan sát ảnh TV.',
        hardware_to_science_en:
          'Directly quantified regolith bearing strength and cohesion via trench geometry observed through the TV camera.',
        facts: [
          { label_vi: 'Ảnh truyền về', label_en: 'TV Images Returned', value_vi: '6.326 ảnh TV', value_en: '6,326 TV pictures' },
          { label_vi: 'Độ sâu rãnh đào', label_en: 'Trench Depth', value_vi: '~18 cm (tầm với ~1,5 m)', value_en: '~18 cm (~1.5 m reach)' }
        ],
        media_id: 'IMG-SUR-02',
        source_ids: ['SRC-SUR-01', 'SRC-SUR-02']
      },
      {
        id: 'sur-4',
        code_vi: '04 · ĐÊM MẶT TRĂNG & GIẤC NGỦ 31 THÁNG',
        code_en: '04 · LUNAR NIGHTFALL & SILENT SLUMBER',
        phase_vi: 'Ngủ đông (04/05/1967)',
        phase_en: 'Lunar Night (May 4, 1967)',
        title_vi: 'Tín Hiệu Cuối Khi Màn Đêm -150°C Buông Xuống',
        title_en: 'Final Signal as Freezing 14-Day Lunar Night Arrives',
        narration_vi:
          'Ngày 04/05/1967, sau hai tuần làm việc không ngừng nghỉ dưới nắng Mặt Trăng, màn đêm kéo dài 14 ngày Trái Đất buông xuống Oceanus Procellarum với cái lạnh tới -150°C. Nguồn pin Bạc-Kẽm và tấm pin Mặt Trời 0,855 m² không còn đủ năng lượng sưởi ấm mạch điện tử. Surveyor 3 gửi tín hiệu cuối và bước vào giấc ngủ lặng lẽ suốt hơn hai năm rưỡi.',
        narration_en:
          'On May 4, 1967, two weeks after landing, the 14-Earth-day freezing lunar night (~-150°C) drained Surveyor 3\'s silver-zinc battery. It fell silent for over 2.5 years on the quiet slope of Oceanus Procellarum.',
        hardware_part_vi: 'Tấm pin Mặt Trời 0,855 m² & Ắc quy Bạc-Kẽm',
        hardware_part_en: '0.855 m² Solar Panel & Silver-Zinc Battery',
        hardware_to_science_vi: 'Chỉ ra thách thức nhiệt độ khắc nghiệt (-150°C) của đêm Mặt Trăng đối với thiết bị không dùng nguồn nhiệt đồng vị.',
        hardware_to_science_en:
          'Demonstrated the severe survival challenge posed by 14-day lunar nights without radioisotope heaters.',
        facts: [
          { label_vi: 'Liên lạc cuối', label_en: 'Last Contact', value_vi: '04/05/1967', value_en: '1967-05-04' },
          { label_vi: 'Thời gian chờ đợi', label_en: 'Surface Exposure', value_vi: '31 tháng trên Mặt Trăng', value_en: '31 months on the Moon' }
        ],
        media_id: 'IMG-SUR-02',
        source_ids: ['SRC-SUR-01', 'SRC-SUR-02']
      },
      {
        id: 'sur-5',
        code_vi: '05 · APOLLO 12 & CÚ HẠ CÁNH CÁCH 180 MÉT',
        code_en: '05 · APOLLO 12 PINPOINT LANDING (180 M)',
        phase_vi: 'Hội ngộ (19/11/1969)',
        phase_en: 'Pinpoint Landing (Nov 19, 1969)',
        title_vi: 'Từ Lệnh “SCE to Aux” Tới Cú Đáp Chính Xác Đầu Tiên Trong Lịch Sử',
        title_en: 'From “SCE to Aux” to History’s First Pinpoint Lunar Landing',
        narration_vi:
          'Tháng 11/1969, sau khi vượt qua hai tia sét đánh lúc phóng nhờ lệnh cứu nguy “Flight, try SCE to Aux” của John Aaron và Alan Bean, tàu đổ bộ Intrepid của Apollo 12 hạ cánh vào ngày 19/11/1969 ngay trên rìa miệng hố Surveyor — chỉ cách Surveyor 3 khoảng 180 mét! Đó là cú hạ cánh chính xác đầu tiên trong lịch sử thám hiểm không gian.',
        narration_en:
          'Surviving two lightning strikes during launch thanks to John Aaron’s “SCE to Aux” call, Pete Conrad and Alan Bean landed Apollo 12 LM Intrepid on November 19, 1969 just ~180 meters from Surveyor 3 — achieving history’s first pinpoint lunar landing.',
        hardware_part_vi: 'Mô-đun đổ bộ Intrepid & Điểm mốc định vị Surveyor 3',
        hardware_part_en: 'Apollo 12 LM Intrepid & Surveyor Crater Target',
        hardware_to_science_vi: 'Chứng minh năng lực dẫn đường hạ cánh chính xác đến từng trăm mét tại vị trí robot tiền trạm.',
        hardware_to_science_en:
          'Proved precision lunar guidance capable of landing within walking distance of pre-selected robotic probes.',
        facts: [
          { label_vi: 'Apollo 12 hạ cánh', label_en: 'Apollo 12 Touchdown', value_vi: '19/11/1969', value_en: '1969-11-19' },
          { label_vi: 'Khoảng cách tới Surveyor 3', label_en: 'Distance to Surveyor 3', value_vi: 'Khoảng 180 mét', value_en: '~180 meters (197 yards)' }
        ],
        media_id: 'IMG-SUR-01',
        source_ids: ['SRC-SUR-03', 'SRC-SUR-04']
      },
      {
        id: 'sur-6',
        code_vi: '06 · CUỘC GẶP DUY NHẤT & KHẢO CỔ KHÔNG GIAN',
        code_en: '06 · HISTORIC VISIT & HARDWARE RETRIEVAL',
        phase_vi: 'Thu hồi & Di sản (20/11/1969)',
        phase_en: 'Retrieval & Legacy (Nov 20, 1969)',
        title_vi: 'Mang Camera TV Về Trái Đất Sau 31 Tháng Ngoài Vũ Trụ',
        title_en: 'Returning the TV Camera After 31 Months of Lunar Exposure',
        narration_vi:
          'Ngày 20/11/1969 (chuyến đi bộ EVA 2), Pete Conrad và Alan Bean đi bộ tới bên Surveyor 3 — nhận thấy lớp sơn trắng đã ngả màu nâu nhạt vì bức xạ Mặt Trời. Họ chụp lại những vết rãnh đào năm 1967 và dùng kìm thu hồi Camera TV cùng gầu đào mang về Trái Đất. Đây là lần duy nhất con người ghé thăm một robot đã hạ cánh trước đó trên thiên thể khác.',
        narration_en:
          'During EVA 2 on November 20, 1969, Conrad and Bean walked to Surveyor 3 — noting its white paint had tanned light brown from solar radiation — photographed its 1967 trenches, and detached its TV camera and scoop to return to Earth for space-aging studies.',
        hardware_part_vi: 'Camera TV & mảnh vật liệu được Apollo 12 thu hồi',
        hardware_part_en: 'TV Camera, Scoop & Tubing Retrieved by Apollo 12',
        hardware_to_science_vi: 'Khởi đầu ngành Khảo cổ học Không gian, giúp phân tích sự biến đổi vật liệu sau 31 tháng trong chân không Mặt Trăng.',
        hardware_to_science_en:
          'Marked the dawn of space archaeology and enabled laboratory analysis of 31-month lunar radiation and micrometeorite exposure.',
        facts: [
          { label_vi: 'Apollo 12 ghé thăm', label_en: 'Apollo 12 EVA 2', value_vi: '20/11/1969', value_en: '1969-11-20' },
          { label_vi: 'Hiện vật mang về', label_en: 'Returned Hardware', value_vi: 'Camera TV & Gầu đào mẫu', value_en: 'TV Camera & Soil Scoop' }
        ],
        media_id: 'IMG-SUR-01',
        source_ids: ['SRC-SUR-01', 'SRC-SUR-03', 'SRC-SUR-04']
      }
    ]
  },
  'viking-1': {
    id: 'viking-1',
    isFeatured: false,
    isDemoRecord: true,
    realm_vi: 'SAO HỎA · CHRYSE PLANITIA & QUỸ ĐẠO SAO HỎA',
    realm_en: 'MARS · CHRYSE PLANITIA & MARS ORBIT',
    badge_vi: 'Hồ sơ tư liệu mẫu · Demo Record',
    badge_en: 'Archival Demo Record · Hồ sơ tư liệu mẫu',
    accent: '#D97745',
    title_vi: 'Viking 1 (Orbiter & Lander)',
    title_en: 'Viking 1 (Orbiter & Lander)',
    official_designation: 'Viking 1 Orbiter & Viking 1 Lander',
    tagline_vi: 'Tàu đổ bộ của NASA đầu tiên hạ cánh thành công trên Sao Hỏa và gửi về bức ảnh chụp ngay từ bề mặt hành tinh Đỏ.',
    tagline_en: 'NASA’s first truly successful Mars landing and the first spacecraft to transmit photographs directly from the Martian surface.',
    intro_vi:
      'Hồ sơ hành trình tóm tắt của hệ thống tàu quỹ đạo và tàu đổ bộ Viking 1 (Hồ sơ tư liệu mẫu / Demo Record), đối chiếu từ tư liệu NASA Science và Photojournal.',
    intro_en:
      'Compact archival journey for the Viking 1 Orbiter and Lander (Demo Record), compiled from verified NASA Science and Photojournal sources.',
    where_now_vi: 'Chryse Planitia, Sao Hỏa (Lander) & Quỹ đạo Sao Hỏa (Orbiter)',
    where_now_en: 'Chryse Planitia, Mars (Lander) & Mars Orbit (Orbiter)',
    closing_line: 'First clear view from the rocky plains of Chryse Planitia, July 20, 1976.',
    EditorialWarning_vi:
      'Lưu ý biên tập: Viking 1 là tàu đầu tiên của NASA hạ cánh thành công trên Sao Hỏa (không viết là lần thử đầu tiên của mọi quốc gia). Phân biệt rõ Tàu quỹ đạo (kết thúc 07/08/1980) và Tàu đổ bộ (ngừng hoạt động tháng 11/1982). Số liệu 52.663 ảnh quỹ đạo là tổng của cả hai tàu Viking 1 & 2 Orbiter.',
    EditorialWarning_en:
      'Editorial note: Viking 1 was NASA’s first truly successful Mars landing (do not phrase as the first attempt by any nation). Distinguish the Orbiter (ended 1980-08-07) from the Lander (ended Nov 1982). The 52,663 orbital images metric is the combined total of Viking 1 & 2 Orbiters.',
    slides: [
      {
        id: 'vik-1',
        code_vi: '01 · KHỞI ĐẦU & CỖ MÁY KÉP',
        code_en: '01 · ORIGIN & DUAL SPACECRAFT',
        phase_vi: 'Khởi đầu',
        phase_en: 'Origin',
        title_vi: 'Cặp tàu Quỹ đạo – Đổ bộ tiến về Sao Hỏa',
        title_en: 'An Orbiter and Lander Pair Bound for Mars',
        narration_vi: ARCHIVE_RECORDS[1].story.question + ' ' + ARCHIVE_RECORDS[1].story.machine,
        narration_en:
          'Could NASA safely touch down on Mars, photograph its rocky plains up close, and analyze its soil and atmosphere? Launched on August 20, 1975, Viking 1 combined a solar-powered Orbiter to map the planet with an RTG-powered Lander carrying cameras, a sampling arm, weather sensors, and biology labs.',
        hardware_part_vi: 'Tàu quỹ đạo (Orbiter) + Tàu đổ bộ (Lander dùng 2 SNAP-19 RTG)',
        hardware_part_en: 'Solar Orbiter + RTG Lander (2 SNAP-19 RTGs)',
        hardware_to_science_vi: 'Tàu quỹ đạo chụp ảnh chọn điểm đáp an toàn; tàu đổ bộ phân tích trực tiếp đất và khí quyển.',
        hardware_to_science_en:
          'The Orbiter Certified landing sites from orbit while the Lander conducted in-situ surface chemistry, meteorology, and biology tests.',
        facts: [
          { label_vi: 'Ngày phóng (UTC)', label_en: 'Launch Date (UTC)', value_vi: '20/08/1975', value_en: '1975-08-20' },
          { label_vi: 'Vào quỹ đạo Sao Hỏa', label_en: 'Mars Orbit Insertion', value_vi: '19/06/1976', value_en: '1976-06-19' }
        ],
        media_id: 'IMG-VIK-01',
        source_ids: ['SRC-VIK-01', 'SRC-VIK-03']
      },
      {
        id: 'vik-2',
        code_vi: '02 · HẠ CÁNH & BỨC ẢNH ĐẦU TIÊN',
        code_en: '02 · LANDING & FIRST SURFACE PHOTO',
        phase_vi: 'Hành trình & Khám phá',
        phase_en: 'Journey & Discovery',
        title_vi: 'Ngày 20/07/1976 tại Chryse Planitia',
        title_en: 'July 20, 1976 at Chryse Planitia',
        narration_vi: ARCHIVE_RECORDS[1].story.journey + ' ' + ARCHIVE_RECORDS[1].story.discovery,
        narration_en:
          'On July 20, 1976, Viking 1 Lander touched down on Chryse Planitia—NASA’s first truly successful Mars landing—and transmitted the first photograph ever taken on the Martian surface (PIA00381). Combined, the Viking 1 and 2 Orbiters returned 52,663 images mapping ~97% of Mars, while surface biology experiments found no clear evidence of life.',
        hardware_part_vi: 'Camera quét Facsimile, GCMS & Cánh tay lấy mẫu',
        hardware_part_en: 'Facsimile Cameras, GCMS & Remote Sampler Arm',
        hardware_to_science_vi: 'Chụp bức ảnh bề mặt Sao Hỏa đầu tiên và đo thành phần khí quyển, đất Sao Hỏa tại chỗ.',
        hardware_to_science_en:
          'Captured the first surface photographs of Mars and measured atmospheric and soil composition in situ.',
        facts: [
          { label_vi: 'Hạ cánh bề mặt', label_en: 'Surface Landing', value_vi: '20/07/1976 (Chryse Planitia)', value_en: '1976-07-20 (Chryse Planitia)' },
          { label_vi: 'Bản đồ (cả Viking 1 & 2)', label_en: 'Combined Viking 1 & 2 Map', value_vi: '52.663 ảnh (~97% bề mặt)', value_en: '52,663 images (~97% surface)' }
        ],
        media_id: 'IMG-VIK-01',
        source_ids: ['SRC-VIK-01', 'SRC-VIK-02']
      },
      {
        id: 'vik-3',
        code_vi: '03 · TÍN HIỆU CUỐI & DI SẢN',
        code_en: '03 · LAST SIGNAL & LEGACY',
        phase_vi: 'Tín hiệu cuối & Di sản',
        phase_en: 'Last Signal & Legacy',
        title_vi: 'Nền tảng cho mọi sứ mệnh Sao Hỏa hiện đại',
        title_en: 'Foundation for Modern Mars Exploration',
        narration_vi: ARCHIVE_RECORDS[1].story.last_signal + ' ' + ARCHIVE_RECORDS[1].story.legacy,
        narration_en:
          'Viking 1 Orbiter concluded operations on August 7, 1980, while the Lander operated on Chryse Planitia until November 1982. For years it held the record for the longest surface mission on Mars, laying the engineering and scientific foundation for every lander and rover that followed.',
        hardware_part_vi: 'Hệ thống Viking 1 Orbiter & Lander',
        hardware_part_en: 'Viking 1 Orbiter & Lander Heritage',
        hardware_to_science_vi: 'Cung cấp bộ dữ liệu chuẩn đầu tiên về khí tượng, địa hình và hóa học đất Sao Hỏa.',
        hardware_to_science_en:
          'Established the baseline reference for Martian meteorology, atmospheric composition, and surface geology.',
        facts: [
          { label_vi: 'Tàu quỹ đạo kết thúc', label_en: 'Orbiter End', value_vi: '07/08/1980', value_en: '1980-08-07' },
          { label_vi: 'Tàu đổ bộ ngừng hoạt động', label_en: 'Lander End', value_vi: 'Tháng 11/1982', value_en: 'November 1982' }
        ],
        media_id: 'IMG-VIK-01',
        source_ids: ['SRC-VIK-01', 'SRC-VIK-03', 'SRC-VIK-04']
      }
    ]
  },
  sojourner: {
    id: 'sojourner',
    isFeatured: false,
    isDemoRecord: true,
    realm_vi: 'SAO HỎA · ARES VALLIS (SỨ MỆNH MARS PATHFINDER)',
    realm_en: 'MARS · ARES VALLIS (MARS PATHFINDER MISSION)',
    badge_vi: 'Hồ sơ tư liệu mẫu · Demo Record',
    badge_en: 'Archival Demo Record · Hồ sơ tư liệu mẫu',
    accent: '#D49B54',
    title_vi: 'Sojourner (Mars Pathfinder)',
    title_en: 'Sojourner (Mars Pathfinder)',
    official_designation: 'Sojourner Micro-Rover · Mars Pathfinder Mission',
    tagline_vi: 'Robot sáu bánh đầu tiên trên Sao Hỏa: kế hoạch 7 ngày, thực tế hoạt động 83 sol tại Ares Vallis.',
    tagline_en: 'The first wheeled rover on Mars: planned for 7 days, operated for 83 sols across Ares Vallis.',
    intro_vi:
      'Hồ sơ hành trình tóm tắt của micro-rover Sojourner thuộc sứ mệnh Mars Pathfinder (Hồ sơ tư liệu mẫu / Demo Record), đối chiếu từ tư liệu NASA Science.',
    intro_en:
      'Compact archival journey for the Sojourner micro-rover of the Mars Pathfinder mission (Demo Record), compiled from verified NASA Science records.',
    where_now_vi: 'Ares Vallis, Sao Hỏa (quanh trạm đổ bộ Mars Pathfinder)',
    where_now_en: 'Ares Vallis, Mars (near the Mars Pathfinder lander)',
    closing_line: 'Six small wheels that opened the era of mobile Mars geology.',
    EditorialWarning_vi:
      'Lưu ý biên tập: Mars Pathfinder là tên sứ mệnh và trạm đổ bộ (lander); Sojourner là robot tự hành sáu bánh (micro-rover) đi kèm. Không dùng hai tên này thay thế lẫn nhau. Đây là Hồ sơ tư liệu mẫu (Demo Record).',
    EditorialWarning_en:
      'Editorial note: Mars Pathfinder is the mission and lander; Sojourner is the six-wheeled micro-rover deployed by Pathfinder. Do not conflate the two names. Marked as Demo Record.',
    slides: [
      {
        id: 'soj-1',
        code_vi: '01 · KHỞI ĐẦU & CÂU HỎI',
        code_en: '01 · ORIGIN & THE QUESTION',
        phase_vi: 'Khởi đầu',
        phase_en: 'Origin',
        title_vi: 'Một robot nhỏ có thể tự lăn bánh trên Sao Hỏa không?',
        title_en: 'Can a Small Wheeled Rover Explore Mars Up Close?',
        narration_vi: ARCHIVE_RECORDS[2].story.question + ' ' + ARCHIVE_RECORDS[2].story.machine,
        narration_en:
          'Could a low-cost airbag landing system deliver a mobile robotic geologist to Mars? Launched on December 4, 1996 aboard Mars Pathfinder, Sojourner was a six-wheeled micro-rover equipped with cameras and an Alpha Proton X-ray Spectrometer (APXS) to inspect Martian rocks.',
        hardware_part_vi: 'Hệ thống 6 bánh xe & Quang phổ kế APXS',
        hardware_part_en: 'Six-Wheel Rocker-Bogie & APXS Spectrometer',
        hardware_to_science_vi: 'Đưa cảm biến APXS chạm trực tiếp vào từng tảng đá xung quanh trạm đổ bộ Pathfinder.',
        hardware_to_science_en:
          'Allowed scientists to drive up to individual rocks like Barnacle Bill and Yogi and press the APXS sensor against them.',
        facts: [
          { label_vi: 'Pathfinder phóng (UTC)', label_en: 'Pathfinder Launch (UTC)', value_vi: '04/12/1996', value_en: '1996-12-04' },
          { label_vi: 'Hạ cánh tại Ares Vallis', label_en: 'Ares Vallis Landing', value_vi: '04/07/1997', value_en: '1997-07-04' }
        ],
        media_id: 'IMG-SOJ-01',
        source_ids: ['SRC-SOJ-01', 'SRC-SOJ-02']
      },
      {
        id: 'soj-2',
        code_vi: '02 · HÀNH TRÌNH 83 SOL & KHÁM PHÁ',
        code_en: '02 · 83-SOL JOURNEY & DISCOVERY',
        phase_vi: 'Hành trình & Khám phá',
        phase_en: 'Journey & Discovery',
        title_vi: 'Khảo sát đá Barnacle Bill, Yogi và vượt xa kế hoạch 7 ngày',
        title_en: 'Analyzing Barnacle Bill & Yogi Across 83 Sols',
        narration_vi: ARCHIVE_RECORDS[2].story.journey + ' ' + ARCHIVE_RECORDS[2].story.discovery,
        narration_en:
          'After landing on July 4, 1997 cushioned by giant airbags, Sojourner rolled down Pathfinder’s ramp onto Ares Vallis. Designed for a 7-day primary rover demonstration, Sojourner operated for 83 sols, analyzing rocks such as Barnacle Bill and Yogi with its APXS instrument.',
        hardware_part_vi: 'Thiết bị quang phổ APXS & Camera định hướng',
        hardware_part_en: 'APXS Spectrometer & Rover Cameras',
        hardware_to_science_vi: 'Phân tích thành phần nguyên tố đá và ghi lại tương tác cơ học giữa bánh xe với đất Sao Hỏa.',
        hardware_to_science_en:
          'Measured elemental chemistry of Martian rocks and studied soil mechanics through wheel-track interactions.',
        facts: [
          { label_vi: 'Thời gian thiết kế', label_en: 'Planned Duration', value_vi: '7 ngày', value_en: '7 days' },
          { label_vi: 'Thời gian hoạt động thực tế', label_en: 'Actual Operation', value_vi: '83 sol', value_en: '83 sols' }
        ],
        media_id: 'IMG-SOJ-01',
        source_ids: ['SRC-SOJ-03', 'SRC-SOJ-04']
      },
      {
        id: 'soj-3',
        code_vi: '03 · TÍN HIỆU CUỐI & DI SẢN',
        code_en: '03 · LAST SIGNAL & LEGACY',
        phase_vi: 'Tín hiệu cuối & Di sản',
        phase_en: 'Last Signal & Legacy',
        title_vi: 'Mở đường cho thế hệ Spirit, Opportunity, Curiosity và Perseverance',
        title_en: 'Paving the Way for Spirit, Opportunity, Curiosity, and Perseverance',
        narration_vi: ARCHIVE_RECORDS[2].story.last_signal + ' ' + ARCHIVE_RECORDS[2].story.legacy,
        narration_en:
          'The last data transmission from Mars Pathfinder was received on September 27, 1997 at 10:23 UTC, and the mission formally ended on March 10, 1998. Sojourner proved that six-wheeled rovers and airbag landings worked on Mars—directly enabling Spirit and Opportunity.',
        hardware_part_vi: 'Di sản công nghệ túi khí & Rover 6 bánh',
        hardware_part_en: 'Airbag Landing & Six-Wheel Rover Heritage',
        hardware_to_science_vi: 'Chứng minh tính khả thi kỹ thuật cho mọi thế hệ robot tự hành Sao Hỏa tiếp theo của NASA.',
        hardware_to_science_en:
          'Validated the mobility and landing architecture scaled up for the Mars Exploration Rovers in 2004.',
        facts: [
          { label_vi: 'Dữ liệu cuối (UTC)', label_en: 'Last Data (UTC)', value_vi: '27/09/1997 (10:23 UTC)', value_en: '1997-09-27 (10:23 UTC)' },
          { label_vi: 'Kết thúc nhiệm vụ', label_en: 'Mission End', value_vi: '10/03/1998', value_en: '1998-03-10' }
        ],
        media_id: 'IMG-SOJ-02',
        source_ids: ['SRC-SOJ-01', 'SRC-SOJ-03']
      }
    ]
  }
};

interface ProductManifest {
  author?: string;
  title?: string;
  description?: string;
  poster?: string | null;
  pdfUrl?: string | null;
  comicCover?: string | null;
  video?: { src: string; poster?: string; duration?: string; titleVi?: string; titleEn?: string; captions?: string; transcript?: string } | null;
  audio?: { src: string; duration?: string; titleVi?: string; titleEn?: string; transcript?: string } | null;
  comic?: { pages?: string[]; pdf?: string } | null;
}

const resolveJourneyPublicUrl = (p: string | null | undefined, missionId?: string): string => {
  if (!p) return '';
  if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('blob:') || p.startsWith('data:')) return p;
  let clean = p;
  if (!clean.startsWith('/products/') && !clean.startsWith('/public/') && !clean.startsWith('/assets/') && missionId) {
    clean = `/products/${missionId}/${clean.replace(/^\/+/, '')}`;
  } else {
    clean = clean.startsWith('/') ? clean : `/${clean}`;
  }
  if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
    return clean.startsWith('/public/') ? `.${clean}` : `./public${clean}`;
  }
  if (clean.startsWith('/public/')) {
    clean = clean.slice(7);
  }
  return clean;
};

const BUILTIN_JOURNEY_MANIFESTS: Partial<Record<JourneyMissionId, ProductManifest>> = {
  opportunity: {
    title: 'LITTLE WHEELS — A Song for Opportunity (MV 03:41 & Poster)',
    poster: 'little_wheels_poster.png',
    video: {
      src: 'little_wheels.mp4',
      poster: 'little_wheels_poster.png',
      duration: '03:41',
      titleVi: 'MV Ca khúc: LITTLE WHEELS — A Song for Opportunity',
      titleEn: 'Music Video: LITTLE WHEELS — A Song for Opportunity'
    },
    audio: {
      src: 'little_wheels.mp4',
      duration: '03:41',
      titleVi: 'Bản thu âm & Ca khúc: LITTLE WHEELS — A Song for Opportunity',
      titleEn: 'Audio Track: LITTLE WHEELS — A Song for Opportunity'
    }
  },
  'surveyor-3': {
    title: 'SURVEYOR 3 — Người bạn cô độc trên Mặt Trăng (15 trang & PDF)',
    pdfUrl: 'Surveyor_3_Comic.pdf',
    comicCover: 'comic/page_01.png',
    comic: {
      pdf: 'Surveyor_3_Comic.pdf',
      pages: [
        'comic/page_01.png',
        'comic/page_02.png',
        'comic/page_03.png',
        'comic/page_04.png',
        'comic/page_05.png',
        'comic/page_06.png',
        'comic/page_07.png',
        'comic/page_08.png',
        'comic/page_09.png',
        'comic/page_10.png',
        'comic/page_11.png',
        'comic/page_12.png',
        'comic/page_13.png',
        'comic/page_14.png',
        'comic/page_15.png'
      ]
    }
  }
};

const pickVoiceForLang = (lang: 'vi' | 'en'): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  const prefix = lang === 'en' ? 'en' : 'vi';
  const matching = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith(prefix));
  if (matching.length === 0) return null;
  return (
    matching.find((v) => /online|natural|hoaimy|namminh|aria|guy|google/i.test(v.name)) ||
    matching[0]
  );
};

interface CustomStoryChapterDraft {
  code: string;
  title: string;
  narration: string;
  hardware_part: string;
  hardware_to_science: string;
  fact_label?: string;
  fact_value?: string;
  media_id?: string;
}

interface CustomStoryDraft {
  title: string;
  official_designation: string;
  realm: string;
  where_now: string;
  tagline: string;
  intro: string;
  closing_line: string;
  chapters: CustomStoryChapterDraft[];
}

const DEFAULT_USER_STORY_DRAFT: CustomStoryDraft = {
  title: 'Opportunity: Người Địa Chất Bền Bỉ Trên Sao Hỏa',
  official_designation: 'Mars Exploration Rover – B (MER-B)',
  realm: 'SAO HỎA · BÌNH NGUYÊN MERIDIANI → MIỆNG HỐ ENDEAVOUR',
  where_now: 'Thung lũng Perseverance, Vành miệng hố Endeavour, Sao Hỏa',
  tagline: 'Người ta kỳ vọng tôi sống 90 sol. Tôi đã bền bỉ đi gần 15 năm và gửi về bằng chứng về nước lỏng.',
  intro: 'Tôi là Opportunity, robot địa chất sáu bánh chạy bằng năng lượng mặt trời. Tôi đang yên nghỉ tại Thung lũng Kiên Trì trên Sao Hỏa. Hãy cùng lắng nghe hành trình khám phá địa chất của tôi.',
  closing_line: 'Tôi nằm lại thung lũng đỏ, tấm pin phủ đầy bụi, nhưng di sản về một hành tinh từng có nước sẽ mãi thuộc về loài người.',
  chapters: [
    {
      code: '01 · CÂU HỎI KHOA HỌC',
      title: 'Sao Hỏa đã từng có nước lỏng hay không?',
      narration: 'Vào đầu thế kỷ 21, các nhà khoa học NASA khao khát tìm câu trả lời: Liệu nước lỏng có từng chảy trên bề mặt Sao Hỏa? Để trả lời, họ chế tạo tôi như một nhà địa chất học robot thực thụ mang theo bộ dụng cụ cơ học tinh xảo.',
      hardware_part: 'Kiến trúc Robot Địa chất 6 bánh Rocker-Bogie',
      hardware_to_science: 'Hệ thống treo rocker-bogie giúp giữ thăng bằng trên địa hình đá gồ ghề mà không bị lật',
      fact_label: 'Ngày phóng',
      fact_value: '07/07/2003 (Mỹ)',
      media_id: 'opportunity_rover_and_lander'
    },
    {
      code: '02 · BẰNG CHỨNG HẠT HEMATITE',
      title: 'Khám phá viên vi cầu khoáng vật "Blueberries"',
      narration: 'Chỉ vài tuần sau khi hạ cánh xuống miệng hố Eagle, camera vi mô và máy quang phổ của tôi phát hiện hàng ngàn hạt cầu nhỏ màu xám giàu hematite kết tinh trong môi trường nước ngầm cổ xưa.',
      hardware_part: 'Kính hiển vi Microscopic Imager & Máy quang phổ Mössbauer',
      hardware_to_science: 'Phân tích đồng vị sắt và cấu trúc tinh thể khoáng chất ở độ phân giải micromet',
      fact_label: 'Phát hiện',
      fact_value: 'Khoáng vật Hematite hình thành trong nước',
      media_id: 'opportunity_microscopic_hematite_blueberries'
    },
    {
      code: '03 · BẪY CÁT PURGATORY RIPPLE',
      title: 'Thử thách lún cát đe dọa sinh mạng sứ mệnh',
      narration: 'Vào Sol 446, sáu bánh xe nhôm của tôi lún sâu vào một cồn cát đỏ cao 30 cm. Động cơ quay trơn. Các kỹ sư ở Trái Đất mất gần 5 tuần thử nghiệm mô hình trong phòng cát tại JPL trước khi điều khiển tôi thoát ra an toàn.',
      hardware_part: '6 Bánh xe nhôm có gờ bám với mô-tơ độc lập',
      hardware_to_science: 'Khả năng điều khiển độc lập từng bánh cho phép giật lùi từng milimet để thoát bẫy cát',
      fact_label: 'Thời gian kẹt cát',
      fact_value: '38 Sol (gần 5 tuần)',
      media_id: 'opportunity_purgatory_sand_dune_trap'
    },
    {
      code: '04 · VƯỢT ĐƯỜNG DÀI VÀ MẠCH THẠCH CAO',
      title: 'Hành trình marathon 45 km tới Miệng hố Endeavour',
      narration: 'Sau hàng năm trời di chuyển qua bình nguyên cát, tôi tới miệng hố Endeavour rộng 22 km. Mũi mài đá RAT của tôi gọt lộ một mạch khoáng màu trắng tinh khiết: đó là thạch cao (calcium sulfate) kết tủa từ nước ấm trung tính.',
      hardware_part: 'Mũi mài đá Rock Abrasion Tool (RAT) & Máy quang phổ APXS',
      hardware_to_science: 'Mài lớp vỏ phong hóa bề mặt để lộ đá gốc bên trong phục vụ phân tích hóa học chính xác',
      fact_label: 'Tổng quãng đường',
      fact_value: '45.16 km (Kỷ lục thế giới)',
      media_id: 'opportunity_homestake_gypsum_vein'
    },
    {
      code: '05 · BÃO BỤI TOÀN CẦU 2018',
      title: 'Cơn bão nuốt chửng ánh mặt trời',
      narration: 'Tháng 6 năm 2018, một cơn bão bụi toàn cầu che kín bầu trời Sao Hỏa. Độ đục quang học tau vọt lên trên 10.8, biến ngày thành đêm đen đặc. Tấm pin mặt trời không còn đủ năng lượng để sưởi ấm bộ vi xử lý.',
      hardware_part: 'Tấm pin quang điện Mặt Trời silicon & Bộ tản nhiệt RHU',
      hardware_to_science: 'Hiệu suất năng lượng sụt từ 600 Wh xuống dưới 22 Wh/sol trong điều kiện bão bụi cực hạn',
      fact_label: 'Ngày tín hiệu cuối',
      fact_value: '10/06/2018',
      media_id: 'IMG-OPP-DUST'
    },
    {
      code: '06 · DI SẢN BẤT TỬ',
      title: 'Yên nghỉ trong Thung lũng Kiên Trì',
      narration: 'NASA gửi hơn 1.000 lệnh đánh thức vô vọng. Ngày 13/02/2019, sứ mệnh chính thức khép lại. Nhưng 45.16 km hành trình và hàng trăm ngàn bức ảnh tôi để lại đã chứng minh chắc chắn: Sao Hỏa xưa kia từng có nước lỏng và môi trường thân thiện.',
      hardware_part: 'Hệ thống ăng-ten High-Gain & Low-Gain X-band',
      hardware_to_science: 'Gửi về Trái Đất 217.594 bức ảnh nguyên bản mở ra kỷ nguyên khám phá không gian sâu',
      fact_label: 'Hoàn thành sứ mệnh',
      fact_value: '13/02/2019 (Sau 5.111 Sol)',
      media_id: 'IMG-OPP-LEGACY'
    }
  ]
};

function parseRawStoryIntoDraft(rawText: string, currentDraft: CustomStoryDraft): CustomStoryDraft {
  const paras = rawText.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (paras.length === 0) return currentDraft;
  const nextChapters = currentDraft.chapters.map((ch, idx) => {
    if (idx < paras.length) {
      return { ...ch, narration: paras[idx] };
    }
    return ch;
  });
  return {
    ...currentDraft,
    intro: paras[0] || currentDraft.intro,
    chapters: nextChapters
  };
}

function evaluateStoryLogic(story: CustomStoryDraft) {
  const fullText = (
    story.title +
    ' ' +
    story.intro +
    ' ' +
    story.chapters
      .map((c) => c.title + ' ' + c.narration + ' ' + c.hardware_part + ' ' + c.hardware_to_science)
      .join(' ')
  ).toLowerCase();

  const hasQuestionKeywords =
    /(câu hỏi|nghiên cứu|tìm kiếm|nước|khí quyển|bề mặt|khoáng vật|sự sống|khám phá|mục tiêu|giải mã|lịch sử|nước lỏng|hồ sơ)/i.test(
      fullText
    );
  const goalScore = hasQuestionKeywords ? 25 : 12;

  const hasHardwareKeywords =
    /(bánh xe|nhôm|titan|khung|camera|pancam|navcam|kính hiển vi|mũi mài|rat|quang phổ|mini-tes|apxs|pin|năng lượng|rtg|anten|máy phát|thân xe|web|aerogel|lăng kính)/i.test(
      fullText
    );
  const hardwareScore = hasHardwareKeywords ? 25 : 10;

  const hasHazardKeywords =
    /(cát|lún|đụn cát|bão|bụi|lạnh|nhiệt độ|áp suất|dốc|đá|miệng hố|rơi|xa|trễ|tín hiệu|sóng|tau|mùa đông)/i.test(
      fullText
    );
  const hazardScore = hasHazardKeywords ? 25 : 12;

  const hasDiscoveryKeywords =
    /(phát hiện|bằng chứng|hematite|thạch cao|khoáng|trầm tích|kết quả|sol|km|kỷ lục|yên nghỉ|di sản|kết thúc|tín hiệu cuối|thung lũng)/i.test(
      fullText
    );
  const discoveryScore = hasDiscoveryKeywords ? 25 : 11;

  const totalScore = Math.min(100, goalScore + hardwareScore + hazardScore + discoveryScore);

  const feedbackList: { type: 'pass' | 'tip' | 'warn'; textVi: string; textEn: string }[] = [];
  if (hasQuestionKeywords) {
    feedbackList.push({
      type: 'pass',
      textVi: 'Mục Tiêu Khoa Học: Đặt ra bài toán khám phá rõ ràng (có mục tiêu điều tra cụ thể ở chặng đầu).',
      textEn: 'Scientific Goal: Clear investigation question established in opening chapters.'
    });
  } else {
    feedbackList.push({
      type: 'tip',
      textVi: 'Gợi ý Mục Tiêu: Nên bổ sung rõ câu hỏi nghiên cứu ở Chặng 1 (ví dụ: tìm dấu vết nước, khí quyển hay khoáng vật).',
      textEn: 'Goal Tip: Define an explicit scientific research question in Chapter 1.'
    });
  }
  if (hasHardwareKeywords) {
    feedbackList.push({
      type: 'pass',
      textVi: 'Khí Cụ & Kỹ Thuật: Liên kết tốt giữa bộ phận phần cứng và phương pháp khoa học.',
      textEn: 'Hardware & Tech: Strong connection between hardware parts and scientific methods.'
    });
  } else {
    feedbackList.push({
      type: 'warn',
      textVi: 'Cảnh báo Phần Cứng: Chưa nêu rõ bộ phận máy móc (camera, mũi mài, tấm pin, ăng-ten...) giúp thu thập dữ liệu thế nào.',
      textEn: 'Hardware Warning: Specify hardware parts (cameras, abrasion tool, antennas) gathering data.'
    });
  }
  if (hasHazardKeywords) {
    feedbackList.push({
      type: 'pass',
      textVi: 'Môi Trường Khắc Nghiệt: Phản ánh đúng thách thức thực địa ngoài hành tinh (bão bụi, lạnh giá, độ trễ liên lạc).',
      textEn: 'Off-World Hazards: Accurately captures extreme space environment challenges.'
    });
  } else {
    feedbackList.push({
      type: 'tip',
      textVi: 'Gợi ý Môi Trường: Nên kể thêm về khó khăn thực địa (bụi che pin mặt trời, cát lún hay độ trễ tín hiệu hàng chục phút).',
      textEn: 'Hazard Tip: Include realistic off-world challenges (dust, rough terrain, communication delay).'
    });
  }
  if (hasDiscoveryKeywords) {
    feedbackList.push({
      type: 'pass',
      textVi: 'Thành Tựu & Di Sản: Khép lại với phát hiện khoa học cụ thể và dấu ấn danh dự.',
      textEn: 'Legacy: Closes with specific scientific discoveries and an honorable resting place.'
    });
  } else {
    feedbackList.push({
      type: 'tip',
      textVi: 'Gợi ý Di Sản: Bổ sung phát hiện khoáng sản/địa chất quan trọng và nơi chiếc máy đang yên nghỉ.',
      textEn: 'Legacy Tip: Highlight key discoveries and the final resting coordinates.'
    });
  }

  return { goalScore, hardwareScore, hazardScore, discoveryScore, totalScore, feedbackList };
}

export const JourneysPage: React.FC<JourneysPageProps> = ({
  lang,
  initialMissionId,
  onNavigate,
  onOpenLightbox
}) => {
  const isEn = lang === 'en';

  // Determine initial mission from prop or URL query param ?mission=
  const resolveMissionFromUrlOrProp = (): JourneyMissionId => {
    if (initialMissionId === 'custom') return 'custom';
    if (initialMissionId === 'custom') return 'custom';
    if (initialMissionId && JOURNEY_DATA[initialMissionId]) {
      return initialMissionId;
    }
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const m = params.get('mission') as JourneyMissionId | null;
      if (m && JOURNEY_DATA[m]) return m;
      const hashParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
      const hm = hashParams.get('mission') as JourneyMissionId | null;
      if (hm && JOURNEY_DATA[hm]) return hm;
    }
    return 'opportunity';
  };

  const resolveFormatTabFromUrl = (): FormatTab => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const val = params.get('format') || params.get('tab');
      if (val === 'slide-audio' || val === 'scrollytelling' || val === 'multimedia' || val === 'custom-story') {
        return val;
      }
      const hashParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
      const hv = hashParams.get('format') || hashParams.get('tab');
      if (hv === 'slide-audio' || hv === 'scrollytelling' || hv === 'multimedia' || hv === 'custom-story') {
        return hv;
      }
    }
    return 'slide-audio';
  };

  const [selectedMissionId, setSelectedMissionId] = useState<JourneyMissionId>(resolveMissionFromUrlOrProp);
  const [activeFormatTab, setActiveFormatTab] = useState<FormatTab>(resolveFormatTabFromUrl);
  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(0);

  /* Custom Story Studio & Logic Analyzer State */
  const [customStory, setCustomStory] = useState<CustomStoryDraft>(DEFAULT_USER_STORY_DRAFT);
  const [fastPasteText, setFastPasteText] = useState<string>('');
  const [showFastPasteModal, setShowFastPasteModal] = useState<boolean>(false);
  const [customStoryLoadedNotice, setCustomStoryLoadedNotice] = useState<string | null>(null);

  /* Dynamic Custom Journey Config */
  const customJourneyConfig: BilingualJourneyConfig = useMemo(() => {
    return {
      id: 'custom' as JourneyMissionId,
      isFeatured: true,
      isDemoRecord: false,
      realm_vi: customStory.realm,
      realm_en: customStory.realm,
      badge_vi: 'Câu chuyện tự sáng tác · Đã kiểm tra logic',
      badge_en: 'User Created Story · Logic Evaluated',
      accent: '#D2A071',
      title_vi: customStory.title,
      title_en: customStory.title,
      official_designation: customStory.official_designation,
      tagline_vi: customStory.tagline,
      tagline_en: customStory.tagline,
      intro_vi: customStory.intro,
      intro_en: customStory.intro,
      where_now_vi: customStory.where_now,
      where_now_en: customStory.where_now,
      closing_line: customStory.closing_line,
      EditorialWarning_vi:
        'Lưu ý minh bạch: Đây là câu chuyện do người dùng tự soạn thảo và kiểm tra tính logic trực tiếp trên nền tảng Beyond the Signal.',
      EditorialWarning_en:
        'Transparency note: This is a user-created narrative tested directly inside the Beyond the Signal Story Studio.',
      slides: customStory.chapters.map((ch, idx) => ({
        id: `custom-slide-${idx + 1}`,
        code_vi: ch.code,
        code_en: ch.code,
        phase_vi: ch.title,
        phase_en: ch.title,
        title_vi: ch.title,
        title_en: ch.title,
        narration_vi: ch.narration,
        narration_en: ch.narration,
        hardware_part_vi: ch.hardware_part,
        hardware_part_en: ch.hardware_part,
        hardware_to_science_vi: ch.hardware_to_science,
        hardware_to_science_en: ch.hardware_to_science,
        facts: [
          {
            label_vi: ch.fact_label || 'Thông số',
            label_en: ch.fact_label || 'Metric',
            value_vi: ch.fact_value || 'Đã ghi nhận',
            value_en: ch.fact_value || 'Recorded'
          }
        ],
        media_id: ch.media_id || 'opportunity_rover_and_lander',
        source_ids: ['SRC-OPP-01', 'SRC-USER-STORY']
      }))
    };
  }, [customStory]);

  /* Story Logic Analyzer (Evaluates 4 NASA museum criteria) */
  const storyLogicAnalysis = useMemo(() => {
    const fullText = (
      customStory.title +
      ' ' +
      customStory.intro +
      ' ' +
      customStory.chapters
        .map((c) => c.title + ' ' + c.narration + ' ' + c.hardware_part + ' ' + c.hardware_to_science)
        .join(' ')
    ).toLowerCase();

    // 1. Goal Logic (Checks question / science purpose)
    const hasQuestionKeywords =
      /(câu hỏi|nghiên cứu|tìm kiếm|nước|khí quyển|bề mặt|khoáng vật|sự sống|khám phá|mục tiêu|giải mã|lịch sử|nước lỏng|hồ sơ)/i.test(
        fullText
      );
    const goalScore = hasQuestionKeywords ? 25 : 12;

    // 2. Hardware Engineering Logic
    const hasHardwareKeywords =
      /(bánh xe|nhôm|titan|khung|camera|pancam|navcam|kính hiển vi|mũi mài|rat|quang phổ|mini-tes|apxs|pin|năng lượng|rtg|anten|máy phát|thân xe|web|aerogel|lăng kính)/i.test(
        fullText
      );
    const hardwareScore = hasHardwareKeywords ? 25 : 10;

    // 3. Journey & Hazard Logic
    const hasHazardKeywords =
      /(cát|lún|đụn cát|bão|bụi|lạnh|nhiệt độ|áp suất|dốc|đá|miệng hố|rơi|xa|trễ|tín hiệu|sóng|tau|mùa đông)/i.test(
        fullText
      );
    const hazardScore = hasHazardKeywords ? 25 : 12;

    // 4. Discovery, Evidence & Closure Logic
    const hasDiscoveryKeywords =
      /(phát hiện|bằng chứng|hematite|thạch cao|khoáng|trầm tích|kết quả|sol|km|kỷ lục|yên nghỉ|di sản|kết thúc|tín hiệu cuối|thung lũng)/i.test(
        fullText
      );
    const discoveryScore = hasDiscoveryKeywords ? 25 : 11;

    const totalScore = Math.min(100, goalScore + hardwareScore + hazardScore + discoveryScore);

    const feedbackList: { type: 'pass' | 'tip' | 'warn'; textVi: string; textEn: string }[] = [];

    if (hasQuestionKeywords) {
      feedbackList.push({
        type: 'pass',
        textVi: 'Mục Tiêu Khoa Học: Đặt ra bài toán khám phá rõ ràng (có mục tiêu điều tra cụ thể ở chặng đầu).',
        textEn: 'Scientific Goal: Clear investigation question established in opening chapters.'
      });
    } else {
      feedbackList.push({
        type: 'tip',
        textVi: 'Gợi ý Mục Tiêu: Nên bổ sung rõ câu hỏi nghiên cứu ở Chặng 1 (ví dụ: tìm dấu vết nước, khí quyển hay khoáng vật).',
        textEn: 'Goal Tip: Define an explicit scientific research question in Chapter 1.'
      });
    }

    if (hasHardwareKeywords) {
      feedbackList.push({
        type: 'pass',
        textVi: 'Giải Pháp Phần Cứng: Đã gắn liền công nghệ cụ thể (bánh xe, camera, quang phổ kế hoặc hệ năng lượng) với bài toán sinh tồn.',
        textEn: 'Hardware Feasibility: Specific engineering subsystems assigned to solve the challenge.'
      });
    } else {
      feedbackList.push({
        type: 'tip',
        textVi: 'Gợi ý Phần Cứng: Hãy gắn tên linh kiện kỹ thuật cụ thể (Pancam, Mini-TES, bánh xe nhôm...) ở Chặng 2 để tăng tính thuyết phục.',
        textEn: 'Hardware Tip: Mention concrete hardware instruments in Chapter 2.'
      });
    }

    if (hasHazardKeywords) {
      feedbackList.push({
        type: 'pass',
        textVi: 'Thử Thách Môi Trường: Phản ánh chân thực các chướng ngại vật lý ngoài hành tinh (bão bụi, đụn cát lún hay nhiệt độ âm sâu).',
        textEn: 'Off-World Hazards: Accurately reflects real space perils (dust storms, sand traps, extreme cold).'
      });
    } else {
      feedbackList.push({
        type: 'warn',
        textVi: 'Gợi ý Thử Thách: Nên bổ sung thêm chướng ngại thực tế ở Chặng 3 (bão cát, dốc nghiêng hoặc độ trễ sóng vô tuyến).',
        textEn: 'Hazard Tip: Add realistic space perils (dust events, terrain slip, signal delay) in Chapter 3.'
      });
    }

    if (hasDiscoveryKeywords) {
      feedbackList.push({
        type: 'pass',
        textVi: 'Tính Trọn Vẹn & Di Sản: Khám phá khoa học giải đáp bài toán ban đầu; kết thúc và nơi yên nghỉ trung thực với lịch sử.',
        textEn: 'Evidence & Closure: Findings correlate to original question, with respectful historic closure.'
      });
    } else {
      feedbackList.push({
        type: 'tip',
        textVi: 'Gợi ý Kết Thúc: Nêu rõ kết quả đo đạc then chốt ở Chặng 4 và vị trí cỗ máy đang yên nghỉ ở Chặng 5-6.',
        textEn: 'Closure Tip: Anchor findings in measurable discoveries and state resting location clearly.'
      });
    }

    return {
      totalScore,
      goalScore,
      hardwareScore,
      hazardScore,
      discoveryScore,
      feedbackList
    };
  }, [customStory]);

  /* Custom Story Action Handlers */
  const handleRunCustomStoryOnStage = () => {
    setSelectedMissionId('custom');
    setCurrentSlideIdx(0);
    setActiveFormatTab('slide-audio');
    setCustomStoryLoadedNotice('Đã nạp câu chuyện vào sân khấu chính! Bấm Phát để nghe thuyết minh.');
    setTimeout(() => {
      startNarration();
    }, 400);
  };

  const handleUpdateChapter = (idx: number, field: keyof CustomStoryChapterDraft, value: string) => {
    setCustomStory((prev) => {
      const nextCh = [...prev.chapters];
      nextCh[idx] = { ...nextCh[idx], [field]: value };
      return { ...prev, chapters: nextCh };
    });
  };

  const handleLoadSampleStory = (type: 'opp' | 'pio' | 'sur') => {
    if (type === 'opp') {
      setCustomStory(DEFAULT_USER_STORY_DRAFT);
    } else if (type === 'pio') {
      setCustomStory({
        title: 'Pioneer 11: Chuyến Bay Xuyên Qua Vành Đai Sao Thổ',
        official_designation: 'Pioneer-G Deep Space Probe',
        realm: 'KHÔNG GIAN SÂU · SAO MỘC → SAO THỔ → LIÊN SAO',
        where_now: 'Hướng ra ngoài rìa Hệ Mặt Trời về phía chòm sao Thuẫn Bài',
        tagline: 'Con người gửi tôi đi trước để mở đường cho các tàu Voyager.',
        intro:
          'Tôi là Pioneer 11, một phi thuyền nhỏ mang theo 4 máy phát nhiệt điện hạt nhân SNAP-19 RTG và tấm bảng Pioneer Plaque bằng nhôm mạ vàng...',
        closing_line: 'Hàng triệu năm nữa, tấm bảng nhôm mạ vàng của tôi vẫn sẽ mang lời chào của loài người bay qua các vì sao.',
        chapters: [
          {
            code: '01 · CÂU HỎI KHOA HỌC',
            title: 'Liệu tàu vũ trụ có thể sống sót qua vành đai tiểu hành tinh?',
            narration:
              'Vào thập niên 1970, con người chưa biết liệu có thể bay qua vành đai tiểu hành tinh và bức xạ chết người của Sao Mộc hay không. Họ gửi tôi đi thử nghiệm.',
            hardware_part: 'Khung thân 12 mặt & 4 lò SNAP-19 RTG',
            hardware_to_science: 'Nguồn điện hạt nhân Plutonium-238 hoạt động độc lập với ánh sáng Mặt Trời',
            fact_label: 'Phóng',
            fact_value: '06/04/1973 (UTC)',
            media_id: 'IMG-PIO-01'
          },
          {
            code: '02 · BẢNG PIONEER PLAQUE',
            title: 'Bức thông điệp vũ trụ bằng vàng',
            narration:
              'Phía trước thân tàu, tôi mang tấm bảng Pioneer Plaque do Carl Sagan thiết kế, khắc hình hai con người và bản đồ 14 ẩn tinh chỉ vị trí Trái Đất.',
            hardware_part: 'Tấm bảng nhôm mạ vàng 15 × 23 cm',
            hardware_to_science: 'Ký hiệu bước sóng hydro trung tính 21 cm dùng làm thước đo chuẩn vũ trụ',
            fact_label: 'Vật liệu',
            fact_value: 'Nhôm mạ vàng chống ăn mòn vũ trụ',
            media_id: 'pioneer_plaque_diagram'
          },
          {
            code: '03 · TRỢ LỰC HẤP DẪN SAO MỘC',
            title: 'Cú bẻ lái ngoạn mục tháng 12 năm 1974',
            narration:
              'Tôi tiếp cận Sao Mộc ở cự ly chỉ 43.000 km, chụp ảnh cực nam và đo từ trường khổng lồ. Trọng lực Sao Mộc đã ném tôi văng qua toàn bộ Hệ Mặt Trời hướng về Sao Thổ.',
            hardware_part: 'Từ kế Fluxgate & Cảm biến bức xạ',
            hardware_to_science: 'Khai thác lực hấp dẫn (gravity assist) để tiết kiệm hàng tấn nhiên liệu',
            fact_label: 'Tiếp cận Sao Mộc',
            fact_value: '03/12/1974',
            media_id: 'IMG-PIO-02'
          },
          {
            code: '04 · LỊCH SỬ TẠI SAO THỔ',
            title: 'Tàu đầu tiên chạm tới Chúa tể các Vành đai',
            narration:
              'Ngày 1 tháng 9 năm 1979, tôi trở thành cỗ máy đầu tiên của nhân loại bay qua Sao Thổ, phát hiện vành đai F mỏng manh và phát hiện các mặt trăng mới.',
            hardware_part: 'Camera quang kế phân cực (IPP)',
            hardware_to_science: 'Khám phá vành đai F và chụp cận cảnh mặt trăng Titan',
            fact_label: 'Bay qua Sao Thổ',
            fact_value: '01/09/1979 (Đầu tiên trong lịch sử)',
            media_id: 'pioneer11_saturn_titan_739460main'
          },
          {
            code: '05 · TÍN HIỆU CUỐI CÙNG',
            title: 'Nguồn điện suy kiệt giữa không gian sâu',
            narration:
              'Sau 22 năm bền bỉ, nguồn điện SNAP-19 suy giảm. Ngày 30 tháng 9 năm 1995, NASA Ames ngừng liên lạc thường lệ, và ngày 24 tháng 11 năm 1995 nhận những phút dữ liệu cuối cùng.',
            hardware_part: 'Anten chảo lớn 2,74 m',
            hardware_to_science: 'Dữ liệu kỹ thuật cuối cùng khép lại 22 năm hoạt động',
            fact_label: 'Dữ liệu cuối',
            fact_value: '24/11/1995',
            media_id: 'IMG-PIO-02'
          },
          {
            code: '06 · HÀNH TRÌNH BẤT TẬN',
            title: 'Di sản mở đường cho loài người',
            narration:
              'Tôi đã chứng minh con người có thể chạm tới các hành tinh khí khổng lồ. Hiện nay tôi vẫn đang lướt đi trong bóng tối liên sao với tốc độ hơn 11 km mỗi giây.',
            hardware_part: 'Toàn bộ sứ mệnh Pioneer 11',
            hardware_to_science: 'Mở đường an toàn cho Voyager 1, Voyager 2 và Cassini',
            fact_label: 'Tình trạng hiện tại',
            fact_value: 'Bay ra khỏi Hệ Mặt Trời',
            media_id: 'pioneer_spacecraft_instrument_diagram'
          }
        ]
      });
    } else {
      setCustomStory({
        title: 'Surveyor 3: Cuộc Gặp Gỡ Bất Ngờ Giữa Hai Thế Hệ',
        official_designation: 'Surveyor-C Lunar Soft Lander',
        realm: 'MẶT TRĂNG · OCEANUS PROCELLARUM',
        where_now: 'Đại dương Bão Tố, Mặt Trăng (cách vị trí hạ cánh Apollo 12 ~180 m)',
        tagline: 'Cỗ máy cô đơn trên Mặt Trăng được con người quay lại đón thăm.',
        intro:
          'Tôi là Surveyor 3. Tôi hạ cánh xuống bề mặt Mặt Trăng ngày 20 tháng 4 năm 1967 để đào đất và chụp ảnh giúp phi hành đoàn Apollo...',
        closing_line: 'Tôi là cỗ máy duy nhất ngoài Trái Đất được chính các phi hành gia đi bộ tới thăm và bắt tay chào.',
        chapters: [
          {
            code: '01 · MỤC TIÊU MẶT TRĂNG',
            title: 'Nền đất Mặt Trăng có đủ cứng để đỡ tàu người lái?',
            narration:
              'Năm 1967, các nhà khoa học chưa biết liệu đất Mặt Trăng có xốp như bột tro khiến tàu Apollo lún sâu không. Tôi được cử xuống để kiểm tra độ cứng thực nghiệm.',
            hardware_part: 'Cánh tay gầu xúc lấy mẫu đất',
            hardware_to_science: 'Đo lực chịu tải của lớp regolith Mặt Trăng',
            fact_label: 'Hạ cánh mềm',
            fact_value: '20/04/1967 (UTC)',
            media_id: 'IMG-SUR-01'
          },
          {
            code: '02 · BÀN TAY CƠ HỌC',
            title: 'Cánh tay đào sâu 18 cm vào đất',
            narration:
              'Tôi dùng cánh tay gầu xúc vươn xa 1,5 mét, đào các rãnh sâu tới 18 cm và ép đất. Kết quả chứng minh nền đất Mặt Trăng rất vững chắc cho chân hạ cánh Apollo.',
            hardware_part: 'Gầu xúc bề mặt & Camera TV',
            hardware_to_science: 'Chứng minh đất chịu tải an toàn cho mô-đun Apollo Lunar Module',
            fact_label: 'Độ sâu rãnh đào',
            fact_value: '~18 cm',
            media_id: 'surveyor3_in_crater_AS12-48-7121'
          },
          {
            code: '03 · TRUYỀN ẢNH VỀ TRÁI ĐẤT',
            title: 'Hơn 6.300 bức ảnh quét ngang miệng hố',
            narration:
              'Camera truyền hình của tôi gửi về 6.326 bức ảnh bề mặt, ghi lại đá và quang cảnh miệng hố trước khi đêm Mặt Trăng lạnh giá làm đóng băng ắc quy.',
            hardware_part: 'Camera TV quét chậm 200/600 dòng',
            hardware_to_science: 'Lập bản đồ độ dốc và phân bố kích thước đá quanh bãi hạ cánh',
            fact_label: 'Số lượng ảnh',
            fact_value: '6.326 khung hình',
            media_id: 'IMG-SUR-02'
          },
          {
            code: '04 · CUỘC GẶP LỊCH SỬ',
            title: 'Tháng 11 năm 1969: Bước chân con người',
            narration:
              'Sau 2,5 năm tôi nằm cô đơn, tàu Apollo 12 đáp xuống chỉ cách tôi ~180 mét. Hai phi hành gia Pete Conrad và Alan Bean đã đi bộ tới thăm tôi, ngắm nhìn và chào tôi như một người bạn cũ.',
            hardware_part: 'Hiện vật khảo cổ không gian',
            hardware_to_science: 'Sự kiện duy nhất trong lịch sử con người thăm lại cỗ máy robot trên thiên thể khác',
            fact_label: 'Apollo 12 ghé thăm',
            fact_value: 'Tháng 11/1969',
            media_id: 'apollo12_surveyor3_AS12-48-7134'
          },
          {
            code: '05 · THU HỒI VỀ TRÁI ĐẤT',
            title: 'Camera TV được tháo mang về phòng thí nghiệm',
            narration:
              'Các phi hành gia đã dùng kìm tháo camera TV và một số ống nhôm của tôi mang về Trái Đất để nghiên cứu tác động của bức xạ và vi thiên thạch sau 2,5 năm.',
            hardware_part: 'Cụm camera TV được cắt rời',
            hardware_to_science: 'Bài học thực nghiệm đầu tiên về độ bền vật liệu phơi nhiễm môi trường Mặt Trăng',
            fact_label: 'Phần cứng thu hồi',
            fact_value: 'Camera TV & ống nhôm',
            media_id: 'apollo12_surveyor3_AS12-48-7134'
          },
          {
            code: '06 · DI SẢN MẶT TRĂNG',
            title: 'Đài tưởng niệm vĩnh cửu tại Oceanus Procellarum',
            narration:
              'Thân tàu của tôi vẫn đứng yên trong lòng miệng hố tại Đại dương Bão Tố. Tôi tự hào là cỗ máy đã chứng minh con người có thể an toàn đặt chân lên Mặt Trăng.',
            hardware_part: 'Khung thân Surveyor 3',
            hardware_to_science: 'Hiện vật di sản khảo cổ học không gian được bảo vệ',
            fact_label: 'Vị trí hiện tại',
            fact_value: 'Oceanus Procellarum, Mặt Trăng',
            media_id: 'surveyor3_in_crater_AS12-48-7121'
          }
        ]
      });
    }
    setCustomStoryLoadedNotice('Đã nạp câu chuyện mẫu thành công! Bạn có thể chỉnh sửa văn bản tùy ý.');
  };

  const handleExportCustomStoryJSON = () => {
    const payload = {
      project: 'BEYOND THE SIGNAL — Custom User Story',
      exported_at: new Date().toISOString(),
      story: customStory,
      logic_analysis: storyLogicAnalysis
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `custom_space_story_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleParseFastPasteText = () => {
    if (!fastPasteText.trim()) return;
    const paras = fastPasteText
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (paras.length === 0) return;

    setCustomStory((prev) => {
      const nextCh = prev.chapters.map((ch, idx) => {
        if (idx < paras.length) {
          return {
            ...ch,
            narration: paras[idx]
          };
        }
        return ch;
      });
      return {
        ...prev,
        intro: paras[0] || prev.intro,
        chapters: nextCh
      };
    });
    setShowFastPasteModal(false);
    setFastPasteText('');
    setCustomStoryLoadedNotice('Đã tự động phân đoạn văn bản vào 6 chặng câu chuyện!');
  };


  /* Compute Logic Analysis for the Custom Story */
  const logicAnalysis = useMemo(() => {
    return evaluateStoryLogic(customStory);
  }, [customStory]);

  const handleApplyFastPaste = () => {
    if (!fastPasteText.trim()) return;
    const parsed = parseRawStoryIntoDraft(fastPasteText, customStory);
    setCustomStory(parsed);
    setFastPasteText('');
    setShowFastPasteModal(false);
    setCustomStoryLoadedNotice('Đã phân tích và nạp câu chuyện thành công vào hệ thống!');
    setTimeout(() => setCustomStoryLoadedNotice(null), 5000);
  };

  const handlePlayInSlideTheatre = () => {
    /* Switch mission to custom if needed, or activate slide-audio tab */
    setSelectedMissionId('custom');
    setActiveFormatTab('slide-audio');
    setCurrentSlideIdx(0);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Audio / Narration state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);
  const [slideProgress, setSlideProgress] = useState<number>(0);
  const [hasNativeVoice, setHasNativeVoice] = useState<boolean>(true);

  // Multimedia manifest state (with built-in fallback for HTTP and file://)
  const [manifest, setManifest] = useState<ProductManifest | null>(null);
  const [comicPage, setComicPage] = useState<number>(0);
  const [mediaModal, setMediaModal] = useState<'poster' | 'comic' | null>(null);

  const speechTokenRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);
  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    if (initialMissionId && JOURNEY_DATA[initialMissionId]) {
      setSelectedMissionId(initialMissionId);
      setCurrentSlideIdx(0);
      stopNarration();
    }
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('format') || params.get('tab')) {
        setActiveFormatTab(resolveFormatTabFromUrl());
      }
    }
  }, [initialMissionId]);

  useEffect(() => {
    if (!mediaModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMediaModal(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mediaModal]);

  const journey = selectedMissionId === 'custom' ? customJourneyConfig : (JOURNEY_DATA[selectedMissionId] || JOURNEY_DATA.opportunity);
  const archiveRecord = useMemo(
    () => ARCHIVE_RECORDS.find((r) => r.id === selectedMissionId) || ARCHIVE_RECORDS[3],
    [selectedMissionId]
  );
  const slides = journey.slides;
  const activeSlide = slides[currentSlideIdx] || slides[0];
  const activeMedia: NasaMediaItem | undefined =
    NASA_MEDIA_CATALOG[activeSlide.media_id] || NASA_MEDIA_CATALOG[archiveRecord.media_id];

  // Resolve image source safely for both HTTP and file://
  const getMediaSrc = (item?: NasaMediaItem): string | null => {
    if (!item) return null;
    const isFileProtocol = typeof window !== 'undefined' && window.location.protocol === 'file:';
    let src = item.direct_asset_url || item.local_asset_url;
    if (isFileProtocol && item.local_asset_url) {
      src = '.' + (item.local_asset_url.startsWith('/') ? item.local_asset_url : '/' + item.local_asset_url);
    }
    return src;
  };

  // Check voice availability when language changes
  useEffect(() => {
    if (!speechSupported) return;
    const checkVoices = () => {
      const v = pickVoiceForLang(lang);
      setHasNativeVoice(Boolean(v));
    };
    checkVoices();
    window.speechSynthesis.addEventListener('voiceschanged', checkVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', checkVoices);
    };
  }, [lang, speechSupported]);

  // Load team multimedia manifest for opportunity / surveyor-3 / pioneer-11 (with built-in fallback)
  useEffect(() => {
    let cancelled = false;
    const builtinFallback = BUILTIN_JOURNEY_MANIFESTS[selectedMissionId] || null;
    setManifest(builtinFallback);
    setComicPage(0);
    if (
      (selectedMissionId === 'opportunity' || selectedMissionId === 'pioneer-11' || selectedMissionId === 'surveyor-3') &&
      typeof window !== 'undefined' &&
      window.location.protocol !== 'file:'
    ) {
      fetch(`/products/${selectedMissionId}/manifest.json`, { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then((data: ProductManifest | null) => {
          if (!cancelled && data) setManifest(data);
        })
        .catch(() => {});
    }
    return () => {
      cancelled = true;
    };
  }, [selectedMissionId]);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopNarration = () => {
    speechTokenRef.current += 1;
    clearTimer();
    if (speechSupported) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setSlideProgress(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      speechTokenRef.current += 1;
      clearTimer();
      if (speechSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speechSupported]);

  // Speak or run timed slide narration for a given slide index
  const startSlidePlayback = (slideIndex: number) => {
    speechTokenRef.current += 1;
    const token = speechTokenRef.current;
    clearTimer();
    if (speechSupported) {
      window.speechSynthesis.cancel();
    }

    const targetSlide = slides[slideIndex];
    if (!targetSlide) {
      setIsPlaying(false);
      return;
    }

    setCurrentSlideIdx(slideIndex);
    setIsPlaying(true);
    setSlideProgress(0);

    const textToSpeak = isEn
      ? `${targetSlide.title_en}. ${targetSlide.narration_en} ${targetSlide.hardware_to_science_en}`
      : `${targetSlide.title_vi}. ${targetSlide.narration_vi} ${targetSlide.hardware_to_science_vi}`;

    // Estimate reading duration in ms based on character length and speechRate
    const estimatedMs = Math.max(9000, Math.round((textToSpeak.length / 16) * (1000 / speechRate)));
    const startTime = Date.now();

    timerRef.current = window.setInterval(() => {
      if (token !== speechTokenRef.current) return;
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / estimatedMs) * 100);
      setSlideProgress(pct);

      // If muted or speechSynthesis unsupported, use timer to advance
      if ((isMuted || !speechSupported) && elapsed >= estimatedMs) {
        clearTimer();
        if (autoAdvance && slideIndex < slides.length - 1) {
          startSlidePlayback(slideIndex + 1);
        } else {
          setIsPlaying(false);
          setSlideProgress(100);
        }
      }
    }, 120);

    if (speechSupported && !isMuted) {
      try {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = isEn ? 'en-US' : 'vi-VN';
        const preferredVoice = pickVoiceForLang(lang);
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
        utterance.rate = speechRate;
        utterance.onend = () => {
          if (token !== speechTokenRef.current) return;
          clearTimer();
          setSlideProgress(100);
          if (autoAdvance && slideIndex < slides.length - 1) {
            startSlidePlayback(slideIndex + 1);
          } else {
            setIsPlaying(false);
          }
        };
        utterance.onerror = () => {
          // If browser blocks or fails speech synthesis, timer fallback continues smoothly
        };
        window.speechSynthesis.speak(utterance);
      } catch {
        // Fallback to visual timer progression
      }
    }
  };

  // Re-trigger playback if language, mute, or rate changes while playing
  useEffect(() => {
    if (isPlaying) {
      startSlidePlayback(currentSlideIdx);
    }
  }, [lang, isMuted, speechRate]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopNarration();
    } else {
      startSlidePlayback(currentSlideIdx);
    }
  };

  const handleSelectMission = (id: JourneyMissionId) => {
    stopNarration();
    setSelectedMissionId(id);
    setCurrentSlideIdx(0);
    setSlideProgress(0);
  };

  const handleJumpToSlide = (idx: number, shouldPlay = false) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, idx));
    if (shouldPlay || isPlaying) {
      startSlidePlayback(clamped);
    } else {
      setCurrentSlideIdx(clamped);
      setSlideProgress(0);
    }
  };

  const featuredMissions: JourneyMissionId[] = ['opportunity', 'pioneer-11'];
  const demoMissions: JourneyMissionId[] = ['surveyor-3', 'viking-1', 'sojourner'];

  return (
    <div className="min-h-screen bg-[#0B1422] text-[#E9EDF2]">
      {/* 1. EDITORIAL HERO & MISSION SELECTOR BAR */}
      <header className="relative border-b border-[#AAB8C7]/18 bg-gradient-to-b from-[#07111F] via-[#101E30] to-[#0B1422] pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 800px 360px at 50% 0%, rgba(197, 164, 106, 0.12) 0%, transparent 70%), radial-gradient(ellipse 600px 300px at 85% 40%, rgba(201, 111, 70, 0.1) 0%, transparent 65%)'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          {/* Overline & Page Title */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#D2A071]">
                <Radio className="w-3.5 h-3.5" />
                <span>
                  {isEn
                    ? 'PILLAR 01 · MULTIMEDIA ARCHIVAL STORYTELLING'
                    : 'TRỤ CỘT 01 · KỂ CHUYỆN ĐA PHƯƠNG TIỆN & NHẬT KÝ SỨ MỆNH'}
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F0EDE5]">
                {isEn ? 'Journeys Beyond the Signal' : 'Hành Trình Vượt Khỏi Tín Hiệu'}
              </h1>
              <p className="text-base sm:text-lg text-[#AAB8C7] leading-relaxed">
                {isEn
                  ? 'Synchronized slide narratives, voice reconstructions grounded in official NASA logs, and five-act scrollytelling exhibitions for spacecraft left on the Moon, Mars, and deep space.'
                  : 'Trình chiếu Slide đồng bộ thuyết minh âm thanh, bản chép lời song ngữ và nhật ký 5 chặng hành trình của những cỗ máy NASA trên Mặt Trăng, Sao Hỏa và Không gian sâu.'}
              </p>
            </div>

            {/* Provenance Guarantee Pillar */}
            <div className="p-4 bg-[#162A40]/90 border border-[#AAB8C7]/18 rounded-sm max-w-md space-y-1.5">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#D2A071]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>
                  {isEn
                    ? 'Creative Narrative · Verified NASA Facts'
                    : 'Tái hiện giọng kể · Dữ kiện NASA xác minh'}
                </span>
              </div>
              <p className="text-xs text-[#AAB8C7] leading-relaxed">
                {isEn
                  ? 'First-person narration is labeled as creative educational reconstruction. Every date, metric, image, and discovery cites official NASA / JPL / NSSDCA records.'
                  : 'Giọng kể ngôi thứ nhất được gắn nhãn minh bạch là hình thức kể chuyện giáo dục. Mọi mốc thời gian, số liệu, hình ảnh đều trích dẫn nguồn NASA / JPL / NSSDCA.'}
              </p>
            </div>
          </div>

          {/* Mission Selector Strip: Featured vs Demo Records */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2">
            {/* Featured Deep Journeys */}
            <div className="lg:col-span-6 p-4 bg-[#162A40]/92 border border-[#AAB8C7]/18 rounded-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#D2A071] font-semibold">
                  {isEn ? 'Featured Deep Exhibitions (6 Chapters)' : 'Hành trình chuyên sâu trọng tâm (6 Chương)'}
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 bg-[#D2A071]/15 text-[#D2A071] border border-[#D2A071]/30">
                  {isEn ? 'Full Slide + Audio' : 'Slide + Thuyết minh đầy đủ'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {featuredMissions.map((mId) => {
                  const item = JOURNEY_DATA[mId];
                  const active = selectedMissionId === mId;
                  return (
                    <button
                      key={mId}
                      type="button"
                      onClick={() => handleSelectMission(mId)}
                      className={`text-left p-3.5 rounded-sm border transition-all cursor-pointer ${
                        active
                          ? 'bg-[#21374D] border-[#D2A071] shadow-[0_0_20px_rgba(197,164,106,0.15)]'
                          : 'bg-[#162A40]/70 border-[#AAB8C7]/18 hover:border-white/30 hover:bg-[#162A40]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display font-bold text-base text-[#F0EDE5]">
                          {isEn ? item.title_en : item.title_vi}
                        </span>
                        {active && <span className="w-2 h-2 rounded-full bg-[#D2A071]" />}
                      </div>
                      <div className="font-mono text-[11px] text-[#AAB8C7] mt-1 truncate">
                        {mId === 'opportunity'
                          ? isEn
                            ? 'Mars · 90 sols → 5,111 sols · 45.16 km'
                            : 'Sao Hỏa · 90 sol → 5.111 sol · 45,16 km'
                          : isEn
                          ? 'Deep Space · First Saturn Flyby · 1973–1995'
                          : 'Không gian sâu · Bay qua Sao Thổ · 1973–1995'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Compact Archival Journeys (Demo Records) */}
            <div className="lg:col-span-6 p-4 bg-[#162A40]/92 border border-[#AAB8C7]/18 rounded-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#AAB8C7] font-semibold">
                  {isEn ? 'Compact Archival Journeys' : 'Hồ sơ hành trình đối chiếu'}
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 bg-white/5 text-[#AAB8C7] border border-[#AAB8C7]/22">
                  {isEn ? 'Demo Record / Hồ sơ tư liệu mẫu' : 'Hồ sơ tư liệu mẫu / Demo Record'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Custom Story Selector Pill */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMissionId('custom');
                    setActiveFormatTab('custom-story');
                  }}
                  className={`text-left p-3 rounded-sm border transition-all cursor-pointer ${
                    selectedMissionId === 'custom'
                      ? 'bg-[#21374D] border-[#D2A071] shadow-[0_0_18px_rgba(210,160,113,0.2)]'
                      : 'bg-[#162A40]/70 border-[#D2A071]/40 hover:border-[#D2A071] hover:bg-[#162A40]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-display font-bold text-sm text-[#D2A071] truncate">
                      {isEn ? 'Custom Story' : 'Câu Chuyện Của Bạn'}
                    </span>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 bg-[#D2A071]/20 text-[#D2A071] border border-[#D2A071]/50 shrink-0 font-bold">
                      STUDIO
                    </span>
                  </div>
                  <div className="font-mono text-[10px] text-[#F0EDE5] mt-1 truncate">
                    {isEn ? 'Edit & Test Story Logic' : 'Biên tập & Kiểm tra Logic'}
                  </div>
                </button>

                {demoMissions.map((mId) => {
                  const item = JOURNEY_DATA[mId];
                  const active = selectedMissionId === mId;
                  return (
                    <button
                      key={mId}
                      type="button"
                      onClick={() => handleSelectMission(mId)}
                      className={`text-left p-3 rounded-sm border transition-all cursor-pointer ${
                        active
                          ? 'bg-[#21374D] border-[#C96F46] shadow-[0_0_18px_rgba(201,111,70,0.15)]'
                          : 'bg-[#162A40]/70 border-[#AAB8C7]/18 hover:border-white/30 hover:bg-[#162A40]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-display font-bold text-sm text-[#F0EDE5] truncate">
                          {mId === 'surveyor-3'
                            ? 'Surveyor 3'
                            : mId === 'viking-1'
                            ? 'Viking 1'
                            : 'Sojourner'}
                        </span>
                        <span className="font-mono text-[9px] px-1.5 py-0.5 bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
                          DEMO
                        </span>
                      </div>
                      <div className="font-mono text-[10px] text-[#AAB8C7] mt-1 truncate">
                        {mId === 'surveyor-3'
                          ? isEn
                            ? 'Moon · 1967 · Apollo 12'
                            : 'Mặt Trăng · 1967 · Apollo 12'
                          : mId === 'viking-1'
                          ? isEn
                            ? 'Mars · 1976 · 1st Surface Photo'
                            : 'Sao Hỏa · 1976 · Ảnh đầu tiên'
                          : isEn
                          ? 'Mars · 1997 · 83 Sols'
                          : 'Sao Hỏa · 1997 · 83 Sol'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Mission Summary Banner + Format Switcher Tabs */}
          <div className="pt-2 border-t border-[#AAB8C7]/18 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="font-mono text-[11px] uppercase tracking-widest px-2.5 py-0.5 font-semibold text-[#0B1422]"
                  style={{ backgroundColor: journey.accent }}
                >
                  {isEn ? journey.badge_en : journey.badge_vi}
                </span>
                <span className="font-mono text-xs text-[#AAB8C7]">
                  {isEn ? journey.realm_en : journey.realm_vi}
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F0EDE5] pt-1">
                {isEn ? journey.title_en : journey.title_vi}{' '}
                <span className="text-base sm:text-lg font-normal text-[#AAB8C7]">
                  — “{isEn ? journey.tagline_en : journey.tagline_vi}”
                </span>
              </h2>
            </div>

            {/* Multi-format Storytelling Tabs (With Tab 4 elevated prominently for Core Products) */}
            <div
              className="inline-flex flex-wrap bg-[#162A40] border border-[#AAB8C7]/22 p-1.5 rounded-sm gap-1.5"
              role="tablist"
              aria-label={isEn ? 'Storytelling formats' : 'Định dạng kể chuyện'}
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeFormatTab === 'slide-audio'}
                onClick={() => setActiveFormatTab('slide-audio')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer rounded-xs ${
                  activeFormatTab === 'slide-audio'
                    ? 'bg-[#F0EDE5] text-[#172233] font-bold'
                    : 'text-[#AAB8C7] hover:text-white hover:bg-white/5'
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>
                  {isEn ? '1. Slide & Audio' : '1. Slide & Audio'}
                </span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeFormatTab === 'scrollytelling'}
                onClick={() => setActiveFormatTab('scrollytelling')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer rounded-xs ${
                  activeFormatTab === 'scrollytelling'
                    ? 'bg-[#F0EDE5] text-[#172233] font-bold'
                    : 'text-[#AAB8C7] hover:text-white hover:bg-white/5'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>
                  {isEn ? '2. Archival Logs' : '2. Nhật ký tư liệu'}
                </span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeFormatTab === 'custom-story'}
                onClick={() => setActiveFormatTab('custom-story')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer rounded-xs ${
                  activeFormatTab === 'custom-story'
                    ? 'bg-[#21374D] text-[#D2A071] border border-[#D2A071]/50 font-bold'
                    : 'text-[#AAB8C7] hover:text-white hover:bg-white/5'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {isEn ? '3. Story Studio' : '3. Story Studio'}
                </span>
              </button>

              {/* ART & MEDIA TAB (NO AWKWARD "SP CỐT LÕI" LABELS) */}
              <button
                type="button"
                role="tab"
                aria-selected={activeFormatTab === 'multimedia'}
                onClick={() => setActiveFormatTab('multimedia')}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer rounded-xs border ${
                  activeFormatTab === 'multimedia'
                    ? 'bg-[#D2A071] text-[#070B14] border-[#D2A071] font-bold shadow-md'
                    : 'text-[#D2A071] hover:text-white hover:bg-white/5 border border-[#D2A071]/50'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span className="font-bold">
                  {isEn ? 'Art & Media (MV · Poster · Comic)' : 'Góc Nghệ Thuật (MV · Poster · Truyện)'}
                </span>
              </button>
            </div>
          </div>

          {/* Elegant Art Gallery Callout Banner */}
          <div className="mt-4 p-3.5 bg-gradient-to-r from-[#162A40] via-[#1D3550] to-[#162A40] border border-[#D2A071]/45 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-[#D2A071]/15 border border-[#D2A071]/40 text-[#D2A071] rounded-xs shrink-0">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-[#D2A071] font-bold">
                  KHÔNG GIAN NGHỆ THUẬT &amp; TRUYỆN TRANH
                </div>
                <p className="text-xs text-[#CBD5E1] mt-0.5">
                  Thưởng thức <strong className="text-white">MV Ca nhạc “LITTLE WHEELS” (03:41)</strong>, <strong className="text-white">Poster nghệ thuật A2</strong> và <strong className="text-white">Truyện tranh 15 trang “Người bạn cô độc trên Mặt Trăng”</strong>.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveFormatTab('multimedia')}
                className={`px-3.5 py-1.5 font-mono text-xs uppercase rounded-xs cursor-pointer transition-colors border ${
                  activeFormatTab === 'multimedia'
                    ? 'bg-[#D2A071] text-[#070B14] border-[#D2A071] font-bold'
                    : 'bg-[#070B14] text-[#D2A071] border-[#D2A071]/50 hover:bg-[#D2A071] hover:text-[#070B14]'
                }`}
              >
                Xem Tại Đây ↓
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/san-pham')}
                className="px-3.5 py-1.5 bg-[#21374D] hover:bg-[#2A4560] border border-[#D2A071]/40 text-[#F0EDE5] font-mono text-xs uppercase rounded-xs cursor-pointer transition-colors"
              >
                Phòng Trưng Bày Đầy Đủ →
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. INTEGRATED IN-PAGE SYNCHRONIZED SLIDE + AUDIO THEATER STAGE */}
      {(activeFormatTab === 'slide-audio' || activeFormatTab === 'scrollytelling') && (
        <section
          aria-label={isEn ? 'Synchronized Slide and Audio Theater' : 'Sân khấu trình chiếu Slide và Thuyết minh đồng bộ'}
          className="py-10 px-4 sm:px-6 lg:px-8 bg-[#0B1422] border-b border-[#AAB8C7]/18"
        >
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top Stage Bar: Provenance & Chapter Stepper */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#162A40] border border-[#AAB8C7]/18 px-5 py-3.5 rounded-sm">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#21374D] border border-[#D2A071]/40 font-mono text-[11px] text-[#D2A071]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {isEn
                      ? 'Creative narrative reconstruction based on NASA mission logs'
                      : 'Tái hiện giọng kể dựa trên nhật ký nhiệm vụ NASA'}
                  </span>
                </span>
                {journey.isDemoRecord && (
                  <span className="px-2.5 py-1 bg-amber-500/15 border border-amber-500/40 font-mono text-[11px] text-amber-300 font-semibold">
                    {isEn ? 'Demo Record · Hồ sơ tư liệu mẫu' : 'Hồ sơ tư liệu mẫu · Demo Record'}
                  </span>
                )}
              </div>

              {/* Chapter Quick Jumper Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                {slides.map((s, idx) => {
                  const isCurrent = idx === currentSlideIdx;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleJumpToSlide(idx)}
                      className={`px-2.5 py-1 font-mono text-xs transition-all cursor-pointer shrink-0 rounded-xs border ${
                        isCurrent
                          ? 'bg-[#D2A071] text-[#0B1422] border-[#D2A071] font-bold'
                          : 'bg-[#162A40] text-[#AAB8C7] border-[#AAB8C7]/18 hover:border-white/30'
                      }`}
                      title={isEn ? s.title_en : s.title_vi}
                    >
                      0{idx + 1} · {isEn ? s.phase_en : s.phase_vi}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Theater Split Grid: Left Visual Slide (7 cols) + Right Synchronized Audio & Live Transcript (5 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* LEFT: Editorial NASA Visual Slide Viewer */}
              <div className="lg:col-span-7 flex flex-col bg-[#162A40] border border-[#AAB8C7]/18 rounded-sm overflow-hidden">
                {/* Slide Header */}
                <div className="px-5 py-3.5 bg-[#162A40] border-b border-[#AAB8C7]/18 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span
                      className="px-2 py-0.5 font-bold text-[#0B1422]"
                      style={{ backgroundColor: journey.accent }}
                    >
                      SLIDE {currentSlideIdx + 1} / {slides.length}
                    </span>
                    <span className="text-[#D2A071] uppercase tracking-wider font-semibold">
                      {isEn ? activeSlide.code_en : activeSlide.code_vi}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeMedia?.manifest_id && (
                      <span className="font-mono text-[11px] px-2 py-0.5 bg-white/5 border border-[#AAB8C7]/18 text-[#AAB8C7]">
                        ID: {activeMedia.manifest_id}
                      </span>
                    )}
                    {activeMedia && onOpenLightbox && (
                      <button
                        type="button"
                        onClick={() => onOpenLightbox(activeMedia)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#21374D] hover:bg-[#2A4560] text-[#F0EDE5] border border-[#AAB8C7]/22 font-mono text-xs transition-colors cursor-pointer rounded-xs"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-[#D2A071]" />
                        <span>{isEn ? 'Inspect Full-Res' : 'Phóng lớn tư liệu'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* NASA Visual Frame */}
                <div className="relative bg-[#0B1422] aspect-video flex items-center justify-center overflow-hidden border-b border-[#AAB8C7]/18">
                  {activeMedia && getMediaSrc(activeMedia) ? (
                    <img
                      key={activeMedia.id}
                      src={getMediaSrc(activeMedia)!}
                      alt={activeMedia.alt_vi}
                      onClick={() => onOpenLightbox && onOpenLightbox(activeMedia)}
                      className={`w-full h-full ${
                        activeMedia.media_type === 'NASA_DIAGRAM' ||
                        activeMedia.media_type === 'NASA_PHOTO_OR_DIAGRAM'
                          ? 'object-contain p-4 bg-[#101E30]'
                          : 'object-cover'
                      } ${onOpenLightbox ? 'cursor-zoom-in' : ''} transition-opacity duration-500`}
                    />
                  ) : (
                    <div className="p-8 text-center space-y-2">
                      <p className="font-mono text-xs uppercase text-[#D2A071]">
                        {isEn ? 'NASA Archival Frame' : 'Khung tư liệu NASA'}
                      </p>
                      <p className="font-display text-lg text-[#F0EDE5]">{activeMedia?.title}</p>
                    </div>
                  )}

                  {/* Subtle Slide Progress Bar at bottom of visual frame */}
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
                    <div
                      className="h-full transition-all duration-150"
                      style={{
                        width: `${slideProgress}%`,
                        backgroundColor: journey.accent
                      }}
                    />
                  </div>
                </div>

                {/* Active Slide Narrative & Hardware-to-Science Callout */}
                <div className="p-6 space-y-5 flex-1 flex flex-col justify-between bg-[#162A40]">
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F0EDE5] tracking-tight">
                      {isEn ? activeSlide.title_en : activeSlide.title_vi}
                    </h3>
                    <p className="text-base sm:text-[17px] text-[#E9EDF2] leading-relaxed">
                      {isEn ? activeSlide.narration_en : activeSlide.narration_vi}
                    </p>

                    {/* Hardware -> Science Box */}
                    <div
                      className="p-4 bg-[#21374D]/80 border-l-4 space-y-1"
                      style={{ borderColor: journey.accent }}
                    >
                      <div className="font-mono text-[11px] uppercase tracking-wider text-[#D2A071] font-semibold">
                        {isEn ? 'Hardware → Science Mechanism:' : 'Cơ chế Phần cứng → Khoa học:'}{' '}
                        <span className="text-[#F0EDE5]">
                          {isEn ? activeSlide.hardware_part_en : activeSlide.hardware_part_vi}
                        </span>
                      </div>
                      <p className="text-sm text-[#AAB8C7] leading-relaxed">
                        {isEn
                          ? activeSlide.hardware_to_science_en
                          : activeSlide.hardware_to_science_vi}
                      </p>
                    </div>

                    {/* Key Verified Facts Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {activeSlide.facts.map((f, i) => (
                        <div
                          key={i}
                          className="p-3 bg-[#101E30] border border-[#AAB8C7]/18 rounded-xs flex flex-col justify-between"
                        >
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#AAB8C7]">
                            {isEn ? f.label_en : f.label_vi}
                          </span>
                          <span className="font-display text-sm sm:text-base font-bold text-[#F0EDE5] mt-0.5">
                            {isEn ? f.value_en : f.value_vi}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Full NASA Image Provenance Caption Footer */}
                  {activeMedia && (
                    <div className="pt-4 mt-4 border-t border-[#AAB8C7]/18 space-y-2 text-xs text-[#AAB8C7]">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-semibold text-[#F0EDE5]">{activeMedia.title}</span>
                        <span className="font-mono text-[11px] text-[#D2A071]">
                          Credit: {activeMedia.credit}
                        </span>
                      </div>
                      <p className="leading-relaxed">{activeMedia.caption_vi}</p>
                      {activeMedia.note && (
                        <p className="text-[11px] text-amber-200/90 font-mono">
                          • {activeMedia.note}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-[11px]">
                        <span>
                          {isEn ? 'Sources:' : 'Nguồn đối chiếu:'}{' '}
                          {activeSlide.source_ids.join(', ')}
                        </span>
                        <a
                          href={activeMedia.source_page}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#D2A071] hover:underline"
                        >
                          <span>{isEn ? 'Official NASA Resource Page' : 'Trang tư liệu gốc NASA'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT: Synchronized Audio Control Deck + Interactive Live Transcript */}
              <div className="lg:col-span-5 flex flex-col bg-[#162A40] border border-[#AAB8C7]/18 rounded-sm overflow-hidden">
                {/* Audio Deck Header & Controls */}
                <div className="p-5 bg-[#162A40] border-b border-[#AAB8C7]/18 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Headphones className="w-4 h-4 text-[#D2A071]" />
                      <span className="font-mono text-xs uppercase tracking-wider text-[#F0EDE5] font-bold">
                        {isEn ? 'Synchronized Narration Deck' : 'Bộ Điều Khiển Thuyết Minh Đồng Bộ'}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] px-2 py-0.5 bg-white/5 border border-[#AAB8C7]/18 text-[#D2A071]">
                      {isPlaying
                        ? isEn
                          ? '● PLAYING SLIDE ' + (currentSlideIdx + 1)
                          : '● ĐANG THUYẾT MINH SLIDE ' + (currentSlideIdx + 1)
                        : isEn
                        ? 'READY'
                        : 'SẴN SÀNG'}
                    </span>
                  </div>

                  {/* Primary Transport Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleJumpToSlide(currentSlideIdx - 1)}
                        disabled={currentSlideIdx === 0}
                        aria-label={isEn ? 'Previous slide' : 'Slide trước'}
                        className="p-2.5 bg-[#21374D] hover:bg-[#2A4560] disabled:opacity-40 text-[#F0EDE5] border border-[#AAB8C7]/22 rounded-xs cursor-pointer transition-colors"
                      >
                        <SkipBack className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={handleTogglePlay}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D2A071] hover:bg-[#d4b47b] text-[#0B1422] font-display font-bold text-sm rounded-xs cursor-pointer transition-colors"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-4 h-4 fill-current" />
                            <span>{isEn ? 'Pause Story' : 'Tạm dừng'}</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current" />
                            <span>{isEn ? 'Listen & Auto-Play Slides' : 'Nghe thuyết minh & Tự chuyển Slide'}</span>
                          </>
                        )}
                      </button>

                      {isPlaying && (
                        <button
                          type="button"
                          onClick={stopNarration}
                          aria-label={isEn ? 'Stop narration' : 'Dừng thuyết minh'}
                          className="p-2.5 bg-[#21374D] hover:bg-[#2A4560] text-[#F0EDE5] border border-[#AAB8C7]/22 rounded-xs cursor-pointer transition-colors"
                        >
                          <Square className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleJumpToSlide(currentSlideIdx + 1)}
                        disabled={currentSlideIdx >= slides.length - 1}
                        aria-label={isEn ? 'Next slide' : 'Slide kế tiếp'}
                        className="p-2.5 bg-[#21374D] hover:bg-[#2A4560] disabled:opacity-40 text-[#F0EDE5] border border-[#AAB8C7]/22 rounded-xs cursor-pointer transition-colors"
                      >
                        <SkipForward className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Mute / Unmute */}
                    <button
                      type="button"
                      onClick={() => setIsMuted((m) => !m)}
                      aria-label={isMuted ? (isEn ? 'Unmute voice' : 'Bật tiếng') : (isEn ? 'Mute voice' : 'Tắt tiếng')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#21374D] hover:bg-[#2A4560] text-xs font-mono text-[#AAB8C7] border border-[#AAB8C7]/22 rounded-xs cursor-pointer"
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-4 h-4 text-[#C96F46]" />
                          <span>{isEn ? 'Muted' : 'Đã tắt tiếng'}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 text-[#D2A071]" />
                          <span>{isEn ? 'Voice On' : 'Bật giọng đọc'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Secondary Controls: Speed + Auto-Advance */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#AAB8C7]/18 text-xs font-mono text-[#AAB8C7]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D2A071]" />
                      <span>{isEn ? 'Speed:' : 'Tốc độ:'}</span>
                      {[0.85, 1.0, 1.2].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setSpeechRate(r)}
                          className={`px-2 py-0.5 rounded-xs cursor-pointer ${
                            speechRate === r
                              ? 'bg-[#D2A071] text-[#0B1422] font-bold'
                              : 'bg-white/5 hover:bg-white/10 text-[#AAB8C7]'
                          }`}
                        >
                          {r}x
                        </button>
                      ))}
                    </div>

                    <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={autoAdvance}
                        onChange={(e) => setAutoAdvance(e.target.checked)}
                        className="accent-[#D2A071]"
                      />
                      <span>{isEn ? 'Auto-advance slides' : 'Tự chuyển chương'}</span>
                    </label>
                  </div>

                  {speechSupported && !hasNativeVoice && !isEn && (
                    <p className="text-[11px] text-amber-200/90 bg-amber-500/10 border border-amber-500/30 p-2.5 leading-relaxed">
                      {isEn
                        ? 'Note: If your browser lacks a Vietnamese TTS voice, switch to EN or use Microsoft Edge for HoaiMy natural voice.'
                        : 'Gợi ý: Nếu trình duyệt chưa cài giọng đọc tiếng Việt, thanh tiến trình vẫn tự động chuyển Slide hoặc bạn có thể mở bằng Microsoft Edge / chuyển sang EN.'}
                    </p>
                  )}
                </div>

                {/* Live Interactive Bilingual Transcript List */}
                <div className="px-5 py-3 bg-[#101E30] border-b border-[#AAB8C7]/18 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#D2A071]">
                    <FileText className="w-3.5 h-3.5" />
                    <span>
                      {isEn
                        ? `Live Interactive Transcript (${slides.length} Chapters)`
                        : `Bản Chép Lời Đồng Bộ (${slides.length} Chương)`}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#AAB8C7]">
                    {isEn ? 'Click any chapter to jump' : 'Bấm vào chương bất kỳ để xem'}
                  </span>
                </div>

                <div className="p-4 overflow-y-auto max-h-[540px] space-y-3 divide-y divide-[#AAB8C7]/15 flex-1">
                  {/* Mission Intro Block */}
                  <div className="pb-3 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#D2A071]">
                      {isEn ? 'PROLOGUE · CURRENT LOCATION' : 'MỞ ĐẦU · VỊ TRÍ HIỆN TẠI'}
                    </span>
                    <p className="text-xs text-[#AAB8C7] font-mono">
                      {isEn ? journey.where_now_en : journey.where_now_vi}
                    </p>
                    <p className="text-sm text-[#E9EDF2] leading-relaxed pt-1">
                      {isEn ? journey.intro_en : journey.intro_vi}
                    </p>
                  </div>

                  {/* Chapters */}
                  {slides.map((ch, idx) => {
                    const isActive = idx === currentSlideIdx;
                    return (
                      <div
                        key={ch.id}
                        onClick={() => handleJumpToSlide(idx)}
                        className={`pt-3 p-3 rounded-xs transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#21374D] border-l-4 border-[#D2A071]'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[#D2A071] font-semibold">
                            {isEn ? ch.code_en : ch.code_vi}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleJumpToSlide(idx, true);
                            }}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/10 hover:bg-[#D2A071] hover:text-[#0B1422] font-mono text-[10px] text-[#F0EDE5] rounded-xs transition-colors cursor-pointer"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>{isEn ? 'Speak' : 'Nghe đoạn này'}</span>
                          </button>
                        </div>
                        <h4 className="font-display text-base font-bold text-[#F0EDE5] mt-1">
                          {isEn ? ch.title_en : ch.title_vi}
                        </h4>
                        <p className="text-sm text-[#AAB8C7] leading-relaxed mt-1">
                          {isEn ? ch.narration_en : ch.narration_vi}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Scientific Accuracy & Editorial Guardrail Callout */}
            <div className="p-4 bg-[#162A40] border border-[#D2A071]/30 rounded-sm flex items-start gap-3">
              <Info className="w-5 h-5 text-[#D2A071] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-[#E9EDF2] leading-relaxed">
                <strong className="text-[#D2A071] font-mono uppercase tracking-wider mr-2">
                  {isEn ? 'Curatorial Guardrail:' : 'Chuẩn mực đối chiếu khoa học:'}
                </strong>
                {isEn ? journey.EditorialWarning_en : journey.EditorialWarning_vi}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. WARM MUSEUM IVORY EDITORIAL READING PANEL: 5-ACT ARCHIVAL SCROLLYTELLING & TIMELINE */}
      {(activeFormatTab === 'scrollytelling' || activeFormatTab === 'slide-audio') && (
        <section
          aria-label={isEn ? 'Mission Scrollytelling and Verified Timeline' : 'Nhật ký hành trình và Dòng thời gian xác minh'}
          className="py-14 px-4 sm:px-6 lg:px-8 bg-[#F0EDE5] text-[#172233] border-b border-[#172233]/15"
        >
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Editorial Reading Header */}
            <div className="border-b border-[#172233]/15 pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="space-y-2 max-w-3xl">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#8C583A] font-bold">
                  {isEn
                    ? 'ARCHIVAL READING ROOM · FIVE-ACT MISSION CHRONICLE'
                    : 'PHÒNG ĐỌC TƯ LIỆU · NHẬT KÝ HÀNH TRÌNH & DÒNG THỜI GIAN NASA'}
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#172233] tracking-tight">
                  {isEn
                    ? `${journey.title_en}: From Launch to Silent Legacy`
                    : `${journey.title_vi}: Từ Khởi Đầu Đến Khi Tín Hiệu Im Lặng`}
                </h2>
                <p className="text-base text-[#172233]/80 leading-relaxed">
                  {isEn
                    ? 'Designed on high-contrast warm museum ivory for comfortable long-form reading. Every chapter links hardware design directly to scientific discovery.'
                    : 'Trình bày trên nền giấy ngà bảo tàng (Warm Museum Ivory #F3F0E8) giúp đọc sâu không mỏi mắt. Mỗi chương kết nối trực tiếp cấu tạo phần cứng với thành tựu khám phá khoa học.'}
                </p>
              </div>

              <a
                href={archiveRecord.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#172233] hover:bg-[#283A58] text-[#F0EDE5] font-mono text-xs uppercase tracking-wider rounded-xs shrink-0 transition-colors"
              >
                <span>{isEn ? 'Official NASA Mission Page' : 'Trang Nhiệm Vụ NASA Chính Thức'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Scrollytelling Chapters List */}
            <div className="space-y-8">
              {slides.map((ch, idx) => {
                const media = NASA_MEDIA_CATALOG[ch.media_id];
                const mediaSrc = getMediaSrc(media);
                return (
                  <article
                    key={ch.id}
                    className="bg-white border border-[#172233]/15 p-6 sm:p-8 rounded-sm shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                  >
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#172233]/10 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 bg-[#172233] text-[#F0EDE5]">
                            {isEn ? ch.phase_en : ch.phase_vi}
                          </span>
                          <span className="font-mono text-xs uppercase tracking-wider text-[#8C583A] font-semibold">
                            {isEn ? ch.code_en : ch.code_vi}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveFormatTab('slide-audio');
                            handleJumpToSlide(idx, true);
                            window.scrollTo({ top: 220, behavior: 'smooth' });
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F0EDE5] hover:bg-[#172233] text-[#172233] hover:text-[#F0EDE5] border border-[#172233]/20 font-mono text-xs transition-colors cursor-pointer rounded-xs"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{isEn ? 'Play in Audio Stage' : 'Nghe chương này trên sân khấu'}</span>
                        </button>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-[#172233]">
                        {isEn ? ch.title_en : ch.title_vi}
                      </h3>

                      <p className="text-base sm:text-lg text-[#172233]/90 leading-relaxed">
                        {isEn ? ch.narration_en : ch.narration_vi}
                      </p>

                      <div className="p-4 bg-[#F0EDE5] border-l-4 border-[#C96F46] space-y-1">
                        <div className="font-mono text-xs uppercase tracking-wider text-[#8C583A] font-bold">
                          {isEn ? 'Engineering → Science:' : 'Phần cứng → Khoa học:'}{' '}
                          {isEn ? ch.hardware_part_en : ch.hardware_part_vi}
                        </div>
                        <p className="text-sm text-[#172233]/85 leading-relaxed">
                          {isEn ? ch.hardware_to_science_en : ch.hardware_to_science_vi}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {ch.facts.map((fact, fIdx) => (
                          <div
                            key={fIdx}
                            className="p-3 bg-[#FAF8F4] border border-[#172233]/12 rounded-xs"
                          >
                            <div className="font-mono text-[10px] uppercase tracking-wider text-[#172233]/60">
                              {isEn ? fact.label_en : fact.label_vi}
                            </div>
                            <div className="font-display text-sm font-bold text-[#172233] mt-0.5">
                              {isEn ? fact.value_en : fact.value_vi}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Citations */}
                      <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#172233]/70">
                        <span>{isEn ? 'Verified Sources:' : 'Nguồn tư liệu:'}</span>
                        {ch.source_ids.map((srcId) => {
                          const src = SOURCES_CATALOG[srcId];
                          return src ? (
                            <a
                              key={srcId}
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-0.5 bg-[#F0EDE5] hover:bg-[#172233] hover:text-[#F0EDE5] border border-[#172233]/15 transition-colors"
                            >
                              {srcId}: {src.title}
                            </a>
                          ) : (
                            <span key={srcId} className="px-2 py-0.5 bg-[#F0EDE5]">
                              {srcId}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Chapter Visual */}
                    <div className="lg:col-span-5">
                      {media && (
                        <figure className="border border-[#172233]/15 bg-[#162A40] text-[#F0EDE5] rounded-xs overflow-hidden">
                          <div className="aspect-video bg-[#0B1422] overflow-hidden relative">
                            {mediaSrc && (
                              <img
                                src={mediaSrc}
                                alt={media.alt_vi}
                                onClick={() => onOpenLightbox && onOpenLightbox(media)}
                                className="w-full h-full object-cover cursor-zoom-in hover:scale-[1.02] transition-transform duration-500"
                              />
                            )}
                          </div>
                          <figcaption className="p-3.5 space-y-1.5 text-xs">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-[#F0EDE5]">{media.title}</span>
                              <span className="font-mono text-[10px] text-[#D2A071]">
                                {media.credit}
                              </span>
                            </div>
                            <p className="text-[#AAB8C7] leading-relaxed">{media.caption_vi}</p>
                          </figcaption>
                        </figure>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Verified Chronological Mission Timeline Table */}
            <div className="bg-white border border-[#172233]/15 p-6 sm:p-8 rounded-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#172233]/15 pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#8C583A] font-bold">
                    {isEn ? 'CHRONOLOGICAL TELEMETRY LOG' : 'BIÊN NIÊN SỬ CỘT MỐC XÁC MINH'}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#172233] mt-0.5">
                    {isEn
                      ? `Verified Mission Timeline — ${journey.title_en}`
                      : `Dòng Thời Gian Nhiệm Vụ — ${journey.title_vi}`}
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#172233]/70">
                  {archiveRecord.timeline.length}{' '}
                  {isEn ? 'verified milestones' : 'cột mốc đã đối chiếu'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {archiveRecord.timeline.map((ev, i) => (
                  <div
                    key={i}
                    className="p-4 bg-[#FAF8F4] border border-[#172233]/15 rounded-xs flex flex-col justify-between space-y-2"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-[#8C583A]">
                          {ev.date}
                        </span>
                        {ev.semantic_label_vi && (
                          <span className="font-mono text-[10px] px-2 py-0.5 bg-[#172233]/10 text-[#172233]">
                            {ev.semantic_label_vi}
                          </span>
                        )}
                      </div>
                      <h4 className="font-display font-bold text-base text-[#172233]">
                        {ev.title_vi}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#172233]/80 leading-relaxed">
                        {ev.detail_vi}
                      </p>
                    </div>
                    {ev.timezone_note_vi && (
                      <p className="font-mono text-[11px] text-[#8C583A] pt-2 border-t border-[#172233]/10">
                        * {ev.timezone_note_vi}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. EXPANDABLE MULTIMEDIA HUB (VIDEO / PODCAST + POSTER / COMIC) */}
      <section
        aria-label={isEn ? 'Expandable Storytelling Formats' : 'Các định dạng truyền thông mở rộng'}
        className="py-12 px-4 sm:px-6 lg:px-8 bg-[#162A40] border-b border-[#AAB8C7]/18"
      >
        {(() => {
          const oppFallback = BUILTIN_JOURNEY_MANIFESTS.opportunity!;
          const surFallback = BUILTIN_JOURNEY_MANIFESTS['surveyor-3']!;
          const videoMissionId: JourneyMissionId = manifest?.video?.src ? selectedMissionId : 'opportunity';
          const activeVideo = manifest?.video?.src ? manifest.video : oppFallback.video!;
          const audioMissionId: JourneyMissionId = manifest?.audio?.src ? selectedMissionId : 'opportunity';
          const activeAudio = manifest?.audio?.src ? manifest.audio : oppFallback.audio!;
          const activePosterSrc = manifest?.poster
            ? resolveJourneyPublicUrl(manifest.poster, selectedMissionId)
            : resolveJourneyPublicUrl(oppFallback.poster, 'opportunity');
          const comicMissionId: JourneyMissionId = manifest?.comic?.pages?.length ? selectedMissionId : 'surveyor-3';
          const activeComic = manifest?.comic?.pages?.length ? manifest.comic : surFallback.comic!;
          const comicPages = activeComic.pages || [];
          const safeComicIdx = Math.min(comicPage, Math.max(0, comicPages.length - 1));
          const activeComicPdfUrl = resolveJourneyPublicUrl(manifest?.pdfUrl || activeComic.pdf || surFallback.pdfUrl, comicMissionId);
          const videoPosterSrc = resolveJourneyPublicUrl(activeVideo.poster || oppFallback.poster, videoMissionId);

          return (
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#D2A071] font-bold">
                    <Sparkles className="w-4 h-4 text-[#D2A071]" />
                    <span>
                      {isEn
                        ? 'HUMAN EXPRESSIONS GALLERY · ART, MUSIC & COMICS'
                        : 'KHÔNG GIAN NGHỆ THUẬT · MV, POSTER & TRUYỆN TRANH'}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F0EDE5]">
                    {isEn
                      ? `Creative Expressions for ${journey.title_en}`
                      : `Tác Phẩm Kể Chuyện Nghệ Thuật — ${journey.title_vi}`}
                  </h2>
                  <p className="text-sm sm:text-base text-[#AAB8C7] max-w-3xl leading-relaxed">
                    {isEn
                      ? 'Experience the creative works inspired by NASA science: LITTLE WHEELS Music Video (03:41) & Poster (Opportunity), and the 15-page Surveyor 3 Graphic Novel & PDF.'
                      : 'Trải nghiệm trực tiếp các tác phẩm sáng tạo lấy cảm hứng từ dữ kiện NASA: MV Ca nhạc “LITTLE WHEELS” (03:41), Poster nghệ thuật A2 (Opportunity), và Bộ Truyện Tranh 15 Trang “Người bạn cô độc trên Mặt Trăng” kèm PDF (Surveyor 3).'}
                  </p>
                </div>

                {(selectedMissionId === 'opportunity' || selectedMissionId === 'pioneer-11' || selectedMissionId === 'surveyor-3') && (
                  <button
                    type="button"
                    onClick={() => onNavigate(`/poster/${selectedMissionId}`)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#21374D] hover:bg-[#2A4560] text-[#F0EDE5] border border-[#D2A071]/40 font-mono text-xs uppercase tracking-wider rounded-xs cursor-pointer shrink-0 transition-colors"
                  >
                    <Printer className="w-4 h-4 text-[#D2A071]" />
                    <span>{isEn ? 'View Printable Exhibition Poster' : 'Xem & In Poster Triển Lãm A2'}</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Format Card 1: Video / MV */}
                <div className="p-6 bg-[#162A40] border border-[#AAB8C7]/18 rounded-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#D2A071] font-semibold">
                        <Film className="w-4 h-4" />
                        <span>{isEn ? 'Music Video & Film' : 'Video / MV Ca Nhạc'}</span>
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 bg-[#D2A071]/15 border border-[#D2A071]/40 text-[#D2A071]">
                        {activeVideo.duration || '03:41'} · {isEn ? 'Creative MV' : 'Sáng tác · Sẵn sàng'}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#F0EDE5]">
                      {isEn
                        ? (activeVideo.titleEn || 'Music Video: LITTLE WHEELS — A Song for Opportunity')
                        : (activeVideo.titleVi || 'MV Ca khúc: LITTLE WHEELS — A Song for Opportunity')}
                    </h3>
                    <video
                      controls
                      preload="metadata"
                      poster={videoPosterSrc || undefined}
                      className="w-full rounded-xs border border-[#AAB8C7]/22 bg-black aspect-video"
                      src={resolveJourneyPublicUrl(activeVideo.src, videoMissionId)}
                    />
                    <p className="text-xs text-[#AAB8C7] leading-relaxed">
                      {isEn
                        ? 'Creative educational music video celebrating Opportunity’s 5,111 sols and 45.16 km across Mars (distinct from NASA archival imagery).'
                        : 'MV ca nhạc sáng tạo tôn vinh hành trình 5.111 sol và 45,16 km của Opportunity trên Sao Hỏa (tách biệt với ảnh tư liệu NASA gốc).'}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#AAB8C7]/18 flex items-center justify-between gap-2 font-mono text-[11px] text-[#AAB8C7]">
                    <span>public/products/{videoMissionId}/little_wheels.mp4</span>
                  </div>
                </div>

                {/* Format Card 2: Podcast / Audio & Creative Poster */}
                <div className="p-6 bg-[#162A40] border border-[#AAB8C7]/18 rounded-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#D2A071] font-semibold">
                        <Headphones className="w-4 h-4" />
                        <span>{isEn ? 'Audio & Art Poster' : 'Âm thanh & Poster Nghệ Thuật'}</span>
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 bg-[#D2A071]/15 border border-[#D2A071]/40 text-[#D2A071]">
                        {isEn ? 'Audio + PNG Ready' : 'Sẵn sàng'}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#F0EDE5]">
                      {isEn
                        ? 'LITTLE WHEELS Poster & Audio Track'
                        : 'Poster “Hành trình khám phá Sao Hỏa” & Ca khúc'}
                    </h3>
                    <div className="relative rounded-xs overflow-hidden border border-[#AAB8C7]/22 bg-[#0B1422] group">
                      <img
                        src={activePosterSrc}
                        alt="Poster LITTLE WHEELS — Hành trình khám phá Sao Hỏa"
                        onClick={() => setMediaModal('poster')}
                        className="w-full h-48 object-contain cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <button
                        type="button"
                        onClick={() => setMediaModal('poster')}
                        className="absolute top-2 right-2 inline-flex items-center gap-1 px-2.5 py-1 bg-[#0B1422]/85 hover:bg-[#21374D] text-[#F0EDE5] border border-[#D2A071]/40 font-mono text-[10px] rounded-xs cursor-pointer"
                      >
                        <Maximize2 className="w-3 h-3 text-[#D2A071]" />
                        <span>{isEn ? 'Zoom Poster' : 'Phóng to Poster'}</span>
                      </button>
                    </div>
                    <audio
                      controls
                      preload="metadata"
                      className="w-full"
                      src={resolveJourneyPublicUrl(activeAudio.src, audioMissionId)}
                    />
                  </div>
                  <div className="pt-3 border-t border-[#AAB8C7]/18 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                    <a
                      href={activePosterSrc}
                      download="LITTLE_WHEELS_Opportunity_Poster.png"
                      className="inline-flex items-center gap-1.5 text-[#D2A071] hover:text-white font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Download Poster PNG' : 'Tải Poster PNG'}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => onNavigate(`/poster/${selectedMissionId === 'pioneer-11' || selectedMissionId === 'surveyor-3' ? selectedMissionId : 'opportunity'}`)}
                      className="text-[#AAB8C7] hover:text-[#F0EDE5] underline cursor-pointer"
                    >
                      {isEn ? 'Open A2 Print Sheet →' : 'Trang In Poster A2 →'}
                    </button>
                  </div>
                </div>

                {/* Format Card 3: Digital Comic / Graphic Novel (15 Pages + PDF) */}
                <div className="p-6 bg-[#162A40] border border-[#AAB8C7]/18 rounded-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#D2A071] font-semibold">
                        <Layers className="w-4 h-4" />
                        <span>{isEn ? 'Graphic Comic (15p)' : 'Truyện tranh (Comic)'}</span>
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 bg-[#D2A071]/15 border border-[#D2A071]/40 text-[#D2A071]">
                        {comicPages.length} {isEn ? 'Pages + PDF' : 'Trang + PDF'}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#F0EDE5]">
                      {isEn
                        ? 'Surveyor 3: The Lonely Explorer of the Moon'
                        : 'Surveyor 3 — Người bạn cô độc trên Mặt Trăng'}
                    </h3>
                    <div className="space-y-2.5">
                      <div className="relative rounded-xs overflow-hidden border border-[#AAB8C7]/22 bg-[#060912] group">
                        <img
                          src={resolveJourneyPublicUrl(comicPages[safeComicIdx], comicMissionId)}
                          alt={`Truyện tranh Surveyor 3 — Trang ${safeComicIdx + 1} / ${comicPages.length}`}
                          onClick={() => setMediaModal('comic')}
                          className="w-full aspect-video object-contain cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                        <button
                          type="button"
                          onClick={() => setMediaModal('comic')}
                          className="absolute top-2 right-2 inline-flex items-center gap-1 px-2.5 py-1 bg-[#0B1422]/85 hover:bg-[#21374D] text-[#F0EDE5] border border-[#D2A071]/40 font-mono text-[10px] rounded-xs cursor-pointer"
                        >
                          <Maximize2 className="w-3 h-3 text-[#D2A071]" />
                          <span>{isEn ? 'Fullscreen Reader' : 'Đọc Toàn Màn Hình'}</span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between font-mono text-xs">
                        <button
                          type="button"
                          disabled={safeComicIdx === 0}
                          onClick={() => setComicPage((p) => Math.max(0, p - 1))}
                          className="px-3 py-1.5 bg-[#21374D] hover:bg-[#2A4560] text-[#F0EDE5] border border-[#AAB8C7]/20 disabled:opacity-30 cursor-pointer rounded-xs"
                        >
                          ← {isEn ? 'Prev' : 'Trang trước'}
                        </button>
                        <span className="text-[#D2A071] font-bold">
                          {safeComicIdx + 1} / {comicPages.length}
                        </span>
                        <button
                          type="button"
                          disabled={safeComicIdx >= comicPages.length - 1}
                          onClick={() => setComicPage((p) => Math.min(comicPages.length - 1, p + 1))}
                          className="px-3 py-1.5 bg-[#21374D] hover:bg-[#2A4560] text-[#F0EDE5] border border-[#AAB8C7]/20 disabled:opacity-30 cursor-pointer rounded-xs"
                        >
                          {isEn ? 'Next' : 'Trang sau'} →
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-[#AAB8C7]/18 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
                    <a
                      href={activeComicPdfUrl}
                      download="Surveyor_3_The_Lonely_Explorer_15Pages.pdf"
                      className="inline-flex items-center gap-1.5 text-[#D2A071] hover:text-white font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Download Comic PDF (15p)' : 'Tải Truyện PDF 15 Trang'}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setMediaModal('comic')}
                      className="text-[#AAB8C7] hover:text-[#F0EDE5] underline cursor-pointer"
                    >
                      {isEn ? 'Zoom Page →' : 'Đọc lớn hơn →'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Clean In-Page Lightbox Modal for Enlarged Poster or Full-Screen 15-Page Comic Reader */}
              {mediaModal && (
                <div
                  className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4"
                  onClick={() => setMediaModal(null)}
                >
                  <div
                    className="relative max-w-5xl w-full bg-[#101E30] border border-[#D2A071]/50 rounded-sm overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-5 py-3.5 bg-[#07111F] border-b border-[#AAB8C7]/18 flex items-center justify-between gap-3">
                      <div className="font-mono text-xs text-[#D2A071] font-bold uppercase tracking-wider truncate">
                        {mediaModal === 'poster'
                          ? 'Poster: LITTLE WHEELS — Hành trình khám phá Sao Hỏa (Tác phẩm sáng tạo)'
                          : `Truyện Tranh Surveyor 3 — Trang ${safeComicIdx + 1} / ${comicPages.length}`}
                      </div>
                      <button
                        type="button"
                        onClick={() => setMediaModal(null)}
                        aria-label="Close modal"
                        className="p-1.5 bg-[#162A40] hover:bg-[#21374D] text-[#F0EDE5] rounded-xs cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-4 sm:p-6 bg-[#060912] flex flex-col items-center justify-center max-h-[78vh] overflow-auto">
                      {mediaModal === 'poster' ? (
                        <img
                          src={activePosterSrc}
                          alt="Poster LITTLE WHEELS — Hành trình khám phá Sao Hỏa"
                          className="max-h-[68vh] w-auto object-contain rounded-xs border border-[#D2A071]/40"
                        />
                      ) : (
                        <img
                          src={resolveJourneyPublicUrl(comicPages[safeComicIdx], comicMissionId)}
                          alt={`Truyện tranh Surveyor 3 trang ${safeComicIdx + 1}`}
                          className="max-h-[68vh] w-auto object-contain rounded-xs border border-[#D2A071]/40"
                        />
                      )}
                    </div>

                    <div className="px-5 py-3.5 bg-[#07111F] border-t border-[#AAB8C7]/18 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                      {mediaModal === 'comic' ? (
                        <>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={safeComicIdx === 0}
                              onClick={() => setComicPage((p) => Math.max(0, p - 1))}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#162A40] hover:bg-[#21374D] text-[#F0EDE5] border border-[#AAB8C7]/25 disabled:opacity-30 cursor-pointer rounded-xs"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                              <span>Trang trước</span>
                            </button>
                            <span className="px-3 py-1 text-[#D2A071] font-bold">
                              Trang {safeComicIdx + 1} / {comicPages.length}
                            </span>
                            <button
                              type="button"
                              disabled={safeComicIdx >= comicPages.length - 1}
                              onClick={() => setComicPage((p) => Math.min(comicPages.length - 1, p + 1))}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#162A40] hover:bg-[#21374D] text-[#F0EDE5] border border-[#AAB8C7]/25 disabled:opacity-30 cursor-pointer rounded-xs"
                            >
                              <span>Trang sau</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <a
                            href={activeComicPdfUrl}
                            download="Surveyor_3_The_Lonely_Explorer_15Pages.pdf"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#D2A071] text-[#0B1422] font-bold rounded-xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Tải PDF 15 Trang</span>
                          </a>
                        </>
                      ) : (
                        <>
                          <span className="text-[#AAB8C7]">Độ phân giải gốc · Kể chuyện sáng tạo (Opportunity)</span>
                          <a
                            href={activePosterSrc}
                            download="LITTLE_WHEELS_Opportunity_Poster.png"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#D2A071] text-[#0B1422] font-bold rounded-xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Tải Poster PNG Gốc</span>
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </section>

      
      {/* 4. CUSTOM STORY STUDIO & LOGIC TESTER (TAB 4) */}
      {activeFormatTab === 'custom-story' && (
        <section
          aria-label={isEn ? 'Custom Story Studio & Logic Tester' : 'Studio Sáng Tác & Kiểm Tra Tính Logic Câu Chuyện'}
          className="py-10 px-4 sm:px-6 lg:px-8 bg-[#0B1422] border-b border-[#AAB8C7]/18"
        >
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Notification alert if loaded */}
            {customStoryLoadedNotice && (
              <div className="p-4 bg-emerald-950/70 border border-emerald-400/50 rounded-sm flex items-center justify-between gap-3 text-emerald-200 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{customStoryLoadedNotice}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCustomStoryLoadedNotice(null)}
                  className="text-xs font-mono text-emerald-400 hover:underline cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            )}

            {/* Studio Header & Quick Action Buttons */}
            <div className="bg-[#101E30] border border-[#AAB8C7]/20 p-6 sm:p-8 rounded-sm space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D2A071] font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {isEn
                        ? 'STORY STUDIO · WRITE, ANALYZE LOGIC & PLAY ON STAGE'
                        : 'PHÒNG SÁNG TÁC · BIÊN TẬP, PHÂN TÍCH LOGIC & PHÁT THỬ'}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F0EDE5]">
                    {isEn ? 'Test Your Spacecraft Story Logic' : 'Kiểm Tra Tính Logic Của Câu Chuyện Bạn Tạo'}
                  </h2>
                  <p className="text-sm sm:text-base text-[#AAB8C7] leading-relaxed">
                    {isEn
                      ? 'Insert your own first-person machine narrative. The built-in evaluator scores scientific causality, hardware fidelity, and mission closure, then plays it live in the theater with speech and slides.'
                      : 'Chèn thử câu chuyện bạn sáng tác về cỗ máy thám hiểm. Hệ thống sẽ tự động phân tích tính logic khoa học, mức độ gắn kết với phần cứng và mốc thời gian, sau đó cho phép bạn phát thử ngay trên sân khấu thuyết minh.'}
                  </p>
                </div>

                {/* Primary Action: Run in Theater */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={handleRunCustomStoryOnStage}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#D2A071] hover:bg-[#e0b287] text-[#0B1422] font-mono text-xs uppercase tracking-wider font-bold rounded-sm transition-all shadow-[0_0_20px_rgba(210,160,113,0.3)] cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isEn ? 'Play in Theater Stage' : 'Chạy thử trong Sân khấu Slide'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowFastPasteModal(true)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#21374D] hover:bg-[#2b4764] text-[#F0EDE5] border border-[#AAB8C7]/25 font-mono text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-[#D2A071]" />
                    <span>{isEn ? 'Fast Paste Text' : 'Dán nhanh toàn bộ văn bản'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportCustomStoryJSON}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#162A40] hover:bg-[#21374D] text-[#AAB8C7] hover:text-[#F0EDE5] border border-[#AAB8C7]/18 font-mono text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>JSON</span>
                  </button>
                </div>
              </div>

              {/* Ready-to-Test NASA Story Templates Showcase (1-Click to Test) */}
              <div className="pt-4 border-t border-[#AAB8C7]/18 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#D2A071] uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D2A071]" />
                    <span>{isEn ? 'QUICK LOAD TEST STORIES (1-CLICK LOGIC EVALUATION):' : 'BẤM 1 CHẠM ĐỂ NẠP DỮ LIỆU TEST TRUYỆN MẪU & CHẤM ĐIỂM LOGIC:'}</span>
                  </span>
                  <span className="text-xs text-[#AAB8C7]">
                    {customStory.chapters.length} {isEn ? 'Chapters Loaded' : 'Chặng hành trình đang chọn'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleLoadSampleStory('opp')}
                    className="p-3.5 bg-[#162A40] hover:bg-[#21374D] border border-[#D2A071]/40 hover:border-[#D2A071] text-left rounded-sm transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#D2A071] mb-1">
                      <span>MẪU 01 · SAO HỎA</span>
                      <span className="text-[11px] text-emerald-400 font-bold">100/100 Logic</span>
                    </div>
                    <div className="font-semibold text-sm text-[#F0EDE5] group-hover:text-[#D2A071] transition-colors">
                      Opportunity: 15 Năm Săn Tìm Nước
                    </div>
                    <div className="text-xs text-[#AAB8C7] mt-1 line-clamp-2">
                      Bài toán nước cổ đại, khoáng vật Hematite, bẫy cát Purgatory và bão bụi toàn cầu 2018.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLoadSampleStory('pio')}
                    className="p-3.5 bg-[#162A40] hover:bg-[#21374D] border border-[#21374D] hover:border-[#D2A071] text-left rounded-sm transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#7BA7BC] mb-1">
                      <span>MẪU 02 · KHÔNG GIAN SÂU</span>
                      <span className="text-[11px] text-emerald-400 font-bold">100/100 Logic</span>
                    </div>
                    <div className="font-semibold text-sm text-[#F0EDE5] group-hover:text-[#D2A071] transition-colors">
                      Pioneer 11: Xuyên Vành Đai Sao Thổ
                    </div>
                    <div className="text-xs text-[#AAB8C7] mt-1 line-clamp-2">
                      4 lò điện hạt nhân RTG, bảng vàng Pioneer Plaque, trợ lực hấp dẫn Sao Mộc và bay liên sao.
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLoadSampleStory('sur')}
                    className="p-3.5 bg-[#162A40] hover:bg-[#21374D] border border-[#21374D] hover:border-[#D2A071] text-left rounded-sm transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-stone-300 mb-1">
                      <span>MẪU 03 · MẶT TRĂNG</span>
                      <span className="text-[11px] text-emerald-400 font-bold">100/100 Logic</span>
                    </div>
                    <div className="font-semibold text-sm text-[#F0EDE5] group-hover:text-[#D2A071] transition-colors">
                      Surveyor 3 &amp; Phi Hành Gia Apollo 12
                    </div>
                    <div className="text-xs text-[#AAB8C7] mt-1 line-clamp-2">
                      Đo độ chịu tải của đất Mặt Trăng, đón phi hành gia Pete Conrad và Alan Bean tới thăm.
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* REAL-TIME STORY LOGIC SCORECARD & EVALUATOR */}
            <div className="bg-[#162A40] border border-[#D2A071]/40 p-6 sm:p-8 rounded-sm space-y-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#AAB8C7]/18 pb-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#D2A071] font-semibold">
                    {isEn ? 'LOGIC & CAUSALITY SCORECARD' : 'BẢNG ĐÁNH GIÁ TÍNH LOGIC CỦA CÂU CHUYỆN'}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F0EDE5] mt-1">
                    {isEn ? 'Story Coherence Evaluation' : 'Kiểm Tra Độ Chặt Chẽ Giữa Bài Toán Khoa Học & Phần Cứng'}
                  </h3>
                </div>

                {/* Big Score Badge */}
                <div className="flex items-center gap-4 bg-[#101E30] border border-[#D2A071]/40 px-5 py-3 rounded-sm">
                  <div>
                    <div className="font-mono text-[10px] uppercase text-[#AAB8C7]">
                      {isEn ? 'Overall Logic Score' : 'Điểm Logic Tổng Thể'}
                    </div>
                    <div className="font-display text-3xl font-bold text-[#D2A071]">
                      {storyLogicAnalysis.totalScore} / 100
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-xs font-mono text-xs font-bold ${
                      storyLogicAnalysis.totalScore >= 80
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                        : storyLogicAnalysis.totalScore >= 60
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                        : 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {storyLogicAnalysis.totalScore >= 80
                      ? isEn
                        ? 'HIGH COHERENCE'
                        : 'LOGIC RẤT TỐT'
                      : storyLogicAnalysis.totalScore >= 60
                      ? isEn
                        ? 'MODERATE COHERENCE'
                        : 'LOGIC KHÁ'
                      : isEn
                      ? 'NEEDS REFINEMENT'
                      : 'CẦN BỔ SUNG'}
                  </div>
                </div>
              </div>

              {/* 4 Pillars Progress Meters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-[#101E30] border border-[#AAB8C7]/18 rounded-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#AAB8C7]">{isEn ? '1. Scientific Goal' : '1. Mục Tiêu Khoa Học'}</span>
                    <span className="text-[#D2A071] font-bold">{storyLogicAnalysis.goalScore}/25</span>
                  </div>
                  <div className="w-full bg-[#162A40] h-2 rounded-xs overflow-hidden">
                    <div
                      className="bg-[#D2A071] h-full transition-all duration-500"
                      style={{ width: `${(storyLogicAnalysis.goalScore / 25) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#AAB8C7] leading-relaxed">
                    {isEn ? 'Clearly stated investigation questions in Chapter 1.' : 'Bài toán nghiên cứu rõ ràng ở Chặng 1.'}
                  </p>
                </div>

                <div className="p-4 bg-[#101E30] border border-[#AAB8C7]/18 rounded-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#AAB8C7]">{isEn ? '2. Hardware Match' : '2. Khả Thi Kỹ Thuật'}</span>
                    <span className="text-[#D2A071] font-bold">{storyLogicAnalysis.hardwareScore}/25</span>
                  </div>
                  <div className="w-full bg-[#162A40] h-2 rounded-xs overflow-hidden">
                    <div
                      className="bg-[#D2A071] h-full transition-all duration-500"
                      style={{ width: `${(storyLogicAnalysis.hardwareScore / 25) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#AAB8C7] leading-relaxed">
                    {isEn ? 'Instruments & chassis designed to solve the question.' : 'Công nghệ & thiết bị tương xứng bài toán.'}
                  </p>
                </div>

                <div className="p-4 bg-[#101E30] border border-[#AAB8C7]/18 rounded-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#AAB8C7]">{isEn ? '3. Environmental Peril' : '3. Thử Thách Không Gian'}</span>
                    <span className="text-[#D2A071] font-bold">{storyLogicAnalysis.hazardScore}/25</span>
                  </div>
                  <div className="w-full bg-[#162A40] h-2 rounded-xs overflow-hidden">
                    <div
                      className="bg-[#D2A071] h-full transition-all duration-500"
                      style={{ width: `${(storyLogicAnalysis.hazardScore / 25) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#AAB8C7] leading-relaxed">
                    {isEn ? 'Real off-world hazards (storms, cold, distance).' : 'Khắc nghiệt thực tế (bão, lạnh, khoảng cách).'}
                  </p>
                </div>

                <div className="p-4 bg-[#101E30] border border-[#AAB8C7]/18 rounded-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#AAB8C7]">{isEn ? '4. Evidence & Legacy' : '4. Bằng Chứng & Di Sản'}</span>
                    <span className="text-[#D2A071] font-bold">{storyLogicAnalysis.discoveryScore}/25</span>
                  </div>
                  <div className="w-full bg-[#162A40] h-2 rounded-xs overflow-hidden">
                    <div
                      className="bg-[#D2A071] h-full transition-all duration-500"
                      style={{ width: `${(storyLogicAnalysis.discoveryScore / 25) * 100}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#AAB8C7] leading-relaxed">
                    {isEn ? 'Measurable findings & honest historic resting place.' : 'Phát hiện đo đạc & vị trí yên nghỉ trung thực.'}
                  </p>
                </div>
              </div>

              {/* Actionable Feedback Chips */}
              <div className="space-y-2.5 pt-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#D2A071]">
                  {isEn ? 'DIAGNOSTIC FEEDBACK & REASONING:' : 'NHẬN XÉT CHI TIẾT VỀ MẠCH LOGIC:'}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {storyLogicAnalysis.feedbackList.map((fb, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-sm border text-xs sm:text-sm flex items-start gap-2.5 ${
                        fb.type === 'pass'
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                          : fb.type === 'warn'
                          ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                          : 'bg-[#101E30] border-[#D2A071]/40 text-[#F0EDE5]'
                      }`}
                    >
                      {fb.type === 'pass' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-[#D2A071] shrink-0 mt-0.5" />
                      )}
                      <p className="leading-relaxed">{isEn ? fb.textEn : fb.textVi}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* EDITABLE STORY FORM (META + 6 CHAPTERS) */}
            <div className="space-y-6">
              {/* Story Meta Header Fields */}
              <div className="bg-[#101E30] border border-[#AAB8C7]/18 p-6 rounded-sm space-y-4">
                <div className="font-mono text-xs uppercase tracking-widest text-[#D2A071] font-semibold">
                  {isEn ? 'STORY METADATA & IDENTITY' : 'THÔNG TIN CHUNG VỀ CỖ MÁY & CÂU CHUYỆN'}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-[#AAB8C7] block">
                      {isEn ? 'Story Title / Machine Name:' : 'Tiêu đề câu chuyện / Tên cỗ máy:'}
                    </label>
                    <input
                      type="text"
                      value={customStory.title}
                      onChange={(e) => setCustomStory((prev) => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-[#162A40] border border-[#AAB8C7]/22 p-2.5 rounded-xs text-[#F0EDE5] font-display text-base font-bold focus:border-[#D2A071] outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-[#AAB8C7] block">
                      {isEn ? 'Current Resting Place (Where is it now?):' : 'Nơi hiện tại cỗ máy đang yên nghỉ:'}
                    </label>
                    <input
                      type="text"
                      value={customStory.where_now}
                      onChange={(e) => setCustomStory((prev) => ({ ...prev, where_now: e.target.value }))}
                      className="w-full bg-[#162A40] border border-[#AAB8C7]/22 p-2.5 rounded-xs text-[#F0EDE5] text-sm focus:border-[#D2A071] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#AAB8C7] block">
                    {isEn ? 'Tagline / Hook Quote:' : 'Câu nói chủ đề / Tagline:'}
                  </label>
                  <input
                    type="text"
                    value={customStory.tagline}
                    onChange={(e) => setCustomStory((prev) => ({ ...prev, tagline: e.target.value }))}
                    className="w-full bg-[#162A40] border border-[#AAB8C7]/22 p-2.5 rounded-xs text-[#F0EDE5] text-sm focus:border-[#D2A071] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-[#AAB8C7] block">
                    {isEn ? 'Opening Intro (First-person narration intro):' : 'Lời chào mở đầu (Ngôi thứ nhất):'}
                  </label>
                  <textarea
                    rows={2}
                    value={customStory.intro}
                    onChange={(e) => setCustomStory((prev) => ({ ...prev, intro: e.target.value }))}
                    className="w-full bg-[#162A40] border border-[#AAB8C7]/22 p-2.5 rounded-xs text-[#F0EDE5] text-sm focus:border-[#D2A071] outline-none leading-relaxed"
                  />
                </div>
              </div>

              {/* 6 Chapters Accordion Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#D2A071] font-semibold">
                    {isEn ? '6 NARRATIVE CHAPTERS (EDIT BELOW)' : '6 CHẶNG HÀNH TRÌNH LOGIC (CHỈNH SỬA BÊN DƯỚI)'}
                  </span>
                  <span className="text-xs text-[#AAB8C7]">
                    {isEn ? 'Auto-synced with Live Theater Stage' : 'Tự động đồng bộ với Sân khấu thuyết minh'}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {customStory.chapters.map((ch, idx) => (
                    <div
                      key={idx}
                      className="bg-[#101E30] border border-[#AAB8C7]/20 p-5 sm:p-6 rounded-sm space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#AAB8C7]/18 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-[#21374D] border border-[#D2A071]/40 flex items-center justify-center font-mono text-xs font-bold text-[#D2A071]">
                            {idx + 1}
                          </span>
                          <span className="font-mono text-xs text-[#D2A071] font-bold uppercase">
                            {ch.code}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-[#AAB8C7]">
                          Chương #{idx + 1} / 6
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-mono text-[11px] text-[#AAB8C7] block">
                            Tiêu đề chặng:
                          </label>
                          <input
                            type="text"
                            value={ch.title}
                            onChange={(e) => handleUpdateChapter(idx, 'title', e.target.value)}
                            className="w-full bg-[#162A40] border border-[#AAB8C7]/22 p-2 rounded-xs text-[#F0EDE5] text-sm font-semibold focus:border-[#D2A071] outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="font-mono text-[11px] text-[#AAB8C7] block">
                            Bộ phận phần cứng liên quan:
                          </label>
                          <input
                            type="text"
                            value={ch.hardware_part}
                            onChange={(e) => handleUpdateChapter(idx, 'hardware_part', e.target.value)}
                            className="w-full bg-[#162A40] border border-[#AAB8C7]/22 p-2 rounded-xs text-[#F0EDE5] text-sm focus:border-[#D2A071] outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[11px] text-[#AAB8C7] block">
                          Lời kể thuyết minh (Narration text — được đọc bằng giọng nói khi phát):
                        </label>
                        <textarea
                          rows={3}
                          value={ch.narration}
                          onChange={(e) => handleUpdateChapter(idx, 'narration', e.target.value)}
                          className="w-full bg-[#162A40] border border-[#AAB8C7]/22 p-2.5 rounded-xs text-[#F0EDE5] text-sm focus:border-[#D2A071] outline-none leading-relaxed"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                        <div className="space-y-1">
                          <label className="text-[#AAB8C7] block">Ý nghĩa khoa học của phần cứng:</label>
                          <input
                            type="text"
                            value={ch.hardware_to_science}
                            onChange={(e) => handleUpdateChapter(idx, 'hardware_to_science', e.target.value)}
                            className="w-full bg-[#162A40] border border-[#AAB8C7]/22 p-2 rounded-xs text-slate-300 outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[#AAB8C7] block">Thông số / Dữ kiện gắn kèm:</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={ch.fact_label}
                              placeholder="Nhãn (ví dụ: Kỷ lục)"
                              onChange={(e) => handleUpdateChapter(idx, 'fact_label', e.target.value)}
                              className="bg-[#162A40] border border-[#AAB8C7]/22 p-2 rounded-xs text-slate-300 outline-none"
                            />
                            <input
                              type="text"
                              value={ch.fact_value}
                              placeholder="Giá trị (ví dụ: 45,16 km)"
                              onChange={(e) => handleUpdateChapter(idx, 'fact_value', e.target.value)}
                              className="bg-[#162A40] border border-[#AAB8C7]/22 p-2 rounded-xs text-[#D2A071] font-bold outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Big CTA */}
              <div className="p-6 sm:p-8 bg-gradient-to-r from-[#162A40] via-[#21374D] to-[#162A40] border border-[#D2A071]/40 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F0EDE5]">
                    {isEn ? 'Ready to Experience Your Story?' : 'Sẵn Sàng Trải Nghiệm Câu Chuyện Của Bạn?'}
                  </h3>
                  <p className="text-sm text-[#AAB8C7]">
                    {isEn
                      ? 'Click below to launch the synchronized Slide & Audio Player with your text and voice reconstruction.'
                      : 'Bấm nút dưới đây để chuyển toàn bộ nội dung bạn vừa soạn sang Sân khấu Slide & Thuyết minh.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRunCustomStoryOnStage}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#D2A071] hover:bg-[#e0b287] text-[#0B1422] font-mono text-sm font-bold uppercase tracking-wider rounded-sm shadow-xl transition-transform hover:scale-105 cursor-pointer shrink-0"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isEn ? 'Launch Slide & Audio Stage' : 'Phát Thử Trong Sân Khấu'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Fast Paste Modal */}
          {showFastPasteModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-[#101E30] border border-[#D2A071]/40 max-w-2xl w-full p-6 sm:p-8 rounded-sm space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#AAB8C7]/18 pb-3">
                  <h3 className="font-display text-lg font-bold text-[#F0EDE5]">
                    Dán Nhanh Toàn Bộ Văn Bản Câu Chuyện
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowFastPasteModal(false)}
                    className="text-[#AAB8C7] hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xs text-[#AAB8C7] leading-relaxed">
                  Dán bất kỳ đoạn văn nào bạn đã viết (mỗi đoạn cách nhau một dòng trống). Hệ thống sẽ tự động tách các đoạn tương ứng vào Lời mở đầu và 6 chặng hành trình logic.
                </p>
                <textarea
                  rows={8}
                  value={fastPasteText}
                  onChange={(e) => setFastPasteText(e.target.value)}
                  placeholder="Dán văn bản câu chuyện của bạn vào đây..."
                  className="w-full bg-[#162A40] border border-[#AAB8C7]/25 p-3 rounded-xs text-[#F0EDE5] text-sm outline-none focus:border-[#D2A071]"
                />
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowFastPasteModal(false)}
                    className="px-4 py-2 bg-[#162A40] text-[#AAB8C7] text-xs font-mono uppercase"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleParseFastPasteText}
                    className="px-5 py-2 bg-[#D2A071] text-[#0B1422] text-xs font-mono uppercase font-bold"
                  >
                    Tự động phân đoạn vào 6 chặng
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 5. CONTEXTUAL NEXT STEPS: CONTINUE TO SIMULATIONS OR RAW DATA ARCHIVE */}
      <section
        aria-label={isEn ? 'Next Steps in the Museum' : 'Bước khám phá tiếp theo'}
        className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0B1422]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#07111F] via-[#0E1E36] to-[#07111F] border border-[#AAB8C7]/22 rounded-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#D2A071]">
                {isEn ? 'CONTINUE YOUR INVESTIGATION' : 'TIẾP TỤC HÀNH TRÌNH KHÁM PHÁ'}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F0EDE5]">
                {isEn
                  ? `Finished the story of ${journey.title_en}?`
                  : `Bạn đã nghe xong câu chuyện của ${journey.title_vi}?`}
              </h2>
              <p className="text-sm sm:text-base text-[#AAB8C7] leading-relaxed">
                {isEn
                  ? 'Step into the Interactive STEM Simulation Lab to inspect spacecraft anatomy and space physics, or open the Open Science Data Catalog to examine raw NASA/NSSDCA specifications.'
                  : 'Hãy bước tiếp sang Phòng Thí Nghiệm Mô Phỏng (Simulations) để mổ xẻ cấu tạo phần cứng, thử thách sắp xếp Timeline & vật lý không gian, hoặc tra cứu bảng thông số gốc trong Kho Dữ Liệu (Data).'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate(`/mo-phong?mission=${selectedMissionId}`)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#D2A071] hover:bg-[#d4b47b] text-[#0B1422] font-display font-bold text-sm rounded-xs cursor-pointer transition-colors"
              >
                <Compass className="w-4 h-4" />
                <span>
                  {isEn
                    ? 'Explore in Simulations (/mo-phong)'
                    : 'Thử nghiệm Mô Phỏng (/mo-phong)'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate(`/du-lieu?mission=${selectedMissionId}`)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#21374D] hover:bg-[#2A4560] text-[#F0EDE5] border border-[#AAB8C7]/28 font-display font-bold text-sm rounded-xs cursor-pointer transition-colors"
              >
                <Database className="w-4 h-4 text-[#D2A071]" />
                <span>
                  {isEn
                    ? 'Inspect Raw NASA Data (/du-lieu)'
                    : 'Tra cứu Hồ sơ Dữ Liệu (/du-lieu)'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JourneysPage;
