import { type FC } from "react";
import type { EulerAngleOrders, TriadPoseDisplayProps } from "../../types";
import { Badge, NumberInput } from "@mantine/core";
import { type Matrix4Tuple } from "three";

interface MatrixDisplayProps {
  editable: TriadPoseDisplayProps["editable"];
  angleOrder: EulerAngleOrders;
  matrixElements: Matrix4Tuple;
  setMatrixElements: (matrix: Matrix4Tuple) => void;
}

export const MatrixDisplay: FC<MatrixDisplayProps> = (props) => {
  return (
    <div className="grid grid-flow-col grid-rows-4 gap-1">
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
              onChange={(value) => {
                const newMatrix: Matrix4Tuple = [...props.matrixElements];
                newMatrix[i] = typeof value == "string" ? parseFloat(value) : value;
                props.setMatrixElements(newMatrix);
              }}
            />
          ))
        : props.matrixElements.map((elem, i) => (
            <Badge key={i} radius="sm" size="md" variant="default" w={50}>
              {elem}
            </Badge>
          ))}
    </div>
  );
};
