import { Stage, Layer, Circle } from "react-konva";
import { Grid } from "../(components)/grid";

export const ConfigurePage = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer listening={false}>
        <Grid width={window.innerWidth} height={window.innerHeight} size={25} />
        <Circle x={window.innerWidth / 2} y={window.innerHeight / 2} radius={50} fill="green" />
      </Layer>
    </Stage>
  );
};
