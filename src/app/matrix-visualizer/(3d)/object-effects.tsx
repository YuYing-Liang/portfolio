import { EffectComposer, Outline } from "@react-three/postprocessing";
import { useStates3d, useTriadInfoPanelState } from "../states";
import { useEffect, useState } from "react";
import { type Object3D, type Object3DEventMap } from "three";
import { useLiveQuery } from "dexie-react-hooks";
import { getMatricesByParentId, getMatrix, getSetting } from "../(database)/queries";
import { DEFAULT_SETTINGS, MOST_RECENT_SETTINGS_VERSION } from "../(database)/versions";
import { DEFAULT_PARENT_TRIAD_HIGHLIGHT_COLOR, DEFAULT_TRIAD_FOCUS_COLOR } from "../constants";
import { getTriadMeshes } from "../helpers";

export const ObjectEffectsProvider = () => {
  const triadInfoPanelStates = useTriadInfoPanelState();
  const states3d = useStates3d();
  const [selectedTriadObjects, setSelectedTriadObjects] = useState<Object3D<Object3DEventMap>[]>([]);
  const [selectedParentTriadObjects, setSelectedParentTriadObjects] = useState<Object3D<Object3DEventMap>[]>([]);

  const triadFocusColor = useLiveQuery(
    async () => await getSetting(DEFAULT_SETTINGS[MOST_RECENT_SETTINGS_VERSION]![3]!.id),
  );
  const parentTriadFocusColor = useLiveQuery(
    async () => await getSetting(DEFAULT_SETTINGS[MOST_RECENT_SETTINGS_VERSION]![4]!.id),
  );

  useEffect(
    function changeHighlightedTriads() {
      async function getTriadObjectsToHighlight() {
        const selectedTriad = await getMatrix(triadInfoPanelStates.triadId);
        if (selectedTriad === undefined) {
          setSelectedTriadObjects([]);
          setSelectedParentTriadObjects([]);
          return;
        }
        if (triadInfoPanelStates.showChildren) {
          const childrenTriads = await getMatricesByParentId(selectedTriad.id);
          setSelectedTriadObjects(childrenTriads.flatMap((triad) => getTriadMeshes(states3d.scene, triad.id) ?? []));
          setSelectedParentTriadObjects(getTriadMeshes(states3d.scene, selectedTriad.id) ?? []);
        } else {
          setSelectedTriadObjects(getTriadMeshes(states3d.scene, selectedTriad.id) ?? []);
          setSelectedParentTriadObjects(getTriadMeshes(states3d.scene, selectedTriad.parent ?? 0) ?? []);
        }
      }
      void getTriadObjectsToHighlight();
    },
    [states3d.scene, triadInfoPanelStates],
  );

  return (
    <EffectComposer multisampling={8} autoClear={false}>
      <Outline
        selectionLayer={1}
        selection={selectedTriadObjects}
        visibleEdgeColor={parseInt(
          (triadFocusColor !== undefined ? (triadFocusColor.value as string) : DEFAULT_TRIAD_FOCUS_COLOR).slice(1),
          16,
        )}
        hiddenEdgeColor={0x000000}
        edgeStrength={10}
      />
      <Outline
        selectionLayer={2}
        selection={selectedParentTriadObjects}
        visibleEdgeColor={parseInt(
          (parentTriadFocusColor !== undefined
            ? (parentTriadFocusColor.value as string)
            : DEFAULT_PARENT_TRIAD_HIGHLIGHT_COLOR
          ).slice(1),
          16,
        )}
        hiddenEdgeColor={0x000000}
        edgeStrength={10}
      />
    </EffectComposer>
  );
};
