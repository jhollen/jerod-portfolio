"use client";

import * as React from "react";
import Image from "next/image";
import { useConsoleStore } from "@/app/useConsoleStore";
import { TypewriterText } from "./TypewriterText";

interface ThemeStyles {
  bg: string;
  text: string;
  highlight: string;
  border: string;
  font?: string;
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
    }, 1500);
    const t3 = setTimeout(() => {
      setGlitch(true);
      const t4 = setTimeout(() => setBooting(false), 500);
      return () => clearTimeout(t4);
    }, 4500); // Increased delay to allow for typewriter

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [setBooting]);

  return (
    <div
      className={`flex flex-col items-center justify-center h-full text-center space-y-6 transition-opacity duration-300 ${glitch ? "opacity-0" : "opacity-100"} ${theme.font || "font-mono"}`}
    >
      <div className="relative">
        <Image
          src={avatarSrc}
          alt="Avatar"
          width={180}
          height={180}
          className={`border-4 ${theme.border} p-1 grayscale contrast-125`}
          unoptimized
        />
        <div className="absolute -bottom-3 -right-3 bg-white px-2 py-0.5 border-2 border-current text-[10px] font-bold uppercase tracking-widest">
          JH_OS v2.6
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-black uppercase tracking-[0.2em]">
          <TypewriterText text="Jerod Hollen" speed={30} />
        </h1>
        {showText && (
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">
            <TypewriterText text="MOUNTING_DRIVE: /HOME/JHOLLEN" speed={15} />
          </p>
        )}
      </div>
    </div>
  );
};
