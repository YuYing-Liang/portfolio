import { Text, NumberInput, Flex, Badge } from "@mantine/core";
import { type FC } from "react";
import { type TriadPose } from "../types";

interface MatrixDataProps {
  editable: boolean;
  matrixData: TriadPose;
  setMatrixData?: (matrixData: TriadPose) => void;
}

export const MatrixData: FC<MatrixDataProps> = (props) => (
  <Flex gap="xs" direction="column" wrap="wrap" h="110px" my="sm">
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
        <Badge
          key={matrixProperty}
          classNames={{ root: "normal-case block", label: "text-left" }}
          radius="md"
          size="lg"
          w="85px"
          variant="default"
        >{`${matrixProperty}: ${props.matrixData[i]}`}</Badge>
      ),
    )}
  </Flex>
);
