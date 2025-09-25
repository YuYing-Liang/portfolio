import { type FC } from "react";
import { type Wheel } from "~/app/kinematic-model-simulator/(database)/tables";
import { type WheelFormStore } from "~/app/kinematic-model-simulator/(states)/wheel-form";
import { WheelShape } from "./wheel-shape";
import { getRotationFromMatrix, radiansToDegrees, roundNumber } from "~/app/kinematic-model-simulator/helpers";
import { useLocalStorage, useViewportSize } from "@mantine/hooks";
import { DEFAULT_SETTINGS, type SettingData } from "../../(settings)/settings";
import { GridXYLabelled } from "../grid-xy-labelled";

interface WheelListProps {
  x: number;
  y: number;
  wheels: Wheel[];
  wheelForm: WheelFormStore;
  isEditingWheel: boolean;
  chassisXSize: number;
  chassisYSize: number;
}

export const WheelList: FC<WheelListProps> = (props) => {
  const { height, width } = useViewportSize();
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

  const maxWheelDimensionSize = Math.min(props.chassisXSize, props.chassisYSize);

  const handleEditWheel = (wheel: Wheel) => () => {
    props.wheelForm.setInitialValues(wheel);
  };

  return (
    <>
      {props.isEditingWheel && <GridXYLabelled width={width} height={height} size={gridSize} />}
      {props.wheels.map((wheel) => {
        const isWheelEditable = props.isEditingWheel && props.wheelForm.values.id === wheel.id;
        const x = isWheelEditable ? props.wheelForm.values.x : wheel.frame[2];
        const y = isWheelEditable ? props.wheelForm.values.y : wheel.frame[5];

        return (
          <WheelShape
            key={wheel.id}
            x={x}
            y={y}
            editable={isWheelEditable}
            width={isWheelEditable ? props.wheelForm.values.width : wheel.width}
            length={isWheelEditable ? props.wheelForm.values.length : wheel.length}
            rotation={
              isWheelEditable
                ? props.wheelForm.values.rotation
                : roundNumber(radiansToDegrees(getRotationFromMatrix(wheel.frame)))
            }
            rollerRotation={
              isWheelEditable
                ? props.wheelForm.values.rollerRotation
                : wheel.roller !== undefined
                  ? roundNumber(radiansToDegrees(getRotationFromMatrix(wheel.roller)))
                  : undefined
            }
            maxWheelDimension={maxWheelDimensionSize}
            onDrag={(pos) => {
              pos.x -= props.x;
              pos.y -= props.y;

              if (gridSnapping) {
                pos.x = Math.round(pos.x / (gridSize / 2)) * (gridSize / 2);
                pos.y = Math.round(pos.y / (gridSize / 2)) * (gridSize / 2);
              }

              pos.x = Math.min(Math.max(pos.x, -props.chassisXSize / 2), props.chassisXSize / 2);
              pos.y = Math.min(Math.max(pos.y, -props.chassisYSize / 2), props.chassisYSize / 2);

              props.wheelForm.setFieldValue("x", pos.x);
              props.wheelForm.setFieldValue("y", pos.y);
              return { x: pos.x + props.x, y: pos.y + props.y };
            }}
            updateWidth={(newWidth) => {
              props.wheelForm.setFieldValue("width", newWidth);
            }}
            updateLength={(newLength) => {
              props.wheelForm.setFieldValue("length", newLength);
            }}
            updateRotation={(newRotation) => {
              props.wheelForm.setFieldValue("rotation", newRotation);
            }}
            onClick={handleEditWheel(wheel)}
          />
        );
      })}
    </>
  );
};
