import { motion } from "motion/react";
import { useMousePosition } from "../hooks/use-mouse-position";

const Mouse = () => {
  const { x, y } = useMousePosition();
  return (
    <div className="mouse-container">
      <motion.div className="mouse" style={{ x, y }} />
    </div>
  );
};

export default Mouse;
