"use client";
type Params = { slug: string };
import React from "react";
import { featuredProjects } from "../../../lib/projects";
import { notFound } from "next/navigation";
import { Container } from "../../../components/Container";

export default function ProjectDetail({ params }: { params: Params }) {
  // Example CLI output for demo purposes
  const sampleCliOutput = `Checking /Users/jerod/Dev/rails-image-optimizer-demo/app/assets/images/bloated/bloat_svg_1.svg (15017 bytes)
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
    const [open, setOpen] = React.useState<boolean>(false);
    return (
      <div className="mb-6">
        <button
          className="font-mono text-sm bg-[#f5f8f5] px-4 py-2 rounded-full border border-[#d1e0d2] text-gray-700 hover:bg-[#e9f0ea] transition mb-2 shadow-sm"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          {open ? "Hide" : "Show"} {label}
        </button>
        {open && (
          <pre className="bg-white text-gray-800 rounded-xl p-6 overflow-x-auto text-sm border border-[#d1e0d2] font-mono shadow-inner">
            <code>{code}</code>
          </pre>
        )}
      </div>
    );
  }

  // Use the slug from params
  const slug = params.slug;
  const project = featuredProjects.find(
    (p: (typeof featuredProjects)[number]) => p.slug === slug
  );
  if (!project) return notFound();

  return (
    <main className="min-h-screen w-full bg-[#f5f8f5] py-0">
      <Container className="py-12">
        {/* Title Section */}
        <section className="mb-10 rounded-2xl border border-[#d1e0d2] bg-white p-10 shadow-sm">
          <div className="flex flex-col gap-2 items-start md:items-center md:text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#a0c2a3] bg-[#e9f0ea] px-3 py-1 text-xs tracking-wider text-[#5a7c5d] font-medium">
              {project.category.toUpperCase()}
            </span>
            <h1
              className="mt-2 text-4xl font-extrabold tracking-tight text-gray-800 md:text-5xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              {project.title}
            </h1>
            <p className="mt-2 max-w-xl text-lg leading-relaxed text-gray-600 font-medium">
              {project.tagline}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.repo && (
                <a
                  href={project.repo}
                  className="rounded-full bg-[#7a9c7d] px-4 py-2 text-sm font-medium text-white hover:bg-[#6a8c6d] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Source on GitHub
                </a>
              )}
              {project.href && (
                <a
                  href={project.href}
                  className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </section>

        {/* What Happened Section */}
        <section className="mb-10 rounded-xl border border-[#d1e0d2] bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-[#7a9c7d] mb-4">
            What happened?
          </h2>
          <p className="text-base leading-relaxed text-gray-700">
            {project.highlights}
          </p>
        </section>

        {/* Tech & Why Impressive Section */}
        <section className="mb-10 rounded-xl border border-[#d1e0d2] bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-[#7a9c7d] mb-4">
            Tech & Impact
          </h2>
          <ul className="mb-4 space-y-2 text-base text-gray-700">
            {project.tech &&
              project.tech.map((tech: string) => (
                <li key={tech} className="flex gap-2 items-center">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#7a9c7d]" />
                  {tech}
                </li>
              ))}
          </ul>
          {project.whyImpressive && (
            <div className="mt-6 p-5 bg-[#f5f8f5] rounded-lg border border-[#d1e0d2] text-base text-gray-700 italic">
              {project.whyImpressive}
            </div>
          )}
        </section>

        {/* CLI Output Section (only for image optimizer) */}
        {project.slug === "rails-image-optimizer" && (
          <section className="mb-10 rounded-xl border border-[#d1e0d2] bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-[#7a9c7d] mb-4">
              Sample CLI Output
            </h2>
            <div className="rounded-xl border border-[#d1e0d2] bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between rounded-lg border border-[#d1e0d2] bg-[#f5f8f5] px-4 py-2 mb-2">
                <div className="flex items-center gap-2 text-[11px] text-gray-700">
                  <span className="inline-block h-2 w-2 rounded-full bg-red-400" />
                  <span className="inline-block h-2 w-2 rounded-full bg-yellow-300" />
                  <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                  <span className="ml-2 font-bold tracking-widest text-gray-700">
                    CLI OUTPUT
                  </span>
                </div>
                <code className="rounded bg-white px-2 py-0.5 text-[10px] text-gray-700 font-mono">
                  bin/demo
                </code>
              </div>
              <CollapsibleCode
                label="Sample CLI Output"
                code={sampleCliOutput}
              />
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Tip: collapse long paths in the reporter to keep output skimmable.
            </p>
          </section>
        )}
      </Container>
    </main>
  );
}
