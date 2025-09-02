import * as TablerIcons from "@tabler/icons-react";

export type DynamicIconProps = {
  name: keyof typeof TablerIcons;
  size?: number;
  color?: string;
  className?: string;
};

export const DynamicTablerIcon = ({ name, color, className, size = 24 }: DynamicIconProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (TablerIcons as unknown as Record<string, React.FC<any>>)[name];

  if (!IconComponent) {
    return <div>Icon not found: {name}</div>;
  }

  return <IconComponent size={size} color={color} className={className} />;
};
