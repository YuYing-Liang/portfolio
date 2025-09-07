import { type FC, useMemo } from "react";
import { Line } from "react-konva";

interface GridProps {
  width: number;
  height: number;
  size: number;
  color?: string;
  strokeWidth?: number;
}

export const Grid: FC<GridProps> = ({ width, height, size, color = "#ddd", strokeWidth = 1 }) => {
  const { verticals, horizontals } = useMemo(() => {
    const maxX = Math.floor(width / 2 / size);
    const maxY = Math.floor(height / 2 / size);

    const verticals = Array.from({ length: maxX * 2 + 1 }, (_, i) => (i - maxX) * size);
    const horizontals = Array.from({ length: maxY * 2 + 1 }, (_, i) => (i - maxY) * size);

    return { verticals, horizontals };
  }, [width, height, size]);

  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <>
      {verticals.map((x) => (
        <Line
          key={`v-${x}`}
          points={[x, -height / 2, x, height / 2]}
          x={centerX}
          y={centerY}
          stroke={color}
          strokeWidth={strokeWidth}
        />
      ))}

      {horizontals.map((y) => (
        <Line
          key={`h-${y}`}
          points={[-width / 2, y, width / 2, y]}
          x={centerX}
          y={centerY}
          stroke={color}
          strokeWidth={strokeWidth}
        />
      ))}
    </>
  );
};
