import React, { useState } from 'react';
import { Sparkles, Dna, TrendingUp, Info } from 'lucide-react';
import { DnaHelix3D } from '../3d/DnaHelix3D';
import { COMMUNICATION_DNA_METRICS } from '../../data/mockData';

interface CommunicationDnaSectionProps {
  isDarkMode?: boolean;
}

export const CommunicationDnaSection: React.FC<CommunicationDnaSectionProps> = ({
  isDarkMode = true,
}) => {
  const [hoveredKey, setHoveredKey] = useState<string | null>('clarity');

  const activeMetric = COMMUNICATION_DNA_METRICS.find((m) => m.key === (hoveredKey || 'clarity')) || COMMUNICATION_DNA_METRICS[0];

  return (
    <section id="dna" className="py-28 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-mono tracking-[0.25em] text-[#E62B1E] uppercase font-bold mb-3">
              05 / BIOMETRIC PROOF
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              COMMUNICATION DNA
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md mt-4 md:mt-0 font-light">
            Beyond gut feelings. A multi-dimensional rhetorical fingerprint that maps your evolution from everyday speech to executive presence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 3D Helix Visualizer (Left Column) */}
          <div className="lg:col-span-6 rounded-3xl border border-white/10 glass-panel p-6 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-4 left-6 flex items-center gap-2 text-xs font-mono text-neutral-400">
              <Dna className="w-4 h-4 text-[#E62B1E]" />
              <span>Biometric Skill Strands</span>
            </div>

            <DnaHelix3D
              hoveredKey={hoveredKey}
              setHoveredKey={setHoveredKey}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Active Metric Insight & Strands Breakdown (Right Column) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Spotlighted Metric Card */}
            <div className="p-6 rounded-2xl border border-[#E62B1E]/40 bg-[#E62B1E]/5 backdrop-blur-md relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#E62B1E]">
                    Current Strand
                  </span>
                  <h3 className="text-2xl font-bold mt-1">{activeMetric.label}</h3>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black font-mono text-white">
                    {activeMetric.score}
                    <span className="text-sm font-normal text-neutral-400">/100</span>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400 flex items-center justify-end gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +{activeMetric.score - activeMetric.benchmark}% above avg
                  </div>
                </div>
              </div>

              {/* Progress Bar Comparison */}
              <div className="mt-5 space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-neutral-400">
                  <span>Student Score ({activeMetric.score})</span>
                  <span>College Benchmark ({activeMetric.benchmark})</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-[#E62B1E] to-[#FF6B5B] rounded-full transition-all duration-500"
                    style={{ width: `${activeMetric.score}%` }}
                  />
                  {/* Benchmark line */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white"
                    style={{ left: `${activeMetric.benchmark}%` }}
                    title="Average Benchmark"
                  />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#E62B1E] shrink-0 mt-0.5" />
                <div className="text-xs text-neutral-300 leading-relaxed font-sans">
                  <span className="font-semibold text-white">Targeted Drill: </span>
                  {activeMetric.improvementTip}
                </div>
              </div>
            </div>

            {/* Selector Grid for All 6 Strands */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {COMMUNICATION_DNA_METRICS.map((metric) => {
                const isSelected = (hoveredKey || 'clarity') === metric.key;
                return (
                  <button
                    key={metric.key}
                    onClick={() => setHoveredKey(metric.key)}
                    onMouseEnter={() => setHoveredKey(metric.key)}
                    className={`text-left p-3.5 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? 'border-[#E62B1E] bg-white/10 ring-1 ring-[#E62B1E]'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-semibold truncate">{metric.label.split('(')[0]}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-mono text-sm font-bold text-white">{metric.score}</span>
                      <span className="text-[10px] font-mono text-neutral-400">bm: {metric.benchmark}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
