import { type FC, useMemo } from "react";
import { Line } from "react-konva";

interface GridProps {
  width: number;
  height: number;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const Grid: FC<GridProps> = ({ width, height, size = 40, color = "#ddd", strokeWidth = 1 }) => {
  const verticals = useMemo(
    () => Array.from({ length: Math.floor(width / size) + 1 }, (_, i) => i * size),
    [width, size],
  );
  const horizontals = useMemo(
    () => Array.from({ length: Math.floor(height / size) + 1 }, (_, i) => i * size),
    [height, size],
  );

  return (
    <>
      {verticals.map((x) => (
        <Line key={`v-${x}`} points={[x, 0, x, height]} stroke={color} strokeWidth={strokeWidth} />
      ))}
      {horizontals.map((y) => (
        <Line key={`h-${y}`} points={[0, y, width, y]} stroke={color} strokeWidth={strokeWidth} />
      ))}
    </>
  );
};
