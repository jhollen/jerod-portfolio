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
        label: "THE BREACH",
        title: "The Manual Slog",
        srText: "Problem: 45-minute manual uploads per course. version lag, human error, and cowboy coding at scale.",
        content: (
          <div className="space-y-4">
            <p>The team was losing hours to manual uploads. Every course refresh was a gamble with version lag and human error. It was &quot;cowboy coding&quot; at scale, with zero audit trail.</p>
          </div>
        )
      },
      {
        label: "DEPLOYMENT",
        title: "Surgical Automation",
        srText: "Solution: Python CLI, Playwright browser automation, Skilljar REST API integration.",
        content: (
          <div className="space-y-4">
            <p>Using a Python CLI for heavy lifting and Playwright for browser-level automation, I enabled surgical asset replacement via the Skilljar API.</p>
            <p>All assets are now tracked in Git, ensuring total auditability and zero-defect synchronization.</p>
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
      },
      {
        label: "CLI_LOGS",
        srText: "TODO: Add screenshot of Python terminal success logs for multiple courses.",
        content: (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <p className="text-xs font-bold text-red-500 animate-pulse">TODO: CLI_LOG_SCREENSHOT</p>
            <p className="text-[10px] opacity-60 mt-2 italic">Capture the Python terminal outputting &apos;SUCCESS&apos; for multiple courses.</p>
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
    stack: ["React Native", "Expo", "Java (Android Studio)", "P2P Distribution"],
    details: [
      {
        label: "OVERVIEW",
        title: "Zero-Signal Survival",
        srText: "Developed a React Native (Expo) and Java Android app for Burmese medical crews. Local-first, air-gapped trauma procedures for zero-signal conflict zones.",
        content: (
          <div className="space-y-4">
            <p>I developed a React Native app with Expo that puts a fully indexed medical database in the hands of soldiers who have zero internet access.</p>
          </div>
        )
      },
      {
        label: "INFRASTRUCTURE",
        title: "Air-Gapped Delivery",
        srText: "Infrastructure: Information air-gapped and instantly available. Connectivity is monitored or non-existent.",
        content: (
          <div className="space-y-4">
            <p>In conflict zones, connectivity is monitored or non-existent. Information needs to be air-gapped and instantly available.</p>
            <p>We bypassed the need for a central server by distributing via encrypted physical drives and P2P sharing.</p>
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
              <div className="text-xl">→</div>
              <div className="border-2 border-current p-3 bg-current/10 text-center uppercase text-[8px]">OFFLINE<br/>APP DB</div>
            </div>
          </div>
        )
      },
      {
        label: "UI_PREVIEW",
        srText: "TODO: Add screenshot of React Native UI listing trauma procedures.",
        content: (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <p className="text-xs font-bold text-red-500 animate-pulse">TODO: APP_UI_SCREENSHOT</p>
            <p className="text-[10px] opacity-60 mt-2 italic">Capture the React Native UI listing trauma procedures.</p>
          </div>
        )
      },
      {
        label: "CODE_SNIP",
        srText: "TODO: Add code snippet of local indexing and search logic.",
        content: (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <p className="text-xs font-bold text-red-500 animate-pulse">TODO: SEARCH_LOGIC_SNIPPET</p>
            <p className="text-[10px] opacity-60 mt-2 italic">Add code snippet of the fast, indexed local search algorithm.</p>
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
              <div className="text-xs animate-pulse">↓</div>
              <div className="border-2 border-current p-2 bg-current/5 italic uppercase text-[8px]">JS/CSS Override Suite</div>
              <div className="text-xs animate-pulse">↓</div>
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
          </div>
        )
      },
      {
        label: "SCHEMA",
        title: "Relational Logic",
        srText: "Schema: Multi-role user relations (Reviewers, Staff, Contributors) and dynamic CSS variables.",
        content: (
          <div className="space-y-4">
            <p>Built a highly flexible schema for multi-role relations and dynamic CSS variables, enabling decentralised content management.</p>
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
          </div>
        )
      }
    ],
    assets: [
      {
        label: "ADMIN_UI",
        srText: "TODO: Add screenshot of the custom band admin dashboard.",
        content: (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <p className="text-xs font-bold text-red-500 animate-pulse">TODO: ADMIN_DASH_SCREENSHOT</p>
            <p className="text-[10px] opacity-60 mt-2 italic">Capture the custom dashboard where band members enter tour info.</p>
          </div>
        )
      }
    ]
  }
];
