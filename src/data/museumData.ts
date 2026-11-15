/**
 * BEYOND THE SIGNAL — Structured Museum Data, Provenance Sources & Curated NASA Manifest
 * Dataset Version: 1.0.0 · Last Researched: 11/11/2026
 * Source baseline: project-reference/DATA/missions.vi.json, sources.json, nasa_image_manifest.json
 */

export interface SourceRecord {
  id: string;
  title: string;
  url: string;
  supports: string[];
  source_type: string;
  last_checked: string;
}

export interface NasaMediaItem {
  id: string;
  manifest_id?: string;
  mission: 'opportunity' | 'pioneer-11' | 'surveyor-3' | 'viking-1' | 'sojourner' | 'spirit' | 'insight' | 'apollo-lrrr' | 'general' | 'archive';
  media_type: 'NASA_PHOTO' | 'NASA_DIAGRAM' | 'NASA_PHOTO_OR_DIAGRAM' | 'NASA_MISSION_REFERENCE' | 'COMMUNITY_ARTWORK';
  filename?: string;
  title: string;
  source_page: string;
  direct_asset_url: string | null;
  local_asset_url?: string;
  credit: string;
  caption_vi: string;
  alt_vi: string;
  note?: string;
  verified_page?: boolean;
  verification_state?: 'verified' | 'manual_curated' | 'needs_review';
}

export interface Instrument {
  name: string;
  group?: string;
  function_vi: string;
  description_extended_vi?: string;
  source_ids?: string[];
}

export type TimelineSemanticType =
  | 'launch'
  | 'orbit_insertion'
  | 'landing'
  | 'deployment'
  | 'flyby'
  | 'milestone'
  | 'last_contact'
  | 'last_data'
  | 'orbiter_end'
  | 'lander_end'
  | 'mission_end'
  | 'record_update';

export interface TimelineEvent {
  date: string;
  semantic_type?: TimelineSemanticType;
  semantic_label_vi?: string;
  timezone_note_vi?: string;
  title_vi: string;
  detail_vi: string;
  source?: string;
  source_ids?: string[];
  media_id?: string;
}

export interface Mission {
  id: string;
  name: string;
  official_designation: string;
  vehicle_type: string;
  destination: string;
  launch_date: string;
  launch_note_vi?: string;
  landing_date_reference?: {
    NASA_Science_key_date: string;
    NASA_end_of_mission_report: string;
    display_guidance_vi: string;
  };
  planned_primary_mission: {
    value: number;
    unit: string;
    meaning_vi: string;
  };
  last_communication: {
    date: string;
    sol?: number;
    context_vi: string;
  };
  formal_mission_end?: string;
  total_distance_km?: number;
  total_distance_miles?: number;
  mass_kg?: number;
  jupiter_flyby?: string;
  saturn_flyby?: string;
  saturn_closest_approach_km_approx?: number;
  last_nasa_ames_contact?: string;
  last_engineering_data_received?: string;
  science_goal_vi: string;
  key_discoveries_vi: string[];
  do_not_claim_vi?: string[];
  power_system_vi?: string;
  instruments: Instrument[];
  timeline: TimelineEvent[];
  sources: string[];
  source_ids: string[];
  hero_media_id: string;
  editorial_note_vi: string;
}

export interface SemanticDateMilestone {
  type: TimelineSemanticType;
  label_vi: string;
  value_display: string;
  iso_value: string | null;
  convention_note_vi?: string;
  needs_review?: boolean;
}

export interface SixPartExhibitStory {
  question: string;
  machine: string;
  journey: string;
  discovery: string;
  last_signal: string;
  legacy: string;
}

export interface ArchiveRecord {
  id: string;
  code_id: string; // e.g. SURVEYOR-3, VIKING-1, SOJOURNER, OPPORTUNITY, PIONEER-11
  name: string;
  display_name_vi: string;
  official_designation?: string;
  mission_name: string;
  host_mission_note_vi?: string;
  realm: 'THE MOON' | 'MARS' | 'DEEP SPACE';
  destination: 'Mặt Trăng' | 'Sao Hỏa' | 'Không gian sâu' | 'Sao Mộc / Sao Thổ' | 'Hệ Mặt Trời';
  hardware_type: 'Rover' | 'Spacecraft / Probe' | 'Lander' | 'Orbiter + Lander' | 'Micro-rover' | 'Passive Optical Retroreflector' | 'Stationary Lander';
  hardware_tags: string[];
  record_depth: 'introductory' | 'featured';
  verification_state: 'verified' | 'needs_review';
  status: 'Hoàn thành nhiệm vụ' | 'Ngừng liên lạc · Không gian sâu' | 'Đang hoạt động thụ động' | 'Ngừng hoạt động trên bề mặt' | 'Ngừng liên lạc · Sao Hỏa';
  active_period: string;
  launch_vehicle?: string;
  coordinates_or_location?: string;
  mass_info?: string;
  verified_model_3d_url?: string | null;
  // Level 1 — Quick Device Overview (3 core questions)
  quick_identity: {
    what_is_it: string;
    why_sent: string;
    what_makes_it_special: string;
    landing_or_operation_site: string;
    power_system_vi?: string;
    key_instruments: string[];
    key_metrics: { label: string; value: string; unit?: string; source_id: string }[];
    date_milestones: SemanticDateMilestone[];
  };
  summary_vi: string;
  primary_achievement_vi: string;
  key_facts_vi: string[];
  // Level 2 — Six-part exhibit story
  story: SixPartExhibitStory;
  timeline: TimelineEvent[];
  components: { name: string; role: string; source_ids: string[] }[];
  science_highlights_vi: string[];
  editorial_note_vi: string;
  source_url: string;
  source_ids: string[];
  credit: string;
  media_id: string;
  secondary_media_ids: string[];
  is_complete_exhibit: boolean;
  exhibit_slug?: string;
}

export interface YoungExplorerSubmission {
  id: string;
  title: string;
  creator_alias: string;
  age_or_grade: string;
  category: 'verified_fact' | 'scientific_interpretation' | 'artistic_expression' | 'fiction_reconstruction';
  submission_type: 'Tranh / Poster' | 'Audio' | 'Video / Animation' | 'Truyện tranh / PDF' | 'Mô hình 3D (GLB/GLTF)' | 'Truyện / Bài viết';
  related_mission: string;
  created_at: string;
  summary_vi: string;
  artist_statement_vi: string;
  optional_source?: string;
  reflection_prompts_responses: {
    prompt: string;
    response: string;
  }[];
  media_placeholder_description: string;
  preview_media_id?: string;
  audio_Select_hz?: number[];
  comic_panels?: { panel: number; caption: string; scene: string }[];
  story_paragraphs?: string[];
  model_specs?: { format: string; poly_count: string; scale: string; note: string };
  color_accent: string;
  is_sample: boolean;
}

export const SOURCES_CATALOG: Record<string, SourceRecord> = {
  "SRC-SUR-01": {
    id: "SRC-SUR-01",
    title: "Surveyor 3 — NASA Science",
    url: "https://science.nasa.gov/mission/surveyor-3/",
    supports: ["Mục tiêu nhiệm vụ", "Ngày phóng và hạ cánh", "Liên lạc cuối 04/05/1967", "Tầm với bộ lấy mẫu ~1,5 m, đào sâu ~18 cm", "6.326 ảnh truyền hình", "Apollo 12 thu hồi bộ phận"],
    source_type: "NASA mission page",
    last_checked: "11/11/2026"
  },
  "SRC-SUR-02": {
    id: "SRC-SUR-02",
    title: "Surveyor to the Moon (1966–1968) — NASA NSSDCA",
    url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/surveyor.html",
    supports: ["Thời điểm hạ cánh Surveyor 3 theo giờ UT (00:04 UT ngày 20/04/1967)", "Tọa độ hạ cánh", "Bối cảnh chương trình Surveyor"],
    source_type: "NASA data archive",
    last_checked: "11/11/2026"
  },
  "SRC-SUR-03": {
    id: "SRC-SUR-03",
    title: "Apollo 12 and Surveyor 3 — NASA Science",
    url: "https://science.nasa.gov/resource/apollo-12-and-surveyor-3/",
    supports: ["Phi hành gia Apollo 12 thăm Surveyor 3", "Ảnh tư liệu AS12-48-7134 và thu hồi bộ phận camera"],
    source_type: "NASA image/resource page",
    last_checked: "11/11/2026"
  },
  "SRC-SUR-04": {
    id: "SRC-SUR-04",
    title: "View of Surveyor III in Its Crater — NASA Science",
    url: "https://science.nasa.gov/resource/view-of-surveyor-iii-in-its-crater/",
    supports: ["Ảnh NASA/JSC AS12-48-7121 và mô tả Surveyor 3 trong miệng hố trên Mặt Trăng"],
    source_type: "NASA image/resource page",
    last_checked: "11/11/2026"
  },
  "SRC-VIK-01": {
    id: "SRC-VIK-01",
    title: "Viking 1 — NASA Science",
    url: "https://science.nasa.gov/mission/viking-1/",
    supports: ["Ngày phóng 20/08/1975 và vào quỹ đạo 19/06/1976", "Hạ cánh 20/07/1976 tại Chryse Planitia", "Ảnh bề mặt đầu tiên", "Thiết bị khoa học", "Tàu quỹ đạo kết thúc 07/08/1980"],
    source_type: "NASA mission page",
    last_checked: "11/11/2026"
  },
  "SRC-VIK-02": {
    id: "SRC-VIK-02",
    title: "First Photograph Taken On Mars Surface — NASA Photojournal",
    url: "https://science.nasa.gov/photojournal/first-photograph-taken-on-mars-surface/",
    supports: ["Ảnh đầu tiên chụp trên bề mặt Sao Hỏa từ Viking Lander 1 (PIA00381)", "Credit NASA/JPL"],
    source_type: "NASA Photojournal",
    last_checked: "11/11/2026"
  },
  "SRC-VIK-03": {
    id: "SRC-VIK-03",
    title: "Viking Spacecraft and Science — NASA Science",
    url: "https://science.nasa.gov/mission/viking/spacecraft-and-science/",
    supports: ["Các thiết bị khoa học và cấu tạo tàu đổ bộ Viking"],
    source_type: "NASA technical overview",
    last_checked: "11/11/2026"
  },
  "SRC-VIK-04": {
    id: "SRC-VIK-04",
    title: "Viking Lander 1 Spacecraft — NASA PDS Context Information",
    url: "https://pds.nasa.gov/ds-view/pds/viewContext.jsp?identifier=urn%3Anasa%3Apds%3Acontext%3Ainstrument_host%3Aspacecraft.vl1&version=1.2",
    supports: ["Thiết kế, cấu trúc và hệ thống kỹ thuật của Viking Lander 1"],
    source_type: "NASA Planetary Data System",
    last_checked: "11/11/2026"
  },
  "SRC-SOJ-01": {
    id: "SRC-SOJ-01",
    title: "Mars Pathfinder — NASA Science",
    url: "https://science.nasa.gov/mission/mars-pathfinder/",
    supports: ["Ngày phóng 04/12/1996 và hạ cánh 04/07/1997", "Địa điểm hạ cánh Ares Vallis", "Mục tiêu nhiệm vụ và tóm tắt kết thúc"],
    source_type: "NASA mission page",
    last_checked: "11/11/2026"
  },
  "SRC-SOJ-02": {
    id: "SRC-SOJ-02",
    title: "Pathfinder’s Rover, Airbags, & Martian Terrain — NASA Science",
    url: "https://science.nasa.gov/resource/pathfinders-rover-airbags-martian-terrain/",
    supports: ["Hình ảnh đầu tiên về rover Sojourner và hệ thống túi khí hạ cánh Pathfinder"],
    source_type: "NASA image/resource page",
    last_checked: "11/11/2026"
  },
  "SRC-SOJ-03": {
    id: "SRC-SOJ-03",
    title: "Mars Pathfinder Rover Traverse Image — NASA Science",
    url: "https://science.nasa.gov/resource/mars-pathfinder-rover-traverse-image/",
    supports: ["Hành trình 83 sol", "Nhiệm vụ dự kiến 7 ngày", "Dữ liệu cuối 27/09/1997 (10:23 UTC) và kết thúc nhiệm vụ 10/03/1998"],
    source_type: "NASA image/resource page",
    last_checked: "11/11/2026"
  },
  "SRC-SOJ-04": {
    id: "SRC-SOJ-04",
    title: "Sojourner & Yogi — NASA Science",
    url: "https://science.nasa.gov/resource/sojourner-yogi/",
    supports: ["Sử dụng thiết bị APXS trên tảng đá Yogi", "Kết quả phân tích thành phần đá ban đầu", "Ghi chú hoạt động 83 sol"],
    source_type: "NASA image/resource page",
    last_checked: "11/11/2026"
  },
  "SRC-OPP-01": {
    id: "SRC-OPP-01",
    title: "Opportunity — NASA Science",
    url: "https://science.nasa.gov/mission/mer-opportunity/",
    supports: ["Tổng quan sứ mệnh", "Thiết kế 90 sol", "Quãng đường 45,16 km", "Thiết bị khoa học", "Liên lạc cuối 10/06/2018", "Kết thúc sứ mệnh 13/02/2019", "Cập nhật kỷ lục Perseverance ngày 11/10/2026"],
    source_type: "NASA mission page",
    last_checked: "11/11/2026"
  },
  "SRC-OPP-02": {
    id: "SRC-OPP-02",
    title: "Opportunity and Its Mother Ship — NASA Photojournal",
    url: "https://science.nasa.gov/photojournal/opportunity-and-its-mother-ship/",
    supports: ["Ảnh rover và lander (PIA05180)", "Sáu bánh xe lăn khỏi lander ngày 31/01/2004 (PST)"],
    source_type: "NASA Photojournal",
    last_checked: "11/11/2026"
  },
  "SRC-OPP-03": {
    id: "SRC-OPP-03",
    title: "Opportunity Overlooking Endeavour Crater, Stereo View — NASA Science",
    url: "https://science.nasa.gov/resource/opportunity-overlooking-endeavour-crater-stereo-view/",
    supports: ["Hình ảnh và bối cảnh khảo sát miệng hố Endeavour rộng 22 km"],
    source_type: "NASA image/resource page",
    last_checked: "11/11/2026"
  },
  "SRC-OPP-04": {
    id: "SRC-OPP-04",
    title: "NASA’s Record-Setting Opportunity Rover Mission on Mars Comes to End — NASA",
    url: "https://www.nasa.gov/news-release/nasas-record-setting-opportunity-rover-mission-on-mars-comes-to-end/",
    supports: ["Bão bụi toàn hành tinh 2018", "Tín hiệu cuối cùng 10/06/2018", "NASA tuyên bố kết thúc sứ mệnh 13/02/2019"],
    source_type: "NASA news release",
    last_checked: "11/11/2026"
  },
  "SRC-OPP-05": {
    id: "SRC-OPP-05",
    title: "NASA’s Perseverance Sets Off-World Record for Total Distance Driven — NASA Science",
    url: "https://science.nasa.gov/mission/mer-opportunity/",
    supports: ["Cập nhật chính thức: Perseverance đã vượt qua mốc 45,16 km của Opportunity vào ngày 11/10/2026"],
    source_type: "NASA current mission update",
    last_checked: "11/11/2026"
  },
  "SRC-PIO-01": {
    id: "SRC-PIO-01",
    title: "Pioneer 11 — NASA Science",
    url: "https://science.nasa.gov/mission/pioneer-11/",
    supports: ["Ngày phóng 06/04/1973 (UTC)", "Bay qua Sao Mộc (03/12/1974) và Sao Thổ (01/09/1979)", "12 thiết bị khoa học", "Khối lượng 258,5 kg", "Liên lạc cuối 30/09/1995 và dữ liệu kỹ thuật cuối 24/11/1995"],
    source_type: "NASA mission page",
    last_checked: "11/11/2026"
  },
  "SRC-PIO-02": {
    id: "SRC-PIO-02",
    title: "Pioneer 11 at Saturn — NASA Science",
    url: "https://science.nasa.gov/resource/pioneer-11-at-saturn/",
    supports: ["Ảnh chụp Sao Thổ và Titan từ cự ly ~2.846.000 km", "Phát hiện vành F và các mặt trăng mới"],
    source_type: "NASA image/resource page",
    last_checked: "11/11/2026"
  },
  "SRC-PIO-03": {
    id: "SRC-PIO-03",
    title: "Radioisotope Power Systems Missions — NASA Science",
    url: "https://science.nasa.gov/planetary-science/programs/radioisotope-power-systems/missions/",
    supports: ["4 máy phát nhiệt điện đồng vị phóng xạ SNAP-19 (RTG) và 12 bộ sưởi đồng vị phóng xạ (RHU)"],
    source_type: "NASA technical overview",
    last_checked: "11/11/2026"
  },
  "SRC-PIO-04": {
    id: "SRC-PIO-04",
    title: "Pioneer Spacecraft Diagram — NASA Science",
    url: "https://science.nasa.gov/resource/pioneer-spacecraft-diagram/",
    supports: ["Sơ đồ cấu tạo và vị trí các thiết bị khoa học trên tàu Pioneer 10 và Pioneer 11"],
    source_type: "NASA image/resource page",
    last_checked: "11/11/2026"
  },
  "SRC-PIO-05": {
    id: "SRC-PIO-05",
    title: "Pioneer Plaque — NASA Science",
    url: "https://science.nasa.gov/resource/pioneer-plaque/",
    supports: ["Mục đích, hình khắc và thông điệp trên tấm bảng Pioneer Plaque"],
    source_type: "NASA image/resource page",
    last_checked: "11/11/2026"
  },
  "SRC-PIO-06": {
    id: "SRC-PIO-06",
    title: "Saturn, Rings, and Titan From Pioneer 11 (AMF-CF2AE57D) — NASA Science",
    url: "https://science.nasa.gov/image-detail/amf-cf2ae57d-b5f0-42ea-b5e3-c955208bc278/",
    supports: ["Ảnh Sao Thổ, vành đai và Titan do Pioneer 11 chụp ngày 01/09/1979", "Credit NASA/Ames", "Lưu ý rõ: Đây là ảnh thành tựu quan sát thiên văn, không phải ảnh chụp thân tàu"],
    source_type: "NASA image detail",
    last_checked: "11/11/2026"
  },
  "SRC-OPP-06": {
    id: "SRC-OPP-06",
    title: "Opportunity Rover Self-Portrait from 2007 (PIA15114) — NASA Photojournal",
    url: "https://science.nasa.gov/photojournal/opportunity-rover-self-portrait-from-2007/",
    supports: ["Ảnh tự chụp ghép (mosaic) từ camera toàn cảnh Pancam năm 2007 (Sol 1282–1284, PIA15114)", "Credit NASA/JPL-Caltech/Cornell", "Ảnh ghép kỹ thuật mosaic, không phải do robot khác chụp"],
    source_type: "NASA Photojournal",
    last_checked: "11/11/2026"
  },
  "SRC-OPP-07": {
    id: "SRC-OPP-07",
    title: "Mars Exploration Rover Opportunity (MER-B) 3D Model — NASA Science 3D Resources",
    url: "https://science.nasa.gov/3d-resources/mars-exploration-rover-opportunity-mer-b/",
    supports: ["Mô hình 3D tương tác chính thức đã xác minh của rover Opportunity (MER-B)"],
    source_type: "NASA 3D Resources",
    last_checked: "11/11/2026"
  },
  "SRC-SPI-01": {
    id: "SRC-SPI-01",
    title: "Mars Exploration Rovers Spirit and Opportunity: Science Highlights — NASA Science",
    url: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/science-highlights/",
    supports: ["Bánh xe trước bên phải bị kẹt kéo lê làm lộ lớp đất sáng màu giàu 90% silica tại Home Plate", "Mỏm đá Comanche chứa lượng lớn carbonate chứng minh môi trường nước trung tính hoặc kiềm nhẹ", "Rover Spirit hạ cánh hố Gusev tháng 01/2004", "Ngừng liên lạc 22/03/2010; NASA tuyên bố kết thúc nhiệm vụ 25/05/2011"],
    source_type: "NASA mission page",
    last_checked: "11/11/2026"
  },
  "SRC-SPI-02": {
    id: "SRC-SPI-02",
    title: "Spirit Discovers Silica-Rich Soil at Home Plate (PIA09403) — NASA Photojournal",
    url: "https://science.nasa.gov/photojournal/spirit-rover-silica-discovery/",
    supports: ["Ảnh chụp rãnh cát sáng màu do bánh xe kẹt của Spirit cày xới hé lộ trầm tích suối nước nóng hoặc lỗ phun thủy nhiệt cổ đại"],
    source_type: "NASA Photojournal",
    last_checked: "11/11/2026"
  },
  "SRC-SPI-03": {
    id: "SRC-SPI-03",
    title: "Comanche Carbonate Outcrops in Columbia Hills — NASA Science",
    url: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/science-highlights/",
    supports: ["Phân tích phổ Mini-TES và Mössbauer mỏm đá Comanche giàu magnesium-iron carbonate"],
    source_type: "NASA technical overview",
    last_checked: "11/11/2026"
  },
  "SRC-INS-01": {
    id: "SRC-INS-01",
    title: "NASA Retires InSight Mars Lander Mission After Years of Science — NASA",
    url: "https://www.nasa.gov/missions/insight/nasa-retires-insight-mars-lander-mission-after-years-of-science/",
    supports: ["Tàu đổ bộ cố định (Stationary Lander)", "Hạ cánh 26/11/2018 tại Elysium Planitia", "Tín hiệu cuối cùng 15/12/2022", "NASA tuyên bố kết thúc nhiệm vụ 21/12/2022 sau 2 lần không có tín hiệu phản hồi", "Bụi phủ kín pin mặt trời làm cạn năng lượng"],
    source_type: "NASA news release",
    last_checked: "11/11/2026"
  },
  "SRC-INS-02": {
    id: "SRC-INS-02",
    title: "InSight's Final Selfie (PIA25287) — NASA Photojournal",
    url: "https://science.nasa.gov/photojournal/insights-final-selfie/",
    supports: ["Ảnh tự chụp cuối cùng của InSight ngày 24/04/2022 (Sol 1211, PIA25287)", "Credit NASA/JPL-Caltech", "Lớp bụi đỏ dày đặc phủ kín thân tàu và pin mặt trời"],
    source_type: "NASA Photojournal",
    last_checked: "11/11/2026"
  },
  "SRC-INS-03": {
    id: "SRC-INS-03",
    title: "InSight Lander Instruments & Marsquakes — NASA Science",
    url: "https://science.nasa.gov/mission/insight/",
    supports: ["Máy đo địa chấn SEIS do CNES cung cấp cùng đối tác ghi nhận 1.319 trận động đất Sao Hỏa", "Đầu dò nhiệt HP3 (do DLR cung cấp) không đạt độ sâu thiết kế do đặc tính cơ học của đất — bài học khoa học thực nghiệm"],
    source_type: "NASA mission page",
    last_checked: "11/11/2026"
  },
  "SRC-LRR-01": {
    id: "SRC-LRR-01",
    title: "The Apollo Experiment That Keeps on Giving — NASA",
    url: "https://www.nasa.gov/missions/apollo/apollo-11/the-apollo-experiment-that-keeps-on-giving/",
    supports: ["Mảng gương phản xạ tia laser Lunar Laser Ranging Retroreflector (LRRR)", "Thiết bị quang học thụ động 100% không cần nguồn điện/pin", "Phi hành gia Apollo 11, 14 (100 lăng kính) và Apollo 15 (300 lăng kính) để lại trên Mặt Trăng", "Đo thời gian phản xạ xung laser với độ chính xác milimet", "Phát hiện Mặt Trăng rời xa Trái Đất ~3,8 cm/năm", "Thí nghiệm duy nhất của Apollo vẫn hoạt động liên tục sau hơn 55 năm"],
    source_type: "NASA mission overview",
    last_checked: "11/11/2026"
  },
  "SRC-LRR-02": {
    id: "SRC-LRR-02",
    title: "Apollo 14 Lunar Laser Ranging Retroreflector (AS14-67-9386) — NASA Apollo Lunar Surface Journal",
    url: "https://www.nasa.gov/history/alsj/a14/AS14-67-9386.jpg",
    supports: ["Ảnh cận cảnh mảng phản xạ góc khối Apollo 14 chụp ngày 05/02/1971", "Credit NASA", "Ghi chú phân biệt rõ: Thiết bị quang học thụ động không cần pin hay nguồn điện, không phải tấm pin mặt trời"],
    source_type: "NASA image archive",
    last_checked: "11/11/2026"
  },
  "SRC-IMG-01": {
    id: "SRC-IMG-01",
    title: "NASA Images and Media Usage Guidelines",
    url: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    supports: ["Quy định sử dụng hình ảnh NASA, ghi nhận tác quyền (credit), không hàm ý NASA bảo trợ"],
    source_type: "NASA usage guidelines",
    last_checked: "11/11/2026"
  }
};

