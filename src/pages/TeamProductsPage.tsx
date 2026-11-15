import React, { useState } from 'react';
import { ArrowRight, Headphones, Printer, Sparkles, BookOpen, Film } from 'lucide-react';
import { TeamProducts } from '../components/TeamProducts';
import { MACHINE_STORIES } from '../data/stories';

interface TeamProductsPageProps {
  onNavigate: (route: string) => void;
  lang?: 'vi' | 'en';
}

export const TeamProductsPage: React.FC<TeamProductsPageProps> = ({ onNavigate, lang = 'vi' }) => {
  const [activeMission, setActiveMission] = useState<'opportunity' | 'surveyor-3' | 'pioneer-11' | 'all'>('all');
  const isEn = lang === 'en';

  return (
    <div className="bg-[#060912] text-[#F0EDE5] min-h-screen">
      <section className="relative overflow-hidden bg-[#0B1422] border-b border-[#AAB8C7]/15 py-12 px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 900px 420px at 70% 0%, rgba(210,160,113,0.12) 0%, transparent 65%), radial-gradient(ellipse 700px 380px at 15% 85%, rgba(22,42,64,0.65) 0%, transparent 60%)'
          }}
        />

        <div className="max-w-7xl mx-auto space-y-5 relative z-10">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#D2A071] font-bold">
            <Sparkles className="w-4 h-4 text-[#D2A071]" />
            <span className="bg-[#101E30] px-3 py-1 border border-[#D2A071]/35 rounded-xs">
              {isEn ? 'HUMAN EXPRESSIONS GALLERY · ARTS & STORY STUDIO' : 'KHÔNG GIAN NGHỆ THUẬT & TRUYỀN THÔNG · HUMAN EXPRESSIONS GALLERY'}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#F0EDE5]">
            {isEn ? 'One Scientific Story, Many Ways to Feel It' : 'Một câu chuyện khoa học, nhiều cách để cảm nhận'}
          </h1>
          <p className="text-base sm:text-lg text-[#AAB8C7] max-w-3xl leading-relaxed">
            {isEn ? (
              <>
                Experience the <strong className="text-[#F0EDE5]">MV &amp; Poster “LITTLE WHEELS”</strong> (Opportunity), the <strong className="text-[#F0EDE5]">15-page Graphic Novel “The Lonely Explorer of the Moon”</strong> (Surveyor 3), and the <strong className="text-[#F0EDE5]">Pioneer 11 Storyboard</strong> — all original artistic interpretations strictly grounded in verified NASA science.
              </>
            ) : (
              <>
                Thưởng thức <strong className="text-[#F0EDE5]">MV &amp; Poster “LITTLE WHEELS”</strong> (Opportunity), <strong className="text-[#F0EDE5]">Truyện tranh 15 trang “Người bạn cô độc trên Mặt Trăng”</strong> (Surveyor 3) và <strong className="text-[#F0EDE5]">Storyboard Pioneer 11</strong> — mọi tác phẩm nghệ thuật đều bám sát tư liệu NASA.
              </>
            )}
          </p>

          {/* 3-Mission Filter & Deep Links */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setActiveMission('all')}
              className={`px-4 py-2 font-mono text-xs uppercase rounded-xs cursor-pointer transition-colors border ${
                activeMission === 'all'
                  ? 'bg-[#F0EDE5] text-[#060912] border-[#F0EDE5] font-bold'
                  : 'bg-[#101E30] text-[#AAB8C7] border-[#AAB8C7]/20 hover:border-[#D2A071]/60 hover:text-[#F0EDE5]'
              }`}
            >
              {isEn ? 'All (3 Missions)' : 'Tất cả (3 sứ mệnh)'}
            </button>
            <button
              type="button"
              onClick={() => setActiveMission('opportunity')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 font-mono text-xs uppercase rounded-xs cursor-pointer transition-colors border ${
                activeMission === 'opportunity'
                  ? 'bg-[#C96F46] text-[#F0EDE5] border-[#C96F46] font-bold'
                  : 'bg-[#101E30] text-[#AAB8C7] border-[#AAB8C7]/20 hover:border-[#C96F46]/60 hover:text-[#F0EDE5]'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Opportunity · {isEn ? 'MV & Poster' : 'MV & Poster'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMission('surveyor-3')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 font-mono text-xs uppercase rounded-xs cursor-pointer transition-colors border ${
                activeMission === 'surveyor-3'
                  ? 'bg-[#D2A071] text-[#060912] border-[#D2A071] font-bold'
                  : 'bg-[#101E30] text-[#AAB8C7] border-[#AAB8C7]/20 hover:border-[#D2A071]/60 hover:text-[#F0EDE5]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Surveyor 3 · {isEn ? '15-Page Graphic Novel' : 'Truyện 15 trang'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMission('pioneer-11')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 font-mono text-xs uppercase rounded-xs cursor-pointer transition-colors border ${
                activeMission === 'pioneer-11'
                  ? 'bg-[#F0EDE5] text-[#060912] border-[#F0EDE5] font-bold'
                  : 'bg-[#101E30] text-[#AAB8C7] border-[#AAB8C7]/20 hover:border-[#D2A071]/60 hover:text-[#F0EDE5]'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Pioneer 11 · {isEn ? 'Storyboard & Audio' : 'Storyboard'}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {(['opportunity', 'surveyor-3', 'pioneer-11'] as const).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(`/poster/${id}`)}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#162A40] hover:bg-[#21374D] border border-[#D2A071]/35 text-[#F0EDE5] font-mono text-[11px] uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-[#D2A071]" />
                <span>{isEn ? `Poster ${MACHINE_STORIES[id].machine_name}` : `Poster ${MACHINE_STORIES[id].machine_name}`}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {(activeMission === 'all' || activeMission === 'opportunity') && (
        <TeamProducts missionId="opportunity" lang={lang} onNavigate={onNavigate} />
      )}
      {(activeMission === 'all' || activeMission === 'surveyor-3') && (
        <TeamProducts missionId="surveyor-3" initialTab="comic" lang={lang} onNavigate={onNavigate} />
      )}
      {(activeMission === 'all' || activeMission === 'pioneer-11') && (
        <TeamProducts missionId="pioneer-11" lang={lang} onNavigate={onNavigate} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-4 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigate('/hanh-trinh')}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#D2A071] hover:text-[#F0EDE5] font-bold cursor-pointer transition-colors"
        >
          <span>{isEn ? 'Open Part 01 · Visual Storytelling Journeys' : 'Mở Phần 01 · Hành trình Kể chuyện Trực quan'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onNavigate('/mo-phong?mission=surveyor-3')}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#D2A071] hover:text-[#F0EDE5] font-bold cursor-pointer transition-colors"
        >
          <span>{isEn ? 'Open Part 02 · Simulations Lab (Opportunity, Pioneer 11 & Surveyor 3)' : 'Mở Phần 02 · Phòng Mô phỏng (Opportunity, Pioneer 11 & Surveyor 3)'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
