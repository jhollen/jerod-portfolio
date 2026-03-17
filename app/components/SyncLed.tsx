"use client";

import * as React from "react";
import { useConsoleStore } from "@/app/useConsoleStore";

export const SyncLed = () => {
  const { lastInteraction, activePreset } = useConsoleStore();
  const [isBlinking, setBlinking] = React.useState(false);

  React.useEffect(() => {
    if (lastInteraction > 0) {
      setBlinking(true);
      const t = setTimeout(() => setBlinking(false), 100);
      return () => clearTimeout(t);
    }
  }, [lastInteraction]);

  const ledColor = React.useMemo(() => {
    if (activePreset === "HACKER") return "bg-cyan-400 shadow-[0_0_8px_#22d3ee]";
    if (activePreset === "RETRO") return "bg-amber-400 shadow-[0_0_8px_#fbbf24]";
    return "bg-emerald-400 shadow-[0_0_8px_#34d399]";
  }, [activePreset]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-2.5 h-2.5 rounded-full border border-black/80 transition-all duration-75 ${isBlinking ? ledColor : "bg-black/50 shadow-inner"}`}
      />
      <span className="text-[7px] font-bold tracking-widest text-gray-500">
        SYNC
      </span>
    </div>
  );
};
