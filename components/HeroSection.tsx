"use client";

import Image from "next/image";
import clsx from "clsx";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function HeroSection() {
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const [split, setSplit] = useState(50);
  const [isMobile, setIsMobile] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const splitValueRef = useRef(split);
  const draggingRef = useRef(false);
  const directionRef = useRef<"dev" | "design" | "none">("none");

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 768px)");
    const handleChange = () => {
      setIsMobile(media.matches);
    };
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSplit(50);
      splitValueRef.current = 50;
      directionRef.current = "none";
    }
  }, [isMobile]);

  const updateSplit = useCallback(
    (clientX: number) => {
      if (isMobile) return;
      const surface = surfaceRef.current;
      if (!surface) return;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      const rect = surface.getBoundingClientRect();
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      const next = (1 - ratio) * 100;
      const previous = splitValueRef.current;
      if (next > previous) {
        directionRef.current = "dev";
      } else if (next < previous) {
        directionRef.current = "design";
      }
      setSplit(next);
      splitValueRef.current = next;
    },
    [isMobile]
  );

  const resetSplit = useCallback(() => {
    if (isMobile) return;
    draggingRef.current = false;
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
        directionRef.current = "none";
      }
    };
    animationFrameRef.current = requestAnimationFrame(step);
  }, [isMobile]);

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
  const developerFocus = clamp((split - 20) / 30, 0, 1);
  const designerFocus = clamp((80 - split) / 30, 0, 1);
  const developerContentOpacity = isMobile ? 1 : developerFocus;
  const designerContentOpacity = isMobile ? 1 : designerFocus;
  const developerImageOpacity = isMobile ? 0.9 : 0.15 + developerFocus * 0.85;
  const designerImageOpacity = isMobile ? 0.9 : 0.15 + designerFocus * 0.85;
  const offsetRatio = isMobile ? 0 : Math.abs(split - 50) / 50;
  const devDirectionFactor =
    directionRef.current === "dev"
      ? 1
      : directionRef.current === "design"
      ? -1
      : 0;
  const designDirectionFactor =
    directionRef.current === "design"
      ? -1
      : directionRef.current === "dev"
      ? 1
      : 0;
  const developerTranslate = devDirectionFactor * offsetRatio * 120;
  const designerTranslate = designDirectionFactor * offsetRatio * 120;

  const handleSurfaceClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    if (draggingRef.current) {
      draggingRef.current = false;
      return;
    }
    const target = event.target as HTMLElement;
    if (target.closest('[data-hero-interactive="true"]')) {
      return;
    }
    const surface = surfaceRef.current;
    if (!surface) return;
    const rect = surface.getBoundingClientRect();
    const midpoint = rect.left + rect.width / 2;
    const isLeft = event.clientX <= midpoint;
    handleFilter(isLeft ? "dev" : "design");
  };

  return (
    <section className="relative isolate overflow-hidden border-b border-border-subtle bg-gradient-to-br from-cool-bg/60 via-surface-base to-warm-bg/60 text-text">
      <div className="absolute inset-0 -z-20 bg-noise-texture opacity-10" />
      <div className="pointer-events-none absolute inset-y-0 right-1/2 -z-30 hidden w-[60%] translate-x-[12%] bg-cool-radial lg:block" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-30 hidden w-[60%] -translate-x-[12%] bg-warm-radial lg:block" />

      <div
        className={clsx(
          "mx-auto w-full",
          isMobile
            ? "max-w-none px-4 pb-16 pt-20"
            : "max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8"
        )}
      >
        <div className="flex flex-col gap-12">
          <div
            ref={surfaceRef}
            className={clsx(
              "relative w-full overflow-hidden rounded-3xl border border-border-subtle/70 bg-gradient-to-r from-cool-bg/40 via-transparent to-warm-bg/40 shadow-card",
              isMobile ? "cursor-default" : "cursor-ew-resize"
            )}
            onPointerMove={(event) => {
              if (isMobile) return;
              draggingRef.current = true;
              updateSplit(event.clientX);
            }}
            onPointerDown={(event) => {
              if (isMobile) return;
              draggingRef.current = false;
              updateSplit(event.clientX);
            }}
            onPointerUp={() => {
              if (isMobile) return;
              draggingRef.current = false;
            }}
            onTouchMove={(event) => {
              if (isMobile) return;
              draggingRef.current = true;
              updateSplit(event.touches[0].clientX);
            }}
            onTouchStart={(event) => {
              if (isMobile) return;
              draggingRef.current = false;
              updateSplit(event.touches[0].clientX);
            }}
            onPointerLeave={resetSplit}
            onTouchEnd={resetSplit}
            onTouchCancel={resetSplit}
            onClick={handleSurfaceClick}
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
                  <div className="grid grid-cols-2 gap-8 sm:gap-16">
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
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-y-12 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-surface-base/0 via-surface-contrast/30 to-surface-base/0 lg:block" />
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-10 lg:gap-10">
          <button
            type="button"
            data-hero-interactive="true"
            onClick={() => handleFilter("dev")}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-black/5 bg-surface-base/90 px-6 py-3 text-sm font-semibold text-ink shadow-card transition-colors duration-200 hover:bg-cool-tint/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base"
          >
            Dev Work
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
          <button
            type="button"
            data-hero-interactive="true"
            onClick={() => handleFilter("design")}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-black/5 bg-surface-base/90 px-6 py-3 text-sm font-semibold text-ink shadow-card transition-colors duration-200 hover:bg-warm-tint/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base"
          >
            Design Work
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
    </section>
  );
}
