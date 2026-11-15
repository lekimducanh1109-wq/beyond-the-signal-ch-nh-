import React, { useState, useEffect, useMemo } from 'react';
import {
  ARCHIVE_RECORDS,
  MISSIONS_DATA,
  NASA_MEDIA_CATALOG,
  SOURCES_CATALOG,
  ArchiveRecord,
  NasaMediaItem
} from '../data/museumData';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileText,
  Filter,
  FolderInput,
  HelpCircle,
  Info,
  Layers,
  LayoutGrid,
  MapPin,
  Maximize2,
  Milestone,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Table,
  X,
  XCircle,
  AlertTriangle
} from 'lucide-react';


export interface DataCatalogPageProps {
  lang: 'vi' | 'en';
  onNavigate: (route: string) => void;
  onOpenLightbox?: (item: NasaMediaItem) => void;
  initialMissionId?: string;
}

export type DatasetStatus = 'Available' | 'Pending' | 'Needs Verification' | 'Not Available';

export interface AbandonedSpacecraftRecord {
  id: string;
  name: string;
  category: string;
  target: 'Moon' | 'Mars' | 'Ceres_orbit' | '433_Eros' | 'heliocentric_space' | 'earth_trailing_orbit';
  status: string;
  nssdc_id: string | null;
  source_url: string;
  latitude: number | null;
  longitude: number | null;
  coordinate_system: string | null;
  image_url: string | null;
  image_page: string | null;
  story: string;
}

export interface VisualAssetManifestRow {
  object_id: string;
  title: string;
  source_organization: string;
  source_page: string;
  direct_image_url: string;
  format: string;
  resolution: string;
  recommended_use: string;
  license_note: string;
  verification_status: DatasetStatus;
}

/**
 * Canonical 17 objects from `public/data/antigravity/abandoned_spacecraft.json`
 * Embedded as baseline so the catalog renders with zero latency and works offline/file://,
 * while also syncing with `/data/antigravity/abandoned_spacecraft.json` when served over HTTP.
 */
const INITIAL_ABANDONED_SPACECRAFT: AbandonedSpacecraftRecord[] = [
  {
    id: 'apollo11_eagle_descent_stage',
    name: 'Apollo 11 Lunar Module Eagle descent stage',
    category: 'lunar_module_descent_stage',
    target: 'Moon',
    status: 'left_on_surface_as_launch_platform',
    nssdc_id: '1969-059C',
    source_url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C',
    latitude: null,
    longitude: null,
    coordinate_system: null,
    image_url: 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/7adb5312-1ae8-5238-a65c-06f13b66a23f/fd20440b-847a-5a6c-8bc4-b4bae6ca5219.jpg',
    image_page: 'https://sciencephotogallery.com/featured/apollo-11-moon-landing-site-and-descent-stage-tim-brownscience-photo-library.html',
    story: 'The Eagle descent stage remained on the Moon as the launch platform for the ascent stage.'
  },
  {
    id: 'apollo_lrv',
    name: 'Apollo Lunar Roving Vehicle',
    category: 'lunar_rover',
    target: 'Moon',
    status: 'parked_on_surface',
    nssdc_id: '1971-063C',
    source_url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C',
    latitude: null,
    longitude: null,
    coordinate_system: null,
    image_url: null,
    image_page: null,
    story: 'Three electric lunar rovers driven by astronauts were left parked on the Moon.'
  },
  {
    id: 'apollo_alsep',
    name: 'Apollo Lunar Surface Experiments Package',
    category: 'surface_science_package',
    target: 'Moon',
    status: 'left_for_science',
    nssdc_id: '1969-099C',
    source_url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C',
    latitude: null,
    longitude: null,
    coordinate_system: null,
    image_url: null,
    image_page: null,
    story: 'ALSEP included seismometers, retroreflectors, and other instruments left to conduct science after crew departure.'
  },
  {
    id: 'surveyor_3',
    name: 'Surveyor 3',
    category: 'robotic_lunar_lander',
    target: 'Moon',
    status: 'landed_on_surface',
    nssdc_id: null,
    source_url: 'https://science.nasa.gov/mission/surveyor-3/',
    latitude: null,
    longitude: null,
    coordinate_system: null,
    image_url: null,
    image_page: null,
    story: 'A robotic probe sent in the 1960s to demonstrate soft landing; later visited by Apollo 12 astronauts.'
  },
  {
    id: 'mars_pathfinder_sojourner',
    name: 'Mars Pathfinder / Sojourner',
    category: 'mars_lander_and_rover',
    target: 'Mars',
    status: 'inactive_on_surface',
    nssdc_id: null,
    source_url: 'https://science.nasa.gov/mission/mars-pathfinder/',
    latitude: null,
    longitude: null,
    coordinate_system: null,
    image_url: 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/7a11a542-c7a3-50eb-a0aa-a888891fe19a/aa3fae9b-6a90-59fb-a720-19c43459295a.jpg',
    image_page: 'https://www.jpl.nasa.gov/missions/mars-pathfinder-sojourner-rover/',
    story: 'The first rover on Mars in 1997, delivered by the Pathfinder lander; now permanently parked.'
  },
  {
    id: 'spirit',
    name: 'Spirit',
    category: 'mars_rover',
    target: 'Mars',
    status: 'inactive',
    nssdc_id: null,
    source_url: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/',
    latitude: null,
    longitude: null,
    coordinate_system: null,
    image_url: 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/b103ffb6-3883-5d9e-8aa6-9713529811b9/8838803a-df26-5ac3-ba77-61122ab919c0.jpg',
    image_page: 'https://science.nasa.gov/resource/mars-exploration-rovers-spirit-opportunity-artists-concept/',
    story: 'Twin rover that operated for years and is now inactive.'
  },
  {
    id: 'opportunity',
    name: 'Opportunity',
    category: 'mars_rover',
    target: 'Mars',
    status: 'inactive',
    nssdc_id: null,
    source_url: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/',
    latitude: null,
    longitude: null,
    coordinate_system: null,
    image_url: 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/b103ffb6-3883-5d9e-8aa6-9713529811b9/8838803a-df26-5ac3-ba77-61122ab919c0.jpg',
    image_page: 'https://science.nasa.gov/resource/mars-exploration-rovers-spirit-opportunity-artists-concept/',
    story: 'Twin rover that operated for years and is now inactive.'
  },
  {
    id: 'viking_1',
    name: 'Viking 1',
    category: 'mars_lander',
    target: 'Mars',
    status: 'remained_at_landing_site',
    nssdc_id: null,
    source_url: 'https://science.nasa.gov/mission/viking-1/',
    latitude: null,
    longitude: null,
    coordinate_system: null,
    image_url: 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/90caefd4-288c-5a08-95b1-900365639ecc/8838803a-df26-5ac3-ba77-61122ab919c0.jpg',
    image_page: 'https://science.nasa.gov/resource/first-color-image-from-viking-lander-1/',
    story: 'First U.S. lander to successfully operate on Mars in 1976; remained at its landing site.'
  },
  {
    id: 'viking_2',
    name: 'Viking 2',
    category: 'mars_lander',
    target: 'Mars',
    status: 'remained_at_landing_site',
    nssdc_id: null,
    source_url: 'https://science.nasa.gov/mission/viking-2/',
    latitude: null,
    longitude: null,
    coordinate_system: null,
    image_url: null,
    image_page: null,
    story: 'First U.S. lander to successfully operate on Mars in 1976; remained at its landing site.'
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    category: 'mars_lander',
    target: 'Mars',
    status: 'lost_power',
    nssdc_id: null,
    source_url: 'https://science.nasa.gov/mission/phoenix/',
    latitude: null,
    longitude: null,
    coordinate_system: null,
    image_url: null,
    image_page: null,
    story: 'Dug for water ice; eventually lost power.'
  },
  {
    id: 'insight',
    name: 'InSight',
    category: 'mars_lander',
    target: 'Mars',
    status: 'lost_power',
    nssdc_id: null,
    source_url: 'https://science.nasa.gov/mission/insight/',
    latitude: null,
    longitude: null,
    coordinate_system: null,
    image_url: null,
    image_page: null,
    story: 'Listened for marsquakes; eventually lost power.'
  },
  {
    id: 'ingenuity',
    name: 'Ingenuity Mars Helicopter',
    category: 'mars_helicopter',
    target: 'Mars',
    status: 'stationary_artifact_after_rotor_damage',
    nssdc_id: null,
    source_url: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/',
    latitude: null,
    longitude: null,
    coordinate_system: null,
    image_url: 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/380895f1-911d-5a1e-ae26-9adce9bbab23/aec8f940-3469-5597-816f-0dd903b3407c.jpg',
    image_page: 'https://www.space.com/mars-helicopter-ingenuity-perseverance-photo-flight-51',
    story: 'First aircraft on another planet; sustained rotor damage and became a stationary artifact.'
  },
  {
    id: 'dawn',
    name: 'Dawn',
    category: 'spacecraft',
    target: 'Ceres_orbit',
    status: 'unpowered_orbit',
    nssdc_id: null,
    source_url: 'https://science.nasa.gov/mission/dawn/',
    latitude: null,
    longitude: null,
    coordinate_system: null,
    image_url: 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/2dfe99cf-8ddb-579b-b729-4bdf50b7926a/c8f463dd-1a09-50bf-9c00-2c85ead8a2c3.jpg',
    image_page: 'https://svs.gsfc.nasa.gov/30764',
    story: 'Mapped Vesta and Ceres; ran out of fuel and remains in an unpowered orbit around Ceres.'
  },
  {
    id: 'near_shoemaker',
    name: 'NEAR Shoemaker',
    category: 'asteroid_orbiter_and_lander',
    target: '433_Eros',
    status: 'resting_on_surface',
    nssdc_id: null,
    source_url: 'https://science.nasa.gov/mission/near-shoemaker/',
    latitude: null,
    longitude: null,
    coordinate_system: null,
    image_url: null,
    image_page: null,
    story: 'First spacecraft to orbit and land on an asteroid; left resting on the surface of 433 Eros.'
  },
  {
    id: 'pioneer_10',
    name: 'Pioneer 10',
    category: 'deep_space_probe',
    target: 'heliocentric_space',
    status: 'drifting_out_of_solar_system',
    nssdc_id: null,
    source_url: 'https://science.nasa.gov/mission/pioneer-10/',
    latitude: null,
    longitude: null,
    coordinate_system: null,
    image_url: null,
    image_page: null,
    story: 'Early deep-space probe that explored the outer planets and now drifts out of the solar system.'
  },
  {
    id: 'pioneer_11',
    name: 'Pioneer 11',
    category: 'deep_space_probe',
    target: 'heliocentric_space',
    status: 'drifting_out_of_solar_system',
    nssdc_id: null,
    source_url: 'https://science.nasa.gov/mission/pioneer-11/',
    latitude: null,
    longitude: null,
    coordinate_system: null,
    image_url: null,
    image_page: null,
    story: 'Early deep-space probe that explored the outer planets and now drifts out of the solar system.'
  },
  {
    id: 'kepler',
    name: 'Kepler Space Telescope',
    category: 'space_telescope',
    target: 'earth_trailing_orbit',
    status: 'out_of_fuel_drifting',
    nssdc_id: null,
    source_url: 'https://science.nasa.gov/mission/kepler/',
    latitude: null,
    longitude: null,
    coordinate_system: null,
    image_url: null,
    image_page: null,
    story: 'Revolutionary exoplanet-hunting telescope that ran out of fuel and drifts in an Earth-trailing orbit.'
  }
];

/**
 * Bilingual VI annotations & cross-reference metadata for the 17 objects in `abandoned_spacecraft.json`
 */
const SPACECRAFT_BILINGUAL_META: Record<
  string,
  {
    story_vi: string;
    category_vi: string;
    status_vi: string;
    verification_status: DatasetStatus;
    verification_note_vi: string;
    verification_note_en: string;
    seed_slug?: string;
    journey_route?: string;
    local_media_id?: string;
  }
