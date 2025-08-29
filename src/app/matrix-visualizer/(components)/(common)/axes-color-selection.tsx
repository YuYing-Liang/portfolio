import { type FC } from "react";
import { type TriadPoseDisplayProps } from "../../types";
import { ColorSelection } from "./color-selection";

export const AxesColorSelection: FC<Pick<TriadPoseDisplayProps, "editable" | "colors" | "setTriadColors">> = (props) => (
  <>
    <ColorSelection
      name="x-axis color"
      canSelect={props.editable}
      color={props.colors.x}
      setColor={(newXAxisColor) => props.setTriadColors?.({ ...props.colors, x: newXAxisColor })}
    />
    <ColorSelection
      name="y-axis color"
      canSelect={props.editable}
      color={props.colors.y}
      setColor={(newYAxisColor) => props.setTriadColors?.({ ...props.colors, y: newYAxisColor })}
    />
    <ColorSelection
      name="z-axis color"
      canSelect={props.editable}
      color={props.colors.z}
      setColor={(newZAxisColor) => props.setTriadColors?.({ ...props.colors, z: newZAxisColor })}
    />
  </>
);
