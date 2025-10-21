import type { CSSProperties } from "react";

interface TriangleProps {
  width?: number | string;
  thickness?: number | string;
  color?: string;
  style: CSSProperties;
}

const Triangle = ({
  width = "40px",
  thickness = "8px",
  color = "currentColor",
  style = {},
}: TriangleProps) => {
  return (
    <div
      style={{
        width,
        aspectRatio: 2,
        clipPath: `polygon(
        50% 0,
        100% 100%,
        0 100%,
        50% 0,
        50% ${thickness},
        calc(${thickness}/(2 - sqrt(2))) calc(100% - ${thickness}/sqrt(2)),
        calc(100% - ${thickness}/(2 - sqrt(2))) calc(100% - ${thickness}/sqrt(2)),
        50% ${thickness}`,
        background: color,
        ...style,
      }}
    ></div>
  );
};

export default Triangle;