export const NASA_MEDIA_CATALOG: Record<string, NasaMediaItem> = {
  "IMG-OPP-01": {
    id: "IMG-OPP-01",
    manifest_id: "IMG-OPP-01",
    mission: "opportunity",
    media_type: "NASA_PHOTO",
    filename: "opportunity_first_selfie_PIA22222.jpg",
    title: "Opportunity's First Selfie (PIA22222)",
    source_page: "https://science.nasa.gov/photojournal/opportunitys-first-selfie/",
    direct_asset_url: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia22/pia22222/PIA22222.jpg",
    local_asset_url: "/public/assets/nasa/opportunity_first_selfie_PIA22222.jpg",
    credit: "NASA/JPL-Caltech",
    caption_vi: "Chân dung ghép của rover Opportunity tại Perseverance Valley, được thực hiện để đánh dấu sol thứ 5.000 của nhiệm vụ.",
    alt_vi: "Chân dung tự chụp ghép từ Microscopic Imager của rover Opportunity tại Perseverance Valley vào dịp sol 5.000.",
    note: "Ảnh selfie ghép bằng Microscopic Imager trên cánh tay robot; rover hơi mờ nét vì camera được thiết kế để chụp cận cảnh bề mặt đá.",
    verified_page: true,
    verification_state: "verified"
  },
  "IMG-OPP-02": {
    id: "IMG-OPP-02",
    manifest_id: "IMG-OPP-02",
    mission: "opportunity",
    media_type: "NASA_PHOTO",
    filename: "opportunity_rover_and_lander_PIA05180.jpg",
    title: "Opportunity and Its Mother Ship (PIA05180)",
    source_page: "https://science.nasa.gov/photojournal/opportunity-and-its-mother-ship/",
    direct_asset_url: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia05/pia05180/PIA05180.jpg",
    local_asset_url: "/public/assets/nasa/opportunity_rover_and_lander_PIA05180.jpg",
    credit: "NASA/JPL",
    caption_vi: "Ảnh camera định hướng của Opportunity cho thấy rover ở phía trước bệ đổ bộ đã đưa nó tới Meridiani Planum.",
    alt_vi: "Rover Opportunity đứng phía trước bệ đổ bộ tại Meridiani Planum sau khi lăn bánh xuống bề mặt Sao Hỏa.",
    note: "Trang NASA ghi nhận sáu bánh xe lăn khỏi lander ngày 31/01/2004 theo giờ PST.",
    verified_page: true,
    verification_state: "verified"
  },
  "IMG-SUR-01": {
    id: "IMG-SUR-01",
    manifest_id: "IMG-SUR-01",
    mission: "surveyor-3",
    media_type: "NASA_PHOTO",
    filename: "apollo12_surveyor3_AS12-48-7134.jpg",
    title: "Apollo 12 and Surveyor 3 (AS12-48-7134)",
    source_page: "https://science.nasa.gov/resource/apollo-12-and-surveyor-3/",
    direct_asset_url: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/a/as12-48-7134.jpg",
    local_asset_url: "/public/assets/nasa/apollo12_surveyor3_AS12-48-7134.jpg",
    credit: "NASA",
    caption_vi: "Phi hành gia Apollo 12 đứng cạnh tàu Surveyor 3 trong lần hoạt động ngoài tàu thứ hai (tháng 11/1969); một số bộ phận của Surveyor được thu hồi đưa về Trái Đất.",
    alt_vi: "Phi hành gia Apollo 12 kiểm tra tàu đổ bộ Surveyor 3 trên bề mặt Mặt Trăng năm 1969.",
    note: "Ảnh tư liệu lịch sử chụp trong chuyến Apollo 12 năm 1969.",
    verified_page: true,
    verification_state: "verified"
  },
  "IMG-SUR-02": {
    id: "IMG-SUR-02",
    manifest_id: "IMG-SUR-02",
    mission: "surveyor-3",
    media_type: "NASA_PHOTO",
    filename: "surveyor3_in_crater_AS12-48-7121.jpg",
    title: "View of Surveyor III in Its Crater (AS12-48-7121)",
    source_page: "https://science.nasa.gov/resource/view-of-surveyor-iii-in-its-crater/",
    direct_asset_url: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/lunar-science/2023/09/as12-48-7121_orig.jpg",
    local_asset_url: "/public/assets/nasa/surveyor3_in_crater_AS12-48-7121.jpg",
    credit: "NASA/JSC",
    caption_vi: "Surveyor 3 nằm trên sườn miệng hố tại vùng Oceanus Procellarum, được chụp trong hoạt động ngoài tàu của Apollo 12.",
    alt_vi: "Tàu đổ bộ Surveyor 3 nằm trên sườn miệng hố tại Oceanus Procellarum trên Mặt Trăng.",
    note: "Ảnh tư liệu Surveyor 3 trên bề mặt Mặt Trăng.",
    verified_page: true,
    verification_state: "verified"
  },
  "IMG-VIK-01": {
    id: "IMG-VIK-01",
    manifest_id: "IMG-VIK-01",
    mission: "viking-1",
    media_type: "NASA_PHOTO",
    filename: "viking1_first_mars_surface_photo_PIA00381.jpg",
    title: "First Photograph Taken On Mars Surface (PIA00381)",
    source_page: "https://science.nasa.gov/photojournal/first-photograph-taken-on-mars-surface/",
    direct_asset_url: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia00/pia00381/PIA00381.jpg",
    local_asset_url: "/public/assets/nasa/viking1_first_mars_surface_photo_PIA00381.jpg",
    credit: "NASA/JPL",
    caption_vi: "Một trong những bức ảnh đầu tiên Viking 1 gửi về từ bề mặt Sao Hỏa, chỉ vài phút sau khi hạ cánh ngày 20/07/1976.",
    alt_vi: "Bức ảnh đầu tiên chụp bề mặt Sao Hỏa và chân đáp tàu đổ bộ Viking 1 ngày 20/07/1976.",
    note: "Trang NASA mô tả đây là bức ảnh đầu tiên được chụp trên bề mặt Sao Hỏa.",
    verified_page: true,
    verification_state: "verified"
  },
  "IMG-SOJ-01": {
    id: "IMG-SOJ-01",
    manifest_id: "IMG-SOJ-01",
    mission: "sojourner",
    media_type: "NASA_PHOTO",
    filename: "sojourner_yogi_PIA00766.jpg",
    title: "Sojourner & Yogi (PIA00766)",
    source_page: "https://science.nasa.gov/resource/sojourner-yogi/",
    direct_asset_url: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/downloadable_items/3/9/39851_PIA00766.jpg",
    local_asset_url: "/public/assets/nasa/sojourner_yogi_PIA00766.jpg",
    credit: "NASA/JPL",
    caption_vi: "Rover Sojourner đặt thiết bị quang phổ APXS lên tảng đá Yogi để khảo sát thành phần hóa học của đá.",
    alt_vi: "Rover sáu bánh Sojourner tiếp cận và đo quang phổ tảng đá Yogi trên Sao Hỏa.",
    note: "Trang nguồn giải thích APXS và những kết quả ban đầu về đá Yogi.",
    verified_page: true,
    verification_state: "verified"
  },
  "IMG-SOJ-02": {
    id: "IMG-SOJ-02",
    manifest_id: "IMG-SOJ-02",
    mission: "sojourner",
    media_type: "NASA_DIAGRAM",
    filename: "sojourner_traverse_path_PIA01238.jpg",
    title: "Mars Pathfinder Rover Traverse Image (PIA01238)",
    source_page: "https://science.nasa.gov/resource/mars-pathfinder-rover-traverse-image/",
    direct_asset_url: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/downloadable_items/3/9/39983_PIA01238.jpg",
    local_asset_url: "/public/assets/nasa/sojourner_traverse_path_PIA01238.jpg",
    credit: "NASA/JPL",
    caption_vi: "Sơ đồ đường đi của rover Sojourner trên bề mặt Sao Hỏa trong 83 sol hoạt động của nhiệm vụ Mars Pathfinder.",
    alt_vi: "Bản đồ đường di chuyển của rover Sojourner quanh trạm đổ bộ Mars Pathfinder trong 83 sol.",
    note: "Đường đi được tái dựng từ hình ảnh camera IMP và dữ liệu telemetry của rover.",
    verified_page: true,
    verification_state: "verified"
  },
  "IMG-PIO-01": {
    id: "IMG-PIO-01",
    manifest_id: "IMG-PIO-01",
    mission: "pioneer-11",
    media_type: "NASA_PHOTO",
    filename: "pioneer11_saturn_titan_739460main.jpg",
    title: "Pioneer 11 at Saturn / Saturn, Its Rings, and Titan",
    source_page: "https://science.nasa.gov/resource/pioneer-11-at-saturn/",
    direct_asset_url: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/7/739460main_ac79-9107.3-1.jpg",
    local_asset_url: "/public/assets/nasa/pioneer11_saturn_titan_739460main.jpg",
    credit: "NASA/Ames",
    caption_vi: "Sao Thổ và mặt trăng Titan trong ảnh do Pioneer 11 chụp ngày 01/09/1979 từ khoảng cách ~2.846.000 km (lưu ý: đây là ảnh do Pioneer 11 chụp cảnh Sao Thổ, không phải ảnh chụp thân tàu Pioneer 11).",
    alt_vi: "Sao Thổ cùng hệ thống vành đai và mặt trăng Titan trong bức ảnh do tàu Pioneer 11 chụp năm 1979.",
    note: "Đây là ảnh Pioneer 11 chụp Sao Thổ và Titan, không phải ảnh chụp bản thân tàu Pioneer 11.",
    verified_page: true,
    verification_state: "verified"
  },
  "IMG-PIO-02": {
    id: "IMG-PIO-02",
    manifest_id: "IMG-PIO-02",
    mission: "pioneer-11",
    media_type: "NASA_DIAGRAM",
    filename: "pioneer_spacecraft_instrument_diagram.jpg",
    title: "Pioneer Spacecraft Diagram (ACD97-0036-2)",
    source_page: "https://science.nasa.gov/resource/pioneer-spacecraft-diagram/",
    direct_asset_url: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/7/72410main_ACD97-0036-2-1.jpg",
    local_asset_url: "/public/assets/nasa/pioneer_spacecraft_instrument_diagram.jpg",
    credit: "NASA",
    caption_vi: "Sơ đồ cấu tạo và vị trí các thiết bị khoa học dùng chung cho hai tàu thăm dò Pioneer 10 và Pioneer 11.",
    alt_vi: "Sơ đồ kỹ thuật của NASA chú thích các thiết bị khoa học trên tàu Pioneer 10 và Pioneer 11.",
    note: "Sơ đồ dùng chung cho Pioneer 10 và Pioneer 11; chú thích nêu rõ điều này.",
    verified_page: true,
    verification_state: "verified"
  },
  "IMG-PIO-03": {
    id: "IMG-PIO-03",
    manifest_id: "IMG-PIO-03",
    mission: "pioneer-11",
    media_type: "NASA_PHOTO_OR_DIAGRAM",
    filename: "pioneer_plaque_manual_download_required.jpg",
    title: "Pioneer Plaque (A73-9015-2)",
    source_page: "https://science.nasa.gov/resource/pioneer-plaque/",
    direct_asset_url: "https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/09/7/739463main_a73-9015-2.jpg",
    local_asset_url: "/public/assets/nasa/pioneer_plaque_manual_download_required.jpg",
    credit: "NASA/Ames",
    caption_vi: "Tấm plaque nhôm mạ vàng gắn trên tàu Pioneer 10 và Pioneer 11 mang thông tin trực quan về nguồn gốc của con tàu và con người (đã chọn bản Original từ trang nguồn NASA).",
    alt_vi: "Tấm bảng nhôm mạ vàng Pioneer Plaque gắn trên khung tàu Pioneer.",
    note: "Đã kiểm tra trang nguồn NASA (https://science.nasa.gov/resource/pioneer-plaque/) và tải bản Original (A73-9015-2) cùng bản Detail of Diagram.",
    verified_page: true,
    verification_state: "manual_curated"
  },
  "IMG-OPP-PIA15114": {
    id: "IMG-OPP-PIA15114",
    manifest_id: "IMG-OPP-PIA15114",
    mission: "opportunity",
    media_type: "NASA_PHOTO",
    filename: "opportunity_self_portrait_2007_PIA15114.jpg",
    title: "Opportunity Rover Self-Portrait from 2007 (PIA15114)",
    source_page: "https://science.nasa.gov/photojournal/opportunity-rover-self-portrait-from-2007/",
    direct_asset_url: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia15/pia15114/PIA15114.jpg",
    local_asset_url: "/public/assets/nasa/opportunity_self_portrait_2007_PIA15114.jpg",
    credit: "NASA/JPL-Caltech/Cornell",
    caption_vi: "Ảnh chân dung tự chụp ghép (mosaic) của Opportunity năm 2007 (Sol 1282–1284, mã PIA15114) bằng camera toàn cảnh Pancam để đánh giá độ phủ bụi của pin mặt trời sau trận bão bụi toàn hành tinh (đây là ảnh ghép mosaic từ camera trên cần, không phải do robot khác chụp).",
    alt_vi: "Chân dung tự chụp ghép mosaic từ Pancam của rover Opportunity năm 2007 tại miệng hố Victoria.",
    note: "Ảnh ghép mosaic tự chụp từ Pancam; rover nhìn xuống sàn miệng hố Victoria.",
    verified_page: true,
    verification_state: "verified"
  },
  "IMG-SPI-01": {
    id: "IMG-SPI-01",
    manifest_id: "IMG-SPI-01",
    mission: "spirit",
    media_type: "NASA_PHOTO",
    filename: "spirit_silica_soil_home_plate_PIA09403.jpg",
    title: "Spirit Discovers Silica-Rich Soil at Home Plate (PIA09403)",
    source_page: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/science-highlights/",
    direct_asset_url: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia09/pia09403/PIA09403.jpg",
    local_asset_url: "/public/assets/nasa/spirit_silica_soil_home_plate_PIA09403.jpg",
    credit: "NASA/JPL/Cornell",
    caption_vi: "Vệt đất sáng màu giàu silica (đạt 90% tinh khiết) tại Home Plate do bánh xe trước bên phải bị kẹt của rover Spirit cày xới (tháng 3/2007, mã PIA09403). Bằng chứng cho thấy hoạt động suối nước nóng hoặc hơi thủy nhiệt cổ đại từng tồn tại trên Sao Hỏa.",
    alt_vi: "Vệt đất sáng màu giàu silica do bánh xe kẹt của rover Spirit kéo lê làm lộ ra tại Home Plate.",
    note: "Phát hiện tình cờ từ chiếc bánh xe hỏng kéo lê làm tróc lớp cát đỏ bề mặt.",
    verified_page: true,
    verification_state: "verified"
  },
  "IMG-SPI-02": {
    id: "IMG-SPI-02",
    manifest_id: "IMG-SPI-02",
    mission: "spirit",
    media_type: "NASA_PHOTO",
    filename: "spirit_comanche_outcrop_carbonate.jpg",
    title: "Comanche Carbonate Outcrops in Columbia Hills",
    source_page: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/science-highlights/",
    direct_asset_url: "https://images-assets.nasa.gov/image/PIA13175/PIA13175~orig.jpg",
    local_asset_url: "/public/assets/nasa/spirit_comanche_outcrop_carbonate.jpg",
    credit: "NASA/JPL-Caltech/Cornell University",
    caption_vi: "Mỏm đá Comanche ở vùng đồi Columbia Hills chứa hàm lượng lớn khoáng vật magnesium-iron carbonate, chứng minh môi trường nước cổ đại tại đây từng có tính kiềm nhẹ hoặc trung tính, thuận lợi hơn cho hóa học tiền sinh học.",
    alt_vi: "Mỏm đá Comanche giàu carbonate được rover Spirit khảo sát tại Columbia Hills.",
    note: "Phát hiện carbonate tại Comanche giúp giải thích số phận của bầu khí quyển CO2 cổ xưa trên Sao Hỏa.",
    verified_page: true,
    verification_state: "verified"
  },
  "IMG-INS-01": {
    id: "IMG-INS-01",
    manifest_id: "IMG-INS-01",
    mission: "insight",
    media_type: "NASA_PHOTO",
    filename: "insight_final_selfie_PIA25287.jpg",
    title: "InSight's Final Selfie (PIA25287)",
    source_page: "https://science.nasa.gov/photojournal/insights-final-selfie/",
    direct_asset_url: "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia25/pia25287/PIA25287.jpg",
    local_asset_url: "/public/assets/nasa/insight_final_selfie_PIA25287.jpg",
    credit: "NASA/JPL-Caltech",
    caption_vi: "Ảnh tự chụp chân dung cuối cùng của InSight ngày 24/04/2022 (Sol 1211, mã PIA25287). Lớp bụi đỏ dày đặc phủ kín thân tàu và các tấm pin mặt trời hình tròn trước khi cánh tay robot được hạ xuống lần cuối.",
    alt_vi: "Ảnh tự chụp chân dung cuối cùng của tàu đổ bộ InSight phủ đầy bụi đất Sao Hỏa.",
    note: "Ảnh ghép cho thấy bụi phủ dày trên tàu và pin mặt trời, làm giảm năng lượng trước khi tàu ngừng liên lạc ngày 15/12/2022.",
    verified_page: true,
    verification_state: "verified"
  },
  "IMG-LRR-01": {
    id: "IMG-LRR-01",
    manifest_id: "IMG-LRR-01",
    mission: "apollo-lrrr",
    media_type: "NASA_PHOTO",
    filename: "apollo14_lrrr_retroreflector_AS14-67-09386.jpg",
    title: "Apollo 14 Lunar Laser Ranging Retroreflector (AS14-67-9386)",
    source_page: "https://www.nasa.gov/missions/apollo/apollo-11/the-apollo-experiment-that-keeps-on-giving/",
    direct_asset_url: "https://images-assets.nasa.gov/image/as14-67-09386/as14-67-09386~medium.jpg",
    local_asset_url: "/public/assets/nasa/apollo14_lrrr_retroreflector_AS14-67-09386.jpg",
    credit: "NASA",
    caption_vi: "Ảnh chụp cận cảnh mảng gương phản xạ tia laser Lunar Ranging Retroreflector (LRRR) của Apollo 14 ngày 05/02/1971 trên Mặt Trăng (mã AS14-67-9386). Thiết bị quang học thụ động không cần nguồn điện, đo khoảng cách Trái Đất - Mặt Trăng chính xác tới từng milimet (không phải tấm pin mặt trời).",
    alt_vi: "Mảng phản xạ laser Apollo 14 gồm 100 lăng kính góc khối đặt trên bề mặt Mặt Trăng.",
    note: "Thiết bị quang học thụ động không cần pin hay nguồn điện; phản xạ chùm tia laser từ các đài thiên văn Trái Đất.",
    verified_page: true,
    verification_state: "verified"
  },
  "IMG-LRR-02": {
    id: "IMG-LRR-02",
    manifest_id: "IMG-LRR-02",
    mission: "apollo-lrrr",
    media_type: "NASA_PHOTO",
    filename: "apollo11_aldrin_lrrr_deployment.jpg",
    title: "Apollo 11 Astronaut Deploying Laser Retroreflector (AS11-40-5952)",
    source_page: "https://www.nasa.gov/missions/apollo/apollo-11/the-apollo-experiment-that-keeps-on-giving/",
    direct_asset_url: "https://images-assets.nasa.gov/image/6900959/6900959~medium.jpg",
    local_asset_url: "/public/assets/nasa/apollo11_aldrin_lrrr_deployment.jpg",
    credit: "NASA",
    caption_vi: "Phi hành gia Buzz Aldrin triển khai mảng gương phản xạ laser LRRR tại Biển Tĩnh Lặng trong chuyến Apollo 11 tháng 7/1969. Thí nghiệm đo khoảng cách Trái Đất–Mặt Trăng và chứng minh Mặt Trăng rời xa Trái Đất ~3,8 cm/năm.",
    alt_vi: "Phi hành gia Buzz Aldrin triển khai thí nghiệm gương phản xạ laser trên Mặt Trăng năm 1969.",
    note: "Thí nghiệm duy nhất của chương trình Apollo còn tiếp tục gửi về dữ liệu khoa học sau hơn nửa thế kỷ.",
    verified_page: true,
    verification_state: "verified"
  }
};

