"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

import ProjectCard from "./ProjectCard";
import ProjectTabs, { ProjectDiscipline } from "./ProjectTabs";
import { Container } from "./Container";
import { featuredProjects } from "@/lib/projects";
import type { Project } from "@/lib/projects";

const disciplineMap: Record<ProjectDiscipline, Project[]> = {
  dev: featuredProjects.filter((project) => project.discipline === "dev"),
  design: featuredProjects.filter((project) => project.discipline === "design"),
};

export default function FeaturedProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectDiscipline | "all">(
    "all"
  );
  const prefersReducedMotion = useReducedMotion();

  const projects = useMemo(() => {
    if (activeFilter === "all") {
      return featuredProjects.slice(0, 6);
    }
    const list = disciplineMap[activeFilter] ?? [];
    return list.slice(0, 6);
  }, [activeFilter]);

  useEffect(() => {
    const onFilter = (event: Event) => {
      const custom = event as CustomEvent<{ filter?: ProjectDiscipline }>;
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
    <section
      id="featured-projects"
      className="relative overflow-hidden bg-gradient-to-br from-[#EEF2FF] via-white to-[#FFF1F2] py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-30">
        <div className="absolute -left-[20%] top-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_65%)] blur-2xl" />
        <div className="absolute -right-[15%] top-[30%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.18),transparent_68%)] blur-2xl" />
        <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay" />
      </div>

      <Container className="relative flex flex-col gap-14 px-6 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-tight text-ink md:text-[2.75rem]">
              Featured Projects
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-text-subtle">
              Calm, confident highlights spanning engineering automation and
              design systems work—showcasing how both sides of the craft come
              together.
            </p>
          </div>
          <ProjectTabs active={activeFilter} onChange={setActiveFilter} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {projects.map((project, index) => {
            const variant =
              project.discipline === "dev" ? "engineering" : "design";
            const focusRingClass =
              variant === "engineering"
                ? "focus-visible:ring-accent-blue/50"
                : "focus-visible:ring-accent-orange/50";

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{
                  duration: 0.45,
                  delay: prefersReducedMotion ? 0 : index * 0.05,
                  ease: "easeOut",
                }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className={clsx(
                    "block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                    focusRingClass
                  )}
                >
                  <ProjectCard
                    project={project}
                    hideRepoLink
                    variant={variant}
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
