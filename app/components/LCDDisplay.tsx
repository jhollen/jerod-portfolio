"use client";

import * as React from "react";
import { useConsoleStore } from "@/app/useConsoleStore";
import { BootScreen } from "./BootScreen";

const TerminalText: React.FC<{ children: string }> = ({ children }) => {
  const keywords = [
    "React Server Components",
    "React Native",
    "Expo",
    "React",
    "Next.js 13",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "Node.js",
    "Node",
    "Ruby on Rails",
    "Ruby",
    "AWS Lambda",
    "SCORM",
    "PHP",
    "PostgreSQL",
    "AST parsing",
    "AWS",
    "Systems Architect",
    "Full Stack Engineer",
    "Android",
    "P2P",
    "encrypted",
    "flash drive",
    "offline",
    "air-gapped",
    "Android Studio",
    "Zustand",
    "Framer Motion",
    "Next.js 15",
    "Tailwind CSS 4",
    "ETL",
    "Playwright",
    "Python",
    "Skilljar API",
    "Git",
    "LEAi",
    "image-optim",
    "Heroku",
    "Rails Admin",
  ];
  const regex = new RegExp(
    `\\b(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
    "gi",
  );

  return (
    <>
      {children.split(regex).map((part, i) => {
        if (keywords.some((k) => k.toLowerCase() === part.toLowerCase())) {
          return (
            <span key={i} className="text-cyan-400 font-bold glow-text">
              {part}
            </span>
          );
        }
        return part;
      })}
    </>
  );
};

interface Project {
  id: string;
  title: string;
  category: "FRONT_END" | "BACK_END" | "SUPPORT";
  description: string;
  details: {
    overview: string;
    breach: string;
    deployment: string;
    result: string[];
  };
  assets: Array<{
    type: "diagram" | "screenshot";
    label: string;
    content?: React.ReactNode;
    todo?: string;
  }>;
}

const PROJECTS: Project[] = [
  {
    id: "SCORM_AUTO",
    title: "SCORM Delivery Automation",
    category: "BACK_END",
    description: "Automated bulk extraction and deployment of SCORM learning packets.",
    details: {
      overview: "Engineered a high-velocity pipeline using Playwright and Python to bulk export SCORM packets from LEAi, transit them through Google Drive, and programmatically replace assets in Skilljar via their REST API.",
      breach: "Manual SCORM updates were taking 45+ minutes per course, leading to massive synchronization lag and human error during content refreshes.",
      deployment: "Built a Python-based CLI utilizing Playwright for browser automation and Skilljar API for headless deployment. Integrated with Git for version-controlled manifest tracking.",
      result: ["> Reduced manual deployment from 45m to 12s.", "> 100% sync accuracy across 50+ enterprise courses.", "> Eliminated manual 'Cowboy Coding' in production."],
    },
    assets: [
      {
        type: "diagram",
        label: "AUTOMATION_FLOW",
        content: (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-[8px]">
            <div className="border border-current px-2 py-1">LEAi (SOURCE)</div>
            <div className="animate-bounce">↓</div>
            <div className="border border-current px-2 py-1 bg-current/10">PLAYWRIGHT / PYTHON</div>
            <div className="animate-bounce">↓</div>
            <div className="border border-current px-2 py-1">GOOGLE DRIVE (STORAGE)</div>
            <div className="animate-bounce">↓</div>
            <div className="border border-current px-2 py-1 bg-current/10">SKILLJAR API (DEPLOY)</div>
          </div>
        )
      },
      { type: "screenshot", label: "SCR_CLI_LOGS", todo: "Add screenshot of Python CLI logs showing successful bulk replacement." },
      { type: "screenshot", label: "SCR_SKILLJAR_DASH", todo: "Add screenshot of Skilljar asset library after automated sync." }
    ]
  },
  {
    id: "OFF_GRID_MED",
    title: "Burmese Medical Reference",
    category: "SUPPORT",
    description: "React Native medical reference for Burmese soldiers in zero-connectivity zones.",
    details: {
      overview: "Developed a mission-critical React Native app using Expo to provide offline access to indexed medical facts and life-saving procedures for soldiers in conflict zones.",
      breach: "Extreme military censorship and absolute lack of internet infrastructure required a fully air-gapped distribution and usage model.",
      deployment: "Developed with React Native Expo. Distributed via physical encrypted flash drives and P2P sharing to bypass network monitoring.",
      result: ["> 100% offline availability in active conflict zones.", "> Encrypted local storage for sensitive data protection.", "> Indexed searchable medical database."],
    },
    assets: [
      {
        type: "diagram",
        label: "OFFLINE_ACCESS_MAP",
        content: (
          <div className="flex items-center justify-center h-full gap-4 text-[8px]">
            <div className="flex flex-col gap-1 items-center">
              <div className="border border-current p-1 italic">ENCRYPTED DRIVE</div>
              <div className="w-px h-4 bg-current"></div>
              <div className="border border-current p-1 bg-current/10">EXPO RUNTIME</div>
            </div>
            <div className="text-lg">→</div>
            <div className="border-2 border-current p-4 font-bold text-center">OFFLINE<br/>MEDICAL<br/>FACTS</div>
          </div>
        )
      },
      { type: "screenshot", label: "SCR_APP_HOME", todo: "Add screenshot of the app's main medical index screen." },
      { type: "screenshot", label: "SCR_PROCEDURE_VIEW", todo: "Add screenshot of a specific medical procedure page in the app." }
    ]
  },
  {
    id: "SKILLJAR_REDESIGN",
    title: "Enterprise Brand Alignment",
    category: "FRONT_END",
    description: "Full UI overhaul of Skilljar learning portal to align with corporate branding.",
    details: {
      overview: "Spearheaded a complete frontend redesign of the Skilljar portal. Used HTML, CSS, and complex JS overrides to wrangle legacy Skilljar elements into a modern, branded experience.",
      breach: "Skilljar's default 'Cowboy Coding' interface lacked version control and allowed unvetted changes to break the UI consistently.",
      deployment: "Created a local clone of the portal in VS Code, enabling Git-based version control and local testing before deploying overrides to production.",
      result: ["> Eliminated UI regressions via proper version control.", "> Achieved 100% brand parity with main marketing site.", "> Improved user navigation flow by 30%."],
    },
    assets: [
      {
        type: "diagram",
        label: "DEV_TO_PROD_FLOW",
        content: (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-[8px]">
            <div className="border border-dashed border-current p-2">VS CODE CLONE (GIT)</div>
            <div className="text-xs">↓</div>
            <div className="border-2 border-current p-2 bg-current/5 font-bold uppercase tracking-widest">Wrangled JS/CSS Overrides</div>
            <div className="text-xs">↓</div>
            <div className="border border-current p-2 opacity-50">SKILLJAR PRODUCTION</div>
          </div>
        )
      },
      { type: "screenshot", label: "SCR_BEFORE_AFTER", todo: "Add side-by-side comparison of old Skilljar vs new branded UI." },
      { type: "screenshot", label: "SCR_CODE_OVERRIDE", todo: "Add screenshot of the JS/CSS override architecture in VS Code." }
    ]
  },
  {
    id: "IMAGE_PIPELINE",
    title: "Rails Optimization Pipeline",
    category: "BACK_END",
    description: "Automated image optimization manifest for Rails/Heroku stack.",
    details: {
      overview: "Built an automated image optimization pipeline using the image-optim gem to maintain an asset manifest and enforce performance budgets during CI/CD.",
      breach: "Unoptimized image uploads were bloating the production build and significantly increasing LCP for mobile users.",
      deployment: "Implemented a manifest-check algorithm. If a new image was detected without optimization, the Heroku build would trigger an immediate failure with a corrective action prompt.",
      result: ["> Reduced asset payload size by 40%.", "> Zero unoptimized images in production since launch.", "> Automated enforcement of performance thresholds."],
    },
    assets: [
      {
        type: "diagram",
        label: "PIPELINE_LOGIC",
        content: (
          <div className="grid grid-cols-2 gap-4 items-center justify-center h-full text-[8px] p-4">
            <div className="border border-current p-1">NEW_IMAGE.PNG</div>
            <div className="border-l-2 border-current pl-2">MANIFEST.JSON</div>
            <div className="col-span-2 text-center border border-current bg-red-500/20 py-1">BUILD_FAILED: RUN_OPTIMIZE</div>
          </div>
        )
      },
      { type: "screenshot", label: "SCR_BUILD_FAIL", todo: "Add screenshot of a failed Heroku build log with the custom error message." },
      { type: "screenshot", label: "SCR_MANIFEST_JSON", todo: "Add screenshot of the image manifest tracking optimized hashes." }
    ]
  },
  {
    id: "CONTRIBUTOR_SYSTEM",
    title: "Contributor Page System",
    category: "BACK_END",
    description: "Custom Rails Admin model for dynamic, multi-stakeholder page generation.",
    details: {
      overview: "Engineered a flexible Page Model within Rails Admin to handle complex variable-based layouts for reviews, editors, and contributors.",
      breach: "Standard CMS models couldn't handle the complex relationships between multiple reviewer roles and dynamic section backgrounds.",
      deployment: "Built a Ruby on Rails backend with dynamic variables for Hero BG, Subheadings, and multi-user roles (Reviewers, Staff, Contributors).",
      result: ["> Decentralized content management for the editorial team.", "> Reduced developer intervention for new page builds by 90%.", "> Dynamic layout generation based on model parameters."],
    },
    assets: [
      {
        type: "diagram",
        label: "MODEL_RELATIONS",
        content: (
          <div className="border border-current p-2 text-[7px] h-full overflow-hidden">
            <p className="border-b border-current font-bold bg-current/10 p-1">MODEL: CONTRIBUTOR_PAGE</p>
            <ul className="p-1 space-y-1">
              <li>+ HERO_COLOR: STRING</li>
              <li>+ TOPIC: RELATION</li>
              <li>+ REVIEWERS: HAS_MANY</li>
              <li>+ EDITORS: HAS_MANY</li>
              <li>+ STAFF: HAS_MANY</li>
            </ul>
          </div>
        )
      },
      { type: "screenshot", label: "SCR_RAILS_ADMIN", todo: "Add screenshot of the Rails Admin interface for the Contributor Page model." },
      { type: "screenshot", label: "SCR_LIVE_PAGE", todo: "Add screenshot of a rendered live page showing the dynamic hero and contributors." }
    ]
  }
];

interface LCDDisplayProps {
  menus: string[];
  tabs: string[];
}

export const LCDDisplay: React.FC<LCDDisplayProps> = ({ menus, tabs }) => {
  const {
    isBooting,
    setBooting,
    menuIndex,
    setMenuIndex,
    tabIndex,
    setTabIndex,
    activeSelection,
    setActiveSelection,
    selectedProject,
    setSelectedProject,
    contentDepth,
    setContentDepth,
    panDepth,
    setPanDepth,
    activePreset,
    addLogMessage,
    triggerNavSpike,
    triggerTabSpike,
  } = useConsoleStore();

  const [projectFilter, setProjectFilter] = React.useState<string>("ALL");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isInternalScroll = React.useRef(false);

  React.useEffect(() => {
    if (isBooting) {
      const t = setTimeout(() => {
        setBooting(false);
      }, 3000); // Sequence lasts 3s now
      return () => clearTimeout(t);
    }
  }, [isBooting, setBooting]);

  // Sync scroll position with contentDepth (from Knob)
  React.useEffect(() => {
    if (scrollRef.current && !isInternalScroll.current) {
      const el = scrollRef.current;
      const maxScroll = el.scrollHeight - el.clientHeight;
      el.scrollTop = (contentDepth / 100) * maxScroll;
    }
  }, [contentDepth]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) return;

    isInternalScroll.current = true;
    const depth = (el.scrollTop / maxScroll) * 100;
    setContentDepth(depth);

    setTimeout(() => {
      isInternalScroll.current = false;
    }, 50);
  };

  const getThemeStyles = () => {
    switch (activePreset) {
      case "RETRO":
        return {
          bg: "bg-[#3e2723]",
          text: "text-[#facc15]",
          highlight: "bg-[#facc15] text-[#3e2723]",
          border: "border-[#facc15]",
        };
      case "HACKER":
        return {
          bg: "bg-[#020617]",
          text: "text-[#67e8f9]",
          highlight: "bg-[#22d3ee] text-[#020617]",
          border: "border-[#22d3ee]",
        };
      case "ORIGINAL":
      default:
        return {
          bg: "bg-[#ffffff]",
          text: "text-[#0a0a0a]",
          highlight: "bg-[#0a0a0a] text-[#ffffff]",
          border: "border-[#0a0a0a]",
        };
    }
  };

  const theme = getThemeStyles();

  const handleBack = () => {
    if (selectedProject) {
      setSelectedProject(null);
      addLogMessage("PROJECT_NAV: Returning to index");
    } else {
      setActiveSelection(null);
      addLogMessage("SYSTEM_RESET: Returning to root");
    }
  };

  const renderMainContent = () => {
    if (isBooting) {
      return <BootScreen theme={theme} />;
    }

    if (!activeSelection) {
      return (
        <div className="flex flex-col gap-2 w-full mt-2">
          <h3 className="font-bold uppercase tracking-widest mb-4 opacity-50 text-[10px] pl-12">
            Main Menu:
          </h3>
          {menus.map((menu, idx) => {
            const isSelected = idx === menuIndex;
            return (
              <button
                key={menu}
                onClick={() => {
                  setMenuIndex(idx);
                  setActiveSelection(menu);
                  triggerNavSpike();
                  addLogMessage(`UI_NAV_CLICK: [${menu}]`);
                  addLogMessage("LOAD_BALANCING_UI_THREAD...");
                  addLogMessage("PARSING_UPSTREAM_METRICS...");
                  if (menu === "01_WHO_AM_I") {
                    setContentDepth(0);
                    setPanDepth(0);
                    addLogMessage("SYSTEM_RESET: Snap-to-zero triggered.");
                  }
                }}
                className={`p-2 transition-colors duration-75 flex gap-3 cursor-pointer text-left w-full outline-none focus:ring-2 focus:ring-inset focus:ring-current/20 pl-12 ${isSelected ? `${theme.highlight} font-bold` : "opacity-60 hover:bg-black/5"}`}
              >
                <span>{menu}</span>
              </button>
            );
          })}
        </div>
      );
    }

    if (activeSelection === "02_CASE_STUDIES") {
      if (!selectedProject) {
        const filters = ["ALL", "FRONT_END", "BACK_END", "SUPPORT"];
        const filteredProjects =
          projectFilter === "ALL"
            ? PROJECTS
            : PROJECTS.filter((p) => p.category === projectFilter);

        return (
          <div className="flex flex-col h-full w-full">
            <div
              className={`flex gap-2 border-b-2 ${theme.border} pb-2 mb-4 shrink-0 overflow-x-auto [&::-webkit-scrollbar]:hidden pl-12`}
            >
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setProjectFilter(f);
                    addLogMessage(`FILTER_APPLIED: ${f}`);
                  }}
                  className={`px-2 py-1 text-[10px] font-bold tracking-widest uppercase rounded-sm cursor-pointer transition-all outline-none focus:ring-1 focus:ring-current/20 ${projectFilter === f ? theme.highlight : "opacity-60 hover:opacity-100 hover:bg-black/5"}`}
                >
                  [{f}]
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden pl-12">
              <div className="flex flex-col gap-4 pb-10">
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProject(p.id);
                      addLogMessage(`PROJECT_MOUNTED: ${p.id}`);
                    }}
                    className="group border border-current/20 p-3 hover:bg-current/5 cursor-pointer transition-all text-left w-full outline-none focus:ring-2 focus:ring-current/10"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold uppercase tracking-wide text-xs">
                        {p.title}
                      </h4>
                      <span className="text-[8px] opacity-50 border border-current px-1">
                        {p.category}
                      </span>
                    </div>
                    <p className="text-[11px] opacity-70 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      }

      const project = PROJECTS.find((p) => p.id === selectedProject);
      if (!project) return null;

      const activeTabName = tabs[tabIndex];

      return (
        <div className="flex flex-col h-full w-full">
          <div
            className={`flex gap-2 border-b-2 ${theme.border} pb-2 mb-4 shrink-0 overflow-x-auto [&::-webkit-scrollbar]:hidden pl-12`}
          >
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                onClick={() => {
                  setTabIndex(idx);
                  triggerTabSpike();
                  addLogMessage(`UI_TAB_CLICK: [${tab}]`);
                  addLogMessage("HYDRATING_DOM_SUBTREE...");
                  addLogMessage("TRANSLATING_JSON_TO_UI_LAYER...");
                }}
                className={`px-2 py-1 text-[10px] font-bold tracking-widest uppercase rounded-sm cursor-pointer transition-all outline-none focus:ring-1 focus:ring-current/20 ${idx === tabIndex ? theme.highlight : "opacity-60 hover:opacity-100 hover:bg-black/5"}`}
              >
                [{tab}]
              </button>
            ))}
          </div>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto relative scroll-smooth [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex flex-col gap-4 font-mono text-[13px] leading-relaxed pb-10 pl-12 pr-4">
              {activeTabName === "OVERVIEW" && (
                <div>
                  <p className="font-bold mb-2 uppercase border-b border-current/20 pb-1">
                    <TerminalText>{project.title}</TerminalText>
                  </p>
                  <p>
                    <TerminalText>{project.details.overview}</TerminalText>
                  </p>
                </div>
              )}
              {activeTabName === "BREACH" && (
                <div>
                  <p className="font-bold mb-2">
                    <TerminalText>[ THE BREACH ]</TerminalText>
                  </p>
                  <p>
                    <TerminalText>{project.details.breach}</TerminalText>
                  </p>
                </div>
              )}
              {activeTabName === "DEPLOY" && (
                <div>
                  <p className="font-bold mb-2">
                    <TerminalText>[ THE DEPLOYMENT ]</TerminalText>
                  </p>
                  <p>
                    <TerminalText>{project.details.deployment}</TerminalText>
                  </p>
                </div>
              )}
              {activeTabName === "RESULT" && (
                <div>
                  <p className="font-bold mb-2">
                    <TerminalText>[ THE RESOLUTION ]</TerminalText>
                  </p>
                  <div className="space-y-2">
                    {project.details.result.map((r, i) => (
                      <p key={i}>
                        <TerminalText>{r}</TerminalText>
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {activeTabName === "ASSETS" && (
                <div className="w-full h-[200px] relative overflow-hidden">
                  <div
                    className="flex gap-4 absolute inset-0 transition-transform duration-75 h-full"
                    style={{ transform: `translateX(-${(panDepth / 100) * (project.assets.length * 100 - 100)}%)` }}
                  >
                    {project.assets.map((asset, i) => (
                      <div key={i} className="w-full shrink-0 border border-current p-4 flex flex-col h-full">
                        <p className="font-bold border-b border-current pb-2 mb-2 text-[9px] uppercase tracking-widest">
                          [ {asset.label} ]
                        </p>
                        <div className="flex-1 flex items-center justify-center relative bg-current/5 overflow-hidden">
                          {asset.type === "diagram" ? (
                            asset.content
                          ) : (
                            <div className="text-center p-4">
                              <p className="text-[10px] font-bold text-red-500 animate-pulse">TODO: ASSET_MISSING</p>
                              <p className="text-[8px] opacity-60 mt-2 italic">{asset.todo}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto relative scroll-smooth [&::-webkit-scrollbar]:hidden w-full h-full"
      >
        <div className="flex flex-col gap-4 font-mono text-[13px] leading-relaxed pb-10">
          <h3 className="font-bold uppercase tracking-widest mb-2 border-b border-current pb-2 pl-12">
            {activeSelection}
          </h3>
          <div className="pl-12 pr-4">
            {activeSelection === "01_WHO_AM_I" && (
              <div className="space-y-4">
                <p>
                  <TerminalText>Jerod Hollen</TerminalText>
                  <br />
                  <TerminalText>
                    Full Stack Engineer | Systems Architect
                  </TerminalText>
                </p>
                <p>
                  <TerminalText>
                    I specialize in building high-performance, resilient systems
                    that bridge the gap between complex backend architecture and
                    intuitive frontend experiences.
                  </TerminalText>
                </p>
                <p>
                  <TerminalText>
                    Western Washington University (2022) B.S. Computer Science
                  </TerminalText>
                </p>
                <p>
                  <TerminalText>
                    Based in Bellingham, WA. Currently advancing my expertise
                    with automated toolchains and scalable system design.
                  </TerminalText>
                </p>
              </div>
            )}
            {activeSelection === "03_ENGINEERING_STACK" && (
              <div className="space-y-4">
                <div>
                  <p className="font-bold opacity-50 text-[10px] uppercase mb-1">
                    Languages
                  </p>
                  <p>
                    &gt; <TerminalText>TypeScript</TerminalText>,{" "}
                    <TerminalText>JavaScript</TerminalText>, Ruby,{" "}
                    <TerminalText>PHP</TerminalText>, Python, SQL
                  </p>
                </div>
                <div>
                  <p className="font-bold opacity-50 text-[10px] uppercase mb-1">
                    Frameworks
                  </p>
                  <p>
                    &gt; <TerminalText>React</TerminalText>,{" "}
                    <TerminalText>Next.js</TerminalText>,{" "}
                    <TerminalText>Node.js</TerminalText>, Ruby on Rails, Express
                  </p>
                </div>
                <div>
                  <p className="font-bold opacity-50 text-[10px] uppercase mb-1">
                    Infrastructure
                  </p>
                  <p>
                    &gt; <TerminalText>AWS</TerminalText> (Lambda, S3, EC2),{" "}
                    <TerminalText>PostgreSQL</TerminalText>, Prisma, Supabase,
                    Docker
                  </p>
                </div>
              </div>
            )}
            {activeSelection === "04_GET_IN_TOUCH" && (
              <div className="space-y-4">
                <p className="animate-pulse">COMM_LINK_ESTABLISHED</p>
                <div className="space-y-1">
                  <p>Email: jerod.a.hollen@gmail.com</p>
                  <p>GitHub: github.com/jhollen</p>
                  <p>LinkedIn: linkedin.com/in/jerodhollen</p>
                </div>
                <p className="text-[10px] opacity-50 italic mt-4">
                  &quot;Available for strategic roles and high-impact
                  engineering challenges.&quot;
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`w-full aspect-[16/9] max-h-[400px] ${theme.bg} border-[30px] border-[#0a0a0a] p-3 md:p-4 relative shadow-[inset_0_4px_20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col shrink-0 transition-colors duration-300`}
    >
      {/* Back Button (Arrow) */}
      {activeSelection && (
        <button
          onClick={handleBack}
          className={`absolute top-2 left-2 z-40 p-2 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center gap-2 group cursor-pointer ${theme.text}`}
          aria-label="Back"
        >
          <div
            className={`p-1 rounded-sm border-2 ${theme.border} group-hover:bg-black/5`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </div>
        </button>
      )}

      {/* Inner Shadow / Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] z-20" />

      {/* Main Interface Screen */}
      <div
        className={`flex-1 h-full overflow-hidden ${theme.text} font-mono text-sm md:text-[14px] leading-relaxed tracking-wide relative transition-colors duration-300 z-10`}
      >
        <div className="absolute inset-0 transition-transform duration-75 ease-linear">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};
