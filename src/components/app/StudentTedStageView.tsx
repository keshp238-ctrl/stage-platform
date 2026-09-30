import React, { useState } from 'react';
import { Compass, Upload, Play, Heart, MessageSquare, Plus, CheckCircle2, Clock, Eye, X } from 'lucide-react';
import { FEATURED_TALKS } from '../../data/mockData';
import { Talk } from '../../types';

export const StudentTedStageView: React.FC = () => {
  const [talks, setTalks] = useState<Talk[]>(FEATURED_TALKS);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'AI & Tech' | 'Startups' | 'Career' | 'Philosophy' | 'College Life'>('AI & Tech');
  const [newSummary, setNewSummary] = useState('');
  const [publishSuccess, setPublishSuccess] = useState(false);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTalk: Talk = {
      id: `user-t-${Date.now()}`,
      title: newTitle,
      speaker: 'Alex Chen',
      college: 'UC Berkeley',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      category: newCategory,
      duration: '05:30',
      views: '1',
      likes: 1,
      summary: newSummary || 'A student keynote on engineering architecture and storytelling.',
      keyTakeaway: 'Always frame technical discussions around core constraints.',
      publishedDate: 'Just now'
    };

    setTalks([newTalk, ...talks]);
    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      setUploadModalOpen(false);
      setNewTitle('');
      setNewSummary('');
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Student TED Stage Library
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
            Verified keynotes by collegiate orators. Publish your 3–10 minute keynote, receive peer critiques, and build verified proof for hiring managers.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#E62B1E] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Publish 3–10m Keynote
        </button>
      </div>

      {/* Talks Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {talks.map((talk) => (
          <div
            key={talk.id}
            className="rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all flex flex-col justify-between overflow-hidden"
          >
            <div className="relative aspect-[16/10] bg-neutral-900">
              <img
                src={talk.avatar}
                alt={talk.title}
                className="w-full h-full object-cover grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/70 text-white">
                {talk.category}
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/70 text-white flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#E62B1E]" /> {talk.duration}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-base text-white line-clamp-2">{talk.title}</h3>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{talk.summary}</p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
                <div>
                  <div className="text-white font-semibold">{talk.speaker}</div>
                  <div className="text-[10px]">{talk.college}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[#E62B1E]">
                    <Heart className="w-3 h-3 fill-current" /> {talk.likes}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Talk Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setUploadModalOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-white/15 bg-[#111319] p-6 space-y-5 text-white shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-base">Publish Keynote to Student Stage</h3>
              <button onClick={() => setUploadModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {!publishSuccess ? (
              <form onSubmit={handlePublish} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase">Keynote Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., Why Every CS Major Needs to Understand Tradeoffs"
                    className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-[#090A0E] text-sm text-white placeholder:text-neutral-500 outline-none focus:border-[#E62B1E]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-[#090A0E] text-sm text-white outline-none focus:border-[#E62B1E]"
                  >
                    <option value="AI & Tech">AI & Tech</option>
                    <option value="Startups">Startups</option>
                    <option value="Career">Career</option>
                    <option value="Philosophy">Philosophy</option>
                    <option value="College Life">College Life</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase">Summary / Thesis</label>
                  <textarea
                    rows={3}
                    value={newSummary}
                    onChange={(e) => setNewSummary(e.target.value)}
                    placeholder="Brief 1-2 sentence overview of your talk..."
                    className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-[#090A0E] text-sm text-white placeholder:text-neutral-500 outline-none focus:border-[#E62B1E]"
                  />
                </div>

                <div className="border border-dashed border-white/15 rounded-xl p-4 text-center text-xs font-mono text-neutral-400">
                  <Upload className="w-4 h-4 mx-auto mb-1 text-[#E62B1E]" />
                  Drag & drop 3–10 min MP4/WEBM or link YouTube/Vimeo
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-mono text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#E62B1E] text-white text-xs font-semibold uppercase tracking-wider shadow-md shadow-[#E62B1E]/30"
                  >
                    Publish Keynote
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <div className="font-bold text-lg">Keynote Live on STAGE!</div>
                <div className="text-xs text-neutral-400 font-mono">Indexed for peer reviews and recruiter scouting.</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
