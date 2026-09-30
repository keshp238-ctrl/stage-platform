import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, X } from 'lucide-react';

interface EnterStageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (goal: string, level: string, practiceTime: string) => void;
  onGoalChange: (goal: string) => void;
  isDarkMode?: boolean;
}

const GOALS = [
  { id: 'Interviews', title: 'Tech & HR Interviews', desc: 'Mock FAANG loops, project defense & STAR storytelling', icon: '💼' },
  { id: 'Public Speaking', title: 'Public Speaking & Keynotes', desc: 'Deliver 3–10 min TED-style talks with magnetic stage presence', icon: '🎙️' },
  { id: 'English Conversation', title: 'English & Fluency Confidence', desc: 'Eliminate hesitation, filler words and build spontaneous flow', icon: '🌐' },
  { id: 'Debate', title: 'Intercollegiate Debates', desc: 'Rapid rebuttal, argument construction and competitive debate', icon: '⚔️' },
];

const LEVELS = [
  { id: 'Beginner', title: 'Emerging Speaker', desc: 'Nervous before groups, frequent fillers, seeking baseline confidence' },
  { id: 'Intermediate', title: 'Practiced Communicator', desc: 'Comfortable in casual chats, need polish for high-stakes evaluations' },
  { id: 'Advanced', title: 'Competitive Orator', desc: 'Polished speaker aiming for keynote caliber and executive persuasion' },
];

const TIMES = [
  { id: '5 min', title: '5 mins / day', desc: '1 Daily Speaking Mission', badge: 'Micro Habit' },
  { id: '10 min', title: '10 mins / day', desc: 'Mission + AI Talk Lab drill', badge: 'Recommended' },
  { id: '20 min', title: '20 mins / day', desc: 'Full rehearsal + mock interview loop', badge: 'Intensive' },
];

export const EnterStageModal: React.FC<EnterStageModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  onGoalChange,
  isDarkMode = true,
}) => {
  const [step, setStep] = useState<number>(1);
  const [goal, setGoal] = useState<string>('Interviews');
  const [level, setLevel] = useState<string>('Intermediate');
  const [time, setTime] = useState<string>('10 min');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleGoalSelect = (selectedGoal: string) => {
    setGoal(selectedGoal);
    onGoalChange(selectedGoal);
  };

  const handleFinish = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onComplete(goal, level, time);
      setIsTransitioning(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with stage light illumination */}
      <div
        className={`absolute inset-0 bg-[#07080B]/85 backdrop-blur-xl transition-opacity duration-500 ${
          isTransitioning ? 'opacity-95' : 'opacity-100'
        }`}
        onClick={onClose}
      />

      {/* Cinematic Flash Effect on Finish */}
      {isTransitioning && (
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#E62B1E]/40 via-white/20 to-transparent pointer-events-none animate-pulse" />
      )}

      {/* Modal Dialog Card */}
      <div
        className={`relative z-10 w-full max-w-xl rounded-2xl p-6 md:p-8 border shadow-2xl transition-all duration-300 ${
          isDarkMode
            ? 'bg-[#101219]/95 border-white/10 text-white'
            : 'bg-white border-black/10 text-neutral-900 shadow-neutral-300/40'
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E62B1E] animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
              Stage Onboarding • Step {step} of 3
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Goal */}
        {step === 1 && (
          <div className="py-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">What is your primary speaking ambition?</h2>
              <p className="text-sm text-neutral-400 mt-1">The 3D Stage environment and daily drills adapt to your target focus.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {GOALS.map((g) => {
                const active = goal === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => handleGoalSelect(g.id)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 relative ${
                      active
                        ? 'border-[#E62B1E] bg-[#E62B1E]/10 ring-1 ring-[#E62B1E]'
                        : isDarkMode
                        ? 'border-white/10 bg-white/5 hover:border-white/20'
                        : 'border-black/10 bg-black/5 hover:border-black/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{g.icon}</span>
                      {active && <CheckCircle2 className="w-4 h-4 text-[#E62B1E]" />}
                    </div>
                    <div className="font-semibold text-sm">{g.title}</div>
                    <div className="text-xs text-neutral-400 mt-1 leading-snug">{g.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Level */}
        {step === 2 && (
          <div className="py-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">What is your current speaking comfort level?</h2>
              <p className="text-sm text-neutral-400 mt-1">We calibrate AI feedback tolerance and baseline rubrics accordingly.</p>
            </div>

            <div className="space-y-3 pt-2">
              {LEVELS.map((l) => {
                const active = level === l.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start justify-between ${
                      active
                        ? 'border-[#E62B1E] bg-[#E62B1E]/10 ring-1 ring-[#E62B1E]'
                        : isDarkMode
                        ? 'border-white/10 bg-white/5 hover:border-white/20'
                        : 'border-black/10 bg-black/5 hover:border-black/20'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm">{l.title}</div>
                      <div className="text-xs text-neutral-400 mt-1">{l.desc}</div>
                    </div>
                    {active && <CheckCircle2 className="w-5 h-5 text-[#E62B1E] shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Practice Time */}
        {step === 3 && (
          <div className="py-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">How much time can you commit daily?</h2>
              <p className="text-sm text-neutral-400 mt-1">Consistency beats marathon sessions. Short daily reps rewire vocal habits.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {TIMES.map((t) => {
                const active = time === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTime(t.id)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                      active
                        ? 'border-[#E62B1E] bg-[#E62B1E]/10 ring-1 ring-[#E62B1E]'
                        : isDarkMode
                        ? 'border-white/10 bg-white/5 hover:border-white/20'
                        : 'border-black/10 bg-black/5 hover:border-black/20'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-[#E62B1E] mb-1">{t.badge}</div>
                      <div className="font-bold text-base">{t.title}</div>
                    </div>
                    <div className="text-xs text-neutral-400 mt-2">{t.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white px-3 py-2"
            >
              ← Back
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white px-3 py-2"
            >
              Skip Onboarding →
            </button>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-2 bg-[#E62B1E] hover:bg-[#FF3B2D] text-white font-medium text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#E62B1E]/30"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="inline-flex items-center gap-2 bg-[#E62B1E] hover:bg-[#FF3B2D] text-white font-medium text-sm px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-[#E62B1E]/40"
            >
              <Sparkles className="w-4 h-4" /> Enter the Stage →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
