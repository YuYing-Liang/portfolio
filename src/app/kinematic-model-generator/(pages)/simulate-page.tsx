import { Stage, Layer } from "react-konva";
import { Grid } from "../(components)/(canvas)/grid";
import { useViewportSize } from "@mantine/hooks";

export const SimulatePage = () => {
  const { height, width } = useViewportSize();

  return (
    <Stage width={width} height={height}>
      <Layer listening={false}>
        <Grid width={width} height={height} size={25} />
      </Layer>
    </Stage>
  );
};
