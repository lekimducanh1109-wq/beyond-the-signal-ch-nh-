import React, { useState, useEffect, useRef } from 'react';
import { YoungExplorerSubmission, NASA_MEDIA_CATALOG, NasaMediaItem } from '../data/museumData';
import { X, ExternalLink, Radio, Cpu, BookOpen, Sparkles } from 'lucide-react';
import { NasaImage } from './NasaImage';

interface SubmissionDetailModalProps {
  submission: YoungExplorerSubmission | null;
  onClose: () => void;
  onOpenLightbox?: (item: NasaMediaItem) => void;
}

const CATEGORY_LABELS: Record<YoungExplorerSubmission['category'], { en: string; vi: string; bg: string }> = {
  verified_fact: {
    en: 'Verified Fact',
    vi: 'Dữ kiện đối chiếu nguồn NASA',
    bg: 'bg-[#07111F] text-[#E9EDF2]'
  },
  scientific_interpretation: {
    en: 'Scientific Interpretation',
    vi: 'Diễn giải khoa học',
    bg: 'bg-[#14243A] text-[#C5A46A]'
  },
  artistic_expression: {
    en: 'Artistic Expression',
    vi: 'Biểu đạt nghệ thuật',
    bg: 'bg-[#C96F46] text-[#07111F]'
  },
  fiction_reconstruction: {
    en: 'Fiction or Creative Reconstruction',
    vi: 'Tái dựng sáng tạo / Giả tưởng',
    bg: 'bg-[#7A5C1E] text-[#F3F0E8]'
  }
};

