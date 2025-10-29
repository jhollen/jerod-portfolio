"use client";

import GlassCard from "@/components/GlassCard";
import { Container } from "@/components/Container";
import Link from "next/link";

const CONTACT = [
  {
    label: "Email",
    value: "jerod.a.hollen@gmail.com",
    href: "mailto:jerod.a.hollen@gmail.com",
  },
  {
    label: "Phone",
    value: "(360) 477-1854",
    href: "tel:+13604771854",
  },
  {
    label: "Location",
    value: "Bellingham, WA",
  },
  {
    label: "Portfolio",
    value: "jerodhollen.com",
    href: "https://jerodhollen.com",
  },
];

const EDUCATION = [
  {
    school: "Western Washington University",
    location: "Bellingham, WA",
    degree: "B.S. Computer Science",
    notes: "GPA 3.2",
    timeframe: "Sep 2020 – Jun 2022",
  },
];

const EXPERIENCE = [
  {
    company: "Cloud Security Alliance",
    role: "Web Developer",
    location: "Bellingham, WA",
    timeframe: "Jul 2022 – Oct 2025",
    bullets: [
      "Rebuilt the Skilljar training site with modular JavaScript, SCSS, and template overrides that aligned the platform with CSA branding and cut load times by ~25%.",
      "Built an automated Ruby/Rake optimization pipeline that diffed new assets against a manifest, enforced compression in CI, and reduced image payloads by ~30%.",
      "Customized Rails Admin contributor tooling with hero layouts, color themes, role badges, and tagged course feeds, improving editorial throughput by ~15%.",
      "Shipped dozens of production marketing experiences with analytics, accessibility, and responsive motion tuned for glass-inspired aesthetics.",
      "Partnered with product and design to translate wireframes into consistent cross-application UI systems.",
    ],
  },
  {
    company: "Cloud Security Alliance",
    role: "Web Developer Intern",
    location: "Bellingham, WA",
    timeframe: "Jul 2021 – Jun 2022",
    bullets: [
      "Implemented UI components and page layouts for marketing properties using Rails (ERB), SCSS, and vanilla JS under senior guidance.",
      "Refined brand alignment by refactoring CSS utilities, resolving responsiveness regressions, and assisting in multi-site launches.",
      "Supported accessibility sweeps, Lighthouse performance audits, and release QA to keep pages inclusive and reliable.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Image Optimization Pipeline",
    stack: ["Ruby", "Rake"],
    summary:
      "Build-time pipeline that scans assets, enforces compression standards, and keeps marketing payloads lean across deployments.",
  },
  {
    name: "Rails Image Optimizer",
    stack: ["Ruby", "ImageMagick"],
    summary:
      "Lossless optimization script that tracks image manifests, runs diffs, and prevents regressions in CI for long-lived content libraries.",
  },
];

const SKILLS = [
  {
    title: "Product & Engineering",
    items: [
      "Design systems",
      "Creative tooling",
      "Automation flows",
      "CMS customization",
    ],
  },
  {
    title: "Languages & Frameworks",
    items: ["TypeScript", "React/Next.js", "Ruby on Rails", "Tailwind CSS"],
  },
  {
    title: "Tools",
    items: ["Prisma & Postgres", "Playwright", "Vercel", "Figma", "Notion"],
  },
];

export default function ResumePage() {
  return (
    <main className="relative overflow-hidden pb-24 pt-32 bg-gradient-to-br from-blue-50 via-white to-pink-100">
      {/* Vignette/edge gradient overlay */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-gradient-to-br from-transparent via-transparent to-blue-100/40" />
      {/* Atmospheric blurred gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[12%] top-[-18%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(173,216,255,0.35),transparent_70%)] blur-3xl" />
        <div className="absolute right-[-10%] top-[12%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,208,242,0.3),transparent_72%)] blur-[120px]" />
        <div className="absolute bottom-[-12%] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(184,241,220,0.32),transparent_70%)] blur-[140px]" />
      </div>

      <Container className="relative flex flex-col gap-12">
        {/* Header */}
        <header className="glass-section relative overflow-hidden rounded-3xl px-10 py-14 text-slate-900 shadow-xl shadow-blue-200/30">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex max-w-2xl flex-col gap-5">
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-900/40 animate-fade-in-up">
                Resume
              </span>
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight animate-fade-in-up">
                Jerod Hollen
              </h1>
              <p className="text-base leading-relaxed text-blue-900/80 animate-fade-in-up">
                Developer and designer crafting clean, modern interfaces and
                calm product systems. I bridge UX-led motion, automation, and
                full-stack delivery for teams shipping expressive web
                experiences.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-blue-900/70 animate-fade-in-up">
              {CONTACT.map((contact) => {
                const badge = (
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/40 bg-white/50 px-4 py-1.5 text-xs font-medium text-blue-900/80 backdrop-blur-xl shadow-inner shadow-white/20">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-blue-900/50">
                      {contact.label}
                    </span>
                    <span className="font-semibold text-blue-900/80">
                      {contact.value}
                    </span>
                  </span>
                );

                return contact.href ? (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={
                      contact.href.startsWith("http") ? "_blank" : "_self"
                    }
                    rel="noopener noreferrer"
                    className="transition-transform duration-200 hover:-translate-y-1 hover:scale-105 hover:brightness-110 hover:shadow-2xl"
                  >
                    {badge}
                  </a>
                ) : (
                  <span
                    key={contact.label}
                    className="transition-transform duration-200 hover:-translate-y-1 hover:scale-105 hover:brightness-110 hover:shadow-2xl"
                  >
                    {badge}
                  </span>
                );
              })}
            </div>
          </div>
        </header>

        {/* Main grid with vertical divider */}
        <div className="grid gap-12 lg:grid-cols-[1.65fr_24px_1fr] items-start">
          {/* Experience & Projects */}
          <GlassCard className="flex flex-col gap-12 rounded-3xl p-8 shadow-xl shadow-blue-200/30 bg-gradient-to-br from-white/60 via-blue-50/40 to-pink-100/30">
            <section className="flex flex-col gap-8">
              <div className="flex items-center gap-4 animate-fade-in-up">
                <h2 className="text-lg font-bold uppercase tracking-[0.3em] text-blue-900/50">
                  Experience
                </h2>
                <span className="h-px flex-1 bg-blue-900/10" />
              </div>
              <div className="space-y-8">
                {EXPERIENCE.map((role) => (
                  <article
                    key={`${role.company}-${role.role}`}
                    className="space-y-3"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3 text-base text-blue-900/70">
                      <span className="font-semibold text-blue-900/90">
                        {role.company}
                      </span>
                      <span className="text-blue-900/60">{role.location}</span>
                    </div>
                    <div className="flex flex-wrap items-baseline justify-between gap-3 text-sm">
                      <span className="font-medium text-blue-900/80">
                        {role.role}
                      </span>
                      <span className="text-blue-900/50">{role.timeframe}</span>
                    </div>
                    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-blue-900/80">
                      {role.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-8">
              <div className="flex items-center gap-4 animate-fade-in-up">
                <h2 className="text-lg font-bold uppercase tracking-[0.3em] text-blue-900/50">
                  Projects
                </h2>
                <span className="h-px flex-1 bg-blue-900/10" />
              </div>
              <div className="space-y-7">
                {PROJECTS.map((project) => (
                  <article
                    key={project.name}
                    className="flex flex-col gap-2 rounded-2xl border border-white/40 bg-white/40 px-5 py-4 text-sm text-blue-900/80 backdrop-blur-xl shadow-inner shadow-white/10 transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:brightness-105 hover:shadow-2xl"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-blue-900/90">
                        {project.name}
                      </h3>
                      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-blue-900/40">
                        {project.stack.join(" • ")}
                      </span>
                    </div>
                    <p className="leading-relaxed">{project.summary}</p>
                  </article>
                ))}
              </div>
            </section>
          </GlassCard>

          {/* Vertical divider for large screens */}
          <div className="hidden lg:block h-full w-px bg-slate-200/60 rounded-full mx-auto" />

          {/* Education, Capabilities, Links */}
          <div className="flex flex-col gap-8">
            <GlassCard className="flex flex-col gap-7 rounded-3xl p-7 shadow-xl shadow-blue-200/30 bg-gradient-to-br from-white/70 via-blue-50/40 to-pink-100/30">
              <div className="flex items-center gap-4 animate-fade-in-up">
                <h2 className="text-lg font-bold uppercase tracking-[0.3em] text-blue-900/50">
                  Education
                </h2>
                <span className="h-px flex-1 bg-blue-900/10" />
              </div>
              <div className="space-y-7">
                {EDUCATION.map((school) => (
                  <article
                    key={school.school}
                    className="space-y-2 text-base text-blue-900/80"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3 text-blue-900/70">
                      <span className="font-semibold text-blue-900/90">
                        {school.school}
                      </span>
                      <span>{school.location}</span>
                    </div>
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <span className="font-medium text-blue-900/80">
                        {school.degree}
                      </span>
                      <span className="text-blue-900/50">
                        {school.timeframe}
                      </span>
                    </div>
                    <p className="text-xs uppercase tracking-[0.28em] text-blue-900/40">
                      {school.notes}
                    </p>
                  </article>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="flex flex-col gap-7 rounded-3xl p-7 shadow-xl shadow-blue-200/30 bg-gradient-to-br from-white/70 via-blue-50/40 to-pink-100/30">
              <div className="flex items-center gap-4 animate-fade-in-up">
                <h2 className="text-lg font-bold uppercase tracking-[0.3em] text-blue-900/50">
                  Capabilities
                </h2>
                <span className="h-px flex-1 bg-blue-900/10" />
              </div>
              <div className="space-y-5">
                {SKILLS.map((group) => (
                  <div key={group.title} className="space-y-2">
                    <h3 className="text-base font-semibold text-blue-900/80">
                      {group.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs text-blue-900/70">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/40 bg-white/40 px-3 py-1 font-medium backdrop-blur-xl shadow-inner shadow-white/10"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="flex flex-col gap-5 rounded-3xl p-7 text-base text-blue-900/70 shadow-xl shadow-blue-200/30 bg-gradient-to-t from-blue-100/80 via-white/60 to-transparent">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-900/50 animate-fade-in-up">
                Links
              </span>
              <div className="flex flex-col gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-blue-900/80 transition-transform duration-150 hover:scale-105 hover:ring-2 hover:ring-blue-200/60 hover:shadow-2xl"
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-blue-900/50">
                    Portfolio
                  </span>
                  <span className="font-medium">
                    Featured work & case studies
                  </span>
                </Link>
                <a
                  href="https://github.com/jhollen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-900/80 transition-transform duration-150 hover:scale-105 hover:ring-2 hover:ring-blue-200/60 hover:shadow-2xl"
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-blue-900/50">
                    GitHub
                  </span>
                  <span className="font-medium">Open source & experiments</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/jerodhollen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-900/80 transition-transform duration-150 hover:scale-105 hover:ring-2 hover:ring-blue-200/60 hover:shadow-2xl"
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-blue-900/50">
                    LinkedIn
                  </span>
                  <span className="font-medium">Connect & collaborate</span>
                </a>
              </div>
            </GlassCard>
          </div>
        </div>
      </Container>
    </main>
  );
}
