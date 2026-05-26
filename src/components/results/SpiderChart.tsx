import { CareerAnchorResult } from '@/types/career';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';

interface SpiderChartProps {
  results: CareerAnchorResult[];
}

interface BubbleProps {
  home: [number, number, number];
  radius: number;
  color: string;
  label: string;
  score: number;
}

const Bubble = ({ home, radius, color, label, score }: BubbleProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const position = useRef(new THREE.Vector3(...home));
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const dt = Math.min(delta, 0.05);
    // Spring force back to home position
    const home3 = new THREE.Vector3(...home);
    const displacement = position.current.clone().sub(home3);
    const springForce = displacement.multiplyScalar(-40); // stiffness
    const damping = velocity.current.clone().multiplyScalar(-4); // damping
    const acceleration = springForce.add(damping);
    velocity.current.add(acceleration.multiplyScalar(dt));
    position.current.add(velocity.current.clone().multiplyScalar(dt));
    meshRef.current.position.copy(position.current);
  });

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    // Impulse based on click point relative to center
    const impactPoint = e.point.clone();
    const direction = position.current.clone().sub(impactPoint).normalize();
    if (direction.lengthSq() === 0) direction.set(Math.random() - 0.5, Math.random() - 0.5, 0).normalize();
    direction.z = 0;
    const strength = 8 + Math.random() * 4;
    velocity.current.add(direction.multiplyScalar(strength));
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        position={home}
        onPointerDown={handlePointerDown}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.35}
          metalness={0.15}
          emissive={color}
          emissiveIntensity={hovered ? 0.4 : 0.15}
        />
      </mesh>
    </group>
  );
};

const Scene = ({ results }: SpiderChartProps) => {
  const bubbles = useMemo(() => {
    const cols = 4;
    const spacingX = 2.6;
    const spacingY = 2.6;
    const rows = Math.ceil(results.length / cols);
    return results.map((result, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = (col - (cols - 1) / 2) * spacingX;
      const y = ((rows - 1) / 2 - row) * spacingY;
      // Radius proportional to score (assume 1-6 scale)
      const radius = Math.max(0.25, result.score * 0.18);
      // Resolve HSL var to actual color via getComputedStyle hack? Use directly.
      return {
        key: result.anchor,
        home: [x, y, 0] as [number, number, number],
        radius,
        color: result.color,
        label: result.name,
        score: result.score,
      };
    });
  }, [results]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, 3]} intensity={0.4} />
      {bubbles.map((b) => (
        <Bubble
          key={b.key}
          home={b.home}
          radius={b.radius}
          color={b.color}
          label={b.label}
          score={b.score}
        />
      ))}
    </>
  );
};

const SpiderChart = ({ results }: SpiderChartProps) => {
  return (
    <div className="w-full bg-card/50 rounded-lg border border-border overflow-hidden">
      <div className="w-full h-[480px]">
        <Canvas camera={{ position: [0, 0, 9], fov: 50 }}>
          <Scene results={results} />
        </Canvas>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4 text-center">
        {results.map((r) => (
          <div key={r.anchor} className="flex items-center justify-center gap-2 text-xs">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: r.color }}
            />
            <span className="text-muted-foreground">{r.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpiderChart;
