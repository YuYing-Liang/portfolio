import { type FC } from "react";
import type { EulerAngleOrders, TriadPoseDisplayProps, TriadPoseDisplayType } from "../../types";
import { EulerPose } from "./euler";
import { MatrixDisplay } from "./homogenous-matrix";

interface PoseProps extends TriadPoseDisplayProps {
  displayType: TriadPoseDisplayType;
  angleOrder: EulerAngleOrders;
}

export const Pose: FC<PoseProps> = (props) => (
  <div className="my-1">{props.displayType === "euler" ? <EulerPose {...props} /> : <MatrixDisplay {...props} />}</div>
);
