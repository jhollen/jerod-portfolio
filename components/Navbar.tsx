// Navbar.tsx
// This component renders the navigation bar for the site.
// It uses Next.js Link for client-side navigation.

import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";

export default function Navbar() {
  return (
    <nav
      data-app-navbar
      className="fixed inset-x-0 top-0 z-[9999] bg-transparent pt-6"
    >
      <Container className="relative flex items-center justify-between gap-6">
        <div className="glass-nav relative flex w-full items-center justify-between gap-6 px-6 py-3 text-sm">
          {/* Site title/logo on the left */}
          <div className="flex flex-1 items-center gap-5 pr-4">
            <Link
              href="/"
              className="relative z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/40 bg-white/30 shadow-inner backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Image
                src="/logo-jh.png"
                alt="Jerod Hollen logo"
                fill
                sizes="48px"
                className="rounded-full object-cover"
                priority
              />
            </Link>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.32em] text-gray-600 sm:inline-flex">
              Jerod Hollen
            </span>
          </div>
          {/* Navigation links on the right */}
          <div className="flex items-center gap-8 pl-6">
            <Link
              href="/projects"
              className="font-semibold text-gray-700 hover:text-gray-900 hover:underline transition px-1"
            >
              Projects
            </Link>
            <Link
              href="/resume"
              className="font-semibold text-gray-700 hover:text-gray-900 hover:underline transition px-1"
            >
              Experience
            </Link>
            <Link
              href="/contact"
              className="font-semibold text-gray-700 hover:text-gray-900 hover:underline transition px-1"
            >
              Contact
            </Link>
            <div className="flex items-center gap-3 lg:hidden">
              <Link
                href="https://github.com/jhollen"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="glass-bubble text-gray-700 hover:text-gray-900"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.188 22 16.435 22 12.012 22 6.484 17.523 2 12 2Z" />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/in/jerodhollen"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="glass-bubble text-[#0A66C2] hover:text-[#084f97]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8.98h5V24H0V8.98zM8.98 8.98h4.78v2.05h.07c.67-1.27 2.3-2.6 4.74-2.6 5.07 0 6 3.34 6 7.68V24h-5v-6.73c0-1.6-.03-3.66-2.23-3.66-2.23 0-2.57 1.74-2.57 3.54V24h-5V8.98z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="glass-orb-belt hidden items-center gap-3 lg:flex">
          <Link
            href="https://github.com/jhollen"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="glass-orb"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.188 22 16.435 22 12.012 22 6.484 17.523 2 12 2Z" />
            </svg>
          </Link>
          <Link
            href="https://www.linkedin.com/in/jerodhollen"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="glass-orb text-[#0A66C2]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8.98h5V24H0V8.98zM8.98 8.98h4.78v2.05h.07c.67-1.27 2.3-2.6 4.74-2.6 5.07 0 6 3.34 6 7.68V24h-5v-6.73c0-1.6-.03-3.66-2.23-3.66-2.23 0-2.57 1.74-2.57 3.54V24h-5V8.98z" />
            </svg>
          </Link>
        </div>
      </Container>
    </nav>
  );
}
