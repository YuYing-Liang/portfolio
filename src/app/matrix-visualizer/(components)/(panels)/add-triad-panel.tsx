import { Button, Paper, Text, Select, Group, SegmentedControl, Input } from "@mantine/core";
import { DynamicTablerIcon } from "../../../(components)/Icon";
import { Pose } from "../(pose-display)/pose";
import { useState } from "react";
import {
  type TriadPoseDisplayParams,
  type TriadPose,
  type TriadPoseDisplayType,
  type EulerAngleOrders,
} from "../../types";
import { DEFAULT_AXIS_COLORS } from "../../constants";
import { Formik } from "formik";
import { type Matrix } from "../../(database)/tables";
import { useLiveQuery } from "dexie-react-hooks";
import { getAllMatrixNamesAndIds } from "../../(database)/queries";

const INITIAL_FORM_VALUES: Matrix & TriadPoseDisplayParams = {
  name: "New Triad",
  parent: undefined,
  pose: [0, 0, 0, 0, 0, 0],
  colors: [DEFAULT_AXIS_COLORS.x, DEFAULT_AXIS_COLORS.y, DEFAULT_AXIS_COLORS.z, DEFAULT_AXIS_COLORS.sphere],
  type: "euler",
  angleOrder: "xyz",
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
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Text fw={600}>Add triad to scene</Text>
            <Group gap="5px">
              <SegmentedControl
                size="xs"
                data={["euler", "matrix"]}
                onChange={(value) => {
                  handleChange({ target: { name: "type", value } })
                  // if (value === "euler") {
                  //   setFieldValue("pose", )
                  // }
                }}
                value={values.type}
              />
              <Select
                size="xs"
                w="75px"
                data={["XYZ", "ZYZ"]}
                onChange={(value) => handleChange({ target: { name: "angleOrder", value } })}
                value={values.angleOrder}
              />
            </Group>
            <Select
              label="Parent Triad"
              placeholder="None (base frame)"
              data={matrixNamesAndIds.map((matrix) => ({
                value: matrix.id.toString(),
                label: matrix.name,
              }))}
              onChange={(value) => handleChange({ target: { name: "parent", value } })}
              size="xs"
              searchable
            />
            <Input name="name" placeholder="Matrix name" size="xs" mt="5px" onChange={handleChange} />
            <Pose
              editable
              matrixData={values.pose}
              setMatrixData={(matrixData) => handleChange({ target: { name: "pose", value: matrixData } })}
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
