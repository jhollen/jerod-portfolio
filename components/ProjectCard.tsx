import type { Project } from "@/lib/projects";

export default function ProjectCard({
  project,
  hideRepoLink = true,
}: {
  project: Project;
  hideRepoLink?: boolean;
}) {
  return (
    <div className="project-card flex h-full flex-col overflow-hidden rounded-3xl">
      <div className="project-card__surface flex flex-1 flex-col gap-4 rounded-3xl px-6 pb-6 pt-6">
        <div className="flex items-center justify-between gap-3">
          <span className="project-card__category inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em]">
            <span className="project-card__category-dot h-1.5 w-1.5 rounded-full" />
            {project.category}
          </span>
          {project.stats?.totalSaved ? (
            <span className="project-card__stat text-xs rounded-full px-3 py-1 font-medium">
              {project.stats.totalSaved} saved
            </span>
          ) : null}
        </div>

        <h3 className="project-card__title mb-2 text-xl font-semibold">
          {project.title}
        </h3>

        <p className="project-card__tagline text-sm leading-relaxed">
          {project.tagline}
        </p>

        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((t: string) => (
              <span
                key={t}
                className="project-card__chip text-xs rounded-full px-3 py-1 shadow-sm"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="project-card__chip text-xs rounded-full px-3 py-1 shadow-sm">
                +{project.tech.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="project-card__cta mt-auto flex items-center gap-3 text-sm font-medium">
          <span className="inline-flex items-center gap-2">
            View Details
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
          {!hideRepoLink && project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              className="ml-auto text-sm glass-ink-muted hover:underline"
              rel="noopener noreferrer"
            >
              Source
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