// Alias keys for components & hotspots
NASA_MEDIA_CATALOG.opportunity_self_portrait_2004 = {
  id: "opportunity_self_portrait_2004",
  mission: "opportunity",
  media_type: "NASA_PHOTO",
  title: "Opportunity Solar Panels Seen From Above (Pancam Mosaic)",
  source_page: "https://science.nasa.gov/mission/mer-opportunity/",
  direct_asset_url: "https://assets.science.nasa.gov/content/dam/science/psd/solar/internal_resources/3447/solar_panels_on_rover_seen_from_above.jpeg",
  local_asset_url: "/public/assets/nasa/opportunity_self_portrait_2004.jpg",
  credit: "NASA/JPL-Caltech/Cornell/ASU",
  caption_vi: "Ảnh ghép từ camera toàn cảnh Pancam nhìn xuống hệ thống tấm pin Mặt Trời và thân xe tự hành Opportunity trên Sao Hỏa.",
  alt_vi: "Hệ thống tấm pin Mặt Trời và phần thân của rover Opportunity nhìn từ trên xuống.",
  verified_page: true,
  verification_state: "verified"
};
NASA_MEDIA_CATALOG.opportunity_self_portrait_2014 = NASA_MEDIA_CATALOG["IMG-OPP-01"];
NASA_MEDIA_CATALOG.opportunity_rover_and_lander = NASA_MEDIA_CATALOG["IMG-OPP-02"];
NASA_MEDIA_CATALOG.opportunity_last_message = {
  id: "opportunity_last_message",
  mission: "opportunity",
  media_type: "NASA_PHOTO",
  title: "Last Images Opportunity Took (PIA22930)",
  source_page: "https://science.nasa.gov/resource/last-images-opportunity-took/",
  direct_asset_url: "https://assets.science.nasa.gov/content/dam/science/psd/mars/resources/detail_files/2/22340_PIA22930-246-combo.jpg",
  local_asset_url: "/public/assets/nasa/opportunity_last_message_PIA22930.jpg",
  credit: "NASA/JPL-Caltech/Cornell/ASU",
  caption_vi: "Hai khung hình thu nhỏ cuối cùng mà Opportunity chụp ngày 10/06/2018 (Sol 5.111), ghi lại Mặt Trời mờ ảo bị che khuất bởi cơn bão bụi toàn hành tinh.",
  alt_vi: "Hai khung hình cuối cùng chụp Mặt Trời mờ nhạt trong cơn bão bụi Sao Hỏa ngày 10/06/2018.",
  verified_page: true,
  verification_state: "verified"
};
NASA_MEDIA_CATALOG.opportunity_final_panorama = {
  id: "opportunity_final_panorama",
  mission: "opportunity",
  media_type: "NASA_PHOTO",
  title: "Opportunity Rover's Final Mars Images — Perseverance Valley (PIA22908)",
  source_page: "https://science.nasa.gov/resource/opportunity-rovers-final-mars-images/",
  direct_asset_url: "https://assets.science.nasa.gov/content/dam/science/psd/solar/2023/09/p/i/a/PIA-22908-LegacyPan-False-NASA.jpg",
  local_asset_url: "/public/assets/nasa/opportunity_final_panorama_PIA22908.jpg",
  credit: "NASA/JPL-Caltech/Cornell/ASU",
  caption_vi: "Bức toàn cảnh 360 độ tại Perseverance Valley ghép từ 354 bức ảnh Pancam chụp từ ngày 13/05 đến 10/06/2018 trước khi mất liên lạc.",
  alt_vi: "Toàn cảnh 360 độ tại Perseverance Valley do Opportunity chụp trước khi mất liên lạc.",
  verified_page: true,
  verification_state: "verified"
};
NASA_MEDIA_CATALOG.pioneer_spacecraft_diagram = NASA_MEDIA_CATALOG["IMG-PIO-02"];
NASA_MEDIA_CATALOG.pioneer_plaque = NASA_MEDIA_CATALOG["IMG-PIO-03"];
NASA_MEDIA_CATALOG.pioneer_plaque_diagram = {
  id: "pioneer_plaque_diagram",
  mission: "pioneer-11",
  media_type: "NASA_DIAGRAM",
  title: "Pioneer Plaque — Detail of Diagram",
  source_page: "https://science.nasa.gov/resource/pioneer-plaque/",
  direct_asset_url: "https://assets.science.nasa.gov/content/dam/science/psd/solar/internal_resources/709/Pioneer_Plaque-1.png",
  local_asset_url: "/public/assets/nasa/pioneer_plaque_diagram.png",
  credit: "NASA/Ames",
  caption_vi: "Sơ đồ chi tiết các ký hiệu vật lý và thiên văn học trên tấm bảng Pioneer Plaque (bản Detail of Diagram từ trang nguồn NASA).",
  alt_vi: "Sơ đồ chi tiết các biểu tượng khắc trên tấm bảng Pioneer Plaque.",
  verified_page: true,
  verification_state: "manual_curated"
};
NASA_MEDIA_CATALOG.pioneer_saturn_titan = NASA_MEDIA_CATALOG["IMG-PIO-01"];
NASA_MEDIA_CATALOG.surveyor3_apollo12_visit = NASA_MEDIA_CATALOG["IMG-SUR-01"];
NASA_MEDIA_CATALOG.surveyor3_crater_view = NASA_MEDIA_CATALOG["IMG-SUR-02"];
NASA_MEDIA_CATALOG.viking1_first_mars_photo = NASA_MEDIA_CATALOG["IMG-VIK-01"];
NASA_MEDIA_CATALOG.sojourner_yogi_rock = NASA_MEDIA_CATALOG["IMG-SOJ-01"];
NASA_MEDIA_CATALOG.sojourner_airbags_terrain = NASA_MEDIA_CATALOG["IMG-SOJ-02"];

