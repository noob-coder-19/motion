import type { MotionValue } from "motion";
import {
  SCROLL_PROGRESS_0,
  SCROLL_PROGRESS_100,
  SCROLL_PROGRESS_50,
  SCROLL_PROGRESS_87_5,
  SCROLL_PROGRESS_90,
  SCROLL_PROGRESS_95,
  SQUID_GAME_THICKNESS,
} from "../../constants";
import MotionTrapezoid from "../motion-components/trapezoid";
import { useTransform } from "motion/react";

interface LetterHProps extends React.HTMLAttributes<HTMLDivElement> {
  LETTERS_WIDTH: number;
  scrollYProgress: MotionValue<number>;
}

const LetterH = ({
  LETTERS_WIDTH,
  scrollYProgress,
  ...props
}: LetterHProps) => {
  const heightOfVerticalBar = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_87_5],
    [0, 0, 1.5 * LETTERS_WIDTH]
  );

  const widthOfHorizontalBar = useTransform(
    scrollYProgress,
    [
      SCROLL_PROGRESS_0,
      SCROLL_PROGRESS_50,
      SCROLL_PROGRESS_90,
      SCROLL_PROGRESS_95,
    ],
    [0, 0, 0, LETTERS_WIDTH]
  );
  const centerFillOpacity = useTransform(
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
      className="shape-h relative flex flex-col items-center justify-center"
      style={{
        aspectRatio: "1",
        height: `${LETTERS_WIDTH}px`,
      }}
    >
      {/* Left Vertical Bar */}
      <MotionTrapezoid
        width={`${SQUID_GAME_THICKNESS}px`}
        height={`${1.5 * LETTERS_WIDTH}px`}
        angle={"0%"}
        style={{
          position: "absolute",
          height: heightOfVerticalBar,
          top: `${-LETTERS_WIDTH * 0.5}px`,
          left: 0,
          width: `${SQUID_GAME_THICKNESS}px`,
        }}
      ></MotionTrapezoid>

      {/* Center fill */}
      <MotionTrapezoid
        width={`${LETTERS_WIDTH - 2 * SQUID_GAME_THICKNESS}px`}
        height={`${(LETTERS_WIDTH - SQUID_GAME_THICKNESS) / 2}px`}
        angle={"0%"}
        style={{
          position: "absolute",
          top: 0,
          backgroundColor: "var(--color-pink-400)",
          opacity: centerFillOpacity,
        }}
      ></MotionTrapezoid>

      {/* Right Vertical Bar */}
      <MotionTrapezoid
        width={`${SQUID_GAME_THICKNESS}px`}
        height={`${1.5 * LETTERS_WIDTH}px`}
        angle={"0%"}
        style={{
          position: "absolute",
          height: heightOfVerticalBar,
          bottom: `${-LETTERS_WIDTH * 0.5}px`,
          right: 0,
          width: `${SQUID_GAME_THICKNESS}px`,
        }}
      ></MotionTrapezoid>

      {/* Centre horizontal bar */}
      <MotionTrapezoid
        width={`${LETTERS_WIDTH}px`}
        height={`${SQUID_GAME_THICKNESS}px`}
        angle={"0%"}
        style={{
          position: "absolute",
          top: `50%`,
          left: 0,
          transform: `translateY(-50%)`,
          width: widthOfHorizontalBar,
        }}
      ></MotionTrapezoid>
    </div>
  );
};

export default LetterH;
