/**
 * BEYOND THE SIGNAL — Câu chuyện kể ngôi thứ nhất cho học sinh 10–15 tuổi.
 * Giọng kể "nhập vai cỗ máy" là hình thức sáng tạo; mọi dữ kiện (ngày, số liệu,
 * khám phá) bám theo dữ liệu đã đối chiếu trong museumData.ts (SRC-OPP-*, SRC-PIO-*).
 */

export interface StoryChapter {
  id: string;
  code: string;
  title: string;
  narration: string;
  hardware_part: string;
  hardware_to_science: string;
  facts: { label: string; value: string }[];
  media_id: string;
  source_ids: string[];
}

export interface MachineStory {
  id: 'opportunity' | 'pioneer-11' | 'surveyor-3';
  machine_name: string;
  narrative_badge: string;
  isDemoRecord?: boolean;
  tagline: string;
  intro: string;
  where_now: string;
  accent: string;
  hero_media_id: string;
  poster_timeline: { date: string; label: string }[];
  chapters: StoryChapter[];
  closing_line: string;
}

export const MACHINE_STORIES: Record<'opportunity' | 'pioneer-11' | 'surveyor-3', MachineStory> = {
  opportunity: {
    id: 'opportunity',
    machine_name: 'Opportunity',
    narrative_badge: 'Lời kể sáng tác dựa trên dữ kiện',
    tagline: 'Người ta chỉ mong tôi sống 90 ngày. Tôi đã ở lại gần 15 năm.',
    intro:
      'Xin chào. Tôi là Opportunity, một robot sáu bánh chạy bằng năng lượng Mặt Trời. Tôi vẫn đang đứng ở Thung lũng Perseverance trên Sao Hỏa. Hãy nghe tôi kể về hành trình của mình (Lời kể sáng tác dựa trên dữ kiện khoa học NASA).',
    where_now: 'Perseverance Valley, rìa miệng hố Endeavour — Sao Hỏa',
    accent: '#C88754',
    hero_media_id: 'IMG-OPP-01',
    poster_timeline: [
      { date: '07/07/2003', label: 'Phóng từ Trái Đất' },
      { date: '24/01/2004 (PST)', label: 'Hạ cánh tại Meridiani Planum (25/01 theo UTC)' },
      { date: '90 sol', label: 'Thời gian nhiệm vụ theo thiết kế' },
      { date: '10/06/2018', label: 'Tín hiệu cuối cùng (sol 5.111) giữa bão bụi' },
      { date: '13/02/2019', label: 'NASA tuyên bố kết thúc sứ mệnh' },
      { date: '11/10/2026', label: 'Perseverance vượt kỷ lục 45,16 km của tôi' }
    ],
    chapters: [
      {
        id: 'opp-1',
        code: '01 · CÂU HỎI',
        title: 'Sao Hỏa đã từng có nước không?',
        narration:
          'Các nhà khoa học trên Trái Đất có một câu hỏi lớn: ngày xưa, Sao Hỏa có từng có nước lỏng không? Con người chưa thể tự mình bay tới đó, nên họ gửi tôi đi trước. Ngày 7 tháng 7 năm 2003, tôi rời Trái Đất trên một quả tên lửa và bay hơn sáu tháng xuyên qua không gian.',
        hardware_part: 'Nhiệm vụ địa chất',
        hardware_to_science:
          'Nước để lại dấu vết trong đá. Vì vậy tôi được chế tạo như một "nhà địa chất trên bánh xe": nhìn, chạm và phân tích đá.',
        facts: [
          { label: 'Ngày phóng', value: '07/07/2003' },
          { label: 'Mục tiêu', value: 'Tìm dấu vết của nước lỏng trong quá khứ' }
        ],
        media_id: 'IMG-OPP-02',
        source_ids: ['SRC-OPP-01']
      },
      {
        id: 'opp-2',
        code: '02 · CỖ MÁY',
        title: 'Cơ thể của một nhà địa chất robot',
        narration:
          'Tôi có sáu bánh xe, một cột camera cao ngang tầm mắt người, và một cánh tay robot. Trên lưng tôi là những tấm pin Mặt Trời: ánh nắng chính là thức ăn của tôi. Ở đầu cánh tay, tôi có một chiếc máy mài đá nhỏ. Nó mài bỏ lớp vỏ ngoài bị phong hóa, để tôi nhìn được phần bên trong của viên đá.',
        hardware_part: 'Máy mài đá (RAT) và tấm pin Mặt Trời',
        hardware_to_science:
          'Máy mài giúp các thiết bị đo được thành phần thật của đá, không bị lớp bụi bên ngoài đánh lừa. Còn tấm pin quyết định tôi sống được bao lâu: càng nhiều nắng, tôi càng làm việc được nhiều.',
        facts: [
          { label: 'Nguồn điện', value: 'Tấm pin Mặt Trời' },
          { label: 'Công cụ đặc biệt', value: 'Máy mài đá, kính hiển vi, máy quang phổ' }
        ],
        media_id: 'IMG-OPP-01',
        source_ids: ['SRC-OPP-01']
      },
      {
        id: 'opp-3',
        code: '03 · HÀNH TRÌNH',
        title: 'Từ 90 ngày thành gần 15 năm',
        narration:
          'Ngày 24 tháng 1 năm 2004, theo giờ California, tôi hạ cánh xuống vùng đồng bằng Meridiani Planum. Kỹ sư thiết kế để tôi làm việc 90 sol, tức 90 ngày Sao Hỏa. Nhưng tôi cứ tiếp tục lăn bánh, từ miệng hố này sang miệng hố khác. Tôi đến được miệng hố Endeavour rộng khoảng 22 kilômét. Tôi đã làm việc tổng cộng 5.111 sol.',
        hardware_part: 'Sáu bánh xe và hệ thống định hướng',
        hardware_to_science:
          'Mỗi lần di chuyển là một lần tôi đến được những lớp đá cổ hơn. Đi càng xa, tôi càng đọc được nhiều "trang sách lịch sử" của Sao Hỏa.',
        facts: [
          { label: 'Hạ cánh', value: '24/01/2004 (PST) · 25/01/2004 (UTC)' },
          { label: 'Thiết kế', value: '90 sol' },
          { label: 'Thực tế', value: '5.111 sol' }
        ],
        media_id: 'opportunity_final_panorama',
        source_ids: ['SRC-OPP-01', 'SRC-OPP-03']
      },
      {
        id: 'opp-4',
        code: '04 · KHÁM PHÁ',
        title: 'Những viên đá kể chuyện về nước',
        narration:
          'Tại Meridiani Planum và rìa miệng hố Endeavour, tôi tìm thấy các hạt tròn nhỏ giàu hematite, những mạch thạch cao (gypsum) và các lớp khoáng sét chỉ hình thành khi có nước lỏng. Điều đó cho thấy rất lâu về trước, nơi đây từng ẩm ướt, và có thể từng là môi trường thuận lợi hơn cho sự sống vi sinh vật. Nhưng hãy nhớ: tôi tìm thấy dấu vết của nước, chứ không tìm thấy sự sống.',
        hardware_part: 'Máy quang phổ APXS, Mössbauer, Mini-TES và kính hiển vi MI',
        hardware_to_science:
          'Các máy quang phổ và kính hiển vi đo thành phần nguyên tố, nhận diện hạt giàu hematite, mạch thạch cao và khoáng sét — bằng chứng địa chất trực tiếp về nước cổ đại.',
        facts: [
          { label: 'Bằng chứng địa chất', value: 'Hạt giàu hematite, mạch thạch cao, khoáng sét' },
          { label: 'Lưu ý khoa học', value: 'Bằng chứng về nước cổ đại, không phải sự sống' }
        ],
        media_id: 'IMG-OPP-02',
        source_ids: ['SRC-OPP-01', 'SRC-OPP-04']
      },
      {
        id: 'opp-5',
        code: '05 · TÍN HIỆU CUỐI',
        title: 'Khi bầu trời tối lại',
        narration:
          'Năm 2018, một cơn bão bụi khổng lồ bao phủ cả Sao Hỏa. Bầu trời tối dần, nắng không còn chiếu tới tấm pin của tôi. Ngày 10 tháng 6 năm 2018, tôi gửi về Trái Đất tín hiệu cuối cùng. Suốt nhiều tháng sau đó, các kỹ sư vẫn liên tục gọi tôi. Ngày 13 tháng 2 năm 2019, NASA chính thức nói lời tạm biệt.',
        hardware_part: 'Tấm pin Mặt Trời',
        hardware_to_science:
          'Chính bộ phận giúp tôi sống lâu cũng là điểm yếu của tôi: không có nắng thì không có điện. Đây là lý do một số robot sau này dùng nguồn năng lượng hạt nhân.',
        facts: [
          { label: 'Tín hiệu cuối', value: '10/06/2018 (sol 5.111)' },
          { label: 'Kết thúc sứ mệnh', value: '13/02/2019' },
          { label: 'Lưu ý', value: 'Đây là hai ngày khác nhau' }
        ],
        media_id: 'opportunity_last_message',
        source_ids: ['SRC-OPP-01', 'SRC-OPP-04']
      },
      {
        id: 'opp-6',
        code: '06 · DI SẢN',
        title: '45,16 kilômét dấu bánh xe',
        narration:
          'Tôi đã đi được 45,16 kilômét trên Sao Hỏa, lâu nay là quãng đường xa nhất mà một cỗ máy từng đi được ngoài Trái Đất. Ngày 11 tháng 10 năm 2026, người em Perseverance đã vượt qua kỷ lục đó, và tôi rất tự hào. Những điều kỹ sư học được từ tôi đang giúp các robot thế hệ sau đi xa hơn. Tín hiệu của tôi đã tắt, nhưng câu chuyện của tôi vẫn còn.',
        hardware_part: 'Toàn bộ cỗ máy',
        hardware_to_science:
          'Mỗi năm tôi sống thêm là thêm một năm dữ liệu khoa học, và thêm bài học về cách thiết kế robot bền bỉ hơn.',
        facts: [
          { label: 'Tổng quãng đường', value: '45,16 km' },
          { label: 'Kỷ lục được vượt', value: '11/10/2026 bởi Perseverance' }
        ],
        media_id: 'IMG-OPP-01',
        source_ids: ['SRC-OPP-01', 'SRC-OPP-05']
      }
    ],
    closing_line: 'The signal may fade. The story remains.'
  },
  'pioneer-11': {
    id: 'pioneer-11',
    machine_name: 'Pioneer 11',
    narrative_badge: 'Lời kể sáng tác dựa trên dữ kiện',
    tagline: 'Tôi là con tàu đầu tiên bay qua Sao Thổ, và tôi vẫn đang bay.',
    intro:
      'Xin chào. Tôi là Pioneer 11, một tàu thăm dò không gian sâu bay qua hành tinh (không phải tàu đổ bộ). Tôi không có bánh xe, cũng không hạ cánh ở đâu cả. Tôi bay qua những hành tinh khổng lồ, rồi tiếp tục bay ra phía ngoài Hệ Mặt Trời (Lời kể sáng tác dựa trên dữ kiện khoa học NASA).',
    where_now: 'Đang bay ra ngoài Hệ Mặt Trời, im lặng từ năm 1995',
    accent: '#567B9D',
    hero_media_id: 'IMG-PIO-01',
    poster_timeline: [
      { date: '06/04/1973 (UTC)', label: 'Phóng từ Trái Đất (05/04 theo giờ Mỹ)' },
      { date: '03/12/1974', label: 'Bay ngang Sao Mộc' },
      { date: '01/09/1979', label: 'Tàu đầu tiên bay qua Sao Thổ' },
      { date: '30/09/1995', label: 'NASA Ames liên lạc lần cuối' },
      { date: '24/11/1995', label: 'Nhận dữ liệu kỹ thuật cuối cùng' }
    ],
    chapters: [
      {
        id: 'pio-1',
        code: '01 · CÂU HỎI',
        title: 'Có thể đến được Sao Thổ không?',
        narration:
          'Năm 1973, chưa có con tàu nào từng đến gần Sao Thổ. Con người tự hỏi: một con tàu có thể vượt qua vành đai tiểu hành tinh, sống sót qua vùng bức xạ dữ dội của Sao Mộc, rồi đi tiếp tới Sao Thổ không? Ngày 6 tháng 4 năm 1973, theo giờ quốc tế, tôi được phóng lên để đi tìm câu trả lời.',
        hardware_part: 'Nhiệm vụ bay ngang hành tinh',
        hardware_to_science:
          'Tôi không cần hạ cánh. Tôi bay ngang qua thật nhanh và đo mọi thứ trên đường đi: từ trường, các hạt mang điện, bụi và ánh sáng.',
        facts: [
          { label: 'Ngày phóng', value: '06/04/1973 (UTC)' },
          { label: 'Loại tàu', value: 'Tàu bay ngang (không hạ cánh)' }
        ],
        media_id: 'IMG-PIO-02',
        source_ids: ['SRC-PIO-01']
      },
      {
        id: 'pio-2',
        code: '02 · CỖ MÁY',
        title: 'Trái tim hạt nhân giữa bóng tối',
        narration:
          'Ở xa Mặt Trời, ánh nắng yếu đến mức tấm pin Mặt Trời gần như vô dụng. Vì thế tôi mang theo bốn máy phát điện nhỏ chạy bằng nhiệt của chất phóng xạ, gọi là RTG. Tôi nặng 258,5 kilôgam và có một chiếc ăng-ten hình đĩa lớn luôn quay về phía Trái Đất để gửi dữ liệu về nhà.',
        hardware_part: 'Bốn máy phát RTG SNAP-19 và ăng-ten đĩa',
        hardware_to_science:
          'Nhờ RTG, tôi có điện ở những nơi tối lạnh mà robot chạy bằng nắng không thể đến. Ăng-ten đĩa là "sợi dây" duy nhất nối tôi với các nhà khoa học.',
        facts: [
          { label: 'Khối lượng', value: '258,5 kg' },
          { label: 'Nguồn điện', value: '4 máy phát SNAP-19 RTG' }
        ],
        media_id: 'IMG-PIO-02',
        source_ids: ['SRC-PIO-01', 'SRC-PIO-03', 'SRC-PIO-04']
      },
      {
        id: 'pio-3',
        code: '03 · HÀNH TRÌNH',
        title: 'Mượn lực của Sao Mộc',
        narration:
          'Ngày 3 tháng 12 năm 1974, tôi bay ngang Sao Mộc và chụp ảnh các vùng cực của nó. Lực hấp dẫn khổng lồ của Sao Mộc bẻ cong đường bay của tôi như một chiếc ná cao su, đẩy tôi về phía Sao Thổ. Gần năm năm sau, ngày 1 tháng 9 năm 1979, tôi trở thành con tàu đầu tiên trong lịch sử bay qua Sao Thổ.',
        hardware_part: 'Thiết bị chụp ảnh và đo độ phân cực (IPP)',
        hardware_to_science:
          'Thiết bị chụp ảnh giúp con người lần đầu nhìn thấy cận cảnh các vùng cực Sao Mộc và hệ vành đai Sao Thổ.',
        facts: [
          { label: 'Bay ngang Sao Mộc', value: '03/12/1974' },
          { label: 'Bay qua Sao Thổ', value: '01/09/1979, lần đầu trong lịch sử' }
        ],
        media_id: 'IMG-PIO-01',
        source_ids: ['SRC-PIO-01', 'SRC-PIO-02']
      },
      {
        id: 'pio-4',
        code: '04 · KHÁM PHÁ',
        title: 'Những điều mới ở Sao Thổ',
        narration:
          'Ở Sao Thổ, tôi ghi nhận thêm những mặt trăng mới và cấu trúc của vành F. Tôi còn chụp được Sao Thổ cùng mặt trăng lớn Titan từ khoảng cách khoảng 2,8 triệu kilômét. Bức ảnh đó do tôi chụp, nên trong ảnh không có tôi đâu nhé. Những gì tôi đo được đã giúp chuẩn bị cho các con tàu đến sau.',
        hardware_part: 'Từ kế, máy đếm hạt và radiometer hồng ngoại',
        hardware_to_science:
          'Các thiết bị đo từ trường và hạt mang điện cho biết Sao Thổ có một "lá chắn từ" bao quanh. Radiometer hồng ngoại đo nhiệt độ các tầng mây.',
        facts: [
          { label: 'Phát hiện', value: 'Mặt trăng mới, cấu trúc vành F' },
          { label: 'Ảnh nổi tiếng', value: 'Sao Thổ và Titan do Pioneer 11 chụp' }
        ],
        media_id: 'IMG-PIO-01',
        source_ids: ['SRC-PIO-01', 'SRC-PIO-02']
      },
      {
        id: 'pio-5',
        code: '05 · TÍN HIỆU CUỐI',
        title: 'Hai lần chào tạm biệt',
        narration:
          'Năm này qua năm khác, các máy phát RTG của tôi yếu dần. Tôi không còn đủ điện để giữ ăng-ten hướng về Trái Đất. Ngày 30 tháng 9 năm 1995, trung tâm NASA Ames liên lạc với tôi lần cuối. Rồi ngày 24 tháng 11 năm 1995, các nhà khoa học nhận được vài phút dữ liệu kỹ thuật cuối cùng của tôi. Sau đó, tôi im lặng.',
        hardware_part: 'Máy phát RTG suy giảm theo thời gian',
        hardware_to_science:
          'Chất phóng xạ trong RTG phân rã dần, nên điện năng giảm từng năm. Đó là "đồng hồ sinh học" của mọi tàu không gian sâu.',
        facts: [
          { label: 'Liên lạc cuối của NASA Ames', value: '30/09/1995' },
          { label: 'Dữ liệu kỹ thuật cuối', value: '24/11/1995' },
          { label: 'Lưu ý', value: 'Đây là hai mốc khác nhau' }
        ],
        media_id: 'IMG-PIO-02',
        source_ids: ['SRC-PIO-01', 'SRC-PIO-03']
      },
      {
        id: 'pio-6',
        code: '06 · DI SẢN',
        title: 'Tấm thiệp gửi tới những vì sao',
        narration:
          'Trên thân tôi có gắn một tấm bảng nhôm mạ vàng, gọi là Pioneer Plaque. Trên đó có hình vẽ một người đàn ông, một người phụ nữ, và bản đồ chỉ vị trí của Mặt Trời. Nếu một ngày nào đó có ai tìm thấy tôi, họ sẽ biết tôi đến từ đâu. Tôi đã im lặng từ lâu, nhưng tôi vẫn đang bay, mang theo lời chào của nhân loại.',
        hardware_part: 'Tấm bảng Pioneer Plaque',
        hardware_to_science:
          'Tấm bảng dùng ngôn ngữ của khoa học, như vạch quang phổ của hydro và vị trí các sao xung, để mô tả nơi con tàu ra đời.',
        facts: [
          { label: 'Hiện vật mang theo', value: 'Pioneer Plaque (không phải Golden Record)' },
          { label: 'Hiện tại', value: 'Đang bay ra ngoài Hệ Mặt Trời' }
        ],
        media_id: 'IMG-PIO-03',
        source_ids: ['SRC-PIO-01', 'SRC-PIO-05']
      }
    ],
    closing_line: 'The signal may fade. The story remains.'
  },
  'surveyor-3': {
    id: 'surveyor-3',
    machine_name: 'Surveyor 3',
    narrative_badge: 'Lời kể sáng tác dựa trên dữ kiện · Hồ sơ tư liệu mẫu',
    isDemoRecord: true,
    tagline: 'Tôi ngủ quên trên Mặt Trăng hai năm rưỡi, rồi bất ngờ đón những người bạn phi hành gia Apollo 12 bước tới.',
    intro:
      'Xin chào. Tôi là Surveyor 3, tàu đổ bộ Mặt Trăng không người lái của NASA (khối lượng phóng 997,9 kg) hạ cánh năm 1967 để tìm câu trả lời cho chương trình Apollo: đất Mặt Trăng có đủ cứng để phi hành gia đặt chân xuống không? (Lời kể sáng tác dựa trên dữ kiện khoa học NASA).',
    where_now: 'Sườn miệng hố trong Oceanus Procellarum (Đại dương Bão táp) — Mặt Trăng (Camera TV & một số bộ phận được Apollo 12 thu hồi)',
    accent: '#C5A46A',
    hero_media_id: 'IMG-SUR-01',
    poster_timeline: [
      { date: '17/04/1967', label: 'Phóng từ Mũi Canaveral bằng tên lửa Atlas-Centaur' },
      { date: '20/04/1967', label: 'Hạ cánh Oceanus Procellarum sau 2 cú nảy (10 m & 3 m)' },
      { date: '20/04 – 03/05/1967', label: 'Gửi 6.326 ảnh TV & đào 4 rãnh sâu ~18 cm thử độ cứng đất' },
      { date: '04/05/1967', label: 'Tín hiệu cuối cùng khi đêm Mặt Trăng làm cạn ắc quy' },
      { date: '19/11/1969', label: 'Apollo 12 Intrepid hạ cánh chính xác cách chỉ ~180 m' },
      { date: '20/11/1969', label: 'Conrad & Bean tới thăm, thu hồi Camera TV & gầu đào' }
    ],
    chapters: [
      {
        id: 'sur-1',
        code: '01 · CÂU HỎI',
        title: 'Đất Mặt Trăng có nuốt chửng tàu Apollo không?',
        narration:
          'Trước khi phi hành gia Apollo đặt chân lên Mặt Trăng, nhiều người lo ngại bề mặt phủ đầy lớp bụi mịn sâu hoắm sẽ nhấn chìm tàu đổ bộ. Ngày 17 tháng 4 năm 1967, tôi rời Mũi Canaveral trên tên lửa Atlas-Centaur mang theo một đôi mắt camera và một cánh tay đào đất để tự mình chạm vào Mặt Trăng.',
        hardware_part: 'Sứ mệnh trinh sát địa chất trước Apollo',
        hardware_to_science:
          'Để thiết kế chân tàu Apollo an toàn, kỹ sư cần đo trực tiếp lực chịu tải cơ học của lớp đất regolith chứ không chỉ nhìn từ quỹ đạo.',
        facts: [
          { label: 'Ngày phóng', value: '17/04/1967 (UTC)' },
          { label: 'Mục tiêu cốt lõi', value: 'Kiểm chứng độ an toàn bề mặt cho Apollo' }
        ],
        media_id: 'IMG-SUR-02',
        source_ids: ['SRC-SUR-01', 'SRC-SUR-02']
      },
      {
        id: 'sur-2',
        code: '02 · CÚ HẠ CÁNH',
        title: 'Hai cú nảy nghẹt thở xuống Oceanus Procellarum',
        narration:
          'Ngày 20 tháng 4 năm 1967, những tảng đá sáng lóa phản chiếu sai tín hiệu radar đo độ cao khi tôi còn cách mặt đất 4,3 mét. Động cơ tinh chỉnh không tự tắt như lập trình! Tôi chạm đất lần đầu, nảy vọt lên cao 10 mét, rồi nảy tiếp lần hai cao 3 mét trước khi trạm mặt đất gửi lệnh ngắt động cơ khẩn cấp ở độ cao 3,4 mét. Tôi đứng vững trên sườn dốc 12 độ.',
        hardware_part: 'Radar Doppler, động cơ Vernier & 3 chân tổ ong nhôm',
        hardware_to_science:
          'Hệ thống giảm chấn nhôm tổ ong giúp khung tam giác chịu được ba lần tiếp đất liên tiếp mà không lật úp.',
        facts: [
          { label: 'Ngày hạ cánh', value: '20/04/1967 (00:04 UT)' },
          { label: 'Tọa độ', value: 'Oceanus Procellarum (3°S, 23,41°W)' }
        ],
        media_id: 'IMG-SUR-02',
        source_ids: ['SRC-SUR-02']
      },
      {
        id: 'sur-3',
        code: '03 · BÀN TAY & ĐÔI MẮT',
        title: '6.326 bức ảnh và những rãnh đất sâu 18 cm',
        narration:
          'Chỉ một giờ sau khi hạ cánh, chiếc camera quét chậm gắn gương xoay của tôi đã gửi về bức ảnh đầu tiên. Tổng cộng tôi chụp 6.326 bức ảnh toàn cảnh. Quan trọng hơn, cánh tay gầu cơ học dài 1,5 mét của tôi vươn ra, đào bốn rãnh sâu tới 18 cm, gõ mạnh 13 lần và ép thử 7 lần xuống nền đất, chứng minh đất Mặt Trăng chịu lực khoảng 10 psi — quá đủ vững chãi cho tàu Apollo.',
        hardware_part: 'Camera TV 25mm/100mm & Tay đào Surface Sampler',
        hardware_to_science:
          'Từ những vết rãnh và lực cản đo được qua dòng điện mô-tơ tay đào, kỹ sư NASA tính ra khả năng chịu tải (~10 psi) của lớp đất mặt.',
        facts: [
          { label: 'Số ảnh truyền về', value: '6.326 bức ảnh TV' },
          { label: 'Rãnh đào thử', value: '4 rãnh sâu ~18 cm (tay cơ học 1,5 m)' }
        ],
        media_id: 'IMG-SUR-01',
        source_ids: ['SRC-SUR-01', 'SRC-SUR-02']
      },
      {
        id: 'sur-4',
        code: '04 · ĐÊM MẶT TRĂNG',
        title: 'Lời chúc ngủ ngon trước cái lạnh -150°C',
        narration:
          'Một ngày trên Mặt Trăng kéo dài 14 ngày Trái Đất nắng gắt, rồi màn đêm buông xuống lạnh buốt tới âm 150 độ C cũng suốt 14 ngày. Ngày 4 tháng 5 năm 1967, pin bạc-kẽm của tôi cạn dần khi bước vào đêm tối. Tôi gửi tín hiệu cuối cùng về Trái Đất và chìm vào giấc ngủ im lặng suốt hơn hai năm rưỡi.',
        hardware_part: 'Tấm pin Mặt Trời 0,855 m² & Ắc quy Bạc-Kẽm',
        hardware_to_science:
          'Không có lò sưởi hạt nhân RTG hay RHU, các mạch điện tử thế hệ 1967 khó sống sót qua cái lạnh khắc nghiệt kéo dài hai tuần lễ trên Mặt Trăng.',
        facts: [
          { label: 'Tín hiệu cuối cùng', value: '04/05/1967' },
          { label: 'Thời gian ngủ đông', value: '31 tháng trên bề mặt Mặt Trăng' }
        ],
        media_id: 'IMG-SUR-02',
        source_ids: ['SRC-SUR-02']
      },
      {
        id: 'sur-5',
        code: '05 · HỘI NGỘ LỊCH SỬ',
        title: 'Tháng 11/1969: Con người bước xuống ngay cạnh tôi',
        narration:
          'Tháng 11 năm 1969, sau cú đánh lái ngoạn mục vượt qua sự cố sét đánh khi phóng, hai phi hành gia Pete Conrad và Alan Bean trên tàu Apollo 12 đã thực hiện cuộc hạ cánh chính xác đầu tiên trong lịch sử: đáp xuống cách tôi chỉ khoảng 180 mét! Ngày 20 tháng 11, họ đi bộ men theo sườn hố đến bên tôi và thốt lên: tôi đã ngả sang màu nâu nhạt vì 31 tháng tắm nắng vũ trụ.',
        hardware_part: 'Toàn bộ thân tàu được bảo toàn qua 31 tháng',
        hardware_to_science:
          'Đây là lần duy nhất trong lịch sử loài người tận tay thăm lại một robot thăm dò không người lái đã hạ cánh trước đó nhiều năm.',
        facts: [
          { label: 'Apollo 12 hạ cánh', value: '19/11/1969 (cách ~180 m)' },
          { label: 'Cuộc gặp trên sườn hố', value: '20/11/1969 (EVA 2)' }
        ],
        media_id: 'IMG-SUR-01',
        source_ids: ['SRC-SUR-01', 'SRC-SUR-02']
      },
      {
        id: 'sur-6',
        code: '06 · DI SẢN KHẢO CỔ',
        title: 'Mang một phần ký ức Mặt Trăng trở về Trái Đất',
        narration:
          'Trước khi quay về tàu Intrepid, Pete Conrad và Alan Bean dùng kìm cắt ống dây thu hồi chiếc Camera TV và một phần gầu đào của tôi để mang về Trái Đất. Nhờ đó, các nhà khoa học nghiên cứu được vật liệu kim loại, sơn và kính quang học biến đổi ra sao sau gần ba năm phơi mình trong chân không. Tôi vẫn ở lại Oceanus Procellarum, nhưng không còn cô độc nữa.',
        hardware_part: 'Camera TV & mảnh vật liệu thu hồi về Trái Đất',
        hardware_to_science:
          'Camera TV của tôi hiện được trưng bày tại Bảo tàng Hàng không & Không gian Quốc gia Hoa Kỳ (Smithsonian) như chứng nhân khảo cổ học không gian đầu tiên.',
        facts: [
          { label: 'Hiện vật mang về', value: 'Camera TV, gầu đào & mẫu cáp điện' },
          { label: 'Giá trị khoa học', value: 'Phân tích lão hóa vật liệu 31 tháng trên Mặt Trăng' }
        ],
        media_id: 'IMG-SUR-01',
        source_ids: ['SRC-SUR-01', 'SRC-SUR-02']
      }
    ],
    closing_line: 'Alone on the crater slope, yet never forgotten.'
  }
};
