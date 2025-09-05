import { Stage, Layer, Circle, Rect, Line } from "react-konva";
import { Grid } from "../(components)/(canvas)/grid";
import { useViewportSize } from "@mantine/hooks";
import { useFormikContext } from "formik";
import { type ChassisFormValues } from "../(states)/chassis-form";
import { CircleChassis } from "../(components)/(canvas)/circle";

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
            markerSize={5}
          />
        )}
        {chassisForm.values.type === "rectangular" && (
          <Rect
            offsetX={chassisForm.values.width / 2}
            offsetY={chassisForm.values.length / 2}
            x={x}
            y={y}
            rotation={chassisForm.values.rotation}
            width={chassisForm.values.width}
            height={chassisForm.values.length}
            fill="skyblue"
            stroke="black"
            strokeWidth={2}
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
