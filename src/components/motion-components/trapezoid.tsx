import { motion } from "motion/react";
import Trapezoid from "../../ui/trapezoid";

const MotionTrapezoid = motion.create(Trapezoid, { forwardMotionProps: true });

export default MotionTrapezoid;
