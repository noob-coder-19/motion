import { motion, useInView, useScroll } from "motion/react";
import { useRef } from "react";
import type { Achievement, MarkerShape } from "./games-survived/game-card";
import GameCard from "./games-survived/game-card";
import ProgressionTracker from "./games-survived/progression-tracker";

interface Experience {
  achievements: Achievement[];
  arsenal: string[];
  company: string;
  dates: string;
  marker: MarkerShape;
  mission: string;
  role: string;
  round: number;
}

const EXPERIENCES: Experience[] = [
  {
    round: 2,
    company: "GOODSCORE (formerly Rupicard)",
    role: "Software Engineer",
    dates: "APR 2024 – CURRENT",
    mission: "End-to-end full stack & infra dev",
    achievements: [
      {
        metric: "10x",
        label: "Revenue Growth",
        detail:
          "Architected collection payment systems, scaling monthly revenue from 3.5M to 34M.",
      },
      {
        metric: "71%",
        label: "Cost Reduction",
        detail:
          "Built in-house React CX platforms, eliminating third-party dependencies.",
      },
      {
        metric: "3.5x",
        label: "Performance Overhaul",
        detail:
          "Refactored legacy Node.js to Java, slashing p75 load times from 4.41s to 1.26s.",
      },
      {
        metric: "85%",
        label: "Media Optimization",
        detail:
          "Developed custom HLS player, reducing initial payload (5.4MB to 786kb) and saving 4.8M/month in CDN costs.",
      },
    ],
    arsenal: ["Java", "Go", "React.js", "Node.js", "HLS"],
    marker: "triangle",
  },
  {
    round: 1,
    company: "zMed Healthcare",
    role: "Software Engineer",
    dates: "JAN 2023 – APR 2025",
    mission: "Real-time healthcare systems & API dev",
    achievements: [
      {
        metric: "75%",
        label: "Efficiency Boost",
        detail:
          "Built real-time alert system (Kafka, WebSockets), optimizing physical nurse rounds in critical care.",
      },
      {
        metric: "82%",
        label: "Disaster Recovery",
        detail:
          "Engineered AWS/MySQL/MongoDB monitoring, cutting recovery time from 63 mins to 11 mins.",
      },
      {
        metric: "3",
        label: "Market Expansion",
        detail:
          "Led zMed API (Express.js, PostgreSQL) for Middle East integration, featured alongside Jio at Indian Mobile Congress 2023.",
      },
      {
        metric: "50+",
        label: "GenAI Innovation",
        detail:
          "Implemented AI-driven data accessibility pilot with 50+ patients (IMC 2024).",
      },
    ],
    arsenal: [
      "Node.js",
      "React",
      "Kafka",
      "AWS",
      "PostgreSQL",
      "MongoDB",
      "Generative AI",
    ],
    marker: "square",
  },
];

const GamesSurvived = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      aria-labelledby="games-survived-heading"
      className="relative min-h-screen snap-start bg-[#0D0D0D] px-6 py-20 md:px-12 lg:px-20"
      id="games-survived"
      ref={sectionRef}
    >
      {/* Section header */}
      <motion.div
        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        className="mb-16 max-w-3xl"
        initial={{ opacity: 0, y: 16 }}
        ref={headerRef}
        transition={{ duration: 0.5 }}
      >
        <h2
          className="mb-3 font-bold text-3xl text-white tracking-wider md:text-4xl"
          id="games-survived-heading"
        >
          GAMES SURVIVED
        </h2>
        <p className="text-muted-gray text-sm leading-relaxed md:text-base">
          Navigating complex systems, eliminating technical debt, and delivering
          measurable business impact.
        </p>
      </motion.div>

      {/* Timeline layout */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-[80px_1fr] md:gap-12">
        {/* Progression tracker - desktop only */}
        <ProgressionTracker scrollYProgress={scrollYProgress} />

        {/* Game cards */}
        <div className="flex flex-col gap-10">
          {EXPERIENCES.map((exp) => (
            <GameCard
              achievements={exp.achievements}
              arsenal={exp.arsenal}
              company={exp.company}
              dates={exp.dates}
              key={exp.round}
              marker={exp.marker}
              mission={exp.mission}
              role={exp.role}
              round={exp.round}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamesSurvived;
