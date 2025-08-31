import { InputWrapper, TextInput } from "@mantine/core";
import { ColorSelection } from "../(common)/color-selection";
import { type ChangeEventHandler, type FC } from "react";

interface TriadNameAndSphereColorDisplayProps {
  color: string;
  name: string;
  nameError?: string;
  setName: ChangeEventHandler<HTMLInputElement>;
  setColor: (color: string) => void;
}

export const TriadNameAndSphereColorDisplay: FC<TriadNameAndSphereColorDisplayProps> = (props) => {
  return (
    <>
      <ColorSelection canSelect name="Sphere color" color={props.color} setColor={props.setColor} />
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
    </>
  );
};
