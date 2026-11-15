import React, { useState } from 'react';
import { HOTSPOTS_OPPORTUNITY, NASA_MEDIA_CATALOG, NasaMediaItem } from '../data/museumData';
import { Info, ExternalLink, ChevronRight, Check } from 'lucide-react';

interface OpportunityHotspotsProps {
  onOpenLightbox?: (item: NasaMediaItem) => void;
}

export const OpportunityHotspots: React.FC<OpportunityHotspotsProps> = ({ onOpenLightbox }) => {
  const [activeId, setActiveId] = useState<string>(HOTSPOTS_OPPORTUNITY[0].id);

  const activeHotspot = HOTSPOTS_OPPORTUNITY.find(h => h.id === activeId) || HOTSPOTS_OPPORTUNITY[0];
  const photoItem = NASA_MEDIA_CATALOG.opportunity_self_portrait_2004;

  return (
    <div className="bg-[#FFFEFA] border border-[#E7E3D9] rounded-lg overflow-hidden">
      {/* Editorial Header */}
      <div className="p-6 border-b border-[#E7E3D9] bg-[#F4F1E9]/50">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C86E42]">
            Khám phá kiến trúc phần cứng · Mars Exploration Rover
          </span>
          <span className="text-[11px] font-mono text-[#667386]">
            Điểm chạm tương tác giáo dục
          </span>
        </div>
        <h3 className="text-2xl font-serif font-semibold text-[#17283D] mt-1">
          Cấu tạo giải phẫu xe tự hành Opportunity
        </h3>
        <p className="text-sm text-[#667386] mt-1 max-w-2xl">
          Nhấp hoặc chạm vào các điểm đánh số trên bức ảnh tự chụp tư liệu thật của Opportunity (Sols 322–323) để tìm hiểu chức năng của từng cụm thiết bị khoa học.
        </p>
      </div>

      {/* Interactive Canvas & Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left / Top: Interactive Image Viewport (7 cols) */}
        <div className="lg:col-span-7 relative bg-[#14243B] min-h-[380px] sm:min-h-[460px] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-[#E7E3D9]">
          <img
            src={photoItem.direct_asset_url || undefined}
            alt={photoItem.alt_vi}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover min-h-[380px]"
          />

          {/* Semi-transparent dark overlay for pin readability */}
          <div className="absolute inset-0 bg-[#17283D]/25 pointer-events-none" />

          {/* Hotspot Markers */}
          {HOTSPOTS_OPPORTUNITY.map((spot, index) => {
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
                    ? 'bg-[#C86E42] text-white ring-4 ring-[#C86E42]/40' 
                    : 'bg-[#FFFEFA] text-[#17283D] hover:bg-[#F4F1E9] border border-[#17283D]/20'
                }`}>
                  {index + 1}
                </span>
              </button>
            );
          })}

          {/* Archival Citation Notice */}
          <div className="absolute bottom-3 left-3 right-3 bg-[#14243B]/85 text-[#FFFEFA] text-[11px] p-2 rounded backdrop-blur-xs flex items-center justify-between">
            <span className="truncate">Ảnh tự chụp sol 322–323 · {photoItem.credit}</span>
            <button 
              onClick={() => onOpenLightbox && onOpenLightbox(photoItem)}
              className="text-[#B89A65] hover:text-white shrink-0 ml-2 underline text-[10px]"
            >
              Xem ảnh gốc
            </button>
          </div>
        </div>

        {/* Right / Bottom: Selected Component Details & List (5 cols) */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-[#FFFEFA]">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#667386] pb-2 border-b border-[#E7E3D9]">
              <span>Bộ phận được chọn</span>
              <span className="text-[#C86E42] font-semibold">
                Mục #{HOTSPOTS_OPPORTUNITY.findIndex(h => h.id === activeId) + 1} / {HOTSPOTS_OPPORTUNITY.length}
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

            {/* Quick List of all components for direct tab access */}
            <div className="mt-6 pt-4 border-t border-[#E7E3D9]">
              <div className="text-xs font-semibold text-[#667386] uppercase tracking-wider mb-2">
                Danh sách các cụm thiết bị:
              </div>
              <div className="space-y-1 max-h-[220px] overflow-y-auto pr-1">
                {HOTSPOTS_OPPORTUNITY.map((spot, idx) => (
                  <button
                    key={spot.id}
                    onClick={() => setActiveId(spot.id)}
                    className={`w-full text-left px-3 py-2 text-xs rounded transition-colors flex items-center justify-between ${
                      spot.id === activeId
                        ? 'bg-[#F4F1E9] text-[#17283D] font-medium border border-[#E7E3D9]'
                        : 'text-[#667386] hover:bg-stone-50 hover:text-[#17283D]'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[10px] text-[#B89A65]">0{idx + 1}</span>
                      <span className="truncate">{spot.label}</span>
                    </span>
                    {spot.id === activeId && <Check className="w-3.5 h-3.5 text-[#C86E42] shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-[#E7E3D9] text-[11px] text-[#667386] flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#B89A65] shrink-0" />
            <span>Lớp chú thích giáo dục dựa trên tài liệu kỹ thuật JPL/NASA.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
