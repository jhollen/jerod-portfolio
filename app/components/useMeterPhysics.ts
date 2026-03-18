"use client";

import { useState, useEffect } from "react";
import { MotionValue } from "framer-motion";

export function useMeterPhysics(activityMv?: MotionValue<number>) {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (!activityMv) return;

    const updateLevel = (val: number) => {
      // Scale the 0-100 input to 0-40 segments
      const scaledActivity = (val / 100) * 40;
      const clamped = Math.min(40, Math.max(0, scaledActivity));
      setLevel((prev) => Math.max(prev, clamped));
    };

    const unsubscribe = activityMv.on("change", updateLevel);
    return () => unsubscribe();
  }, [activityMv]);

  useEffect(() => {
    const decay = setInterval(() => {
      setLevel((prev) => (prev <= 0.5 ? 0 : prev * 0.85 - 0.5)); // Non-linear gravity
    }, 1000 / 30); // Decay at ~30fps

    return () => clearInterval(decay);
  }, []);

  return level;
}
