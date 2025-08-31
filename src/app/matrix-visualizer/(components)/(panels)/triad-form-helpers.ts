import {
  convertEulerPoseToMatrix,
  convertPoseToRadians,
  roundArray,
  convertPoseToDegrees,
  convertMatrixToEulerPose,
} from "../../helpers";
import { type TriadForm, type TriadPoseDisplayType } from "../../types";

export const onPoseTypeChange = (
  newPoseType: TriadPoseDisplayType,
  triadForm: TriadForm,
  angleSetting: string,
  handleFieldChange: <T extends keyof TriadForm>(name: T, value: TriadForm[T]) => void,
) => {
  const { pose, matrix, type, angleOrder } = triadForm;
  if (newPoseType === "matrix" && type === "euler") {
    handleFieldChange("matrix", convertEulerPoseToMatrix(convertPoseToRadians(pose, angleSetting), angleOrder));
  } else if (newPoseType === "euler" && type === "matrix") {
    handleFieldChange(
      "pose",
      roundArray(convertPoseToDegrees(convertMatrixToEulerPose(matrix, angleOrder), angleSetting), 2),
    );
  }
  handleFieldChange("type", newPoseType);
};
