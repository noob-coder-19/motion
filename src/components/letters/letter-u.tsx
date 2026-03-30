import type { MotionValue } from "motion";
import { motion, useTransform } from "motion/react";
import type React from "react";
import {
  SCROLL_PROGRESS_0,
  SCROLL_PROGRESS_50,
  SCROLL_PROGRESS_60,
  SCROLL_PROGRESS_85,
  SCROLL_PROGRESS_100,
} from "../../constants";
import { useSquidGameDimensions } from "../../hooks/use-squid-game-dimensions";
import MotionTrapezoid from "../motion-components/trapezoid";

interface LetterUProps extends React.HTMLAttributes<HTMLDivElement> {
  LETTERS_WIDTH: number;
  scrollYProgress: MotionValue<number>;
}

const LetterU = ({
  LETTERS_WIDTH,
  scrollYProgress,
  ...props
}: LetterUProps) => {
  const { thickness: SQUID_GAME_THICKNESS } = useSquidGameDimensions();

  const SEMI_CIRCLE_OUTER_RADIUS = LETTERS_WIDTH * 0.5;
  const SEMI_CIRCLE_CENTERLINE_RADIUS =
    SEMI_CIRCLE_OUTER_RADIUS - SQUID_GAME_THICKNESS / 2;
  const SEMI_CIRCLE_CIRCUMFERENCE = 2 * Math.PI * SEMI_CIRCLE_CENTERLINE_RADIUS;

  const leftHorizontalBarHeight = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_50, SCROLL_PROGRESS_60],
    [0, LETTERS_WIDTH * 0.5]
  );

  const rightHorizontalBarHeight = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_85, SCROLL_PROGRESS_100],
    [0, LETTERS_WIDTH]
  );

  const semiCircleStrokeDashoffset = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_60, SCROLL_PROGRESS_85],
    [-0.5 * SEMI_CIRCLE_CIRCUMFERENCE, -0.5 * SEMI_CIRCLE_CIRCUMFERENCE, 0]
  );

  return (
    <div
      {...props}
      className="shape-u relative"
      style={{
        aspectRatio: "1",
        height: `${LETTERS_WIDTH}px`,
      }}
    >
      {/* Horizontal Bar */}
      <MotionTrapezoid
        angle={"0%"}
        height={`${LETTERS_WIDTH * 0.5}px`}
        style={{
          position: "absolute",
          height: leftHorizontalBarHeight,
          top: 0,
          left: 0,
        }}
        width={`${SQUID_GAME_THICKNESS}px`}
      />

      {/* Semi Circle Outer Radius: {LETTERS_WIDTH * 0.5}px */}
      <div
        className="absolute bottom-0 left-0 overflow-hidden"
        style={{
          width: `${2 * SEMI_CIRCLE_OUTER_RADIUS}px`,
          height: `${SEMI_CIRCLE_OUTER_RADIUS}px`,
        }}
      >
        <svg
          aria-label="Semi Circle"
          className="overflow-hidden"
          height="100%"
          width="100%"
        >
          <motion.circle
            cx={SEMI_CIRCLE_OUTER_RADIUS}
            cy={0}
            fill="none"
            r={SEMI_CIRCLE_CENTERLINE_RADIUS}
            stroke="#f1f1f1"
            strokeWidth={SQUID_GAME_THICKNESS}
            style={{
              strokeDasharray: SEMI_CIRCLE_CIRCUMFERENCE / 2,
              strokeDashoffset: semiCircleStrokeDashoffset,
              transformOrigin: "center center",
            }}
          />
        </svg>
      </div>

      {/* Horizontal Bar */}
      <MotionTrapezoid
        angle={"0%"}
        className="absolute right-0"
        height={`${LETTERS_WIDTH}px`}
        style={{
          height: rightHorizontalBarHeight,
          bottom: `${SEMI_CIRCLE_OUTER_RADIUS}px`,
        }}
        width={`${SQUID_GAME_THICKNESS}px`}
      />
    </div>
  );
};

export default LetterU;
