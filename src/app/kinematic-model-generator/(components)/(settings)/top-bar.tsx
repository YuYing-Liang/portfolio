import { SegmentedControl, Center, Paper, Text, Switch, Group, Tooltip, Stack, Slider } from "@mantine/core";
import {
  IconAdjustmentsAlt,
  IconArrowLoopRight,
  IconChartGridDots,
  IconChartGridDotsFilled,
  IconPointer,
  IconPointerFilled,
} from "@tabler/icons-react";
import { usePageState } from "../../(states)/states";
import { type Pages } from "../../constants";
import { useLocalStorage } from "@mantine/hooks";
import { DEFAULT_SETTINGS, SettingData } from "./settings";

export const TopBar = () => {
  const pageStates = usePageState();
  const [gridSize, setGridSize] = useLocalStorage<SettingData["gridSize"]>({
    key: "gridSize",
    defaultValue: DEFAULT_SETTINGS.gridSize,
  });
  const [gridSnapping, setGridSnapping] = useLocalStorage<SettingData["gridSnapping"]>({
    key: "gridSnapping",
    defaultValue: DEFAULT_SETTINGS.gridSnapping,
  });

  return (
    <Paper className="absolute left-1/2 top-[25px] -translate-x-1/2 transform" shadow="xs" p="xs">
      <Group gap="xs">
        <Tooltip
          label="Toggle grid snapping"
          events={{ hover: true, focus: false, touch: false }}
        >
          <div>
            <Switch
              size="md"
              color="purple"
              onLabel={<IconChartGridDotsFilled size={16} />}
              offLabel={<IconPointerFilled size={16} />}
              checked={gridSnapping}
              onChange={(e) => setGridSnapping(e.target.checked)}
            />
          </div>
        </Tooltip>
        <Stack gap={0}>
          <Slider
            w={100}
            size="md"
            radius="md"
            value={gridSize}
            min={5}
            max={100}
            step={5}
            label={null}
            marks={[20, 40, 60, 80, 100].map((marker) => ({ value: marker }))}
            onChange={(newValue) => setGridSize(newValue)}
          />
          <Text size="xs">{`Grid: 1 unit = ${gridSize}px`}</Text>
        </Stack>
        <SegmentedControl
          value={pageStates.page}
          onChange={(page) => pageStates.setPage(page as Pages)}
          data={[
            {
              value: "configure",
              label: (
                <Center style={{ gap: 10 }}>
                  <IconAdjustmentsAlt size={16} />
                  <span>{"Configure"}</span>
                </Center>
              ),
            },
            {
              value: "simulate",
              label: (
                <Center style={{ gap: 10 }}>
                  <IconArrowLoopRight size={16} />
                  <span>{"Simulate"}</span>
                </Center>
              ),
            },
          ]}
        />
      </Group>
    </Paper>
  );
};
