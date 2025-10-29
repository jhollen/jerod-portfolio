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
    <main className="relative overflow-hidden pb-24 pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[12%] top-[-18%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(173,216,255,0.35),transparent_70%)] blur-3xl" />
        <div className="absolute right-[-10%] top-[12%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,208,242,0.3),transparent_72%)] blur-[120px]" />
        <div className="absolute bottom-[-12%] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(184,241,220,0.32),transparent_70%)] blur-[140px]" />
      </div>

      <Container className="relative flex flex-col gap-10">
        <header className="glass-section relative overflow-hidden rounded-[44px] px-10 py-12 text-slate-900">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex max-w-2xl flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-black/45">
                Resume
              </span>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Jerod Hollen
              </h1>
              <p className="text-sm leading-relaxed text-black/60">
                Developer and designer crafting clean, modern interfaces and
                calm product systems. I bridge UX-led motion, automation, and
                full-stack delivery for teams shipping expressive web
                experiences.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-black/65">
              {CONTACT.map((contact) => {
                const badge = (
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/40 bg-white/35 px-4 py-1.5 text-xs font-medium text-black/70 backdrop-blur-xl">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-black/45">
                      {contact.label}
                    </span>
                    <span className="font-semibold text-black/70">
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
                    className="transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {badge}
                  </a>
                ) : (
                  <span
                    key={contact.label}
                    className="transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {badge}
                  </span>
                );
              })}
            </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.65fr_1fr]">
          <GlassCard className="flex flex-col gap-10">
            <section className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-black/45">
                  Experience
                </h2>
                <span className="h-px flex-1 bg-black/10" />
              </div>
              <div className="space-y-7">
                {EXPERIENCE.map((role) => (
                  <article
                    key={`${role.company}-${role.role}`}
                    className="space-y-3"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3 text-sm text-black/55">
                      <span className="text-base font-semibold text-black/80">
                        {role.company}
                      </span>
                      <span>{role.location}</span>
                    </div>
                    <div className="flex flex-wrap items-baseline justify-between gap-3 text-sm">
                      <span className="font-medium text-black/70">
                        {role.role}
                      </span>
                      <span className="text-black/45">{role.timeframe}</span>
                    </div>
                    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-black/65">
                      {role.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-black/45">
                  Projects
                </h2>
                <span className="h-px flex-1 bg-black/10" />
              </div>
              <div className="space-y-6">
                {PROJECTS.map((project) => (
                  <article
                    key={project.name}
                    className="flex flex-col gap-2 rounded-2xl border border-white/40 bg-white/25 px-4 py-4 text-sm text-black/65 backdrop-blur-xl"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-black/75">
                        {project.name}
                      </h3>
                      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-black/40">
                        {project.stack.join(" • ")}
                      </span>
                    </div>
                    <p className="leading-relaxed">{project.summary}</p>
                  </article>
                ))}
              </div>
            </section>
          </GlassCard>

          <div className="flex flex-col gap-8">
            <GlassCard className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-black/45">
                  Education
                </h2>
                <span className="h-px flex-1 bg-black/10" />
              </div>
              <div className="space-y-6">
                {EDUCATION.map((school) => (
                  <article
                    key={school.school}
                    className="space-y-2 text-sm text-black/65"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3 text-black/55">
                      <span className="font-semibold text-black/75">
                        {school.school}
                      </span>
                      <span>{school.location}</span>
                    </div>
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <span className="font-medium text-black/70">
                        {school.degree}
                      </span>
                      <span className="text-black/45">{school.timeframe}</span>
                    </div>
                    <p className="text-xs uppercase tracking-[0.28em] text-black/40">
                      {school.notes}
                    </p>
                  </article>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-black/45">
                  Capabilities
                </h2>
                <span className="h-px flex-1 bg-black/10" />
              </div>
              <div className="space-y-5">
                {SKILLS.map((group) => (
                  <div key={group.title} className="space-y-2">
                    <h3 className="text-sm font-semibold text-black/70">
                      {group.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs text-black/60">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/40 bg-white/30 px-3 py-1 font-medium backdrop-blur-xl"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="flex flex-col gap-4 text-sm text-black/60">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-black/45">
                Links
              </span>
              <div className="flex flex-col gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-black/70 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-black/45">
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
                  className="inline-flex items-center gap-2 text-black/70 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-black/45">
                    GitHub
                  </span>
                  <span className="font-medium">Open source & experiments</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/jerodhollen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-black/70 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-black/45">
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
