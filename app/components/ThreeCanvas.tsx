"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, PerspectiveCamera, Float } from "@react-three/drei";

export default function ThreeCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00f0ff" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Abstract floating structure */}
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[4, 2, -5]} rotation={[0.5, 0.5, 0]}>
            <octahedronGeometry args={[2, 0]} />
            <meshStandardMaterial color="#00f0ff" wireframe />
          </mesh>
        </Float>
        
        <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
          <mesh position={[-5, -2, -8]}>
            <icosahedronGeometry args={[3, 1]} />
            <meshStandardMaterial color="#b829ff" wireframe opacity={0.3} transparent />
          </mesh>
        </Float>
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
