import React, { useState, useEffect } from 'react';
import { ExternalLink, Box, Image, Search, RefreshCw, Compass } from 'lucide-react';

export interface NasaWebAssetItem {
  id: string;
  name_vi: string;
  web: string;
  source_info_url?: string;
  info: string;
  local_image?: string;
  secondary_image?: string;
  image_api: string;
  image_page: string;
  credit?: string;
  caption_vi?: string;
  model_page: string | null;
  model_glb: string | null;
}

interface SleepingExplorersPageProps {
  onNavigate?: (route: string) => void;
}

// In-memory cache for NASA API responses to avoid rate limits and repeated requests
const IMAGE_API_CACHE: Record<string, string> = {};

export const SLEEPING_EXPLORERS_ITEMS: NasaWebAssetItem[] = [
  {
    "id": "opportunity",
    "name_vi": "Rover Opportunity (MER-B)",
    "web": "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/",
    "source_info_url": "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/",
    "info": "Xe tự hành năng lượng mặt trời hoạt động gần 15 năm trên Sao Hỏa, di chuyển kỷ lục 45,16 km, phát hiện khoáng vật hematite ('blueberries'), mạch thạch cao và khoáng sét chứng minh môi trường nước cổ đại trung tính.",
    "local_image": "/assets/nasa/opportunity_self_portrait_2007_PIA15114.jpg",
    "image_page": "https://science.nasa.gov/photojournal/opportunity-rover-self-portrait-from-2007/",
    "image_api": "https://images-api.nasa.gov/search?q=Opportunity%20rover%20Mars",
    "credit": "NASA/JPL-Caltech/Cornell",
    "caption_vi": "Ảnh chân dung tự chụp ghép (mosaic) của Opportunity năm 2007 (Sol 1282–1284, mã PIA15114) bằng camera toàn cảnh Pancam để đánh giá độ phủ bụi của pin mặt trời sau trận bão bụi toàn hành tinh (đây là ảnh ghép mosaic từ camera trên cần, không phải do robot khác chụp).",
    "model_page": "https://science.nasa.gov/3d-resources/mars-exploration-rover-opportunity-mer-b/",
    "model_glb": null
  },
  {
    "id": "spirit",
    "name_vi": "Rover Spirit (MER-A)",
    "web": "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/science-highlights/",
    "source_info_url": "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/science-highlights/",
    "info": "Xe tự hành khám phá hố va chạm Gusev từ 2004 đến 2010. Bánh xe trước bên phải bị kẹt đã vô tình cày xới lớp đất ngầm, làm lộ vùng silica tinh khiết 90% tại Home Plate và phát hiện đá Comanche giàu carbonate.",
    "local_image": "/assets/nasa/spirit_silica_soil_home_plate_PIA09403.jpg",
    "secondary_image": "/assets/nasa/spirit_comanche_outcrop_carbonate.jpg",
    "image_page": "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/science-highlights/",
    "image_api": "https://images-api.nasa.gov/search?q=Spirit%20rover%20Mars%20NASA",
    "credit": "NASA/JPL/Cornell",
    "caption_vi": "Vệt đất sáng màu giàu silica (đạt 90% tinh khiết) tại Home Plate do bánh xe trước bị kẹt của rover Spirit cày xới (tháng 3/2007, mã PIA09403). Bằng chứng cho thấy hoạt động suối nước nóng hoặc hơi thủy nhiệt cổ đại từng tồn tại trên Sao Hỏa.",
    "model_page": null,
    "model_glb": null
  },
  {
    "id": "insight",
    "name_vi": "Tàu đổ bộ InSight",
    "web": "https://www.nasa.gov/missions/insight/nasa-retires-insight-mars-lander-mission-after-years-of-science/",
    "source_info_url": "https://www.nasa.gov/missions/insight/nasa-retires-insight-mars-lander-mission-after-years-of-science/",
    "info": "Trạm đổ bộ địa vật lý cố định tại Elysium Planitia, vận hành từ 2018 đến 2022. Thiết bị SEIS đo đạc 1.319 trận động đất Sao Hỏa, xác định lõi lỏng và vỏ hành tinh, trong khi đầu dò nhiệt HP3 cung cấp bài học kỹ thuật quý giá.",
    "local_image": "/assets/nasa/insight_final_selfie_PIA25287.jpg",
    "image_page": "https://science.nasa.gov/photojournal/insights-final-selfie/",
    "image_api": "https://images-api.nasa.gov/search?q=InSight%20lander%20Mars",
    "credit": "NASA/JPL-Caltech",
    "caption_vi": "Ảnh tự chụp chân dung cuối cùng của InSight ngày 24/04/2022 (Sol 1211, mã PIA25287). Lớp bụi đỏ dày đặc phủ kín thân tàu và các tấm pin mặt trời hình tròn trước khi cánh tay robot được hạ xuống lần cuối.",
    "model_page": null,
    "model_glb": null
  },
  {
    "id": "pioneer11",
    "name_vi": "Tàu thăm dò Pioneer 11",
    "web": "https://science.nasa.gov/mission/pioneer-11/",
    "source_info_url": "https://science.nasa.gov/mission/pioneer-11/",
    "info": "Tàu thăm dò không gian sâu đầu tiên bay qua và thám hiểm cận cảnh Sao Thổ (01/09/1979), phát hiện vành đai F và 2 vệ tinh mới, hoạt động bằng máy phát điện đồng vị phóng xạ RTG và mang thông điệp Pioneer Plaque.",
    "local_image": "/assets/nasa/pioneer11_saturn_rings_titan_1979.jpg",
    "image_page": "https://science.nasa.gov/image-detail/amf-cf2ae57d-b5f0-42ea-b5e3-c955208bc278/",
    "image_api": "https://images-api.nasa.gov/search?q=Pioneer%2011%20spacecraft",
    "credit": "NASA/Ames",
    "caption_vi": "Sao Thổ, hệ thống vành đai và mặt trăng Titan do tàu thăm dò Pioneer 11 chụp ngày 01/09/1979 ở cự ly khoảng 2.846.000 km (đây là ảnh thành tựu quan sát thiên văn, không phải ảnh chụp thân tàu).",
    "model_page": null,
    "model_glb": null
  },
  {
    "id": "laser-reflector",
    "name_vi": "Gương phản xạ laser Apollo (LRRR)",
    "web": "https://www.nasa.gov/missions/apollo/apollo-11/the-apollo-experiment-that-keeps-on-giving/",
    "source_info_url": "https://www.nasa.gov/missions/apollo/apollo-11/the-apollo-experiment-that-keeps-on-giving/",
    "info": "Mảng gương phản xạ góc lăng kính đặt trên Mặt Trăng bởi các phi hành gia Apollo 11, 14 và 15. Thiết bị quang học thụ động 100% không cần điện, vẫn liên tục phản xạ xung laser từ các đài thiên văn Trái Đất suốt hơn nửa thế kỷ.",
    "local_image": "/assets/nasa/apollo14_lrrr_retroreflector_AS14-67-09386.jpg",
    "image_page": "https://www.nasa.gov/missions/apollo/apollo-11/the-apollo-experiment-that-keeps-on-giving/",
    "image_api": "https://images-api.nasa.gov/search?q=Lunar%20Laser%20Ranging%20Retroreflector%20Apollo",
    "credit": "NASA",
    "caption_vi": "Ảnh chụp cận cảnh mảng gương phản xạ tia laser Lunar Ranging Retroreflector (LRRR) của Apollo 14 ngày 05/02/1971 trên Mặt Trăng (mã AS14-67-9386). Thiết bị quang học thụ động không cần nguồn điện, đo khoảng cách Trái Đất - Mặt Trăng chính xác tới từng milimet (không phải tấm pin mặt trời).",
    "model_page": null,
    "model_glb": null
  },
  {
    "id": "surveyor-3",
    "name_vi": "Tàu đổ bộ Surveyor 3",
    "web": "https://science.nasa.gov/mission/surveyor-3/",
    "source_info_url": "https://science.nasa.gov/mission/surveyor-3/",
    "info": "Tàu đổ bộ thử nghiệm hạ cánh mềm và đào cơ học đất Mặt Trăng năm 1967. Hai năm rưỡi sau, phi hành gia Apollo 12 đã trực tiếp ghé thăm và mang các bộ phận camera về Trái Đất phân tích.",
    "local_image": "/assets/nasa/apollo12_surveyor3_AS12-48-7134.jpg",
    "image_page": "https://science.nasa.gov/resource/apollo-12-and-surveyor-3/",
    "image_api": "https://images-api.nasa.gov/search?q=Surveyor%203%20Apollo%2012",
    "credit": "NASA",
    "caption_vi": "Phi hành gia Pete Conrad của Apollo 12 đứng cạnh tàu đổ bộ Surveyor 3 ngày 19/11/1969 trên Mặt Trăng trước khi thu hồi camera đưa về Trái Đất (mã AS12-48-7134).",
    "model_page": null,
    "model_glb": null
  },
  {
    "id": "viking",
    "name_vi": "Tàu đổ bộ Viking 1 & 2",
    "web": "https://science.nasa.gov/mission/viking/",
    "source_info_url": "https://science.nasa.gov/mission/viking/",
    "info": "Hai tàu đổ bộ đầu tiên của Mỹ hoạt động thành công trên bề mặt Sao Hỏa, chụp những bức ảnh cận cảnh đầu tiên và tiến hành các thí nghiệm sinh học lịch sử.",
    "local_image": "/assets/nasa/viking1_first_mars_surface_photo_PIA00381.jpg",
    "image_page": "https://science.nasa.gov/photojournal/first-photograph-taken-on-mars-surface/",
    "image_api": "https://images-api.nasa.gov/search?q=Viking%20lander%20Mars",
    "credit": "NASA/JPL",
    "caption_vi": "Một trong những bức ảnh đầu tiên được truyền về từ bề mặt Sao Hỏa do tàu đổ bộ Viking 1 chụp ngày 20/07/1976 (mã PIA00381).",
    "model_page": null,
    "model_glb": null
  },
  {
    "id": "sojourner",
    "name_vi": "Rover Sojourner",
    "web": "https://science.nasa.gov/mission/mars-pathfinder/",
    "source_info_url": "https://science.nasa.gov/mission/mars-pathfinder/",
    "info": "Robot tự hành sáu bánh đầu tiên của nhân loại trên Sao Hỏa, đi cùng tàu đổ bộ Mars Pathfinder năm 1997 và phân tích thành phần khoáng vật tảng đá Yogi.",
    "local_image": "/assets/nasa/sojourner_yogi_PIA00766.jpg",
    "image_page": "https://science.nasa.gov/resource/sojourner-yogi/",
    "image_api": "https://images-api.nasa.gov/search?q=Sojourner%20rover%20Mars%20Pathfinder",
    "credit": "NASA/JPL",
    "caption_vi": "Rover Sojourner đặt máy quang phổ alpha proton tia X (APXS) áp sát tảng đá Yogi tại bãi đáp Ares Vallis trên Sao Hỏa (mã PIA00766).",
    "model_page": null,
    "model_glb": null
  },
  {
    "id": "apollo-lm",
    "name_vi": "Tầng hạ cánh Apollo Lunar Module",
    "web": "https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/",
    "source_info_url": "https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/",
    "info": "Phần bệ hạ cánh của tàu Apollo Lunar Module, được để lại trên Mặt Trăng sau mỗi nhiệm vụ thám hiểm có người lái của chương trình Apollo.",
    "local_image": "/assets/nasa/apollo_lm_surface.jpg",
    "image_page": "https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/",
    "image_api": "https://images-api.nasa.gov/search?q=Apollo%20Lunar%20Module%20Moon%20surface",
    "credit": "NASA",
    "caption_vi": "Phi hành gia Buzz Aldrin đứng cạnh chân đáp của mô-đun đổ bộ Eagle trong nhiệm vụ Apollo 11 trên bề mặt Mặt Trăng.",
    "model_page": null,
    "model_glb": null
  },
  {
    "id": "lrv",
    "name_vi": "Xe tự hành Mặt Trăng Lunar Roving Vehicle",
    "web": "https://www.nasa.gov/history/apollo-16-on-the-moon-at-descartes/",
    "source_info_url": "https://www.nasa.gov/history/apollo-16-on-the-moon-at-descartes/",
    "info": "Xe tự hành bốn bánh chạy điện do các phi hành gia Apollo 15, 16 và 17 lái để mở rộng bán kính thám hiểm Mặt Trăng tới hàng chục kilomet.",
    "local_image": "/assets/nasa/apollo_lrv_rover.jpg",
    "image_page": "https://www.nasa.gov/history/apollo-16-on-the-moon-at-descartes/",
    "image_api": "https://images-api.nasa.gov/search?q=Lunar%20Roving%20Vehicle%20Apollo",
    "credit": "NASA",
    "caption_vi": "Xe tự hành Mặt Trăng Lunar Roving Vehicle cùng phi hành đoàn trong đợt huấn luyện và triển khai cho nhiệm vụ Apollo.",
    "model_page": null,
    "model_glb": null
  },
  {
    "id": "alsep",
    "name_vi": "Bộ thí nghiệm bề mặt Mặt Trăng ALSEP",
    "web": "https://www.nasa.gov/wp-content/uploads/static/history/alsj/HamishALSEP.html",
    "source_info_url": "https://www.nasa.gov/wp-content/uploads/static/history/alsj/HamishALSEP.html",
    "info": "Tổ hợp trạm cảm biến khoa học bề mặt chạy bằng pin hạt nhân RTG do các phi hành gia Apollo triển khai để đo địa chấn, nhiệt lưu và từ trường Mặt Trăng.",
    "local_image": "/assets/nasa/apollo_alsep_surface.jpg",
    "image_page": "https://www.nasa.gov/wp-content/uploads/static/history/alsj/HamishALSEP.html",
    "image_api": "https://images-api.nasa.gov/search?q=ALSEP%20Apollo%20lunar%20surface%20experiments",
    "credit": "NASA",
    "caption_vi": "Trạm cảm biến khoa học bề mặt ALSEP được triển khai trên bề mặt Mặt Trăng trong nhiệm vụ Apollo 12.",
    "model_page": null,
    "model_glb": null
  },
  {
    "id": "phoenix",
    "name_vi": "Tàu đổ bộ Phoenix",
    "web": "https://science.nasa.gov/mission/phoenix/",
    "source_info_url": "https://science.nasa.gov/mission/phoenix/",
    "info": "Tàu đổ bộ vùng cực bắc Sao Hỏa năm 2008, sử dụng cánh tay robot đào sâu xuống lớp đất băng và xác nhận sự tồn tại của băng nước bên dưới bề mặt.",
    "local_image": "/assets/nasa/phoenix_mars_lander.jpg",
    "image_page": "https://science.nasa.gov/mission/phoenix/",
    "image_api": "https://images-api.nasa.gov/search?q=Phoenix%20lander%20Mars",
    "credit": "NASA/KSC",
    "caption_vi": "Tàu đổ bộ Phoenix tại cơ sở xử lý phi thuyền Trung tâm Vũ trụ Kennedy trước khi phóng tới vùng cực Sao Hỏa.",
    "model_page": null,
    "model_glb": null
  },
  {
    "id": "pioneer10",
    "name_vi": "Tàu thăm dò Pioneer 10",
    "web": "https://science.nasa.gov/3d-resources/pioneer/",
    "source_info_url": "https://science.nasa.gov/3d-resources/pioneer/",
    "info": "Tàu thăm dò vũ trụ đầu tiên vượt qua vành đai tiểu hành tinh, bay qua Sao Mộc và mang tấm bảng thông điệp mạ vàng Pioneer Plaque rời khỏi Hệ Mặt Trời.",
    "local_image": "/assets/nasa/pioneer10_spacecraft.jpg",
    "image_page": "https://science.nasa.gov/3d-resources/pioneer/",
    "image_api": "https://images-api.nasa.gov/search?q=Pioneer%2010%20spacecraft",
    "credit": "NASA/Ames",
    "caption_vi": "Tàu thăm dò Pioneer 10 trong quá trình lắp ráp kiểm tra tại NASA Ames trước khi phóng vào năm 1972.",
    "model_page": "https://science.nasa.gov/3d-resources/pioneer/",
    "model_glb": "https://science.nasa.gov/3d-resources/pioneer/"
  },
  {
    "id": "cassini",
    "name_vi": "Tàu thăm dò Cassini",
    "web": "https://science.nasa.gov/3d-resources/cassini-assembly/",
    "source_info_url": "https://science.nasa.gov/3d-resources/cassini-assembly/",
    "info": "Tàu thăm dò Sao Thổ hoạt động từ 2004 đến 2017, nghiên cứu hệ thống vành đai, đại dương ngầm Enceladus và bầu khí quyển Titan trước khi kết thúc Grand Finale.",
    "local_image": "/assets/nasa/cassini_saturn_spacecraft.jpg",
    "image_page": "https://science.nasa.gov/3d-resources/cassini-assembly/",
    "image_api": "https://images-api.nasa.gov/search?q=Cassini%20spacecraft%20Saturn",
    "credit": "NASA/JPL",
    "caption_vi": "Ảnh quan sát vành đai Sao Thổ gửi về từ camera của tàu thăm dò Cassini trong giai đoạn khảo sát quỹ đạo.",
    "model_page": "https://science.nasa.gov/3d-resources/cassini-assembly/",
    "model_glb": "https://science.nasa.gov/3d-resources/cassini-assembly/"
  },
  {
    "id": "galileo",
    "name_vi": "Tàu thăm dò Galileo",
    "web": "https://science.nasa.gov/mission/galileo/",
    "source_info_url": "https://science.nasa.gov/mission/galileo/",
    "info": "Tàu đầu tiên bay quanh Sao Mộc, thả đầu dò vào khí quyển hành tinh và phát hiện dấu hiệu đại dương dưới lớp vỏ băng của mặt trăng Europa.",
    "local_image": "/assets/nasa/galileo_jupiter_spacecraft.jpg",
    "image_page": "https://science.nasa.gov/mission/galileo/",
    "image_api": "https://images-api.nasa.gov/search?q=Galileo%20spacecraft%20Jupiter",
    "credit": "NASA",
    "caption_vi": "Sơ đồ hành trình bay và các lần hỗ trợ trọng lực của tàu thăm dò Galileo trên đường tới Sao Mộc.",
    "model_page": null,
    "model_glb": null
  },
  {
    "id": "magellan",
    "name_vi": "Tàu thăm dò Magellan",
    "web": "https://science.nasa.gov/mission/magellan/",
    "source_info_url": "https://science.nasa.gov/mission/magellan/",
    "info": "Tàu thăm dò dùng radar khẩu độ tổng hợp xuyên qua tầng mây dày đặc để lập bản đồ độ phân giải cao của 98% bề mặt Sao Kim.",
    "local_image": "/assets/nasa/magellan_venus_spacecraft.jpg",
    "image_page": "https://science.nasa.gov/mission/magellan/",
    "image_api": "https://images-api.nasa.gov/search?q=Magellan%20spacecraft%20Venus",
    "credit": "NASA/JPL",
    "caption_vi": "Bản đồ toàn cầu bề mặt Sao Kim dựng từ dữ liệu radar của tàu Magellan kết hợp dữ liệu Pioneer và Venera.",
    "model_page": null,
    "model_glb": null
  },
  {
    "id": "messenger",
    "name_vi": "Tàu thăm dò MESSENGER",
    "web": "https://science.nasa.gov/mission/messenger/",
    "source_info_url": "https://science.nasa.gov/mission/messenger/",
    "info": "Tàu đầu tiên đi vào quỹ đạo Sao Thủy, nghiên cứu thành phần hóa học, từ trường và xác nhận băng nước vĩnh cửu trong các miệng hố vùng cực tối tăm.",
    "local_image": "/assets/nasa/messenger_mercury_spacecraft.jpg",
    "image_page": "https://science.nasa.gov/mission/messenger/",
    "image_api": "https://images-api.nasa.gov/search?q=MESSENGER%20spacecraft%20Mercury",
    "credit": "NASA/JPL",
    "caption_vi": "Hình minh họa đồ họa tàu thăm dò MESSENGER trên quỹ đạo quanh Sao Thủy.",
    "model_page": null,
    "model_glb": null
  },
  {
    "id": "mro",
    "name_vi": "Mars Reconnaissance Orbiter (MRO)",
    "web": "https://science.nasa.gov/3d-resources/mars-reconnaissance-orbiter-mro-b/",
    "source_info_url": "https://science.nasa.gov/3d-resources/mars-reconnaissance-orbiter-mro-b/",
    "info": "Vệ tinh viễn thám đa quang phổ bay quanh Sao Hỏa từ 2006, trang bị camera siêu nét HiRISE và làm trạm tiếp sóng liên lạc cho các xe tự hành bề mặt.",
    "local_image": "/assets/nasa/mro_mars_orbiter.jpg",
    "image_page": "https://science.nasa.gov/3d-resources/mars-reconnaissance-orbiter-mro-b/",
    "image_api": "https://images-api.nasa.gov/search?q=Mars%20Reconnaissance%20Orbiter",
    "credit": "NASA/JPL",
    "caption_vi": "Mô hình đồ họa kỹ thuật số của vệ tinh Mars Reconnaissance Orbiter trên quỹ đạo Sao Hỏa.",
    "model_page": "https://science.nasa.gov/3d-resources/mars-reconnaissance-orbiter-mro-b/",
    "model_glb": "https://science.nasa.gov/3d-resources/mars-reconnaissance-orbiter-mro-b/"
  },
  {
    "id": "iss",
    "name_vi": "Trạm Không gian Quốc tế ISS",
    "web": "https://www.nasa.gov/mission/station/",
    "source_info_url": "https://www.nasa.gov/mission/station/",
    "info": "Phòng thí nghiệm quỹ đạo có người ở liên tục từ năm 2000, là biểu tượng hợp tác không gian quốc tế và nghiên cứu khoa học vi trọng lực.",
    "local_image": "/assets/nasa/iss_station_orbit.jpg",
    "image_page": "https://science.nasa.gov/3d-resources/international-space-station-iss-a/",
    "image_api": "https://images-api.nasa.gov/search?q=International%20Space%20Station",
    "credit": "NASA",
    "caption_vi": "Trạm Không gian Quốc tế ISS với các mô-đun khoa học và mảng pin năng lượng mặt trời khổng lồ.",
    "model_page": "https://science.nasa.gov/3d-resources/international-space-station-iss-a/",
    "model_glb": "https://science.nasa.gov/3d-resources/international-space-station-iss-a/"
  },
  {
    "id": "shuttle",
    "name_vi": "Tàu con thoi Space Shuttle",
    "web": "https://www.nasa.gov/humans-in-space/space-shuttle/",
    "source_info_url": "https://www.nasa.gov/humans-in-space/space-shuttle/",
    "info": "Hệ thống tàu vũ trụ tái sử dụng có người lái của NASA hoạt động suốt 30 năm (1981–2011), phóng kính thiên văn Hubble và xây dựng trạm ISS.",
    "local_image": "/assets/nasa/space_shuttle_launch.jpg",
    "image_page": "https://science.nasa.gov/3d-resources/space-shuttle-b/",
    "image_api": "https://images-api.nasa.gov/search?q=Space%20Shuttle%20NASA%20launch",
    "credit": "NASA/JSC",
    "caption_vi": "Tàu con thoi Space Shuttle trên bệ phóng Pad 39A tại Trung tâm Vũ trụ Kennedy.",
    "model_page": "https://science.nasa.gov/3d-resources/space-shuttle-b/",
    "model_glb": "https://science.nasa.gov/3d-resources/space-shuttle-b/"
  }
];