export const ARCHIVE_RECORDS: ArchiveRecord[] = [
  {
    id: "surveyor-3",
    code_id: "SURVEYOR-3",
    name: "Surveyor 3",
    display_name_vi: "Surveyor 3 — Người khảo sát Mặt Trăng",
    official_designation: "Surveyor 3 Lunar Lander",
    mission_name: "Surveyor Program (Surveyor 3)",
    realm: "THE MOON",
    destination: "Mặt Trăng",
    hardware_type: "Lander",
    hardware_tags: ["Lander", "Lunar surface sampler"],
    record_depth: "introductory",
    verification_state: "verified",
    status: "Hoàn thành nhiệm vụ",
    active_period: "17/04/1967 – 04/05/1967 (UTC)",
    coordinates_or_location: "Oceanus Procellarum (Đại dương Bão tố)",
    mass_info: "997,9 kg (khối lượng phóng theo danh mục NASA)",
    verified_model_3d_url: null,
    quick_identity: {
      what_is_it: "Tàu đổ bộ Mặt Trăng không người lái",
      why_sent: "Thử nghiệm hạ cánh mềm, chụp ảnh và kiểm tra tính chất cơ học của đất Mặt Trăng",
      what_makes_it_special: "Thiết bị lấy mẫu bề mặt có thể vươn tới khoảng 1,5 m và đào sâu khoảng 18 cm; các bộ phận của tàu được Apollo 12 thu hồi để nghiên cứu trên Trái Đất",
      landing_or_operation_site: "Oceanus Procellarum (Ocean of Storms)",
      key_instruments: ["TV camera", "Surface sampler", "Descent radar and propulsion"],
      key_metrics: [
        { label: "Ảnh truyền hình gửi về", value: "6.326", unit: "ảnh TV", source_id: "SRC-SUR-01" },
        { label: "Tầm với bộ lấy mẫu", value: "~1,5", unit: "m", source_id: "SRC-SUR-01" },
        { label: "Độ sâu rãnh đào", value: "~18", unit: "cm", source_id: "SRC-SUR-01" },
        { label: "Khối lượng (NASA công bố)", value: "997,9", unit: "kg", source_id: "SRC-SUR-01" }
      ],
      date_milestones: [
        { type: "launch", label_vi: "Ngày phóng (UTC)", value_display: "17/04/1967", iso_value: "1967-04-17" },
        { type: "landing", label_vi: "Ngày hạ cánh (UTC)", value_display: "20/04/1967 (00:04 UT)", iso_value: "1967-04-20", convention_note_vi: "Một số tư liệu ảnh ghi 19/04/1967 theo giờ địa phương Mỹ" },
        { type: "last_contact", label_vi: "Liên lạc cuối", value_display: "04/05/1967", iso_value: "1967-05-04" },
        { type: "milestone", label_vi: "Apollo 12 tiếp cận", value_display: "19/11/1969", iso_value: "1969-11-19" }
      ]
    },
    summary_vi: "Surveyor 3 là tàu đổ bộ tự động của NASA, được gửi đến Mặt Trăng để kiểm tra khả năng hạ cánh mềm và khảo sát cơ học của lớp đất mặt. Camera truyền hình và thiết bị lấy mẫu đã giúp các nhà khoa học đánh giá bề mặt có thể chịu được tải trọng của tàu đổ bộ Apollo hay không.",
    primary_achievement_vi: "Chứng minh đất Mặt Trăng tại vị trí khảo sát đủ sức chịu tải cho tàu đổ bộ Apollo, truyền về 6.326 ảnh truyền hình và trở thành hiện vật ngoài Trái Đất được phi hành gia Apollo 12 trực tiếp thăm và thu hồi bộ phận.",
    key_facts_vi: [
      "Kiểm tra khả năng chịu tải của đất Mặt Trăng tại địa điểm hạ cánh.",
      "Thực hiện các phép đào rãnh, bearing tests và impact tests (vươn ~1,5 m, đào sâu ~18 cm).",
      "Truyền về 6.326 ảnh truyền hình về khu vực xung quanh.",
      "Phi hành gia Conrad và Bean (Apollo 12) thu hồi camera và một số bộ phận vào tháng 11/1969."
    ],
    story: {
      question: "Mặt đất Mặt Trăng có đủ vững để đỡ một tàu đổ bộ có người lái không?",
      machine: "Một tàu đổ bộ có camera truyền hình, chân đáp và bộ lấy mẫu cơ học bề mặt. Bộ lấy mẫu có thể đào rãnh và thực hiện các phép thử trên đất.",
      journey: "Surveyor 3 phóng ngày 17/04/1967 và hạ cánh mềm ngày 20/04/1967 theo mốc UTC. Trong quá trình hạ cánh, tàu nảy lên hai lần trước khi ổn định trên bề mặt.",
      discovery: "Các phép thử cho thấy đất Mặt Trăng tại vị trí khảo sát có sức chịu tải đủ để hỗ trợ tàu đổ bộ Apollo. Tàu truyền về 6.326 ảnh truyền hình.",
      last_signal: "Liên lạc cuối với Surveyor 3 diễn ra ngày 04/05/1967, sau khi đêm Mặt Trăng bắt đầu.",
      legacy: "Tháng 11/1969, phi hành gia Apollo 12 tiếp cận Surveyor 3 và thu hồi camera cùng một số bộ phận để phân tích tác động của môi trường Mặt Trăng sau khoảng hai năm rưỡi."
    },
    timeline: [
      { date: "17/04/1967 (UTC)", semantic_type: "launch", semantic_label_vi: "Phóng (UTC)", title_vi: "Phóng từ Trái Đất", detail_vi: "Surveyor 3 bắt đầu hành trình tới Mặt Trăng.", source_ids: ["SRC-SUR-01"] },
      { date: "20/04/1967 (00:04 UT)", semantic_type: "landing", semantic_label_vi: "Hạ cánh (UTC)", timezone_note_vi: "Mốc 00:04 UT ngày 20/04/1967 (tương ứng tối 19/04 theo giờ Mỹ)", title_vi: "Hạ cánh mềm tại Oceanus Procellarum", detail_vi: "Tàu hạ cánh tại Oceanus Procellarum theo mốc UTC sau khi nảy lên hai lần.", source_ids: ["SRC-SUR-01", "SRC-SUR-02"], media_id: "IMG-SUR-02" },
      { date: "04/05/1967", semantic_type: "last_contact", semantic_label_vi: "Liên lạc cuối", title_vi: "Liên lạc cuối cùng", detail_vi: "NASA ghi nhận đây là lần liên lạc cuối với tàu sau khi đêm Mặt Trăng bắt đầu.", source_ids: ["SRC-SUR-01"] },
      { date: "19/11/1969", semantic_type: "milestone", semantic_label_vi: "Thu hồi hiện vật", title_vi: "Apollo 12 thăm hiện vật", detail_vi: "Phi hành gia Pete Conrad và Alan Bean thu hồi camera và một số bộ phận của Surveyor 3 để đưa về Trái Đất nghiên cứu.", source_ids: ["SRC-SUR-03", "SRC-SUR-04"], media_id: "IMG-SUR-01" }
    ],
    components: [
      { name: "TV camera", role: "Ghi lại 6.326 ảnh bề mặt và hỗ trợ quan sát các thí nghiệm cơ học đất.", source_ids: ["SRC-SUR-01"] },
      { name: "Surface sampler", role: "Vươn tới ~1,5 m, đào rãnh sâu ~18 cm, thao tác với đất và thực hiện phép thử chịu tải.", source_ids: ["SRC-SUR-01", "SRC-SUR-02"] },
      { name: "Descent radar and propulsion", role: "Hỗ trợ quá trình hạ cánh; sự cố ngắt động cơ khiến tàu nảy lên hai lần trước khi ổn định.", source_ids: ["SRC-SUR-01"] }
    ],
    science_highlights_vi: [
      "Kiểm tra khả năng chịu tải của đất Mặt Trăng tại địa điểm hạ cánh.",
      "Thực hiện các phép đào rãnh, bearing tests và impact tests.",
      "Truyền về 6.326 ảnh truyền hình về khu vực xung quanh."
    ],
    editorial_note_vi: "Một số trang tư liệu ảnh của NASA ghi ngày 19/04/1967, trong khi trang nhiệm vụ Surveyor 3 và dữ liệu NSSDCA ghi thời điểm hạ cánh 00:04 UT ngày 20/04/1967. Trên website dùng ngày UTC 20/04/1967 và có chú thích quy ước thời gian khi đối chiếu ảnh lịch sử.",
    source_url: "https://science.nasa.gov/mission/surveyor-3/",
    source_ids: ["SRC-SUR-01", "SRC-SUR-02", "SRC-SUR-03", "SRC-SUR-04"],
    credit: "NASA / JSC",
    media_id: "IMG-SUR-01",
    secondary_media_ids: ["IMG-SUR-02"],
    is_complete_exhibit: false
  },
  {
    id: "viking-1",
    code_id: "VIKING-1",
    name: "Viking 1",
    display_name_vi: "Viking 1 — Người mở đường trên Sao Hỏa",
    official_designation: "Viking 1 Orbiter & Viking 1 Lander",
    mission_name: "Viking Program (Viking 1)",
    host_mission_note_vi: "Hệ thống gồm 2 phần tách biệt: Tàu quỹ đạo (Viking 1 Orbiter) và Tàu đổ bộ (Viking 1 Lander).",
    realm: "MARS",
    destination: "Sao Hỏa",
    hardware_type: "Orbiter + Lander",
    hardware_tags: ["Orbiter", "Lander"],
    record_depth: "introductory",
    verification_state: "needs_review",
    status: "Hoàn thành nhiệm vụ",
    active_period: "20/08/1975 – Tháng 11/1982",
    coordinates_or_location: "Chryse Planitia, Sao Hỏa (Vị trí Lander)",
    mass_info: "Lander: 2 SNAP-19 RTG · Orbiter: Pin Mặt Trời",
    verified_model_3d_url: null,
    quick_identity: {
      what_is_it: "Hệ thống tàu quỹ đạo và tàu đổ bộ Sao Hỏa",
      why_sent: "Chụp ảnh, lập bản đồ, nghiên cứu bề mặt và khí quyển, đồng thời thực hiện thí nghiệm tìm dấu hiệu sự sống",
      what_makes_it_special: "Tàu đổ bộ Viking 1 là tàu NASA đầu tiên hạ cánh thành công trên Sao Hỏa và gửi ảnh từ bề mặt về Trái Đất",
      landing_or_operation_site: "Chryse Planitia",
      power_system_vi: "Lander: hai máy phát nhiệt điện đồng vị phóng xạ SNAP-19 RTG; Orbiter: năng lượng Mặt Trời",
      key_instruments: [
        "Facsimile cameras",
        "Gas chromatograph mass spectrometer (GCMS)",
        "X-ray fluorescence spectrometer",
        "Biology experiments",
        "Weather instrument package",
        "Remote sampler arm"
      ],
      key_metrics: [
        { label: "Ảnh chụp từ cả 2 tàu quỹ đạo Viking 1 & 2", value: "52.663", unit: "ảnh", source_id: "SRC-VIK-01" },
        { label: "Tỷ lệ lập bản đồ (cả chương trình Viking)", value: "~97%", unit: "bề mặt", source_id: "SRC-VIK-01" },
        { label: "Nguồn điện Lander", value: "2", unit: "SNAP-19 RTG", source_id: "SRC-VIK-03" }
      ],
      date_milestones: [
        { type: "launch", label_vi: "Ngày phóng (UTC)", value_display: "20/08/1975", iso_value: "1975-08-20" },
        { type: "orbit_insertion", label_vi: "Vào quỹ đạo Sao Hỏa", value_display: "19/06/1976", iso_value: "1976-06-19" },
        { type: "landing", label_vi: "Lander hạ cánh", value_display: "20/07/1976", iso_value: "1976-07-20" },
        { type: "orbiter_end", label_vi: "Tàu quỹ đạo kết thúc", value_display: "07/08/1980", iso_value: "1980-08-07" },
        { type: "lander_end", label_vi: "Tàu đổ bộ ngừng hoạt động", value_display: "Tháng 11/1982", iso_value: "1982-11", convention_note_vi: "Hiển thị theo tháng/năm do các trang tóm tắt NASA ghi ngày cụ thể khác nhau", needs_review: true }
      ]
    },
    summary_vi: "Viking 1 là một cặp tàu gồm tàu quỹ đạo và tàu đổ bộ. Sứ mệnh giúp NASA khảo sát Sao Hỏa từ quỹ đạo, hạ cánh an toàn và nghiên cứu bề mặt, khí quyển cũng như khả năng tồn tại dấu hiệu sinh học.",
    primary_achievement_vi: "Tàu đổ bộ Viking 1 là tàu NASA đầu tiên hạ cánh thành công trên Sao Hỏa và gửi những bức ảnh đầu tiên chụp ngay trên bề mặt Sao Hỏa về Trái Đất.",
    key_facts_vi: [
      "Tàu đổ bộ Viking 1 ghi lại ảnh đầu tiên từ bề mặt Sao Hỏa của NASA (ngày 20/07/1976).",
      "Hai tàu quỹ đạo Viking 1 và Viking 2 cộng lại đã trả về 52.663 ảnh và lập bản đồ khoảng 97% bề mặt Sao Hỏa.",
      "Các thí nghiệm tìm sự sống không phát hiện bằng chứng rõ ràng về sự sống; không diễn giải thành kết luận rằng Sao Hỏa chưa từng có sự sống."
    ],
    story: {
      question: "Con người có thể hạ cánh an toàn, quan sát và phân tích đất Sao Hỏa từ xa không?",
      machine: "Viking 1 gồm một tàu quỹ đạo mang hệ thống chụp ảnh và lập bản đồ, cùng tàu đổ bộ có camera quét, cánh tay lấy mẫu, phòng thí nghiệm và cảm biến khí tượng.",
      journey: "Phóng ngày 20/08/1975; đi vào quỹ đạo Sao Hỏa ngày 19/06/1976; tàu đổ bộ chạm xuống Chryse Planitia ngày 20/07/1976.",
      discovery: "Viking mở rộng hiểu biết về địa hình, khí hậu, đất và thành phần khí quyển Sao Hỏa. Các thí nghiệm sinh học không đưa ra bằng chứng rõ ràng về sự sống.",
      last_signal: "Tàu quỹ đạo kết thúc hoạt động ngày 07/08/1980. Tàu đổ bộ ngừng hoạt động vào tháng 11/1982; NASA có các trang tóm tắt ghi ngày khác nhau trong tháng, vì vậy hồ sơ hiển thị cấp tháng/năm kèm nhãn lưu ý biên tập.",
      legacy: "Viking thiết lập nền tảng cho các nhiệm vụ đổ bộ và nghiên cứu Sao Hỏa về sau, với ảnh bề mặt và các phép đo tại chỗ có giá trị lịch sử."
    },
    timeline: [
      { date: "20/08/1975 (UTC)", semantic_type: "launch", semantic_label_vi: "Phóng (UTC)", title_vi: "Phóng trên tên lửa Titan IIIE-Centaur", detail_vi: "Viking 1 rời Trái Đất trên tên lửa Titan IIIE-Centaur.", source_ids: ["SRC-VIK-01"] },
      { date: "19/06/1976", semantic_type: "orbit_insertion", semantic_label_vi: "Vào quỹ đạo", title_vi: "Đi vào quỹ đạo Sao Hỏa", detail_vi: "Tàu quỹ đạo Viking 1 bắt đầu khảo sát hành tinh và vị trí hạ cánh.", source_ids: ["SRC-VIK-01"] },
      { date: "20/07/1976", semantic_type: "landing", semantic_label_vi: "Hạ cánh", title_vi: "Hạ cánh tại Chryse Planitia", detail_vi: "Tàu đổ bộ gửi những hình ảnh đầu tiên từ bề mặt Sao Hỏa về Trái Đất.", source_ids: ["SRC-VIK-01", "SRC-VIK-02"], media_id: "IMG-VIK-01" },
      { date: "07/08/1980", semantic_type: "orbiter_end", semantic_label_vi: "Kết thúc tàu quỹ đạo", title_vi: "Kết thúc hoạt động tàu quỹ đạo", detail_vi: "NASA ghi nhận tàu quỹ đạo dừng hoạt động sau khi cạn nhiên liệu điều khiển tư thế.", source_ids: ["SRC-VIK-01"] },
      { date: "Tháng 11/1982", semantic_type: "lander_end", semantic_label_vi: "Lander ngừng hoạt động", timezone_note_vi: "Hiển thị cấp tháng/năm (cần curator đối chiếu ngày cụ thể giữa các trang tóm tắt NASA)", title_vi: "Tàu đổ bộ ngừng hoạt động", detail_vi: "Chỉ hiển thị tháng/năm do các trang NASA tóm tắt không thống nhất ngày cụ thể trong tháng 11/1982.", source_ids: ["SRC-VIK-01", "SRC-VIK-03"] }
    ],
    components: [
      { name: "Orbiter imaging system", role: "Chụp ảnh và hỗ trợ lập bản đồ Sao Hỏa từ quỹ đạo.", source_ids: ["SRC-VIK-01"] },
      { name: "Lander cameras", role: "Quét và tạo ảnh toàn cảnh bề mặt tại địa điểm hạ cánh.", source_ids: ["SRC-VIK-01", "SRC-VIK-02"] },
      { name: "Remote sampler arm", role: "Đưa mẫu đất vào các thí nghiệm phân tích.", source_ids: ["SRC-VIK-01", "SRC-VIK-03"] },
      { name: "GCMS and biology laboratory", role: "Phân tích thành phần hóa học và thực hiện các thí nghiệm sinh học.", source_ids: ["SRC-VIK-01", "SRC-VIK-03"] },
      { name: "Meteorology package", role: "Đo nhiệt độ, áp suất và gió tại bề mặt.", source_ids: ["SRC-VIK-03"] }
    ],
    science_highlights_vi: [
      "Tàu đổ bộ Viking 1 ghi lại ảnh đầu tiên từ bề mặt Sao Hỏa của NASA.",
      "Hai tàu quỹ đạo Viking (Viking 1 và Viking 2 cộng lại) đã trả về 52.663 ảnh và lập bản đồ khoảng 97% bề mặt Sao Hỏa theo độ phân giải được NASA công bố.",
      "Các thí nghiệm tìm sự sống không phát hiện bằng chứng rõ ràng về sự sống; không nên diễn giải kết quả thành kết luận rằng Sao Hỏa chưa từng có sự sống."
    ],
    editorial_note_vi: "Phải phân biệt Viking 1 Orbiter với Viking 1 Lander; nhiều số liệu tổng hợp trong trang nhiệm vụ (như 52.663 ảnh từ quỹ đạo) phản ánh cả chương trình Viking 1 và Viking 2 cộng lại, không phải riêng Viking 1.",
    source_url: "https://science.nasa.gov/mission/viking-1/",
    source_ids: ["SRC-VIK-01", "SRC-VIK-02", "SRC-VIK-03", "SRC-VIK-04"],
    credit: "NASA / JPL",
    media_id: "IMG-VIK-01",
    secondary_media_ids: [],
    is_complete_exhibit: false
  },
  {
    id: "sojourner",
    code_id: "SOJOURNER",
    name: "Sojourner",
    display_name_vi: "Sojourner — Robot bánh xe đầu tiên trên Sao Hỏa của NASA",
    official_designation: "Sojourner Micro-Rover (thuộc sứ mệnh Mars Pathfinder)",
    mission_name: "Mars Pathfinder",
    host_mission_note_vi: "Mars Pathfinder là tên nhiệm vụ và trạm đổ bộ (lander); Sojourner là robot tự hành sáu bánh (rover) đi kèm.",
    realm: "MARS",
    destination: "Sao Hỏa",
    hardware_type: "Micro-rover",
    hardware_tags: ["Micro-rover"],
    record_depth: "introductory",
    verification_state: "verified",
    status: "Hoàn thành nhiệm vụ",
    active_period: "04/07/1997 – 27/09/1997 (83 sol)",
    coordinates_or_location: "Ares Vallis, Sao Hỏa",
    mass_info: "Triển khai từ trạm đổ bộ Mars Pathfinder",
    verified_model_3d_url: null,
    quick_identity: {
      what_is_it: "Robot thám hiểm mặt đất cỡ nhỏ (rover)",
      why_sent: "Chứng minh một hệ thống hạ cánh chi phí thấp có thể đưa robot tự hành tới Sao Hỏa và khảo sát tại chỗ",
      what_makes_it_special: "Hoạt động 83 sol, vượt xa kế hoạch bảy ngày của nhiệm vụ Pathfinder",
      landing_or_operation_site: "Ares Vallis (triển khai từ trạm đổ bộ Mars Pathfinder)",
      key_instruments: [
        "Alpha Proton X-ray Spectrometer (APXS)",
        "Cameras",
        "Wheel/soil interaction observations"
      ],
      key_metrics: [
        { label: "Thời gian hoạt động thực tế", value: "83", unit: "sol", source_id: "SRC-SOJ-03" },
        { label: "Kế hoạch ban đầu cho rover", value: "7", unit: "ngày", source_id: "SRC-SOJ-03" }
      ],
      date_milestones: [
        { type: "launch", label_vi: "Pathfinder phóng (UTC)", value_display: "04/12/1996", iso_value: "1996-12-04" },
        { type: "landing", label_vi: "Hạ cánh tại Ares Vallis", value_display: "04/07/1997", iso_value: "1997-07-04" },
        { type: "last_data", label_vi: "Dữ liệu cuối từ Pathfinder (UTC)", value_display: "27/09/1997 (10:23 UTC)", iso_value: "1997-09-27" },
        { type: "mission_end", label_vi: "Kết thúc nhiệm vụ Pathfinder", value_display: "10/03/1998", iso_value: "1998-03-10" }
      ]
    },
    summary_vi: "Sojourner là robot thám hiểm nhỏ được tàu đổ bộ Mars Pathfinder đưa lên Sao Hỏa. Robot di chuyển giữa các tảng đá, chụp ảnh và dùng thiết bị APXS để khảo sát thành phần hóa học của đá.",
    primary_achievement_vi: "Chứng minh khả năng vận hành rover tự hành 6 bánh trên Sao Hỏa, khảo sát thành phần hóa học các tảng đá như Barnacle Bill và Yogi bằng APXS và hoạt động bền bỉ 83 sol so với kế hoạch 7 ngày.",
    key_facts_vi: [
      "Đã khảo sát các đá Barnacle Bill và Yogi bằng thiết bị quang phổ APXS.",
      "Hoạt động 83 sol so với kế hoạch ban đầu là bảy ngày.",
      "Đường di chuyển của rover được tái dựng từ ảnh camera IMP và dữ liệu telemetry của nhiệm vụ."
    ],
    story: {
      question: "Một robot nhỏ có thể tự di chuyển, chọn mục tiêu và khảo sát đá trên một hành tinh khác không?",
      machine: "Sojourner là rover sáu bánh nhỏ được triển khai từ tàu đổ bộ Pathfinder; nó có camera và thiết bị APXS để đo thành phần nguyên tố của đá.",
      journey: "Mars Pathfinder phóng ngày 04/12/1996 và hạ cánh tại Ares Vallis ngày 04/07/1997. Sojourner được triển khai xuống bề mặt sau khi tàu đổ bộ ổn định.",
      discovery: "Sojourner khảo sát các đá như Barnacle Bill và Yogi, thu thập ảnh, dữ liệu hóa học và thông tin về môi trường xung quanh.",
      last_signal: "Dữ liệu cuối cùng từ Pathfinder được nhận ngày 27/09/1997 (10:23 UTC). Sau nỗ lực khôi phục liên lạc, nhiệm vụ được kết thúc ngày 10/03/1998.",
      legacy: "Pathfinder và Sojourner chứng minh mô hình hạ cánh bằng túi khí và rover nhỏ là một cách tiếp cận khả thi cho thám hiểm Sao Hỏa."
    },
    timeline: [
      { date: "04/12/1996 (UTC)", semantic_type: "launch", semantic_label_vi: "Phóng (UTC)", title_vi: "Mars Pathfinder phóng", detail_vi: "Tàu mang theo lander Pathfinder và rover Sojourner rời Trái Đất.", source_ids: ["SRC-SOJ-01"] },
      { date: "04/07/1997", semantic_type: "landing", semantic_label_vi: "Hạ cánh", title_vi: "Hạ cánh tại Ares Vallis", detail_vi: "Pathfinder đưa Sojourner đến bề mặt Sao Hỏa bằng hệ thống túi khí giảm chấn.", source_ids: ["SRC-SOJ-01", "SRC-SOJ-02"] },
      { date: "Tháng 07 – 09/1997", semantic_type: "milestone", semantic_label_vi: "Khảo sát 83 sol", title_vi: "Khảo sát đá Barnacle Bill và Yogi", detail_vi: "Sojourner hoạt động 83 sol, trong khi kế hoạch ban đầu là bảy ngày.", source_ids: ["SRC-SOJ-03", "SRC-SOJ-04"], media_id: "IMG-SOJ-01" },
      { date: "27/09/1997 (10:23 UTC)", semantic_type: "last_data", semantic_label_vi: "Dữ liệu cuối (UTC)", title_vi: "Dữ liệu cuối cùng được nhận", detail_vi: "NASA ghi nhận dữ liệu cuối cùng từ Pathfinder vào lúc 10:23 UTC.", source_ids: ["SRC-SOJ-03"], media_id: "IMG-SOJ-02" },
      { date: "10/03/1998", semantic_type: "mission_end", semantic_label_vi: "Kết thúc nhiệm vụ", title_vi: "Kết thúc nhiệm vụ Pathfinder", detail_vi: "Nhiệm vụ chính thức kết thúc sau các nỗ lực khôi phục liên lạc.", source_ids: ["SRC-SOJ-03"] }
    ],
    components: [
      { name: "Six-wheel mobility system", role: "Cho phép rover di chuyển trên địa hình gồ ghề quanh khu vực hạ cánh.", source_ids: ["SRC-SOJ-01", "SRC-SOJ-02"] },
      { name: "APXS (Alpha Proton X-ray Spectrometer)", role: "Phân tích thành phần nguyên tố của các mục tiêu đá khi thiết bị tiếp xúc với bề mặt.", source_ids: ["SRC-SOJ-04"] },
      { name: "Cameras", role: "Ghi hình rover, đá và địa hình để hỗ trợ khảo sát.", source_ids: ["SRC-SOJ-02", "SRC-SOJ-03"] }
    ],
    science_highlights_vi: [
      "Đã khảo sát các đá Barnacle Bill và Yogi bằng APXS.",
      "Hoạt động 83 sol so với kế hoạch bảy ngày.",
      "Đường di chuyển của rover được tái dựng từ ảnh và telemetry của nhiệm vụ."
    ],
    editorial_note_vi: "Mars Pathfinder là tên nhiệm vụ và tàu đổ bộ; Sojourner là rover. Không dùng hai tên thay thế cho nhau.",
    source_url: "https://science.nasa.gov/mission/mars-pathfinder/",
    source_ids: ["SRC-SOJ-01", "SRC-SOJ-02", "SRC-SOJ-03", "SRC-SOJ-04"],
    credit: "NASA / JPL",
    media_id: "IMG-SOJ-01",
    secondary_media_ids: ["IMG-SOJ-02"],
    is_complete_exhibit: false
  },
  {
    id: "opportunity",
    code_id: "OPPORTUNITY",
    name: "Opportunity",
    display_name_vi: "Opportunity — Nhà thám hiểm bền bỉ của Sao Hỏa",
    official_designation: "Mars Exploration Rover – Opportunity (MER-B)",
    mission_name: "Mars Exploration Rovers (MER)",
    realm: "MARS",
    destination: "Sao Hỏa",
    hardware_type: "Rover",
    hardware_tags: ["Mars Exploration Rover", "Solar-powered rover"],
    record_depth: "featured",
    verification_state: "verified",
    status: "Hoàn thành nhiệm vụ",
    active_period: "24/01/2004 (PST) – 10/06/2018 (Tín hiệu cuối)",
    coordinates_or_location: "Meridiani Planum → Perseverance Valley (Endeavour Crater)",
    mass_info: "Thiết kế 90 sol · Đi được 45,16 km",
    verified_model_3d_url: "https://science.nasa.gov/3d-resources/mars-exploration-rover-opportunity-mer-b/",
    quick_identity: {
      what_is_it: "Robot tự hành sáu bánh sử dụng năng lượng Mặt Trời",
      why_sent: "Khảo sát địa chất Sao Hỏa và tìm dấu hiệu về hoạt động của nước trong quá khứ",
      what_makes_it_special: "Vượt xa thời gian thiết kế 90 sol, đi được 45,16 km và cung cấp bằng chứng địa chất về môi trường nước cổ đại",
      landing_or_operation_site: "Meridiani Planum → Perseverance Valley, gần Endeavour Crater",
      power_system_vi: "Hệ thống tấm pin năng lượng Mặt Trời (Solar arrays)",
      key_instruments: [
        "Pancam",
        "Navcam",
        "Mini-TES",
        "Mössbauer Spectrometer",
        "APXS",
        "Microscopic Imager",
        "Rock Abrasion Tool (RAT)",
        "Magnets"
      ],
      key_metrics: [
        { label: "Thời gian thiết kế ban đầu", value: "90", unit: "sol", source_id: "SRC-OPP-01" },
        { label: "Tổng quãng đường di chuyển", value: "45,16", unit: "km", source_id: "SRC-OPP-01" },
        { label: "Đường kính hố Endeavour", value: "~22", unit: "km", source_id: "SRC-OPP-03" }
      ],
      date_milestones: [
        { type: "launch", label_vi: "Ngày phóng", value_display: "07/07/2003", iso_value: "2003-07-07" },
        { type: "landing", label_vi: "Hạ cánh (Giờ PST)", value_display: "24/01/2004 (PST)", iso_value: "2004-01-24", convention_note_vi: "Tương ứng 25/01/2004 theo giờ UTC" },
        { type: "last_contact", label_vi: "Tín hiệu cuối cùng", value_display: "10/06/2018", iso_value: "2018-06-10" },
        { type: "mission_end", label_vi: "NASA tuyên bố kết thúc", value_display: "13/02/2019", iso_value: "2019-02-13" },
        { type: "record_update", label_vi: "Cập nhật kỷ lục quãng đường", value_display: "11/10/2026 (Perseverance vượt mốc 45,16 km)", iso_value: "2026-10-11" }
      ]
    },
    summary_vi: "Opportunity là rover thám hiểm Sao Hỏa chạy bằng năng lượng Mặt Trời, được NASA gửi đi để nghiên cứu đá và đất tại những khu vực có thể từng chịu ảnh hưởng của nước lỏng. Nhiệm vụ được thiết kế cho 90 sol nhưng hoạt động gần 15 năm và di chuyển 45,16 km.",
    primary_achievement_vi: "Tìm thấy các khoáng vật và cấu trúc địa chất khẳng định sự hiện diện của nước lỏng trong quá khứ tại Meridiani Planum và Endeavour Crater, bao gồm các hạt vi cầu giàu hematite ('blueberries'), mạch thạch cao (gypsum veins) và khoáng sét (clay minerals); di chuyển 45,16 km (kỷ lục này được Perseverance vượt qua ngày 11/10/2026).",
    key_facts_vi: [
      "Tìm thấy các khoáng vật và cấu trúc địa chất liên quan đến tác động của nước trong quá khứ (hạt hematite 'blueberries', mạch thạch cao, khoáng sét).",
      "Khảo sát nhiều miệng hố và các lớp đá tại Meridiani Planum và Endeavour Crater.",
      "Hoạt động lâu hơn rất nhiều so với thiết kế ban đầu 90 sol (hoạt động gần 15 năm).",
      "Quãng đường cuối cùng được NASA công bố: 45,16 km; kỷ lục này đã bị Perseverance vượt qua ngày 11/10/2026."
    ],
    story: {
      question: "Sao Hỏa từng có môi trường ẩm ướt như thế nào, và những dấu vết ấy còn được giữ lại trong đá không?",
      machine: "Opportunity là rover sáu bánh chạy bằng năng lượng Mặt Trời. Mast camera quan sát cảnh quan; cánh tay robot đưa các thiết bị tiếp xúc đến gần đá; Rock Abrasion Tool mài bề mặt đá để lộ lớp bên trong.",
      journey: "Phóng ngày 07/07/2003, hạ cánh ngày 24/01/2004 theo ngày địa phương PST tại Meridiani Planum, rồi di chuyển qua nhiều miệng hố và địa hình đá trước khi đến Perseverance Valley.",
      discovery: "Opportunity phát hiện các dấu hiệu địa chất cho thấy nước lỏng từng hiện diện và có thể tạo ra môi trường có điều kiện thuận lợi hơn cho sự sống vi sinh vật trong quá khứ. Đây không phải phát hiện sự sống.",
      last_signal: "Một cơn bão bụi toàn Sao Hỏa làm giảm năng lượng từ các tấm pin Mặt Trời. Tín hiệu cuối cùng được nhận ngày 10/06/2018; NASA tuyên bố kết thúc nhiệm vụ ngày 13/02/2019.",
      legacy: "Opportunity cho thấy rover có thể hoạt động lâu dài và vượt xa kế hoạch thiết kế. Quãng đường 45,16 km của nó từng là kỷ lục di chuyển trên một thế giới khác, cho đến khi Perseverance vượt qua mốc này ngày 11/10/2026."
    },
    timeline: [
      { date: "07/07/2003", semantic_type: "launch", semantic_label_vi: "Phóng", title_vi: "Phóng", detail_vi: "Opportunity rời Trái Đất trên tên lửa Delta II.", source_ids: ["SRC-OPP-01"] },
      { date: "24/01/2004 (PST)", semantic_type: "landing", semantic_label_vi: "Hạ cánh (PST)", timezone_note_vi: "Mốc ngày địa phương PST theo trang nhiệm vụ NASA (25/01/2004 UTC)", title_vi: "Hạ cánh tại Meridiani Planum", detail_vi: "Mốc ngày địa phương PST theo trang nhiệm vụ NASA.", source_ids: ["SRC-OPP-01"] },
      { date: "31/01/2004 (PST)", semantic_type: "deployment", semantic_label_vi: "Rời bệ đổ bộ", title_vi: "Rover rời lander", detail_vi: "Sáu bánh xe của Opportunity lăn khỏi bệ đổ bộ và tiếp xúc với đất Sao Hỏa.", source_ids: ["SRC-OPP-02"], media_id: "IMG-OPP-02" },
      { date: "Tháng 08/2011", semantic_type: "milestone", semantic_label_vi: "Chạm Endeavour Crater", title_vi: "Đến Endeavour Crater", detail_vi: "Opportunity khảo sát vành miệng hố rộng khoảng 22 km.", source_ids: ["SRC-OPP-03"] },
      { date: "10/06/2018", semantic_type: "last_contact", semantic_label_vi: "Tín hiệu cuối cùng", title_vi: "Tín hiệu cuối cùng", detail_vi: "Liên lạc bị gián đoạn trong cơn bão bụi toàn hành tinh tại Perseverance Valley.", source_ids: ["SRC-OPP-01", "SRC-OPP-04"], media_id: "IMG-OPP-01" },
      { date: "13/02/2019", semantic_type: "mission_end", semantic_label_vi: "Kết thúc nhiệm vụ", title_vi: "NASA tuyên bố kết thúc nhiệm vụ", detail_vi: "Sau các nỗ lực khôi phục liên lạc, NASA chính thức kết thúc nhiệm vụ.", source_ids: ["SRC-OPP-04"] },
      { date: "11/10/2026", semantic_type: "record_update", semantic_label_vi: "Cập nhật kỷ lục", title_vi: "Kỷ lục quãng đường được vượt qua", detail_vi: "NASA cập nhật rằng Perseverance đã vượt quãng đường 45,16 km của Opportunity.", source_ids: ["SRC-OPP-01", "SRC-OPP-05"] }
    ],
    components: [
      { name: "Pancam", role: "Chụp ảnh toàn cảnh màu để khảo sát địa hình và mục tiêu địa chất.", source_ids: ["SRC-OPP-01"] },
      { name: "Navcam", role: "Hỗ trợ định hướng và điều khiển di chuyển.", source_ids: ["SRC-OPP-01"] },
      { name: "Robotic arm / Instrument Deployment Device", role: "Đưa các thiết bị khoa học đến gần mục tiêu đá và đất.", source_ids: ["SRC-OPP-01"] },
      { name: "APXS and Mössbauer Spectrometer", role: "Đo thành phần nguyên tố và đặc tính khoáng vật của mục tiêu.", source_ids: ["SRC-OPP-01"] },
      { name: "Rock Abrasion Tool (RAT)", role: "Mài lớp bề mặt đá để các thiết bị phân tích tiếp cận vật liệu bên trong.", source_ids: ["SRC-OPP-01"] },
      { name: "Solar arrays", role: "Cung cấp điện; bụi bám và bão bụi làm giảm lượng ánh sáng đến các tấm pin.", source_ids: ["SRC-OPP-04"] }
    ],
    science_highlights_vi: [
      "Tìm thấy các khoáng vật và cấu trúc địa chất liên quan đến tác động của nước trong quá khứ.",
      "Khảo sát nhiều miệng hố và các lớp đá tại Meridiani Planum và Endeavour Crater.",
      "Hoạt động lâu hơn rất nhiều so với thiết kế ban đầu 90 sol.",
      "Quãng đường cuối cùng được NASA công bố: 45,16 km; kỷ lục này đã bị Perseverance vượt qua ngày 11/10/2026."
    ],
    editorial_note_vi: "Không viết rằng Opportunity đã tìm thấy sự sống. Dùng cụm 'bằng chứng về môi trường từng có nước lỏng (hematite blueberries, mạch thạch cao, khoáng sét)' hoặc 'điều kiện có thể thuận lợi cho sự sống vi sinh vật trong quá khứ'. Phân biệt ngày hạ cánh địa phương PST (24/01/2004) với ngày UTC (25/01/2004). Phân biệt rõ ngày nhận tín hiệu cuối cùng (10/06/2018) với ngày NASA tuyên bố kết thúc sứ mệnh (13/02/2019). Ảnh tự chụp 2007 mã PIA15114 là ảnh ghép mosaic từ camera Pancam trên cần mast, không phải do robot khác chụp.",
    source_url: "https://science.nasa.gov/mission/mer-opportunity/",
    source_ids: ["SRC-OPP-01", "SRC-OPP-02", "SRC-OPP-03", "SRC-OPP-04", "SRC-OPP-05", "SRC-OPP-06", "SRC-OPP-07"],
    credit: "NASA / JPL-Caltech / Cornell",
    media_id: "IMG-OPP-PIA15114",
    secondary_media_ids: ["IMG-OPP-01", "IMG-OPP-02", "opportunity_self_portrait_2004", "opportunity_last_message", "opportunity_final_panorama"],
    is_complete_exhibit: true,
    exhibit_slug: "/trien-lam/opportunity"
  },
  {
    id: "pioneer-11",
    code_id: "PIONEER-11",
    name: "Pioneer 11",
    display_name_vi: "Pioneer 11 — Sứ giả vượt qua Sao Thổ",
    official_designation: "Pioneer 11 (Pioneer-G) Flyby Spacecraft",
    mission_name: "Pioneer Program (Pioneer 11)",
    realm: "DEEP SPACE",
    destination: "Không gian sâu",
    hardware_type: "Spacecraft / Probe",
    hardware_tags: ["Deep-space probe", "Flyby spacecraft"],
    record_depth: "featured",
    verification_state: "verified",
    status: "Ngừng liên lạc · Không gian sâu",
    active_period: "06/04/1973 (UTC) – 30/09/1995 (Liên lạc cuối)",
    coordinates_or_location: "Sao Mộc, Sao Thổ & quỹ đạo hướng ra ngoài Hệ Mặt Trời",
    mass_info: "258,5 kg · 4 SNAP-19 RTG & 12 RHU",
    verified_model_3d_url: null,
    quick_identity: {
      what_is_it: "Tàu thăm dò không gian sâu bay ngang các hành tinh",
      why_sent: "Khảo sát Sao Mộc và Sao Thổ, từ trường, môi trường hạt và các đặc điểm của hệ hành tinh",
      what_makes_it_special: "Tàu vũ trụ đầu tiên bay qua Sao Thổ; tiếp tục truyền dữ liệu khoa học và kỹ thuật trong hơn hai thập kỷ",
      landing_or_operation_site: "Bay ngang Sao Mộc (1974), Sao Thổ (1979) và tiếp tục trên quỹ đạo hướng ra ngoài Hệ Mặt Trời",
      power_system_vi: "Bốn máy phát nhiệt điện đồng vị phóng xạ SNAP-19 (RTG) và 12 bộ sưởi đồng vị phóng xạ (RHU)",
      key_instruments: [
        "Imaging Photopolarimeter",
        "Helium Vector Magnetometer",
        "Infrared Radiometer",
        "Plasma Analyzer",
        "Ultraviolet Photometer",
        "Charged Particle Instrument",
        "Cosmic Ray Telescope",
        "Geiger Tube Telescope",
        "Meteoroid Detectors"
      ],
      key_metrics: [
        { label: "Khối lượng tàu", value: "258,5", unit: "kg", source_id: "SRC-PIO-01" },
        { label: "Thiết bị khoa học", value: "12", unit: "thiết bị", source_id: "SRC-PIO-01" },
        { label: "Nguồn điện hạt nhân", value: "4", unit: "SNAP-19 RTG", source_id: "SRC-PIO-03" },
        { label: "Bộ sưởi đồng vị phóng xạ", value: "12", unit: "RHU", source_id: "SRC-PIO-03" }
      ],
      date_milestones: [
        { type: "launch", label_vi: "Ngày phóng (UTC)", value_display: "06/04/1973 (UTC)", iso_value: "1973-04-06", convention_note_vi: "Một số tư liệu ghi 05/04 theo giờ địa phương Mỹ" },
        { type: "flyby", label_vi: "Bay qua Sao Mộc", value_display: "03/12/1974", iso_value: "1974-12-03" },
        { type: "flyby", label_vi: "Bay qua Sao Thổ", value_display: "01/09/1979", iso_value: "1979-09-01" },
        { type: "last_contact", label_vi: "Liên lạc cuối cùng (NASA Ames)", value_display: "30/09/1995", iso_value: "1995-09-30" },
        { type: "last_data", label_vi: "Dữ liệu kỹ thuật cuối cùng", value_display: "24/11/1995", iso_value: "1995-11-24", convention_note_vi: "Tách biệt với ngày liên lạc điều hành cuối 30/09/1995" }
      ]
    },
    summary_vi: "Pioneer 11 là tàu thăm dò không gian sâu của NASA. Sau khi bay qua Sao Mộc, tàu tiếp tục đến Sao Thổ và trở thành tàu vũ trụ đầu tiên bay qua hành tinh này. Con tàu mang theo một tấm plaque nhằm giới thiệu nguồn gốc của con người với bất kỳ người tìm thấy nào trong tương lai xa.",
    primary_achievement_vi: "Trở thành tàu vũ trụ đầu tiên trong lịch sử bay qua Sao Thổ (01/09/1979), phát hiện vành F cùng các mặt trăng mới, chụp vùng cực Sao Mộc và mang theo tấm bảng Pioneer Plaque hướng ra ngoài Hệ Mặt Trời.",
    key_facts_vi: [
      "Tàu vũ trụ đầu tiên bay qua Sao Thổ (01/09/1979).",
      "Thu thập dữ liệu và hình ảnh trong các lần bay qua Sao Mộc và Sao Thổ.",
      "Khảo sát từ trường, magnetosphere, hạt và các đặc điểm của hệ vành Sao Thổ (phát hiện vành F).",
      "Mang theo Pioneer plaque, một thông điệp trực quan về nguồn gốc nhân loại."
    ],
    story: {
      question: "Một con tàu có thể khảo sát những hành tinh khổng lồ và tiếp tục đi xa khỏi Trái Đất đến đâu?",
      machine: "Pioneer 11 là tàu thăm dò dạng flyby, dùng ăng-ten đĩa lớn để liên lạc với Trái Đất, các cần cảm biến và hệ thống thiết bị khoa học. Bốn RTG SNAP-19 cung cấp điện; các RHU cung cấp nhiệt.",
      journey: "Phóng ngày 06/04/1973 theo UTC; bay qua Sao Mộc ngày 03/12/1974; bay qua Sao Thổ ngày 01/09/1979; sau đó tiếp tục theo quỹ đạo hướng ra ngoài Hệ Mặt Trời.",
      discovery: "Pioneer 11 khảo sát môi trường từ trường và hạt quanh Sao Mộc, cung cấp hình ảnh các vùng cực Sao Mộc, và trở thành tàu đầu tiên bay qua Sao Thổ. Tại Sao Thổ, tàu ghi nhận thêm các mặt trăng và cấu trúc vòng F.",
      last_signal: "NASA Ames liên lạc lần cuối ngày 30/09/1995. Dữ liệu kỹ thuật cuối cùng được nhận ngày 24/11/1995; đây là hai mốc khác nhau và được hiển thị riêng biệt.",
      legacy: "Pioneer 11 mang tấm plaque biểu diễn nguồn gốc và thông điệp của nhân loại. Nhiệm vụ đã kết thúc; tàu không còn liên lạc với Trái Đất và tiếp tục trên quỹ đạo hướng ra ngoài Hệ Mặt Trời."
    },
    timeline: [
      { date: "06/04/1973 (UTC)", semantic_type: "launch", semantic_label_vi: "Phóng (UTC)", timezone_note_vi: "Theo chuẩn UTC của NASA Science (tương ứng tối 05/04 giờ địa phương)", title_vi: "Phóng từ Trái Đất", detail_vi: "Pioneer 11 rời Trái Đất theo mốc UTC.", source_ids: ["SRC-PIO-01"] },
      { date: "03/12/1974", semantic_type: "flyby", semantic_label_vi: "Flyby Sao Mộc", title_vi: "Bay qua Sao Mộc", detail_vi: "Tàu thực hiện flyby và thu thập dữ liệu về hành tinh cùng môi trường từ trường.", source_ids: ["SRC-PIO-01"] },
      { date: "01/09/1979", semantic_type: "flyby", semantic_label_vi: "Flyby Sao Thổ", title_vi: "Bay qua Sao Thổ", detail_vi: "Pioneer 11 trở thành tàu vũ trụ đầu tiên bay qua Sao Thổ, chụp ảnh Sao Thổ cùng Titan từ khoảng cách ~2.846.000 km.", source_ids: ["SRC-PIO-01", "SRC-PIO-02"], media_id: "IMG-PIO-01" },
      { date: "23/02/1990", semantic_type: "milestone", semantic_label_vi: "Vượt quỹ đạo Neptune", title_vi: "Vượt qua quỹ đạo Sao Hải Vương", detail_vi: "Tàu đi qua quỹ đạo của Neptune trên hành trình hướng ra ngoài.", source_ids: ["SRC-PIO-01"] },
      { date: "30/09/1995", semantic_type: "last_contact", semantic_label_vi: "Liên lạc cuối (NASA Ames)", title_vi: "Liên lạc cuối cùng", detail_vi: "NASA Ames thực hiện lần liên lạc cuối với tàu.", source_ids: ["SRC-PIO-01"] },
      { date: "24/11/1995", semantic_type: "last_data", semantic_label_vi: "Dữ liệu kỹ thuật cuối", title_vi: "Dữ liệu kỹ thuật cuối cùng", detail_vi: "Các nhà khoa học nhận được vài phút dữ liệu kỹ thuật cuối cùng; không đồng nghĩa với lần liên lạc cuối ngày 30/09/1995.", source_ids: ["SRC-PIO-01", "SRC-PIO-03"] }
    ],
    components: [
      { name: "High-gain dish antenna", role: "Duy trì liên lạc vô tuyến đường dài với Trái Đất.", source_ids: ["SRC-PIO-01", "SRC-PIO-04"] },
      { name: "Four SNAP-19 RTGs", role: "Chuyển đổi nhiệt từ phân rã phóng xạ thành điện năng cho thiết bị.", source_ids: ["SRC-PIO-03"] },
      { name: "Radioisotope heater units (12 RHUs)", role: "Cung cấp nhiệt cho các hệ thống của tàu trong môi trường không gian sâu lạnh giá.", source_ids: ["SRC-PIO-03"] },
      { name: "Scientific instrument booms and sensors", role: "Đo từ trường, hạt, plasma, bức xạ và các tín hiệu khoa học khác (12 thiết bị khoa học).", source_ids: ["SRC-PIO-01", "SRC-PIO-04"] },
      { name: "Pioneer plaque", role: "Tấm kim loại mang thông tin trực quan về nguồn gốc của con tàu và con người.", source_ids: ["SRC-PIO-05"] }
    ],
    science_highlights_vi: [
      "Tàu vũ trụ đầu tiên bay qua Sao Thổ.",
      "Thu thập dữ liệu và hình ảnh trong các lần bay qua Sao Mộc và Sao Thổ.",
      "Khảo sát từ trường, magnetosphere, hạt và các đặc điểm của hệ vành Sao Thổ.",
      "Mang theo Pioneer plaque, một thông điệp trực quan về nguồn gốc nhân loại."
    ],
    editorial_note_vi: "NASA mission page ghi ngày phóng 06/04/1973 theo UT; một số tư liệu dùng ngày 05/04 theo giờ địa phương. Dùng UTC trên timeline. Phải tách rõ mốc liên lạc điều hành cuối 30/09/1995 và mốc nhận dữ liệu kỹ thuật cuối 24/11/1995. Bức ảnh Saturn, Rings, and Titan (IMG-PIO-01) là ảnh do Pioneer 11 chụp thiên văn ngày 01/09/1979, tuyệt đối không phải ảnh chụp chính con tàu. Mô hình 3D ẩn do NASA chưa công bố mô hình 3D xác minh độc lập cho Pioneer 11 (không thay bằng Pioneer 10 mà không giải thích). Không cung cấp tọa độ hay khoảng cách thời gian thực khi không có nguồn dữ liệu trực tiếp.",
    source_url: "https://science.nasa.gov/mission/pioneer-11/",
    source_ids: ["SRC-PIO-01", "SRC-PIO-02", "SRC-PIO-03", "SRC-PIO-04", "SRC-PIO-05", "SRC-PIO-06"],
    credit: "NASA / Ames",
    media_id: "IMG-PIO-01",
    secondary_media_ids: ["IMG-PIO-02", "IMG-PIO-03", "pioneer_plaque_diagram"],
    is_complete_exhibit: true,
    exhibit_slug: "/trien-lam/pioneer-11"
  },
  {
    id: "spirit",
    code_id: "SPIRIT",
    name: "Spirit",
    display_name_vi: "Spirit — Phát hiện từ chiếc bánh xe hỏng",
    official_designation: "Mars Exploration Rover – Spirit (MER-A)",
    mission_name: "Mars Exploration Rovers (Spirit)",
    realm: "MARS",
    destination: "Sao Hỏa",
    hardware_type: "Rover",
    hardware_tags: ["Mars Exploration Rover", "Solar-powered rover"],
    record_depth: "featured",
    verification_state: "verified",
    status: "Ngừng liên lạc · Sao Hỏa",
    active_period: "04/01/2004 (UTC) – 22/03/2010 (Tín hiệu cuối)",
    coordinates_or_location: "Hố Gusev → Đồi Columbia (Home Plate), Sao Hỏa",
    mass_info: "185 kg · Năng lượng Mặt Trời",
    verified_model_3d_url: null,
    quick_identity: {
      what_is_it: "Xe tự hành thám hiểm Sao Hỏa chạy bằng năng lượng Mặt Trời",
      why_sent: "Khảo sát hố va chạm Gusev nhằm tìm kiếm bằng chứng về môi trường nước và hồ cổ đại",
      what_makes_it_special: "Bánh xe trước bên phải bị kẹt vô tình cày xới mặt đất làm lộ ra lớp cát chứa tới 90% silica tinh khiết tại Home Plate và mỏm đá Comanche giàu carbonate",
      landing_or_operation_site: "Hố Gusev (Gusev Crater) và đồi Columbia Hills (Home Plate)",
      power_system_vi: "Hệ thống tấm pin năng lượng Mặt Trời (Solar arrays)",
      key_instruments: [
        "Pancam",
        "Navcam",
        "Mini-TES",
        "Mössbauer Spectrometer",
        "APXS",
        "Microscopic Imager",
        "Rock Abrasion Tool (RAT)"
      ],
      key_metrics: [
        { label: "Hàm lượng silica đất Home Plate", value: "~90%", unit: "SiO2 tinh khiết", source_id: "SRC-SPI-01" },
        { label: "Tổng quãng đường di chuyển", value: "7,73", unit: "km", source_id: "SRC-SPI-01" },
        { label: "Thời gian hoạt động thực tế", value: "2.210", unit: "sol (so với thiết kế 90 sol)", source_id: "SRC-SPI-01" }
      ],
      date_milestones: [
        { type: "launch", label_vi: "Ngày phóng (UTC)", value_display: "10/06/2003", iso_value: "2003-06-10" },
        { type: "landing", label_vi: "Hạ cánh tại hố Gusev", value_display: "04/01/2004 (UTC)", iso_value: "2004-01-04" },
        { type: "milestone", label_vi: "Bánh xe hỏng phát hiện silica", value_display: "Tháng 03/2007 (PIA09403)", iso_value: "2007-03" },
        { type: "last_contact", label_vi: "Tín hiệu cuối cùng", value_display: "22/03/2010", iso_value: "2010-03-22" },
        { type: "mission_end", label_vi: "NASA tuyên bố kết thúc nhiệm vụ", value_display: "25/05/2011", iso_value: "2011-05-25" }
      ]
    },
    summary_vi: "Spirit là rover song sinh của Opportunity trong chương trình MER của NASA. Hạ cánh tại hố va chạm Gusev, Spirit đã vượt qua thiết kế ban đầu 90 sol để hoạt động hơn 6 năm. Khi bánh xe trước bên phải bị kẹt và kéo lê trên mặt đất, nó vô tình làm tróc lớp cát đỏ mặt ngoài, để lộ lớp trầm tích màu trắng sáng chứa tới 90% silica — bằng chứng chấn động về môi trường suối nước nóng hoặc hơi thủy nhiệt cổ đại.",
    primary_achievement_vi: "Phát hiện lớp đất giàu 90% silica tại Home Plate (chỉ dấu suối nước nóng hoặc hoạt động thủy nhiệt cổ đại) và mỏm đá Comanche chứa lượng lớn magnesium-iron carbonate chứng minh môi trường nước ít axit, thuận lợi cho sự sống tiền sinh học.",
    key_facts_vi: [
      "Chiếc bánh xe trước bên phải bị hỏng kéo lê trên cát đã vô tình cày lộ lớp đất sáng màu giàu 90% silica tại Home Plate.",
      "Phát hiện mỏm đá Comanche chứa lượng carbonate gấp 10 lần các vùng khác, chứng minh môi trường nước cổ đại trung tính hoặc kiềm nhẹ.",
      "Hạ cánh ngày 04/01/2004 (UTC) tại hố Gusev, hoạt động 2.210 sol (gấp hơn 24 lần kế hoạch 90 sol ban đầu).",
      "Tín hiệu cuối cùng được ghi nhận ngày 22/03/2010; NASA chính thức kết thúc nhiệm vụ ngày 25/05/2011."
    ],
    story: {
      question: "Hố va chạm Gusev có từng lưu giữ một hồ nước cổ đại, và nước nóng ngầm có từng phun trào trên Sao Hỏa không?",
      machine: "Spirit là xe tự hành 6 bánh sử dụng năng lượng Mặt Trời, trang bị cụm camera Mast, cánh tay robot tiếp xúc và mũi mài đá Rock Abrasion Tool.",
      journey: "Phóng ngày 10/06/2003, Spirit hạ cánh xuống lòng hố Gusev ngày 04/01/2004. Năm 2006, bánh xe trước bên phải bị kẹt cứng, buộc các kỹ sư phải cho xe lùi ngược lại và kéo lê chiếc bánh chết.",
      discovery: "Chính chiếc bánh xe bị kéo lê này đã cày sâu vào bề mặt tại Home Plate, làm lộ ra vệt cát trắng giàu 90% silica tinh khiết — sản phẩm đặc trưng của các miệng phun thủy nhiệt hoặc suối nước nóng. Tiếp đó, mỏm đá Comanche hé lộ hàm lượng khoáng vật carbonate phong phú.",
      last_signal: "Tháng 5/2009, Spirit bị sa lầy vào bẫy cát mềm Troy. Khi mùa đông Sao Hỏa đến, các tấm pin bị nghiêng lệch hướng Mặt Trời và phủ bụi. Tín hiệu cuối nhận ngày 22/03/2010; NASA tuyên bố kết thúc sứ mệnh ngày 25/05/2011.",
      legacy: "Spirit chứng minh rằng trong nghiên cứu khoa học thực nghiệm, một sự cố cơ học (bánh xe kẹt) có thể mở ra khám phá địa chất quan trọng nhất của toàn bộ nhiệm vụ."
    },
    timeline: [
      { date: "10/06/2003", semantic_type: "launch", semantic_label_vi: "Phóng (UTC)", title_vi: "Spirit phóng từ Mũi Canaveral", detail_vi: "Tàu mang theo rover Spirit rời Trái Đất trên tên lửa Delta II.", source_ids: ["SRC-SPI-01"] },
      { date: "04/01/2004 (UTC)", semantic_type: "landing", semantic_label_vi: "Hạ cánh", title_vi: "Hạ cánh mềm tại hố Gusev", detail_vi: "Spirit chạm bề mặt Sao Hỏa an toàn bằng túi khí giảm chấn.", source_ids: ["SRC-SPI-01"] },
      { date: "Tháng 03/2006", semantic_type: "milestone", semantic_label_vi: "Kẹt bánh xe trước", title_vi: "Bánh xe trước bên phải ngừng quay", detail_vi: "Kỹ sư JPL chuyển sang chế độ lái lùi, biến chiếc bánh kẹt thành một lưỡi cày tự nhiên.", source_ids: ["SRC-SPI-01"] },
      { date: "Tháng 03/2007", semantic_type: "milestone", semantic_label_vi: "Phát hiện silica", title_vi: "Phát hiện đất giàu silica tại Home Plate", detail_vi: "Bánh xe kẹt cày lộ lớp đất sáng màu chứa 90% silica (PIA09403), minh chứng suối nước nóng cổ.", source_ids: ["SRC-SPI-01", "SRC-SPI-02"], media_id: "IMG-SPI-01" },
      { date: "Tháng 05/2009", semantic_type: "milestone", semantic_label_vi: "Sa lầy tại Troy", title_vi: "Spirit mắc kẹt tại hố cát mềm Troy", detail_vi: "Rover chuyển thành trạm nghiên cứu khoa học cố định.", source_ids: ["SRC-SPI-01"] },
      { date: "22/03/2010", semantic_type: "last_contact", semantic_label_vi: "Tín hiệu cuối cùng", title_vi: "Tín hiệu liên lạc cuối cùng", detail_vi: "Trạm DSN ghi nhận gói dữ liệu cuối cùng từ Spirit trước khi mùa đông Sao Hỏa cắt đứt nguồn năng lượng.", source_ids: ["SRC-SPI-01"] },
      { date: "25/05/2011", semantic_type: "mission_end", semantic_label_vi: "Kết thúc nhiệm vụ", title_vi: "NASA chính thức kết thúc nhiệm vụ", detail_vi: "Sau hơn 1.200 lệnh gọi khôi phục không thành công, NASA thông báo ngừng tìm kiếm Spirit.", source_ids: ["SRC-SPI-01"] }
    ],
    components: [
      { name: "Pancam & Navcam", role: "Camera quan sát địa hình và theo dõi rãnh cày của bánh xe trên cát.", source_ids: ["SRC-SPI-01"] },
      { name: "Mini-TES & APXS", role: "Xác định quang phổ phát xạ nhiệt và nồng độ 90% silica của mẫu đất cày xới.", source_ids: ["SRC-SPI-01", "SRC-SPI-02"] },
      { name: "Mössbauer Spectrometer", role: "Đo hàm lượng khoáng vật chứa sắt và carbonate tại mỏm đá Comanche.", source_ids: ["SRC-SPI-03"] },
      { name: "Six-wheel drive system", role: "Hệ thống 6 bánh xe; bánh trước bên phải kẹt đã trở thành công cụ cày đất bất đắc dĩ tạo ra phát hiện khoa học lớn nhất.", source_ids: ["SRC-SPI-01"] }
    ],
    science_highlights_vi: [
      "Bánh xe trước bên phải bị kẹt kéo lê làm lộ lớp đất sáng màu giàu 90% silica tại Home Plate (chỉ dấu suối nước nóng/thủy nhiệt cổ).",
      "Khảo sát mỏm đá Comanche chứa lượng lớn magnesium-iron carbonate chứng minh môi trường nước cổ đại không bị axit hóa.",
      "Hoạt động 2.210 sol (so với 90 sol thiết kế) và di chuyển 7,73 km trong địa hình phức tạp của hố Gusev."
    ],
    editorial_note_vi: "Phân biệt rõ mốc mất liên lạc (22/03/2010) và ngày NASA tuyên bố kết thúc sứ mệnh (25/05/2011). Ảnh vệt đất silica (IMG-SPI-01, mã PIA09403) là bức ảnh tư liệu khoa học chứng minh kết quả phát hiện từ sự cố bánh xe. Hiện NASA không cung cấp mô hình 3D riêng biệt đã xác minh cho Spirit (ẩn nút 3D, không dùng mô hình Opportunity thay thế mà không giải thích).",
    source_url: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/science-highlights/",
    source_ids: ["SRC-SPI-01", "SRC-SPI-02", "SRC-SPI-03"],
    credit: "NASA / JPL / Cornell",
    media_id: "IMG-SPI-01",
    secondary_media_ids: ["IMG-SPI-02"],
    is_complete_exhibit: false
  },
  {
    id: "insight",
    code_id: "INSIGHT",
    name: "InSight",
    display_name_vi: "InSight — Lắng nghe bên trong Sao Hỏa",
    official_designation: "Interior Exploration using Seismic Investigations, Geodesy and Heat Transport (InSight)",
    mission_name: "Discovery Program (InSight)",
    realm: "MARS",
    destination: "Sao Hỏa",
    hardware_type: "Stationary Lander",
    hardware_tags: ["Stationary Lander", "Seismic Observatory", "Planetary Geophysics"],
    record_depth: "featured",
    verification_state: "verified",
    status: "Ngừng liên lạc · Sao Hỏa",
    active_period: "26/11/2018 – 15/12/2022 (Tín hiệu cuối)",
    coordinates_or_location: "Elysium Planitia (4,5° B, 135,6° Đ), Sao Hỏa",
    mass_info: "358 kg · Hai tấm pin Mặt Trời tròn đường kính 2,2 m",
    verified_model_3d_url: null,
    quick_identity: {
      what_is_it: "Tàu đổ bộ cố định (Stationary Lander) nghiên cứu địa chấn và lòng sâu Sao Hỏa",
      why_sent: "Lần đầu tiên khảo sát cấu trúc ba lớp (lớp vỏ, manti và lõi kim loại lỏng) của hành tinh đỏ",
      what_makes_it_special: "Ghi nhận 1.319 trận động đất Sao Hỏa (marsquakes) bằng máy đo SEIS; ghi lại bài học khoa học thực nghiệm về đất Sao Hỏa qua thiết bị đào nhiệt HP3",
      landing_or_operation_site: "Vùng đồng bằng êm ả Elysium Planitia, Sao Hỏa",
      power_system_vi: "Hai tấm pin năng lượng Mặt Trời hình tròn mở rộng đường kính 2,2 m",
      key_instruments: [
        "SEIS (Seismic Experiment for Interior Structure - CNES cung cấp cùng đối tác quốc tế)",
        "HP3 (Heat Flow and Physical Properties Package - DLR cung cấp)",
        "RISE (Rotation and Interior Structure Experiment)",
        "TWINS (Cảm biến nhiệt độ và gió)",
        "Cánh tay robot IDA & Camera IDC/ICC"
      ],
      key_metrics: [
        { label: "Số trận marsquake ghi nhận", value: "1.319", unit: "trận địa chấn", source_id: "SRC-INS-01" },
        { label: "Bán kính lõi Sao Hỏa đo được", value: "~1.800", unit: "km (lõi lỏng)", source_id: "SRC-INS-03" },
        { label: "Thời gian hoạt động trên bề mặt", value: "1.445", unit: "sol", source_id: "SRC-INS-01" }
      ],
      date_milestones: [
        { type: "launch", label_vi: "Ngày phóng (UTC)", value_display: "05/05/2018", iso_value: "2018-05-05" },
        { type: "landing", label_vi: "Hạ cánh tại Elysium Planitia", value_display: "26/11/2018", iso_value: "2018-11-26" },
        { type: "milestone", label_vi: "Ảnh selfie cuối cùng (PIA25287)", value_display: "24/04/2022 (Sol 1211)", iso_value: "2022-04-24" },
        { type: "last_contact", label_vi: "Tín hiệu cuối cùng", value_display: "15/12/2022", iso_value: "2022-12-15" },
        { type: "mission_end", label_vi: "NASA tuyên bố kết thúc nhiệm vụ", value_display: "21/12/2022", iso_value: "2022-12-21" }
      ]
    },
    summary_vi: "InSight là trạm nghiên cứu địa chấn cố định đầu tiên trên Sao Hỏa của NASA. Khác với các rover di chuyển trên bề mặt, InSight đứng yên tại Elysium Planitia và dùng cánh tay robot đặt trực tiếp máy đo địa chấn siêu nhạy SEIS xuống nền đất. Trong suốt 4 năm hoạt động (1.445 sol), tàu đã lắng nghe và ghi nhận 1.319 trận động đất Sao Hỏa, đo đạc độ dày lớp vỏ và xác nhận Sao Hỏa có lõi kim loại nóng chảy rộng khoảng 1.800 km.",
    primary_achievement_vi: "Thiết lập trạm đo địa chấn ngoài Trái Đất đầu tiên, phát hiện 1.319 trận động đất Sao Hỏa (marsquakes) xác định độ dày vỏ manti và kích thước lõi lỏng; cung cấp bài học thực nghiệm quý giá qua việc đầu dò nhiệt HP3 gặp trở ngại do đặc tính cơ học của đất Sao Hỏa.",
    key_facts_vi: [
      "Máy đo địa chấn SEIS (do cơ quan vũ trụ Pháp CNES cùng đối tác cung cấp) đã ghi nhận 1.319 trận động đất Sao Hỏa.",
      "Đầu dò nhiệt HP3 (do cơ quan hàng không vũ trụ Đức DLR cung cấp) không thể đào đạt độ sâu 3–5 m do đất Sao Hỏa có độ kết dính cao và ma sát thấp hơn dự kiến — một bài học thực nghiệm quý báu cho kỹ thuật khám phá vũ trụ.",
      "Tín hiệu cuối cùng được nhận vào ngày 15/12/2022; NASA tuyên bố kết thúc nhiệm vụ ngày 21/12/2022 sau khi bụi phủ dày khiến pin cạn kiệt.",
      "Bức ảnh selfie cuối cùng ngày 24/04/2022 (PIA25287) ghi lại toàn thân tàu bị bao phủ bởi một lớp bụi đỏ dày đặc."
    ],
    story: {
      question: "Bên trong lòng Sao Hỏa có còn đang đập, và lõi của nó là chất rắn hay chất lỏng?",
      machine: "InSight là tàu đổ bộ cố định 3 chân đáp, mang vòm chắn gió bảo vệ máy đo địa chấn SEIS, đầu dò nhiệt tự đập HP3 và cánh tay robot đặt thiết bị.",
      journey: "Phóng từ Căn cứ Không quân Vandenberg ngày 05/05/2018, InSight hạ cánh xuống vùng bình nguyên phẳng lặng Elysium Planitia ngày 26/11/2018.",
      discovery: "SEIS đã bắt được 1.319 xung động địa chấn, từ những rung động vi mô cho đến các trận động đất mạnh cấp 5 do va chạm thiên thạch. Dữ liệu chứng minh lớp vỏ Sao Hỏa mỏng hơn dự kiến và lõi hành tinh ở trạng thái lỏng. Đồng thời, trở ngại của đầu dò HP3 đem lại bài học sâu sắc rằng đất Sao Hỏa có tính chất cơ học rất khác biệt so với mô phỏng trên Trái Đất.",
      last_signal: "Lớp bụi đỏ tích tụ từng ngày trên hai cánh pin tròn khiến sản lượng điện giảm từ 5.000 Wh/sol xuống dưới 500 Wh/sol. Tín hiệu cuối nhận ngày 15/12/2022. Sau 2 lần liên tiếp không nhận được tín hiệu phản hồi, NASA chính thức tuyên bố kết thúc sứ mệnh ngày 21/12/2022.",
      legacy: "InSight đã hoàn thành cuốn sơ đồ địa chất đầu tiên về cấu trúc bên trong của một hành tinh đất đá ngoài Trái Đất, để lại di sản dữ liệu địa chấn khổng lồ cho các thế hệ nhà khoa học tương lai."
    },
    timeline: [
      { date: "05/05/2018", semantic_type: "launch", semantic_label_vi: "Phóng (UTC)", title_vi: "InSight phóng từ Vandenberg", detail_vi: "Lần đầu tiên một nhiệm vụ liên hành tinh được phóng từ bờ biển phía tây Hoa Kỳ.", source_ids: ["SRC-INS-01"] },
      { date: "26/11/2018", semantic_type: "landing", semantic_label_vi: "Hạ cánh", title_vi: "Hạ cánh tại Elysium Planitia", detail_vi: "InSight hạ cánh mềm thành công trên bãi đáp bằng phẳng.", source_ids: ["SRC-INS-01"] },
      { date: "19/12/2018", semantic_type: "deployment", semantic_label_vi: "Triển khai SEIS", title_vi: "Đặt máy đo địa chấn SEIS xuống mặt đất", detail_vi: "Cánh tay robot đưa SEIS tiếp đất và chụp vòm chống gió WTS lên trên.", source_ids: ["SRC-INS-01", "SRC-INS-03"] },
      { date: "24/04/2022 (Sol 1211)", semantic_type: "milestone", semantic_label_vi: "Ảnh selfie cuối", title_vi: "Ảnh tự chụp chân dung cuối cùng (PIA25287)", detail_vi: "Ảnh ghép từ cánh tay robot cho thấy lớp bụi đỏ dày đặc phủ kín pin mặt trời.", source_ids: ["SRC-INS-02"], media_id: "IMG-INS-01" },
      { date: "04/05/2022 (Sol 1222)", semantic_type: "milestone", semantic_label_vi: "Trận động đất kỷ lục", title_vi: "Ghi nhận trận marsquake mạnh nhất độ lớn 4,7", detail_vi: "Rung chấn kéo dài suốt hơn 10 tiếng đồng hồ do SEIS ghi lại.", source_ids: ["SRC-INS-01", "SRC-INS-03"] },
      { date: "15/12/2022", semantic_type: "last_contact", semantic_label_vi: "Tín hiệu cuối cùng", title_vi: "Tín hiệu liên lạc cuối cùng", detail_vi: "InSight gửi gói dữ liệu viễn trắc cuối cùng về Trái Đất trước khi cạn pin.", source_ids: ["SRC-INS-01"] },
      { date: "21/12/2022", semantic_type: "mission_end", semantic_label_vi: "Kết thúc nhiệm vụ", title_vi: "NASA tuyên bố ngừng hoạt động InSight", detail_vi: "NASA chính thức tuyên bố kết thúc sứ mệnh sau 2 lần không bắt được tín hiệu của trạm.", source_ids: ["SRC-INS-01"] }
    ],
    components: [
      { name: "SEIS (Seismic Experiment for Interior Structure)", role: "Máy đo địa chấn do CNES Pháp cung cấp cùng đối tác quốc tế; ghi lại 1.319 trận động đất Sao Hỏa.", source_ids: ["SRC-INS-01", "SRC-INS-03"] },
      { name: "HP3 (Heat Flow and Physical Properties Package)", role: "Đầu dò nhiệt do DLR Đức cung cấp; gặp trở ngại kỹ thuật không thể đào đạt độ sâu thiết kế do đặc tính kết dính của đất — bài học khoa học thực nghiệm quý giá.", source_ids: ["SRC-INS-03"] },
      { name: "Solar panels (2 x 2,2 m)", role: "Cặp pin mặt trời tròn UltraFlex; bụi bám làm công suất giảm dần dẫn tới ngừng hoạt động.", source_ids: ["SRC-INS-01", "SRC-INS-02"] },
      { name: "Instrument Deployment Arm (IDA)", role: "Cánh tay robot dài 1,9 m dùng để gắp và đặt thiết bị xuống mặt đất và chụp bức ảnh selfie cuối cùng.", source_ids: ["SRC-INS-02"] }
    ],
    science_highlights_vi: [
      "Ghi nhận 1.319 trận động đất Sao Hỏa (marsquakes), hé lộ cấu trúc lớp vỏ mỏng và lõi kim loại nóng chảy đường kính ~1.800 km.",
      "Bài học thực nghiệm từ đầu dò nhiệt HP3 chứng minh đất Sao Hỏa có lực kết dính bất ngờ, nhắc nhở rằng không phải mọi công cụ khoa học đều hoàn thành chỉ tiêu ban đầu.",
      "Hoạt động bền bỉ 1.445 sol trong môi trường bụi đỏ khắc nghiệt của Elysium Planitia."
    ],
    editorial_note_vi: "Tách bạch rõ mốc tín hiệu cuối cùng (15/12/2022) và ngày NASA chính thức tuyên bố kết thúc sứ mệnh (21/12/2022). Ảnh selfie cuối cùng ngày 24/04/2022 (IMG-INS-01, mã PIA25287) là ảnh ghép từ camera trên cánh tay robot IDC, thể hiện rõ lớp bụi phủ dày làm giảm công suất pin mặt trời. Hiện NASA không công bố mô hình 3D riêng biệt đã xác minh cho InSight (ẩn nút 3D).",
    source_url: "https://www.nasa.gov/missions/insight/nasa-retires-insight-mars-lander-mission-after-years-of-science/",
    source_ids: ["SRC-INS-01", "SRC-INS-02", "SRC-INS-03"],
    credit: "NASA / JPL-Caltech",
    media_id: "IMG-INS-01",
    secondary_media_ids: [],
    is_complete_exhibit: false
  },
  {
    id: "apollo-lrrr",
    code_id: "APOLLO-LRRR",
    name: "Apollo LRRR",
    display_name_vi: "Gương phản xạ Apollo — Không cần pin",
    official_designation: "Lunar Laser Ranging Retroreflector (LRRR)",
    mission_name: "Apollo Program (Apollo 11, 14, 15)",
    realm: "THE MOON",
    destination: "Mặt Trăng",
    hardware_type: "Passive Optical Retroreflector",
    hardware_tags: ["Passive optical retroreflector", "Zero-power device", "Laser Ranging"],
    record_depth: "featured",
    verification_state: "verified",
    status: "Đang hoạt động thụ động",
    active_period: "21/07/1969 – Nay (Hoạt động liên tục hơn 55 năm)",
    coordinates_or_location: "Biển Tĩnh Lặng (Apollo 11), Fra Mauro (Apollo 14), Rille Hadley (Apollo 15)",
    mass_info: "Thụ động 100% · Không dùng điện hay pin · Khối lượng mảng: ~20–36 kg",
    verified_model_3d_url: null,
    quick_identity: {
      what_is_it: "Mảng gương phản xạ tia laser quang học hoàn toàn thụ động (Retroreflector Array)",
      why_sent: "Đo chính xác khoảng cách Trái Đất – Mặt Trăng và kiểm chứng thuyết tương đối rộng của Einstein",
      what_makes_it_special: "Không cần pin, nguồn điện hay vi mạch điện tử; hoạt động liên tục hơn 55 năm từ năm 1969 đến nay",
      landing_or_operation_site: "Được các phi hành gia Apollo 11 (21/07/1969), Apollo 14 (05/02/1971) và Apollo 15 (31/07/1971) đặt trên Mặt Trăng",
      power_system_vi: "0 Watt (Hoàn toàn thụ động, không cần nguồn điện hay pin hóa học)",
      key_instruments: [
        "100 lăng kính góc khối thạch anh nung chảy (Apollo 11 & Apollo 14)",
        "300 lăng kính góc khối thạch anh nung chảy (Apollo 15)",
        "Khung nhôm cơ học chống cong võng do sốc nhiệt bức xạ Mặt Trăng"
      ],
      key_metrics: [
        { label: "Thời gian hoạt động liên tục", value: "55+", unit: "năm (1969 – nay)", source_id: "SRC-LRR-01" },
        { label: "Năng lượng điện tiêu thụ", value: "0", unit: "Watt (100% thụ động)", source_id: "SRC-LRR-01" },
        { label: "Tốc độ Mặt Trăng rời xa Trái Đất", value: "~3,8", unit: "cm/năm", source_id: "SRC-LRR-01" },
        { label: "Độ chính xác đo laser", value: "±1", unit: "milimet", source_id: "SRC-LRR-01" }
      ],
      date_milestones: [
        { type: "landing", label_vi: "Apollo 11 đặt mảng đầu tiên", value_display: "21/07/1969", iso_value: "1969-07-21" },
        { type: "milestone", label_vi: "Apollo 14 triển khai mảng thứ hai", value_display: "05/02/1971", iso_value: "1971-02-05" },
        { type: "milestone", label_vi: "Apollo 15 triển khai mảng 300 lăng kính", value_display: "31/07/1971", iso_value: "1971-07-31" },
        { type: "record_update", label_vi: "Tiếp tục nhận tín hiệu phản xạ", value_display: "11/11/2026", iso_value: "2026-11-11" }
      ]
    },
    summary_vi: "Gương phản xạ tia laser Mặt Trăng (LRRR) là một trong những di sản khoa học vĩ đại nhất của chương trình Apollo. Khác với mọi cỗ máy thám hiểm vũ trụ khác cần pin hay năng lượng Mặt Trời, LRRR là một mảng gương quang học hoàn toàn thụ động gồm các lăng kính góc khối thạch anh. Khi các trạm quan sát từ Trái Đất chiếu chùm xung laser lên Mặt Trăng, các lăng kính này sẽ phản xạ chùm tia quay trở lại chính xác máy thu trên Trái Đất. Nhờ đó, các nhà khoa học đã đo đạc khoảng cách Trái Đất – Mặt Trăng với độ chính xác đến từng milimet suốt hơn nửa thế kỷ.",
    primary_achievement_vi: "Đo khoảng cách Trái Đất – Mặt Trăng với độ chính xác milimet suốt hơn 55 năm; phát hiện Mặt Trăng đang rời xa Trái Đất với tốc độ ~3,8 cm/năm; xác nhận lõi Mặt Trăng có phần ngoài nóng chảy; là thí nghiệm khoa học Apollo duy nhất còn gửi về dữ liệu liên tục đến tận ngày nay.",
    key_facts_vi: [
      "Thiết bị hoàn toàn không cần pin, dây điện hay năng lượng Mặt Trời (công suất tiêu thụ 0 Watt) mà vẫn hoạt động liên tục sau hơn 55 năm.",
      "Được đặt bởi các phi hành gia Apollo 11 (100 lăng kính), Apollo 14 (100 lăng kính) và Apollo 15 (300 lăng kính).",
      "Đo đạc chính xác tốc độ Mặt Trăng đang rời xa Trái Đất với vận tốc khoảng 3,8 cm mỗi năm.",
      "Ảnh tư liệu lịch sử chụp mảng gương Apollo 14 ngày 05/02/1971 (AS14-67-09386) cần được lưu ý rõ là thiết bị quang học thụ động, tuyệt đối không phải tấm pin Mặt Trời."
    ],
    story: {
      question: "Làm thế nào để duy trì một phép đo khoa học kéo dài hàng thế kỷ giữa môi trường chân không và bức xạ khắc nghiệt của Mặt Trăng mà không lo cạn pin?",
      machine: "LRRR là một mảng kim loại nhẹ chứa các lăng kính góc khối (corner-cube retroreflectors) bằng thạch anh nung chảy tinh khiết, có đặc tính quang học phản xạ ánh sáng tới chính xác 180 độ quay ngược lại nguồn phát mà không cần bất kỳ mạch điện tử nào.",
      journey: "Các mảng gương được phi hành gia mang theo trên các chuyến bay có người lái: Neil Armstrong và Buzz Aldrin (Apollo 11, 1969), Alan Shepard và Edgar Mitchell (Apollo 14, 1971), David Scott và James Irwin (Apollo 15, 1971).",
      discovery: "Phép đo thời gian phản hồi của xung laser (chỉ khoảng 2,5 giây cho hành trình khứ hồi) đã hé lộ rằng quỹ đạo Mặt Trăng đang giãn rộng ~3,8 cm/năm do lực thủy triều, giúp kiểm chứng thuyết tương đối rộng của Albert Einstein và mô hình hóa cấu trúc sâu bên trong lõi Mặt Trăng.",
      last_signal: "Thiết bị không có 'tín hiệu cuối' hay 'ngày kết thúc nhiệm vụ' vì không dùng pin hay máy phát sóng; bất kỳ đài thiên văn laser nào trên Trái Đất ngày nay vẫn có thể bắn tia laser và nhận lại photon phản xạ.",
      legacy: "Gương phản xạ Apollo là biểu tượng đỉnh cao của thiết kế kỹ thuật bền vững: đơn giản, hiệu quả và trường tồn với thời gian mà không phụ thuộc vào bất kỳ nguồn năng lượng nào."
    },
    timeline: [
      { date: "21/07/1969", semantic_type: "landing", semantic_label_vi: "Apollo 11 triển khai", title_vi: "Đặt mảng LRRR đầu tiên tại Biển Tĩnh Lặng", detail_vi: "Buzz Aldrin và Neil Armstrong triển khai mảng 100 lăng kính góc khối.", source_ids: ["SRC-LRR-01"], media_id: "IMG-LRR-02" },
      { date: "05/02/1971", semantic_type: "milestone", semantic_label_vi: "Apollo 14 triển khai", title_vi: "Đặt mảng LRRR thứ hai tại Fra Mauro", detail_vi: "Phi hành gia Apollo 14 chụp bức ảnh cận cảnh lịch sử AS14-67-09386 của mảng phản xạ.", source_ids: ["SRC-LRR-01", "SRC-LRR-02"], media_id: "IMG-LRR-01" },
      { date: "31/07/1971", semantic_type: "milestone", semantic_label_vi: "Apollo 15 triển khai", title_vi: "Đặt mảng 300 lăng kính lớn nhất tại Hadley-Apennine", detail_vi: "Mảng phản xạ diện tích lớn gấp 3 lần giúp tăng đáng kể số lượng photon phản hồi về Trái Đất.", source_ids: ["SRC-LRR-01"] },
      { date: "11/11/2026", semantic_type: "record_update", semantic_label_vi: "Hoạt động liên tục", title_vi: "Hơn 55 năm hoạt động không gián đoạn", detail_vi: "Các đài quan sát laser hiện đại trên Trái Đất tiếp tục sử dụng mảng gương để đo đạc trắc địa Mặt Trăng.", source_ids: ["SRC-LRR-01"] }
    ],
    components: [
      { name: "Corner-cube retroreflectors", role: "Các lăng kính góc khối bằng thạch anh nung chảy tinh khiết, phản xạ chùm tia laser chính xác 180 độ ngược về nguồn phát.", source_ids: ["SRC-LRR-01"] },
      { name: "Thermal isolation casing", role: "Khung đỡ nhôm cách nhiệt thụ động, chịu được biên độ nhiệt từ -170°C vào ban đêm đến +120°C vào ban ngày trên Mặt Trăng mà không làm biến dạng góc quang học.", source_ids: ["SRC-LRR-01"] },
      { name: "Aiming handle and gnomon", role: "Tay cầm và cọc ngắm bóng nắng giúp phi hành gia căn chỉnh mảng gương hướng chuẩn xác về phía Trái Đất khi triển khai.", source_ids: ["SRC-LRR-01", "SRC-LRR-02"] }
    ],
    science_highlights_vi: [
      "Đo khoảng cách Trái Đất - Mặt Trăng với độ chính xác đến từng milimet qua thời gian bay của xung laser.",
      "Xác định tốc độ Mặt Trăng đang rời xa Trái Đất là ~3,8 cm mỗi năm.",
      "Kiểm chứng nguyên lý tương đương mạnh trong thuyết tương đối rộng của Einstein.",
      "Là thí nghiệm khoa học duy nhất từ thời kỳ Apollo vẫn hoạt động liên tục mà không cần pin hay nguồn cấp điện."
    ],
    editorial_note_vi: "Gương phản xạ Apollo là thiết bị quang học thụ động 100%, không cần nguồn điện, không có ngày kết thúc nhiệm vụ. Bức ảnh cận cảnh Apollo 14 (IMG-LRR-01, mã AS14-67-09386) cần chú thích rõ để độc giả không nhầm lẫn mảng lăng kính thạch anh này với tấm pin năng lượng Mặt Trời. Ẩn nút 3D do NASA chưa công bố mô hình 3D xác minh độc lập.",
    source_url: "https://www.nasa.gov/missions/apollo/apollo-11/the-apollo-experiment-that-keeps-on-giving/",
    source_ids: ["SRC-LRR-01", "SRC-LRR-02"],
    credit: "NASA",
    media_id: "IMG-LRR-01",
    secondary_media_ids: ["IMG-LRR-02"],
    is_complete_exhibit: false
  }
];

