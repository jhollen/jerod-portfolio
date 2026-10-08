"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "jh-theme";

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
      className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-border-strong text-ink hover:bg-surface-muted transition-colors text-base shrink-0"
    >
      <span aria-hidden="true">{dark ? "\u2600" : "\u263E"}</span>
    </button>
  );
}

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
      className="inline-flex items-center gap-1.5 font-bold text-sm px-5 py-2.5 rounded-full border border-border-strong text-ink hover:bg-surface-muted transition-colors"
    >
      {copied ? "Copied!" : "Copy email"}
    </button>
  );
}
