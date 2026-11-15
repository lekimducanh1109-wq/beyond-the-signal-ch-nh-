import React, { useState } from 'react';
import { HOTSPOTS_PIONEER_DIAGRAM, NASA_MEDIA_CATALOG, NasaMediaItem } from '../data/museumData';
import { Info, ExternalLink, Zap, Radio, Compass, ShieldAlert, Sparkles } from 'lucide-react';

interface PioneerDiagramHotspotsProps {
  onOpenLightbox?: (item: NasaMediaItem) => void;
}

export const PioneerDiagramHotspots: React.FC<PioneerDiagramHotspotsProps> = ({ onOpenLightbox }) => {
  const [activeId, setActiveId] = useState<string>(HOTSPOTS_PIONEER_DIAGRAM[0].id);

  const activeHotspot = HOTSPOTS_PIONEER_DIAGRAM.find(h => h.id === activeId) || HOTSPOTS_PIONEER_DIAGRAM[0];
  const diagramItem = NASA_MEDIA_CATALOG.pioneer_spacecraft_diagram;

  return (
    <div className="bg-[#FFFEFA] border border-[#E7E3D9] rounded-lg overflow-hidden">
      {/* Editorial Header */}
      <div className="p-6 border-b border-[#E7E3D9] bg-[#F4F1E9]/50">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B89A65]">
            Sơ đồ kỹ thuật chính thức NASA · Pioneer 10 & 11
          </span>
          <span className="text-[11px] font-mono text-[#667386]">
            Sơ đồ gốc: NASA ACD97-0036-2-1
          </span>
        </div>
        <h3 className="text-2xl font-serif font-semibold text-[#17283D] mt-1">
          Giải phẫu phần cứng tàu thám hiểm không gian sâu Pioneer 11
        </h3>
        <p className="text-sm text-[#667386] mt-1 max-w-2xl">
          NASA thiết kế Pioneer 10 và 11 trên cùng một khung thân kỹ thuật bền bỉ để chịu đựng bức xạ cực độ quanh Sao Mộc và nhiệt độ đóng băng ở cự ly hàng tỷ km ngoài Hệ Mặt Trời.
        </p>
      </div>

      {/* Interactive Diagram & Explanations Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Diagram Viewport (7 cols) */}
        <div className="lg:col-span-7 relative bg-[#FFFEFA] min-h-[380px] sm:min-h-[460px] flex items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-[#E7E3D9]">
          <img
            src={diagramItem.direct_asset_url || undefined}
            alt={diagramItem.alt_vi}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[440px] object-contain"
          />

          {/* Interactive Pins */}
          {HOTSPOTS_PIONEER_DIAGRAM.map((spot, index) => {
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
                    ? 'bg-[#14243B] text-[#B89A65] ring-4 ring-[#B89A65]/40' 
                    : 'bg-[#FFFEFA] text-[#17283D] hover:bg-[#F4F1E9] border border-[#17283D]/30'
                }`}>
                  {index + 1}
                </span>
              </button>
            );
          })}

          {/* Diagram Note Bar */}
          <div className="absolute bottom-3 left-3 right-3 bg-[#17283D]/80 text-[#FFFEFA] text-[11px] p-2 rounded backdrop-blur-xs flex items-center justify-between">
            <span>Sơ đồ lưu trữ chính thức của NASA Ames</span>
            <button
              onClick={() => onOpenLightbox && onOpenLightbox(diagramItem)}
              className="text-[#B89A65] hover:text-white underline text-[10px] ml-2"
            >
              Mở bản vẽ phóng to
            </button>
          </div>
        </div>

        {/* Right: Technical Inspector (5 cols) */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-[#FFFEFA]">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#667386] pb-2 border-b border-[#E7E3D9]">
              <span>Cụm phần cứng</span>
              <span className="text-[#B89A65] font-semibold">
                Điểm #{HOTSPOTS_PIONEER_DIAGRAM.findIndex(h => h.id === activeId) + 1} / {HOTSPOTS_PIONEER_DIAGRAM.length}
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

            {/* Special Callout regarding RTGs vs Solar Panels */}
            {activeId === 'snap_rtg' && (
              <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded text-xs text-[#17283D] mt-3">
                <strong className="text-[#C86E42] block mb-1">Quy tắc khoa học quan trọng:</strong>
                Ở khoảng cách Sao Mộc (gấp 5 lần khoảng cách Trái Đất) và Sao Thổ (gấp 10 lần), ánh sáng Mặt Trời chỉ còn 1% đến 4%. Do đó, Pioneer 11 <em>tuyệt đối không sử dụng pin mặt trời</em> mà dùng nhiệt phân rã của đồng vị Plutonium-238 để chuyển đổi trực tiếp thành điện năng qua cặp nhiệt điện.
              </div>
            )}

            {/* Selection buttons list */}
            <div className="mt-6 pt-4 border-t border-[#E7E3D9] space-y-1.5">
              <div className="text-xs font-semibold text-[#667386] uppercase tracking-wider mb-2">
                Các bộ phận chính trên sơ đồ:
              </div>
              {HOTSPOTS_PIONEER_DIAGRAM.map((spot, idx) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveId(spot.id)}
                  className={`w-full text-left px-3 py-2 text-xs rounded transition-colors flex items-center justify-between ${
                    spot.id === activeId
                      ? 'bg-[#14243B] text-[#FFFEFA] font-medium'
                      : 'text-[#17283D] bg-[#F4F1E9]/70 hover:bg-[#E7E3D9]'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[10px] text-[#B89A65]">0{idx + 1}</span>
                    <span className="truncate">{spot.label}</span>
                  </span>
                  <span className="text-[10px] text-[#667386] uppercase font-mono">Xem</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-[#E7E3D9] text-[11px] text-[#667386] flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#B89A65] shrink-0" />
            <span>Nguồn tư liệu: NASA Science Resource & NASA Ames Research Center.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
