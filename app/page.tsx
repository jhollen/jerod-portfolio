import { PROJECTS_DATA, BIO_DATA, STACK_DATA } from "./constants";
import { ThemeToggle, CopyEmail, Reveal, WordRotator, WorkSection } from "./interactive";

// One-line proof per project — the metric a recruiter remembers.
const METRICS: Record<string, string> = {
  SCORM_PIPELINE: "8 hrs → 20 min",
  OFF_GRID_MED: "100% offline uptime",
  CSA_TRAINING: "12 modules shipped",
  DYNAMIC_CONTRIBUTOR: "2 days → 5 min",
  BOGARDT_PLATFORM: "Edge-deployed",
};

const NAV = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const CONTACTS = [
  { label: "Resume", href: "/Jerod-Hollen-Resume.pdf", external: true, primary: true },
  { label: "Email", href: "mailto:jerod.a.hollen@gmail.com", external: false, primary: false },
  { label: "GitHub", href: "https://github.com/jhollen", external: true, primary: false },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jerod-hollen", external: true, primary: false },
];

const TOOLBOX: string[] = Array.from(
  new Set(STACK_DATA.flatMap((s) => s.languages))
);

const ROTATOR_WORDS = ["bottlenecks", "busywork", "grunt work", "repetitive chaos"];

function WaveDivider() {
  return (
    <div aria-hidden="true" className="text-sun overflow-hidden">
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="block w-full h-10 md:h-14">
        <path
          d="M0,36 C240,66 480,6 720,32 C960,58 1200,10 1440,36 L1440,70 L0,70 Z"
          fill="currentColor"
          opacity="0.35"
        />
        <path
          d="M0,50 C260,70 520,28 780,48 C1040,68 1240,36 1440,50 L1440,70 L0,70 Z"
          fill="currentColor"
          opacity="0.22"
        />
      </svg>
    </div>
  );
}

function SectionHeading({ index, title, blurb }: { index: string; title: string; blurb?: string }) {
  return (
    <Reveal className="mb-8 md:mb-10">
      <p className="font-mono text-[11px] tracking-[0.25em] text-sea font-bold mb-2">
        TRACK {index}
      </p>
      <h2 className="font-display text-3xl md:text-5xl text-ink">
        {title}
      </h2>
      {blurb && <p className="mt-3 text-text-subtle max-w-2xl">{blurb}</p>}
    </Reveal>
  );
}

