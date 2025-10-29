"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "./Container";

export default function FooterCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-surface-base py-24">
      <div className="absolute inset-0 -z-10 bg-noise-texture opacity-10" />
      <div className="absolute inset-x-0 top-0 -z-20 h-40 bg-gradient-to-b from-surface-muted to-transparent" />

      <Container className="relative px-6 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="mx-auto max-w-3xl rounded-3xl border border-border-subtle/70 bg-white/80 p-10 text-center shadow-floating backdrop-blur"
        >
          <span className="inline-flex items-center justify-center rounded-full border border-border-subtle/80 bg-surface-base/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-text-subtle">
            Let’s build together
          </span>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-ink md:text-[2.35rem]">
            Ready for the next collaboration?
          </h2>
          <p className="mt-4 text-base leading-7 text-text-subtle">
            Whether you need systems-level engineering, interface storytelling,
            or a blend of both, I’d love to help you ship with conviction.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-accent-gradient px-8 py-3 text-sm font-semibold text-white shadow-card transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base"
            >
              Start a project
            </Link>
            <Link
              href="/resume"
              className="text-sm font-semibold text-text-subtle underline-offset-4 transition-colors duration-200 hover:text-ink"
            >
              View resume
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
