import React from "react";
import MotionTrapezoid from "../motion-components/trapezoid";
import {
  SCROLL_PROGRESS_0,
  SCROLL_PROGRESS_25,
  SCROLL_PROGRESS_37_5,
  SCROLL_PROGRESS_50,
  SQUID_GAME_THICKNESS,
  SQUID_GAME_WIDTH,
} from "../../constants";
import type { MotionValue } from "motion";
import { useTransform } from "motion/react";

interface SquareProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollYProgress: MotionValue<number>;
}

const Square = ({ scrollYProgress, ...props }: SquareProps) => {
  /***** Top square side animation controls *****/
  const topSideWidth = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_25, SCROLL_PROGRESS_50],
    [SQUID_GAME_WIDTH, 1.5 * SQUID_GAME_WIDTH, 0]
  );

  /***** Bottom square side animation controls *****/
  const bottomSideWidth = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_25, SCROLL_PROGRESS_50],
    [SQUID_GAME_WIDTH, SQUID_GAME_WIDTH, 0]
  );

  const horizontalSideXPositionOffset = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50],
    [0, -SQUID_GAME_WIDTH]
  );

  /***** Left square side animation controls *****/
  const leftSideHeight = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_37_5, SCROLL_PROGRESS_50],
    [SQUID_GAME_WIDTH, SQUID_GAME_WIDTH, 0]
  );

  /***** Right square side animation controls *****/
  const rightSideHeight = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_25, SCROLL_PROGRESS_50],
    [SQUID_GAME_WIDTH, SQUID_GAME_WIDTH, 0]
  );

  return (
    <div
      {...props}
      className="square relative"
      style={{
        aspectRatio: "1",
        height: `${SQUID_GAME_WIDTH}px`,
      }}
    >
      {/* Right side trapezoid */}
      <MotionTrapezoid
        width={`${SQUID_GAME_THICKNESS}px`}
        height={`${SQUID_GAME_WIDTH}px`}
        angle={"0%"}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          height: rightSideHeight,
        }}
      ></MotionTrapezoid>

      {/* Bottom side trapezoid */}
      <MotionTrapezoid
        width={`${SQUID_GAME_WIDTH}px`}
        height={`${SQUID_GAME_THICKNESS}px`}
        angle={"0%"}
        style={{
          position: "absolute",
          bottom: 0,
          right: horizontalSideXPositionOffset,
          width: bottomSideWidth,
        }}
      ></MotionTrapezoid>

      {/* Top side trapezoid */}
      <MotionTrapezoid
        width={`${SQUID_GAME_WIDTH}px`}
        height={`${SQUID_GAME_THICKNESS}px`}
        angle={"0%"}
        style={{
          position: "absolute",
          top: 0,
          right: horizontalSideXPositionOffset,
          width: topSideWidth,
        }}
      ></MotionTrapezoid>

      {/* Left side trapezoid */}
      <MotionTrapezoid
        width={`${SQUID_GAME_THICKNESS}px`}
        height={`${SQUID_GAME_WIDTH}px`}
        angle={"0%"}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: leftSideHeight,
        }}
      ></MotionTrapezoid>
    </div>
  );
};

export default Square;
