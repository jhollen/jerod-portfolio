"use client";
import Image from "next/image";
// Motion + hooks for load and scroll parallax
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  // Ref for scroll-driven parallax across the hero section
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  // Scroll progress from the top of the hero to the top of the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax mappings (first ~60vh worth of travel)
  // const yPortraitRaw = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const sPortrait = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  const yRing = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const sRing = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    // Pure black, overflow hidden; ref drives parallax transforms
    <section
      ref={ref}
      className="relative h-[calc(100vh-80px)] overflow-hidden bg-black"
      style={{ minHeight: 'calc(100vh - 80px)', height: 'calc(100vh - 80px)' }}
    >
      {/* Top heading */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-8 md:pt-10">
        <div className="flex justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-[clamp(22px,3.2vw,40px)] font-semibold tracking-tight text-white"
          >
            Jerod Hollen
          </motion.h1>
        </div>
        <div className="mt-2 flex justify-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.5 }}
            className="text-[clamp(12px,1.8vw,16px)] font-semibold tracking-[0.32em] uppercase bg-gradient-to-b from-[#ffb15c] via-[#f08a34] to-[#c26118] bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]"
          >
            Frontend Engineer
          </motion.p>
        </div>
      </div>

      {/* RING: load-in blur -> settle + scroll parallax (keeps your existing src) */}
      <motion.div
        style={{ y: yRing, scale: sRing }}
        initial={{
          scale: prefersReduced ? 1 : 1.22,
          opacity: prefersReduced ? 0.7 : 0,
          filter: prefersReduced ? "blur(0px)" : "blur(18px)",
        }}
        animate={{
          scale: 1,
          opacity: 0.7,
          filter: prefersReduced ? "blur(0px)" : "blur(2px)",
        }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 will-change-transform"
      >
        <Image
          src="/images/hero.png"
          alt=""
          width={2000}
          height={1125}
          priority
        />
      </motion.div>


      {/* PORTRAIT: bottom anchored, ratio box prevents distortion; load-in settle + parallax */}
      <div className="absolute inset-0 flex items-end justify-center">
        <motion.div
          initial={{
            y: prefersReduced ? 0 : "6vh",
            scale: prefersReduced ? 1 : 1.04,
            opacity: prefersReduced ? 1 : 0,
          }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[clamp(320px,85vw,1600px)] aspect-[16/9] overflow-hidden transform-gpu will-change-transform"
        >
          {/* DISC: centered, behind portrait, raised to frame crown */}
          <div className="absolute left-1/2 bottom-[18%] -translate-x-1/2 z-0 w-[60%] h-[60%] flex items-center justify-center pointer-events-none">
            <Image
              src="/images/disc.png"
              alt="Decorative disc"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          {/* Keep your existing portrait; fill + contain prevents stretching */}
          <Image
            src="/images/hero.png"
            alt="Jerod Hollen"
            fill
            priority
            quality={90}
            sizes="(min-width:1600px) 1600px, (min-width:768px) 85vw, 85vw"
            style={{ objectFit: "contain", objectPosition: "bottom", zIndex: 1 }}
          />

          {/* SPECULAR sweep across portrait (clipped to box) */}
          {!prefersReduced && (
            <motion.div
              initial={{ x: "-60%", opacity: 0 }}
              animate={{ x: "120%", opacity: 0.75 }}
              transition={{
                delay: 0.55,
                duration: 1.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-none absolute inset-y-0 left-0 w-[140%] mix-blend-screen"
              style={{
                background:
                  "linear-gradient(110deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 65%)",
                filter: "blur(6px)",
              }}
            />
          )}

          {/* GLINT pings for quick highlights */}
          {!prefersReduced && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 0.9, 0], scale: [0.6, 1, 0.7] }}
                transition={{ delay: 0.75, duration: 0.6, ease: "easeOut" }}
                className="pointer-events-none absolute h-6 w-6 rounded-full"
                style={{
                  top: "34%",
                  left: "46%",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0) 70%)",
                  filter: "blur(1px)",
                  mixBlendMode: "screen",
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 0.9, 0], scale: [0.6, 1, 0.7] }}
                transition={{ delay: 0.88, duration: 0.6, ease: "easeOut" }}
                className="pointer-events-none absolute h-4 w-4 rounded-full"
                style={{
                  top: "42%",
                  left: "56%",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0) 70%)",
                  filter: "blur(1px)",
                  mixBlendMode: "screen",
                }}
              />
            </>
          )}
        </motion.div>
      </div>

      {/* Subtle bottom vignette for depth */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
    </section>
  );
}
