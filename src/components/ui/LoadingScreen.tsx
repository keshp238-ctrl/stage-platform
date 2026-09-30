import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setFadeOut(true), 150);
          setTimeout(() => onComplete(), 750);
          return 100;
        }
        // Accelerating progress
        const inc = prev < 50 ? 4 : prev < 85 ? 7 : 12;
        return Math.min(prev + inc, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#090A0E] text-white transition-all duration-700 ease-out select-none ${
        fadeOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Volumetric ambient spotlight turning on */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] pointer-events-none transition-opacity duration-1000"
        style={{
          opacity: progress / 100,
          background: 'radial-gradient(circle at 50% 0%, rgba(230, 43, 30, 0.25) 0%, rgba(230, 43, 30, 0.05) 50%, transparent 80%)',
        }}
      />

      {/* Center Stage Ring & Wordmark */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Glowing Monogram */}
        <div className="relative mb-6">
          <div
            className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500"
            style={{
              borderColor: progress > 60 ? 'rgba(230, 43, 30, 0.8)' : 'rgba(255, 255, 255, 0.15)',
              boxShadow: progress > 70 ? '0 0 30px rgba(230, 43, 30, 0.35)' : 'none',
            }}
          >
            <div className="w-4 h-4 rounded-full bg-[#E62B1E] animate-pulse" />
          </div>
        </div>

        {/* Brand Name */}
        <div className="text-xl md:text-2xl font-black tracking-[0.28em] uppercase text-white mb-2">
          STAGE
        </div>
        <div className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
          The Student Speaking Platform
        </div>

        {/* Counter: 00 -> 100 */}
        <div className="mt-8 font-mono text-3xl md:text-4xl font-light tracking-tight text-white/90">
          {progress.toString().padStart(2, '0')}
          <span className="text-xs ml-1 text-[#E62B1E] font-bold">%</span>
        </div>

        {/* Fine minimalist progress line */}
        <div className="w-44 h-[2px] bg-white/10 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#E62B1E] to-[#FF6B5B] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
