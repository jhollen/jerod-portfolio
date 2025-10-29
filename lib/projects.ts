export type ProjectCategory = "engineering" | "design" | "music";

export type ProjectDiscipline = "dev" | "design";

export type ProjectStats = {
  totalSaved?: string;
  metrics?: Array<{ label: string; value: string }>;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory | string;
  discipline: ProjectDiscipline;
  highlights: string;
  tech?: string[];
  whyImpressive?: string;
  repo?: string;
  href?: string;
  stats?: ProjectStats;
  image?: string;
};

/**
 * Central project catalogue used across cards, detail pages, and custom
 * project routes. Keeping everything in one place avoids subtle divergence
 * between pages that render the same project data.
 */
export const featuredProjects: readonly Project[] = [
  {
    slug: "rails-image-optimizer",
    title: "Rails Image Optimizer",
    tagline:
      "Lossless + thresholded optimization pipeline with manifest tracking and CI guard rails.",
    category: "engineering",
    discipline: "dev",
    highlights:
      "CLI-driven workflow that fingerprints incoming assets, orchestrates lossless + mild lossy passes, and writes per-file savings to a manifest that downstream jobs consume.",
    whyImpressive:
      "Design balances developer ergonomics (bin/setup + bin/demo) with production-ready guard rails—failing CI when a PR introduces bloated imagery while staying resilient when optimization binaries are missing.",
    repo: "https://github.com/jerods/rails-image-optimizer",
    tech: ["Ruby", "Rails", "ImageMagick", "libvips", "Shell"],
    stats: {
      totalSaved: "2.86 GB",
      metrics: [
        { label: "Runs Automated", value: "200+" },
        { label: "Unique Assets", value: "1.4k+" },
        { label: "Estimated Savings", value: "2.5+ GB" },
      ],
    },
    image: "/images/projects/rails_image_optimizer/rails_image_optimizer.png",
  },
  {
    slug: "csa-admin-contributor-pages",
    title: "CSA Contributor Pages",
    tagline:
      "Human-centred contributor profiles with smart image handling for CSA administrators.",
    category: "design",
    discipline: "design",
    highlights:
      "Shipped a modular page system that lets CSA admins assemble contributor spotlights with drag-and-drop content, device-aware image crops, and automated performance budgets.",
    whyImpressive:
      "Balanced editorial freedom with design guardrails—dynamic layout options stay on grid, while the media pipeline enforces optimized assets before publish.",
    tech: ["Ruby on Rails", "Rails Admin", "Blaze UI"],
    href: "https://csa.example.com/contributors",
  },
  {
    slug: "scorm-automation-scripts",
    title: "SCORM Publishing Automation",
    tagline:
      "Playwright-driven exporter that turns a day of LEAi → Skilljar publishing into a 20 minute run.",
    category: "engineering",
    discipline: "dev",
    highlights:
      "Python + Playwright scripts sign into LEAi, apply the mandated SCORM 3rd Edition configuration, generate exports, and replace the matching Skilljar objects with traceable hand-offs. Every step is idempotent, logged, and guarded by checksum comparison so 78 CCSK courses ship hands-off.",
    whyImpressive:
      "Compressed an all-day release cycle to roughly twenty minutes while preserving auditability—one maintained script updates the entire CCSK catalog without touching proprietary course content.",
    tech: ["Playwright", "Python", "Skilljar API"],
    stats: {
      metrics: [
        { label: "Courses maintained", value: "78" },
        { label: "Manual effort saved", value: "≈8h" },
        { label: "Runtime", value: "~20m" },
        { label: "Error rate", value: "Near-zero" },
      ],
    },
  },
  {
    slug: "auth0-relay-integration",
    title: "Auth0 Relay for Mobile + Rails",
    tagline:
      "Bridged React Native and Rails with Auth0, JWT decoding, and user sync pipelines.",
    category: "engineering",
    discipline: "dev",
    highlights:
      "Implemented Auth0 universal login, wrote a Relay in Rails that decodes JWTs, hydrates user context, and returns signed payloads for the mobile app to render and edit.",
    whyImpressive:
      "Established a secure, reusable auth backbone that eliminated duplicate credential flows and hardened API calls with role-based claims.",
    tech: ["React Native", "Rails", "Auth0", "TypeScript"],
    repo: "https://github.com/jerods/auth0-mobile-relay",
  },
  {
    slug: "landing-page-campaigns",
    title: "High-Conversion Landing Pages",
    tagline:
      "Designed and developed campaign-specific landing pages with analytics baked in.",
    category: "design",
    discipline: "design",
    highlights:
      "Partnered with marketing on rapid landing page experiments, crafting component-based layouts, A/B test variants, and post-launch reporting dashboards.",
    whyImpressive:
      "Delivered a reusable design system that let non-technical stakeholders launch new pages the same day while keeping brand and accessibility intact.",
    tech: ["Ruby on Rails", "JavaScript", "HTML", "Sass"],
    href: "https://campaigns.example.com",
  },
  {
    slug: "band-website",
    title: "Band Website & Identity",
    tagline:
      "Immersive band microsite with live visuals, merch drops, and tour updates.",
    category: "design",
    discipline: "design",
    highlights:
      "Built a bespoke site that syncs show data from Airtable, renders merch drops with timed releases, and features live-coded GLSL visuals that respond to audio.",
    whyImpressive:
      "Blends design and music tech—custom shader loops, responsive layouts, and CMS-driven content keep the experience fresh with every show.",
    tech: ["Next.js", "Three.js", "Airtable", "Framer Motion"],
    href: "https://band.example.com",
  },
  {
    slug: "csa-skilljar-redesign",
    title: "CSA Skilljar LMS Redesign",
    tagline:
      "Overhauled CSA’s Skilljar domain with cohesive branding and learner-first flows.",
    category: "design",
    discipline: "design",
    highlights:
      "Audited course templates, redesigned navigation, and introduced modular blocks that adapt to course difficulty, conversion goals, and device sizes.",
    whyImpressive:
      "Cut learner drop-off by aligning information architecture to personas and instrumenting progress cues tied to Skilljar analytics.",
    tech: ["Skilljar Editor", "JavaScript", "HTML", "CSS"],
    href: "https://academy.csa.example.com",
  },
  {
    slug: "csa-labspace-templates",
    title: "CSA LabSpace WordPress System",
    tagline:
      "Engineered WordPress templates and components to extend CSA branding to LabSpace.",
    category: "design",
    discipline: "design",
    highlights:
      "Converted brand guidelines into Gutenberg-friendly blocks, adding custom theme controls, typography scales, and reusable animations for LabSpace editors.",
    whyImpressive:
      "Enabled a distributed content team to produce on-brand pages without touching code, while maintaining performance budgets via inline critical CSS.",
    tech: ["WordPress", "PHP", "Gutenberg", "SCSS"],
    href: "https://labspace.csa.example.com",
  },
  {
    slug: "ccsk-course-development",
    title: "CCSK v5 Course Development",
    tagline:
      "Produced the CCSK v5 training series end-to-end in record time with multimedia tooling.",
    category: "design",
    discipline: "design",
    highlights:
      "Rapidly sourced scripts, motion graphics, and accessible visuals, stitching together Canva assets, LEAi-generated outlines, and Vimeo hosting flows without compromising quality.",
    whyImpressive:
      "Delivered ahead of schedule, earning a project bonus while balancing content accuracy with punchy visuals for cloud security learners.",
    tech: ["Canva", "Vimeo", "LEAi"],
  },
  {
    slug: "knowledge-center",
    title: "Knowledge Center Refresh",
    tagline:
      "A modular knowledge base system with progressive disclosure and tailored wayfinding.",
    category: "design",
    discipline: "design",
    highlights:
      "Led the UX overhaul for an internal knowledge center—mapping information architecture, designing convergent content modules, and prototyping motion states for search and navigation.",
    whyImpressive:
      "Deliverables included responsive component libraries and accessibility annotations that accelerated engineering hand-off and cut onboarding questions in half.",
    tech: ["Figma", "Framer", "Notion"],
    image: "/images/projects/knowledge_center.png",
  },
  {
    slug: "preview-cards",
    title: "Preview Cards System",
    tagline:
      "Composable marketing card system with auto theming, dark mode, and content safety rails.",
    category: "engineering",
    discipline: "dev",
    highlights:
      "Implemented a card rendering pipeline that ingests CMS content, sanitises HTML, and generates accessible previews with on-the-fly palette derivation and multi-brand support.",
    whyImpressive:
      "Shipped with visual regression tests and editor tooling that flags contrast violations before publishing.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "Storybook"],
    image: "/images/projects/preview_cards.png",
  },
  {
    slug: "modular-systems-set",
    title: "Modular Systems Live Set",
    tagline:
      "Improvised ambient techno performed with custom Max for Live sequencers and CV routing.",
    category: "music",
    discipline: "design",
    highlights:
      "Built bespoke Max devices that quantise loosely synced hardware, automate evolving modulation, and record multitrack stems for post-show mastering.",
    whyImpressive:
      "Hybrid software/hardware rig enables fully live arrangements without sacrificing structure—resulting in repeatable yet expressive performances.",
    tech: ["Ableton Live", "Max for Live", "Analog Rytm", "Modular Synth"],
  },
];

const projectsByDiscipline = (discipline: ProjectDiscipline) =>
  featuredProjects.filter((project) => project.discipline === discipline);

export const developerProjects = projectsByDiscipline("dev");
export const designerProjects = projectsByDiscipline("design");
