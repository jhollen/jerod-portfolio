"use client";

import * as React from "react";
import { useMotionValue } from "framer-motion";
import { useConsoleStore } from "./useConsoleStore";
import { LCDDisplay } from "./components/LCDDisplay";
import { Knob } from "./components/Knob";
import { SyncLed } from "./components/SyncLed";
import { VCABank } from "./components/VCABank";
import { VerticalMeter } from "./components/VerticalMeter";
import { DiagnosticsPanel } from "./components/DiagnosticsPanel";
import { GitHubDisplay } from "./components/GitHubDisplay";

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
  } = useConsoleStore();

  const menus = ["BIO", "PROJECTS", " STACK", "CONTACT"];
  const tabs = ["OVERVIEW", "BREACH", "DEPLOY", "RESULT", "ASSETS"];
  const projectIds = [
    "SCORM AUTO",
    "MEDICAL GUIDELINES MOBILE APP",
    "CSA TRAINING CENTER SKILLJAR REDESIGN",
    "AUTO IMAGE OPTIMIZATION PIPELINE",
    "DYNAMIC CONTRIBUTOR PAGES FOR CSA WEBSITE",
  ];

  const leftMeterActivity = useMotionValue(0);
  const rightMeterActivity = useMotionValue(0);

  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#0a0a0a] flex items-center justify-center p-4 lg:p-8 font-sans select-none touch-none overscroll-none">
      <div className="w-full max-w-7xl h-full max-h-[90vh] flex flex-col rounded-2xl bg-brushed-metal border-[3px] border-[#181a1f] shadow-[inset_0_15px_30px_rgba(255,255,255,0.03),inset_0_-10px_20px_rgba(0,0,0,0.6),0_40px_80px_rgba(0,0,0,1)] relative overflow-hidden">
        {/* Branding Header */}
        <div className="h-14 shrink-0 flex items-center justify-between px-8 z-20 border-b border-black/20">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] border border-black" />
            <div className="flex flex-col">
              <span className="text-black font-bold tracking-[0.2em] text-sm uppercase">
                Jerod Hollen
              </span>
              <span className="text-gray-500 font-bold tracking-[0.1em] text-[10px] uppercase">
                Full Stack Engineer | Systems Architect
              </span>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-gray-600 font-bold tracking-[0.3em] text-[9px] uppercase">
              PORTFOLIO COMPRESSOR V2.0
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
                      activeSelection === "02_CASE_STUDIES" && !selectedProject
                        ? projectIds.length
                        : menus.length
                    }
                    value={menuIndex}
                    onChange={(newIdx) => {
                      setMenuIndex(newIdx);
                      if (
                        activeSelection === "02_CASE_STUDIES" &&
                        !selectedProject
                      ) {
                        addLogMessage(
                          `NAVIGATOR: [PROJECT_PREVIEW: ${projectIds[newIdx]}]`,
                        );
                      } else {
                        addLogMessage(`NAVIGATOR: ${menus[newIdx]}`);
                        if (!activeSelection) {
                          setActiveSelection(menus[newIdx] || "01_WHO_AM_I");
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
                    steps={tabs.length}
                    value={tabIndex}
                    onChange={(newIndex) => {
                      if (selectedProject) {
                        setTabIndex(newIndex);
                        addLogMessage(`INFO_GAIN: ${tabs[newIndex]}`);
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
                <div className="flex-1 flex flex-col">
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
                        activeSelection === "BIO" || activeSelection === "STACK"
                      }
                      isDisabled={
                        activeSelection === "CONTACT" ||
                        activeSelection === "PROJECTS"
                      }
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Knob
                      label="PAN"
                      minLabel="LEFT"
                      centerLabel="CAROUSEL"
                      maxLabel="RIGHT"
                      value={panDepth}
                      onChange={(val) => {
                        setPanDepth(val);
                      }}
                      activityMv={rightMeterActivity}
                      isActive={activeSelection === "PROJECTS"}
                      isDisabled={activeSelection !== "PROJECTS"}
                    />
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
