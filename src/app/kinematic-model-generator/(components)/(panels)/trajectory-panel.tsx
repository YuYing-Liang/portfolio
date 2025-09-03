import { ActionIcon, ActionIconGroup, Badge, Button, Group, Paper, Stack, Text } from "@mantine/core";
import { type Trajectory } from "../../(database)/tables";
import { IconPlus } from "@tabler/icons-react";
import { DynamicTablerIcon } from "~/app/(components)/Icon";

export const TrajectoryPanel = () => {
  const trajectories: Trajectory[] = [
    {
      id: 1,
      name: "Trajectory 1",
      poses: [
        [0, 1, 0],
        [1, 1, 0],
        [1, 2, 0],
        [2, 3, 0],
      ],
    },
    {
      id: 2,
      name: "Trajectory 2",
      poses: [
        [-1, 0, 0],
        [-1, -1, 0],
        [-2, -1, 0],
        [-3, -2, 0],
      ],
    },
  ];

  return (
    <Paper shadow="xs" p="xs">
      <Text size="md" fw={700}>
        {"Trajectories"}
      </Text>
      <Stack gap="sm" mt="sm">
        {trajectories.map((trajectory) => (
          <div key={trajectory.id}>
            <Group justify="space-between">
              <Text size="sm" fw={500}>
                {trajectory.name}
              </Text>
              <ActionIcon variant="subtle" size="md">
                <DynamicTablerIcon name="IconClick" size={16} />
              </ActionIcon>
            </Group>
            <Stack gap={5} mt="xs">
              {trajectory.poses.map((pose, poseIndex) => (
                <Group key={poseIndex} justify="space-between">
                  <Text size="sm">{`Pose ${poseIndex}`}</Text>
                  <Group gap={2}>
                    {pose.map((coordinate, coordinateIndex) => (
                      <Badge key={coordinateIndex} variant="default" size="md" radius="sm">
                        {coordinate}
                      </Badge>
                    ))}
                    <ActionIcon variant="light" size="md">
                      <DynamicTablerIcon name="IconEdit" size={16} />
                    </ActionIcon>
                    <ActionIcon variant="light" size="md">
                      <DynamicTablerIcon name="IconTrash" size={16} />
                    </ActionIcon>
                  </Group>
                </Group>
              ))}
              <Button
                classNames={{
                  root: "w-fit self-end",
                  section: "m-[5px]",
                }}
                size="compact-sm"
                variant="subtle"
                leftSection={<IconPlus size={16} />}
              >
                {"Pose"}
              </Button>
            </Stack>
          </div>
        ))}
        <Button
          classNames={{
            root: "w-fit pl-[1px] pr-[7px] self-end",
            section: "m-[5px]",
          }}
          size="sm"
          variant="light"
          leftSection={<IconPlus size={16} />}
        >
          {"Trajectory"}
        </Button>
      </Stack>
    </Paper>
  );
};
