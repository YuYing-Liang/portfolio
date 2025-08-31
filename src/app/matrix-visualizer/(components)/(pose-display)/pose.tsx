import { type FC } from "react";
import type { TriadPose, TriadPoseDisplayProps, TriadPoseDisplayType } from "../../types";
import { EulerPose } from "./euler";
import { MatrixDisplay } from "./homogenous-matrix";
import { type Matrix4Tuple } from "three";

interface PoseProps extends TriadPoseDisplayProps {
  displayType: TriadPoseDisplayType;
  pose: TriadPose;
  matrix: Matrix4Tuple;
  disableSubmit: (disable: boolean) => void;
  setPose: (pose: TriadPose) => void;
  setMatrix: (matrix: Matrix4Tuple) => void;
}

export const Pose: FC<PoseProps> = (props) => {
  return (
    <div className="my-1">
      {props.displayType === "euler" ? (
        <EulerPose
          {...props}
          setPose={(pose) => {
            props.disableSubmit(pose.some(isNaN));
            props.setPose(pose);
          }}
        />
      ) : (
        <MatrixDisplay
          {...props}
          setMatrix={(matrix) => {
            props.disableSubmit(matrix.some(isNaN));
            props.setMatrix(matrix);
          }}
        />
      )}
    </div>
  );
};
