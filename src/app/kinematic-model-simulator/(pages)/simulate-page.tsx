import { Stage, Layer } from "react-konva";
import { Grid } from "../(components)/(canvas)/grid";
import { useLocalStorage, useViewportSize } from "@mantine/hooks";
import { DEFAULT_SETTINGS, SettingData } from "../(components)/(settings)/settings";

export const SimulatePage = () => {
  const { height, width } = useViewportSize();
  const [gridSize, _] = useLocalStorage<SettingData["gridSize"]>({
    key: "gridSize",
    defaultValue: DEFAULT_SETTINGS.gridSize,
  });

  return (
    <Stage width={width} height={height}>
      <Layer listening={false}>
        <Grid width={width} height={height} size={gridSize} />
      </Layer>
    </Stage>
  );
};