> = {
  apollo11_eagle_descent_stage: {
    story_vi: 'Tầng hạ cánh của mô-đun Mặt Trăng Eagle ở lại tại Biển Tĩnh Lặng làm bệ phóng cho tầng cất cánh đưa phi hành gia trở về.',
    category_vi: 'Tầng hạ cánh mô-đun Mặt Trăng',
    status_vi: 'Để lại trên bề mặt làm bệ phóng',
    verification_status: 'Needs Verification',
    verification_note_vi: 'Đã xác minh mã NSSDCA 1969-059C; ảnh minh họa từ Science Photo Library cần kiểm tra bản quyền trước khi nhúng.',
    verification_note_en: 'Verified NSSDCA ID 1969-059C; thumbnail from Science Photo Library requires license check before embedding.'
  },
  apollo_lrv: {
    story_vi: 'Ba xe tự hành điện Mặt Trăng (LRV) do các phi hành gia Apollo 15, 16, 17 điều khiển hiện vẫn đỗ lại trên bề mặt Mặt Trăng.',
    category_vi: 'Xe tự hành Mặt Trăng có người lái',
    status_vi: 'Đỗ trên bề mặt Mặt Trăng',
    verification_status: 'Available',
    verification_note_vi: 'Đã xác minh mã NSSDCA 1971-063C (Apollo 15 LRV); tọa độ trắc địa đang chờ chuẩn hóa CRS.',
    verification_note_en: 'Verified NSSDCA ID 1971-063C (Apollo 15 LRV); selenographic coordinates pending CRS standardization.'
  },
  apollo_alsep: {
    story_vi: 'Tổ hợp thí nghiệm bề mặt Mặt Trăng (ALSEP) gồm máy đo địa chấn, gương phản xạ laser LRRR và các thiết bị khoa học hoạt động sau khi phi hành đoàn rời đi.',
    category_vi: 'Tổ hợp thí nghiệm khoa học bề mặt',
    status_vi: 'Để lại phục vụ nghiên cứu khoa học',
    verification_status: 'Available',
    verification_note_vi: 'Đã xác minh mã NSSDCA 1969-099C; liên kết với hồ sơ Gương phản xạ laser Apollo LRRR trong kho tư liệu.',
    verification_note_en: 'Verified NSSDCA ID 1969-099C; cross-linked with Apollo LRRR retroreflector archive profile.',
    seed_slug: 'apollo-lrrr',
    local_media_id: 'IMG-LRR-01'
  },
  surveyor_3: {
    story_vi: 'Tàu đổ bộ robot gửi lên Mặt Trăng tháng 4/1967 để chứng minh kỹ thuật hạ cánh mềm; được phi hành gia Apollo 12 đến thăm vào tháng 11/1969.',
    category_vi: 'Tàu đổ bộ Mặt Trăng tự động',
    status_vi: 'Đã hạ cánh trên bề mặt (Apollo 12 thu hồi camera)',
    verification_status: 'Available',
    verification_note_vi: 'Có Hồ sơ Kỹ thuật Chuyên sâu (Demo Record) + 5 báo cáo kỹ thuật NASA NTRS phục vụ mô phỏng.',
    verification_note_en: 'Linked to Core Hardware Seed Profile (Demo Record) + 5 NASA NTRS technical reports.',
    seed_slug: 'surveyor-3',
    local_media_id: 'IMG-SUR-01'
  },
  mars_pathfinder_sojourner: {
    story_vi: 'Rover sáu bánh đầu tiên của NASA trên Sao Hỏa năm 1997, được trạm đổ bộ Mars Pathfinder đưa xuống Ares Vallis; hoạt động 83 sol so với kế hoạch 7 ngày.',
    category_vi: 'Tàu đổ bộ & Rover tự hành Sao Hỏa',
    status_vi: 'Ngừng hoạt động trên bề mặt',
    verification_status: 'Available',
    verification_note_vi: 'Có Hồ sơ Kỹ thuật Chuyên sâu (Demo Record) và tư liệu ảnh NASA/JPL chính thức.',
    verification_note_en: 'Linked to Core Hardware Seed Profile (Demo Record) and verified NASA/JPL media.',
    seed_slug: 'sojourner',
    local_media_id: 'IMG-SOJ-01'
  },
  spirit: {
    story_vi: 'Rover song sinh với Opportunity hoạt động tại hố Gusev từ 2004 đến 2010; phát hiện đất giàu 90% silica nhờ bánh xe bị kẹt.',
    category_vi: 'Xe tự hành Sao Hỏa (MER-A)',
    status_vi: 'Ngừng liên lạc tại Home Plate (Troy)',
    verification_status: 'Available',
    verification_note_vi: 'Đã xác minh nguồn NASA Science và ảnh tư liệu PIA09403 trong kho nội bộ.',
    verification_note_en: 'Verified NASA Science source and curated PIA09403 local archival media.',
    seed_slug: 'spirit',
    local_media_id: 'IMG-SPI-01'
  },
  opportunity: {
    story_vi: 'Rover song sinh hoạt động gần 15 năm (5.111 sol so với thiết kế 90 sol), di chuyển 45,16 km và chứng minh môi trường nước cổ đại trên Sao Hỏa.',
    category_vi: 'Xe tự hành Sao Hỏa (MER-B)',
    status_vi: 'Ngừng liên lạc sau bão bụi toàn cầu 2018',
    verification_status: 'Available',
    verification_note_vi: 'Hồ sơ Triển lãm Trọng tâm (Featured Deep Exhibition) — đầy đủ thông số, timeline, âm thanh & sơ đồ.',
    verification_note_en: 'Featured Deep Exhibition Profile — complete specs, timeline, audio narrative & schematics.',
    seed_slug: 'opportunity',
    journey_route: '/hanh-trinh?mission=opportunity',
    local_media_id: 'IMG-OPP-PIA15114'
  },
  viking_1: {
    story_vi: 'Tàu đổ bộ đầu tiên của Hoa Kỳ/NASA vận hành thành công trên bề mặt Sao Hỏa (20/07/1976); hiện vẫn nằm tại Chryse Planitia.',
    category_vi: 'Tàu đổ bộ Sao Hỏa (kèm Tàu quỹ đạo)',
    status_vi: 'Nằm lại tại địa điểm hạ cánh Chryse Planitia',
    verification_status: 'Needs Verification',
    verification_note_vi: 'Có Hồ sơ Kỹ thuật (Demo Record); ngày ngừng hoạt động cụ thể trong tháng 11/1982 cần đối chiếu thêm giữa các trang tóm tắt NASA.',
    verification_note_en: 'Linked to Core Seed Profile (Demo Record); exact day in Nov 1982 lander end-of-contact flagged for curator cross-check.',
    seed_slug: 'viking-1',
    local_media_id: 'IMG-VIK-01'
  },
  viking_2: {
    story_vi: 'Tàu đổ bộ chị em với Viking 1 hạ cánh tại Utopia Planitia năm 1976; hiện vẫn nằm lại tại địa điểm hạ cánh.',
    category_vi: 'Tàu đổ bộ Sao Hỏa',
    status_vi: 'Nằm lại tại địa điểm hạ cánh Utopia Planitia',
    verification_status: 'Pending',
    verification_note_vi: 'Đã có liên kết nguồn NASA Science; đang chờ bổ sung mã NSSDCA ID, ảnh cục bộ và tọa độ IAU.',
    verification_note_en: 'Official NASA Science link verified; awaiting NSSDCA ID, local media asset, and IAU coordinates.'
  },
  phoenix: {
    story_vi: 'Tàu đổ bộ vùng cực bắc Sao Hỏa năm 2008, đào và xác nhận băng nước dưới bề mặt trước khi cạn năng lượng trong mùa đông Sao Hỏa.',
    category_vi: 'Tàu đổ bộ Sao Hỏa',
    status_vi: 'Mất nguồn điện do mùa đông cực bắc',
    verification_status: 'Pending',
    verification_note_vi: 'Đã xác minh nguồn NASA Science; đang chờ bổ sung mã NSSDCA ID và bộ thông số chi tiết.',
    verification_note_en: 'Verified NASA Science mission page; awaiting NSSDCA ID and extended instrument table.'
  },
  insight: {
    story_vi: 'Trạm địa chấn cố định lắng nghe 1.319 trận động đất Sao Hỏa (marsquakes) từ 2018 đến tháng 12/2022 trước khi bụi phủ kín pin mặt trời.',
    category_vi: 'Trạm đổ bộ địa chấn Sao Hỏa',
    status_vi: 'Cạn năng lượng do bụi phủ tấm pin mặt trời',
    verification_status: 'Available',
    verification_note_vi: 'Đã tích hợp hồ sơ mở rộng và ảnh selfie cuối cùng PIA25287 từ NASA Photojournal.',
    verification_note_en: 'Integrated extended profile and final selfie PIA25287 from NASA Photojournal.',
    seed_slug: 'insight',
    local_media_id: 'IMG-INS-01'
  },
  ingenuity: {
    story_vi: 'Trực thăng đầu tiên bay có điều khiển trên một hành tinh khác (72 chuyến bay); hỏng cánh quạt và trở thành hiện vật cố định tại Valinor Hills.',
    category_vi: 'Trực thăng thám hiểm Sao Hỏa',
    status_vi: 'Hiện vật tĩnh sau khi gãy chóp cánh quạt',
    verification_status: 'Needs Verification',
    verification_note_vi: 'Nguồn nhiệm vụ NASA chính thức; ảnh trong manifest lấy từ trang Space.com cần xác minh credit gốc NASA/JPL.',
    verification_note_en: 'Official NASA mission source; manifest image from Space.com requires official NASA/JPL credit verification.'
  },
  dawn: {
    story_vi: 'Tàu thăm dò sử dụng động cơ ion lập bản đồ tiểu hành tinh Vesta và hành tinh lùn Ceres; cạn nhiên liệu hydrazine và bay trên quỹ đạo không điều khiển quanh Ceres.',
    category_vi: 'Tàu vũ trụ quỹ đạo không gian sâu',
    status_vi: 'Quỹ đạo thụ động quanh hành tinh lùn Ceres',
    verification_status: 'Available',
    verification_note_vi: 'Đã xác minh trang nhiệm vụ NASA Science và tư liệu hình ảnh từ NASA SVS (30764).',
    verification_note_en: 'Verified NASA Science mission page and NASA SVS (30764) visual resource.'
  },
  near_shoemaker: {
    story_vi: 'Tàu vũ trụ đầu tiên bay quanh quỹ đạo và hạ cánh mềm xuống một tiểu hành tinh (433 Eros) ngày 12/02/2001.',
    category_vi: 'Tàu quỹ đạo & đổ bộ tiểu hành tinh',
    status_vi: 'Nằm yên trên bề mặt tiểu hành tinh 433 Eros',
    verification_status: 'Pending',
    verification_note_vi: 'Đã xác minh nguồn NASA Science; đang chờ bổ sung mã NSSDCA ID và hình ảnh lưu trữ.',
    verification_note_en: 'Verified NASA Science page; awaiting NSSDCA ID and curated image manifest.'
  },
  pioneer_10: {
    story_vi: 'Tàu thăm dò không gian sâu đầu tiên vượt qua vành đai tiểu hành tinh và bay ngang Sao Mộc (1973), hiện đang trôi hướng ra ngoài Hệ Mặt Trời.',
    category_vi: 'Tàu thăm dò không gian sâu',
    status_vi: 'Đang bay theo quỹ đạo thoát khỏi Hệ Mặt Trời',
    verification_status: 'Pending',
    verification_note_vi: 'Đã xác minh nguồn NASA Science; cần giữ tách biệt với hồ sơ Pioneer 11.',
    verification_note_en: 'Verified NASA Science page; kept strictly distinct from Pioneer 11 record.'
  },
  pioneer_11: {
    story_vi: 'Tàu vũ trụ đầu tiên bay qua Sao Thổ (01/09/1979) sau khi khảo sát Sao Mộc (1974), mang theo tấm bảng Pioneer Plaque hướng ra ngoài Hệ Mặt Trời.',
    category_vi: 'Tàu thăm dò không gian sâu (Pioneer-G)',
    status_vi: 'Ngừng liên lạc năm 1995 · Hướng ra ngoài Hệ Mặt Trời',
    verification_status: 'Available',
    verification_note_vi: 'Hồ sơ Triển lãm Trọng tâm (Featured Deep Exhibition) — đầy đủ sơ đồ kỹ thuật, Pioneer Plaque & timeline.',
    verification_note_en: 'Featured Deep Exhibition Profile — complete technical diagram, Pioneer Plaque & timeline.',
    seed_slug: 'pioneer-11',
    journey_route: '/hanh-trinh?mission=pioneer-11',
    local_media_id: 'IMG-PIO-02'
  },
  kepler: {
    story_vi: 'Kính viễn vọng không gian săn hành tinh ngoại hệ đã phát hiện hàng nghìn exoplanet; cạn nhiên liệu năm 2018 và trôi trên quỹ đạo bám theo Trái Đất quanh Mặt Trời.',
    category_vi: 'Kính viễn vọng không gian',
    status_vi: 'Cạn nhiên liệu trên quỹ đạo bám theo Trái Đất',
    verification_status: 'Pending',
    verification_note_vi: 'Đã xác minh nguồn NASA Science; đang chờ bổ sung mã NSSDCA ID và thông số quỹ đạo nhật tâm.',
    verification_note_en: 'Verified NASA Science page; awaiting NSSDCA ID and heliocentric orbital elements.'
  }
};

/**
 * Exact 6 rows from `public/data/antigravity/visual_assets_manifest.csv`
 */
const VISUAL_ASSETS_MANIFEST: VisualAssetManifestRow[] = [
  {
    object_id: 'apollo11_eagle_descent_stage',
    title: 'Apollo 11 Lunar Module descent stage on the Moon',
    source_organization: 'Science Photo Library',
    source_page: 'https://sciencephotogallery.com/featured/apollo-11-moon-landing-site-and-descent-stage-tim-brownscience-photo-library.html',
    direct_image_url: 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/7adb5312-1ae8-5238-a65c-06f13b66a23f/fd20440b-847a-5a6c-8bc4-b4bae6ca5219.jpg',
    format: 'JPG',
    resolution: '900x675',
    recommended_use: 'hero_card',
    license_note: 'Check license before embedding',
    verification_status: 'Needs Verification'
  },
  {
    object_id: 'mars_pathfinder_sojourner',
    title: 'Mars Pathfinder lander and Sojourner rover illustration',
    source_organization: 'NASA JPL',
    source_page: 'https://www.jpl.nasa.gov/missions/mars-pathfinder-sojourner-rover/',
    direct_image_url: 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/7a11a542-c7a3-50eb-a0aa-a888891fe19a/aa3fae9b-6a90-59fb-a720-19c43459295a.jpg',
    format: 'JPG',
    resolution: '1820x1024',
    recommended_use: 'mars_story_card',
    license_note: 'NASA/JPL source page',
    verification_status: 'Available'
  },
  {
    object_id: 'ingenuity',
    title: 'Ingenuity final resting-place aerial view',
    source_organization: 'Space.com',
    source_page: 'https://www.space.com/mars-helicopter-ingenuity-perseverance-photo-flight-51',
    direct_image_url: 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/380895f1-911d-5a1e-ae26-9adce9bbab23/aec8f940-3469-5597-816f-0dd903b3407c.jpg',
    format: 'JPG',
    resolution: '1280x949',
    recommended_use: 'mars_story_card',
    license_note: 'Verify NASA image credit',
    verification_status: 'Needs Verification'
  },
  {
    object_id: 'spirit_opportunity',
    title: 'Spirit and Opportunity artist concept',
    source_organization: 'NASA Science',
    source_page: 'https://science.nasa.gov/resource/mars-exploration-rovers-spirit-opportunity-artists-concept/',
    direct_image_url: 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/b103ffb6-3883-5d9e-8aa6-9713529811b9/8838803a-df26-5ac3-ba77-61122ab919c0.jpg',
    format: 'JPG',
    resolution: '1600x891',
    recommended_use: 'mars_story_card',
    license_note: 'NASA official resource (Artist Concept — label clearly as illustration)',
    verification_status: 'Available'
  },
  {
    object_id: 'viking_1',
    title: 'First color image from Viking Lander 1',
    source_organization: 'NASA Science',
    source_page: 'https://science.nasa.gov/resource/first-color-image-from-viking-lander-1/',
    direct_image_url: 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/90caefd4-288c-5a08-95b1-900365639ecc/8838803a-df26-5ac3-ba77-61122ab919c0.jpg',
    format: 'JPG',
    resolution: '563x512',
    recommended_use: 'mars_story_card',
    license_note: 'NASA official resource',
    verification_status: 'Available'
  },
  {
    object_id: 'dawn_ceres',
    title: 'Dawn image of bright spots in Occator Crater, Ceres',
    source_organization: 'NASA SVS',
    source_page: 'https://svs.gsfc.nasa.gov/30764',
    direct_image_url: 'https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/2dfe99cf-8ddb-579b-b729-4bdf50b7926a/c8f463dd-1a09-50bf-9c00-2c85ead8a2c3.jpg',
    format: 'JPG',
    resolution: '2010x1024',
    recommended_use: 'deep_space_story_card',
    license_note: 'NASA official resource',
    verification_status: 'Available'
  }
];

