"use client";

import * as React from "react";
import Image from "next/image";
import { useConsoleStore } from "@/app/useConsoleStore";

interface ThemeStyles {
  bg: string;
  text: string;
  highlight: string;
  border: string;
}

export const BootScreen: React.FC<{ theme: ThemeStyles }> = ({ theme }) => {
  const [avatarSrc, setAvatarSrc] = React.useState("images/avatar-static.png");
  const [glitch, setGlitch] = React.useState(false);
  const [showText, setShowText] = React.useState(false);
  const setBooting = useConsoleStore((s) => s.setBooting);

  React.useEffect(() => {
    const t1 = setTimeout(
      () => setAvatarSrc("images/avatar-winking.png"),
      1200,
    );
    const t2 = setTimeout(() => {
      setAvatarSrc("images/avatar-static.png");
      setShowText(true);
    }, 1500); // Increased from 1400 to 1500 (300ms duration instead of 200ms)
    const t3 = setTimeout(() => {
      setGlitch(true);
      const t4 = setTimeout(() => setBooting(false), 500);
      return () => clearTimeout(t4);
    }, 3000); // Pushed back to accommodate longer sequence

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [setBooting]);

  return (
    <div
      className={`flex flex-col items-center justify-center h-full text-center space-y-4 transition-opacity duration-300 ${glitch ? "opacity-0" : "opacity-100"}`}
    >
      <Image
        src={avatarSrc}
        alt="Avatar"
        width={200}
        height={200}
        className={`border-2 ${theme.border} p-1`}
        unoptimized
      />
      <div>
        <p className="font-bold uppercase tracking-widest">Jerod Hollen</p>
        <p
          className={`text-xs uppercase tracking-widest opacity-80 mt-1 transition-opacity duration-300 ${showText ? "opacity-80" : "opacity-0"}`}
        >
          MOUNTING_DRIVE: /HOME/JHOLLEN
        </p>
      </div>
    </div>
  );
};
