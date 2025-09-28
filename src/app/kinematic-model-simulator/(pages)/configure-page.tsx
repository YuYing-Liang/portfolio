import { Layer } from "react-konva";
import { useViewportSize } from "@mantine/hooks";
import { useChassisForm } from "../(states)/chassis-form";
import { CircleChassis } from "../(components)/(canvas)/(shapes)/circle-chassis";
import { RectangleShape } from "../(components)/(canvas)/(shapes)/rectangle-shape";
import { TriangleChassis } from "../(components)/(canvas)/(shapes)/triangle-chassis";
import { GridXYLabelled } from "../(components)/(canvas)/grid-xy-labelled";
import { MAX_CHASSIS_SIZE_BUFFER } from "../constants";
import { useWheelForm } from "../(states)/wheel-form";
import { useLiveQuery } from "dexie-react-hooks";
import { type Wheel } from "../(database)/tables";
import { getWheelsByChassisId } from "../(database)/queries";
import { WheelList } from "../(components)/(canvas)/(shapes)/wheel-list";

export const ConfigurePage = () => {
  const { height, width } = useViewportSize();
  const chassisForm = useChassisForm();
  const wheelForm = useWheelForm();
  const wheels: Wheel[] =
    useLiveQuery(
      () => (chassisForm.values.id !== undefined ? getWheelsByChassisId(chassisForm.values.id) : new Promise(() => [])),
      [chassisForm.values.id],
    ) ?? [];

  const x = width / 2;
  const y = height / 2;
  const editingChassis = chassisForm.values.id !== undefined;
  const editingWheel = wheelForm.values.id !== undefined && editingChassis;

  return editingChassis ? (
    <Layer>
      {chassisForm.values.type === "circular" && (
        <CircleChassis
          x={x}
          y={y}
          radius={chassisForm.values.radius}
          rotation={chassisForm.values.rotation}
          editable={!editingWheel}
          maxRadius={Math.min(width, height) - MAX_CHASSIS_SIZE_BUFFER}
          updateRadius={(newRadius) => {
            chassisForm.setFieldValue("radius", newRadius);
          }}
        >
          <WheelList
            x={x}
            y={y}
            wheels={wheels}
            wheelForm={wheelForm}
            chassisXSize={chassisForm.values.radius * 2}
            chassisYSize={chassisForm.values.radius * 2}
            isEditingWheel={editingWheel}
          />
        </CircleChassis>
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
        >
          <WheelList
            x={x}
            y={y}
            wheels={wheels}
            wheelForm={wheelForm}
            chassisXSize={chassisForm.values.width}
            chassisYSize={chassisForm.values.length}
            isEditingWheel={editingWheel}
          />
        </RectangleShape>
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
        >
          <WheelList
            x={x}
            y={y}
            wheels={wheels}
            wheelForm={wheelForm}
            chassisXSize={chassisForm.values.base}
            chassisYSize={chassisForm.values.height}
            isEditingWheel={editingWheel}
          />
        </TriangleChassis>
      )}
    </Layer>
  ) : null;
};
