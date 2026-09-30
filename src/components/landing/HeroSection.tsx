import React, { useState } from 'react';
import { ArrowRight, Play, Mic, MicOff, Sparkles } from 'lucide-react';
import { VoiceStageCanvas } from '../3d/VoiceStageCanvas';

interface HeroSectionProps {
  onEnterStage: () => void;
  onWatchTalks: () => void;
  isDarkMode?: boolean;
  activeGoal?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onEnterStage,
  onWatchTalks,
  isDarkMode = true,
  activeGoal,
}) => {
  const [micActive, setMicActive] = useState(false);
  const [simulatedLevel, setSimulatedLevel] = useState(0);

  const toggleMic = async () => {
    if (!micActive) {
      try {
        if (navigator.mediaDevices?.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new AudioContextClass();
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 64;
          const source = ctx.createMediaStreamSource(stream);
          source.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          const checkLevel = () => {
            if (!micActive) return;
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
            const avg = sum / dataArray.length / 255;
            setSimulatedLevel(avg);
            requestAnimationFrame(checkLevel);
          };
          setMicActive(true);
          checkLevel();
        } else {
          setMicActive(true);
          simulateAudio();
        }
      } catch {
        setMicActive(true);
        simulateAudio();
      }
    } else {
      setMicActive(false);
      setSimulatedLevel(0);
    }
  };

  const simulateAudio = () => {
    let t = 0;
    const interval = setInterval(() => {
      t += 0.1;
      setSimulatedLevel(Math.abs(Math.sin(t * 3)) * 0.7 + 0.1);
    }, 50);
    setTimeout(() => {
      clearInterval(interval);
      setMicActive(false);
      setSimulatedLevel(0);
    }, 6000);
  };

  const journeySteps = ['LEARN', 'PRACTICE', 'SPEAK', 'CONNECT', 'GET HIRED'];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden">
      {/* 3D Immersive Stage Environment Behind Content */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <VoiceStageCanvas
          audioLevel={simulatedLevel}
          isDarkMode={isDarkMode}
          activeGoal={activeGoal}
        />
      </div>

      {/* Atmospheric Vignette Gradients */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#0A0B0E]/90 dark:to-[#0A0B0E] to-70%" />

      {/* Center Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
        {/* Top Category Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#E62B1E] animate-ping" />
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-300">
            The Student Speaking Platform
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight uppercase leading-[0.92] text-balance">
          FIND YOUR VOICE.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E62B1E] via-[#FF5538] to-[#FF8C7A]">
            OWN THE STAGE.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
          Practice interviews with AI, deliver your own talks, debate other colleges, and build the communication skills that get you hired.
        </p>

        {/* Actions & Mic Interactive Demo */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onEnterStage}
            data-cursor="ENTER"
            className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-xl text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-[#E62B1E] to-[#FF3E2B] shadow-xl shadow-[#E62B1E]/30 hover:shadow-[#E62B1E]/50 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Enter the Stage</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={onWatchTalks}
            data-cursor="WATCH"
            className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xl text-sm font-medium tracking-wide border border-white/15 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/30 transition-all duration-200"
          >
            <Play className="w-3.5 h-3.5 fill-current text-[#E62B1E]" />
            <span>Watch Student Talks</span>
          </button>

          <button
            onClick={toggleMic}
            className={`inline-flex items-center gap-2 px-4 py-4 rounded-xl text-xs font-mono uppercase tracking-wider border transition-all ${
              micActive
                ? 'bg-[#E62B1E]/20 border-[#E62B1E] text-white animate-pulse'
                : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:border-white/20'
            }`}
            title="Test real-time microphone reaction with the 3D stage rings"
          >
            {micActive ? <Mic className="w-4 h-4 text-[#E62B1E]" /> : <MicOff className="w-4 h-4" />}
            <span className="hidden sm:inline">{micActive ? 'Mic Active: Speak!' : 'Test 3D Mic Reaction'}</span>
          </button>
        </div>
      </div>

      {/* Under Hero: Animated Journey Progression Line */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 w-full mt-12">
        <div className="flex items-center justify-between py-4 px-6 rounded-2xl glass-panel text-xs font-mono tracking-widest text-neutral-400 overflow-x-auto gap-3">
          {journeySteps.map((step, idx) => (
            <React.Fragment key={step}>
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E62B1E]" />
                <span className="text-white font-semibold hover:text-[#E62B1E] transition-colors cursor-default">
                  {step}
                </span>
              </div>
              {idx < journeySteps.length - 1 && (
                <span className="text-neutral-600 select-none">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
