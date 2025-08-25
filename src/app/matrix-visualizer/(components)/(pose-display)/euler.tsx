import { Text, NumberInput, Badge, Stack } from "@mantine/core";
import { useState, type FC } from "react";
import type { TriadPoseDisplayProps } from "../../types";
import { EULER_POSE_LABELS } from "../../constants";
import { AxesColorSelection } from "../(common)/axes-color-selection";

interface EulerPoseProps extends TriadPoseDisplayProps {
  disableSubmit: (disable: boolean) => void;
}

export const EulerPose: FC<EulerPoseProps> = (props) => {
  const [inputFieldErrors, setInputFieldErrors] = useState<boolean[]>(Array(props.pose.length).fill(false));

  return (
    <Stack gap="5px">
      <div className="grid w-fit grid-flow-col grid-rows-3 items-center gap-1">
        <AxesColorSelection {...props} />
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
              error={inputFieldErrors[i]}
              onChange={(newValue) => {
                if (props.setPose === undefined) return;
                const newPose: EulerPoseProps["pose"] = [...props.pose];
                const poseElem = typeof newValue === "string" ? parseFloat(newValue) : newValue;
                newPose[i] = poseElem;
                setInputFieldErrors((currentErrors) =>
                  currentErrors.map((error, errorIndex) => (errorIndex === i ? isNaN(poseElem) : error)),
                );
                props.setPose(newPose);
                props.disableSubmit(newPose.some(isNaN));
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
      {inputFieldErrors.some(Boolean) && (
        <Text size="sm" c="red">
          Cannot save pose if elements are empty
        </Text>
      )}
    </Stack>
  );
};
