"use client";

import * as React from "react";
import { useConsoleStore } from "@/app/useConsoleStore";

export const VCABank = () => {
  const { activePreset, applyPreset, addLogMessage } = useConsoleStore();
  
  return (
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
};
