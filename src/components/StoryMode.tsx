import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Pause, Play, Square, Headphones, Info } from 'lucide-react';
import { MACHINE_STORIES, StoryChapter } from '../data/stories';
import { NASA_MEDIA_CATALOG, NasaMediaItem } from '../data/museumData';
import { NasaImage } from './NasaImage';

interface StoryModeProps {
  storyId: 'opportunity' | 'pioneer-11' | 'surveyor-3';
  onOpenLightbox: (item: NasaMediaItem) => void;
}

const splitSentences = (text: string): string[] =>
  text
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

const pickVietnameseVoice = (): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  const vi = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith('vi'));
  if (vi.length === 0) return null;
  return vi.find((v) => /online|natural|hoaimy|namminh/i.test(v.name)) || vi[0];
};

export const StoryMode: React.FC<StoryModeProps> = ({ storyId, onOpenLightbox }) => {
  const story = MACHINE_STORIES[storyId];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(0.95);
  const [hasViVoice, setHasViVoice] = useState(true);
  const [statusText, setStatusText] = useState('');
  const queueTokenRef = useRef(0);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    if (!supported) return;
    const update = () => setHasViVoice(!!pickVietnameseVoice());
    update();
    window.speechSynthesis.addEventListener('voiceschanged', update);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', update);
      window.speechSynthesis.cancel();
    };
  }, [supported]);

  const stopAll = () => {
    queueTokenRef.current += 1;
    if (supported) window.speechSynthesis.cancel();
    setActiveIdx(null);
    setIsPaused(false);
    setStatusText('Đã dừng đọc.');
  };

  const chapterText = (ch: StoryChapter) =>
    `${ch.title}. ${ch.narration} Bộ phận liên quan: ${ch.hardware_part}. ${ch.hardware_to_science}`;

  const speakFrom = (startIdx: number, continuous: boolean) => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const token = ++queueTokenRef.current;
    const voice = pickVietnameseVoice();
    setIsPaused(false);

    const indices = continuous
      ? story.chapters.map((_, i) => i).filter((i) => i >= startIdx)
      : [startIdx];

    const segments: { idx: number; text: string }[] = [];
    if (continuous && startIdx === 0) {
      splitSentences(story.intro).forEach((t) => segments.push({ idx: 0, text: t }));
    }
    indices.forEach((i) => {
      splitSentences(chapterText(story.chapters[i])).forEach((t) => segments.push({ idx: i, text: t }));
    });

    let pos = 0;
    const next = () => {
      if (token !== queueTokenRef.current) return;
      if (pos >= segments.length) {
        setActiveIdx(null);
        setStatusText('Đã đọc xong.');
        return;
      }
      const seg = segments[pos++];
      const u = new SpeechSynthesisUtterance(seg.text);
      u.lang = 'vi-VN';
      if (voice) u.voice = voice;
      u.rate = rate;
      u.onstart = () => {
        if (token !== queueTokenRef.current) return;
        setActiveIdx(seg.idx);
        setStatusText(`Đang đọc: ${story.chapters[seg.idx].code} — ${story.chapters[seg.idx].title}`);
      };
      u.onend = next;
      u.onerror = next;
      window.speechSynthesis.speak(u);
    };
    next();
  };

  const togglePause = () => {
    if (!supported) return;
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setStatusText('Tiếp tục đọc.');
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setStatusText('Đã tạm dừng.');
    }
  };

  const isSpeaking = activeIdx !== null;

  return (
    <section
      id="cau-chuyen"
      aria-labelledby={`story-title-${story.id}`}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8"
    >
      {/* Intro + Listen Controls */}
      <div className="bg-[#FFFFFF] border border-[#17212B]/15 p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest">
          <span className="px-2.5 py-0.5 text-[#FFFFFF] font-semibold" style={{ backgroundColor: story.accent }}>
            Lời kể sáng tác dựa trên dữ kiện
          </span>
          <span className="px-2.5 py-0.5 bg-[#10233D] text-[#F5F3ED] font-semibold">
            Minh họa giáo dục · Chế độ đọc/nghe
          </span>
          <span className="text-[#69737D]">Dành cho học sinh 10–15 tuổi · khoảng 5 phút nghe</span>
        </div>

        <h2 id={`story-title-${story.id}`} className="font-display text-2xl sm:text-3xl font-bold text-[#17212B]">
          “{story.tagline}”
        </h2>
        <p className="text-base sm:text-lg text-[#17212B]/85 leading-relaxed max-w-4xl">{story.intro}</p>

        <div className="p-4 bg-[#10233D] text-[#F5F3ED] space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#C88754]">
            <Headphones className="w-4 h-4" />
            <span>Chế độ nghe — dành cho mọi người, kể cả người khiếm thị</span>
          </div>

          {supported ? (
            <div className="flex flex-wrap items-center gap-3">
              {!isSpeaking ? (
                <button
                  type="button"
                  onClick={() => speakFrom(0, true)}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#C88754] hover:bg-[#b57644] text-[#FFFFFF] font-display text-sm font-semibold cursor-pointer"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>Nghe toàn bộ câu chuyện</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={togglePause}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#C88754] hover:bg-[#b57644] text-[#FFFFFF] font-display text-sm font-semibold cursor-pointer"
                  >
                    {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                    <span>{isPaused ? 'Tiếp tục' : 'Tạm dừng'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={stopAll}
                    className="inline-flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-[#F5F3ED] border border-white/20 font-display text-sm cursor-pointer"
                  >
                    <Square className="w-4 h-4" />
                    <span>Dừng</span>
                  </button>
                </>
              )}

              <label className="inline-flex items-center gap-2 font-mono text-xs text-[#E9E9E5]">
                <span>Tốc độ đọc</span>
                <select
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="bg-[#0B192E] border border-white/25 px-2 py-1.5 text-[#F5F3ED]"
                >
                  <option value={0.8}>Chậm</option>
                  <option value={0.95}>Vừa</option>
                  <option value={1.15}>Nhanh</option>
                </select>
              </label>
            </div>
          ) : (
            <p className="text-sm text-[#E9E9E5]">
              Trình duyệt này chưa hỗ trợ đọc thành tiếng. Toàn bộ lời kể vẫn hiển thị bên dưới để trình đọc màn hình có thể đọc.
            </p>
          )}

          {supported && !hasViVoice && (
            <p className="text-xs text-[#E9E9E5]/85 flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#C88754]" />
              <span>
                Máy này chưa có giọng đọc tiếng Việt. Hãy mở web bằng Microsoft Edge (có sẵn giọng Hoài My), hoặc cài gói ngôn ngữ tiếng Việt trong Cài đặt Windows.
              </span>
            </p>
          )}

          <p aria-live="polite" className="font-mono text-[11px] text-[#AEB8C1] min-h-[1em]">
            {statusText}
          </p>
        </div>

        <p className="font-mono text-[11px] text-[#69737D] bg-[#F5F3ED] p-3 border-l-4 border-[#C88754]">
          <strong className="text-[#17212B]">Nhãn minh bạch — Lời kể sáng tác dựa trên dữ kiện:</strong> Phần độc thoại ngôi thứ nhất dưới đây là <em>Lời kể sáng tác dựa trên dữ kiện</em> (không phải lời nhắn thật của robot) nhằm giúp học sinh dễ tiếp cận. Mọi mốc ngày tháng, số liệu và khám phá đều đối chiếu từ tư liệu chính thức của NASA.
        </p>
      </div>

      {/* Chapters */}
      <ol className="space-y-6">
        {story.chapters.map((ch, idx) => {
          const media = NASA_MEDIA_CATALOG[ch.media_id];
          const isActive = activeIdx === idx;
          return (
            <li
              key={ch.id}
              id={ch.id}
              className={`bg-[#FFFFFF] border p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start transition-colors ${
                isActive ? 'border-[#C88754] ring-2 ring-[#C88754]/30' : 'border-[#17212B]/15'
              }`}
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-widest" style={{ color: story.accent }}>
                    {ch.code}
                  </span>
                  {supported && (
                    <button
                      type="button"
                      onClick={() => (isActive ? stopAll() : speakFrom(idx, false))}
                      aria-label={isActive ? `Dừng đọc chương ${ch.title}` : `Nghe chương ${ch.title}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F3ED] hover:bg-[#10233D] hover:text-[#F5F3ED] border border-[#17212B]/15 font-mono text-xs cursor-pointer"
                    >
                      {isActive ? <Square className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isActive ? 'Dừng' : 'Nghe chương này'}</span>
                    </button>
                  )}
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#17212B]">{ch.title}</h3>
                <p className="text-base sm:text-lg text-[#17212B] leading-relaxed">{ch.narration}</p>

                <div className="p-4 bg-[#F5F3ED] border-l-4 space-y-1" style={{ borderColor: story.accent }}>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-[#69737D]">
                    Phần cứng → Khoa học: {ch.hardware_part}
                  </div>
                  <p className="text-sm text-[#17212B] leading-relaxed">{ch.hardware_to_science}</p>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {ch.facts.map((f) => (
                    <div key={f.label} className="p-3 bg-[#FFFFFF] border border-[#17212B]/12">
                      <dt className="font-mono text-[10px] uppercase text-[#69737D]">{f.label}</dt>
                      <dd className="font-display text-sm font-bold text-[#17212B] mt-0.5">{f.value}</dd>
                    </div>
                  ))}
                </dl>

                <details className="text-xs text-[#69737D]">
                  <summary className="cursor-pointer font-mono">Nguồn tư liệu</summary>
                  <p className="mt-1 font-mono">{ch.source_ids.join(' · ')} (xem chi tiết ở trang Về dự án)</p>
                </details>
              </div>

              <div className="lg:col-span-5">
                {media && <NasaImage item={media} onOpenLightbox={onOpenLightbox} aspectRatio="video" compactCaption />}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="text-center font-display text-xl font-bold text-[#17212B]">“{story.closing_line}”</p>
    </section>
  );
};
