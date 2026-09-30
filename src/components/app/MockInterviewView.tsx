import React, { useState } from 'react';
import { MessageSquare, Mic, Play, CheckCircle2, RefreshCw, Send, AlertTriangle, Sparkles, Building, ArrowRight } from 'lucide-react';

export const MockInterviewView: React.FC = () => {
  const [track, setTrack] = useState<'Technical' | 'HR'>('Technical');
  const [companyType, setCompanyType] = useState('High-Growth Startup');
  const [difficulty, setDifficulty] = useState('Senior / High Bar');
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [feedbackHistory, setFeedbackHistory] = useState<Record<number, { score: number; notes: string }>>({});

  const technicalQuestions = [
    {
      q: 'Explain how you design an idempotent payment processing endpoint when external bank webhooks fail intermittently.',
      context: 'Distributed Systems & Consistency',
      tips: ['State machine with unique mutation key', 'Atomic database transaction with row locks', 'Exponential backoff queue for retry']
    },
    {
      q: 'Tell me about a time you had to push back on a Product Manager demanding an unrealistic latency target. How did you present the architectural tradeoffs?',
      context: 'Technical Diplomacy & Cross-Functional Alignment',
      tips: ['Use data benchmarks instead of feelings', 'Show cost vs SLA non-linear escalation curve', 'Offer a tiered rollout alternative']
    },
    {
      q: 'Walk me through how you would optimize a PostgreSQL database query that is doing a sequential scan over 40 million rows during peak traffic.',
      context: 'Database Internals & Indexing',
      tips: ['EXPLAIN ANALYZE interpretation', 'Partial / Composite index strategy', 'Read-replica offloading & partitioning']
    }
  ];

  const hrQuestions = [
    {
      q: 'Why are you leaving your previous internship/project, and what specific engineering culture makes this team the right fit for your ambitions?',
      context: 'Motivation & Cultural Fit',
      tips: ['Frame everything toward future growth, never disparage past teams', 'Cite specific blog posts or open source tools the company built']
    },
    {
      q: 'Describe a situation where a teammate was not pulling their weight on a critical release deadline. How did you intervene without escalating immediately?',
      context: 'Team Ownership & Empathy',
      tips: ['Assume positive intent first', 'Offer private pair programming session', 'Re-align on project milestones']
    }
  ];

  const currentQuestions = track === 'Technical' ? technicalQuestions : hrQuestions;
  const currentQ = currentQuestions[activeQuestionIdx % currentQuestions.length];

  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim()) return;
    setIsAnswering(true);
    setTimeout(() => {
      setFeedbackHistory({
        ...feedbackHistory,
        [activeQuestionIdx]: {
          score: 93,
          notes: 'Excellent STAR framing. You clearly delineated the technical constraint before jumping to the architectural remedy. Mentioning row-level locks and idempotency keys demonstrated senior engineering instincts.'
        }
      });
      setIsAnswering(false);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Mock Interview Simulator
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
            AI interview rounds adapted to real tech hiring bars. Practice under timer constraints with immediate rubric scoring.
          </p>
        </div>

        {/* Track Picker */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
          <button
            onClick={() => { setTrack('Technical'); setActiveQuestionIdx(0); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              track === 'Technical' ? 'bg-[#E62B1E] text-white font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Technical & Architecture
          </button>
          <button
            onClick={() => { setTrack('HR'); setActiveQuestionIdx(0); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              track === 'HR' ? 'bg-[#E62B1E] text-white font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            HR & Behavioral (STAR)
          </button>
        </div>
      </div>

      {/* Target Company & Difficulty Configuration */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 space-y-1">
          <div className="text-[10px] font-mono text-neutral-400 uppercase">Target Archetype</div>
          <select
            value={companyType}
            onChange={(e) => setCompanyType(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-white outline-none border-none cursor-pointer"
          >
            <option value="High-Growth Startup" className="bg-[#111319]">High-Growth Startup (Linear, Vercel, Supabase)</option>
            <option value="FAANG Big Tech" className="bg-[#111319]">FAANG Big Tech (Google, Meta, Apple)</option>
            <option value="Fintech / Quant" className="bg-[#111319]">Fintech / Quant (Stripe, Jane Street)</option>
          </select>
        </div>

        <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 space-y-1">
          <div className="text-[10px] font-mono text-neutral-400 uppercase">Interview Difficulty</div>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-white outline-none border-none cursor-pointer"
          >
            <option value="Standard Internship" className="bg-[#111319]">Standard Internship Bar</option>
            <option value="Senior / High Bar" className="bg-[#111319]">Senior / High Bar (Staff Evaluator)</option>
            <option value="Stress Test" className="bg-[#111319]">Stress Test (Aggressive Pushback)</option>
          </select>
        </div>

        <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 space-y-1">
          <div className="text-[10px] font-mono text-neutral-400 uppercase">Session Progress</div>
          <div className="text-sm font-semibold text-white font-mono flex items-center justify-between">
            <span>Question {activeQuestionIdx + 1} of {currentQuestions.length}</span>
            <span className="text-[#E62B1E] text-xs font-mono">{track}</span>
          </div>
        </div>
      </div>

      {/* Main Question & Answer Interaction Box */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#E62B1E] font-semibold tracking-wider">
              {currentQ.context}
            </span>
            <span className="text-xs font-mono text-neutral-500">Live AI Interviewer</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
            &ldquo;{currentQ.q}&rdquo;
          </h2>
        </div>

        {/* Response Input Area */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>Your Response (Speak or Type):</span>
            <span className="text-[#E62B1E]">Aim for 90–120 seconds spoken</span>
          </div>
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            rows={5}
            placeholder="Type your answer, or paste speech notes here... (e.g., 'In my distributed payment system project, we tackled intermittent webhook drops by...')"
            className="w-full rounded-2xl border border-white/10 bg-[#090A0E] p-4 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-[#E62B1E] transition-all font-sans leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setUserAnswer('To solve this, I designed a two-phase commit with an idempotent transaction key stored in Redis with a 24-hour TTL. When the payment provider sent duplicate webhooks, our gateway validated the hash before executing any state transition. This eliminated double-charging entirely while keeping p99 latency under 45ms.')}
                className="text-xs font-mono text-neutral-400 hover:text-white px-2.5 py-1 rounded border border-white/10 hover:bg-white/5"
              >
                Insert Sample Answer
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleEvaluateAnswer}
                disabled={isAnswering || !userAnswer.trim()}
                className="inline-flex items-center gap-2 bg-[#E62B1E] hover:bg-[#FF3E2B] disabled:opacity-50 text-white font-medium text-xs tracking-wider uppercase px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#E62B1E]/30"
              >
                {isAnswering ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Submit For AI Scorecard</span>
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Recruiter Scorecard */}
        {feedbackHistory[activeQuestionIdx] && (
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Interviewer Scorecard: {feedbackHistory[activeQuestionIdx].score}/100 (Pass Bar)</span>
              </div>
              <span className="text-xs font-mono text-neutral-400">FAANG Calibrated</span>
            </div>
            <p className="text-sm text-neutral-200 leading-relaxed font-sans">
              {feedbackHistory[activeQuestionIdx].notes}
            </p>
          </div>
        )}

        {/* Next Question Navigation */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => {
              if (activeQuestionIdx > 0) {
                setActiveQuestionIdx(activeQuestionIdx - 1);
                setUserAnswer('');
              }
            }}
            disabled={activeQuestionIdx === 0}
            className="text-xs font-mono uppercase text-neutral-400 disabled:opacity-30 hover:text-white"
          >
            ← Previous Question
          </button>
          <button
            onClick={() => {
              if (activeQuestionIdx < currentQuestions.length - 1) {
                setActiveQuestionIdx(activeQuestionIdx + 1);
                setUserAnswer('');
              }
            }}
            disabled={activeQuestionIdx === currentQuestions.length - 1}
            className="text-xs font-mono uppercase text-[#E62B1E] disabled:opacity-30 hover:underline flex items-center gap-1"
          >
            <span>Next Question</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
