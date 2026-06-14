import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  LETTERS_SCALE_DOWN_FACTOR,
  SCROLL_PROGRESS_0,
  SCROLL_PROGRESS_6_25,
  SCROLL_PROGRESS_25,
  SCROLL_PROGRESS_50,
  SCROLL_PROGRESS_75,
  SCROLL_PROGRESS_90,
  SCROLL_PROGRESS_100,
} from "../constants";
import { useSquidGameDimensions } from "../hooks/use-squid-game-dimensions";
import LetterA from "./letters/letter-a";
import LetterH from "./letters/letter-h";
import LetterS from "./letters/letter-s";
import LetterU from "./letters/letter-u";
import LetterY from "./letters/letter-y";
import MotionTrapezoid from "./motion-components/trapezoid";
import Square from "./phase-1-components/square";
import Triangle from "./phase-1-components/triangle";

const SquidGame = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const { width: SQUID_GAME_WIDTH, thickness: SQUID_GAME_THICKNESS } =
    useSquidGameDimensions();

  // Derived circle constants
  const CIRCLE_DIAMETER = 0.5 * SQUID_GAME_WIDTH;
  const CIRCLE_RADIUS = CIRCLE_DIAMETER / 2;
  const CIRCLE_STROKE_WIDTH = SQUID_GAME_THICKNESS;
  const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
  const SVG_SIZE =
    2 * (CIRCLE_RADIUS + CIRCLE_STROKE_WIDTH / 2) + SQUID_GAME_THICKNESS; // Added SQUID_GAME_THICKNESS as buffer
  const CIRCLE_CENTER = SVG_SIZE / 2;

  // Letter constants
  const LETTERS_WIDTH = SQUID_GAME_WIDTH * LETTERS_SCALE_DOWN_FACTOR;

  const strokeDashoffsetClockwise = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_25],
    [0, CIRCLE_CIRCUMFERENCE]
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
    [
      SCROLL_PROGRESS_0,
      SCROLL_PROGRESS_50,
      SCROLL_PROGRESS_75,
      SCROLL_PROGRESS_90,
      SCROLL_PROGRESS_100,
    ],
    [1, 0.85, 0.75, 0.7, 0.55]
  );

  const backgroundColor = useTransform(
    backgroundOpacity,
    (opacity) => `rgba(0, 0, 0, ${opacity})`
  );

  return (
    <div className="squid-game-container snap-start" ref={containerRef}>
      {/* Squid game grid */}
      <motion.div
        className="w-full flex-1"
        style={{
          background: backgroundColor,
        }}
      >
        <div className="sticky top-0 h-screen">
          <div className="container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            {/* circle - top */}
            <div
              className="circle-top relative flex flex-col items-center justify-center"
              style={{ marginBottom: `-${CIRCLE_CENTER}px` }}
            >
              <MotionTrapezoid
                angle={"0%"}
                height={`${SQUID_GAME_THICKNESS}px`}
                style={{
                  width: circleTrapezoidWidth,
                  position: "absolute",
                  top: `${SQUID_GAME_THICKNESS / 2}px`,
                  right: circleTrapezoidXPosition,
                }}
                width={`${SQUID_GAME_THICKNESS}px`}
              />
              <svg aria-label="Circle" height={SVG_SIZE} width={SVG_SIZE}>
                {/* CCW path from 12 o'clock — positive offset erases clockwise */}
                <motion.path
                  d={`M ${CIRCLE_CENTER} ${CIRCLE_CENTER - CIRCLE_RADIUS} A ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} 0 0 0 ${CIRCLE_CENTER} ${CIRCLE_CENTER + CIRCLE_RADIUS} A ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} 0 0 0 ${CIRCLE_CENTER} ${CIRCLE_CENTER - CIRCLE_RADIUS}`}
                  fill="none"
                  stroke={"#f1f1f1"}
                  strokeWidth={CIRCLE_STROKE_WIDTH}
                  style={{
                    strokeDasharray: CIRCLE_CIRCUMFERENCE,
                    strokeDashoffset: strokeDashoffsetClockwise,
                  }}
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
                angle={"0%"}
                height={`${SQUID_GAME_THICKNESS}px`}
                style={{
                  width: circleTrapezoidWidth,
                  position: "absolute",
                  bottom: `${SQUID_GAME_THICKNESS / 2}px`,
                  left: circleTrapezoidXPosition,
                }}
                width={`${SQUID_GAME_THICKNESS}px`}
              />
              <svg aria-label="Circle" height={SVG_SIZE} width={SVG_SIZE}>
                {/* CCW path from 6 o'clock — positive offset erases clockwise */}
                <motion.path
                  d={`M ${CIRCLE_CENTER} ${CIRCLE_CENTER + CIRCLE_RADIUS} A ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} 0 0 0 ${CIRCLE_CENTER} ${CIRCLE_CENTER - CIRCLE_RADIUS} A ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} 0 0 0 ${CIRCLE_CENTER} ${CIRCLE_CENTER + CIRCLE_RADIUS}`}
                  fill="none"
                  stroke={"#f1f1f1"}
                  strokeWidth={CIRCLE_STROKE_WIDTH}
                  style={{
                    strokeDasharray: CIRCLE_CIRCUMFERENCE,
                    strokeDashoffset: strokeDashoffsetClockwise,
                  }}
                />
              </svg>
            </div>
          </div>

          <div
            className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-0.5"
            style={{
              gap: `${SQUID_GAME_THICKNESS}px`,
            }}
          >
            {/* A shape */}
            <LetterA
              LETTERS_WIDTH={LETTERS_WIDTH}
              scrollYProgress={scrollYProgress}
            />

            {/* Y shape */}
            <LetterY
              LETTERS_WIDTH={LETTERS_WIDTH}
              scrollYProgress={scrollYProgress}
            />

            {/* U shape */}
            <LetterU
              LETTERS_WIDTH={LETTERS_WIDTH}
              scrollYProgress={scrollYProgress}
            />

            {/* S shape */}
            <LetterS
              LETTERS_WIDTH={LETTERS_WIDTH}
              scrollYProgress={scrollYProgress}
            />

            {/* H shape */}
            <LetterH
              LETTERS_WIDTH={LETTERS_WIDTH}
              scrollYProgress={scrollYProgress}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SquidGame;
