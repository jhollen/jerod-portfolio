"use client";

import * as React from "react";
import { useConsoleStore } from "@/app/useConsoleStore";

export const DiagnosticsPanel = () => {
  const { logMessages, activePreset } = useConsoleStore();
  const scrollRef = React.useRef<HTMLDivElement>(null);

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

  return (
    <div className="w-full h-24 bg-[#0a0a0a] border-2 border-black/80 rounded p-3 shadow-[inset:0_3px_10px_rgba(0,0,0,0.8)] flex gap-4">
      <div className="w-1/3 h-full border border-gray-700/50 rounded-sm p-2 flex flex-col items-center justify-center text-gray-600">
        <svg viewBox="0 0 100 50" className="w-full h-full transition-colors duration-500">
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
        className={`flex-1 h-full overflow-y-auto text-[9px] font-mono transition-colors duration-500 ${textColor} space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
      >
        {logMessages.map((msg, i) => (
          <p key={i} className="whitespace-nowrap">{`> ${msg}`}</p>
        ))}
      </div>
    </div>
  );
};
