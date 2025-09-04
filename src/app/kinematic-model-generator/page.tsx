"use client";
import { Stack } from "@mantine/core";
import { TopBar } from "./(components)/top-bar";
import { ChassisListPanel } from "./(components)/(panels)/chassis-list-panel";
import { NewChassisFormPanel } from "./(components)/(panels)/new-chassis-panel";
import { MotorSpeedPanel } from "./(components)/(panels)/motor-speed-panel";
import { TrajectoryPanel } from "./(components)/(panels)/trajectory-panel";
import { usePageState } from "./states";
import { ConfigurePage } from "./(pages)/configure-page";
import { SimulatePage } from "./(pages)/simulate-page";

export default function KinematicModelGenerator() {
  const pageState = usePageState();
  const isSimulatePage = pageState.page === "simulate";
  const isConfigurePage = pageState.page === "configure";

  return (
    <div className="fixed left-0 top-0 h-screen w-screen">
      {isConfigurePage && <ConfigurePage />}
      {isSimulatePage && <SimulatePage />}
      <Stack className="absolute left-[25px] top-[25px]">
        {isConfigurePage && <NewChassisFormPanel />}
        {isSimulatePage && <ChassisListPanel />}
        {isSimulatePage && <MotorSpeedPanel />}
      </Stack>
      <TopBar />
      <Stack className="absolute right-[25px] top-[25px]">
        {isSimulatePage && <TrajectoryPanel />}
      </Stack>
    </div>
  );
}
