import { useState, type FC } from "react";
import type { EulerAngleOrders, TriadPoseDisplayProps } from "../../types";
import { Badge, ColorSwatch, NumberInput, Space, Stack, Text } from "@mantine/core";
import { type Matrix4Tuple } from "three";

interface MatrixDisplayProps extends Pick<TriadPoseDisplayProps, "editable" | "colors"> {
  angleOrder: EulerAngleOrders;
  matrixElements: Matrix4Tuple;
  setMatrixElements: (matrix: Matrix4Tuple) => void;
}

export const MatrixDisplay: FC<MatrixDisplayProps> = (props) => {
  const [inputFieldErrors, setInputFieldErrors] = useState<boolean[]>(Array(props.matrixElements.length).fill(false));

  return (
    <Stack gap="5px">
      <div className="grid grid-flow-col grid-rows-4 items-center gap-1">
        <ColorSwatch color={props.colors.x} size={20} />
        <ColorSwatch color={props.colors.y} size={20} />
        <ColorSwatch color={props.colors.z} size={20} />
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
                  newMatrix[i] = typeof value == "string" ? parseFloat(value) : value;
                  if (isNaN(newMatrix[i])) {
                    setInputFieldErrors((currentErrors) =>
                      currentErrors.map((error, errorIndex) => (errorIndex === i ? true : error)),
                    );
                  } else {
                    props.setMatrixElements(newMatrix);
                  }
                }}
              />
            ))
          : props.matrixElements.map((elem, i) => (
              <Badge key={i} radius="sm" size="md" variant="default" w={50}>
                {elem}
              </Badge>
            ))}
      </div>
      {inputFieldErrors.some((error) => error) && (
        <Text size="sm" c="red">
          Matrix will not save if elements are empty
        </Text>
      )}
    </Stack>
  );
};
