"use client";
import React, { useState } from "react";
import { featuredProjects } from "@/lib/projects";

const project = featuredProjects.find(
  (p) => p.slug === "rails-image-optimizer"
);

const cliOutput = `Optimizing images...

JPG: 1.1 MB saved (12 files)
PNG: 0.1 MB saved (5 files)
GIF: 0 bytes saved (0 files)
SVG: 0 bytes saved (0 files)

Total: 1.2 MB saved (17 files)
`;

function CollapsibleCode({ label, code }: { label: string; code: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6">
      <button
        className="font-mono text-sm bg-zinc-200 dark:bg-zinc-800 px-3 py-1 rounded hover:bg-zinc-300 dark:hover:bg-zinc-700 transition mb-2"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? "Hide" : "Show"} {label}
      </button>
      {open && (
        <pre className="bg-[#f5f3ee] text-black rounded p-4 overflow-x-auto text-xs border border-[#e6e1d5]">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

export default function ImageOptimizerDetails() {
  if (!project) return <div>Project not found.</div>;
  return (
    <section className="container mx-auto max-w-2xl px-4 flex flex-col items-center">
      <div className="w-full flex flex-col items-center mb-10">
        <div className="rounded-full bg-[#7a9c7d] w-20 h-20 flex items-center justify-center shadow-lg mb-4 border-4 border-[#e6e1d5]">
          <svg
            width="40"
            height="40"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="8" y="16" width="48" height="32" rx="8" fill="#CC342D" />
            <rect x="20" y="24" width="24" height="16" rx="4" fill="#fff" />
            <text
              x="32"
              y="36"
              textAnchor="middle"
              fontSize="10"
              fontWeight="bold"
              fill="#CC342D"
              fontFamily="monospace"
            >
              rake
            </text>
          </svg>
        </div>
        <h1
          className="text-4xl font-extrabold tracking-tight text-[#222] dark:text-white mb-2 font-serif"
          style={{ letterSpacing: "-0.03em" }}
        >
          Image Optimization Rake Task
        </h1>
        <p className="text-lg text-[#7a9c7d] font-semibold mb-4 font-mono">
          Automated detection of unoptimized images, YAML manifest, and CI
          guard.
        </p>
      </div>
      <div className="w-full bg-[#f5f3ee] dark:bg-zinc-900 rounded-2xl shadow-lg p-8 mb-8 border-2 border-[#e6e1d5] flex flex-col gap-6">
        <div className="text-[#222] dark:text-zinc-200 text-base leading-relaxed font-sans">
          <p className="mb-4">
            I created a production-style image optimization pipeline for Rails.
            It detects new/changed assets, runs lossless + mild lossy passes,
            only counts savings above a 2% threshold, and writes per-file
            metadata to a manifest. It includes a one-command demo (
            <code className="bg-[#e6e1d5] px-1 rounded">bin/demo</code>) that
            seeds bloated assets, optimizes, and prints per-type savings.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <b>Zero-friction demo:</b>{" "}
              <code className="bg-[#e6e1d5] px-1 rounded">bin/setup</code> +{" "}
              <code className="bg-[#e6e1d5] px-1 rounded">bin/demo</code>
            </li>
            <li>
              <b>Thresholded optimization:</b> Counts savings only when ≥2%
            </li>
            <li>
              <b>Per-type reporting:</b> Separate totals for JPG/PNG/GIF/SVG
            </li>
            <li>
              <b>Resilient runtime:</b> Auto-disables missing binaries
            </li>
            <li>
              <b>Bytes-saved manifest:</b> Tracks session + lifetime savings
            </li>
            <li>
              <b>CI guard:</b>{" "}
              <code className="bg-[#e6e1d5] px-1 rounded">images:check</code>{" "}
              fails PRs with unoptimized assets
            </li>
          </ul>
        </div>
        <CollapsibleCode label="Sample CLI Output" code={cliOutput} />
        <div className="flex justify-center">
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#7a9c7d] text-white px-6 py-3 rounded-full font-bold font-mono shadow hover:bg-[#5e7e63] transition border-2 border-[#e6e1d5]"
          >
            View Source on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
