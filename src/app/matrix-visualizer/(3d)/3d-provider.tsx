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
  const setCanvasSize = useStates3d((state) => state.setSize);

  useEffect(() => {
    props.initializeCamera(camera);
    props.initializeScene(scene);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCanvasSize(size);
  }, [setCanvasSize, size]);

  return <></>;
};
