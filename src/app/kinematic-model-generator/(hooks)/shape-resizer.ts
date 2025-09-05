import { useState, useCallback } from "react";
import { type KonvaEventObject } from "konva/lib/Node";

type ResizerConfig = {
  marker1: { x: number; y: number };
  marker2: { x: number; y: number };
  isDragging: boolean;
  dimension: number;
};

type ShapeConfig = { dimension: number; x: number; y: number; direction: "x" | "y" };

export const useDimensionResizer = (shapeToResize: ShapeConfig) => {
  const [resizer, setResizer] = useState<ResizerConfig>({
    ...calculateMarkerPositions(shapeToResize),
    isDragging: false,
  });

  // Update width/height when dragging corner handles
  const handleDragMove = useCallback(
    (marker: "marker1" | "marker2", e: KonvaEventObject<DragEvent>) => {
      const position = e.target.position();
      const constrainedPosition = { x: position.x, y: resizer[marker].y };

      if (shapeToResize.direction === "x") {
        e.target.setPosition(constrainedPosition);
      }

      const notSelectedMarker = marker === "marker1" ? "marker2" : "marker1";

      setResizer((prev) => {
        const newDimension =
          prev.dimension + (position[shapeToResize.direction] - prev[marker][shapeToResize.direction]);
        return {
          ...prev,
          isDragging: true,
          [marker]: constrainedPosition,
          [notSelectedMarker]: { x: shapeToResize.x - newDimension, y: prev[notSelectedMarker].y },
          dimension: newDimension,
        };
      });
    },
    [resizer.marker1, resizer.marker2],
  );

  return { shape: resizer, setShape: setResizer, handleDragMove };
};

export const calculateMarkerPositions = (shapeConfig: ShapeConfig) => ({
  marker1: {
    x: shapeConfig.direction === "x" ? shapeConfig.x - shapeConfig.dimension : shapeConfig.x,
    y:
      shapeConfig.direction === "y"
        ? shapeConfig.y - shapeConfig.dimension
        : shapeConfig.y - shapeConfig.dimension * 1.5,
  },
  marker2: {
    x: shapeConfig.direction === "x" ? shapeConfig.x + shapeConfig.dimension : shapeConfig.x,
    y:
      shapeConfig.direction === "y"
        ? shapeConfig.y + shapeConfig.dimension
        : shapeConfig.y - shapeConfig.dimension * 1.5,
  },
  dimension: shapeConfig.dimension,
});
