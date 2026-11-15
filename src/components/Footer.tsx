import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

export interface FooterProps {
  onNavigate: (route: string) => void;
  lang?: 'vi' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  const [resolvedLang, setResolvedLang] = useState<'vi' | 'en'>('vi');

  useEffect(() => {
    if (lang === 'en' || lang === 'vi') {
      setResolvedLang(lang);
      return;
    }
    const checkLang = () => {
      try {
        const stored = localStorage.getItem('beyond_the_signal_lang');
        if (stored === 'en' || stored === 'vi') {
          setResolvedLang(stored);
          return;
        }
      } catch {}
      setResolvedLang(document.documentElement.lang === 'en' ? 'en' : 'vi');
    };
    checkLang();
    const observer = new MutationObserver(checkLang);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => observer.disconnect();
  }, [lang]);

  const isEn = resolvedLang === 'en';

  return (
    <footer className="bg-[#101E30] border-t border-[#AAB8C7]/15 text-[#F0EDE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 space-y-10">
        {/* Top Row: Editorial Identity & Navigation Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10 border-b border-[#AAB8C7]/15">
          {/* Museum Mission & Tagline */}
          <div className="lg:col-span-6 space-y-3.5">
            <div className="flex items-center gap-2.5 font-mono text-[13px] uppercase tracking-wider text-[#D2A071]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D2A071]" />
              <span>BEYOND THE SIGNAL · NASA HARDWARE ARCHIVE</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F0EDE5] tracking-tight">
              &ldquo;The signal may fade. The story remains.&rdquo;
            </h3>

            <p className="font-sans text-sm font-medium text-[#D2A071] pt-0.5">
              EVERY MIND SEES A DIFFERENT UNIVERSE — Mỗi tâm trí nhìn thấy một vũ trụ khác nhau.
            </p>

            <p className="font-sans text-base text-[#AAB8C7] max-w-xl leading-relaxed pt-1">
              {isEn
                ? 'An interactive digital museum chronicling the engineering, scientific instruments, discoveries, and final resting places of NASA spacecraft across the Moon, Mars, and deep space.'
                : 'Bảo tàng số tương tác lưu giữ lịch sử kỹ thuật, thiết bị khoa học, các phát hiện vĩ đại và nơi yên nghỉ cuối cùng của những cỗ máy thám hiểm NASA trên Mặt Trăng, Sao Hỏa và không gian sâu.'}
            </p>
          </div>

          {/* Museum Sections Navigation */}
          <div className="lg:col-span-3 space-y-3.5">
            <div className="font-mono text-[13px] uppercase tracking-wider text-[#D2A071]">
              {isEn ? 'MUSEUM SECTIONS' : 'CẤU TRÚC BẢO TÀNG'}
            </div>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="text-[#AAB8C7] hover:text-[#F0EDE5] transition-colors cursor-pointer text-left"
                >
                  {isEn ? '00 · Entrance Hall (Home)' : '00 · Sảnh Chính (Trang Chủ)'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/hanh-trinh')}
                  className="text-[#AAB8C7] hover:text-[#F0EDE5] transition-colors cursor-pointer text-left"
                >
                  {isEn ? '01 · Journeys (Slide & Audio)' : '01 · Hành Trình (Slide & Audio)'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/mo-phong')}
                  className="text-[#AAB8C7] hover:text-[#F0EDE5] transition-colors cursor-pointer text-left"
                >
                  {isEn ? '02 · Challenge-Based Simulations' : '02 · Thử Thách & Mô Phỏng STEM'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/du-lieu')}
                  className="text-[#AAB8C7] hover:text-[#F0EDE5] transition-colors cursor-pointer text-left"
                >
                  {isEn ? '03 · Data (Open Science Catalog)' : '03 · Dữ Liệu Khoa Học Dễ Hiểu'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/san-pham')}
                  className="text-[#D2A071] hover:text-white transition-colors cursor-pointer text-left font-semibold"
                >
                  {isEn ? 'Human Expressions Gallery (MV · Poster · Comic)' : 'Không Gian Nghệ Thuật (MV · Poster · Truyện)'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/kham-pha')}
                  className="text-[#AAB8C7] hover:text-[#F0EDE5] transition-colors cursor-pointer text-left"
                >
                  {isEn ? 'Explore Hub' : 'Trung Tâm Khám Phá'}
                </button>
              </li>
            </ul>
          </div>

          {/* Primary NASA Archival Sources */}
          <div className="lg:col-span-3 space-y-3.5">
            <div className="font-mono text-[13px] uppercase tracking-wider text-[#D2A071]">
              {isEn ? 'PRIMARY NASA REPOSITORIES' : 'NGUỒN TƯ LIỆU NASA CHÍNH THỨC'}
            </div>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <a
                  href="https://science.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#AAB8C7] hover:text-[#F0EDE5] transition-colors"
                >
                  <span>NASA Science Mission Directorate</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D2A071] shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://nssdc.gsfc.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#AAB8C7] hover:text-[#F0EDE5] transition-colors"
                >
                  <span>NSSDCA Master Catalog (GSFC)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D2A071] shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://photojournal.jpl.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#AAB8C7] hover:text-[#F0EDE5] transition-colors"
                >
                  <span>NASA/JPL Planetary Photojournal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D2A071] shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://images.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#AAB8C7] hover:text-[#F0EDE5] transition-colors"
                >
                  <span>NASA Image and Video Library</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D2A071] shrink-0" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Provenance & Accessibility Footnote */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-[#AAB8C7] leading-relaxed">
          <div>
            <span className="font-mono text-[13px] uppercase tracking-wider text-[#D2A071] block mb-1.5">
              {isEn ? 'PROVENANCE & SCIENTIFIC INTEGRITY' : 'MINH BẠCH NGUỒN GỐC & KHOA HỌC'}
            </span>
            <p>
              {isEn
                ? 'All hardware specifications, orbital coordinates, and historical imagery are cited to NASA, JPL-Caltech, NSSDCA, and NASA Ames Research Center. First-person narrative audio chapters are clearly labeled as educational creative interpretations grounded in verified mission logs.'
                : 'Mọi thông số phần cứng, tọa độ hành tinh và ảnh lịch sử đều được trích dẫn trực tiếp từ NASA, JPL-Caltech, NSSDCA và NASA Ames Research Center. Các bản thuyết minh góc nhìn thứ nhất được gắn nhãn rõ ràng là diễn giải giáo dục dựa trên nhật ký nhiệm vụ xác thực.'}
            </p>
          </div>

          <div className="md:text-right">
            <span className="font-mono text-[13px] uppercase tracking-wider text-[#D2A071] block mb-1.5">
              {isEn ? 'OPEN EDUCATION · WCAG AA COMPLIANT' : 'GIÁO DỤC MỞ · TIÊU CHUẨN TIẾP CẬN WCAG AA'}
            </span>
            <p>
              {isEn
                ? 'Designed for students, educators, and space exploration enthusiasts. Null-safe telemetry rendering ensures unverified fields are never fabricated.'
                : 'Thiết kế phục vụ học sinh, giáo viên và cộng đồng yêu khoa học vũ trụ. Hệ thống hiển thị minh bạch các trường dữ liệu đang bổ sung, tuyệt đối không tự suy diễn số liệu.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
