"use client";

import * as React from "react";
import { useConsoleStore } from "@/app/useConsoleStore";

export const TelemetryDisplay = () => {
  const { activePreset, activeSelection, menuIndex } = useConsoleStore();
  let tel1, tel2;
  if (activePreset === "RETRO" || activeSelection === "MUSIC") {
    tel1 = "AUDIO: ACTIVE";
    tel2 = "BPM: 85";
  } else if (activeSelection === "INCIDENTS") {
    tel1 = "STATUS: CRITICAL";
    tel2 = "LOAD: 99%";
  } else if (
    activeSelection === "PROFILE" ||
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
