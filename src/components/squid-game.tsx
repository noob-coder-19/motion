import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Trapezoid from "../ui/trapezoid";
import { SCROLL_PROGRESS_0, SCROLL_PROGRESS_100, SCROLL_PROGRESS_33, SCROLL_PROGRESS_50, SCROLL_PROGRESS_75, SQUID_GAME_THICKNESS, SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR, SQUID_GAME_WIDTH } from "../constants";

const MotionTrapezoid = motion.create(Trapezoid, { forwardMotionProps: true });

const SquidGame = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Base constants
  const WIDTH = SQUID_GAME_WIDTH;
  const THICKNESS = SQUID_GAME_THICKNESS;
  const TRIANGLE_SCALE_DOWN_FACTOR = SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR;

  // Derived circle constants
  const CIRCLE_DIAMETER = 0.5 * WIDTH;
  const CIRCLE_RADIUS = CIRCLE_DIAMETER / 2;
  const CIRCLE_STROKE_WIDTH = THICKNESS;
  const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
  const SVG_SIZE = 2 * (CIRCLE_RADIUS + CIRCLE_STROKE_WIDTH / 2) + 12; // Added 12px buffer
  const CIRCLE_CENTER = SVG_SIZE / 2;
  const TRIANGLE_HEIGHT = Math.sqrt(3) * WIDTH / 2;

  const strokeDashoffsetClockwise = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50],
    [0, -CIRCLE_CIRCUMFERENCE]
  );

  const trapezoidYPosition = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_33, SCROLL_PROGRESS_100],
    [0, (1 - TRIANGLE_SCALE_DOWN_FACTOR) * TRIANGLE_HEIGHT, (1 - TRIANGLE_SCALE_DOWN_FACTOR) * TRIANGLE_HEIGHT]
  );

  const leftTrapezoidXPosition = useTransform(
    scrollYProgress, 
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_33, SCROLL_PROGRESS_75, SCROLL_PROGRESS_100], 
    [0, WIDTH / 4 + WIDTH / 8, WIDTH / 4 + WIDTH / 8, WIDTH / 4 + WIDTH / 4]);

  const rightTrapezoidXPosition = useTransform(
    scrollYProgress, 
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_33, SCROLL_PROGRESS_75, SCROLL_PROGRESS_100], 
    [0, WIDTH / 4 + WIDTH / 8, WIDTH / 4 + WIDTH / 8, WIDTH / 4]);

  const trapezezoidWidth = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_33, SCROLL_PROGRESS_100],
    [WIDTH, TRIANGLE_SCALE_DOWN_FACTOR * WIDTH, TRIANGLE_SCALE_DOWN_FACTOR * WIDTH]
  );

  return (
    <div ref={containerRef} className="squid-game-container">
      <h1>Squid Game</h1>

      {/* Squid game grid */}
      <>
        <div className="container">
          {/* circle - top */}
          <div
            className="circle-top relative flex flex-col items-center justify-center"
            style={{ marginBottom: `-${CIRCLE_CENTER}px` }}
          >
            <MotionTrapezoid
              width={`${THICKNESS}px`}
              height={`${THICKNESS}px`}
              angle={"0%"}
              style={{
                width: useTransform(
                  scrollYProgress,
                  [0, 0.5, 1],
                  [0, 2 * SVG_SIZE, 0]
                ),
                position: "absolute",
                top: `${THICKNESS / 2}px`,
                right: useTransform(
                  scrollYProgress,
                  [0, 0.5, 1],
                  [SVG_SIZE / 2, -1.5 * SVG_SIZE, -2 * SVG_SIZE]
                ),
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
                stroke={"white"}
                strokeWidth={CIRCLE_STROKE_WIDTH}
                fill="none"
              />
            </svg>
          </div>

          {/* Triangle */}
          <div
            className="triangle relative"
            style={{
              width: `${WIDTH}px`,
              height: `${Math.sqrt(3) *WIDTH / 2}px`,
              marginBottom: "1rem",
            }}
          >
            {/* Bottom base */}
            <MotionTrapezoid
              width={`${WIDTH}px`}
              height={`${THICKNESS}px`}
              angle={`calc(${THICKNESS}px / sqrt(3))`}
              style={{
                width: useTransform(
                  scrollYProgress,
                  [0, SCROLL_PROGRESS_33, SCROLL_PROGRESS_75, SCROLL_PROGRESS_100],
                  [WIDTH, WIDTH, TRIANGLE_SCALE_DOWN_FACTOR * WIDTH, TRIANGLE_SCALE_DOWN_FACTOR * WIDTH]
                ),
                position: "absolute",
                bottom: useTransform(
                  scrollYProgress,
                  [0, 0.75, 1],
                  [0, 0, -2 * THICKNESS]
                ),
                opacity: useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]),
                right: 0,
              }}
            ></MotionTrapezoid>

            {/* Right side */}
            <MotionTrapezoid
              width={`${WIDTH}px`}
              height={`${THICKNESS}px`}
              angle={`calc(${THICKNESS}px / sqrt(3))`}
              variant="bottom"
              style={{
                width: trapezezoidWidth,
                transform: "rotate(-60deg)",
                position: "absolute",
                top: trapezoidYPosition,
                opacity: useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]),
                right: useTransform(rightTrapezoidXPosition, (value) => `calc(50% - ${value}px)`),
                transformOrigin: "top right",
              }}
            ></MotionTrapezoid>

            {/* Left side */}
            <MotionTrapezoid
              width={`${WIDTH}px`}
              height={`${THICKNESS}px`}
              angle={`calc(${THICKNESS}px / sqrt(3))`}
              variant="bottom"
              style={{
                width: trapezezoidWidth,
                transform: "rotate(60deg)",
                position: "absolute",
                top: trapezoidYPosition,
                opacity: useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]),
                left: useTransform(leftTrapezoidXPosition, (value) => `calc(50% + ${value}px)`),
                transformOrigin: "top left",
              }}
            ></MotionTrapezoid>
          </div>

          {/* square */}
          <div
            className="square relative"
            style={{
              width: `${WIDTH}px`,
              height: `${WIDTH}px`,
            }}
          >
            <MotionTrapezoid
              width={`${THICKNESS}px`}
              height={`${WIDTH}px`}
              angle={"0%"}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                height: useTransform(
                  scrollYProgress,
                  [0, 0.5, 1],
                  [WIDTH, WIDTH, 0]
                ),
              }}
            ></MotionTrapezoid>

            <MotionTrapezoid
              width={`${WIDTH}px`}
              height={`${THICKNESS}px`}
              angle={"0%"}
              style={{
                position: "absolute",
                bottom: 0,
                left: useTransform(
                  scrollYProgress,
                  [0, 0.5, 1],
                  [0, WIDTH / 2, 2 * WIDTH]
                ),
                width: useTransform(
                  scrollYProgress,
                  [0, 0.75, 1],
                  [WIDTH, WIDTH, 0]
                ),
              }}
            ></MotionTrapezoid>

            <MotionTrapezoid
              width={`${WIDTH}px`}
              height={`${THICKNESS}px`}
              angle={"0%"}
              style={{
                position: "absolute",
                top: 0,
                right: useTransform(scrollYProgress, [0, 1], [0, -1 * WIDTH]),
                width: useTransform(
                  scrollYProgress,
                  [0, 0.5, 1],
                  [WIDTH, WIDTH, 0]
                ),
              }}
            ></MotionTrapezoid>

            <MotionTrapezoid
              width={`${THICKNESS}px`}
              height={`${WIDTH}px`}
              angle={"0%"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: useTransform(
                  scrollYProgress,
                  [0, 0.75, 1],
                  [WIDTH, WIDTH, 0]
                ),
              }}
            ></MotionTrapezoid>
          </div>

          {/* circle - bottom */}
          <div
            className="circle-bottom relative flex flex-col items-center justify-center"
            style={{
              marginTop: `-${CIRCLE_CENTER + CIRCLE_STROKE_WIDTH / 2}px`,
            }}
          >
            <MotionTrapezoid
              width={`${THICKNESS}px`}
              height={`${THICKNESS}px`}
              angle={"0%"}
              style={{
                width: useTransform(
                  scrollYProgress,
                  [0, 0.5, 1],
                  [0, 2 * SVG_SIZE, 0]
                ),
                position: "absolute",
                bottom: `${THICKNESS / 2}px`,
                left: useTransform(
                  scrollYProgress,
                  [0, 0.5, 1],
                  [SVG_SIZE / 2, -1.5 * SVG_SIZE, -2 * SVG_SIZE]
                ),
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
                stroke={"white"}
                strokeWidth={CIRCLE_STROKE_WIDTH}
                fill="none"
              />
            </svg>
          </div>
        </div>
      </>
    </div>
  );
};

export default SquidGame;