export const SubmissionDetailModal: React.FC<SubmissionDetailModalProps> = ({
  submission,
  onClose,
  onOpenLightbox
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioStep, setAudioStep] = useState(0);
  const [comicPage, setComicPage] = useState(0);
  const [rotationDeg, setRotationDeg] = useState(28);
  const [animProgress, setAnimProgress] = useState(45);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setComicPage(0);
    setIsPlayingAudio(false);
    setAudioStep(0);
    return () => {
      if (audioTimerRef.current) window.clearInterval(audioTimerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, [submission]);

  if (!submission) return null;

  const badge = CATEGORY_LABELS[submission.category];
  const previewMedia = submission.preview_media_id ? NASA_MEDIA_CATALOG[submission.preview_media_id] : null;

  const togglePlayAudio = () => {
    if (isPlayingAudio) {
      if (audioTimerRef.current) window.clearInterval(audioTimerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      setIsPlayingAudio(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      const notes = submission.audio_Select_hz || [220, 277.18, 329.63, 440, 329.63, 246.94, 196, 146.83];
      let idx = 0;
      setIsPlayingAudio(true);

      const playTone = (freq: number) => {
        if (!audioCtxRef.current) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.68);
      };

      playTone(notes[0]);
      audioTimerRef.current = window.setInterval(() => {
        idx = (idx + 1) % notes.length;
        setAudioStep(idx);
        playTone(notes[idx]);
      }, 750);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17212B]/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FFFFFF] border border-[#17212B]/15 text-[#17212B] shadow-2xl my-8 overflow-hidden">
        {/* Top Bar */}
        <div className="px-6 py-4 bg-[#F5F3ED] border-b border-[#17212B]/10 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`px-2.5 py-0.5 font-mono text-[11px] font-semibold ${badge.bg}`}>
                {badge.en} · {badge.vi}
              </span>
              <span className="px-2 py-0.5 bg-[#E9E9E5] font-mono text-[11px] text-[#17212B]">
                {submission.submission_type}
              </span>
              <span className="font-mono text-[11px] text-[#567B9D]">
                Nhiệm vụ: {submission.related_mission}
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#17212B]">
              {submission.title}
            </h3>
            <p className="text-xs text-[#69737D] mt-0.5">
              Tác giả: <strong className="text-[#17212B]">{submission.creator_alias}</strong> · {submission.age_or_grade} · Ngày đăng: {submission.created_at}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#69737D] hover:text-[#17212B] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Viewer Section by Type */}
        <div className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
          {/* 1. Image / Poster */}
          {submission.submission_type === 'Tranh / Poster' && previewMedia && (
            <NasaImage
              item={previewMedia}
              onOpenLightbox={onOpenLightbox}
              aspectRatio="video"
            />
          )}

          {/* 2. Audio Player */}
          {submission.submission_type === 'Audio' && (
            <div className="p-6 deep-space-threshold border border-[#AEB8C1]/20 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#C88754] text-[#FFFFFF] flex items-center justify-center">
                    <Radio className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#AEB8C1]">
                      TRÌNH PHÁT ÂM THANH TỔNG HỢP (WEB AUDIO SYNTHESIZER)
                    </p>
                    <h4 className="font-display text-base font-semibold text-[#F5F3ED]">
                      {submission.title} — {submission.creator_alias}
                    </h4>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={togglePlayAudio}
                  className="px-4 py-2 bg-[#C88754] hover:bg-[#b57644] text-[#FFFFFF] font-mono text-xs uppercase tracking-wider cursor-pointer"
                >
                  {isPlayingAudio ? 'Tạm dừng (Pause)' : 'Phát âm thanh (Play)'}
                </button>
              </div>

              {/* Frequency Bars */}
              <div className="grid grid-cols-8 gap-2 pt-2 items-end h-20 px-2 bg-[#0B192E]/70 border border-white/10">
                {(submission.audio_Select_hz || [220, 277, 330, 440, 330, 247, 196, 147]).map((hz, i) => {
                  const active = isPlayingAudio && audioStep === i;
                  const heightPct = Math.min(95, Math.max(25, Math.round((hz / 440) * 90)));
                  return (
                    <div key={i} className="flex flex-col items-center gap-1 h-full justify-end py-2">
                      <div
                        style={{ height: `${active ? 95 : heightPct}%` }}
                        className={`w-full transition-all duration-300 ${
                          active ? 'bg-[#C88754]' : 'bg-[#567B9D]/50'
                        }`}
                      />
                      <span className="font-mono text-[10px] text-[#AEB8C1]">{Math.round(hz)}Hz</span>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-[11px] text-[#AEB8C1]">
                Mô phỏng 2 mốc tín hiệu độc lập của Pioneer 11: Liên lạc cuối NASA Ames (30/09/1995) & Dữ liệu kỹ thuật cuối (24/11/1995).
              </p>
            </div>
          )}

          {/* 3. Video / Animation */}
          {submission.submission_type === 'Video / Animation' && (
            <div className="p-6 deep-space-threshold border border-[#AEB8C1]/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#C88754]">
                  MÔ PHỎNG QUỸ ĐẠO FLYBY SAO THỔ & GÓC CHỤP TITAN (01/09/1979)
                </span>
                <span className="font-mono text-xs text-[#AEB8C1]">
                  Cự ly ảnh chụp: ~2.846.000 km
                </span>
              </div>

              <div className="relative h-56 bg-[#081324] border border-white/15 overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 600 220" className="w-full h-full">
                  {/* Saturn & Rings */}
                  <ellipse cx="310" cy="110" rx="92" ry="28" fill="none" stroke="#B48B4D" strokeWidth="4" opacity="0.65" />
                  <ellipse cx="310" cy="110" rx="112" ry="34" fill="none" stroke="#AEB8C1" strokeWidth="1.5" strokeDasharray="4 3" />
                  <circle cx="310" cy="110" r="36" fill="#C88754" />
                  <text x="310" y="165" textAnchor="middle" fill="#F5F3ED" fontSize="11" fontFamily="monospace">
                    Sao Thổ & Vành F
                  </text>
                  {/* Titan */}
                  <circle cx="465" cy="64" r="9" fill="#B48B4D" />
                  <text x="465" y="46" textAnchor="middle" fill="#AEB8C1" fontSize="10" fontFamily="monospace">
                    Titan
                  </text>
                  {/* Pioneer 11 Flyby Trajectory */}
                  <path
                    d="M 40 185 Q 250 190 355 85 T 560 25"
                    fill="none"
                    stroke="#567B9D"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                  {/* Spacecraft Marker based on animProgress */}
                  <circle
                    cx={40 + (animProgress / 100) * 500}
                    cy={185 - (animProgress / 100) * 155}
                    r="7"
                    fill="#F5F3ED"
                    stroke="#C88754"
                    strokeWidth="3"
                  />
                </svg>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-[#AEB8C1] shrink-0">Tiến trình Flyby:</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={animProgress}
                  onChange={(e) => setAnimProgress(Number(e.target.value))}
                  className="w-full accent-[#C88754]"
                />
                <span className="font-mono text-xs text-[#F5F3ED] w-12 text-right">{animProgress}%</span>
              </div>
            </div>
          )}

          {/* 4. Comic / PDF Reader */}
          {submission.submission_type === 'Truyện tranh / PDF' && submission.comic_panels && (
            <div className="p-6 bg-[#F5F3ED] border border-[#17212B]/15 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#567B9D] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  Trình đọc Truyện tranh / Tài liệu ({comicPage + 1} / {submission.comic_panels.length})
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={comicPage === 0}
                    onClick={() => setComicPage((p) => Math.max(0, p - 1))}
                    className="px-3 py-1 bg-[#FFFFFF] border border-[#17212B]/20 text-xs font-mono disabled:opacity-40 cursor-pointer"
                  >
                    ← Trang trước
                  </button>
                  <button
                    type="button"
                    disabled={comicPage === submission.comic_panels.length - 1}
                    onClick={() => setComicPage((p) => Math.min(submission.comic_panels!.length - 1, p + 1))}
                    className="px-3 py-1 bg-[#10233D] text-[#F5F3ED] text-xs font-mono disabled:opacity-40 cursor-pointer"
                  >
                    Trang tiếp →
                  </button>
                </div>
              </div>

              <div className="p-6 bg-[#FFFFFF] border border-[#17212B]/15 min-h-[160px] flex flex-col justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#C88754]">
                  KHUNG {submission.comic_panels[comicPage].panel} · {submission.comic_panels[comicPage].scene}
                </span>
                <p className="font-display text-lg text-[#17212B] my-4 leading-relaxed">
                  “{submission.comic_panels[comicPage].caption}”
                </p>
                <span className="font-mono text-[11px] text-[#69737D]">
                  Đối chiếu tư liệu: SRC-SUR-01, SRC-SUR-03 (Surveyor 3 & Apollo 12)
                </span>
              </div>
            </div>
          )}

          {/* 5. 3D Model Viewer */}
          {submission.submission_type === 'Mô hình 3D (GLB/GLTF)' && (
            <div className="p-6 deep-space-threshold border border-[#AEB8C1]/20 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#C88754] flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  Khung ngắm Mô hình Kỹ thuật 3D (Interactive Wireframe)
                </span>
                {submission.model_specs && (
                  <span className="font-mono text-[11px] text-[#AEB8C1]">
                    {submission.model_specs.format} · {submission.model_specs.poly_count}
                  </span>
                )}
              </div>

              <div className="h-56 bg-[#081324] border border-white/15 flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 400 220"
                  className="w-full h-full transition-transform duration-200"
                  style={{ transform: `rotateY(${rotationDeg}deg)` }}
                >
                  {/* High-gain Dish Antenna */}
                  <ellipse cx="200" cy="105" rx="75" ry="42" fill="none" stroke="#AEB8C1" strokeWidth="2" />
                  <ellipse cx="200" cy="105" rx="45" ry="24" fill="none" stroke="#567B9D" strokeWidth="1.5" strokeDasharray="4 2" />
                  {/* Feed tripod */}
                  <line x1="145" y1="90" x2="200" y2="45" stroke="#C88754" strokeWidth="2" />
                  <line x1="255" y1="90" x2="200" y2="45" stroke="#C88754" strokeWidth="2" />
                  <line x1="200" y1="145" x2="200" y2="45" stroke="#C88754" strokeWidth="2" />
                  {/* RTG Boom */}
                  <line x1="125" y1="115" x2="45" y2="155" stroke="#B48B4D" strokeWidth="2.5" />
                  <rect x="30" y="148" width="22" height="14" fill="#C88754" />
                  {/* Magnetometer Boom */}
                  <line x1="275" y1="100" x2="365" y2="55" stroke="#567B9D" strokeWidth="2" />
                  <circle cx="368" cy="53" r="6" fill="#567B9D" />
                </svg>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-[#AEB8C1] shrink-0">Góc xoay 3D:</span>
                <input
                  type="range"
                  min={-60}
                  max={60}
                  value={rotationDeg}
                  onChange={(e) => setRotationDeg(Number(e.target.value))}
                  className="w-full accent-[#C88754]"
                />
                <span className="font-mono text-xs text-[#F5F3ED] w-12 text-right">{rotationDeg}°</span>
              </div>
            </div>
          )}

          {/* 6. Editorial Story */}
          {submission.submission_type === 'Truyện / Bài viết' && submission.story_paragraphs && (
            <div className="p-6 bg-[#F5F3ED] border border-[#17212B]/15 space-y-4">
              {submission.story_paragraphs.map((para, idx) => (
                <p key={idx} className="text-sm sm:text-base text-[#17212B] leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          )}

          {/* Artist Statement & Epistemic Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#F5F3ED] border border-[#17212B]/10">
              <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-[#17212B] mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C88754]" />
                <span>Lời giới thiệu của tác giả (Artist Statement)</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#69737D] leading-relaxed">
                {submission.artist_statement_vi}
              </p>
            </div>

            <div className="p-4 bg-[#F5F3ED] border border-[#17212B]/10 space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-wider font-semibold text-[#17212B]">
                Góc suy ngẫm & Nguồn đối chiếu
              </h4>
              {submission.reflection_prompts_responses.map((item, i) => (
                <div key={i} className="text-xs leading-relaxed">
                  <p className="font-semibold text-[#17212B]">{item.prompt}</p>
                  <p className="text-[#69737D] mt-0.5">{item.response}</p>
                </div>
              ))}
              {submission.optional_source && (
                <div className="pt-2 border-t border-[#17212B]/10">
                  <a
                    href={submission.optional_source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-[#567B9D] hover:text-[#17212B] underline underline-offset-4"
                  >
                    <span>Xem trang tư liệu NASA liên kết</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
