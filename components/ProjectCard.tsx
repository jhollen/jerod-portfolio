"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  hideRepoLink?: boolean;
  variant?: "engineering" | "design";
};

const variantConfig = {
  engineering: {
    accentLine:
      "from-sky-300/80 via-sky-400/80 to-indigo-400/80 group-hover:opacity-100",
    glow: "group-hover:opacity-25",
    chip:
      "border-sky-400/60 bg-transparent text-sky-800 dark:text-sky-200",
    link: "text-sky-700 group-hover:text-sky-900",
    ring: "focus-within:ring-accent-blue/60",
  },
  design: {
    accentLine:
      "from-orange-300/80 via-rose-300/80 to-rose-400/80 group-hover:opacity-100",
    glow: "group-hover:opacity-30",
    chip:
      "border-rose-400/60 bg-transparent text-rose-800 dark:text-rose-100",
    link: "text-rose-700 group-hover:text-rose-900",
    ring: "focus-within:ring-accent-orange/60",
  },
} as const;

export default function ProjectCard({
  project,
  hideRepoLink = true,
  variant,
}: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const resolvedVariant =
    variant ?? (project.discipline === "dev" ? "engineering" : "design");
  const config = variantConfig[resolvedVariant];

  return (
    <motion.article
      className={clsx(
        "group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-white/70 via-white/40 to-blue-50/20 shadow-2xl shadow-blue-200/40 ring-1 ring-white/40 p-7 transition-all duration-200 backdrop-blur-lg hover:-translate-y-1 hover:scale-[1.015] hover:brightness-110 hover:shadow-3xl",
        "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white",
        config.ring
      )}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              scale: 1.015,
              y: -2,
              filter: "brightness(1.10)",
              transition: { type: "spring", stiffness: 200, damping: 20 },
            }
      }
      whileTap={
        prefersReducedMotion
          ? undefined
          : { scale: 0.995, transition: { duration: 0.12 } }
      }
    >
      {/* Shine/highlight edge */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/30" />
      {/* Gentle vignette/radial overlay for premium focus */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,41,59,0.06)_0%,transparent_70%)]" />
      {/* Subtle noise texture */}
      <div className="pointer-events-none absolute inset-0 bg-noise-texture opacity-10" />
      <span
        className={clsx(
          "pointer-events-none absolute inset-y-4 left-0 w-[4px] rounded-full bg-gradient-to-b opacity-80 transition-opacity duration-300",
          config.accentLine
        )}
        aria-hidden="true"
      />
      <span
        className={clsx(
          "pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/80 via-transparent to-transparent opacity-0 transition-opacity duration-500",
          config.glow
        )}
        aria-hidden="true"
      />
      <div className="relative z-10 flex h-full flex-col gap-4">
        <span className="inline-flex w-fit items-center rounded-full border border-border-subtle/60 bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.3em] text-text-subtle shadow-subtle">
          {project.category}
        </span>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight text-ink">
            {project.title}
          </h3>
          <p className="text-sm leading-7 text-text-subtle">
            {project.tagline}
          </p>
        </div>
        {project.tech && project.tech.length > 0 ? (
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((stack) => (
              <li
                key={stack}
                className={clsx(
                  "rounded-full border px-3 py-1 text-[12px] font-medium",
                  config.chip
                )}
              >
                {stack}
              </li>
            ))}
            {project.tech.length > 4 ? (
              <li className="rounded-full border border-border-subtle/70 bg-transparent px-3 py-1 text-[12px] font-medium text-text-subtle">
                +{project.tech.length - 4} more
              </li>
            ) : null}
          </ul>
        ) : null}
        <div className="mt-auto flex items-center justify-between text-xs text-text-subtle">
          {project.stats?.totalSaved ? (
            <span>{project.stats.totalSaved} saved</span>
          ) : (
            <span />
          )}
          {!hideRepoLink && project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-text-subtle underline-offset-4 transition-colors hover:text-text"
            >
              Source
              <span aria-hidden="true" className="text-[10px]">
                ↗
              </span>
            </a>
          ) : null}
        </div>
        <div className="pt-4">
          <span
            className={clsx(
              "inline-flex items-center gap-2 text-sm font-semibold transition-colors",
              config.link
            )}
          >
            View Details
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </motion.article>
  );
}
