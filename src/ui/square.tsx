interface SquareProps {
  size?: number | string;
  thickness?: number | string;
  className?: number | string;
  color?: string;
  style?: React.CSSProperties;
}

const Square = ({
  size = 50,
  thickness = "8px",
  className = "",
  color = "currentColor",
  style = {},
}: SquareProps) => {
  return (
    <div
      className={`square relative flex flex-col items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        ...style,
      }}
    >
      {/* Top */}
      <div
        className="absolute top-0 left-0"
        style={{
          width: size,
          height: thickness,
          background: color,
        }}
      ></div>

      {/* Left */}
      <div
        className="absolute top-0 left-0"
        style={{
          height: size,
          width: thickness,
          background: color,
        }}
      ></div>

      {/* Right */}
      <div
        className="absolute top-0 right-0"
        style={{
          height: size,
          width: thickness,
          background: color,
        }}
      ></div>

      {/* Bottom */}
      <div
        className="absolute bottom-0 left-0"
        style={{
          width: size,
          height: thickness,
          background: color,
        }}
      ></div>
    </div>
  );
};

export default Square;
