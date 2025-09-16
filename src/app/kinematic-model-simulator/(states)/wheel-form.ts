import { create } from "zustand";
import { type Wheel } from "../(database)/tables";

export type WheelFormValues = {
  id?: Wheel["id"];
  name: Wheel["name"];
  length: Wheel["length"];
  width: Wheel["width"];
  x: number;
  y: number;
  rotation: number;
};

const DEFAULT_WHEEL_FORM_VALUES: WheelFormValues = {
  name: "New Wheel",
  length: 40,
  width: 20,
  x: 0,
  y: 0,
  rotation: 0,
};

type WheelFormStore = {
  values: WheelFormValues;
  errors: Partial<Record<keyof WheelFormValues, string>>;
  setFieldValue: <K extends keyof WheelFormValues>(field: K, value: WheelFormValues[K]) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  validate: () => void;
  handleSubmit: () => void;
  resetForm: () => void;
  setInitialValues: (initial?: WheelFormValues) => void;
};

export const useWheelForm = create<WheelFormStore>((set, get) => ({
  values: { ...DEFAULT_WHEEL_FORM_VALUES },
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
    get().setFieldValue(name as keyof WheelFormValues, value);
  },
  validate: () => {
    const values = get().values;
    const errors: Partial<Record<keyof WheelFormValues, string>> = {};

    if (!values.name.trim()) errors.name = "Wheel name is required";
    if (values.length <= 0) errors.length = "Length must be greater than 0";
    if (values.width <= 0) errors.width = "Width must be greater than 0";
    // Optionally validate x, y, rotation if needed

    set({ errors });
  },
  handleSubmit: () => {
    get().validate();
    if (Object.keys(get().errors).length === 0) {
      console.log("New Wheel Created:", get().values);
      get().resetForm();
    }
  },
  resetForm: () => set({ values: { ...DEFAULT_WHEEL_FORM_VALUES }, errors: {} }),
  setInitialValues: (initial) => {
    set({
      values: {
        name: initial?.name ?? DEFAULT_WHEEL_FORM_VALUES.name,
        length: initial?.length ?? DEFAULT_WHEEL_FORM_VALUES.length,
        width: initial?.width ?? DEFAULT_WHEEL_FORM_VALUES.width,
        x: initial?.x ?? DEFAULT_WHEEL_FORM_VALUES.x,
        y: initial?.y ?? DEFAULT_WHEEL_FORM_VALUES.y,
        rotation: initial?.rotation ?? DEFAULT_WHEEL_FORM_VALUES.rotation,
        id: initial?.id,
      },
    });
    get().validate();
  },
}));
