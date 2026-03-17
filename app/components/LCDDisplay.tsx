"use client";

import * as React from "react";
import { useConsoleStore } from "@/app/useConsoleStore";
import { BootScreen } from "./BootScreen";

const TerminalText: React.FC<{ children: string }> = ({ children }) => {
  const keywords = [
    "React Server Components",
    "React",
    "Next.js 13",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "Node.js",
    "Node",
    "Ruby",
    "AWS Lambda",
    "SCORM",
    "PHP",
    "PostgreSQL",
    "AST parsing",
    "AWS",
    "Systems Architect",
    "Full Stack Engineer",
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
    contentDepth,
    setContentDepth,
    panDepth,
    activePreset,
    addLogMessage,
    triggerNavSpike,
    triggerTabSpike,
  } = useConsoleStore();

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isInternalScroll = React.useRef(false);

  React.useEffect(() => {
    if (isBooting) {
      const t = setTimeout(() => {
        setBooting(false);
      }, 2000);
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

    // Reset after a short delay to allow Knob to sync back if needed,
    // but mostly to prevent feedback loops
    setTimeout(() => {
      isInternalScroll.current = false;
    }, 50);
  };

  const getThemeStyles = () => {
    switch (activePreset) {
      case "RETRO": // 70s Rock / Warm
        return {
          bg: "bg-[#3e2723]",
          text: "text-[#facc15]",
          highlight: "bg-[#facc15] text-[#3e2723]",
          border: "border-[#facc15]",
        };
      case "HACKER": // Computer Sciency
        return {
          bg: "bg-[#020617]",
          text: "text-[#22d3ee]",
          highlight: "bg-[#22d3ee] text-[#020617]",
          border: "border-[#22d3ee]",
        };
      case "ORIGINAL":
      default:
        return {
          bg: "bg-[#e8e9e4]",
          text: "text-[#1a2015]",
          highlight: "bg-[#1a2015] text-[#e8e9e4]",
          border: "border-[#1a2015]",
        };
    }
  };

  const theme = getThemeStyles();

  const renderMainContent = () => {
    if (isBooting) {
      return <BootScreen theme={theme} />;
    }

    if (!activeSelection) {
      return (
        <div className="flex flex-col gap-2 w-full mt-2">
          <h3 className="font-bold uppercase tracking-widest mb-4 opacity-50 text-[10px]">
            Main Menu:
          </h3>
          {menus.map((menu, idx) => {
            const isSelected = idx === menuIndex;
            return (
              <div
                key={menu}
                onClick={() => {
                  setMenuIndex(idx);
                  setActiveSelection(menu);
                  triggerNavSpike();
                  addLogMessage(`UI_NAV_CLICK: [${menu}]`);
                  addLogMessage("LOAD_BALANCING_UI_THREAD...");
                  addLogMessage("PARSING_UPSTREAM_METRICS...");
                }}
                className={`p-2 transition-colors duration-75 flex gap-3 cursor-pointer hover:bg-black/5 ${isSelected ? `${theme.highlight} font-bold` : "opacity-60"}`}
              >
                <span>{menu}</span>
              </div>
            );
          })}
        </div>
      );
    }

    if (activeSelection === "02_CASE_STUDIES") {
      const activeTabName = tabs[tabIndex];

      return (
        <div className="flex flex-col h-full w-full">
          <div
            className={`flex gap-2 border-b-2 ${theme.border} pb-2 mb-4 shrink-0 overflow-x-auto [&::-webkit-scrollbar]:hidden pl-12`}
          >
            {tabs.map((tab, idx) => (
              <div
                key={tab}
                onClick={() => {
                  setTabIndex(idx);
                  triggerTabSpike();
                  addLogMessage(`UI_TAB_CLICK: [${tab}]`);
                  addLogMessage("HYDRATING_DOM_SUBTREE...");
                  addLogMessage("TRANSLATING_JSON_TO_UI_LAYER...");
                }}
                className={`px-2 py-1 text-[10px] font-bold tracking-widest uppercase rounded-sm cursor-pointer transition-all ${idx === tabIndex ? theme.highlight : "opacity-60 hover:opacity-100 hover:bg-black/5"}`}
              >
                [{tab}]
              </div>
            ))}
          </div>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto relative scroll-smooth [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex flex-col gap-4 font-mono text-[13px] leading-relaxed pb-10">
              {activeTabName === "OVERVIEW" && (
                <div>
                  <p className="font-bold mb-2">
                    <TerminalText>
                      INCIDENT: Cloud Security Alliance Automation
                    </TerminalText>
                  </p>
                  <p>
                    <TerminalText>
                      Spearheaded the reconstruction of core architectural 
                      infrastructure for institutional learning portals. 
                      Targeted legacy bottlenecks to achieve enterprise-grade 
                      performance and deployment velocity.
                    </TerminalText>
                  </p>
                </div>
              )}
              {activeTabName === "BREACH" && (
                <div>
                  <p className="font-bold mb-2">
                    <TerminalText>[ THE BREACH ]</TerminalText>
                  </p>
                  <p>
                    <TerminalText>
                      A legacy PHP monolith coupled with manual SCORM packaging 
                      procedures created severe friction in scaling efforts. 
                      Enterprise clients were facing unacceptable deployment 
                      latency and mounting technical debt.
                    </TerminalText>
                  </p>
                </div>
              )}
              {activeTabName === "DEPLOY" && (
                <div>
                  <p className="font-bold mb-2">
                    <TerminalText>[ THE DEPLOYMENT ]</TerminalText>
                  </p>
                  <p>
                    <TerminalText>
                      Engineered a robust Node.js CLI toolchain utilizing AST parsing 
                      for SCORM automation. Orchestrated a full migration to 
                      Next.js with React Server Components, optimizing for 
                      institutional-scale load patterns.
                    </TerminalText>
                  </p>
                </div>
              )}
              {activeTabName === "RESULT" && (
                <div>
                  <p className="font-bold mb-2">
                    <TerminalText>[ THE RESOLUTION ]</TerminalText>
                  </p>
                  <div className="space-y-2">
                    <p>
                      <TerminalText>
                        &gt; 50% increase in Time-to-Interactive (TTI).
                      </TerminalText>
                    </p>
                    <p>
                      <TerminalText>
                        &gt; Reduced manual deployment cycle from 45m to 12s.
                      </TerminalText>
                    </p>
                    <p>
                      <TerminalText>
                        &gt; Achieved 100% reliability in automated pipelines.
                      </TerminalText>
                    </p>
                  </div>
                </div>
              )}
              {activeTabName === "ASSETS" && (
                <div className="w-full h-[200px] relative overflow-hidden">
                  <div
                    className="flex gap-4 absolute inset-0 transition-transform duration-75 h-full"
                    style={{ transform: `translateX(-${panDepth}%)` }}
                  >
                    <div className="w-full shrink-0 border border-current p-4 flex flex-col h-full">
                      <p className="font-bold border-b border-current pb-2 mb-2">
                        [ ARCHITECTURE DIAGRAM ]
                      </p>
                      <div className="flex-1 bg-current opacity-10 flex items-center justify-center font-bold tracking-widest uppercase">
                        SYS_MAP_01.PNG
                      </div>
                    </div>
                    <div className="w-full shrink-0 border border-current p-4 flex flex-col h-full">
                      <p className="font-bold border-b border-current pb-2 mb-2">
                        [ SYSTEM LOGS ]
                      </p>
                      <div className="flex-1 bg-current opacity-10 flex items-center justify-center font-bold tracking-widest uppercase">
                        LAMBDA_TRACE.TXT
                      </div>
                    </div>
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
          {activeSelection === "01_WHO_AM_I" && (
            <div className="space-y-4">
              <p>
                <TerminalText>Jerod Hollen</TerminalText>
                <br />
                <TerminalText>Full Stack Engineer | Systems Architect</TerminalText>
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
                  Western Washington University (2022)
                  B.S. Computer Science
                </TerminalText>
              </p>
              <p>
                <TerminalText>
                  Based in Bellingham, WA. Currently advancing my expertise at 
                  Everett Community College.
                </TerminalText>
              </p>
            </div>
          )}
          {activeSelection === "03_ENGINEERING_STACK" && (
            <div className="space-y-4">
              <div>
                <p className="font-bold opacity-50 text-[10px] uppercase mb-1">Languages</p>
                <p>
                  &gt; <TerminalText>TypeScript</TerminalText>, <TerminalText>JavaScript</TerminalText>, Ruby, <TerminalText>PHP</TerminalText>, Python, SQL
                </p>
              </div>
              <div>
                <p className="font-bold opacity-50 text-[10px] uppercase mb-1">Frameworks</p>
                <p>
                  &gt; <TerminalText>React</TerminalText>, <TerminalText>Next.js</TerminalText>, <TerminalText>Node.js</TerminalText>, Ruby on Rails, Express
                </p>
              </div>
              <div>
                <p className="font-bold opacity-50 text-[10px] uppercase mb-1">Infrastructure</p>
                <p>
                  &gt; <TerminalText>AWS</TerminalText> (Lambda, S3, EC2), <TerminalText>PostgreSQL</TerminalText>, Prisma, Supabase, Docker
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
                &quot;Available for strategic roles and high-impact engineering challenges.&quot;
              </p>
            </div>
          )}
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
          onClick={() => {
            setActiveSelection(null);
            addLogMessage("SYSTEM_RESET: Returning to root");
          }}
          className={`absolute top-2 left-2 z-40 p-2 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center gap-2 group cursor-pointer ${theme.text}`}
          aria-label="Back to Main Menu"
        >
          <div className={`p-1 rounded-sm border-2 ${theme.border} group-hover:bg-black/5`}>
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
          <span className="text-[10px] font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            BACK
          </span>
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
