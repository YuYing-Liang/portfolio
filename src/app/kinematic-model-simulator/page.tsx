"use client";
import { Stack } from "@mantine/core";
import { TopBar } from "./(components)/(settings)/top-bar";
import { ChassisListPanel } from "./(components)/(panels)/chassis/chassis-list-panel";
import { ChassisFormPanel } from "./(components)/(panels)/chassis/chassis-form-panel";
import { MotorSpeedPanel } from "./(components)/(panels)/motor-speed-panel";
import { TrajectoryPanel } from "./(components)/(panels)/trajectory-panel";
import { usePageState } from "./(states)/states";
import { ConfigurePage } from "./(pages)/configure-page";
import { SimulatePage } from "./(pages)/simulate-page";
import { WheelFormPanel } from "./(components)/(panels)/wheel/wheel-form-panel";
import { WheelListPanel } from "./(components)/(panels)/wheel/wheel-list-panel";
import { useLocalStorage, useViewportSize } from "@mantine/hooks";
import { Layer, Stage } from "react-konva";
import { Grid } from "./(components)/(canvas)/grid";
import { DEFAULT_SETTINGS, type SettingData } from "./(components)/(settings)/settings";

export default function KinematicModelGenerator() {
  const pageState = usePageState();
  const { height, width } = useViewportSize();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gridSize, _setGridSize] = useLocalStorage<SettingData["gridSize"]>({
    key: "gridSize",
    defaultValue: DEFAULT_SETTINGS.gridSize,
  });

  const isSimulatePage = pageState.page === "simulate";
  const isConfigurePage = pageState.page === "configure";

  return (
    <div className="fixed left-0 top-0 h-screen w-screen">
      <Stage width={width} height={height}>
        <Layer listening={false}>
          <Grid width={width} height={height} size={gridSize} />
        </Layer>
        {isConfigurePage && <ConfigurePage />}
        {isSimulatePage && <SimulatePage />}
      </Stage>
      <Stack className="absolute left-[25px] top-[25px]">
        <ChassisListPanel />
        {isConfigurePage && <ChassisFormPanel />}
        {isSimulatePage && <MotorSpeedPanel />}
      </Stack>
      <Stack className="absolute right-[25px] top-[25px]">
        {isConfigurePage && <WheelListPanel />}
        {isConfigurePage && <WheelFormPanel />}
        {isSimulatePage && <TrajectoryPanel />}
      </Stack>
      <TopBar />
    </div>
  );
}
