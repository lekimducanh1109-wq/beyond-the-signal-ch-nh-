import React, { useState } from 'react';
import { Clock, Calendar, Sparkles, Wind } from 'lucide-react';

interface MilestonePoint {
  sol: number;
  date_approx: string;
  title: string;
  desc: string;
}

const MILESTONES: MilestonePoint[] = [
  {
    sol: 90,
    date_approx: 'Tháng 4/2004',
    title: 'Nhiệm vụ chính thức hoàn thành',
    desc: 'Hết 90 sol theo kế hoạch ban đầu của NASA, hoàn tất tìm kiếm khoáng vật tại hố Eagle.'
  },
  {
    sol: 322,
    date_approx: 'Tháng 12/2004',
    title: 'Ảnh tự chụp đầu tiên',
    desc: 'Gió Sao Hỏa quét sạch các tấm pin; xe bắt đầu hành trình dài tới hố Endurance.'
  },
  {
    sol: 2700,
    date_approx: 'Tháng 8/2011',
    title: 'Chạm vành hố Endeavour',
    desc: 'Vượt qua 33 km cồn cát để khám phá những vỉa đá cổ xưa nhất của hành tinh Đỏ.'
  },
  {
    sol: 3968,
    date_approx: 'Tháng 3/2015',
    title: 'Cự ly Marathon 42,195 km',
    desc: 'Cỗ máy bánh lăn đầu tiên của loài người chạy hết quãng đường marathon ngoài Trái Đất.'
  },
  {
    sol: 5000,
    date_approx: 'Tháng 2/2018',
    title: 'Cột mốc 5.000 sol kỳ diệu',
    desc: 'Opportunity chụp ảnh tự sướng kỷ niệm 5.000 ngày Sao Hỏa hoạt động bền bỉ.'
  },
  {
    sol: 5111,
    date_approx: '10/06/2018',
    title: 'Tín hiệu cuối cùng',
    desc: 'Bão bụi toàn cầu che lấp Mặt Trời; xe gửi bức ảnh cuối cùng trước khi cạn điện.'
  }
];

