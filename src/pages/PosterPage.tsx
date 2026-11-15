import React from 'react';
import { Printer, ArrowRight, Download, BookOpen, Image } from 'lucide-react';
import { MACHINE_STORIES } from '../data/stories';
import { NASA_MEDIA_CATALOG } from '../data/museumData';

interface PosterPageProps {
  missionId: 'opportunity' | 'pioneer-11' | 'surveyor-3';
  onNavigate: (route: string) => void;
}

const resolvePosterPublicUrl = (p: string | null | undefined): string => {
  if (!p) return '';
  if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('blob:') || p.startsWith('data:')) return p;
  let clean = p.startsWith('/') ? p : `/${p}`;
  if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
    return clean.startsWith('/public/') ? `.${clean}` : `./public${clean}`;
  }
  if (clean.startsWith('/public/')) {
    clean = clean.slice(7);
  }
  return clean;
};

export const PosterPage: React.FC<PosterPageProps> = ({ missionId, onNavigate }) => {
  const story = MACHINE_STORIES[missionId] || MACHINE_STORIES.opportunity;
  const hero = NASA_MEDIA_CATALOG[story.hero_media_id];
  const heroSrc = hero ? resolvePosterPublicUrl(hero.local_asset_url || hero.direct_asset_url || '') : '';
  const heroFallback = hero ? hero.direct_asset_url || '' : '';
  const littleWheelsPosterUrl = resolvePosterPublicUrl('/products/opportunity/little_wheels_poster.png');
  const surveyorComicCoverUrl = resolvePosterPublicUrl('/products/surveyor-3/comic/page_01.png');
  const surveyorComicPdfUrl = resolvePosterPublicUrl('/products/surveyor-3/Surveyor_3_Comic.pdf');

  const pageUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/hanh-trinh?mission=${missionId}` : `/hanh-trinh?mission=${missionId}`;

  return (
    <div className="bg-[#E7E2D6] py-10 px-4 print:bg-white print:p-0 min-h-screen">
      {/* Toolbar (hidden on print) */}
      <div className="no-print max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate(`/hanh-trinh?mission=${missionId}`)}
          className="inline-flex items-center gap-2 font-mono text-xs text-[#172233] hover:text-[#9A4A27] font-semibold cursor-pointer transition-colors"
        >
          ← Quay lại Hành trình {story.machine_name}
        </button>
        <div className="flex flex-wrap gap-2">
          {(['opportunity', 'pioneer-11', 'surveyor-3'] as const)
            .filter((id) => id !== missionId)
            .map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(`/poster/${id}`)}
                className="px-4 py-2.5 bg-[#FFFFFF] border border-[#C5A46A]/40 font-mono text-xs uppercase tracking-wider text-[#172233] hover:bg-[#F3F0E8] cursor-pointer rounded-xs transition-colors"
              >
                Poster {MACHINE_STORIES[id].machine_name}
              </button>
            ))}
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-primary-rust inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wider cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>In / Lưu PDF</span>
          </button>
        </div>
      </div>

      {/* Poster sheet */}
      <article className="poster-sheet max-w-4xl mx-auto bg-[#F3F0E8] text-[#172233] shadow-2xl print:shadow-none border border-[#C5A46A]/40 rounded-xs overflow-hidden">
        {/* Header band */}
        <header className="bg-[#07111F] text-[#E9EDF2] px-8 py-8 space-y-3 border-b border-[#283A58]">
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.2em]">
            <span className="text-[#C5A46A] font-bold">BEYOND THE SIGNAL · NSSDCA ARCHIVE</span>
            <div className="flex items-center gap-2">
              {story.isDemoRecord && (
                <span className="px-2 py-0.5 bg-[#C96F46]/25 text-[#F7C3A8] border border-[#C96F46]/60 rounded-xs font-bold">
                  Hồ sơ tư liệu mẫu · Demo Record
                </span>
              )}
              <span className="text-[#A9B4C4]">Những cỗ máy đi thay con người</span>
            </div>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-[#E9EDF2]">{story.machine_name}</h1>
          <p className="font-display text-xl text-[#C5A46A] italic">“{story.tagline}”</p>
          <p className="font-mono text-xs text-[#A9B4C4]">Hiện tại: {story.where_now}</p>
        </header>

        {/* Image + intro */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-b border-[#172233]/15">
          {heroSrc && (
            <figure className="bg-[#07111F] border-r border-[#172233]/15 flex flex-col justify-between">
              <img
                src={heroSrc}
                alt={hero!.alt_vi}
                onError={(e) => {
                  if (heroFallback && e.currentTarget.src !== heroFallback) {
                    e.currentTarget.src = heroFallback;
                  }
                }}
                className="w-full h-full object-cover max-h-80"
              />
              <figcaption className="px-3 py-2 font-mono text-[10px] text-[#A9B4C4] bg-[#0D1B2E]">
                {hero!.title} · {hero!.credit}
              </figcaption>
            </figure>
          )}
          <div className="p-6 space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#9A4A27] font-bold">
              Giới thiệu
            </h2>
            <p className="text-sm leading-relaxed text-[#172233]">{story.intro}</p>
            <h2 className="font-mono text-xs uppercase tracking-widest pt-2 text-[#7A5C1E] font-bold">
              Phần cứng giúp khám phá
            </h2>
            <ul className="text-sm space-y-1 list-disc list-inside text-[#172233]">
              {story.chapters.slice(1, 5).map((c) => (
                <li key={c.id}>
                  <strong>{c.hardware_part}:</strong> {c.hardware_to_science.split('.')[0]}.
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Team Creative Exhibition Companion Inside Poster Sheet (Opportunity Artwork or Surveyor 3 Comic Cover) */}
        {missionId === 'opportunity' && (
          <section className="px-6 py-6 border-b border-[#172233]/15 bg-[#ECE8DD]">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-5">
                <figure className="bg-[#07111F] border border-[#C5A46A]/50 rounded-xs overflow-hidden shadow-md">
                  <img
                    src={littleWheelsPosterUrl}
                    alt="Poster nghệ thuật LITTLE WHEELS — A Song for Opportunity"
                    className="w-full object-contain max-h-80 bg-[#07111F]"
                  />
                  <figcaption className="px-3 py-1.5 font-mono text-[10px] text-[#C5A46A] bg-[#0D1B2E]">
                    Tác phẩm sáng tác minh họa · Không phải ảnh NASA gốc
                  </figcaption>
                </figure>
              </div>
              <div className="sm:col-span-7 space-y-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#9A4A27] font-bold">
                  <Image className="w-4 h-4" />
                  <span>Poster Nghệ Thuật Kèm MV · LITTLE WHEELS</span>
                </span>
                <h2 className="font-display text-2xl font-bold text-[#172233]">
                  Một bánh xe nhỏ. Một hành trình lớn.
                </h2>
                <p className="text-sm text-[#172233]/85 leading-relaxed">
                  Poster minh họa sáng tạo tôn vinh hành trình 5.111 sol (45,16 km) của tàu Opportunity trên Sao Hỏa — đồng hành cùng MV ca nhạc 03:41 tại khu Hành Trình.
                </p>
                <div className="no-print flex flex-wrap gap-2.5 pt-1">
                  <a
                    href={littleWheelsPosterUrl}
                    download="LITTLE_WHEELS_Opportunity_Poster.png"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C96F46] hover:bg-[#B45E37] text-white font-mono text-xs font-bold rounded-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải Poster PNG Gốc</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => onNavigate('/hanh-trinh?mission=opportunity&format=multimedia')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#07111F] hover:bg-[#14243A] text-[#C5A46A] font-mono text-xs rounded-xs cursor-pointer transition-colors"
                  >
                    <span>Xem MV &amp; Đa Phương Tiện →</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {missionId === 'surveyor-3' && (
          <section className="px-6 py-6 border-b border-[#172233]/15 bg-[#ECE8DD]">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-5">
                <figure className="bg-[#07111F] border border-[#C5A46A]/50 rounded-xs overflow-hidden shadow-md">
                  <img
                    src={surveyorComicCoverUrl}
                    alt="Bìa Truyện Tranh Surveyor 3: Người bạn cô độc trên Mặt Trăng"
                    className="w-full object-contain max-h-64 bg-[#07111F]"
                  />
                  <figcaption className="px-3 py-1.5 font-mono text-[10px] text-[#C5A46A] bg-[#0D1B2E]">
                    Truyện tranh 15 trang · Chuyển thể sáng tạo từ tư liệu NASA
                  </figcaption>
                </figure>
              </div>
              <div className="sm:col-span-7 space-y-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#9A4A27] font-bold">
                  <BookOpen className="w-4 h-4" />
                  <span>Truyện Tranh 15 Trang &amp; Sách PDF</span>
                </span>
                <h2 className="font-display text-2xl font-bold text-[#172233]">
                  SURVEYOR 3 — Người Bạn Cô Độc Trên Mặt Trăng (1967–1969)
                </h2>
                <p className="text-sm text-[#172233]/85 leading-relaxed">
                  Tập truyện tranh 15 trang kể lại cú đáp 2 lần nảy xuống Oceanus Procellarum (20/04/1967), tay lấy mẫu đào rãnh 18 cm và cuộc hội ngộ lịch sử với phi hành gia Apollo 12 (11/1969).
                </p>
                <div className="no-print flex flex-wrap gap-2.5 pt-1">
                  <a
                    href={surveyorComicPdfUrl}
                    download="Surveyor_3_The_Lonely_Explorer_15Pages.pdf"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C96F46] hover:bg-[#B45E37] text-white font-mono text-xs font-bold rounded-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải Truyện PDF 15 Trang</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => onNavigate('/hanh-trinh?mission=surveyor-3&format=multimedia')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#07111F] hover:bg-[#14243A] text-[#C5A46A] font-mono text-xs rounded-xs cursor-pointer transition-colors"
                  >
                    <span>Đọc Trọn Bộ 15 Trang →</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Timeline */}
        <section className="px-6 py-6 border-b border-[#172233]/15">
          <h2 className="font-mono text-xs uppercase tracking-widest mb-4 text-[#9A4A27] font-bold">
            Mốc thời gian
          </h2>
          <ol className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {story.poster_timeline.map((t) => (
              <li key={t.date + t.label} className="p-3 bg-[#FFFFFF] border-t-3 border-[#C96F46] rounded-xs shadow-xs">
                <div className="font-display font-bold text-sm text-[#172233]">{t.date}</div>
                <div className="text-xs text-[#172233]/70 mt-0.5">{t.label}</div>
              </li>
            ))}
          </ol>
        </section>

        {/* Story in 6 lines */}
        <section className="px-6 py-6 border-b border-[#172233]/15">
          <h2 className="font-mono text-xs uppercase tracking-widest mb-4 text-[#7A5C1E] font-bold">
            Câu chuyện trong 6 chương
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {story.chapters.map((c) => (
              <li key={c.id} className="text-sm p-3 bg-[#FFFFFF] border border-[#172233]/10 rounded-xs shadow-xs">
                <span className="font-mono text-[10px] text-[#7A5C1E] font-bold block">{c.code}</span>
                <div className="font-display font-bold text-[#172233]">{c.title}</div>
                <p className="text-xs text-[#172233]/80 leading-relaxed mt-1">{c.narration.split('. ').slice(0, 2).join('. ')}.</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Footer */}
        <footer className="bg-[#07111F] text-[#E9EDF2] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#283A58]">
          <div>
            <p className="font-display text-lg font-bold text-[#C5A46A]">“{story.closing_line}”</p>
            <p className="font-mono text-[10px] text-[#A9B4C4] mt-1">
              Dữ liệu &amp; ảnh: NASA / JPL / Ames / JSC. Dự án giáo dục, không phải trang chính thức của NASA.
            </p>
          </div>
          <div className="font-mono text-[11px] text-[#E9EDF2] sm:text-right">
            <div className="text-[#A9B4C4]">Nghe toàn bộ câu chuyện tại:</div>
            <div className="break-all text-[#C5A46A]">{pageUrl}</div>
          </div>
        </footer>
      </article>

      <div className="no-print max-w-4xl mx-auto mt-6 text-center">
        <button
          type="button"
          onClick={() => onNavigate(`/hanh-trinh?mission=${missionId}`)}
          className="btn-primary-rust inline-flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-wider cursor-pointer"
        >
          <span>Nghe câu chuyện {story.machine_name}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PosterPage;
