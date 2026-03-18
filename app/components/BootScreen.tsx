"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useConsoleStore } from "@/app/useConsoleStore";

interface ThemeStyles {
  font?: string;
  border: string;
}

export const BootScreen: React.FC<{ theme: ThemeStyles }> = ({ theme }) => {
  const [phase, setPhase] = React.useState(1);
  const [avatarSrc, setAvatarSrc] = React.useState("images/avatar-static.png");
  const [loadProgress, setLoadProgress] = React.useState(0);
  const setBooting = useConsoleStore((s) => s.setBooting);

  React.useEffect(() => {
    // Phase 1 (0.0s): Synchronized Entry: Avatar + Name (handled by initial state)

    // Phase 2 (1.2s): Start Loading
    const t2 = setTimeout(() => setPhase(2), 1200);

    // Phase 3 (3.5s): Loading Complete & Flash "System_Ready"
    const t3 = setTimeout(() => setPhase(3), 3500);

    // Phase 4 (4.0s): Wink Happens AFTER Loading
    const t4 = setTimeout(() => {
      setAvatarSrc("images/avatar-winking.png");
      setTimeout(() => setAvatarSrc("images/avatar-static.png"), 600);
    }, 4000);

    // Phase 5 (5.5s): Welcome message
    const t5 = setTimeout(() => setPhase(4), 5500);

    // Phase 6 (6.5s): Done
    const t6 = setTimeout(() => {
      setBooting(false);
    }, 6500);

    return () => {
      [t2, t3, t4, t5, t6].forEach(clearTimeout);
    };
  }, [setBooting]);

  React.useEffect(() => {
    if (phase === 2) {
      const interval = setInterval(() => {
        setLoadProgress((prev) => (prev < 100 ? prev + 5 : 100));
      }, 40);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const barWidth = 20;
  const filled = Math.floor((loadProgress / 100) * barWidth);
  const barText = `[${"|".repeat(filled).padEnd(barWidth, " ")}]`;

  return (
    <div
      className={`flex flex-col items-center justify-center h-full text-center p-6 relative overflow-hidden font-inter`}
    >
      <AnimatePresence mode="wait">
        {phase < 4 ? (
          <motion.div
            key="booting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center w-full max-w-md"
          >
            {/* Slot 1: Avatar */}
            <div className="flex items-center justify-center mb-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <Image
                  src={avatarSrc}
                  alt="Avatar"
                  width={130}
                  height={130}
                  className={`border-4 ${theme.border} p-1 grayscale contrast-125 bg-white/5`}
                  unoptimized
                />
              </motion.div>
            </div>

            {/* Slot 2: Name & Subtitle */}
            <div className="text-black flex flex-col justify-center h-16">
              <h1 className="text-4xl font-black uppercase tracking-tight font-playfair mb-1">
                Jerod Hollen
              </h1>
              <div className="h-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-70">
                  Web Developer | Technical Solutions Engineer
                </p>
              </div>
            </div>

            {/* Slot 3: Loading Bar */}
            <div className="h-12 text-black flex flex-col items-center justify-center">
              {phase >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-[9px] space-y-1"
                >
                  <p className="tracking-[0.2em] font-bold opacity-60 uppercase">
                    {loadProgress < 100
                      ? "Initializing_System"
                      : "System_Ready"}
                  </p>
                  <p className="font-bold tracking-tighter">
                    {barText} {loadProgress}%
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="text-7xl font-black text-black"
            >
              [✔]
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl text-gray-800 uppercase tracking-[0.4em] font-playfair"
            >
              Welcome
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
