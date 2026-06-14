import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const PHASE_LOADING = 1;
const PHASE_HEADER = 2;
const PHASE_DATA = 3;

const LOADING_DURATION_MS = 1500;
const HEADER_DELAY_MS = 500;
const DATA_LINE_STAGGER_S = 0.15;

const SPECIALIZATIONS = [
  "Backend Systems",
  "Distributed Systems",
  "React",
  "Node.js",
] as const;

const ProfileRow = ({
  label,
  value,
  index,
}: {
  label: string;
  value: string;
  index: number;
}) => (
  <motion.div
    animate={{ opacity: 1, y: 0 }}
    className="flex gap-2"
    initial={{ opacity: 0, y: 4 }}
    transition={{ duration: 0.3, delay: index * DATA_LINE_STAGGER_S }}
  >
    <span className="text-terminal-green-dim">{label}</span>
    <span className="flex-1 text-terminal-green-dim opacity-30">
      {"·".repeat(20)}
    </span>
    <span className="text-terminal-green">{value}</span>
  </motion.div>
);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }

    setPhase(PHASE_LOADING);

    const headerTimer = setTimeout(() => {
      setPhase(PHASE_HEADER);
    }, LOADING_DURATION_MS);

    const dataTimer = setTimeout(() => {
      setPhase(PHASE_DATA);
    }, LOADING_DURATION_MS + HEADER_DELAY_MS);

    return () => {
      clearTimeout(headerTimer);
      clearTimeout(dataTimer);
    };
  }, [inView]);

  return (
    <section
      className="scanlines relative flex h-screen items-center justify-center overflow-hidden bg-black font-mono"
      id="about"
      ref={sectionRef}
    >
      <div className="relative z-0 flex w-full max-w-xl flex-col gap-6 px-6">
        {/* Organization header */}
        {phase >= PHASE_LOADING && (
          <motion.div
            animate={{ opacity: 1 }}
            className="flex flex-col gap-1"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-terminal-green-dim text-xs tracking-widest">
              [SQUID GAME ORGANIZATION]
            </span>
            <span className="text-terminal-green-dim text-xs">
              PLAYER DATABASE v2.1
            </span>
          </motion.div>
        )}

        {/* Loading bar */}
        {phase >= PHASE_LOADING && (
          <motion.div
            animate={{ opacity: 1 }}
            className="flex flex-col gap-2"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <span className="text-sm text-terminal-green">
              {">"} FETCHING PLAYER PROFILE...
            </span>
            <div className="h-3 w-full border border-terminal-green/40">
              <motion.div
                animate={{ width: "100%" }}
                className="h-full bg-terminal-green/80"
                initial={{ width: "0%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}

        {/* Player card */}
        {phase >= PHASE_HEADER && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col border border-terminal-green/50"
            initial={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.4 }}
          >
            {/* Card header */}
            <div className="flex items-center justify-between border-terminal-green/50 border-b px-5 py-3">
              <span className="font-bold text-sm text-terminal-green tracking-wider">
                PLAYER #456
              </span>
              <span className="text-terminal-green-dim text-xs tracking-wider">
                STATUS: <span className="text-terminal-green">ACTIVE</span>
              </span>
            </div>

            {/* Card body */}
            <div className="flex flex-col gap-3 px-5 py-5 text-left text-sm">
              {phase >= PHASE_DATA && (
                <>
                  <ProfileRow index={0} label="NAME" value="AYUSH" />
                  <ProfileRow index={1} label="ROLE" value="SDE-II" />
                  <ProfileRow index={2} label="LOCATION" value="INDIA" />

                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 flex flex-col gap-1.5"
                    initial={{ opacity: 0, y: 4 }}
                    transition={{
                      duration: 0.3,
                      delay: 3 * DATA_LINE_STAGGER_S,
                    }}
                  >
                    <span className="text-terminal-green-dim">
                      SPECIALIZATION:
                    </span>
                    {SPECIALIZATIONS.map((spec, i) => (
                      <motion.span
                        animate={{ opacity: 1, x: 0 }}
                        className="pl-4 text-terminal-green"
                        initial={{ opacity: 0, x: -4 }}
                        key={spec}
                        transition={{
                          duration: 0.2,
                          delay: (4 + i) * DATA_LINE_STAGGER_S,
                        }}
                      >
                        {">"} {spec}
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2"
                    initial={{ opacity: 0, y: 4 }}
                    transition={{
                      duration: 0.3,
                      delay: 8 * DATA_LINE_STAGGER_S,
                    }}
                  >
                    <ProfileRow
                      index={0}
                      label="YEARS PLAYED"
                      value="2.5 YEARS"
                    />
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Record end */}
        {phase >= PHASE_DATA && (
          <motion.div
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              delay: 9 * DATA_LINE_STAGGER_S,
            }}
          >
            <span className="text-terminal-green-dim text-xs tracking-widest">
              [RECORD END]
            </span>
            <span className="terminal-cursor" />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default About;
