import {
  type MotionValue,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import ProgressionTracker from "./games-survived/progression-tracker";
import type { RoundData } from "./games-survived/round-panel";
import RoundPanel from "./games-survived/round-panel";
import SurvivedBar from "./games-survived/survived-stamp";

const EXPERIENCES: RoundData[] = [
  {
    round: 2,
    company: "GOODSCORE (formerly Rupicard)",
    role: "Software Engineer",
    dates: "APR 2025 – CURRENT",
    mission: "End-to-end full stack & infra dev",
    metrics: [
      {
        value: "10x",
        label: "Revenue Growth",
        detail:
          "Architected collection payment systems, scaling monthly revenue from 3.5M to 34M.",
      },
      {
        value: "71%",
        label: "Cost Reduction",
        detail:
          "Built in-house Customer Experience platform, eliminating third-party dependencies.",
      },
      {
        value: "3.5x",
        label: "Performance",
        detail:
          "Refactored legacy Node.js to Java, slashing p75 load times from 4.41s to 1.26s.",
      },
      {
        value: "85%",
        label: "Media Optimized",
        detail:
          "Custom HLS player reducing initial payload (5.4MB to 786kb), saving 4.8M/month in CDN costs.",
      },
    ],
    arsenal: ["Java", "Go", "React.js", "Node.js", "AWS", "Pub/Sub"],
    marker: "triangle",
  },
  {
    round: 1,
    company: "zMed Healthcare",
    role: "Software Engineer",
    dates: "JAN 2023 – APR 2025",
    mission: "Real-time healthcare systems & API dev",
    metrics: [
      {
        value: "75%",
        label: "Efficiency Boost",
        detail:
          "Built real-time alert system (Kafka, WebSockets), optimizing physical nurse rounds in critical care.",
      },
      {
        value: "82%",
        label: "Recovery Speed",
        detail:
          "Engineered AWS/MySQL/MongoDB monitoring, cutting recovery time from 63 mins to 11 mins.",
      },
      {
        value: "3",
        label: "Markets Opened",
        detail:
          "Led zMed API (Express.js, PostgreSQL) for Middle East integration, featured at Indian Mobile Congress 2023.",
      },
      {
        value: "50+",
        label: "GenAI Patients",
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

const PANEL_COUNT = 3;

const HeaderPanel = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.15], [0, -40]);

  return (
    <div className="flex h-full min-w-[100vw] shrink-0 flex-col items-start justify-center px-8 md:px-20 lg:px-32">
      <motion.div style={{ opacity, y }}>
        <p className="mb-4 font-mono text-pink-500 text-xs uppercase tracking-[0.3em]">
          Experience
        </p>
        <h2 className="mb-6 font-bold text-5xl text-white-100 tracking-tight md:text-7xl lg:text-8xl">
          GAMES
          <br />
          SURVIVED
        </h2>
        <p className="max-w-md text-base text-muted-gray leading-relaxed md:text-lg">
          Navigating complex systems, eliminating technical debt, and delivering
          measurable business impact.
        </p>
      </motion.div>
    </div>
  );
};

const GamesSurvived = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const xPercent = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -((PANEL_COUNT - 1) / PANEL_COUNT) * 100]
  );

  return (
    <section
      aria-labelledby="games-survived-heading"
      className="noise-overlay relative bg-[#0A0A0A]"
      id="games-survived"
      ref={sectionRef}
      style={{ height: `${PANEL_COUNT * 100}vh` }}
    >
      <h2 className="sr-only" id="games-survived-heading">
        Games Survived
      </h2>

      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Progression tracker -- absolute inside sticky so only visible in this section */}
        <ProgressionTracker scrollYProgress={scrollYProgress} />

        {/* Horizontal panel row -- desktop (scroll-driven) */}
        <motion.div
          className="hidden h-full md:flex"
          style={{
            width: `${PANEL_COUNT * 100}vw`,
            x: useTransform(xPercent, (v) => `${v}%`),
          }}
        >
          <HeaderPanel scrollYProgress={scrollYProgress} />
          {EXPERIENCES.map((exp, i) => (
            <RoundPanel
              data={exp}
              index={i}
              key={exp.round}
              panelCount={PANEL_COUNT}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        {/* Mobile: native horizontal scroll-snap */}
        <div className="flex h-full snap-x snap-mandatory overflow-x-auto md:hidden">
          <div className="flex h-full min-w-[100vw] shrink-0 snap-start flex-col items-start justify-center px-6">
            <p className="mb-3 font-mono text-pink-500 text-xs uppercase tracking-[0.3em]">
              Experience
            </p>
            <h2 className="mb-4 font-bold text-4xl text-white-100 tracking-tight">
              GAMES
              <br />
              SURVIVED
            </h2>
            <p className="max-w-xs text-muted-gray text-sm leading-relaxed">
              Navigating complex systems, eliminating technical debt, and
              delivering measurable business impact.
            </p>
          </div>
          {EXPERIENCES.map((exp) => (
            <RoundPanel
              data={exp}
              index={0}
              key={exp.round}
              mobile
              panelCount={PANEL_COUNT}
            />
          ))}
        </div>

        {/* Survived wipe bar */}
        <SurvivedBar scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
};

export default GamesSurvived;
