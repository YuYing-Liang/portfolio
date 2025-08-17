import { type MutableRefObject, useRef, useState, type FC } from "react";
import { DoubleSide, type Group, type Mesh, Object3D } from "three";
import { DEFAULT_AXIS_COLORS } from "../constants";
import { useCursor } from "@react-three/drei";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import { useTriadInfoPanelState } from "../states";
import { useThree } from "@react-three/fiber";
import { convert3DpositionTo2D } from "../helpers";

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
  const { camera, size } = useThree();
  const triadInfoPanelState = useTriadInfoPanelState((state) => state);

  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const triadRefs = {
    sphere: useRef<Mesh | null>(null),
    xCylinder: useRef<Mesh | null>(null),
    xCone: useRef<Mesh | null>(null),
    yCylinder: useRef<Mesh | null>(null),
    yCone: useRef<Mesh | null>(null),
    zCylinder: useRef<Mesh | null>(null),
    zCone: useRef<Mesh | null>(null),
  };
  const propsWithDefaults: TriadPropsRequired = {
    x: props.x ?? DEFAULT_TRIAD_PROPS.x,
    y: props.y ?? DEFAULT_TRIAD_PROPS.y,
    z: props.z ?? DEFAULT_TRIAD_PROPS.z,
    rx: props.rx ?? DEFAULT_TRIAD_PROPS.rx,
    ry: props.ry ?? DEFAULT_TRIAD_PROPS.ry,
    rz: props.rz ?? DEFAULT_TRIAD_PROPS.rz,
  };

  useCursor(hovered);

  const handleClick = () => {
    setSelected((currentSelectState) => !currentSelectState);
    if (triadRefs.sphere.current !== null) {
      const triadPosition = triadRefs.sphere.current.position.clone().project(camera);
      if (selected) triadInfoPanelState.hideTriadPanel();
      else triadInfoPanelState.showTriadPanel(convert3DpositionTo2D(triadPosition, size));
    }
  };

  return (
    <>
      <group
        position={[propsWithDefaults.x, propsWithDefaults.y, propsWithDefaults.z]}
        rotation={[propsWithDefaults.rx, propsWithDefaults.ry, propsWithDefaults.rz]}
        castShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <Axis axis="x" cylinderRef={triadRefs.xCylinder} coneRef={triadRefs.xCone} />
        <Axis axis="y" cylinderRef={triadRefs.yCylinder} coneRef={triadRefs.yCone} />
        <Axis axis="z" cylinderRef={triadRefs.zCylinder} coneRef={triadRefs.zCone} />
        <mesh position={[0, 0, AXIS_CYLINDER_Z_OFFSET]} ref={triadRefs.sphere} onClick={handleClick}>
          <sphereGeometry args={[AXIS_RADIUS * 3, 32, 32]} />
          <meshStandardMaterial color={DEFAULT_AXIS_COLORS.sphere} side={DoubleSide} />
        </mesh>
      </group>
      {selected && (
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            selection={Object.values(triadRefs)}
            visibleEdgeColor={0x05df72}
            hiddenEdgeColor={0x000000}
            edgeStrength={10}
          />
        </EffectComposer>
      )}
    </>
  );
};

interface AxisProps {
  axis: "x" | "y" | "z";
  cylinderRef: MutableRefObject<Mesh | null>;
  coneRef: MutableRefObject<Mesh | null>;
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
    <mesh ref={props.cylinderRef} position={[0, AXIS_LENGTH / 2 - AXIS_CYLINDER_Z_OFFSET, AXIS_CYLINDER_Z_OFFSET]}>
      <cylinderGeometry args={[AXIS_RADIUS, AXIS_RADIUS, AXIS_LENGTH, 32]} />
      <meshStandardMaterial color={DEFAULT_AXIS_COLORS[props.axis]} side={DoubleSide} />
    </mesh>
    <mesh ref={props.coneRef} position={[0, AXIS_LENGTH - AXIS_CYLINDER_Z_OFFSET, AXIS_CYLINDER_Z_OFFSET]}>
      <coneGeometry args={[0.05, AXIS_LENGTH / 6, 32]} />
      <meshStandardMaterial color={DEFAULT_AXIS_COLORS[props.axis]} />
    </mesh>
  </group>
);
