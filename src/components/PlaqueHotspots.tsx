import React, { useState } from 'react';
import { HOTSPOTS_PLAQUE, NASA_MEDIA_CATALOG, NasaMediaItem } from '../data/museumData';
import { Info, HelpCircle, Sparkles, ExternalLink } from 'lucide-react';

interface PlaqueHotspotsProps {
  onOpenLightbox?: (item: NasaMediaItem) => void;
}

export const PlaqueHotspots: React.FC<PlaqueHotspotsProps> = ({ onOpenLightbox }) => {
  const [activeId, setActiveId] = useState<string>(HOTSPOTS_PLAQUE[0].id);

  const activeHotspot = HOTSPOTS_PLAQUE.find(h => h.id === activeId) || HOTSPOTS_PLAQUE[0];
  const plaqueItem = NASA_MEDIA_CATALOG.pioneer_plaque;

  return (
    <div className="bg-[#FFFEFA] border border-[#E7E3D9] rounded-lg overflow-hidden">
      {/* Editorial Header */}
      <div className="p-6 border-b border-[#E7E3D9] bg-[#F4F1E9]/50">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B89A65]">
            Hiện vật biểu tượng · Pioneer Plaque
          </span>
          <span className="text-[11px] font-mono text-[#667386]">
            Mang trên cả Pioneer 10 & 11
          </span>
        </div>
        <h3 className="text-2xl font-serif font-semibold text-[#17283D] mt-1">
          Bức thông điệp nhôm mạ vàng gửi vào vũ trụ sâu
        </h3>
        <p className="text-sm text-[#667386] mt-1 max-w-2xl">
          Tấm bảng kim loại kích thước 15 × 23 cm được gắn vào giàn anten tàu Pioneer 11. Các nhà khoa học Carl Sagan và Frank Drake đã thiết kế các ký hiệu bằng ngôn ngữ vật lý phổ quát của vũ trụ để giải thích nhân loại là ai và tàu đến từ đâu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Plaque Visual with Pins (7 cols) */}
        <div className="lg:col-span-7 relative bg-[#EBE6DF] min-h-[360px] sm:min-h-[440px] flex items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-[#E7E3D9]">
          <img
            src={plaqueItem.direct_asset_url || undefined}
            alt={plaqueItem.alt_vi}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[420px] object-contain rounded shadow-xs"
          />

          {/* Interactive Pins */}
          {HOTSPOTS_PLAQUE.map((spot, index) => {
            const isSelected = spot.id === activeId;
            return (
              <button
                key={spot.id}
                onClick={() => setActiveId(spot.id)}
                style={{ top: spot.position.top, left: spot.position.left }}
                aria-label={`Chi tiết: ${spot.label}`}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform ${
                  isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                }`}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold shadow-md transition-colors ${
                  isSelected 
                    ? 'bg-[#B89A65] text-[#14243B] ring-4 ring-[#B89A65]/40' 
                    : 'bg-[#14243B] text-[#FFFEFA] hover:bg-[#17283D] border border-white/40'
                }`}>
                  {index + 1}
                </span>
              </button>
            );
          })}

          <div className="absolute bottom-3 left-3 right-3 bg-[#14243B]/85 text-[#FFFEFA] text-[11px] p-2 rounded backdrop-blur-xs flex items-center justify-between">
            <span>Bản quét tư liệu chính thức NASA Ames</span>
            <button
              onClick={() => onOpenLightbox && onOpenLightbox(plaqueItem)}
              className="text-[#B89A65] hover:text-white underline text-[10px] ml-2"
            >
              Mở ảnh độ phân giải cao
            </button>
          </div>
        </div>

        {/* Right: Plaque Symbolism Explanation (5 cols) */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-[#FFFEFA]">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#667386] pb-2 border-b border-[#E7E3D9]">
              <span>Ký hiệu khoa học</span>
              <span className="text-[#B89A65] font-semibold">
                Mục #{HOTSPOTS_PLAQUE.findIndex(h => h.id === activeId) + 1} / {HOTSPOTS_PLAQUE.length}
              </span>
            </div>

            <div className="my-4">
              <h4 className="text-xl font-serif font-bold text-[#17283D]">
                {activeHotspot.label}
              </h4>
              <p className="text-sm text-[#17283D] leading-relaxed mt-2.5">
                {activeHotspot.summary_vi}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E7E3D9] space-y-1.5">
              <div className="text-xs font-semibold text-[#667386] uppercase tracking-wider mb-2">
                Các ký hiệu trên tấm bảng:
              </div>
              {HOTSPOTS_PLAQUE.map((spot, idx) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveId(spot.id)}
                  className={`w-full text-left px-3 py-2 text-xs rounded transition-colors flex items-center justify-between ${
                    spot.id === activeId
                      ? 'bg-[#F4F1E9] text-[#17283D] font-medium border border-[#B89A65]'
                      : 'text-[#667386] hover:bg-stone-50'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[10px] text-[#B89A65]">0{idx + 1}</span>
                    <span className="truncate">{spot.label}</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#B89A65]">Xem</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-[#E7E3D9] text-[11px] text-[#667386] flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#B89A65] shrink-0" />
            <span>Thông điệp hòa bình mang tính biểu tượng, được bảo vệ khỏi bức xạ trên giàn đỡ anten.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
