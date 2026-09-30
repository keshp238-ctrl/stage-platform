import React from 'react';
import {
  LayoutDashboard,
  Mic,
  MessageSquare,
  FileText,
  Users,
  Trophy,
  Flame,
  Radio,
  BookOpen,
  Briefcase,
  Sparkles,
  User,
  LogOut,
  Sun,
  Moon,
  Home,
  Compass,
  Award
} from 'lucide-react';

export type AppTab =
  | 'dashboard'
  | 'talk-lab'
  | 'mock-interview'
  | 'real-life-sims'
  | 'resume-interview'
  | 'debate-arena'
  | 'college-competitions'
  | 'conversation-rooms'
  | 'student-stage'
  | 'leaderboards'
  | 'recruiter-mode'
  | 'career-coach'
  | 'profile';

interface AppLayoutProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  onExitApp: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  userStats: {
    name: string;
    college: string;
    xp: number;
    streak: number;
    readinessScore: number;
    level: string;
  };
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  currentTab,
  onSelectTab,
  onExitApp,
  isDarkMode,
  onToggleTheme,
  userStats,
  children,
}) => {
  const navItems: { id: AppTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'talk-lab', label: 'AI Talk Lab', icon: <Mic className="w-4 h-4" />, badge: 'Live AI' },
    { id: 'mock-interview', label: 'Mock Interview', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'real-life-sims', label: 'Real Simulations', icon: <Users className="w-4 h-4" />, badge: '5 Scenarios' },
    { id: 'resume-interview', label: 'Resume → Qs', icon: <FileText className="w-4 h-4" /> },
    { id: 'debate-arena', label: 'Debate Arena', icon: <Flame className="w-4 h-4" />, badge: '3 Live' },
    { id: 'college-competitions', label: 'Competitions', icon: <Trophy className="w-4 h-4" /> },
    { id: 'conversation-rooms', label: 'Audio Rooms', icon: <Radio className="w-4 h-4" /> },
    { id: 'student-stage', label: 'TED Stage', icon: <Compass className="w-4 h-4" /> },
    { id: 'leaderboards', label: 'Leaderboards', icon: <Award className="w-4 h-4" /> },
    { id: 'recruiter-mode', label: 'Recruiter Mode', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'career-coach', label: 'AI Career Coach', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'profile', label: 'Public Profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${isDarkMode ? 'bg-[#090A0E] text-white' : 'bg-[#F9F9F8] text-neutral-900'}`}>
      {/* Desktop Sidebar (Linear-style clean hierarchy) */}
      <aside className={`hidden md:flex flex-col justify-between w-64 border-r shrink-0 p-4 sticky top-0 h-screen ${isDarkMode ? 'border-white/10 bg-[#0E1017]' : 'border-black/10 bg-white'}`}>
        <div className="space-y-6">
          {/* Top Monogram */}
          <div className="flex items-center justify-between px-2">
            <div
              onClick={onExitApp}
              className="flex items-center gap-2.5 cursor-pointer group"
              title="Return to Landing Page"
            >
              <div className="w-7 h-7 rounded-lg bg-[#E62B1E] flex items-center justify-center text-white shadow-md shadow-[#E62B1E]/30">
                <span className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span className="font-black text-sm tracking-[0.2em] uppercase font-sans">
                STAGE
              </span>
            </div>
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded-lg border border-white/10 text-neutral-400 hover:text-white"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* User Progress Pill */}
          <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white truncate">{userStats.name}</span>
              <span className="font-mono text-[#E62B1E] font-bold text-[11px]">{userStats.level}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#E62B1E]" /> {userStats.streak}d streak
              </span>
              <span>{userStats.xp.toLocaleString()} XP</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#E62B1E] rounded-full" style={{ width: '74%' }} />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? 'bg-[#E62B1E] text-white font-semibold shadow-sm'
                      : isDarkMode
                      ? 'text-neutral-400 hover:text-white hover:bg-white/5'
                      : 'text-neutral-600 hover:text-black hover:bg-black/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                        active
                          ? 'bg-black/30 text-white'
                          : 'bg-[#E62B1E]/15 text-[#E62B1E]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <button
            onClick={onExitApp}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-all font-mono"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Back to Landing</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 min-w-0 pb-20 md:pb-8 flex flex-col">
        {/* Top Minimal App Header */}
        <header className={`px-6 py-4 border-b flex items-center justify-between sticky top-0 z-20 backdrop-blur-md ${isDarkMode ? 'border-white/10 bg-[#090A0E]/80' : 'border-black/10 bg-white/80'}`}>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-widest text-[#E62B1E] uppercase font-bold">
              STAGE OS
            </span>
            <span className="text-neutral-600">/</span>
            <span className="text-xs font-mono uppercase text-neutral-400">
              {navItems.find((n) => n.id === currentTab)?.label}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span>Readiness:</span>
              <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded-md">
                {userStats.readinessScore}/100
              </span>
            </div>
            <button
              onClick={() => onSelectTab('talk-lab')}
              className="px-3 py-1.5 rounded-xl bg-[#E62B1E] text-white text-xs font-medium flex items-center gap-1.5 shadow-sm"
            >
              <Mic className="w-3.5 h-3.5" /> Quick Practice
            </button>
          </div>
        </header>

        {/* View Content */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t py-2 px-4 flex items-center justify-around backdrop-blur-xl ${isDarkMode ? 'border-white/10 bg-[#0E1017]/95 text-neutral-400' : 'border-black/10 bg-white/95 text-neutral-600'}`}>
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`flex flex-col items-center gap-1 text-[10px] ${currentTab === 'dashboard' ? 'text-[#E62B1E]' : ''}`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => onSelectTab('talk-lab')}
          className={`flex flex-col items-center gap-1 text-[10px] ${currentTab === 'talk-lab' ? 'text-[#E62B1E]' : ''}`}
        >
          <Mic className="w-4 h-4" />
          <span>Practice</span>
        </button>
        <button
          onClick={() => onSelectTab('mock-interview')}
          className={`flex flex-col items-center gap-1 text-[10px] ${currentTab === 'mock-interview' ? 'text-[#E62B1E]' : ''}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Interview</span>
        </button>
        <button
          onClick={() => onSelectTab('debate-arena')}
          className={`flex flex-col items-center gap-1 text-[10px] ${currentTab === 'debate-arena' ? 'text-[#E62B1E]' : ''}`}
        >
          <Flame className="w-4 h-4" />
          <span>Debate</span>
        </button>
        <button
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center gap-1 text-[10px] ${currentTab === 'profile' ? 'text-[#E62B1E]' : ''}`}
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
};
