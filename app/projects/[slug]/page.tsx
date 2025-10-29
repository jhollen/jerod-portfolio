"use client";

import React from "react";
import { notFound } from "next/navigation";
import GlassCard from "../../../components/GlassCard";
import { Container } from "../../../components/Container";
import { featuredProjects } from "../../../lib/projects";

type Params = { slug: string };

const SAMPLE_CLI_OUTPUT = `Checking /Users/jerod/Dev/rails-image-optimizer-demo/app/assets/images/bloated/bloat_svg_1.svg (15017 bytes)
Checking /Users/jerod/Dev/rails-image-optimizer-demo/app/assets/images/bloated/bloat_svg_2.svg (15017 bytes)
Checking /Users/jerod/Dev/rails-image-optimizer-demo/app/assets/images/bloated/bloat_svg_3.svg (15017 bytes)

• Optimized (>= 2%) – by type
  JPG: 25 file(s), saved 1.31 MB (avg 53.70 KB)
  PNG: 25 file(s), saved 51.46 MB (avg 2.06 MB)
  SVG: 25 file(s), saved 84.67 KB (avg 3.39 KB)

  Files:
  - /Users/jerod/Dev/rails-image-optimizer-demo/app/assets/images/bloated/bloat_1.png  -2.06 MB
  - /Users/jerod/Dev/rails-image-optimizer-demo/app/assets/images/bloated/bloat_10.jpg -54.46 KB
  - /Users/jerod/Dev/rails-image-optimizer-demo/app/assets/images/bloated/bloat_12.jpg -53.56 KB
  - /Users/jerod/Dev/rails-image-optimizer-demo/app/assets/images/bloated/bloat_13.png -2.06 MB
  - /Users/jerod/Dev/rails-image-optimizer-demo/app/assets/images/bloated/bloat_14.jpg -53.50 KB
  ... (60 more)

• Negligible (< 2%) – by type
  GIF: 26 file(s), net change 33 B

  Sample:
  - /Users/jerod/Dev/rails-image-optimizer-demo/app/assets/images/bloated/bloat_gif_1.gif  (0 bytes)
  - /Users/jerod/Dev/rails-image-optimizer-demo/app/assets/images/bloated/bloat_gif_2.gif  (0 bytes)
  - /Users/jerod/Dev/rails-image-optimizer-demo/app/assets/images/bloated/bloat_gif_3.gif  (-8 B)

  Saved this run: 52.86 MB
  Total saved (all time): 105.72 MB
  Optimization complete.`;

function CollapsibleCode({ label, code }: { label: string; code: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {open ? "Hide" : "Show"} {label}
        <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
          CLI
        </span>
      </button>
      {open ? (
        <div className="overflow-hidden rounded-[28px] border border-white/20 bg-slate-950/80 p-6 shadow-[0_24px_48px_rgba(2,6,23,0.35)] backdrop-blur">
          <pre className="scrollbar-thin max-h-[520px] overflow-auto text-[12.5px] leading-relaxed text-slate-200">
            <code>{code}</code>
          </pre>
        </div>
      ) : null}
    </div>
  );
}

export default function ProjectDetail({ params }: { params: Params }) {
  const project = featuredProjects.find((p) => p.slug === params.slug);

  if (!project) return notFound();

  return (
    <main className="relative min-h-screen pb-20 pt-16">
      <div className="projects-backdrop pointer-events-none absolute inset-0 -z-10 opacity-95 blur-3xl" />

      <Container className="relative z-10 flex flex-col gap-10 px-6 md:px-10">
        <GlassCard
          as="section"
          className="glass-section rounded-[48px] px-8 py-10 text-slate-900 md:px-12 lg:px-16"
        >
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-black/55">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-sky-400 to-sky-200" />
                  {project.category}
                </span>
                {project.stats?.totalSaved ? (
                  <span className="rounded-full border border-white/40 bg-white/55 px-3 py-1 text-xs font-medium text-black/60">
                    {project.stats.totalSaved} saved
                  </span>
                ) : null}
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                  {project.title}
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
                  {project.tagline}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {project.repo ? (
                  <a
                    href={project.repo}
                    className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/30 px-5 py-2 text-sm font-medium text-slate-800 transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/40"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Source
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
                      <path d="M15 3h6v6" />
                      <path d="M10 14 21 3" />
                    </svg>
                  </a>
                ) : null}
                {project.href ? (
                  <a
                    href={project.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-5 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/25"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Live Experience
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                ) : null}
              </div>
            </div>

            {project.stats?.metrics ? (
              <div className="grid gap-3 rounded-[32px] border border-white/30 bg-white/20 p-6 text-sm text-slate-700 shadow-[0_14px_40px_rgba(15,23,42,0.16)] lg:w-[300px]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Key Metrics
                </p>
                <ul className="flex flex-col gap-3">
                  {project.stats.metrics.map(({ label, value }) => (
                    <li
                      key={label}
                      className="flex items-center justify-between rounded-full border border-white/40 bg-white/55 px-4 py-2 text-sm text-slate-700"
                    >
                      <span className="font-medium text-slate-500">
                        {label}
                      </span>
                      <span className="text-base font-semibold text-slate-900">
                        {value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </GlassCard>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <GlassCard
            as="section"
            className="rounded-[36px] px-8 py-10 text-slate-800"
          >
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              What happened?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {project.highlights}
            </p>
          </GlassCard>

          {project.stats?.metrics ? (
            <GlassCard
              as="aside"
              className="hidden h-full flex-col gap-4 rounded-[36px] px-8 py-10 text-slate-700 lg:flex"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Snapshot
                </p>
                {project.stats?.totalSaved ? (
                  <p className="mt-4 text-4xl font-semibold text-slate-950">
                    {project.stats.totalSaved}
                    <span className="ml-2 text-sm font-medium text-slate-500">
                      saved
                    </span>
                  </p>
                ) : null}
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                Metrics pulled from the shipped automation and analytics layer.
              </p>
            </GlassCard>
          ) : null}

          <GlassCard
            as="section"
            className="rounded-[36px] px-8 py-10 text-slate-800 lg:col-start-1"
          >
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                  Tech & Impact
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tech?.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-white/45 bg-white/55 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-slate-600 shadow-[0_4px_12px_rgba(15,23,42,0.08)]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {project.whyImpressive ? (
                <p className="text-base leading-relaxed text-slate-600">
                  {project.whyImpressive}
                </p>
              ) : null}
            </div>
          </GlassCard>
        </div>

        {project.slug === "rails-image-optimizer" ? (
          <GlassCard
            as="section"
            className="rounded-[36px] px-8 py-10 text-slate-100"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
                  CLI Snapshot
                </span>
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  Sample CLI Output
                </h2>
                <p className="text-sm text-white/70">
                  Collapsible log excerpt from the demo run of the optimizer.
                </p>
              </div>
              <CollapsibleCode label="sample run" code={SAMPLE_CLI_OUTPUT} />
              <p className="text-xs text-white/60">
                Tip: collapse long paths in the reporter to keep output skimmable.
              </p>
            </div>
          </GlassCard>
        ) : null}
      </Container>
    </main>
  );
}
