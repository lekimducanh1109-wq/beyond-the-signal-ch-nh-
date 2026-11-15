import React, { useState, useEffect, useRef } from 'react';
import { X, Download, Share2, ExternalLink, ShieldCheck, Check } from 'lucide-react';

export interface ExhibitItem {
  id: string;
  titleVi: string;
  titleEn: string;
  yearStatus: string;
  badge: 'Ảnh tư liệu NASA' | 'Hình minh họa NASA' | 'Ảnh do thiết bị chụp';
  caption: string;
  longDescription: string;
  credit: string;
  imageId: string;
  nssdcId: string;
  sourceUrl: string;
  imageSrc: string;
  altText: string;
  downloadFilename: string;
  targetRoute: string;
}

interface ExhibitLightboxProps {
  item: ExhibitItem | null;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement> | null;
}

export const ExhibitLightbox: React.FC<ExhibitLightboxProps> = ({ item, onClose, triggerRef }) => {
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (item) {
      previousActiveElement.current = (document.activeElement as HTMLElement) || (triggerRef ? triggerRef.current : null);
      document.body.style.overflow = 'hidden';

      // Set initial focus to close button
      const timer = setTimeout(() => {
        if (closeBtnRef.current) {
          closeBtnRef.current.focus();
        } else if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }

        if (e.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;

          const firstEl = focusableElements[0];
          const lastEl = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
        if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [item, onClose, triggerRef]);

  if (!item) return null;

  const handleShare = async () => {
    const shareData = {
      title: `${item.titleVi} — BEYOND THE SIGNAL`,
      text: `${item.titleVi} (${item.titleEn}) - Tư liệu NASA ${item.imageId}`,
      url: window.location.origin + item.targetRoute
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        // Fallback
        alert('Liên kết: ' + shareData.url);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#030712]/90 backdrop-blur-md transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exhibit-lightbox-title"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative max-w-4xl w-full bg-[#081226] border border-[#22D3EE]/40 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col max-h-[92vh] overflow-hidden focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Cyber Corner Brackets */}
        <span className="corner-tick-tl" />
        <span className="corner-tick-tr" />
        <span className="corner-tick-bl" />
        <span className="corner-tick-br" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#22D3EE]/25 bg-[#060D1E]">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-2 py-0.5 bg-[#0C1A38] text-[#38BDF8] border border-[#22D3EE]/40 font-mono text-[11px] font-semibold tracking-wider rounded-xs">
              NASA ID: {item.imageId}
            </span>
            <span className="px-2 py-0.5 bg-[#0C1A38] text-[#FBBF24] border border-[#F59E0B]/40 font-mono text-[11px] tracking-wider rounded-xs">
              {item.badge}
            </span>
            <span className="font-mono text-[11px] text-[#94A3B8]">
              NSSDCA: {item.nssdcId}
            </span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#132347] border border-transparent hover:border-[#22D3EE]/40 rounded-xs transition-colors focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none cursor-pointer"
            aria-label="Đóng hộp thoại phóng lớn ảnh"
            title="Đóng (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Image Frame */}
        <div className="relative bg-[#02050E] flex items-center justify-center min-h-[260px] sm:min-h-[380px] max-h-[58vh] overflow-hidden p-3 border-b border-[#22D3EE]/20">
          <img
            src={item.imageSrc}
            alt={item.altText}
            className="max-h-[54vh] w-auto max-w-full object-contain mx-auto rounded-xs shadow-lg"
          />
        </div>

        {/* Modal Footer / Detailed Archival Information */}
        <div className="p-4 sm:p-6 bg-[#081226] overflow-y-auto space-y-3.5 text-left">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 border-b border-[#22D3EE]/15 pb-2.5">
            <div>
              <h2 id="exhibit-lightbox-title" className="font-display font-bold text-base sm:text-lg text-[#F8FAFC]">
                {item.titleVi}
              </h2>
              <div className="font-mono text-xs text-[#94A3B8] mt-0.5">
                Tên gốc tiếng Anh: <span className="text-[#38BDF8]">{item.titleEn}</span> · {item.yearStatus}
              </div>
            </div>
            <div className="font-mono text-xs text-[#FBBF24] shrink-0">
              Ghi công: {item.credit}
            </div>
          </div>

          {/* Full Caption & Long Description */}
          <div className="space-y-2 text-[#E2E8F0] text-sm leading-relaxed">
            <p className="font-sans font-medium text-[#F1F5F9] bg-[#0A1733] border-l-2 border-[#22D3EE] p-3 rounded-xs">
              {item.caption}
            </p>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              {item.longDescription}
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-[#22D3EE]/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <a
                href={item.imageSrc}
                download={item.downloadFilename}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0C1A38] hover:bg-[#132752] border border-[#22D3EE]/40 text-[#F1F5F9] hover:text-[#38BDF8] rounded-xs transition-colors focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Tải về tệp ảnh</span>
              </a>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0C1A38] hover:bg-[#132752] border border-[#22D3EE]/40 text-[#F1F5F9] hover:text-[#FBBF24] rounded-xs transition-colors focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none cursor-pointer relative"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Share2 className="w-3.5 h-3.5 text-[#FBBF24]" />}
                <span>{copied ? 'Đã sao chép liên kết!' : 'Chia sẻ'}</span>
              </button>
            </div>

            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#FBBF24] hover:text-[#FDE68A] hover:underline transition-colors focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:outline-none rounded-xs px-2 py-1"
            >
              <span>Nguồn tư liệu NASA ↗</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
