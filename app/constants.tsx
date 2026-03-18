import * as React from "react";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  details: Array<{
    label: string;
    title: string;
    content: React.ReactNode;
    srText: string;
  }>;
  assets: Array<{
    label: string;
    content: React.ReactNode;
    srText: string;
  }>;
}

export const PROJECTS: Project[] = [
  {
    id: "SCORM_AUTO",
    title: "LXP Automation Engine",
    category: "Full-Stack / Automation",
    description: "Mission-critical pipeline automating the delivery of SCORM training packets, reducing deployment time by 99%.",
    stack: ["Python", "Playwright", "Skilljar API", "Google Drive API"],
    details: [
      {
        label: "OVERVIEW",
        title: "The SCORM Wrangle",
        srText: "Automating SCORM packet delivery from LEAi to Skilljar using Playwright and Python. Replaced manual 45-minute process with 12-second pulse.",
        content: (
          <div className="space-y-4">
            <p>I built a delivery pipeline that bulk-exports SCORM packets from LEAi via Playwright, stages them in Google Drive, and hot-swaps them into Skilljar using their API.</p>
            <p>This solved a major bottleneck where course refreshes were manual, error-prone, and slow.</p>
          </div>
        )
      },
      {
        label: "ARCHITECTURE",
        title: "Automated Orchestration",
        srText: "Architecture: Python CLI, Playwright browser automation, Skilljar REST API integration.",
        content: (
          <div className="space-y-4">
            <p>The system utilizes a Python-based CLI that orchestrates the entire lifecycle. Playwright handles the complex browser-level exports from the source LXP.</p>
            <p>Google Drive acts as a persistent staging area before the Skilljar API executes surgical asset replacement on the live platform.</p>
          </div>
        )
      },
      {
        label: "DEPLOYMENT",
        title: "Surgical Synchronization",
        srText: "Solution: 100% automated hot-swaps with zero downtime and total auditability via Git.",
        content: (
          <div className="space-y-4">
            <p>All assets are tracked in Git, ensuring total auditability. The pipeline performs automated hot-swaps, ensuring zero downtime for enterprise learners.</p>
            <p>This approach eliminated the &quot;cowboy coding&quot; risks associated with manual platform edits.</p>
          </div>
        )
      },
      {
        label: "RESULTS",
        title: "Instant Pulse",
        srText: "Results: 45m to 12s deployment. Zero-defect sync across 50+ courses. Manual intervention phased out.",
        content: (
          <div className="space-y-2">
            <ul className="space-y-2 italic opacity-80">
              <li>&gt; Deployment time: 45m → 12s.</li>
              <li>&gt; Zero-defect synchronization across 50+ enterprise courses.</li>
              <li>&gt; Manual intervention completely phased out.</li>
            </ul>
          </div>
        )
      }
    ],
    assets: [
      {
        label: "DATA_FLOW",
        srText: "Data Flow Diagram: LEAi Export -> Playwright -> Google Drive Staging -> Skilljar API -> Skilljar Live.",
        content: (
          <div className="flex flex-col items-center justify-center h-full gap-2 border-2 border-current/20 p-4">
            <p className="text-[10px] font-bold opacity-50 uppercase mb-4">[ DATA_FLOW_DIAGRAM ]</p>
            <div className="flex flex-col items-center gap-2 text-[10px] font-bold">
              <div className="border border-current px-2 py-1">LEAi EXPORT</div>
              <div className="animate-pulse text-xs">↓</div>
              <div className="border border-current px-2 py-1 bg-current/10 text-center uppercase text-[8px]">Playwright<br/>Orchestrator</div>
              <div className="animate-pulse text-xs">↓</div>
              <div className="border border-current px-2 py-1">G-DRIVE STAGING</div>
              <div className="animate-pulse text-xs">↓</div>
              <div className="border-2 border-current px-2 py-1">SKILLJAR LIVE</div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "OFF_GRID_MED",
    title: "Signal-Free Survival Kit",
    category: "Mobile / Full-Stack",
    description: "Air-gapped, local-first medical database providing soldiers with instant access to trauma procedures.",
    stack: ["React Native", "Expo", "Java", "P2P Distribution"],
    details: [
      {
        label: "OVERVIEW",
        title: "Zero-Signal Survival",
        srText: "Developed a React Native (Expo) and Java Android app for Burmese medical crews. Local-first, air-gapped trauma procedures for zero-signal conflict zones.",
        content: (
          <div className="space-y-4">
            <p>I developed a React Native app with Expo that puts a fully indexed medical database in the hands of soldiers who have zero internet access.</p>
            <p>This is a lifeline for medical crews operating in blacked-out conflict zones.</p>
          </div>
        )
      },
      {
        label: "ARCHITECTURE",
        title: "Local-First Indexing",
        srText: "Architecture: Fully indexed SQLite database with encrypted P2P distribution layers.",
        content: (
          <div className="space-y-4">
            <p>The app features a robust local-first architecture using an optimized SQLite database for instant, indexed searching of emergency procedures.</p>
            <p>Java-based native modules handle encrypted file system access, ensuring sensitive data remains protected on the device.</p>
          </div>
        )
      },
      {
        label: "DEPLOYMENT",
        title: "Air-Gapped Delivery",
        srText: "Infrastructure: Information distributed via encrypted physical drives bypassing central servers.",
        content: (
          <div className="space-y-4">
            <p>We bypassed the need for a central server by distributing the app and its database via encrypted physical drives and P2P sharing.</p>
            <p>This ensures the database can be updated even when all external connectivity is severed or monitored.</p>
          </div>
        )
      },
      {
        label: "RESULTS",
        title: "Mission Critical Uptime",
        srText: "Results: 100% offline uptime. Zero dependency on cloud infrastructure. Instant access to trauma guides.",
        content: (
          <div className="space-y-2">
            <ul className="space-y-2 italic opacity-80">
              <li>&gt; 100% offline uptime in conflict zones.</li>
              <li>&gt; Zero dependency on cloud infrastructure or central servers.</li>
              <li>&gt; Fast, sub-second search for time-sensitive medical procedures.</li>
            </ul>
          </div>
        )
      }
    ],
    assets: [
      {
        label: "P2P_ARCH",
        srText: "Architecture: Encrypted Physical Flash Drives -> P2P Sharing -> Offline App Database.",
        content: (
          <div className="flex flex-col items-center justify-center h-full gap-2 border-2 border-current/20 p-4">
            <p className="text-[10px] font-bold opacity-50 uppercase mb-4">[ P2P_NETWORK_ARCH ]</p>
            <div className="flex items-center justify-center gap-4 text-[10px] font-bold">
              <div className="border border-dashed border-current p-2 text-center">ENCRYPTED<br/>FLASH DRIVE</div>
              <div className="text-xl text-emerald-500">→</div>
              <div className="border-2 border-current p-3 bg-current/10 text-center uppercase text-[8px]">OFFLINE<br/>APP DB</div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "SKILLJAR_REDESIGN",
    title: "Enterprise Training Architecture",
    category: "Full-Stack / EdTech",
    description: "Architecting a professional VS Code & Git-driven workflow for Skilljar, delivering high-stakes security certifications.",
    stack: ["Ruby on Rails", "Git", "CSS/JS Override Suite", "Vimeo API"],
    details: [
      {
        label: "OVERVIEW",
        title: "Wrangling the Branding",
        srText: "Overhauled Skilljar learning portal. Implemented strict brand guidelines via custom CSS/JS override suite. Delivered cloud security training (CCSK, CCZT).",
        content: (
          <div className="space-y-4">
            <p>I moved the Skilljar learning portal from brittle inline edits to a professional VS Code and Git-driven workflow.</p>
            <p>Built a suite of CSS/JS overrides that forced Skilljar into our strict brand guidelines while delivering record-breaking training content.</p>
          </div>
        )
      },
      {
        label: "ARCHITECTURE",
        title: "CI/CD for LMS",
        srText: "Architecture: Local staging environment mirroring production with automated JS/CSS injection.",
        content: (
          <div className="space-y-4">
            <p>Developed a local proxy environment that mirrors Skilljar production, allowing for rapid iteration and testing of overrides before deployment.</p>
            <p>The architecture ensures that all UI changes are version-controlled and peer-reviewed, eliminating the risk of breaking production layouts.</p>
          </div>
        )
      },
      {
        label: "DEPLOYMENT",
        title: "Version Controlled UI",
        srText: "Deployment: Transitioned from inline HTML edits to a robust, Git-backed deployment pipeline.",
        content: (
          <div className="space-y-4">
            <p>UI updates are now bundled and deployed through a streamlined process, replacing the previous manual method of pasting code into text areas.</p>
            <p>This ensured 100% brand parity with our main platform across all enterprise portals.</p>
          </div>
        )
      },
      {
        label: "RESULTS",
        title: "Operational Sanity",
        srText: "Results: Zero UI regressions since transition. 30% jump in navigation efficiency. 100% brand consistency.",
        content: (
          <div className="space-y-2">
            <ul className="space-y-2 italic opacity-80">
              <li>&gt; Zero UI regressions since moving to a Git-driven workflow.</li>
              <li>&gt; 30% jump in user navigation efficiency through layout optimization.</li>
              <li>&gt; 100% brand consistency across multiple learning domains.</li>
            </ul>
          </div>
        )
      }
    ],
    assets: [
      {
        label: "WORKFLOW",
        srText: "Workflow: Local VS Code Clone -> JS/CSS Override Suite -> Skilljar Production.",
        content: (
          <div className="flex flex-col items-center justify-center h-full gap-2 border-2 border-current/20 p-4 text-center">
            <p className="text-[10px] font-bold opacity-50 uppercase mb-4">[ BRAND_CONTROL_FLOW ]</p>
            <div className="flex flex-col items-center gap-2 text-[10px] font-bold">
              <div className="border border-current p-2">LOCAL VS CODE CLONE</div>
              <div className="text-xs animate-pulse text-emerald-500">↓</div>
              <div className="border-2 border-current p-2 bg-current/5 italic uppercase text-[8px]">JS/CSS Override Suite</div>
              <div className="text-xs animate-pulse text-emerald-500">↓</div>
              <div className="border border-current p-2 opacity-50 uppercase">Skilljar Production</div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "DYNAMIC_CONTRIBUTOR",
    title: "Contributor Content Framework",
    category: "Back-End / CMS",
    description: "A flexible Rails-based CMS engine enabling non-technical teams to build complex, multi-role layouts.",
    stack: ["Ruby on Rails", "PostgreSQL", "Rails Admin", "Tailwind CSS"],
    details: [
      {
        label: "OVERVIEW",
        title: "Content Architect",
        srText: "Engineered a flexible Rails model for editorial page control. Dynamic Page Model with custom schema for Reviewers, Staff, and Topic Maps.",
        content: (
          <div className="space-y-4">
            <p>I engineered a dynamic Page Model in Rails Admin that allows editors to build complex contributor layouts without touching code.</p>
            <p>This decentralized content management and significantly reduced engineering overhead.</p>
          </div>
        )
      },
      {
        label: "ARCHITECTURE",
        title: "Relational Schema",
        srText: "Architecture: Highly flexible schema for multi-role user relations and dynamic CSS variable injection.",
        content: (
          <div className="space-y-4">
            <p>The system uses a complex relational schema to link multiple roles (Reviewers, Staff, Contributors) to individual page entities.</p>
            <p>Dynamic CSS variables are injected at runtime based on database settings, giving editors control over hero layouts and color themes.</p>
          </div>
        )
      },
      {
        label: "DEPLOYMENT",
        title: "Admin Empowerment",
        srText: "Deployment: Rails Admin integration providing a type-safe, visual editor for complex data relations.",
        content: (
          <div className="space-y-4">
            <p>Custom Rails Admin DSL overrides provide editorial teams with a user-friendly interface for managing deeply nested data structures.</p>
            <p>Changes are validated and deployed instantly, ensuring type-safe layout generation across the entire website.</p>
          </div>
        )
      },
      {
        label: "RESULTS",
        title: "90% Reduction in Overhead",
        srText: "Results: 90% drop in dev tickets for page updates. Instant content updates. Total editorial control.",
        content: (
          <div className="space-y-2">
            <ul className="space-y-2 italic opacity-80">
              <li>&gt; 90% drop in developer tickets for page layout updates.</li>
              <li>&gt; Instant deployment of new contributor pages.</li>
              <li>&gt; Type-safe, zero-defect content publishing for non-technical teams.</li>
            </ul>
          </div>
        )
      }
    ],
    assets: [
      {
        label: "CMS_SCHEMA",
        srText: "Schema Diagram: Contributor Page -> Reviewers, Staff, Topic Map relations.",
        content: (
          <div className="flex flex-col items-center justify-center h-full border-2 border-current/20 p-4">
            <p className="text-[10px] font-bold opacity-50 uppercase mb-2">[ DB_SCHEMA_MAP ]</p>
            <div className="border border-current p-2 text-[7px] font-bold w-full bg-current/5">
              <div className="bg-current/10 p-1 mb-2">TABLE: CONTRIBUTOR_PAGE</div>
              <div className="space-y-1 opacity-80 pl-2">
                <p>→ RELATION: REVIEWERS</p>
                <p>→ STRING: HERO_COLOR</p>
                <p>→ RELATION: TOPIC_MAP</p>
                <p>→ ARRAY: STAFF_LIST</p>
              </div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "BOGARDT_BAND",
    title: "Band Management Portal",
    category: "Full-Stack / SaaS",
    description: "A custom Next.js administration platform centralizing tour logistics and digital fan engagement.",
    stack: ["Next.js", "Vercel", "Prisma", "Google Domains"],
    details: [
      {
        label: "OVERVIEW",
        title: "The Band Portal",
        srText: "Next.js, Vercel, and Google Domains integration for the Bogardt Band. Custom admin interface for members to manage tours and media.",
        content: (
          <div className="space-y-4">
            <p>Full-stack Next.js application managing the digital presence for Bogardt. Custom CMS for band members to manage tour dates and assets.</p>
            <p>Centralizes fan engagement and logistical data into a single, high-performance platform.</p>
          </div>
        )
      },
      {
        label: "ARCHITECTURE",
        title: "Serverless Stack",
        srText: "Architecture: Next.js App Router, Prisma ORM, and PostgreSQL hosted on Vercel.",
        content: (
          <div className="space-y-4">
            <p>Utilizes Next.js App Router for server-side rendering and efficient data fetching. Prisma ORM handles the PostgreSQL database connection.</p>
            <p>The entire stack is optimized for serverless deployment on Vercel, ensuring high availability and low latency.</p>
          </div>
        )
      },
      {
        label: "DEPLOYMENT",
        title: "Vercel Pipeline",
        srText: "Deployment: Automated Vercel deployments with custom domain mapping and SSL termination.",
        content: (
          <div className="space-y-4">
            <p>Integrated with Vercel for automated CI/CD. Custom domain mapping through Google Domains provides a professional web presence.</p>
            <p>Automated SSL termination and global CDN edge distribution ensure secure and fast access for fans worldwide.</p>
          </div>
        )
      },
      {
        label: "RESULTS",
        title: "Unified Platform",
        srText: "Results: Centralized data management for band members. 100% uptime. Automated fan engagement tools.",
        content: (
          <div className="space-y-2">
            <ul className="space-y-2 italic opacity-80">
              <li>&gt; Centralized tour and asset management for band members.</li>
              <li>&gt; 100% uptime during high-traffic tour announcements.</li>
              <li>&gt; Seamless integration with fan-facing social and streaming platforms.</li>
            </ul>
          </div>
        )
      }
    ],
    assets: [
      {
        label: "TECH_STACK",
        srText: "Stack: Next.js, Vercel, Prisma, PostgreSQL, Google Domains.",
        content: (
          <div className="flex flex-col items-center justify-center h-full border-2 border-current/20 p-4">
            <p className="text-[10px] font-bold opacity-50 uppercase mb-4">[ TECH_STACK_OVERVIEW ]</p>
            <div className="grid grid-cols-2 gap-2 text-[8px] font-black">
              <div className="border border-current px-2 py-1 text-center">NEXT.JS</div>
              <div className="border border-current px-2 py-1 text-center">VERCEL</div>
              <div className="border border-current px-2 py-1 text-center">PRISMA</div>
              <div className="border border-current px-2 py-1 text-center">POSTGRES</div>
            </div>
          </div>
        )
      }
    ]
  }
];
