import { type MotionValue, motion, useTransform } from "motion/react";

const SurvivedBar = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const wipeWidth = useTransform(scrollYProgress, [0.85, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0.82, 0.88], [0, 1]);

  return (
    <motion.div
      className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 hidden h-12 items-center justify-center md:flex"
      style={{ opacity }}
    >
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-500/80 via-pink-500/40 to-transparent"
        style={{ width: wipeWidth }}
      />
      <motion.span
        className="relative z-10 font-bold text-white-100 text-xs uppercase tracking-[0.4em]"
        style={{ opacity }}
      >
        Status: Survived
      </motion.span>
    </motion.div>
  );
};

export default SurvivedBar;
