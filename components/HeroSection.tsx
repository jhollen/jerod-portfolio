"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function HeroSection() {
  const splitRef = useRef<HTMLDivElement | null>(null);
  const [split, setSplit] = useState(50);
  const animationFrameRef = useRef<number | null>(null);
  const splitValueRef = useRef(split);

  useEffect(() => {
    splitValueRef.current = split;
  }, [split]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const updateSplit = useCallback((clientX: number) => {
    const surface = splitRef.current;
    if (!surface) return;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    const rect = surface.getBoundingClientRect();
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    const next = (1 - ratio) * 100;
    setSplit(next);
    splitValueRef.current = next;
  }, []);

  const resetSplit = useCallback(() => {
    const startValue = splitValueRef.current;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (Math.abs(startValue - 50) < 0.05) {
      setSplit(50);
      splitValueRef.current = 50;
      return;
    }
    const duration = 680;
    const startTime = performance.now();
    const step = (timestamp: number) => {
      const progress = clamp((timestamp - startTime) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = startValue + (50 - startValue) * eased;
      setSplit(next);
      splitValueRef.current = next;
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        animationFrameRef.current = null;
        setSplit(50);
        splitValueRef.current = 50;
      }
    };
    animationFrameRef.current = requestAnimationFrame(step);
  }, []);

  const handleFilter = (filter: "dev" | "design") => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("featured-project-filter", { detail: { filter } })
    );
    const target = document.getElementById("featured-projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const developerClip = `polygon(0 0, ${split}% 0, ${split}% 100%, 0 100%)`;
  const designerClip = `polygon(${split}% 0, 100% 0, 100% 100%, ${split}% 100%)`;
  const developerTranslate = ((split - 50) / 50) * 24;
  const designerTranslate = ((50 - split) / 50) * 24;
  const developerEmphasis = clamp(split / 50, 0, 1);
  const designerEmphasis = clamp((100 - split) / 50, 0, 1);
  const developerContentOpacity = Math.max(developerEmphasis, 0.25);
  const designerContentOpacity = Math.max(designerEmphasis, 0.25);
  const developerImageOpacity = 0.25 + developerEmphasis * 0.75;
  const designerImageOpacity = 0.25 + designerEmphasis * 0.75;

  return (
    <section className="relative overflow-hidden pt-36 pb-20">
      <div
        ref={splitRef}
        className="relative w-full cursor-ew-resize overflow-hidden bg-gradient-to-r from-white/35 via-white/10 to-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition-colors duration-500"
        onPointerMove={(event) => updateSplit(event.clientX)}
        onPointerDown={(event) => updateSplit(event.clientX)}
        onTouchMove={(event) => updateSplit(event.touches[0].clientX)}
        onTouchStart={(event) => updateSplit(event.touches[0].clientX)}
        onPointerLeave={resetSplit}
        onTouchEnd={resetSplit}
        onTouchCancel={resetSplit}
      >
        <div className="relative aspect-[5/3] w-full max-h-[640px]">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-dev.png"
              alt="Developer portrait"
              fill
              priority
              style={{
                clipPath: developerClip,
                transform: `translateX(${developerTranslate}px) scale(1.02)`,
                opacity: developerImageOpacity,
              }}
              className="object-contain object-center transition-[opacity,transform] duration-300"
            />
            <Image
              src="/images/hero-design.png"
              alt="Designer portrait"
              fill
              priority
              style={{
                clipPath: designerClip,
                transform: `translateX(${designerTranslate}px) scale(1.02)`,
                opacity: designerImageOpacity,
              }}
              className="object-contain object-center transition-[opacity,transform] duration-300"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-white/8 to-white/35" />

          <div className="absolute inset-0 flex h-full items-center justify-center px-4 py-12 sm:px-8">
            <div className="flex w-full max-w-7xl flex-col gap-10 text-black">
              <div className="grid gap-6 sm:grid-cols-2 sm:gap-12">
                <div
                  className="flex flex-col gap-3 text-left transition-opacity duration-300"
                  style={{ opacity: developerContentOpacity }}
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.32em] text-black/50">
                    Back-End
                  </span>
                  <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                    Developer
                  </h1>
                  <p className="text-sm text-black/70 transition-opacity duration-300">
                    Automation, APIs, and systems that ship reliable experiences.
                  </p>
                </div>
                <div
                  className="flex flex-col gap-3 text-right transition-opacity duration-300 sm:items-end"
                  style={{ opacity: designerContentOpacity }}
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.32em] text-black/50">
                    Front-End
                  </span>
                  <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                    Designer
                  </h2>
                  <p className="text-sm text-black/70 sm:max-w-xs transition-opacity duration-300">
                    Interfaces & motion that feel intuitive, expressive, and calm.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={() => handleFilter("dev")}
                  onMouseEnter={() => setSplit(80)}
                  onFocus={() => setSplit(80)}
                  onMouseLeave={resetSplit}
                  onBlur={resetSplit}
                  className="group inline-flex max-w-sm flex-col gap-2 rounded-2xl border border-black/5 bg-white/20 px-6 py-4 text-left text-black backdrop-blur-xl transition-[transform,opacity] duration-300 hover:-translate-y-1"
                  style={{ opacity: Math.max(developerEmphasis, 0.35) }}
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.32em] text-black/45">
                    Explore Developer Work
                  </span>
                  <span className="text-sm text-black/60">
                    Dig into systems thinking, automation flows, and product
                    infrastructure.
                  </span>
                </button>

                <button
                  onClick={() => handleFilter("design")}
                  onMouseEnter={() => setSplit(20)}
                  onFocus={() => setSplit(20)}
                  onMouseLeave={resetSplit}
                  onBlur={resetSplit}
                  className="group inline-flex max-w-sm flex-col gap-2 rounded-2xl border border-black/5 bg-white/20 px-6 py-4 text-right text-black backdrop-blur-xl transition-[transform,opacity] duration-300 hover:-translate-y-1"
                  style={{ opacity: Math.max(designerEmphasis, 0.35) }}
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.32em] text-black/45">
                    Explore Design Work
                  </span>
                  <span className="text-sm text-black/60">
                    See brand systems, motion language, and immersive product
                    details.
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
