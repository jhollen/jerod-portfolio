"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useConsoleStore } from "./useConsoleStore";
import { LCDDisplay } from "./components/LCDDisplay";
import { Knob } from "./components/Knob";
import { useMeterPhysics } from "./components/useMeterPhysics";

const ModeIndicator = React.memo(() => {
  const { theme, toggleTheme } = useConsoleStore();
  const isDark = theme === "DARK";

  return (
    <div className="flex flex-row items-center justify-center gap-6 select-none w-full">
      {/* Left side: LED */}
      <div className="flex flex-col items-center gap-2">
        <div
          className={`w-4 h-4 rounded-full border border-black/80 transition-colors duration-300 ${
            isDark
              ? "bg-red-500 shadow-[0_0_12px_#ef4444]"
              : "bg-emerald-500 shadow-[0_0_12px_#10b981]"
          }`}
        />
        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest shadow-black drop-shadow-md">
          MODE
        </span>
      </div>

      {/* Right side: Skueomorphic Slider Switch */}
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-[8px] text-gray-500 font-bold tracking-widest uppercase">
          LIGHT
        </span>
        <div
          className="relative w-5 h-12 bg-gradient-to-b from-[#0a0a0a] to-[#1a1c23] rounded-full border border-black/80 shadow-[inset_0_4px_8px_rgba(0,0,0,0.9),0_1px_1px_rgba(255,255,255,0.1)] cursor-pointer flex items-center justify-center"
          onClick={toggleTheme}
        >
          <div className="absolute w-1 h-8 bg-black/50 rounded-full shadow-inner" />
          <motion.div
            className="absolute w-5 h-6 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-500 rounded-full border border-gray-600 shadow-[0_3px_5px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center justify-center z-10"
            animate={{ y: isDark ? 10 : -10 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div className="w-2 h-2 bg-gradient-to-br from-white to-gray-400 rounded-full shadow-[inset_0_-1px_1px_rgba(0,0,0,0.3)]" />
          </motion.div>
        </div>
        <span className="text-[8px] text-gray-500 font-bold tracking-widest uppercase">
          DARK
        </span>
      </div>
    </div>
  );
});
ModeIndicator.displayName = "ModeIndicator";

const SyncLed = () => {
  const lastInteraction = useConsoleStore((s) => s.lastInteraction);
  const [isBlinking, setBlinking] = React.useState(false);

  React.useEffect(() => {
    if (lastInteraction > 0) {
      setBlinking(true);
      const t = setTimeout(() => setBlinking(false), 100);
      return () => clearTimeout(t);
    }
  }, [lastInteraction]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-2.5 h-2.5 rounded-full border border-black/80 transition-all duration-75 ${isBlinking ? "bg-amber-400 shadow-[0_0_8px_#facc15]" : "bg-black/50 shadow-inner"}`}
      />
      <span className="text-[7px] font-bold tracking-widest text-gray-500">
        SYNC
      </span>
    </div>
  );
};

const DiagnosticsPanel = () => {
  const logMessages = useConsoleStore((s) => s.logMessages);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logMessages]);

  return (
    <div className="w-full h-24 bg-[#0a0a0a] border-2 border-black/80 rounded p-3 shadow-[inset_0_3px_10px_rgba(0,0,0,0.8)] flex gap-4">
      <div className="w-1/3 h-full border border-gray-700/50 rounded-sm p-2 flex flex-col items-center justify-center text-gray-600">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <text
            x="2"
            y="10"
            fontSize="6"
            fill="currentColor"
            className="font-bold tracking-widest"
          >
            SIGNAL PATH
          </text>
          <path d="M 10 25 L 30 25" stroke="currentColor" strokeWidth="1" />
          <circle
            cx="35"
            cy="25"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path d="M 40 25 L 60 25" stroke="currentColor" strokeWidth="1" />
          <rect
            x="62"
            y="20"
            width="10"
            height="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path d="M 72 25 L 90 25" stroke="currentColor" strokeWidth="1" />
          <text x="5" y="40" fontSize="5" fill="currentColor">
            IN
          </text>
          <text x="30" y="40" fontSize="5" fill="currentColor">
            PROC
          </text>
          <text x="63" y="40" fontSize="5" fill="currentColor">
            VCA
          </text>
          <text x="85" y="40" fontSize="5" fill="currentColor">
            OUT
          </text>
        </svg>
      </div>
      <div
        ref={scrollRef}
        className="flex-1 h-full overflow-y-auto text-[9px] font-mono text-emerald-400/70 space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {logMessages.map((msg, i) => (
          <p key={i} className="whitespace-nowrap">{`> ${msg}`}</p>
        ))}
      </div>
    </div>
  );
};

const TelemetryDisplay = () => {
  const { activePreset, activeSelection, menuIndex } = useConsoleStore();
  let tel1, tel2;
  if (activePreset === "BOGARDT" || activeSelection === "MUSIC") {
    tel1 = "AUDIO: ACTIVE";
    tel2 = "BPM: 85";
  } else if (activeSelection === "02_INCIDENTS" || activePreset === "SUPPORT") {
    tel1 = "STATUS: CRITICAL";
    tel2 = "LOAD: 99%";
  } else if (
    activeSelection === "01_PROFILE" ||
    (!activeSelection && menuIndex === 0)
  ) {
    tel1 = "LOC: BELLINGHAM";
    tel2 = "EDU: WWU_2022";
  } else {
    tel1 = "SYS: ONLINE";
    tel2 = "MEM: STABLE";
  }

  return (
    <div className="w-full bg-[#181a15] border-2 border-[#0a0a0a] rounded p-3 shadow-[inset_0_2px_15px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.1)] text-[#8fb379] font-mono text-[9px] leading-tight flex flex-col uppercase">
      <div className="font-bold tracking-widest border-b-2 border-[#8fb379]/30 pb-1 mb-2 opacity-80">
        SYS.FEED
      </div>
      <div className="opacity-80 space-y-1">
        <p>&gt; {tel1}</p>
        <p>&gt; {tel2}</p>
        <div className="mt-2 animate-pulse opacity-50 text-xs">_</div>
      </div>
    </div>
  );
};

export default function AudioConsolePage() {
  const {
    activePreset,
    menuIndex,
    setMenuIndex,
    tabIndex,
    setTabIndex,
    activeSelection,
    setActiveSelection,
    contentDepth,
    setContentDepth,
    panDepth,
    setPanDepth,
    applyPreset,
    addLogMessage,
  } = useConsoleStore();

  const menus = ["01_PROFILE", "02_INCIDENTS", "03_TECH_STACK", "04_CONTACT"];
  const tabs = ["OVERVIEW", "BREACH", "DEPLOY", "RESULT", "ASSETS"];

  const navActivity = useMotionValue(0);
  const infoActivity = useMotionValue(0);
  const scrubActivity = useMotionValue(0);
  const panActivity = useMotionValue(0);

  const PresetButton = ({
    label,
    preset,
    active,
  }: {
    label: string;
    preset: "ORIGINAL" | "RETRO" | "HACKER";
    active: boolean;
  }) => {
    return (
      <button
        onClick={() => {
          applyPreset(preset);
          addLogMessage(`PRESET ENGAGED: ${preset}`);
        }}
        className={`w-32 px-4 py-2 border shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_2px_4px_rgba(0,0,0,0.5)] rounded-sm text-[9px] font-bold tracking-widest active:translate-y-[1px] transition-all uppercase ${
          active
            ? "bg-[#e8e9e4] text-black border-black/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
            : "bg-gradient-to-b from-[#2a2d33] to-[#141518] border-black text-gray-400 hover:text-white hover:from-[#32363d]"
        }`}
      >
        {label}
      </button>
    );
  };

  const VCABank = () => (
    <div className="w-full flex flex-col gap-3 p-4">
      <span className="text-[10px] font-bold text-gray-400 tracking-widest text-center border-b border-black/30 pb-2 shadow-[0_1px_0_rgba(255,255,255,0.05)]">
        MODE SELECT
      </span>
      {(["ORIGINAL", "RETRO", "HACKER"] as const).map((p) => (
        <div key={p} className="flex items-center justify-center gap-3">
          <div
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${activePreset === p || (p === "ORIGINAL" && !activePreset) ? "bg-amber-400 shadow-[0_0_4px_#fcd34d]" : "bg-black/50"}`}
          />
          <button
            onClick={() => {
              applyPreset(p);
              addLogMessage(`VCA MODE: ${p}`);
            }}
            className="flex-1 py-2 text-[9px] btn-hardware bg-gradient-to-b from-gray-600 to-gray-800 text-gray-300 hover:from-gray-500"
          >
            {p}
          </button>
        </div>
      ))}
    </div>
  );

  const VerticalMeter = ({
    activityMv1,
    activityMv2,
  }: {
    activityMv1?: any;
    activityMv2?: any;
  }) => {
    const level = useMeterPhysics(activityMv1);
    const level2 = useMeterPhysics(activityMv2);
    const combinedLevel = Math.max(level, level2);

    return (
      <div className="flex flex-row items-stretch gap-1.5 h-full w-full justify-center min-h-0">
        <div className="flex flex-col justify-between h-full py-1 text-[7px] font-bold text-gray-500 font-mono items-end tracking-tighter w-6">
          <span className="flex items-center gap-1">
            PK
            <span className="w-1.5 h-px bg-gray-500" />
          </span>
          <span className="flex items-center gap-1">
            0<span className="w-2 h-px bg-gray-500" />
          </span>
          <span className="flex items-center gap-1">
            -6
            <span className="w-1.5 h-px bg-gray-500" />
          </span>
          <span className="flex items-center gap-1">
            -12
            <span className="w-2 h-px bg-gray-500" />
          </span>
          <span className="flex items-center gap-1">
            -18
            <span className="w-1.5 h-px bg-gray-500" />
          </span>
          <span className="flex items-center gap-1">
            -24
            <span className="w-2 h-px bg-gray-500" />
          </span>
          <span className="flex items-center gap-1">
            -36
            <span className="w-1.5 h-px bg-gray-500" />
          </span>
        </div>

        <div className="w-4 sm:w-5 h-full bg-[#0a0a0a] border-[1.5px] border-[#181a1f] rounded-sm flex flex-col justify-end p-[2px] gap-[2px] shadow-[inset_0_2px_5px_rgba(0,0,0,1),0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => {
            const active = 40 - i <= combinedLevel;
            // i=0 is the top LED. i=39 is the bottom LED.
            const isRed = i === 0;
            const isAmber = i > 0 && i <= 15;

            const color = isRed
              ? "bg-red-500"
              : isAmber
                ? "bg-amber-500"
                : "bg-emerald-500";
            const shadowColor = isRed
              ? "#ef4444"
              : isAmber
                ? "#f59e0b"
                : "#10b981";
            const dimColor = isRed
              ? "bg-[#3f0f0f]"
              : isAmber
                ? "bg-[#3f2c0f]"
                : "bg-[#064e3b]";

            return (
              <div
                key={i}
                className={`w-full flex-1 rounded-[1px] transition-all duration-75 ${active ? color : dimColor}`}
                style={{
                  opacity: active ? 1 : 0.6,
                  boxShadow: active ? `0 0 4px ${shadowColor}` : "none",
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#0a0a0a] flex items-center justify-center p-4 lg:p-8 font-sans select-none touch-none overscroll-none">
      <div className="w-full max-w-7xl h-full max-h-[90vh] flex flex-col rounded-2xl bg-brushed-metal border-[3px] border-[#181a1f] shadow-[inset_0_15px_30px_rgba(255,255,255,0.03),inset_0_-10px_20px_rgba(0,0,0,0.6),0_40px_80px_rgba(0,0,0,1)] relative overflow-hidden">
        {/* Branding Header */}
        <div className="h-14 shrink-0 flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] border border-black" />
            <span className="text-gray-400 font-bold tracking-[0.3em] text-xs">
              PORTFOLIO COMPRESSOR
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
                  <VerticalMeter activityMv1={navActivity} />
                </div>
                <div className="flex flex-col items-center gap-4 shrink-0 w-full">
                  <Knob
                    label="NAVIGATOR"
                    minLabel="-"
                    centerLabel="NAV"
                    maxLabel="+"
                    isActive={true}
                    activityMv={navActivity}
                    steps={menus.length}
                    value={menuIndex}
                    onChange={(newIdx) => {
                      setMenuIndex(newIdx);
                      addLogMessage(`NAVIGATOR: ${menus[newIdx]}`);
                      if (activeSelection) {
                        setActiveSelection(menus[newIdx] || "01_PROFILE");
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (!activeSelection) {
                        addLogMessage(`SELECT: ${menus[menuIndex]}`);
                        setActiveSelection(menus[menuIndex] || "01_PROFILE");
                      }
                    }}
                    className="w-full px-1 py-2 bg-gradient-to-b from-[#2a2d33] to-[#141518] text-cyan-400 font-bold text-[9px] tracking-widest rounded-sm border border-black shadow-[0_2px_4px_rgba(0,0,0,0.5)] active:translate-y-[1px]"
                  >
                    SELECT
                  </button>
                </div>
              </div>

              {/* INFO GAIN Column */}
              <div className="flex flex-col items-center justify-between h-full w-20 pb-2">
                <div className="flex-1 w-full min-h-0 flex items-stretch justify-center pb-6 pt-2">
                  <VerticalMeter activityMv1={infoActivity} />
                </div>
                <div className="flex flex-col items-center gap-4 shrink-0 w-full">
                  <Knob
                    label="INFO GAIN"
                    minLabel="LEFT"
                    centerLabel="TAB"
                    maxLabel="RIGHT"
                    isActive={activeSelection === "02_INCIDENTS"}
                    activityMv={infoActivity}
                    steps={tabs.length}
                    value={tabIndex}
                    onChange={(newIndex) => {
                      if (activeSelection === "02_INCIDENTS") {
                        setTabIndex(newIndex);
                        addLogMessage(`INFO_GAIN: ${tabs[newIndex]}`);
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      setActiveSelection(null);
                      addLogMessage(`BACK: Return to Main Menu`);
                    }}
                    className="w-full px-1 py-2 bg-gradient-to-b from-[#2a2d33] to-[#141518] text-red-400 font-bold text-[9px] tracking-widest rounded-sm border border-black shadow-[0_2px_4px_rgba(0,0,0,0.5)] active:translate-y-[1px]"
                  >
                    BACK
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden xl:block w-px bg-black/50 shadow-[1px_0_0_rgba(255,255,255,0.05)] my-12" />

            <div className="flex flex-col flex-1 max-w-[800px] w-full mx-auto gap-4 items-center">
              <div className="w-full flex flex-col pt-1 h-full">
                {/* PRESETS ROW */}
                <div className="w-full flex-1 flex flex-col">
                  <LCDDisplay menus={menus} tabs={tabs} />
                </div>
              </div>
            </div>

            {/* Right Section: Auxiliary & Presets */}
            <div className="w-48 hidden lg:flex flex-col justify-between items-center h-full shrink-0">
              {/* 2. Traversal Dials */}
              <Knob
                label="SCRUB"
                minLabel="UP"
                centerLabel="SCROLL"
                maxLabel="DOWN"
                value={contentDepth}
                onChange={(val) => {
                  setContentDepth(val);
                }}
                activityMv={scrubActivity}
                isActive={
                  activeSelection !== null &&
                  !(activeSelection === "02_INCIDENTS" && tabIndex === 4)
                }
              />
              <Knob
                label="PAN"
                minLabel="LEFT"
                centerLabel="CAROUSEL"
                maxLabel="RIGHT"
                value={panDepth}
                onChange={(val) => {
                  setPanDepth(val);
                }}
                activityMv={panActivity}
                isActive={activeSelection === "02_INCIDENTS" && tabIndex === 4}
              />

              {/* 3. Hardware Terminal Screen */}
              <div className="w-full">
                <VCABank />
              </div>

              <div className="w-full flex justify-center pt-4 border-t border-black/30 shadow-[0_-1px_0_rgba(255,255,255,0.05)]">
                <SyncLed />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
