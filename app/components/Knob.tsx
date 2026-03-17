"use client";

import * as React from "react";
import { motion, useMotionValue, PanInfo, animate, MotionValue, AnimatePresence } from "framer-motion";

interface KnobProps {
  label: string;
  minLabel?: string;
  centerLabel?: string;
  maxLabel?: string;
  size?: "small" | "medium" | "large";
  value: number;
  onChange: (val: number) => void;
  onClick?: () => void;
  activityMv?: MotionValue<number>;
  isActive?: boolean;
  steps?: number;
}

export const Knob: React.FC<KnobProps> = ({
  label,
  minLabel = "MIN",
  centerLabel = "STD",
  maxLabel = "MAX",
  size = "medium",
  value,
  onChange,
  onClick,
  activityMv,
  isActive = true,
  steps,
}) => {
  const rotation = useMotionValue(0);
  const isDragging = React.useRef(false);

  const stepAngle = steps && steps > 1 ? 260 / (steps - 1) : 0;

  const valueRef = React.useRef(value);
  const onChangeRef = React.useRef(onChange);
  const activityMvRef = React.useRef(activityMv); // Create a ref for activityMv

  React.useEffect(() => {
    valueRef.current = value;
    onChangeRef.current = onChange;
    if (!isDragging.current) {
      let targetRotation;
      if (steps && steps > 1) {
        targetRotation = -130 + value * stepAngle;
      } else {
        // Continuous 0-100 range maps to -130 to 130
        targetRotation = -130 + (value / 100) * 260;
      }
      animate(rotation, targetRotation, {
        type: "spring",
        stiffness: 400,
        damping: 30,
      });
    }
    activityMvRef.current = activityMv; // Update the ref
  }, [value, onChange, stepAngle, rotation, activityMv, steps]);

  const handleInteraction = React.useCallback((delta: number) => {
    if (!isActive) return;
    const newRotation = rotation.get() + delta;
    const clampedRotation = Math.max(-130, Math.min(130, newRotation));
    rotation.set(clampedRotation);

    const currentActivityMv = activityMvRef.current; // Use the ref
    if (currentActivityMv && typeof currentActivityMv.set === "function") {
      currentActivityMv.set(Math.abs(delta * 4));
    }

    if (steps && steps > 1) {
      const currentStep = Math.round((clampedRotation + 130) / stepAngle);
      if (currentStep !== valueRef.current) {
        onChangeRef.current(currentStep);
      }
    } else {
      // Continuous: Map -130...130 to 0...100
      const newValue = ((clampedRotation + 130) / 260) * 100;
      if (Math.abs(newValue - valueRef.current) > 0.1) {
        onChangeRef.current(newValue);
      }
    }
  }, [isActive, rotation, stepAngle, steps]);

  const handlePan = (e: unknown, info: PanInfo) =>
    handleInteraction(-info.delta.y * 1.5);
  const handlePanStart = () => {
    isDragging.current = true;
  };
  const handlePanEnd = () => {
    isDragging.current = false;
    if (steps && steps > 1) {
      const currentStep = Math.round((rotation.get() + 130) / stepAngle);
      const targetRotation = -130 + currentStep * stepAngle;
      animate(rotation, targetRotation, {
        type: "spring",
        stiffness: 500,
        damping: 30,
      });
    }
  };

  const knobRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = knobRef.current;
    if (!el) return;
    const handleNativeWheel = (e: WheelEvent) => {
      if (e.cancelable) e.preventDefault();
      handleInteraction(e.deltaY * -0.3);
    };
    el.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleNativeWheel);
  }, [handleInteraction]); // Removed activityMv from here as it's now a ref

  const sizes = {
    small: {
      bezel: "w-12 h-12",
      dial: "w-8 h-8",
      notch: "h-[8px] w-[1.5px] top-[2px]",
    },
    medium: {
      bezel: "w-16 h-16",
      dial: "w-11 h-11",
      notch: "h-[12px] w-[2px] top-1",
    },
    large: {
      bezel: "w-20 h-20",
      dial: "w-14 h-14",
      notch: "h-[12px] w-[2px] top-1",
    },
  };
  const s = sizes[size];

  return (
    <div
      className="flex flex-col items-center gap-3 select-none shrink-0"
      ref={knobRef}
    >
      <div className="relative touch-none overscroll-none">
        <span className={`absolute -bottom-2 -left-6 w-8 text-right text-[7px] font-bold font-mono tracking-tighter uppercase whitespace-nowrap transition-colors duration-500 ${isActive ? "text-gray-400" : "text-gray-700"}`}>
          {minLabel}
        </span>
        <span className={`absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] font-bold font-mono tracking-tighter uppercase whitespace-nowrap transition-colors duration-500 ${isActive ? "text-gray-400" : "text-gray-700"}`}>
          {centerLabel}
        </span>
        <span className={`absolute -bottom-2 -right-6 w-8 text-left text-[7px] font-bold font-mono tracking-tighter uppercase whitespace-nowrap transition-colors duration-500 ${isActive ? "text-gray-400" : "text-gray-700"}`}>
          {maxLabel}
        </span>
        <div
          className={`${s.bezel} rounded-full bg-gradient-to-br from-[#3b3f46] to-[#1e2025] flex items-center justify-center shadow-[0_8px_15px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.15)] border border-black/80 relative transition-all duration-500 ${isActive ? "ring-1 ring-emerald-500/10" : ""}`}
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 100 100"
          >
            {Array.from({ length: 21 }).map((_, i) => {
              const isMajor = i % 2 === 0;
              return (
                <line
                  key={i}
                  x1="50"
                  y1="3"
                  x2="50"
                  y2={isMajor ? "10" : "6"}
                  stroke={isActive ? (isMajor ? "#aaa" : "#555") : (isMajor ? "#444" : "#222")}
                  strokeWidth={isMajor ? "1.5" : "1"}
                  transform={`rotate(${-130 + i * 13} 50 50)`}
                  className="transition-colors duration-500"
                />
              );
            })}
          </svg>
          <div className="absolute inset-[15%] rounded-full border border-black/50 pointer-events-none" />
          <motion.div
            onTap={() => onClick && onClick()}
            onPanStart={handlePanStart}
            onPan={handlePan}
            onPanEnd={handlePanEnd}
            className={`${s.dial} rounded-full bg-gradient-to-br from-[#2a2d33] to-[#141518] shadow-[0_5px_10px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] border border-black relative touch-none cursor-grab active:cursor-grabbing z-10 flex items-center justify-center overflow-hidden`}
            style={{ rotate: rotation }}
          >
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0%,rgba(0,0,0,0.3)_10%,transparent_20%,rgba(0,0,0,0.3)_30%,transparent_40%,rgba(0,0,0,0.3)_50%,transparent_60%,rgba(0,0,0,0.3)_70%,transparent_80%,rgba(0,0,0,0.3)_90%,transparent_100%)] opacity-60 pointer-events-none" />
            <div className="absolute inset-[2px] rounded-full border border-white/5" />
            <div
              className={`absolute left-1/2 -translate-x-1/2 rounded-sm shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-colors duration-500 ${isActive ? "bg-gray-200" : "bg-gray-700"} ${s.notch}`}
            />
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-2 text-center shrink-0 gap-1.5">
        <span className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${isActive ? "text-gray-200 drop-shadow-[0_0_2px_rgba(16,185,129,0.3)]" : "text-gray-600"}`}>
          {label}
        </span>
        <div className="w-2.5 h-2.5 rounded-full border border-black/80 flex items-center justify-center bg-black shadow-[inset_0_1.5px_3px_rgba(0,0,0,1)] relative">
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute inset-0 rounded-full bg-emerald-500/20 blur-[2px]"
              />
            )}
          </AnimatePresence>
          <div
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isActive ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-[#0a0f0a]"}`}
          />
        </div>
      </div>
    </div>
  );
};
