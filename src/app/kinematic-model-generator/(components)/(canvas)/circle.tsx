import { useHover } from "@mantine/hooks";
import { useEffect, useState, type FC } from "react";
import { Circle, Line } from "react-konva";
import { calculateMarkerPositions, useDimensionResizer } from "../../(hooks)/shape-resizer";

interface CircleChassisProps {
  x: number;
  y: number;
  radius: number;
  rotation: number; // in degrees
  markerSize: number;
}

export const CircleChassis: FC<CircleChassisProps> = (props) => {
  const { hovered: isRightTabHovered, ref: rightTab } = useHover();
  const { hovered: isLeftTabHovered, ref: leftTab } = useHover();

  const { shape, setShape, handleDragMove } = useDimensionResizer({
    x: props.x,
    y: props.y,
    dimension: props.radius,
    direction: "x",
  });

  useEffect(() => {
    setShape(() => ({
      ...calculateMarkerPositions({ x: props.x, y: props.y, dimension: props.radius, direction: "x" }),
      isDragging: false,
    }));
  }, [props.radius]);

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
      <Line
        points={[-shape.dimension, 0, shape.dimension, 0]}
        x={props.x}
        y={props.y - props.radius * 1.5}
        stroke={isRightTabHovered || isLeftTabHovered || shape.isDragging ? "black" : "gray"}
        strokeWidth={2}
      />
      <Circle
        x={shape.marker1.x}
        y={shape.marker1.y}
        fill={isRightTabHovered || isLeftTabHovered || shape.isDragging ? "black" : "gray"}
        radius={5}
        ref={rightTab}
        draggable
        onDragMove={(e) => handleDragMove("marker1", e)}
        onDragEnd={() => setShape((prev) => ({ ...prev, isDragging: false }))}
      />
      <Circle
        x={shape.marker2.x}
        y={shape.marker2.y}
        fill={isRightTabHovered || isLeftTabHovered || shape.isDragging ? "black" : "gray"}
        radius={5}
        ref={leftTab}
        draggable
        onDragMove={(e) => handleDragMove("marker2", e)}
        onDragEnd={() => setShape((prev) => ({ ...prev, isDragging: false }))}
      />
    </>
  );
};
