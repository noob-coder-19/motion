import { type MotionValue, motion, useTransform } from "motion/react";

type MarkerShape = "circle" | "triangle" | "square";

const MARKER_SIZE = 36;
const ACTIVE_COLOR = "#ED1B76";
const INACTIVE_COLOR = "#555555";

const SCROLL_RANGES: Record<MarkerShape, [number, number]> = {
  circle: [0, 0.2],
  triangle: [0.2, 0.6],
  square: [0.6, 1],
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
    [range[0], range[0] + 0.1],
    [0, 1]
  );
  const glowIntensity = useTransform(
    scrollYProgress,
    [range[0], range[0] + 0.1],
    [0, 10]
  );

  const shapeElements: Record<MarkerShape, React.ReactNode> = {
    circle: (
      <>
        <circle
          cx="18"
          cy="18"
          fill="none"
          r="14"
          stroke={INACTIVE_COLOR}
          strokeWidth="1.5"
        />
        <motion.circle
          cx="18"
          cy="18"
          fill={ACTIVE_COLOR}
          r="14"
          stroke={ACTIVE_COLOR}
          strokeWidth="1.5"
          style={{ fillOpacity, opacity: fillOpacity }}
        />
      </>
    ),
    triangle: (
      <>
        <polygon
          fill="none"
          points="18,4 32,32 4,32"
          stroke={INACTIVE_COLOR}
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <motion.polygon
          fill={ACTIVE_COLOR}
          points="18,4 32,32 4,32"
          stroke={ACTIVE_COLOR}
          strokeLinejoin="round"
          strokeWidth="1.5"
          style={{ fillOpacity, opacity: fillOpacity }}
        />
      </>
    ),
    square: (
      <>
        <rect
          fill="none"
          height="26"
          rx="1"
          stroke={INACTIVE_COLOR}
          strokeWidth="1.5"
          width="26"
          x="5"
          y="5"
        />
        <motion.rect
          fill={ACTIVE_COLOR}
          height="26"
          rx="1"
          stroke={ACTIVE_COLOR}
          strokeWidth="1.5"
          style={{ fillOpacity, opacity: fillOpacity }}
          width="26"
          x="5"
          y="5"
        />
      </>
    ),
  };

  return (
    <motion.div
      className="relative"
      style={{
        filter: useTransform(
          glowIntensity,
          (v) => `drop-shadow(0 0 ${v}px ${ACTIVE_COLOR})`
        ),
      }}
    >
      <svg
        aria-hidden="true"
        fill="none"
        height={MARKER_SIZE}
        viewBox="0 0 36 36"
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
    <div className="pointer-events-none absolute top-1/2 left-6 z-10 hidden -translate-y-1/2 flex-col items-center gap-0 md:flex lg:left-10">
      {shapes.map((shape, i) => (
        <div className="flex flex-col items-center" key={shape}>
          <ShapeMarker scrollYProgress={scrollYProgress} shape={shape} />
          {i < shapes.length - 1 && (
            <div className="my-1 h-8 w-px bg-muted-gray/30" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressionTracker;
