"use client";

import * as React from "react";
import { MotionValue, useMotionValue, animate } from "framer-motion";
import { useMeterPhysics } from "./useMeterPhysics";
import { useConsoleStore } from "@/app/useConsoleStore";

interface VerticalMeterProps {
  activityMv1?: MotionValue<number>;
  activityMv2?: MotionValue<number>;
  type?: "nav" | "tab" | "default";
}

export const VerticalMeter: React.FC<VerticalMeterProps> = ({
  activityMv1,
  activityMv2,
  type = "default",
}) => {
  const store = useConsoleStore();
  const spikeMv = useMotionValue(0);

  React.useEffect(() => {
    let target = 0;
    if (type === "nav") target = store.navActivity;
    if (type === "tab") target = store.tabActivity;

    if (target === 99) {
      // Sustained dance effect
      const interval = setInterval(() => {
        spikeMv.set(60 + Math.random() * 35);
      }, 50);
      return () => {
        clearInterval(interval);
        spikeMv.set(0);
      };
    } else if (target > 0) {
      spikeMv.set(target);
      // Reset store value after triggering spike
      if (type === "nav") store.setNavActivity(0);
      if (type === "tab") store.setTabActivity(0);
      
      // Decay spike
      animate(spikeMv, 0, {
        duration: 0.8,
        ease: "easeOut",
      });
    }
  }, [store.navActivity, store.tabActivity, type, spikeMv, store]);

  const level = useMeterPhysics(activityMv1);
  const level2 = useMeterPhysics(activityMv2);
  const spikeLevel = useMeterPhysics(spikeMv);
  const combinedLevel = Math.max(level, level2, spikeLevel);

  const activePreset = store.activePreset;

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

      <div className="w-4 sm:w-5 h-full bg-[#0a0a0a] border-[1.5px] border-[#181a1f] rounded-sm flex flex-col justify-end p-[2px] gap-[2px] shadow-[inset:0_2px_5px_rgba(0,0,0,1),0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => {
          const active = 40 - i <= combinedLevel;
          const isRed = i === 0;
          const isMid = i > 0 && i <= 15;

          let color, shadowColor, dimColor;

          if (isRed) {
            color = "bg-red-500";
            shadowColor = "#ef4444";
            dimColor = "bg-[#3f0f0f]";
          } else if (activePreset === "HACKER") {
            color = isMid ? "bg-blue-500" : "bg-cyan-400";
            shadowColor = isMid ? "#3b82f6" : "#22d3ee";
            dimColor = isMid ? "bg-[#1e3a8a]" : "bg-[#083344]";
          } else if (activePreset === "RETRO") {
            color = isMid ? "bg-orange-500" : "bg-amber-400";
            shadowColor = isMid ? "#f97316" : "#fbbf24";
            dimColor = isMid ? "bg-[#431407]" : "bg-[#451a03]";
          } else {
            // ORIGINAL
            color = isMid ? "bg-amber-500" : "bg-emerald-500";
            shadowColor = isMid ? "#f59e0b" : "#10b981";
            dimColor = isMid ? "bg-[#3f2c0f]" : "bg-[#064e3b]";
          }

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
