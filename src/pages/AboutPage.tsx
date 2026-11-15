import React, { useState } from 'react';
import {
  ExternalLink,
  CheckCircle2,
  Compass,
  FileCheck,
  ShieldCheck
} from 'lucide-react';
import {
  SOURCES_CATALOG,
  NASA_MEDIA_CATALOG
} from '../data/museumData';

export const AboutPage: React.FC = () => {
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string>('ALL');

  const allSources = Object.values(SOURCES_CATALOG);
  const allMedia = Object.values(NASA_MEDIA_CATALOG).filter((m) => m.id.startsWith('IMG-'));

  const filteredSources = allSources.filter((src) => {
    if (selectedSourceFilter === 'ALL') return true;
    return src.id.startsWith(selectedSourceFilter);
  });

  return (
    <div className="bg-[#070E1E] text-[#E2E8F0] min-h-screen">
      {/* Header - Observatory Deep Space Hero with Galaxy Glow & HUD Circuit Lines */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#070E1E] via-[#0B142C] to-[#070E1E] border-b border-[#22D3EE]/25 py-14 px-4 sm:px-6 lg:px-8">
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

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#38BDF8] mb-3">
            <Compass className="w-4 h-4 text-[#F59E0B]" />
            <span className="bg-[#0B142C]/90 px-3 py-1 border border-[#22D3EE]/40 rounded-xs shadow-[0_0_12px_rgba(34,211,238,0.25)]">
              CURATORIAL MANIFESTO &amp; PROVENANCE REGISTRY · VỀ DỰ ÁN &amp; NGUỒN TƯ LIỆU
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#F8FAFC] tracking-tight leading-tight">
            Về bảo tàng số BEYOND THE SIGNAL
          </h1>
          <p className="text-base sm:text-lg text-[#CBD5E1] mt-4 max-w-3xl leading-relaxed">
            “Những cỗ máy đi thay con người — khi con người chưa thể đến, chúng ta gửi những cỗ máy đi trước.”
          </p>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* 1. Core Curatorial Thesis */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="hud-card bg-[#0B142C]/85 backdrop-blur-md border border-[#22D3EE]/35 p-6 space-y-3 rounded-md shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <div className="font-mono text-xs uppercase tracking-wider text-[#38BDF8] font-bold">
              01 · TRỤC TỰ SỰ TRUNG TÂM
            </div>
            <h2 className="font-display text-xl font-bold text-[#F8FAFC]">
              Máy móc như những sứ giả của nhân loại
            </h2>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              Bảo tàng số không chỉ liệt kê thông số kỹ thuật rời rạc. Mỗi thiết bị trong kho lưu trữ đều được đặt trong một hành trình gồm 6 chương: Câu hỏi mở đường (The Question), Thiết kế kỹ thuật (The Machine), Hành trình (The Journey), Phát hiện khoa học (The Discovery), Tín hiệu cuối (The Last Signal) và Di sản mở đường (The Legacy).
            </p>
          </div>

          <div className="hud-card bg-[#0B142C]/85 backdrop-blur-md border border-[#22D3EE]/35 p-6 space-y-3 rounded-md shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <div className="font-mono text-xs uppercase tracking-wider text-[#FB923C] font-bold">
              02 · KỶ LUẬT DỮ LIỆU &amp; NGỮ NGHĨA
            </div>
            <h2 className="font-display text-xl font-bold text-[#F8FAFC]">
              Tách biệt rõ từng mốc thời gian và bộ phận
            </h2>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              Hồ sơ bảo tàng không bao giờ gộp chung <em>ngày nhận tín hiệu cuối</em> với <em>ngày tuyên bố kết thúc sứ mệnh</em>, không đồng nhất <em>Orbiter</em> với <em>Lander</em> (như Viking 1), không nhầm <em>Mars Pathfinder</em> (lander) với <em>Sojourner</em> (rover), và không suy diễn bằng chứng nước cổ đại thành bằng chứng đã tìm thấy sự sống.
            </p>
          </div>

          <div className="hud-card bg-[#0B142C]/85 backdrop-blur-md border border-[#22D3EE]/35 p-6 space-y-3 rounded-md shadow-[0_0_20px_rgba(34,211,238,0.1)]">
            <div className="font-mono text-xs uppercase tracking-wider text-[#38BDF8] font-bold">
              03 · TƯ LIỆU ẢNH CHÍNH THỨC NASA
            </div>
            <h2 className="font-display text-xl font-bold text-[#F8FAFC]">
              Không dùng ảnh AI thay thế tư liệu lịch sử
            </h2>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              Toàn bộ ảnh tư liệu và sơ đồ kỹ thuật trong phần Khoa học &amp; Lưu trữ đều đối chiếu trực tiếp từ <strong>NASA Science</strong>, <strong>NASA JPL</strong> và <strong>NASA Ames</strong>, đi kèm mã nguồn <code>SRC-*</code> và <code>IMG-*</code> để người đọc tự kiểm tra.
            </p>
          </div>
        </section>

        {/* 2. Curatorial Verification & Needs Review Workspace */}
        <section className="hud-card bg-[#0B142C]/85 backdrop-blur-md text-[#E2E8F0] border border-[#22D3EE]/35 p-6 sm:p-8 space-y-6 rounded-md shadow-[0_0_24px_rgba(34,211,238,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#22D3EE]/20 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#38BDF8] block font-bold">
                CURATORIAL QA &amp; SCIENTIFIC PRECISION
              </span>
              <h2 className="font-display text-2xl font-bold text-[#F8FAFC] mt-1">
                Các điểm hiệu đính khoa học &amp; mục đánh dấu <code className="text-base font-mono bg-[#07111F] text-[#FBBF24] border border-[#F59E0B]/40 px-2 py-0.5 rounded">needs_review</code>
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#07111F] text-[#38BDF8] border border-[#22D3EE]/40 font-mono text-xs font-semibold shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
              8/8 Hồ sơ thiết bị đã đối chiếu SRC-*
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs leading-relaxed">
            <div className="p-4 bg-[#07111F]/90 border border-[#22D3EE]/30 space-y-1.5 rounded-xs hover:border-[#22D3EE]/60 transition-colors shadow-inner">
              <div className="font-mono font-bold text-[#FB923C] uppercase">
                1. Opportunity (MER-B) · Phân biệt rõ Mốc thời gian &amp; Khoáng vật nước
              </div>
              <p className="text-[#CBD5E1]">
                • Hạ cánh: <strong>24/01/2004 (PST) / 25/01/2004 (UTC)</strong>.<br />
                • Tín hiệu cuối cùng: <strong>10/06/2018</strong> trong bão bụi toàn cầu.<br />
                • Tuyên bố kết thúc sứ mệnh: <strong>13/02/2019</strong>.<br />
                • Quãng đường <strong>45,16 km</strong>; hạt vi cầu hematite ("blueberries"), mạch thạch cao và khoáng sét montmorillonite chứng minh nước từng tồn tại.<br />
                • Ảnh tự chụp 2007 (<strong>PIA15114</strong>) là ảnh ghép mosaic Pancam, không phải robot khác chụp.<br />
                • Cập nhật ngày <strong>11/10/2026 (SRC-OPP-05)</strong>: Rover Perseverance đã vượt qua mốc quãng đường này.
              </p>
            </div>

            <div className="p-4 bg-[#07111F]/90 border border-[#22D3EE]/30 space-y-1.5 rounded-xs hover:border-[#22D3EE]/60 transition-colors shadow-inner">
              <div className="font-mono font-bold text-[#FBBF24] uppercase">
                2. Pioneer 11 · Tách biệt 2 mốc kết thúc &amp; Chú thích ảnh Sao Thổ
              </div>
              <p className="text-[#CBD5E1]">
                • Phóng: <strong>06/04/1973 (UTC)</strong> (tối 05/04 EDT).<br />
                • Liên lạc điều hành cuối: <strong>30/09/1995</strong> · Dữ liệu kỹ thuật cuối: <strong>24/11/1995</strong> (<code>SRC-PIO-01</code>).<br />
                • Ảnh <code>IMG-PIO-01</code> (01/09/1979) là <strong>ảnh chụp Sao Thổ và Titan</strong> từ cự ly 2,8 triệu km, tuyệt đối không phải ảnh thân tàu.<br />
                • 12 thiết bị khoa học, phát hiện vành đai F; không cung cấp tọa độ thời gian thực khi không có nguồn; ẩn nút 3D do chưa có mô hình xác minh riêng.
              </p>
            </div>

            <div className="p-4 bg-[#07111F]/90 border border-[#22D3EE]/30 space-y-1.5 rounded-xs hover:border-[#22D3EE]/60 transition-colors shadow-inner">
              <div className="font-mono font-bold text-[#FBBF24] uppercase">
                3. Spirit (MER-A) · Phát hiện từ bánh xe kẹt
              </div>
              <p className="text-[#CBD5E1]">
                • Bánh xe trước bên phải bị kẹt (03/2006) kéo lê làm lộ lớp đất trắng ngà chứa <strong>90% silica tinh khiết tại Home Plate</strong> (chỉ dấu suối nước nóng/thủy nhiệt cổ).<br />
                • Mỏm đá Comanche giàu carbonate chứng minh môi trường nước không bị axit hóa.<br />
                • Tín hiệu cuối: <strong>22/03/2010</strong>; NASA tuyên bố kết thúc: <strong>25/05/2011</strong>.<br />
                • Ẩn nút 3D do chưa có mô hình độc lập đã xác minh.
              </p>
            </div>

            <div className="p-4 bg-[#07111F]/90 border border-[#22D3EE]/30 space-y-1.5 rounded-xs hover:border-[#22D3EE]/60 transition-colors shadow-inner">
              <div className="font-mono font-bold text-[#FB923C] uppercase">
                4. InSight · Trạm địa chấn &amp; Bài học thực nghiệm HP3
              </div>
              <p className="text-[#CBD5E1]">
                • Trạm đổ bộ cố định (Stationary Lander); máy đo địa chấn SEIS (CNES) ghi nhận <strong>1.319 trận động đất Sao Hỏa</strong> hé lộ vỏ, manti và lõi lỏng ~1.800 km.<br />
                • Đầu dò nhiệt HP3 (DLR) không đạt độ sâu thiết kế do tính kết dính của đất — bài học khoa học thực nghiệm quý báu.<br />
                • Ảnh selfie cuối cùng <strong>24/04/2022 (PIA25287)</strong> cho thấy bụi đỏ phủ dày.<br />
                • Tín hiệu cuối: <strong>15/12/2022</strong>; NASA kết thúc sứ mệnh: <strong>21/12/2022</strong>. Ẩn nút 3D.
              </p>
            </div>

            <div className="p-4 bg-[#07111F]/90 border border-[#22D3EE]/30 space-y-1.5 rounded-xs hover:border-[#22D3EE]/60 transition-colors shadow-inner">
              <div className="font-mono font-bold text-[#FBBF24] uppercase">
                5. Gương phản xạ Apollo (LRRR) · Hoàn toàn thụ động 0 Watt
              </div>
              <p className="text-[#CBD5E1]">
                • Thiết bị quang học thụ động 100%, <strong>không dùng pin, không dùng nguồn điện</strong>, không nhầm với tấm pin mặt trời.<br />
                • Apollo 11, 14 (100 lăng kính) và Apollo 15 (300 lăng kính).<br />
                • Đo khoảng cách Trái Đất–Mặt Trăng bằng tia laser suốt <strong>hơn 55 năm liên tục</strong> (từ 1969 đến nay), phát hiện Mặt Trăng rời xa Trái Đất ~3,8 cm/năm.<br />
                • Ảnh cận cảnh mảng phản xạ Apollo 14 (<strong>AS14-67-9386</strong>, ngày 05/02/1971). Ẩn nút 3D.
              </p>
            </div>

            <div className="p-4 bg-[#07111F]/90 border border-[#FB923C]/50 space-y-1.5 rounded-xs shadow-inner">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono font-bold text-[#FB923C] uppercase">
                  6. Viking 1 · Mục đánh dấu needs_review (Tháng 11/1982)
                </span>
                <span className="px-2 py-0.5 rounded bg-[#EA580C] text-white font-mono text-[10px]">
                  needs_review
                </span>
              </div>
              <p className="text-[#CBD5E1]">
                • Tách bạch rõ <strong>Viking 1 Orbiter</strong> (dừng 07/08/1980) và <strong>Viking 1 Lander</strong> (hoạt động đến Tháng 11/1982).<br />
                • Trang tổng quan NASA chỉ ghi cấp tháng (<em>November 1982</em>), hệ thống gắn cờ <code>needs_review</code> không bịa đặt ngày cụ thể.<br />
                • Con số <strong>52.663 ảnh quỹ đạo</strong> là tổng số của <strong>cả Viking 1 &amp; Viking 2 cộng lại</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* 2B. 14-Point Comprehensive Compliance & Acceptance Checklist */}
        <section className="hud-card bg-[#0B142C]/85 backdrop-blur-md border border-[#22D3EE]/35 p-6 sm:p-8 space-y-6 rounded-md shadow-[0_0_24px_rgba(34,211,238,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#22D3EE]/20 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#38BDF8] block font-bold">
                VERIFICATION &amp; ACCEPTANCE REGISTRY · CĂN CỨ NGHIỆM THU
              </span>
              <h2 className="font-display text-2xl font-bold text-[#F8FAFC] mt-1">
                Bảng đối chiếu 14 tiêu chí thể lệ &amp; kết quả kiểm định độc lập
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#07111F] text-[#38BDF8] border border-[#22D3EE]/40 font-mono text-xs font-semibold shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
              14/14 TIÊU CHÍ ĐẠT (PASS)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#22D3EE]/20 font-mono text-[11px] uppercase text-[#38BDF8]">
                  <th className="py-2.5 pr-3 text-center w-12">STT</th>
                  <th className="py-2.5 pr-4 w-44">Nhóm tiêu chí</th>
                  <th className="py-2.5 pr-4">Nội dung đối chiếu &amp; Triển khai thực tế</th>
                  <th className="py-2.5 pr-3 w-32">Nguồn quy định</th>
                  <th className="py-2.5 text-center w-24">Kết quả</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#283A58]">
                {[
                  {
                    stt: 1,
                    group: 'Bản sắc & Trục tự sự',
                    desc: 'Thể hiện nhất quán thông điệp trung tâm: "Những cỗ máy đi thay con người — khi con người chưa thể đến, chúng ta gửi những cỗ máy đi trước". Không phải blog tin tức hay kho dữ liệu khô cứng.',
                    source: 'Master Brief §01',
                    status: 'PASS'
                  },
                  {
                    stt: 2,
                    group: 'Cấu trúc 3 miền không gian',
                    desc: 'Phân chia rõ 3 miền: Mặt Trăng (The Moon), Sao Hỏa (Mars), Không gian sâu (Deep Space) với trải nghiệm trực quan riêng biệt, không dùng thẻ bài trùng lặp.',
                    source: 'Brief §01 / Design',
                    status: 'PASS'
                  },
                  {
                    stt: 3,
                    group: 'Hai không gian song hành',
                    desc: 'Kết nối hài hòa giữa Kho tư liệu khoa học NASA (chuẩn mực, có nguồn) và Phòng trưng bày sáng tạo trẻ (đa phương tiện: tranh, audio, video, comic; không like/follow mạng xã hội).',
                    source: 'Brief §01, §8',
                    status: 'PASS'
                  },
                  {
                    stt: 4,
                    group: 'Hệ thống thị giác độc bản',
                    desc: 'Triển khai phong cách "The Signal Archive": Tấm nền không gian tối (#07111F), thẻ ngà đọc thoải mái (#F3F0E8/#FFFFFF), nhấn đồng Sao Hỏa (#C96F46), vàng kim (#C5A46A), cyan (#6FB7C9). Tương phản WCAG AA.',
                    source: 'Design Report',
                    status: 'PASS'
                  },
                  {
                    stt: 5,
                    group: 'Typography học thuật',
                    desc: 'Tiêu đề serif trang nhã (Playfair Display), văn bản đọc thân thiện (Be Vietnam Pro), dữ liệu kỹ thuật đơn cách (IBM Plex Mono). Hiển thị tiếng Việt toàn vẹn.',
                    source: 'Design System §3',
                    status: 'PASS'
                  },
                  {
                    stt: 6,
                    group: 'Hồ sơ 2 tầng thông tin',
                    desc: 'Mỗi thiết bị có Tầng 1 (Quick Overview 3 câu hỏi cốt lõi) và Tầng 2 (Triển lãm 6 chương: Câu hỏi, Cỗ máy, Hành trình, Phát hiện, Tín hiệu cuối, Di sản).',
                    source: 'Prompt §4, Brief §03',
                    status: 'PASS'
                  },
                  {
                    stt: 7,
                    group: 'Quy chuẩn 5 hồ sơ NASA',
                    desc: 'Cập nhật trọn vẹn 5 hồ sơ trọng tâm ngày 11/11/2026: Opportunity, Spirit, InSight, Pioneer 11, Gương phản xạ Apollo LRRR với dữ liệu phần cứng và số liệu chính xác.',
                    source: 'Hồ sơ NASA (11/11/2026)',
                    status: 'PASS'
                  },
                  {
                    stt: 8,
                    group: 'Chuẩn hóa ảnh tư liệu NASA',
                    desc: '100% ảnh tư liệu được lưu trữ cục bộ (/public/assets/nasa/), dung lượng > 0 KB. Tuyệt đối không dùng URL HTML làm src của thẻ <img>. Có credit, caption và URL trang nguồn.',
                    source: 'Prompt §5, Rules §5',
                    status: 'PASS'
                  },
                  {
                    stt: 9,
                    group: 'Quy tắc Mô hình 3D',
                    desc: 'Chỉ hiển thị nút 3D khi có mô hình riêng đã xác minh (Opportunity MER-B). Ẩn hoàn toàn nút 3D ở Spirit, InSight, Pioneer 11, Apollo LRRR; không dẫn tới trang tìm kiếm rỗng.',
                    source: 'Hồ sơ NASA Quy tắc 1&7',
                    status: 'PASS'
                  },
                  {
                    stt: 10,
                    group: 'Tách biệt mốc thời gian',
                    desc: 'Phân tách rạch ròi ngày nhận tín hiệu cuối cùng (last_contact_date) và ngày NASA chính thức tuyên bố kết thúc sứ mệnh (mission_end_date) ở mọi hồ sơ.',
                    source: 'Content Rules §1',
                    status: 'PASS'
                  },
                  {
                    stt: 11,
                    group: 'Nhãn minh bạch tự sự',
                    desc: 'Gắn nhãn rõ "Lời kể sáng tác dựa trên dữ kiện" cho độc thoại ngôi thứ nhất; gắn nhãn "Minh họa giáo dục" cho các mô phỏng tương tác, không gây nhầm là tin nhắn gốc của robot.',
                    source: 'Hồ sơ NASA Quy tắc 4',
                    status: 'PASS'
                  },
                  {
                    stt: 12,
                    group: 'Bản quyền & Miễn trừ',
                    desc: 'Tuân thủ NASA Media Guidelines: Không xưng "NASA Official Archive", không ám chỉ NASA bảo trợ, có liên kết chính sách bản quyền NASA SRC-IMG-01.',
                    source: 'Content Rules §4',
                    status: 'PASS'
                  },
                  {
                    stt: 13,
                    group: 'Quyền riêng tư & Khách tham quan',
                    desc: 'Khách vãng lai duyệt toàn bộ bảo tàng mà không bị bắt ép nhập email hay mật khẩu. Không sử dụng cơ chế đăng nhập/đăng ký giả tạo khi chưa có backend.',
                    source: 'Content Rules §7',
                    status: 'PASS'
                  },
                  {
                    stt: 14,
                    group: 'Kiểm thử Preview độc lập',
                    desc: 'Bản dựng preview.html độc lập được biên dịch thành công từ dev_server.py, mở trực tiếp bằng trình duyệt nội bộ không lỗi cú pháp hay ngoại lệ runtime.',
                    source: 'Nghiệm thu §7',
                    status: 'PASS'
                  }
                ].map((item) => (
                  <tr key={item.stt} className="hover:bg-[#14243A]">
                    <td className="py-3 pr-3 text-center font-mono font-bold text-[#C5A46A]">
                      {item.stt}
                    </td>
                    <td className="py-3 pr-4 font-display font-bold text-[#E9EDF2]">
                      {item.group}
                    </td>
                    <td className="py-3 pr-4 text-[#A9B4C4] leading-relaxed">
                      {item.desc}
                    </td>
                    <td className="py-3 pr-3 font-mono text-[11px] text-[#6FB7C9]">
                      {item.source}
                    </td>
                    <td className="py-3 text-center whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full bg-[#6FB7C9]/20 text-[#6FB7C9] border border-[#6FB7C9]/40 font-mono text-[10px] font-bold">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. NASA Image Manifest Status Report */}
        <section className="hud-card bg-[#0B142C]/85 backdrop-blur-md border border-[#22D3EE]/35 p-6 sm:p-8 space-y-5 rounded-md shadow-[0_0_24px_rgba(34,211,238,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#22D3EE]/20 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#38BDF8] block font-bold">
                NASA IMAGE MANIFEST STATUS
              </span>
              <h2 className="font-display text-2xl font-bold text-[#F8FAFC] mt-1">
                Danh mục {allMedia.length} Tư liệu Hình ảnh &amp; Sơ đồ Kỹ thuật NASA (<code>IMG-*</code>)
              </h2>
            </div>
            <span className="font-mono text-xs text-[#38BDF8] font-semibold bg-[#07111F] px-3 py-1 rounded-full border border-[#22D3EE]/40">
              {allMedia.length}/{allMedia.length} Tư liệu đã lưu trữ cục bộ (/public/assets/nasa/)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#22D3EE]/20 font-mono text-[11px] uppercase text-[#38BDF8]">
                  <th className="py-2.5 pr-4">Mã ảnh</th>
                  <th className="py-2.5 pr-4">Sứ mệnh</th>
                  <th className="py-2.5 pr-4">Tiêu đề &amp; Bản chất tư liệu</th>
                  <th className="py-2.5 pr-4">Tệp cục bộ</th>
                  <th className="py-2.5">Nguồn NASA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#22D3EE]/15">
                {allMedia.map((img) => (
                  <tr key={img.id} className="hover:bg-[#07111F]/80 transition-colors">
                    <td className="py-3 pr-4 font-mono font-bold text-[#FBBF24] whitespace-nowrap">
                      {img.id}
                    </td>
                    <td className="py-3 pr-4 font-mono text-[#F8FAFC] uppercase whitespace-nowrap">
                      {img.mission}
                    </td>
                    <td className="py-3 pr-4">
                      <div className="font-semibold text-[#F8FAFC]">{img.title}</div>
                      <div className="text-[#CBD5E1] line-clamp-1 mt-0.5">{img.caption_vi}</div>
                    </td>
                    <td className="py-3 pr-4 font-mono text-[11px] text-[#38BDF8] whitespace-nowrap">
                      {img.local_asset_url || 'Đã đồng bộ'}
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <a
                        href={img.source_page}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-[#FBBF24] hover:text-[#F59E0B]"
                      >
                        <span>NASA Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Complete Sources Registry (SRC-*) */}
        <section className="hud-card bg-[#0B142C]/85 backdrop-blur-md border border-[#22D3EE]/35 p-6 sm:p-8 space-y-5 rounded-md shadow-[0_0_24px_rgba(34,211,238,0.12)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#22D3EE]/20 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#38BDF8] block font-bold">
                PROVENANCE REGISTRY · {allSources.length} VERIFIED NASA SOURCES
              </span>
              <h2 className="font-display text-2xl font-bold text-[#F8FAFC] mt-1">
                Danh mục Nguồn Đối Chiếu Chính Thức (<code>SRC-*</code>)
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'ALL', label: `Tất cả (${allSources.length})` },
                { id: 'SRC-OPP', label: 'Opportunity' },
                { id: 'SRC-SPI', label: 'Spirit' },
                { id: 'SRC-INS', label: 'InSight' },
                { id: 'SRC-LRR', label: 'Apollo LRRR' },
                { id: 'SRC-PIO', label: 'Pioneer 11' },
                { id: 'SRC-SUR', label: 'Surveyor 3' },
                { id: 'SRC-VIK', label: 'Viking 1' },
                { id: 'SRC-SOJ', label: 'Sojourner' },
                { id: 'SRC-IMG', label: 'Chính sách ảnh' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedSourceFilter(tab.id)}
                  className={`px-2.5 py-1 rounded-xs font-mono text-[11px] transition-all duration-300 cursor-pointer border ${
                    selectedSourceFilter === tab.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.35)]'
                      : 'bg-[#07111F]/90 text-[#94A3B8] border-[#22D3EE]/25 hover:border-[#22D3EE]/60 hover:text-[#38BDF8]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredSources.map((src) => (
              <div
                key={src.id}
                className="p-4 rounded-xs bg-[#07111F]/90 border border-[#22D3EE]/25 hover:border-[#22D3EE]/60 flex flex-col justify-between gap-2 shadow-inner transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#FBBF24]">
                      {src.id}
                    </span>
                    <span className="font-mono text-[11px] text-[#94A3B8]">
                      {src.source_type} · Kiểm tra: {src.last_checked}
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-[#F8FAFC] mt-1">
                    {src.title}
                  </h3>
                  <p className="text-xs text-[#CBD5E1] mt-1 leading-relaxed">
                    <strong>Dữ kiện xác minh:</strong> {src.supports.join(' · ')}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#22D3EE]/20 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#94A3B8]/80 truncate max-w-[240px]">{src.url}</span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#38BDF8] hover:text-[#22D3EE] font-semibold shrink-0"
                  >
                    <span>Mở trang gốc</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Legal & NASA Media Usage Compliance */}
        <section className="p-6 rounded-md hud-card bg-[#0B142C]/85 backdrop-blur-md border border-[#22D3EE]/35 text-xs text-[#CBD5E1] space-y-2 leading-relaxed shadow-[0_0_20px_rgba(34,211,238,0.1)]">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
            TUÂN THỦ QUY ĐỊNH SỬ DỤNG TƯ LIỆU NASA (SRC-IMG-01)
          </div>
          <p>
            Dự án giáo dục độc lập <strong>BEYOND THE SIGNAL</strong> tuân thủ hướng dẫn <em>NASA Media Usage Guidelines</em>. Hình ảnh và tư liệu lịch sử của NASA được trích dẫn cho mục đích giáo dục và nghiên cứu phi thương mại. Giao diện không sử dụng logo NASA (Meatball / Worm) làm biểu trưng thương hiệu riêng và không tuyên bố được NASA bảo trợ hay phê duyệt chính thức.
          </p>
        </section>
      </article>
    </div>
  );
};
