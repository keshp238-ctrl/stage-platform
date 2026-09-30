import React from 'react';
import { Target, Cpu, Flame, CheckCircle } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'ASSESS',
      icon: <Target className="w-5 h-5 text-[#E62B1E]" />,
      desc: 'Take a 90-second voice assessment to map your baseline Communication DNA across clarity, cadence, filler words, and vocal authority.'
    },
    {
      num: '02',
      title: 'PRACTICE',
      icon: <Cpu className="w-5 h-5 text-[#FF5538]" />,
      desc: 'Complete Daily Speaking Missions, stress-test your thinking with AI mock interview loops, and refine technical storytelling.'
    },
    {
      num: '03',
      title: 'PERFORM',
      icon: <Flame className="w-5 h-5 text-[#FF705E]" />,
      desc: 'Publish your signature talk on the Student TED Stage, represent your university in live Debate Arena matches, and build a verified following.'
    },
    {
      num: '04',
      title: 'GET HIRED',
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      desc: 'Unlock your verified Internship Readiness Score. Share a live portfolio that lets tech recruiters and founders hear you speak before they ever schedule a screening.'
    }
  ];

  return (
    <section className="py-28 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="text-xs font-mono tracking-[0.25em] text-[#E62B1E] uppercase font-bold mb-3">
              09 / THE FOUR-STEP METHOD
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              HOW STAGE WORKS
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md mt-4 md:mt-0 font-light">
            A battle-tested progression engineered from collegiate debaters, TED speakers, and executive communication coaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-6 rounded-3xl border border-white/10 glass-panel flex flex-col justify-between hover:border-white/30 transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-neutral-500">{st.num}</span>
                  <div className="p-2.5 rounded-xl border border-white/10 bg-white/5 group-hover:scale-110 transition-transform">
                    {st.icon}
                  </div>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-[#E62B1E] transition-colors">
                  {st.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-3 leading-relaxed font-light font-sans">
                  {st.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E62B1E]" />
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  Phase {st.num}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
