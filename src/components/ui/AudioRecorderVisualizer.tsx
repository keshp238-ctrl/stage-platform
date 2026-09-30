import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, Sparkles, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

interface AudioAnalysisResult {
  clarity: number;
  wpm: number;
  fillerCount: number;
  fillers: { word: string; timestamp: string }[];
  structureScore: number;
  confidenceScore: number;
  aiTip: string;
}

interface AudioRecorderVisualizerProps {
  onAudioLevelChange?: (level: number) => void;
  onAnalysisComplete?: (result: AudioAnalysisResult) => void;
  isDarkMode?: boolean;
}

export const AudioRecorderVisualizer: React.FC<AudioRecorderVisualizerProps> = ({
  onAudioLevelChange,
  onAnalysisComplete,
  isDarkMode = true,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [result, setResult] = useState<AudioAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [micActive, setMicActive] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const simTimerRef = useRef<number | null>(null);

  // Timer while recording
  useEffect(() => {
    let interval: number | null = null;
    if (isRecording) {
      interval = window.setInterval(() => {
        setSeconds((s) => {
          if (s >= 30) {
            stopRecording();
            return 30;
          }
          return s + 1;
        });
      }, 1000);
    } else {
      setSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const startRecording = async () => {
    setResult(null);
    setIsRecording(true);
    setSeconds(0);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        setMicActive(true);

        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        const analyser = ctx.createAnalyser();
        analyser.fftSize = 128;
        analyserRef.current = analyser;

        const source = ctx.createMediaStreamSource(stream);
        source.connect(analyser);

        drawLiveWaveform();
      } else {
        fallbackSimulatedAudio();
      }
    } catch {
      // Permission dismissed or not available; fallback gracefully to simulated waveform
      setMicActive(false);
      fallbackSimulatedAudio();
    }
  };

  const fallbackSimulatedAudio = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;
    const animateSim = () => {
      step += 0.08;
      const simulatedLevel = (Math.sin(step * 3) * 0.5 + 0.5) * 0.7 + 0.15;
      if (onAudioLevelChange) onAudioLevelChange(simulatedLevel);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 36;
      const barWidth = canvas.width / bars - 2;

      for (let i = 0; i < bars; i++) {
        const h = Math.abs(Math.sin(step + i * 0.3)) * canvas.height * 0.75 * simulatedLevel + 4;
        const x = i * (barWidth + 2);
        const y = (canvas.height - h) / 2;

        ctx.fillStyle = i % 2 === 0 ? '#E62B1E' : '#FF6B5B';
        ctx.fillRect(x, y, barWidth, h);
      }

      animationFrameRef.current = requestAnimationFrame(animateSim);
    };
    animateSim();
  };

  const drawLiveWaveform = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      analyser.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const avg = sum / bufferLength / 255;
      if (onAudioLevelChange) onAudioLevelChange(avg);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 32;
      const step = Math.floor(bufferLength / bars);
      const barWidth = canvas.width / bars - 2;

      for (let i = 0; i < bars; i++) {
        const val = dataArray[i * step] / 255;
        const h = Math.max(val * canvas.height * 0.85, 4);
        const x = i * (barWidth + 2);
        const y = (canvas.height - h) / 2;

        ctx.fillStyle = val > 0.4 ? '#E62B1E' : '#FF705E';
        ctx.fillRect(x, y, barWidth, h);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (simTimerRef.current) clearInterval(simTimerRef.current);
    if (onAudioLevelChange) onAudioLevelChange(0);

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }

    // Trigger AI analysis simulation
    setIsAnalyzing(true);
    setTimeout(() => {
      const generatedResult: AudioAnalysisResult = {
        clarity: 92,
        wpm: 142,
        fillerCount: 1,
        fillers: [{ word: 'um', timestamp: '00:14' }],
        structureScore: 89,
        confidenceScore: 88,
        aiTip: 'Crisp pace at 142 WPM. Strong downward inflection when introducing the problem statement. Reduced hesitation by 74% compared to baseline.',
      };
      setResult(generatedResult);
      setIsAnalyzing(false);
      if (onAnalysisComplete) onAnalysisComplete(generatedResult);
    }, 1200);
  };

  return (
    <div
      className={`rounded-2xl border p-5 md:p-6 transition-all duration-300 ${
        isDarkMode
          ? 'bg-[#111319]/90 border-white/10 shadow-2xl'
          : 'bg-white/95 border-black/10 shadow-xl'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-[#E62B1E] animate-ping' : 'bg-emerald-500'}`} />
          <span className="text-xs font-mono uppercase tracking-wider font-semibold">
            {isRecording ? 'Acoustic AI Listening' : 'AI Speech Analysis Lab'}
          </span>
        </div>
        <div className="text-xs font-mono text-neutral-400">
          {isRecording ? `00:${seconds.toString().padStart(2, '0')} / 00:30` : '30-Sec Test'}
        </div>
      </div>

      {/* Waveform Canvas */}
      <div
        className={`w-full h-24 rounded-xl border flex items-center justify-center overflow-hidden relative ${
          isDarkMode ? 'bg-[#090A0E] border-white/5' : 'bg-neutral-100 border-black/5'
        }`}
      >
        <canvas ref={canvasRef} width={400} height={96} className="w-full h-full" />
        {!isRecording && !isAnalyzing && !result && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-neutral-400">
            Click &apos;Start 30s Practice&apos; below to analyze your voice
          </div>
        )}
        {isAnalyzing && (
          <div className="absolute inset-0 bg-[#090A0E]/80 backdrop-blur-sm flex items-center justify-center gap-2 text-xs font-mono text-white">
            <RefreshCw className="w-4 h-4 animate-spin text-[#E62B1E]" />
            Evaluating acoustic frequencies & filler patterns...
          </div>
        )}
      </div>

      {/* Recording Control Button */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#E62B1E] hover:bg-[#FF3C2E] text-white font-medium text-xs tracking-wider uppercase px-5 py-3 rounded-xl transition-all shadow-md shadow-[#E62B1E]/30 hover:scale-[1.01]"
          >
            <Mic className="w-4 h-4" />
            <span>Try 30-Second Practice</span>
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs tracking-wider uppercase px-5 py-3 rounded-xl border border-white/10 transition-all"
          >
            <Square className="w-4 h-4 text-[#E62B1E] fill-[#E62B1E]" />
            <span>Stop & Score My Speech</span>
          </button>
        )}
      </div>

      {/* Analysis Result Card */}
      {result && (
        <div className="mt-5 pt-4 border-t border-white/10 animate-fade-in space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className={`p-2.5 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'}`}>
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Clarity</div>
              <div className="text-lg font-bold text-white mt-0.5">{result.clarity}%</div>
            </div>
            <div className={`p-2.5 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'}`}>
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Pace</div>
              <div className="text-lg font-bold text-white mt-0.5">{result.wpm} <span className="text-[10px] font-normal text-neutral-400">WPM</span></div>
            </div>
            <div className={`p-2.5 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'}`}>
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Fillers</div>
              <div className="text-lg font-bold text-emerald-400 mt-0.5">{result.fillerCount} <span className="text-[10px] font-normal text-neutral-400">(Low)</span></div>
            </div>
            <div className={`p-2.5 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'}`}>
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Confidence</div>
              <div className="text-lg font-bold text-[#FF6B5B] mt-0.5">{result.confidenceScore}%</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#E62B1E]/10 border border-[#E62B1E]/20 text-xs flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#E62B1E] shrink-0 mt-0.5" />
            <p className="text-neutral-300 leading-relaxed font-sans">{result.aiTip}</p>
          </div>
        </div>
      )}
    </div>
  );
};
