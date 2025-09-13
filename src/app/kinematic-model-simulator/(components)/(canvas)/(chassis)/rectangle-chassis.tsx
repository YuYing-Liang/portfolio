import { type FC } from "react";
import { Group, Rect } from "react-konva";
import { DimensionResizer } from "../(mouse-actions)/dimension-resizer";
import { DiagonalResizer } from "../(mouse-actions)/diagonal-resizer";
import { Rotator } from "../(mouse-actions)/rotator";

interface RectangleChassisProps {
  x: number;
  y: number;
  width: number;
  length: number;
  rotation: number; // in degrees
  updateWidth: (newWidth: number) => Promise<void>;
  updateLength: (newLength: number) => Promise<void>;
  updateRotation: (newRotation: number) => Promise<void>;
}

export const RectangleChassis: FC<RectangleChassisProps> = (props) => {
  return (
    <Group x={props.x} y={props.y} rotation={props.rotation}>
      <Rect
        offsetX={props.width / 2}
        offsetY={props.length / 2}
        width={props.width}
        height={props.length}
        fill="skyblue"
        stroke="black"
        strokeWidth={2}
      />
      <DimensionResizer
        x={0}
        y={0}
        dimension={props.width / 2}
        direction="x"
        markerOffset={props.length / 2 + 20}
        labelOffset={20}
        rotation={-props.rotation}
        updateDimension={async (newWidth) => await props.updateWidth(Number((newWidth * 2).toFixed(2)))}
      />
      <DimensionResizer
        x={0}
        y={0}
        dimension={props.length / 2}
        direction="y"
        markerOffset={props.width / 2 + 20}
        labelOffset={45}
        rotation={-props.rotation}
        updateDimension={async (newLength) => await props.updateLength(Number((newLength * 2).toFixed(2)))}
      />
      <DiagonalResizer
        x={0}
        y={0}
        dimensionX={props.width}
        dimensionY={props.length}
        offset={20}
        updateDimensions={async (newWidth, newLength) => {
          await props.updateWidth(Number(newWidth.toFixed(2)));
          await props.updateLength(Number(newLength.toFixed(2)));
        }}
      />
      <Rotator
        absoluteX={props.x}
        absoluteY={props.y}
        dimensionX={props.width}
        dimensionY={props.length}
        offset={5}
        rotation={props.rotation}
        updateRotation={props.updateRotation}
      />
    </Group>
  );
};
