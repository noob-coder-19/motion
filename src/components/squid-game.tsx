import { motion, useScroll, useTransform } from "motion/react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Trapezoid from "../ui/trapezoid";
import {
  SQUID_GAME_WIDTH,
  SQUID_GAME_THICKNESS,
  SCROLL_PROGRESS_0,
  SCROLL_PROGRESS_33,
  SCROLL_PROGRESS_37_5,
  SCROLL_PROGRESS_50,
  SCROLL_PROGRESS_55,
  SCROLL_PROGRESS_60,
  SCROLL_PROGRESS_62,
  SCROLL_PROGRESS_62_5,
  SCROLL_PROGRESS_70,
  SCROLL_PROGRESS_73,
  SCROLL_PROGRESS_75,
  SCROLL_PROGRESS_77,
  SCROLL_PROGRESS_80,
  SCROLL_PROGRESS_90,
  SCROLL_PROGRESS_95,
  SCROLL_PROGRESS_100,
  PINK_FILL,
  WHITE_STROKE,
} from "../constants";

const MotionTrapezoid = motion.create(Trapezoid, { forwardMotionProps: true });

const SquidGame = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Base constants
  const WIDTH = SQUID_GAME_WIDTH;
  const THICKNESS = SQUID_GAME_THICKNESS;

  // Derived circle constants
  const CIRCLE_DIAMETER = 0.5 * WIDTH;
  const CIRCLE_RADIUS = CIRCLE_DIAMETER / 2;
  const CIRCLE_STROKE_WIDTH = THICKNESS;
  const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
  const SVG_SIZE = 2 * (CIRCLE_RADIUS + CIRCLE_STROKE_WIDTH / 2) + 12; // Added 12px buffer
  const CIRCLE_CENTER = SVG_SIZE / 2;

  const strokeDashoffsetClockwise = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50],
    [0, -CIRCLE_CIRCUMFERENCE]
  );

  const trapezoidYPosition = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_33, SCROLL_PROGRESS_50],
    [0, Math.sqrt(3) * (WIDTH / 4), Math.sqrt(3) * (WIDTH / 4)]
  );

  const trapezezoidWidth = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_33, SCROLL_PROGRESS_50],
    [WIDTH, WIDTH / 2, WIDTH / 2]
  );

  // Phase 1 Opacity (fade out from 37.5% to 50%)
  const phase1Opacity = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_37_5, SCROLL_PROGRESS_50],
    [1, 1, 0]
  );

  // Phase 2 Opacity (fade in from 50%)
  const phase2Opacity = useTransform(
    scrollYProgress,
    [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50],
    [0, 1]
  );

  return (
    <div ref={containerRef} className="squid-game-container">
      <h1>Squid Game</h1>

      {/* Squid game grid */}
      <>
        <div className="container">
          {/* Phase 1: Geometric Structure */}
          <motion.div style={{ opacity: phase1Opacity }}>
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
                  [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_50],
                  [0, WIDTH, 0]
                ),
                position: "absolute",
                top: `${THICKNESS / 2}px`,
                right: useTransform(
                  scrollYProgress,
                  [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_50],
                  [SVG_SIZE / 2, -SVG_SIZE, -SVG_SIZE]
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
                  [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_50, SCROLL_PROGRESS_50],
                  [WIDTH, 1.25 * WIDTH, WIDTH / 2, WIDTH / 2]
                ),
                position: "absolute",
                bottom: useTransform(
                  scrollYProgress,
                  [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_50],
                  [0, 0, -2 * THICKNESS]
                ),
                opacity: useTransform(scrollYProgress, [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_50], [1, 1, 0]),
                right: useTransform(
                  scrollYProgress,
                  [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_50],
                  [0, -WIDTH / 4, -WIDTH / 4]
                ),
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
                opacity: useTransform(scrollYProgress, [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_50], [1, 1, 0]),
                right: useTransform(scrollYProgress, (value) => {
                  // from 0 till 0.33, move to the right
                  if (value <= SCROLL_PROGRESS_33) {
                    return `calc(50% - ${(value * 3 * WIDTH) / 2}px)`;
                  }

                  // from 0.33 till 0.50, stay at the same position
                  if (value <= SCROLL_PROGRESS_50) {
                    return `calc(50% - ${WIDTH / 2}px)`;
                  }

                  return `calc(50% - ${WIDTH / 2}px + ${
                    ((value - SCROLL_PROGRESS_50) * WIDTH) / 2
                  }px)`;
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
                opacity: useTransform(scrollYProgress, [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_50], [1, 1, 0]),
                left: useTransform(scrollYProgress, (value) => {
                  // from 0 till 0.33, move to the right
                  if (value <= SCROLL_PROGRESS_33) {
                    return `calc(50% + ${(value * 3 * WIDTH) / 2}px)`;
                  }

                  // from 0.33 till 0.50, stay at the same position
                  if (value <= SCROLL_PROGRESS_50) {
                    return `calc(50% + ${WIDTH / 2}px)`;
                  }

                  return `calc(50% + ${WIDTH / 2}px + ${
                    ((value - SCROLL_PROGRESS_50) * WIDTH) / 2
                  }px)`;
                }),
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
                  [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_50],
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
                  [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_50],
                  [0, WIDTH / 2, 2 * WIDTH]
                ),
                width: useTransform(
                  scrollYProgress,
                  [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_50],
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
                right: useTransform(scrollYProgress, [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50], [0, -1 * WIDTH]),
                width: useTransform(
                  scrollYProgress,
                  [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_50],
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
                  [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_50],
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
                  [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_50],
                  [0, WIDTH, 0]
                ),
                position: "absolute",
                bottom: `${THICKNESS / 2}px`,
                left: useTransform(
                  scrollYProgress,
                  [SCROLL_PROGRESS_0, SCROLL_PROGRESS_50, SCROLL_PROGRESS_50],
                  [SVG_SIZE / 2, -SVG_SIZE, -SVG_SIZE]
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
          </motion.div>

          {/* Phase 2: AYUSH Text */}
          <motion.div style={{ opacity: phase2Opacity }}>
            <div className="ayush-container">
              {/* Letter A */}
              <div className="letter letter-a" style={{ position: "relative", width: "80px", height: "100px" }}>
                {/* Left Diagonal Stroke */}
                <MotionTrapezoid
                  width="12px"
                  height="100px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "6px",
                    transformOrigin: "bottom left",
                    transform: "rotate(-60deg)",
                    height: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_50, SCROLL_PROGRESS_55],
                      [0, 100]
                    ),
                  }}
                />
                
                {/* Right Diagonal Stroke */}
                <MotionTrapezoid
                  width="12px"
                  height="100px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: "6px",
                    transformOrigin: "bottom right",
                    transform: "rotate(60deg)",
                    height: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_55, SCROLL_PROGRESS_60],
                      [0, 100]
                    ),
                  }}
                />
                
                {/* Base Stroke */}
                <MotionTrapezoid
                  width="68px"
                  height="12px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "6px",
                    width: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_60, SCROLL_PROGRESS_62],
                      [0, 68]
                    ),
                  }}
                />
                
                {/* Fill Triangle */}
                <MotionTrapezoid
                  width="56px"
                  height="6px"
                  angle="calc(6px / sqrt(3))"
                  variant="bottom"
                  color={PINK_FILL}
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_62, SCROLL_PROGRESS_62_5],
                      [0, 1]
                    ),
                    scale: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_62, SCROLL_PROGRESS_62_5],
                      [0.8, 1]
                    ),
                  }}
                />
              </div>

              {/* Letter Y */}
              <div className="letter letter-y" style={{ position: "relative", width: "80px", height: "110px" }}>
                {/* Left Diagonal */}
                <MotionTrapezoid
                  width="12px"
                  height="60px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "6px",
                    transformOrigin: "top left",
                    transform: "rotate(-60deg)",
                    opacity: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_62_5, SCROLL_PROGRESS_70],
                      [0, 1]
                    ),
                  }}
                />
                
                {/* Right Diagonal */}
                <MotionTrapezoid
                  width="12px"
                  height="60px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: "6px",
                    transformOrigin: "top right",
                    transform: "rotate(60deg)",
                    opacity: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_62_5, SCROLL_PROGRESS_70],
                      [0, 1]
                    ),
                  }}
                />
                
                {/* Vertical Stem */}
                <MotionTrapezoid
                  width="12px"
                  height="50px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    height: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_62_5, SCROLL_PROGRESS_70],
                      [0, 50]
                    ),
                  }}
                />
                
                {/* Fill Top Triangle */}
                <MotionTrapezoid
                  width="44px"
                  height="6px"
                  angle="calc(6px / sqrt(3))"
                  variant="bottom"
                  color={PINK_FILL}
                  style={{
                    position: "absolute",
                    top: "6px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    opacity: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_70, SCROLL_PROGRESS_70],
                      [0, 1]
                    ),
                  }}
                />
              </div>

              {/* Letter U */}
              <div className="letter letter-u" style={{ position: "relative", width: "80px", height: "100px" }}>
                {/* Left Vertical (Tall) */}
                <MotionTrapezoid
                  width="12px"
                  height="100px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_70, SCROLL_PROGRESS_73],
                      [0, 100]
                    ),
                  }}
                />
                
                {/* Bottom Curve - Left Part */}
                <MotionTrapezoid
                  width="15px"
                  height="12px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "12px",
                    width: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_73, SCROLL_PROGRESS_75],
                      [0, 15]
                    ),
                  }}
                />
                
                {/* Bottom Curve - Center */}
                <MotionTrapezoid
                  width="26px"
                  height="12px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "27px",
                    width: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_75, SCROLL_PROGRESS_77],
                      [0, 26]
                    ),
                  }}
                />
                
                {/* Bottom Curve - Right Part */}
                <MotionTrapezoid
                  width="15px"
                  height="12px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: "12px",
                    width: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_75, SCROLL_PROGRESS_77],
                      [0, 15]
                    ),
                  }}
                />
                
                {/* Right Vertical (Short) */}
                <MotionTrapezoid
                  width="12px"
                  height="60px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: 0,
                    height: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_77, SCROLL_PROGRESS_80],
                      [0, 60]
                    ),
                  }}
                />
              </div>

              {/* Letter S */}
              <div className="letter letter-s" style={{ position: "relative", width: "120px", height: "100px" }}>
                {/* Top Curve - Segment 1 */}
                <MotionTrapezoid
                  width="40px"
                  height="12px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: "12px",
                    width: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_80, SCROLL_PROGRESS_80 + 0.02],
                      [0, 40]
                    ),
                  }}
                />
                
                {/* Top Curve - Vertical Right */}
                <MotionTrapezoid
                  width="12px"
                  height="25px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: 0,
                    height: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_80 + 0.02, SCROLL_PROGRESS_80 + 0.04],
                      [0, 25]
                    ),
                  }}
                />
                
                {/* Middle Transition */}
                <MotionTrapezoid
                  width="50px"
                  height="12px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    top: "37px",
                    left: "12px",
                    width: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_80 + 0.04, SCROLL_PROGRESS_80 + 0.06],
                      [0, 50]
                    ),
                  }}
                />
                
                {/* Bottom Curve - Vertical Left */}
                <MotionTrapezoid
                  width="12px"
                  height="25px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: 0,
                    height: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_80 + 0.06, SCROLL_PROGRESS_80 + 0.08],
                      [0, 25]
                    ),
                  }}
                />
                
                {/* Bottom Curve - Horizontal */}
                <MotionTrapezoid
                  width="40px"
                  height="12px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "12px",
                    width: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_80 + 0.08, SCROLL_PROGRESS_90],
                      [0, 40]
                    ),
                  }}
                />
              </div>

              {/* Letter H */}
              <div className="letter letter-h" style={{ position: "relative", width: "80px", height: "100px" }}>
                {/* Left Vertical */}
                <MotionTrapezoid
                  width="12px"
                  height="100px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_90, SCROLL_PROGRESS_95],
                      [0, 100]
                    ),
                  }}
                />
                
                {/* Right Vertical */}
                <MotionTrapezoid
                  width="12px"
                  height="100px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    height: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_90, SCROLL_PROGRESS_95],
                      [0, 100]
                    ),
                  }}
                />
                
                {/* Crossbar */}
                <MotionTrapezoid
                  width="56px"
                  height="12px"
                  angle="0%"
                  color={WHITE_STROKE}
                  style={{
                    position: "absolute",
                    top: "44px",
                    left: "12px",
                    width: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_95, SCROLL_PROGRESS_100],
                      [0, 56]
                    ),
                  }}
                />
                
                {/* Fill Top Rectangle */}
                <MotionTrapezoid
                  width="56px"
                  height="32px"
                  angle="0%"
                  color={PINK_FILL}
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    opacity: useTransform(
                      scrollYProgress,
                      [SCROLL_PROGRESS_100, SCROLL_PROGRESS_100],
                      [0, 1]
                    ),
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </>
    </div>
  );
};

export default SquidGame;
