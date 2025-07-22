import {
  Button,
  Paper,
  Text,
  Select,
  Group,
  SegmentedControl,
  InputWrapper,
  TextInput,
  ColorSwatch,
} from "@mantine/core";
import { DynamicTablerIcon } from "../../../(components)/Icon";
import { Pose } from "../(pose-display)/pose";
import {
  type TriadPoseDisplayParams,
} from "../../types";
import { DEFAULT_AXIS_COLORS } from "../../constants";
import { Formik } from "formik";
import { type Matrix } from "../../(database)/tables";
import { useLiveQuery } from "dexie-react-hooks";
import { addMatrix, getAllMatrixNamesAndIds } from "../../(database)/queries";

const INITIAL_FORM_VALUES: Matrix & TriadPoseDisplayParams = {
  name: "New Triad",
  parent: undefined,
  pose: [0, 0, 0, 0, 0, 0],
  colors: DEFAULT_AXIS_COLORS,
  type: "euler",
  angleOrder: "XYZ",
};

export const AddTriadPanel = () => {
  const matrixNamesAndIds = useLiveQuery(async () => await getAllMatrixNamesAndIds()) ?? [];

  return (
    <Paper className="absolute left-[25px] top-[25px]" shadow="xs" p="sm">
      <Formik
        initialValues={INITIAL_FORM_VALUES}
        validate={(values) => {
          const errors: Partial<Matrix> = {};
          if (values.name === undefined || values.name.trim() === "") {
            errors.name = "Matrix name required";
          }
          return errors;
        }}
        validateOnChange={true}
        onSubmit={async (values) => {
          console.log("Submitting triad:", values);
          await addMatrix({
            name: values.name.trim(),
            colors: values.colors,
            pose: values.pose,
            parent: values.parent,
          })
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Text fw={600}>Add triad to scene</Text>
            <Group gap="5px">
              <SegmentedControl
                size="xs"
                data={["euler", "matrix"]}
                onChange={async (value) => {
                  handleChange({ target: { name: "type", value } });
                }}
                value={values.type}
              />
              <Select
                size="xs"
                w="75px"
                data={["XYZ", "ZYZ"]}
                onChange={(value) => {
                  handleChange({ target: { name: "angleOrder", value } });
                }}
                value={values.angleOrder}
              />
              {values.type === "matrix" && (
                <Button
                  variant="light"
                  size="xs"
                  classNames={{ section: "m-[5px]" }}
                  leftSection={<DynamicTablerIcon name="IconClipboard" size={18} />}
                >
                  {"Paste Matrix"}
                </Button>
              )}
            </Group>
            {matrixNamesAndIds.length > 0 && (
              <Select
                label="Parent Triad"
                placeholder="None (base frame)"
                data={matrixNamesAndIds.map((matrix) => ({
                  value: matrix.id.toString(),
                  label: matrix.name,
                }))}
                onChange={(value) => {
                  handleChange({ target: { name: "parent", value } });
                }}
                size="xs"
                searchable
              />
            )}
            <Group mt="5px" gap="0.25rem">
              <ColorSwatch color={values.colors.sphere} size={20} />
              <InputWrapper error={errors.name}>
                <TextInput
                  name="name"
                  value={values.name}
                  error={errors.name !== undefined}
                  placeholder="Matrix name"
                  size="xs"
                  onChange={handleChange}
                />
              </InputWrapper>
              {values.type === "matrix" && (
                <Button
                  variant="light"
                  size="xs"
                  classNames={{ section: "m-[5px]" }}
                  leftSection={<DynamicTablerIcon name="IconCopy" size={18} />}
                >
                  {"Copy Matrix"}
                </Button>
              )}
            </Group>
            <Pose
              editable
              pose={values.pose}
              setPose={(pose) => {
                handleChange({ target: { name: "pose", value: pose } });
              }}
              colors={values.colors}
              angleOrder={values.angleOrder}
              displayType={values.type}
            />
            <Button
              type="submit"
              variant="light"
              size="xs"
              classNames={{ section: "m-[5px]" }}
              leftSection={<DynamicTablerIcon name="IconPlus" size={18} />}
            >
              {"Add Triad"}
            </Button>
          </form>
        )}
      </Formik>
    </Paper>
  );
};
