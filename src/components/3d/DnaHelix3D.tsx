import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COMMUNICATION_DNA_METRICS } from '../../data/mockData';

interface HelixStrandProps {
  index: number;
  total: number;
  metric: typeof COMMUNICATION_DNA_METRICS[0];
  isHovered: boolean;
  onHover: (key: string | null) => void;
  isDarkMode?: boolean;
}

const StrandPair: React.FC<HelixStrandProps> = ({
  index,
  total,
  metric,
  isHovered,
  onHover,
  isDarkMode = true,
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const y = (index - total / 2) * 0.75;
  const angle = (index / total) * Math.PI * 3.5;
  const radius = 1.3;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  return (
    <group ref={meshRef} position={[0, y, 0]}>
      {/* Node A (Left strand) */}
      <mesh
        position={[x, 0, z]}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(metric.key);
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[isHovered ? 0.16 : 0.11, 24, 24]} />
        <meshStandardMaterial
          color={isHovered ? '#FFFFFF' : '#E62B1E'}
          emissive="#E62B1E"
          emissiveIntensity={isHovered ? 2.5 : 1.2}
          roughness={0.2}
        />
      </mesh>

      {/* Connecting base-pair cylinder */}
      <mesh
        position={[0, 0, 0]}
        rotation={[0, -angle, Math.PI / 2]}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(metric.key);
        }}
        onPointerOut={() => onHover(null)}
      >
        <cylinderGeometry args={[isHovered ? 0.035 : 0.018, isHovered ? 0.035 : 0.018, radius * 2, 16]} />
        <meshStandardMaterial
          color={isHovered ? '#FF6B5B' : (isDarkMode ? '#333A48' : '#B0B5C0')}
          metalness={0.7}
          roughness={0.3}
          emissive={isHovered ? '#E62B1E' : '#000000'}
          emissiveIntensity={isHovered ? 1.0 : 0}
        />
      </mesh>

      {/* Node B (Right strand) */}
      <mesh
        position={[-x, 0, -z]}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(metric.key);
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[isHovered ? 0.16 : 0.11, 24, 24]} />
        <meshStandardMaterial
          color={isHovered ? '#FFFFFF' : '#FF5538'}
          emissive="#FF5538"
          emissiveIntensity={isHovered ? 2.5 : 1.0}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

const DnaHelixScene: React.FC<{
  hoveredKey: string | null;
  setHoveredKey: (key: string | null) => void;
  isDarkMode?: boolean;
}> = ({ hoveredKey, setHoveredKey, isDarkMode = true }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <>
      <ambientLight intensity={isDarkMode ? 0.4 : 0.8} />
      <pointLight position={[2, 4, 3]} intensity={1.8} color="#FFFFFF" />
      <pointLight position={[-2, -3, 2]} intensity={2.2} color="#E62B1E" />
      
      <group ref={groupRef}>
        {COMMUNICATION_DNA_METRICS.map((metric, i) => (
          <StrandPair
            key={metric.key}
            index={i}
            total={COMMUNICATION_DNA_METRICS.length}
            metric={metric}
            isHovered={hoveredKey === metric.key}
            onHover={setHoveredKey}
            isDarkMode={isDarkMode}
          />
        ))}
      </group>
    </>
  );
};

export const DnaHelix3D: React.FC<{
  hoveredKey: string | null;
  setHoveredKey: (key: string | null) => void;
  isDarkMode?: boolean;
}> = ({ hoveredKey, setHoveredKey, isDarkMode = true }) => {
  return (
    <div className="w-full h-80 relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <DnaHelixScene
          hoveredKey={hoveredKey}
          setHoveredKey={setHoveredKey}
          isDarkMode={isDarkMode}
        />
      </Canvas>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none text-[11px] uppercase tracking-widest text-neutral-400 font-mono">
        Interactive 3D DNA Helix • Hover Strands
      </div>
    </div>
  );
};
