import { useRef, useState, type FC } from "react";
import { DoubleSide, type Group } from "three";
import { BASE_FRAME_MATRIX, DEFAULT_AXIS_COLORS } from "../constants";
import { useCursor } from "@react-three/drei";
import { useTriadInfoPanelState } from "../states";
import { useThree } from "@react-three/fiber";
import { lookAtTriad } from "../helpers";
import { type TriadColors } from "../types";
import { updateMatrix } from "../(database)/queries";

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
  const { camera } = useThree();
  const triadInfoPanelState = useTriadInfoPanelState();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const triadGroupRef = useRef<Group | null>(null);

  const isSelected = false; // triadInfoPanelState.triadId === props.id;
  const isTriadBase = triadInfoPanelState.triadId === BASE_FRAME_MATRIX.id;
  const propsWithDefaults: TriadPropsRequired = {
    x: props.x ?? DEFAULT_TRIAD_PROPS.x,
    y: props.y ?? DEFAULT_TRIAD_PROPS.y,
    z: props.z ?? DEFAULT_TRIAD_PROPS.z,
    rx: props.rx ?? DEFAULT_TRIAD_PROPS.rx,
    ry: props.ry ?? DEFAULT_TRIAD_PROPS.ry,
    rz: props.rz ?? DEFAULT_TRIAD_PROPS.rz,
    colors: props.colors ?? DEFAULT_TRIAD_PROPS.colors,
  };

  const handleClick = () => {
    if (triadGroupRef.current !== null) {
      lookAtTriad(triadGroupRef.current, camera);
      triadInfoPanelState.showTriadPanel(props.id);
    }
  };

  const handleTranslate = (axis: AxisProps["axis"]) => async (translation: number) => {
    await updateMatrix(props.id, {
      pose: [
        axis === "x" ? translation : propsWithDefaults.x,
        axis === "y" ? translation : propsWithDefaults.y,
        axis === "z" ? translation : propsWithDefaults.z,
        propsWithDefaults.rx,
        propsWithDefaults.ry,
        propsWithDefaults.rz,
      ],
    });
  };

  const handleRotate = (axis: AxisProps["axis"]) => async (rotation: number) => {
    await updateMatrix(props.id, {
      pose: [
        propsWithDefaults.x,
        propsWithDefaults.y,
        propsWithDefaults.z,
        axis === "x" ? rotation : propsWithDefaults.rx,
        axis === "y" ? rotation : propsWithDefaults.ry,
        axis === "z" ? rotation : propsWithDefaults.rz,
      ],
    });
  };

  useCursor(isHovered);

  return (
    <>
      <group
        name={`triad-${props.id}`}
        ref={triadGroupRef}
        position={[propsWithDefaults.x, propsWithDefaults.y, propsWithDefaults.z]}
        rotation={[propsWithDefaults.rx, propsWithDefaults.ry, propsWithDefaults.rz]}
        castShadow
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <Axis
          axis="x"
          id={props.id}
          color={propsWithDefaults.colors.x}
          onMove={handleTranslate("x")}
          isMoving={false && !isTriadBase}
        />
        <Axis
          axis="y"
          id={props.id}
          color={propsWithDefaults.colors.y}
          onMove={handleTranslate("y")}
          isMoving={false && !isTriadBase}
        />
        <Axis
          axis="z"
          id={props.id}
          color={propsWithDefaults.colors.z}
          onMove={handleTranslate("z")}
          isMoving={false && !isTriadBase}
        />
        {isSelected && !isTriadBase && (
          <RotationArc
            axis="x"
            color={propsWithDefaults.colors.x}
            id={props.id}
            onMove={handleRotate("x")}
            isMoving={false && !isTriadBase}
          />
        )}
        {isSelected && !isTriadBase && (
          <RotationArc
            axis="y"
            color={propsWithDefaults.colors.y}
            id={props.id}
            onMove={handleRotate("y")}
            isMoving={false && !isTriadBase}
          />
        )}
        {isSelected && !isTriadBase && (
          <RotationArc
            axis="z"
            color={propsWithDefaults.colors.z}
            id={props.id}
            onMove={handleRotate("z")}
            isMoving={false && !isTriadBase}
          />
        )}
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
  isMoving: boolean;
  onMove: (movementValue: number) => void;
}

