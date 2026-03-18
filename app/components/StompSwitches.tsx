"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConsoleStore } from "@/app/useConsoleStore";
import { PROJECTS_DATA } from "../constants";

export const StompSwitches = () => {
  const {
    menuIndex,
    setMenuIndex,
    tabIndex,
    setTabIndex,
    activeSelection,
    setActiveSelection,
    selectedProject,
    setSelectedProject,
    addLogMessage,
    triggerNavSpike,
    triggerTabSpike,
    panDepth,
    setPanDepth,
  } = useConsoleStore();

  const [activeButton, setActiveButton] = React.useState<string | null>(null);
  const menus = ["BIO", "PROJECTS", "STACK", "CONTACT"];

  const handlePress = (type: "PREV" | "SELECT" | "NEXT") => {
    setActiveButton(type);
    setTimeout(() => setActiveButton(null), 150);

    const totalMenus = menus.length;
    const isProjectIndex = activeSelection === "PROJECTS" && !selectedProject;
    const isProjectTabs = !!selectedProject;

    if (type === "SELECT") {
      if (!activeSelection) {
        const name = menus[menuIndex];
        setActiveSelection(name);
        setMenuIndex(0);
        triggerNavSpike();
        addLogMessage(`EXEC: [${name}]`);
      } else if (isProjectIndex) {
        const currentProjIdx = Math.min(
          Math.floor((panDepth / 100) * PROJECTS_DATA.length),
          PROJECTS_DATA.length - 1
        );
        const p = PROJECTS_DATA[currentProjIdx];
        setSelectedProject(p.id);
        setTabIndex(0);
        triggerNavSpike();
        addLogMessage(`MOUNT: ${p.id}`);
      }
      return;
    }

    // Prev/Next Logic
    if (!activeSelection) {
      // Main Menu Navigation
      const newIdx = type === "NEXT" 
        ? (menuIndex + 1) % totalMenus 
        : (menuIndex - 1 + totalMenus) % totalMenus;
      setMenuIndex(newIdx);
      addLogMessage(`NAVIGATOR: ${menus[newIdx]}`);
    } else if (isProjectIndex) {
      // Projects Index Navigation
      const total = PROJECTS_DATA.length;
      const currentProjIdx = Math.min(
        Math.floor((panDepth / 100) * total),
        total - 1
      );
      const newIdx = type === "NEXT"
        ? Math.min(total - 1, currentProjIdx + 1)
        : Math.max(0, currentProjIdx - 1);
      setPanDepth((newIdx / (total - 1)) * 100);
      addLogMessage(`NAVIGATOR: [PROJECT_PREVIEW: ${PROJECTS_DATA[newIdx].title}]`);
    } else if (isProjectTabs) {
      // Project Tab Navigation
      const totalTabs = 4;
      const newIdx = type === "NEXT"
        ? (tabIndex + 1) % totalTabs
        : (tabIndex - 1 + totalTabs) % totalTabs;
      setTabIndex(newIdx);
      triggerTabSpike();
      const labels = ["OVERVIEW", "THE BREACH", "DEPLOYMENT", "RESULTS"];
      addLogMessage(`INFO_GAIN: ${labels[newIdx]}`);
    }
  };

  const Switch = ({ label, type }: { label: string; type: "PREV" | "SELECT" | "NEXT" }) => (
    <div className="flex flex-col items-center gap-4">
      {/* LED */}
      <div className="w-6 h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
        <AnimatePresence>
          {activeButton === type && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full bg-[#00f3ff] shadow-[0_0_10px_#00f3ff]"
            />
          )}
        </AnimatePresence>
      </div>

      {/* 3D Stomp Switch */}
      <button
        onClick={() => handlePress(type)}
        className="relative w-16 h-16 rounded-full group outline-none active:translate-y-1 transition-transform"
      >
        {/* Outer Ring/Base */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#4a4e54] to-[#1a1c1f] shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-black/40" />
        
        {/* Inner Cylinder */}
        <div className="absolute inset-[15%] rounded-full bg-[radial-gradient(circle_at_30%_30%,#6b7280,#1f2937)] shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-black/60 flex items-center justify-center overflow-hidden">
          {/* Top Bevel/Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          <span className="text-white/80 font-black text-sm tracking-tighter drop-shadow-md z-10">
            {label}
          </span>
        </div>
      </button>
    </div>
  );

  return (
    <div className="w-full h-full flex items-center justify-around px-4">
      <Switch label="<" type="PREV" />
      <Switch label="SELECT" type="SELECT" />
      <Switch label=">" type="NEXT" />
    </div>
  );
};
