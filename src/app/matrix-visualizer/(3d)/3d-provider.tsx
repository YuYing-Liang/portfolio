import { useThree } from "@react-three/fiber";
import { type FC, useEffect } from "react";
import { type Scene, type Camera } from "three";
import { useStates3d } from "../states";

interface Provider3dProps {
  initializeCamera: (camera: Camera) => void;
  initializeScene: (scene: Scene) => void;
}

export const Provider3d: FC<Provider3dProps> = (props) => {
  const { camera, scene, size } = useThree();
  const { size: storedSize, setSize } = useStates3d();

  useEffect(() => {
    props.initializeCamera(camera);
    props.initializeScene(scene);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      size.width === storedSize?.width &&
      size.height === storedSize?.height &&
      size.top === storedSize?.top &&
      size.left === storedSize?.left
    )
      return;
    setSize(size);
  }, [setSize, size]);

  return <></>;
};
