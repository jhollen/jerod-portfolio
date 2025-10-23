import ProjectCard from "../../components/ProjectCard";
import Link from "next/link";
import { Container } from "../../components/Container";
import { developerProjects, designerProjects } from "@/lib/projects";
import type { Project } from "@/lib/projects";

const SECTIONS: Array<{
  key: "dev" | "design";
  title: string;
  description: string;
  icon: string;
  projects: Project[];
}> = [
  {
    key: "dev",
    title: "Development Projects",
    description:
      "Automation, backend systems, and full-stack work that tighten feedback loops and ship reliable experiences.",
    icon: "💻",
    projects: developerProjects,
  },
  {
    key: "design",
    title: "Design Projects",
    description:
      "Brand, UX, and experiential work that pairs systems thinking with polished, accessible visuals.",
    icon: "🎨",
    projects: designerProjects,
  },
];

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen pt-8 pb-16">
      <div className="projects-backdrop pointer-events-none absolute inset-0 -z-10 blur-3xl opacity-95" />
      <Container>
        {/* Header */}
        <div className="mb-12 glass-surface glass-surface--thin rounded-3xl p-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Project Portfolio
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg">
              Browse the build-side engineering efforts and the design systems
              that keep experiences cohesive.
            </p>
          </div>
        </div>

        {/* Discipline Sections */}
        {SECTIONS.map((section) => {
          if (!section.projects.length) return null;
          return (
            <section
              key={section.key}
              className="relative mb-16"
              id={`${section.key}-work`}
            >
              <div className="pointer-events-none absolute left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-white/60 via-white/20 to-transparent blur-3xl" />
              <div className="flex items-center mb-8 gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-gray-200">
                  <span className="text-xl" aria-hidden="true">
                    {section.icon}
                  </span>
                  <span className="sr-only">{section.title}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 max-w-xl">
                    {section.description}
                  </p>
                </div>
                <div className="flex-grow h-px bg-gray-200 ml-4" />
              </div>

              <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14 xl:gap-16">
                {section.projects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="block group"
                    tabIndex={0}
                  >
                    <div className="group glass-card glass-card--clear glass-card--convex h-full overflow-hidden rounded-3xl transition-transform duration-500 hover:-translate-y-2 ring-1 ring-white/40 hover:ring-white/60">
                      <ProjectCard project={project} hideRepoLink={true} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </Container>
    </main>
  );
}
