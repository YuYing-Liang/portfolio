import { Button, Paper, Text, Select } from "@mantine/core";
import { DynamicTablerIcon } from "../../(components)/Icon";
import { MatrixData } from "./matrix-data";
import { useState } from "react";
import { type TriadPose } from "../types";

export const AddMatrixPanel = () => {
  const [newTriadData, setNewTriadData] = useState<TriadPose>([0, 0, 0, 0, 0, 0]);

  return (
    <Paper className="absolute left-[25px] top-[25px]" shadow="xs" p="sm">
      <Text fw={600}>Add triad to scene</Text>
      <Select
        label="Parent Triad"
        placeholder="None (base frame)"
        data={["None (base frame)", "Matrix id 123", "Ground", "TCP"]}
        size="xs"
        searchable
      />
      <MatrixData editable matrixData={newTriadData} setMatrixData={setNewTriadData} />
      <Button variant="light" size="xs" p="xs" leftSection={<DynamicTablerIcon name="IconPlus" size={20} />}>
        {"Add Triad"}
      </Button>
    </Paper>
  );
};
