"use client";
import { Stack } from "@mantine/core";
import { TopBar } from "./(components)/(settings)/top-bar";
import { ChassisListPanel } from "./(components)/(panels)/chassis-list-panel";
import { ChassisFormPanel } from "./(components)/(panels)/chassis-panel-form";
import { MotorSpeedPanel } from "./(components)/(panels)/motor-speed-panel";
import { TrajectoryPanel } from "./(components)/(panels)/trajectory-panel";
import { usePageState } from "./(states)/states";
import { ConfigurePage } from "./(pages)/configure-page";
import { SimulatePage } from "./(pages)/simulate-page";
import { ChassisForm } from "./(states)/chassis-form";

export default function KinematicModelGenerator() {
  const pageState = usePageState();
  const isSimulatePage = pageState.page === "simulate";
  const isConfigurePage = pageState.page === "configure";

  return (
    <div className="fixed left-0 top-0 h-screen w-screen">
      {isConfigurePage && (
        <ChassisForm>
          <ConfigurePage />
          <Stack className="absolute left-[25px] top-[25px]">
            <ChassisFormPanel />
            <ChassisListPanel />
          </Stack>
        </ChassisForm>
      )}
      {isSimulatePage && (
        <>
          <SimulatePage />
          <Stack className="absolute left-[25px] top-[25px]">
            <ChassisListPanel />
            <MotorSpeedPanel />
          </Stack>
          <Stack className="absolute right-[25px] top-[25px]">
            <TrajectoryPanel />
          </Stack>
        </>
      )}
      <TopBar />
    </div>
  );
}
