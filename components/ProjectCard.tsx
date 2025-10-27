import GlassCard from "./GlassCard";
import type { Project } from "@/lib/projects";

export default function ProjectCard({
  project,
  hideRepoLink = true,
}: {
  project: Project;
  hideRepoLink?: boolean;
}) {
  return (
    <GlassCard className="flex h-full flex-col justify-between gap-6 pb-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
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

        <div className="flex flex-col gap-2">
          <h3 className="text-[1.35rem] font-semibold tracking-tight text-black/80">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-black/60">
            {project.tagline}
          </p>
        </div>

        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((t: string) => (
              <span
                key={t}
                className="rounded-full border border-white/50 bg-white/60 px-3 py-1 text-xs font-medium text-black/60 shadow-[0_1px_3px_rgba(15,23,42,0.12)]"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="rounded-full border border-white/50 bg-white/60 px-3 py-1 text-xs font-medium text-black/60 shadow-[0_1px_3px_rgba(15,23,42,0.12)]">
                +{project.tech.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center justify-end gap-4 border-t border-black/5 pt-4 text-sm font-medium text-black/65">
        {!hideRepoLink && project.repo ? (
          <a
            href={project.repo}
            target="_blank"
            className="text-sm text-black/50 underline-offset-4 hover:text-black/70 hover:underline"
            rel="noopener noreferrer"
          >
            Source
          </a>
        ) : null}

        <span className="flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
          View Details
          <svg
            className="h-4 w-4"
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
    </GlassCard>
  );
}
