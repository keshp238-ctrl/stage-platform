import React, { useState } from 'react';
import { Flame, Users, Clock, ThumbsUp, Trophy } from 'lucide-react';
import { DebatePodiums3D } from '../3d/DebatePodiums3D';
import { DEBATE_TOPICS, COLLEGE_RANKINGS } from '../../data/mockData';

interface DebateArenaSectionProps {
  isDarkMode?: boolean;
}

export const DebateArenaSection: React.FC<DebateArenaSectionProps> = ({ isDarkMode = true }) => {
  const [selectedTopic, setSelectedTopic] = useState(DEBATE_TOPICS[0]);
  const [votesA, setVotesA] = useState(selectedTopic.collegeA.votes);
  const [votesB, setVotesB] = useState(selectedTopic.collegeB.votes);
  const [votedSide, setVotedSide] = useState<'A' | 'B' | null>(null);

  const handleVote = (side: 'A' | 'B') => {
    if (votedSide === side) return;
    if (side === 'A') {
      setVotesA(votesA + 1);
      if (votedSide === 'B') setVotesB(votesB - 1);
    } else {
      setVotesB(votesB + 1);
      if (votedSide === 'A') setVotesA(votesA - 1);
    }
    setVotedSide(side);
  };

  const totalVotes = votesA + votesB;
  const pctA = Math.round((votesA / totalVotes) * 100);
  const pctB = 100 - pctA;

  return (
    <section id="debate-arena" className="py-28 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-mono tracking-[0.25em] text-[#E62B1E] uppercase font-bold mb-3">
              07 / INTERCOLLEGIATE CLASH
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              THE DEBATE ARENA
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md mt-4 md:mt-0 font-light">
            Colleges face off on high-stakes tech and philosophical motions. Timed rounds, instant audience sentiment, and live judging.
          </p>
        </div>

        {/* 3D Podiums Stage + Central Live Debate Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 rounded-3xl border border-white/10 glass-panel p-6 sm:p-8 space-y-6">
            {/* Live Status Pill */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E62B1E]/15 border border-[#E62B1E]/30 text-[#E62B1E] text-xs font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#E62B1E] animate-ping" />
                <span>{selectedTopic.status}</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#E62B1E]" /> {selectedTopic.activeViewers} Watching
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" /> {selectedTopic.timeRemaining}
                </span>
              </div>
            </div>

            {/* Debate Motion Title */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                Motion in Session:
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mt-1 text-white leading-snug">
                &ldquo;{selectedTopic.title}&rdquo;
              </h3>
            </div>

            {/* 3D Podiums Canvas */}
            <div className="rounded-2xl overflow-hidden border border-white/5 bg-[#090A0E]/60">
              <DebatePodiums3D isDarkMode={isDarkMode} />
            </div>

            {/* Stances & Live Sentiment Voting */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* College A */}
              <div
                onClick={() => handleVote('A')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  votedSide === 'A'
                    ? 'border-[#E62B1E] bg-[#E62B1E]/10 ring-1 ring-[#E62B1E]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{selectedTopic.collegeA.avatar}</span>
                    <span className="font-bold text-sm">{selectedTopic.collegeA.name}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#E62B1E]">{pctA}%</span>
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {selectedTopic.collegeA.stance}
                </p>
                <button className="mt-3 w-full py-1.5 rounded-lg border border-white/10 text-xs font-mono text-neutral-300 hover:text-white flex items-center justify-center gap-1.5">
                  <ThumbsUp className="w-3.5 h-3.5" /> Vote Affirmative
                </button>
              </div>

              {/* College B */}
              <div
                onClick={() => handleVote('B')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  votedSide === 'B'
                    ? 'border-[#3B82F6] bg-[#3B82F6]/10 ring-1 ring-[#3B82F6]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{selectedTopic.collegeB.avatar}</span>
                    <span className="font-bold text-sm">{selectedTopic.collegeB.name}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#3B82F6]">{pctB}%</span>
                </div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {selectedTopic.collegeB.stance}
                </p>
                <button className="mt-3 w-full py-1.5 rounded-lg border border-white/10 text-xs font-mono text-neutral-300 hover:text-white flex items-center justify-center gap-1.5">
                  <ThumbsUp className="w-3.5 h-3.5" /> Vote Negative
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Collegiate XP Leaderboard */}
          <div className="lg:col-span-4 rounded-3xl border border-white/10 glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#E62B1E]" />
                <span className="font-bold text-sm uppercase tracking-wider">College Cup Standings</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">Week 38</span>
            </div>

            <div className="space-y-3">
              {COLLEGE_RANKINGS.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/15 transition-all text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-neutral-400 w-4">{c.rank}</span>
                    <span className="text-base">{c.logo}</span>
                    <div>
                      <div className="font-semibold text-white">{c.name}</div>
                      <div className="text-[10px] text-neutral-400 font-mono">{c.activeSpeakers} debaters</div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-[#E62B1E]">{c.totalXp} XP</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
