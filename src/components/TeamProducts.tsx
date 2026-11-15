import React, { useState, useEffect } from 'react';
import {
  Film,
  Music,
  BookOpen,
  Printer,
  Info,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Maximize2,
  X,
  Download,
  FileText,
  ExternalLink,
  Image,
  Play,
  Compass
} from 'lucide-react';
import { MACHINE_STORIES } from '../data/stories';

interface TeamProductsProps {
  missionId: 'opportunity' | 'pioneer-11' | 'surveyor-3';
  initialTab?: 'comic' | 'video' | 'audio' | 'poster';
  onNavigate?: (route: string) => void;
  lang?: 'vi' | 'en';
}

interface ProductManifest {
  author?: string;
  title?: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  poster?: string | null;
  pdfUrl?: string | null;
  video?: { src: string; poster?: string; duration?: string; titleVi?: string; titleEn?: string; captions?: string; transcript?: string } | null;
  audio?: { src: string; duration?: string; titleVi?: string; titleEn?: string; transcript?: string } | null;
  comic?: { pages?: string[]; pdf?: string } | null;
}

interface ComicPanelItem {
  page: number;
  title: string;
  titleEn?: string;
  dateBadge?: string;
  dateBadgeEn?: string;
  captionVi: string;
  captionEn: string;
  image: string;
  imageEn?: string;
  thumbVi?: string;
  thumbEn?: string;
  dialogue?: string;
  dialogueEn?: string;
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
    videoTitleVi?: string;
    videoTitleEn?: string;
    videoDuration?: string;
    audioTitleVi?: string;
    audioTitleEn?: string;
    pdfSrc?: string;
    pdfSrcEn?: string;
    pdfTitleVi?: string;
    pdfTitleEn?: string;
  }
> = {
  opportunity: {
    posterImage: '/products/opportunity/little_wheels_poster.png',
    videoSrc: '/products/opportunity/little_wheels.mp4',
    videoPoster: '/products/opportunity/little_wheels_poster.png',
    videoTitleVi: 'MV: LITTLE WHEELS — A Song for Opportunity (Một bánh xe nhỏ. Một hành trình lớn.)',
    videoTitleEn: 'MV: LITTLE WHEELS — A Song for Opportunity (One Little Wheel. One Giant Journey.)',
    videoDuration: '03:41',
    audioTitleVi: 'Ca khúc chủ đề: LITTLE WHEELS — A Song for Opportunity',
    audioTitleEn: 'Official Song: LITTLE WHEELS — A Song for Opportunity'
  },
  'surveyor-3': {
    pdfSrc: '/products/surveyor-3/Surveyor_3_Comic_VI.pdf',
    pdfSrcEn: '/products/surveyor-3/Surveyor_3_Comic_EN.pdf',
    pdfTitleVi: 'Truyện tranh PDF gốc: SURVEYOR 3 — Người bạn cô độc trên Mặt Trăng (15 trang)',
    pdfTitleEn: 'Official PDF Graphic Novel: SURVEYOR 3 — The Lonely Explorer of the Moon (15 Pages)'
  },
  'pioneer-11': {}
};

