import React, { useState } from 'react';
import { Flame, Users, Clock, ThumbsUp, Shield, Trophy, ArrowRight, Mic } from 'lucide-react';
import { DEBATE_TOPICS, COLLEGE_RANKINGS } from '../../data/mockData';

export const DebateArenaView: React.FC = () => {
  const [activeDebate, setActiveDebate] = useState(DEBATE_TOPICS[0]);
  const [votesA, setVotesA] = useState(activeDebate.collegeA.votes);
  const [votesB, setVotesB] = useState(activeDebate.collegeB.votes);
  const [userVote, setUserVote] = useState<'A' | 'B' | null>(null);

  const handleVote = (side: 'A' | 'B') => {
    if (userVote === side) return;
    if (side === 'A') {
      setVotesA(votesA + 1);
      if (userVote === 'B') setVotesB(votesB - 1);
    } else {
      setVotesB(votesB + 1);
      if (userVote === 'A') setVotesA(votesA - 1);
    }
    setUserVote(side);
  };

  const total = votesA + votesB;
  const pctA = Math.round((votesA / total) * 100);
  const pctB = 100 - pctA;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Intercollegiate Debate Arena
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
            Live parliamentary and Oxford-style showdowns between universities. Audience votes dictate argument impact scores.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-[#E62B1E] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm">
          <Mic className="w-3.5 h-3.5" /> Register for Next Debate
        </button>
      </div>

      {/* Live In-Session Arena Match Card */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E62B1E] animate-ping" />
            <span className="text-xs font-mono font-bold text-[#E62B1E] uppercase">
              {activeDebate.status} • Round 2 of 3
            </span>
          </div>
          <div className="text-xs font-mono text-neutral-400 flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-white">
              <Users className="w-3.5 h-3.5 text-[#E62B1E]" /> {activeDebate.activeViewers} Spectators
            </span>
            <span>{activeDebate.timeRemaining}</span>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
            Active Motion:
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            &ldquo;{activeDebate.title}&rdquo;
          </h2>
        </div>

        {/* Live Vote Sentiment Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[#E62B1E] font-bold">{activeDebate.collegeA.name}: {pctA}%</span>
            <span className="text-[#3B82F6] font-bold">{activeDebate.collegeB.name}: {pctB}%</span>
          </div>
          <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden flex">
            <div className="bg-[#E62B1E] transition-all duration-300" style={{ width: `${pctA}%` }} />
            <div className="bg-[#3B82F6] transition-all duration-300" style={{ width: `${pctB}%` }} />
          </div>
        </div>

        {/* Affirmative vs Negative Teams */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => handleVote('A')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              userVote === 'A'
                ? 'border-[#E62B1E] bg-[#E62B1E]/10 ring-1 ring-[#E62B1E]'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeDebate.collegeA.avatar}</span>
                <div>
                  <div className="font-bold text-sm text-white">{activeDebate.collegeA.name}</div>
                  <div className="text-[10px] font-mono text-[#E62B1E] uppercase">Affirmative Team</div>
                </div>
              </div>
              <span className="font-mono text-sm font-bold text-white">{votesA} votes</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              {activeDebate.collegeA.stance}
            </p>
            <button className="mt-4 w-full py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white flex items-center justify-center gap-2">
              <ThumbsUp className="w-3.5 h-3.5 text-[#E62B1E]" /> Vote for Affirmative
            </button>
          </div>

          <div
            onClick={() => handleVote('B')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              userVote === 'B'
                ? 'border-[#3B82F6] bg-[#3B82F6]/10 ring-1 ring-[#3B82F6]'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeDebate.collegeB.avatar}</span>
                <div>
                  <div className="font-bold text-sm text-white">{activeDebate.collegeB.name}</div>
                  <div className="text-[10px] font-mono text-[#3B82F6] uppercase">Negative Team</div>
                </div>
              </div>
              <span className="font-mono text-sm font-bold text-white">{votesB} votes</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              {activeDebate.collegeB.stance}
            </p>
            <button className="mt-4 w-full py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white flex items-center justify-center gap-2">
              <ThumbsUp className="w-3.5 h-3.5 text-[#3B82F6]" /> Vote for Negative
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Debates Schedule */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-white">Upcoming Tournament Debates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEBATE_TOPICS.slice(1).map((deb) => (
            <div
              key={deb.id}
              onClick={() => setActiveDebate(deb)}
              className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-[#E62B1E] uppercase">{deb.category}</span>
                <span>{deb.timeRemaining}</span>
              </div>
              <h4 className="font-bold text-sm text-white leading-snug line-clamp-2">{deb.title}</h4>
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono text-neutral-400">
                <span>{deb.collegeA.name} vs {deb.collegeB.name}</span>
                <span className="text-white hover:underline flex items-center gap-1">
                  View <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
