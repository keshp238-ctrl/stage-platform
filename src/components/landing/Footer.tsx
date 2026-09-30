import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Sun, Moon, Github, Twitter, Linkedin, Disc } from 'lucide-react';

const TinyGlowingSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.8;
      meshRef.current.rotation.y += delta * 1.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.7, 24, 24]} />
      <meshStandardMaterial
        color="#E62B1E"
        emissive="#E62B1E"
        emissiveIntensity={1.8}
        wireframe
      />
    </mesh>
  );
};

interface FooterProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNavigateSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode, onToggleTheme, onNavigateSection }) => {
  return (
    <footer className="border-t border-white/10 pt-16 pb-12 relative overflow-hidden bg-[#07080B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Tiny Rotating Sphere */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-[#B31B10] to-[#E62B1E] flex items-center justify-center shadow-lg shadow-[#E62B1E]/20">
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
              </div>
              <span className="font-black text-xl tracking-[0.22em] uppercase font-sans">
                STAGE
              </span>

              {/* Tiny continuously rotating glowing sphere */}
              <div className="w-8 h-8 ml-2">
                <Canvas camera={{ position: [0, 0, 2.5] }} gl={{ alpha: true }}>
                  <ambientLight intensity={0.5} />
                  <TinyGlowingSphere />
                </Canvas>
              </div>
            </div>

            <p className="text-xs text-neutral-400 max-w-sm font-light leading-relaxed">
              The AI-powered speaking, interview and communication platform for students. Designed to transform technical students into magnetic orators.
            </p>

            <div className="text-[11px] font-mono text-neutral-500">
              San Francisco • London • Bengaluru • Tokyo
            </div>
          </div>

          {/* Col 2: Navigation Columns */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-bold">Platform</div>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><button onClick={() => onNavigateSection('ted-stage')} className="hover:text-white transition-colors">Student TED Stage</button></li>
              <li><button onClick={() => onNavigateSection('talk-lab')} className="hover:text-white transition-colors">AI Talk Lab</button></li>
              <li><button onClick={() => onNavigateSection('debate-arena')} className="hover:text-white transition-colors">Debate Arena</button></li>
              <li><button onClick={() => onNavigateSection('dna')} className="hover:text-white transition-colors">Communication DNA</button></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-bold">Careers</div>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><button onClick={() => onNavigateSection('career-readiness')} className="hover:text-white transition-colors">Resume → Interview</button></li>
              <li><button onClick={() => onNavigateSection('career-readiness')} className="hover:text-white transition-colors">Recruiter Mode</button></li>
              <li><button onClick={() => onNavigateSection('career-readiness')} className="hover:text-white transition-colors">Readiness Index</button></li>
              <li><a href="#partner" className="hover:text-white transition-colors">Recruiter Portal</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-bold">Collegiate Network</div>
            <p className="text-xs text-neutral-400">
              Bring STAGE to your university debate club, ACM chapter, or career center.
            </p>
            <div className="pt-1">
              <a
                href="mailto:chapters@stageplatform.edu"
                className="text-xs font-mono text-[#E62B1E] hover:underline"
              >
                chapters@stageplatform.edu
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © 2026 STAGE Platform Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={onToggleTheme} className="hover:text-white flex items-center gap-1.5 transition-colors">
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy & Speech Audio Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
