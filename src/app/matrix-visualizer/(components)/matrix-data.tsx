import { Text, NumberInput, Flex } from "@mantine/core";
import { type FC } from "react";
import { type TriadPose } from "../types";

interface MatrixDataProps {
  editable: boolean;
  matrixData: TriadPose;
  setMatrixData?: (matrixData: TriadPose) => void;
}

export const MatrixData: FC<MatrixDataProps> = (props) => (
  <Flex gap="xs" direction="column" wrap="wrap" h="115px" my="sm">
    {["x", "y", "z", "rx", "ry", "rz"].map((matrixProperty, i) =>
      props.editable ? (
        <NumberInput
          key={matrixProperty}
          leftSection={<Text>{`${matrixProperty}:`}</Text>}
          rightSection={<></>}
          placeholder="0"
          value={props.matrixData[i]}
          onChange={(newValue) => {
            if (props.setMatrixData === undefined) return;
            const newMatrix: MatrixDataProps["matrixData"] = [...props.matrixData];
            newMatrix[i] = typeof newValue === "string" ? parseFloat(newValue) : newValue;
            props.setMatrixData(newMatrix);
          }}
          size="xs"
          w="85px"
        />
      ) : (
        <Text key={matrixProperty}>{`${matrixProperty}: ${props.matrixData[i]}`}</Text>
      ),
    )}
  </Flex>
);
