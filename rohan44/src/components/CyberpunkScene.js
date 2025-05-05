import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

function Building({ position, height, color }) {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.emissiveIntensity = 0.5 + Math.sin(Date.now() * 0.002) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, height, 1]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
    </mesh>
  );
}

function CityScene() {
  const buildings = useMemo(() => {
    const items = [];
    for (let x = -15; x <= 15; x += 3) {
      for (let z = -15; z <= 15; z += 3) {
        const height = Math.random() * 10 + 5;
        const y = height / 2;
        const hue = Math.random() > 0.5 ? 280 : 190; // purple or cyan
        const color = new THREE.Color(`hsl(${hue}, 100%, 60%)`);
        items.push({ position: [x, y, z], height, color });
      }
    }
    return items;
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight color={0xffffff} intensity={2} position={[0, 30, 0]} />
      <Stars radius={100} depth={50} count={5000} factor={4} fade />

      {buildings.map((b, i) => (
        <Building key={i} {...b} />
      ))}
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#000' }}>
      <Canvas camera={{ position: [0, 30, 40], fov: 60 }}>
        <CityScene />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  );
}
