import { Stage, Layer } from "react-konva";
import { Grid } from "../(components)/grid";

export const SimulatePage = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer listening={false}>
        <Grid width={window.innerWidth} height={window.innerHeight} size={25} />
      </Layer>
    </Stage>
  );
};
