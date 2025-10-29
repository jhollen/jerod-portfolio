"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { Container } from "./Container";

export default function HeaderNav() {
  const [isElevated, setIsElevated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsElevated(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="pointer-events-none fixed inset-x-0 top-0 z-[999]">
      <Container className="pointer-events-auto px-4 pb-4 pt-6 sm:px-6 lg:px-8">
        <div
          className={clsx(
            "flex items-center justify-between gap-4 rounded-full border border-transparent px-4 py-3 transition-all duration-300",
            isElevated
              ? "backdrop-blur-md border-white/50 bg-white/70 shadow-card"
              : "bg-transparent"
          )}
        >
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="relative h-10 w-10 overflow-hidden rounded-full border border-black/5 bg-white/80 shadow-subtle transition-transform duration-200 hover:-translate-y-0.5"
              aria-label="Home"
            >
              <Image
                src="/logo-jh.png"
                alt="Jerod Hollen logo"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </Link>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.32em] text-text-subtle md:inline-flex">
              Jerod Hollen
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm font-semibold">
            <HeaderLink href="/projects">Projects</HeaderLink>
            <HeaderLink href="/resume">Experience</HeaderLink>
            <HeaderLink href="/contact">Contact</HeaderLink>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <HeaderSocialLink
              href="https://github.com/jhollen"
              label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.188 22 16.435 22 12.012 22 6.484 17.523 2 12 2Z" />
              </svg>
            </HeaderSocialLink>
            <HeaderSocialLink
              href="https://www.linkedin.com/in/jerodhollen"
              label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8.98h5V24H0V8.98zM8.98 8.98h4.78v2.05h.07c.67-1.27 2.3-2.6 4.74-2.6 5.07 0 6 3.34 6 7.68V24h-5v-6.73c0-1.6-.03-3.66-2.23-3.66-2.23 0-2.57 1.74-2.57 3.54V24h-5V8.98z" />
              </svg>
            </HeaderSocialLink>
          </div>
        </div>
      </Container>
    </nav>
  );
}

function HeaderLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full px-3 py-1 text-text-subtle transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      {children}
    </Link>
  );
}

function HeaderSocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle/80 bg-white/80 text-ink transition-transform duration-200 hover:-translate-y-0.5 hover:text-accent-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
    >
      {children}
    </a>
  );
}
