import { Paper, Stack, Text, Group, ColorSwatch } from "@mantine/core";
import { type Wheel } from "../../(database)/tables";

export const MotorSpeedPanel = () => {
  const wheels: Wheel[] = [
    {
      chassis: 1,
      color: "#C4B4FF",
      frame: [1, 0, 0, 0, 1, 0, 0, 0, 1],
      id: 1,
      length: 3,
      width: 1,
      name: "Wheel 1",
    },
    {
      chassis: 1,
      name: "Wheel 2",
      color: "#31D492",
      frame: [1, 0, 0, 0, 1, 0, 0, 0, 1],
      id: 2,
      length: 3,
      width: 1,
    },
  ];

  return (
    <Paper shadow="xs" p="xs">
      <Text size="md" fw={700}>
        {"Wheel Speeds"}
      </Text>
      <Stack gap={5} mt="xs">
        {wheels.map((wheel) => (
          <Group justify="space-between" key={wheel.id}>
            <Group gap={5}>
              <ColorSwatch size={15} color={wheel.color} />
              <Text>{wheel.name}</Text>
            </Group>
            <Text>{"5mm/s"}</Text>
          </Group>
        ))}
      </Stack>
    </Paper>
  );
};
