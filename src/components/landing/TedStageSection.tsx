import React, { useState } from 'react';
import { Play, Heart, Eye, ArrowRight, X, Clock, Award, Share2 } from 'lucide-react';
import { FEATURED_TALKS } from '../../data/mockData';
import { Talk } from '../../types';

interface TedStageSectionProps {
  isDarkMode?: boolean;
}

export const TedStageSection: React.FC<TedStageSectionProps> = ({ isDarkMode = true }) => {
  const [activeTalk, setActiveTalk] = useState<Talk | null>(null);
  const [likesCount, setLikesCount] = useState<Record<string, number>>({});
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  const handleLike = (id: string, initialLikes: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const current = likesCount[id] ?? initialLikes;
    if (hasLiked[id]) {
      setLikesCount({ ...likesCount, [id]: current - 1 });
      setHasLiked({ ...hasLiked, [id]: false });
    } else {
      setLikesCount({ ...likesCount, [id]: current + 1 });
      setHasLiked({ ...hasLiked, [id]: true });
    }
  };

  return (
    <section id="ted-stage" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="text-xs font-mono tracking-[0.25em] text-[#E62B1E] uppercase font-bold mb-3">
              06 / PEER KEYNOTES
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              THE STUDENT TED STAGE
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md mt-4 md:mt-0 font-light">
            Verified 3–10 minute talks delivered by collegiate minds. Real ideas, real delivery, watched by university peers and tech recruiters.
          </p>
        </div>

        {/* Talk Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_TALKS.slice(0, 3).map((talk, idx) => {
            const currentLikes = likesCount[talk.id] ?? talk.likes;
            const liked = hasLiked[talk.id];

            return (
              <div
                key={talk.id}
                onClick={() => setActiveTalk(talk)}
                data-cursor="WATCH"
                className="group rounded-3xl border border-white/10 bg-white/[0.02] hover:border-white/30 overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Visual Thumbnail & Duration */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={talk.avatar}
                    alt={talk.title}
                    className="w-full h-full object-cover grayscale contrast-125 opacity-70 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-black/60 backdrop-blur-md border border-white/10 text-white">
                      {talk.category}
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#E62B1E] text-white flex items-center justify-center shadow-lg shadow-[#E62B1E]/40 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Stats */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white/90">
                    <span className="flex items-center gap-1.5 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-[#E62B1E]" /> {talk.duration}
                    </span>
                    <span className="flex items-center gap-1.5 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      <Eye className="w-3 h-3 text-neutral-400" /> {talk.views}
                    </span>
                  </div>
                </div>

                {/* Talk Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg leading-snug group-hover:text-[#E62B1E] transition-colors duration-200">
                      {talk.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2 font-light">
                      {talk.summary}
                    </p>
                  </div>

                  {/* Speaker Details & Like Action */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{talk.speaker}</div>
                      <div className="text-[11px] font-mono text-neutral-400">{talk.college}</div>
                    </div>

                    <button
                      onClick={(e) => handleLike(talk.id, talk.likes, e)}
                      className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-xl border transition-all ${
                        liked
                          ? 'border-[#E62B1E] bg-[#E62B1E]/15 text-[#E62B1E]'
                          : 'border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
                      <span>{currentLikes}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Modal Player with Keynotes & Breakdown */}
      {activeTalk && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setActiveTalk(null)} />
          <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-white/15 bg-[#111319] text-white p-6 sm:p-8 shadow-2xl space-y-5 animate-fade-in">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E62B1E] animate-pulse" />
                <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">
                  Student TED Stage Player
                </span>
              </div>
              <button onClick={() => setActiveTalk(null)} className="p-1 rounded-full text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Cinematic Video Screen */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/10">
              <img
                src={activeTalk.avatar}
                alt={activeTalk.title}
                className="w-full h-full object-cover opacity-40 blur-xs"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#E62B1E] flex items-center justify-center shadow-xl shadow-[#E62B1E]/40 mb-4 animate-bounce">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
                <h4 className="font-bold text-xl max-w-lg">{activeTalk.title}</h4>
                <p className="text-xs text-neutral-300 font-mono mt-2">
                  Delivered by {activeTalk.speaker} ({activeTalk.college}) • {activeTalk.duration}
                </p>
              </div>
            </div>

            {/* Key Takeaway & Transcript Notes */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E62B1E] uppercase tracking-wider font-semibold">
                <Award className="w-4 h-4" /> Core Keynote Insight
              </div>
              <p className="text-sm text-neutral-200 font-sans italic">
                &ldquo;{activeTalk.keyTakeaway}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono text-neutral-400">
                Published {activeTalk.publishedDate} • {activeTalk.views} views
              </span>
              <button
                onClick={() => setActiveTalk(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono uppercase tracking-wider transition-colors"
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