/**
 * 5 Core Hardware Seed metadata from `data/nasa_hardware_seed.json`
 */
const CORE_SEED_RECORDS_META: Record<
  string,
  {
    official_name: string;
    record_state: 'featured_exhibition' | 'demo_record';
    demo_level: 'deep' | 'compact';
    short_hook_vi: string;
    short_hook_en: string;
    summary_en: string;
    primary_achievement_en: string;
    media_search_queries: string[];
    dataset_status: DatasetStatus;
  }
> = {
  opportunity: {
    official_name: 'Mars Exploration Rover B (MER-B)',
    record_state: 'featured_exhibition',
    demo_level: 'deep',
    short_hook_vi: 'Một robot được thiết kế cho 90 ngày Sao Hỏa nhưng đã khám phá gần 15 năm (5.111 sol) và di chuyển 45,16 km.',
    short_hook_en: 'A solar-powered rover engineered for a 90-sol mission that explored Mars for nearly 15 years (5,111 sols) and drove 45.16 km.',
    summary_en: 'Opportunity explored Meridiani Planum and Endeavour Crater, analyzing rocks and soils to confirm past liquid water environments on Mars. Designed for 90 sols, it operated for nearly 15 years until a planet-encircling dust storm ended communications on June 10, 2018 (mission declared complete February 13, 2019).',
    primary_achievement_en: 'Discovered hematitic concretions ("blueberries"), gypsum veins, and clay minerals proving ancient liquid water environments; drove 45.16 km (an off-world record surpassed by Perseverance on October 11, 2026).',
    media_search_queries: [
      'Mars Exploration Rover Opportunity NASA rover full spacecraft',
      'NASA Opportunity final panorama Perseverance Valley',
      'NASA Opportunity rover robotic arm APXS'
    ],
    dataset_status: 'Available'
  },
  'pioneer-11': {
    official_name: 'Pioneer-G / Pioneer 11',
    record_state: 'featured_exhibition',
    demo_level: 'deep',
    short_hook_vi: 'Con tàu tiên phong đầu tiên đưa nhân loại bay qua Sao Thổ và mang tấm bảng Pioneer Plaque hướng ra ngoài Hệ Mặt Trời.',
    short_hook_en: 'The trailblazing deep-space probe that achieved humanity’s first flyby of Saturn and carries the gold-anodized Pioneer Plaque.',
    summary_en: 'Launched on April 6, 1973 (UTC), Pioneer 11 flew past Jupiter (Dec 3, 1974) and became the first spacecraft to fly by Saturn (Sept 1, 1979), discovering Saturn’s F ring and new moons. Last routine NASA Ames contact occurred Sept 30, 1995, with final engineering data received Nov 24, 1995.',
    primary_achievement_en: 'First spacecraft in history to fly by Saturn (1979), discovered Saturn’s F ring, mapped Jupiter’s polar regions and magnetosphere, and carries the Pioneer Plaque (distinct from the Voyager Golden Record).',
    media_search_queries: [
      'NASA Pioneer 11 spacecraft model photograph',
      'Pioneer 11 Saturn flyby NASA image',
      'NASA Pioneer plaque Pioneer 11 closeup'
    ],
    dataset_status: 'Available'
  },
  'surveyor-3': {
    official_name: 'Surveyor-C / Surveyor 3 Lunar Lander',
    record_state: 'demo_record',
    demo_level: 'compact',
    short_hook_vi: 'Tàu đổ bộ Mặt Trăng tự động năm 1967 được các phi hành gia Apollo 12 trực tiếp ghé thăm và thu hồi camera sau 2,5 năm.',
    short_hook_en: 'A 1967 robotic lunar lander visited in person by Apollo 12 astronauts in November 1969, who returned its TV camera to Earth.',
    summary_en: 'Surveyor 3 launched April 17, 1967 and soft-landed on the Moon in Oceanus Procellarum on April 20, 1967 (00:04 UT). It transmitted 6,326 television pictures and dug trenches up to 18 cm deep with its surface sampler before final contact on May 4, 1967. In November 1969, Apollo 12 astronauts Pete Conrad and Alan Bean landed ~600 feet away and retrieved its TV camera for study.',
    primary_achievement_en: 'Proved the lunar regolith could support Apollo Lunar Module landings, transmitted 6,326 TV frames, and became the only spacecraft visited on another world by human astronauts.',
    media_search_queries: [
      'NASA Surveyor 3 Apollo 12 lunar surface spacecraft',
      'NASA Surveyor 3 lunar lander TV camera'
    ],
    dataset_status: 'Available'
  },
  'viking-1': {
    official_name: 'Viking 1 Orbiter and Lander',
    record_state: 'demo_record',
    demo_level: 'compact',
    short_hook_vi: 'Tàu đổ bộ thực hiện cuộc hạ cánh thành công đầu tiên của NASA xuống bề mặt Sao Hỏa ngày 20/07/1976.',
    short_hook_en: 'NASA’s first truly successful Mars landing (July 20, 1976), returning the first surface photographs from Chryse Planitia.',
    summary_en: 'Viking 1 consisted of an orbiter and a lander. Launched August 20, 1975, it entered Mars orbit June 19, 1976, and Viking Lander 1 touched down at Chryse Planitia on July 20, 1976. It captured the first photographs from the Martian surface and conducted meteorological, chemical, and biological experiments. Orbiter operations ended August 7, 1980; lander operations ceased in November 1982.',
    primary_achievement_en: 'Achieved NASA’s first successful Mars surface landing, returned historic surface panoramas (PIA00381), and established foundational atmospheric and soil chemistry baselines.',
    media_search_queries: [
      'NASA Viking 1 Mars lander first surface photograph',
      'NASA Viking 1 lander panorama Mars'
    ],
    dataset_status: 'Needs Verification'
  },
  sojourner: {
    official_name: 'Mars Pathfinder Sojourner Rover',
    record_state: 'demo_record',
    demo_level: 'compact',
    short_hook_vi: 'Chiếc micro-rover 6 bánh đầu tiên trên Sao Hỏa hoạt động bền bỉ 83 sol so với kế hoạch ban đầu chỉ 7 ngày.',
    short_hook_en: 'The first wheeled Mars rover, operating for 83 sols against a planned seven-day mission aboard Mars Pathfinder.',
    summary_en: 'Delivered to Ares Vallis on July 4, 1997 by the Mars Pathfinder lander (launched Dec 4, 1996), the six-wheeled Sojourner rover investigated rocks such as Barnacle Bill and Yogi using its Alpha Proton X-ray Spectrometer (APXS). Pathfinder received its final data transmission on September 27, 1997 (10:23 UTC).',
    primary_achievement_en: 'Demonstrated airbag-assisted landing and autonomous six-wheel rover mobility on Mars, operating 83 sols vs. a 7-day baseline.',
    media_search_queries: [
      'NASA Sojourner rover Mars Pathfinder official image',
      'NASA Sojourner rover APXS Yogi rock',
      'NASA Pathfinder airbags rover Mars'
    ],
    dataset_status: 'Available'
  }
};

const TARGET_LABELS: Record<string, { vi: string; en: string; frame_vi: string; frame_en: string }> = {
  Moon: {
    vi: 'Mặt Trăng (Moon)',
    en: 'The Moon',
    frame_vi: 'Bề mặt Mặt Trăng (Selenographic CRS)',
    frame_en: 'Lunar Surface (Selenographic CRS)'
  },
  Mars: {
    vi: 'Sao Hỏa (Mars)',
    en: 'Mars',
    frame_vi: 'Bề mặt Sao Hỏa (Areographic / IAU Mars 2000)',
    frame_en: 'Martian Surface (Areographic / IAU Mars 2000)'
  },
  Ceres_orbit: {
    vi: 'Quỹ đạo Ceres (Ceres Orbit)',
    en: 'Ceres Orbit',
    frame_vi: 'Quỹ đạo hành tinh lùn Ceres (Vành đai chính)',
    frame_en: 'Dwarf Planet Ceres Orbit (Main Belt)'
  },
  '433_Eros': {
    vi: 'Tiểu hành tinh 433 Eros',
    en: 'Asteroid 433 Eros',
    frame_vi: 'Bề mặt tiểu hành tinh gần Trái Đất 433 Eros',
    frame_en: 'Near-Earth Asteroid 433 Eros Surface'
  },
  heliocentric_space: {
    vi: 'Không gian Nhật tâm / Liên sao',
    en: 'Heliocentric Escape Trajectory',
    frame_vi: 'Quỹ đạo thoát Hệ Mặt Trời (Heliocentric)',
    frame_en: 'Solar System Escape Trajectory (Heliocentric)'
  },
  earth_trailing_orbit: {
    vi: 'Quỹ đạo bám theo Trái Đất',
    en: 'Earth-Trailing Heliocentric Orbit',
    frame_vi: 'Quỹ đạo Nhật tâm bám đuôi Trái Đất',
    frame_en: 'Earth-Trailing Heliocentric Orbit'
  }
};


/* ============================================================================
 * PLAIN-LANGUAGE TRANSLATION MAPS (NO RAW SCHEMA STRINGS IN PRIMARY UI)
 * ============================================================================ */
const DATA_STATUS_LABELS: Record<
  DatasetStatus,
  { vi: string; en: string; descVi: string; descEn: string; classes: string; dotColor: string }
> = {
  Available: {
    vi: 'Đã xác minh',
    en: 'Verified',
    descVi: 'Thông số đã đối chiếu từ nguồn chính thức NASA / JPL / NSSDCA.',
    descEn: 'Cross-checked directly against official NASA / JPL / NSSDCA publications.',
    classes: 'bg-emerald-950/75 text-emerald-300 border-emerald-500/40',
    dotColor: 'bg-emerald-400'
  },
  'Needs Verification': {
    vi: 'Cần kiểm tra thêm',
    en: 'Needs Review',
    descVi: 'Có tư liệu nền, nhưng một vài mốc ngày hoặc bản quyền ảnh đang chờ đối chiếu thêm.',
    descEn: 'Baseline record exists, with specific timestamps or image credits queued for audit.',
    classes: 'bg-[#3A2714]/85 text-[#F4B97B] border-[#D2A071]/50',
    dotColor: 'bg-[#D2A071]'
  },
  Pending: {
    vi: 'Đang bổ sung dữ liệu',
    en: 'Supplementing Data',
    descVi: 'Đã xác minh nhiệm vụ chính; đang hoàn thiện thêm tọa độ hành tinh hoặc mã lưu trữ.',
    descEn: 'Mission link verified; planetary coordinates or extended telemetry currently in progress.',
    classes: 'bg-[#162A40] text-sky-300 border-sky-400/40',
    dotColor: 'bg-sky-400'
  },
  'Not Available': {
    vi: 'Chưa có dữ liệu',
    en: 'Data Unavailable',
    descVi: 'NASA chưa công bố hoặc không áp dụng thông số này.',
    descEn: 'Field not published by NASA or inapplicable to this craft.',
    classes: 'bg-[#162A40] text-[#AAB8C7] border-[#AAB8C7]/35',
    dotColor: 'bg-[#AAB8C7]'
  }
};

const DATA_PLAIN_CATEGORY_LABELS: Record<string, { vi: string; en: string }> = {
  lunar_module_descent_stage: { vi: 'Tầng hạ cánh tàu đổ bộ Mặt Trăng', en: 'Lunar Lander Descent Stage' },
  lunar_rover: { vi: 'Xe tự hành Mặt Trăng có phi hành gia', en: 'Crewed Lunar Rover' },
  surface_science_package: { vi: 'Trạm thí nghiệm khoa học bề mặt', en: 'Surface Science Station' },
  robotic_lunar_lander: { vi: 'Tàu đổ bộ Mặt Trăng tự động', en: 'Robotic Lunar Lander' },
  mars_lander_and_rover: { vi: 'Trạm đổ bộ & Xe tự hành Sao Hỏa', en: 'Mars Lander & Micro-Rover' },
  mars_rover: { vi: 'Xe tự hành thám hiểm Sao Hỏa', en: 'Mars Exploration Rover' },
  mars_lander: { vi: 'Tàu đổ bộ cố định trên Sao Hỏa', en: 'Stationary Mars Lander' },
  mars_helicopter: { vi: 'Trực thăng thám hiểm Sao Hỏa', en: 'Mars Rotorcraft Helicopter' },
  spacecraft: { vi: 'Tàu vũ trụ quỹ đạo động cơ ion', en: 'Ion-Propelled Deep Space Orbiter' },
  asteroid_orbiter_and_lander: { vi: 'Tàu bay quỹ đạo & đổ bộ tiểu hành tinh', en: 'Asteroid Orbiter & Lander' },
  deep_space_probe: { vi: 'Tàu thăm dò không gian sâu', en: 'Deep Space Interstellar Probe' },
  space_telescope: { vi: 'Kính viễn vọng không gian săn hành tinh', en: 'Exoplanet Space Telescope' }
};

const DATA_PLAIN_TARGET_LABELS: Record<string, { vi: string; en: string; group: 'moon' | 'mars' | 'deep' }> = {
  Moon: { vi: 'Mặt Trăng', en: 'The Moon', group: 'moon' },
  Mars: { vi: 'Sao Hỏa', en: 'Mars', group: 'mars' },
  Ceres_orbit: { vi: 'Hành tinh lùn Ceres (Vành đai tiểu hành tinh)', en: 'Dwarf Planet Ceres Orbit', group: 'deep' },
  '433_Eros': { vi: 'Tiểu hành tinh 433 Eros', en: 'Asteroid 433 Eros', group: 'deep' },
  heliocentric_space: { vi: 'Ngoài Hệ Mặt Trời (Không gian sâu)', en: 'Solar System Escape Trajectory', group: 'deep' },
  earth_trailing_orbit: { vi: 'Quỹ đạo quanh Mặt Trời (bám theo Trái Đất)', en: 'Earth-Trailing Heliocentric Orbit', group: 'deep' }
};

