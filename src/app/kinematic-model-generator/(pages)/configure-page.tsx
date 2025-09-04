import { Stage, Layer, Circle } from "react-konva";
import { Grid } from "../(components)/(canvas)/grid";
import { useViewportSize } from "@mantine/hooks";

export const ConfigurePage = () => {
  const { height, width } = useViewportSize();
  
  return (
    <Stage width={width} height={height}>
      <Layer listening={false}>
        <Grid width={width} height={height} size={25} />
        <Circle x={width/ 2} y={height / 2} radius={50} fill="green" />
      </Layer>
    </Stage>
  );
};
