"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export default function HeroSection() {
  const [split, setSplit] = useState(0); // Start at 0 for animation
  const [doorsClosed, setDoorsClosed] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
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

  // Pointer-driven animation: as user moves mouse, push one image over the other
  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const bounds = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - bounds.left;
    setSplit(100 - (x / bounds.width) * 100);
    setTextVisible(true); // Show text if user interacts
  };

  // Reset split to center with easing when pointer leaves hero area
  const onPointerLeave: React.PointerEventHandler<HTMLDivElement> = () => {
    setSplit(50);
  };

  // Keyboard accessibility: left/right arrows adjust split
  const onKeyboardAdjust: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowLeft") setSplit((s) => Math.max(0, s - 2));
    if (e.key === "ArrowRight") setSplit((s) => Math.min(100, s + 2));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[60vh] bg-white flex items-center justify-center overflow-hidden"
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
        onPointerMove={onPointerMove}
        onPointerDown={onPointerMove}
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
          return (
            <>
              <Image
                src="/images/designer-final.png"
                alt="Designer Jerod"
                fill
                style={{
                  objectFit: "contain",
                  objectPosition: "50% 45%",
                  clipPath: `polygon(${split}% 0, 100% 0, 100% 100%, ${split}% 100%)`,
                  zIndex: split > 50 ? 30 : 10,
                  left: 0,
                  transition: doorTransition,
                  transform: doorsClosed
                    ? `translateX(${slide}px)`
                    : `translateX(100%)`,
                }}
                sizes="100vw"
                priority
              />
              <Image
                src="/images/developer-final.png"
                alt="Developer Jerod"
                fill
                style={{
                  objectFit: "contain",
                  objectPosition: "50% 45%",
                  clipPath: `polygon(0 0, ${split}% 0, ${split}% 100%, 0 100%)`,
                  zIndex: split < 50 ? 30 : 20,
                  left: 0,
                  transition: doorTransition,
                  transform: doorsClosed
                    ? `translateX(${slide}px)`
                    : `translateX(-100%)`,
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
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 60% at 50% 60%, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.00) 55%)",
          }}
        />
        {/* Overlay text, centered and layered above images */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none"
          style={{
            opacity: textVisible ? 1 : 0,
            transition: "opacity 0.7s cubic-bezier(.7,.2,.3,1) 0.1s",
          }}
        >
          <div className="flex w-full justify-between px-8 md:px-16">
            <div className="flex flex-col items-start">
              <h1
                className="text-4xl md:text-6xl font-extrabold text-black tracking-tight px-4 py-2 drop-shadow-sm"
                aria-hidden
                style={{
                  letterSpacing: "-0.03em",
                  opacity:
                    split < 30 ? (split < 20 ? 0 : (split - 20) / 10) : 1,
                  transition: "opacity 0.4s cubic-bezier(.7,.2,.3,1)",
                }}
              >
                Developer
              </h1>
              <span
                className="text-base md:text-lg text-gray-700 px-4 pb-2 pt-1 max-w-xs md:max-w-sm font-medium"
                aria-hidden
                style={{
                  opacity:
                    split < 30 ? (split < 20 ? 0 : (split - 20) / 10) : 1,
                  transition: "opacity 0.4s cubic-bezier(.7,.2,.3,1)",
                }}
              >
                Engineering seamless, scalable digital experiences.
              </span>
            </div>
            <div className="flex flex-col items-end">
              <h1
                className="text-4xl md:text-6xl font-extrabold text-black rounded tracking-tight px-4 py-2 drop-shadow-sm"
                aria-hidden
                style={{
                  letterSpacing: "-0.03em",
                  opacity:
                    split > 70 ? (split > 80 ? 0 : 1 - (split - 70) / 10) : 1,
                  transition: "opacity 0.4s cubic-bezier(.7,.2,.3,1)",
                }}
              >
                Designer
              </h1>
              <span
                className="text-base md:text-lg text-gray-700 px-4 pb-2 pt-1 max-w-xs md:max-w-sm font-medium text-right"
                aria-hidden
                style={{
                  opacity:
                    split > 70 ? (split > 80 ? 0 : 1 - (split - 70) / 10) : 1,
                  transition: "opacity 0.4s cubic-bezier(.7,.2,.3,1)",
                }}
              >
                Designing intuitive, impactful brand experiences.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
