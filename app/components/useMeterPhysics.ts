"use client";

import { useState, useEffect } from "react";
import { MotionValue } from "framer-motion";

export function useMeterPhysics(activityMv?: MotionValue<number>) {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (!activityMv) return;

    const updateLevel = (val: number) => {
      // Scale the input velocity to a 0-40 range for the meter LEDs
      const scaledActivity = Math.min(40, val);
      setLevel((prev) => Math.min(40, Math.max(prev, scaledActivity)));
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
