import * as React from "react";

export interface Project {
  id: string;
  title: string;
  category: "FRONT_END" | "BACK_END" | "SUPPORT";
  description: string;
  slides: Array<{
    label: string;
    content: React.ReactNode;
    srText: string;
  }>;
}

export const PROJECTS: Project[] = [
  {
    id: "SCORM_AUTO",
    title: "SCORM Automation",
    category: "BACK_END",
    description: "Automating LEAi -> Skilljar delivery pipeline.",
    slides: [
      {
        label: "OVERVIEW",
        srText: "Automating SCORM packet delivery from LEAi to Skilljar using Playwright and Python. Replaced manual 45-minute process with 12-second pulse.",
        content: (
          <div className="space-y-4">
            <p className="text-lg font-bold">The SCORM Wrangle</p>
            <p>I built a delivery pipeline that bulk-exports SCORM packets from LEAi via Playwright, stages them in Google Drive, and hot-swaps them into Skilljar using their API.</p>
          </div>
        )
      },
      {
        label: "DATA_FLOW",
        srText: "Data Flow Diagram: LEAi Export -> Playwright -> Google Drive Staging -> Skilljar API -> Skilljar Live.",
        content: (
          <div className="flex flex-col items-center justify-center h-full gap-2 border-2 border-current/20 p-4">
            <p className="text-[10px] font-bold opacity-50 uppercase mb-4">[ DATA_FLOW_DIAGRAM ]</p>
            <div className="flex flex-col items-center gap-2 text-[10px] font-bold">
              <div className="border border-current px-2 py-1">LEAi EXPORT</div>
              <div className="animate-pulse">↓ [PLAYWRIGHT]</div>
              <div className="border border-current px-2 py-1 bg-current/10">G-DRIVE STAGING</div>
              <div className="animate-pulse">↓ [SKILLJAR API]</div>
              <div className="border-2 border-current px-2 py-1">SKILLJAR LIVE</div>
            </div>
          </div>
        )
      },
      {
        label: "TECH_STACK",
        srText: "Stack: Python, Playwright, Skilljar API, Git, Google Drive API.",
        content: (
          <div className="space-y-2">
            <p className="font-bold border-b border-current pb-1 uppercase">Tech Stack</p>
            <ul className="space-y-1 italic opacity-80 text-xs">
              <li>&gt; Python CLI for orchestration</li>
              <li>&gt; Playwright for browser automation</li>
              <li>&gt; Skilljar REST API for deployment</li>
              <li>&gt; Git for version controlled assets</li>
            </ul>
          </div>
        )
      }
    ]
  },
  {
    id: "OFF_GRID_MED",
    title: "Off-Grid Burmese Med App",
    category: "SUPPORT",
    description: "P2P offline distribution for conflict zones.",
    slides: [
      {
        label: "OVERVIEW",
        srText: "Developed a React Native (Expo) and Java Android app for Burmese medical crews. Local-first, air-gapped trauma procedures for zero-signal conflict zones.",
        content: (
          <div className="space-y-4">
            <p className="text-lg font-bold">Zero-Signal Survival</p>
            <p>Local-first React Native application for Burmese medical crews in blacked-out conflict zones. Fully indexed medical database with encrypted P2P distribution.</p>
          </div>
        )
      },
      {
        label: "P2P_ARCH",
        srText: "Architecture: Encrypted Physical Flash Drives -> P2P Sharing -> Offline App Database.",
        content: (
          <div className="flex flex-col items-center justify-center h-full gap-2 border-2 border-current/20 p-4">
            <p className="text-[10px] font-bold opacity-50 uppercase mb-4">[ P2P_NETWORK_ARCH ]</p>
            <div className="flex items-center justify-center gap-4 text-[10px] font-bold">
              <div className="border border-dashed border-current p-2 text-center">ENCRYPTED<br/>FLASH DRIVE</div>
              <div className="text-xl">→</div>
              <div className="border-2 border-current p-3 bg-current/10">OFFLINE<br/>APP DB</div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "SKILLJAR_REDESIGN",
    title: "CSA Training Content",
    category: "FRONT_END",
    description: "Delivering CCSK v5 and CCZT modules via Skilljar Redesign.",
    slides: [
      {
        label: "OVERVIEW",
        srText: "Overhauled Skilljar learning portal. Implemented strict brand guidelines via custom CSS/JS override suite. Delivered cloud security training (CCSK, CCZT).",
        content: (
          <div className="space-y-4">
            <p className="text-lg font-bold">Wrangling the Branding</p>
            <p>Moving Skilljar from brittle inline edits to a professional VS Code and Git-driven workflow. Custom JS/CSS override suite to force brand compliance.</p>
          </div>
        )
      }
    ]
  },
  {
    id: "DYNAMIC_CONTRIBUTOR",
    title: "Dynamic Contributor Model",
    category: "BACK_END",
    description: "CMS-style templating for non-technical admins.",
    slides: [
      {
        label: "OVERVIEW",
        srText: "Engineered a flexible Rails model for editorial page control. Dynamic Page Model with custom schema for Reviewers, Staff, and Topic Maps.",
        content: (
          <div className="space-y-4">
            <p className="text-lg font-bold">Content Architect</p>
            <p>Engineered a dynamic Page Model in Rails Admin that allows editors to build complex contributor layouts without dev tickets.</p>
          </div>
        )
      }
    ]
  },
  {
    id: "BOGARDT_BAND",
    title: "Bogardt Band Platform",
    category: "FRONT_END",
    description: "Next.js platform with custom admin interface.",
    slides: [
      {
        label: "OVERVIEW",
        srText: "Next.js, Vercel, and Google Domains integration for the Bogardt Band. Custom admin interface for members to manage tours and media.",
        content: (
          <div className="space-y-4">
            <p className="text-lg font-bold">The Band Portal</p>
            <p>Full-stack Next.js application managing the digital presence for Bogardt. Custom CMS for band members to manage their own tour dates and asset uploads.</p>
          </div>
        )
      }
    ]
  }
];
