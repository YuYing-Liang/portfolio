import { FC } from "react";
import { Rect, Group, Text } from "react-konva";

interface CanvasLabelProps {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  rotation?: number;
}

export const CanvasLabel: FC<CanvasLabelProps> = (props) => {
  const offsetX = props.width / 2;
  const offsetY = props.height / 2;

  return (
    <Group x={props.x} y={props.y} rotation={props.rotation}>
      <Rect
        width={props.width}
        height={props.height}
        offsetX={offsetX}
        offsetY={offsetY}
        fill="#E4E4E7"
        cornerRadius={5}
      />
      <Text
        width={props.width}
        height={props.height}
        offsetX={offsetX}
        offsetY={offsetY}
        text={props.text}
        fontSize={14}
        fontFamily="Be Vietnam Pro, Helvetica, Arial, sans-serif"
        fill="black"
        align="center"
        verticalAlign="middle"
      />
    </Group>
  );
};
