import React from 'react';

export const StatsSection: React.FC = () => {
  const stats = [
    { label: 'Active Student Orators', value: '[18,400+]', sub: 'Across 42 Countries' },
    { label: 'Student Keynotes Published', value: '[1,420+]', sub: 'Curated & Peer-Reviewed' },
    { label: 'Partner Colleges & Clubs', value: '[280+]', sub: 'Global University Chapters' },
    { label: 'AI Practice Drills Completed', value: '[460,000+]', sub: 'Sub-200ms Acoustic Analysis' },
  ];

  return (
    <section className="py-20 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="p-6 rounded-2xl glass-panel border border-white/10 text-center">
              <div className="text-2xl sm:text-4xl font-mono font-black text-white tracking-tight">
                {s.value}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#E62B1E] mt-2">
                {s.label}
              </div>
              <div className="text-[11px] font-mono text-neutral-500 mt-1">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
