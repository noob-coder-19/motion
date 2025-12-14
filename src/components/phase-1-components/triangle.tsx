import type { MotionValue } from "motion";
import React from "react";
import MotionTrapezoid from "../motion-components/trapezoid";
import {
  SCROLL_PROGRESS_0,
  SCROLL_PROGRESS_16_67,
  SCROLL_PROGRESS_37_5,
  SCROLL_PROGRESS_50,
  SQUID_GAME_THICKNESS,
  SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR,
  SQUID_GAME_WIDTH,
} from "../../constants";
import { useTransform } from "motion/react";

interface TriangleProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollYProgress: MotionValue<number>;
}

const Triangle = ({ scrollYProgress, ...props }: TriangleProps) => {
  const HEIGHT = (Math.sqrt(3) * SQUID_GAME_WIDTH) / 2;

  const sideOpacity = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_37_5, SCROLL_PROGRESS_50],
    [1, 1, 0]
  );

  const baseWidth = useTransform(
    scrollYProgress,
    [
      SCROLL_PROGRESS_0,
      SCROLL_PROGRESS_16_67,
      SCROLL_PROGRESS_37_5,
      SCROLL_PROGRESS_50,
    ],
    [
      SQUID_GAME_WIDTH,
      SQUID_GAME_WIDTH,
      SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR * SQUID_GAME_WIDTH,
      SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR * SQUID_GAME_WIDTH,
    ]
  );

  const baseYPosition = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_37_5, SCROLL_PROGRESS_50],
    [0, 0, -2 * SQUID_GAME_THICKNESS]
  );

  const sidesYPosition = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_16_67, SCROLL_PROGRESS_50],
    [
      0,
      (1 - SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR) * HEIGHT,
      (1 - SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR) * HEIGHT,
    ]
  );

  const sideWidth = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_16_67, SCROLL_PROGRESS_50],
    [
      SQUID_GAME_WIDTH,
      SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR * SQUID_GAME_WIDTH,
      SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR * SQUID_GAME_WIDTH,
    ]
  );

  const sideXPositionOffset = useTransform(
    scrollYProgress,
    [
      SCROLL_PROGRESS_0,
      SCROLL_PROGRESS_16_67,
      SCROLL_PROGRESS_37_5,
      SCROLL_PROGRESS_50,
    ],
    [
      0,
      ((1 - SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR) * SQUID_GAME_WIDTH) / 2,
      ((1 - SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR) * SQUID_GAME_WIDTH) / 2,
      ((1 - SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR) * SQUID_GAME_WIDTH) / 2,
    ]
  );

  const leftSideXPositionOffset = useTransform(
    [sideXPositionOffset, baseYPosition],
    (values) => `calc(50% + ${(values[0] as number) - (values[1] as number)}px)`
  );

  const rightSideXPositionOffset = useTransform(
    [sideXPositionOffset, baseYPosition],
    (values) => `calc(50% - ${(values[0] as number) + (values[1] as number)}px)`
  );

  return (
    <div
      {...props}
      className="triangle relative"
      style={{
        width: `${SQUID_GAME_WIDTH}px`,
        height: `${HEIGHT}px`,
        marginBottom: "1rem",
      }}
    >
      {/* Bottom base */}
      <MotionTrapezoid
        width={`${SQUID_GAME_WIDTH}px`}
        height={`${SQUID_GAME_THICKNESS}px`}
        angle={`${SQUID_GAME_THICKNESS / Math.sqrt(3)}px`}
        style={{
          width: baseWidth,
          position: "absolute",
          bottom: baseYPosition,
          opacity: sideOpacity,
          right: 0,
        }}
      ></MotionTrapezoid>

      {/* Right side */}
      <MotionTrapezoid
        width={`${SQUID_GAME_WIDTH}px`}
        height={`${SQUID_GAME_THICKNESS}px`}
        angle={`${SQUID_GAME_THICKNESS / Math.sqrt(3)}px`}
        variant="bottom"
        style={{
          width: sideWidth,
          transform: "rotate(-60deg)",
          position: "absolute",
          top: sidesYPosition,
          opacity: sideOpacity,
          right: rightSideXPositionOffset,
          transformOrigin: "top right",
        }}
      ></MotionTrapezoid>

      {/* Left side */}
      <MotionTrapezoid
        width={`${SQUID_GAME_WIDTH}px`}
        height={`${SQUID_GAME_THICKNESS}px`}
        angle={`${SQUID_GAME_THICKNESS / Math.sqrt(3)}px`}
        variant="bottom"
        style={{
          width: sideWidth,
          transform: "rotate(60deg)",
          position: "absolute",
          top: sidesYPosition,
          opacity: sideOpacity,
          left: leftSideXPositionOffset,
          transformOrigin: "top left",
        }}
      ></MotionTrapezoid>
    </div>
  );
};

export default Triangle;
