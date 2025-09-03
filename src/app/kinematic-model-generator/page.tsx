"use client";
import { Stack } from "@mantine/core";
import { TopBar } from "./(components)/top-bar";
import { ChassisListPanel } from "./(components)/(panels)/chassis-list-panel";
import { ChassisSelectorPanel } from "./(components)/(panels)/chassis-selector-panel";
import { MotorSpeedPanel } from "./(components)/(panels)/motor-speed-panel";
import { TrajectoryPanel } from "./(components)/(panels)/trajectory-panel";
import { usePageState } from "./states";
import { ConfigurePage } from "./(pages)/configure-page";
import { SimulatePage } from "./(pages)/simulate-page";

export default function KinematicModelGenerator() {
  const pageState = usePageState();

  return (
    <div className="fixed left-0 top-0 h-screen w-screen">
      {pageState.page === "configure" && <ConfigurePage />}
      {pageState.page === "simulate" && <SimulatePage />}
      <Stack className="absolute left-[25px] top-[25px]">
        <ChassisSelectorPanel />
        <ChassisListPanel />
        <MotorSpeedPanel />
      </Stack>
      <TopBar />
      <Stack className="absolute right-[25px] top-[25px]">
        <TrajectoryPanel />
      </Stack>
    </div>
  );
}
