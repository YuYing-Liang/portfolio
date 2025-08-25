import { useRef, useState, type FC } from "react";
import { DoubleSide, type Group, Vector3 } from "three";
import { DEFAULT_AXIS_COLORS } from "../constants";
import { useCursor } from "@react-three/drei";
import { useTriadInfoPanelState } from "../states";
import { useThree } from "@react-three/fiber";
import { convert3DpositionTo2D } from "../helpers";
import { type TriadColors } from "../types";

interface TriadProps {
  id: number;
  colors?: TriadColors;
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
  colors: TriadColors;
}

const DEFAULT_TRIAD_PROPS: TriadPropsRequired = {
  x: 0,
  y: 0,
  z: 0,
  rx: 0,
  ry: 0,
  rz: 0,
  colors: DEFAULT_AXIS_COLORS,
};

export const Triad: FC<TriadProps> = (props) => {
  const { camera, size } = useThree();
  const triadInfoPanelState = useTriadInfoPanelState((state) => state);

  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const triadGroupRef = useRef<Group | null>(null);
  const propsWithDefaults: TriadPropsRequired = {
    x: props.x ?? DEFAULT_TRIAD_PROPS.x,
    y: props.y ?? DEFAULT_TRIAD_PROPS.y,
    z: props.z ?? DEFAULT_TRIAD_PROPS.z,
    rx: props.rx ?? DEFAULT_TRIAD_PROPS.rx,
    ry: props.ry ?? DEFAULT_TRIAD_PROPS.ry,
    rz: props.rz ?? DEFAULT_TRIAD_PROPS.rz,
    colors: props.colors ?? DEFAULT_TRIAD_PROPS.colors,
  };

  useCursor(hovered);

  const handleClick = () => {
    setSelected((currentSelectState) => !currentSelectState);
    if (triadGroupRef.current !== null) {
      if (selected) triadInfoPanelState.hideTriadPanel();
      else {
        const triadPositionInWorldSpace = new Vector3();
        triadGroupRef.current.getWorldPosition(triadPositionInWorldSpace);
        camera.position.set(
          triadPositionInWorldSpace.x + 1.5,
          triadPositionInWorldSpace.y + 1.5,
          triadPositionInWorldSpace.z + 3,
        );
        camera.lookAt(triadPositionInWorldSpace.x, triadPositionInWorldSpace.y, triadPositionInWorldSpace.z);

        const triadPosition = triadGroupRef.current.position.clone().project(camera);
        triadInfoPanelState.showTriadPanel(convert3DpositionTo2D(triadPosition, size), props.id);
      }
    }
  };

  return (
    <>
      <group
        name={`triad-${props.id}`}
        ref={triadGroupRef}
        position={[propsWithDefaults.x, propsWithDefaults.y, propsWithDefaults.z]}
        rotation={[propsWithDefaults.rx, propsWithDefaults.ry, propsWithDefaults.rz]}
        castShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <Axis axis="x" id={props.id} color={propsWithDefaults.colors.x} />
        <Axis axis="y" id={props.id} color={propsWithDefaults.colors.y} />
        <Axis axis="z" id={props.id} color={propsWithDefaults.colors.z} />
        <mesh name={`triad-${props.id}-sphere`} position={[0, 0, AXIS_CYLINDER_Z_OFFSET]} onClick={handleClick}>
          <sphereGeometry args={[AXIS_RADIUS * 3, 32, 32]} />
          <meshStandardMaterial color={propsWithDefaults.colors.sphere} side={DoubleSide} />
        </mesh>
      </group>
    </>
  );
};

interface AxisProps {
  axis: "x" | "y" | "z";
  color: string;
  id: TriadProps["id"];
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
    <mesh
      name={`triad-${props.id}-cylinder-${props.axis}-axis`}
      position={[0, AXIS_LENGTH / 2 - AXIS_CYLINDER_Z_OFFSET, AXIS_CYLINDER_Z_OFFSET]}
    >
      <cylinderGeometry args={[AXIS_RADIUS, AXIS_RADIUS, AXIS_LENGTH, 32]} />
      <meshStandardMaterial color={props.color} side={DoubleSide} />
    </mesh>
    <mesh
      name={`triad-${props.id}-cone-${props.axis}-axis`}
      position={[0, AXIS_LENGTH - AXIS_CYLINDER_Z_OFFSET, AXIS_CYLINDER_Z_OFFSET]}
    >
      <coneGeometry args={[0.05, AXIS_LENGTH / 6, 32]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  </group>
);
