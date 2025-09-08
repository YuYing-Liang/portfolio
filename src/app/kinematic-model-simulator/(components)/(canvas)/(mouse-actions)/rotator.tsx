import { useState, useCallback, FC, useEffect } from "react";
import { type KonvaEventObject } from "konva/lib/Node";
import { type Vector2d } from "konva/lib/types";
import { Arc, Circle, Group } from "react-konva";
import { useHover, useLocalStorage } from "@mantine/hooks";
import { getSizeBasedOnGridUnits, roundToNearestGridUnit } from "~/app/kinematic-model-simulator/helpers";
import { SettingData, DEFAULT_SETTINGS } from "../../(settings)/settings";
import { CanvasLabel } from "../canvas-label";

type ShapeConfig = {
  dimensionX: number;
  dimensionY: number;
  x: number;
  y: number;
  offset: number;
  rotation: number;
  updateDimensions: (xDimension: number, yDimension: number) => Promise<void>;
};

export const Rotator: FC<ShapeConfig> = (props) => {
  const { hovered, ref } = useHover();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [gridSize, _setGridSize] = useLocalStorage<SettingData["gridSize"]>({
    key: "gridSize",
    defaultValue: DEFAULT_SETTINGS.gridSize,
  });
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
    },
    [markerPosition, gridSize],
  );

  return (
    <Group x={markerPosition.x} y={markerPosition.y}>
      <Arc innerRadius={10} outerRadius={15} angle={135} rotation={160} fill="gray" />
      <CanvasLabel x={-50} y={-10} text={`${props.rotation}deg`} width={50} height={24} />
    </Group>
  );
};

const getMarkerPosition = (x: number, y: number, dimensionX: number, dimensionY: number, offset: number): Vector2d => {
  return {
    x: x - dimensionX / 2 - offset / 2,
    y: y - dimensionY / 2 - offset / 2,
  };
};
