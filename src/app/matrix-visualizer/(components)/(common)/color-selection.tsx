import { ColorPicker, ColorSwatch, Popover, Tooltip } from "@mantine/core";
import { type FC, useState } from "react";

interface ColorSelectionProps {
  canSelect: boolean;
  color: string;
  name: string;
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
        <Tooltip label={props.name}>
          <ColorSwatch
            color={props.color}
            size={20}
            onClick={() => (props.canSelect ? setShowColorPicker(!showColorPicker) : undefined)}
          />
        </Tooltip>
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
