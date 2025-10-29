"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function HeroSection() {
  const surfaceRef = useRef<HTMLDivElement | null>(null);
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
    const surface = surfaceRef.current;
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
    <section className="relative isolate overflow-hidden border-b border-border-subtle bg-gradient-to-br from-cool-bg/60 via-surface-base to-warm-bg/60 text-text">
      <div className="absolute inset-0 -z-20 bg-noise-texture opacity-10" />
      <div className="pointer-events-none absolute inset-y-0 right-1/2 -z-30 hidden w-[60%] translate-x-[12%] bg-cool-radial lg:block" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-30 hidden w-[60%] -translate-x-[12%] bg-warm-radial lg:block" />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle/70 bg-surface-base/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.38em] text-ink/70 shadow-subtle backdrop-blur-2xs">
              Full-Stack Engineer
            </span>
          </div>

          <div
            ref={surfaceRef}
            className="relative w-full cursor-ew-resize overflow-hidden rounded-3xl border border-border-subtle/70 bg-gradient-to-r from-cool-bg/40 via-transparent to-warm-bg/40 shadow-card"
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
                  className="object-cover object-center transition-[opacity,transform] duration-300"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: developerClip,
                    background:
                      "linear-gradient(135deg, rgba(37,99,235,0.32), rgba(37,99,235,0.08))",
                    mixBlendMode: "multiply",
                  }}
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
                  className="object-cover object-center transition-[opacity,transform] duration-300"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: designerClip,
                    background:
                      "linear-gradient(135deg, rgba(249,115,22,0.24), rgba(249,115,22,0.08))",
                    mixBlendMode: "multiply",
                  }}
                />
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/28 via-white/10 to-white/24" />

              <div className="absolute inset-0 flex h-full items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
                <div className="flex w-full max-w-6xl flex-col gap-12">
                  <div className="grid gap-12 sm:grid-cols-2 sm:gap-16">
                    <div
                      className="flex max-w-xl flex-col gap-6 text-left transition-opacity duration-300"
                      style={{ opacity: developerContentOpacity }}
                    >
                      <header className="flex flex-col gap-4">
                        <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
                          Developer
                          <span
                            className="mt-3 inline-flex h-[2px] w-20 rounded-full bg-accent-gradient opacity-80"
                            aria-hidden="true"
                          />
                        </h1>
                      </header>
                      <button
                        type="button"
                        onClick={() => handleFilter("dev")}
                        className="inline-flex w-fit items-center gap-3 rounded-full border border-black/5 bg-surface-base/90 px-6 py-3 text-sm font-semibold text-ink shadow-card transition-colors duration-200 hover:bg-cool-tint/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base"
                      >
                        Explore Engineering Work
                        <svg
                          className="h-4 w-4 text-accent-blue"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.6}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14" />
                          <path d="M13 6l6 6-6 6" />
                        </svg>
                      </button>
                    </div>

                    <div
                      className="flex max-w-xl flex-col gap-6 text-left transition-opacity duration-300 sm:text-right sm:items-end"
                      style={{ opacity: designerContentOpacity }}
                    >
                      <header className="flex flex-col gap-4 sm:items-end">
                        <h2 className="text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
                          Designer
                          <span
                            className="mt-3 inline-flex h-[2px] w-20 justify-end rounded-full bg-gradient-to-r from-accent-orange via-accent-amber to-accent-blue opacity-80"
                            aria-hidden="true"
                          />
                        </h2>
                      </header>
                      <button
                        type="button"
                        onClick={() => handleFilter("design")}
                        className="inline-flex w-fit items-center gap-3 rounded-full border border-black/5 bg-surface-base/90 px-6 py-3 text-sm font-semibold text-ink shadow-card transition-colors duration-200 hover:bg-warm-tint/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base"
                      >
                        Explore Design Work
                        <svg
                          className="h-4 w-4 text-accent-orange"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.6}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14" />
                          <path d="M13 6l6 6-6 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-y-12 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-surface-base/0 via-surface-contrast/30 to-surface-base/0 lg:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
