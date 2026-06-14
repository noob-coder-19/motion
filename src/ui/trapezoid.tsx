interface TrapezoidProps extends React.HTMLAttributes<HTMLDivElement> {
  angle?: number | string;
  color?: string;
  height?: number | string;
  ref?: React.RefObject<HTMLDivElement>;
  style?: React.CSSProperties;
  variant?: "top" | "bottom" | "left" | "right";
  width?: number | string;
}

const Trapezoid = ({
  width = "40px",
  height = "40px",
  angle = "8px",
  color = "currentColor",
  style = {},
  variant = "top",
  ref,
  className,
}: TrapezoidProps) => {
  let clipPath = "";
  if (variant === "top") {
    clipPath = `polygon(${angle} 0,calc(100% - ${angle}) 0,100% 100%,0 100%)`;
  } else if (variant === "bottom") {
    clipPath = `polygon(${angle} 100%,calc(100% - ${angle}) 100%,100% 0,0 0)`;
  } else if (variant === "left") {
    clipPath = `polygon(0 ${angle},0 calc(100% - ${angle}),100% 100%,100% 0)`;
  } else if (variant === "right") {
    clipPath = `polygon(100% ${angle},100% calc(100% - ${angle}),0 100%,0 0)`;
  }

  return (
    <div
      className={className}
      ref={ref}
      style={{
        height,
        width,
        background: color,
        clipPath,
        ...style,
      }}
    />
  );
};

export default Trapezoid;
