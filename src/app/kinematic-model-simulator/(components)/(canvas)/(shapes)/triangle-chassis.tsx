import { type PropsWithChildren, type FC } from "react";
import { Group, Line } from "react-konva";
import { DimensionResizer } from "../(mouse-actions)/dimension-resizer";
import { DiagonalResizer } from "../(mouse-actions)/diagonal-resizer";
import { Rotator } from "../(mouse-actions)/rotator";

interface TriangleChassisProps {
  x: number;
  y: number;
  base: number;
  height: number;
  rotation: number; // in degrees
  maxBase: number;
  maxHeight: number;
  editable?: boolean;
  updateBase: (newBase: number) => void;
  updateHeight: (newHeight: number) => void;
  updateRotation: (newRotation: number) => void;
}

export const TriangleChassis: FC<PropsWithChildren<TriangleChassisProps>> = (props) => {
  const isEditable = props.editable ?? true;

  return (
    <>
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
        {props.children}
        {isEditable && (
          <>
            <DimensionResizer
              x={0}
              y={0}
              dimension={props.base / 2}
              direction="x"
              markerOffset={props.height / 2 + 20}
              labelOffset={20}
              rotation={-props.rotation}
              maxDimension={props.maxBase}
              updateDimension={(newBase) => props.updateBase(Number((newBase * 2).toFixed(2)))}
            />
            <DimensionResizer
              x={0}
              y={0}
              dimension={props.height / 2}
              direction="y"
              markerOffset={props.base / 2 + 20}
              labelOffset={45}
              rotation={-props.rotation}
              maxDimension={props.maxHeight}
              updateDimension={(newHeight) => props.updateHeight(Number((newHeight * 2).toFixed(2)))}
            />
            <DiagonalResizer
              x={0}
              y={0}
              dimensionX={props.base}
              dimensionY={props.height}
              offset={20}
              maxDimensionX={props.maxBase}
              maxDimensionY={props.maxHeight}
              updateDimensions={(newBase, newHeight) => {
                props.updateBase(Number(newBase.toFixed(2)));
                props.updateHeight(Number(newHeight.toFixed(2)));
              }}
            />
          </>
        )}
      </Group>
      {isEditable && (
        <Rotator
          absoluteX={props.x}
          absoluteY={props.y}
          dimensionX={props.base}
          dimensionY={props.height}
          offset={15}
          rotation={props.rotation}
          updateRotation={props.updateRotation}
        />
      )}
    </>
  );
};
