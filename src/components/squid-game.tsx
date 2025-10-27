import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Trapezoid from "../ui/trapezoid";
import {
  SCROLL_PROGRESS_0,
  SCROLL_PROGRESS_100,
  SCROLL_PROGRESS_12_5,
  SCROLL_PROGRESS_33,
  SCROLL_PROGRESS_50,
  SCROLL_PROGRESS_75,
  SQUID_GAME_THICKNESS,
  SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR,
  SQUID_GAME_WIDTH,
} from "../constants";

const MotionTrapezoid = motion.create(Trapezoid, { forwardMotionProps: true });

const SquidGame = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Derived circle constants
  const CIRCLE_DIAMETER = 0.5 * SQUID_GAME_WIDTH;
  const CIRCLE_RADIUS = CIRCLE_DIAMETER / 2;
  const CIRCLE_STROKE_WIDTH = SQUID_GAME_THICKNESS;
  const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
  const SVG_SIZE = 2 * (CIRCLE_RADIUS + CIRCLE_STROKE_WIDTH / 2) + 12; // Added 12px buffer
  const CIRCLE_CENTER = SVG_SIZE / 2;
  const TRIANGLE_HEIGHT = (Math.sqrt(3) * SQUID_GAME_WIDTH) / 2;

  const strokeDashoffsetClockwise = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50],
    [0, -CIRCLE_CIRCUMFERENCE]
  );

  const circleTrapezoidWidth = useTransform(
    scrollYProgress,
    [
      SCROLL_PROGRESS_0,
      SCROLL_PROGRESS_12_5,
      SCROLL_PROGRESS_50,
      SCROLL_PROGRESS_100,
    ],
    [0, 0, 2 * SVG_SIZE, 0]
  );

  const circleTrapezoidXPosition = useTransform(
    scrollYProgress,
    [
      SCROLL_PROGRESS_0,
      SCROLL_PROGRESS_12_5,
      SCROLL_PROGRESS_50,
      SCROLL_PROGRESS_100,
    ],
    [SVG_SIZE / 2, SVG_SIZE / 2, -1.5 * SVG_SIZE, -1.5 * SVG_SIZE]
  );

  /**
   *
   *
   * Triangle animation controls
   *
   *
   */
  const triangleSidesOpacity = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_75, SCROLL_PROGRESS_100],
    [1, 1, 0]
  );

  /***** Triangle base animation controls *****/
  const triangleBaseWidth = useTransform(
    scrollYProgress,
    [
      SCROLL_PROGRESS_0,
      SCROLL_PROGRESS_33,
      SCROLL_PROGRESS_75,
      SCROLL_PROGRESS_100,
    ],
    [
      SQUID_GAME_WIDTH,
      SQUID_GAME_WIDTH,
      SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR * SQUID_GAME_WIDTH,
      SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR * SQUID_GAME_WIDTH,
    ]
  );

  const triangleBaseYPosition = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_75, SCROLL_PROGRESS_100],
    [0, 0, -2 * SQUID_GAME_THICKNESS]
  );

  /***** Triangle sides animation controls *****/
  const triangleSidesYPosition = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_33, SCROLL_PROGRESS_100],
    [
      0,
      (1 - SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR) * TRIANGLE_HEIGHT,
      (1 - SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR) * TRIANGLE_HEIGHT,
    ]
  );

  const triangleSidesWidth = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_33, SCROLL_PROGRESS_100],
    [
      SQUID_GAME_WIDTH,
      SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR * SQUID_GAME_WIDTH,
      SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR * SQUID_GAME_WIDTH,
    ]
  );

  const triangleSideXPositionOffset = useTransform(
    scrollYProgress,
    [
      SCROLL_PROGRESS_0,
      SCROLL_PROGRESS_33,
      SCROLL_PROGRESS_75,
      SCROLL_PROGRESS_100,
    ],
    [
      0,
      ((1 - SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR) * SQUID_GAME_WIDTH) / 2,
      ((1 - SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR) * SQUID_GAME_WIDTH) / 2,
      ((1 - SQUID_GAME_TRIANGLE_SCALE_DOWN_FACTOR) * SQUID_GAME_WIDTH) / 2,
    ]
  );

  const leftTriangleSideXPositionOffset = useTransform(
    [triangleSideXPositionOffset, triangleBaseYPosition],
    (values) => `calc(50% + ${(values[0] as number) - (values[1] as number)}px)`
  );

  const rightTriangleSideXPositionOffset = useTransform(
    [triangleSideXPositionOffset, triangleBaseYPosition],
    (values) => `calc(50% - ${(values[0] as number) + (values[1] as number)}px)`
  );

  /**
   *
   *
   * Square animation controls
   *
   *
   */
  /***** Top square side animation controls *****/
  const topSquareSideWidth = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_100],
    [SQUID_GAME_WIDTH, 1.5 * SQUID_GAME_WIDTH, 0]
  );

  /***** Bottom square side animation controls *****/
  const bottomSquareSideWidth = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_100],
    [SQUID_GAME_WIDTH, SQUID_GAME_WIDTH, 0]
  );

  const horizontalSideXPositionOffset = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_100],
    [0, -SQUID_GAME_WIDTH]
  );

  /***** Left square side animation controls *****/
  const leftSquareSideHeight = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_75, SCROLL_PROGRESS_100],
    [SQUID_GAME_WIDTH, SQUID_GAME_WIDTH, 0]
  );

  /***** Right square side animation controls *****/
  const rightSquareSideHeight = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_100],
    [SQUID_GAME_WIDTH, SQUID_GAME_WIDTH, 0]
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
              width: `${SQUID_GAME_WIDTH}px`,
              height: `${TRIANGLE_HEIGHT}px`,
              marginBottom: "1rem",
            }}
          >
            {/* Bottom base */}
            <MotionTrapezoid
              width={`${SQUID_GAME_WIDTH}px`}
              height={`${SQUID_GAME_THICKNESS}px`}
              angle={`calc(${SQUID_GAME_THICKNESS}px / sqrt(3))`}
              style={{
                width: triangleBaseWidth,
                position: "absolute",
                bottom: triangleBaseYPosition,
                opacity: triangleSidesOpacity,
                right: 0,
              }}
            ></MotionTrapezoid>

            {/* Right side */}
            <MotionTrapezoid
              width={`${SQUID_GAME_WIDTH}px`}
              height={`${SQUID_GAME_THICKNESS}px`}
              angle={`calc(${SQUID_GAME_THICKNESS}px / sqrt(3))`}
              variant="bottom"
              style={{
                width: triangleSidesWidth,
                transform: "rotate(-60deg)",
                position: "absolute",
                top: triangleSidesYPosition,
                opacity: triangleSidesOpacity,
                right: rightTriangleSideXPositionOffset,
                transformOrigin: "top right",
              }}
            ></MotionTrapezoid>

            {/* Left side */}
            <MotionTrapezoid
              width={`${SQUID_GAME_WIDTH}px`}
              height={`${SQUID_GAME_THICKNESS}px`}
              angle={`calc(${SQUID_GAME_THICKNESS}px / sqrt(3))`}
              variant="bottom"
              style={{
                width: triangleSidesWidth,
                transform: "rotate(60deg)",
                position: "absolute",
                top: triangleSidesYPosition,
                opacity: triangleSidesOpacity,
                left: leftTriangleSideXPositionOffset,
                transformOrigin: "top left",
              }}
            ></MotionTrapezoid>
          </div>

          {/* square */}
          <div
            className="square relative"
            style={{
              width: `${SQUID_GAME_WIDTH}px`,
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
                height: rightSquareSideHeight,
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
                width: bottomSquareSideWidth,
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
                width: topSquareSideWidth,
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
                height: leftSquareSideHeight,
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