const DATA_PLAIN_LOCATION_NOTES: Record<string, { vi: string; en: string }> = {
  apollo11_eagle_descent_stage: {
    vi: 'Biển Tĩnh Lặng (Mare Tranquillitatis), Mặt Trăng — tọa độ bản đồ IAU đang được chuẩn hóa.',
    en: 'Sea of Tranquility (Mare Tranquillitatis), The Moon — awaiting standardized coordinate datum.'
  },
  apollo_lrv: {
    vi: 'Các thung lũng Hadley Rille, Descartes và Taurus–Littrow trên Mặt Trăng.',
    en: 'Hadley Rille, Descartes Highlands, and Taurus–Littrow regions of the Moon.'
  },
  apollo_alsep: {
    vi: 'Nhiều điểm hạ cánh Apollo (Apollo 11, 12, 14, 15, 16, 17) trên Mặt Trăng.',
    en: 'Multiple Apollo surface landing sites across the lunar near side.'
  },
  surveyor_3: {
    vi: 'Bên trong một miệng hố nhỏ tại Đại dương Bão Tố (Oceanus Procellarum), Mặt Trăng.',
    en: 'Inside a shallow crater in Oceanus Procellarum, The Moon (approx. 3.0°S, 23.4°W).'
  },
  mars_pathfinder_sojourner: {
    vi: 'Đồng bằng lũ cổ Ares Vallis, Sao Hỏa.',
    en: 'Ancient outflow channel Ares Vallis, Chryse Planitia, Mars.'
  },
  spirit: {
    vi: 'Điểm Troy gần khu vực Home Plate bên trong hố thiên thạch Gusev, Sao Hỏa.',
    en: 'Troy sand trap west of Home Plate inside Gusev Crater, Mars.'
  },
  opportunity: {
    vi: 'Thung lũng Perseverance Valley trên vành miệng hố Endeavour, Meridiani Planum, Sao Hỏa.',
    en: 'Perseverance Valley on the western rim of Endeavour Crater, Meridiani Planum, Mars.'
  },
  viking_1: {
    vi: 'Đồng bằng Chryse Planitia, bắc bán cầu Sao Hỏa.',
    en: 'Chryse Planitia lowland plains, Mars.'
  },
  viking_2: {
    vi: 'Vùng bình nguyên phía bắc Utopia Planitia, Sao Hỏa.',
    en: 'Northern lowland Utopia Planitia, Mars.'
  },
  phoenix: {
    vi: 'Thung lũng Vastitas Borealis gần vùng cực bắc Sao Hỏa.',
    en: 'Vastitas Borealis high-latitude arctic plains, Mars.'
  },
  insight: {
    vi: 'Đồng bằng dung nham phẳng Elysium Planitia gần xích đạo Sao Hỏa.',
    en: 'Flat volcanic plains of Elysium Planitia near the Martian equator.'
  },
  ingenuity: {
    vi: 'Đồi Valinor Hills, hố thiên thạch Jezero, Sao Hỏa (cách không xa Perseverance).',
    en: 'Valinor Hills ("Airfield Zeta") inside Jezero Crater, Mars.'
  },
  dawn: {
    vi: 'Quỹ đạo thụ động ổn định quanh hành tinh lùn Ceres (cách Mặt Trời ~2,77 AU).',
    en: 'Permanent unpowered orbit around dwarf planet Ceres (~2.77 AU).'
  },
  near_shoemaker: {
    vi: 'Đứng yên trên bề mặt tiểu hành tinh hình củ khoai 433 Eros.',
    en: 'Resting stationary on the regolith surface of near-Earth asteroid 433 Eros.'
  },
  pioneer_10: {
    vi: 'Đang bay vào không gian liên sao hướng về chòm sao Kim Ngưu (không áp dụng tọa độ bề mặt).',
    en: 'Deep heliocentric escape trajectory toward Aldebaran (planetary surface coordinates do not apply).'
  },
  pioneer_11: {
    vi: 'Đang bay ra ngoài Hệ Mặt Trời hướng về chòm sao Thuẫn Bài / Scutum (không áp dụng tọa độ bề mặt).',
    en: 'Outbound beyond the Solar System toward Scutum (planetary surface coordinates do not apply).'
  },
  kepler: {
    vi: 'Trôi trên quỹ đạo nhật tâm bám theo phía sau Trái Đất quanh Mặt Trời.',
    en: 'Heliocentric orbit trailing Earth around the Sun (~1 AU).'
  }
};

interface DataPlainInstrumentRow {
  id: string;
  name: string;
  missionName: string;
  missionId: string;
  categoryVi: string;
  categoryEn: string;
  roleVi: string;
  roleEn: string;
  sourceIds: string[];
}

interface DataModalSelection {
  title: string;
  subtitle: string;
  imageUrl: string | null;
  imageCaption: string;
  mediaItem?: NasaMediaItem | null;
  status: DatasetStatus;
  statusNote: string;
  overviewWhat: string;
  overviewWhy: string;
  overviewSpecial: string;
  missionOperator: string;
  missionDesignation: string;
  missionLaunchVehicle: string;
  missionDestination: string;
  missionActivePeriod: string;
  missionDisposition: string;
  milestones: { date: string; title: string; detail: string }[];
  instruments: { name: string; role: string }[];
  achievements: string[];
  honestNote?: string;
  techLocation: string;
  techMass: string;
  techPower: string;
  techNssdc: string;
  sources: { label: string; url: string }[];
  journeyRoute?: string;
  simRoute?: string;
}

const DATA_SURVEYOR_NTRS_DOCS = [
  {
    id: 'NTRS 19670028267',
    title: 'Surveyor III Mission Report, Part I: Mission Description and Performance',
    descVi: 'Báo cáo tổng kết quỹ đạo, quá trình hạ cánh và hiệu năng phần cứng của Surveyor 3.',
    descEn: 'Official NASA mission summary covering trajectory, soft landing, and spacecraft performance.',
    url: 'https://ntrs.nasa.gov/citations/19670028267'
  },
  {
    id: 'NTRS 19670028832',
    title: 'Surveyor III Mission Report, Part II: Scientific Results',
    descVi: 'Kết quả phân tích cơ học đất Mặt Trăng từ tay gầu và hơn 6.300 bức ảnh TV.',
    descEn: 'Soil mechanics findings from the surface sampler and 6,326 television photographs.',
    url: 'https://ntrs.nasa.gov/citations/19670028832'
  },
  {
    id: 'NTRS 19670028833',
    title: 'Surveyor III: Principal Scientific Results',
    descVi: 'Tóm tắt phát hiện khoa học trọng tâm chứng minh nền đất chịu tải cho chương trình Apollo.',
    descEn: 'Principal scientific conclusions proving lunar regolith bearing strength for Apollo.',
    url: 'https://ntrs.nasa.gov/citations/19670028833'
  },
  {
    id: 'NTRS 19690009698',
    title: 'Surveyor III Flight Paths and Tracking Data (PDF)',
    descVi: 'Dữ liệu theo dõi đường bay và vận tốc hạ cánh qua mạng Deep Space Network.',
    descEn: 'Deep Space Network flight path tracking and descent telemetry report.',
    url: 'https://ntrs.nasa.gov/api/citations/19690009698/downloads/19690009698.pdf'
  },
  {
    id: 'NTRS 19720019081',
    title: 'Apollo 12 Analysis of Surveyor 3 Material Returned to Earth',
    descVi: 'Nghiên cứu camera và linh kiện Surveyor 3 do phi hành gia Apollo 12 tháo mang về Trái Đất.',
    descEn: 'Laboratory examination of Surveyor 3 parts retrieved by Apollo 12 astronauts after 2.5 years.',
    url: 'https://ntrs.nasa.gov/citations/19720019081'
  }
];

