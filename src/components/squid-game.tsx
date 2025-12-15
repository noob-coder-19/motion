import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  LETTERS_SCALE_DOWN_FACTOR,
  SCROLL_PROGRESS_0,
  SCROLL_PROGRESS_25,
  SCROLL_PROGRESS_50,
  SCROLL_PROGRESS_6_25,
  SQUID_GAME_THICKNESS,
  SQUID_GAME_WIDTH,
} from "../constants";
import LetterH from "./letters/letter-h";
import LetterA from "./letters/letter-a";
import LetterY from "./letters/letter-y";
import LetterU from "./letters/letter-u";
import LetterS from "./letters/letter-s";
import MotionTrapezoid from "./motion-components/trapezoid";
import Square from "./phase-1-components/square";
import Triangle from "./phase-1-components/triangle";

const SquidGame = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: scrollYProgressActual } = useScroll({
    target: containerRef,
  });
  const scrollYProgress = useTransform(() => scrollYProgressActual.get() * 2);

  // Derived circle constants
  const CIRCLE_DIAMETER = 0.5 * SQUID_GAME_WIDTH;
  const CIRCLE_RADIUS = CIRCLE_DIAMETER / 2;
  const CIRCLE_STROKE_WIDTH = SQUID_GAME_THICKNESS;
  const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
  const SVG_SIZE = 2 * (CIRCLE_RADIUS + CIRCLE_STROKE_WIDTH / 2) + 12; // Added 12px buffer
  const CIRCLE_CENTER = SVG_SIZE / 2;

  // Letter constants
  const LETTERS_WIDTH = SQUID_GAME_WIDTH * LETTERS_SCALE_DOWN_FACTOR;

  const strokeDashoffsetClockwise = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_25],
    [0, -CIRCLE_CIRCUMFERENCE]
  );

  const circleTrapezoidWidth = useTransform(
    scrollYProgress,
    [
      SCROLL_PROGRESS_0,
      SCROLL_PROGRESS_6_25,
      SCROLL_PROGRESS_25,
      SCROLL_PROGRESS_50,
    ],
    [0, 0, 2 * SVG_SIZE, 0]
  );

  const circleTrapezoidXPosition = useTransform(
    scrollYProgress,
    [
      SCROLL_PROGRESS_0,
      SCROLL_PROGRESS_6_25,
      SCROLL_PROGRESS_25,
      SCROLL_PROGRESS_50,
    ],
    [SVG_SIZE / 2, SVG_SIZE / 2, -1.5 * SVG_SIZE, -1.5 * SVG_SIZE]
  );

  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.55]
  );

  const backgroundColor = useTransform(
    backgroundOpacity,
    (opacity) => `rgba(0, 0, 0, ${opacity})`
  );

  return (
    <div ref={containerRef} className="squid-game-container">
      {/* Squid game grid */}
      <motion.div className="flex-1" style={{
        background: backgroundColor,
        width: "100%",
      }}>
      <>
        <div className="container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* circle - top */}
          <div
            className="circle-top relative flex flex-col items-center justify-center"
            style={{ marginBottom: `-${CIRCLE_CENTER}px` }}
          >
            <MotionTrapezoid
              width={`${SQUID_GAME_THICKNESS}px`}
              height={`${SQUID_GAME_THICKNESS}px`}
              angle={"0%"}
              style={{
                width: circleTrapezoidWidth,
                position: "absolute",
                top: `${SQUID_GAME_THICKNESS / 2}px`,
                right: circleTrapezoidXPosition,
              }}
            ></MotionTrapezoid>
            <svg width={SVG_SIZE} height={SVG_SIZE}>
              <motion.circle
                cx={CIRCLE_CENTER}
                cy={CIRCLE_CENTER}
                r={CIRCLE_RADIUS}
                style={{
                  strokeDasharray: CIRCLE_CIRCUMFERENCE,
                  strokeDashoffset: strokeDashoffsetClockwise,
                  rotate: -90,
                  transformOrigin: "center center",
                }}
                stroke={"#f1f1f1"}
                strokeWidth={CIRCLE_STROKE_WIDTH}
                fill="none"
              />
            </svg>
          </div>

          {/* Triangle */}
          <Triangle scrollYProgress={scrollYProgress} />

          {/* square */}
          <Square scrollYProgress={scrollYProgress} />

          {/* circle - bottom */}
          <div
            className="circle-bottom relative flex flex-col items-center justify-center"
            style={{
              marginTop: `-${CIRCLE_CENTER + CIRCLE_STROKE_WIDTH / 2}px`,
            }}
          >
            <MotionTrapezoid
              width={`${SQUID_GAME_THICKNESS}px`}
              height={`${SQUID_GAME_THICKNESS}px`}
              angle={"0%"}
              style={{
                width: circleTrapezoidWidth,
                position: "absolute",
                bottom: `${SQUID_GAME_THICKNESS / 2}px`,
                left: circleTrapezoidXPosition,
              }}
            ></MotionTrapezoid>
            <svg width={SVG_SIZE} height={SVG_SIZE}>
              <motion.circle
                cx={CIRCLE_CENTER}
                cy={CIRCLE_CENTER}
                r={CIRCLE_RADIUS}
                style={{
                  strokeDasharray: CIRCLE_CIRCUMFERENCE,
                  strokeDashoffset: strokeDashoffsetClockwise,
                  rotate: 90,
                  transformOrigin: "center center",
                }}
                stroke={"#f1f1f1"}
                strokeWidth={CIRCLE_STROKE_WIDTH}
                fill="none"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-center fixed top-1/2 left-1/2 gap-0.5 transform -translate-x-1/2 -translate-y-1/2" style={{
          gap: `${SQUID_GAME_THICKNESS}px`,
        }}>
          {/* A shape */}
          <LetterA LETTERS_WIDTH={LETTERS_WIDTH} scrollYProgress={scrollYProgress} />

          {/* Y shape */}
          <LetterY LETTERS_WIDTH={LETTERS_WIDTH} scrollYProgress={scrollYProgress} />

          {/* U shape */}
          <LetterU LETTERS_WIDTH={LETTERS_WIDTH} scrollYProgress={scrollYProgress} />

          {/* S shape */}
          <LetterS LETTERS_WIDTH={LETTERS_WIDTH} scrollYProgress={scrollYProgress} />

          {/* H shape */}
          <LetterH LETTERS_WIDTH={LETTERS_WIDTH} scrollYProgress={scrollYProgress} />
        </div>
      </>
      </motion.div>
    </div>
  );
};

export default SquidGame;
