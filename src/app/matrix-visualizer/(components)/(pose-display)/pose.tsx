import { type FC } from "react";
import type { TriadPose, TriadPoseDisplayProps, TriadPoseDisplayType } from "../../types";
import { EulerPose } from "./euler";
import { MatrixDisplay } from "./homogenous-matrix";
import { convertEulerPoseToMatrix, convertMatrixToEulerPose } from "../../helpers";
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
        <EulerPose {...props} />
      ) : (
        <MatrixDisplay
          {...props}
          angleOrder={props.angleOrder}
          matrixElements={convertEulerPoseToMatrix(props.pose, props.angleOrder)}
          setMatrixElements={(matrixElements) => {
            if (props.setPose !== undefined) {
              if (matrixElements.some((elem) => isNaN(elem))) {
                props.disableSubmit(true);
              } else {
                props.setPose(convertMatrixToEulerPose(matrixElements, props.angleOrder));
                props.disableSubmit(false);
              }
            }
          }}
        />
      )}
    </div>
  );
};
