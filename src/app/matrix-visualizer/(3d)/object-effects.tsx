import { EffectComposer, Outline } from "@react-three/postprocessing";
import { useStates3d, useTriadInfoPanelState } from "../states";
import { useEffect, useState } from "react";
import { Mesh, type Object3D, type Object3DEventMap } from "three";

export const ObjectEffectsProvider = () => {
  const triadInfoPanelStates = useTriadInfoPanelState();
  const states3d = useStates3d();
  const [selectedObjects, setSelectedObjects] = useState<Object3D<Object3DEventMap>[]>([]);

  useEffect(() => {
    if (triadInfoPanelStates.visibility) {
      const objects = states3d.scene?.getObjectByName(`triad-${triadInfoPanelStates.triadId}`);
      const meshes = objects?.children.flatMap((object) => (object instanceof Mesh ? object : object.children));
      if (meshes !== undefined) setSelectedObjects(meshes);
    } else {
      setSelectedObjects([]);
    }
  }, [states3d.scene, triadInfoPanelStates.triadId, triadInfoPanelStates.visibility]);

  return (
    <EffectComposer multisampling={8} autoClear={false}>
      <Outline selection={selectedObjects} visibleEdgeColor={0x05df72} hiddenEdgeColor={0x000000} edgeStrength={10} />
    </EffectComposer>
  );
};
