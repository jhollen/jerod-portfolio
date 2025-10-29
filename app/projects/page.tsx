import ProjectCard from "../../components/ProjectCard";
import Link from "next/link";
import { Container } from "../../components/Container";
import { developerProjects, designerProjects } from "@/lib/projects";
import type { Project } from "@/lib/projects";

const SECTIONS: Array<{
  key: "dev" | "design";
  title: string;
  description: string;
  icon?: string;
  projects: Project[];
}> = [
  {
    key: "dev",
    title: "Development Projects",
    description:
      "Automation, backend systems, and full-stack work that tighten feedback loops and ship reliable experiences.",
    projects: developerProjects,
  },
  {
    key: "design",
    title: "Design Projects",
    description:
      "Brand, UX, and experiential work that pairs systems thinking with polished, accessible visuals.",
    projects: designerProjects,
  },
];

export default function ProjectsPage() {
  // Discipline color rhythm for card backgrounds
  const sectionBg = {
    dev: "bg-gradient-to-br from-white/70 via-blue-50/40 to-blue-100/30",
    design: "bg-gradient-to-br from-white/70 via-pink-50/40 to-pink-100/30",
  };
  const sectionRing = {
    dev: "ring-blue-200/30 hover:ring-blue-300/50",
    design: "ring-pink-200/30 hover:ring-pink-300/50",
  };

  return (
    <main className="relative min-h-screen pt-12 pb-20 bg-gradient-to-br from-blue-50 via-white to-pink-100">
      {/* Vignette/edge gradient overlay */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-gradient-to-br from-transparent via-transparent to-blue-100/40" />
      {/* Atmospheric blurred gradients */}
      <div className="projects-backdrop pointer-events-none absolute inset-0 -z-10 blur-3xl opacity-95" />
      <Container>
        {/* Header */}
        <div className="mb-14 glass-section rounded-3xl p-12 shadow-xl shadow-blue-200/30 bg-gradient-to-br from-white/60 via-blue-50/40 to-pink-100/30 animate-fade-in-up">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-blue-900/90 animate-fade-in-up">
              Project Portfolio
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-pink-300 to-blue-400 mx-auto mb-7 rounded-full"></div>
            <p className="text-blue-900/70 text-xl leading-relaxed animate-fade-in-up">
              Browse the build-side engineering efforts and the design systems
              that keep experiences cohesive.
            </p>
          </div>
        </div>

        {/* Discipline Sections */}
        {SECTIONS.map((section, idx) => {
          if (!section.projects.length) return null;
          return (
            <>
              {idx > 0 && (
                <div className="h-8 w-full border-t border-blue-900/10 my-12" />
              )}
              <section
                key={section.key}
                className="relative mb-20"
                id={`${section.key}-work`}
              >
                {/* Section atmospheric blur */}
                <div className="pointer-events-none absolute left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-white/70 via-white/10 to-transparent blur-2xl" />
                <div className="flex items-center mt-12 mb-7 gap-4 animate-fade-in-up">
                  <div>
                    <h2 className="text-3xl font-bold text-blue-900/90 animate-fade-in-up">
                      {section.title}
                    </h2>
                    <p className="text-base text-blue-900/60 mt-2 max-w-xl animate-fade-in-up">
                      {section.description}
                    </p>
                  </div>
                  <div className="flex-grow h-px bg-blue-900/10 ml-6" />
                </div>

                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14 xl:gap-16">
                  {section.projects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="block group focus:outline-none"
                      tabIndex={0}
                    >
                      <div
                        className={`group h-full overflow-hidden rounded-3xl p-0 transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:brightness-110 hover:shadow-3xl shadow-2xl shadow-blue-200/30 ring-1 ring-white/40 ${
                          sectionBg[section.key]
                        } ${sectionRing[section.key]}`}
                      >
                        <ProjectCard project={project} hideRepoLink={true} />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </>
          );
        })}
      </Container>
    </main>
  );
}