export const MISSIONS_DATA: Record<string, Mission> = {
  opportunity: {
    id: "opportunity",
    name: "Opportunity",
    official_designation: "Mars Exploration Rover – Opportunity (MER-B)",
    vehicle_type: "Robot tự hành sáu bánh sử dụng năng lượng Mặt Trời",
    destination: "Meridiani Planum → Perseverance Valley, Sao Hỏa",
    launch_date: "2003-07-07",
    landing_date_reference: {
      NASA_Science_key_date: "2004-01-24",
      NASA_end_of_mission_report: "2004-01-25",
      display_guidance_vi: "Hạ cánh ngày 24/01/2004 theo giờ địa phương PST trên trang nhiệm vụ NASA (tương ứng ngày 25/01/2004 theo chuẩn UTC)."
    },
    planned_primary_mission: {
      value: 90,
      unit: "sols",
      meaning_vi: "Thiết kế cho nhiệm vụ ban đầu 90 sol (ngày Sao Hỏa), thực tế hoạt động gần 15 năm (5.111 sol)."
    },
    last_communication: {
      date: "2018-06-10",
      sol: 5111,
      context_vi: "Tín hiệu cuối cùng nhận ngày 10/06/2018 tại Perseverance Valley khi cơn bão bụi toàn Sao Hỏa che khuất ánh sáng Mặt Trời."
    },
    formal_mission_end: "2019-02-13",
    total_distance_km: 45.16,
    total_distance_miles: 28.06,
    hero_media_id: "IMG-OPP-01",
    science_goal_vi: "Khảo sát địa chất Sao Hỏa tại các khu vực như Meridiani Planum và Endeavour Crater để tìm dấu hiệu về hoạt động của nước lỏng trong quá khứ.",
    key_discoveries_vi: [
      "Tìm thấy các khoáng vật và cấu trúc địa chất liên quan đến tác động của nước lỏng trong quá khứ.",
      "Khảo sát nhiều miệng hố và các lớp đá tại Meridiani Planum và Endeavour Crater (rộng khoảng 22 km).",
      "Hoạt động lâu hơn rất nhiều so với thiết kế ban đầu 90 sol.",
      "Quãng đường cuối cùng được NASA công bố là 45,16 km; kỷ lục này từng đứng đầu ngoài Trái Đất cho đến khi rover Perseverance vượt qua vào ngày 11/10/2026."
    ],
    do_not_claim_vi: [
      "Không viết rằng Opportunity đã tìm thấy sự sống. Chỉ nêu bằng chứng về môi trường từng có nước hoặc điều kiện có thể thuận lợi cho sự sống vi sinh vật trong quá khứ.",
      "Không gọi Opportunity là thiết bị đang giữ kỷ lục quãng đường hiện tại (Perseverance đã vượt mốc 45,16 km ngày 11/10/2026 theo cập nhật của NASA).",
      "Phân biệt rõ ngày nhận tín hiệu cuối cùng (10/06/2018) với ngày NASA tuyên bố kết thúc sứ mệnh (13/02/2019)."
    ],
    instruments: [
      {
        name: "Pancam",
        group: "Panoramic Mast Assembly",
        function_vi: "Chụp ảnh toàn cảnh màu để khảo sát địa hình và mục tiêu địa chất.",
        source_ids: ["SRC-OPP-01"]
      },
      {
        name: "Navcam",
        group: "Panoramic Mast Assembly",
        function_vi: "Hỗ trợ định hướng và điều khiển di chuyển.",
        source_ids: ["SRC-OPP-01"]
      },
      {
        name: "Mini-TES",
        group: "Panoramic Mast Assembly",
        function_vi: "Quang phổ kế phát xạ nhiệt hồng ngoại nhận diện khoáng vật từ xa.",
        source_ids: ["SRC-OPP-01"]
      },
      {
        name: "Robotic arm / Instrument Deployment Device (IDD)",
        group: "Cánh tay robot",
        function_vi: "Đưa các thiết bị khoa học tiếp xúc đến gần mục tiêu đá và đất.",
        source_ids: ["SRC-OPP-01"]
      },
      {
        name: "APXS & Mössbauer Spectrometer",
        group: "Cánh tay robot",
        function_vi: "Đo thành phần nguyên tố và đặc tính khoáng vật chứa sắt của mục tiêu.",
        source_ids: ["SRC-OPP-01"]
      },
      {
        name: "Microscopic Imager (MI)",
        group: "Cánh tay robot",
        function_vi: "Chụp ảnh cận cảnh cấu trúc hạt đá và đất; cũng được dùng để ghép bức ảnh selfie kỷ niệm sol 5.000 (PIA22222).",
        source_ids: ["SRC-OPP-01"]
      },
      {
        name: "Rock Abrasion Tool (RAT)",
        group: "Cánh tay robot",
        function_vi: "Mài lớp bề mặt đá phong hóa để các thiết bị phân tích tiếp cận vật liệu bên trong.",
        source_ids: ["SRC-OPP-01"]
      },
      {
        name: "Solar arrays",
        group: "Hệ thống nguồn điện",
        function_vi: "Cung cấp điện năng cho rover; bụi bám và bão bụi làm giảm lượng ánh sáng đến các tấm pin.",
        source_ids: ["SRC-OPP-04"]
      }
    ],
    timeline: ARCHIVE_RECORDS.find(r => r.id === "opportunity")?.timeline || [],
    sources: [
      "https://science.nasa.gov/mission/mer-opportunity/",
      "https://science.nasa.gov/photojournal/opportunitys-first-selfie/",
      "https://science.nasa.gov/photojournal/opportunity-and-its-mother-ship/",
      "https://science.nasa.gov/resource/opportunity-overlooking-endeavour-crater-stereo-view/",
      "https://www.nasa.gov/news-release/nasas-record-setting-opportunity-rover-mission-on-mars-comes-to-end/"
    ],
    source_ids: ["SRC-OPP-01", "SRC-OPP-02", "SRC-OPP-03", "SRC-OPP-04", "SRC-OPP-05"],
    editorial_note_vi: ARCHIVE_RECORDS.find(r => r.id === "opportunity")?.editorial_note_vi || ""
  },
  "pioneer-11": {
    id: "pioneer-11",
    name: "Pioneer 11",
    official_designation: "Pioneer 11 (Pioneer-G) Deep-Space Flyby Spacecraft",
    vehicle_type: "Tàu thăm dò không gian sâu bay ngang các hành tinh (258,5 kg)",
    destination: "Sao Mộc, Sao Thổ & quỹ đạo hướng ra ngoài Hệ Mặt Trời",
    launch_date: "1973-04-06",
    launch_note_vi: "Phóng ngày 06/04/1973 theo chuẩn UTC (một số tư liệu lịch sử ghi 05/04 theo giờ địa phương Mỹ).",
    mass_kg: 258.5,
    jupiter_flyby: "1974-12-03",
    saturn_flyby: "1979-09-01",
    last_nasa_ames_contact: "1995-09-30",
    last_engineering_data_received: "1995-11-24",
    hero_media_id: "IMG-PIO-02",
    planned_primary_mission: {
      value: 22,
      unit: "years",
      meaning_vi: "Truyền dữ liệu khoa học và kỹ thuật trong hơn 22 năm (1973–1995)."
    },
    last_communication: {
      date: "1995-09-30",
      context_vi: "NASA Ames liên lạc lần cuối ngày 30/09/1995; vài phút dữ liệu kỹ thuật cuối cùng được nhận ngày 24/11/1995 (hai mốc khác nhau)."
    },
    science_goal_vi: "Khảo sát Sao Mộc và Sao Thổ, từ trường, môi trường hạt, plasma, bức xạ vũ trụ và các đặc điểm của hệ hành tinh khổng lồ.",
    power_system_vi: "Bốn máy phát nhiệt điện đồng vị phóng xạ SNAP-19 (RTG) cùng 12 bộ sưởi đồng vị phóng xạ (RHU).",
    key_discoveries_vi: [
      "Tàu vũ trụ đầu tiên trong lịch sử bay qua Sao Thổ (ngày 01/09/1979).",
      "Khảo sát môi trường từ trường, hạt quanh Sao Mộc và cung cấp hình ảnh các vùng cực Sao Mộc (ngày 03/12/1974).",
      "Tại Sao Thổ, ghi nhận thêm các mặt trăng mới, cấu trúc vành F và chụp ảnh Sao Thổ cùng Titan từ khoảng cách ~2.846.000 km.",
      "Mang theo tấm bảng Pioneer plaque nhằm giới thiệu nguồn gốc của con tàu và con người trên quỹ đạo hướng ra ngoài Hệ Mặt Trời."
    ],
    do_not_claim_vi: [
      "Hình 'Pioneer 11 at Saturn' (IMG-PIO-01) là bức ảnh do Pioneer 11 chụp Sao Thổ và Titan, tuyệt đối không phải ảnh chụp thân tàu Pioneer 11.",
      "Phải tách rõ mốc Liên lạc cuối cùng của NASA Ames (30/09/1995) và mốc Dữ liệu kỹ thuật cuối cùng nhận được (24/11/1995).",
      "Pioneer 11 là tàu bay ngang (flyby spacecraft) mang tấm bảng Pioneer Plaque, không phải tàu đổ bộ và không mang đĩa Voyager Golden Record."
    ],
    instruments: [
      { name: "Imaging Photopolarimeter (IPP)", function_vi: "Chụp ảnh và đo độ phân cực ánh sáng từ Sao Mộc, Sao Thổ và mặt trăng Titan.", source_ids: ["SRC-PIO-01", "SRC-PIO-02"] },
      { name: "Helium Vector Magnetometer", function_vi: "Đo từ trường liên hành tinh và từ quyển của Sao Mộc, Sao Thổ.", source_ids: ["SRC-PIO-01", "SRC-PIO-04"] },
      { name: "Infrared Radiometer", function_vi: "Đo bức xạ hồng ngoại và nhiệt độ tầng mây của Sao Mộc, Sao Thổ và Titan.", source_ids: ["SRC-PIO-01"] },
      { name: "Plasma Analyzer", function_vi: "Khảo sát các hạt gió Mặt Trời tương tác với từ quyển hành tinh.", source_ids: ["SRC-PIO-01"] },
      { name: "Ultraviolet Photometer", function_vi: "Đo sự tán xạ tia cực tím trong khí quyển hành tinh.", source_ids: ["SRC-PIO-01"] },
      { name: "Charged Particle Instrument", function_vi: "Khảo sát các hạt tích điện năng lượng cao.", source_ids: ["SRC-PIO-01"] },
      { name: "Cosmic Ray Telescope", function_vi: "Theo dõi thành phần và năng lượng của tia vũ trụ.", source_ids: ["SRC-PIO-01"] },
      { name: "Geiger Tube Telescope", function_vi: "Đo cường độ các hạt mang điện đi qua từ quyển Sao Mộc và Sao Thổ.", source_ids: ["SRC-PIO-01"] },
      { name: "Meteoroid Detectors", function_vi: "Phát hiện và đếm các hạt bụi thiên thạch siêu nhỏ.", source_ids: ["SRC-PIO-01"] }
    ],
    timeline: ARCHIVE_RECORDS.find(r => r.id === "pioneer-11")?.timeline || [],
    sources: [
      "https://science.nasa.gov/mission/pioneer-11/",
      "https://science.nasa.gov/resource/pioneer-11-at-saturn/",
      "https://science.nasa.gov/planetary-science/programs/radioisotope-power-systems/missions/",
      "https://science.nasa.gov/resource/pioneer-spacecraft-diagram/",
      "https://science.nasa.gov/resource/pioneer-plaque/"
    ],
    source_ids: ["SRC-PIO-01", "SRC-PIO-02", "SRC-PIO-03", "SRC-PIO-04", "SRC-PIO-05"],
    editorial_note_vi: ARCHIVE_RECORDS.find(r => r.id === "pioneer-11")?.editorial_note_vi || ""
  }
};

