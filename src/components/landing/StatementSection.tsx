import React from 'react';
import { Sparkles, Terminal, Volume2, Award } from 'lucide-react';

interface StatementSectionProps {
  isDarkMode?: boolean;
}

export const StatementSection: React.FC<StatementSectionProps> = ({ isDarkMode = true }) => {
  return (
    <section id="why-stage" className="relative py-28 md:py-36 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-[#E62B1E] font-mono text-xs tracking-[0.28em] uppercase font-bold">
            01 / WHY STAGE
          </span>
          <div className="h-[1px] w-16 bg-[#E62B1E]/40" />
        </div>

        {/* Oversized Statement Headline */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.96]">
            MOST STUDENTS ARE TAUGHT TO CODE.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 via-neutral-100 to-white">
              NOBODY TEACHES THEM TO SPEAK.
            </span>
          </h2>
        </div>

        {/* 3 Pillars of Communication Leverage */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E62B1E]/10 border border-[#E62B1E]/20 flex items-center justify-center text-[#E62B1E]">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold">The Technical Ceiling</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              In an era where LLMs synthesize boilerplate code in milliseconds, the engineer who can clearly defend an architectural tradeoff will always command the room.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E62B1E]/10 border border-[#E62B1E]/20 flex items-center justify-center text-[#E62B1E]">
              <Volume2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold">The Interview Filter</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              84% of candidates fail technical screening not from algorithmic incompetence, but because they can not verbalize their problem-solving hypothesis out loud.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E62B1E]/10 border border-[#E62B1E]/20 flex items-center justify-center text-[#E62B1E]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold">The Stage Advantage</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              STAGE turns subjective speaking into measurable biometric data: pace, filler economy, rhetorical structure, and verified student keynotes that recruiters actually watch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
