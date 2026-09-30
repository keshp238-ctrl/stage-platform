import React, { useState } from 'react';
import { Briefcase, AlertTriangle, CheckCircle2, ShieldCheck, Eye, Sparkles } from 'lucide-react';

export const RecruiterModeView: React.FC = () => {
  const [selectedRubric, setSelectedRubric] = useState(0);

  const rubrics = [
    {
      title: 'The "Think Out Loud" Bar',
      role: 'Staff Software Engineer @ Stripe / Meta',
      importance: 'Critical (Filters out 65% of candidates)',
      redFlag: 'Candidate remains completely silent for 40+ seconds while scribbling or typing.',
      greenFlag: 'Candidate explains hypothesis: "My initial intuition is an O(N) hash map lookup, but that introduces memory constraints. Let me evaluate if two-pointer sorting gives us O(1) space."',
      actionableTip: 'Never treat silence as preparation. Speak your mental scratchpad.'
    },
    {
      title: 'Handling Technical Pushback',
      role: 'Engineering Director @ Datadog / Snowflake',
      importance: 'High (Distinguishes Junior from Staff caliber)',
      redFlag: 'Candidate becomes visibly defensive or immediately collapses their recommendation without defense.',
      greenFlag: 'Candidate acknowledges the caveat: "That is a valid edge case. If our network partition lasts over 10 seconds, that tradeoff fails. Here is the fallback replication strategy..."',
      actionableTip: 'Say "Help me understand your SLA constraint" instead of "That would never happen".'
    },
    {
      title: 'Quantified STAR Storytelling',
      role: 'Head of University Talent @ Jane Street',
      importance: 'Essential for Resume Screenings',
      redFlag: 'Vague summaries like "I helped rewrite the backend and it was much faster."',
      greenFlag: 'Crisp metric: "By profiling memory allocations with pprof, I discovered lock contention in the worker pool, reduced GC pause times from 120ms to 18ms, and cut AWS cluster costs by 28%."',
      actionableTip: 'Always conclude project explanations with a verified numeric delta.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Recruiter Mode: Insider Rubrics
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
            Step onto the hiring manager&apos;s side of the desk. Learn how engineering leaders evaluate candidate answers in real calibration sessions.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-xl bg-[#E62B1E]/15 border border-[#E62B1E]/30 text-[#E62B1E] text-xs font-mono font-bold">
          Partner Recruiter Insights
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Rubrics Selector */}
        <div className="lg:col-span-5 space-y-3">
          {rubrics.map((r, i) => {
            const active = selectedRubric === i;
            return (
              <div
                key={r.title}
                onClick={() => setSelectedRubric(i)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  active
                    ? 'border-[#E62B1E] bg-[#E62B1E]/10 ring-1 ring-[#E62B1E]/40'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="text-[10px] font-mono uppercase text-[#E62B1E] font-bold">
                  Rubric #{i + 1}
                </div>
                <h3 className="font-bold text-base text-white mt-1">{r.title}</h3>
                <div className="text-xs text-neutral-400 mt-1 font-mono">{r.role}</div>
              </div>
            );
          })}
        </div>

        {/* Detailed Rubric Teardown */}
        <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#E62B1E] font-semibold">
                Evaluation Deep-Dive
              </span>
              <span className="text-xs font-mono text-neutral-400">
                {rubrics[selectedRubric].importance}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {rubrics[selectedRubric].title}
            </h2>
            <div className="text-xs text-neutral-400 font-mono mt-1">
              Evaluator Persona: {rubrics[selectedRubric].role}
            </div>
          </div>

          {/* Red Flag vs Green Flag comparison */}
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold uppercase">
                <AlertTriangle className="w-4 h-4" /> Instant Red Flag
              </div>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                {rubrics[selectedRubric].redFlag}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                <CheckCircle2 className="w-4 h-4" /> Strong Hire Indicator
              </div>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                {rubrics[selectedRubric].greenFlag}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-xs font-mono text-[#E62B1E] uppercase font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> STAGE Practice Recommendation:
            </div>
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              {rubrics[selectedRubric].actionableTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
