import {
  ActionIcon,
  ActionIconGroup,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { type FC } from "react";
import { type DynamicIconProps, DynamicTablerIcon } from "~/app/(components)/Icon";
import { CHASSIS_TYPE_TO_ICON_MAP } from "../../constants";
import { useFormikContext } from "formik";
import { type ChassisFormValues } from "../../(states)/chassis-form";

export const ChassisFormPanel = () => {
  const chassisForm = useFormikContext<ChassisFormValues>();

  return (
    <Paper shadow="xs" p="xs" w={300}>
      <form onSubmit={chassisForm.handleSubmit}>
        <Stack gap="xs">
          <Group gap="xs" justify="space-between">
            <Text size="md" fw={700}>
              {`${chassisForm.values.submitType === "new" ? "New" : "Edit"} Chassis`}
            </Text>
            <ActionIconGroup>
              {Object.entries(CHASSIS_TYPE_TO_ICON_MAP).map(([type, icon], i) => (
                <ChassisButton
                  key={i}
                  icon={icon}
                  text={type}
                  isSelected={chassisForm.values.type === type}
                  onClick={async () => await chassisForm.setFieldValue("type", type)}
                />
              ))}
            </ActionIconGroup>
          </Group>
          <TextInput
            name="name"
            label="Chassis Name"
            placeholder="Enter chassis name"
            required
            value={chassisForm.values.name}
            onChange={chassisForm.handleChange}
            onBlur={chassisForm.handleBlur}
            error={chassisForm.touched.name && chassisForm.errors.name}
          />
          {chassisForm.values.type === "circular" && (
            <TextInput
              name="radius"
              label="Radius"
              placeholder="Enter radius"
              type="number"
              value={chassisForm.values.radius}
              onChange={chassisForm.handleChange}
              onBlur={chassisForm.handleBlur}
              error={chassisForm.touched.radius && chassisForm.errors.radius}
            />
          )}
          {chassisForm.values.type === "rectangular" && (
            <SimpleGrid cols={2} spacing={"xs"}>
              <TextInput
                name="length"
                label="Length"
                placeholder="Enter length"
                type="number"
                value={chassisForm.values.length}
                onChange={chassisForm.handleChange}
                onBlur={chassisForm.handleBlur}
                error={chassisForm.touched.length && chassisForm.errors.length}
              />
              <TextInput
                name="width"
                label="Width"
                placeholder="Enter width"
                type="number"
                value={chassisForm.values.width}
                onChange={chassisForm.handleChange}
                onBlur={chassisForm.handleBlur}
                error={chassisForm.touched.width && chassisForm.errors.width}
              />
            </SimpleGrid>
          )}
          {chassisForm.values.type === "triangular" && (
            <SimpleGrid cols={2} spacing={"xs"}>
              <TextInput
                name="base"
                label="Base"
                placeholder="Enter base"
                type="number"
                value={chassisForm.values.base}
                onChange={chassisForm.handleChange}
                onBlur={chassisForm.handleBlur}
                error={chassisForm.touched.base && chassisForm.errors.base}
              />
              <TextInput
                name="height"
                label="Height"
                placeholder="Enter height"
                type="number"
                value={chassisForm.values.height}
                onChange={chassisForm.handleChange}
                onBlur={chassisForm.handleBlur}
                error={chassisForm.touched.height && chassisForm.errors.height}
              />
            </SimpleGrid>
          )}
          <SimpleGrid cols={2} spacing={"xs"}>
            <TextInput
              name="rotation"
              label="Rotation"
              placeholder="Enter rotation"
              type="number"
              disabled={chassisForm.values.type === "circular"}
              value={chassisForm.values.rotation}
              onChange={chassisForm.handleChange}
              onBlur={chassisForm.handleBlur}
              error={chassisForm.touched.rotation && chassisForm.errors.rotation}
            />
            <Button
              classNames={{
                root: "self-end",
                section: "m-[5px]",
              }}
              variant="light"
              type="submit"
              rightSection={<DynamicTablerIcon name="IconBoxModel" size={16} />}
            >
              Create
            </Button>
          </SimpleGrid>
        </Stack>
      </form>
    </Paper>
  );
};

interface ChassisButtonProps {
  icon: DynamicIconProps["name"];
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const ChassisButton: FC<ChassisButtonProps> = (props) => (
  <Tooltip label={props.text}>
    <ActionIcon variant={props.isSelected ? "filled" : "light"} size="lg" onClick={props.onClick}>
      <DynamicTablerIcon name={props.icon} size={18} />
    </ActionIcon>
  </Tooltip>
);
