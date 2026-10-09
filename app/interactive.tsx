"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "./constants";

const THEME_KEY = "jh-theme";

/* ---------------- Theme toggle ---------------- */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let isDark = false;
    try {
      const saved = localStorage.getItem(THEME_KEY);
      isDark = saved
        ? saved === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      isDark = false;
    }
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      /* storage unavailable — theme just won't persist */
    }
  };

  if (!mounted) {
    return <span className="w-9 h-9" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 inline-flex items-center justify-center rounded-full border-2 border-border-strong text-ink hover:bg-surface-muted transition-colors text-base shrink-0"
    >
      <span aria-hidden="true">{dark ? "\u2600" : "\u263E"}</span>
    </button>
  );
}

/* ---------------- Copy email ---------------- */
export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const email = "jerod.a.hollen@gmail.com";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 font-bold text-sm px-5 py-2.5 rounded-full border-2 border-border-strong text-ink hover:bg-surface-muted transition-colors"
    >
      {copied ? "Copied!" : "Copy email"}
    </button>
  );
}

/* ---------------- Scroll reveal ---------------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------- Hero word rotator ---------------- */
export function WordRotator({
  words,
  interval = 2600,
}: {
  words: string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setFading(false);
      }, 350);
    }, interval);
    return () => clearInterval(id);
  }, [interval, words.length]);

  return (
    <span className={`word-rotator ${fading ? "word-rotator-fade" : ""}`}>
      {words[index]}
    </span>
  );
}

/* ---------------- Case-study modal ---------------- */
function ProjectModal({
  project,
  metric,
  onClose,
}: {
  project: Project;
  metric?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <div
        className="modal-backdrop absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="modal-panel relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-card border-2 border-border-strong rounded-t-3xl sm:rounded-3xl p-6 md:p-8">
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Close case study"
          className="absolute top-4 right-4 w-9 h-9 inline-flex items-center justify-center rounded-full border-2 border-border-strong text-ink hover:bg-surface-muted transition-colors"
        >
          <span aria-hidden="true">\u2715</span>
        </button>

        <p className="font-mono text-[10px] tracking-[0.2em] text-sea font-bold mb-2 pr-10">
          {project.category}
        </p>
        <h3 className="font-display text-2xl md:text-3xl text-ink mb-3 pr-10">
          {project.title}
        </h3>
        {metric && (
          <span className="inline-block font-mono text-[11px] font-bold bg-ink text-surface-base px-3 py-1.5 rounded-full mb-5 badge-retro">
            {metric}
          </span>
        )}

        <p className="text-text leading-relaxed mb-6">{project.overview}</p>

        <div className="space-y-4 text-[15px] text-text leading-relaxed mb-6">
          <p>
            <strong className="text-ink">The problem: </strong>
            {project.breach}
          </p>
          <p>
            <strong className="text-ink">The build: </strong>
            {project.deploy}
          </p>
          <p>
            <strong className="text-ink">The result: </strong>
            {project.result}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((s) => (
            <span
              key={s}
              className="text-[11px] font-bold text-text-subtle bg-surface-muted border border-border-subtle px-2.5 py-1 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>

        {project.media && project.media.length > 0 && (
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.25em] font-bold text-text-subtle mb-3">
              EXHIBITS
            </h4>
            <ul className="space-y-2.5">
              {project.media.map((m, i) => (
                <li
                  key={i}
                  className="border border-border-subtle rounded-2xl p-4 bg-surface-base"
                >
                  <p className="font-mono text-[10px] tracking-[0.2em] text-accent font-bold mb-1">
                    {m.type.toUpperCase()}
                  </p>
                  <p className="font-bold text-sm text-ink">{m.label}</p>
                  <p className="text-[13px] text-text-subtle mt-0.5">{m.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Work grid + modal ---------------- */
export function WorkSection({
  projects,
  metrics,
}: {
  projects: Project[];
  metrics: Record<string, string>;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = projects.find((p) => p.id === openId) ?? null;

  return (
    <>
      <div className="space-y-5">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i, 4) * 70}>
            <article
              onClick={() => setOpenId(p.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenId(p.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              className="cursor-pointer border-2 border-border-strong rounded-3xl bg-card p-5 md:p-7 shadow-subtle hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-sea font-bold mb-1.5">
                    {p.category}
                  </p>
                  <h3 className="font-display text-xl md:text-2xl text-ink">
                    {p.title}
                  </h3>
                </div>
                {metrics[p.id] && (
                  <span className="font-mono text-[11px] font-bold bg-ink text-surface-base px-3 py-1.5 rounded-full whitespace-nowrap badge-retro">
                    {metrics[p.id]}
                  </span>
                )}
              </div>
              <p className="text-text leading-relaxed mb-4">{p.result}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] font-bold text-text-subtle bg-surface-muted border border-border-subtle px-2.5 py-1 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[13px] font-bold text-accent">
                View case study <span aria-hidden="true">\u2192</span>
              </p>
            </article>
          </Reveal>
        ))}
      </div>
      {open && (
        <ProjectModal
          project={open}
          metric={metrics[open.id]}
          onClose={() => setOpenId(null)}
        />
      )}
    </>
  );
}
