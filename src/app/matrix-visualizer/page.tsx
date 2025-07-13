"use client";
import { Canvas } from "@react-three/fiber";
import { Triad } from "./(3d)/triad";
import { Scene } from "./(3d)/scene";
import { AddMatrixPanel } from "./(components)/add-matrix-panel";

export default function MatrixVisualizer() {
  return (
    <div className="h-screen w-screen">
      <Canvas>
        <Scene />
        <Triad />
      </Canvas>
      <AddMatrixPanel />
    </div>
  );
}
