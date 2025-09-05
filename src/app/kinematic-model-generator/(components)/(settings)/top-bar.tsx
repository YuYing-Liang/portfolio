import { SegmentedControl, Center, Paper } from "@mantine/core";
import { IconAdjustmentsAlt, IconArrowLoopRight } from "@tabler/icons-react";
import { usePageState } from "../../(states)/states";
import { type Pages } from "../../constants";

export const TopBar = () => {
  const pageStates = usePageState();

  return (
    <Paper className="absolute left-1/2 top-[25px] -translate-x-1/2 transform" shadow="xs" p="xs">
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
    </Paper>
  );
};
