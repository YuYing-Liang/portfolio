import { Stage, Layer, Circle, Rect, Line } from "react-konva";
import { Grid } from "../(components)/(canvas)/grid";
import { useLocalStorage, useViewportSize } from "@mantine/hooks";
import { useFormikContext } from "formik";
import { type ChassisFormValues } from "../(states)/chassis-form";
import { CircleChassis } from "../(components)/(canvas)/(chassis)/circle-chassis";
import { RectangleChassis } from "../(components)/(canvas)/(chassis)/rectangle-chassis";
import { TriangleChassis } from "../(components)/(canvas)/(chassis)/triangle-chassis";
import { DEFAULT_SETTINGS, SettingData } from "../(components)/(settings)/settings";

export const ConfigurePage = () => {
  const { height, width } = useViewportSize();
  const chassisForm = useFormikContext<ChassisFormValues>();
  const [gridSize, _] = useLocalStorage<SettingData["gridSize"]>({
    key: "gridSize",
    defaultValue: DEFAULT_SETTINGS.gridSize,
  });

  const x = width / 2;
  const y = height / 2;

  return (
    <Stage width={width} height={height}>
      <Layer listening={false}>
        <Grid width={width} height={height} size={gridSize} />
      </Layer>
      <Layer>
        {chassisForm.values.type === "circular" && (
          <CircleChassis
            x={x}
            y={y}
            radius={chassisForm.values.radius}
            rotation={chassisForm.values.rotation}
            updateRadius={async (newRadius) => {
              await chassisForm.setFieldValue("radius", newRadius);
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
            updateWidth={async (newWidth) => {
              await chassisForm.setFieldValue("width", newWidth);
            }}
            updateLength={async (newLength) => {
              await chassisForm.setFieldValue("length", newLength);
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
            updateBase={async (newBase) => {
              await chassisForm.setFieldValue("base", newBase);
            }}
            updateHeight={async (newHeight) => {
              await chassisForm.setFieldValue("height", newHeight);
            }}
          />
        )}
      </Layer>
    </Stage>
  );
};
