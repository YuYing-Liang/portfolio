"use client";
import { Stack } from "@mantine/core";
import { ChassisSelectorPanel } from "./(panels)/chassis-selector-panel";
import { ChassisListPanel } from "./(panels)/chassis-list-panel";
import { TopBar } from "./top-bar";

export default function KinematicModelGenerator() {
  return (
    <div className="fixed left-0 top-0 h-screen w-screen">
      <Stack className="absolute left-[25px] top-[25px]">
        <ChassisSelectorPanel />
        <ChassisListPanel />
      </Stack>
      <TopBar />
    </div>
  );
}
