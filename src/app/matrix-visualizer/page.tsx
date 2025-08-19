"use client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./(3d)/scene";
import { AddTriadPanel } from "./(components)/(panels)/add-triad-panel";
import { TriadInfoPanel } from "./(components)/triad-info";
import { useRef } from "react";
import { TreePanel } from "./(components)/(panels)/tree-panel";
import { TriadGroup } from "./(3d)/triad-group";
import { useStates3d, useTriadInfoPanelState } from "./states";
import { Provider3d } from "./(3d)/3d-provider";
import { ObjectEffectsProvider } from "./(3d)/object-effects";

export default function MatrixVisualizer() {
  const matrixVisualizerRef = useRef<HTMLDivElement | null>(null);
  const triadInfoPanelVisibility = useTriadInfoPanelState((state) => state.visibility);
  const states3d = useStates3d();

  return (
    <div ref={matrixVisualizerRef} className="fixed left-0 top-0 h-screen w-screen">
      <Canvas>
        <Provider3d initializeCamera={states3d.setCamera} initializeScene={states3d.setScene} />
        <Scene />
        <TriadGroup />
        <ObjectEffectsProvider />
      </Canvas>
      <AddTriadPanel />
      {/* <TreePanel /> */}
      {triadInfoPanelVisibility && <TriadInfoPanel parentRef={matrixVisualizerRef} />}
    </div>
  );
}
