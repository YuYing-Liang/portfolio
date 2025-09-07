import { type FC } from "react";
import { Circle, Line, Rect } from "react-konva";
import { DimensionResizer } from "../(mouse-actions)/dimension-resizer";
import { DiagonalResizer } from "../(mouse-actions)/diagonal-resizer";

interface RectangleChassisProps {
  x: number;
  y: number;
  base: number;
  height: number;
  rotation: number; // in degrees
  updateBase: (newBase: number) => Promise<void>;
  updateHeight: (newHeight: number) => Promise<void>;
}

export const TriangleChassis: FC<RectangleChassisProps> = (props) => {
  return (
    <>
      <Line
        points={[0, props.height, props.base, props.height, props.base / 2, 0]}
        x={props.x}
        y={props.y}
        offsetX={props.base / 2}
        offsetY={props.height / 2}
        rotation={props.rotation}
        closed
        fill="skyblue"
        stroke="black"
        strokeWidth={2}
      />
      <DimensionResizer
        x={props.x}
        y={props.y}
        dimension={props.base / 2}
        direction="x"
        markerOffset={props.height / 2 + 20}
        labelOffset={20}
        updateDimension={async (newBase) => await props.updateBase(Number((newBase * 2).toFixed(2)))}
      />
      <DimensionResizer
        x={props.x}
        y={props.y}
        dimension={props.height / 2}
        direction="y"
        markerOffset={props.base / 2 + 20}
        labelOffset={45}
        updateDimension={async (newHeight) => await props.updateHeight(Number((newHeight * 2).toFixed(2)))}
      />
      <DiagonalResizer
        x={props.x}
        y={props.y}
        dimensionX={props.base}
        dimensionY={props.height}
        offset={20}
        updateDimensions={async (newBase, newHeight) => {
          await props.updateBase(Number(newBase.toFixed(2)));
          await props.updateHeight(Number(newHeight.toFixed(2)));
        }}
      />
    </>
  );
};
