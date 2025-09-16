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
  editable?: boolean;
  updateWidth: (newWidth: number) => void;
  updateLength: (newLength: number) => void;
  updateRotation: (newRotation: number) => void;
}

export const RectangleChassis: FC<RectangleChassisProps> = (props) => {
  const isEditable = props.editable ?? true;

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
      {isEditable && (
        <>
          <DimensionResizer
            x={0}
            y={0}
            dimension={props.width / 2}
            direction="x"
            markerOffset={props.length / 2 + 20}
            labelOffset={20}
            rotation={-props.rotation}
            updateDimension={(newWidth) => props.updateWidth(Number((newWidth * 2).toFixed(2)))}
          />
          <DimensionResizer
            x={0}
            y={0}
            dimension={props.length / 2}
            direction="y"
            markerOffset={props.width / 2 + 20}
            labelOffset={45}
            rotation={-props.rotation}
            updateDimension={(newLength) => props.updateLength(Number((newLength * 2).toFixed(2)))}
          />
          <DiagonalResizer
            x={0}
            y={0}
            dimensionX={props.width}
            dimensionY={props.length}
            offset={20}
            updateDimensions={(newWidth, newLength) => {
              props.updateWidth(Number(newWidth.toFixed(2)));
              props.updateLength(Number(newLength.toFixed(2)));
            }}
          />
          <Rotator
            absoluteX={props.x}
            absoluteY={props.y}
            dimensionX={props.width}
            dimensionY={props.length}
            offset={15}
            rotation={props.rotation}
            updateRotation={props.updateRotation}
          />
        </>
      )}
    </Group>
  );
};
