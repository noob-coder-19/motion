import type { MotionValue } from "motion";
import { motion, useTransform } from "motion/react";
import type React from "react";
import {
  SCROLL_PROGRESS_50,
  SCROLL_PROGRESS_60,
  SCROLL_PROGRESS_70,
  SCROLL_PROGRESS_75,
  SCROLL_PROGRESS_85,
  SCROLL_PROGRESS_100,
  SQUID_GAME_THICKNESS,
} from "../../constants";
import MotionTrapezoid from "../motion-components/trapezoid";

interface LetterSProps extends React.HTMLAttributes<HTMLDivElement> {
  LETTERS_WIDTH: number;
  scrollYProgress: MotionValue<number>;
}

const LetterS = ({
  LETTERS_WIDTH,
  scrollYProgress,
  ...props
}: LetterSProps) => {
  const SEMI_CIRCLE_OUTER_RADIUS = (LETTERS_WIDTH + SQUID_GAME_THICKNESS) / 4;
  const SEMI_CIRCLE_CENTERLINE_RADIUS =
    SEMI_CIRCLE_OUTER_RADIUS - SQUID_GAME_THICKNESS / 2;
  const CIRCUMFERENCE = 2 * Math.PI * SEMI_CIRCLE_CENTERLINE_RADIUS;

  const topHorizontalBarWidth = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_50, SCROLL_PROGRESS_60],
    [0, LETTERS_WIDTH - SEMI_CIRCLE_OUTER_RADIUS]
  );

  const middleHorizontalBarWidth = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_70, SCROLL_PROGRESS_75],
    [0, LETTERS_WIDTH - 2 * SEMI_CIRCLE_OUTER_RADIUS]
  );

  const bottomHorizontalBarWidth = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_85, SCROLL_PROGRESS_100],
    [0, 1.5 * LETTERS_WIDTH - SEMI_CIRCLE_OUTER_RADIUS]
  );

  const topSemiCircleStrokeDashoffset = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_60, SCROLL_PROGRESS_70],
    [-CIRCUMFERENCE / 2, 0]
  );

  const bottomSemiCircleStrokeDashoffset = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_75, SCROLL_PROGRESS_85],
    [CIRCUMFERENCE / 2, 0]
  );

  return (
    <div
      {...props}
      className="shape-s relative flex flex-col items-center justify-between"
      style={{
        aspectRatio: "1.5",
        height: `${LETTERS_WIDTH}px`,
      }}
    >
      {/* Top Horizontal Bar */}
      <MotionTrapezoid
        angle={"0%"}
        height={`${SQUID_GAME_THICKNESS}px`}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: topHorizontalBarWidth,
        }}
        width={`${LETTERS_WIDTH}px`}
      />

      {/* Top right semicircle */}
      <div
        className="relative"
        style={{
          position: "absolute",
          top: 0,
          left: `${LETTERS_WIDTH * 0.5 + 1}px`,
          aspectRatio: "0.5",
          height: `${2 * SEMI_CIRCLE_OUTER_RADIUS}px`,
        }}
      >
        <svg
          height={2 * SEMI_CIRCLE_OUTER_RADIUS}
          style={{ overflow: "hidden" }}
          width={SEMI_CIRCLE_OUTER_RADIUS}
        >
          <title>S: Top right semicircle</title>
          <motion.circle
            cx={SEMI_CIRCLE_OUTER_RADIUS}
            cy={SEMI_CIRCLE_OUTER_RADIUS}
            fill="none"
            r={SEMI_CIRCLE_CENTERLINE_RADIUS}
            stroke="#f1f1f1"
            strokeWidth={SQUID_GAME_THICKNESS}
            style={{
              rotate: "90deg",
              strokeDasharray: CIRCUMFERENCE / 2,
              strokeDashoffset: topSemiCircleStrokeDashoffset,
              transformOrigin: "center center",
            }}
          />
        </svg>
      </div>

      {/* Middle horizontal bar */}
      <MotionTrapezoid
        angle={"0%"}
        height={`${SQUID_GAME_THICKNESS}px`}
        style={{
          position: "absolute",
          top: "50%",
          left: `${LETTERS_WIDTH * 0.5 + SEMI_CIRCLE_OUTER_RADIUS}px`,
          transform: "translateY(-50%)",
          width: middleHorizontalBarWidth,
        }}
        width={`${LETTERS_WIDTH}px`}
      />

      {/* Bottom left semicircle */}
      <div
        className="relative"
        style={{
          position: "absolute",
          bottom: 0,
          right: 1,
          aspectRatio: "0.5",
          height: `${2 * SEMI_CIRCLE_OUTER_RADIUS}px`,
        }}
      >
        <svg
          height={2 * SEMI_CIRCLE_OUTER_RADIUS}
          style={{ overflow: "hidden" }}
          width={SEMI_CIRCLE_OUTER_RADIUS}
        >
          <title>S: Bottom left semicircle</title>
          <motion.circle
            cx={0}
            cy={SEMI_CIRCLE_OUTER_RADIUS}
            fill="none"
            r={SEMI_CIRCLE_CENTERLINE_RADIUS}
            stroke="#f1f1f1"
            strokeWidth={SQUID_GAME_THICKNESS}
            style={{
              rotate: "-90deg",
              strokeDasharray: CIRCUMFERENCE / 2,
              strokeDashoffset: bottomSemiCircleStrokeDashoffset,
              transformOrigin: "center center",
            }}
          />
        </svg>
      </div>

      {/* Bottom Horizontal Bar */}
      <MotionTrapezoid
        angle={"0%"}
        height={`${SQUID_GAME_THICKNESS}px`}
        style={{
          position: "absolute",
          bottom: 0,
          right: `${SEMI_CIRCLE_OUTER_RADIUS}px`,
          width: bottomHorizontalBarWidth,
        }}
        width={`${LETTERS_WIDTH}px`}
      />
    </div>
  );
};

export default LetterS;
