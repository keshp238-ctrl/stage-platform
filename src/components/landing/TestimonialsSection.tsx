import React, { useState } from 'react';
import { TESTIMONIALS } from '../../data/mockData';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-28 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-mono tracking-[0.25em] text-[#E62B1E] uppercase font-bold mb-4">
          10 / VERIFIED STUDENT & RECRUITER VOICES
        </div>

        {/* Large Quotation */}
        <div className="relative min-h-[260px] flex flex-col justify-between">
          <blockquote className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white/95">
            &ldquo;{TESTIMONIALS[activeIndex].quote}&rdquo;
          </blockquote>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
            <div>
              <div className="text-lg font-bold text-white">
                {TESTIMONIALS[activeIndex].author}
              </div>
              <div className="text-xs text-neutral-400 font-mono mt-0.5">
                {TESTIMONIALS[activeIndex].role} • {TESTIMONIALS[activeIndex].college}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-[#E62B1E]/15 border border-[#E62B1E]/30 text-[#E62B1E]">
                {TESTIMONIALS[activeIndex].score}
              </span>
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === i ? 'w-8 bg-[#E62B1E]' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    title={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
