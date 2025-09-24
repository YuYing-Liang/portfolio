import { useMemo, type FC } from "react";
import { Group, Layer, Line, Text } from "react-konva";

interface GridProps {
  width: number;
  height: number;
  size: number;
  color?: string;
  secondaryColor?: string;
  strokeWidth?: number;
}

export const GridXYLabelled: FC<GridProps> = ({ width, height, size, color = "#7F8C8D", strokeWidth = 1 }) => {
  const { verticalMarkers, horizontalMarkers } = useMemo(() => {
    const maxX = Math.floor(width / 2 / size);
    const maxY = Math.floor(height / 2 / size);

    const verticalMarkers = Array.from({ length: maxX * 2 + 1 }, (_, i) => (i - maxX) * size);
    const horizontalMarkers = Array.from({ length: maxY * 2 + 1 }, (_, i) => (i - maxY) * size);

    return { verticalMarkers, horizontalMarkers };
  }, [width, height, size]);

  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <Group listening={false}>
      <Line
        key="x-axis"
        points={[0, -height / 2, 0, height / 2]}
        x={centerX}
        y={centerY}
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Line
        key="y-axis"
        points={[-width / 2, 0, width / 2, 0]}
        x={centerX}
        y={centerY}
        stroke={color}
        strokeWidth={strokeWidth}
      />
      {verticalMarkers.map((x) => (
        <Line
          key={`v-markers-${x}`}
          points={[x, -5, x, 5]}
          x={centerX}
          y={centerY}
          stroke={color}
          strokeWidth={strokeWidth}
        />
      ))}
      {horizontalMarkers.map((y) => (
        <Line
          key={`h-markers-${y}`}
          points={[-5, y, 5, y]}
          x={centerX}
          y={centerY}
          stroke={color}
          strokeWidth={strokeWidth}
        />
      ))}
    </Group>
  );
};
