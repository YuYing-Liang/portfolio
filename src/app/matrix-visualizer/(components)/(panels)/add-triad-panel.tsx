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
import { type TriadPoseDisplayParams } from "../../types";
import { DEFAULT_AXIS_COLORS, EULER_POSE_LABELS } from "../../constants";
import { Formik } from "formik";
import { type Matrix } from "../../(database)/tables";
import { useLiveQuery } from "dexie-react-hooks";
import { addMatrix, getAllMatrixNamesAndIds } from "../../(database)/queries";
import { useTriadInfoPanelState } from "../../states";
import { useState } from "react";

const INITIAL_FORM_VALUES: Matrix & TriadPoseDisplayParams = {
  name: "New Triad",
  parent: undefined,
  pose: [0, 0, 0, 0, 0, 0],
  colors: DEFAULT_AXIS_COLORS,
  type: "euler",
  angleOrder: "XYZ",
};

export const AddTriadPanel = () => {
  const hideInfoPanel = useTriadInfoPanelState((state) => state.hideTriadPanel);
  const matrixNamesAndIds = useLiveQuery(async () => await getAllMatrixNamesAndIds()) ?? [];
  const [matrixDisableSubmit, setMatrixDisableSubmit] = useState<boolean>(false);

  return (
    <Paper className="absolute left-[25px] top-[25px]" shadow="xs" p="sm">
      <Formik
        initialValues={INITIAL_FORM_VALUES}
        validate={(values) => {
          const errors: Partial<Record<keyof Matrix, string | boolean[]>> = {};
          if (values.name === undefined || values.name.trim() === "") {
            errors.name = "Matrix name required";
          }
          const emptyPoseElementIndex = values.pose.findIndex((poseElement: number) => isNaN(poseElement));
          if (emptyPoseElementIndex > -1) {
            errors.pose = `${EULER_POSE_LABELS[values.angleOrder][emptyPoseElementIndex]} cannot be empty`;
          }
          return errors;
        }}
        validateOnChange={true}
        onSubmit={async (values) => {
          await addMatrix({
            name: values.name.trim(),
            colors: values.colors,
            pose: values.pose,
            parent: values.parent,
          });
          hideInfoPanel();
          // const triadPose = new Vector3(values.pose[0], values.pose[1], values.pose[2]);
          // camera.position.set(triadPose.x, triadPose.y, triadPose.z + 5);
          // camera.lookAt(triadPose);
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Text fw={600}>Add triad to scene</Text>
            <Group gap="5px">
              <SegmentedControl
                size="xs"
                data={["euler", "matrix"]}
                onChange={(value) => {
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
                onChange={(parentId) => {
                  handleChange({
                    target: { name: "parent", value: parentId == null ? undefined : parseInt(parentId) },
                  });
                }}
                value={values.parent?.toString() ?? "0"}
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
              disableSubmit={setMatrixDisableSubmit}
            />
            {errors.pose !== undefined && values.type === "euler" && (
              <Text size="sm" c="red">
                {errors.pose}
              </Text>
            )}
            <Button
              type="submit"
              variant="light"
              size="xs"
              disabled={values.type === "matrix" ? matrixDisableSubmit : errors.pose !== undefined}
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
