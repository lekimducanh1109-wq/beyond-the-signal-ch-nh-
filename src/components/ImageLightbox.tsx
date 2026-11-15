import React, { useEffect } from 'react';
import { ExternalLink, X, Info, ShieldCheck } from 'lucide-react';
import { NasaMediaItem } from '../data/museumData';

interface ImageLightboxProps {
  item: NasaMediaItem | null;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, onClose]);

  if (!item) return null;

  const mediaTypeLabel = {
    NASA_PHOTO: 'Ảnh chụp tư liệu NASA',
    NASA_DIAGRAM: 'Sơ đồ kỹ thuật chính thức NASA',
    NASA_PHOTO_OR_DIAGRAM: 'Tư liệu lưu trữ NASA',
    NASA_MISSION_REFERENCE: 'Tài liệu sứ mệnh NASA',
    COMMUNITY_ARTWORK: 'Tác phẩm cộng đồng'
  }[item.media_type];

  const primarySrc = item.local_asset_url || item.direct_asset_url;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#10233D]/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[#FFFFFF] border border-[#17212B]/15 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#17212B]/12 bg-[#F5F3ED]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#567B9D] font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2F6F5E]" />
              <span>{item.id} · {mediaTypeLabel}</span>
            </div>
            <h3 className="text-lg font-display font-bold text-[#17212B] mt-0.5">
              {item.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#69737D] hover:text-[#17212B] hover:bg-[#E9E9E5] rounded-lg transition-colors cursor-pointer"
            title="Đóng cửa sổ (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Frame */}
        <div className="relative bg-[#10233D] flex items-center justify-center min-h-[320px] max-h-[58vh] overflow-hidden p-3">
          {primarySrc ? (
            <img
              src={primarySrc}
              alt={item.alt_vi}
              referrerPolicy="no-referrer"
              className="max-h-[55vh] w-auto max-w-full object-contain mx-auto"
              onError={(e) => {
                const target = e.currentTarget;
                if (item.direct_asset_url && target.src !== item.direct_asset_url) {
                  target.src = item.direct_asset_url;
                  return;
                }
                target.style.display = 'none';
                const fallback = document.getElementById(`lightbox-fallback-${item.id}`);
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : null}

          <div
            id={`lightbox-fallback-${item.id}`}
            className={`flex-col items-center justify-center p-8 text-center text-[#F5F3ED] max-w-md ${
              primarySrc ? 'hidden' : 'flex'
            }`}
          >
            <Info className="w-10 h-10 text-[#C88754] mb-3" />
            <p className="font-display text-lg font-bold text-[#F5F3ED] mb-2">
              Ảnh tư liệu đang được bổ sung
            </p>
            <p className="text-xs text-[#E9E9E5]/80 leading-relaxed mb-4">
              Tư liệu gốc thuộc kho dữ liệu NASA ({item.credit}). Bạn có thể mở trực tiếp trang lưu trữ chính thức của NASA để xem bản gốc độ phân giải đầy đủ.
            </p>
            <a
              href={item.source_page}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#17212B] bg-[#F5F3ED] hover:bg-[#E9E9E5] rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Mở tư liệu gốc tại NASA
            </a>
          </div>
        </div>

        {/* Caption & Metadata Footnote */}
        <div className="p-6 bg-[#FFFFFF] border-t border-[#17212B]/12 overflow-y-auto space-y-3">
          <p className="text-sm text-[#17212B] leading-relaxed">
            {item.caption_vi}
          </p>
          {item.note && (
            <p className="text-xs text-[#69737D] bg-[#F5F3ED] border border-[#17212B]/10 rounded-lg p-3 leading-relaxed">
              <strong className="text-[#17212B]">Ghi chú biên tập:</strong> {item.note}
            </p>
          )}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#17212B]/10 text-xs text-[#69737D] font-mono">
            <div>
              <span className="font-semibold text-[#17212B]">Nguồn / Credit:</span> {item.credit}
            </div>
            <a
              href={item.source_page}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#567B9D] hover:text-[#C88754] font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Trang tư liệu chính thức NASA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
