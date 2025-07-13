"use client";
import { Canvas } from "@react-three/fiber";
import { Triad } from "./(3d)/triad";
import { Scene } from "./(3d)/scene";
import { AddTriadPanel } from "./(components)/add-triad-panel";
import { TriadInfoPanel } from "./(components)/triad-info";

export default function MatrixVisualizer() {
  return (
    <div className="h-screen w-screen">
      <Canvas>
        <Scene />
        <Triad />
      </Canvas>
      <AddTriadPanel />
      <TriadInfoPanel />
    </div>
  );
}
