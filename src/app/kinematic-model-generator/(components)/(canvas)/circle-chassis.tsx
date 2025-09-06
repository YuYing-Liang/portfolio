import { type FC } from "react";
import { Circle } from "react-konva";
import { DimensionResizer } from "./dimension-resizer";

interface CircleChassisProps {
  x: number;
  y: number;
  radius: number;
  rotation: number; // in degrees
  updateRadius: (newRadius: number) => Promise<void>;
}

export const CircleChassis: FC<CircleChassisProps> = (props) => {
  return (
    <>
      <Circle
        x={props.x}
        y={props.y}
        radius={props.radius}
        rotation={props.rotation}
        fill="skyblue"
        stroke="black"
        strokeWidth={2}
      />
      <DimensionResizer
        x={props.x}
        y={props.y}
        dimension={props.radius}
        direction="x"
        markerOffset={-props.radius - 20}
        labelOffset={-20}
        updateDimension={props.updateRadius}
      />
    </>
  );
};