function CtaRow({ includeCopy = false }: { includeCopy?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {CONTACTS.map((c) => (
        <a
          key={c.label}
          href={c.href}
          {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={
            c.primary
              ? "inline-flex items-center gap-1.5 bg-accent text-surface-base font-bold text-sm px-5 py-2.5 rounded-full border-2 border-ink hover:bg-accent-deep transition-colors badge-retro"
              : "inline-flex items-center gap-1.5 font-bold text-sm px-5 py-2.5 rounded-full border-2 border-border-strong text-ink hover:bg-surface-muted transition-colors"
          }
        >
          {c.primary && <span aria-hidden="true">↓</span>} {c.label}
        </a>
      ))}
      {includeCopy && <CopyEmail />}
    </div>
  );
}

export default function EditorialHome() {
  return (
    <div className="min-h-screen bg-surface-base text-ink font-sans antialiased">
      {/* ---- Sticky header ---- */}
      <header className="sticky top-0 z-50 bg-surface-base/90 backdrop-blur border-b-2 border-border-strong">
        <div className="max-w-5xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between gap-4">
          <a href="#top" className="font-display text-[17px] text-ink whitespace-nowrap">
            Jerod Hollen
          </a>
          <nav className="flex items-center gap-3 md:gap-5" aria-label="Primary">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-[13px] font-bold text-text-subtle hover:text-ink transition-colors"
              >
                {n.label}
              </a>
            ))}
            <a
              href="/Jerod-Hollen-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex text-[13px] font-bold bg-ink text-surface-base px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Resume
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ---- Hero: identity first, zero interaction required ---- */}
        <section className="max-w-5xl mx-auto px-5 md:px-8 pt-12 md:pt-20 pb-10">
          <Reveal>
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="inline-flex items-center gap-2.5 mb-4">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sea opacity-60" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sea" />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.2em] font-bold text-text-subtle">
                    AVAILABLE FOR NEW ROLES
                  </span>
                </p>
                <p className="font-mono text-[11px] md:text-xs tracking-[0.25em] text-accent font-bold mb-4">
                  FULL-STACK ENGINEER · BELLINGHAM, WA / REMOTE
                </p>
                <h1 className="font-display text-[44px] leading-[1.05] md:text-7xl text-ink mb-5">
                  Jerod Hollen
                </h1>
              </div>
              <div
                className="vinyl w-20 h-20 md:w-28 md:h-28 shrink-0 mt-2"
                aria-hidden="true"
              />
            </div>
            <p className="text-lg md:text-2xl text-text leading-relaxed max-w-2xl mb-8">
              I turn manual <WordRotator words={ROTATOR_WORDS} /> into automated
              systems. I compress chaos into working software.
            </p>

            <CtaRow />
          </Reveal>

          {/* Proof strip */}
          <Reveal delay={100}>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border-subtle border-2 border-border-strong rounded-3xl overflow-hidden mt-10">
              {[
                ["~160 hrs", "of manual work saved per quarter"],
                ["40–70 MB", "page weight cut across ~2,000 assets"],
                ["4+ yrs", "shipping enterprise edtech & automation"],
              ].map(([stat, label]) => (
                <div key={label} className="bg-surface-base px-5 py-4">
                  <dt className="font-display text-2xl text-ink">{stat}</dt>
                  <dd className="text-[13px] text-text-subtle mt-1">{label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        <WaveDivider />

        {/* ---- Work ---- */}
        <section id="work" className="max-w-5xl mx-auto px-5 md:px-8 py-12 md:py-16 scroll-mt-16">
          <SectionHeading
            index="01"
            title="Selected Work"
            blurb="Impact first. Open any project for the full case study — the problem, the build, and the result."
          />
          <WorkSection projects={PROJECTS_DATA} metrics={METRICS} />
        </section>

        <WaveDivider />

        {/* ---- About ---- */}
        <section id="about" className="bg-surface-muted/60 border-y-2 border-border-strong scroll-mt-16">
          <div className="max-w-5xl mx-auto px-5 md:px-8 py-12 md:py-16">
            <SectionHeading
              index="02"
              title="About"
              blurb="Non-traditional path, enterprise-grade output."
            />
            <div className="grid md:grid-cols-2 gap-10">
              <Reveal className="space-y-4 text-text leading-relaxed">
                <p>{BIO_DATA.tier1_base}</p>
                <p>{BIO_DATA.tier2_timeline}</p>
                <p>{BIO_DATA.tier3_deepDive}</p>
              </Reveal>
              <Reveal delay={120}>
                <h3 className="font-mono text-[11px] tracking-[0.25em] font-bold text-text-subtle mb-4">
                  EXPERIENCE
                </h3>
                <div className="border-l-2 border-accent pl-5 space-y-6">
                  <div>
                    <p className="font-black text-ink">Web Developer / Software Engineer I</p>
                    <p className="text-[13px] text-text-subtle font-bold">
                      Cloud Security Alliance · Jul 2021 – Oct 2025
                    </p>
                    <ul className="mt-2 space-y-1.5 text-[14px] text-text list-disc pl-4">
                      <li>Image pipeline: ~2,000 assets, 40–70MB lighter pages</li>
                      <li>SCORM automation: 8-hour process → 20-minute run</li>
                      <li>Promoted from Junior Web Developer</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-black text-ink">B.S. Computer Science</p>
                    <p className="text-[13px] text-text-subtle font-bold">
                      Western Washington University · 2022 · Minor in Mathematics
                    </p>
                    <p className="text-[13px] text-text-subtle mt-1">Eagle Scout</p>
                  </div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={80} className="mt-10">
              <h3 className="font-mono text-[11px] tracking-[0.25em] font-bold text-text-subtle mb-4">
                TOOLBOX
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {TOOLBOX.map((t) => (
                  <span
                    key={t}
                    className="text-[12px] font-bold text-text bg-surface-base border-2 border-border-subtle px-3 py-1.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <WaveDivider />

        {/* ---- Contact ---- */}
        <section id="contact" className="max-w-5xl mx-auto px-5 md:px-8 py-14 md:py-20 scroll-mt-16">
          <SectionHeading index="03" title="Let's build something that ships." />
          <Reveal delay={80}>
            <p className="text-text-subtle max-w-xl mb-8 -mt-4">
              Open to frontend, technical solutions, and AI engineering roles —
              remote or Bellingham, WA.
            </p>
            <CtaRow includeCopy />
          </Reveal>
        </section>
      </main>

      <footer className="border-t-2 border-border-strong">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-6 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[0.2em] text-text-faint">
            © 2026 JEROD HOLLEN
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] text-text-faint">
            END OF SIDE A
          </p>
        </div>
      </footer>
    </div>
  );
}
