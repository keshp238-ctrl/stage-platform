import React, { useState } from 'react';
import { Sparkles, Activity, Gauge, Zap, CheckCircle2, AlertTriangle } from 'lucide-react';
import { AudioRecorderVisualizer } from '../ui/AudioRecorderVisualizer';

interface TalkLabDemoSectionProps {
  isDarkMode?: boolean;
}

export const TalkLabDemoSection: React.FC<TalkLabDemoSectionProps> = ({ isDarkMode = true }) => {
  const [activeMetric, setActiveMetric] = useState<string>('clarity');

  const metricOrbs = [
    {
      id: 'clarity',
      label: 'Clarity & Articulation',
      score: '94%',
      status: 'Optimal',
      delta: '+12% this week',
      desc: 'Formant precision and clear phonetic boundaries without trailing off.',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
    },
    {
      id: 'pace',
      label: 'Cadence (142 WPM)',
      score: '142 WPM',
      status: 'Target: 135–155',
      delta: 'Balanced speed',
      desc: 'Rhythm accelerates during anecdotes and drops by 20% on key thesis takeaways.',
      icon: <Gauge className="w-4 h-4 text-[#E62B1E]" />
    },
    {
      id: 'fillers',
      label: 'Filler Economy',
      score: '1 per min',
      status: 'Top 5% percentile',
      delta: 'Saved 4.2 seconds',
      desc: 'Automatic replacement of "like" and "um" with conscious pause control.',
      icon: <Activity className="w-4 h-4 text-[#FF5538]" />
    },
    {
      id: 'structure',
      label: 'STAR Cohesion',
      score: '89%',
      status: 'Strong Logic',
      delta: 'Action → Result validated',
      desc: 'Identifies Situation, Task, Action, and Quantified Result sections automatically.',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />
    },
    {
      id: 'confidence',
      label: 'Vocal Inflection',
      score: '91%',
      status: 'Authoritative',
      delta: 'Zero uptalk detected',
      desc: 'Downward pitch cadence that signals conviction rather than doubt.',
      icon: <Zap className="w-4 h-4 text-sky-400" />
    }
  ];

  return (
    <section id="talk-lab" className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#E62B1E]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-mono tracking-[0.25em] text-[#E62B1E] uppercase font-bold mb-3">
              04 / INTERACTIVE PRODUCT DISPLAY
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              THE AI TALK LAB
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md mt-4 md:mt-0 font-light">
            Step onto the virtual rehearsal stage. Test your delivery in real-time and experience how STAGE breaks down vocal biometrics.
          </p>
        </div>

        {/* 2-Column Display: Floating Feedback Panel + Interactive 30s Practice Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Audio Recorder & Waveform Tester */}
          <div className="lg:col-span-6 space-y-4">
            <AudioRecorderVisualizer isDarkMode={isDarkMode} />
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-xs text-neutral-400 flex items-center justify-between font-mono">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Mic Audio processed locally in-browser
              </span>
              <span className="text-[#E62B1E]">Sub-200ms latency</span>
            </div>
          </div>

          {/* Right Column: Floating Metric Orbs & Interactive Breakdown */}
          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs font-mono tracking-widest uppercase text-neutral-400 mb-2">
              Select Biometric Indicator:
            </div>

            {metricOrbs.map((orb) => {
              const active = activeMetric === orb.id;
              return (
                <div
                  key={orb.id}
                  onClick={() => setActiveMetric(orb.id)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    active
                      ? 'border-[#E62B1E] bg-[#E62B1E]/10 ring-1 ring-[#E62B1E]/50 shadow-lg'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg border border-white/10 bg-white/5">
                        {orb.icon}
                      </div>
                      <div>
                        <div className="font-bold text-sm sm:text-base">{orb.label}</div>
                        <div className="text-xs text-neutral-400">{orb.status}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-lg text-white">{orb.score}</div>
                      <div className="text-[10px] font-mono text-[#E62B1E]">{orb.delta}</div>
                    </div>
                  </div>

                  {active && (
                    <div className="mt-3 pt-3 border-t border-white/10 text-xs text-neutral-300 leading-relaxed animate-fade-in font-sans">
                      {orb.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
