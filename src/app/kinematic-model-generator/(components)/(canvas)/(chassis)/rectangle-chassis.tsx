import { type FC } from "react";
import { Circle, Rect } from "react-konva";
import { DimensionResizer } from "../dimension-resizer";

interface RectangleChassisProps {
  x: number;
  y: number;
  width: number;
  length: number;
  rotation: number; // in degrees
  updateWidth: (newWidth: number) => Promise<void>;
  updateLength: (newLength: number) => Promise<void>;
}

export const RectangleChassis: FC<RectangleChassisProps> = (props) => {
  return (
    <>
      <Rect
        offsetX={props.width / 2}
        offsetY={props.length / 2}
        x={props.x}
        y={props.y}
        rotation={props.rotation}
        width={props.width}
        height={props.length}
        fill="skyblue"
        stroke="black"
        strokeWidth={2}
      />
      <DimensionResizer
        x={props.x}
        y={props.y}
        dimension={props.width / 2}
        direction="x"
        markerOffset={props.length / 2 + 20}
        labelOffset={20}
        updateDimension={async (newWidth) => await props.updateWidth(Number((newWidth * 2).toFixed(2)))}
      />
      <DimensionResizer
        x={props.x}
        y={props.y}
        dimension={props.length / 2}
        direction="y"
        markerOffset={props.width / 2 + 20}
        labelOffset={45}
        updateDimension={async (newLength) => await props.updateLength(Number((newLength * 2).toFixed(2)))}
      />
    </>
  );
};
