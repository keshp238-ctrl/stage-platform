import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowRight, Menu, X, Sparkles, Mic, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onEnterStage: () => void;
  onNavigateSection: (sectionId: string) => void;
  isLoggedInApp: boolean;
  onToggleAppMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  onToggleTheme,
  onEnterStage,
  onNavigateSection,
  isLoggedInApp,
  onToggleAppMode,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Talks', target: 'ted-stage' },
    { label: 'Practice', target: 'talk-lab' },
    { label: 'Debate', target: 'debate-arena' },
    { label: 'Features', target: 'features' },
    { label: 'Careers', target: 'career-readiness' },
    { label: 'Why STAGE', target: 'why-stage' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? isDarkMode
              ? 'bg-[#0A0B0E]/80 backdrop-blur-xl border-b border-white/[0.08] py-3.5'
              : 'bg-white/80 backdrop-blur-xl border-b border-black/[0.08] shadow-sm py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => onNavigateSection('hero')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-[#B31B10] to-[#E62B1E] flex items-center justify-center shadow-lg shadow-[#E62B1E]/20 transition-transform duration-300 group-hover:scale-105">
              <span className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
              <div className="absolute inset-0 rounded-lg border border-white/20" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-[0.22em] uppercase leading-none font-sans">
                STAGE
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#E62B1E] uppercase mt-0.5">
                AI Speaking
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => onNavigateSection(link.target)}
                className={`text-xs font-medium tracking-wider uppercase transition-colors duration-200 ${
                  isDarkMode
                    ? 'text-neutral-400 hover:text-white'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border transition-all duration-200 ${
                isDarkMode
                  ? 'border-white/10 bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10'
                  : 'border-black/10 bg-black/5 text-neutral-700 hover:text-black hover:bg-black/10'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Switch between Landing & Full App Mode */}
            <button
              onClick={onToggleAppMode}
              className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xl border transition-all duration-200 flex items-center gap-1.5 ${
                isLoggedInApp
                  ? 'bg-neutral-800 text-white border-white/20'
                  : isDarkMode
                  ? 'border-white/10 text-neutral-400 hover:text-white hover:bg-white/5'
                  : 'border-black/10 text-neutral-600 hover:text-black hover:bg-black/5'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              {isLoggedInApp ? 'Landing' : 'Student App'}
            </button>

            {/* Enter the Stage CTA */}
            <button
              onClick={onEnterStage}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-[#E62B1E] to-[#FF4438] hover:shadow-lg hover:shadow-[#E62B1E]/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Enter the Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg border border-white/10 bg-white/5 text-neutral-300"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-white/10 bg-white/5 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-30 pt-24 px-6 pb-8 flex flex-col justify-between sm:hidden transition-all duration-300 ${
            isDarkMode ? 'bg-[#0A0B0E] text-white' : 'bg-[#F9F9F8] text-neutral-900'
          }`}
        >
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => {
                  onNavigateSection(link.target);
                  setMobileMenuOpen(false);
                }}
                className="text-left text-xl font-bold tracking-tight py-2 border-b border-white/10"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                onToggleAppMode();
                setMobileMenuOpen(false);
              }}
              className="text-left text-xl font-bold text-[#E62B1E] py-2 flex items-center justify-between"
            >
              <span>{isLoggedInApp ? 'View Landing Page' : 'Launch Student App'}</span>
              <LayoutDashboard className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onEnterStage();
              }}
              className="w-full py-3.5 rounded-xl bg-[#E62B1E] text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#E62B1E]/40"
            >
              <span>Enter the Stage</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
