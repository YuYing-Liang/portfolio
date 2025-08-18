"use client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./(3d)/scene";
import { AddTriadPanel } from "./(components)/(panels)/add-triad-panel";
import { TriadInfoPanel } from "./(components)/triad-info";
import { useRef } from "react";
import { TreePanel } from "./(components)/(panels)/tree-panel";
import { TriadGroup } from "./(3d)/triad-group";
import { Triad } from "./(3d)/triad";
import { useTriadInfoPanelState } from "./states";

export default function MatrixVisualizer() {
  const matrixVisualizerRef = useRef<HTMLDivElement | null>(null);
  const triadInfoPanelVisibility = useTriadInfoPanelState((state) => state.visibility);

  return (
    <div ref={matrixVisualizerRef} className="fixed left-0 top-0 h-screen w-screen">
      <Canvas>
        <Scene />
        <TriadGroup />
      </Canvas>
      <AddTriadPanel />
      {/* <TreePanel /> */}
      {triadInfoPanelVisibility && <TriadInfoPanel parentRef={matrixVisualizerRef} />}
    </div>
  );
}
