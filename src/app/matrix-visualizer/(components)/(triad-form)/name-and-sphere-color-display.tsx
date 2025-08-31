import { InputWrapper, TextInput, Text } from "@mantine/core";
import { ColorSelection } from "../(common)/color-selection";
import { type ChangeEventHandler, type FC } from "react";

interface TriadNameAndSphereColorDisplayProps {
  editable: boolean;
  color: string;
  name: string;
  nameError?: string;
  setName: ChangeEventHandler<HTMLInputElement>;
  setColor: (color: string) => void;
}

export const TriadNameAndSphereColorDisplay: FC<TriadNameAndSphereColorDisplayProps> = (props) => {
  return (
    <>
      <ColorSelection canSelect={props.editable} name="Sphere color" color={props.color} setColor={props.setColor} />
      {props.editable ? (
        <InputWrapper error={props.nameError} w="fit-content">
          <TextInput
            name="name"
            value={props.name}
            error={props.nameError !== undefined}
            placeholder="Matrix name"
            size="xs"
            onChange={props.setName}
          />
        </InputWrapper>
      ) : (
        <Text fw={600}>{props.name}</Text>
      )}
    </>
  );
};
