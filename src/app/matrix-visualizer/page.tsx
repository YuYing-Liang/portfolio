"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { DoubleSide } from "three";
import { Triad } from "./(components)/triad";

export default function MatrixVisualizer() {
  return (
    <div className="h-screen w-screen">
      <Canvas>
        <OrbitControls />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]} receiveShadow>
          <planeGeometry args={[100, 100, 10, 10]} />
          <meshStandardMaterial color="#fff" side={DoubleSide} opacity={0.1} />
        </mesh>
        <Triad />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} color="#fff" />
      </Canvas>
    </div>
  );
}
