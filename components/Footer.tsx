import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "./Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-surface-contrast text-white">
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-ink-soft via-[#111c2d] to-[#050b1c]" />
      <div className="absolute inset-0 -z-10 bg-noise-texture opacity-[0.15]" />

      <Container className="relative px-6 py-16 md:px-10 lg:px-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex text-3xl font-semibold tracking-tight text-white"
            >
              Jerod Hollen
            </Link>
            <p className="max-w-sm text-sm leading-7 text-white/70">
              Developer, designer, and creative technologist building web
              experiences with polish, systems thinking, and enduring craft.
            </p>
          </div>

          <div className="grid gap-6 text-sm sm:grid-cols-2 md:grid-cols-1">
            <div>
              <h3 className="text-base font-semibold text-white">Site</h3>
              <nav className="mt-4 space-y-2 text-white/70">
                <FooterLink href="/">Home</FooterLink>
                <FooterLink href="/projects">Projects</FooterLink>
                <FooterLink href="/resume">Experience</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
              </nav>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Connect</h3>
              <ul className="mt-4 space-y-2 text-white/70">
                <FooterExternalLink href="https://github.com/jhollen">
                  GitHub
                </FooterExternalLink>
                <FooterExternalLink href="mailto:contact@jerod.a.hollen.com">
                  Email
                </FooterExternalLink>
                <FooterExternalLink href="https://www.linkedin.com/in/jerodhollen/">
                  LinkedIn
                </FooterExternalLink>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-sm text-white/60 md:items-end md:text-right">
            <p>
              © {currentYear} Jerod Hollen. All rights reserved.
            </p>
            <p>Built with Next.js &amp; Tailwind CSS</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full px-1 py-1 text-white/70 transition-colors duration-200 hover:text-white"
    >
      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent-gradient opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
      {children}
    </Link>
  );
}

function FooterExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const externalProps = href.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <li>
      <a
        href={href}
        {...externalProps}
        className="group inline-flex items-center gap-2 rounded-full px-1 py-1 text-white/70 transition-colors duration-200 hover:text-white"
      >
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent-gradient opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
        {children}
        <span aria-hidden="true" className="text-[10px] opacity-0 transition-opacity duration-200 group-hover:opacity-70">
          ↗
        </span>
      </a>
    </li>
  );
}
