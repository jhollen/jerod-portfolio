"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
export default function HeroSection() {
  const [split, setSplit] = useState(0); // Start at 0 for animation
  const [doorsClosed, setDoorsClosed] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<
    "developer" | "designer" | null
  >(null);
  const [interactive, setInteractive] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Animate images in on mount
  useEffect(() => {
    // Start sliding doors effect
    const doorsTimeout = setTimeout(() => {
      setDoorsClosed(true);
      setSplit(50);
    }, 200); // Start after short delay
    const textTimeout = setTimeout(() => {
      setTextVisible(true);
    }, 900); // Fade in text after images (quicker)
    return () => {
      clearTimeout(doorsTimeout);
      clearTimeout(textTimeout);
    };
  }, []);

  // Toggle interaction based on overlap with the glass header and ease back to center
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const nav = document.querySelector(
        "nav[data-app-navbar]"
      ) as HTMLElement | null;
      const headerH = nav?.offsetHeight ?? 0;
      const rect = section.getBoundingClientRect();
      const overlappingHeader = rect.top < -headerH;
      setInteractive(!overlappingHeader);
      if (overlappingHeader) setSplit(50);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    if (typeof window === "undefined") return;
    const target = document.getElementById(id);
    if (!target) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const updateSplitFromPointer = useCallback((clientX: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const bounds = section.getBoundingClientRect();
    if (bounds.width === 0) return;
    const x = Math.min(Math.max(clientX - bounds.left, 0), bounds.width);
    const nextSplit = 100 - (x / bounds.width) * 100;
    setSplit(nextSplit);
    setTextVisible(true); // Show text if user interacts
    const midpoint = bounds.width / 2;
    const deadZone = bounds.width * 0.04; // soften transitions around center
    const nextSide =
      Math.abs(x - midpoint) <= deadZone
        ? null
        : x < midpoint
        ? "developer"
        : "designer";
    setHoveredSide((prev) => (prev === nextSide ? prev : nextSide));
  }, []);

  // Pointer-driven animation: as user moves mouse, push one image over the other
  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    updateSplitFromPointer(e.clientX);
  };

  // Reset split to center with easing when pointer leaves hero area
  const onPointerLeave: React.PointerEventHandler<HTMLDivElement> = () => {
    setHoveredSide(null);
    setSplit(50);
  };

  const handleSideClick = useCallback(
    (side: "developer" | "designer") => {
      setHoveredSide(side);
      setSplit(side === "developer" ? 75 : 25);
      scrollToSection(
        side === "developer" ? "developer-projects" : "designer-projects"
      );
    },
    [scrollToSection]
  );

  // Keyboard accessibility: left/right arrows adjust split
  const onKeyboardAdjust: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowLeft") setSplit((s) => Math.max(0, s - 2));
    if (e.key === "ArrowRight") setSplit((s) => Math.min(100, s + 2));
  };

  const developerActive = hoveredSide === "developer";
  const designerActive = hoveredSide === "designer";

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[72vh] bg-[var(--background)] flex items-center justify-center overflow-hidden"
      aria-label="Hero split portrait: Designer and Developer"
    >

      {/* Flex container for images, centered and layered */}
      <div
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(split)}
        aria-label="Adjust split between Designer and Developer"
        tabIndex={0}
        onKeyDown={onKeyboardAdjust}
        onPointerMove={interactive ? onPointerMove : undefined}
        onPointerDown={interactive ? onPointerMove : undefined}
        onPointerLeave={onPointerLeave}
        className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden"
        style={{ width: "100%", margin: 0 }}
      >
        {/* Images, split and animated */}
        {(() => {
          const maxSlide = 160; // Max number of pixels to slide images horizontally
          const offset = split - 50; // Calculate offset from center
          const slide = (offset / 50) * maxSlide; // Calculate slide amount
          // Fast transition for pointer movement, slow for initial doors
          const fastTransition =
            "transform 0.2s cubic-bezier(.7,.2,.3,1), clip-path 0.2s cubic-bezier(.7,.2,.3,1)";
          const doorTransition = doorsClosed
            ? fastTransition
            : "transform 2.5s cubic-bezier(.7,.2,.3,1), clip-path 2.5s cubic-bezier(.7,.2,.3,1)";

          const fadeStart = 58;
          const fadeWindow = 20;

          const designerOpacity =
            split <= fadeStart
              ? 1
              : 1 - Math.min(Math.max((split - fadeStart) / fadeWindow, 0), 1);

          const developerOpacity =
            split >= 100 - fadeStart
              ? 1
              : 1 -
                Math.min(
                  Math.max((100 - fadeStart - split) / fadeWindow, 0),
                  1
                );

          return (
            <>
              <Image
                src="/images/hero-design.png"
                alt="Designer Jerod"
                fill
                style={{
                  objectFit: "contain",
                  objectPosition: "50% 100%",
                  clipPath: `polygon(${split}% 0, 100% 0, 100% 100%, ${split}% 100%)`,
                  zIndex: split > 50 ? 30 : 10,
                  left: 0,
                  transition: doorTransition,
                  transform: doorsClosed
                    ? `translateX(${slide}px)`
                    : `translateX(100%)`,
                  filter: "drop-shadow(0 25px 55px rgba(31, 60, 87, 0.26))",
                  opacity: designerOpacity,
                }}
                sizes="100vw"
                priority
              />
              <Image
                src="/images/hero-dev.png"
                alt="Developer Jerod"
                fill
                style={{
                  objectFit: "contain",
                  objectPosition: "50% 100%",
                  clipPath: `polygon(0 0, ${split}% 0, ${split}% 100%, 0 100%)`,
                  zIndex: split < 50 ? 30 : 20,
                  left: 0,
                  transition: doorTransition,
                  transform: doorsClosed
                    ? `translateX(${slide}px)`
                    : `translateX(-100%)`,
                  filter: "drop-shadow(0 25px 55px rgba(31, 60, 87, 0.26))",
                  opacity: developerOpacity,
                }}
                sizes="100vw"
                priority
              />
            </>
          );
        })()}

        {/* Soft vignette for readability */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-[1]"
          style={{
            background:
              "radial-gradient(120% 60% at 50% 60%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.00) 55%)",
          }}
        />

        {/* No color swell to keep hero area clean/white */}

        {/* Overlay text, centered and layered above images */}
        <div
          className="absolute inset-0 z-40 flex flex-col items-center justify-center select-none"
          style={{
            opacity: textVisible ? 1 : 0,
            transition: "opacity 0.7s cubic-bezier(.7,.2,.3,1) 0.1s",
          }}
        >
          <div className="mx-auto flex w-full justify-between max-w-7xl gap-12 px-6 md:gap-24 md:px-8 lg:px-12">
            <div
              role="button"
              tabIndex={0}
              aria-label="Jump to developer projects"
              onClick={() => handleSideClick("developer")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleSideClick("developer");
                }
              }}
              onMouseEnter={() => setHoveredSide("developer")}
              onMouseLeave={() => setHoveredSide(null)}
              onFocus={() => setHoveredSide("developer")}
              onBlur={() => setHoveredSide(null)}
              className={`pointer-events-auto group hero-card hero-card--developer ${
                developerActive ? "hero-card--active" : ""
              }`}
              style={{
                opacity: split < 30 ? (split < 20 ? 0 : (split - 20) / 10) : 1,
              }}
            >
              <span className="hero-card__eyebrow">Back-End</span>
              <span className="hero-card__title">Developer</span>
              <span className="hero-card__summary">
                Engineering seamless, scalable digital experiences.
              </span>
              <span className="hero-card__cta inline-flex items-center gap-2 text-sm font-semibold">
                Explore
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
            <div
              role="button"
              tabIndex={0}
              aria-label="Jump to designer projects"
              onClick={() => handleSideClick("designer")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleSideClick("designer");
                }
              }}
              onMouseEnter={() => setHoveredSide("designer")}
              onMouseLeave={() => setHoveredSide(null)}
              onFocus={() => setHoveredSide("designer")}
              onBlur={() => setHoveredSide(null)}
              className={`pointer-events-auto group hero-card hero-card--designer ${
                designerActive ? "hero-card--active" : ""
              }`}
              style={{
                opacity:
                  split > 70 ? (split > 80 ? 0 : 1 - (split - 70) / 10) : 1,
              }}
            >
              <span className="hero-card__eyebrow">Front-End</span>
              <span className="hero-card__title text-right">Designer</span>
              <span className="hero-card__summary text-right">
                Designing intuitive, impactful brand experiences.
              </span>
              <span className="hero-card__cta inline-flex items-center gap-2 text-sm font-semibold">
                Explore
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5" />
                  <path d="M11 18l-6-6 6-6" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom info section */}
    </section>
  );
}
