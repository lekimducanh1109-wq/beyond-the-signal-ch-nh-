import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  X,
  Headphones,
  FileText,
  ChevronDown,
  ChevronUp,
  Clock,
  Info,
  Volume2
} from 'lucide-react';
import { MACHINE_STORIES } from '../data/stories';

/**
 * Flag indicating whether a verified audio recording exists for the Opportunity story.
 * Strictly set to false to prevent faking audio when no audio asset is present in the repository.
 */
export const STORY_AUDIO_AVAILABLE: boolean = false;

export interface StoryAudioPlayerProps {
  open: boolean;
  onClose: () => void;
  returnFocusRef?: React.RefObject<HTMLElement>;
  audioSrc?: string;
  initialMachineId?: 'opportunity' | 'pioneer-11' | 'surveyor-3';
  lang?: 'vi' | 'en';
}

const PLAYBACK_RATES = [0.75, 1, 1.25, 1.5];

export const StoryAudioPlayer: React.FC<StoryAudioPlayerProps> = ({
  open,
  onClose,
  returnFocusRef,
  audioSrc,
  initialMachineId = 'opportunity',
  lang = 'vi'
}) => {
  const [selectedMachine, setSelectedMachine] = useState<'opportunity' | 'pioneer-11' | 'surveyor-3'>(initialMachineId);

  useEffect(() => {
    if (initialMachineId) {
      setSelectedMachine(initialMachineId);
    }
  }, [initialMachineId]);

  // Active story transcript from authentic museum data
  const story = MACHINE_STORIES[selectedMachine] || MACHINE_STORIES.opportunity;
  const isEn = lang === 'en';

  // Real audio presence check: only enable playback controls if a genuine audio asset is provided
  const hasAudio = Boolean(audioSrc && (STORY_AUDIO_AVAILABLE || audioSrc.length > 0));

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  // Default transcript open when audio is pending so users can read the narrative immediately
  const [showTranscript, setShowTranscript] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Time formatters: MM:SS for display (font-mono only)
  const formatTime = (secs: number): string => {
    if (!secs || isNaN(secs) || secs < 0) return '00:00';
    const total = Math.floor(secs);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Vietnamese aria-valuetext for accessibility / screen readers
  const formatAriaTime = (secs: number): string => {
    if (!secs || isNaN(secs) || secs < 0) return '0 phút 0 giây';
    const total = Math.floor(secs);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m} phút ${s} giây`;
  };

  // Focus management and Keyboard handling (Esc closes, Focus trap, Focus return)
  useEffect(() => {
    if (open) {
      // Store currently focused element before opening
      previousFocusRef.current = document.activeElement as HTMLElement | null;

      // Lock body scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Move focus into the dialog
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }

        // Focus trap
        if (e.key === 'Tab' && dialogRef.current) {
          const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;

          const firstElem = focusable[0];
          const lastElem = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElem) {
              e.preventDefault();
              lastElem.focus();
            }
          } else {
            if (document.activeElement === lastElem) {
              e.preventDefault();
              firstElem.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;

        // Restore focus on close
        if (returnFocusRef && returnFocusRef.current) {
          returnFocusRef.current.focus();
        } else if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [open, onClose, returnFocusRef]);

  // Audio element event bindings
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [hasAudio]);

  // Controls handlers
  const togglePlayPause = () => {
    if (!hasAudio || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasAudio || !audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#050B18]/85 backdrop-blur-md"
      onClick={onClose}
      aria-hidden="false"
    >
      {/* Dialog container: Solid Navy #0A142D, Cyan & Amber borders */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-audio-dialog-title"
        aria-describedby="story-audio-dialog-desc"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0A142D] border border-[#22D3EE]/35 rounded-lg shadow-[0_0_35px_rgba(34,211,238,0.18)] text-[#E2E8F0] overflow-hidden flex flex-col max-h-[90vh] transition-all"
      >
        {/* Subtle Decorative Ambient Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 400px 200px at 50% 0%, rgba(34,211,238,0.15) 0%, transparent 70%), radial-gradient(ellipse 300px 150px at 90% 90%, rgba(245,158,11,0.12) 0%, transparent 65%)'
          }}
          aria-hidden="true"
        />

        {/* Hidden native audio element */}
        {hasAudio && (
          <audio ref={audioRef} src={audioSrc} preload="metadata" />
        )}

        {/* Header Bar */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 border-b border-[#22D3EE]/25 bg-[#071026]/90 gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-[#22D3EE]/15 border border-[#22D3EE]/40 rounded text-[#38BDF8]">
              <Headphones className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#38BDF8] font-semibold">
                  {isEn ? "Audio Archive · Narrative Story" : "Tư liệu âm thanh · Câu chuyện nhập vai"}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F59E0B]/20 text-[#FBBF24] border border-[#F59E0B]/40">
                  {hasAudio ? (isEn ? "Audio Ready" : "Sẵn sàng") : (isEn ? "Narrative Available" : "Lời kể lưu trữ")}
                </span>
              </div>
              <h2
                id="story-audio-dialog-title"
                className="font-display text-lg sm:text-xl font-bold text-[#F8FAFC] tracking-tight mt-0.5"
              >
                {isEn ? `Story of ${story.machine_name}` : `Câu chuyện ${story.machine_name}`}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Machine Switcher Tabs */}
            <div className="flex items-center bg-[#050C1F] border border-[#22D3EE]/30 rounded p-0.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => setSelectedMachine('opportunity')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  selectedMachine === 'opportunity'
                    ? 'bg-[#0E204A] text-[#FBBF24] font-semibold shadow-sm'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                }`}
              >
                Opportunity
              </button>
              <button
                type="button"
                onClick={() => setSelectedMachine('pioneer-11')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  selectedMachine === 'pioneer-11'
                    ? 'bg-[#0E204A] text-[#FBBF24] font-semibold shadow-sm'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                }`}
              >
                Pioneer 11
              </button>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={isEn ? "Close audio player dialog (Esc)" : "Đóng cửa sổ trình phát âm thanh (Esc)"}
              className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#22D3EE]/15 border border-transparent hover:border-[#22D3EE]/40 rounded-md transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Area (Scrollable if transcript is long) */}
        <div className="relative z-10 p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Tagline / Subtitle */}
          <p
            id="story-audio-dialog-desc"
            className="text-[15px] sm:text-base text-[#CBD5E1] italic border-l-2 border-[#F59E0B] pl-3 py-0.5 leading-relaxed"
          >
            “{story.tagline}”
          </p>

          {/* Genuine Audio Status Notice */}
          {!hasAudio && (
            <div
              role="status"
              className="p-4 bg-[#071026]/95 border border-[#F59E0B]/50 rounded-md shadow-inner flex items-start gap-3"
            >
              <Info className="w-5 h-5 text-[#FBBF24] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-[15px] font-semibold text-[#FBBF24]">
                  {isEn ? "Narrative Transcript Available (Authentic NASA Data)" : "Bản chép lời lưu trữ sẵn sàng (Dữ kiện NASA đối chiếu)"}
                </div>
                <p className="text-[15px] text-[#CBD5E1] leading-relaxed">
                  {isEn
                    ? "Beyond The Signal uses strictly verified archival audio and does not emit fake simulated telemetry. You can read the complete first-person narrative chapter-by-chapter in the transcript below."
                    : "Bảo tàng kiên quyết sử dụng tư liệu âm thanh chuẩn xác và không phát âm thanh mô phỏng / giả lập. Quý khách có thể đón đọc toàn bộ lời kể chi tiết theo từng chặng hành trình ở phần bản chép lời (transcript) bên dưới."}
                </p>
              </div>
            </div>
          )}

          {/* Player Controls Deck */}
          <div className="p-4 sm:p-5 bg-[#060D20] border border-[#22D3EE]/30 rounded-lg space-y-4 shadow-sm">
            {/* Progress Bar & Timers */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                <span className="font-mono text-xs sm:text-sm text-[#38BDF8]">
                  {formatTime(currentTime)}
                </span>
                <span className="font-mono text-xs sm:text-sm text-[#94A3B8]">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Accessible Range Input */}
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                disabled={!hasAudio}
                aria-label="Thanh tua âm thanh câu chuyện"
                aria-valuemin={0}
                aria-valuemax={duration || 100}
                aria-valuenow={currentTime}
                aria-valuetext={`Thời gian hiện tại ${formatAriaTime(currentTime)} trên tổng số ${formatAriaTime(duration)}`}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#0A1A3A] accent-[#22D3EE] focus:outline-none focus:ring-2 focus:ring-[#22D3EE] ${
                  !hasAudio ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              />
            </div>

            {/* Play/Pause & Speed Buttons Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={togglePlayPause}
                disabled={!hasAudio}
                aria-label={
                  !hasAudio
                    ? 'Chưa có bản ghi âm (Sắp ra mắt)'
                    : isPlaying
                    ? 'Tạm dừng phát âm thanh'
                    : 'Phát âm thanh câu chuyện'
                }
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-[15px] transition-all focus:outline-none focus:ring-2 focus:ring-[#22D3EE] ${
                  hasAudio
                    ? 'bg-[#22D3EE] hover:bg-[#38BDF8] text-[#070E1E] cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.35)]'
                    : 'bg-[#102040] text-[#64748B] border border-[#22D3EE]/20 cursor-not-allowed'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Tạm dừng</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>{hasAudio ? 'Phát âm thanh' : 'Chưa có âm thanh'}</span>
                  </>
                )}
              </button>

              {/* Playback Speed Controls */}
              <div
                className="flex items-center gap-1 bg-[#0A142D] border border-[#22D3EE]/30 p-1 rounded-md"
                role="group"
                aria-label="Tùy chọn tốc độ phát"
              >
                <span className="text-xs text-[#94A3B8] px-2 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Tốc độ:</span>
                </span>
                {PLAYBACK_RATES.map((rate) => {
                  const isActive = playbackRate === rate;
                  return (
                    <button
                      key={rate}
                      type="button"
                      disabled={!hasAudio}
                      onClick={() => handleSpeedChange(rate)}
                      aria-pressed={isActive}
                      aria-label={`Tốc độ phát ${rate} lần`}
                      className={`px-2.5 py-1 text-xs font-mono rounded transition-colors focus:outline-none focus:ring-1 focus:ring-[#22D3EE] ${
                        !hasAudio
                          ? 'text-[#475569] cursor-not-allowed'
                          : isActive
                          ? 'bg-[#F59E0B] text-[#070E1E] font-bold shadow-sm'
                          : 'text-[#CBD5E1] hover:text-[#F8FAFC] hover:bg-[#22D3EE]/15'
                      }`}
                    >
                      {rate}x
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Transcript Toggle & Section */}
          <div className="border border-[#22D3EE]/25 rounded-lg overflow-hidden bg-[#071128]/80">
            <button
              type="button"
              onClick={() => setShowTranscript(!showTranscript)}
              aria-expanded={showTranscript}
              aria-controls="story-audio-transcript"
              className="w-full flex items-center justify-between px-4 py-3 bg-[#0A142D] hover:bg-[#112044] text-left transition-colors cursor-pointer border-b border-[#22D3EE]/20 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
            >
              <div className="flex items-center gap-2 text-[15px] font-semibold text-[#F8FAFC]">
                <FileText className="w-4 h-4 text-[#FBBF24]" />
                <span>Toàn văn lời kể (Transcript)</span>
                <span className="font-mono text-xs text-[#38BDF8] ml-1">
                  ({story.chapters.length} chương hành trình)
                </span>
              </div>
              <span className="p-1 text-[#38BDF8]">
                {showTranscript ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </span>
            </button>

            {showTranscript && (
              <div
                id="story-audio-transcript"
                className="p-4 sm:p-5 space-y-4 max-h-[38vh] overflow-y-auto divide-y divide-[#22D3EE]/15 text-[#E2E8F0]"
              >
                {/* Intro */}
                <div className="pb-3 text-[15px] text-[#E2E8F0] leading-relaxed">
                  <div className="font-mono text-xs uppercase tracking-wider text-[#38BDF8] font-bold mb-1">
                    {story.narrative_badge}
                  </div>
                  <p>{story.intro}</p>
                </div>

                {/* 6 Chapters */}
                {story.chapters.map((ch) => (
                  <div key={ch.id} className="pt-3.5 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#FBBF24] font-semibold">
                        {ch.code}
                      </span>
                      <span className="text-xs text-[#94A3B8]">·</span>
                      <h3 className="font-display text-[15px] font-bold text-[#F8FAFC]">
                        {ch.title}
                      </h3>
                    </div>
                    <p className="text-[15px] text-[#CBD5E1] leading-relaxed">
                      {ch.narration}
                    </p>
                  </div>
                ))}

                {/* Closing */}
                <div className="pt-3 text-xs sm:text-[13px] font-mono text-[#38BDF8] italic text-right">
                  “{story.closing_line}”
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Bar */}
        <div className="relative z-10 flex items-center justify-between px-5 py-3 border-t border-[#22D3EE]/25 bg-[#071026]/90 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Volume2 className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{isEn ? "Archival source: NASA / JPL-Caltech / Ames" : "Nguồn tư liệu: NASA / JPL-Caltech / Ames"}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 bg-[#0B1736] hover:bg-[#22D3EE]/20 hover:text-[#F8FAFC] border border-[#22D3EE]/30 text-[#CBD5E1] text-xs font-semibold rounded transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#22D3EE]"
          >
            {isEn ? "Close Window" : "Đóng cửa sổ"}
          </button>
        </div>
      </div>
    </div>
  );
};
