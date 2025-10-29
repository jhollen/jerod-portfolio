"use client";

import React from "react";
import { notFound } from "next/navigation";
import GlassCard from "../../../components/GlassCard";
import { Container } from "../../../components/Container";
import { featuredProjects } from "../../../lib/projects";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  ShieldCheck,
  Workflow,
  FileArchive,
  UploadCloud,
  ListChecks,
  CheckCircle2,
  RefreshCcw,
  MessageCircle,
  ClipboardList,
  Palette,
  LayoutDashboard,
  FileCode2,
  GitCommit,
  Shuffle,
  Filter,
  Database,
} from "lucide-react";

type Params = { slug: string };

const SAMPLE_CLI_OUTPUT = `Checking /Users/jerod/Dev/rails-image-optimizer-demo/app/assets/images/bloated/bloat_svg_1.svg (15017 bytes)
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

type IconType = React.ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
}>;

const SCORM_FLOW: Array<{ title: string; body: string; icon: IconType }> = [
  {
    title: "Authenticate & scope",
    body: "Use vaulted credentials to log into LEAi and Skilljar, then scope the run to the learner folder the operator selects.",
    icon: ShieldCheck,
  },
  {
    title: "Export with guardrails",
    body: "On every LEAi export, enforce SCORM 3rd Edition, restricted navigation, quiz pass gating, and the standardized summary before publishing.",
    icon: Workflow,
  },
  {
    title: "Build the course map",
    body: "Capture a canonical map of course name → generated zip → checksum → Skilljar ID so downstream stages stay in lockstep.",
    icon: FileArchive,
  },
  {
    title: "Replace in Skilljar",
    body: "Locate the matching Skilljar SCORM record, trigger Replace, upload the new archive, and verify completion with UI + API assertions.",
    icon: UploadCloud,
  },
];

const SCORM_CONFIGS = [
  "SCORM 3rd Edition",
  "Restrict navigation",
  "Show correct answers",
  "Require quiz pass",
  "Standardized summary copy",
  "Name → file → SCORM ID map",
];

const SCORM_PRACTICES: Array<{ title: string; body: string; icon: IconType }> =
  [
    {
      title: "Deterministic locators",
      body: "Only data-test hooks and role queries—stable across LEAi and Skilljar UI updates.",
      icon: ListChecks,
    },
    {
      title: "Retry with tracing",
      body: "Automatic retry on transient failures plus Playwright trace-on-retry for lightweight forensics.",
      icon: RefreshCcw,
    },
    {
      title: "Idempotent + checksum aware",
      body: "Skip exports when artifacts already match remote size and checksum, preventing duplicate uploads.",
      icon: CheckCircle2,
    },
    {
      title: "Operator feedback",
      body: "Structured logs and Slack notifications call out which courses updated, skipped, or flagged for review.",
      icon: MessageCircle,
    },
  ];

const SCORM_SUPPLEMENTS = [
  {
    title: "Demo clip",
    body: "Embed a short Loom or mp4 walkthrough (blur proprietary data) showing LEAi export through Skilljar replace.",
  },
  {
    title: "Before / after timeline",
    body: "Chart the 8-hour manual process versus the 20-minute automated run to visualise the time savings.",
  },
  {
    title: "Stakeholder quote",
    body: "Add a testimonial from Enablement/Ops that speaks to confidence and reclaimed hours.",
  },
  {
    title: "Technical addendum",
    body: "Link to a scrubbed architecture doc or pseudocode snippet describing the Playwright helpers and retry logic.",
  },
];

const AUTH0_SEQUENCE: Array<{ title: string; body: string }> = [
  {
    title: "Expo app triggers universal login",
    body: "Mobile user taps sign-in, Expo opens the Auth0 hosted page, and completes authentication.",
  },
  {
    title: "Auth0 returns ID token",
    body: "Auth0 issues a signed JWT containing the user sub and claims; token stays on-device.",
  },
  {
    title: "Rails relay validates",
    body: "App posts the JWT to Rails. A JWTDecoder module verifies signature, expiry, and audience before continuing.",
  },
  {
    title: "Hydrate profile + respond",
    body: "Rails looks up the profile via the Auth0 sub, provisions if missing, and replies with sanitized JSON for the app to render.",
  },
];

const AUTH0_PRACTICES: Array<{ title: string; body: string; icon: IconType }> = [
  {
    title: "JWTDecoder service",
    body: "Wraps json-jwt verification, caches JWKs, and raises on signature or audience mismatch.",
    icon: ShieldCheck,
  },
  {
    title: "Relay contract tests",
    body: "RSpec + Playwright tests cover happy path, expired tokens, and unlinked profiles.",
    icon: Workflow,
  },
  {
    title: "Idempotent provisioning",
    body: "If the sub is new, Rails seeds the profile then returns the same payload format for Expo.",
    icon: RefreshCcw,
  },
  {
    title: "Thin mobile client",
    body: "Expo only handles UI states—authorization logic lives server-side for easier auditing.",
    icon: MessageCircle,
  },
];

const AUTH0_SUPPLEMENTS = [
  {
    title: "Sequence demo",
    body: "Record a screen capture showing the login modal, token post, and profile render in the app.",
  },
  {
    title: "Relay code snippet",
    body: "Share sanitized Ruby service objects (JWT decoder, profile serializer) to highlight reusable pieces.",
  },
  {
    title: "ERD deep dive",
    body: "Drop in a link or image detailing the users, identities, and device tables if stakeholders need the full schema.",
  },
];

const SKILLJAR_AREAS: Array<{ name: string; before: string; after: string }> = [
  {
    name: "Course detail",
    before: "Default Skilljar layout with narrow columns, generic fonts, and no brand cues.",
    after: "Introduced CSA typography, two-column layout, hero metrics, and single CTA rail with responsive breakpoints.",
  },
  {
    name: "Curriculum",
    before: "Long bullet lists without progress context or sectioning.",
    after: "Structured modules with progress pills, estimated time, and sticky navigation for long-form courses.",
  },
  {
    name: "Registration",
    before: "Fragmented forms with inconsistent buttons and duplicate fields per pricing plan.",
    after: "Normalized form styling, surfaced pricing options inline, and added trust copy plus support links.",
  },
];

const SKILLJAR_WORKFLOW: Array<{ title: string; body: string; icon: IconType }> = [
  {
    title: "Repo-driven workflow",
    body: "Created a private Git repo storing Sass, JS snippets, and Skilljar code-box assignments so every change was versioned.",
    icon: GitCommit,
  },
  {
    title: "Sass compilation",
    body: "Wrote pages in VS Code, compiled to minified CSS per template, then pasted into Skilljar’s custom code blocks.",
    icon: FileCode2,
  },
  {
    title: "Component tokens",
    body: "Built a design token sheet for colors, spacing, and typography to match CSA brand across dozens of templates.",
    icon: Palette,
  },
  {
    title: "Page-by-page QA",
    body: "Tracked every course page in a spreadsheet, toggled new styles per box, and verified on desktop + mobile before shipping.",
    icon: LayoutDashboard,
  },
];

const SKILLJAR_SUPPLEMENTS = [
  {
    title: "Before / after gallery",
    body: "Embed full-page screenshots or interactive sliders comparing legacy layouts with the redesigned versions.",
  },
  {
    title: "Implementation repo",
    body: "Link to sanitized Sass/JS snippets or a Gist showing how the minification workflow is structured.",
  },
  {
    title: "Metrics overlay",
    body: "Share LMS analytics callouts (time-on-page, conversion rate) after the redesign shipped.",
  },
  {
    title: "Ops playbook",
    body: "Highlight documentation you handed off so future contributors can safely update Skilljar templates.",
  },
];

const SKILLJAR_GALLERY: Array<{
  title: string;
  description: string;
  after: string;
  before?: string;
}> = [
  {
    title: "Knowledge Center landing",
    description:
      "Refreshed hero layout, added course segmentation cards, and aligned buttons + typography to CSA’s brand system.",
    before: "/images/projects/skilljar-redesign/kc-before.png",
    after: "/images/projects/skilljar-redesign/kc-after.png",
  },
  {
    title: "Course detail",
    description:
      "Introduced metric bar, synopsis sidebar, and responsive call-to-action rail so learners get context before enrolling.",
    after: "/images/projects/skilljar-redesign/course-detail.png",
  },
  {
    title: "All courses hub",
    description:
      "Built a grid with filtering, badge styles, and consistent card heights to replace the legacy list view.",
    after: "/images/projects/skilljar-redesign/allcourses.png",
  },
  {
    title: "Specialty catalogues",
    description:
      "Applied the same system to CCZT, Audit & Compliance, InfraSec, and CCSK verticals so every catalogue reads as one family.",
    after: "/images/projects/skilljar-redesign/cczt.png",
  },
  {
    title: "Audit & Compliance curriculum",
    description:
      "Modular sections with progress cues and consistent typography overhaul the long-form curriculum experience.",
    after: "/images/projects/skilljar-redesign/auditcompliance.png",
  },
  {
    title: "InfraSec programmes",
    description:
      "Unified navigation and contextual banners highlight track outcomes while matching CSA color tokens.",
    after: "/images/projects/skilljar-redesign/infrasec.png",
  },
  {
    title: "CCSK registration",
    description:
      "Streamlined registration layout adds reassurance copy, pricing clarity, and consistent form styling.",
    after: "/images/projects/skilljar-redesign/ccsk.png",
  },
];

const MEMBERSHIP_FLOW: Array<{ title: string; body: string; icon: IconType }> = [
  {
    title: "FormFiltering base",
    body: "Inherited the shared FormFiltering module so the member filters plug into existing validation and query hooks.",
    icon: Filter,
  },
  {
    title: "Member filter form",
    body: "Added a MemberFilter form object responsible for scoping queries to active membership states and exposing shared predicates.",
    icon: Workflow,
  },
  {
    title: "Current member child",
    body: "CurrentMemberFilter < MemberFilter encapsulates stricter logic (status window, paid-through date) while reusing parent behaviors.",
    icon: ShieldCheck,
  },
  {
    title: "Deterministic shuffle",
    body: "Seeded a pseudo-random ordering using session tokens so logos shuffle per visit yet remain stable while paginating.",
    icon: Shuffle,
  },
];

const MEMBERSHIP_TECH: Array<{ title: string; body: string; icon: IconType }> = [
  {
    title: "Scoped relations",
    body: "Used PostgreSQL scopes + Arel to compose filters without duplicating SQL.",
    icon: Database,
  },
  {
    title: "Session salt",
    body: "Derive a hash from the current session to seed the random ordering each time the page loads.",
    icon: CheckCircle2,
  },
  {
    title: "Pagination aware",
    body: "Persisted the shuffle seed across pages so users see a consistent random order while browsing.",
    icon: RefreshCcw,
  },
  {
    title: "Pain points",
    body: "Debugging deterministic randomness was gnarly—documented the strategy and added tests to prevent regressions.",
    icon: MessageCircle,
  },
];

function CollapsibleCode({ label, code }: { label: string; code: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {open ? "Hide" : "Show"} {label}
        <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
          CLI
        </span>
      </button>
      {open ? (
        <div className="scrollbar-thin max-h-[360px] overflow-auto rounded-[32px] border border-white/35 bg-slate-950/90 p-6 text-[13px] leading-relaxed text-slate-50 shadow-[0_18px_48px_rgba(2,6,23,0.45)]">
          <code>{code}</code>
        </div>
      ) : null}
    </div>
  );
}

export default function ProjectDetail({ params }: { params: Params }) {
  const project = featuredProjects.find((p) => p.slug === params.slug);

  if (!project) return notFound();
  const isScormAutomation = project.slug === "scorm-automation-scripts";
  const isAuth0Relay = project.slug === "auth0-relay-integration";
  const isSkilljarRedesign = project.slug === "csa-skilljar-redesign";
  const isMembershipFilter = project.slug === "membership-filter-system";

  return (
    <main className="relative min-h-screen pb-20 pt-16">
      <div className="projects-backdrop pointer-events-none absolute inset-0 -z-10 opacity-95 blur-3xl" />

      <Container className="relative z-10 flex flex-col gap-10 px-6 md:px-10">
        <GlassCard
          as="section"
          className="glass-section rounded-[48px] px-8 py-10 text-slate-900 md:px-12 lg:px-16"
        >
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 space-y-6">
              <div className="flex flex-wrap items-center gap-4">
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

              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                  {project.title}
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
                  {project.tagline}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {project.repo ? (
                  <a
                    href={project.repo}
                    className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/30 px-5 py-2 text-sm font-medium text-slate-800 transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/40"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Source
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
                      <path d="M15 3h6v6" />
                      <path d="M10 14 21 3" />
                    </svg>
                  </a>
                ) : null}
                {project.href ? (
                  <a
                    href={project.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-5 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/25"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Live Experience
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                ) : null}
              </div>
            </div>

            {project.stats?.metrics ? (
              <div className="grid gap-3 rounded-[32px] border border-white/30 bg-white/20 p-6 text-sm text-slate-700 shadow-[0_14px_40px_rgba(15,23,42,0.16)] lg:w-[300px]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Key Metrics
                </p>
                <ul className="flex flex-col gap-3">
                  {project.stats.metrics.map(({ label, value }) => (
                    <li
                      key={label}
                      className="flex items-center justify-between rounded-full border border-white/40 bg-white/55 px-4 py-2 text-sm text-slate-700"
                    >
                      <span className="font-medium text-slate-500">
                        {label}
                      </span>
                      <span className="text-base font-semibold text-slate-900">
                        {value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </GlassCard>

        <div
          className={`grid gap-8 ${
            project.slug === "membership-filter-system"
              ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
              : "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
          }`}
        >
          <GlassCard
            as="section"
            className="rounded-[36px] px-8 py-10 text-slate-800"
          >
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              What happened?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {project.highlights}
            </p>
          </GlassCard>

          {project.stats?.metrics ? (
            <GlassCard
              as="aside"
              className="hidden h-full flex-col gap-4 rounded-[36px] px-8 py-10 text-slate-700 lg:flex"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Snapshot
                </p>
                {project.stats?.totalSaved ? (
                  <p className="mt-4 text-4xl font-semibold text-slate-950">
                    {project.stats.totalSaved}
                    <span className="ml-2 text-sm font-medium text-slate-500">
                      saved
                    </span>
                  </p>
                ) : null}
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                Metrics pulled from the shipped automation and analytics layer.
              </p>
            </GlassCard>
          ) : null}

          <GlassCard
            as="section"
            className="rounded-[36px] px-8 py-10 text-slate-800 lg:col-start-1"
          >
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                  Tech & Impact
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tech?.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-white/45 bg-white/55 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-slate-600 shadow-[0_4px_12px_rgba(15,23,42,0.08)]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {project.whyImpressive ? (
                <p className="text-base leading-relaxed text-slate-600">
                  {project.whyImpressive}
                </p>
              ) : null}

            </div>
          </GlassCard>
        </div>

        {project.slug === "membership-filter-system" ? (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
            <div />
            <div className="overflow-hidden rounded-[28px] border border-white/55 bg-white/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.14)]">
              <Image
                src="/images/projects/csa_landing_pages/currentmembers.png"
                alt="Current members filter interface"
                width={960}
                height={540}
                className="w-full rounded-[20px] object-cover"
              />
            </div>
          </div>
        ) : null}

        {isAuth0Relay ? <Auth0RelayDetails /> : null}

        {isSkilljarRedesign ? <SkilljarRedesignDetails /> : null}

        {isMembershipFilter ? <MembershipFilterDetails /> : null}

        {isScormAutomation ? <ScormAutomationDetails /> : null}

        {project.slug === "rails-image-optimizer" ? (
          <GlassCard
            as="section"
            className="rounded-[36px] px-8 py-10 text-slate-800 shadow-card"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                  Sample CLI Output
                </h2>
                <p className="text-sm text-slate-600">
                  Collapsible log excerpt from the demo run of the optimizer.
                </p>
              </div>
              <div className="overflow-hidden rounded-[28px] border border-white/60 bg-white/80 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.16)]">
                <CollapsibleCode label="sample run" code={SAMPLE_CLI_OUTPUT} />
              </div>
            </div>
          </GlassCard>
        ) : null}
      </Container>
    </main>
  );
}

function Auth0RelayDetails() {
  return (
    <section className="grid gap-8">
      <GlassCard className="rounded-[36px] px-8 py-10 text-slate-800">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Sequence overview
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          Expo handles the Auth0 login, Rails validates the token, and the app receives a hydrated profile—no direct database access from the device.
        </p>
        <div className="mt-6 overflow-hidden rounded-[32px] border border-white/45 bg-gradient-to-r from-indigo-50 via-white to-slate-100 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.18)]">
          <svg
            viewBox="0 0 720 200"
            className="h-48 w-full"
            role="img"
            aria-labelledby="auth0-sequence"
          >
            <title id="auth0-sequence">Expo app requests profile through Auth0 and the Rails relay</title>
            <defs>
              <linearGradient id="auth0Arrow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
            <g className="fill-white text-slate-800">
              <rect x="30" y="40" width="150" height="80" rx="16" className="stroke-indigo-200" strokeWidth="2" />
              <rect x="210" y="40" width="150" height="80" rx="16" className="stroke-indigo-200" strokeWidth="2" />
              <rect x="390" y="40" width="150" height="80" rx="16" className="stroke-indigo-200" strokeWidth="2" />
              <rect x="570" y="40" width="120" height="80" rx="16" className="stroke-slate-300" strokeWidth="2" />
            </g>
            <text x="55" y="85" className="fill-current text-sm font-semibold">
              Expo Mobile App
            </text>
            <text x="255" y="85" className="fill-current text-sm font-semibold">
              Auth0 Tenant
            </text>
            <text x="420" y="85" className="fill-current text-sm font-semibold">
              Rails Relay
            </text>
            <text x="590" y="85" className="fill-current text-sm font-semibold">
              Postgres
            </text>
            <line x1="180" y1="80" x2="210" y2="80" stroke="url(#auth0Arrow)" strokeWidth="6" strokeLinecap="round" />
            <polygon points="210,80 198,72 198,88" fill="url(#auth0Arrow)" />
            <line x1="360" y1="80" x2="390" y2="80" stroke="url(#auth0Arrow)" strokeWidth="6" strokeLinecap="round" />
            <polygon points="390,80 378,72 378,88" fill="url(#auth0Arrow)" />
            <line x1="540" y1="80" x2="570" y2="80" stroke="url(#auth0Arrow)" strokeWidth="6" strokeLinecap="round" />
            <polygon points="570,80 558,72 558,88" fill="url(#auth0Arrow)" />
            <text x="120" y="140" className="fill-current text-xs">ID token</text>
            <text x="320" y="140" className="fill-current text-xs">POST /relay with JWT</text>
            <text x="505" y="140" className="fill-current text-xs">Profile lookup</text>
          </svg>
        </div>
        <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
          {AUTH0_SEQUENCE.map((step) => (
            <li key={step.title}>
              <p className="font-semibold text-slate-900">{step.title}</p>
              <p>{step.body}</p>
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard className="grid gap-6 rounded-[32px] px-8 py-10 text-slate-800 lg:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">
            Practices baked into the relay
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            Guardrails that keep the token exchange safe and debuggable.
          </p>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
            {AUTH0_PRACTICES.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-1 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  <item.icon className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">
            Lightweight ERD
          </h3>
          <p className="text-sm text-slate-600">
            Core tables touched by the relay. Mobile devices read through Rails—never directly from the database.
          </p>
          <div className="overflow-hidden rounded-[28px] border border-white/45 bg-white/85 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
            <svg
              viewBox="0 0 420 200"
              className="h-40 w-full"
              role="img"
              aria-labelledby="auth0-erd"
            >
              <title id="auth0-erd">Auth0 relay entity relationship diagram</title>
              <defs>
                <marker
                  id="erdArrow"
                  markerWidth="10"
                  markerHeight="10"
                  refX="6"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L0,6 L9,3 z" fill="#6366f1" />
                </marker>
              </defs>
              <g className="fill-slate-50">
                <rect x="30" y="30" width="150" height="60" rx="12" className="stroke-indigo-200" strokeWidth="2" />
                <rect x="240" y="20" width="150" height="60" rx="12" className="stroke-slate-200" strokeWidth="2" />
                <rect x="240" y="120" width="150" height="60" rx="12" className="stroke-slate-200" strokeWidth="2" />
              </g>
              <text x="50" y="60" className="fill-current text-sm font-semibold">
                Auth0 Identity
              </text>
              <text x="50" y="80" className="fill-current text-xs">
                sub, email
              </text>
              <text x="260" y="50" className="fill-current text-sm font-semibold">
                Users
              </text>
              <text x="260" y="70" className="fill-current text-xs">
                id, name, auth0_sub
              </text>
              <text x="260" y="150" className="fill-current text-sm font-semibold">
                Profiles
              </text>
              <text x="260" y="170" className="fill-current text-xs">
                user_id, avatar, roles
              </text>
              <path d="M180 60 H240" stroke="#6366f1" strokeWidth="3" markerEnd="url(#erdArrow)" />
              <path d="M315 80 V120" stroke="#6366f1" strokeWidth="3" markerEnd="url(#erdArrow)" />
            </svg>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="rounded-[32px] px-8 py-10 text-slate-800">
        <h3 className="text-xl font-semibold tracking-tight text-slate-950">
          Supplement this case study
        </h3>
        <p className="mt-3 text-sm text-slate-600">
          Ready-made prompts for extra artefacts when you want to deepen the story.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {AUTH0_SUPPLEMENTS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-dashed border-white/45 bg-white/70 p-4 text-sm text-slate-600"
            >
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}

function MembershipFilterDetails() {
  return (
    <section className="grid gap-8">
      <GlassCard className="rounded-[36px] px-8 py-10 text-slate-800">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Filter hierarchy brought to life
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          Starting from our shared FormFiltering base, I introduced member-specific form objects to surface active partners while keeping the filtering API familiar for the rest of the team.
        </p>
        <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
          {MEMBERSHIP_FLOW.map((item) => (
            <li key={item.title} className="flex gap-3">
              <span className="mt-1 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <item.icon className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard className="rounded-[32px] px-8 py-10 text-slate-800">
        <h3 className="text-xl font-semibold tracking-tight text-slate-950">
          Why the deterministic shuffle mattered
        </h3>
        <p className="mt-3 text-sm text-slate-600">
          Marketing wanted member logos to feel fresh while users paged through results. The trick: stay random per refresh yet stable inside each session.
        </p>
        <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
          {MEMBERSHIP_TECH.map((item) => (
            <li key={item.title} className="flex gap-3">
              <span className="mt-1 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700">
                <item.icon className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </GlassCard>
    </section>
  );
}

function SkilljarRedesignDetails() {
  return (
    <section className="grid gap-8">
      <GlassCard className="rounded-[36px] px-8 py-10 text-slate-800">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Visual case study
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          Full-page captures show how the redesign transformed each learner touchpoint. Toggle before/after where available, or skim the refreshed layouts directly.
        </p>
        <div className="mt-6 grid gap-6">
          {SKILLJAR_GALLERY.map((item) => (
            <figure
              key={item.title}
              className="overflow-hidden rounded-[32px] border border-white/55 bg-white/80 shadow-[0_18px_40px_rgba(15,23,42,0.14)]"
            >
              <figcaption className="flex flex-col gap-1 border-b border-white/60 bg-white/75 px-6 py-4 text-sm text-slate-600">
                <span className="text-base font-semibold text-slate-900">{item.title}</span>
                <span>{item.description}</span>
              </figcaption>
              <div className={item.before ? "grid gap-0 md:grid-cols-2" : "block"}>
                {item.before ? (
                  <div className="relative border-b border-white/50 md:border-b-0 md:border-r">
                    <span className="absolute left-4 top-4 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      Before
                    </span>
                    <Image
                      src={item.before}
                      alt={`${item.title} before redesign`}
                      width={1400}
                      height={900}
                      className="w-full object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : null}
                <div className="relative">
                  {item.before ? (
                    <span className="absolute left-4 top-4 rounded-full bg-emerald-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      After
                    </span>
                  ) : null}
                  <Image
                    src={item.after}
                    alt={`${item.title} redesigned view`}
                    width={1400}
                    height={900}
                    className="w-full object-cover"
                    sizes={item.before ? "(max-width: 768px) 100vw, 50vw" : "100vw"}
                  />
                </div>
              </div>
            </figure>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="rounded-[36px] px-8 py-10 text-slate-800">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Three-month reskin + systems pass
        </h2>
        <p className="mt-3 text-sm text-slate-600">
          Took over a fragmented Skilljar instance, catalogued every template, and rebuilt the LMS to match CSA’s brand across the entire learner journey.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {SKILLJAR_AREAS.map((area) => (
            <div
              key={area.name}
              className="rounded-[28px] border border-white/50 bg-white/75 p-4 shadow-[0_16px_38px_rgba(15,23,42,0.12)]"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                {area.name}
              </h3>
              <div className="mt-3 space-y-3 text-xs leading-relaxed text-slate-600">
                <p>
                  <span className="font-semibold text-slate-900">Before:</span> {area.before}
                </p>
                <p>
                  <span className="font-semibold text-slate-900">After:</span> {area.after}
                </p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="rounded-[32px] px-8 py-10 text-slate-800">
        <h3 className="text-xl font-semibold tracking-tight text-slate-950">
          Workflow at a glance
        </h3>
        <p className="mt-3 text-sm text-slate-600">
          Everything lived in source control so the team could iterate safely and paste minified assets into Skilljar’s admin UI without losing work.
        </p>
        <ul className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
          {SKILLJAR_WORKFLOW.map((item) => (
            <li key={item.title} className="flex gap-3">
              <span className="mt-1 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <item.icon className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard className="rounded-[32px] px-8 py-10 text-slate-800">
        <h3 className="text-xl font-semibold tracking-tight text-slate-950">
          Supplement this case study
        </h3>
        <p className="mt-3 text-sm text-slate-600">
          Add richer artefacts when you are ready—these prompts call out what future readers will want to explore.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {SKILLJAR_SUPPLEMENTS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-dashed border-white/45 bg-white/70 p-4 text-sm text-slate-600"
            >
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}

function ScormAutomationDetails() {
  return (
    <section className="grid gap-8">
      <GlassCard className="rounded-[36px] px-8 py-10 text-slate-800">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          <ClipboardList className="h-4 w-4" aria-hidden />
          Automation flow
        </div>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          One maintained command now handles exports, uploads, and verification
          for the entire CCSK catalog. Below is the sequence that replaced a day
          of manual work.
        </p>
        <ul className="mt-6 space-y-5 text-sm leading-6 text-slate-600">
          {SCORM_FLOW.map((item) => (
            <li key={item.title} className="flex gap-3">
              <span className="mt-1 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <item.icon className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </GlassCard>

      <div className="grid gap-8 lg:grid-cols-2">
        <GlassCard className="rounded-[32px] px-8 py-10 text-slate-800">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">
            Configurations applied every run
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            Playwright fills every export form exactly the way our instructional
            design team expects.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {SCORM_CONFIGS.map((chip) => (
              <Badge
                key={chip}
                variant="secondary"
                className="rounded-full border border-white/45 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700"
              >
                {chip}
              </Badge>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="rounded-[32px] px-8 py-10 text-slate-800">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">
            Engineering practices
          </h3>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
            {SCORM_PRACTICES.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-1 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700">
                  <item.icon className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      <GlassCard className="rounded-[32px] px-8 py-10 text-slate-800">
        <h3 className="text-xl font-semibold tracking-tight text-slate-950">
          Supplement this case study
        </h3>
        <p className="mt-3 text-sm text-slate-600">
          When you share this publicly, these slots are ready for richer
          artefacts without exposing proprietary course content.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {SCORM_SUPPLEMENTS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-dashed border-white/45 bg-white/70 p-4 text-sm text-slate-600"
            >
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
