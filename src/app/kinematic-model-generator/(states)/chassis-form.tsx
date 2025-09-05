import { Formik } from "formik";
import { type Chassis } from "../(database)/tables";
import { getRotationFromMatrix } from "../helpers";
import React, { type FC, type PropsWithChildren } from "react";

export type ChassisFormValues = {
  name: Chassis["name"];
  type: Chassis["type"] | "";
  submitType: "new" | "edit";
  rotation: number;
  radius: number;
  length: number;
  width: number;
  base: number;
  height: number;
};

const DEFAULT_CHASSIS_FORM_VALUES: ChassisFormValues = {
  name: "",
  type: "",
  submitType: "new",
  rotation: 0,
  radius: 10,
  length: 10,
  width: 10,
  base: 10,
  height: 10,
};

export interface ChassisFormProps {
  initialValues?: Chassis;
}

export const ChassisForm: FC<PropsWithChildren<ChassisFormProps>> = (props) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: props.initialValues?.name ?? DEFAULT_CHASSIS_FORM_VALUES.name,
        type: props.initialValues?.type ?? DEFAULT_CHASSIS_FORM_VALUES.type,
        rotation: props.initialValues?.frame
          ? getRotationFromMatrix(props.initialValues.frame)
          : DEFAULT_CHASSIS_FORM_VALUES.rotation,
        radius:
          props.initialValues?.type === "circular" ? props.initialValues.radius : DEFAULT_CHASSIS_FORM_VALUES.radius,
        length:
          props.initialValues?.type === "rectangular" ? props.initialValues.length : DEFAULT_CHASSIS_FORM_VALUES.length,
        width:
          props.initialValues?.type === "rectangular" ? props.initialValues.width : DEFAULT_CHASSIS_FORM_VALUES.width,
        base: props.initialValues?.type === "triangular" ? props.initialValues.base : DEFAULT_CHASSIS_FORM_VALUES.base,
        height:
          props.initialValues?.type === "triangular" ? props.initialValues.height : DEFAULT_CHASSIS_FORM_VALUES.height,
      }}
      validate={(values) => {
        const errors: Partial<Record<keyof ChassisFormValues, string>> = {};

        if (!values.name.trim()) {
          errors.name = "Chassis name is required";
        }

        if (!values.type.trim()) {
          errors.type = "Chassis type is required";
        }

        if (values.type === "circular") {
          if (values.radius <= 0) errors.radius = "Radius must be greater than 0";
        } else if (values.type === "rectangular") {
          if (values.length <= 0) errors.length = "Length must be greater than 0";
          if (values.width <= 0) errors.width = "Width must be greater than 0";
        } else if (values.type === "triangular") {
          if (values.base <= 0) errors.base = "Base must be greater than 0";
          if (values.height <= 0) errors.height = "Height must be greater than 0";
        }

        return errors;
      }}
      onSubmit={async (values, actions) => {
        console.log("New Chassis Created:", values);
        actions.resetForm();
      }}
    >
      <>{props.children}</>
    </Formik>
  );
};
