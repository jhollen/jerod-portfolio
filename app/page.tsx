import { PROJECTS_DATA, BIO_DATA } from "./constants";

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

function SectionHeading({ index, title, blurb }: { index: string; title: string; blurb?: string }) {
  return (
    <div className="mb-8 md:mb-10">
      <p className="font-mono text-[11px] tracking-[0.25em] text-accent-blue font-bold mb-2">
        SIG.{index}
      </p>
      <h2 className="font-playfair text-3xl md:text-4xl font-black text-ink tracking-tight">
        {title}
      </h2>
      {blurb && <p className="mt-2 text-text-subtle max-w-2xl">{blurb}</p>}
      <div className="signal-line mt-6" aria-hidden="true">
        <span className="signal-pulse" />
      </div>
    </div>
  );
}

function CtaRow() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {CONTACTS.map((c) => (
        <a
          key={c.label}
          href={c.href}
          {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={
            c.primary
              ? "inline-flex items-center gap-1.5 bg-ink text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-ink-soft transition-colors"
              : "inline-flex items-center gap-1.5 font-bold text-sm px-5 py-2.5 rounded-full border border-border-strong text-ink hover:bg-surface-muted transition-colors"
          }
        >
          {c.primary && <span aria-hidden="true">↓</span>} {c.label}
        </a>
      ))}
    </div>
  );
}

