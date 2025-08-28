"use client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./(3d)/scene";
import { AddTriadPanel } from "./(components)/(panels)/add-triad-panel";
import { TriadInfoPanel } from "./(components)/(panels)/triad-info-panel";
import { useRef } from "react";
import { TreePanel } from "./(components)/(panels)/tree-panel";
import { TriadGroup } from "./(3d)/triad-group";
import { useStates3d, useTriadInfoPanelState } from "./states";
import { Provider3d } from "./(3d)/3d-provider";
import { ObjectEffectsProvider } from "./(3d)/object-effects";
import { SettingsToolbar } from "./(components)/(settings-toolbar)/settings-toolbar";
import { Stack } from "@mantine/core";

export default function MatrixVisualizer() {
  const states3d = useStates3d();

  return (
    <div className="fixed left-0 top-0 h-screen w-screen">
      <Canvas>
        <Provider3d initializeCamera={states3d.setCamera} initializeScene={states3d.setScene} />
        <Scene />
        <TriadGroup />
        <ObjectEffectsProvider />
      </Canvas>
      <AddTriadPanel />
      <SettingsToolbar />
      <Stack gap="sm" className="absolute right-[25px] top-[25px]">
        <TriadInfoPanel />
        <TreePanel />
      </Stack>
    </div>
  );
}
