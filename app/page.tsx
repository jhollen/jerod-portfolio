"use client";

import * as React from "react";
import { motion, useMotionValue } from "framer-motion";
import { useConsoleStore } from "./useConsoleStore";
import { LCDDisplay } from "./components/LCDDisplay";
import { Knob } from "./components/Knob";
import { SyncLed } from "./components/SyncLed";
import { VCABank } from "./components/VCABank";
import { VerticalMeter } from "./components/VerticalMeter";
import { DiagnosticsPanel } from "./components/DiagnosticsPanel";
import { GitHubDisplay } from "./components/GitHubDisplay";
import { PROJECTS_DATA } from "./constants";

export default function AudioConsolePage() {
  const {
    menuIndex,
    setMenuIndex,
    tabIndex,
    setTabIndex,
    activeSelection,
    setActiveSelection,
    selectedProject,
    contentDepth,
    setContentDepth,
    panDepth,
    setPanDepth,
    addLogMessage,
    activePreset,
    triggerTabSpike,
  } = useConsoleStore();

  const menus = ["BIO", "PROJECTS", "STACK", "CONTACT"];
  const tabsCount = selectedProject ? 4 : 0;

  const leftMeterActivity = useMotionValue(0);
  const rightMeterActivity = useMotionValue(0);

  // Sync panDepth with tabIndex for hardware dial rotation
  React.useEffect(() => {
    if (selectedProject && tabsCount > 1) {
      const targetPan = (tabIndex / (tabsCount - 1)) * 100;
      if (Math.abs(panDepth - targetPan) > 1) {
        setPanDepth(targetPan);
      }
    }
  }, [tabIndex, selectedProject, tabsCount, panDepth, setPanDepth]);

  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#0a0a0a] flex items-center justify-center p-4 lg:p-8 font-sans select-none touch-none overscroll-none">
      <div className="w-full max-w-7xl h-full max-h-[90vh] flex flex-col rounded-2xl bg-brushed-metal border-[3px] border-[#181a1f] shadow-[inset:0_15px_30px_rgba(255,255,255,0.03),inset_0_-10px_20px_rgba(0,0,0,0.6),0_40px_80px_rgba(0,0,0,1)] relative overflow-hidden">
        {/* Branding Header */}
        <div className="h-14 shrink-0 flex items-center justify-between px-8 z-20 border-b border-black/20">
          <div className="flex items-center gap-4">
            <div
              className={`w-4 h-4 rounded-full border border-black shadow-[0_0_10px] transition-all duration-500 ${
                activePreset === "HACKER"
                  ? "bg-[#00f3ff] shadow-[#00f3ff]"
                  : activePreset === "RETRO"
                    ? "bg-[#ffb000] shadow-[#ffb000]"
                    : "bg-cyan-500 shadow-[#06b6d4]"
              }`}
            />
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-[0.2em] text-sm uppercase">
                Jerod Hollen
              </span>
              <span className="text-gray-500 font-bold tracking-[0.1em] text-[10px] uppercase">
                Full Stack Engineer | Systems Architect
              </span>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-gray-600 font-bold tracking-[0.3em] text-[9px] uppercase">
              PORTFOLIO COMPRESSOR V3.1
            </span>
          </div>
        </div>

        <div className="p-8 sm:p-12 pb-16 flex-1 flex flex-col relative z-10">
          <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 relative z-10 w-full justify-between items-stretch h-full max-w-[1200px] mx-auto">
            {/* Left Section: Input/Output Meters & Navigation */}
            <div className="hidden xl:flex flex-row gap-10 h-full shrink-0 relative">
              {/* NAVIGATOR Column */}
              <div className="flex flex-col items-center justify-between h-full w-20 pb-2">
                <div className="flex-1 w-full min-h-0 flex items-stretch justify-center pb-6 pt-2">
                  <VerticalMeter activityMv1={leftMeterActivity} type="nav" />
                </div>
                <div className="flex flex-col items-center gap-4 shrink-0 w-full">
                  <Knob
                    label="NAVIGATOR"
                    minLabel="-"
                    centerLabel="NAV"
                    maxLabel="+"
                    isActive={true}
                    activityMv={leftMeterActivity}
                    steps={
                      activeSelection === "PROJECTS" && !selectedProject
                        ? PROJECTS_DATA.length
                        : menus.length
                    }
                    value={menuIndex}
                    onChange={(newIdx) => {
                      setMenuIndex(newIdx);
                      if (activeSelection === "PROJECTS" && !selectedProject) {
                        addLogMessage(
                          `NAVIGATOR: [PROJECT_PREVIEW: ${PROJECTS_DATA[newIdx].title}]`,
                        );
                      } else {
                        addLogMessage(`NAVIGATOR: ${menus[newIdx]}`);
                        if (!activeSelection) {
                          setActiveSelection(menus[newIdx]);
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* INFO GAIN Column */}
              <div className="flex flex-col items-center justify-between h-full w-20 pb-2">
                <div className="flex-1 w-full min-h-0 flex items-stretch justify-center pb-6 pt-2">
                  <VerticalMeter activityMv1={leftMeterActivity} type="tab" />
                </div>
                <div className="flex flex-col items-center gap-4 shrink-0 w-full">
                  <Knob
                    label="INFO GAIN"
                    minLabel="LEFT"
                    centerLabel="TAB"
                    maxLabel="RIGHT"
                    isActive={!!selectedProject}
                    activityMv={leftMeterActivity}
                    steps={tabsCount}
                    value={tabIndex}
                    onChange={(newIndex) => {
                      if (selectedProject) {
                        setTabIndex(newIndex);
                        const labels = [
                          "OVERVIEW",
                          "THE BREACH",
                          "DEPLOYMENT",
                          "RESULTS",
                        ];
                        addLogMessage(
                          `INFO_GAIN: ${labels[newIndex] || "UNKNOWN"}`,
                        );
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="hidden xl:block w-px bg-black/50 shadow-[1px_0_0_rgba(255,255,255,0.05)] my-12" />

            <div className="flex flex-col flex-1 max-w-[800px] w-full mx-auto gap-4 items-center">
              <div className="w-full flex flex-col pt-1 h-full gap-4">
                {/* LCD Displays */}
                <div className="relative flex-1 flex flex-col">
                  <LCDDisplay menus={menus} />
                </div>

                {/* GitHub Secondary Display */}
                <div className="w-full">
                  <GitHubDisplay />
                </div>

                {/* Diagnostics Panel */}
                <div className="w-full">
                  <DiagnosticsPanel />
                </div>
              </div>
            </div>

            {/* Right Section: Auxiliary & Presets */}
            <div className="w-48 hidden lg:flex flex-col justify-center items-center h-full shrink-0 relative">
              <div className="flex flex-col items-center gap-12">
                {/* Traversal Dials - Vertically Centered */}
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col items-center gap-2">
                    <Knob
                      label="SCRUB"
                      minLabel="UP"
                      centerLabel="SCROLL"
                      maxLabel="DOWN"
                      value={contentDepth}
                      onChange={(val) => {
                        setContentDepth(val);
                      }}
                      activityMv={rightMeterActivity}
                      isActive={
                        (activeSelection === "BIO" ||
                          activeSelection === "STACK") &&
                        !selectedProject
                      }
                      isDisabled={
                        activeSelection === "CONTACT" ||
                        activeSelection === "PROJECTS" ||
                        !!selectedProject
                      }
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2 relative">
                    <Knob
                      label="PAN"
                      minLabel="LEFT"
                      centerLabel="TAB"
                      maxLabel="RIGHT"
                      value={selectedProject ? tabIndex : panDepth}
                      steps={selectedProject ? tabsCount : 0}
                      onChange={(val) => {
                        if (selectedProject) {
                          setTabIndex(val);
                          triggerTabSpike();
                        } else {
                          setPanDepth(val);
                        }
                      }}
                      activityMv={rightMeterActivity}
                      isActive={activeSelection === "PROJECTS"}
                      isDisabled={activeSelection !== "PROJECTS"}
                    />
                    {/* Carousel Progress LED */}
                    <div className="absolute -bottom-8 w-1 h-6 bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        className={`w-full ${
                          activePreset === "HACKER"
                            ? "bg-[#00f3ff] shadow-[0_0_5px_#00f3ff]"
                            : activePreset === "RETRO"
                              ? "bg-[#ffb000] shadow-[0_0_5px_#ffb000]"
                              : "bg-cyan-500 shadow-[0_0_5px_#06b6d4]"
                        }`}
                        style={{
                          height: `${selectedProject ? (tabIndex / (tabsCount - 1)) * 100 : panDepth}%`,
                        }}
                        animate={{
                          opacity: activeSelection === "PROJECTS" ? 1 : 0.2,
                          scaleX: [1, 1.2, 1],
                        }}
                        transition={{
                          scaleX: {
                            repeat: Infinity,
                            duration: 0.1,
                            ease: "linear",
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Hardware Control Section (Presets) - Positioned Beneath Knobs */}
                <div className="w-full flex flex-col gap-4">
                  <VCABank />
                </div>
              </div>

              <div className="absolute bottom-0 w-full flex justify-center pt-4 border-t border-black/30 shadow-[0_-1px_0_rgba(255,255,255,0.05)]">
                <SyncLed />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