export const DataCatalogPage: React.FC<DataCatalogPageProps> = ({
  lang,
  onNavigate,
  onOpenLightbox,
  initialMissionId
}) => {
  const isVi = lang === 'vi';

  const urlMissionParam = useMemo(() => {
    if (initialMissionId) return initialMissionId;
    if (typeof window === 'undefined') return null;
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('mission');
    } catch {
      return null;
    }
  }, [initialMissionId]);

  /* 4 Plain-Language Categories */
  const [activeGroup, setActiveGroup] = useState<'missions' | 'spacecraft' | 'instruments' | 'documents'>(() => {
    if (urlMissionParam) return 'missions';
    return 'missions';
  });

  const [spacecraftList, setSpacecraftList] = useState<AbandonedSpacecraftRecord[]>(INITIAL_ABANDONED_SPACECRAFT);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [worldFilter, setWorldFilter] = useState<'all' | 'moon' | 'mars' | 'deep'>('all');
  const [verificationFilter, setVerificationFilter] = useState<'all' | DatasetStatus>('all');
  const [instrumentGroupFilter, setInstrumentGroupFilter] = useState<'all' | 'optics' | 'science' | 'power' | 'comms'>('all');
  const [showAdvancedDrawer, setShowAdvancedDrawer] = useState<boolean>(false);
  const [sortField, setSortField] = useState<'name' | 'target' | 'status'>('name');
  const [modalDetail, setModalDetail] = useState<DataModalSelection | null>(null);

  /* Optional HTTP sync with public/data/antigravity/abandoned_spacecraft.json */
  useEffect(() => {
    let isMounted = true;
    fetch('/data/antigravity/abandoned_spacecraft.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && Array.isArray(data.objects) && data.objects.length > 0) {
          setSpacecraftList(data.objects);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const resolveMediaUrl = (media?: NasaMediaItem | null): string | null => {
    if (!media) return null;
    return media.direct_asset_url || (media.local_asset_url ? (media.local_asset_url.startsWith('/public/') ? media.local_asset_url.replace('/public/', '/') : media.local_asset_url) : null);
  };

  /* Build Unified Scientific Instruments List from ARCHIVE_RECORDS + MISSIONS_DATA */
  const allInstrumentsList = useMemo<DataPlainInstrumentRow[]>(() => {
    const classifyGroup = (name: string, role: string): { vi: string; en: string; key: 'optics' | 'science' | 'power' | 'comms' } => {
      const hay = (name + ' ' + role).toLowerCase();
      if (hay.includes('camera') || hay.includes('pancam') || hay.includes('navcam') || hay.includes('imaging') || hay.includes('gương') || hay.includes('lrrr') || hay.includes('quang học')) {
        return { vi: 'Quang học & Chụp ảnh', en: 'Optics & Imaging', key: 'optics' };
      }
      if (hay.includes('rtg') || hay.includes('pin') || hay.includes('solar') || hay.includes('năng lượng') || hay.includes('nhiệt') || hay.includes('rhu') || hay.includes('web')) {
        return { vi: 'Năng lượng & Giữ nhiệt', en: 'Power & Thermal Control', key: 'power' };
      }
      if (hay.includes('antenna') || hay.includes('anten') || hay.includes('plaque') || hay.includes('bảng') || hay.includes('vô tuyến')) {
        return { vi: 'Liên lạc & Thông điệp', en: 'Telemetry & Outreach', key: 'comms' };
      }
      return { vi: 'Phân tích Địa chất & Môi trường', en: 'Geology & Science Sensing', key: 'science' };
    };

    const items: DataPlainInstrumentRow[] = [];
    ARCHIVE_RECORDS.forEach((rec) => {
      (rec.components || []).forEach((comp, idx) => {
        const grp = classifyGroup(comp.name, comp.role);
        items.push({
          id: `${rec.id}-comp-${idx}`,
          name: comp.name,
          missionName: rec.display_name_vi || rec.name,
          missionId: rec.id,
          categoryVi: grp.vi,
          categoryEn: grp.en,
          roleVi: comp.role,
          roleEn: comp.role,
          sourceIds: comp.source_ids || rec.source_ids
        });
      });
    });

    Object.entries(MISSIONS_DATA).forEach(([mKey, mObj]) => {
      (mObj.instruments || []).forEach((inst, idx) => {
        const exists = items.some((x) => x.missionId === mKey && x.name.toLowerCase().includes(inst.name.split(' ')[0].toLowerCase()));
        if (!exists) {
          const grp = classifyGroup(inst.name, inst.function_vi);
          items.push({
            id: `${mKey}-inst-${idx}`,
            name: inst.name,
            missionName: mObj.name,
            missionId: mKey,
            categoryVi: grp.vi,
            categoryEn: grp.en,
            roleVi: inst.description_extended_vi || inst.function_vi,
            roleEn: inst.description_extended_vi || inst.function_vi,
            sourceIds: inst.source_ids || mObj.source_ids
          });
        }
      });
    });

    return items;
  }, []);

  /* Overview Statistics */
  const overviewStats = useMemo(() => {
    let verifiedCount = 0;
    let supplementingCount = 0;
    let reviewCount = 0;

    spacecraftList.forEach((obj) => {
      const st = SPACECRAFT_BILINGUAL_META[obj.id]?.verification_status || 'Pending';
      if (st === 'Available') verifiedCount++;
      else if (st === 'Needs Verification') reviewCount++;
      else supplementingCount++;
    });

    const verifiedMissions = ARCHIVE_RECORDS.filter((r) => r.verification_state === 'verified').length;

    return {
      totalMissions: ARCHIVE_RECORDS.length,
      totalSpacecraft: spacecraftList.length,
      totalInstruments: allInstrumentsList.length,
      totalVerified: verifiedCount + verifiedMissions,
      totalSupplementingOrReview: supplementingCount + reviewCount + ARCHIVE_RECORDS.filter((r) => r.verification_state !== 'verified').length
    };
  }, [spacecraftList, allInstrumentsList]);

  /* Filtered Group 1: Missions (ARCHIVE_RECORDS) */
  const filteredMissions = useMemo(() => {
    return ARCHIVE_RECORDS.filter((rec) => {
      if (worldFilter === 'moon' && rec.realm !== 'THE MOON') return false;
      if (worldFilter === 'mars' && rec.realm !== 'MARS') return false;
      if (worldFilter === 'deep' && rec.realm !== 'DEEP SPACE') return false;

      const mappedStatus: DatasetStatus = rec.verification_state === 'verified' ? 'Available' : 'Needs Verification';
      if (verificationFilter !== 'all' && mappedStatus !== verificationFilter) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        rec.name.toLowerCase().includes(q) ||
        rec.display_name_vi.toLowerCase().includes(q) ||
        rec.destination.toLowerCase().includes(q) ||
        rec.summary_vi.toLowerCase().includes(q) ||
        rec.quick_identity.what_is_it.toLowerCase().includes(q)
      );
    });
  }, [worldFilter, verificationFilter, searchQuery]);

  /* Filtered Group 2: Spacecraft (17 Abandoned/Legacy Hardware Objects) */
  const filteredSpacecraft = useMemo(() => {
    const list = spacecraftList.filter((obj) => {
      const targetGroup = DATA_PLAIN_TARGET_LABELS[obj.target]?.group || 'deep';
      if (worldFilter !== 'all' && targetGroup !== worldFilter) return false;

      const st = SPACECRAFT_BILINGUAL_META[obj.id]?.verification_status || 'Pending';
      if (verificationFilter !== 'all' && st !== verificationFilter) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const meta = SPACECRAFT_BILINGUAL_META[obj.id];
      const catLabel = (DATA_PLAIN_CATEGORY_LABELS[obj.category]?.vi || '') + ' ' + (meta?.category_vi || '');
      return (
        obj.name.toLowerCase().includes(q) ||
        catLabel.toLowerCase().includes(q) ||
        obj.story.toLowerCase().includes(q) ||
        (meta?.story_vi && meta.story_vi.toLowerCase().includes(q)) ||
        (DATA_PLAIN_TARGET_LABELS[obj.target]?.vi.toLowerCase().includes(q) ?? false)
      );
    });

    list.sort((a, b) => {
      const av = (a[sortField] || '').toString().toLowerCase();
      const bv = (b[sortField] || '').toString().toLowerCase();
      return av.localeCompare(bv);
    });
    return list;
  }, [spacecraftList, worldFilter, verificationFilter, searchQuery, sortField]);

  /* Filtered Group 3: Scientific Instruments */
  const filteredInstruments = useMemo(() => {
    return allInstrumentsList.filter((inst) => {
      if (instrumentGroupFilter === 'optics' && !inst.categoryEn.includes('Optics')) return false;
      if (instrumentGroupFilter === 'science' && !inst.categoryEn.includes('Geology')) return false;
      if (instrumentGroupFilter === 'power' && !inst.categoryEn.includes('Power')) return false;
      if (instrumentGroupFilter === 'comms' && !inst.categoryEn.includes('Telemetry')) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        inst.name.toLowerCase().includes(q) ||
        inst.missionName.toLowerCase().includes(q) ||
        inst.roleVi.toLowerCase().includes(q)
      );
    });
  }, [allInstrumentsList, instrumentGroupFilter, searchQuery]);

  /* Auto-open detail modal if URL explicitly requests ?mission=... */
  useEffect(() => {
    if (urlMissionParam) {
      const found = ARCHIVE_RECORDS.find((r) => r.id === urlMissionParam);
      if (found) {
        openMissionModal(found);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlMissionParam]);

  /* Modal Openers building unified 7-Section View */
  const openMissionModal = (rec: ArchiveRecord) => {
    const media = NASA_MEDIA_CATALOG[rec.media_id];
    const seedMeta = CORE_SEED_RECORDS_META[rec.id];
    const vStatus: DatasetStatus = rec.verification_state === 'verified' ? 'Available' : 'Needs Verification';

    const sourcesList = (rec.source_ids || [])
      .map((sid) => SOURCES_CATALOG[sid])
      .filter(Boolean)
      .map((s) => ({ label: s.title, url: s.url }));

    if (sourcesList.length === 0 && rec.source_url) {
      sourcesList.push({ label: rec.name + ' (NASA Official Source)', url: rec.source_url });
    }

    const journeyPath =
      rec.id === 'opportunity' || rec.id === 'pioneer-11' || rec.id === 'surveyor-3' || rec.id === 'viking-1' || rec.id === 'sojourner'
        ? `/hanh-trinh?mission=${rec.id}`
        : '/hanh-trinh';

    setModalDetail({
      title: rec.display_name_vi || rec.name,
      subtitle: `${rec.official_designation || rec.code_id} · ${rec.destination}`,
      imageUrl: resolveMediaUrl(media),
      imageCaption: media ? `${media.caption_vi} (Nguồn: ${media.credit})` : rec.credit,
      mediaItem: media || null,
      status: vStatus,
      statusNote:
        seedMeta?.record_state === 'demo_record'
          ? isVi
            ? 'Hồ sơ tư liệu mẫu (Demo Record) đã đối chiếu dữ kiện NASA gốc.'
            : 'Verified compact Demo Record cross-checked against official NASA resources.'
          : isVi
          ? 'Hồ sơ Triển lãm Trọng tâm đã xác minh đầy đủ thông số khoa học.'
          : 'Featured Deep Exhibition profile fully verified against NASA archives.',
      overviewWhat: rec.quick_identity.what_is_it,
      overviewWhy: rec.quick_identity.why_sent,
      overviewSpecial: rec.quick_identity.what_makes_it_special,
      missionOperator: 'NASA / JPL / Ames / GSFC',
      missionDesignation: rec.official_designation || rec.code_id,
      missionLaunchVehicle: rec.launch_vehicle || (isVi ? 'Tên lửa đẩy quỹ đạo NASA' : 'NASA Orbital Launch Vehicle'),
      missionDestination: rec.destination,
      missionActivePeriod: rec.active_period,
      missionDisposition: rec.status,
      milestones: (rec.timeline || []).map((ev) => ({
        date: ev.date,
        title: ev.title_vi,
        detail: ev.detail_vi
      })),
      instruments: (rec.components || []).map((c) => ({ name: c.name, role: c.role })),
      achievements: rec.science_highlights_vi || [rec.primary_achievement_vi],
      honestNote: rec.editorial_note_vi,
      techLocation: rec.coordinates_or_location || rec.quick_identity.landing_or_operation_site,
      techMass: rec.mass_info || (isVi ? 'Đang cập nhật khối lượng chính thức' : 'Mass pending curator update'),
      techPower: rec.quick_identity.power_system_vi || (isVi ? 'Theo kiến trúc tàu NASA' : 'Per NASA mission architecture'),
      techNssdc: rec.code_id,
      sources: sourcesList,
      journeyRoute: journeyPath,
      simRoute: rec.id === 'pioneer-11' ? '/mo-phong?mission=pioneer-11' : '/mo-phong?mission=opportunity'
    });
  };

  const openSpacecraftModal = (obj: AbandonedSpacecraftRecord) => {
    const meta = SPACECRAFT_BILINGUAL_META[obj.id];
    const linkedRecord = meta?.seed_slug ? ARCHIVE_RECORDS.find((r) => r.id === meta.seed_slug) : null;
    if (linkedRecord) {
      openMissionModal(linkedRecord);
      return;
    }

    const plainTarget = DATA_PLAIN_TARGET_LABELS[obj.target];
    const plainCategory = DATA_PLAIN_CATEGORY_LABELS[obj.category];
    const plainLoc = DATA_PLAIN_LOCATION_NOTES[obj.id];
    const vStatus: DatasetStatus = meta?.verification_status || 'Pending';

    setModalDetail({
      title: obj.name,
      subtitle: `${isVi ? plainCategory?.vi || obj.category : plainCategory?.en || obj.category} · ${
        isVi ? plainTarget?.vi || obj.target : plainTarget?.en || obj.target
      }`,
      imageUrl: obj.image_url,
      imageCaption: obj.image_page
        ? `${obj.name} — Nguồn minh họa cần kiểm chứng bản quyền/credit`
        : `${obj.name} — Tư liệu NSSDCA`,
      status: vStatus,
      statusNote: isVi
        ? meta?.verification_note_vi || 'Dữ liệu chính thức từ trang nhiệm vụ NASA Science / NSSDCA.'
        : meta?.verification_note_en || 'Official summary from NASA Science / NSSDCA.',
      overviewWhat: isVi ? meta?.story_vi || obj.story : obj.story,
      overviewWhy: isVi
        ? 'Được phóng lên nhằm mở rộng giới hạn thám hiểm thiên thể, đo đạc môi trường bề mặt hoặc kiểm chứng công nghệ du hành vũ trụ mới.'
        : 'Launched to test spaceflight technologies and gather direct environmental measurements across the Solar System.',
      overviewSpecial: isVi
        ? meta?.status_vi || 'Hiện vật không gian mang dấu ấn lịch sử vẫn nằm lại tại nơi nó từng làm nhiệm vụ.'
        : 'Historic space exploration artifact remaining permanently at its mission destination.',
      missionOperator: 'NASA',
      missionDesignation: obj.nssdc_id || (isVi ? 'Đang bổ sung mã lưu trữ NSSDCA' : 'NSSDCA ID pending curation'),
      missionLaunchVehicle: isVi ? 'Xem trang nhiệm vụ gốc NASA Science' : 'See NASA Science mission sheet',
      missionDestination: isVi ? plainTarget?.vi || obj.target : plainTarget?.en || obj.target,
      missionActivePeriod: isVi ? 'Theo chu kỳ sứ mệnh chính thức NASA' : 'Official NASA operational window',
      missionDisposition: isVi ? meta?.status_vi || obj.status : obj.status,
      milestones: [
        {
          date: isVi ? 'Tình trạng hiện tại' : 'Current Status',
          title: isVi ? meta?.status_vi || 'Hoàn thành nhiệm vụ' : 'Mission Artifact Resting Site',
          detail: isVi ? meta?.story_vi || obj.story : obj.story
        }
      ],
      instruments: [
        {
          name: isVi ? plainCategory?.vi || obj.name : obj.name,
          role: isVi ? meta?.story_vi || obj.story : obj.story
        }
      ],
      achievements: [isVi ? meta?.story_vi || obj.story : obj.story],
      honestNote: isVi
        ? 'Các trường tọa độ hành tinh chi tiết đang giữ trống cho tới khi đối chiếu xong chuẩn khung quy chiếu IAU/NASA PDS.'
        : 'Detailed planetary coordinates remain blank until finalized against NASA PDS / IAU cartographic frames.',
      techLocation: isVi
        ? plainLoc?.vi || 'Đang chuẩn hóa tọa độ vị trí trên bản đồ hành tinh.'
        : plainLoc?.en || 'Planetary coordinates awaiting datum standardization.',
      techMass: isVi ? 'Xem tài liệu kỹ thuật NSSDCA' : 'Listed on NSSDCA reference sheet',
      techPower: obj.id.includes('pioneer')
        ? 'SNAP-19 RTG (Hạt nhân Plutonium-238)'
        : isVi
        ? 'Pin mặt trời / Ắc quy tàu đổ bộ'
        : 'Solar Array / Onboard Battery',
      techNssdc: obj.nssdc_id || (isVi ? 'Đang cập nhật từ NSSDCA' : 'NSSDCA catalog update pending'),
      sources: [
        { label: `NASA / NSSDCA: ${obj.name}`, url: obj.source_url },
        ...(obj.image_page ? [{ label: isVi ? 'Trang tư liệu hình ảnh gốc' : 'Image Source Page', url: obj.image_page }] : [])
      ],
      journeyRoute: meta?.journey_route || '/hanh-trinh',
      simRoute: '/mo-phong'
    });
  };

  /* Helper to render plain-language Verification Badge */
  const renderStatusBadge = (status: DatasetStatus) => {
    const cfg = DATA_STATUS_LABELS[status] || DATA_STATUS_LABELS.Pending;
    return (
      <span
        title={isVi ? cfg.descVi : cfg.descEn}
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-sans text-[13px] font-medium ${cfg.classes}`}
      >
        <span className={`w-2 h-2 rounded-full ${cfg.dotColor}`} />
        <span>{isVi ? cfg.vi : cfg.en}</span>
      </span>
    );
  };

  /* CSV & JSON Exports (Available inside Expandable Technical Drawer) */
  const handleExportJSON = () => {
    const payload = {
      database: 'BEYOND THE SIGNAL — NASA Space Exploration Heritage Museum',
      exported_at: new Date().toISOString(),
      total_records: filteredSpacecraft.length,
      objects: filteredSpacecraft
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `beyond_the_signal_hardware_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const headers = ['id', 'name', 'category_vi', 'destination', 'status_vi', 'nssdc_id', 'source_url'];
    const rows = filteredSpacecraft.map((obj) => {
      const meta = SPACECRAFT_BILINGUAL_META[obj.id];
      const cat = DATA_PLAIN_CATEGORY_LABELS[obj.category]?.vi || obj.category;
      const dest = DATA_PLAIN_TARGET_LABELS[obj.target]?.vi || obj.target;
      return [
        `"${obj.id}"`,
        `"${obj.name.replace(/"/g, '""')}"`,
        `"${cat.replace(/"/g, '""')}"`,
        `"${dest.replace(/"/g, '""')}"`,
        `"${(meta?.status_vi || obj.status).replace(/"/g, '""')}"`,
        `"${obj.nssdc_id || ''}"`,
        `"${obj.source_url}"`
      ].join(',');
    });
    const csvString = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `beyond_the_signal_hardware_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#0B1422] text-[#F0EDE5] min-h-screen selection:bg-[#D2A071]/30 selection:text-[#F0EDE5]">
      {/* =====================================================================
       * HERO HEADER & PLAIN-LANGUAGE INTRODUCTION
       * ===================================================================== */}
      <section className="relative overflow-hidden border-b border-[#AAB8C7]/15 bg-gradient-to-b from-[#101E30] via-[#0E1929] to-[#0B1422] py-14 lg:py-20 px-4 sm:px-6 lg:px-8">
        <img
          src="/assets/nasa/surveyor3_in_crater_AS12-48-7121.jpg"
          alt="Surveyor 3 lunar lander archival backdrop"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.14] pointer-events-none select-none mix-blend-luminosity"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 800px 420px at 20% 0%, rgba(210,160,113,0.14) 0%, transparent 70%), radial-gradient(ellipse 700px 400px at 85% 90%, rgba(33,55,77,0.45) 0%, transparent 70%)'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#162A40]/90 border border-[#D2A071]/40 rounded-full font-mono text-[13px] text-[#D2A071]">
              <Database className="w-4 h-4 shrink-0" />
              <span>
                {isVi
                  ? 'Trụ cột 03 · Hồ sơ Khoa học NASA Dễ Đọc'
                  : 'Pillar 03 · Accessible NASA Science & Artifact Catalog'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('/mo-phong')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#162A40] hover:bg-[#21374D] text-[#F0EDE5] border border-[#AAB8C7]/25 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              <span>{isVi ? 'Thử Thách & Mô Phỏng →' : 'Challenge Labs →'}</span>
            </button>
          </div>

          <div className="max-w-4xl space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-semibold tracking-tight text-[#F0EDE5] leading-[1.12]">
              {isVi
                ? 'Kho Dữ Liệu Khoa Học Dễ Hiểu Về Các Cỗ Máy Thám Hiểm NASA'
                : 'Understandable Scientific Archive of NASA’s Off-World Machines'}
            </h1>
            <p className="text-base sm:text-lg text-[#AAB8C7] leading-relaxed max-w-3xl">
              {isVi
                ? 'Thay vì các bảng mã kỹ thuật khô khan khó đọc, toàn bộ dữ liệu về sứ mệnh, tàu vũ trụ, thiết bị đo đạc và tài liệu nguồn gốc NASA tại đây đều được diễn giải bằng ngôn ngữ tự nhiên rõ ràng, trung thực với từng con số đã xác minh.'
                : 'Instead of cryptic engineering codes and raw schema tables, this archive translates NASA missions, spacecraft, instruments, and primary references into plain language—while preserving full source transparency.'}
            </p>
          </div>

          {/* Friendly 3-Card Visitor Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-[#162A40]/90 border border-[#AAB8C7]/20 rounded-xl space-y-1.5">
              <div className="font-mono text-[13px] font-semibold text-[#D2A071]">
                {isVi ? 'TRANG NÀY CHỨA GÌ?' : 'WHAT IS HERE?'}
              </div>
              <p className="text-sm sm:text-base text-[#F0EDE5] leading-relaxed">
                {isVi
                  ? 'Hồ sơ của 8 sứ mệnh trọng tâm, 17 tàu vũ trụ đang nằm lại ngoài Trái Đất, hơn 26 thiết bị khoa học và toàn bộ báo cáo gốc NASA.'
                  : 'Detailed profiles covering 8 core missions, 17 off-world spacecraft artifacts, scientific instruments, and official NASA documents.'}
              </p>
            </div>
            <div className="p-5 bg-[#162A40]/90 border border-[#AAB8C7]/20 rounded-xl space-y-1.5">
              <div className="font-mono text-[13px] font-semibold text-[#D2A071]">
                {isVi ? 'CÁCH XEM CHI TIẾT' : 'HOW TO EXPLORE'}
              </div>
              <p className="text-sm sm:text-base text-[#F0EDE5] leading-relaxed">
                {isVi
                  ? 'Chọn 1 trong 4 nhóm bên dưới, gõ tên tàu hoặc lọc theo Mặt Trăng / Sao Hỏa, rồi bấm "Xem chi tiết (7 phần)" trên bất kỳ thẻ nào.'
                  : 'Pick any of the 4 categories below, filter by Moon/Mars/Deep Space, and click "View 7-Part Profile" on any card.'}
              </p>
            </div>
            <div className="p-5 bg-[#162A40]/90 border border-[#AAB8C7]/20 rounded-xl space-y-2">
              <div className="font-mono text-[13px] font-semibold text-[#D2A071]">
                {isVi ? 'Ý NGHĨA NHÃN XÁC MINH' : 'VERIFICATION BADGES'}
              </div>
              <div className="flex flex-wrap gap-2">
                {renderStatusBadge('Available')}
                {renderStatusBadge('Pending')}
                {renderStatusBadge('Needs Verification')}
              </div>
            </div>
          </div>

          {/* 5 Clean Statistics Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 pt-2">
            <div className="p-4 sm:p-5 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl">
              <div className="text-sm text-[#AAB8C7]">{isVi ? 'Sứ mệnh Không gian' : 'Space Missions'}</div>
              <div className="font-display text-3xl font-semibold text-[#F0EDE5] mt-1">{overviewStats.totalMissions}</div>
              <div className="text-[13px] text-[#D2A071] mt-1">{isVi ? '2 Trọng tâm · 6 Tư liệu' : '2 Featured · 6 Records'}</div>
            </div>

            <div className="p-4 sm:p-5 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl">
              <div className="text-sm text-[#AAB8C7]">{isVi ? 'Tàu & Hiện vật' : 'Spacecraft Artifacts'}</div>
              <div className="font-display text-3xl font-semibold text-[#F0EDE5] mt-1">{overviewStats.totalSpacecraft}</div>
              <div className="text-[13px] text-[#AAB8C7] mt-1">{isVi ? 'Mặt Trăng, Sao Hỏa, Xa hơn' : 'Moon, Mars & Beyond'}</div>
            </div>

            <div className="p-4 sm:p-5 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl">
              <div className="text-sm text-[#AAB8C7]">{isVi ? 'Thiết bị Khoa học' : 'Instruments'}</div>
              <div className="font-display text-3xl font-semibold text-[#F0EDE5] mt-1">{overviewStats.totalInstruments}</div>
              <div className="text-[13px] text-[#AAB8C7] mt-1">{isVi ? 'Camera, phổ kế, RTG, gương' : 'Cameras, spectrometers, RTGs'}</div>
            </div>

            <div className="p-4 sm:p-5 bg-[#162A40] border border-emerald-500/35 rounded-xl">
              <div className="text-sm text-emerald-300">{isVi ? 'Đã xác minh nguồn NASA' : 'Verified Records'}</div>
              <div className="font-display text-3xl font-semibold text-[#F0EDE5] mt-1">{overviewStats.totalVerified}</div>
              <div className="text-[13px] text-[#AAB8C7] mt-1">{isVi ? 'Chuẩn NASA / JPL / NSSDCA' : 'NASA / JPL verified'}</div>
            </div>

            <div className="p-4 sm:p-5 bg-[#162A40] border border-[#D2A071]/40 rounded-xl">
              <div className="text-sm text-[#D2A071]">{isVi ? 'Đang bổ sung / Rà soát' : 'In Progress / Review'}</div>
              <div className="font-display text-3xl font-semibold text-[#F0EDE5] mt-1">{overviewStats.totalSupplementingOrReview}</div>
              <div className="text-[13px] text-[#AAB8C7] mt-1">{isVi ? 'Giữ trống phần chưa có số chuẩn' : 'Unverified fields safely gated'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
       * MAIN 4-CATEGORY CATALOG WORKSPACE
       * ===================================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* 4 Category Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[
            {
              id: 'missions' as const,
              num: '01',
              titleVi: 'Sứ mệnh Không gian',
              titleEn: 'Space Missions',
              subVi: `${ARCHIVE_RECORDS.length} hồ sơ sứ mệnh cốt lõi`,
              subEn: `${ARCHIVE_RECORDS.length} core mission records`,
              icon: <Rocket className="w-5 h-5" />
            },
            {
              id: 'spacecraft' as const,
              num: '02',
              titleVi: 'Tàu vũ trụ & Tàu thăm dò',
              titleEn: 'Spacecraft & Probes',
              subVi: `${spacecraftList.length} cỗ máy nằm lại vũ trụ`,
              subEn: `${spacecraftList.length} off-world artifacts`,
              icon: <Compass className="w-5 h-5" />
            },
            {
              id: 'instruments' as const,
              num: '03',
              titleVi: 'Thiết bị Khoa học',
              titleEn: 'Scientific Instruments',
              subVi: `${allInstrumentsList.length} máy đo, camera & pin`,
              subEn: `${allInstrumentsList.length} sensors, cameras & power`,
              icon: <Cpu className="w-5 h-5" />
            },
            {
              id: 'documents' as const,
              num: '04',
              titleVi: 'Tài liệu & Nguồn tư liệu',
              titleEn: 'Documents & Sources',
              subVi: 'Báo cáo NTRS, ảnh gốc & trích dẫn',
              subEn: 'NTRS papers, NASA media & sources',
              icon: <BookOpen className="w-5 h-5" />
            }
          ].map((tab) => {
            const active = activeGroup === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveGroup(tab.id)}
                className={`p-5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                  active
                    ? 'bg-[#21374D] border-[#D2A071] text-[#F0EDE5] shadow-lg'
                    : 'bg-[#101E30] border-[#AAB8C7]/20 text-[#AAB8C7] hover:bg-[#162A40] hover:text-[#F0EDE5]'
                }`}
              >
                <div
                  className={`p-2.5 rounded-lg shrink-0 ${
                    active ? 'bg-[#D2A071] text-[#0B1422]' : 'bg-[#162A40] text-[#D2A071]'
                  }`}
                >
                  {tab.icon}
                </div>
                <div>
                  <div className="font-mono text-[13px] font-semibold text-[#D2A071]">NHÓM {tab.num}</div>
                  <div className="font-sans text-lg font-semibold text-[#F0EDE5] leading-snug mt-0.5">
                    {isVi ? tab.titleVi : tab.titleEn}
                  </div>
                  <div className="text-sm text-[#AAB8C7] mt-0.5">
                    {isVi ? tab.subVi : tab.subEn}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Simple Plain-Language Search & Filter Bar */}
        <div className="p-5 bg-[#101E30] border border-[#AAB8C7]/20 rounded-xl space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Search */}
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-[#AAB8C7] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isVi
                    ? 'Tìm tên tàu, sứ mệnh, thiết bị hoặc điểm đến...'
                    : 'Search mission, spacecraft, instrument, or planet...'
                }
                className="w-full pl-10 pr-4 py-2.5 bg-[#162A40] border border-[#AAB8C7]/25 focus:border-[#D2A071] rounded-lg text-base text-[#F0EDE5] placeholder-[#AAB8C7]/70 outline-none"
              />
            </div>

            {/* Destination Filter Pills (for Missions & Spacecraft) */}
            {activeGroup !== 'instruments' && activeGroup !== 'documents' && (
              <div className="lg:col-span-4 flex flex-wrap gap-2">
                {[
                  { key: 'all' as const, vi: 'Tất cả nơi đến', en: 'All Worlds' },
                  { key: 'moon' as const, vi: 'Mặt Trăng', en: 'Moon' },
                  { key: 'mars' as const, vi: 'Sao Hỏa', en: 'Mars' },
                  { key: 'deep' as const, vi: 'Không gian sâu & Tiểu hành tinh', en: 'Deep Space & Beyond' }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setWorldFilter(opt.key)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                      worldFilter === opt.key
                        ? 'bg-[#D2A071] text-[#0B1422] border-[#D2A071] font-semibold'
                        : 'bg-[#162A40] text-[#F0EDE5] border-[#AAB8C7]/20 hover:bg-[#21374D]'
                    }`}
                  >
                    {isVi ? opt.vi : opt.en}
                  </button>
                ))}
              </div>
            )}

            {/* Instrument Filter Pills (for Group 3) */}
            {activeGroup === 'instruments' && (
              <div className="lg:col-span-7 flex flex-wrap gap-2">
                {[
                  { key: 'all' as const, vi: 'Tất cả thiết bị', en: 'All Instruments' },
                  { key: 'optics' as const, vi: 'Quang học & Camera', en: 'Optics & Cameras' },
                  { key: 'science' as const, vi: 'Địa chất & Hóa học', en: 'Geology & Science' },
                  { key: 'power' as const, vi: 'Năng lượng & Nhiệt', en: 'Power & Thermal' },
                  { key: 'comms' as const, vi: 'Liên lạc & Thông điệp', en: 'Telemetry' }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setInstrumentGroupFilter(opt.key)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
                      instrumentGroupFilter === opt.key
                        ? 'bg-[#D2A071] text-[#0B1422] border-[#D2A071] font-semibold'
                        : 'bg-[#162A40] text-[#F0EDE5] border-[#AAB8C7]/20 hover:bg-[#21374D]'
                    }`}
                  >
                    {isVi ? opt.vi : opt.en}
                  </button>
                ))}
              </div>
            )}

            {/* Verification Select */}
            {activeGroup !== 'instruments' && activeGroup !== 'documents' && (
              <div className="lg:col-span-3">
                <select
                  value={verificationFilter}
                  onChange={(e) => setVerificationFilter(e.target.value as 'all' | DatasetStatus)}
                  className="w-full px-3.5 py-2.5 bg-[#162A40] border border-[#AAB8C7]/25 rounded-lg text-sm text-[#F0EDE5] outline-none cursor-pointer"
                >
                  <option value="all">{isVi ? 'Mọi trạng thái xác minh' : 'All Verification States'}</option>
                  <option value="Available">{isVi ? 'Đã xác minh' : 'Verified'}</option>
                  <option value="Pending">{isVi ? 'Đang bổ sung dữ liệu' : 'Supplementing Data'}</option>
                  <option value="Needs Verification">{isVi ? 'Cần kiểm tra thêm' : 'Needs Review'}</option>
                </select>
              </div>
            )}
          </div>

          {/* Expandable Advanced Technical & Export Drawer Toggle */}
          <div className="pt-2 border-t border-[#AAB8C7]/15 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setShowAdvancedDrawer(!showAdvancedDrawer)}
              className="inline-flex items-center gap-2 text-sm text-[#D2A071] hover:underline cursor-pointer"
            >
              <Filter className="w-4 h-4" />
              <span>
                {showAdvancedDrawer
                  ? isVi
                    ? 'Ẩn tùy chọn kỹ thuật & xuất dữ liệu'
                    : 'Hide Technical Controls & Export'
                  : isVi
                  ? 'Mở tùy chọn nâng cao: Sắp xếp & Xuất CSV / JSON cho nhà nghiên cứu'
                  : 'Show Advanced Controls: Sorting & CSV / JSON Export'}
              </span>
            </button>

            {searchQuery || worldFilter !== 'all' || verificationFilter !== 'all' ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setWorldFilter('all');
                  setVerificationFilter('all');
                  setInstrumentGroupFilter('all');
                }}
                className="text-sm text-[#AAB8C7] hover:text-[#F0EDE5] underline cursor-pointer"
              >
                {isVi ? 'Xóa bộ lọc' : 'Clear filters'}
              </button>
            ) : null}
          </div>

          {showAdvancedDrawer && (
            <div className="p-4 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="text-[#AAB8C7]">{isVi ? 'Sắp xếp danh sách tàu theo:' : 'Sort spacecraft by:'}</span>
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value as 'name' | 'target' | 'status')}
                  className="px-3 py-1.5 bg-[#101E30] border border-[#AAB8C7]/25 rounded-lg text-sm text-[#F0EDE5]"
                >
                  <option value="name">{isVi ? 'Tên tàu (A–Z)' : 'Name (A–Z)'}</option>
                  <option value="target">{isVi ? 'Điểm đến' : 'Destination'}</option>
                  <option value="status">{isVi ? 'Hiện trạng' : 'Status'}</option>
                </select>
                <span className="text-[13px] text-[#AAB8C7]">
                  {isVi
                    ? 'Quy tắc minh bạch: Dữ liệu chưa chuẩn hóa IAU giữ trống, tuyệt đối không đổi thành 0.'
                    : 'Integrity rule: Unverified planetary coordinates remain empty rather than coerced to 0.'}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#21374D] hover:bg-[#2c4763] text-[#F0EDE5] border border-[#AAB8C7]/25 rounded-lg text-sm font-medium cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#D2A071]" />
                  <span>CSV</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#D2A071] hover:bg-[#e0b287] text-[#0B1422] rounded-lg text-sm font-semibold cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>JSON</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ===================================================================
         * GROUP 1: SPACE MISSIONS (8 CORE HARDWARE / MISSION RECORDS)
         * =================================================================== */}
        {activeGroup === 'missions' && (
          <section className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-3xl sm:text-[34px] font-semibold text-[#F0EDE5]">
                  {isVi ? 'Nhóm 1 · Sứ mệnh Không gian Trọng tâm' : 'Group 1 · Featured & Demo Space Missions'}
                </h2>
                <p className="text-base text-[#AAB8C7] mt-1">
                  {isVi
                    ? 'Bấm vào bất kỳ sứ mệnh nào để đọc trọn vẹn hồ sơ 7 phần bằng ngôn ngữ dễ hiểu kèm nguồn kiểm chứng NASA.'
                    : 'Click any mission card to open its complete 7-section plain-language archive with NASA citations.'}
                </p>
              </div>
              <span className="font-mono text-[13px] text-[#D2A071]">
                {filteredMissions.length} {isVi ? 'sứ mệnh phù hợp' : 'matching missions'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMissions.map((rec) => {
                const media = NASA_MEDIA_CATALOG[rec.media_id];
                const imgUrl = resolveMediaUrl(media);
                const seedMeta = CORE_SEED_RECORDS_META[rec.id];
                const isDemo = seedMeta ? seedMeta.record_state === 'demo_record' : !rec.is_complete_exhibit;
                const vStatus: DatasetStatus = rec.verification_state === 'verified' ? 'Available' : 'Needs Verification';

                return (
                  <article
                    key={rec.id}
                    className="bg-[#101E30] border border-[#AAB8C7]/20 hover:border-[#D2A071]/55 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg transition-colors"
                  >
                    <div>
                      <div className="relative aspect-[16/9] bg-[#162A40] overflow-hidden">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            onError={(e) => {
                              const t = e.currentTarget;
                              const cleanLocal = media?.local_asset_url ? media.local_asset_url.replace('/public/', '/') : '';
                              if (cleanLocal && t.src !== cleanLocal) {
                                t.src = cleanLocal;
                              } else if (media?.direct_asset_url && t.src !== media.direct_asset_url) {
                                t.src = media.direct_asset_url;
                              }
                            }}
                            alt={rec.display_name_vi}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#AAB8C7]">
                            <Rocket className="w-10 h-10 opacity-40" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#101E30] via-[#101E30]/20 to-transparent" />
                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-[#0B1422]/85 text-[#D2A071] border border-[#D2A071]/40 rounded-full text-[13px] font-medium">
                            {isDemo
                              ? isVi
                                ? 'Hồ sơ tư liệu mẫu · Demo Record'
                                : 'Demo Record'
                              : isVi
                              ? 'Triển lãm Trọng tâm'
                              : 'Featured Exhibition'}
                          </span>
                          {renderStatusBadge(vStatus)}
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="space-y-1">
                          <div className="font-mono text-[13px] text-[#D2A071]">
                            {rec.destination} · {rec.active_period}
                          </div>
                          <h3 className="font-display text-2xl font-semibold text-[#F0EDE5]">
                            {rec.display_name_vi || rec.name}
                          </h3>
                          <div className="text-sm text-[#AAB8C7]">
                            {rec.official_designation || rec.mission_name}
                          </div>
                        </div>

                        <p className="text-base text-[#F0EDE5]/90 leading-relaxed line-clamp-3">
                          {seedMeta
                            ? isVi
                              ? seedMeta.short_hook_vi
                              : seedMeta.short_hook_en
                            : rec.summary_vi}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="px-3 py-1 bg-[#162A40] rounded-lg text-sm text-[#AAB8C7]">
                            {rec.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-[#162A40]/70 border-t border-[#AAB8C7]/15 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => openMissionModal(rec)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#D2A071] hover:bg-[#e0b287] text-[#0B1422] font-sans text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        <span>{isVi ? 'Xem chi tiết (7 phần)' : 'View 7-Part Profile'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-3 text-sm">
                        <button
                          type="button"
                          onClick={() =>
                            onNavigate(
                              rec.id === 'opportunity' || rec.id === 'pioneer-11' || rec.id === 'surveyor-3' || rec.id === 'viking-1' || rec.id === 'sojourner'
                                ? `/hanh-trinh?mission=${rec.id}`
                                : '/hanh-trinh'
                            )
                          }
                          className="text-[#D2A071] hover:underline cursor-pointer"
                        >
                          {isVi ? 'Câu chuyện' : 'Story'}
                        </button>
                        <button
                          type="button"
                          onClick={() => onNavigate('/mo-phong')}
                          className="text-[#AAB8C7] hover:text-[#F0EDE5] hover:underline cursor-pointer"
                        >
                          {isVi ? 'Mô phỏng' : 'Simulate'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* ===================================================================
         * GROUP 2: SPACECRAFT & PROBES (17 HERITAGE OFF-WORLD OBJECTS)
         * =================================================================== */}
        {activeGroup === 'spacecraft' && (
          <section className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-3xl sm:text-[34px] font-semibold text-[#F0EDE5]">
                  {isVi ? 'Nhóm 2 · Tàu vũ trụ & Tàu thăm dò Đang Nằm Lại Vũ Trụ' : 'Group 2 · Heritage Spacecraft & Probes'}
                </h2>
                <p className="text-base text-[#AAB8C7] mt-1">
                  {isVi
                    ? '17 cỗ máy đại diện cho các dấu chân khoa học trên Mặt Trăng, Sao Hỏa, tiểu hành tinh và rìa Hệ Mặt Trời.'
                    : '17 iconic NASA machines resting on the Moon, Mars, asteroids, and outbound heliocentric trajectories.'}
                </p>
              </div>
              <span className="font-mono text-[13px] text-[#D2A071]">
                {filteredSpacecraft.length} / {spacecraftList.length} {isVi ? 'hiện vật' : 'craft'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpacecraft.map((obj) => {
                const meta = SPACECRAFT_BILINGUAL_META[obj.id];
                const plainTarget = DATA_PLAIN_TARGET_LABELS[obj.target];
                const plainCat = DATA_PLAIN_CATEGORY_LABELS[obj.category];
                const vStatus: DatasetStatus = meta?.verification_status || 'Pending';
                const localMedia = meta?.local_media_id ? NASA_MEDIA_CATALOG[meta.local_media_id] : null;
                const thumbUrl = resolveMediaUrl(localMedia) || obj.image_url;

                return (
                  <article
                    key={obj.id}
                    className="bg-[#101E30] border border-[#AAB8C7]/20 hover:border-[#D2A071]/55 rounded-2xl overflow-hidden flex flex-col justify-between transition-colors shadow-lg"
                  >
                    <div>
                      <div className="relative aspect-[16/10] bg-[#162A40] overflow-hidden flex items-center justify-center">
                        {thumbUrl ? (
                          <img
                            src={thumbUrl}
                            onError={(e) => {
                              const t = e.currentTarget;
                              const cleanLocal = localMedia?.local_asset_url ? localMedia.local_asset_url.replace('/public/', '/') : '';
                              if (cleanLocal && t.src !== cleanLocal) {
                                t.src = cleanLocal;
                              } else if (localMedia?.direct_asset_url && t.src !== localMedia.direct_asset_url) {
                                t.src = localMedia.direct_asset_url;
                              }
                            }}
                            alt={obj.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="p-6 text-center space-y-2">
                            <Compass className="w-10 h-10 text-[#D2A071]/60 mx-auto" />
                            <div className="text-sm text-[#AAB8C7]">
                              {isVi ? plainTarget?.vi : plainTarget?.en}
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#101E30] via-transparent to-transparent" />
                        <div className="absolute top-3 right-3">
                          {renderStatusBadge(vStatus)}
                        </div>
                      </div>

                      <div className="p-5 sm:p-6 space-y-3">
                        <div className="font-mono text-[13px] text-[#D2A071]">
                          {isVi ? plainTarget?.vi || obj.target : plainTarget?.en || obj.target}
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#F0EDE5] leading-snug">
                          {obj.name}
                        </h3>
                        <div className="text-sm font-medium text-[#AAB8C7]">
                          {isVi ? plainCat?.vi || meta?.category_vi : plainCat?.en}
                        </div>
                        <p className="text-base text-[#F0EDE5]/90 leading-relaxed line-clamp-3">
                          {isVi ? meta?.story_vi || obj.story : obj.story}
                        </p>
                        <div className="p-3 bg-[#162A40] rounded-lg text-sm text-[#AAB8C7]">
                          <strong className="text-[#F0EDE5] font-medium">
                            {isVi ? 'Hiện trạng: ' : 'Status: '}
                          </strong>
                          {isVi ? meta?.status_vi || obj.status : obj.status}
                        </div>
                      </div>
                    </div>

                    <div className="px-5 sm:px-6 py-4 bg-[#162A40]/70 border-t border-[#AAB8C7]/15 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => openSpacecraftModal(obj)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#D2A071] hover:bg-[#e0b287] text-[#0B1422] font-sans text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        <span>{isVi ? 'Xem chi tiết (7 phần)' : 'View 7-Part Profile'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <a
                        href={obj.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-[#D2A071] hover:underline"
                      >
                        <span>NASA</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* ===================================================================
         * GROUP 3: SCIENTIFIC INSTRUMENTS (CURATED PLAIN-LANGUAGE LIST)
         * =================================================================== */}
        {activeGroup === 'instruments' && (
          <section className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-3xl sm:text-[34px] font-semibold text-[#F0EDE5]">
                  {isVi ? 'Nhóm 3 · Các Thiết Bị Khoa Học Trên Tàu' : 'Group 3 · Scientific Instruments & Payloads'}
                </h2>
                <p className="text-base text-[#AAB8C7] mt-1">
                  {isVi
                    ? 'Từ máy quang phổ tìm dấu vết nước cổ đại tới nguồn năng lượng hạt nhân RTG và gương phản xạ laser 0 Watt.'
                    : 'Spectrometers, stereo cameras, nuclear RTGs, and zero-watt corner-cube laser arrays explained clearly.'}
                </p>
              </div>
              <span className="font-mono text-[13px] text-[#D2A071]">
                {filteredInstruments.length} {isVi ? 'thiết bị' : 'instruments'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredInstruments.map((inst) => (
                <article
                  key={inst.id}
                  className="p-5 sm:p-6 bg-[#101E30] border border-[#AAB8C7]/20 rounded-xl flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3 py-1 bg-[#21374D] text-[#D2A071] rounded-full text-[13px] font-medium">
                        {isVi ? inst.categoryVi : inst.categoryEn}
                      </span>
                      <span className="font-mono text-[13px] text-[#AAB8C7]">{inst.missionName}</span>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-[#F0EDE5] leading-snug">
                      {inst.name}
                    </h3>

                    <p className="text-base text-[#AAB8C7] leading-relaxed">
                      {isVi ? inst.roleVi : inst.roleEn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#AAB8C7]/15 flex items-center justify-between text-sm">
                    <span className="font-mono text-[13px] text-[#D2A071]">
                      {inst.sourceIds.slice(0, 2).join(' · ')}
                    </span>
                    <button
                      type="button"
                      onClick={() => onNavigate('/mo-phong')}
                      className="text-[#F0EDE5] hover:text-[#D2A071] underline cursor-pointer"
                    >
                      {isVi ? 'Thử mô phỏng →' : 'Try simulation →'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ===================================================================
         * GROUP 4: TECHNICAL DOCUMENTS, NASA NTRS PAPERS & VERIFIED MEDIA
         * =================================================================== */}
        {activeGroup === 'documents' && (
          <section className="space-y-10">
            {/* Sub-section 4A: 5 Surveyor 3 NTRS Reports */}
            <div className="p-6 sm:p-8 bg-[#101E30] border border-[#D2A071]/35 rounded-2xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-[13px] font-semibold text-[#D2A071]">
                    NASA TECHNICAL REPORTS SERVER (NTRS)
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F0EDE5] mt-1">
                    {isVi
                      ? '5 Báo cáo Kỹ thuật Gốc về Tàu Đổ Bộ Mặt Trăng Surveyor 3'
                      : '5 Primary NASA NTRS Reports on Surveyor 3'}
                  </h2>
                </div>
                {renderStatusBadge('Available')}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DATA_SURVEYOR_NTRS_DOCS.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 bg-[#162A40] hover:bg-[#21374D] border border-[#AAB8C7]/20 hover:border-[#D2A071] rounded-xl flex flex-col justify-between gap-3 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="font-mono text-[13px] text-[#D2A071] font-semibold">{doc.id}</div>
                      <h3 className="font-sans text-base font-semibold text-[#F0EDE5] leading-snug">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-[#AAB8C7] leading-relaxed">
                        {isVi ? doc.descVi : doc.descEn}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-sm font-medium text-[#D2A071]">
                      <span>{isVi ? 'Mở báo cáo gốc (ntrs.nasa.gov)' : 'Open NASA NTRS PDF/Citation'}</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Sub-section 4B: Curated Official NASA Visual Media */}
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F0EDE5]">
                  {isVi ? 'Kho Tư liệu Hình ảnh Chính thức Đã Kiểm chứng' : 'Curated Official NASA Media Library'}
                </h2>
                <p className="text-base text-[#AAB8C7] mt-1">
                  {isVi
                    ? 'Mỗi hình ảnh đều gắn kèm nguồn NASA/JPL, mã nhận diện và phân biệt rõ ảnh chụp thật với sơ đồ hoặc tranh minh họa.'
                    : 'Every photograph and diagram carries its NASA credit, catalog ID, and documentary vs. illustration label.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Object.values(NASA_MEDIA_CATALOG).slice(0, 9).map((media) => {
                  const imgSrc = resolveMediaUrl(media);
                  return (
                    <div
                      key={media.id}
                      className="bg-[#101E30] border border-[#AAB8C7]/20 rounded-xl overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-[16/10] bg-[#162A40] overflow-hidden">
                          {imgSrc && (
                            <img
                              src={imgSrc}
                              onError={(e) => {
                                const t = e.currentTarget;
                                const cleanLocal = media?.local_asset_url ? media.local_asset_url.replace('/public/', '/') : '';
                                if (cleanLocal && t.src !== cleanLocal) {
                                  t.src = cleanLocal;
                                } else if (media?.direct_asset_url && t.src !== media.direct_asset_url) {
                                  t.src = media.direct_asset_url;
                                }
                              }}
                              alt={media.alt_vi}
                              className="w-full h-full object-cover"
                            />
                          )}
                          {onOpenLightbox && (
                            <button
                              type="button"
                              onClick={() => onOpenLightbox(media)}
                              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B1422]/85 hover:bg-[#162A40] text-[#F0EDE5] border border-[#AAB8C7]/30 rounded-lg text-[13px] cursor-pointer"
                            >
                              <Maximize2 className="w-3.5 h-3.5 text-[#D2A071]" />
                              <span>{isVi ? 'Phóng lớn' : 'Expand'}</span>
                            </button>
                          )}
                        </div>
                        <div className="p-5 space-y-2">
                          <div className="font-mono text-[13px] text-[#D2A071]">{media.credit}</div>
                          <h3 className="font-sans text-base font-semibold text-[#F0EDE5] leading-snug">
                            {media.title}
                          </h3>
                          <p className="text-sm text-[#AAB8C7] leading-relaxed line-clamp-2">
                            {media.caption_vi}
                          </p>
                        </div>
                      </div>
                      <div className="px-5 py-3 bg-[#162A40]/70 border-t border-[#AAB8C7]/15 flex items-center justify-between text-sm">
                        <span className="text-[#AAB8C7]">
                          {media.media_type === 'NASA_DIAGRAM'
                            ? isVi
                              ? 'Sơ đồ kỹ thuật'
                              : 'Diagram'
                            : isVi
                            ? 'Tư liệu NASA'
                            : 'NASA Photo'}
                        </span>
                        <a
                          href={media.source_page}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#D2A071] hover:underline"
                        >
                          <span>{isVi ? 'Trang gốc NASA' : 'NASA Page'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sub-section 4C: Clean Readable Reference Links */}
            <div className="space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F0EDE5]">
                {isVi ? 'Danh mục Nguồn Trích dẫn Chính thức NASA' : 'Verified NASA Reference Sources'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(SOURCES_CATALOG).map((src) => (
                  <a
                    key={src.id}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 sm:p-5 bg-[#101E30] hover:bg-[#162A40] border border-[#AAB8C7]/20 hover:border-[#D2A071] rounded-xl flex items-center justify-between gap-4 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="font-mono text-[13px] text-[#D2A071]">
                        {src.id} · Kiểm tra {src.last_checked}
                      </div>
                      <div className="font-sans text-base font-medium text-[#F0EDE5]">
                        {src.title}
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-[#D2A071] shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* =====================================================================
       * INTERACTIVE 7-SECTION DETAILED RECORD MODAL
       * 1. Tổng quan · 2. Thông tin sứ mệnh · 3. Hành trình · 4. Công nghệ & Thiết bị
       * 5. Thành tựu khoa học · 6. Dữ liệu kỹ thuật · 7. Nguồn tham khảo
       * ===================================================================== */}
      {modalDetail && (
        <div
          className="fixed inset-0 z-50 bg-[#0B1422]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setModalDetail(null)}
        >
          <div
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#101E30] border border-[#D2A071]/40 rounded-2xl shadow-2xl text-[#F0EDE5]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 bg-[#101E30]/95 backdrop-blur-md border-b border-[#AAB8C7]/15 px-6 py-5 flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[13px] text-[#D2A071]">{modalDetail.subtitle}</span>
                  {renderStatusBadge(modalDetail.status)}
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#F0EDE5]">
                  {modalDetail.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setModalDetail(null)}
                aria-label="Close detail modal"
                className="p-2 bg-[#162A40] hover:bg-[#21374D] rounded-lg text-[#AAB8C7] hover:text-[#F0EDE5] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 7 Clean Human-Readable Sections */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* SECTION 1: TỔNG QUAN */}
              <section className="p-5 sm:p-6 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl space-y-4">
                <div className="font-mono text-[13px] font-semibold text-[#D2A071] uppercase">
                  {isVi ? '1. Tổng quan' : '1. Overview'}
                </div>

                {modalDetail.imageUrl && (
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#0B1422] border border-[#AAB8C7]/15">
                    <img
                      src={modalDetail.imageUrl}
                      alt={modalDetail.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-3 text-base text-[#F0EDE5] leading-relaxed">
                  <p>{modalDetail.overviewWhat}</p>
                  <p className="text-[#AAB8C7]">
                    <strong className="text-[#F0EDE5]">{isVi ? 'Vì sao NASA gửi đi: ' : 'Why NASA sent it: '}</strong>
                    {modalDetail.overviewWhy}
                  </p>
                  <p className="text-[#AAB8C7]">
                    <strong className="text-[#F0EDE5]">{isVi ? 'Điểm đặc biệt: ' : 'What makes it special: '}</strong>
                    {modalDetail.overviewSpecial}
                  </p>
                </div>
              </section>

              {/* SECTION 2: THÔNG TIN SỨ MỆNH */}
              <section className="p-5 sm:p-6 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl space-y-4">
                <div className="font-mono text-[13px] font-semibold text-[#D2A071] uppercase">
                  {isVi ? '2. Thông tin sứ mệnh' : '2. Mission Information'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                  <div className="p-3.5 bg-[#101E30] rounded-lg">
                    <div className="text-[13px] text-[#AAB8C7]">{isVi ? 'Cơ quan điều hành' : 'Agency / Operator'}</div>
                    <div className="font-medium text-[#F0EDE5] mt-0.5">{modalDetail.missionOperator}</div>
                  </div>
                  <div className="p-3.5 bg-[#101E30] rounded-lg">
                    <div className="text-[13px] text-[#AAB8C7]">{isVi ? 'Tên chính thức' : 'Official Designation'}</div>
                    <div className="font-medium text-[#F0EDE5] mt-0.5">{modalDetail.missionDesignation}</div>
                  </div>
                  <div className="p-3.5 bg-[#101E30] rounded-lg">
                    <div className="text-[13px] text-[#AAB8C7]">{isVi ? 'Nơi đến' : 'Destination'}</div>
                    <div className="font-medium text-[#F0EDE5] mt-0.5">{modalDetail.missionDestination}</div>
                  </div>
                  <div className="p-3.5 bg-[#101E30] rounded-lg">
                    <div className="text-[13px] text-[#AAB8C7]">{isVi ? 'Thời gian hoạt động & Hiện trạng' : 'Active Window & Status'}</div>
                    <div className="font-medium text-[#D2A071] mt-0.5">
                      {modalDetail.missionActivePeriod} · {modalDetail.missionDisposition}
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3: HÀNH TRÌNH */}
              <section className="p-5 sm:p-6 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl space-y-4">
                <div className="font-mono text-[13px] font-semibold text-[#D2A071] uppercase">
                  {isVi ? '3. Hành trình & Cột mốc chính' : '3. Journey & Milestones'}
                </div>
                <div className="space-y-3">
                  {modalDetail.milestones.map((m, idx) => (
                    <div key={idx} className="p-4 bg-[#101E30] border-l-4 border-[#D2A071] rounded-r-lg space-y-1">
                      <div className="font-mono text-[13px] text-[#D2A071] font-semibold">{m.date}</div>
                      <div className="font-sans text-base font-semibold text-[#F0EDE5]">{m.title}</div>
                      <p className="text-sm sm:text-base text-[#AAB8C7] leading-relaxed">{m.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 4: CÔNG NGHỆ VÀ THIẾT BỊ */}
              <section className="p-5 sm:p-6 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl space-y-4">
                <div className="font-mono text-[13px] font-semibold text-[#D2A071] uppercase">
                  {isVi ? '4. Công nghệ và Thiết bị khoa học' : '4. Technology & Instruments'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {modalDetail.instruments.map((inst, idx) => (
                    <div key={idx} className="p-4 bg-[#101E30] rounded-lg space-y-1">
                      <div className="font-sans text-base font-semibold text-[#F0EDE5]">{inst.name}</div>
                      <p className="text-sm text-[#AAB8C7] leading-relaxed">{inst.role}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 5: THÀNH TỰU KHOA HỌC */}
              <section className="p-5 sm:p-6 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl space-y-3">
                <div className="font-mono text-[13px] font-semibold text-[#D2A071] uppercase">
                  {isVi ? '5. Thành tựu khoa học' : '5. Scientific Achievements'}
                </div>
                <ul className="space-y-2 text-base text-[#F0EDE5] list-disc list-inside leading-relaxed">
                  {modalDetail.achievements.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                {modalDetail.honestNote && (
                  <div className="p-3.5 bg-[#101E30] border border-[#D2A071]/35 rounded-lg text-sm text-[#AAB8C7]">
                    <strong className="text-[#D2A071]">{isVi ? 'Lưu ý chuẩn xác: ' : 'Accuracy Note: '}</strong>
                    {modalDetail.honestNote}
                  </div>
                )}
              </section>

              {/* SECTION 6: DỮ LIỆU KỸ THUẬT */}
              <section className="p-5 sm:p-6 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl space-y-4">
                <div className="font-mono text-[13px] font-semibold text-[#D2A071] uppercase">
                  {isVi ? '6. Dữ liệu kỹ thuật & Vị trí hiện tại' : '6. Technical Data & Location'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm sm:text-base">
                  <div className="p-3.5 bg-[#101E30] rounded-lg">
                    <div className="text-[13px] text-[#AAB8C7]">{isVi ? 'Vị trí / Khu vực' : 'Location'}</div>
                    <div className="text-[#F0EDE5] mt-0.5 leading-snug">{modalDetail.techLocation}</div>
                  </div>
                  <div className="p-3.5 bg-[#101E30] rounded-lg">
                    <div className="text-[13px] text-[#AAB8C7]">{isVi ? 'Nguồn năng lượng' : 'Power System'}</div>
                    <div className="text-[#F0EDE5] mt-0.5 leading-snug">{modalDetail.techPower}</div>
                  </div>
                  <div className="p-3.5 bg-[#101E30] rounded-lg">
                    <div className="text-[13px] text-[#AAB8C7]">{isVi ? 'Khối lượng / Thông số' : 'Mass / Specs'}</div>
                    <div className="text-[#F0EDE5] mt-0.5 leading-snug">{modalDetail.techMass}</div>
                  </div>
                  <div className="p-3.5 bg-[#101E30] rounded-lg">
                    <div className="text-[13px] text-[#AAB8C7]">{isVi ? 'Mã định danh lưu trữ' : 'Archive / NSSDCA ID'}</div>
                    <div className="font-mono text-[#D2A071] mt-0.5">{modalDetail.techNssdc}</div>
                  </div>
                </div>
              </section>

              {/* SECTION 7: NGUỒN THAM KHẢO */}
              <section className="p-5 sm:p-6 bg-[#162A40] border border-[#AAB8C7]/20 rounded-xl space-y-4">
                <div className="font-mono text-[13px] font-semibold text-[#D2A071] uppercase">
                  {isVi ? '7. Nguồn tham khảo & Trạng thái kiểm chứng' : '7. Official Sources & Verification'}
                </div>
                <p className="text-sm text-[#AAB8C7]">{modalDetail.statusNote}</p>
                <div className="space-y-2">
                  {modalDetail.sources.map((src, idx) => (
                    <a
                      key={idx}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 bg-[#101E30] hover:bg-[#21374D] border border-[#AAB8C7]/20 rounded-lg flex items-center justify-between gap-3 text-sm text-[#F0EDE5] transition-colors"
                    >
                      <span>{src.label}</span>
                      <ExternalLink className="w-4 h-4 text-[#D2A071] shrink-0" />
                    </a>
                  ))}
                </div>
              </section>

              {/* Modal Action Footer */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-3">
                  {modalDetail.journeyRoute && (
                    <button
                      type="button"
                      onClick={() => {
                        const r = modalDetail.journeyRoute!;
                        setModalDetail(null);
                        onNavigate(r);
                      }}
                      className="px-4 py-2.5 bg-[#21374D] hover:bg-[#2c4763] text-[#F0EDE5] border border-[#AAB8C7]/25 rounded-lg text-sm font-medium cursor-pointer"
                    >
                      {isVi ? 'Mở Triển lãm Hành Trình' : 'Open Story Journey'}
                    </button>
                  )}
                  {modalDetail.simRoute && (
                    <button
                      type="button"
                      onClick={() => {
                        const r = modalDetail.simRoute!;
                        setModalDetail(null);
                        onNavigate(r);
                      }}
                      className="px-4 py-2.5 bg-[#21374D] hover:bg-[#2c4763] text-[#F0EDE5] border border-[#AAB8C7]/25 rounded-lg text-sm font-medium cursor-pointer"
                    >
                      {isVi ? 'Thử Thách Mô Phỏng Liên Quan' : 'Open Related Challenge Lab'}
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setModalDetail(null)}
                  className="px-5 py-2.5 bg-[#D2A071] hover:bg-[#e0b287] text-[#0B1422] font-sans text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  {isVi ? 'Đóng hồ sơ' : 'Close Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataCatalogPage;