export interface SpacecraftHotspot {
  id: string;
  label: string;
  x: number;
  y: number;
  title_vi: string;
  title_en: string;
  official_name: string;
  physical_location_vi: string;
  physical_location_en: string;
  primary_function_vi: string;
  primary_function_en: string;
  specs_vi: string;
  specs_en: string;
  scientific_contribution_vi: string;
  scientific_contribution_en: string;
  source_id: string;
  source_url: string;
  description_vi: string;
  description_en: string;
}

export const HOTSPOTS_OPPORTUNITY: SpacecraftHotspot[] = [
  {
    id: "pancam_mast",
    label: "Pancam & Navcam (Mast Head)",
    x: 48,
    y: 16,
    title_vi: "Cụm Camera Toàn Cảnh & Định Hướng (Pancam & Navcam)",
    title_en: "Panoramic & Navigation Cameras (Pancam & Navcam)",
    official_name: "Panoramic Camera (Pancam) & Navigation Cameras (Navcam)",
    physical_location_vi: "Đỉnh cột quan sát (PMA mast head), ở độ cao 1,5 mét ngang tầm mắt người quan sát.",
    physical_location_en: "Top of the Panoramic Mast Assembly (PMA mast head), elevated 1.5 m at human eye level.",
    primary_function_vi: "Chụp ảnh lập thể màu 360° đa phổ độ phân giải cao và tạo bản đồ lập thể 3D dẫn đường tự động.",
    primary_function_en: "Capture high-resolution 360° multispectral stereo panoramas and build 3D depth maps for autonomous driving.",
    specs_vi: "Cặp cảm biến CCD 1024×1024 pixel; khoảng cách hai mắt camera 30 cm; bánh xe 8 kính lọc quang phổ (400–1000 nm).",
    specs_en: "Dual 1024×1024 pixel CCDs; 30 cm stereo baseline; 8-position filter wheels spanning 400 to 1000 nm wavelengths.",
    scientific_contribution_vi: "Chụp hơn 217.000 bức ảnh, phát hiện các hạt hematite 'blueberry' và các tầng địa chất trầm tích nước cổ đại.",
    scientific_contribution_en: "Captured over 217,000 raw frames, discovered hematite 'blueberries', and documented ancient water-deposited layered rock outcrops.",
    source_id: "SRC-OPP-01",
    source_url: "https://science.nasa.gov/mission/mer-opportunity/",
    description_vi: "Cặp camera đặt tại đỉnh cột mast cao 1,5 m giúp lập bản đồ địa hình 3D và khảo sát địa chất từ xa. Nguồn: NASA Science / JPL.",
    description_en: "Stereo camera pair at the 1.5 m mast head generating 3D terrain maps and remote multispectral surveys. Source: NASA Science / JPL."
  },
  {
    id: "mini_tes_periscope",
    label: "Mini-TES (Thân xe / Kính tiềm vọng)",
    x: 48,
    y: 28,
    title_vi: "Quang Phổ Kế Phát Xạ Nhiệt Thu Nhỏ (Mini-TES)",
    title_en: "Miniature Thermal Emission Spectrometer (Mini-TES)",
    official_name: "Miniature Thermal Emission Spectrometer (Mini-TES)",
    physical_location_vi: "Nằm bên trong khoang điện tử thân xe (Warm Electronics Box - WEB); nhìn ra môi trường qua hệ thống gương tiềm vọng bên trong cột mast.",
    physical_location_en: "Housed mainly inside the Warm Electronics Box (WEB) within the rover body; views the Martian horizon via fold mirrors inside the mast acting as a periscope.",
    primary_function_vi: "Ghi nhận phổ bức xạ hồng ngoại nhiệt phát ra từ đá và đất để nhận diện thành phần khoáng vật từ xa mà không cần tiếp xúc.",
    primary_function_en: "Measure infrared thermal radiation emitted from Martian rocks and soil to identify mineral compositions from distances up to several kilometers.",
    specs_vi: "Giao thoa kế Michelson, dải phổ hồng ngoại nhiệt 5,0 đến 29,0 µm (339.50 đến 1997.10 cm⁻¹); độ phân giải quang phổ 10 cm⁻¹.",
    specs_en: "Michelson interferometer covering thermal infrared 5.0 to 29.0 µm (339.50 to 1997.10 cm⁻¹); spectral resolution 10 cm⁻¹.",
    scientific_contribution_vi: "Xác định từ xa các khoáng vật olivine, pyroxene và hematite xám tại Meridiani Planum, dẫn lối cho rover tiếp cận các tảng đá quan trọng nhất.",
    scientific_contribution_en: "Remotely identified olivine, pyroxene, and coarse gray hematite at Meridiani Planum, directing the rover toward the most significant aqueous rock targets.",
    source_id: "SRC-OPP-01",
    source_url: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/science-instruments/",
    description_vi: "Lưu ý thiết kế: Mini-TES được đặt an toàn bên trong thân xe (hộp WEB) để giữ ấm, ánh sáng đi qua gương lật kính tiềm vọng trong cột mast. Nguồn: NASA/JPL/ASU.",
    description_en: "Engineering note: Mini-TES is insulated inside the rover body WEB; light is channeled down through mast periscope fold mirrors. Source: NASA/JPL/ASU."
  },
  {
    id: "solar_arrays",
    label: "Solar Arrays",
    x: 52,
    y: 44,
    title_vi: "Hệ Thống Tấm Pin Mặt Trời (Solar Arrays)",
    title_en: "Triple-Junction Solar Array Assembly",
    official_name: "Gallium Arsenide / Germanium Triple-Junction Solar Panels",
    physical_location_vi: "Bề mặt trên cùng của thân xe tự hành (Rover Equipment Deck), diện tích khoảng 1,3 m².",
    physical_location_en: "Top surface of the rover equipment deck, covering an area of approximately 1.3 m².",
    primary_function_vi: "Chuyển hóa quang năng Mặt Trời thành điện năng sạc hai khối pin sạc lithium-ion 8 Ah duy trì hoạt động máy tính và các thiết bị.",
    primary_function_en: "Convert solar photons into electrical energy to charge dual 8 Ah lithium-ion rechargeable battery packs for computers and thermal heaters.",
    specs_vi: "Tế bào quang điện ba tiếp giáp GaInP/GaAs/Ge; công suất ban đầu ~140 W tại điểm hạ cánh; suy giảm khi bụi tích tụ (dưới 22 Wh/sol trong bão bụi năm 2018).",
    specs_en: "Triple-junction GaInP/GaAs/Ge solar cells; generated ~140 W at landing; dropped below 22 Wh/sol during the June 2018 global dust storm (optical depth τ ≈ 10.8).",
    scientific_contribution_vi: "Nhờ các cơn lốc bụi tự nhiên làm sạch pin (cleaning events), hệ thống đã duy trì hoạt động 5.111 sol — gấp hơn 55 lần tuổi thọ thiết kế 90 sol ban đầu.",
    scientific_contribution_en: "Aided by atmospheric dust-cleaning wind vortices, the arrays powered Opportunity through 5,111 sols—over 55 times beyond its 90-sol design baseline.",
    source_id: "SRC-OPP-04",
    source_url: "https://science.nasa.gov/mission/mer-opportunity/",
    description_vi: "Cung cấp năng lượng cho 15 năm khám phá sao Hỏa. Năm 2018, trận bão bụi toàn cầu che khuất ánh sáng đã khiến Opportunity vĩnh viễn mất điện. Nguồn: NASA JPL.",
    description_en: "Powered nearly 15 years of continuous science. In 2018, a catastrophic global dust storm obscured the Sun, starving the rover of power. Source: NASA JPL."
  },
  {
    id: "robotic_arm",
    label: "Robotic Arm (IDD)",
    x: 28,
    y: 68,
    title_vi: "Cánh Tay Robot & Cụm Thiết Bị Tiếp Xúc (IDD)",
    title_en: "Instrument Deployment Device (Robotic Arm)",
    official_name: "Instrument Deployment Device (IDD) & In-situ Science Turret",
    physical_location_vi: "Gắn phía trước mũi thân xe, khớp xoay 5 bậc tự do có thể vươn dài 1,02 m đến bề mặt đá đất.",
    physical_location_en: "Mounted on the front of the rover chassis, featuring a 5-degree-of-freedom articulated arm extending up to 1.02 m.",
    primary_function_vi: "Áp sát các đầu cảm biến hạt nhân, camera hiển vi và máy mài đá trực tiếp lên bề mặt địa chất Sao Hỏa.",
    primary_function_en: "Position microscopic contact sensors, nuclear spectrometers, and rock abrasion cutting tools directly onto Martian targets.",
    specs_vi: "Mang 4 công cụ: Mössbauer Spectrometer (Co-57), APXS (Alpha Particle X-Ray), Microscopic Imager (31 µm/pixel), và Rock Abrasion Tool (RAT mài sâu 5 mm).",
    specs_en: "Houses 4 instruments: Mössbauer Spectrometer (Co-57 source), APXS (Curium-244 X-ray source), Microscopic Imager (31 µm/pixel), and RAT diamond grinder.",
    scientific_contribution_vi: "Mài lộ lõi đá bên trong miệng hố Eagle, phát hiện mạch thạch cao trầm tích và các tinh thể sulfate chứng minh nước lỏng từng tồn tại lâu dài.",
    scientific_contribution_en: "Ground through rock rinds at Eagle Crater, discovered gypsum sulfate veins and hematite concretions confirming long-standing ancient liquid water.",
    source_id: "SRC-OPP-01",
    source_url: "https://science.nasa.gov/mission/mer-opportunity/",
    description_vi: "Cánh tay 5 khớp mang Mössbauer, APXS, RAT và camera hiển vi chụp bức ảnh selfie sol 5.000 PIA22222. Nguồn: NASA/JPL-Caltech.",
    description_en: "5-axis articulated arm holding Mössbauer, APXS, RAT, and the Microscopic Imager used to stitch the Sol 5,000 selfie PIA22222. Source: NASA/JPL."
  },
  {
    id: "wheels_mobility",
    label: "Six-Wheel Mobility",
    x: 72,
    y: 78,
    title_vi: "Hệ Thống 6 Bánh Xe Rocker-Bogie",
    title_en: "Rocker-Bogie 6-Wheel Mobility System",
    official_name: "Rocker-Bogie Mobility Suspension System",
    physical_location_vi: "Hệ thống truyền động 6 bánh xe nhôm gia công nguyên khối bố trí dọc hai bên sườn thân xe.",
    physical_location_en: "Six machined aluminum cleated wheels arranged on articulating titanium rocker-bogie linkages along both chassis flanks.",
    primary_function_vi: "Vượt qua chướng ngại vật đá cao hơn đường kính bánh xe mà không làm nghiêng lật thân xe; mỗi bánh có mô-tơ truyền động riêng.",
    primary_function_en: "Traverse boulders larger than wheel diameter without tipping the chassis; each wheel has an independent drive motor.",
    specs_vi: "Đường kính bánh xe 26 cm, rãnh gai chống trượt; vận tốc tối đa 5 cm/s; hệ thống vi sai không dùng lò xo giữ đều tải trọng cả 6 bánh.",
    specs_en: "26 cm wheel diameter with spiral cleats; max drive speed 5 cm/s; springless rocker-bogie linkage distributing weight equally across all 6 wheels.",
    scientific_contribution_vi: "Lăn bánh kỷ lục 45,16 km trên bề mặt Sao Hỏa qua Meridiani Planum, miệng hố Victoria và tới vành miệng hố Endeavour.",
    scientific_contribution_en: "Completed an off-world driving record of 45.16 km across Meridiani Planum, Victoria Crater, and the rim of Endeavour Crater.",
    source_id: "SRC-OPP-02",
    source_url: "https://science.nasa.gov/mission/mer-opportunity/",
    description_vi: "Lăn khỏi bệ đổ bộ ngày 31/01/2004 (PST), đạt tổng quãng đường kỷ lục 45,16 km trong lịch sử thám hiểm ngoài Trái Đất. Nguồn: NASA JPL.",
    description_en: "Drove off the lander on Jan 31, 2004 (PST), achieving an endurance record of 45.16 km on Mars. Source: NASA JPL."
  },
  {
    id: "telecom_antennas",
    label: "Antennas (HGA / LGA / UHF)",
    x: 62,
    y: 28,
    title_vi: "Hệ Thống Ăng-ten Vô Tuyến Viễn Thông",
    title_en: "Telecommunications Antenna Suite",
    official_name: "High-Gain Antenna (HGA), Low-Gain Antenna (LGA) & UHF Monopole",
    physical_location_vi: "Trên boong thiết bị phía sau thân xe: chảo HGA định hướng, cọc LGA đẳng hướng và ăng-ten cọc UHF.",
    physical_location_en: "Mounted on the rear equipment deck: steerable parabolic High-Gain dish, omni Low-Gain mast, and UHF whip antenna.",
    primary_function_vi: "Truyền dữ liệu khoa học về Trái Đất trực tiếp (X-band) hoặc chuyển tiếp qua vệ tinh quỹ đạo Sao Hỏa (UHF relay).",
    primary_function_en: "Uplink commands and downlink science data directly to Earth's DSN (X-band) or relay through Mars orbiters (Odyssey & MRO via UHF).",
    specs_vi: "Chảo HGA đường kính 28 cm xoay hai trục; tần số X-band (~8,4 GHz); UHF tần số 400 MHz đạt tốc độ truyền đến 256 kbps qua vệ tinh quỹ đạo.",
    specs_en: "28 cm steerable parabolic dish for X-band (~8.4 GHz) DSN links; UHF 400 MHz transceivers achieving up to 256 kbps relay via Odyssey/MRO.",
    scientific_contribution_vi: "Truyền về hàng terabit dữ liệu khoa học, quang phổ và hơn 217.000 bức ảnh độ phân giải cao trong suốt 15 năm hoạt động.",
    scientific_contribution_en: "Returned hundreds of gigabits of raw spectra, telemetry, and 217,000+ images across 5,111 sols of continuous operations.",
    source_id: "SRC-OPP-01",
    source_url: "https://science.nasa.gov/mission/mer-opportunity/",
    description_vi: "Kết nối mạng lưới Deep Space Network và vệ tinh Mars Odyssey. Tín hiệu cuối cùng phát đi ngày 10/06/2018. Nguồn: NASA JPL.",
    description_en: "Maintained direct and relayed contact with Earth until the final radio transmission on June 10, 2018. Source: NASA JPL."
  }
];

