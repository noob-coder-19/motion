import { motion, useInView } from "motion/react";
import { useRef } from "react";
import SurvivedStamp from "./survived-stamp";

type MarkerShape = "circle" | "triangle" | "square";

interface Achievement {
  detail: string;
  label: string;
  metric: string;
}

interface GameCardProps {
  achievements: Achievement[];
  arsenal: string[];
  company: string;
  dates: string;
  marker: MarkerShape;
  mission: string;
  role: string;
  round: number;
}

const MARKER_LABELS: Record<MarkerShape, string> = {
  circle: "\u25CB",
  triangle: "\u25B3",
  square: "\u25A1",
};

const GameCard = ({
  round,
  company,
  role,
  dates,
  mission,
  achievements,
  arsenal,
  marker,
}: GameCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      className="relative rounded-[4px] border border-card-border bg-card-bg p-6 transition-shadow duration-300 hover:border-pink-500 hover:shadow-[0_0_12px_rgba(237,27,118,0.3)] md:p-8"
      initial={{ opacity: 0, y: 24 }}
      ref={cardRef}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Mobile marker badge */}
      <div className="mb-4 flex items-center gap-2 md:hidden">
        <span className="flex h-6 w-6 items-center justify-center border border-pink-500 text-pink-500 text-xs">
          {MARKER_LABELS[marker]}
        </span>
        <span className="font-bold text-pink-500 text-xs uppercase tracking-wider">
          ROUND {round}
        </span>
      </div>

      {/* Card header */}
      <div className="mb-4">
        <div className="mb-1 flex items-center gap-2">
          <span className="hidden text-muted-gray text-xs md:inline">
            ROUND {round}
          </span>
          <span className="hidden text-muted-gray md:inline">◈</span>
          <h3 className="font-bold text-white text-xl md:text-2xl">
            {company}
          </h3>
        </div>
        <p className="font-medium text-teal">
          {role} | {dates}
        </p>
      </div>

      {/* Mission */}
      <div className="mb-5 border-card-border border-t pt-4">
        <p className="text-muted-gray text-sm">
          <span className="mr-2 font-bold text-white">MISSION:</span>
          {mission}
        </p>
      </div>

      {/* Achievements */}
      <div className="mb-5">
        <p className="mb-3 font-bold text-sm text-white tracking-wider">
          ACHIEVEMENTS:
        </p>
        <ul className="flex flex-col gap-2.5">
          {achievements.map((achievement) => (
            <li
              className="flex gap-2 text-sm text-white/80"
              key={achievement.label}
            >
              <span className="shrink-0 font-bold text-gold">
                {achievement.metric}
              </span>
              <span>
                <span className="font-semibold text-white">
                  {achievement.label}:
                </span>{" "}
                {achievement.detail}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Arsenal */}
      <div className="mb-8">
        <p className="mb-2 font-bold text-sm text-white tracking-wider">
          ARSENAL:
        </p>
        <div className="flex flex-wrap gap-2">
          {arsenal.map((tech) => (
            <span
              className="rounded bg-white/10 px-2 py-0.5 text-sm text-white/80"
              key={tech}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Survived stamp */}
      <SurvivedStamp inView={inView} />
    </motion.div>
  );
};

export default GameCard;
export type { Achievement, GameCardProps, MarkerShape };
