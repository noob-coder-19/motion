import type { MotionValue } from "motion";
import { useTransform } from "motion/react";
import {
  SCROLL_PROGRESS_0,
  SCROLL_PROGRESS_50,
  SCROLL_PROGRESS_60,
  SCROLL_PROGRESS_70,
  SCROLL_PROGRESS_80,
  SCROLL_PROGRESS_95,
  SCROLL_PROGRESS_100,
} from "../../constants";
import { useSquidGameDimensions } from "../../hooks/use-squid-game-dimensions";
import MotionTrapezoid from "../motion-components/trapezoid";

interface LetterAProps extends React.HTMLAttributes<HTMLDivElement> {
  LETTERS_WIDTH: number;
  scrollYProgress: MotionValue<number>;
}

const LetterA = ({
  LETTERS_WIDTH,
  scrollYProgress,
  ...props
}: LetterAProps) => {
  const { thickness: SQUID_GAME_THICKNESS } = useSquidGameDimensions();
  const LETTER_A_WIDTH = (2 * LETTERS_WIDTH) / Math.sqrt(3);

  const rightHorizontalBarWidth = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_60, SCROLL_PROGRESS_70],
    [0, 0, LETTER_A_WIDTH]
  );

  const rightHorizontalBarVisibility = useTransform(
    rightHorizontalBarWidth,
    (width) => (width > SQUID_GAME_THICKNESS ? "visible" : "hidden")
  );

  const leftHorizontalBarWidth = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_70, SCROLL_PROGRESS_80],
    [0, 0, LETTER_A_WIDTH]
  );

  const leftHorizontalBarVisibility = useTransform(
    leftHorizontalBarWidth,
    (width) => (width > SQUID_GAME_THICKNESS ? "visible" : "hidden")
  );

  const bottomHorizontalBarWidth = useTransform(
    scrollYProgress,
    [
      SCROLL_PROGRESS_0,
      SCROLL_PROGRESS_50,
      SCROLL_PROGRESS_60,
      SCROLL_PROGRESS_80,
      SCROLL_PROGRESS_100,
    ],
    [0, 0, LETTER_A_WIDTH, LETTER_A_WIDTH, 0]
  );

  const bottomHorizontalBarVisibility = useTransform(
    bottomHorizontalBarWidth,
    (width) => (width > SQUID_GAME_THICKNESS ? "visible" : "hidden")
  );

  const innerTriangleOpacity = useTransform(
    scrollYProgress,
    [
      SCROLL_PROGRESS_0,
      SCROLL_PROGRESS_50,
      SCROLL_PROGRESS_95,
      SCROLL_PROGRESS_100,
    ],
    [0, 0, 0, 1]
  );

  return (
    <div
      {...props}
      className="shape-a relative"
      style={{
        width: `${LETTER_A_WIDTH}px`,
        height: `${LETTERS_WIDTH}px`,
      }}
    >
      {/* Right side */}
      <MotionTrapezoid
        angle={`calc(${SQUID_GAME_THICKNESS}px / sqrt(3))`}
        height={`${SQUID_GAME_THICKNESS}px`}
        style={{
          width: rightHorizontalBarWidth,
          transform: "rotate(-60deg)",
          position: "absolute",
          bottom: `${-SQUID_GAME_THICKNESS / 2}px`,
          left: `${SQUID_GAME_THICKNESS * (Math.sqrt(3) / 2)}px`,
          transformOrigin: "bottom left",
          visibility: rightHorizontalBarVisibility,
        }}
        variant="bottom"
        width={`${LETTER_A_WIDTH}px`}
      />

      {/* Left side */}
      <MotionTrapezoid
        angle={`calc(${SQUID_GAME_THICKNESS}px / sqrt(3))`}
        height={`${SQUID_GAME_THICKNESS}px`}
        style={{
          width: leftHorizontalBarWidth,
          transform: "rotate(60deg)",
          position: "absolute",
          top: 0,
          left: `${LETTER_A_WIDTH / 2}px`,
          transformOrigin: "top left",
          visibility: leftHorizontalBarVisibility,
        }}
        variant="bottom"
        width={`${LETTER_A_WIDTH}px`}
      />

      {/* Inner triangle */}
      <MotionTrapezoid
        angle={`calc(${LETTERS_WIDTH - 2 * SQUID_GAME_THICKNESS}px / sqrt(3))`}
        height={`${LETTERS_WIDTH - 2 * SQUID_GAME_THICKNESS}px`}
        style={{
          width: `${
            LETTER_A_WIDTH - (4 * SQUID_GAME_THICKNESS) / Math.sqrt(3)
          }px`,
          position: "absolute",
          bottom: 0,
          backgroundColor: "var(--color-pink-400)",
          left: `${SQUID_GAME_THICKNESS * (2 / Math.sqrt(3))}px`,
          transformOrigin: "top left",
          opacity: innerTriangleOpacity,
        }}
        width={`${
          LETTER_A_WIDTH - (4 * SQUID_GAME_THICKNESS) / Math.sqrt(3)
        }px`}
      />

      {/* Bottom Horizontal Bar (optional) -- this will disappear when the A shape is completed */}
      <MotionTrapezoid
        angle={`calc(${SQUID_GAME_THICKNESS}px / sqrt(3))`}
        height={`${SQUID_GAME_THICKNESS}px`}
        style={{
          width: bottomHorizontalBarWidth,
          position: "absolute",
          bottom: 0,
          right: 0,
          visibility: bottomHorizontalBarVisibility,
        }}
        width={`${LETTER_A_WIDTH}px`}
      />
    </div>
  );
};

export default LetterA;
