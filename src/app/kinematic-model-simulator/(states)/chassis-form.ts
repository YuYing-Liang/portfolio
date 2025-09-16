import { create } from "zustand";
import { getRotationFromMatrix } from "../helpers";
import { type Chassis } from "../(database)/tables";

export type ChassisFormValues = {
  id?: Chassis["id"];
  name: Chassis["name"];
  type: Chassis["type"] | "";
  rotation: number;
  radius: number;
  length: number;
  width: number;
  base: number;
  height: number;
};

const DEFAULT_CHASSIS_FORM_VALUES: ChassisFormValues = {
  name: "",
  type: "circular",
  rotation: 0,
  radius: 25,
  length: 25,
  width: 25,
  base: 25,
  height: 25,
};

type ChassisFormStore = {
  values: ChassisFormValues;
  errors: Partial<Record<keyof ChassisFormValues, string>>;
  setFieldValue: <K extends keyof ChassisFormValues>(field: K, value: ChassisFormValues[K]) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  validate: () => void;
  handleSubmit: () => void;
  resetForm: () => void;
  setInitialValues: (initial?: Chassis) => void;
};

export const useChassisForm = create<ChassisFormStore>((set, get) => ({
  values: { ...DEFAULT_CHASSIS_FORM_VALUES },
  errors: {},
  setFieldValue: (field, value) => {
    set((state) => ({
      values: { ...state.values, [field]: value },
    }));
    if (field !== "id") {
      get().validate();
    }
  },
  handleChange: (e) => {
    const { name, value } = e.target;
    get().setFieldValue(name as keyof ChassisFormValues, value);
  },
  validate: () => {
    const values = get().values;
    const errors: Partial<Record<keyof ChassisFormValues, string>> = {};

    if (!values.name.trim()) errors.name = "Chassis name is required";
    if (!values.type.trim()) errors.type = "Chassis type is required";
    if (values.type === "circular") {
      if (values.radius <= 0) errors.radius = "Radius must be greater than 0";
    } else if (values.type === "rectangular") {
      if (values.length <= 0) errors.length = "Length must be greater than 0";
      if (values.width <= 0) errors.width = "Width must be greater than 0";
    } else if (values.type === "triangular") {
      if (values.base <= 0) errors.base = "Base must be greater than 0";
      if (values.height <= 0) errors.height = "Height must be greater than 0";
    }

    set({ errors });
  },
  handleSubmit: () => {
    get().validate();
    if (Object.keys(get().errors).length === 0) {
      console.log("New Chassis Created:", get().values);
      get().resetForm();
    }
  },
  resetForm: () => set({ values: { ...DEFAULT_CHASSIS_FORM_VALUES }, errors: {} }),
  setInitialValues: (initial) => {
    set({
      values: {
        name: initial?.name ?? DEFAULT_CHASSIS_FORM_VALUES.name,
        type: initial?.type ?? DEFAULT_CHASSIS_FORM_VALUES.type,
        rotation: initial?.frame ? getRotationFromMatrix(initial.frame) : DEFAULT_CHASSIS_FORM_VALUES.rotation,
        radius: initial?.type === "circular" ? initial.radius : DEFAULT_CHASSIS_FORM_VALUES.radius,
        length: initial?.type === "rectangular" ? initial.length : DEFAULT_CHASSIS_FORM_VALUES.length,
        width: initial?.type === "rectangular" ? initial.width : DEFAULT_CHASSIS_FORM_VALUES.width,
        base: initial?.type === "triangular" ? initial.base : DEFAULT_CHASSIS_FORM_VALUES.base,
        height: initial?.type === "triangular" ? initial.height : DEFAULT_CHASSIS_FORM_VALUES.height,
      },
    });
    get().validate();
  },
}));
