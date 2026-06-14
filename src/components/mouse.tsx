import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

const CURSOR_SIZE = 16;

const Mouse = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { damping: 80, stiffness: 1800 });
  const springY = useSpring(mouseY, { damping: 80, stiffness: 1800 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - CURSOR_SIZE / 2);
      mouseY.set(e.clientY - CURSOR_SIZE / 2);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-9999 aspect-square w-4 rounded-full bg-white-100 mix-blend-difference"
      style={{
        x: springX,
        y: springY,
      }}
    />
  );
};

export default Mouse;
