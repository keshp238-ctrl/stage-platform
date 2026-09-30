import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Disc, Radio, Mic, Users, Briefcase } from 'lucide-react';
import { JOURNEY_ROWS } from '../../data/mockData';

interface JourneySectionProps {
  onSelectStage: (stage: string) => void;
  isDarkMode?: boolean;
}

export const JourneySection: React.FC<JourneySectionProps> = ({ onSelectStage, isDarkMode = true }) => {
  const [activeHover, setActiveHover] = useState<number | null>(0);

  const icons = [
    <Disc key="0" className="w-5 h-5 text-[#E62B1E]" />,
    <Mic key="1" className="w-5 h-5 text-[#FF5538]" />,
    <Radio key="2" className="w-5 h-5 text-[#FF705E]" />,
    <Users key="3" className="w-5 h-5 text-[#E62B1E]" />,
    <Briefcase key="4" className="w-5 h-5 text-[#FF3B2D]" />,
  ];

  return (
    <section id="journey" className="py-24 border-y border-white/10 dark:border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-mono tracking-[0.25em] text-[#E62B1E] uppercase font-bold mb-3">
              02 / THE FIVE-PHASE ARC
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              FROM HESITANT TO HIRED
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md mt-4 md:mt-0 font-light">
            A continuous loop engineered to dismantle speaking anxiety, sharpen technical articulation, and build verifiable proof.
          </p>
        </div>

        {/* Five Large Horizontal Rows */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {JOURNEY_ROWS.map((row, idx) => {
            const isHovered = activeHover === idx;
            return (
              <div
                key={row.stage}
                onMouseEnter={() => setActiveHover(idx)}
                onClick={() => onSelectStage(row.stage)}
                data-cursor="EXPLORE"
                className={`group py-7 sm:py-9 px-4 sm:px-8 transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 relative ${
                  isHovered
                    ? isDarkMode
                      ? 'bg-white/[0.03]'
                      : 'bg-black/[0.02]'
                    : ''
                }`}
              >
                {/* Active Indicator Bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                    isHovered ? 'bg-[#E62B1E] opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Left: Tag + Stage Name */}
                <div className="flex items-center gap-6 sm:gap-10">
                  <span className="font-mono text-xs tracking-widest text-neutral-500">
                    {row.tag}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl border border-white/10 bg-white/5">
                      {icons[idx]}
                    </div>
                    <span className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight group-hover:text-[#E62B1E] transition-colors duration-200">
                      {row.stage}
                    </span>
                  </div>
                </div>

                {/* Middle: Headline + One-line description */}
                <div className="md:max-w-xl flex-1 md:px-8">
                  <div className="font-medium text-sm sm:text-base text-neutral-200 group-hover:text-white">
                    {row.headline}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light leading-relaxed">
                    {row.desc}
                  </p>
                </div>

                {/* Right: Stat + Arrow */}
                <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#E62B1E] font-semibold">
                      {row.stat}
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono">Platform Impact</div>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#E62B1E] group-hover:bg-[#E62B1E] group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
