"use client";
"use client";

import { motion, useReducedMotion } from "framer-motion";

export type ProjectDiscipline = "dev" | "design";

type ProjectTabValue = ProjectDiscipline | "all";

type ProjectTabsProps = {
  active: ProjectTabValue;
  onChange: (discipline: ProjectTabValue) => void;
};

const TABS: Array<{
  id: ProjectTabValue;
  label: string;
  description: string;
  indicatorClass: string;
  ringClass: string;
}> = [
  {
    id: "dev",
    label: "Engineering",
    description:
      "Automation, infrastructure, and resilient delivery systems.",
    indicatorClass: "bg-gradient-to-r from-sky-100/90 to-indigo-100/90",
    ringClass: "focus-visible:ring-accent-blue/50",
  },
  {
    id: "design",
    label: "Design",
    description:
      "Expressive interfaces, editorial storytelling, and product polish.",
    indicatorClass: "bg-gradient-to-r from-rose-100/90 to-orange-100/90",
    ringClass: "focus-visible:ring-accent-orange/50",
  },
  {
    id: "all",
    label: "All",
    description: "Cross-discipline highlights from the past few years.",
    indicatorClass: "bg-slate-200/60",
    ringClass: "focus-visible:ring-ink/30",
  },
];

export default function ProjectTabs({ active, onChange }: ProjectTabsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-3">
      <div
        role="tablist"
        aria-label="Featured project disciplines"
        className="inline-flex items-center gap-1 rounded-full border border-border-subtle/60 bg-white/70 p-1 shadow-subtle backdrop-blur-md"
      >
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          const ringClass = tab.ringClass;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={`relative z-10 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${ringClass} ${
                isActive ? "text-ink" : "text-text-subtle hover:text-text"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-indicator"
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.001 }
                      : { type: "spring", stiffness: 400, damping: 32 }
                  }
                  className={`absolute inset-0 -z-10 rounded-full ${tab.indicatorClass} shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]`}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <p className="text-sm text-text-subtle">
        {TABS.find((tab) => tab.id === active)?.description}
      </p>
    </div>
  );
}
