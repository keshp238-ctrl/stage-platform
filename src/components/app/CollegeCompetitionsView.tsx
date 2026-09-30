import React, { useState } from 'react';
import { Trophy, Calendar, Users, Award, Shield, CheckCircle2, ArrowRight, X } from 'lucide-react';

export const CollegeCompetitionsView: React.FC = () => {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<string>('Pan-Ivy Debate Open');
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [collegeEmail, setCollegeEmail] = useState('');

  const upcomingCompetitions = [
    {
      id: 'c1',
      title: 'Global Intercollegiate Oratory Cup 2026',
      organizer: 'STAGE Collegiate Federation & TEDx Student Network',
      prize: '$15,000 Venture Grant',
      date: 'Oct 24–26, 2026',
      stage: 'Registration Open',
      teamsRegistered: 64,
      maxTeams: 128,
      category: 'Keynote & Public Speaking'
    },
    {
      id: 'c2',
      title: 'Pan-Ivy League Technical Debate Championship',
      organizer: 'MIT & Stanford Debate Unions',
      prize: '$10,000 + Recruiter Intros',
      date: 'Nov 12–14, 2026',
      stage: 'Quarterfinals Approaching',
      teamsRegistered: 32,
      maxTeams: 32,
      category: 'Parliamentary Debate'
    },
    {
      id: 'c3',
      title: 'National CS Capstone Pitch-Off',
      organizer: 'ACM Student Chapters & Y Combinator Alums',
      prize: '$25,000 Angel Check',
      date: 'Dec 05, 2026',
      stage: 'Early Submissions',
      teamsRegistered: 48,
      maxTeams: 64,
      category: 'Startup Elevator Pitch'
    }
  ];

  const bracketMatches = [
    {
      round: 'Semifinals Match A',
      team1: { name: 'MIT Debate Union', score: '94 pts', winner: true },
      team2: { name: 'Stanford Forensics', score: '89 pts', winner: false }
    },
    {
      round: 'Semifinals Match B',
      team1: { name: 'UC Berkeley Orators', score: '92 pts', winner: true },
      team2: { name: 'Waterloo Eng Society', score: '88 pts', winner: false }
    },
    {
      round: 'Grand Championship Finals',
      team1: { name: 'MIT Debate Union', score: 'TBD', winner: false },
      team2: { name: 'UC Berkeley Orators', score: 'TBD', winner: false }
    }
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName || !collegeEmail) return;
    setRegisteredSuccess(true);
    setTimeout(() => {
      setRegisteredSuccess(false);
      setRegisterModalOpen(false);
      setTeamName('');
      setCollegeEmail('');
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Intercollegiate Competitions
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
            Represent your university in global debate tournaments, keynote championships, and capstone pitch-offs.
          </p>
        </div>

        <button
          onClick={() => setRegisterModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#E62B1E] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm"
        >
          <Trophy className="w-3.5 h-3.5" /> Register University Team
        </button>
      </div>

      {/* Featured Tournament Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {upcomingCompetitions.map((comp) => (
          <div
            key={comp.id}
            className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span className="text-[#E62B1E] uppercase font-bold">{comp.category}</span>
                <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">{comp.stage}</span>
              </div>
              <h3 className="font-bold text-base text-white mt-2 leading-snug">{comp.title}</h3>
              <p className="text-xs text-neutral-400 mt-1">{comp.organizer}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/5 text-xs font-mono">
              <div className="flex justify-between text-neutral-300">
                <span>Prize Pool:</span>
                <span className="font-bold text-emerald-400">{comp.prize}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Dates:</span>
                <span className="text-white">{comp.date}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Capacity:</span>
                <span>{comp.teamsRegistered} / {comp.maxTeams} Teams</span>
              </div>
              <button
                onClick={() => {
                  setSelectedTournament(comp.title);
                  setRegisterModalOpen(true);
                }}
                className="w-full py-2 rounded-xl bg-white/10 hover:bg-[#E62B1E] text-white text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <span>Enter Bracket</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Live Tournament Bracket Visualization */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase text-[#E62B1E] tracking-wider font-semibold">
              Live Season Brackets
            </span>
            <h2 className="text-xl font-bold text-white mt-1">
              Global Championship Knockout Stage
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400 bg-white/5 px-3 py-1 rounded-lg">
            Season 2026 Finals
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {bracketMatches.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-3 relative"
            >
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                {m.round}
              </div>

              <div className="space-y-2">
                <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${m.team1.winner ? 'border-[#E62B1E] bg-[#E62B1E]/10 font-bold text-white' : 'border-white/5 bg-black/20 text-neutral-300'}`}>
                  <span>{m.team1.name}</span>
                  <span className="font-mono">{m.team1.score}</span>
                </div>

                <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${m.team2.winner ? 'border-[#E62B1E] bg-[#E62B1E]/10 font-bold text-white' : 'border-white/5 bg-black/20 text-neutral-300'}`}>
                  <span>{m.team2.name}</span>
                  <span className="font-mono">{m.team2.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {registerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setRegisterModalOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-white/15 bg-[#111319] p-6 space-y-5 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-base">Register Collegiate Delegation</h3>
              <button onClick={() => setRegisterModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {!registeredSuccess ? (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase">Selected Event</label>
                  <input
                    type="text"
                    disabled
                    value={selectedTournament}
                    className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-sm text-neutral-300 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase">University / Club Name</label>
                  <input
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. Berkeley Forensics Society"
                    className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-[#090A0E] text-sm text-white placeholder:text-neutral-500 outline-none focus:border-[#E62B1E]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase">Lead Representative .edu Email</label>
                  <input
                    type="email"
                    required
                    value={collegeEmail}
                    onChange={(e) => setCollegeEmail(e.target.value)}
                    placeholder="e.g. captain@berkeley.edu"
                    className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-[#090A0E] text-sm text-white placeholder:text-neutral-500 outline-none focus:border-[#E62B1E]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setRegisterModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-mono text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#E62B1E] text-white text-xs font-semibold uppercase tracking-wider shadow-md shadow-[#E62B1E]/30"
                  >
                    Submit Roster Entry
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <div className="font-bold text-lg">Team Entry Verified!</div>
                <div className="text-xs text-neutral-400 font-mono">Brackets credentials sent to {collegeEmail}.</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
