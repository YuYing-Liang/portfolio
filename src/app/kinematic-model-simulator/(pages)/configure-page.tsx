import { Layer } from "react-konva";
import { useLocalStorage, useViewportSize } from "@mantine/hooks";
import { useChassisForm } from "../(states)/chassis-form";
import { CircleChassis } from "../(components)/(canvas)/(chassis)/circle-chassis";
import { RectangleChassis } from "../(components)/(canvas)/(chassis)/rectangle-chassis";
import { TriangleChassis } from "../(components)/(canvas)/(chassis)/triangle-chassis";
import { DEFAULT_SETTINGS, type SettingData } from "../(components)/(settings)/settings";

export const ConfigurePage = () => {
  const { height, width } = useViewportSize();
  const chassisForm = useChassisForm();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gridSize, _setGridSize] = useLocalStorage<SettingData["gridSize"]>({
    key: "gridSize",
    defaultValue: DEFAULT_SETTINGS.gridSize,
  });

  const x = width / 2;
  const y = height / 2;

  return (
    <Layer>
      {chassisForm.values.type === "circular" && (
        <CircleChassis
          x={x}
          y={y}
          radius={chassisForm.values.radius}
          rotation={chassisForm.values.rotation}
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
  );
};
