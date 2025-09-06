import { Stage, Layer, Circle, Rect, Line } from "react-konva";
import { Grid } from "../(components)/(canvas)/grid";
import { useViewportSize } from "@mantine/hooks";
import { useFormikContext } from "formik";
import { type ChassisFormValues } from "../(states)/chassis-form";
import { CircleChassis } from "../(components)/(canvas)/circle-chassis";
import { RectangleChassis } from "../(components)/(canvas)/rectangle-chassis";

export const ConfigurePage = () => {
  const { height, width } = useViewportSize();
  const chassisForm = useFormikContext<ChassisFormValues>();

  const x = width / 2;
  const y = height / 2;

  return (
    <Stage width={width} height={height}>
      <Layer listening={false}>
        <Grid width={width} height={height} size={25} />
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
          <Line
            points={[
              0,
              chassisForm.values.height,
              chassisForm.values.base,
              chassisForm.values.height,
              chassisForm.values.base / 2,
              0,
            ]}
            x={x}
            y={y}
            offsetX={chassisForm.values.base / 2}
            offsetY={chassisForm.values.height / 2}
            rotation={chassisForm.values.rotation}
            closed
            fill="skyblue"
            stroke="black"
            strokeWidth={2}
          />
        )}
      </Layer>
    </Stage>
  );
};
