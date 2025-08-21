import { Text, NumberInput, Badge, ColorSwatch } from "@mantine/core";
import { type FC } from "react";
import type { EulerAngleOrders, TriadPoseDisplayProps } from "../../types";
import { EULER_POSE_LABELS } from "../../constants";

interface EulerPoseProps extends TriadPoseDisplayProps {
  angleOrder: EulerAngleOrders;
}

export const EulerPose: FC<EulerPoseProps> = (props) => (
  <div className="grid grid-flow-col grid-rows-3 items-center gap-1">
    <ColorSwatch color={props.colors.x} size={20} />
    <ColorSwatch color={props.colors.y} size={20} />
    <ColorSwatch color={props.colors.z} size={20} />
    {EULER_POSE_LABELS[props.angleOrder].map((poseElement, i) =>
      props.editable ? (
        <NumberInput
          key={poseElement}
          leftSection={<Text>{`${poseElement}:`}</Text>}
          hideControls
          placeholder="0"
          value={props.pose[i]}
          size="xs"
          w="85px"
          error={props.pose[i] !== undefined && isNaN(props.pose[i])}
          onChange={(newValue) => {
            console.log(newValue);
            if (props.setPose === undefined) return;
            const newPose: EulerPoseProps["pose"] = [...props.pose];
            newPose[i] = typeof newValue === "string" ? parseFloat(newValue) : newValue;
            props.setPose(newPose);
          }}
        />
      ) : (
        <Badge
          key={poseElement}
          classNames={{ root: "normal-case block", label: "text-right font-medium" }}
          radius="sm"
          size="lg"
          w="85px"
          variant="default"
          px="5px"
          leftSection={<Text>{`${poseElement}:`}</Text>}
        >
          {props.pose[i]}
        </Badge>
      ),
    )}
  </div>
);
