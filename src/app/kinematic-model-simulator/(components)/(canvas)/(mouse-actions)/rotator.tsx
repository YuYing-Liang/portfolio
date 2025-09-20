import { useState, useCallback, type FC, useEffect } from "react";
import { type KonvaEventObject } from "konva/lib/Node";
import { type Vector2d } from "konva/lib/types";
import { Arc } from "react-konva";
import { useHover } from "@mantine/hooks";

const ROTATOR_RADIUS = 18;

type ShapeConfig = {
  dimensionX: number;
  dimensionY: number;
  absoluteX: number;
  absoluteY: number;
  offset: number;
  rotation: number;
  updateRotation: (rotation: number) => void;
};

export const Rotator: FC<ShapeConfig> = (props) => {
  const { hovered, ref } = useHover();
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const markerPosition: Vector2d = getMarkerPosition(props.absoluteX, props.absoluteY, props.dimensionY, props.offset);
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
      const position = e.target.position();
      const positionRelativeToCenter = getMarkerPosition(position.x, position.y, props.dimensionY, props.offset);
      const theta =
        Math.atan2(positionRelativeToCenter.y - props.absoluteY, positionRelativeToCenter.x - props.absoluteX) +
        Math.PI / 2;
      const thetaDeg = Math.round((theta * 180) / Math.PI);
      const thetaRadRounded = (thetaDeg * Math.PI) / 180;
      const markerPositionRotated = {
        x: props.absoluteX + (props.dimensionY / 2 + props.offset / 2) * Math.sin(thetaRadRounded),
        y: props.absoluteY - (props.dimensionY / 2 + props.offset / 2) * Math.cos(thetaRadRounded),
      };

      e.target.setPosition(markerPositionRotated);
      e.target.rotation(thetaDeg - 145);
      setIsDragging(true);
      props.updateRotation(thetaDeg);
    },
    [props],
  );

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <Arc
      ref={ref}
      x={markerPosition.x}
      y={markerPosition.y}
      innerRadius={ROTATOR_RADIUS - 5}
      outerRadius={ROTATOR_RADIUS}
      angle={110}
      rotation={-145}
      fill={isHoverOrDragging ? "black" : "gray"}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      draggable
    />
  );
};

const getMarkerPosition = (x: number, y: number, dimensionY: number, offset: number): Vector2d => {
  return {
    x,
    y: y - dimensionY / 2 - offset / 2,
  };
};
