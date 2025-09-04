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
import { useFormik } from "formik";
import { type FC } from "react";
import { type DynamicIconProps, DynamicTablerIcon } from "~/app/(components)/Icon";
import { CHASSIS_TYPE_TO_ICON_MAP } from "../../constants";

export const NewChassisFormPanel = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      rotation: 0,
      radius: 0,
      length: 0,
      width: 0,
      base: 0,
      height: 0,
    },
    validate: (values) => {
      const errors: Record<string, string> = {};

      if (!values.name.trim()) {
        errors.name = "Chassis name is required";
      }

      if (!values.type.trim()) {
        errors.type = "Chassis type is required";
      }

      if (values.type === "circular") {
        if (values.radius <= 0) {
          errors.radius = "Radius must be greater than 0";
        }
      } else if (values.type === "rectangular") {
        if (values.length <= 0) {
          errors.length = "Length must be greater than 0";
        }
        if (values.width <= 0) {
          errors.width = "Width must be greater than 0";
        }
      } else if (values.type === "triangular") {
        if (values.base <= 0) {
          errors.base = "Base must be greater than 0";
        }
        if (values.height <= 0) {
          errors.height = "Height must be greater than 0";
        }
      }

      return errors;
    },
    onSubmit: (values) => {
      console.log("New Chassis Created:", values);
    },
  });

  return (
    <Paper shadow="xs" p="xs" w={300}>
      <form onSubmit={formik.handleSubmit}>
        <Stack gap="xs">
          <Group gap="xs">
            <Text size="md" fw={700}>
              {"New Chassis Type"}
            </Text>
            <ActionIconGroup>
              {Object.entries(CHASSIS_TYPE_TO_ICON_MAP).map(([type, icon], i) => (
                <ChassisButton
                  key={i}
                  icon={icon}
                  text={type}
                  isSelected={formik.values.type === type}
                  onClick={async () => await formik.setFieldValue("type", type)}
                />
              ))}
            </ActionIconGroup>
          </Group>
          <Stack gap="xs" mt="xs">
            <TextInput
              name="name"
              label="Chassis Name"
              placeholder="Enter chassis name"
              required
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && formik.errors.name}
            />
            <TextInput
              name="rotation"
              label="Rotation (degrees)"
              placeholder="Enter rotation"
              type="number"
              value={formik.values.rotation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.rotation && formik.errors.rotation}
            />
            {formik.values.type === "circular" && (
              <TextInput
                name="radius"
                label="Radius"
                placeholder="Enter radius"
                type="number"
                value={formik.values.radius}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.radius && formik.errors.radius}
              />
            )}
            {formik.values.type === "rectangular" && (
              <SimpleGrid cols={2} spacing={"xs"}>
                <TextInput
                  name="length"
                  label="Length"
                  placeholder="Enter length"
                  type="number"
                  value={formik.values.length}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.length && formik.errors.length}
                />
                <TextInput
                  name="width"
                  label="Width"
                  placeholder="Enter width"
                  type="number"
                  value={formik.values.width}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.width && formik.errors.width}
                />
              </SimpleGrid>
            )}
            {formik.values.type === "triangular" && (
              <SimpleGrid cols={2} spacing={"xs"}>
                <TextInput
                  name="base"
                  label="Base"
                  placeholder="Enter base"
                  type="number"
                  value={formik.values.base}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.base && formik.errors.base}
                />
                <TextInput
                  name="height"
                  label="Height"
                  placeholder="Enter height"
                  type="number"
                  value={formik.values.height}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.height && formik.errors.height}
                />
              </SimpleGrid>
            )}
          </Stack>
          <Button
            classNames={{
              root: "self-end",
              section: "m-[5px]",
            }}
            variant="light"
            type="submit"
            leftSection={<DynamicTablerIcon name="IconConfetti" size={16} />}
          >
            Create Chassis
          </Button>
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
