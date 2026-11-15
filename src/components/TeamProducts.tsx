import React, { useState, useEffect } from 'react';
import {
  Film,
  Music,
  BookOpen,
  Printer,
  Info,
  Upload,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Sparkles,
  CheckCircle2,
  Maximize2,
  X,
  Download,
  FileText,
  ExternalLink,
  Image
} from 'lucide-react';
import { MACHINE_STORIES } from '../data/stories';

interface TeamProductsProps {
  missionId: 'opportunity' | 'pioneer-11' | 'surveyor-3';
  initialTab?: 'comic' | 'video' | 'audio' | 'poster';
  onNavigate?: (route: string) => void;
}

interface ProductManifest {
  author?: string;
  title?: string;
  description?: string;
  poster?: string | null;
  pdfUrl?: string | null;
  video?: { src: string; poster?: string; duration?: string; titleVi?: string; captions?: string; transcript?: string } | null;
  audio?: { src: string; duration?: string; titleVi?: string; transcript?: string } | null;
  comic?: { pages?: string[]; pdf?: string } | null;
}

interface ComicPanelItem {
  page: number;
  title: string;
  dateBadge?: string;
  captionVi: string;
  captionEn: string;
  image: string;
  dialogue?: string;
}

const resolvePublicUrl = (p: string | null | undefined, missionId?: string): string => {
  if (!p) return '';
  if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('blob:') || p.startsWith('data:')) return p;
  let clean = p;
  if (
    !clean.startsWith('/') &&
    !clean.startsWith('products/') &&
    !clean.startsWith('assets/') &&
    !clean.startsWith('images/') &&
    !clean.startsWith('public/')
  ) {
    clean = `/products/${missionId || 'opportunity'}/${clean.replace(/^\.\//, '')}`;
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

const BUILTIN_MEDIA: Record<
  'opportunity' | 'pioneer-11' | 'surveyor-3',
  {
    posterImage?: string;
    videoSrc?: string;
    videoPoster?: string;
    videoTitle?: string;
    videoDuration?: string;
    audioSrc?: string;
    audioTitle?: string;
    pdfSrc?: string;
    pdfTitle?: string;
  }
> = {
  opportunity: {
    posterImage: '/products/opportunity/little_wheels_poster.png',
    videoSrc: '/products/opportunity/little_wheels.mp4',
    videoPoster: '/products/opportunity/little_wheels_poster.png',
    videoTitle: 'MV: LITTLE WHEELS — A Song for Opportunity (Một bánh xe nhỏ. Một hành trình lớn.)',
    videoDuration: '03:41',
    audioSrc: '/products/opportunity/little_wheels.mp4',
    audioTitle: 'Ca khúc chủ đề: LITTLE WHEELS — A Song for Opportunity (Audio Stream)'
  },
  'surveyor-3': {
    pdfSrc: '/products/surveyor-3/Surveyor_3_Comic.pdf',
    pdfTitle: 'Truyện tranh PDF gốc: SURVEYOR 3 — Người bạn cô độc trên Mặt Trăng (15 trang)'
  },
  'pioneer-11': {}
};

// Built-in Curated Comic Flipbook Data for Opportunity, Pioneer 11 & Full 15-Page Surveyor 3 Graphic Novel
const DEFAULT_COMIC_PANELS: Record<'opportunity' | 'pioneer-11' | 'surveyor-3', ComicPanelItem[]> = {
  'surveyor-3': [
    {
      page: 1,
      dateBadge: '1967–1969 · TRANG BÌA',
      title: 'Trang 1: SURVEYOR 3 — Người bạn cô độc trên Mặt Trăng',
      captionVi: 'Tác phẩm truyện tranh 15 trang kể lại câu chuyện có thật của tàu đổ bộ NASA Surveyor 3 trên Oceanus Procellarum và cuộc hội ngộ lịch sử với phi hành gia Apollo 12.',
      captionEn: '15-page graphic novel: The true story of NASA Surveyor 3 in Oceanus Procellarum and its historic Apollo 12 reunion.',
      image: '/products/surveyor-3/comic/page_01.png',
      dialogue: '“SURVEYOR 3: THE LONELY EXPLORER OF THE MOON — Người bạn cô độc trên Mặt Trăng (1967–1969).”'
    },
    {
      page: 2,
      dateBadge: '17/04/1967 · PHÓNG TÀU',
      title: 'Trang 2: Khởi đầu từ Mũi Canaveral trên tên lửa Atlas-Centaur',
      captionVi: 'Trước khi Apollo có thể đưa con người xuống Mặt Trăng, nhân loại cần biết bề mặt Mặt Trăng là đá cứng an toàn hay lớp bụi sâu nhấn chìm tất cả.',
      captionEn: 'April 17, 1967: Atlas-Centaur launches Surveyor 3 to test whether lunar soil can safely support an Apollo lander.',
      image: '/products/surveyor-3/comic/page_02.png',
      dialogue: '“Tôi là Surveyor 3. Tôi mang theo kỳ vọng của cả nhân loại, tiến vào nơi vô định.”'
    },
    {
      page: 3,
      dateBadge: '20/04/1967 · HAI CÚ NẢY',
      title: 'Trang 3: Đá sáng gây nhiễu Radar & hai cú nảy nghẹt thở',
      captionVi: 'Khi hạ cánh xuống sườn miệng hố, những tảng đá phản xạ mạnh làm nhiễu radar độ cao: động cơ tinh chỉnh chưa tắt ở 4,3 m khiến Surveyor 3 nảy lên 10 m rồi 3 m!',
      captionEn: 'Reflective crater rocks confuse the descent radar, causing two unexpected bounces (10 m and 3 m) before engine cutoff.',
      image: '/products/surveyor-3/comic/page_03.png',
      dialogue: '“Cảnh báo! Mất ổn định độ cao! Bề mặt đang dội ngược lại...”'
    },
    {
      page: 4,
      dateBadge: '3°S, 23,41°W · OCEANUS PROCELLARUM',
      title: 'Trang 4: Hạ cánh thành công trên Đại dương Bão táp',
      captionVi: 'Sau ba lần tiếp đất, toàn bộ khung nhôm tam giác và ba chân tổ ong vẫn đứng vững nguyên vẹn trên sườn dốc 12 độ tại Oceanus Procellarum.',
      captionEn: 'After three touchdowns, Surveyor 3 settles intact on a 12° crater slope in Oceanus Procellarum.',
      image: '/products/surveyor-3/comic/page_04.png',
      dialogue: '“Hệ thống ổn định. Đã hạ cánh xuống Đại dương Bão táp. Nhưng sao ở đây... im lặng đến thế.”'
    },
    {
      page: 5,
      dateBadge: '6.326 BỨC ẢNH TV',
      title: 'Trang 5: Đôi mắt Camera TV 25mm/100mm gửi ảnh đầu tiên',
      captionVi: 'Chỉ trong vòng 1 giờ sau khi chạm đất, chiếc camera quét chậm gắn gương xoay Beryllium truyền về bức ảnh 200 dòng đầu tiên trong tổng số 6.326 bức ảnh.',
      captionEn: 'Within an hour, the dual-focal TV camera with rotating beryllium mirror transmits the first of 6,326 lunar photos.',
      image: '/products/surveyor-3/comic/page_05.png',
      dialogue: '“Những đường quét tín hiệu truyền xuyên 384.000 km khoảng không về Trái Đất: bức ảnh đầu tiên đã tới nơi!”'
    },
    {
      page: 6,
      dateBadge: 'TẦM VỚI 1,5 M · RÃNH 18 CM',
      title: 'Trang 6: Cánh tay đào đất Surface Sampler chứng minh nền đất vững chắc',
      captionVi: 'Cánh tay cơ học vươn dài 1,5 m đào 4 rãnh sâu tới 18 cm và thực hiện thử nghiệm nén — chứng minh đất Mặt Trăng chịu lực ~10 psi, đủ an toàn cho tàu Apollo!',
      captionEn: 'The 1.5 m Surface Sampler scoop digs 4 trenches up to 18 cm deep, proving ~10 psi bearing strength for Apollo.',
      image: '/products/surveyor-3/comic/page_06.png',
      dialogue: '“Cường độ đất đạt ~10 psi. Mặt đất này vững chãi! Con người... các bạn có thể tới đây được rồi.”'
    },
    {
      page: 7,
      dateBadge: '04/05/1967 · TÍN HIỆU CUỐI',
      title: 'Trang 7: Chúc ngủ ngon Trái Đất trước đêm Mặt Trăng -150°C',
      captionVi: 'Hai tuần hoạt động rực rỡ khép lại khi màn đêm Mặt Trăng lạnh giá kéo dài 14 ngày Trái Đất ập đến, làm cạn kiệt nguồn ắc quy Bạc-Kẽm vào ngày 04/05/1967.',
      captionEn: 'May 4, 1967: Two weeks after landing, the freezing 14-day lunar night drains Surveyor 3\'s battery.',
      image: '/products/surveyor-3/comic/page_07.png',
      dialogue: '“Nhiệt độ đã xuống quá thấp. Năng lượng cạn kiệt. Chúc ngủ ngon, Trái Đất...”'
    },
    {
      page: 8,
      dateBadge: '1967 → MÙA HÈ 1969',
      title: 'Trang 8: Hơn 2 năm rưỡi ngủ say chờ đợi giữa thinh không',
      captionVi: 'Năm 1967, 1968 rồi mùa hè 1969 lặng lẽ trôi qua. Giữa vùng Oceanus Procellarum vắng lặng, một phần linh kiện của Surveyor 3 như vẫn ngóng chờ điều gì đó.',
      captionEn: 'Over 2.5 years pass in silence in Oceanus Procellarum as Surveyor 3 waits beneath the unchanging lunar sky.',
      image: '/products/surveyor-3/comic/page_08.png',
      dialogue: '“Nhiệm vụ của tôi đã hoàn thành. Nhưng tại sao tôi có cảm giác... mình vẫn đang chờ đợi một điều gì đó?”'
    },
    {
      page: 9,
      dateBadge: '14/11/1969 · SỰ CỐ SÉT ĐÁNH',
      title: 'Trang 9: Apollo 12 phóng giữa bão & hai tia sét đánh trúng tên lửa',
      captionVi: 'Tháng 11/1969, phi hành đoàn Pete Conrad, Alan Bean và Richard Gordon phóng Apollo 12 hướng tới Oceanus Procellarum, bất ngờ hứng hai cú sét đánh tắt toàn bộ bảng đồng hồ.',
      captionEn: 'Nov 1969: Apollo 12 is struck twice by lightning 36 seconds after liftoff, knocking telemetry and fuel cells offline.',
      image: '/products/surveyor-3/comic/page_09.png',
      dialogue: '“Cảnh báo! Tất cả các pin nhiên liệu đều ngắt! Bảng điều khiển hiển thị những con số vô nghĩa!”'
    },
    {
      page: 10,
      dateBadge: 'JOHN AARON · SCE TO AUX',
      title: 'Trang 10: Lệnh cứu nguy huyền thoại “Flight, try SCE to Aux”',
      captionVi: 'Giám sát điều khiển John Aaron nhớ ra nút phụ trợ hiếm gặp: Alan Bean gạt công tắc “SCE to AUX”, khôi phục dữ liệu tức thì và cứu trọn vẹn sứ mệnh Apollo 12.',
      captionEn: 'Flight controller John Aaron calls “Flight, try SCE to Aux.” Alan Bean flips the switch and saves Apollo 12.',
      image: '/products/surveyor-3/comic/page_10.png',
      dialogue: '“Flight, try SCE to Aux! — Dữ liệu đang quay trở lại! Con đường đến với Oceanus Procellarum đã rộng mở!”'
    },
    {
      page: 11,
      dateBadge: '19/11/1969 · CÁCH ~180 MÉT',
      title: 'Trang 11: Cú hạ cánh chính xác đầu tiên trong lịch sử (Intrepid)',
      captionVi: 'Ngày 19/11/1969, Pete Conrad & Alan Bean điều khiển tàu Intrepid hạ cánh trên rìa miệng hố Surveyor — chỉ cách Surveyor 3 khoảng 180 m (197 yards)!',
      captionEn: 'Nov 19, 1969: Conrad and Bean execute history\'s first pinpoint landing just ~180 m from Surveyor 3.',
      image: '/products/surveyor-3/comic/page_11.png',
      dialogue: '“Nó ngay kia kìa... Ngay bên kia sườn dốc, dưới những tia nắng dịu nhẹ, là người bạn cô độc của chúng ta!”'
    },
    {
      page: 12,
      dateBadge: '20/11/1969 · EVA 2',
      title: 'Trang 12: Phi hành gia bước tới bên rãnh đào năm 1967',
      captionVi: 'Ngày 20/11/1969, hai phi hành gia men theo sườn miệng hố đến ngay sát Surveyor 3 và thấy lớp sơn trắng đã ngả màu nâu nhạt sau 31 tháng phơi bức xạ Mặt Trời.',
      captionEn: 'Conrad and Bean walk down the crater slope to Surveyor 3, noting how 31 months of solar radiation tanned its white paint.',
      image: '/products/surveyor-3/comic/page_12.png',
      dialogue: '“Houston, chúng tôi đã nhìn thấy nó. Nó đang đổi màu nâu nhạt... thật tuyệt đẹp!”'
    },
    {
      page: 13,
      dateBadge: 'CUỘC HỘI NGỘ DUY NHẤT',
      title: 'Trang 13: Lần duy nhất con người chạm tay vào robot tiền trạm ngoài Trái Đất',
      captionVi: 'Khoảnh khắc lịch sử chưa từng lặp lại: đôi găng tay phi hành gia Apollo 12 đứng ngay bên cạnh người anh hùng thầm lặng đã mở đường cho họ hai năm rưỡi trước.',
      captionEn: 'The only time in history astronauts visited an unmanned probe launched earlier on another celestial body.',
      image: '/products/surveyor-3/comic/page_13.png',
      dialogue: '“Chào cậu bạn cũ. Xin lỗi vì đã để cậu đợi lâu đến vậy.”'
    },
    {
      page: 14,
      dateBadge: 'THU HỒI CAMERA TV & GẦU ĐÀO',
      title: 'Trang 14: Mang một phần Surveyor 3 trở về quê hương Trái Đất',
      captionVi: 'Conrad và Bean dùng kìm cắt tháo Camera TV và gầu lấy mẫu đất đóng gói mang về Trái Đất để giới khoa học phân tích sự lão hóa vật liệu trong không gian.',
      captionEn: 'Astronauts detach Surveyor 3\'s TV camera and scoop to study 31 months of lunar space-exposure effects back on Earth.',
      image: '/products/surveyor-3/comic/page_14.png',
      dialogue: '“Hãy mang theo một phần của tôi về quê nhà. Về nơi bầu trời có màu xanh tơi xốp.”'
    },
    {
      page: 15,
      dateBadge: 'SỨ MỆNH HOÀN THÀNH · DI SẢN',
      title: 'Trang 15: Trên Đại dương Bão táp, tôi không còn cô độc nữa',
      captionVi: 'Tàu Intrepid rời mặt trăng mang theo chiếc camera về trưng bày tại Bảo tàng Smithsonian. Dưới ánh Trái Đất xanh ngắt, dấu chân Apollo 12 mãi ở lại cạnh Surveyor 3.',
      captionEn: 'Apollo 12 ascends with Surveyor 3\'s camera (now at the Smithsonian), leaving human footprints beside the quiet pioneer.',
      image: '/products/surveyor-3/comic/page_15.png',
      dialogue: '“Tôi lại ở một mình... Nhưng lần này, tôi không còn cô độc nữa. SỨ MỆNH HOÀN THÀNH.”'
    }
  ],
  opportunity: [
    {
      page: 1,
      dateBadge: 'SOL 0 · 24/01/2004 (PST)',
      title: 'Chương 1: Cú Nảy Xuống Hố Eagle Crater',
      captionVi: 'Túi khí hạ cánh nảy lách cách trên lớp bụi đỏ Meridiani Planum, đưa Opportunity lăn thẳng vào lòng một miệng hố nhỏ tựa như cú "hole-in-one" giữa hoang mạc.',
      captionEn: 'Sol 0: Airbags bounce across Meridiani Planum, rolling Opportunity into a cosmic hole-in-one at Eagle Crater.',
      image: '/assets/nasa/opportunity_rover_and_lander_PIA05180.jpg',
      dialogue: '“Tôi đã đến nơi an toàn. Bầu trời Sao Hỏa màu hổ phách đang mở ra trước mắt tôi.”'
    },
    {
      page: 2,
      dateBadge: 'SOL 36 · NƯỚC CỔ ĐẠI',
      title: 'Chương 2: Phát Hiện Những Viên "Việt Quất" Hematite',
      captionVi: 'Dưới kính hiển vi Microscopic Imager, những viên bi tròn giàu hematite lộ ra — bằng chứng trực tiếp cho thấy nơi đây từng ngâm mình trong nước lỏng cổ đại.',
      captionEn: 'Sol 36: Microscopic Imager reveals gray hematite spherules nicknamed "blueberries" formed in ancient liquid water.',
      image: '/assets/nasa/opportunity_first_selfie_PIA22222.jpg',
      dialogue: '“Nước! Hàng tỷ năm trước, vùng đồng bằng khô cằn này từng là một miền ẩm ướt.”'
    },
    {
      page: 3,
      dateBadge: '90 SOL → 5.111 SOL',
      title: 'Chương 3: Một Bánh Xe Nhỏ, Hành Trình 45,16 km (LITTLE WHEELS)',
      captionVi: 'Từ Victoria đến rìa hố Endeavour rộng 22 km, sáu bánh xe nhỏ quay bền bỉ suốt gần 15 năm và 45,16 km — nguồn cảm hứng cho ca khúc & MV "LITTLE WHEELS".',
      captionEn: 'Traversing Victoria and Endeavour craters, six little wheels covered 45.16 km across 5,111 sols — inspiring the song "LITTLE WHEELS".',
      image: '/products/opportunity/little_wheels_poster.png',
      dialogue: '“Một bánh xe nhỏ. Một hành trình lớn. Dự kiến chỉ 90 ngày, tôi đã bước cùng nhân loại suốt 15 năm.”'
    },
    {
      page: 4,
      dateBadge: '10/06/2018 → 13/02/2019',
      title: 'Chương 4: Tín Hiệu Cuối Tại Thung Lũng Perseverance',
      captionVi: 'Cơn bão bụi toàn cầu năm 2018 che khuất Mặt Trời. Ngày 10/06/2018, Opportunity gửi bản toàn cảnh và tín hiệu cuối cùng trước khi NASA khép lại sứ mệnh ngày 13/02/2019.',
      captionEn: 'June 10, 2018: Global dust storm blocks sunlight at Perseverance Valley. Mission declared complete Feb 13, 2019.',
      image: '/assets/nasa/opportunity_final_panorama_PIA22908.jpg',
      dialogue: '“Pin của tôi đã cạn kiệt, và trời đang tối dần. Cảm ơn Trái Đất vì 15 năm tuyệt đẹp.”'
    }
  ],
  'pioneer-11': [
    {
      page: 1,
      dateBadge: '06/04/1973 (UTC)',
      title: 'Chương 1: Lời Chào Rời Khỏi Chiếc Nôi Địa Cầu',
      captionVi: 'Tên lửa Atlas-Centaur phóng Pioneer 11 mang theo Tấm Bảng Vàng (Pioneer Plaque) vượt vành đai tiểu hành tinh.',
      captionEn: 'April 6, 1973: Atlas-Centaur launches Pioneer 11 carrying the gold-anodized Pioneer Plaque past the asteroid belt.',
      image: '/assets/nasa/pioneer_spacecraft_instrument_diagram.jpg',
      dialogue: '“Chúng tôi mang theo lời chào hòa bình và tọa độ sao xung của Trái Đất.”'
    },
    {
      page: 2,
      dateBadge: '03/12/1974 · SAO MỘC',
      title: 'Chương 2: Vòng Lượn Hấp Dẫn Sinh Tử Quanh Sao Mộc',
      captionVi: 'Lực hấp dẫn khổng lồ của Sao Mộc bẻ cong quỹ đạo Pioneer 11, phóng con tàu lao vút hướng về Sao Thổ.',
      captionEn: 'Dec 3, 1974: Jupiter\'s gravitational slingshot whips Pioneer 11 toward Saturn.',
      image: '/assets/nasa/pioneer11_saturn_titan_739460main.jpg',
      dialogue: '“Gia tốc trọng lực thành công! Mục tiêu tiếp theo: hành tinh có vành đai.”'
    },
    {
      page: 3,
      dateBadge: '01/09/1979 · SAO THỔ',
      title: 'Chương 3: Con Tàu Đầu Tiên Bay Qua Sao Thổ & Vành Đai F',
      captionVi: 'Lần đầu tiên trong lịch sử, Pioneer 11 vượt dưới mặt phẳng vành đai Sao Thổ ở khoảng cách ~21.000 km, khám phá vành đai F mảnh mai.',
      captionEn: 'Sept 1, 1979: First spacecraft to fly past Saturn, discovering the narrow F-ring and clearing the path for Voyager.',
      image: '/assets/nasa/pioneer11_saturn_titan_739460main.jpg',
      dialogue: '“Vành đai F tuyệt đẹp! Con đường phía trước đã an toàn cho Voyager.”'
    },
    {
      page: 4,
      dateBadge: '30/09 & 24/11/1995',
      title: 'Chương 4: Lời Thì Thầm Cuối Cùng Giữa Vùng Liên Sao',
      captionVi: 'Nguồn nhiệt điện SNAP-19 RTG suy giảm dần sau 22 năm; dữ liệu kỹ thuật cuối nhận ngày 24/11/1995. Pioneer 11 tiếp tục hướng về chòm sao Thiên Ưng (Aquila).',
      captionEn: 'Nov 24, 1995: Final telemetry received as SNAP-19 RTG power fades. Coasts onward toward constellation Aquila.',
      image: '/assets/nasa/pioneer_spacecraft_instrument_diagram.jpg',
      dialogue: '“Tín hiệu có thể tắt. Nhưng thông điệp trên tấm bảng vàng sẽ tồn tại hàng triệu năm.”'
    }
  ]
};

export const TeamProducts: React.FC<TeamProductsProps> = ({ missionId, initialTab, onNavigate }) => {
  const story = MACHINE_STORIES[missionId] || MACHINE_STORIES.opportunity;
  const builtin = BUILTIN_MEDIA[missionId] || {};
  const base = `/products/${missionId}/`;
  const [manifest, setManifest] = useState<ProductManifest | null>(null);
  const [comicPage, setComicPage] = useState(0);
  const [isComicLightboxOpen, setIsComicLightboxOpen] = useState(false);
  const [isPosterLightboxOpen, setIsPosterLightboxOpen] = useState(false);
  const [showPdfEmbed, setShowPdfEmbed] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [userUploadedVideo, setUserUploadedVideo] = useState<string | null>(null);
  const [userUploadedAudio, setUserUploadedAudio] = useState<string | null>(null);
  const [userUploadedComic, setUserUploadedComic] = useState<string[]>([]);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  // Reset viewer indices when switching missionId
  useEffect(() => {
    setComicPage(0);
    setShowPdfEmbed(false);
    setIsComicLightboxOpen(false);
    setIsPosterLightboxOpen(false);
    if (initialTab === 'comic') {
      setShowPdfEmbed(false);
    }
  }, [missionId, initialTab]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.protocol === 'file:') return;
    fetch(`${base}manifest.json`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: ProductManifest | null) => {
        if (data) setManifest(data);
      })
      .catch(() => {});
  }, [base]);

  const comicPanels = DEFAULT_COMIC_PANELS[missionId] || DEFAULT_COMIC_PANELS.opportunity;
  const totalComicPages = userUploadedComic.length > 0 ? userUploadedComic.length : comicPanels.length;
  const currentComic = comicPanels[comicPage] || comicPanels[0];

  const resolvedVideoSrc =
    userUploadedVideo ||
    resolvePublicUrl(manifest?.video?.src || builtin.videoSrc || '', missionId);
  const resolvedVideoPoster = resolvePublicUrl(
    manifest?.video?.poster || builtin.videoPoster || builtin.posterImage || '',
    missionId
  );
  const resolvedAudioSrc =
    userUploadedAudio ||
    resolvePublicUrl(manifest?.audio?.src || builtin.audioSrc || '', missionId);
  const resolvedPosterArt = resolvePublicUrl(manifest?.poster || builtin.posterImage || '', missionId);
  const resolvedPdfUrl = resolvePublicUrl(manifest?.pdfUrl || manifest?.comic?.pdf || builtin.pdfSrc || '', missionId);

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'audio' | 'comic') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (type === 'video') {
      const url = URL.createObjectURL(files[0]);
      setUserUploadedVideo(url);
      setUploadSuccessMsg(`Đã tải lên video "${files[0].name}" thành công!`);
    } else if (type === 'audio') {
      const url = URL.createObjectURL(files[0]);
      setUserUploadedAudio(url);
      setUploadSuccessMsg(`Đã tải lên bài hát / âm thanh "${files[0].name}" thành công!`);
    } else if (type === 'comic') {
      const urls = Array.from(files).map((f) => URL.createObjectURL(f));
      setUserUploadedComic(urls);
      setComicPage(0);
      setUploadSuccessMsg(`Đã tải lên ${urls.length} trang truyện tranh thành công!`);
    }
    setTimeout(() => setUploadSuccessMsg(null), 4000);
  };

  const handlePosterNav = () => {
    if (onNavigate) {
      onNavigate(`/poster/${missionId}`);
    } else if (typeof window !== 'undefined') {
      window.location.href = `/poster/${missionId}`;
    }
  };

  return (
    <section id="san-pham-doi" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-[#0b1324] border border-[#1e2d42] shadow-[0_0_35px_rgba(6,9,18,0.9)] p-5 sm:p-8 space-y-8 rounded-sm text-[#F0EDE5]">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1e2d42] pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#e8a86b] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SẢN PHẨM KỂ CHUYỆN CỐT LÕI · {story.machine_name}</span>
              </span>
              <span className="px-2 py-0.5 bg-[#e8a86b]/15 text-[#e8a86b] border border-[#e8a86b]/30 font-mono text-[10px] font-semibold">
                {missionId === 'surveyor-3'
                  ? 'TRUYỆN TRANH 15 TRANG · PDF GỐC'
                  : missionId === 'opportunity'
                  ? 'MV CA NHẠC 03:41 · POSTER NGHỆ THUẬT · TRUYỆN TRANH'
                  : 'AUDIO · MP4 · TRUYỆN TRANH'}
              </span>
              {story.isDemoRecord && (
                <span className="px-2 py-0.5 bg-[#C96F46]/20 text-[#F7C3A8] border border-[#C96F46]/50 font-mono text-[10px] font-bold uppercase">
                  Hồ sơ tư liệu mẫu · Demo Record
                </span>
              )}
            </div>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
              {manifest?.title ||
                (missionId === 'surveyor-3'
                  ? 'SURVEYOR 3: Người bạn cô độc trên Mặt Trăng (Truyện tranh 15 trang & PDF)'
                  : missionId === 'opportunity'
                  ? 'LITTLE WHEELS — A Song for Opportunity (MV 03:41 & Poster Nghệ Thuật)'
                  : `Hành trình của ${story.machine_name} qua Video MP4, Âm nhạc & Truyện tranh`)}
            </h2>
            <p className="text-sm text-[#AAB8C7] leading-relaxed">
              {manifest?.description ||
                'Tác phẩm sáng tạo của đội thi dựa trên dữ liệu khoa học NASA/JPL/NSSDCA — giúp học sinh cảm nhận lịch sử thám hiểm không gian qua âm nhạc, điện ảnh và truyện tranh minh họa.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            {resolvedPdfUrl && (
              <a
                href={resolvedPdfUrl}
                download="Surveyor_3_The_Lonely_Explorer_15Pages.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C96F46] hover:bg-[#B45E37] text-white font-mono text-xs uppercase tracking-wider rounded-xs transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Tải Truyện PDF</span>
              </a>
            )}
            <button
              type="button"
              onClick={handlePosterNav}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#162A40] hover:bg-[#21374D] border border-[#D2A071]/40 text-[#F0EDE5] font-mono text-xs uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4 text-[#e8a86b]" />
              <span>Xem &amp; In Poster</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {uploadSuccessMsg && (
          <div className="p-4 bg-[#10B981]/15 border border-[#10B981]/50 text-[#10B981] flex items-center gap-3 rounded-xs font-mono text-xs">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{uploadSuccessMsg}</span>
          </div>
        )}

        {/* SPECIAL SPOTLIGHT FOR SURVEYOR 3: FULL 15-PAGE GRAPHIC NOVEL & PDF READER */}
        {missionId === 'surveyor-3' && (
          <div className="bg-[#070E1C] border border-[#C5A46A]/45 rounded-xs p-5 sm:p-6 space-y-5 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1e2d42] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#C5A46A] font-bold">
                  <BookOpen className="w-4 h-4" />
                  <span>TRUYỆN TRANH MINH HỌA 15 TRANG · SURVEYOR 3 (1967–1969)</span>
                </div>
                <p className="text-xs text-[#94A3B8]">
                  Minh họa sáng tạo kết hợp tư liệu lịch sử có thật về Surveyor 3 &amp; Apollo 12 (20/04/1967 – 20/11/1969).
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPdfEmbed(false)}
                  className={`px-3 py-1.5 font-mono text-xs rounded-xs cursor-pointer transition-colors ${
                    !showPdfEmbed ? 'bg-[#C5A46A] text-[#07111F] font-bold' : 'bg-[#101b2d] text-[#CBD5E1] border border-[#1e2d42]'
                  }`}
                >
                  Đọc Từng Trang (15 Trang PNG)
                </button>
                {resolvedPdfUrl && (
                  <button
                    type="button"
                    onClick={() => setShowPdfEmbed(true)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs rounded-xs cursor-pointer transition-colors ${
                      showPdfEmbed ? 'bg-[#C96F46] text-white font-bold' : 'bg-[#101b2d] text-[#CBD5E1] border border-[#1e2d42]'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Trình Đọc PDF Trực Tiếp</span>
                  </button>
                )}
              </div>
            </div>

            {showPdfEmbed && resolvedPdfUrl ? (
              <div className="space-y-3">
                <div className="w-full h-[640px] bg-[#040812] border border-[#1e2d42] rounded-xs overflow-hidden">
                  <iframe
                    src={resolvedPdfUrl}
                    title="Surveyor 3 Comic PDF Reader"
                    className="w-full h-full"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#94A3B8] font-mono">
                  <span>Nếu trình duyệt không hiển thị PDF nhúng, hãy chuyển sang chế độ &ldquo;Đọc Từng Trang&rdquo; hoặc mở file trực tiếp:</span>
                  <a
                    href={resolvedPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C5A46A] hover:underline font-bold"
                  >
                    <span>Mở PDF trong tab mới</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Main Landscape 1376x768 Comic Page Viewer */}
                <div className="lg:col-span-8 space-y-3">
                  <div className="relative aspect-[16/9] bg-[#040812] rounded-xs border border-[#C5A46A]/40 overflow-hidden group">
                    <img
                      src={
                        userUploadedComic.length > 0
                          ? userUploadedComic[comicPage]
                          : resolvePublicUrl(currentComic.image, missionId)
                      }
                      alt={currentComic.title}
                      onClick={() => setIsComicLightboxOpen(true)}
                      className="w-full h-full object-contain bg-[#040812] cursor-zoom-in"
                    />
                    <button
                      type="button"
                      onClick={() => setIsComicLightboxOpen(true)}
                      className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#07111F]/90 hover:bg-[#14243A] border border-[#C5A46A]/60 text-[#C5A46A] font-mono text-[11px] rounded-xs cursor-pointer shadow-lg"
                      title="Phóng to toàn màn hình"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Đọc Toàn Màn Hình</span>
                    </button>
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#07111F]/90 border border-white/20 font-mono text-[11px] font-bold text-white rounded-xs">
                      Trang {comicPage + 1} / {totalComicPages}
                    </div>
                  </div>

                  {/* Page Navigation Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-[#101b2d] p-3 border border-[#1e2d42] rounded-xs">
                    <button
                      type="button"
                      disabled={comicPage === 0}
                      onClick={() => setComicPage((p) => Math.max(0, p - 1))}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#162A40] hover:bg-[#21374D] disabled:opacity-35 border border-[#C5A46A]/30 text-xs font-mono text-[#F0EDE5] rounded-xs cursor-pointer transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-[#C5A46A]" />
                      <span>Trang Trước</span>
                    </button>

                    <span className="font-mono text-xs text-[#C5A46A] font-bold">
                      {currentComic.dateBadge || `Trang ${comicPage + 1}`}
                    </span>

                    <button
                      type="button"
                      disabled={comicPage >= totalComicPages - 1}
                      onClick={() => setComicPage((p) => Math.min(totalComicPages - 1, p + 1))}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C96F46] hover:bg-[#B45E37] disabled:opacity-35 text-xs font-mono font-bold text-white rounded-xs cursor-pointer transition-colors"
                    >
                      <span>Trang Sau</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 15-Page Visual Thumbnail Strip */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">
                      Chọn nhanh trang truyện (1–{totalComicPages}):
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                      {(userUploadedComic.length > 0 ? userUploadedComic.map((img, i) => ({ page: i + 1, image: img, title: `Trang ${i + 1}` })) : comicPanels).map((p, idx) => (
                        <button
                          key={p.page}
                          type="button"
                          onClick={() => setComicPage(idx)}
                          className={`relative shrink-0 w-24 aspect-[16/9] rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                            comicPage === idx
                              ? 'border-[#C5A46A] ring-2 ring-[#C5A46A]/40 scale-[1.03]'
                              : 'border-[#1e2d42] opacity-65 hover:opacity-100'
                          }`}
                          title={p.title}
                        >
                          <img
                            src={userUploadedComic.length > 0 ? p.image : resolvePublicUrl(p.image, missionId)}
                            alt={`Trang ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-0.5 right-0.5 px-1 bg-black/80 font-mono text-[9px] font-bold text-white rounded-xs">
                            {idx + 1}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right-Hand Scientific Context & Dialogue Companion */}
                <div className="lg:col-span-4 bg-[#101b2d] border border-[#1e2d42] rounded-xs p-5 space-y-4">
                  <div className="space-y-1.5">
                    <span className="inline-block px-2 py-0.5 bg-[#C5A46A]/15 text-[#C5A46A] border border-[#C5A46A]/35 font-mono text-[10px] uppercase tracking-wider font-bold rounded-xs">
                      {currentComic.dateBadge || `CHƯƠNG ${comicPage + 1}`}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white leading-snug">
                      {currentComic.title}
                    </h3>
                  </div>

                  {currentComic.dialogue && userUploadedComic.length === 0 && (
                    <blockquote className="p-3.5 bg-[#070E1C] border-l-3 border-[#C5A46A] text-sm italic text-[#F8FAFC] leading-relaxed rounded-xs">
                      {currentComic.dialogue}
                    </blockquote>
                  )}

                  <div className="space-y-2 text-xs text-[#CBD5E1] leading-relaxed">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#D2A071] font-bold">
                      Bối cảnh &amp; Dữ kiện NASA đằng sau trang truyện:
                    </div>
                    <p>{currentComic.captionVi}</p>
                    <p className="text-[#94A3B8] italic">{currentComic.captionEn}</p>
                  </div>

                  <div className="pt-3 border-t border-[#1e2d42] space-y-2">
                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate('/mo-phong?mission=surveyor-3')}
                      className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-[#162A40] hover:bg-[#21374D] border border-[#D2A071]/40 text-[#D2A071] font-mono text-xs font-bold rounded-xs cursor-pointer transition-colors"
                    >
                      <span>Thử Nghiệm Cơ Học Đất &amp; X-Ray Surveyor 3 →</span>
                    </button>
                    <label className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#060912] hover:bg-[#162A40] border border-dashed border-[#e8a86b]/40 text-xs font-mono text-[#e8a86b] rounded-xs cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>+ Nạp thêm trang ảnh tùy chỉnh</span>
                      <input
                        type="file"
                        multiple
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(e) => handleUploadFile(e, 'comic')}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SPECIAL SPOTLIGHT FOR OPPORTUNITY: "LITTLE WHEELS" MUSIC VIDEO & ARTWORK POSTER */}
        {missionId === 'opportunity' && (
          <div className="bg-[#070E1C] border border-[#C96F46]/45 rounded-xs p-5 sm:p-6 space-y-5 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1e2d42] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#C96F46] font-bold">
                  <Film className="w-4 h-4" />
                  <span>MV &amp; POSTER CHÍNH THỨC · LITTLE WHEELS — A SONG FOR OPPORTUNITY</span>
                </div>
                <p className="text-xs text-[#94A3B8]">
                  Tác phẩm âm nhạc (03:41) và Poster sáng tác bởi đội thi dựa trên dữ kiện thật: 90 sol thiết kế → 5.111 sol, 45,16 km trên Sao Hỏa.
                </p>
              </div>
              <span className="px-2.5 py-1 bg-[#C96F46]/20 text-[#F7C3A8] border border-[#C96F46]/45 font-mono text-[10px] font-bold uppercase rounded-xs">
                Tác phẩm sáng tạo dựa trên dữ liệu NASA/JPL
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* MV Player */}
              <div className="lg:col-span-7 space-y-3">
                <div className="relative aspect-video bg-[#040812] rounded-xs border border-[#C96F46]/40 overflow-hidden shadow-xl">
                  <video
                    controls
                    preload="metadata"
                    poster={resolvedVideoPoster || undefined}
                    className="w-full h-full object-contain bg-black"
                    src={resolvedVideoSrc}
                  >
                    Trình duyệt không hỗ trợ thẻ video.
                  </video>
                </div>
                <div className="p-3.5 bg-[#101b2d] border border-[#1e2d42] rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display text-sm font-bold text-white">
                      {manifest?.video?.titleVi || builtin.videoTitle}
                    </h3>
                    <p className="text-[11px] text-[#94A3B8] mt-0.5">
                      Thời lượng: {manifest?.video?.duration || '03:41'} · Âm nhạc gốc kể chuyện 15 năm Opportunity (Meridiani Planum → Endeavour Crater)
                    </p>
                  </div>
                  <a
                    href={resolvedVideoSrc}
                    download="LITTLE_WHEELS_A_Song_for_Opportunity.mp4"
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#162A40] hover:bg-[#21374D] border border-[#C5A46A]/40 text-[#C5A46A] font-mono text-[11px] rounded-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải Video MP4</span>
                  </a>
                </div>
              </div>

              {/* Core Poster Showcase */}
              <div className="lg:col-span-5 bg-[#101b2d] border border-[#1e2d42] rounded-xs p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#C5A46A] font-bold flex items-center gap-1.5">
                    <Image className="w-3.5 h-3.5" />
                    <span>Poster: Một bánh xe nhỏ. Một hành trình lớn</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsPosterLightboxOpen(true)}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-[#07111F] hover:bg-[#162A40] border border-[#C5A46A]/40 text-[#C5A46A] font-mono text-[10px] rounded-xs cursor-pointer"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Phóng lớn</span>
                  </button>
                </div>

                {resolvedPosterArt && (
                  <div className="relative bg-[#040812] border border-[#C5A46A]/30 rounded-xs overflow-hidden">
                    <img
                      src={resolvedPosterArt}
                      alt="Poster LITTLE WHEELS — A Song for Opportunity"
                      onClick={() => setIsPosterLightboxOpen(true)}
                      className="w-full max-h-[300px] object-contain mx-auto cursor-zoom-in"
                    />
                  </div>
                )}

                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Poster nghệ thuật đồng hành cùng ca khúc <strong className="text-white">“LITTLE WHEELS”</strong> — biểu tượng cho sáu bánh xe nhôm kiên cường biến ước mơ 90 ngày thành 15 năm lịch sử.
                </p>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={resolvedPosterArt}
                    download="LITTLE_WHEELS_Opportunity_Poster.png"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#C96F46] hover:bg-[#B45E37] text-white font-mono text-[11px] font-bold rounded-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải Poster PNG</span>
                  </a>
                  <button
                    type="button"
                    onClick={handlePosterNav}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#162A40] hover:bg-[#21374D] border border-[#C5A46A]/40 text-[#F0EDE5] font-mono text-[11px] rounded-xs cursor-pointer transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#C5A46A]" />
                    <span>Trang In Poster</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3 Multimedia Pillars Grid (Compact Companion for All 3 Missions) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1. TRUYỆN TRANH LẬT ĐƯỢC (COMIC FLIPBOOK READER) */}
          <div className="bg-[#101b2d] border border-[#1e2d42] p-5 rounded-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#e8a86b] font-bold">
                  <BookOpen className="w-4 h-4 text-[#e8a86b]" />
                  <span>Truyện Tranh &amp; Storyboard</span>
                </div>
                <span className="font-mono text-[11px] text-[#AAB8C7]">
                  Trang {comicPage + 1} / {totalComicPages}
                </span>
              </div>

              {/* Comic Page Visual Card */}
              <div className="relative aspect-[4/3] bg-[#060912] rounded-xs border border-[#1e2d42] overflow-hidden group">
                <img
                  src={
                    userUploadedComic.length > 0
                      ? userUploadedComic[comicPage]
                      : resolvePublicUrl(currentComic.image, missionId)
                  }
                  alt={currentComic.title}
                  onClick={() => setIsComicLightboxOpen(true)}
                  className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#060912]/90 via-transparent to-transparent" />

                {currentComic.dialogue && userUploadedComic.length === 0 && (
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2.5 bg-[#0b1324]/90 border border-[#e8a86b]/40 text-xs italic text-[#F0EDE5] rounded-xs font-sans">
                    {currentComic.dialogue}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h4 className="font-sans font-bold text-sm text-[#F8FAFC]">{currentComic.title}</h4>
                <p className="text-xs text-[#cbd5e1] leading-relaxed">{currentComic.captionVi}</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#1e2d42]">
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  disabled={comicPage === 0}
                  onClick={() => setComicPage((p) => Math.max(0, p - 1))}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#162A40] hover:bg-[#21374D] disabled:opacity-30 border border-[#1e2d42] text-xs font-mono text-[#F0EDE5] rounded-xs cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-[#e8a86b]" />
                  <span>Trang trước</span>
                </button>
                <button
                  type="button"
                  disabled={comicPage >= totalComicPages - 1}
                  onClick={() => setComicPage((p) => Math.min(totalComicPages - 1, p + 1))}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#162A40] hover:bg-[#21374D] disabled:opacity-30 border border-[#1e2d42] text-xs font-mono text-[#F0EDE5] rounded-xs cursor-pointer transition-colors"
                >
                  <span>Trang sau</span>
                  <ChevronRight className="w-4 h-4 text-[#e8a86b]" />
                </button>
              </div>

              <label className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#060912] hover:bg-[#162A40] border border-dashed border-[#e8a86b]/40 text-xs font-mono text-[#e8a86b] rounded-xs cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>+ Nạp trang truyện mới (JPG/PNG)</span>
                <input
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => handleUploadFile(e, 'comic')}
                />
              </label>
            </div>
          </div>

          {/* 2. ÂM NHẠC & PODCAST (AUDIO PLAYER) */}
          <div className="bg-[#101b2d] border border-[#1e2d42] p-5 rounded-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#e8a86b] font-bold">
                  <Music className="w-4 h-4 text-[#e8a86b]" />
                  <span>Âm Nhạc &amp; Podcast Không Gian</span>
                </div>
                <span className="font-mono text-[11px] text-[#AAB8C7]">
                  {missionId === 'opportunity' ? '03:41 · Ca khúc gốc' : missionId === 'surveyor-3' ? '1967–1969' : 'Liên sao'}
                </span>
              </div>

              <div className="p-4 bg-[#060912] border border-[#1e2d42] rounded-xs space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-[#162A40] border border-[#e8a86b]/50 flex items-center justify-center text-[#e8a86b] shrink-0 ${isPlayingAudio ? 'animate-pulse' : ''}`}>
                    <Volume2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-[#F8FAFC]">
                      {userUploadedAudio
                        ? 'Tệp âm thanh tải lên từ máy bạn'
                        : resolvedAudioSrc
                        ? manifest?.audio?.titleVi || builtin.audioTitle || `Ca khúc chủ đề ${story.machine_name}`
                        : `Âm thanh viễn trắc: ${story.machine_name}`}
                    </h4>
                    <p className="font-mono text-[11px] text-[#AAB8C7]">
                      {userUploadedAudio
                        ? 'Đang phát tệp cục bộ'
                        : resolvedAudioSrc
                        ? 'Sẵn sàng phát trực tiếp (Audio stream)'
                        : 'Có thể nạp tệp MP3/WAV của bạn'}
                    </p>
                  </div>
                </div>

                {resolvedAudioSrc ? (
                  <audio
                    controls
                    className="w-full h-10 accent-[#e8a86b]"
                    src={resolvedAudioSrc}
                    onPlay={() => setIsPlayingAudio(true)}
                    onPause={() => setIsPlayingAudio(false)}
                  >
                    Trình duyệt không hỗ trợ thẻ audio.
                  </audio>
                ) : (
                  <div className="p-2.5 bg-[#0b1324] border border-[#1e2d42] font-mono text-[11px] text-[#94A3B8] text-center">
                    Chưa gắn file MP3 sẵn cho {story.machine_name}. Dùng nút bên dưới để nạp tệp audio ngay.
                  </div>
                )}
              </div>

              <div className="p-3 bg-[#060912] border border-[#1e2d42] rounded-xs text-xs space-y-1.5 max-h-36 overflow-y-auto">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#e8a86b] font-semibold">
                  Lời dẫn &amp; Ý tưởng kể chuyện:
                </span>
                <p className="text-[#cbd5e1] leading-relaxed text-[11px]">
                  {missionId === 'opportunity'
                    ? '“LITTLE WHEELS — Một bánh xe nhỏ, một hành trình lớn: giai điệu kể lại 5.111 sol phi thường biến mục tiêu 90 ngày thành 15 năm bất tử trên Sao Hỏa.”'
                    : missionId === 'surveyor-3'
                    ? '“Trong suốt 31 tháng lặng lẽ trên sườn hố Oceanus Procellarum, tín hiệu năm 1967 đã ngừng vang, nhưng chính những rãnh đất 18 cm ấy đã dẫn lối cho Apollo 12 hạ cánh chính xác.”'
                    : '“Tiếng sóng vô tuyến đơn côi của máy phát RTG SNAP-19 vang vọng qua 22 năm, vượt qua bóng tối vành đai F Sao Thổ hướng đến chân trời bao la.”'}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1e2d42]">
              <label className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#060912] hover:bg-[#162A40] border border-dashed border-[#e8a86b]/40 text-xs font-mono text-[#e8a86b] rounded-xs cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>+ Nạp tệp âm nhạc / MP3 từ máy tính</span>
                <input
                  type="file"
                  accept="audio/mp3,audio/wav,audio/ogg,audio/mpeg"
                  className="hidden"
                  onChange={(e) => handleUploadFile(e, 'audio')}
                />
              </label>
            </div>
          </div>

          {/* 3. VIDEO MP4 / HOẠT HÌNH (MP4 VIDEO PLAYER) */}
          <div className="bg-[#101b2d] border border-[#1e2d42] p-5 rounded-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#e8a86b] font-bold">
                  <Film className="w-4 h-4 text-[#e8a86b]" />
                  <span>Video MP4 / Tư Liệu Mở Rộng</span>
                </div>
                <span className="font-mono text-[11px] text-[#AAB8C7]">
                  {resolvedVideoSrc ? 'MP4 Sẵn Sàng' : 'Tùy chọn nạp MP4'}
                </span>
              </div>

              <div className="relative aspect-video bg-[#060912] rounded-xs border border-[#1e2d42] overflow-hidden">
                {resolvedVideoSrc ? (
                  <video
                    controls
                    preload="metadata"
                    poster={resolvedVideoPoster || undefined}
                    className="w-full h-full object-cover"
                    src={resolvedVideoSrc}
                  >
                    Trình duyệt không hỗ trợ thẻ video.
                  </video>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-5 text-center space-y-2 bg-gradient-to-b from-[#0b1324] to-[#060912]">
                    <div className="w-11 h-11 rounded-full bg-[#162A40] border border-[#e8a86b]/40 flex items-center justify-center text-[#e8a86b]">
                      <Film className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-sans font-bold text-xs text-[#F8FAFC]">
                        {missionId === 'surveyor-3'
                          ? 'Surveyor 3 được kể qua Truyện Tranh 15 Trang & PDF ở khung trên'
                          : `Chưa có tệp MP4 đính kèm cho ${story.machine_name}`}
                      </p>
                      <p className="font-mono text-[10px] text-[#AAB8C7] mt-0.5">
                        Bạn có thể nạp thêm video MP4 / WebM cục bộ ngay bên dưới
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 bg-[#060912] border border-[#1e2d42] rounded-xs text-xs space-y-1">
                <h5 className="font-sans font-bold text-xs text-[#F8FAFC]">
                  {userUploadedVideo
                    ? 'Video tùy chỉnh của bạn'
                    : missionId === 'opportunity'
                    ? 'MV: LITTLE WHEELS — A Song for Opportunity'
                    : `Tư liệu hình ảnh & phim: ${story.machine_name}`}
                </h5>
                <p className="text-[#AAB8C7] text-[11px] leading-relaxed">
                  {missionId === 'opportunity'
                    ? 'Tác phẩm video ca nhạc chính thức của đội thi kể lại 15 năm vượt hố Victoria & Endeavour trên Sao Hỏa.'
                    : missionId === 'surveyor-3'
                    ? 'Ngoài truyện tranh 15 trang & PDF, bạn có thể nạp thêm video thuyết minh về Apollo 12 tại đây.'
                    : 'Ghi lại đường bay ngang qua Sao Mộc và Sao Thổ năm 1979 cùng bản đồ 14 ẩn tinh khắc trên Pioneer Plaque.'}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1e2d42]">
              <label className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#060912] hover:bg-[#162A40] border border-dashed border-[#e8a86b]/40 text-xs font-mono text-[#e8a86b] rounded-xs cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>+ Nạp video MP4 từ máy tính của bạn</span>
                <input
                  type="file"
                  accept="video/mp4,video/webm"
                  className="hidden"
                  onChange={(e) => handleUploadFile(e, 'video')}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Footer Provenance Note */}
        <div className="p-4 bg-[#070b14] border border-[#1e2d42] rounded-xs text-xs text-[#AAB8C7] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#e8a86b] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#F0EDE5]">Ghi chú xuất xứ &amp; lưu trữ:</strong> Các sản phẩm kể chuyện cốt lõi gồm{' '}
            <code className="text-[#e8a86b]">little_wheels.mp4</code>, <code className="text-[#e8a86b]">little_wheels_poster.png</code> (Opportunity) và{' '}
            <code className="text-[#e8a86b]">Surveyor_3_Comic.pdf</code> cùng 15 trang minh họa (Surveyor 3) đều là tác phẩm sáng tạo của đội thi dựa trên tư liệu khoa học NASA/JPL/JSC, không thay thế ảnh chụp lịch sử gốc của NASA.
          </p>
        </div>
      </div>

      {/* Fullscreen Comic Reader Modal */}
      {isComicLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#040812]/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6"
          onClick={() => setIsComicLightboxOpen(false)}
        >
          <div
            className="max-w-6xl w-full mx-auto flex items-center justify-between gap-3 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="font-mono text-[11px] text-[#C5A46A] font-bold uppercase block">
                {story.machine_name} · Trang {comicPage + 1} / {totalComicPages}
              </span>
              <h3 className="font-display text-base sm:text-lg font-bold">{currentComic.title}</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsComicLightboxOpen(false)}
              className="p-2 bg-[#162A40] hover:bg-[#C96F46] text-white rounded-xs cursor-pointer"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="max-w-6xl w-full mx-auto flex-1 flex items-center justify-center my-3 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={
                userUploadedComic.length > 0
                  ? userUploadedComic[comicPage]
                  : resolvePublicUrl(currentComic.image, missionId)
              }
              alt={currentComic.title}
              className="max-h-[76vh] w-auto object-contain rounded-xs border border-[#C5A46A]/40 shadow-2xl"
            />
          </div>

          <div
            className="max-w-4xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0b1324] border border-[#1e2d42] p-3 rounded-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs text-[#CBD5E1] text-center sm:text-left">{currentComic.captionVi}</p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                disabled={comicPage === 0}
                onClick={() => setComicPage((p) => Math.max(0, p - 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#162A40] hover:bg-[#21374D] disabled:opacity-35 text-white font-mono text-xs rounded-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Trước</span>
              </button>
              <button
                type="button"
                disabled={comicPage >= totalComicPages - 1}
                onClick={() => setComicPage((p) => Math.min(totalComicPages - 1, p + 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#C96F46] hover:bg-[#B45E37] disabled:opacity-35 text-white font-mono text-xs font-bold rounded-xs cursor-pointer"
              >
                <span>Sau</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Poster Lightbox Modal */}
      {isPosterLightboxOpen && resolvedPosterArt && (
        <div
          className="fixed inset-0 z-50 bg-[#040812]/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setIsPosterLightboxOpen(false)}
        >
          <div className="max-w-3xl w-full space-y-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between text-white">
              <span className="font-mono text-xs text-[#C5A46A] font-bold uppercase">
                Poster: LITTLE WHEELS — A Song for Opportunity
              </span>
              <button
                type="button"
                onClick={() => setIsPosterLightboxOpen(false)}
                className="p-2 bg-[#162A40] hover:bg-[#C96F46] text-white rounded-xs cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={resolvedPosterArt}
              alt="Poster LITTLE WHEELS"
              className="w-full max-h-[82vh] object-contain rounded-xs border border-[#C5A46A]/50 bg-[#050B16]"
            />
          </div>
        </div>
      )}
    </section>
  );
};
