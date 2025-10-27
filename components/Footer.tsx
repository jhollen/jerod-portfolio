import Link from "next/link";
import { Container } from "./Container";
import GlassCard from "./GlassCard";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-32 bg-slate-950/98 pb-16 pt-20 text-slate-100">
      <Container>
        <GlassCard as="div" className="rounded-[42px] border-white/20 bg-white/8 px-10 py-12 text-slate-100">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Logo & About */}
            <div className="md:col-span-2">
              <Link
                href="/"
                className="font-bold text-3xl tracking-tight text-white"
              >
                Jerod Hollen
              </Link>
              <p className="text-sm text-slate-300 mt-4 max-w-xs leading-relaxed">
                Developer, designer, and creative technologist building liquid
                glass experiences with polish and purpose.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Site
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-slate-300 hover:text-white transition-colors px-1 py-0.5 inline-flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-primary/80 to-primary/40" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-slate-300 hover:text-white transition-colors px-1 py-0.5 inline-flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-primary/80 to-primary/40" />
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resume"
                    className="text-slate-300 hover:text-white transition-colors px-1 py-0.5 inline-flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-primary/80 to-primary/40" />
                    Experience
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-slate-300 hover:text-white transition-colors px-1 py-0.5 inline-flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-primary/80 to-primary/40" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Connect
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://github.com/jhollen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white transition-colors px-1 py-0.5 inline-flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-secondary/70 to-secondary/30" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@jerod.a.hollen.com"
                    className="text-slate-300 hover:text-white transition-colors px-1 py-0.5 inline-flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-secondary/70 to-secondary/30" />
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-300">
            <p>© {currentYear} Jerod Hollen. All rights reserved.</p>
            <p>Built with Next.js & Tailwind CSS</p>
          </div>
        </GlassCard>
      </Container>
    </footer>
  );
}
