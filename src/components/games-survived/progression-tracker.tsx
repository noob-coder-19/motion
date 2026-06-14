import { type MotionValue, motion, useTransform } from "motion/react";

type MarkerShape = "circle" | "triangle" | "square";

const MARKER_SIZE = 48;
const ACTIVE_COLOR = "#ED1B76";
const INACTIVE_COLOR = "#555555";

const SCROLL_RANGES: Record<MarkerShape, [number, number]> = {
  circle: [0, 0.1],
  triangle: [0.1, 0.5],
  square: [0.5, 0.9],
};

const ShapeMarker = ({
  shape,
  scrollYProgress,
}: {
  shape: MarkerShape;
  scrollYProgress: MotionValue<number>;
}) => {
  const range = SCROLL_RANGES[shape];
  const fillOpacity = useTransform(
    scrollYProgress,
    [range[0], range[1]],
    [0, 1]
  );
  const glowOpacity = useTransform(
    scrollYProgress,
    [range[0], range[1]],
    [0, 0.6]
  );

  const shapeElements: Record<MarkerShape, React.ReactNode> = {
    circle: (
      <>
        <circle
          cx="24"
          cy="24"
          fill={INACTIVE_COLOR}
          fillOpacity="0.1"
          r="20"
          stroke={INACTIVE_COLOR}
          strokeWidth="2"
        />
        <motion.circle
          cx="24"
          cy="24"
          fill={ACTIVE_COLOR}
          r="20"
          stroke={ACTIVE_COLOR}
          strokeWidth="2"
          style={{ fillOpacity, opacity: fillOpacity }}
        />
      </>
    ),
    triangle: (
      <>
        <polygon
          fill={INACTIVE_COLOR}
          fillOpacity="0.1"
          points="24,4 44,44 4,44"
          stroke={INACTIVE_COLOR}
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <motion.polygon
          fill={ACTIVE_COLOR}
          points="24,4 44,44 4,44"
          stroke={ACTIVE_COLOR}
          strokeLinejoin="round"
          strokeWidth="2"
          style={{ fillOpacity, opacity: fillOpacity }}
        />
      </>
    ),
    square: (
      <>
        <rect
          fill={INACTIVE_COLOR}
          fillOpacity="0.1"
          height="36"
          rx="2"
          stroke={INACTIVE_COLOR}
          strokeWidth="2"
          width="36"
          x="6"
          y="6"
        />
        <motion.rect
          fill={ACTIVE_COLOR}
          height="36"
          rx="2"
          stroke={ACTIVE_COLOR}
          strokeWidth="2"
          style={{ fillOpacity, opacity: fillOpacity }}
          width="36"
          x="6"
          y="6"
        />
      </>
    ),
  };

  return (
    <motion.div
      className="relative"
      style={{
        filter: useTransform(
          glowOpacity,
          (v) => `drop-shadow(0 0 ${v * 12}px ${ACTIVE_COLOR})`
        ),
      }}
    >
      <svg
        aria-hidden="true"
        fill="none"
        height={MARKER_SIZE}
        viewBox="0 0 48 48"
        width={MARKER_SIZE}
      >
        {shapeElements[shape]}
      </svg>
    </motion.div>
  );
};

const ProgressionTracker = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const shapes: MarkerShape[] = ["circle", "triangle", "square"];

  return (
    <div className="sticky top-1/2 hidden h-fit -translate-y-1/2 flex-col items-center gap-0 md:flex">
      {shapes.map((shape, i) => (
        <div className="flex flex-col items-center" key={shape}>
          <ShapeMarker scrollYProgress={scrollYProgress} shape={shape} />
          {i < shapes.length - 1 && (
            <div className="h-16 w-0.5 bg-muted-gray/50" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressionTracker;