export const HOTSPOTS_PIONEER_DIAGRAM: SpacecraftHotspot[] = [
  {
    id: "high_gain_antenna",
    label: "High-Gain Dish Antenna",
    x: 50,
    y: 42,
    title_vi: "Ăng-ten Đĩa Độ Lợi Cao (2,74 m)",
    title_en: "2.74-meter High-Gain Parabolic Dish Antenna",
    official_name: "2.74-meter (9.0 ft) Parabolic Reflector Antenna",
    physical_location_vi: "Chiếm trọn mặt trước của tàu, hướng thẳng về phía Trái Đất khi tàu tự quay ổn định con quay.",
    physical_location_en: "Dominates the forward face of the spacecraft, kept pointed toward Earth by spin stabilization.",
    primary_function_vi: "Thu nhận lệnh điều khiển và phát tín hiệu vô tuyến băng tần S (2,2 GHz) về Mạng lưới Không gian Sâu (DSN) từ cự ly hàng tỷ km.",
    primary_function_en: "Transmit S-band (2.2 GHz) science telemetry and receive commands across billions of kilometers via NASA's Deep Space Network.",
    specs_vi: "Đường kính 2,74 m; độ võng parabol f/D = 0,33; kết cấu nhôm tổ ong siêu nhẹ; công suất phát vô tuyến 8 W qua đèn sóng chạy (TWTA).",
    specs_en: "2.74 m diameter; focal ratio f/D = 0.33; ultra-lightweight aluminum honeycomb sandwich; 8 W Traveling Wave Tube Amplifiers (TWTA).",
    scientific_contribution_vi: "Duy trì truyền dữ liệu liên tục qua quỹ đạo Sao Mộc và Sao Thổ, đạt khoảng cách kỷ lục trước khi tín hiệu yếu dần ngày 30/09/1995.",
    scientific_contribution_en: "Maintained continuous scientific transmission through Jupiter and Saturn encounters until its final readable downlink on September 30, 1995.",
    source_id: "SRC-PIO-01",
    source_url: "https://science.nasa.gov/mission/pioneer-11/",
    description_vi: "Ăng-ten parabol 2,74 m giúp Pioneer 11 truyền dữ liệu từ ngoài quỹ đạo Sao Thổ về Trái Đất. Tín hiệu cuối cùng thu nhận ngày 30/09/1995. Nguồn: NASA/Ames.",
    description_en: "2.74 m parabolic dish maintaining contact from beyond Saturn until final contact on Sept 30, 1995. Source: NASA/Ames."
  },
  {
    id: "snap19_rtg",
    label: "Four SNAP-19 RTGs",
    x: 20,
    y: 68,
    title_vi: "4 Máy Phát Điện Đồng Vị Phóng Xạ SNAP-19",
    title_en: "Four SNAP-19 Radioisotope Thermoelectric Generators",
    official_name: "SNAP-19 Radioisotope Thermoelectric Generators (RTG)",
    physical_location_vi: "Gắn trên 2 cần giàn vươn dài 3 mét tách xa thân tàu để giảm thiểu nhiễu bức xạ lên các cảm biến khoa học.",
    physical_location_en: "Mounted on two 3-meter deployable truss booms angled outward to minimize radiation interference on science payloads.",
    primary_function_vi: "Sử dụng nhiệt sinh ra từ phân rã phóng xạ Plutonium-238 chuyển đổi thành điện năng một chiều nuôi toàn bộ con tàu.",
    primary_function_en: "Convert the decay heat of Plutonium-238 dioxide fuel capsules into electrical direct current to power all spacecraft avionics.",
    specs_vi: "4 máy SNAP-19 phát tổng cộng 155 W điện khi phóng; kèm 12 bộ sưởi đồng vị phóng xạ (RHU, mỗi bộ 1 W nhiệt) giữ ấm hệ thống.",
    specs_en: "4 SNAP-19 units providing 155 W electrical output at launch; supplemented by 12 one-watt Radioisotope Heater Units (RHU).",
    scientific_contribution_vi: "Chứng minh tàu vũ trụ có thể hoạt động bền bỉ ngoài quỹ đạo Sao Mộc và Sao Thổ nơi ánh sáng Mặt Trời quá yếu (dưới 15 W/m²).",
    scientific_contribution_en: "Proven electrical architecture enabling deep-space missions beyond Saturn where solar irradiance drops below 15 W/m² (1% of Earth).",
    source_id: "SRC-PIO-03",
    source_url: "https://science.nasa.gov/mission/pioneer-11/",
    description_vi: "Cung cấp điện năng trong 22 năm nhờ phân rã hạt nhân Pu-238, giải thích vì sao tàu bay xa Mặt Trời không thể dùng pin quang điện. Nguồn: NASA Ames.",
    description_en: "Provided electrical power for 22 years using Pu-238 radioisotope decay, essential where solar flux is negligible. Source: NASA Ames."
  },
  {
    id: "magnetometer_boom",
    label: "Helium Vector Magnetometer",
    x: 78,
    y: 22,
    title_vi: "Từ Kế Helium Vector & Cần Dài 6,6 m",
    title_en: "Helium Vector Magnetometer on 6.6 m Boom",
    official_name: "Helium Vector Magnetometer (HVM) Instrument Boom",
    physical_location_vi: "Gắn ở đầu cần boom bằng sợi thủy tinh dài 6,6 mét vươn xa khỏi thân tàu.",
    physical_location_en: "Mounted at the tip of an ultra-lightweight 6.6-meter fiberglass boom deployed radially outward.",
    primary_function_vi: "Đo cường độ và hướng của từ trường liên hành tinh cũng như từ trường nội sinh của Sao Mộc và Sao Thổ.",
    primary_function_en: "Measure the magnitude and dynamic vector direction of interplanetary and planetary magnetic fields.",
    specs_vi: "Dải đo từ 0,01 gamma (10 pT) đến 140.000 gamma; cảm biến tế bào khí helium kích thích quang học.",
    specs_en: "Dynamic range from 0.01 gamma (10 pT) up to 140,000 gamma; uses optically pumped helium gas absorption cell.",
    scientific_contribution_vi: "Phát hiện từ trường mạnh và vành đai bức xạ khổng lồ của Sao Mộc; lần đầu tiên lập bản đồ từ quyển bất đối xứng của Sao Thổ năm 1979.",
    scientific_contribution_en: "Mapped Jupiter's intense radiation belts and became the first probe to measure Saturn's magnetic dipole moment in 1979.",
    source_id: "SRC-PIO-01",
    source_url: "https://science.nasa.gov/mission/pioneer-11/",
    description_vi: "Cần vươn 6,6 m cách ly cảm biến khỏi từ trường kim loại của tàu, đo thành công từ quyển Sao Mộc và Sao Thổ. Nguồn: NASA/JPL/Ames.",
    description_en: "Isolated 6.6 m boom preventing spacecraft magnetic interference, mapping Saturn's magnetosphere in 1979. Source: NASA/JPL/Ames."
  },
  {
    id: "pioneer_plaque_mount",
    label: "Pioneer Plaque",
    x: 46,
    y: 64,
    title_vi: "Tấm Bảng Thông Điệp Vàng Pioneer Plaque",
    title_en: "Pioneer Plaque Interstellar Message",
    official_name: "Gold-Anodized Aluminum Interstellar Plaque",
    physical_location_vi: "Gắn trên các thanh giàn đỡ ăng-ten hướng vào trong thân tàu để che chắn khỏi bụi vi thiên thạch khi bay.",
    physical_location_en: "Bolted to the high-gain antenna support struts facing inward to shield the engraving from micrometeoroid erosion.",
    primary_function_vi: "Mang thông điệp đồ họa hòa bình và vị trí nguồn gốc của loài người gửi tới bất kỳ nền văn minh vũ trụ nào có thể thu hồi con tàu.",
    primary_function_en: "Convey a graphic greeting and astronomical origin coordinates from humanity to any extraterrestrial intelligence that intercepts the craft.",
    specs_vi: "Tấm nhôm 6061-T6 mạ vàng; kích thước 152 × 229 mm (6 × 9 inch); dày 1,27 mm; khối lượng xấp xỉ 120 gram; khắc bằng mũi kim cương.",
    specs_en: "6061-T6 gold-anodized aluminum; 152 × 229 mm (6 × 9 inches); thickness 1.27 mm; mass ~120 g; machine-engraved by Carl Sagan & Frank Drake.",
    scientific_contribution_vi: "Thông điệp vũ trụ đầu tiên trong lịch sử nhân loại rời khỏi Hệ Mặt Trời, thiết lập tiền đề văn hóa cho Đĩa Vàng Voyager năm 1977.",
    scientific_contribution_en: "Humanity's first physical message sent into interstellar space, establishing the scientific and symbolic precedent for the 1977 Voyager Golden Record.",
    source_id: "SRC-PIO-05",
    source_url: "https://science.nasa.gov/mission/pioneer-11/",
    description_vi: "Khắc sơ đồ Hydro siêu mịn, bản đồ 14 ẩn tinh xác định vị trí Mặt Trời và hình ảnh con người. Lưu ý: Không nhầm lẫn với Đĩa Vàng Voyager (1977). Nguồn: NASA.",
    description_en: "Features 21 cm hydrogen standard, 14-pulsar map, and human silhouettes. Crucial: Do not confuse with the Voyager Golden Record. Source: NASA."
  }
];