const AXIS_LENGTH = 1;
const AXIS_RADIUS = 0.025;

const AXIS_ROTATION: Record<AxisProps["axis"], [number, number, number]> = {
  x: [0, 0, -Math.PI / 2],
  y: [0, 0, 0],
  z: [Math.PI / 2, 0, 0],
};

const AXIS_CYLINDER_Z_OFFSET = AXIS_RADIUS / 2;
const AID_AXIS_LINE_RADIUS = AXIS_RADIUS / 4;
const AID_AXIS_LINE_LENGTH = AXIS_LENGTH * 3;

const Axis: FC<AxisProps> = (props) => (
  <group rotation={AXIS_ROTATION[props.axis]} name={`${props.axis}-axis`}>
    <mesh
      name={`triad-${props.id}-cylinder-${props.axis}-axis`}
      position={[0, AXIS_LENGTH / 2 - AXIS_CYLINDER_Z_OFFSET, AXIS_CYLINDER_Z_OFFSET]}
    >
      <cylinderGeometry args={[AXIS_RADIUS, AXIS_RADIUS, AXIS_LENGTH, 32]} />
      <meshStandardMaterial color={props.color} side={DoubleSide} />
    </mesh>
    {props.isMoving && (
      <mesh
        name={`triad-${props.id}-aid-line-${props.axis}-axis`}
        position={[0, AXIS_LENGTH / 2 - AXIS_CYLINDER_Z_OFFSET, AXIS_CYLINDER_Z_OFFSET]}
      >
        <cylinderGeometry args={[AID_AXIS_LINE_RADIUS, AID_AXIS_LINE_RADIUS, AID_AXIS_LINE_LENGTH, 32]} />
        <meshStandardMaterial color={props.color} side={DoubleSide} />
      </mesh>
    )}
    <mesh
      name={`triad-${props.id}-cone-${props.axis}-axis`}
      position={[0, AXIS_LENGTH - AXIS_CYLINDER_Z_OFFSET, AXIS_CYLINDER_Z_OFFSET]}
    >
      <coneGeometry args={[0.05, AXIS_LENGTH / 6, 32]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  </group>
);

const ARC_ROTATION: Record<AxisProps["axis"], [number, number, number]> = {
  x: [-AXIS_RADIUS * 4, -Math.PI / 2, 0],
  y: [0, 0, AXIS_RADIUS * 5],
  z: [Math.PI / 2, 0, AXIS_RADIUS * 5.5],
};

const ARC_GAP = AXIS_RADIUS * 10;
const ARC_RADIUS = 1.1;
const TORUS_RADIUS = AXIS_RADIUS / 2;

const RotationArc: FC<AxisProps> = (props) => (
  <group rotation={ARC_ROTATION[props.axis]} name={`${props.axis}-arc`}>
    {props.isMoving && (
      <mesh
        rotation={[0, 0, Math.PI / 2 - ARC_GAP]}
        position={[Math.sin(ARC_GAP) * ARC_RADIUS, Math.cos(ARC_GAP) * ARC_RADIUS, 0]}
      >
        <sphereGeometry args={[AXIS_RADIUS * 1.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 2]} />
        <meshStandardMaterial color={props.color} />
      </mesh>
    )}

    <mesh>
      <torusGeometry args={[ARC_RADIUS, TORUS_RADIUS, 16, 100, Math.PI / 2 - ARC_GAP]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
    <mesh
      rotation={[0, 0, Math.PI / 2 - ARC_GAP]}
      position={[Math.sin(ARC_GAP) * ARC_RADIUS, Math.cos(ARC_GAP) * ARC_RADIUS, 0]}
    >
      <sphereGeometry args={[TORUS_RADIUS - 0.00025, 32, 32, 0, Math.PI * 2, 0, Math.PI * 2]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
    <mesh rotation={[0, 0, Math.PI / 2 - ARC_GAP]} position={[ARC_RADIUS, 0, 0]}>
      <sphereGeometry args={[TORUS_RADIUS - 0.00025, 32, 32, 0, Math.PI * 2, 0, Math.PI * 2]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  </group>
);
