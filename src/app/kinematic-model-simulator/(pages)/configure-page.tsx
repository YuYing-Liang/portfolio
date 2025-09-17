import { Group, Layer } from "react-konva";
import { useLocalStorage, useViewportSize } from "@mantine/hooks";
import { useChassisForm } from "../(states)/chassis-form";
import { CircleChassis } from "../(components)/(canvas)/(shapes)/circle-chassis";
import { RectangleShape } from "../(components)/(canvas)/(shapes)/rectangle-shape";
import { TriangleChassis } from "../(components)/(canvas)/(shapes)/triangle-chassis";
import { GridXYLabelled } from "../(components)/(canvas)/grid-xy-labelled";
import { DEFAULT_SETTINGS, type SettingData } from "../(components)/(settings)/settings";
import { MAX_CHASSIS_SIZE_BUFFER, MAX_WHEEL_SIZE_BUFFER, NUM_ROLLERS, ROLLER_SIZE_BUFFER } from "../constants";
import { useWheelForm } from "../(states)/wheel-form";
import { useMemo } from "react";

export const ConfigurePage = () => {
  const { height, width } = useViewportSize();
  const chassisForm = useChassisForm();
  const wheelForm = useWheelForm();
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

  const x = width / 2;
  const y = height / 2;
  const editingChassis = chassisForm.values.id !== undefined;
  const editingWheel = wheelForm.values.id !== undefined && editingChassis;

  const maxWheelDimensionSize = useMemo(() => {
    if (chassisForm.values.type === "rectangular") {
      return Math.min(chassisForm.values.length, chassisForm.values.width);
    }
    if (chassisForm.values.type === "triangular") {
      return Math.min(chassisForm.values.base, chassisForm.values.height);
    }
    return chassisForm.values.radius * 2;
  }, [chassisForm.values]);

  return (
    <>
      {editingChassis && (
        <Layer listening={!editingWheel}>
          {chassisForm.values.type === "circular" && (
            <CircleChassis
              x={x}
              y={y}
              radius={chassisForm.values.radius}
              rotation={chassisForm.values.rotation}
              editable={!editingWheel}
              maxRadius={Math.min(width, height) / 2 - MAX_CHASSIS_SIZE_BUFFER}
              updateRadius={(newRadius) => {
                chassisForm.setFieldValue("radius", newRadius);
              }}
            />
          )}
          {chassisForm.values.type === "rectangular" && (
            <RectangleShape
              x={x}
              y={y}
              width={chassisForm.values.width}
              length={chassisForm.values.length}
              rotation={chassisForm.values.rotation}
              editable={!editingWheel}
              maxLength={height - MAX_CHASSIS_SIZE_BUFFER}
              maxWidth={width - MAX_CHASSIS_SIZE_BUFFER}
              updateWidth={(newWidth) => {
                chassisForm.setFieldValue("width", newWidth);
              }}
              updateLength={(newLength) => {
                chassisForm.setFieldValue("length", newLength);
              }}
              updateRotation={(newRotation) => {
                chassisForm.setFieldValue("rotation", newRotation);
              }}
            />
          )}
          {chassisForm.values.type === "triangular" && (
            <TriangleChassis
              x={x}
              y={y}
              base={chassisForm.values.base}
              height={chassisForm.values.height}
              rotation={chassisForm.values.rotation}
              editable={!editingWheel}
              maxBase={width - MAX_CHASSIS_SIZE_BUFFER}
              maxHeight={height - MAX_CHASSIS_SIZE_BUFFER}
              updateBase={(newBase) => {
                chassisForm.setFieldValue("base", newBase);
              }}
              updateHeight={(newHeight) => {
                chassisForm.setFieldValue("height", newHeight);
              }}
              updateRotation={(newRotation) => {
                chassisForm.setFieldValue("rotation", newRotation);
              }}
            />
          )}
        </Layer>
      )}
      {editingWheel && <GridXYLabelled width={width} height={height} size={gridSize} />}
      {editingWheel && (
        <Layer>
          <Group
            x={x}
            y={y}
            draggable
            dragBoundFunc={(pos) => {
              if (gridSnapping) {
                pos.x = Math.round((pos.x - x) / gridSize) * gridSize + x;
                pos.y = Math.round((pos.y - y) / gridSize) * gridSize + y;
              }

              const newX = Math.min(Math.max(pos.x, x - maxWheelDimensionSize / 2), x + maxWheelDimensionSize / 2);
              const newY = Math.min(Math.max(pos.y, y - maxWheelDimensionSize / 2), y + maxWheelDimensionSize / 2);

              wheelForm.setFieldValue("x", newX);
              wheelForm.setFieldValue("y", newY);
              return { x: newX, y: newY };
            }}
          >
            <RectangleShape
              x={0}
              y={0}
              width={wheelForm.values.width}
              length={wheelForm.values.length}
              rotation={wheelForm.values.rotation}
              maxLength={maxWheelDimensionSize - MAX_WHEEL_SIZE_BUFFER}
              maxWidth={maxWheelDimensionSize - MAX_WHEEL_SIZE_BUFFER}
              updateWidth={(newWidth) => {
                wheelForm.setFieldValue("width", newWidth);
              }}
              updateLength={(newLength) => {
                wheelForm.setFieldValue("length", newLength);
              }}
              updateRotation={(newRotation) => {
                wheelForm.setFieldValue("rotation", newRotation);
              }}
            />
            {wheelForm.values.rollerRotation !== undefined &&
              Array(NUM_ROLLERS)
                .fill(0)
                .map((_, index) => (
                  <RectangleShape
                    key={index}
                    x={0}
                    y={((index - (NUM_ROLLERS - 1) / 2) * (wheelForm.values.length - ROLLER_SIZE_BUFFER)) / NUM_ROLLERS}
                    width={wheelForm.values.width - ROLLER_SIZE_BUFFER * 1.5}
                    length={(wheelForm.values.length - ROLLER_SIZE_BUFFER * 4) / NUM_ROLLERS}
                    rotation={wheelForm.values.rollerRotation!}
                    maxLength={wheelForm.values.length}
                    maxWidth={wheelForm.values.width}
                    editable={false}
                  />
                ))}
          </Group>
        </Layer>
      )}
    </>
  );
};
