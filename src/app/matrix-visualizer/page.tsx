"use client";
import { Canvas } from "@react-three/fiber";
import { Triad } from "./(3d)/triad";
import { Scene } from "./(3d)/scene";
import { AddTriadPanel } from "./(components)/add-triad-panel";
import { TriadInfoPanel } from "./(components)/triad-info";
import { useRef } from "react";

export default function MatrixVisualizer() {
  const matrixVisualizerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={matrixVisualizerRef} className="h-screen w-screen">
      <Canvas>
        <Scene />
        <Triad />
      </Canvas>
      <AddTriadPanel />
      <TriadInfoPanel parentRef={matrixVisualizerRef} />
    </div>
  );
}
