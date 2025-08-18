import { type FC } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { getMatricesByParentId, getMatrix } from "../(database)/queries";
import { Triad } from "./triad";

interface TriadGroupProps {
  id?: number;
}

export const TriadGroup: FC<TriadGroupProps> = (props) => {
  const triadData = useLiveQuery(async () => (props.id !== undefined ? await getMatrix(props.id) : undefined));
  const triadChildren = useLiveQuery(async () => await getMatricesByParentId(props.id));
  return (
    <group
      position={triadData ? [triadData.pose[0], triadData.pose[1], triadData.pose[2]] : [0, 0, 0]}
      rotation={triadData ? [triadData.pose[3], triadData.pose[4], triadData.pose[5]] : [0, 0, 0]}
    >
      {triadData && <Triad id={props.id ?? 0} />}
      {triadChildren?.map((triad) => <TriadGroup key={triad.id} id={triad.id} />)}
    </group>
  );
};
