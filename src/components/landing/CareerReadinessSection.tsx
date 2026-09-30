import React, { useState } from 'react';
import { FileText, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Building, Gauge } from 'lucide-react';

interface CareerReadinessSectionProps {
  isDarkMode?: boolean;
}

export const CareerReadinessSection: React.FC<CareerReadinessSectionProps> = ({ isDarkMode = true }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      title: '01 / Resume Ingestion',
      subtitle: 'Deconstructing Project Architecture',
      detail: 'Our parser extracts core tech stack decisions, latency claims, and database choices from your GitHub or PDF resume.'
    },
    {
      title: '02 / Targeted Grilling',
      subtitle: 'Zero Generic Questions',
      detail: 'Instead of "What are your weaknesses?", AI asks: "Why did you choose Redis over Memcached for session caching in project #2?"'
    },
    {
      title: '03 / Recruiter Rubric Evaluation',
      subtitle: 'Staff Engineer & Hiring Bar Scorecard',
      detail: 'Scores your defense across architectural trade-off awareness, quantitative impact, and clarity under pushback.'
    },
    {
      title: '04 / Verified Readiness Index',
      subtitle: 'Internship Readiness Score: 94/100',
      detail: 'A portable credential that signals to hiring partners that this candidate can present in boardrooms and team standups.'
    }
  ];

  return (
    <section id="career-readiness" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="text-xs font-mono tracking-[0.25em] text-[#E62B1E] uppercase font-bold mb-3">
              08 / THE HIRING GATEWAY
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              RESUME → INTERVIEW → HIRED
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md mt-4 md:mt-0 font-light">
            Recruiters don&apos;t just read resumes; they look for candidates who can defend their code. See how STAGE bridges the gap.
          </p>
        </div>

        {/* Morphing Interactive Pipeline Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Step Stepper Navigation */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((st, i) => {
              const active = activeStep === i;
              return (
                <div
                  key={st.title}
                  onClick={() => setActiveStep(i)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    active
                      ? 'border-[#E62B1E] bg-[#E62B1E]/10 ring-1 ring-[#E62B1E]/40'
                      : 'border-white/10 bg-white/[0.015] hover:border-white/20'
                  }`}
                >
                  <div className="text-[11px] font-mono tracking-widest text-[#E62B1E] font-bold">
                    {st.title}
                  </div>
                  <div className="font-bold text-base mt-1 text-white">{st.subtitle}</div>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed font-sans font-light">
                    {st.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Dynamic Visual Pipeline Box */}
          <div className="lg:col-span-7 rounded-3xl border border-white/15 glass-panel p-6 sm:p-8 relative min-h-[420px] flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Visual Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E62B1E]" />
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                  Pipeline State: {steps[activeStep].title.split('/')[1]}
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-500">Live Simulation</span>
            </div>

            {/* Dynamic Step Content */}
            <div className="my-auto py-6 animate-fade-in">
              {activeStep === 0 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#E62B1E]" />
                    <div>
                      <div className="text-sm font-bold text-white">Alex_Chen_SWE_Resume.pdf</div>
                      <div className="text-[11px] font-mono text-neutral-400">Extracted: Distributed Cache Service, Go, gRPC, PostgreSQL</div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-neutral-300 space-y-1 font-mono">
                    <div className="text-emerald-400 font-bold">✓ 3 Architecture Claims Detected</div>
                    <div>• Claim: &quot;Reduced p99 latency by 42% using in-memory shards&quot;</div>
                    <div>• Claim: &quot;Implemented Raft consensus protocol from scratch&quot;</div>
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase text-[#E62B1E] tracking-wider font-semibold">
                    AI Interviewer Prompt:
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/15 text-sm sm:text-base font-medium leading-relaxed">
                    &ldquo;In your Raft consensus implementation, how did you prevent split-brain votes when network partitions occurred between odd numbers of follower nodes?&rdquo;
                  </div>
                  <div className="text-xs text-neutral-400 font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#E62B1E]" />
                    Dynamic technical question generated specifically from candidate&apos;s code repo.
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                    Recruiter Scorecard Matrix:
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 rounded-xl border border-white/10 bg-white/5 text-center">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">Tradeoff Depth</div>
                      <div className="text-xl font-bold text-emerald-400 mt-1">4.9 / 5.0</div>
                    </div>
                    <div className="p-3 rounded-xl border border-white/10 bg-white/5 text-center">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">STAR Metric</div>
                      <div className="text-xl font-bold text-white mt-1">4.7 / 5.0</div>
                    </div>
                    <div className="p-3 rounded-xl border border-white/10 bg-white/5 text-center">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">Red Flags</div>
                      <div className="text-xl font-bold text-[#E62B1E] mt-1">0 Detected</div>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 font-sans mt-2">
                    Evaluation: &ldquo;Candidate demonstrated instinctive grasp of consensus edge cases. Communicated with staff-level composure.&rdquo;
                  </p>
                </div>
              )}

              {activeStep === 3 && (
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#E62B1E"
                        strokeWidth="8"
                        strokeDasharray="264"
                        strokeDashoffset="16"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-mono text-4xl font-black text-white">94</span>
                      <span className="text-[9px] font-mono tracking-widest text-[#E62B1E] uppercase">Readiness</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-base">Top 3% Collegiate Benchmark</h4>
                    <p className="text-xs text-neutral-400 mt-1">Directly eligible for Fast-Track Partner Recruiter intros</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : 3))}
                className="text-xs font-mono uppercase text-neutral-400 hover:text-white"
              >
                ← Prev Step
              </button>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3].map((dot) => (
                  <span
                    key={dot}
                    onClick={() => setActiveStep(dot)}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                      activeStep === dot ? 'w-6 bg-[#E62B1E]' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveStep((prev) => (prev < 3 ? prev + 1 : 0))}
                className="text-xs font-mono uppercase text-[#E62B1E] hover:text-white flex items-center gap-1"
              >
                Next Step →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
