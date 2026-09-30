import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PodiumsScene: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = true }) => {
  const groupRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.4) * 0.12;
    }
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.25 + Math.sin(time * 3) * 0.12;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={isDarkMode ? 0.4 : 0.8} />
      <directionalLight position={[0, 5, 4]} intensity={1.5} />
      <pointLight position={[-2, 1, 0]} intensity={2.0} color="#E62B1E" />
      <pointLight position={[2, 1, 0]} intensity={2.0} color="#3B82F6" />

      <group ref={groupRef} position={[0, -0.6, 0]}>
        {/* Arena Base Floor */}
        <mesh position={[0, -0.15, 0]} receiveShadow>
          <cylinderGeometry args={[3.2, 3.4, 0.15, 48]} />
          <meshStandardMaterial
            color={isDarkMode ? '#0E1017' : '#EAE9E4'}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Affirmative Podium (Left) */}
        <group position={[-1.6, 0.4, 0]}>
          <mesh>
            <cylinderGeometry args={[0.45, 0.55, 0.9, 32]} />
            <meshStandardMaterial
              color={isDarkMode ? '#1A1C25' : '#D1D0CA'}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          {/* Glowing Top Ring */}
          <mesh position={[0, 0.46, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.35, 0.44, 32]} />
            <meshStandardMaterial color="#E62B1E" emissive="#E62B1E" emissiveIntensity={2} />
          </mesh>
        </group>

        {/* Negative Podium (Right) */}
        <group position={[1.6, 0.4, 0]}>
          <mesh>
            <cylinderGeometry args={[0.45, 0.55, 0.9, 32]} />
            <meshStandardMaterial
              color={isDarkMode ? '#1A1C25' : '#D1D0CA'}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          {/* Glowing Top Ring */}
          <mesh position={[0, 0.46, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.35, 0.44, 32]} />
            <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={1.8} />
          </mesh>
        </group>

        {/* Central Energy Beam / Debate Spark */}
        <mesh ref={beamRef} position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 3.0, 16]} />
          <meshBasicMaterial
            color="#FF4438"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Center Tension Core */}
        <mesh position={[0, 0.6, 0]}>
          <octahedronGeometry args={[0.22]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#E62B1E"
            emissiveIntensity={2.5}
            roughness={0.1}
          />
        </mesh>
      </group>
    </>
  );
};

export const DebatePodiums3D: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = true }) => {
  return (
    <div className="w-full h-64 md:h-72 relative">
      <Canvas
        camera={{ position: [0, 1.8, 4.4], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <PodiumsScene isDarkMode={isDarkMode} />
      </Canvas>
    </div>
  );
};
