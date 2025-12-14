import type { MotionValue } from "motion";
import React from "react";
import {
  SCROLL_PROGRESS_0,
  SCROLL_PROGRESS_100,
  SCROLL_PROGRESS_50,
  SCROLL_PROGRESS_60,
  SCROLL_PROGRESS_85,
  SQUID_GAME_THICKNESS,
} from "../../constants";
import MotionTrapezoid from "../motion-components/trapezoid";
import { motion, useTransform } from "motion/react";

interface LetterUProps extends React.HTMLAttributes<HTMLDivElement> {
  LETTERS_WIDTH: number;
  scrollYProgress: MotionValue<number>;
}

const LetterU = ({
  LETTERS_WIDTH,
  scrollYProgress,
  ...props
}: LetterUProps) => {
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
        width={`${SQUID_GAME_THICKNESS}px`}
        height={`${LETTERS_WIDTH * 0.5}px`}
        angle={"0%"}
        style={{
          position: "absolute",
          height: leftHorizontalBarHeight,
          top: 0,
          left: 0,
        }}
      ></MotionTrapezoid>

      {/* Semi Circle Outer Radius: {LETTERS_WIDTH * 0.5}px */}
      <div
        className="absolute bottom-0 left-0"
        style={{
          width: `${2 * SEMI_CIRCLE_OUTER_RADIUS}px`,
          height: `${SEMI_CIRCLE_OUTER_RADIUS}px`,
        }}
      >
        <svg width="100%" height="100%">
          <motion.circle
            cx={SEMI_CIRCLE_OUTER_RADIUS}
            cy={0}
            r={SEMI_CIRCLE_CENTERLINE_RADIUS}
            stroke="#f1f1f1"
            fill="none"
            strokeWidth={SQUID_GAME_THICKNESS}
            style={{
              strokeDasharray: SEMI_CIRCLE_CIRCUMFERENCE,
              strokeDashoffset: semiCircleStrokeDashoffset,
              transformOrigin: "center center",
            }}
          />
        </svg>
      </div>

      {/* Horizontal Bar */}
      <MotionTrapezoid
        width={`${SQUID_GAME_THICKNESS}px`}
        height={`${LETTERS_WIDTH}px`}
        angle={"0%"}
        style={{
          position: "absolute",
          height: rightHorizontalBarHeight,
          bottom: `${SEMI_CIRCLE_OUTER_RADIUS}px`,
          right: 0,
        }}
      ></MotionTrapezoid>
    </div>
  );
};

export default LetterU;
