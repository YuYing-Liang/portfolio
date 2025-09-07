import { type FC } from "react";
import { Circle, Group, Line, Rect } from "react-konva";
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
    <Group x={props.x} y={props.y} rotation={props.rotation}>
      <Line
        points={[0, props.height, props.base, props.height, props.base / 2, 0]}
        offsetX={props.base / 2}
        offsetY={props.height / 2}
        closed
        fill="skyblue"
        stroke="black"
        strokeWidth={2}
      />
      <DimensionResizer
        x={0}
        y={0}
        dimension={props.base / 2}
        direction="x"
        markerOffset={props.height / 2 + 20}
        labelOffset={20}
        rotation={-props.rotation}
        updateDimension={async (newBase) => await props.updateBase(Number((newBase * 2).toFixed(2)))}
      />
      <DimensionResizer
        x={0}
        y={0}
        dimension={props.height / 2}
        direction="y"
        markerOffset={props.base / 2 + 20}
        labelOffset={45}
        rotation={-props.rotation}
        updateDimension={async (newHeight) => await props.updateHeight(Number((newHeight * 2).toFixed(2)))}
      />
      <DiagonalResizer
        x={0}
        y={0}
        dimensionX={props.base}
        dimensionY={props.height}
        offset={20}
        updateDimensions={async (newBase, newHeight) => {
          await props.updateBase(Number(newBase.toFixed(2)));
          await props.updateHeight(Number(newHeight.toFixed(2)));
        }}
      />
    </Group>
  );
};
