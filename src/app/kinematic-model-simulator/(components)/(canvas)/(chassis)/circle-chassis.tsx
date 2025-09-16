import { type FC } from "react";
import { Circle, Group } from "react-konva";
import { DimensionResizer } from "../(mouse-actions)/dimension-resizer";

interface CircleChassisProps {
  x: number;
  y: number;
  radius: number;
  rotation: number; // in degrees
  editable: boolean;
  maxRadius: number;
  updateRadius: (newRadius: number) => void;
}

export const CircleChassis: FC<CircleChassisProps> = (props) => {
  const isEditable = props.editable ?? true;

  return (
    <Group x={props.x} y={props.y} rotation={props.rotation}>
      <Circle radius={props.radius} fill="skyblue" stroke="black" strokeWidth={2} />
      {isEditable && (
        <DimensionResizer
          x={0}
          y={0}
          rotation={props.rotation}
          dimension={props.radius}
          direction="x"
          markerOffset={-props.radius - 20}
          labelOffset={-20}
          maxDimension={props.maxRadius}
          updateDimension={props.updateRadius}
        />
      )}
    </Group>
  );
};
