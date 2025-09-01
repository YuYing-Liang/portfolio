import { type FC } from "react";
import { type Setting } from "../../(database)/tables";
import { Input, InputWrapper, SegmentedControl, Select, Slider, Stack, Switch, Text } from "@mantine/core";
import { ColorSelection } from "../(common)/color-selection";

type SettingElementProps = Setting & {
  handleChange: (id: number, value: Setting["value"]) => void;
};

export const SettingElement: FC<SettingElementProps> = (props) => {
  switch (props.type) {
    case "text":
      return (
        <InputWrapper label={props.name}>
          <Input type="text" value={props.value} onChange={(e) => props.handleChange(props.id, e.target.value)} />
        </InputWrapper>
      );
    case "number":
      return (
        <InputWrapper label={props.name}>
          <Input type="number" value={props.value} onChange={(e) => props.handleChange(props.id, e.target.value)} />
        </InputWrapper>
      );
    case "options":
      return (
        <Select
          size="xs"
          maw={65}
          radius="lg"
          allowDeselect={false}
          withCheckIcon={false}
          value={props.value}
          onChange={(newValue) => (newValue !== null ? props.handleChange(props.id, newValue) : {})}
          data={props.options}
        />
      );
    case "toggle":
      if (props.options !== undefined || typeof props.value === "string") {
        if (props.options === undefined) return null;
        if (typeof props.value === "boolean") return null;
        return (
          <SegmentedControl
            withItemsBorders={false}
            size="xs"
            radius="lg"
            value={props.value}
            data={props.options}
            onChange={(newValue) => props.handleChange(props.id, newValue)}
          />
        );
      }
      return <Switch label={props.name} checked={props.value} />;
    case "range":
      return (
        <Stack gap={0}>
          <Slider
            w={100}
            size="md"
            radius="md"
            value={props.value}
            min={props.min}
            max={props.max}
            step={props.step}
            label={null}
            marks={props.markers !== undefined ? props.markers.map((marker) => ({ value: marker })) : undefined}
            onChange={(newValue) => props.handleChange(props.id, newValue)}
          />
          <Text size="xs">{`${props.name}: ${props.value}`}</Text>
        </Stack>
      );
    case "color":
      return (
        <ColorSelection
          canSelect
          name={props.name}
          color={props.value}
          setColor={(newColor) => props.handleChange(props.id, newColor)}
        />
      );
  }
};
