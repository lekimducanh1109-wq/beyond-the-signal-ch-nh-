import React, { useState } from 'react';
import { NasaMediaItem } from '../data/museumData';
import { ExternalLink, Maximize2, Info, ShieldCheck, Check } from 'lucide-react';

interface NasaImageProps {
  item: NasaMediaItem;
  onOpenLightbox?: (item: NasaMediaItem) => void;
  className?: string;
  imageClassName?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto' | 'wide';
  priority?: boolean;
  darkSurface?: boolean;
  compactCaption?: boolean;
}

export const NasaImage: React.FC<NasaImageProps> = ({
  item,
  onOpenLightbox,
  className = '',
  imageClassName = '',
  aspectRatio = 'video',
  priority = false,
  darkSurface = true,
  compactCaption = false
}) => {
  const isFileProtocol = typeof window !== 'undefined' && window.location.protocol === 'file:';
  let initialSrc = item.direct_asset_url || item.local_asset_url;
  if (isFileProtocol && item.local_asset_url) {
    initialSrc = '.' + (item.local_asset_url.startsWith('/') ? item.local_asset_url : '/' + item.local_asset_url);
  }

  const [currentSrc, setCurrentSrc] = useState<string | null>(initialSrc);
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const aspectClasses = {
    video: 'aspect-video',
    wide: 'aspect-[16/10]',
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    auto: 'min-h-[260px]'
  }[aspectRatio];

  const isDiagram = item.media_type === 'NASA_DIAGRAM' || item.media_type === 'NASA_PHOTO_OR_DIAGRAM';

  const handleImageError = () => {
    const cleanLocal = item.local_asset_url ? item.local_asset_url.replace('/public/', '/') : '';
    if (currentSrc !== cleanLocal && cleanLocal) {
      setCurrentSrc(cleanLocal);
    } else if (currentSrc !== item.direct_asset_url && item.direct_asset_url) {
      setCurrentSrc(item.direct_asset_url);
    } else {
      setImageError(true);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.source_page || window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <figure
      className={`group relative overflow-hidden cyber-frame text-[#F1F5F9] transition-all duration-300 ${className}`}
    >
      {/* 4 Corner Bracket Ticks on Outer Card Border */}
      <span className="corner-tick-tl" />
      <span className="corner-tick-tr" />
      <span className="corner-tick-bl" />
      <span className="corner-tick-br" />

      {/* Top Header Bar - Outside and Above the Image */}
      <div className="px-3.5 py-2.5 bg-[#081226]/95 border-b border-[#22D3EE]/25 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {item.manifest_id && (
            <span className="px-2 py-0.5 bg-[#0B1A38] text-[#38BDF8] font-mono text-[11px] font-semibold tracking-wider border border-[#22D3EE]/40 rounded-xs">
              {item.manifest_id}
            </span>
          )}
          <span className="px-2 py-0.5 bg-[#0B1A38] text-[#F1F5F9] font-mono text-[11px] tracking-wider border border-white/20 rounded-xs">
            {item.media_type === 'NASA_DIAGRAM' ? 'SƠ ĐỒ KỸ THUẬT NASA' : 'ẢNH TƯ LIỆU NASA'}
          </span>
        </div>

        {onOpenLightbox && (
          <button
            type="button"
            onClick={() => onOpenLightbox(item)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0E1E42] hover:bg-[#162C61] text-[#38BDF8] hover:text-[#FBBF24] font-mono text-[11px] border border-[#22D3EE]/40 hover:border-[#FBBF24] transition-colors cursor-pointer rounded-xs"
            title="Mở ảnh độ phân giải đầy đủ"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#FBBF24]" />
            <span className="hidden sm:inline">Phóng lớn</span>
          </button>
        )}
      </div>

      {/* Visual Area - 100% Clean Image, Zero Overlays on top of the NASA photo */}
      <div className={`relative w-full overflow-hidden ${ isDiagram ? 'bg-[#080E21]' : 'bg-[#060B18]' } ${aspectClasses}`}>
        {currentSrc && !imageError ? (
          <>
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#09122B] animate-pulse z-10">
                <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8]">
                  Đang tải tư liệu NASA ({item.manifest_id || item.id})...
                </span>
              </div>
            )}
            <img
              src={currentSrc}
              alt={item.alt_vi}
              loading={priority ? 'eager' : 'lazy'}
              onLoad={() => setIsLoaded(true)}
              onError={handleImageError}
              onClick={() => onOpenLightbox && onOpenLightbox(item)}
              className={`w-full h-full ${
                isDiagram ? 'object-contain p-3 bg-[#080E21]' : 'object-cover'
              } transition-transform duration-700 ${
                onOpenLightbox ? 'cursor-zoom-in group-hover:scale-[1.02]' : ''
              } ${isLoaded ? 'opacity-100' : 'opacity-0'} ${imageClassName}`}
            />
          </>
        ) : (
          /* High-Tech HUD Fallback */
          <div className="w-full h-full min-h-[260px] p-6 md:p-8 flex flex-col justify-between bg-[#081024] text-[#F1F5F9] orbital-grid-dark">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0E1C3D] border border-[#22D3EE]/30 font-mono text-[11px] uppercase tracking-wider text-[#38BDF8]">
                <Info className="w-3.5 h-3.5 text-[#FBBF24]" />
                Ảnh tư liệu đang được bổ sung
              </span>
              {item.manifest_id && (
                <span className="font-mono text-xs text-[#FBBF24]">{item.manifest_id}</span>
              )}
            </div>

            <div className="my-auto py-5">
              <h4 className="font-display text-lg md:text-xl font-semibold text-[#F8FAFC] mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-[#CBD5E1] leading-relaxed mb-3">
                {item.caption_vi}
              </p>
              {item.note && (
                <p className="text-xs text-[#38BDF8] bg-[#0B1530] p-3 border-l-2 border-[#F59E0B]">
                  Lưu ý biên tập: {item.note}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-[#22D3EE]/20 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs text-[#94A3B8]">Credit: {item.credit}</span>
              <a
                href={item.source_page}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0E1E42] hover:bg-[#162C61] border border-[#22D3EE]/40 text-[#38BDF8] hover:text-[#FBBF24] text-xs font-mono transition-colors"
              >
                <span>Mở trang nguồn NASA</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Museum Caption Bar - Dark Cosmic Glass with high readability */}
      <figcaption className="p-4 sm:p-5 bg-[#080F24]/95 backdrop-blur-md border-t border-[#22D3EE]/25 text-[#F1F5F9]">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-display text-sm sm:text-base font-bold text-[#F8FAFC] tracking-tight">
              {item.title}
            </span>
            <span className="font-mono text-[11px] text-[#FBBF24] drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]">
              Credit: {item.credit}
            </span>
          </div>

          <p className="text-xs sm:text-[13px] leading-relaxed text-[#CBD5E1]">
            {item.caption_vi}
          </p>

          {!compactCaption && item.note && (
            <p className="text-[11px] leading-relaxed pt-1 text-[#94A3B8] border-l-2 border-[#22D3EE]/60 pl-2">
              • {item.note}
            </p>
          )}

          <div className="pt-2 border-t border-[#22D3EE]/15 flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#38BDF8]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22D3EE]" />
              {item.verification_state === 'manual_curated'
                ? 'Đã đối chiếu trang nguồn NASA'
                : 'Nguồn lưu trữ NASA Science'}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-[#94A3B8] hover:text-[#38BDF8] transition-colors cursor-pointer"
                title="Chia sẻ liên kết"
              >
                {copiedShare ? (
                  <>
                    <Check className="w-3 h-3 text-[#22D3EE]" />
                    <span className="text-[#22D3EE]">Đã sao chép</span>
                  </>
                ) : (
                  <span>Chia sẻ</span>
                )}
              </button>
              <span className="text-[#22D3EE]/30">·</span>
              <a
                href={item.direct_asset_url || item.local_asset_url || item.source_page}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
                title="Tải về ảnh gốc"
              >
                Tải về
              </a>
              <span className="text-[#22D3EE]/30">·</span>
              <a
                href={item.source_page}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] text-[#FBBF24] hover:text-white underline underline-offset-4 transition-colors"
              >
                <span>Trang nguồn NASA</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </figcaption>
    </figure>
  );
};
