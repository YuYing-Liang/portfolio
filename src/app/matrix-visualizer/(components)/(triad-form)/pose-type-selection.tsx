import { SegmentedControl, Select, Group } from "@mantine/core";
import { type EulerAngleOrders, type TriadPoseDisplayType } from "../../types";
import { type FC } from "react";

interface PoseTypeSelectionProps {
  poseType: TriadPoseDisplayType;
  angleOrder: EulerAngleOrders;
  setPoseType: (newPoseType: TriadPoseDisplayType) => void;
  setAngleOrder: (newAngleOrder: EulerAngleOrders) => void;
}

export const PoseTypeSelection: FC<PoseTypeSelectionProps> = (props) => {
  return (
    <Group gap="5px">
      <SegmentedControl
        size="xs"
        data={["euler", "matrix"]}
        onChange={(value) => (value === "euler" || value === "matrix" ? props.setPoseType(value) : {})}
        value={props.poseType}
      />
      <Select
        size="xs"
        w="75px"
        data={["XYZ", "ZYZ"]}
        onChange={(value) => {
          if (value == null) return;
          if (value === "XYZ" || value === "ZYZ") props.setAngleOrder(value);
        }}
        value={props.angleOrder}
      />
    </Group>
  );
};
