"use client";

import * as React from "react";
import { useConsoleStore } from "@/app/useConsoleStore";
import { motion, AnimatePresence } from "framer-motion";

export const DiagnosticsPanel = () => {
  const { logMessages, activePreset, activeSelection, selectedProject, contentDepth } = useConsoleStore();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const tier = contentDepth < 34 ? 0 : contentDepth < 67 ? 1 : 2;

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logMessages]);

  const textColor = React.useMemo(() => {
    if (activePreset === "HACKER") return "text-[#00f3ff]/70";
    if (activePreset === "RETRO") return "text-[#ffb000]/70";
    return "text-emerald-400/70";
  }, [activePreset]);

  // Animation variants
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 }
      }
    }
  };

  const shapePop = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <div className="w-full h-24 bg-[#0a0a0a] border-2 border-black/80 rounded p-3 shadow-[inset:0_3px_10px_rgba(0,0,0,0.8)] flex gap-4">
      <div className="w-[45%] h-full border border-gray-700/50 rounded-sm p-2 flex flex-col items-center justify-center text-gray-600 overflow-hidden">
        <svg viewBox="0 0 120 50" className="w-full h-full transition-colors duration-500">
          <text
            x="2"
            y="10"
            fontSize="7"
            fill="currentColor"
            className="font-black tracking-[0.2em]"
          >
            SIGNAL PATH
          </text>

          {/* NODE 1: SYSTEM (Always visible) */}
          <motion.path
            d="M 10 25 L 22 25"
            stroke="currentColor"
            strokeWidth="1.5"
            initial="visible"
            animate="visible"
            variants={draw}
          />
          <text x="5" y="42" fontSize="6" fill="currentColor" className="font-bold">
            SYS
          </text>

          {/* NODE 2: MENU SELECTION */}
          <AnimatePresence>
            {activeSelection && (
              <>
                <motion.circle
                  key="cat-node"
                  cx="28"
                  cy="25"
                  r="5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  variants={shapePop}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                />
                <motion.path
                  key="cat-path"
                  d="M 33 25 L 48 25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  variants={draw}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                />
                <motion.text 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  x="22" y="42" fontSize="6" fill="currentColor" className="font-black uppercase">
                  {activeSelection.slice(0, 4)}
                </motion.text>
              </>
            )}
          </AnimatePresence>

          {/* NODE 3: PROJECT SELECTION */}
          <AnimatePresence>
            {selectedProject && (
              <>
                <motion.rect
                  key="proj-node"
                  x="50"
                  y="20"
                  width="10"
                  height="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  variants={shapePop}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                />
                <motion.path
                  key="proj-path"
                  d="M 60 25 L 75 25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  variants={draw}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                />
                <motion.text 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  x="50" y="42" fontSize="6" fill="currentColor" className="font-black uppercase">
                  {selectedProject.split('_')[0].slice(0, 4)}
                </motion.text>
              </>
            )}
          </AnimatePresence>

          {/* NODE 4: TIER LEVEL */}
          <AnimatePresence>
            {(activeSelection) && (
              <>
                <motion.path
                  key="tier-path"
                  d="M 77 25 L 90 25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  variants={draw}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                />
                <motion.polygon
                  key="tier-node"
                  points="95,20 101,30 89,30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  variants={shapePop}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                />
                <motion.text 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  x="92" y="42" fontSize="6" fill="currentColor" className="font-bold">
                  T{tier}
                </motion.text>
                <motion.text 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  x="105" y="27" fontSize="6" fill="currentColor" className="font-black">
                  RDY
                </motion.text>
              </>
            )}
          </AnimatePresence>

          {!activeSelection && (
            <text x="30" y="40" fontSize="5" fill="currentColor" className="opacity-20 italic">
              AWAIT_SEL
            </text>
          )}
        </svg>
      </div>
      <div
        ref={scrollRef}
        className={`flex-1 h-full overflow-y-auto text-[9px] font-mono transition-colors duration-500 ${textColor} space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
      >
        {logMessages.map((msg, i) => (
          <p key={i} className="whitespace-nowrap">{`> ${msg}`}</p>
        ))}
      </div>
    </div>
  );
};
