import React, { useState } from 'react';
import { User, Award, CheckCircle2, Share2, Copy, Play, Flame, ExternalLink, Dna } from 'lucide-react';
import { COMMUNICATION_DNA_METRICS, FEATURED_TALKS } from '../../data/mockData';

export const StudentProfileView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Profile Header Card */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"
                alt="Alex Chen"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#E62B1E]/40"
              />
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-[#E62B1E] text-white text-[9px] font-mono font-bold">
                PRO
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">Alex Chen</h1>
                <CheckCircle2 className="w-5 h-5 text-[#E62B1E]" />
              </div>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                Computer Science & Cognitive AI • UC Berkeley &apos;26
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs font-mono text-neutral-300">
                <span className="flex items-center gap-1 text-[#E62B1E]">
                  <Flame className="w-3.5 h-3.5" /> 14-Day Streak
                </span>
                <span>•</span>
                <span>8,450 XP</span>
                <span>•</span>
                <span className="text-emerald-400">Rank #12 Berkeley</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-xs font-mono uppercase text-white flex items-center gap-2 transition-all"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied URL!' : 'Share Stage Profile'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Internship Readiness & Verified Keynotes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] text-center space-y-2">
          <div className="text-[10px] font-mono uppercase text-neutral-400">Internship Readiness Score</div>
          <div className="text-4xl font-mono font-black text-white">90<span className="text-sm font-normal text-[#E62B1E]">/100</span></div>
          <div className="text-xs text-emerald-400 font-mono">Top 5% Collegiate Benchmark</div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] text-center space-y-2">
          <div className="text-[10px] font-mono uppercase text-neutral-400">Acoustic Clarity Index</div>
          <div className="text-4xl font-mono font-black text-white">92<span className="text-sm font-normal text-[#E62B1E]">%</span></div>
          <div className="text-xs text-neutral-400 font-mono">Formant & Diction Precision</div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] text-center space-y-2">
          <div className="text-[10px] font-mono uppercase text-neutral-400">Keynotes Published</div>
          <div className="text-4xl font-mono font-black text-white">2 <span className="text-sm font-normal text-neutral-400">Talks</span></div>
          <div className="text-xs text-[#E62B1E] font-mono">24.8K Global Views</div>
        </div>
      </div>

      {/* Communication DNA Breakdown */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dna className="w-5 h-5 text-[#E62B1E]" />
            <h3 className="font-bold text-base text-white">Verified Communication DNA</h3>
          </div>
          <span className="text-xs font-mono text-neutral-400">Recruiter Scannable</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {COMMUNICATION_DNA_METRICS.map((m) => (
            <div key={m.key} className="p-4 rounded-xl border border-white/5 bg-white/5 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-neutral-300 truncate">{m.label.split('(')[0]}</span>
                <span className="font-mono font-bold text-white">{m.score}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#E62B1E]" style={{ width: `${m.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Published Keynote Showcase */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-white">Published Keynotes</h3>
        <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E62B1E]/15 border border-[#E62B1E]/30 flex items-center justify-center text-[#E62B1E] shrink-0">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Why Most CS Students Fail Their First Engineering Presentation</h4>
              <div className="text-xs font-mono text-neutral-400 mt-0.5">06:42 • 24.8K Views • Peer-Endorsed</div>
            </div>
          </div>
          <button className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono uppercase text-white shrink-0">
            Watch Presentation
          </button>
        </div>
      </div>
    </div>
  );
};
