import { Layer } from "react-konva";
import { useLocalStorage, useViewportSize } from "@mantine/hooks";
import { useChassisForm } from "../(states)/chassis-form";
import { CircleChassis } from "../(components)/(canvas)/(chassis)/circle-chassis";
import { RectangleChassis } from "../(components)/(canvas)/(chassis)/rectangle-chassis";
import { TriangleChassis } from "../(components)/(canvas)/(chassis)/triangle-chassis";
import { GridXYLabelled } from "../(components)/(canvas)/grid-xy-labelled";
import { DEFAULT_SETTINGS, type SettingData } from "../(components)/(settings)/settings";
import { MAX_CHASSIS_SIZE_BUFFER } from "../constants";
import { useWheelForm } from "../(states)/wheel-form";

export const ConfigurePage = () => {
  const { height, width } = useViewportSize();
  const chassisForm = useChassisForm();
  const {
    values: { id: selectedWheelId },
  } = useWheelForm();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gridSize, _setGridSize] = useLocalStorage<SettingData["gridSize"]>({
    key: "gridSize",
    defaultValue: DEFAULT_SETTINGS.gridSize,
  });

  const x = width / 2;
  const y = height / 2;
  const showOverlayGrid = selectedWheelId !== undefined && chassisForm.values.id !== undefined;

  return (
    <>
      {chassisForm.values.id !== undefined && (
        <Layer>
          {chassisForm.values.type === "circular" && (
            <CircleChassis
              x={x}
              y={y}
              radius={chassisForm.values.radius}
              rotation={chassisForm.values.rotation}
              editable={!showOverlayGrid}
              maxRadius={Math.min(width, height) / 2 - MAX_CHASSIS_SIZE_BUFFER}
              updateRadius={(newRadius) => {
                chassisForm.setFieldValue("radius", newRadius);
              }}
            />
          )}
          {chassisForm.values.type === "rectangular" && (
            <RectangleChassis
              x={x}
              y={y}
              width={chassisForm.values.width}
              length={chassisForm.values.length}
              rotation={chassisForm.values.rotation}
              editable={!showOverlayGrid}
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
              editable={!showOverlayGrid}
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
      {showOverlayGrid && <GridXYLabelled width={width} height={height} size={gridSize} />}
    </>
  );
};
