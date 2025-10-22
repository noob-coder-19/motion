import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Square from "../ui/square";
import Trapezoid from "../ui/trapezoid";

const MotionTrapezoid = motion.create(Trapezoid, { forwardMotionProps: true });

const SquidGame = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Base constants
  const WIDTH = 160;
  const THICKNESS = 12;

  // Derived circle constants
  const CIRCLE_DIAMETER = 0.75 * WIDTH;
  const CIRCLE_RADIUS = CIRCLE_DIAMETER / 2;
  const CIRCLE_STROKE_WIDTH = THICKNESS;
  const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
  const SVG_SIZE = 2 * (CIRCLE_RADIUS + CIRCLE_STROKE_WIDTH / 2) + 12; // Added 12px buffer
  const CIRCLE_CENTER = SVG_SIZE / 2;

  const strokeDashoffsetClockwise = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -CIRCLE_CIRCUMFERENCE]
  );

  const trapezpodXPosition = useTransform(
    scrollYProgress,
    [0, 1],
    [0, WIDTH / 2]
  );

  const trapezoidYPosition = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.sqrt(3) * (WIDTH / 4)]
  );

  const trapezezoidWidth = useTransform(
    scrollYProgress,
    [0, 1],
    [WIDTH, WIDTH / 2]
  );

  return (
    <div ref={containerRef} className="squid-game-container">
      <h1>Squid Game</h1>

      {/* Squid game grid */}
      <>
        <div className="container">
          {/* circle - top */}
          <div
            className="circle-top flex flex-col items-center justify-center"
            style={{ marginBottom: "-40px" }}
          >
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

          <div
            className="triangle relative"
            style={{
              width: `${WIDTH}px`,
              height: `calc(sqrt(3) * ${WIDTH / 2}px)`,
              marginBottom: "1rem",
            }}
          >
            <MotionTrapezoid
              width={`${WIDTH}px`}
              height={`${THICKNESS}px`}
              angle={`calc(${THICKNESS}px / sqrt(3))`}
              style={{
                width: useTransform(
                  scrollYProgress,
                  [0, 1],
                  [WIDTH, 1.25 * WIDTH]
                ),
                position: "absolute",
                bottom: 0,
              }}
            ></MotionTrapezoid>

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
                right: useTransform(trapezpodXPosition, (value) => {
                  return `calc(50% - ${value}px)`;
                }),
                transformOrigin: "top right",
              }}
            ></MotionTrapezoid>

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
                left: useTransform(
                  trapezpodXPosition,
                  (value) => `calc(50% + ${value}px)`
                ),
                transformOrigin: "top left",
              }}
            ></MotionTrapezoid>
          </div>

          {/* square */}
          <Square
            size={`${WIDTH}px`}
            thickness={`${THICKNESS}px`}
            style={
              {
                // outline: "2px solid yellow"
              }
            }
          ></Square>

          {/* circle - bottom */}
          <div
            className="circle-bottom flex flex-col items-center justify-center"
            style={{ marginTop: "-40px" }}
          >
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
