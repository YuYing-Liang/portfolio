import { useState, useCallback, type FC, useEffect, useMemo } from "react";
import { type KonvaEventObject } from "konva/lib/Node";
import { type Vector2d } from "konva/lib/types";
import { Arc, Group } from "react-konva";
import { useHover } from "@mantine/hooks";
import { CanvasLabel } from "../canvas-label";

const ROTATOR_RADIUS = 18;

type ShapeConfig = {
  dimensionX: number;
  dimensionY: number;
  absoluteX: number;
  absoluteY: number;
  offset: number;
  rotation: number;
  updateRotation: (rotation: number) => Promise<void>;
};

export const Rotator: FC<ShapeConfig> = (props) => {
  const { hovered, ref } = useHover();
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const markerPosition: Vector2d = getMarkerPosition(0, 0, props.dimensionX, props.dimensionY, props.offset);
  const isHoverOrDragging = hovered || isDragging;

  useEffect(
    function updateCursorOnHoverOrDrag() {
      if (isHoverOrDragging) {
        document.body.style.cursor = "crosshair";
      } else {
        document.body.style.cursor = "default";
      }

      return () => {
        document.body.style.cursor = "default";
      };
    },
    [isHoverOrDragging],
  );

  const handleDragMove = useCallback(
    async (e: KonvaEventObject<DragEvent>) => {
      const position = e.target.absolutePosition();
      const positionRelativeToCenter = getMarkerPosition(
        position.x,
        position.y,
        props.dimensionX,
        props.dimensionY,
        props.offset,
      );
      const startingAngle = Math.atan2(markerPosition.y, markerPosition.x);
      const theta = Math.atan2(
        positionRelativeToCenter.y - props.absoluteY,
        positionRelativeToCenter.x - props.absoluteX,
      );
      const thetaDeg = Math.round(((theta - startingAngle) * 180) / Math.PI / 5) * 5;

      const markerPositionRotated = {
        x: (Math.abs(markerPosition.x) + ROTATOR_RADIUS * 2) * Math.cos(theta) + props.absoluteX,
        y: (Math.abs(markerPosition.y) + ROTATOR_RADIUS * 2) * Math.sin(theta) + props.absoluteY,
      };

      e.target.setAbsolutePosition(markerPositionRotated);
      setIsDragging(true);
      await props.updateRotation(thetaDeg);
    },
    [markerPosition, props],
  );

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <Group x={markerPosition.x} y={markerPosition.y}>
      <Arc
        ref={ref}
        innerRadius={ROTATOR_RADIUS - 5}
        outerRadius={ROTATOR_RADIUS}
        angle={110}
        rotation={170}
        fill={isHoverOrDragging ? "black" : "gray"}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        draggable
      />
      <CanvasLabel x={-70} y={-10} text={`${props.rotation}deg`} width={75} height={24} rotation={-props.rotation} />
    </Group>
  );
};

const getMarkerPosition = (x: number, y: number, dimensionX: number, dimensionY: number, offset: number): Vector2d => {
  return {
    x: x - dimensionX / 2 - offset / 2,
    y: y - dimensionY / 2 - offset / 2,
  };
};
