import { useThree } from "@react-three/fiber";
import { type FC, useEffect } from "react";
import { type Scene, type Camera } from "three";
import { useStates3d } from "../states";
import { useLiveQuery } from "dexie-react-hooks";
import { getSetting } from "../(database)/queries";
import { DEFAULT_SETTINGS, MOST_RECENT_SETTINGS_VERSION } from "../(database)/versions";

interface Provider3dProps {
  initializeCamera: (camera: Camera) => void;
  initializeScene: (scene: Scene) => void;
}

export const Provider3d: FC<Provider3dProps> = (props) => {
  const { camera, scene, size } = useThree();
  const { size: storedSize, setSize } = useStates3d();
  const gridSetting = useLiveQuery(
    async () => await getSetting(DEFAULT_SETTINGS[MOST_RECENT_SETTINGS_VERSION]![1]!.id),
  );

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
  }, [setSize, size, storedSize?.height, storedSize?.left, storedSize?.top, storedSize?.width]);

  useEffect(() => {
    if (gridSetting === undefined) return;
    const userSettingScale = gridSetting.value as number;
    scene.scale.set(userSettingScale, userSettingScale, userSettingScale);
  }, [gridSetting, scene.scale]);

  return <></>;
};
