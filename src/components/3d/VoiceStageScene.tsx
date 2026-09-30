import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface VoiceStageSceneProps {
  audioLevel?: number; // 0 to 1 live or simulated voice audio
  isDarkMode?: boolean;
  cameraStageProgress?: number; // 0 for landing, 1 for deep into stage
  activeGoal?: string;
}

export const VoiceStageScene: React.FC<VoiceStageSceneProps> = ({
  audioLevel = 0,
  isDarkMode = true,
  cameraStageProgress = 0,
  activeGoal,
}) => {
  const { mouse } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const spotlightConeRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Goal-based lighting hue
  const goalColor = useMemo(() => {
    switch (activeGoal) {
      case 'Interviews':
        return new THREE.Color(isDarkMode ? '#E62B1E' : '#D02015');
      case 'Public Speaking':
        return new THREE.Color(isDarkMode ? '#FF5538' : '#FF4024');
      case 'Debate':
        return new THREE.Color(isDarkMode ? '#E62B1E' : '#C71B10');
      case 'English Conversation':
        return new THREE.Color(isDarkMode ? '#FF6B5B' : '#E63928');
      default:
        return new THREE.Color(isDarkMode ? '#E62B1E' : '#CC2216');
    }
  }, [activeGoal, isDarkMode]);

  // Particle positions
  const [particlesPos, particlesCount] = useMemo(() => {
    const count = 160;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 5.0;
      const y = (Math.random() - 0.4) * 6;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
    }
    return [positions, count];
  }, []);

  // Ring configurations
  const ringsConfig = useMemo(() => {
    return [
      { radius: 1.1, tube: 0.024, rotSpeed: 0.35, tilt: [0.15, 0.2, 0] },
      { radius: 1.6, tube: 0.028, rotSpeed: -0.28, tilt: [-0.2, 0.1, 0.3] },
      { radius: 2.1, tube: 0.032, rotSpeed: 0.22, tilt: [0.3, -0.15, 0.1] },
      { radius: 2.65, tube: 0.034, rotSpeed: -0.18, tilt: [-0.1, -0.25, -0.2] },
      { radius: 3.25, tube: 0.038, rotSpeed: 0.12, tilt: [0.25, 0.3, -0.15] },
    ];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const effectiveAudio = Math.max(audioLevel, Math.sin(time * 2.2) * 0.12 + 0.15);

    // Group cursor magnetic response
    if (groupRef.current) {
      const targetRotX = mouse.y * 0.18 + (cameraStageProgress * 0.1);
      const targetRotY = mouse.x * 0.28 + (time * 0.06);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 3);

      // Camera forward push when transitioning into stage
      const targetZ = cameraStageProgress * 2.5;
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 4);
    }

    // Core pulsing & luminescence
    if (coreRef.current) {
      const coreScale = 1 + effectiveAudio * 0.45 + Math.sin(time * 3) * 0.08;
      coreRef.current.scale.set(coreScale, coreScale, coreScale);
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = 1.2 + effectiveAudio * 2.5;
      }
    }

    // Rings rotation & waveform wobble
    if (ringsRef.current) {
      ringsRef.current.children.forEach((child, idx) => {
        const conf = ringsConfig[idx % ringsConfig.length];
        child.rotation.z += conf.rotSpeed * delta * (1 + effectiveAudio * 1.5);
        child.rotation.x += Math.sin(time + idx) * 0.003;
        
        // Modulate scale slightly with audio
        const scaleMod = 1 + Math.sin(time * 4 + idx * 0.8) * 0.04 * (1 + effectiveAudio * 2);
        child.scale.set(scaleMod, scaleMod, 1 + effectiveAudio * 0.6);
      });
    }

    // Spotlight cone breathing
    if (spotlightConeRef.current) {
      const coneMat = spotlightConeRef.current.material as THREE.MeshBasicMaterial;
      if (coneMat) {
        coneMat.opacity = 0.18 + effectiveAudio * 0.25 + Math.sin(time * 1.5) * 0.05;
      }
    }

    // Floating particles drift
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.03;
    }
  });

  return (
    <>
      {/* Dynamic Lighting */}
      <ambientLight intensity={isDarkMode ? 0.45 : 0.85} />
      <directionalLight position={[5, 8, 5]} intensity={isDarkMode ? 1.2 : 1.5} color="#FFFFFF" />
      <pointLight position={[0, 0, 0]} intensity={2.8} distance={8} color={goalColor} />
      <spotLight
        position={[0, 7.5, 0]}
        target-position={[0, -1, 0]}
        angle={0.5}
        penumbra={0.8}
        intensity={isDarkMode ? 3.5 : 2.5}
        color={isDarkMode ? '#FFF2EB' : '#FFEBE6'}
      />

      <group ref={groupRef} position={[0, -0.4, 0]}>
        {/* Volumetric Spotlight Cone */}
        <mesh ref={spotlightConeRef} position={[0, 3.8, 0]}>
          <coneGeometry args={[2.8, 7.6, 32, 1, true]} />
          <meshBasicMaterial
            color={goalColor}
            transparent
            opacity={0.16}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Floating Minimal Stage Platform */}
        <group position={[0, -1.8, 0]}>
          {/* Main Beveled Stage Disc */}
          <mesh receiveShadow position={[0, -0.1, 0]}>
            <cylinderGeometry args={[3.2, 3.4, 0.22, 64]} />
            <meshStandardMaterial
              color={isDarkMode ? '#0F1117' : '#E8E7E3'}
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>

          {/* Inner Stage Ring Accent */}
          <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.6, 2.68, 64]} />
            <meshStandardMaterial
              color={goalColor}
              emissive={goalColor}
              emissiveIntensity={isDarkMode ? 1.5 : 0.8}
              toneMapped={false}
            />
          </mesh>

          {/* Stage Center Plaque (Voice Origin) */}
          <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.7, 48]} />
            <meshStandardMaterial
              color={isDarkMode ? '#171923' : '#DAD9D4'}
              metalness={0.9}
              roughness={0.15}
            />
          </mesh>
        </group>

        {/* Central Glowing Core (Voice Intelligence) */}
        <mesh ref={coreRef} position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.38, 32, 32]} />
          <meshStandardMaterial
            color={goalColor}
            emissive={goalColor}
            emissiveIntensity={1.8}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>

        {/* Sculptural Sound-Wave Concentric Rings */}
        <group ref={ringsRef} position={[0, 0.2, 0]}>
          {ringsConfig.map((ring, idx) => (
            <mesh
              key={idx}
              rotation={new THREE.Euler(...(ring.tilt as [number, number, number]))}
            >
              <torusGeometry args={[ring.radius, ring.tube, 24, 96]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? (isDarkMode ? '#CCCCCC' : '#555555') : goalColor}
                metalness={0.92}
                roughness={0.18}
                emissive={idx % 2 !== 0 ? goalColor : '#000000'}
                emissiveIntensity={idx % 2 !== 0 ? (isDarkMode ? 0.8 : 0.4) : 0}
              />
            </mesh>
          ))}
        </group>

        {/* Ambient Neural Floating Particles */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particlesCount}
              array={particlesPos}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.035}
            color={isDarkMode ? '#FF8C7A' : '#E62B1E'}
            transparent
            opacity={0.65}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>
    </>
  );
};
