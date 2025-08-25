import { type FC } from "react";
import { type TriadPoseDisplayProps } from "../../types";
import { ColorSelection } from "./color-selection";

export const AxesColorSelection: FC<Pick<TriadPoseDisplayProps, "editable" | "colors" | "setTriadColors">> = (
  props,
) => (
  <>
    <ColorSelection
      canSelect={props.editable}
      color={props.colors.x}
      setColor={(newXAxisColor) => props.setTriadColors?.({ ...props.colors, x: newXAxisColor })}
    />
    <ColorSelection
      canSelect={props.editable}
      color={props.colors.y}
      setColor={(newYAxisColor) => props.setTriadColors?.({ ...props.colors, y: newYAxisColor })}
    />
    <ColorSelection
      canSelect={props.editable}
      color={props.colors.z}
      setColor={(newZAxisColor) => props.setTriadColors?.({ ...props.colors, z: newZAxisColor })}
    />
  </>
);
