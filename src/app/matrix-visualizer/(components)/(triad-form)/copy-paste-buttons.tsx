import { ActionIconGroup, ActionIcon } from "@mantine/core";
import { type Matrix4Tuple } from "three";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { type EulerAngleOrders, type TriadPose, type TriadPoseDisplayType } from "../../types";
import { type FC } from "react";
import {
  convertEulerPoseToMatrix,
  convertMatrixToEulerPose,
  convertPoseToDegrees,
  convertPoseToRadians,
  roundArray,
} from "../../helpers";

interface CopyPasteButtonsProps {
  pose: TriadPose;
  matrix: Matrix4Tuple;
  poseType: TriadPoseDisplayType;
  angleOrder: EulerAngleOrders;
  angleSetting: string;
  disableCopy?: boolean;
  disablePaste?: boolean;
  setPose: (pose: TriadPose) => void;
  setMatrix: (matrix: Matrix4Tuple) => void;
}

export const CopyPasteButtons: FC<CopyPasteButtonsProps> = (props) => {
  return (
    <ActionIconGroup>
      <ActionIcon
        disabled={props.disableCopy ?? false}
        variant="default"
        size="md"
        onClick={async () => {
          await navigator.clipboard.writeText(
            `[${props.poseType == "euler" ? props.pose.toString() : props.matrix.toString()}]`,
          );
        }}
      >
        <DynamicTablerIcon name="IconCopy" size={16} />
      </ActionIcon>
      <ActionIcon
        variant="default"
        size="md"
        disabled={props.disablePaste ?? false}
        onClick={async () => {
          const poseStr = await navigator.clipboard.readText();
          const pose = poseStr
            .substring(1, poseStr.length - 1)
            .split(",")
            .filter((elem) => elem.trim() !== "")
            .map(Number);
          if (pose.length !== 6 && pose.length !== 16) return;
          if (pose.length === 16) {
            if (props.poseType === "matrix") {
              props.setMatrix(pose as Matrix4Tuple);
            } else {
              props.setPose(
                roundArray(
                  convertPoseToDegrees(
                    convertMatrixToEulerPose(pose as Matrix4Tuple, props.angleOrder),
                    props.angleSetting,
                  ),
                ),
              );
            }
          } else {
            if (props.poseType === "matrix") {
              props.setMatrix(
                convertEulerPoseToMatrix(convertPoseToRadians(pose as TriadPose, props.angleSetting), props.angleOrder),
              );
            } else {
              props.setPose(pose as TriadPose);
            }
          }
        }}
      >
        <DynamicTablerIcon name="IconClipboard" size={16} />
      </ActionIcon>
    </ActionIconGroup>
  );
};
