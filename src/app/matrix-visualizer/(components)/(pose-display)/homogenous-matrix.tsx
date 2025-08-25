import { useState, type FC } from "react";
import type { TriadPoseDisplayProps } from "../../types";
import { Badge, NumberInput, Space, Stack, Text } from "@mantine/core";
import { type Matrix4Tuple } from "three";
import { AxesColorSelection } from "../(common)/axes-color-selection";

interface MatrixDisplayProps extends Pick<TriadPoseDisplayProps, "editable" | "colors" | "angleOrder"> {
  matrixElements: Matrix4Tuple;
  setMatrixElements: (matrix: Matrix4Tuple) => void;
}

export const MatrixDisplay: FC<MatrixDisplayProps> = (props) => {
  const [inputFieldErrors, setInputFieldErrors] = useState<boolean[]>(Array(props.matrixElements.length).fill(false));

  return (
    <Stack gap="5px">
      <div className="grid grid-flow-col grid-rows-4 items-center gap-1">
        <AxesColorSelection {...props} />
        <Space />
        {props.editable
          ? props.matrixElements.map((elem, i) => (
              <NumberInput
                key={i}
                radius="sm"
                size="xs"
                variant="default"
                value={elem}
                hideControls
                w={75}
                error={inputFieldErrors[i]}
                onChange={(value) => {
                  const newMatrix: Matrix4Tuple = [...props.matrixElements];
                  const matrixElement = typeof value == "string" ? parseFloat(value) : value;
                  setInputFieldErrors((currentErrors) =>
                    currentErrors.map((error, errorIndex) => (errorIndex === i ? isNaN(matrixElement) : error)),
                  );
                  newMatrix[i] = matrixElement;
                  props.setMatrixElements(newMatrix);
                }}
              />
            ))
          : props.matrixElements.map((elem, i) => (
              <Badge key={i} radius="sm" size="md" variant="default" w={65}>
                {elem}
              </Badge>
            ))}
      </div>
      {inputFieldErrors.some((error) => error) && (
        <Text size="sm" c="red">
          Cannot save matrix if elements are empty
        </Text>
      )}
    </Stack>
  );
};
