import React, { useState } from 'react';
import { Trophy, Award, Flame, Users, TrendingUp } from 'lucide-react';
import { LEADERBOARD_USERS, COLLEGE_RANKINGS } from '../../data/mockData';

export const LeaderboardsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'individual' | 'college'>('individual');
  const [timeframe, setTimeframe] = useState<'weekly' | 'allTime'>('weekly');

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Global Speaker Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
            Ranked by verified speaking XP, debate victories, daily consistency, and peer reviews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Individual vs College */}
          <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'individual' ? 'bg-[#E62B1E] text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Top Students
            </button>
            <button
              onClick={() => setActiveTab('college')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'college' ? 'bg-[#E62B1E] text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Universities
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'individual' ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="p-4 border-b border-white/10 grid grid-cols-12 text-xs font-mono text-neutral-400 uppercase tracking-wider">
            <span className="col-span-1">Rank</span>
            <span className="col-span-6 sm:col-span-5">Speaker & College</span>
            <span className="col-span-2 hidden sm:block">Status Badge</span>
            <span className="col-span-2 hidden sm:block text-right">Streak</span>
            <span className="col-span-5 sm:col-span-2 text-right">Total XP</span>
          </div>

          <div className="divide-y divide-white/5">
            {LEADERBOARD_USERS.map((user) => (
              <div
                key={user.rank}
                className="p-4 sm:p-5 grid grid-cols-12 items-center hover:bg-white/[0.02] transition-colors"
              >
                <div className="col-span-1 font-mono font-bold text-sm">
                  {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : `#${user.rank}`}
                </div>

                <div className="col-span-6 sm:col-span-5 flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-white/10" />
                  <div>
                    <div className="font-bold text-sm text-white">{user.name}</div>
                    <div className="text-[11px] font-mono text-neutral-400">{user.college}</div>
                  </div>
                </div>

                <div className="col-span-2 hidden sm:block">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#E62B1E]/15 text-[#E62B1E] border border-[#E62B1E]/20">
                    {user.badge}
                  </span>
                </div>

                <div className="col-span-2 hidden sm:block text-right font-mono text-xs text-neutral-300">
                  <span className="flex items-center justify-end gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#E62B1E]" /> {user.streak} days
                  </span>
                </div>

                <div className="col-span-5 sm:col-span-2 text-right font-mono font-black text-sm text-white">
                  {user.xp.toLocaleString()} <span className="text-xs font-normal text-[#E62B1E]">XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="p-4 border-b border-white/10 grid grid-cols-12 text-xs font-mono text-neutral-400 uppercase tracking-wider">
            <span className="col-span-1">Rank</span>
            <span className="col-span-6 sm:col-span-6">University</span>
            <span className="col-span-2 hidden sm:block text-right">Active Debaters</span>
            <span className="col-span-5 sm:col-span-3 text-right">Aggregate XP</span>
          </div>

          <div className="divide-y divide-white/5">
            {COLLEGE_RANKINGS.map((c) => (
              <div
                key={c.name}
                className="p-4 sm:p-5 grid grid-cols-12 items-center hover:bg-white/[0.02] transition-colors"
              >
                <div className="col-span-1 font-mono font-bold text-sm">
                  #{c.rank}
                </div>
                <div className="col-span-6 sm:col-span-6 flex items-center gap-3">
                  <span className="text-2xl">{c.logo}</span>
                  <div>
                    <div className="font-bold text-sm text-white">{c.name}</div>
                    <div className="text-[11px] font-mono text-neutral-400">{c.country}</div>
                  </div>
                </div>
                <div className="col-span-2 hidden sm:block text-right font-mono text-xs text-neutral-300">
                  {c.activeSpeakers} students
                </div>
                <div className="col-span-5 sm:col-span-3 text-right font-mono font-black text-sm text-[#E62B1E]">
                  {c.totalXp} XP
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
