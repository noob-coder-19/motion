import {
  type MotionValue,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useState } from "react";

interface Metric {
  detail: string;
  label: string;
  value: string;
}

export interface RoundData {
  arsenal: string[];
  company: string;
  dates: string;
  marker: "circle" | "triangle" | "square";
  metrics: Metric[];
  mission: string;
  role: string;
  round: number;
}

interface RoundPanelProps {
  data: RoundData;
  index: number;
  mobile?: boolean;
  panelCount: number;
  scrollYProgress?: MotionValue<number>;
}

const MetricBlock = ({
  metric,
  delay,
  scrollYProgress,
  panelStart,
}: {
  metric: Metric;
  delay: number;
  scrollYProgress?: MotionValue<number>;
  panelStart: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const fallback = useMotionValue(1);
  const progress = scrollYProgress ?? fallback;

  const opacity = useTransform(
    progress,
    [panelStart, panelStart + 0.05 + delay * 0.03],
    scrollYProgress ? [0, 1] : [1, 1]
  );

  const y = useTransform(
    progress,
    [panelStart, panelStart + 0.05 + delay * 0.03],
    scrollYProgress ? [30, 0] : [0, 0]
  );

  return (
    <motion.div
      className="group/metric relative flex cursor-default flex-col items-start gap-1 rounded-sm px-4 py-5 transition-colors duration-200 hover:bg-white/[0.03] md:px-6 md:py-6"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      style={{ opacity, y }}
    >
      <span className="font-bold text-4xl text-gold tracking-tight md:text-5xl lg:text-6xl">
        {metric.value}
      </span>
      <span className="text-sm text-white-100/60 uppercase tracking-wider md:text-base">
        {metric.label}
      </span>

      {/* Hover reveal detail */}
      <motion.p
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        className="absolute top-full left-0 z-10 mt-2 max-w-[280px] rounded bg-card-bg/95 px-4 py-3 text-sm text-white-100/80 shadow-lg backdrop-blur-sm"
        initial={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.2 }}
      >
        {metric.detail}
      </motion.p>
    </motion.div>
  );
};

const RoundPanel = ({
  data,
  index,
  scrollYProgress,
  panelCount,
  mobile = false,
}: RoundPanelProps) => {
  const panelStart = (index + 1) / panelCount;

  return (
    <div
      className={`flex h-full min-w-[100vw] shrink-0 flex-col justify-center overflow-hidden px-6 md:pr-16 md:pl-24 lg:pr-28 lg:pl-32 ${
        mobile ? "snap-start" : ""
      }`}
    >
      <div className="max-w-4xl">
        {/* Round header */}
        <div className="mb-8 md:mb-12">
          <span className="mb-2 block font-mono text-pink-500/70 text-xs uppercase tracking-[0.2em]">
            Round {data.round}
          </span>
          <h3 className="mb-2 font-bold text-2xl text-white-100 tracking-tight md:text-4xl lg:text-5xl">
            {data.company}
          </h3>
          <p className="font-medium text-sm text-teal md:text-base">
            {data.role}
            <span className="mx-2 text-muted-gray">|</span>
            {data.dates}
          </p>
          <p className="mt-2 text-muted-gray text-sm">{data.mission}</p>
        </div>

        {/* Metrics grid */}
        <div className="mb-8 grid grid-cols-2 gap-1 md:mb-12 lg:grid-cols-4">
          {data.metrics.map((metric, i) => (
            <MetricBlock
              delay={i}
              key={metric.label}
              metric={metric}
              panelStart={panelStart}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Arsenal */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-muted-gray text-xs uppercase tracking-wider">
            Arsenal:
          </span>
          {data.arsenal.map((tech) => (
            <span
              className="rounded-sm border border-white/10 bg-white/5 px-3 py-1 text-white-100/70 text-xs transition-colors duration-200 hover:border-pink-500/40 hover:text-white-100"
              key={tech}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoundPanel;
