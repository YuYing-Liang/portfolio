import { create } from "zustand";
import { getRotationFromMatrix, radiansToDegrees, roundNumber } from "../helpers";
import { type Chassis } from "../(database)/tables";

export type ChassisFormValues = {
  id?: Chassis["id"];
  name: Chassis["name"];
  type: Chassis["type"];
  rotation: number;
  radius: number;
  length: number;
  width: number;
  base: number;
  height: number;
};

export const DEFAULT_CHASSIS_FORM_VALUES: ChassisFormValues = {
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
  setErrors: (errors: Partial<Record<keyof ChassisFormValues, string>>) => void;
  setFieldValue: <K extends keyof ChassisFormValues>(field: K, value: ChassisFormValues[K]) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  validate: () => void;
  handleSubmit: (submitCallback: (values: ChassisFormValues) => Promise<boolean>) => () => Promise<void>;
  resetForm: (onlyResetForm?: boolean) => void;
  setInitialValues: (initial?: Chassis) => void;
};

export const useChassisForm = create<ChassisFormStore>((set, get) => ({
  values: { ...DEFAULT_CHASSIS_FORM_VALUES },
  errors: {},
  setErrors: (errors) => set({ errors }),
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
  handleSubmit: (submitCallback) => async () => {
    get().validate();
    if (Object.keys(get().errors).length === 0) {
      const submitResult = await submitCallback(get().values);
      if (!submitResult) return;
    }
  },
  resetForm: (onlyResetForm) =>
    set((currState) => ({
      values: {
        ...DEFAULT_CHASSIS_FORM_VALUES,
        ...(onlyResetForm ? { id: currState.values.id, type: currState.values.type } : {}),
      },
      errors: {},
    })),
  setInitialValues: (initial) => {
    set({
      values: {
        id: initial?.id,
        name: initial?.name ?? DEFAULT_CHASSIS_FORM_VALUES.name,
        type: initial?.type ?? DEFAULT_CHASSIS_FORM_VALUES.type,
        rotation: initial?.frame
          ? roundNumber(radiansToDegrees(getRotationFromMatrix(initial.frame)))
          : DEFAULT_CHASSIS_FORM_VALUES.rotation,
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
