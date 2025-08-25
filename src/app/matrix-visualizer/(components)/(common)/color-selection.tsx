import { ColorPicker, ColorSwatch, Popover } from "@mantine/core";
import { type FC, useState } from "react";

interface ColorSelectionProps {
  canSelect: boolean;
  color: string;
  setColor: (color: string) => void;
}

export const ColorSelection: FC<ColorSelectionProps> = (props) => {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  return (
    <Popover
      position="bottom"
      withArrow
      shadow="md"
      opened={props.canSelect ? showColorPicker : false}
      onChange={props.canSelect ? setShowColorPicker : undefined}
    >
      <Popover.Target>
        <ColorSwatch
          color={props.color}
          size={20}
          onClick={() => (props.canSelect ? setShowColorPicker(!showColorPicker) : undefined)}
        />
      </Popover.Target>
      <Popover.Dropdown>
        <ColorPicker
          size="md"
          defaultValue={props.color}
          value={props.color}
          onChange={(newColor) => props.setColor(newColor)}
        />
      </Popover.Dropdown>
    </Popover>
  );
};
