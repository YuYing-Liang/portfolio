import { Text, NumberInput, Badge, ColorSwatch } from "@mantine/core";
import { type FC } from "react";
import type { EulerAngleOrders, TriadPoseDisplayProps } from "../../types";

interface EulerPoseProps extends TriadPoseDisplayProps {
  angleOrder: EulerAngleOrders;
}

export const EulerPose: FC<EulerPoseProps> = (props) => (
  <div className="grid grid-flow-col grid-rows-3 items-center gap-1">
    <ColorSwatch color={props.colors.x} size={20} />
    <ColorSwatch color={props.colors.y} size={20} />
    <ColorSwatch color={props.colors.z} size={20} />
    {["x", "y", "z", "rx", "ry", "rz"].map((matrixProperty, i) =>
      props.editable ? (
        <NumberInput
          key={matrixProperty}
          leftSection={<Text>{`${matrixProperty}:`}</Text>}
          hideControls
          placeholder="0"
          value={props.pose[i]}
          size="xs"
          w="85px"
          onChange={(newValue) => {
            if (props.setPose === undefined) return;
            const newPose: EulerPoseProps["pose"] = [...props.pose];
            newPose[i] = typeof newValue === "string" ? parseFloat(newValue) : newValue;
            props.setPose(newPose);
          }}
        />
      ) : (
        <Badge
          key={matrixProperty}
          classNames={{ root: "normal-case block", label: "text-right font-medium" }}
          radius="sm"
          size="lg"
          w="85px"
          variant="default"
          px="5px"
          leftSection={<Text>{`${matrixProperty}:`}</Text>}
        >
          {props.pose[i]}
        </Badge>
      ),
    )}
  </div>
);
