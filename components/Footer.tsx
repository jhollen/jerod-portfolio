import Link from "next/link";
import { Container } from "./Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-24 pb-12">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-10 -z-10 bg-gradient-to-t from-white/70 via-white/10 to-transparent blur-3xl"></div>
      <Container>
        <div className="glass-surface rounded-3xl px-8 py-10 text-gray-800">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Logo & About */}
            <div className="md:col-span-2">
              <Link
                href="/"
                className="font-bold text-3xl tracking-tight text-gray-900"
              >
                Jerod Hollen
              </Link>
              <p className="text-sm text-gray-600 mt-4 max-w-xs leading-relaxed">
                Developer, designer, and creative technologist building liquid
                glass experiences with polish and purpose.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Site
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-gray-900 transition-colors px-1 py-0.5 inline-flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-primary/80 to-primary/40" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-gray-600 hover:text-gray-900 transition-colors px-1 py-0.5 inline-flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-primary/80 to-primary/40" />
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resume"
                    className="text-gray-600 hover:text-gray-900 transition-colors px-1 py-0.5 inline-flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-primary/80 to-primary/40" />
                    Experience
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-gray-900 transition-colors px-1 py-0.5 inline-flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-primary/80 to-primary/40" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Connect
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://github.com/jhollen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors px-1 py-0.5 inline-flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-secondary/70 to-secondary/30" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@jerod.a.hollen.com"
                    className="text-gray-600 hover:text-gray-900 transition-colors px-1 py-0.5 inline-flex items-center gap-2"
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© {currentYear} Jerod Hollen. All rights reserved.</p>
            <p>Built with Next.js & Tailwind CSS</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
