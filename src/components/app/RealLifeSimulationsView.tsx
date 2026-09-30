import React, { useState } from 'react';
import { Presentation, Users, Briefcase, MessageSquare, ShieldAlert, Sparkles, Play, CheckCircle2, RefreshCw, Clock } from 'lucide-react';

interface SimulationScenario {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  difficulty: 'Standard' | 'High Stakes' | 'Extreme Pressure';
  duration: string;
  description: string;
  audiencePersona: string;
  prompts: string[];
  interruptionChance: string;
}

export const RealLifeSimulationsView: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('presentation');
  const [activeSession, setActiveSession] = useState<SimulationScenario | null>(null);
  const [simStep, setSimStep] = useState<'idle' | 'recording' | 'feedback'>('idle');
  const [timer, setTimer] = useState<number>(0);
  const [simFeedback, setSimFeedback] = useState<string | null>(null);

  const scenarios: SimulationScenario[] = [
    {
      id: 'presentation',
      title: 'Executive Boardroom Presentation',
      category: 'Leadership & Stakeholders',
      icon: <Presentation className="w-5 h-5 text-[#E62B1E]" />,
      difficulty: 'High Stakes',
      duration: '3 Minutes',
      description: 'Present a cloud infrastructure overhaul to skeptical non-technical VPs who only care about cost and downtime risks.',
      audiencePersona: 'Skeptical CFO & VP of Engineering asking for ROI numbers at second 45.',
      prompts: [
        'Open with financial and customer risk, not Kubernetes jargon.',
        'Address the 4-hour migration maintenance window upfront.',
        'Conclude with quantifiable payback period.'
      ],
      interruptionChance: 'High (AI VP will challenge your downtime estimate)'
    },
    {
      id: 'interview',
      title: 'FAANG Cross-Functional Bar Raiser',
      category: 'Hiring & Culture',
      icon: <Briefcase className="w-5 h-5 text-[#FF5538]" />,
      difficulty: 'Extreme Pressure',
      duration: '2 Minutes',
      description: 'Defend a controversial product pivot to an interviewer from a different department who suspects you ignored user feedback.',
      audiencePersona: 'Senior Director from an adjacent org testing your humility and intellectual honesty.',
      prompts: [
        'Acknowledge the negative feedback data openly.',
        'Explain the long-term strategic thesis that justified the pain.',
        'Show how you rallied demoralized team members.'
      ],
      interruptionChance: 'Medium'
    },
    {
      id: 'networking',
      title: 'Tech Mixer / Elevator Pitch to Investor',
      category: 'Networking & Fundraising',
      icon: <Users className="w-5 h-5 text-[#FF705E]" />,
      difficulty: 'Standard',
      duration: '60 Seconds',
      description: 'You bumped into a partner from Sequoia at an AI demo night. Pitch your student startup before they reach the next conversation.',
      audiencePersona: 'Busy venture capitalist scanning the room for exceptional technical founders.',
      prompts: [
        'Hook them with an unexpected proprietary data advantage in sentence one.',
        'Give traction metrics: active users or retention rate.',
        'Ask for a concrete 15-minute coffee, not a blank check.'
      ],
      interruptionChance: 'Low'
    },
    {
      id: 'defense',
      title: 'Engineering Project Defense / Code Walkthrough',
      category: 'Technical Architecture',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      difficulty: 'High Stakes',
      duration: '4 Minutes',
      description: 'Defend your database sharding choice against senior engineers proposing a simpler managed cloud alternative.',
      audiencePersona: 'Senior Staff Engineer who built the existing system 5 years ago.',
      prompts: [
        'Praise the simplicity of the incumbent system before proposing migration.',
        'Show concrete p99 latency degradation charts under projected 10x load.',
        'Outline rollback safety nets.'
      ],
      interruptionChance: 'High'
    },
    {
      id: 'group_discussion',
      title: 'Admissions / Campus Group Discussion (GD)',
      category: 'Group Dynamics',
      icon: <MessageSquare className="w-5 h-5 text-sky-400" />,
      difficulty: 'Standard',
      duration: '2 Minutes',
      description: 'Break into a heated 6-person debate on ethical AI boundaries without interrupting rudely or remaining passive.',
      audiencePersona: 'Competitive peer group with 2 dominating speakers trying to monopolize airtime.',
      prompts: [
        'Synthesize two opposing viewpoints before introducing your novel angle.',
        'Invite a quiet participant into the conversation to demonstrate leadership.',
        'Keep vocal cadence calm and grounded.'
      ],
      interruptionChance: 'Very High'
    }
  ];

  const active = scenarios.find((s) => s.id === selectedScenario) || scenarios[0];

  const startSimulation = () => {
    setActiveSession(active);
    setSimStep('recording');
    setTimer(0);
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t >= 30) {
          clearInterval(interval);
          finishSimulation();
          return 30;
        }
        return t + 1;
      });
    }, 1000);
  };

  const finishSimulation = () => {
    setSimStep('feedback');
    setSimFeedback(
      `Scenario Cleared: ${active.title}. You successfully defused the VP's skepticism by articulating the financial risk before diving into the technical blueprint. Composure rating: 92%. Pause duration under challenge was 0.9s (authoritative).`
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Real-Life Speaking Simulations
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
            Prepare for the messy reality: unpredictable interviewers, boardroom defenses, elevator pitches, and heated group discussions.
          </p>
        </div>

        <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#E62B1E] font-bold">
          5 Scenario Engines
        </span>
      </div>

      {/* Scenario Picker Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {scenarios.map((sc) => {
          const isSelected = selectedScenario === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenario(sc.id);
                setSimStep('idle');
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'border-[#E62B1E] bg-[#E62B1E]/10 ring-1 ring-[#E62B1E]'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 w-fit">
                {sc.icon}
              </div>
              <div>
                <div className="font-bold text-xs text-white leading-tight line-clamp-1">{sc.title}</div>
                <div className="text-[10px] font-mono text-neutral-400 mt-0.5">{sc.category}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Scenario Stage Card */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E62B1E] font-bold">
              {active.category} • {active.difficulty}
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">{active.title}</h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-[#E62B1E]" /> Target: {active.duration}
            </span>
          </div>
        </div>

        <p className="text-sm text-neutral-300 font-sans leading-relaxed">
          {active.description}
        </p>

        {/* Persona & Interruption Simulation Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-1.5">
            <div className="text-[11px] font-mono text-neutral-400 uppercase font-semibold">
              Simulated Evaluator Persona:
            </div>
            <p className="text-xs text-neutral-200 font-sans">
              {active.audiencePersona}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400 uppercase font-semibold">
              <ShieldAlert className="w-3.5 h-3.5" /> Interruption Profile:
            </div>
            <p className="text-xs text-neutral-200 font-sans">
              {active.interruptionChance}
            </p>
          </div>
        </div>

        {/* Tactical Keynote Prompts */}
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
            Key Execution Objectives:
          </div>
          <div className="space-y-2">
            {active.prompts.map((p, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 bg-white/5 p-3 rounded-xl border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Simulation Execution Controls */}
        <div className="pt-4 border-t border-white/10">
          {simStep === 'idle' && (
            <button
              onClick={startSimulation}
              className="inline-flex items-center gap-2 bg-[#E62B1E] hover:bg-[#FF3E2B] text-white font-medium text-xs tracking-wider uppercase px-6 py-3 rounded-xl transition-all shadow-md shadow-[#E62B1E]/30"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Live Scenario Simulation</span>
            </button>
          )}

          {simStep === 'recording' && (
            <div className="p-6 rounded-2xl bg-[#090A0E] border border-[#E62B1E]/40 space-y-4 text-center animate-fade-in">
              <div className="flex items-center justify-center gap-2 text-[#E62B1E] font-mono text-xs font-bold uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E62B1E] animate-ping" />
                Simulation Live • Speaking Window
              </div>
              <div className="font-mono text-4xl font-black text-white">
                00:{timer.toString().padStart(2, '0')} <span className="text-xs text-neutral-400 font-normal">/ 00:30</span>
              </div>
              <p className="text-xs text-neutral-400 max-w-md mx-auto font-mono">
                Speak directly into your microphone. Deliver your opening thesis with executive conviction.
              </p>
              <button
                onClick={finishSimulation}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono uppercase text-white transition-all"
              >
                Conclude Simulation Early
              </button>
            </div>
          )}

          {simStep === 'feedback' && simFeedback && (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-3 animate-fade-in">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>AI Simulation Diagnostic Report</span>
              </div>
              <p className="text-sm text-neutral-200 leading-relaxed font-sans">
                {simFeedback}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSimStep('idle')}
                  className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono uppercase text-white"
                >
                  Restart Simulation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
