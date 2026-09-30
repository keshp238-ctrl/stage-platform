import React, { useState } from 'react';
import { Mic, Upload, Sparkles, RefreshCw, AlertCircle, CheckCircle2, Play, Volume2, Shield } from 'lucide-react';
import { AudioRecorderVisualizer } from '../ui/AudioRecorderVisualizer';

export const TalkLabView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'record' | 'upload'>('record');
  const [lastAnalysis, setLastAnalysis] = useState<{
    clarity: number;
    wpm: number;
    fillerCount: number;
    fillers: { word: string; timestamp: string }[];
    structureScore: number;
    confidenceScore: number;
    aiTip: string;
  } | null>({
    clarity: 92,
    wpm: 142,
    fillerCount: 2,
    fillers: [
      { word: 'basically', timestamp: '00:12' },
      { word: 'like', timestamp: '00:24' }
    ],
    structureScore: 88,
    confidenceScore: 90,
    aiTip: 'Strong vocal resonance. You paced your thesis statement at 138 WPM and paused for 0.9s before introducing the database bottleneck. To reach 95% clarity, lengthen short vowel sounds on technical nouns.',
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            AI Talk Lab
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
            Real-time biometric voice analysis. Evaluates vocal formants, pauses, filler words, and rhetorical structure.
          </p>
        </div>

        {/* Record vs Upload switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
          <button
            onClick={() => setActiveTab('record')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'record' ? 'bg-[#E62B1E] text-white font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Live Mic Recording
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'upload' ? 'bg-[#E62B1E] text-white font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Upload Audio File
          </button>
        </div>
      </div>

      {/* Recording Engine Component */}
      {activeTab === 'record' ? (
        <AudioRecorderVisualizer onAnalysisComplete={setLastAnalysis} />
      ) : (
        <div className="border-2 border-dashed border-white/15 rounded-3xl p-10 text-center space-y-4 hover:border-white/30 transition-all cursor-pointer bg-white/[0.01]">
          <div className="w-12 h-12 rounded-full bg-[#E62B1E]/10 border border-[#E62B1E]/20 flex items-center justify-center text-[#E62B1E] mx-auto">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-base text-white">Upload Practice Recording</div>
            <div className="text-xs text-neutral-400 mt-1 font-mono">Supports MP3, WAV, M4A, WEBM up to 25MB</div>
          </div>
          <button className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono uppercase tracking-wider text-white transition-all">
            Choose Audio File
          </button>
        </div>
      )}

      {/* Acoustic Analysis Timeline & Detailed Report */}
      {lastAnalysis && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E62B1E]" />
              <h3 className="font-bold text-base text-white">Diagnostic Report & Timeline</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> High Confidence Diagnosis
            </span>
          </div>

          {/* Timeline of Fillers & Pauses */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-neutral-400">
              <span>00:00 (Start)</span>
              <span>Detected Filler Word Flag Timeline</span>
              <span>00:30 (End)</span>
            </div>
            <div className="h-6 w-full rounded-xl bg-[#090A0E] border border-white/10 relative overflow-hidden flex items-center px-4">
              <div className="h-1 w-full bg-white/10 rounded-full" />
              {/* Flag 1 */}
              <div
                className="absolute top-1 bottom-1 w-6 bg-[#E62B1E]/80 rounded text-[9px] font-mono text-white flex items-center justify-center cursor-pointer"
                style={{ left: '38%' }}
                title="Filler: 'basically' at 00:12"
              >
                um
              </div>
              {/* Flag 2 */}
              <div
                className="absolute top-1 bottom-1 w-6 bg-[#E62B1E]/80 rounded text-[9px] font-mono text-white flex items-center justify-center cursor-pointer"
                style={{ left: '76%' }}
                title="Filler: 'like' at 00:24"
              >
                like
              </div>
            </div>
            <div className="text-[11px] font-mono text-neutral-400">
              Found 2 filler instances: &ldquo;basically&rdquo; (00:12) and &ldquo;like&rdquo; (00:24). Average pause duration was 0.82 seconds.
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-1">
              <div className="text-xs font-mono text-neutral-400 uppercase">Clarity</div>
              <div className="text-2xl font-black text-white">{lastAnalysis.clarity}%</div>
              <div className="text-[11px] text-emerald-400 font-mono">Consonants crisp</div>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-1">
              <div className="text-xs font-mono text-neutral-400 uppercase">Cadence</div>
              <div className="text-2xl font-black text-white">{lastAnalysis.wpm} <span className="text-xs font-normal">WPM</span></div>
              <div className="text-[11px] text-neutral-400 font-mono">Target: 135–155</div>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-1">
              <div className="text-xs font-mono text-neutral-400 uppercase">Structure</div>
              <div className="text-2xl font-black text-white">{lastAnalysis.structureScore}%</div>
              <div className="text-[11px] text-emerald-400 font-mono">STAR formatted</div>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-1">
              <div className="text-xs font-mono text-neutral-400 uppercase">Authority</div>
              <div className="text-2xl font-black text-[#FF6B5B]">{lastAnalysis.confidenceScore}%</div>
              <div className="text-[11px] text-neutral-400 font-mono">Downward tone</div>
            </div>
          </div>

          {/* Actionable Coach Note */}
          <div className="p-5 rounded-2xl bg-[#E62B1E]/10 border border-[#E62B1E]/20 space-y-2">
            <div className="text-xs font-mono text-[#E62B1E] uppercase font-bold tracking-wider">
              STAGE AI Verbal Prescription:
            </div>
            <p className="text-sm text-neutral-200 leading-relaxed font-sans">
              {lastAnalysis.aiTip}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
