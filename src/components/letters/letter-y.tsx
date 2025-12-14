import MotionTrapezoid from "../motion-components/trapezoid";
import {
  SCROLL_PROGRESS_50,
  SCROLL_PROGRESS_63_75,
  SCROLL_PROGRESS_72_5,
  SCROLL_PROGRESS_87_5,
  SQUID_GAME_THICKNESS,
} from "../../constants";
import type { MotionValue } from "motion";
import { useTransform } from "motion/react";

interface LetterYProps {
  LETTERS_WIDTH: number;
  scrollYProgress: MotionValue<number>;
}

const LetterY = ({
  LETTERS_WIDTH,
  scrollYProgress,
  ...props
}: LetterYProps) => {
  const VERTICAL_BAR_WIDTH =
    (LETTERS_WIDTH + 4 * SQUID_GAME_THICKNESS) / Math.sqrt(3);

  const horizontalBarWidth = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_63_75, SCROLL_PROGRESS_87_5],
    [0, VERTICAL_BAR_WIDTH]
  );

  const horizontalBarVisibility = useTransform(horizontalBarWidth, (width) =>
    width > SQUID_GAME_THICKNESS ? "visible" : "hidden"
  );

  const bottomBarHeight = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_50, SCROLL_PROGRESS_72_5],
    [0, LETTERS_WIDTH]
  );

  return (
    <div
      {...props}
      className="shape-y relative"
      style={{
        width: `${VERTICAL_BAR_WIDTH}px`,
        height: `${LETTERS_WIDTH}px`,
        marginLeft: `-${SQUID_GAME_THICKNESS}px`,
      }}
    >
      {/* Left Horizontal Bar */}
      <MotionTrapezoid
        width={`${VERTICAL_BAR_WIDTH}px`}
        height={`${SQUID_GAME_THICKNESS}px`}
        angle={`calc(${SQUID_GAME_THICKNESS}px / sqrt(3))`}
        style={{
          position: "absolute",
          width: horizontalBarWidth,
          transform: "rotate(60deg)",
          transformOrigin: "bottom right",
          right: VERTICAL_BAR_WIDTH / 2,
          bottom: LETTERS_WIDTH / 2 - 2 * SQUID_GAME_THICKNESS,
          visibility: horizontalBarVisibility,
        }}
      ></MotionTrapezoid>

      {/* Right Horizontal Bar */}
      <MotionTrapezoid
        width={`${VERTICAL_BAR_WIDTH}px`}
        height={`${SQUID_GAME_THICKNESS}px`}
        angle={`calc(${SQUID_GAME_THICKNESS}px / sqrt(3))`}
        style={{
          position: "absolute",
          width: horizontalBarWidth,
          transform: "rotate(-60deg)",
          transformOrigin: "bottom left",
          left: VERTICAL_BAR_WIDTH / 2,
          bottom: LETTERS_WIDTH / 2 - 2 * SQUID_GAME_THICKNESS,
          visibility: horizontalBarVisibility,
        }}
      ></MotionTrapezoid>

      {/* Bottom Vertical Bar */}
      <MotionTrapezoid
        width={`${SQUID_GAME_THICKNESS}px`}
        height={`${LETTERS_WIDTH}px`}
        angle={"0%"}
        style={{
          position: "absolute",
          bottom: `${-LETTERS_WIDTH / 2}px`,
          left: `${(VERTICAL_BAR_WIDTH - SQUID_GAME_THICKNESS) / 2}px`,
          height: bottomBarHeight,
          width: `${SQUID_GAME_THICKNESS}px`,
        }}
      ></MotionTrapezoid>
    </div>
  );
};

export default LetterY;
