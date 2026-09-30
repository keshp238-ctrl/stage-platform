import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

interface JoinCtaSectionProps {
  onEnterStage: () => void;
  isDarkMode?: boolean;
}

export const JoinCtaSection: React.FC<JoinCtaSectionProps> = ({ onEnterStage }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitted(true);
    // Fire celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#E62B1E', '#FF5538', '#FFFFFF', '#FF8C7A'],
    });

    setTimeout(() => {
      onEnterStage();
    }, 1800);
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Spotlight glow behind CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#E62B1E]/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#E62B1E]" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-300">
            Open to Students Worldwide
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
          YOUR STAGE IS WAITING.
        </h2>

        <p className="mt-5 max-w-xl mx-auto text-base sm:text-lg text-neutral-400 font-light">
          Join free and give your first 60-second talk today. Discover your communication strengths, practice with AI, and get recognized.
        </p>

        {/* Email Capture or Celebratory State */}
        <div className="mt-10 max-w-md mx-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative rounded-2xl p-1 bg-gradient-to-r from-[#E62B1E]/40 via-white/10 to-[#E62B1E]/40 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#E62B1E] shadow-2xl">
                <div className="flex items-center bg-[#0F1117] rounded-xl overflow-hidden px-4 py-2">
                  <Mail className="w-5 h-5 text-neutral-500 mr-2 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your university or personal email..."
                    className="w-full bg-transparent border-none outline-none text-white text-sm placeholder:text-neutral-500 font-sans"
                  />
                  <button
                    type="submit"
                    className="shrink-0 inline-flex items-center gap-2 bg-[#E62B1E] hover:bg-[#FF3B2D] text-white font-semibold text-xs tracking-wider uppercase px-4 py-2.5 rounded-lg transition-all shadow-md shadow-[#E62B1E]/30"
                  >
                    <span>Join Free</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="mt-3 text-[11px] font-mono text-neutral-500">
                Zero spam. Free tier includes all Daily Missions & 30 AI Talk Lab sessions.
              </div>
            </form>
          ) : (
            <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-white animate-fade-in flex flex-col items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 animate-bounce" />
              <div className="font-bold text-base">Stage Key Generated!</div>
              <div className="text-xs text-neutral-300 font-mono">
                Transitioning to onboarding and calibration...
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
