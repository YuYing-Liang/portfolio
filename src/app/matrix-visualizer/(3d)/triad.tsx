import { type FC } from "react";
import { DoubleSide } from "three";
import { DEFAULT_AXIS_COLORS } from "../constants";

interface TriadProps {
  x?: number;
  y?: number;
  z?: number;
  rx?: number;
  ry?: number;
  rz?: number;
}

interface TriadPropsRequired {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
}

const DEFAULT_TRIAD_PROPS: TriadPropsRequired = {
  x: 0,
  y: 0,
  z: 0,
  rx: 0,
  ry: 0,
  rz: 0,
};

export const Triad: FC<TriadProps> = (props) => {
  const propsWithDefaults: TriadPropsRequired = {
    x: props.x ?? DEFAULT_TRIAD_PROPS.x,
    y: props.y ?? DEFAULT_TRIAD_PROPS.y,
    z: props.z ?? DEFAULT_TRIAD_PROPS.z,
    rx: props.rx ?? DEFAULT_TRIAD_PROPS.rx,
    ry: props.ry ?? DEFAULT_TRIAD_PROPS.ry,
    rz: props.rz ?? DEFAULT_TRIAD_PROPS.rz,
  };
  return (
    <group
      position={[propsWithDefaults.x, propsWithDefaults.y, propsWithDefaults.z]}
      rotation={[propsWithDefaults.rx, propsWithDefaults.ry, propsWithDefaults.rz]}
      castShadow
    >
      <Axis axis="x" />
      <Axis axis="y" />
      <Axis axis="z" />
      <mesh position={[0, 0, AXIS_CYLINDER_Z_OFFSET]}>
        <sphereGeometry args={[AXIS_RADIUS * 3, 32, 32]} />
        <meshStandardMaterial color={DEFAULT_AXIS_COLORS.sphere} side={DoubleSide} />
      </mesh>
    </group>
  );
};

interface AxisProps {
  axis: "x" | "y" | "z";
}

const AXIS_LENGTH = 1;
const AXIS_RADIUS = 0.025;

const AXIS_ROTATION: Record<AxisProps["axis"], [number, number, number]> = {
  x: [0, 0, -Math.PI / 2],
  y: [Math.PI / 2, 0, 0],
  z: [0, 0, 0],
};

const AXIS_CYLINDER_Z_OFFSET = AXIS_RADIUS / 2;

const Axis: FC<AxisProps> = (props) => (
  <group rotation={AXIS_ROTATION[props.axis]} position={[0, 0, 0]} name={`${props.axis}-axis`}>
    <mesh position={[0, AXIS_LENGTH / 2 - AXIS_CYLINDER_Z_OFFSET, AXIS_CYLINDER_Z_OFFSET]}>
      <cylinderGeometry args={[AXIS_RADIUS, AXIS_RADIUS, AXIS_LENGTH, 32]} />
      <meshStandardMaterial color={DEFAULT_AXIS_COLORS[props.axis]} side={DoubleSide} />
    </mesh>
    <mesh position={[0, AXIS_LENGTH - AXIS_CYLINDER_Z_OFFSET, AXIS_CYLINDER_Z_OFFSET]}>
      <coneGeometry args={[0.05, AXIS_LENGTH / 6, 32]} />
      <meshStandardMaterial color={DEFAULT_AXIS_COLORS[props.axis]} />
    </mesh>
  </group>
);