export const SleepingExplorersPage: React.FC<SleepingExplorersPageProps> = () => {
  // In-memory cache for NASA API responses to avoid rate limits and repeated requests
  const [items, setItems] = useState<NasaWebAssetItem[]>(SLEEPING_EXPLORERS_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [imageMap, setImageMap] = useState<Record<string, string>>({});
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});
  const [activeModelId, setActiveModelId] = useState<string | null>(null);

  // Fetch supplemental images from NASA Images API for items if online
  useEffect(() => {
    if (items.length === 0) return;

    items.forEach((item) => {
      if (IMAGE_API_CACHE[item.id]) {
        setImageMap((prev) => ({ ...prev, [item.id]: IMAGE_API_CACHE[item.id] }));
        return;
      }

      setLoadingImages((prev) => ({ ...prev, [item.id]: true }));

      fetch(item.image_api)
        .then((res) => {
          if (!res.ok) throw new Error('Network error');
          return res.json();
        })
        .then((data) => {
          const collectionItems = data?.collection?.items || [];
          if (collectionItems.length > 0) {
            for (const colItem of collectionItems) {
              const links = colItem.links || [];
              const imgLink = links.find((l: any) => l.render === 'image' || l.href?.match(/\.(jpe?g|png)/i));
              if (imgLink && imgLink.href) {
                IMAGE_API_CACHE[item.id] = imgLink.href;
                setImageMap((prev) => ({ ...prev, [item.id]: imgLink.href }));
                break;
              }
            }
          }
        })
        .catch(() => {
          // Offline mode or API rate limit: local_image will render gracefully
        })
        .finally(() => {
          setLoadingImages((prev) => ({ ...prev, [item.id]: false }));
        });
    });
  }, [items]);

  const filteredItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name_vi.toLowerCase().includes(q) ||
      item.info.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-[#070E1E] text-[#E2E8F0] min-h-screen">
      {/* Header Banner - Observatory Deep Space Hero with Galaxy Glow & HUD Traces */}
      <section className="relative overflow-hidden border-b border-[#22D3EE]/25 py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070E1E] via-[#0B142C] to-[#070E1E]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 900px 450px at 50% -10%, rgba(34,211,238,0.22) 0%, transparent 65%), radial-gradient(ellipse 800px 400px at 80% 80%, rgba(245,158,11,0.2) 0%, transparent 60%), radial-gradient(circle 500px at 15% 50%, rgba(99,102,241,0.18) 0%, transparent 60%)'
          }}
        />

        {/* HUD Circuit Traces */}
        <svg
          className="absolute top-0 right-0 w-[550px] h-[320px] pointer-events-none hidden lg:block opacity-35"
          viewBox="0 0 550 320"
          fill="none"
        >
          <path d="M 80 0 L 220 140 L 550 140" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="6 6" />
          <path d="M 180 0 L 280 100 L 480 100" stroke="#F59E0B" strokeWidth="1.2" />
          <circle cx="220" cy="140" r="4" fill="#22D3EE" />
          <circle cx="280" cy="100" r="3" fill="#F59E0B" />
        </svg>

        <div className="max-w-7xl mx-auto relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0B142C]/90 text-[#38BDF8] border border-[#22D3EE]/40 font-mono text-xs uppercase tracking-widest rounded-xs shadow-[0_0_12px_rgba(34,211,238,0.25)]">
            <Compass className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>SLEEPING EXPLORERS · NASA LEGACY HARDWARE</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8FAFC]">
            Những cỗ máy đang yên nghỉ khắp Hệ Mặt Trời
          </h1>

          <p className="text-base sm:text-lg text-[#CBD5E1] max-w-3xl leading-relaxed">
            Từ tầng hạ cánh của tàu Apollo trên Mặt Trăng, những chiếc xe tự hành trên Sao Hỏa, cho tới các con tàu thăm dò lang thang ngoài không gian sâu. Mỗi thiết bị là một nhân chứng lịch sử với ảnh tư liệu trực tiếp từ <strong>NASA Images API</strong> và mô hình 3D tương tác.
          </p>

          {/* Search bar */}
          <div className="pt-2 max-w-md relative">
            <Search className="w-4 h-4 text-[#38BDF8] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên thiết bị (Apollo, Viking, Spirit, Cassini, InSight...)"
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#0B142C]/90 border border-[#22D3EE]/35 text-[#F8FAFC] placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#F59E0B] focus:shadow-[0_0_15px_rgba(245,158,11,0.25)] rounded-xs transition-all"
            />
          </div>
        </div>
      </section>

      {/* Grid of Equipment Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex items-center justify-between font-mono text-xs text-[#94A3B8] border-b border-[#22D3EE]/25 pb-3">
          <span>DANH SÁCH THIẾT BỊ ({filteredItems.length} MỤC)</span>
          <span className="text-[#38BDF8] font-bold">DỮ LIỆU CHÍNH THỨC NASA</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isFileProtocol = typeof window !== 'undefined' && window.location.protocol === 'file:';
            let localImgPath = item.local_image || null;
            if (localImgPath && isFileProtocol) {
              localImgPath = '.' + (localImgPath.startsWith('/public') ? localImgPath : '/public' + (localImgPath.startsWith('/') ? localImgPath : '/' + localImgPath));
            }
            const imgSrc = localImgPath || imageMap[item.id];
            const isLoading = !localImgPath && loadingImages[item.id];
            const hasGlbDirect = Boolean(item.model_glb && item.model_glb.endsWith('.glb'));
            const isViewing3d = activeModelId === item.id;

            return (
              <article
                key={item.id}
                className="hud-card bg-[#0B142C]/85 backdrop-blur-md border border-[#22D3EE]/35 shadow-[0_0_24px_rgba(34,211,238,0.12)] hover:border-[#F59E0B]/70 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] rounded-md overflow-hidden flex flex-col justify-between transition-all duration-300 group"
              >
                <div>
                  {/* Media Frame (Local NASA Photo, API Image or 3D Model Viewer) */}
                  <div className="relative aspect-[16/10] bg-[#070E1E] overflow-hidden flex items-center justify-center border-b border-[#22D3EE]/25">
                    {isViewing3d && hasGlbDirect ? (
                      // @ts-ignore
                      <model-viewer
                        src={item.model_glb}
                        alt={item.name_vi}
                        auto-rotate
                        camera-controls
                        shadow-intensity="1"
                        style={{ width: '100%', height: '100%', backgroundColor: '#070E1E' }}
                      />
                    ) : imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={item.name_vi}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const fallback = imageMap[item.id] || item.secondary_image;
                          if (fallback && e.currentTarget.src !== fallback) {
                            e.currentTarget.src = fallback;
                          }
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center text-[#94A3B8] space-y-2">
                        {isLoading ? (
                          <>
                            <RefreshCw className="w-6 h-6 animate-spin text-[#F59E0B]" />
                            <span className="text-xs font-mono">Đang tải ảnh từ NASA API...</span>
                          </>
                        ) : (
                          <>
                            <Image className="w-8 h-8 text-[#38BDF8]" />
                            <span className="text-xs font-mono">Ảnh tư liệu NASA</span>
                          </>
                        )}
                      </div>
                    )}

                    {/* Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#070E1E]/90 border border-[#22D3EE]/40 text-[#38BDF8] font-mono text-[10px] uppercase tracking-wider rounded-xs shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                      {item.id}
                    </div>

                    {hasGlbDirect && (
                      <button
                        type="button"
                        onClick={() => setActiveModelId(isViewing3d ? null : item.id)}
                        className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-[#0B142C]/90 text-[#F8FAFC] border border-[#22D3EE]/50 hover:border-[#F59E0B] hover:text-[#FBBF24] font-mono text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer rounded-xs shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                      >
                        <Box className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>{isViewing3d ? 'Xem ảnh' : 'Xoay 3D'}</span>
                      </button>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-display text-lg font-bold text-[#F8FAFC] leading-snug group-hover:text-[#FBBF24] transition-colors">
                      {item.name_vi}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                      {item.info}
                    </p>
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="px-5 py-3.5 bg-[#07111F]/90 border-t border-[#22D3EE]/25 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  {/* Web detail link */}
                  <a
                    href={item.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#38BDF8] hover:text-[#22D3EE] hover:underline font-semibold"
                  >
                    <span>Trang NASA</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {/* Model 3D link */}
                  {item.model_page && !item.model_page.includes('?s=') && !item.model_page.endsWith('/3d-resources/') && (
                    <a
                      href={item.model_page}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#FBBF24] hover:text-[#F59E0B] hover:underline font-semibold"
                    >
                      <Box className="w-3 h-3" />
                      <span>Mô hình 3D</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {/* Image page link */}
                  <a
                    href={item.image_page}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#94A3B8] hover:text-[#E2E8F0]"
                  >
                    <Image className="w-3 h-3" />
                    <span>Bộ sưu tập ảnh</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
