"use client";
import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });
const colors = {
  ink: "#1F2A2A",
  teal: "#0E6B5B",
  orange: "#C44B22",
  mustard: "#B88A1D",
  cream: "#F8F3E6",
  paper: "#FFF9ED",
  muted: "#4B5656",
  line: "#E8DCC7",
};
export default function ResumePage() {
  return (
    <main
      className={`${montserrat.className} max-w-3xl mx-auto py-12 px-4 md:px-0`}
      style={{
        background: colors.cream,
        minHeight: "100vh",
        color: colors.ink,
      }}
    >
      <h1
        className="text-5xl font-extrabold mb-10 text-center tracking-tight"
        style={{ color: colors.ink, letterSpacing: "-0.04em" }}
      >
        Resume
      </h1>
      <div className="flex items-center justify-center mb-8">
        <span className="w-3 h-3 rounded-full bg-teal-600 mx-2" />
        <span className="w-3 h-3 rounded-full bg-amber-500 mx-2" />
        <span className="w-3 h-3 rounded-full bg-orange-500 mx-2" />
        <span className="w-3 h-3 rounded-full bg-green-700 mx-2" />
      </div>
      <section
        className="mb-8 rounded-xl shadow-md p-6"
        style={{ background: colors.paper, border: `1px solid ${colors.line}` }}
      >
        <h2 className="text-2xl font-bold mb-2" style={{ color: colors.teal }}>
          Jerod A. Hollen
        </h2>
        <p className="mb-2" style={{ color: colors.muted }}>
          <span className="mr-2">jerod.a.hollen@gmail.com</span>
          <span className="mr-2">| (360) 477-1854</span>
          <span className="mr-2">| Bellingham, WA</span>
          <span>
            |{" "}
            <a
              href="https://jerodhollen.com"
              className="underline"
              style={{ color: colors.teal }}
              target="_blank"
              rel="noopener noreferrer"
            >
              jerodhollen.com
            </a>
          </span>
        </p>
      </section>
      <section
        className="mb-8 rounded-xl shadow-md p-6"
        style={{ background: colors.paper, border: `1px solid ${colors.line}` }}
      >
        <h3
          className="text-xl font-semibold mb-2 tracking-wide uppercase"
          style={{ color: colors.orange }}
        >
          Education
        </h3>
        <ul>
          <li>
            <div className="flex flex-wrap justify-between items-baseline w-full">
              <span><strong>Western Washington University</strong></span>
              <span style={{ color: colors.teal }}>Bellingham, WA</span>
            </div>
            <div className="flex flex-wrap justify-between items-baseline w-full">
              <span style={{ color: colors.mustard, fontWeight: 600 }}>BS Computer Science, GPA: 3.2</span>
              <span style={{ color: colors.muted, fontStyle: "italic" }}>Sep 2020 to Jun 2022</span>
            </div>
          </li>
        </ul>
      </section>
      <section
        className="mb-8 rounded-xl shadow-md p-6"
        style={{ background: colors.paper, border: `1px solid ${colors.line}` }}
      >
        <h3
          className="text-xl font-semibold mb-2 tracking-wide uppercase"
          style={{ color: colors.orange }}
        >
          Experience
        </h3>
        <ul className="space-y-4">
          {/* Full-time role */}
          <li>
            <div className="flex flex-wrap justify-between items-baseline w-full">
              <span><strong>Cloud Security Alliance</strong></span>
              <span style={{ color: colors.teal }}>Bellingham, WA</span>
            </div>
            <div className="flex flex-wrap justify-between items-baseline w-full">
              <span style={{ color: colors.mustard, fontWeight: 600 }}>Web Developer</span>
              <span style={{ color: colors.muted, fontStyle: "italic" }}>Jul 2022 to Oct 2025</span>
            </div>
            <ul
              className="list-disc ml-6 mt-2 space-y-1"
              style={{ color: colors.muted }}
            >
              <li>
                Led frontend rebuild of the Skilljar training site to align with
                CSA brand; implemented modular JavaScript/SCSS and template
                overrides; improved load times by ~25% and unified UX across
                products.
              </li>
              <li>
                Designed and enforced an image optimization pipeline (Ruby +
                Rake + CI) that diffed new assets against an optimization
                manifest and failed builds when needed; reduced asset bloat by
                ~30% and standardized performance.
              </li>
              <li>
                Built Rails Admin customizations for contributor pages (hero,
                color themes, avatars, role badges, tagged course feeds),
                improving editorial workflow efficiency by ~15%.
              </li>
              <li>
                Shipped and maintained dozens of production landing pages and
                microsites with analytics/SEO, responsive layouts, and
                accessibility best practices.
              </li>
              <li>
                Collaborated with product owners and designers to translate
                wireframes into production-ready code while maintaining
                consistent branding across multiple apps.
              </li>
            </ul>
          </li>
          {/* Internship */}
          <li>
            <div className="flex flex-wrap justify-between items-baseline w-full">
              <span><strong>Cloud Security Alliance</strong></span>
              <span style={{ color: colors.teal }}>Bellingham, WA</span>
            </div>
            <div className="flex flex-wrap justify-between items-baseline w-full">
              <span style={{ color: colors.mustard, fontWeight: 600 }}>Web Developer Intern</span>
              <span style={{ color: colors.muted, fontStyle: "italic" }}>Jul 2021 to Jun 2022</span>
            </div>
            <ul
              className="list-disc ml-6 mt-2 space-y-1"
              style={{ color: colors.muted }}
            >
              <li>
                Implemented UI components and page layouts in Rails (ERB), HTML,
                SCSS, and vanilla JS under senior guidance across marketing
                properties.
              </li>
              <li>
                Assisted with brand alignment efforts; refactored CSS utilities,
                fixed responsiveness and cross‑browser issues, and supported
                content launches.
              </li>
              <li>
                Built and QA’d marketing landing pages; configured basic
                analytics, metadata, and publishing workflows.
              </li>
              <li>
                Contributed to accessibility improvements (contrast, focus
                states, semantic HTML) and Lighthouse audits/documentation.
              </li>
              <li>
                Wrote internal snippets and notes that sped up repeatable
                page-building tasks for the team.
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <section
        className="mb-8 rounded-xl shadow-md p-6"
        style={{ background: colors.paper, border: `1px solid ${colors.line}` }}
      >
        <h3
          className="text-xl font-semibold mb-2 tracking-wide uppercase"
          style={{ color: colors.orange }}
        >
          Projects
        </h3>
        <ul className="space-y-4">
          <li>
            <div className="flex flex-wrap justify-between items-baseline w-full">
              <span><strong>Image Optimization Pipeline</strong></span>
              <span style={{ color: colors.teal }}>Ruby, Rake</span>
            </div>
            <span style={{ color: colors.muted }}>
              Built a Ruby rake task that scans and optimizes images at build-time, enforcing compression standards and reducing asset payloads across the company’s web apps.
            </span>
          </li>
          <li>
            <div className="flex flex-wrap justify-between items-baseline w-full">
              <span><strong>SCORM Automation Scripts</strong></span>
              <span style={{ color: colors.teal }}>Ruby, Playwright</span>
            </div>
            <span style={{ color: colors.muted }}>
              Automated export and upload of SCORM training packages between Skilljar and SCORM Cloud, eliminating manual steps and saving hours of release prep each week.
            </span>
          </li>
          <li>
            <div className="flex flex-wrap justify-between items-baseline w-full">
              <span><strong>Portfolio Website</strong></span>
              <span style={{ color: colors.teal }}>Next.js, TypeScript, Tailwind</span>
            </div>
            <span style={{ color: colors.muted }}>
              Designed and built jerodhollen.com to showcase projects and music; implemented a dual-image hover animation inspired by Adham Dannaway’s designer/coder concept.
            </span>
          </li>
        </ul>
      </section>
      <section
        className="rounded-xl shadow-md p-6"
        style={{ background: colors.paper, border: `1px solid ${colors.line}` }}
      >
        <h3
          className="text-xl font-semibold mb-2 tracking-wide uppercase"
          style={{ color: colors.orange }}
        >
          Skills
        </h3>
        <ul
          className="list-disc ml-6 space-y-1"
          style={{ color: colors.muted }}
        >
          <li>
            <strong>Languages:</strong> Ruby, Javascript, HTML, CSS/SASS
          </li>
          <li>
            <strong>Frameworks:</strong> Ruby on Rails, React, Next.js
          </li>
          <li>
            <strong>Dev Tools:</strong> Git, Playwright, Rake, SCORM Cloud API,
            Auth0
          </li>
        </ul>
      </section>
    </main>
  );
}
