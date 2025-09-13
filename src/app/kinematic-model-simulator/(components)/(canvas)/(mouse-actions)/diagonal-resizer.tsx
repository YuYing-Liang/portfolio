import { useState, useCallback, type FC, useEffect } from "react";
import { type KonvaEventObject } from "konva/lib/Node";
import { type Vector2d } from "konva/lib/types";
import { Circle } from "react-konva";
import { useHover, useLocalStorage } from "@mantine/hooks";
import { getSizeBasedOnGridUnits, roundToNearestGridUnit } from "~/app/kinematic-model-simulator/helpers";
import { type SettingData, DEFAULT_SETTINGS } from "../../(settings)/settings";

type ShapeConfig = {
  dimensionX: number;
  dimensionY: number;
  x: number;
  y: number;
  offset: number;
  updateDimensions: (xDimension: number, yDimension: number) => Promise<void>;
};

export const DiagonalResizer: FC<ShapeConfig> = (props) => {
  const { hovered, ref } = useHover();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gridSize, _setGridSize] = useLocalStorage<SettingData["gridSize"]>({
    key: "gridSize",
    defaultValue: DEFAULT_SETTINGS.gridSize,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gridSnapping, _setGridSnapping] = useLocalStorage<SettingData["gridSnapping"]>({
    key: "gridSnapping",
    defaultValue: DEFAULT_SETTINGS.gridSnapping,
  });

  const markerPosition: Vector2d = getMarkerPosition(
    props.x,
    props.y,
    props.dimensionX,
    props.dimensionY,
    props.offset,
  );
  const isHoverOrDragging = hovered || isDragging;

  useEffect(
    function updateCursorOnHoverOrDrag() {
      if (isHoverOrDragging) {
        document.body.style.cursor = "nwse-resize";
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
      let position = e.target.position();

      if (gridSnapping) {
        position = {
          x: roundToNearestGridUnit(position.x, gridSize),
          y: roundToNearestGridUnit(position.y, gridSize),
        };
        e.target.setPosition(position);
      }

      let newDimensionX = props.dimensionX + (position.x - markerPosition.x);
      let newDimensionY = props.dimensionY + (position.y - markerPosition.y);

      if (gridSnapping) {
        newDimensionX = roundToNearestGridUnit(newDimensionX, gridSize);
        newDimensionY = roundToNearestGridUnit(newDimensionY, gridSize);
      }

      if (
        getSizeBasedOnGridUnits(newDimensionX, gridSize) < 1 ||
        getSizeBasedOnGridUnits(newDimensionY, gridSize) < 1
      ) {
        e.target.setPosition(markerPosition);
        return;
      }

      await props.updateDimensions(newDimensionX, newDimensionY);
      e.target.setPosition({
        x: props.x + newDimensionX / 2 + props.offset,
        y: props.y + newDimensionY / 2 + props.offset,
      });
    },
    [gridSnapping, props, markerPosition, gridSize],
  );

  return (
    <Circle
      x={markerPosition.x}
      y={markerPosition.y}
      fill={isHoverOrDragging ? "black" : "gray"}
      radius={5}
      ref={ref}
      draggable
      onDragMove={handleDragMove}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    />
  );
};

const getMarkerPosition = (x: number, y: number, dimensionX: number, dimensionY: number, offset: number): Vector2d => {
  return {
    x: x + dimensionX / 2 + offset,
    y: y + dimensionY / 2 + offset,
  };
};
