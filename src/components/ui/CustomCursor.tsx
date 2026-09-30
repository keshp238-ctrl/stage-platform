import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if target has data-cursor attribute or is clickable
      const target = e.target as HTMLElement | null;
      if (target) {
        const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
        if (cursorAttr) {
          setCursorText(cursorAttr);
          setIsHovered(true);
        } else if (target.closest('button, a, input, select, textarea, [role="button"]')) {
          setCursorText(null);
          setIsHovered(true);
        } else {
          setCursorText(null);
          setIsHovered(false);
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {cursorText ? (
        <div className="bg-[#E62B1E] text-white text-[10px] tracking-widest font-mono font-bold px-3 py-1.5 rounded-full shadow-lg shadow-[#E62B1E]/40 animate-pulse flex items-center justify-center">
          {cursorText}
        </div>
      ) : (
        <div
          className={`rounded-full transition-all duration-200 ease-out border ${
            isHovered
              ? 'w-10 h-10 bg-[#E62B1E]/15 border-[#E62B1E] scale-110'
              : 'w-3 h-3 bg-white/90 border-white/40 shadow-sm'
          }`}
        />
      )}
    </div>
  );
};
