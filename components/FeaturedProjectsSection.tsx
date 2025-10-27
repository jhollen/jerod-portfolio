"use client";

import { useEffect, useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { featuredProjects } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import { Container } from "./Container";

type DisciplineFilter = "dev" | "design";

const FILTERS: Array<{
  id: DisciplineFilter;
  label: string;
  description: string;
}> = [
  {
    id: "dev",
    label: "Engineering",
    description: "Automation, infrastructure, and build-side product work.",
  },
  {
    id: "design",
    label: "Design",
    description: "Systems, experiences, and storytelling through interfaces.",
  },
];

const disciplineMap: Record<DisciplineFilter, Project[]> = {
  dev: featuredProjects.filter((p) => p.discipline === "dev"),
  design: featuredProjects.filter((p) => p.discipline === "design"),
};

export default function FeaturedProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<DisciplineFilter>("dev");

  const projects = useMemo(() => {
    const list = disciplineMap[activeFilter] ?? [];
    return list.slice(0, 3);
  }, [activeFilter]);

  const activeMeta = FILTERS.find((filter) => filter.id === activeFilter);

  useEffect(() => {
    const onFilter = (event: Event) => {
      const custom = event as CustomEvent<{ filter?: DisciplineFilter }>;
      if (custom.detail?.filter) {
        setActiveFilter(custom.detail.filter);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener(
        "featured-project-filter",
        onFilter as EventListener
      );
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener(
          "featured-project-filter",
          onFilter as EventListener
        );
      }
    };
  }, []);

  return (
    <section id="featured-projects" className="relative py-20">
      <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-[520px] max-w-6xl rounded-[48px] bg-white/6 blur-3xl" />

      <Container className="glass-section rounded-[48px] px-6 py-12 md:px-12 lg:px-16">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Featured Projects
              </h2>
              {activeMeta ? (
                <p className="mt-3 max-w-2xl text-base text-slate-600">
                  {activeMeta.description}
                </p>
              ) : null}
            </div>
            <div className="glass-toggle-group flex flex-wrap gap-3">
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`glass-toggle ${
                    activeFilter === filter.id ? "glass-toggle--active" : ""
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block h-full"
              >
                <ProjectCard project={project} hideRepoLink />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
