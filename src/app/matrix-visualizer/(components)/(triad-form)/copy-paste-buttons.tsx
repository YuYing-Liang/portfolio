import { ActionIconGroup, ActionIcon } from "@mantine/core";
import { type Matrix4Tuple } from "three";
import { DynamicTablerIcon } from "~/app/(components)/Icon";
import { type TriadPose, type TriadPoseDisplayType } from "../../types";
import { type FC } from "react";

interface CopyPasteButtonsProps {
  pose: TriadPose;
  matrix: Matrix4Tuple;
  poseType: TriadPoseDisplayType;
  setPose: (pose: TriadPose) => void;
  setMatrix: (matrix: Matrix4Tuple) => void;
}

export const CopyPasteButtons: FC<CopyPasteButtonsProps> = (props) => {
  return (
    <ActionIconGroup>
      <ActionIcon
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
        onClick={async () => {
          const poseStr = await navigator.clipboard.readText();
          const pose = poseStr
            .substring(1, poseStr.length - 1)
            .split(",")
            .filter((elem) => elem.trim() !== "")
            .map(Number);
          if (pose.length !== 6 && pose.length !== 16) return;
          if (pose.length === 16) {
            props.setMatrix(pose as Matrix4Tuple);
          } else {
            props.setPose(pose as TriadPose);
          }
        }}
      >
        <DynamicTablerIcon name="IconClipboard" size={16} />
      </ActionIcon>
    </ActionIconGroup>
  );
};
