"use client";

import * as React from "react";
import { useConsoleStore } from "@/app/useConsoleStore";
import { motion, AnimatePresence } from "framer-motion";

export const DiagnosticsPanel = () => {
  const { 
    logMessages, 
    activePreset, 
    activeSelection, 
    selectedProject, 
    bioTier, 
    projectsTier, 
    stackTier 
  } = useConsoleStore();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const currentTier = 
    activeSelection === "BIO" ? bioTier :
    activeSelection === "PROJECTS" ? projectsTier :
    activeSelection === "STACK" ? stackTier : 1;

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
  } as const;

  const shapePop = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  } as const;

  return (
    <div className="w-full h-24 bg-[#0a0a0a] border-2 border-black/80 rounded p-3 shadow-[inset:0_3px_10px_rgba(0,0,0,0.8)] flex gap-4">
      <div className="w-[55%] h-full border border-gray-700/50 rounded-sm p-2 flex flex-col items-center justify-center text-gray-600 overflow-hidden">
        <svg viewBox="0 0 140 50" className="w-full h-full transition-colors duration-500">
          <text
            x="2"
            y="10"
            fontSize="7"
            fill="currentColor"
            className="font-black tracking-[0.2em]"
          >
            SIGNAL PATH
          </text>

          {/* NODE 1: MENU (Always visible) */}
          <motion.path
            d="M 5 25 L 15 25"
            stroke="currentColor"
            strokeWidth="1.5"
            initial="visible"
            animate="visible"
            variants={draw}
          />
          <text x="2" y="42" fontSize="6" fill="currentColor" className="font-bold">
            MENU
          </text>

          {/* NODE 2: SELECTION (Square) */}
          <AnimatePresence>
            {activeSelection && (
              <>
                <motion.path
                  key="sel-path"
                  d="M 15 25 L 25 25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  variants={draw}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                />
                <motion.rect
                  key="sel-node"
                  x="25"
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
                <motion.text 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  x="25" y="42" fontSize="6" fill="currentColor" className="font-black uppercase">
                  {activeSelection.slice(0, 4)}
                </motion.text>
              </>
            )}
          </AnimatePresence>

          {/* ZOOM NODES: T1 -> T2 -> T3 */}
          <AnimatePresence>
            {activeSelection && (
              <>
                {/* T1 Node */}
                <motion.path
                  key="t1-path"
                  d="M 35 25 L 45 25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  variants={draw}
                  initial="hidden"
                  animate="visible"
                />
                <motion.circle
                  key="t1-node"
                  cx="50"
                  cy="25"
                  r="3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  variants={shapePop}
                  initial="hidden"
                  animate="visible"
                />
                <motion.text 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  x="47" y="42" fontSize="5" fill="currentColor" className="font-bold">
                  T1
                </motion.text>

                {/* T2 Node */}
                {currentTier >= 2 && (
                  <>
                    <motion.path
                      key="t2-path"
                      d="M 53 25 L 63 25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      variants={draw}
                      initial="hidden"
                      animate="visible"
                    />
                    <motion.circle
                      key="t2-node"
                      cx="68"
                      cy="25"
                      r="4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      variants={shapePop}
                      initial="hidden"
                      animate="visible"
                    />
                    <motion.text 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      x="65" y="42" fontSize="5" fill="currentColor" className="font-bold">
                      T2
                    </motion.text>
                  </>
                )}

                {/* T3 Node */}
                {currentTier >= 3 && (
                  <>
                    <motion.path
                      key="t3-path"
                      d="M 72 25 L 82 25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      variants={draw}
                      initial="hidden"
                      animate="visible"
                    />
                    <motion.circle
                      key="t3-node"
                      cx="87"
                      cy="25"
                      r="5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      variants={shapePop}
                      initial="hidden"
                      animate="visible"
                    />
                    <motion.text 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      x="84" y="42" fontSize="5" fill="currentColor" className="font-bold">
                      T3
                    </motion.text>
                  </>
                )}

                {/* PROJECT NAME (If selected) */}
                {selectedProject && (
                  <>
                    <motion.path
                      key="proj-path"
                      d="M 92 25 L 105 25"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      variants={draw}
                      initial="hidden"
                      animate="visible"
                    />
                    <motion.text 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      x="108" y="27" fontSize="6" fill="currentColor" className="font-black uppercase">
                      {selectedProject.split('_')[0].slice(0, 6)}
                    </motion.text>
                  </>
                )}
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
