import { Button, Paper, Text, Select, Group, SegmentedControl } from "@mantine/core";
import { DynamicTablerIcon } from "../../../(components)/Icon";
import { Pose } from "../(pose-display)/pose";
import { useState } from "react";
import type { TriadPoseDisplayParams, TriadPose, TriadPoseDisplayType, EulerAngleOrders } from "../../types";

export const AddTriadPanel = () => {
  const [newTriadData, setNewTriadData] = useState<TriadPose>([0, 0, 0, 0, 0, 0]);
  const [poseDisplayParams, setPoseDisplayParams] = useState<TriadPoseDisplayParams>({
    type: "euler",
    angleOrder: "xyz",
  });

  return (
    <Paper className="absolute left-[25px] top-[25px]" shadow="xs" p="sm">
      <Text fw={600}>Add triad to scene</Text>
      <Group gap="5px">
        <SegmentedControl
          size="xs"
          data={["euler", "matrix"]}
          onChange={(type) => setPoseDisplayParams({ ...poseDisplayParams, type: type as TriadPoseDisplayType })}
          value={poseDisplayParams.type}
        />
        <Select
          size="xs"
          w="75px"
          data={["xyz", "zyz"]}
          onChange={(order) => setPoseDisplayParams({ ...poseDisplayParams, angleOrder: order as EulerAngleOrders })}
          value={poseDisplayParams.angleOrder}
        />
      </Group>
      <Select
        label="Parent Triad"
        placeholder="None (base frame)"
        data={["None (base frame)", "Matrix id 123", "Ground", "TCP"]}
        size="xs"
        searchable
      />
      <Pose
        editable
        matrixData={newTriadData}
        setMatrixData={setNewTriadData}
        angleOrder={poseDisplayParams.angleOrder}
        displayType={poseDisplayParams.type}
      />
      <Button
        variant="light"
        size="xs"
        classNames={{ section: "m-[5px]" }}
        leftSection={<DynamicTablerIcon name="IconPlus" size={18} />}
      >
        {"Add Triad"}
      </Button>
    </Paper>
  );
};
