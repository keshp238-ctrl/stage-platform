import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, Sparkles, Filter } from 'lucide-react';
import { FEATURES_DATA } from '../../data/mockData';
import { JourneyStage } from '../../types';

interface FeatureExplorerProps {
  onOpenAppFeature?: (featureId: string) => void;
  isDarkMode?: boolean;
}

export const FeatureExplorer: React.FC<FeatureExplorerProps> = ({
  onOpenAppFeature,
  isDarkMode = true,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>('f2'); // Default open AI Talk Lab

  const filters = ['ALL', 'LEARN', 'PRACTICE', 'SPEAK', 'CONNECT', 'GET HIRED'];

  const filteredFeatures = FEATURES_DATA.filter((item) => {
    if (selectedFilter === 'ALL') return true;
    return item.stage === selectedFilter;
  });

  return (
    <section id="features" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-mono tracking-[0.25em] text-[#E62B1E] uppercase font-bold mb-3">
              03 / THE FULL CAPABILITY STACK
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              15 PURPOSE-BUILT ENGINES
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mt-6 md:mt-0 p-1.5 rounded-2xl glass-panel text-xs font-mono">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 ${
                  selectedFilter === f
                    ? 'bg-[#E62B1E] text-white font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Feature List */}
        <div className="space-y-3">
          {filteredFeatures.map((feat) => {
            const isExpanded = expandedId === feat.id;
            return (
              <div
                key={feat.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'border-[#E62B1E]/40 bg-white/[0.04] shadow-xl'
                    : 'border-white/10 hover:border-white/20 bg-white/[0.015]'
                }`}
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : feat.id)}
                  className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                    <span className="font-mono text-xs text-neutral-500 font-bold shrink-0">
                      {feat.number}
                    </span>
                    <div className="truncate">
                      <div className="flex items-center gap-3">
                        <span className="text-lg sm:text-xl font-bold truncate">
                          {feat.title}
                        </span>
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono tracking-wider bg-white/5 border border-white/10 text-neutral-300">
                          {feat.stage}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-1 truncate font-light">
                        {feat.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden md:block text-right">
                      <div className="text-xs font-mono font-semibold text-white">
                        {feat.statsValue}
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono">
                        {feat.statsLabel}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg border border-white/10 text-neutral-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Drawer Details */}
                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-fade-in">
                    <div className="space-y-3 max-w-2xl">
                      <p className="text-sm text-neutral-300 font-light leading-relaxed">
                        {feat.details}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {feat.tags.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full bg-[#E62B1E]/10 border border-[#E62B1E]/20 text-neutral-300"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto">
                      <button
                        onClick={() => onOpenAppFeature && onOpenAppFeature(feat.id)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#E62B1E] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#FF3E2E] shadow-md shadow-[#E62B1E]/30 transition-all"
                      >
                        <span>Launch Module</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
