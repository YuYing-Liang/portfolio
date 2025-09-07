import { useState, useCallback, FC, useEffect } from "react";
import { type KonvaEventObject } from "konva/lib/Node";
import { type Vector2d } from "konva/lib/types";
import { Circle, Line } from "react-konva";
import { useHover, useLocalStorage } from "@mantine/hooks";
import { CanvasLabel } from "../canvas-label";
import { getSizeBasedOnGridUnits, roundToNearestGridUnit } from "~/app/kinematic-model-simulator/helpers";
import { DEFAULT_SETTINGS, SettingData } from "../../(settings)/settings";

type ShapeConfig = {
  dimension: number;
  x: number;
  y: number;
  direction: "x" | "y";
  markerOffset: number;
  labelOffset: number;
  rotation: number;
  updateDimension: (newDimension: number) => Promise<void>;
};

export const DimensionResizer: FC<ShapeConfig> = (props) => {
  const { hovered: isRightTabHovered, ref: rightTab } = useHover();
  const { hovered: isLeftTabHovered, ref: leftTab } = useHover();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [gridSizeDouble, _setGridSize] = useLocalStorage<SettingData["gridSize"]>({
    key: "gridSize",
    defaultValue: DEFAULT_SETTINGS.gridSize,
  });
  const [gridSnapping, _setGridSnapping] = useLocalStorage<SettingData["gridSnapping"]>({
    key: "gridSnapping",
    defaultValue: DEFAULT_SETTINGS.gridSnapping,
  });

  const gridSize = gridSizeDouble / 2;

  const marker1Position: Vector2d = getMarkerPosition(
    "marker1",
    props.direction,
    props.x,
    props.y,
    props.markerOffset,
    props.dimension,
  );
  const marker2Position: Vector2d = getMarkerPosition(
    "marker2",
    props.direction,
    props.x,
    props.y,
    props.markerOffset,
    props.dimension,
  );

  const isHoverOrDragging = isRightTabHovered || isLeftTabHovered || isDragging;

  useEffect(
    function updateCursorOnHoverOrDrag() {
      if (isHoverOrDragging) {
        document.body.style.cursor = props.direction === "x" ? "ew-resize" : "ns-resize";
      } else {
        document.body.style.cursor = "default";
      }

      return () => {
        document.body.style.cursor = "default";
      };
    },
    [isHoverOrDragging, props.direction],
  );

  const handleDragMove = useCallback(
    async (marker: "marker1" | "marker2", e: KonvaEventObject<DragEvent>) => {
      const position = e.target.position();
      const markerCoefficient: number = marker === "marker1" ? -1 : 1;
      let markerPosition: Vector2d = getMarkerPosition(
        marker,
        props.direction,
        props.x,
        props.y,
        props.markerOffset,
        props.dimension,
      );
      let constrainedPosition: Vector2d = setPosition(markerPosition, position, props.direction);
      let currentDimension = props.dimension;

      if (gridSnapping) {
        constrainedPosition[props.direction] = roundToNearestGridUnit(constrainedPosition[props.direction], gridSize);
        markerPosition[props.direction] = roundToNearestGridUnit(markerPosition[props.direction], gridSize);
        currentDimension = roundToNearestGridUnit(currentDimension, gridSize);
      }

      const dragDelta: number =
        (constrainedPosition[props.direction] - markerPosition[props.direction]) * markerCoefficient;
      const newDimension: number = currentDimension + dragDelta;

      if (getSizeBasedOnGridUnits(newDimension, gridSize) < 1) {
        e.target.setPosition(markerPosition);
        return;
      }

      setIsDragging(true);
      e.target.setPosition(constrainedPosition);
      await props.updateDimension(newDimension);
    },
    [props.x, props.y, props.dimension, props.direction, props.markerOffset, gridSize],
  );

  const handleDragEnd = async () => {
    setIsDragging(false);
  };

  return (
    <>
      <CanvasLabel
        {...getResizerLinePosition(props.direction, props.x, props.y, props.markerOffset + props.labelOffset)}
        width={70}
        height={20}
        rotation={props.rotation}
        text={isNaN(props.dimension) ? "N/A" : `${getSizeBasedOnGridUnits(props.dimension * 2, gridSizeDouble)}`}
      />
      <Line
        {...getResizerLinePosition(props.direction, props.x, props.y, props.markerOffset)}
        points={getResizerLinePoints(props.direction, props.dimension)}
        stroke={isHoverOrDragging ? "black" : "gray"}
        strokeWidth={2}
      />
      <Circle
        x={marker1Position.x}
        y={marker1Position.y}
        fill={isHoverOrDragging ? "black" : "gray"}
        radius={5}
        ref={rightTab}
        draggable
        onDragMove={(e) => handleDragMove("marker1", e)}
        onDragEnd={handleDragEnd}
      />
      <Circle
        x={marker2Position.x}
        y={marker2Position.y}
        fill={isHoverOrDragging ? "black" : "gray"}
        radius={5}
        ref={leftTab}
        draggable
        onDragMove={(e) => handleDragMove("marker2", e)}
        onDragEnd={handleDragEnd}
      />
    </>
  );
};

const setPosition = (originalPosition: Vector2d, newPosition: Vector2d, direction: ShapeConfig["direction"]) => {
  return direction === "x"
    ? {
        x: newPosition.x,
        y: originalPosition.y,
      }
    : {
        x: originalPosition.x,
        y: newPosition.y,
      };
};

const getMarkerPosition = (
  marker: "marker1" | "marker2",
  direction: "x" | "y",
  x: number,
  y: number,
  offset: number,
  dimension: number,
): Vector2d => {
  const markerOffsetCoefficient = marker === "marker1" ? -1 : 1;
  return {
    x: x + (direction === "x" ? dimension * markerOffsetCoefficient : offset),
    y: y + (direction === "y" ? dimension * markerOffsetCoefficient : offset),
  };
};

const getResizerLinePoints = (direction: "x" | "y", dimension: number) => {
  return direction === "x" ? [-dimension, 0, dimension, 0] : [0, -dimension, 0, dimension];
};

const getResizerLinePosition = (direction: "x" | "y", x: number, y: number, offset: number) => ({
  x: direction === "x" ? x : x + offset,
  y: direction === "x" ? y + offset : y,
});
