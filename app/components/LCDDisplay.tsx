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
            <span
              key={i}
              className="text-cyan-400 font-bold glow-text"
            >
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
                  addLogMessage(`CLICK_NAV: ${menu}`);
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

    if (activeSelection === "02_INCIDENTS") {
      const activeTabName = tabs[tabIndex];

      return (
        <div className="flex flex-col h-full w-full">
          <div
            className={`flex gap-2 border-b-2 ${theme.border} pb-2 mb-4 shrink-0 overflow-x-auto [&::-webkit-scrollbar]:hidden`}
          >
            {tabs.map((tab, idx) => (
              <div
                key={tab}
                onClick={() => {
                  setTabIndex(idx);
                  addLogMessage(`CLICK_TAB: ${tab}`);
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
                      INCIDENT: Cloud Security Alliance
                    </TerminalText>
                  </p>
                  <p>
                    <TerminalText>
                      Reconstructed the core architecture for institutional
                      learning portals, targeting extreme load times and
                      deployment bottlenecks.
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
                      Legacy PHP monolith and manual SCORM packaging procedures
                      severely hampered scaling efforts and caused significant
                      friction for enterprise clients.
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
                      Engineered a Node.js CLI toolchain for AST parsing and
                      SCORM automation. Migrated core frontend to Next.js 13 App
                      Router with React Server Components.
                    </TerminalText>
                  </p>
                </div>
              )}
              {activeTabName === "RESULT" && (
                <div>
                  <p className="font-bold mb-2">
                    <TerminalText>[ THE RESOLUTION ]</TerminalText>
                  </p>
                  <p>
                    <TerminalText>
                      &gt; 50% performance increase in TTI.
                    </TerminalText>
                  </p>
                  <p>
                    <TerminalText>
                      &gt; Reduced manual deployment from 45 mins to 12 secs.
                    </TerminalText>
                  </p>
                  <p>
                    <TerminalText>
                      &gt; Achieved 0% defect rate in automated pipelines.
                    </TerminalText>
                  </p>
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
          <h3 className="font-bold uppercase tracking-widest mb-2 border-b border-current pb-2">
            {activeSelection}
          </h3>
          {activeSelection === "01_PROFILE" && (
            <p>
              <TerminalText>Jerod Hollen</TerminalText>
              <br />
              <TerminalText>Full Stack Engineer</TerminalText>
              <br />
              <br />
              <TerminalText>Western Washington University (2022)</TerminalText>
              <br />
              <TerminalText>B.S. Computer Science</TerminalText>
              <br />
              <br />
              <TerminalText>
                Based in Bellingham, WA. Studying at Everett Community College.
              </TerminalText>
            </p>
          )}
          {activeSelection === "03_TECH_STACK" && (
            <p>
              &gt; <TerminalText>React</TerminalText> / <TerminalText>Next.js</TerminalText>
              <br />
              &gt; <TerminalText>TypeScript</TerminalText>
              <br />
              &gt; <TerminalText>Tailwind CSS</TerminalText>
              <br />
              &gt; <TerminalText>Node.js</TerminalText>
              <br />
              &gt; Ruby on Rails
              <br />
              &gt; <TerminalText>PostgreSQL</TerminalText>
              <br />
              &gt; <TerminalText>AWS</TerminalText>
            </p>
          )}
          {activeSelection === "04_CONTACT" && (
            <p>
              COMM_LINK_ESTABLISHED
              <br />
              <br />
              Email: hello@example.com
              <br />
              GitHub: github.com/jerodhollen
              <br />
              LinkedIn: in/jerodhollen
            </p>
          )}
          {activeSelection === "MUSIC" && (
            <p>
              BOGARDT_OS_ACTIVE
              <br />
              <br />
              Loading audio interfaces...
              <br />
              Mounting VST plugins...
              <br />
              Ready.
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`w-full aspect-[16/9] max-h-[400px] ${theme.bg} border-[30px] border-[#0a0a0a] p-3 md:p-4 relative shadow-[inset_0_4px_20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col shrink-0 transition-colors duration-300`}
    >
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
