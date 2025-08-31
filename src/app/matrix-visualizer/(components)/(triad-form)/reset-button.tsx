import { ActionIcon } from "@mantine/core";
import { type FC } from "react";
import { type Matrix4Tuple } from "three";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { type EulerAngleOrders, type TriadPose } from "../../types";
import { convertEulerPoseToMatrix } from "../../helpers";

interface ResetButtonProps {
  angleOrder: EulerAngleOrders;
  initialPose: TriadPose;
  setMatrix: (matrix: Matrix4Tuple) => void;
  setPose: (pose: TriadPose) => void;
}

export const ResetButton: FC<ResetButtonProps> = (props) => {
  return (
    <ActionIcon
      variant="default"
      size="md"
      onClick={() => {
        props.setPose({ ...props.initialPose });
        props.setMatrix(convertEulerPoseToMatrix(props.initialPose, props.angleOrder));
      }}
    >
      <DynamicTablerIcon name="IconRestore" size={16} />
    </ActionIcon>
  );
};
