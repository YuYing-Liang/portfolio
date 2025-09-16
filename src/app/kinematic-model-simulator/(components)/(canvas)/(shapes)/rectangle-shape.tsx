import { type FC } from "react";
import { Group, Rect } from "react-konva";
import { DimensionResizer } from "../(mouse-actions)/dimension-resizer";
import { DiagonalResizer } from "../(mouse-actions)/diagonal-resizer";
import { Rotator } from "../(mouse-actions)/rotator";
import { useLocalStorage } from "@mantine/hooks";
import { DEFAULT_SETTINGS, type SettingData } from "../../(settings)/settings";

interface RectangleShapeProps {
  x: number;
  y: number;
  width: number;
  length: number;
  rotation: number; // in degrees
  maxWidth: number;
  maxLength: number;
  editable?: boolean;
  dragBounds?: { left: number; right: number; top: number; bottom: number };
  updatePosition?: (newX: number, newY: number) => void;
  updateWidth: (newWidth: number) => void;
  updateLength: (newLength: number) => void;
  updateRotation: (newRotation: number) => void;
}

export const RectangleShape: FC<RectangleShapeProps> = (props) => {
  const isEditable = props.editable ?? true;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gridSizeDouble, _setGridSize] = useLocalStorage<SettingData["gridSize"]>({
    key: "gridSize",
    defaultValue: DEFAULT_SETTINGS.gridSize,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gridSnapping, _setGridSnapping] = useLocalStorage<SettingData["gridSnapping"]>({
    key: "gridSnapping",
    defaultValue: DEFAULT_SETTINGS.gridSnapping,
  });

  return (
    <Group
      x={props.x}
      y={props.y}
      rotation={props.rotation}
      draggable={props.dragBounds !== undefined}
      dragBoundFunc={(pos) => {
        if (!props.dragBounds) return pos;

        if (gridSnapping) {
          const gridSize = gridSizeDouble / 2;
          pos.x = Math.round((pos.x - props.x) / gridSize) * gridSize + props.x;
          pos.y = Math.round((pos.y - props.y) / gridSize) * gridSize + props.y;
        }

        const newX = Math.min(Math.max(pos.x, props.dragBounds.left), props.dragBounds.right);
        const newY = Math.min(Math.max(pos.y, props.dragBounds.top), props.dragBounds.bottom);

        if (props.updatePosition) props.updatePosition(newX, newY);
        return { x: newX, y: newY };
      }}
    >
      <Rect
        offsetX={props.width / 2}
        offsetY={props.length / 2}
        width={props.width}
        height={props.length}
        fill="skyblue"
        stroke="black"
        strokeWidth={2}
      />
      {isEditable && (
        <>
          <DimensionResizer
            x={0}
            y={0}
            dimension={props.width / 2}
            direction="x"
            markerOffset={props.length / 2 + 20}
            labelOffset={20}
            rotation={-props.rotation}
            maxDimension={props.maxWidth}
            updateDimension={(newWidth) => props.updateWidth(Number((newWidth * 2).toFixed(2)))}
          />
          <DimensionResizer
            x={0}
            y={0}
            dimension={props.length / 2}
            direction="y"
            markerOffset={props.width / 2 + 20}
            labelOffset={45}
            rotation={-props.rotation}
            maxDimension={props.maxLength}
            updateDimension={(newLength) => props.updateLength(Number((newLength * 2).toFixed(2)))}
          />
          <DiagonalResizer
            x={0}
            y={0}
            dimensionX={props.width}
            dimensionY={props.length}
            offset={20}
            maxDimensionX={props.maxWidth}
            maxDimensionY={props.maxLength}
            updateDimensions={(newWidth, newLength) => {
              props.updateWidth(Number(newWidth.toFixed(2)));
              props.updateLength(Number(newLength.toFixed(2)));
            }}
          />
          <Rotator
            absoluteX={props.x}
            absoluteY={props.y}
            dimensionX={props.width}
            dimensionY={props.length}
            offset={15}
            rotation={props.rotation}
            updateRotation={props.updateRotation}
          />
        </>
      )}
    </Group>
  );
};
