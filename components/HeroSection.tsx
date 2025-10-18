"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export default function HeroSection() {
  const [split, setSplit] = useState(50);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Pointer-driven animation: as user moves mouse, push one image over the other
  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const bounds = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - bounds.left;
    setSplit(100 - Math.max(0, Math.min(100, (x / bounds.width) * 100)));
  };

  // Keyboard accessibility: left/right arrows adjust split
  const onKeyboardAdjust: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "ArrowLeft") setSplit((s) => Math.max(0, s - 2));
    if (e.key === "ArrowRight") setSplit((s) => Math.min(100, s + 2));
  };

  return (
    <div className="w-full bg-white">
      <section
        ref={sectionRef}
        className="relative isolate overflow-hidden z-0 w-full flex flex-col items-stretch justify-end bg-white pt-32 p-0 m-0"
        style={{
          minHeight: "60vh",
          maxHeight: "700px",
          background: "#fff",
          paddingTop: "8rem",
          paddingBottom: 0,
          margin: 0,
          height: "auto",
        }}
        aria-label="Hero split portrait: Designer and Developer"
      >
        {/* Inline labels and image split */}
        <div
          className="relative w-full flex-grow flex flex-col justify-end"
          style={{
            height: "100%",
            minHeight: 0,
            paddingBottom: 0,
            marginBottom: 0,
            position: "relative",
          }}
        >
          {/* Full-width image split anchored to bottom */}
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
            className="absolute left-1/2 bottom-0 -translate-x-1/2 w-full max-w-6xl h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
            style={{ paddingBottom: 0, marginBottom: 0 }}
          >
            {/* Designer image overlays developer when cursor is left of center, and vice versa (reversed) */}
            <Image
              src="/images/design-4.png"
              alt="Designer Jerod"
              fill
              style={{
                objectFit: "contain",
                objectPosition: "50% 40%",
                clipPath: `polygon(${split}% 0, 100% 0, 100% 100%, ${split}% 100%)`,
                zIndex: split > 50 ? 30 : 10,
                left: 0,
                transition: "clip-path 0.2s cubic-bezier(.7,.2,.3,1)",
              }}
              sizes="100vw"
              priority
            />
            <Image
              src="/images/developer-5.png"
              alt="Developer Jerod"
              fill
              style={{
                objectFit: "contain",
                objectPosition: "50% 40%",
                clipPath: `polygon(0 0, ${split}% 0, ${split}% 100%, 0 100%)`,
                zIndex: split < 50 ? 30 : 20,
                left: 0,
                transition: "clip-path 0.2s cubic-bezier(.7,.2,.3,1)",
              }}
              sizes="100vw"
              priority
            />
            {/* Split indicator line for depth */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-[5%] bottom-[5%] w-px bg-black/20"
              style={{ left: `${split}%`, transform: "translateX(-0.5px)" }}
            />
            {/* Soft vignette to keep the center readable */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 60% at 50% 60%, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.00) 55%)",
              }}
            />
          </div>
          {/* Overlay text on top of images (no extra message) */}
          <div className="absolute left-0 top-0 w-full flex flex-col items-center pt-8 z-10 pointer-events-none select-none">
            <div className="flex w-full justify-between px-8">
              <h1
                className="text-2xl md:text-4xl font-bold text-black px-4 py-2"
                aria-hidden
                style={{ letterSpacing: "-0.02em" }}
              >
                Developer
              </h1>
              <h1
                className="text-2xl md:text-4xl font-bold text-black rounded px-4 py-2"
                aria-hidden
                style={{ letterSpacing: "-0.02em" }}
              >
                Designer
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
