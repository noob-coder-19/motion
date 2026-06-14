import { motion } from "motion/react";

const STAMP_DELAY_S = 0.6;

const SurvivedStamp = ({ inView }: { inView: boolean }) => (
  <motion.div
    animate={
      inView
        ? { scale: 1, rotate: -6, opacity: 1 }
        : { scale: 0, rotate: -12, opacity: 0 }
    }
    aria-hidden="true"
    className="absolute right-4 bottom-4 border-2 border-pink-500 border-dashed px-3 py-1.5"
    initial={{ scale: 0, rotate: -12, opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 600,
      damping: 15,
      delay: STAMP_DELAY_S,
    }}
  >
    <span className="whitespace-nowrap font-bold text-pink-500 text-xs uppercase tracking-widest">
      STATUS: SURVIVED
    </span>
  </motion.div>
);

export default SurvivedStamp;
