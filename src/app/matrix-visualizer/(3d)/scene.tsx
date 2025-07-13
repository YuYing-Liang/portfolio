import { OrbitControls } from "@react-three/drei";
import { DoubleSide } from "three";

export const Scene = () => (
  <>
    <OrbitControls />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]} receiveShadow>
      <planeGeometry args={[100, 100, 500, 500]} />
      <meshStandardMaterial color="#fff" side={DoubleSide} wireframe />
    </mesh>
    <ambientLight intensity={0.5} />
    <directionalLight position={[10, 10, 10]} color="#fff" />
  </>
);