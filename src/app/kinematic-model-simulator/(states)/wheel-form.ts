import { create } from "zustand";
import { type Wheel } from "../(database)/tables";
import { getRotationFromMatrix, radiansToDegrees, roundNumber } from "../helpers";

export type WheelFormValues = {
  id?: Wheel["id"];
  name: Wheel["name"];
  length: Wheel["length"];
  width: Wheel["width"];
  x: number;
  y: number;
  rotation: number;
  rollerRotation?: number;
};

export const DEFAULT_WHEEL_FORM_VALUES: WheelFormValues = {
  name: "New Wheel",
  length: 40,
  width: 20,
  x: 0,
  y: 0,
  rotation: 0,
};

export type WheelFormStore = {
  values: WheelFormValues;
  errors: Partial<Record<keyof WheelFormValues, string>>;
  setErrors: (errors: Partial<Record<keyof WheelFormValues, string>>) => void;
  setFieldValue: <K extends keyof WheelFormValues>(field: K, value: WheelFormValues[K]) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  validate: () => void;
  handleSubmit: (submitCallback: (values: WheelFormValues) => Promise<boolean>) => () => Promise<void>;
  resetForm: () => void;
  setInitialValues: (initial?: Wheel) => void;
};

export const useWheelForm = create<WheelFormStore>((set, get) => ({
  values: { ...DEFAULT_WHEEL_FORM_VALUES },
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
  handleSubmit: (submitCallback) => async () => {
    get().validate();
    if (Object.keys(get().errors).length === 0) {
      const submitResult = await submitCallback(get().values);
      if (!submitResult) return;
    }
  },
  resetForm: () => set({ values: { ...DEFAULT_WHEEL_FORM_VALUES }, errors: {} }),
  setInitialValues: (initial) => {
    set({
      values: {
        name: initial?.name ?? DEFAULT_WHEEL_FORM_VALUES.name,
        length: initial?.length ?? DEFAULT_WHEEL_FORM_VALUES.length,
        width: initial?.width ?? DEFAULT_WHEEL_FORM_VALUES.width,
        x: initial?.frame ? initial.frame[2] : DEFAULT_WHEEL_FORM_VALUES.x,
        y: initial?.frame ? initial.frame[5] : DEFAULT_WHEEL_FORM_VALUES.y,
        rotation: initial?.frame
          ? roundNumber(radiansToDegrees(getRotationFromMatrix(initial.frame)))
          : DEFAULT_WHEEL_FORM_VALUES.rotation,
        rollerRotation: initial?.roller
          ? roundNumber(radiansToDegrees(getRotationFromMatrix(initial.roller)))
          : undefined,
        id: initial?.id,
      },
    });
    get().validate();
  },
}));
