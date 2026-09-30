import React, { useState } from 'react';
import { FileText, Upload, Sparkles, ArrowRight, CheckCircle2, ChevronRight, Cpu } from 'lucide-react';

export const ResumeToInterviewView: React.FC = () => {
  const [hasUploaded, setHasUploaded] = useState(true);
  const [selectedProject, setSelectedProject] = useState(0);

  const parsedProjects = [
    {
      title: 'High-Throughput Distributed Raft Key-Value Store',
      tech: ['Go', 'gRPC', 'Raft Protocol', 'RocksDB'],
      bulletSummary: 'Engineered a replicated state machine capable of 45,000 writes/sec with automated leader election under network partitions.',
      generatedQuestions: [
        'How did you simulate split-brain scenarios to test leader re-election in your Raft implementation?',
        'Why did you choose RocksDB as the local storage engine instead of BadgerDB or BoltDB?',
        'Walk me through the exact commit log replication flow from Leader to Followers.'
      ]
    },
    {
      title: 'Real-Time Collaborative Code Editor with CRDTs',
      tech: ['TypeScript', 'WebSockets', 'Yjs', 'Rust (Wasm)'],
      bulletSummary: 'Built a peer-to-peer text editor handling concurrent multi-cursor editing with sub-50ms sync latency.',
      generatedQuestions: [
        'What specific memory overhead did you observe when tracking operation histories in Yjs under long coding sessions?',
        'How did your WebSocket server manage connection drops without causing desynchronized text buffers?'
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Resume → Interview Generator
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
            Upload your technical resume or GitHub portfolio. Our AI deconstructs your architecture claims and produces the exact tough questions elite interviewers will grill you on.
          </p>
        </div>

        <button
          onClick={() => setHasUploaded(true)}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono uppercase text-white flex items-center gap-2"
        >
          <Upload className="w-3.5 h-3.5" /> Re-upload Resume
        </button>
      </div>

      {/* Uploaded File Status */}
      <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#E62B1E]/10 border border-[#E62B1E]/20 text-[#E62B1E]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm text-white">Alex_Chen_SWE_Resume.pdf</div>
            <div className="text-[11px] font-mono text-emerald-400">Parsed 2 Core Projects • 5 Deep-Dive Questions Ready</div>
          </div>
        </div>
        <span className="text-xs font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-neutral-300">
          Last Synced: Today
        </span>
      </div>

      {/* Project Selector & Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Extracted Projects List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
            Deconstructed Projects:
          </div>

          {parsedProjects.map((p, idx) => {
            const active = selectedProject === idx;
            return (
              <div
                key={p.title}
                onClick={() => setSelectedProject(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  active
                    ? 'border-[#E62B1E] bg-[#E62B1E]/10 ring-1 ring-[#E62B1E]/40'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white leading-snug">{p.title}</h3>
                  <ChevronRight className={`w-4 h-4 text-neutral-400 transition-transform ${active ? 'translate-x-1 text-[#E62B1E]' : ''}`} />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Tailored Interview Questions & Practice */}
        <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/[0.02] p-6 space-y-5">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E62B1E] font-bold">
              Project Focus: {parsedProjects[selectedProject].title}
            </span>
            <p className="text-xs text-neutral-400 mt-1 font-mono">
              {parsedProjects[selectedProject].bulletSummary}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
              Tailored Technical Interview Questions:
            </div>

            {parsedProjects[selectedProject].generatedQuestions.map((q, qIdx) => (
              <div
                key={qIdx}
                className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3 hover:border-white/20 transition-all"
              >
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-xs font-bold text-[#E62B1E] mt-0.5">Q{qIdx + 1}</span>
                  <p className="text-sm font-medium text-white leading-snug">{q}</p>
                </div>
                <div className="flex items-center justify-end">
                  <button className="px-3.5 py-1.5 rounded-lg bg-[#E62B1E] hover:bg-[#FF3E2B] text-white text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5">
                    <span>Practice Answering</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