export default function EditorialHome() {
  return (
    <div className="min-h-screen bg-surface-base text-ink font-sans antialiased">
      {/* ---- Sticky header ---- */}
      <header className="sticky top-0 z-50 bg-surface-base/90 backdrop-blur border-b border-border-subtle">
        <div className="max-w-5xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between gap-4">
          <a href="#top" className="font-black tracking-tight text-[15px] whitespace-nowrap">
            JEROD HOLLEN
          </a>
          <nav className="flex items-center gap-4 md:gap-6" aria-label="Primary">
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
              className="hidden sm:inline-flex text-[13px] font-bold bg-ink text-white px-4 py-1.5 rounded-full hover:bg-ink-soft transition-colors"
            >
              Resume
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ---- Hero: identity first, zero interaction required ---- */}
        <section className="max-w-5xl mx-auto px-5 md:px-8 pt-12 md:pt-20 pb-10">
          <p className="font-mono text-[11px] md:text-xs tracking-[0.25em] text-accent-blue font-bold mb-4">
            FULL-STACK ENGINEER · BELLINGHAM, WA / REMOTE
          </p>
          <h1 className="font-playfair text-[42px] leading-[1.05] md:text-7xl font-black tracking-tight mb-5">
            Jerod Hollen
          </h1>
          <p className="text-lg md:text-2xl text-text leading-relaxed max-w-2xl mb-8">
            I turn manual bottlenecks into automated systems. I compress chaos
            into working software.
          </p>

          <CtaRow />

          {/* Proof strip */}
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border-subtle border border-border-subtle rounded-2xl overflow-hidden mt-10">
            {[
              ["~160 hrs", "of manual work saved per quarter"],
              ["40–70 MB", "page weight cut across ~2,000 assets"],
              ["4+ yrs", "shipping enterprise edtech & automation"],
            ].map(([stat, label]) => (
              <div key={label} className="bg-surface-base px-5 py-4">
                <dt className="font-playfair text-2xl font-black">{stat}</dt>
                <dd className="text-[13px] text-text-subtle mt-1">{label}</dd>
              </div>
            ))}
          </dl>

          {/* Hardware soul, pocket-sized: a live-feeling meter, decorative only */}
          <div className="mt-10 flex items-center gap-4" aria-hidden="true">
            <div className="flex items-end gap-1 h-10">
              {[0.9, 0.5, 0.7, 1, 0.4, 0.8, 0.6, 1, 0.5, 0.75, 0.45, 0.9].map((d, i) => (
                <span
                  key={i}
                  className="vu-bar w-1.5 rounded-sm bg-accent-blue/80"
                  style={{ height: "100%", animationDelay: `${(d * 1.1).toFixed(2)}s` }}
                />
              ))}
            </div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-text-faint">
              INPUT: CHAOS — OUTPUT: SYSTEMS
            </p>
          </div>
        </section>

        {/* ---- Work ---- */}
        <section id="work" className="max-w-5xl mx-auto px-5 md:px-8 py-12 md:py-16 scroll-mt-16">
          <SectionHeading
            index="01"
            title="Selected Work"
            blurb="Impact first. Tap any project for the full signal chain — the problem, the build, and the result."
          />
          <div className="space-y-5">
            {PROJECTS_DATA.map((p) => (
              <article
                key={p.id}
                className="border border-border-subtle rounded-2xl bg-card p-5 md:p-7 shadow-subtle"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-text-faint font-bold mb-1.5">
                      {p.category}
                    </p>
                    <h3 className="font-black text-xl md:text-2xl tracking-tight">
                      {p.title}
                    </h3>
                  </div>
                  {METRICS[p.id] && (
                    <span className="font-mono text-[11px] font-bold bg-ink text-white px-3 py-1.5 rounded-full whitespace-nowrap">
                      {METRICS[p.id]}
                    </span>
                  )}
                </div>
                <p className="text-text leading-relaxed mb-4">{p.result}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-bold text-text-subtle bg-surface-muted border border-border-subtle px-2.5 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <details className="group border-t border-border-subtle pt-3">
                  <summary className="cursor-pointer text-[13px] font-bold text-accent-blue list-none [&::-webkit-details-marker]:hidden flex items-center gap-2 select-none">
                    <span className="group-open:rotate-90 transition-transform inline-block" aria-hidden="true">
                      ▸
                    </span>
                    How it was built
                  </summary>
                  <div className="mt-3 space-y-3 text-[14px] text-text leading-relaxed">
                    <p>
                      <strong className="text-ink">The problem: </strong>
                      {p.breach}
                    </p>
                    <p>
                      <strong className="text-ink">The build: </strong>
                      {p.deploy}
                    </p>
                  </div>
                </details>
              </article>
            ))}
          </div>
        </section>

        {/* ---- About ---- */}
        <section id="about" className="bg-surface-muted/60 border-y border-border-subtle">
          <div className="max-w-5xl mx-auto px-5 md:px-8 py-12 md:py-16 scroll-mt-16">
            <SectionHeading
              index="02"
              title="About"
              blurb="Non-traditional path, enterprise-grade output."
            />
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4 text-text leading-relaxed">
                <p>{BIO_DATA.tier1_base}</p>
                <p>{BIO_DATA.tier2_timeline}</p>
                <p>{BIO_DATA.tier3_deepDive}</p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] tracking-[0.25em] font-bold text-text-subtle mb-4">
                  EXPERIENCE
                </h3>
                <div className="border-l-2 border-ink pl-5 space-y-6">
                  <div>
                    <p className="font-black">Web Developer / Software Engineer I</p>
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
                    <p className="font-black">B.S. Computer Science</p>
                    <p className="text-[13px] text-text-subtle font-bold">
                      Western Washington University · 2022 · Minor in Mathematics
                    </p>
                    <p className="text-[13px] text-text-subtle mt-1">Eagle Scout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Contact ---- */}
        <section id="contact" className="max-w-5xl mx-auto px-5 md:px-8 py-14 md:py-20 scroll-mt-16">
          <SectionHeading index="03" title="Let's build something that ships." />
          <p className="text-text-subtle max-w-xl mb-8 -mt-4">
            Open to frontend, technical solutions, and AI engineering roles —
            remote or Bellingham, WA.
          </p>
          <CtaRow />
        </section>
      </main>

      <footer className="border-t border-border-subtle">
        <div className="max-w-5xl mx-auto px-5 md:px-8 py-6 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[0.2em] text-text-faint">
            © 2026 JEROD HOLLEN
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] text-text-faint">
            TRANSMISSION ENDS
          </p>
        </div>
      </footer>
    </div>
  );
}
