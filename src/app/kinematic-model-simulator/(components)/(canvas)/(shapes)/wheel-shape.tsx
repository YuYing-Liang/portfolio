import { Arrow, Group, type KonvaNodeEvents } from "react-konva";
import { RectangleShape, type RectangleShapeProps } from "./rectangle-shape";
import { type FC } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { DEFAULT_SETTINGS, type SettingData } from "../../(settings)/settings";
import type Konva from "konva";
import { MAX_WHEEL_SIZE_BUFFER } from "~/app/kinematic-model-simulator/constants";

interface WheelShapeProps {
  x: number;
  y: number;
  editable: boolean;
  width: number;
  length: number;
  rotation: number;
  maxWheelDimension: number;
  rollerRotation?: number;
  onDrag: Konva.NodeConfig["dragBoundFunc"];
  updateWidth: RectangleShapeProps["updateWidth"];
  updateLength: RectangleShapeProps["updateLength"];
  updateRotation: RectangleShapeProps["updateRotation"];
  onClick: KonvaNodeEvents["onClick"];
}

export const WheelShape: FC<WheelShapeProps> = (props) => (
  <Group
    x={props.x}
    y={props.y}
    draggable={props.editable}
    dragBoundFunc={props.onDrag}
    opacity={props.editable ? 1.0 : 0.5}
    onClick={props.onClick}
  >
    <Arrow
      points={[0, -props.length / 2 - 5, 0, -props.length / 2 - 15]}
      rotation={props.rotation}
      pointerLength={10}
      pointerWidth={props.width}
      fill="black"
    />
    <RectangleShape
      x={0}
      y={0}
      fill="lightgray"
      editable={props.editable}
      width={props.width}
      length={props.length}
      rotation={props.rotation}
      maxLength={props.maxWheelDimension - MAX_WHEEL_SIZE_BUFFER}
      maxWidth={props.maxWheelDimension - MAX_WHEEL_SIZE_BUFFER}
      updateWidth={props.updateWidth}
      updateLength={props.updateLength}
      updateRotation={props.updateRotation}
    >
      {props.rollerRotation !== undefined && (
        <RectangleShape
          x={0}
          y={0}
          fill="gray"
          width={Math.min(props.width, props.length) * 0.75}
          length={Math.min(props.width, props.length) * 0.25}
          rotation={props.rollerRotation}
          maxLength={props.length}
          maxWidth={props.width}
          editable={false}
        />
      )}
    </RectangleShape>
  </Group>
);