// Built-in Curated Comic Flipbook Data for Opportunity, Pioneer 11 & Full 15-Page Surveyor 3 Graphic Novel (Bilingual)
const DEFAULT_COMIC_PANELS: Record<'opportunity' | 'pioneer-11' | 'surveyor-3', ComicPanelItem[]> = {
  'surveyor-3': [
    {
      page: 1,
      dateBadge: '1967–1969 · TRANG BÌA',
      dateBadgeEn: '1967–1969 · COVER',
      title: 'Trang 1: SURVEYOR 3 — Người bạn cô độc trên Mặt Trăng',
      titleEn: 'Page 1: SURVEYOR 3 — The Lonely Explorer of the Moon',
      captionVi: 'Tác phẩm truyện tranh 15 trang kể lại câu chuyện có thật của tàu đổ bộ NASA Surveyor 3 trên Oceanus Procellarum và cuộc hội ngộ lịch sử với phi hành gia Apollo 12.',
      captionEn: '15-page graphic novel: The true story of NASA Surveyor 3 in Oceanus Procellarum and its historic Apollo 12 rendezvous.',
      image: '/products/surveyor-3/comic/page_01.png',
      imageEn: '/products/surveyor-3/comic_en/page_01.png',
      thumbVi: '/products/surveyor-3/thumb_vi/page_01.jpg',
      thumbEn: '/products/surveyor-3/thumb_en/page_01.jpg',
      dialogue: '“SURVEYOR 3: THE LONELY EXPLORER OF THE MOON — Người bạn cô độc trên Mặt Trăng (1967–1969).”',
      dialogueEn: '“SURVEYOR 3: THE LONELY EXPLORER OF THE MOON (1967–1969).”'
    },
    {
      page: 2,
      dateBadge: '17/04/1967 · PHÓNG TÀU',
      dateBadgeEn: 'APRIL 17, 1967 · LIFTOFF',
      title: 'Trang 2: Khởi đầu từ Mũi Canaveral trên tên lửa Atlas-Centaur',
      titleEn: 'Page 2: Liftoff from Cape Canaveral atop Atlas-Centaur',
      captionVi: 'Trước khi Apollo có thể đưa con người xuống Mặt Trăng, nhân loại cần biết bề mặt Mặt Trăng là đá cứng an toàn hay lớp bụi sâu nhấn chìm tất cả.',
      captionEn: 'April 17, 1967: Atlas-Centaur launches Surveyor 3 to test whether the alien lunar surface can safely support an Apollo lander.',
      image: '/products/surveyor-3/comic/page_02.png',
      imageEn: '/products/surveyor-3/comic_en/page_02.png',
      thumbVi: '/products/surveyor-3/thumb_vi/page_02.jpg',
      thumbEn: '/products/surveyor-3/thumb_en/page_02.jpg',
      dialogue: '“Tôi là Surveyor 3. Tôi mang theo kỳ vọng của cả nhân loại, tiến vào nơi vô định.”',
      dialogueEn: '“I am Surveyor 3. Carrying the hopes of all humanity, I head into the unknown.”'
    },
    {
      page: 3,
      dateBadge: '20/04/1967 · HAI CÚ NẢY',
      dateBadgeEn: 'APRIL 20, 1967 · TWO BOUNCES',
      title: 'Trang 3: Đá sáng gây nhiễu Radar & hai cú nảy nghẹt thở',
      titleEn: 'Page 3: Radar deception & two breathtaking bounces',
      captionVi: 'Khi hạ cánh xuống sườn miệng hố, những tảng đá phản xạ mạnh làm nhiễu radar độ cao: động cơ tinh chỉnh chưa tắt ở 4,3 m khiến Surveyor 3 nảy lên 10 m rồi 3 m!',
      captionEn: 'Reflective crater rocks confuse the descent radar; vernier engines stay on at 4.3 m, causing bounces of 10 m and 3 m before touchdown.',
      image: '/products/surveyor-3/comic/page_03.png',
      imageEn: '/products/surveyor-3/comic_en/page_03.png',
      thumbVi: '/products/surveyor-3/thumb_vi/page_03.jpg',
      thumbEn: '/products/surveyor-3/thumb_en/page_03.jpg',
      dialogue: '“Cảnh báo! Mất ổn định độ cao! Bề mặt đang dội ngược lại...”',
      dialogueEn: '“System Error! Altitude radar anomaly! I am rebounding!”'
    },
    {
      page: 4,
      dateBadge: '3°S, 23,41°W · OCEANUS PROCELLARUM',
      dateBadgeEn: '3°S, 23.41°W · OCEANUS PROCELLARUM',
      title: 'Trang 4: Hạ cánh thành công trên Đại dương Bão táp',
      titleEn: 'Page 4: Safe touchdown on the Ocean of Storms',
      captionVi: 'Sau ba lần tiếp đất, toàn bộ khung nhôm tam giác và ba chân tổ ong vẫn đứng vững nguyên vẹn trên sườn dốc 12 độ tại Oceanus Procellarum.',
      captionEn: 'Settling intact on a 12° slope inside a gentle crater, Surveyor 3 establishes humanity’s operational outpost on Oceanus Procellarum.',
      image: '/products/surveyor-3/comic/page_04.png',
      imageEn: '/products/surveyor-3/comic_en/page_04.png',
      thumbVi: '/products/surveyor-3/thumb_vi/page_04.jpg',
      thumbEn: '/products/surveyor-3/thumb_en/page_04.jpg',
      dialogue: '“Hệ thống ổn định. Đã hạ cánh xuống Đại dương Bão táp. Nhưng sao ở đây... im lặng đến thế.”',
      dialogueEn: '“The impact was brutal, but systems are functional. Contrary to its name, this place is eerily silent.”'
    },
    {
      page: 5,
      dateBadge: '6.326 BỨC ẢNH TV',
      dateBadgeEn: '6,326 TV PICTURES',
      title: 'Trang 5: Đôi mắt Camera TV 25mm/100mm gửi ảnh đầu tiên',
      titleEn: 'Page 5: Slow-scan TV camera transmits first frames',
      captionVi: 'Chỉ trong vòng 1 giờ sau khi chạm đất, chiếc camera quét chậm gắn gương xoay Beryllium truyền về bức ảnh 200 dòng đầu tiên trong tổng số 6.326 bức ảnh.',
      captionEn: 'Within one hour of landing, the dual-lens slow-scan TV camera with rotating beryllium mirror beams back humanity’s sharpest lunar views.',
      image: '/products/surveyor-3/comic/page_05.png',
      imageEn: '/products/surveyor-3/comic_en/page_05.png',
      thumbVi: '/products/surveyor-3/thumb_vi/page_05.jpg',
      thumbEn: '/products/surveyor-3/thumb_en/page_05.jpg',
      dialogue: '“Những đường quét tín hiệu truyền xuyên 384.000 km khoảng không về Trái Đất: bức ảnh đầu tiên đã tới nơi!”',
      dialogueEn: '“Video scanlines traverse 384,000 km back to Earth: the first lunar image has arrived!”'
    },
    {
      page: 6,
      dateBadge: 'TẦM VỚI 1,5 M · RÃNH 18 CM',
      dateBadgeEn: '1.5 M REACH · 18 CM TRENCHES',
      title: 'Trang 6: Cánh tay đào đất Surface Sampler chứng minh nền đất vững chắc',
      titleEn: 'Page 6: Surface Sampler scoop proves bearing strength for Apollo',
      captionVi: 'Cánh tay cơ học vươn dài 1,5 m đào 4 rãnh sâu tới 18 cm và thực hiện thử nghiệm nén — chứng minh đất Mặt Trăng chịu lực ~10 psi, đủ an toàn cho tàu Apollo!',
      captionEn: 'The motorized scoop digs 4 trenches up to 18 cm deep and tests compression, proving the lunar regolith safely bears ~10 psi for Apollo.',
      image: '/products/surveyor-3/comic/page_06.png',
      imageEn: '/products/surveyor-3/comic_en/page_06.png',
      thumbVi: '/products/surveyor-3/thumb_vi/page_06.jpg',
      thumbEn: '/products/surveyor-3/thumb_en/page_06.jpg',
      dialogue: '“Cường độ đất đạt ~10 psi. Mặt đất này vững chãi! Con người... các bạn có thể tới đây được rồi.”',
      dialogueEn: '“Soil strength exceeds 10 psi. The ground is firm! Humans... you are safe to walk here.”'
    },
    {
      page: 7,
      dateBadge: '04/05/1967 · TÍN HIỆU CUỐI',
      dateBadgeEn: 'MAY 4, 1967 · FINAL TRANSMISSION',
      title: 'Trang 7: Chúc ngủ ngon Trái Đất trước đêm Mặt Trăng -150°C',
      titleEn: 'Page 7: Goodnight Earth before the -150°C lunar night',
      captionVi: 'Hai tuần hoạt động rực rỡ khép lại khi màn đêm Mặt Trăng lạnh giá kéo dài 14 ngày Trái Đất ập đến, làm cạn kiệt nguồn ắc quy Bạc-Kẽm vào ngày 04/05/1967.',
      captionEn: 'Two weeks of glorious operations conclude as the 14-day lunar night arrives, draining the silver-zinc battery below -150°C.',
      image: '/products/surveyor-3/comic/page_07.png',
      imageEn: '/products/surveyor-3/comic_en/page_07.png',
      thumbVi: '/products/surveyor-3/thumb_vi/page_07.jpg',
      thumbEn: '/products/surveyor-3/thumb_en/page_07.jpg',
      dialogue: '“Nhiệt độ đã xuống quá thấp. Năng lượng cạn kiệt. Chúc ngủ ngon, Trái Đất...”',
      dialogueEn: '“Temperature plunging past critical limits. Power fading. Goodnight, Earth...”'
    },
    {
      page: 8,
      dateBadge: '1967 → MÙA HÈ 1969',
      dateBadgeEn: '1967 → SUMMER 1969',
      title: 'Trang 8: Hơn 2 năm rưỡi ngủ say chờ đợi giữa thinh không',
      titleEn: 'Page 8: Over 2.5 years of quiet waiting in the vacuum',
      captionVi: 'Năm 1967, 1968 rồi mùa hè 1969 lặng lẽ trôi qua. Giữa vùng Oceanus Procellarum vắng lặng, một phần linh kiện của Surveyor 3 như vẫn ngóng chờ điều gì đó.',
      captionEn: 'Years 1967, 1968 and the summer of 1969 pass in stillness. In Oceanus Procellarum, the sleeping scout waits beneath the black sky.',
      image: '/products/surveyor-3/comic/page_08.png',
      imageEn: '/products/surveyor-3/comic_en/page_08.png',
      thumbVi: '/products/surveyor-3/thumb_vi/page_08.jpg',
      thumbEn: '/products/surveyor-3/thumb_en/page_08.jpg',
      dialogue: '“Nhiệm vụ của tôi đã hoàn thành. Nhưng tại sao tôi có cảm giác... mình vẫn đang chờ đợi một điều gì đó?”',
      dialogueEn: '“My primary mission is fulfilled. But why do I feel... as if my story is not yet over?”'
    },
    {
      page: 9,
      dateBadge: '14/11/1969 · SỰ CỐ SÉT ĐÁNH',
      dateBadgeEn: 'NOV 14, 1969 · LIGHTNING STRIKE',
      title: 'Trang 9: Apollo 12 phóng giữa bão & hai tia sét đánh trúng tên lửa',
      titleEn: 'Page 9: Apollo 12 liftoff into storm & lightning crisis',
      captionVi: 'Tháng 11/1969, phi hành đoàn Pete Conrad, Alan Bean và Richard Gordon phóng Apollo 12 hướng tới Oceanus Procellarum, bất ngờ hứng hai cú sét đánh tắt toàn bộ bảng đồng hồ.',
      captionEn: 'Thirty-six seconds after liftoff, lightning strikes the Saturn V twice, disengaging fuel cells and tumbling the telemetry displays into chaos.',
      image: '/products/surveyor-3/comic/page_09.png',
      imageEn: '/products/surveyor-3/comic_en/page_09.png',
      thumbVi: '/products/surveyor-3/thumb_vi/page_09.jpg',
      thumbEn: '/products/surveyor-3/thumb_en/page_09.jpg',
      dialogue: '“Cảnh báo! Tất cả các pin nhiên liệu đều ngắt! Bảng điều khiển hiển thị những con số vô nghĩa!”',
      dialogueEn: '“Warning! Master caution! All fuel cells offline! The cockpit telemetry is scrambled!”'
    },
    {
      page: 10,
      dateBadge: 'JOHN AARON · SCE TO AUX',
      dateBadgeEn: 'JOHN AARON · SCE TO AUX',
      title: 'Trang 10: Lệnh cứu nguy huyền thoại “Flight, try SCE to Aux”',
      titleEn: 'Page 10: The legendary call: “Flight, try SCE to Aux”',
      captionVi: 'Giám sát điều khiển John Aaron nhớ ra nút phụ trợ hiếm gặp: Alan Bean gạt công tắc “SCE to AUX”, khôi phục dữ liệu tức thì và cứu trọn vẹn sứ mệnh Apollo 12.',
      captionEn: 'EECOM flight controller John Aaron recognizes the obscure failure mode: Alan Bean flips SCE to AUX, instantly restoring data and saving the mission.',
      image: '/products/surveyor-3/comic/page_10.png',
      imageEn: '/products/surveyor-3/comic_en/page_10.png',
      thumbVi: '/products/surveyor-3/thumb_vi/page_10.jpg',
      thumbEn: '/products/surveyor-3/thumb_en/page_10.jpg',
      dialogue: '“Flight, try SCE to Aux! — Dữ liệu đang quay trở lại! Con đường đến với Oceanus Procellarum đã rộng mở!”',
      dialogueEn: '“Flight, try SCE to Aux! — Telemetry locked! The voyage to Oceanus Procellarum continues!”'
    },
    {
      page: 11,
      dateBadge: '19/11/1969 · CÁCH ~180 MÉT',
      dateBadgeEn: 'NOV 19, 1969 · ~180 METERS AWAY',
      title: 'Trang 11: Cú hạ cánh chính xác đầu tiên trong lịch sử (Intrepid)',
      titleEn: 'Page 11: History’s first pinpoint precision landing (Intrepid)',
      captionVi: 'Ngày 19/11/1969, Pete Conrad & Alan Bean điều khiển tàu Intrepid hạ cánh trên rìa miệng hố Surveyor — chỉ cách Surveyor 3 khoảng 180 m (197 yards)!',
      captionEn: 'Nov 19, 1969: Pete Conrad and Alan Bean touch down the Lunar Module Intrepid within walking distance (~180 m) of Surveyor 3.',
      image: '/products/surveyor-3/comic/page_11.png',
      imageEn: '/products/surveyor-3/comic_en/page_11.png',
      thumbVi: '/products/surveyor-3/thumb_vi/page_11.jpg',
      thumbEn: '/products/surveyor-3/thumb_en/page_11.jpg',
      dialogue: '“Nó ngay kia kìa... Ngay bên kia sườn dốc, dưới những tia nắng dịu nhẹ, là người bạn cô độc của chúng ta!”',
      dialogueEn: '“There it is! Right across the crater crest, standing in the gentle sunlight, our lonely scout!”'
    },
    {
      page: 12,
      dateBadge: '20/11/1969 · EVA 2',
      dateBadgeEn: 'NOV 20, 1969 · EVA 2',
      title: 'Trang 12: Phi hành gia bước tới bên rãnh đào năm 1967',
      titleEn: 'Page 12: Astronauts hike down to the 1967 trenches',
      captionVi: 'Ngày 20/11/1969, hai phi hành gia men theo sườn miệng hố đến ngay sát Surveyor 3 và thấy lớp sơn trắng đã ngả màu nâu nhạt sau 31 tháng phơi bức xạ Mặt Trời.',
      captionEn: 'Conrad and Bean descend the slope to Surveyor 3, observing how 31 months of unfiltered solar cosmic radiation tanned its white painted surfaces.',
      image: '/products/surveyor-3/comic/page_12.png',
      imageEn: '/products/surveyor-3/comic_en/page_12.png',
      thumbVi: '/products/surveyor-3/thumb_vi/page_12.jpg',
      thumbEn: '/products/surveyor-3/thumb_en/page_12.jpg',
      dialogue: '“Houston, chúng tôi đã nhìn thấy nó. Nó đang đổi màu nâu nhạt... thật tuyệt đẹp!”',
      dialogueEn: '“Houston, we are right by Surveyor 3. It’s got a brown discoloration... simply breathtaking!”'
    },
    {
      page: 13,
      dateBadge: 'CUỘC HỘI NGỘ DUY NHẤT',
      dateBadgeEn: 'THE ONLY REUNION',
      title: 'Trang 13: Lần duy nhất con người chạm tay vào robot tiền trạm ngoài Trái Đất',
      titleEn: 'Page 13: The only human visit to a pre-existing robot on another world',
      captionVi: 'Khoảnh khắc lịch sử chưa từng lặp lại: đôi găng tay phi hành gia Apollo 12 đứng ngay bên cạnh người anh hùng thầm lặng đã mở đường cho họ hai năm rưỡi trước.',
      captionEn: 'A singular milestone in space history: human hands touch the silent robotic pioneer that paved the way two and a half years earlier.',
      image: '/products/surveyor-3/comic/page_13.png',
      imageEn: '/products/surveyor-3/comic_en/page_13.png',
      thumbVi: '/products/surveyor-3/thumb_vi/page_13.jpg',
      thumbEn: '/products/surveyor-3/thumb_en/page_13.jpg',
      dialogue: '“Chào cậu bạn cũ. Xin lỗi vì đã để cậu đợi lâu đến vậy.”',
      dialogueEn: '“Hello, old friend. Thank you for showing us the way.”'
    },
    {
      page: 14,
      dateBadge: 'THU HỒI CAMERA TV & GẦU ĐÀO',
      dateBadgeEn: 'PARTS RETRIEVED FOR STUDY',
      title: 'Trang 14: Mang một phần Surveyor 3 trở về quê hương Trái Đất',
      titleEn: 'Page 14: Returning Surveyor 3 parts to Earth for science',
      captionVi: 'Conrad và Bean dùng kìm cắt tháo Camera TV và gầu lấy mẫu đất đóng gói mang về Trái Đất để giới khoa học phân tích sự lão hóa vật liệu trong không gian.',
      captionEn: 'Astronauts cut free the TV camera and soil scoop, packaging them for return to Earth to study the effects of 31 months of space exposure.',
      image: '/products/surveyor-3/comic/page_14.png',
      imageEn: '/products/surveyor-3/comic_en/page_14.png',
      thumbVi: '/products/surveyor-3/thumb_vi/page_14.jpg',
      thumbEn: '/products/surveyor-3/thumb_en/page_14.jpg',
      dialogue: '“Hãy mang theo một phần của tôi về quê nhà. Về nơi bầu trời có màu xanh tơi xốp.”',
      dialogueEn: '“Carry a piece of me home. Back to Earth under the blue atmosphere.”'
    },
    {
      page: 15,
      dateBadge: 'SỨ MỆNH HOÀN THÀNH · DI SẢN',
      dateBadgeEn: 'MISSION FULFILLED · LEGACY',
      title: 'Trang 15: Trên Đại dương Bão táp, tôi không còn cô độc nữa',
      titleEn: 'Page 15: On the Ocean of Storms, never lonely again',
      captionVi: 'Tàu Intrepid rời mặt trăng mang theo chiếc camera về trưng bày tại Bảo tàng Smithsonian. Dưới ánh Trái Đất xanh ngắt, dấu chân Apollo 12 mãi ở lại cạnh Surveyor 3.',
      captionEn: 'Intrepid lifts off with the TV camera (now displayed at the Smithsonian National Air and Space Museum), leaving footprints beside the quiet pioneer.',
      image: '/products/surveyor-3/comic/page_15.png',
      imageEn: '/products/surveyor-3/comic_en/page_15.png',
      thumbVi: '/products/surveyor-3/thumb_vi/page_15.jpg',
      thumbEn: '/products/surveyor-3/thumb_en/page_15.jpg',
      dialogue: '“Tôi lại ở một mình... Nhưng lần này, tôi không còn cô độc nữa. SỨ MỆNH HOÀN THÀNH.”',
      dialogueEn: '“I am alone once more... But this time, I am never lonely. MISSION ACCOMPLISHED.”'
    }
  ],
  opportunity: [
    {
      page: 1,
      dateBadge: 'SOL 0 · 24/01/2004 (PST)',
      dateBadgeEn: 'SOL 0 · JAN 24, 2004 (PST)',
      title: 'Chương 1: Cú Nảy Xuống Hố Eagle Crater',
      titleEn: 'Chapter 1: The Hole-in-One at Eagle Crater',
      captionVi: 'Túi khí hạ cánh nảy lách cách trên lớp bụi đỏ Meridiani Planum, đưa Opportunity lăn thẳng vào lòng một miệng hố nhỏ tựa như cú "hole-in-one" giữa hoang mạc.',
      captionEn: 'Sol 0: Airbags bounce across Meridiani Planum, rolling Opportunity into a cosmic hole-in-one inside Eagle Crater.',
      image: '/assets/nasa/opportunity_rover_and_lander_PIA05180.jpg',
      dialogue: '“Tôi đã đến nơi an toàn. Bầu trời Sao Hỏa màu hổ phách đang mở ra trước mắt tôi.”',
      dialogueEn: '“I have arrived safely. The amber Martian sky unfolds before my panoramic eyes.”'
    },
    {
      page: 2,
      dateBadge: 'SOL 36 · NƯỚC CỔ ĐẠI',
      dateBadgeEn: 'SOL 36 · ANCIENT WATER',
      title: 'Chương 2: Phát Hiện Những Viên "Việt Quất" Hematite',
      titleEn: 'Chapter 2: Discovery of Hematite "Blueberries"',
      captionVi: 'Dưới kính hiển vi Microscopic Imager, những viên bi tròn giàu hematite lộ ra — bằng chứng trực tiếp cho thấy nơi đây từng ngâm mình trong nước lỏng cổ đại.',
      captionEn: 'Sol 36: Microscopic Imager reveals spherical hematite concretions ("blueberries") proving this area was once soaked in ancient liquid water.',
      image: '/assets/nasa/opportunity_first_selfie_PIA22222.jpg',
      dialogue: '“Nước! Hàng tỷ năm trước, vùng đồng bằng khô cằn này từng là một miền ẩm ướt.”',
      dialogueEn: '“Water! Billions of years ago, this barren plain was once a liquid water world.”'
    },
    {
      page: 3,
      dateBadge: '90 SOL → 5.111 SOL',
      dateBadgeEn: '90 SOLS → 5,111 SOLS',
      title: 'Chương 3: Một Bánh Xe Nhỏ, Hành Trình 45,16 km (LITTLE WHEELS)',
      titleEn: 'Chapter 3: One Little Wheel, 45.16 km Journey (LITTLE WHEELS)',
      captionVi: 'Từ Victoria đến rìa hố Endeavour rộng 22 km, sáu bánh xe nhỏ quay bền bỉ suốt gần 15 năm và 45,16 km — nguồn cảm hứng cho ca khúc & MV "LITTLE WHEELS".',
      captionEn: 'Traversing Victoria and Endeavour craters, six small aluminum wheels rolled 45.16 km across 5,111 sols — inspiring the song and MV "LITTLE WHEELS".',
      image: '/products/opportunity/little_wheels_poster.png',
      dialogue: '“Một bánh xe nhỏ. Một hành trình lớn. Dự kiến chỉ 90 ngày, tôi đã bước cùng nhân loại suốt 15 năm.”',
      dialogueEn: '“One small wheel, one great journey. Engineered for 90 days, I marched alongside humanity for 15 years.”'
    },
    {
      page: 4,
      dateBadge: '10/06/2018 → 13/02/2019',
      dateBadgeEn: 'JUNE 2018 → FEB 2019',
      title: 'Chương 4: Tín Hiệu Cuối Tại Thung Lũng Perseverance',
      titleEn: 'Chapter 4: Final Signal at Perseverance Valley',
      captionVi: 'Cơn bão bụi toàn cầu năm 2018 che khuất Mặt Trời. Ngày 10/06/2018, Opportunity gửi bản toàn cảnh và tín hiệu cuối cùng trước khi NASA khép lại sứ mệnh ngày 13/02/2019.',
      captionEn: 'June 10, 2018: A planetary dust storm darkens the sky over Perseverance Valley. Opportunity beams its final frame; mission concludes Feb 13, 2019.',
      image: '/assets/nasa/opportunity_final_panorama_PIA22908.jpg',
      dialogue: '“Pin của tôi đã cạn kiệt, và trời đang tối dần. Cảm ơn Trái Đất vì 15 năm tuyệt đẹp.”',
      dialogueEn: '“My battery is low and it’s getting dark. Thank you Earth for 15 wondrous years.”'
    }
  ],
  'pioneer-11': [
    {
      page: 1,
      dateBadge: '06/04/1973 (UTC)',
      dateBadgeEn: 'APRIL 6, 1973 (UTC)',
      title: 'Chương 1: Lời Chào Rời Khỏi Chiếc Nôi Địa Cầu',
      titleEn: 'Chapter 1: A Greeting Leaving the Cradle of Earth',
      captionVi: 'Tên lửa Atlas-Centaur phóng Pioneer 11 mang theo Tấm Bảng Vàng (Pioneer Plaque) vượt vành đai tiểu hành tinh.',
      captionEn: 'Atlas-Centaur launches Pioneer 11 carrying the gold-anodized Pioneer Plaque past the asteroid belt into deep space.',
      image: '/assets/nasa/pioneer_spacecraft_instrument_diagram.jpg',
      dialogue: '“Chúng tôi mang theo lời chào hòa bình và tọa độ sao xung của Trái Đất.”',
      dialogueEn: '“We carry a greeting of peace and Earth’s pulsar coordinates into the cosmos.”'
    },
    {
      page: 2,
      dateBadge: '03/12/1974 · SAO MỘC',
      dateBadgeEn: 'DEC 3, 1974 · JUPITER',
      title: 'Chương 2: Vòng Lượn Hấp Dẫn Sinh Tử Quanh Sao Mộc',
      titleEn: 'Chapter 2: Gravity Slingshot Around Mighty Jupiter',
      captionVi: 'Lực hấp dẫn khổng lồ của Sao Mộc bẻ cong quỹ đạo Pioneer 11, phóng con tàu lao vút hướng về Sao Thổ.',
      captionEn: 'Jupiter’s colossal gravity slingshot bends Pioneer 11’s trajectory, accelerating the craft toward Saturn.',
      image: '/assets/nasa/pioneer11_saturn_titan_739460main.jpg',
      dialogue: '“Gia tốc trọng lực thành công! Mục tiêu tiếp theo: hành tinh có vành đai.”',
      dialogueEn: '“Gravity assist complete! Next destination: the ringed giant.”'
    },
    {
      page: 3,
      dateBadge: '01/09/1979 · SAO THỔ',
      dateBadgeEn: 'SEPT 1, 1979 · SATURN',
      title: 'Chương 3: Bay Ngang Qua Sao Thổ & Phát Hiện Vành Đai F',
      titleEn: 'Chapter 3: Historic Saturn Flyby & Discovery of the F Ring',
      captionVi: 'Pioneer 11 trở thành con tàu nhân tạo đầu tiên bay qua Sao Thổ ở cự ly 21.000 km, chụp ảnh Titan và phát hiện vành đai F.',
      captionEn: 'Pioneer 11 becomes humanity’s first spacecraft to reach Saturn (21,000 km flyby), discovering the narrow F ring.',
      image: '/assets/nasa/pioneer11_saturn_rings_titan_1979.jpg',
      dialogue: '“Chúng tôi đã thấy vành đai F và chụp ảnh Titan ở khoảng cách gần!”',
      dialogueEn: '“The narrow F ring is discovered! Titan captured up close for the first time!”'
    },
    {
      page: 4,
      dateBadge: '30/09/1995 · LIÊN SAO',
      dateBadgeEn: 'SEPT 30, 1995 · INTERSTELLAR',
      title: 'Chương 4: Lời Chúc Bình An Bay Vào Không Gian Liên Sao',
      titleEn: 'Chapter 4: Final Telemetry Toward Interstellar Space',
      captionVi: 'Ngày 30/09/1995, liên lạc thông thường chấm dứt. Ngày 24/11/1995 nhận dữ liệu kỹ thuật cuối cùng. Pioneer 11 lặng lẽ bay về hướng chòm sao Aquila.',
      captionEn: 'Final routine contact on Sept 30, 1995; last engineering data on Nov 24, 1995. Pioneer 11 drifts peacefully toward constellation Aquila.',
      image: '/assets/nasa/pioneer_plaque_diagram.png',
      dialogue: '“Tín hiệu khoa học cuối cùng đã gửi đi. Tấm bảng vàng vẫn ở đây, bay mãi trong bóng tối.”',
      dialogueEn: '“Final telemetry dispatched. The Pioneer Plaque travels on forever across interstellar space.”'
    }
  ]
};

