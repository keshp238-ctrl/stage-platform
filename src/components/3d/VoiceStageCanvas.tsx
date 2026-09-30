import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { VoiceStageScene } from './VoiceStageScene';

interface VoiceStageCanvasProps {
  audioLevel?: number;
  isDarkMode?: boolean;
  cameraStageProgress?: number;
  activeGoal?: string;
  className?: string;
}

export const VoiceStageCanvas: React.FC<VoiceStageCanvasProps> = ({
  audioLevel = 0,
  isDarkMode = true,
  cameraStageProgress = 0,
  activeGoal,
  className = '',
}) => {
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [dpr, setDpr] = useState<number>(1.5);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch {
      setWebglSupported(false);
    }

    // Determine device tier DPR
    const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;
    const isMobile = window.innerWidth < 768;
    if (isMobile || deviceMemory < 4) {
      setDpr(1);
    } else {
      setDpr(Math.min(window.devicePixelRatio, 2));
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
        {/* Elegant 2D Fallback */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111318] via-[#0A0B0E] to-[#0A0B0E]" />
        <div className="absolute w-96 h-96 rounded-full bg-[#E62B1E]/15 blur-3xl animate-pulse-slow" />
        <div className="relative z-10 w-64 h-64 rounded-full border border-[#E62B1E]/30 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border border-white/10 flex items-center justify-center animate-spin-slow">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#E62B1E] to-[#FF6B5B] opacity-80 blur-md" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0.8, 6.2], fov: 45 }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <VoiceStageScene
            audioLevel={audioLevel}
            isDarkMode={isDarkMode}
            cameraStageProgress={cameraStageProgress}
            activeGoal={activeGoal}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
