import type { MotionValue } from "motion";
import MotionTrapezoid from "../motion-components/trapezoid";
import { SCROLL_PROGRESS_0, SCROLL_PROGRESS_100, SCROLL_PROGRESS_50, SCROLL_PROGRESS_60, SCROLL_PROGRESS_70, SCROLL_PROGRESS_80, SCROLL_PROGRESS_95, SQUID_GAME_THICKNESS } from "../../constants";
import { useTransform } from "motion/react";

interface LetterAProps extends React.HTMLAttributes<HTMLDivElement> {
  LETTERS_WIDTH: number;
  scrollYProgress: MotionValue<number>;
}

const LetterA = ({ LETTERS_WIDTH, scrollYProgress }: LetterAProps) => {
  const LETTER_A_WIDTH = (2 * LETTERS_WIDTH) / Math.sqrt(3);

  const rightHorizontalBarWidth = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_60, SCROLL_PROGRESS_70],
    [0, 0, LETTER_A_WIDTH]
  );

  const rightHorizontalBarVisibility = useTransform(rightHorizontalBarWidth, (width) =>
    width > SQUID_GAME_THICKNESS ? "visible" : "hidden"
  );

  const leftHorizontalBarWidth = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_70, SCROLL_PROGRESS_80],
    [0, 0, LETTER_A_WIDTH]
  );

  const leftHorizontalBarVisibility = useTransform(leftHorizontalBarWidth, (width) =>
    width > SQUID_GAME_THICKNESS ? "visible" : "hidden"
  );

  const bottomHorizontalBarWidth = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_60, SCROLL_PROGRESS_80, SCROLL_PROGRESS_100],
    [0, 0, LETTER_A_WIDTH, LETTER_A_WIDTH, 0]
  );

  const bottomHorizontalBarVisibility = useTransform(bottomHorizontalBarWidth, (width) =>
    width > SQUID_GAME_THICKNESS ? "visible" : "hidden"
  );

  const innerTriangleOpacity = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_95, SCROLL_PROGRESS_100],
    [0, 0, 0, 1]
  );

  return (
    <div
      className="shape-a relative"
      style={{
        width: `${LETTER_A_WIDTH}px`,
        height: `${LETTERS_WIDTH}px`,
      }}
    >
      {/* Right side */}
      <MotionTrapezoid
        width={`${LETTER_A_WIDTH}px`}
        height={`${SQUID_GAME_THICKNESS}px`}
        angle={`calc(${SQUID_GAME_THICKNESS}px / sqrt(3))`}
        variant="bottom"
        style={{
          width: rightHorizontalBarWidth,
          transform: "rotate(-60deg)",
          position: "absolute",
          bottom: `${-SQUID_GAME_THICKNESS / 2}px`,
          left: `${SQUID_GAME_THICKNESS * (Math.sqrt(3) / 2)}px`,
          transformOrigin: "bottom left",
          visibility: rightHorizontalBarVisibility,
        }}
      ></MotionTrapezoid>

      {/* Left side */}
      <MotionTrapezoid
        width={`${LETTER_A_WIDTH}px`}
        height={`${SQUID_GAME_THICKNESS}px`}
        angle={`calc(${SQUID_GAME_THICKNESS}px / sqrt(3))`}
        variant="bottom"
        style={{
          width: leftHorizontalBarWidth,
          transform: "rotate(60deg)",
          position: "absolute",
          top: 0,
          left: `${LETTER_A_WIDTH / 2}px`,
          transformOrigin: "top left",
          visibility: leftHorizontalBarVisibility,
        }}
      ></MotionTrapezoid>

      {/* Inner triangle */}
      <MotionTrapezoid
        width={`${
          LETTER_A_WIDTH - (4 * SQUID_GAME_THICKNESS) / Math.sqrt(3)
        }px`}
        height={`${LETTERS_WIDTH - 2 * SQUID_GAME_THICKNESS}px`}
        angle={`calc(${LETTERS_WIDTH - 2 * SQUID_GAME_THICKNESS}px / sqrt(3))`}
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
      ></MotionTrapezoid>

      {/* Bottom Horizontal Bar (optional) -- this will disappear when the A shape is completed */}
      <MotionTrapezoid
        width={`${LETTER_A_WIDTH}px`}
        height={`${SQUID_GAME_THICKNESS}px`}
        angle={`calc(${SQUID_GAME_THICKNESS}px / sqrt(3))`}
        style={{
          width: bottomHorizontalBarWidth,
          position: "absolute",
          bottom: 0,
          right: 0,
          visibility: bottomHorizontalBarVisibility,
        }}
      ></MotionTrapezoid>
    </div>
  );
};

export default LetterA;