export const HOTSPOTS_PLAQUE: SpacecraftHotspot[] = [
  {
    id: "hyperfine_hydrogen",
    label: "Chuyển mức siêu mịn Hydro",
    x: 24,
    y: 18,
    title_vi: "Chuyển Mức Siêu Mịn Của Nguyên Tử Hydro",
    title_en: "Hyperfine Transition of Neutral Hydrogen",
    official_name: "Neutral Hydrogen Spin-Flip 21 cm Transition Standard",
    physical_location_vi: "Góc trên bên trái của tấm bảng kim loại.",
    physical_location_en: "Top-left quadrant of the gold-anodized plaque.",
    primary_function_vi: "Cung cấp đơn vị cơ bản phổ quát về thời gian (0,704 ns / tần số 1420 MHz) và chiều dài (21,106 cm) trong vũ trụ.",
    primary_function_en: "Provide universal scientific units for time (period = 0.704 ns / 1420.4 MHz) and length (wavelength = 21.106 cm) based on atomic hydrogen.",
    specs_vi: "Biểu diễn 2 trạng thái spin của proton và electron; chữ số nhị phân '1' đặt giữa 2 vòng tròn làm chìa khóa giải mã toàn bộ tấm bảng.",
    specs_en: "Schematic representation of parallel and antiparallel electron/proton spins; a binary '1' defines the fundamental metric unit.",
    scientific_contribution_vi: "Cho phép bất kỳ nền văn minh am hiểu vật lý lượng tử nào quy đổi kích thước con người và tần số ẩn tinh pulsar trên bảng ra đơn vị SI.",
    scientific_contribution_en: "Allows any civilization understanding quantum physics to calculate the physical heights of the humans and pulsar distances.",
    source_id: "SRC-PIO-05",
    source_url: "https://science.nasa.gov/mission/pioneer-11/",
    description_vi: "Hydro là nguyên tố phong phú nhất vũ trụ. Bước sóng 21 cm là thước đo chuẩn để giải mã chiều cao con người (8 × 21 cm ≈ 168 cm). Nguồn: NASA.",
    description_en: "Hydrogen is the most abundant element in the universe. Its 21 cm wavelength serves as the key to decode all dimensions on the plaque. Source: NASA."
  },
  {
    id: "pulsar_map",
    label: "Bản đồ 14 Ẩn tinh (Pulsar Map)",
    x: 32,
    y: 52,
    title_vi: "Bản Đồ Định Vị Mặt Trời Dựa Trên 14 Ẩn Tinh",
    title_en: "Galactic Pulsar Positioning Coordinate Map",
    official_name: "14-Pulsar Galactic Triangulation Map",
    physical_location_vi: "Vùng trung tâm lệch trái, gồm 15 tia phát xuất từ một tâm điểm.",
    physical_location_en: "Center-left region, consisting of 15 lines radiating from a single central vertex.",
    primary_function_vi: "Xác định tọa độ không gian 3 chiều của Mặt Trời trong Ngân Hà và thời điểm con tàu được phóng đi trong lịch sử thiên hà.",
    primary_function_en: "Triangulate the 3D position of the Sun within the Milky Way and pinpoint the epoch of launch based on pulsar spin-down rates.",
    specs_vi: "14 tia biểu diễn hướng và khoảng cách đến 14 ẩn tinh; các vạch nhị phân trên tia ghi chu kỳ quay (khoảng 0,1 đến 2 giây) tại thời điểm năm 1972.",
    specs_en: "14 lines encode directions and distances to 14 pulsars; binary tick marks specify their rotation periods as of the 1972 epoch.",
    scientific_contribution_vi: "Bởi vì các ẩn tinh quay chậm dần theo thời gian với tốc độ đo đạc được, bản đồ này hoạt động như một chiếc đồng hồ nguyên tử vũ trụ vĩnh cửu.",
    scientific_contribution_en: "Because pulsar rotation slows down at predictable rates, the map serves as an eternal cosmic clock establishing humanity's era.",
    source_id: "SRC-PIO-05",
    source_url: "https://science.nasa.gov/mission/pioneer-11/",
    description_vi: "Tâm điểm là vị trí Mặt Trời; 14 tia chỉ về 14 ẩn tinh với mã nhị phân ghi tần số quay. Tia thứ 15 kéo dài sang phải chỉ tâm Ngân Hà. Nguồn: NASA.",
    description_en: "Vertex represents the Sun; 14 radial lines point to pulsars with binary spin periods; the 15th line points to the Galactic Center. Source: NASA."
  },
  {
    id: "human_figures",
    label: "Hình ảnh Người & Tỷ lệ Tàu",
    x: 74,
    y: 48,
    title_vi: "Hình Ảnh Con Người & Đường Nét Tàu Pioneer",
    title_en: "Human Silhouettes Scaled Against Spacecraft Outline",
    official_name: "Anatomical Silhouettes of Man and Woman Scaled to Spacecraft",
    physical_location_vi: "Nửa bên phải của tấm bảng, đặt trước hình vẽ phóng hình tỷ lệ của tàu Pioneer.",
    physical_location_en: "Right-hand region, positioned directly in front of the scaled silhouette outline of Pioneer 11.",
    primary_function_vi: "Thể hiện diện mạo sinh học của cư dân Trái Đất; cử chỉ tay phải giơ lên biểu thị lời chào hữu nghị và thiện chí hòa bình.",
    primary_function_en: "Showcase the biological morphology of Earth's species; the man's raised right hand represents a universal peaceful greeting.",
    specs_vi: "Người phụ nữ đứng cạnh người đàn ông; giữa hai vạch ngang chỉ chiều cao người phụ nữ có ghi số nhị phân '1000' (số 8 trong hệ thập phân), nghĩa là 8 × 21 cm = 168 cm.",
    specs_en: "Woman stands beside man; between vertical tick marks for her height is binary '1000' (decimal 8), indicating 8 × 21 cm = 168 cm.",
    scientific_contribution_vi: "Cung cấp tỷ lệ đối sánh trực quan kích thước sinh học của con người với con tàu kim loại thực tế đang bay trong không gian.",
    scientific_contribution_en: "Provides an unambiguous physical reference comparing human biological stature against the actual spacecraft hardware.",
    source_id: "SRC-PIO-05",
    source_url: "https://science.nasa.gov/mission/pioneer-11/",
    description_vi: "Người đàn ông giơ tay chào thiện chí. Chiều cao người phụ nữ ghi số nhị phân '1000' (tức 8 lần bước sóng Hydro 21 cm = 168 cm). Nguồn: NASA.",
    description_en: "Man raises right hand in peaceful greeting. Woman's height binary 1000 = 8 × 21 cm = 168 cm. Source: NASA."
  },
  {
    id: "solar_system_trajectory",
    label: "Sơ đồ Hệ Mặt Trời & Quỹ đạo",
    x: 45,
    y: 86,
    title_vi: "Sơ Đồ Hệ Mặt Trời & Đường Bay Rời Trái Đất",
    title_en: "Solar System Map & Interplanetary Trajectory",
    official_name: "Planetary Order Schematic & Spacecraft Escape Path",
    physical_location_vi: "Dọc theo mép dưới cùng của tấm bảng.",
    physical_location_en: "Spans the bottom margin of the plaque.",
    primary_function_vi: "Chỉ rõ hành tinh gốc mà con tàu xuất phát (Trái Đất, hành tinh thứ ba) và hành tinh đã hỗ trợ lực hấp dẫn (Sao Mộc, hành tinh thứ năm).",
    primary_function_en: "Depicts the origin planet of the mission (Earth, 3rd planet) and the gravity-assist flyby around Jupiter (5th planet).",
    specs_vi: "Mặt Trời cùng 9 hành tinh (theo quan niệm thiên văn học năm 1972 bao gồm Pluto); dưới mỗi hành tinh có mã nhị phân ghi khoảng cách tương đối đến Mặt Trời.",
    specs_en: "The Sun and 9 planets (reflecting 1972 astronomical classification including Pluto) with binary codes for relative orbital distances.",
    scientific_contribution_vi: "Khắc họa trực quan quỹ đạo bay uốn lượn vượt ra khỏi giếng hấp dẫn của Hệ Mặt Trời tiến vào khoảng không giữa các vì sao.",
    scientific_contribution_en: "Illustrates the hyperbolic trajectory sweeping past Jupiter to achieve Solar System escape velocity into interstellar space.",
    source_id: "SRC-PIO-05",
    source_url: "https://science.nasa.gov/mission/pioneer-11/",
    description_vi: "Minh họa đường bay xuất phát từ hành tinh thứ ba (Trái Đất), bay vòng qua Sao Mộc và thoát khỏi Hệ Mặt Trời. Nguồn: NASA.",
    description_en: "Illustrates the flight path launching from the 3rd planet (Earth), swinging past Jupiter, and escaping into deep space. Source: NASA."
  }
];


export const SAMPLE_SUBMISSIONS: YoungExplorerSubmission[] = [];