export const TeamProducts: React.FC<TeamProductsProps> = ({ missionId, initialTab, onNavigate, lang = 'vi' }) => {
  const isEn = lang === 'en';
  const story = MACHINE_STORIES[missionId] || MACHINE_STORIES.opportunity;
  const builtin = BUILTIN_MEDIA[missionId] || {};
  const base = `/products/${missionId}/`;
  const [manifest, setManifest] = useState<ProductManifest | null>(null);
  const [comicPage, setComicPage] = useState(0);
  const [isComicLightboxOpen, setIsComicLightboxOpen] = useState(false);
  const [isPosterLightboxOpen, setIsPosterLightboxOpen] = useState(false);
  const [showPdfEmbed, setShowPdfEmbed] = useState(false);

  // Comic Edition Switcher: 'vi' or 'en'
  const [comicEdition, setComicEdition] = useState<'vi' | 'en'>(lang || 'vi');

  useEffect(() => {
    if (lang) {
      setComicEdition(lang);
    }
  }, [lang]);

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
  const totalComicPages = comicPanels.length;
  const currentComic = comicPanels[comicPage] || comicPanels[0];

  const isEnglishEdition = comicEdition === 'en';

  // Active page image (switches between Vietnamese and English comic editions)
  const activeComicImage =
    isEnglishEdition && currentComic.imageEn
      ? currentComic.imageEn
      : currentComic.image;

  const resolvedVideoSrc = resolvePublicUrl(manifest?.video?.src || builtin.videoSrc || '', missionId);
  const resolvedVideoPoster = resolvePublicUrl(
    manifest?.video?.poster || builtin.videoPoster || builtin.posterImage || '',
    missionId
  );
  const resolvedPosterArt = resolvePublicUrl(manifest?.poster || builtin.posterImage || '', missionId);

  // Dedicated PDF URL based on selected edition
  const activePdfUrl =
    missionId === 'surveyor-3'
      ? isEnglishEdition
        ? '/products/surveyor-3/Surveyor_3_Comic_EN.pdf'
        : '/products/surveyor-3/Surveyor_3_Comic_VI.pdf'
      : resolvePublicUrl(manifest?.pdfUrl || manifest?.comic?.pdf || builtin.pdfSrc || '', missionId);

  const activePdfFilename =
    isEnglishEdition
      ? 'Surveyor_3_The_Lonely_Explorer_English_Edition.pdf'
      : 'Surveyor_3_Nguoi_Ban_Co_Doc_Tren_Mat_Trang.pdf';

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
                <span>
                  {isEn ? `CORE STORYTELLING EXHIBIT · ${story.machine_name}` : `SẢN PHẨM KỂ CHUYỆN CỐT LÕI · ${story.machine_name}`}
                </span>
              </span>
              <span className="px-2 py-0.5 bg-[#e8a86b]/15 text-[#e8a86b] border border-[#e8a86b]/30 font-mono text-[10px] font-semibold">
                {missionId === 'surveyor-3'
                  ? isEn
                    ? '15-PAGE GRAPHIC NOVEL · ORIGINAL PDF'
                    : 'TRUYỆN TRANH 15 TRANG · PDF GỐC'
                  : missionId === 'opportunity'
                  ? isEn
                    ? 'MUSIC VIDEO 03:41 · EXHIBITION POSTER · COMIC'
                    : 'MV CA NHẠC 03:41 · POSTER NGHỆ THUẬT · TRUYỆN TRANH'
                  : isEn
                    ? 'AUDIO NARRATIVE · MP4 · COMIC'
                    : 'AUDIO · MP4 · TRUYỆN TRANH'}
              </span>
              {story.isDemoRecord && (
                <span className="px-2 py-0.5 bg-[#C96F46]/20 text-[#F7C3A8] border border-[#C96F46]/50 font-mono text-[10px] font-bold uppercase">
                  {isEn ? 'Demo Record' : 'Hồ sơ tư liệu mẫu · Demo Record'}
                </span>
              )}
            </div>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
              {isEn
                ? (manifest?.titleEn ||
                   (missionId === 'surveyor-3'
                     ? 'SURVEYOR 3: The Lonely Explorer of the Moon (15-Page Graphic Novel & PDF)'
                     : missionId === 'opportunity'
                     ? 'LITTLE WHEELS — A Song for Opportunity (MV 03:41 & Exhibition Poster)'
                     : `The Journey of ${story.machine_name} via Film, Audio & Storyboard`))
                : (manifest?.title ||
                   (missionId === 'surveyor-3'
                     ? 'SURVEYOR 3: Người bạn cô độc trên Mặt Trăng (Truyện tranh 15 trang & PDF)'
                     : missionId === 'opportunity'
                     ? 'LITTLE WHEELS — A Song for Opportunity (MV 03:41 & Poster Nghệ Thuật)'
                     : `Hành trình của ${story.machine_name} qua Video MP4, Âm nhạc & Truyện tranh`))}
            </h2>
            <p className="text-sm text-[#AAB8C7] leading-relaxed">
              {isEn
                ? (manifest?.descriptionEn ||
                   'Original creative work inspired by verified NASA/JPL/NSSDCA science data — helping students understand space exploration history through original music, cinema, and illustrated graphic storytelling.')
                : (manifest?.description ||
                   'Tác phẩm sáng tạo của đội thi dựa trên dữ liệu khoa học NASA/JPL/NSSDCA — giúp học sinh cảm nhận lịch sử thám hiểm không gian qua âm nhạc, điện ảnh và truyện tranh minh họa.')}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            {activePdfUrl && (
              <a
                href={activePdfUrl}
                download={activePdfFilename}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C96F46] hover:bg-[#B45E37] text-white font-mono text-xs uppercase tracking-wider rounded-xs transition-colors shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>{isEn ? 'Download Comic PDF' : 'Tải Truyện PDF'}</span>
              </a>
            )}
            <button
              type="button"
              onClick={handlePosterNav}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#162A40] hover:bg-[#21374D] border border-[#D2A071]/40 text-[#F0EDE5] font-mono text-xs uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4 text-[#e8a86b]" />
              <span>{isEn ? 'View & Print Poster' : 'Xem & In Poster'}</span>
            </button>
          </div>
        </div>

        {/* SPECIAL SPOTLIGHT FOR SURVEYOR 3: FULL 15-PAGE GRAPHIC NOVEL & PDF READER */}
        {missionId === 'surveyor-3' && (
          <div className="bg-[#070E1C] border border-[#C5A46A]/45 rounded-xs p-5 sm:p-6 space-y-5 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e2d42] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#C5A46A] font-bold">
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {isEn
                      ? '15-PAGE ILLUSTRATED GRAPHIC NOVEL · SURVEYOR 3 (1967–1969)'
                      : 'TRUYỆN TRANH MINH HỌA 15 TRANG · SURVEYOR 3 (1967–1969)'}
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8]">
                  {isEn
                    ? 'Narrative graphic adaptation of the real mission history: Surveyor 3 & the Apollo 12 rendezvous on Oceanus Procellarum.'
                    : 'Minh họa sáng tạo kết hợp tư liệu lịch sử có thật về Surveyor 3 & Apollo 12 (20/04/1967 – 20/11/1969).'}
                </p>
              </div>

              {/* Language Switcher & Reader Mode Switcher */}
              <div className="flex flex-wrap items-center gap-2">
                {/* VI / EN Edition Toggle */}
                <div className="flex items-center bg-[#060912] p-0.5 border border-[#C5A46A]/50 rounded-xs">
                  <button
                    type="button"
                    onClick={() => setComicEdition('vi')}
                    className={`px-3 py-1 font-mono text-xs rounded-xs cursor-pointer transition-colors ${
                      comicEdition === 'vi'
                        ? 'bg-[#C5A46A] text-[#07111F] font-bold shadow-sm'
                        : 'text-[#AAB8C7] hover:text-[#F0EDE5]'
                    }`}
                  >
                    🇻🇳 Bản Tiếng Việt
                  </button>
                  <button
                    type="button"
                    onClick={() => setComicEdition('en')}
                    className={`px-3 py-1 font-mono text-xs rounded-xs cursor-pointer transition-colors ${
                      comicEdition === 'en'
                        ? 'bg-[#C5A46A] text-[#07111F] font-bold shadow-sm'
                        : 'text-[#AAB8C7] hover:text-[#F0EDE5]'
                    }`}
                  >
                    🇬🇧 English Edition
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPdfEmbed(false)}
                  className={`px-3 py-1.5 font-mono text-xs rounded-xs cursor-pointer transition-colors ${
                    !showPdfEmbed ? 'bg-[#C5A46A] text-[#07111F] font-bold' : 'bg-[#101b2d] text-[#CBD5E1] border border-[#1e2d42]'
                  }`}
                >
                  {isEn ? 'Page Viewer (15 PNGs)' : 'Đọc Từng Trang (15 Trang PNG)'}
                </button>
                {activePdfUrl && (
                  <button
                    type="button"
                    onClick={() => setShowPdfEmbed(true)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs rounded-xs cursor-pointer transition-colors ${
                      showPdfEmbed ? 'bg-[#C96F46] text-white font-bold' : 'bg-[#101b2d] text-[#CBD5E1] border border-[#1e2d42]'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Direct PDF Reader' : 'Trình Đọc PDF Trực Tiếp'}</span>
                  </button>
                )}
              </div>
            </div>

            {showPdfEmbed && activePdfUrl ? (
              <div className="space-y-3">
                <div className="w-full h-[640px] bg-[#040812] border border-[#1e2d42] rounded-xs overflow-hidden">
                  <iframe
                    src={activePdfUrl}
                    title="Surveyor 3 Comic PDF Reader"
                    className="w-full h-full"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#94A3B8] font-mono">
                  <span>
                    {isEn
                      ? 'If the embedded PDF viewer does not render on your device, switch to "Page Viewer" or open directly:'
                      : 'Nếu trình duyệt không hiển thị PDF nhúng, hãy chuyển sang chế độ "Đọc Từng Trang" hoặc mở file trực tiếp:'}
                  </span>
                  <a
                    href={activePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C5A46A] hover:underline font-bold"
                  >
                    <span>{isEn ? 'Open PDF in new tab' : 'Mở PDF trong tab mới'}</span>
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
                      src={resolvePublicUrl(activeComicImage, missionId)}
                      alt={isEn ? (currentComic.titleEn || currentComic.title) : currentComic.title}
                      onClick={() => setIsComicLightboxOpen(true)}
                      className="w-full h-full object-contain bg-[#040812] cursor-zoom-in"
                    />
                    <button
                      type="button"
                      onClick={() => setIsComicLightboxOpen(true)}
                      className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#07111F]/90 hover:bg-[#14243A] border border-[#C5A46A]/60 text-[#C5A46A] font-mono text-[11px] rounded-xs cursor-pointer shadow-lg"
                      title={isEn ? 'Inspect Full Screen' : 'Phóng to toàn màn hình'}
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Full Screen' : 'Đọc Toàn Màn Hình'}</span>
                    </button>
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#07111F]/90 border border-white/20 font-mono text-[11px] font-bold text-white rounded-xs">
                      {isEn ? `Page ${comicPage + 1} / ${totalComicPages}` : `Trang ${comicPage + 1} / ${totalComicPages}`}
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
                      <span>{isEn ? 'Previous' : 'Trang Trước'}</span>
                    </button>

                    <span className="font-mono text-xs text-[#C5A46A] font-bold">
                      {isEn
                        ? (currentComic.dateBadgeEn || currentComic.dateBadge || `Page ${comicPage + 1}`)
                        : (currentComic.dateBadge || `Trang ${comicPage + 1}`)}
                    </span>

                    <button
                      type="button"
                      disabled={comicPage >= totalComicPages - 1}
                      onClick={() => setComicPage((p) => Math.min(totalComicPages - 1, p + 1))}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C96F46] hover:bg-[#B45E37] disabled:opacity-35 text-xs font-mono font-bold text-white rounded-xs cursor-pointer transition-colors"
                    >
                      <span>{isEn ? 'Next' : 'Trang Sau'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 15-Page High-Speed Optimized Visual Thumbnail Strip (Instant loading, no black squares) */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">
                      {isEn ? `Quick select page (1–${totalComicPages}):` : `Chọn nhanh trang truyện (1–${totalComicPages}):`}
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                      {comicPanels.map((p, idx) => {
                        const thumbSrc = isEnglishEdition
                          ? (p.thumbEn || `/products/surveyor-3/thumb_en/page_${String(idx + 1).padStart(2, '0')}.jpg`)
                          : (p.thumbVi || `/products/surveyor-3/thumb_vi/page_${String(idx + 1).padStart(2, '0')}.jpg`);
                        return (
                          <button
                            key={p.page}
                            type="button"
                            onClick={() => setComicPage(idx)}
                            className={`relative shrink-0 w-24 aspect-[16/9] rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                              comicPage === idx
                                ? 'border-[#C5A46A] ring-2 ring-[#C5A46A]/40 scale-[1.03]'
                                : 'border-[#1e2d42] opacity-65 hover:opacity-100'
                            }`}
                            title={isEn ? (p.titleEn || p.title) : p.title}
                          >
                            <img
                              src={thumbSrc}
                              alt={`Trang ${idx + 1}`}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover bg-[#040812]"
                            />
                            <span className="absolute bottom-0.5 right-0.5 px-1 bg-black/80 font-mono text-[9px] font-bold text-white rounded-xs">
                              {idx + 1}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right-Hand Scientific Context & Dialogue Companion */}
                <div className="lg:col-span-4 bg-[#101b2d] border border-[#1e2d42] rounded-xs p-5 space-y-4">
                  <div className="space-y-1.5">
                    <span className="inline-block px-2 py-0.5 bg-[#C5A46A]/15 text-[#C5A46A] border border-[#C5A46A]/35 font-mono text-[10px] uppercase tracking-wider font-bold rounded-xs">
                      {isEn
                        ? (currentComic.dateBadgeEn || currentComic.dateBadge || `CHAPTER ${comicPage + 1}`)
                        : (currentComic.dateBadge || `CHƯƠNG ${comicPage + 1}`)}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white leading-snug">
                      {isEn ? (currentComic.titleEn || currentComic.title) : currentComic.title}
                    </h3>
                  </div>

                  {(currentComic.dialogue || currentComic.dialogueEn) && (
                    <blockquote className="p-3.5 bg-[#070E1C] border-l-3 border-[#C5A46A] text-sm italic text-[#F8FAFC] leading-relaxed rounded-xs">
                      {isEn ? (currentComic.dialogueEn || currentComic.dialogue) : currentComic.dialogue}
                    </blockquote>
                  )}

                  <div className="space-y-2 text-xs text-[#CBD5E1] leading-relaxed">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[#D2A071] font-bold">
                      {isEn ? 'Historical NASA Context Behind the Page:' : 'Bối cảnh & Dữ kiện NASA đằng sau trang truyện:'}
                    </div>
                    <p>{isEn ? currentComic.captionEn : currentComic.captionVi}</p>
                  </div>

                  <div className="pt-2 border-t border-[#1e2d42] space-y-2">
                    <a
                      href={activePdfUrl}
                      download={activePdfFilename}
                      className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-[#C96F46] hover:bg-[#B45E37] text-white font-mono text-xs font-bold rounded-xs transition-colors shadow-md"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isEn ? 'Download 15-Page PDF Comic' : 'Tải Truyện PDF 15 Trang (Bản Gốc)'}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => onNavigate && onNavigate('/mo-phong?mission=surveyor-3')}
                      className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-[#162A40] hover:bg-[#21374D] border border-[#D2A071]/40 text-[#D2A071] font-mono text-xs font-bold rounded-xs cursor-pointer transition-colors"
                    >
                      <span>{isEn ? 'Surveyor 3 Soil Mechanics & X-Ray Lab →' : 'Thử Nghiệm Cơ Học Đất & X-Ray Surveyor 3 →'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SPECIAL SPOTLIGHT FOR OPPORTUNITY: "LITTLE WHEELS" MUSIC VIDEO & ARTWORK POSTER */}
        {missionId === 'opportunity' && (
          <div id="mv-player-section" className="bg-[#070E1C] border border-[#C96F46]/45 rounded-xs p-5 sm:p-6 space-y-5 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1e2d42] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#C96F46] font-bold">
                  <Film className="w-4 h-4" />
                  <span>
                    {isEn
                      ? 'OFFICIAL MUSIC VIDEO & EXHIBITION POSTER · LITTLE WHEELS'
                      : 'MV & POSTER CHÍNH THỨC · LITTLE WHEELS — A SONG FOR OPPORTUNITY'}
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8]">
                  {isEn
                    ? 'Original music composition (03:41) and poster created by the team based on verified NASA facts: 90 planned sols → 5,111 sols and 45.16 km on Mars.'
                    : 'Tác phẩm âm nhạc (03:41) và Poster sáng tác bởi đội thi dựa trên dữ kiện thật: 90 sol thiết kế → 5.111 sol, 45,16 km trên Sao Hỏa.'}
                </p>
              </div>
              <span className="px-2.5 py-1 bg-[#C96F46]/20 text-[#F7C3A8] border border-[#C96F46]/45 font-mono text-[10px] font-bold uppercase rounded-xs">
                {isEn ? 'Creative Interpretation Grounded in NASA/JPL Data' : 'Tác phẩm sáng tạo dựa trên dữ liệu NASA/JPL'}
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
                      {isEn ? (manifest?.video?.titleEn || builtin.videoTitleEn) : (manifest?.video?.titleVi || builtin.videoTitleVi)}
                    </h3>
                    <p className="text-[11px] text-[#94A3B8] mt-0.5">
                      {isEn
                        ? `Runtime: ${manifest?.video?.duration || '03:41'} · Original Song honoring Opportunity's 15-year odyssey (Meridiani Planum → Endeavour Crater)`
                        : `Thời lượng: ${manifest?.video?.duration || '03:41'} · Âm nhạc gốc kể chuyện 15 năm Opportunity (Meridiani Planum → Endeavour Crater)`}
                    </p>
                  </div>
                  <a
                    href={resolvedVideoSrc}
                    download="LITTLE_WHEELS_A_Song_for_Opportunity.mp4"
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#162A40] hover:bg-[#21374D] border border-[#C5A46A]/40 text-[#C5A46A] font-mono text-[11px] rounded-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Download MP4' : 'Tải Video MP4'}</span>
                  </a>
                </div>
              </div>

              {/* Core Poster Showcase */}
              <div className="lg:col-span-5 bg-[#101b2d] border border-[#1e2d42] rounded-xs p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#C5A46A] font-bold flex items-center gap-1.5">
                    <Image className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Exhibition Poster: One Little Wheel, One Great Journey' : 'Poster: Một bánh xe nhỏ. Một hành trình lớn'}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsPosterLightboxOpen(true)}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-[#07111F] hover:bg-[#162A40] border border-[#C5A46A]/40 text-[#C5A46A] font-mono text-[10px] rounded-xs cursor-pointer"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>{isEn ? 'Inspect' : 'Phóng lớn'}</span>
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
                  {isEn
                    ? 'Exhibition Artwork Poster accompanying the song “LITTLE WHEELS” — celebrating the six rugged aluminum wheels that turned a 90-day mission into 15 historic years.'
                    : 'Poster nghệ thuật đồng hành cùng ca khúc “LITTLE WHEELS” — biểu tượng cho sáu bánh xe nhôm kiên cường biến ước mơ 90 ngày thành 15 năm lịch sử.'}
                </p>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={resolvedPosterArt}
                    download="LITTLE_WHEELS_Opportunity_Poster.png"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#C96F46] hover:bg-[#B45E37] text-white font-mono text-[11px] font-bold rounded-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Download PNG' : 'Tải Poster PNG'}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handlePosterNav}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#162A40] hover:bg-[#21374D] border border-[#C5A46A]/40 text-[#F0EDE5] font-mono text-[11px] rounded-xs cursor-pointer transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#C5A46A]" />
                    <span>{isEn ? 'Print Sheet' : 'Trang In Poster'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3 Multimedia Pillars Grid (Compact Companion for All 3 Missions) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 1. TRUYỆN TRANH / STORYBOARD FLIPBOOK */}
          <div className="bg-[#101b2d] border border-[#1e2d42] p-5 rounded-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#e8a86b] font-bold">
                  <BookOpen className="w-4 h-4 text-[#e8a86b]" />
                  <span>{isEn ? 'Graphic Storyboard' : 'Truyện Tranh & Storyboard'}</span>
                </div>
                <span className="font-mono text-[11px] text-[#AAB8C7]">
                  {isEn ? `Page ${comicPage + 1} / ${totalComicPages}` : `Trang ${comicPage + 1} / ${totalComicPages}`}
                </span>
              </div>

              {/* Comic Page Visual Card */}
              <div className="relative aspect-[4/3] bg-[#060912] rounded-xs border border-[#1e2d42] overflow-hidden group">
                <img
                  src={resolvePublicUrl(activeComicImage, missionId)}
                  alt={isEn ? (currentComic.titleEn || currentComic.title) : currentComic.title}
                  onClick={() => setIsComicLightboxOpen(true)}
                  className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#060912]/90 via-transparent to-transparent" />

                {(currentComic.dialogue || currentComic.dialogueEn) && (
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2.5 bg-[#0b1324]/90 border border-[#e8a86b]/40 text-xs italic text-[#F0EDE5] rounded-xs font-sans">
                    {isEn ? (currentComic.dialogueEn || currentComic.dialogue) : currentComic.dialogue}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <h4 className="font-sans font-bold text-sm text-[#F8FAFC]">
                  {isEn ? (currentComic.titleEn || currentComic.title) : currentComic.title}
                </h4>
                <p className="text-xs text-[#cbd5e1] leading-relaxed">
                  {isEn ? currentComic.captionEn : currentComic.captionVi}
                </p>
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
                  <span>{isEn ? 'Previous' : 'Trang trước'}</span>
                </button>
                <button
                  type="button"
                  disabled={comicPage >= totalComicPages - 1}
                  onClick={() => setComicPage((p) => Math.min(totalComicPages - 1, p + 1))}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#162A40] hover:bg-[#21374D] disabled:opacity-30 border border-[#1e2d42] text-xs font-mono text-[#F0EDE5] rounded-xs cursor-pointer transition-colors"
                >
                  <span>{isEn ? 'Next' : 'Trang sau'}</span>
                  <ChevronRight className="w-4 h-4 text-[#e8a86b]" />
                </button>
              </div>
            </div>
          </div>

          {/* 2. REPLACED CARD (Addresses Ảnh 1): CA KHÚC GỐC & LỜI KỂ CHUYỆN / ORIGINAL SOUNDTRACK & NARRATIVE */}
          <div className="bg-[#101b2d] border border-[#1e2d42] p-5 rounded-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#e8a86b] font-bold">
                  <Music className="w-4 h-4 text-[#e8a86b]" />
                  <span>{isEn ? 'Original Soundtrack & Story' : 'Ca Khúc Chủ Đề & Lời Dẫn'}</span>
                </div>
                <span className="font-mono text-[11px] text-[#AAB8C7]">
                  {missionId === 'opportunity' ? '03:41 · Ca khúc gốc' : missionId === 'surveyor-3' ? '1967–1969' : 'Deep Space'}
                </span>
              </div>

              <div className="p-4 bg-[#060912] border border-[#1e2d42] rounded-xs space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#162A40] border border-[#e8a86b]/50 flex items-center justify-center text-[#e8a86b] shrink-0">
                    <Music className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-[#F8FAFC]">
                      {missionId === 'opportunity'
                        ? 'LITTLE WHEELS — A Song for Opportunity'
                        : missionId === 'surveyor-3'
                        ? (isEn ? 'Surveyor 3 & Apollo 12 Audio Logs' : 'Âm thanh Viễn trắc: Surveyor 3 & Apollo 12')
                        : (isEn ? 'Pioneer 11 Deep Space Telemetry' : 'Sóng Viễn trắc Pioneer 11')}
                    </h4>
                    <p className="font-mono text-[11px] text-[#AAB8C7]">
                      {isEn ? 'Official creative score & narrative' : 'Tác phẩm âm nhạc & lời kể chuyện chính thức'}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#0b1324] border border-[#1e2d42] rounded-xs text-xs space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#e8a86b] font-semibold">
                    {isEn ? 'Narrative Concept & Lyrics:' : 'Lời dẫn & Ý tưởng sáng tác:'}
                  </span>
                  <p className="text-[#cbd5e1] leading-relaxed text-[11px] italic">
                    {missionId === 'opportunity'
                      ? (isEn
                          ? '“One little wheel, one giant journey: an original melody honoring the 5,111 extraordinary sols that transformed a 90-day plan into 15 immortal years on Mars.”'
                          : '“LITTLE WHEELS — Một bánh xe nhỏ, một hành trình lớn: giai điệu kể lại 5.111 sol phi thường biến mục tiêu 90 ngày thành 15 năm bất tử trên Sao Hỏa.”')
                      : missionId === 'surveyor-3'
                      ? (isEn
                          ? '“Across 31 months of silence inside the crater slope of Oceanus Procellarum, the 1967 signal had quieted, but those 18 cm trenches guided Apollo 12 to history’s first pinpoint touchdown.”'
                          : '“Trong suốt 31 tháng lặng lẽ trên sườn hố Oceanus Procellarum, tín hiệu năm 1967 đã ngừng vang, nhưng chính những rãnh đất 18 cm ấy đã dẫn lối cho Apollo 12 hạ cánh chính xác.”')
                      : (isEn
                          ? '“The lone radio hum of the SNAP-19 RTG echoed across 22 years, past the shadow of Saturn’s F ring into the vast uncharted interstellar frontier.”'
                          : '“Tiếng sóng vô tuyến đơn côi của máy phát RTG SNAP-19 vang vọng qua 22 năm, vượt qua bóng tối vành đai F Sao Thổ hướng đến chân trời bao la.”')}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1e2d42]">
              {missionId === 'opportunity' ? (
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('mv-player-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-[#C96F46] hover:bg-[#B45E37] text-white font-mono text-xs font-bold rounded-xs cursor-pointer transition-colors shadow-md"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isEn ? '▶ Watch in Official MV (03:41)' : '▶ Thưởng Thức Trong MV (03:41)'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate(`/hanh-trinh?mission=${missionId}`)}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-[#162A40] hover:bg-[#21374D] border border-[#e8a86b]/40 text-[#e8a86b] font-mono text-xs font-bold rounded-xs cursor-pointer transition-colors"
                >
                  <Compass className="w-4 h-4" />
                  <span>{isEn ? 'Explore Mission Audio Story' : 'Khám phá Kể chuyện Âm thanh'}</span>
                </button>
              )}
            </div>
          </div>

          {/* 3. TƯ LIỆU MỞ RỘNG / ARCHIVAL & SIMULATION PORTAL */}
          <div className="bg-[#101b2d] border border-[#1e2d42] p-5 rounded-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#e8a86b] font-bold">
                  <Film className="w-4 h-4 text-[#e8a86b]" />
                  <span>{isEn ? 'Archival & STEM Simulation' : 'Tư Liệu & Mô Phỏng STEM'}</span>
                </div>
                <span className="font-mono text-[11px] text-[#AAB8C7]">
                  {isEn ? 'Interactive Lab' : 'Phòng thí nghiệm'}
                </span>
              </div>

              <div className="p-4 bg-[#060912] border border-[#1e2d42] rounded-xs space-y-3">
                <h5 className="font-sans font-bold text-sm text-[#F8FAFC]">
                  {missionId === 'opportunity'
                    ? (isEn ? 'Interactive 3D Rover & Science Odyssey' : 'Mô hình 3D & Bản đồ Hành trình 45,16 km')
                    : missionId === 'surveyor-3'
                    ? (isEn ? 'Apollo 12 Lunar Surface Rendezvous' : 'Tư liệu Hội ngộ Mặt Trăng Apollo 12')
                    : (isEn ? 'Pioneer Plaque Interstellar Message' : 'Thông điệp Liên sao Pioneer Plaque')}
                </h5>
                <p className="text-[#AAB8C7] text-xs leading-relaxed">
                  {missionId === 'opportunity'
                    ? (isEn
                        ? 'Explore the rover in interactive 3D, inspect the microscopic blueberries, and trace the 15-year odyssey from Eagle Crater to Perseverance Valley.'
                        : 'Khám phá mô hình 3D xe tự hành, soi cấu trúc việt quất hematite dưới camera hiển vi và lần theo quỹ đạo 15 năm vượt qua các miệng hố.')
                    : missionId === 'surveyor-3'
                    ? (isEn
                        ? 'Explore how Apollo 12 retrieved the TV camera from Surveyor 3 to evaluate 31 months of space environment material degradation.'
                        : 'Xem chi tiết cách các phi hành gia Apollo 12 cắt tháo camera của Surveyor 3 mang về Trái Đất nghiên cứu độ bền vật liệu trong vũ trụ.')
                    : (isEn
                        ? 'Inspect the 14-pulsar cosmological map and hydrogen transition diagram etched on the gold-anodized Pioneer Plaque.'
                        : 'Quan sát bản đồ 14 ẩn tinh và sơ đồ dịch chuyển hydro khắc trên tấm bảng vàng gửi vào vũ trụ.')}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1e2d42]">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate(`/mo-phong?mission=${missionId}`)}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-[#162A40] hover:bg-[#21374D] border border-[#D2A071]/40 text-[#D2A071] font-mono text-xs font-bold rounded-xs cursor-pointer transition-colors"
              >
                <span>{isEn ? 'Open STEM Simulation Lab →' : 'Mở Phòng Thí Nghiệm Mô Phỏng →'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Provenance Note */}
        <div className="p-4 bg-[#070b14] border border-[#1e2d42] rounded-xs text-xs text-[#AAB8C7] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#e8a86b] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#F0EDE5]">
              {isEn ? 'Provenance & Archival Note:' : 'Ghi chú xuất xứ & lưu trữ:'}
            </strong>{' '}
            {isEn ? (
              <>
                Core storytelling works including <code className="text-[#e8a86b]">little_wheels.mp4</code>, <code className="text-[#e8a86b]">little_wheels_poster.png</code> (Opportunity), and <code className="text-[#e8a86b]">Surveyor_3_Comic_EN.pdf</code> / <code className="text-[#e8a86b]">Surveyor_3_Comic_VI.pdf</code> with 15 illustrations (Surveyor 3) are student creative productions strictly grounded in verified NASA/JPL/JSC science data, designed to complement rather than replace authentic NASA documentary photography.
              </>
            ) : (
              <>
                Các sản phẩm kể chuyện cốt lõi gồm <code className="text-[#e8a86b]">little_wheels.mp4</code>, <code className="text-[#e8a86b]">little_wheels_poster.png</code> (Opportunity) và <code className="text-[#e8a86b]">Surveyor_3_Comic_EN.pdf</code> / <code className="text-[#e8a86b]">Surveyor_3_Comic_VI.pdf</code> cùng 15 trang minh họa (Surveyor 3) đều là tác phẩm sáng tạo của đội thi dựa trên tư liệu khoa học NASA/JPL/JSC, không thay thế ảnh chụp lịch sử gốc của NASA.
              </>
            )}
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
                {story.machine_name} · {isEn ? `Page ${comicPage + 1} / ${totalComicPages}` : `Trang ${comicPage + 1} / ${totalComicPages}`} ({isEnglishEdition ? 'English Edition' : 'Bản Tiếng Việt'})
              </span>
              <h3 className="font-display text-base sm:text-lg font-bold">
                {isEn ? (currentComic.titleEn || currentComic.title) : currentComic.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#0B1422] p-0.5 border border-[#C5A46A]/50 rounded-xs">
                <button
                  type="button"
                  onClick={() => setComicEdition('vi')}
                  className={`px-2.5 py-1 font-mono text-[11px] rounded-xs cursor-pointer transition-colors ${
                    comicEdition === 'vi' ? 'bg-[#C5A46A] text-[#07111F] font-bold' : 'text-[#AAB8C7] hover:text-white'
                  }`}
                >
                  🇻🇳 Tiếng Việt
                </button>
                <button
                  type="button"
                  onClick={() => setComicEdition('en')}
                  className={`px-2.5 py-1 font-mono text-[11px] rounded-xs cursor-pointer transition-colors ${
                    comicEdition === 'en' ? 'bg-[#C5A46A] text-[#07111F] font-bold' : 'text-[#AAB8C7] hover:text-white'
                  }`}
                >
                  🇬🇧 English
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsComicLightboxOpen(false)}
                className="p-2 bg-[#162A40] hover:bg-[#C96F46] text-white rounded-xs cursor-pointer"
                title={isEn ? 'Close' : 'Đóng'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            className="max-w-6xl w-full mx-auto flex-1 flex items-center justify-center my-3 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={resolvePublicUrl(activeComicImage, missionId)}
              alt={isEn ? (currentComic.titleEn || currentComic.title) : currentComic.title}
              className="max-h-[76vh] w-auto object-contain rounded-xs border border-[#C5A46A]/40 shadow-2xl bg-[#040812]"
            />
          </div>

          <div
            className="max-w-4xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0b1324] border border-[#1e2d42] p-3 rounded-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs text-[#CBD5E1] text-center sm:text-left">
              {isEn ? currentComic.captionEn : currentComic.captionVi}
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                disabled={comicPage === 0}
                onClick={() => setComicPage((p) => Math.max(0, p - 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#162A40] hover:bg-[#21374D] disabled:opacity-35 text-white font-mono text-xs rounded-xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{isEn ? 'Prev' : 'Trước'}</span>
              </button>
              <button
                type="button"
                disabled={comicPage >= totalComicPages - 1}
                onClick={() => setComicPage((p) => Math.min(totalComicPages - 1, p + 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#C96F46] hover:bg-[#B45E37] disabled:opacity-35 text-white font-mono text-xs font-bold rounded-xs cursor-pointer"
              >
                <span>{isEn ? 'Next' : 'Sau'}</span>
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
                {isEn ? 'Exhibition Poster: LITTLE WHEELS — A Song for Opportunity' : 'Poster: LITTLE WHEELS — A Song for Opportunity'}
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