export const SolComparisonBar: React.FC = () => {
  const [selectedSol, setSelectedSol] = useState<number>(5111);

  const activeMilestone = MILESTONES.find(m => m.sol === selectedSol) || MILESTONES[MILESTONES.length - 1];

  // Proportional ratio calculation: 90 vs 5,111 sols (factor: ~56.8x)
  const ratio = (5111 / 90).toFixed(1);

  return (
    <div className="bg-[#FFFEFA] border border-[#E7E3D9] rounded-lg p-6 lg:p-8">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E7E3D9]">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#C86E42]">
            Kỳ tích kỹ thuật ngoài hành tinh
          </span>
          <h3 className="text-2xl font-serif font-semibold text-[#17283D] mt-1">
            90 Sol thiết kế ban đầu vs 5.111 Sol thực tế
          </h3>
          <p className="text-sm text-[#667386] mt-1 max-w-xl">
            Một ngày trên Sao Hỏa gọi là một <strong className="text-[#17283D]">sol</strong> (24 giờ 39 phút 35 giây). Opportunity được thiết kế để sống sót chỉ 90 sol, nhưng đã bền bỉ hoạt động gấp hơn <span className="text-[#C86E42] font-semibold">{ratio} lần</span>.
          </p>
        </div>

        <div className="flex items-center gap-6 bg-[#F4F1E9] px-4 py-3 rounded border border-[#E7E3D9] shrink-0 text-xs">
          <div>
            <div className="text-[#667386] text-[11px] font-mono">Kế hoạch sơ cấp</div>
            <div className="text-lg font-serif font-bold text-[#17283D]">90 Sol</div>
            <div className="text-[10px] text-[#667386]">~3 tháng Trái Đất</div>
          </div>
          <div className="w-[1px] h-8 bg-[#D5CEBE]" />
          <div>
            <div className="text-[#667386] text-[11px] font-mono">Hoạt động thực tế</div>
            <div className="text-lg font-serif font-bold text-[#C86E42]">5.111 Sol</div>
            <div className="text-[10px] text-[#667386]">~14 năm 138 ngày</div>
          </div>
        </div>
      </div>

      {/* Visual Proportional Comparison Bar */}
      <div className="py-6">
        <div className="text-xs text-[#667386] mb-2 flex justify-between font-mono">
          <span>Tỷ lệ trực quan chiều dài thời gian hoạt động:</span>
          <span>Hơn 56 lần dự kiến</span>
        </div>
        <div className="relative w-full h-8 bg-[#E7E3D9] rounded-sm overflow-hidden flex items-center">
          {/* Planned 90 sols bar (90 / 5111 = ~1.76%) */}
          <div 
            style={{ width: `${(90 / 5111) * 100}%`, minWidth: '12px' }} 
            className="h-full bg-[#17283D] flex items-center justify-center text-[10px] text-white font-mono"
            title="Kế hoạch ban đầu: 90 sol"
          />
          {/* Actual operation bar */}
          <div 
            style={{ width: `${100 - ((90 / 5111) * 100)}%` }} 
            className="h-full bg-[#C86E42] opacity-90 relative"
            title="Thực tế hoạt động: 5.111 sol"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#9A3412]/40" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-white">
              5.111 Sol (Vượt 5.021 sol)
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center text-[11px] text-[#667386] mt-2 font-mono">
          <span>Sol 0: Đổ bộ Meridiani (24/25-01-2004)</span>
          <span className="text-[#17283D] font-medium">90 sol (vạch đen nhỏ bên trái)</span>
          <span className="text-[#C86E42] font-medium">Sol 5.111: Tín hiệu cuối (10/06/2018)</span>
        </div>
      </div>

      {/* Interactive Milestone Selector */}
      <div className="pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-[#B89A65]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#17283D]">
            Các mốc thời gian dọc theo 5.111 sol (Nhấn để khám phá):
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {MILESTONES.map((m) => {
            const isSelected = selectedSol === m.sol;
            return (
              <button
                key={m.sol}
                onClick={() => setSelectedSol(m.sol)}
                className={`p-3 text-left border rounded transition-all ${
                  isSelected 
                    ? 'border-[#C86E42] bg-[#F4F1E9] ring-1 ring-[#C86E42]' 
                    : 'border-[#E7E3D9] bg-[#FFFEFA] hover:bg-[#F4F1E9]/60'
                }`}
              >
                <div className="text-xs font-mono font-bold text-[#C86E42]">
                  Sol {m.sol.toLocaleString()}
                </div>
                <div className="text-[11px] text-[#667386] mt-0.5">{m.date_approx}</div>
                <div className="text-xs font-medium text-[#17283D] mt-1 line-clamp-1">{m.title}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Milestone Detail Card */}
        <div className="mt-4 p-4 bg-[#F4F1E9] border border-[#E7E3D9] rounded flex items-start gap-4">
          <div className="p-2.5 bg-[#FFFEFA] border border-[#E7E3D9] rounded text-[#C86E42] shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#667386]">
              <span>Sol {activeMilestone.sol.toLocaleString()}</span>
              <span>·</span>
              <span>{activeMilestone.date_approx}</span>
            </div>
            <h4 className="text-base font-serif font-semibold text-[#17283D] mt-0.5">
              {activeMilestone.title}
            </h4>
            <p className="text-xs sm:text-sm text-[#17283D] mt-1 leading-relaxed">
              {activeMilestone.desc}
            </p>
          </div>
        </div>

        {/* Scientific Cleaning Event Explanation */}
        <div className="mt-4 flex items-start gap-3 text-xs text-[#667386] bg-amber-50/60 border border-amber-200/60 p-3.5 rounded">
          <Wind className="w-4 h-4 text-[#C86E42] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#17283D]">Bí ẩn về tuổi thọ phi thường:</strong> Các kỹ sư NASA ban đầu dự tính bụi Sao Hỏa sẽ phủ kín các tấm pin mặt trời sau 90 sol. Tuy nhiên, những cơn lốc bụi tự nhiên (dust devils) của khí quyển Sao Hỏa bất ngờ quét qua xe theo từng mùa, thổi sạch các lớp bụi và phục hồi năng lượng nhiều lần một cách kỳ diệu.
          </p>
        </div>
      </div>
    </div>
  );
};
