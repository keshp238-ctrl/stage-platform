import React from 'react';
import { Flame, Sparkles, ArrowRight, Play, CheckCircle2, TrendingUp, Compass, Award } from 'lucide-react';
import { DAILY_MISSIONS, COMMUNICATION_DNA_METRICS, FEATURED_TALKS } from '../../data/mockData';
import { AppTab } from './AppLayout';

interface DashboardViewProps {
  onNavigateTab: (tab: AppTab) => void;
  isDarkMode?: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigateTab, isDarkMode = true }) => {
  const mission = DAILY_MISSIONS[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Welcome back, Alex.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
            You are 1 speaking mission away from maintaining your 14-day streak.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#E62B1E]" />
            <span className="text-xs font-mono font-bold text-white">14 Days Streak</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl border border-[#E62B1E]/30 bg-[#E62B1E]/10 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E62B1E]" />
            <span className="text-xs font-mono font-bold text-[#E62B1E]">8,450 XP</span>
          </div>
        </div>
      </div>

      {/* Grid: Daily Mission & Internship Readiness Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Daily Speaking Mission (Linear Style Card) */}
        <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-5 flex flex-col justify-between hover:border-white/20 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded bg-[#E62B1E]/15 text-[#E62B1E] border border-[#E62B1E]/20">
                Today&apos;s Mission • {mission.category}
              </span>
              <span className="text-xs font-mono text-neutral-400">+{mission.xpReward} XP</span>
            </div>
            <h2 className="text-xl font-bold text-white">{mission.title}</h2>
            <p className="text-sm text-neutral-300 mt-2 leading-relaxed font-sans">
              &ldquo;{mission.prompt}&rdquo;
            </p>

            {/* Rubric check items */}
            <div className="mt-4 space-y-2">
              <div className="text-[11px] font-mono uppercase text-neutral-400">Evaluation Rubric:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {mission.rubric.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-neutral-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400">
              Duration: 60 Seconds • Audio Recorded Locally
            </span>
            <button
              onClick={() => onNavigateTab('talk-lab')}
              className="inline-flex items-center gap-2 bg-[#E62B1E] hover:bg-[#FF3E2B] text-white font-medium text-xs tracking-wider uppercase px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#E62B1E]/30"
            >
              <span>Record Mission Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Readiness Index Card */}
        <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col justify-between items-center text-center">
          <div className="w-full text-left">
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
              Recruiter Bar
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">Internship Readiness</h3>
          </div>

          <div className="my-4 relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#E62B1E"
                strokeWidth="8"
                strokeDasharray="264"
                strokeDashoffset="26"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-3xl font-black text-white">90</span>
              <span className="text-[9px] font-mono tracking-widest text-[#E62B1E] uppercase">Tier 1</span>
            </div>
          </div>

          <div className="space-y-2 w-full">
            <div className="text-xs text-neutral-300 font-sans">
              Eligible for verified recruiter matchmaking.
            </div>
            <button
              onClick={() => onNavigateTab('recruiter-mode')}
              className="w-full py-2 rounded-xl border border-white/10 hover:border-white/20 text-xs font-mono uppercase text-neutral-300 hover:text-white transition-all"
            >
              View Recruiter Rubric →
            </button>
          </div>
        </div>
      </div>

      {/* Communication DNA Summary Overview */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Communication DNA Snapshot</h3>
            <p className="text-xs text-neutral-400">Calculated over your last 12 recorded sessions.</p>
          </div>
          <button
            onClick={() => onNavigateTab('talk-lab')}
            className="text-xs font-mono uppercase text-[#E62B1E] hover:underline"
          >
            Full Acoustic Lab →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {COMMUNICATION_DNA_METRICS.map((m) => (
            <div key={m.key} className="p-3.5 rounded-xl border border-white/5 bg-white/5 space-y-2">
              <div className="text-[10px] font-mono text-neutral-400 truncate uppercase">{m.label.split('(')[0]}</div>
              <div className="text-xl font-black font-mono text-white">{m.score}%</div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#E62B1E]" style={{ width: `${m.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Talks to Study */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Recommended Talks to Study</h3>
          <button
            onClick={() => onNavigateTab('student-stage')}
            className="text-xs font-mono uppercase text-neutral-400 hover:text-white"
          >
            Explore Library ({FEATURED_TALKS.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURED_TALKS.slice(0, 3).map((talk) => (
            <div
              key={talk.id}
              onClick={() => onNavigateTab('student-stage')}
              className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[10px] font-mono text-[#E62B1E] uppercase">{talk.category}</span>
                <h4 className="font-bold text-sm text-white mt-1 line-clamp-2">{talk.title}</h4>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{talk.summary}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-neutral-400 font-mono">
                <span>{talk.speaker}</span>
                <span className="flex items-center gap-1 text-white">
                  <Play className="w-3 h-3 fill-current text-[#E62B1E]" /> {talk.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
