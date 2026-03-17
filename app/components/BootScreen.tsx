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
    // Phase 1 (0.0s): Fade in 'JEROD HOLLEN' - handled by initial motion.div
    
    // Phase 2 (1.0s): Fade in subtitles
    const t2 = setTimeout(() => setPhase(2), 1000);
    
    // Phase 3 (2.5s): Fade in avatar
    const t3 = setTimeout(() => setPhase(3), 2500);
    
    // Phase 4 (3.5s): Display ASCII load bar
    const t4 = setTimeout(() => setPhase(4), 3500);
    
    // Phase 5 (5.5s): Slow wink
    const t5 = setTimeout(() => {
      setPhase(5);
      setAvatarSrc("images/avatar-winking.png");
      setTimeout(() => setAvatarSrc("images/avatar-static.png"), 600);
    }, 5500);
    
    // Phase 7 (8.5s): Smooth fade out / WELCOME
    const t7 = setTimeout(() => setPhase(7), 8500);
    
    // Phase 8 (10.0s): Seamless transition
    const t8 = setTimeout(() => {
      setPhase(8);
      setTimeout(() => setBooting(false), 500);
    }, 10000);

    return () => {
      [t2, t3, t4, t5, t7, t8].forEach(clearTimeout);
    };
  }, [setBooting]);

  // Loading bar logic
  React.useEffect(() => {
    if (phase === 4) {
      const interval = setInterval(() => {
        setLoadProgress(prev => (prev < 100 ? prev + 2 : 100));
      }, 40);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const barWidth = 20;
  const filled = Math.floor((loadProgress / 100) * barWidth);
  const barText = `[${"|".repeat(filled).padEnd(barWidth, " ")}]`;

  return (
    <div className={`flex flex-col items-center justify-center h-full text-center p-6 ${theme.font}`}>
      <AnimatePresence mode="wait">
        {phase < 7 ? (
          <motion.div
            key="booting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8 flex flex-col items-center"
          >
            {/* Phase 1 & 2: Name & Subtitles */}
            <div className="space-y-2">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl font-black uppercase tracking-[0.25em]"
              >
                Jerod Hollen
              </motion.h1>
              
              {phase >= 2 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60"
                >
                  Web / Content Developer | Technical Solutions Engineer
                </motion.p>
              )}
            </div>

            {/* Phase 3: Avatar */}
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <Image
                  src={avatarSrc}
                  alt="Avatar"
                  width={140}
                  height={140}
                  className={`border-4 ${theme.border} p-1 grayscale contrast-125`}
                  unoptimized
                />
                <div className="absolute -bottom-3 -right-3 bg-white px-2 py-0.5 border-2 border-current text-[10px] font-bold uppercase tracking-widest">
                  JH_OS v3.1
                </div>
              </motion.div>
            )}

            {/* Phase 4: Loading Bar */}
            {phase >= 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-[10px] space-y-2"
              >
                <p className="tracking-[0.3em] animate-pulse">
                  {loadProgress < 100 ? "INITIALIZING SYSTEM..." : "SYSTEM READY"}
                </p>
                <p className="font-bold">{barText} {loadProgress}%</p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center space-y-4"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="text-6xl text-emerald-500"
            >
              [ ✔ ]
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-black uppercase tracking-[0.5em]"
            >
              Welcome
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
