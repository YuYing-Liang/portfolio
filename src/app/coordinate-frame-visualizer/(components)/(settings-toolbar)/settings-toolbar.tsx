import { Paper } from "@mantine/core";
import { useLiveQuery } from "dexie-react-hooks";
import { getAllSettings, updateSetting } from "../../(database)/queries";
import { SettingElement } from "./setting-element";

export const SettingsToolbar = () => {
  const settings = useLiveQuery(async () => await getAllSettings()) ?? [];

  return (
    <Paper
      className="absolute left-1/2 top-[25px] flex w-[400px] -translate-x-1/2 transform items-center justify-center gap-2"
      shadow="xs"
      p="xs"
      radius="md"
    >
      {settings.map((setting) => (
        <SettingElement key={setting.id} {...setting} handleChange={updateSetting} />
      ))}
    </Paper>
  );
};
