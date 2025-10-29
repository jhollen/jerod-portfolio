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
      "Bridged React Native Expo and Rails through an Auth0 relay that decodes tokens and hydrates user context in one roundtrip.",
    category: "engineering",
    discipline: "dev",
    highlights:
      "Implemented Auth0 universal login in the mobile app, added a Rails relay endpoint that validates JWTs, looks up profiles via the Auth0 sub, and returns sanitized user payloads back to Expo. The relay also provisions missing users and caches claims for faster follow-up requests.",
    whyImpressive:
      "Eliminated duplicate credential flows and gave the mobile team a single secure handshake—Auth0 issues the token, Rails verifies and hydrates profile data, and the app renders immediately without direct database access.",
    tech: ["React Native", "Rails", "Auth0", "TypeScript"],
    repo: "https://github.com/jerods/auth0-mobile-relay",
    stats: {
      metrics: [
        { label: "Platforms linked", value: "Mobile ↔ Rails" },
        { label: "Token roundtrip", value: "<2s" },
        { label: "Profile coverage", value: "100%" },
      ],
    },
  },
  {
    slug: "membership-filter-system",
    title: "Membership Filtering System",
    tagline:
      "Extended a reusable Rails filtering hierarchy to surface current members with deterministic random logo rotations.",
    category: "engineering",
    discipline: "dev",
    highlights:
      "Built on top of our FormFiltering parent class by introducing a MemberFilter form object and a CurrentMemberFilter child, allowing nuanced filtering rules while keeping inheritance intact. Added a deterministic randomizer so member logos shuffle per session yet stay stable across pagination.",
    whyImpressive:
      "Turned a brittle list into a robust browsing experience—users get current members only, filters remain composable, and the logo carousel feels fresh without breaking cache or pagination.",
    tech: ["Ruby on Rails", "Form Objects", "PostgreSQL"],
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
      "Recast CSA’s Skilljar LMS into a brand-consistent experience across course detail, curriculum, and registration flows.",
    category: "design",
    discipline: "design",
    highlights:
      "Audited every Skilljar surface, built a brand system in a version-controlled repo, and shipped minified Sass + JavaScript snippets into Skilljar’s custom code boxes to overhaul course detail, curriculum, and registration pages.",
    whyImpressive:
      "Turned a sprawling, inconsistent LMS into a cohesive experience—tracking dozens of templates in Git, iterating in VS Code, and shipping minified assets safely into Skilljar’s admin UI without breaking production.",
    tech: ["Skilljar", "Sass", "JavaScript", "Git"],
    stats: {
      metrics: [
        { label: "Templates refreshed", value: "30+" },
        { label: "Duration", value: "3 months" },
        { label: "Capture rate", value: "Major course flows" },
      ],
    },
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
