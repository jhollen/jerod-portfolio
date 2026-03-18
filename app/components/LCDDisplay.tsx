"use client";

import * as React from "react";
import { useConsoleStore } from "@/app/useConsoleStore";
import { BootScreen } from "./BootScreen";
import { motion, AnimatePresence } from "framer-motion";
import {
  PROJECTS_DATA,
  BIO_DATA,
  STACK_DATA,
  ProjectMedia,
} from "../constants";

interface LCDDisplayProps {
  menus: string[];
}

interface ThemeStyles {
  border: string;
  font: string;
  text: string;
  highlight: string;
  bg: string;
  led: string;
}

const NavigationHeader = ({
  title,
  backLabel,
  onBack,
  theme,
  children,
}: {
  title: string;
  backLabel: string;
  onBack: () => void;
  theme: ThemeStyles;
  children?: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const { triggerTabSpike } = useConsoleStore();

  return (
    <div className="flex items-center gap-2 mb-4 relative z-50 w-full overflow-hidden">
      <motion.button
        layout
        onMouseEnter={() => {
          setIsHovered(true);
          triggerTabSpike();
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onBack}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-1 px-2 py-1 border-2 ${theme.border} ${theme.font} text-[10px] md:text-xs font-black shadow-[1px_1px_0_rgba(0,0,0,0.1)] bg-white/10 backdrop-blur-md ${theme.text} shrink-0`}
      >
        <span className="text-sm">‹</span>
        <AnimatePresence mode="popLayout">
          {isHovered && (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="hidden md:block overflow-hidden whitespace-nowrap text-[9px] uppercase tracking-tighter pr-1"
            >
              {backLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <div
        className={`flex flex-1 items-center gap-4 min-w-0 border-b-2 border-current h-8 overflow-hidden ${theme.text}`}
      >
        <motion.h3
          layout
          className="text-xs md:text-sm font-black uppercase tracking-tighter whitespace-nowrap shrink-0"
        >
          {title}
        </motion.h3>

        {children && (
          <div className="flex flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden items-end h-full">
            <div className="flex gap-1 items-end pb-0.5">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export const LCDDisplay: React.FC<LCDDisplayProps> = ({ menus }) => {
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
    addLogMessage,
    triggerNavSpike,
    triggerTabSpike,
    activePreset,
  } = useConsoleStore();

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const scrollVelocity = React.useRef(0);

  React.useEffect(() => {
    let animationFrame: number;
    const performScroll = () => {
      if (scrollRef.current && scrollVelocity.current !== 0) {
        scrollRef.current.scrollTop += scrollVelocity.current;
      }
      animationFrame = requestAnimationFrame(performScroll);
    };
    animationFrame = requestAnimationFrame(performScroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleEdgeScroll = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    const { top, height } = scrollRef.current.getBoundingClientRect();
    const relativeY = e.clientY - top;
    const threshold = height * 0.2; // 20% edge zone

    if (relativeY < threshold) {
      // Negative velocity for scrolling up
      scrollVelocity.current = -((threshold - relativeY) / threshold) * 12;
    } else if (relativeY > height - threshold) {
      // Positive velocity for scrolling down
      scrollVelocity.current =
        ((relativeY - (height - threshold)) / threshold) * 12;
    } else {
      scrollVelocity.current = 0;
    }
  };

  React.useEffect(() => {
    if (isBooting) {
      const t = setTimeout(() => setBooting(false), 5500);
      return () => clearTimeout(t);
    }
  }, [isBooting, setBooting]);

  const isRetro = activePreset === "RETRO";
  const isHacker = activePreset === "HACKER";
  const isKindle = !isRetro && !isHacker;

  const theme: ThemeStyles = React.useMemo(() => {
    if (isRetro) {
      return {
        bg: "bg-[#2a1a0a]",
        text: "text-[#ffb000]",
        highlight: "bg-[#ffb000] text-[#2a1a0a]",
        border: "border-[#ffb000]",
        font: "font-mono",
        led: "bg-[#ffb000]",
      };
    }
    if (isHacker) {
      return {
        bg: "bg-[#050a15]",
        text: "text-[#00f3ff]",
        highlight: "bg-[#00f3ff] text-[#050a15]",
        border: "border-[#00f3ff]",
        font: "font-mono",
        led: "bg-[#00f3ff]",
      };
    }
    return {
      bg: "bg-[#e8e9e4]",
      text: "text-black",
      highlight: "bg-black text-[#e8e9e4]",
      border: "border-black",
      font: "font-serif",
      led: "bg-black",
    };
  }, [isRetro, isHacker]);

  const tier = contentDepth < 34 ? 0 : contentDepth < 67 ? 1 : 2;

  const handleReturnToSystem = () => {
    setActiveSelection(null);
    setMenuIndex(0);
    setContentDepth(0);
    setPanDepth(0);
    setTabIndex(0);
    addLogMessage("SYSTEM: RESET_TO_ROOT");
  };

  const handleProjectBack = () => {
    setSelectedProject(null);
    setTabIndex(0);
    setPanDepth(0);
    addLogMessage("SYSTEM: RETURN_TO_PROJECT_INDEX");
  };

  const zoomIn = () => {
    const nextTier = Math.min(2, tier + 1);
    if (nextTier === 1) setContentDepth(50);
    if (nextTier === 2) setContentDepth(100);
    addLogMessage(`SYSTEM: ZOOM_IN_LEVEL_${nextTier}`);
    triggerTabSpike();
  };

  const zoomOut = () => {
    const nextTier = Math.max(0, tier - 1);
    if (nextTier === 0) setContentDepth(0);
    if (nextTier === 1) setContentDepth(50);
    addLogMessage(`SYSTEM: ZOOM_OUT_LEVEL_${nextTier}`);
    triggerTabSpike();
  };

  const handleResetActivity = () => {
    scrollVelocity.current = 0; // Stop auto-scrolling
    useConsoleStore.getState().setNavActivity(0);
    useConsoleStore.getState().setTabActivity(0);
  };

  const renderControlColumn = () => (
    <div
      className={`hidden md:flex w-16 border-l-2 ${theme.border} flex flex-col items-center justify-center gap-4 px-1 shrink-0`}
    >
      <button
        onClick={zoomIn}
        onMouseEnter={() => triggerNavSpike()}
        disabled={tier === 2}
        className={`w-full py-2 border-2 ${theme.border} ${theme.font} text-[8px] font-black uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all disabled:opacity-20 shadow-[1px_1px_0_rgba(0,0,0,0.1)] ${theme.text}`}
      >
        [ + ]
      </button>
      <div
        className={`flex flex-col gap-1.5 opacity-40 text-[7px] font-black uppercase tracking-widest pointer-events-none items-center ${theme.text}`}
      >
        <div
          onMouseEnter={() => triggerNavSpike()}
          className={`transition-all duration-300 ${tier === 0 ? "opacity-100 scale-110 font-black" : ""}`}
        >
          T0
        </div>
        <div
          onMouseEnter={() => triggerNavSpike()}
          className={`transition-all duration-300 ${tier === 1 ? "opacity-100 scale-110 font-black" : ""}`}
        >
          T1
        </div>
        <div
          onMouseEnter={() => triggerNavSpike()}
          className={`transition-all duration-300 ${tier === 2 ? "opacity-100 scale-110 font-black" : ""}`}
        >
          T2
        </div>
      </div>
      <button
        onClick={zoomOut}
        onMouseEnter={() => triggerNavSpike()}
        disabled={tier === 0}
        className={`w-full py-2 border-2 ${theme.border} ${theme.font} text-[8px] font-black uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all disabled:opacity-20 shadow-[1px_1px_0_rgba(0,0,0,0.1)] ${theme.text}`}
      >
        [ - ]
      </button>
    </div>
  );

  const renderBio = () => (
    <div
      className={`space-y-6 ${theme.font} ${theme.text} text-[14px] md:text-[16px] leading-relaxed relative h-full pt-4 flex pl-4 md:pl-10`}
    >
      <div className="flex-1 flex flex-col pr-4">
        <NavigationHeader
          title="BIO"
          backLabel="Return to System"
          onBack={handleReturnToSystem}
          theme={theme}
        />

        <div className="flex-1 overflow-y-auto md:overflow-y-auto custom-scrollbar pr-4">
          {tier === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <p>{BIO_DATA.tier1_base}</p>
            </motion.div>
          )}

          {tier === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <p className="border-l-4 border-current pl-4 italic text-sm font-black underline decoration-dotted">
                Career Timeline Expansion:
              </p>
              <p>{BIO_DATA.tier2_timeline}</p>
            </motion.div>
          )}

          {tier === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <p className="font-bold uppercase tracking-widest text-xs opacity-50 underline decoration-dotted">
                Operational Empathy & Current Status
              </p>
              <p>{BIO_DATA.tier3_deepDive}</p>
            </motion.div>
          )}
        </div>
      </div>
      {renderControlColumn()}
    </div>
  );

  const renderStack = () => (
    <div
      className={`space-y-6 ${theme.font} ${theme.text} text-[14px] md:text-[15px] leading-relaxed relative h-full pt-4 flex pl-4 md:pl-10`}
    >
      <div className="flex-1 flex flex-col pr-4">
        <NavigationHeader
          title="STACK"
          backLabel="Return to System"
          onBack={handleReturnToSystem}
          theme={theme}
        />

        <div className="flex-1 overflow-y-auto md:overflow-y-auto custom-scrollbar pr-4">
          {tier === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 py-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {STACK_DATA.map((s) => (
                  <div
                    key={s.era}
                    onMouseEnter={() => triggerNavSpike()}
                    className={`border border-current p-3 text-center bg-current/5`}
                  >
                    <p className="text-[10px] opacity-50 font-black">{s.era}</p>
                    <p className="font-black text-xs">{s.title}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {tier === 1 && (
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest font-black opacity-50 underline decoration-dotted mb-4">
                Languages & Telemetry:
              </p>
              {STACK_DATA.map((s) => (
                <div
                  key={s.era}
                  onMouseEnter={() => triggerNavSpike()}
                  className="border-l-2 border-current pl-4 mb-4"
                >
                  <p className="text-xs font-black uppercase">{s.title}</p>
                  <p className="text-[11px] font-bold opacity-80">
                    {s.languages.join(" • ")}
                  </p>
                  <p className="text-[9px] italic font-mono opacity-40 mt-1">
                    {s.telemetry}
                  </p>
                </div>
              ))}
            </div>
          )}

          {tier === 2 && (
            <div className="space-y-4 text-sm">
              <p className="text-xs uppercase tracking-widest font-black opacity-50 underline decoration-dotted mb-4">
                The Grit (Challenges Overcome):
              </p>
              <div className="space-y-4">
                {STACK_DATA.map((s) => (
                  <div
                    key={s.era}
                    onMouseEnter={() => triggerNavSpike()}
                    className="border-b border-current/10 pb-2"
                  >
                    <p className="text-[9px] font-black opacity-40 uppercase tracking-tighter">
                      {s.title}
                    </p>
                    <p className="italic font-medium leading-tight">{s.grit}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {renderControlColumn()}
    </div>
  );

  const renderProjects = () => {
    const categories = [
      "ALL",
      ...Array.from(
        new Set(PROJECTS_DATA.map((p) => p.category.split(" / ")[0])),
      ),
    ];
    const activeCategory = categories[tabIndex % categories.length];

    const filteredProjects =
      activeCategory === "ALL"
        ? PROJECTS_DATA
        : PROJECTS_DATA.filter((p) => p.category.startsWith(activeCategory));

    if (selectedProject) {
      const p = PROJECTS_DATA.find((proj) => proj.id === selectedProject);
      if (!p) return null;

      const tabs = ["OVERVIEW", "THE BREACH", "DEPLOYMENT", "RESULTS", "MEDIA"];
      const currentTabIdx = Math.min(tabIndex, tabs.length - 1);

      return (
        <div
          className={`flex flex-col h-full w-full relative pt-4 pl-4 md:pl-10 ${theme.text}`}
        >
          <div className="flex-1 flex flex-col pr-4">
            <NavigationHeader
              title={p.title}
              backLabel="Return to Index"
              onBack={handleProjectBack}
              theme={theme}
            >
              {tabs.map((label, i) => (
                <button
                  key={label}
                  onMouseEnter={() => triggerTabSpike()}
                  onClick={() => {
                    setTabIndex(i);
                    triggerTabSpike();
                  }}
                  className={`px-2 py-1 text-[8px] md:text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                    i === currentTabIdx
                      ? "opacity-100 scale-105 font-black"
                      : "opacity-40 hover:opacity-60 font-medium"
                  }`}
                >
                  {label}
                </button>
              ))}
            </NavigationHeader>

            <div className="flex-1 pb-12 md:pb-20 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedProject}-tab-${currentTabIdx}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col"
                >
                  <div className="text-[14px] leading-relaxed flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {currentTabIdx === 0 && <p>{p.overview}</p>}
                    {currentTabIdx === 1 && <p>{p.breach}</p>}
                    {currentTabIdx === 2 && <p>{p.deploy}</p>}
                    {currentTabIdx === 3 && <p>{p.result}</p>}
                    {currentTabIdx === 4 && (
                      <div className="space-y-6">
                        <div className="flex gap-4 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden">
                          {p.media?.map((m: ProjectMedia, i: number) => {
                            const assetCount = p.media?.length || 0;
                            const isActive =
                              Math.min(
                                Math.floor((panDepth / 100) * assetCount),
                                assetCount - 1,
                              ) === i;
                            return (
                              <div
                                key={i}
                                onMouseEnter={() => triggerTabSpike()}
                                className={`min-w-[280px] border-2 ${theme.border} p-4 bg-white/5 snap-center transition-all ${isActive ? "scale-105 border-current shadow-[0_0_15px_rgba(0,0,0,0.2)]" : "opacity-40"}`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <span
                                    className={`text-[8px] font-black uppercase px-1.5 py-0.5 ${theme.highlight}`}
                                  >
                                    {m.type}
                                  </span>
                                  <span className="text-[10px] font-black opacity-40">
                                    0{i + 1}
                                  </span>
                                </div>
                                <h5 className="font-black text-xs mb-2 uppercase">
                                  {m.label}
                                </h5>
                                <p className="text-[11px] italic opacity-70 leading-snug">
                                  {m.description}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                        <div className="border-t border-current/10 pt-4">
                          <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-2">
                            Technical Telemetry:
                          </p>
                          <p className="text-[11px] font-mono opacity-60 bg-black/20 p-2 rounded whitespace-pre-wrap">
                            {`> HORIZONTAL_ASSETS_LOADED: ${p.media?.length || 0}\n> PAN_CONTROL: ACTIVE\n> SCRUB_CONTROL: DISABLED`}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`flex flex-col h-full w-full relative overflow-hidden pt-2 px-4 md:px-0 ${theme.text} ${theme.font} flex pl-4 md:pl-10`}
      >
        <div className="flex-1 flex flex-col pr-4">
          <NavigationHeader
            title="PROJECTS"
            backLabel="Return to System"
            onBack={handleReturnToSystem}
            theme={theme}
          >
            {categories.map((cat, i) => (
              <button
                key={cat}
                onMouseEnter={() => triggerTabSpike()}
                onClick={() => {
                  setTabIndex(i);
                  triggerTabSpike();
                }}
                className={`px-2 py-1 text-[8px] md:text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 outline-none ${
                  i === tabIndex
                    ? "opacity-100 scale-105 font-black"
                    : "opacity-30 hover:opacity-60 font-medium"
                }`}
              >
                {cat}
              </button>
            ))}
          </NavigationHeader>

          {/* Project List (Vertical Scroll) */}
          <div
            ref={scrollRef}
            onMouseMove={handleEdgeScroll}
            className="flex-1 overflow-y-auto custom-scrollbar pr-4 pb-10"
          >
            <div className="space-y-4">
              {filteredProjects.map((p, idx) => (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onMouseEnter={() => triggerNavSpike()}
                  onClick={() => {
                    setSelectedProject(p.id);
                    setTabIndex(0);
                    triggerNavSpike();
                    addLogMessage(`MOUNT: ${p.id}`);
                  }}
                  className={`w-full text-left group border-2 ${theme.border} p-3 md:p-4 hover:bg-current/5 transition-all outline-none focus:ring-2 focus:ring-current/20 relative shadow-[4px_4px_0_rgba(0,0,0,0.1)] bg-white/5 flex flex-col gap-2 ${theme.text}`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-black uppercase tracking-tight text-sm md:text-base leading-none">
                      {p.title}
                    </h4>
                    {tier > 0 && (
                      <span
                        className={`text-[8px] font-bold border ${theme.border} px-1.5 py-0.5 ${theme.highlight} uppercase tracking-tighter`}
                      >
                        {p.category.split(" / ")[0]}
                      </span>
                    )}
                  </div>

                  {tier >= 1 && (
                    <p className="text-[11px] md:text-[12px] italic opacity-70 border-l border-current/30 pl-3 py-0.5 line-clamp-1">
                      {p.overview}
                    </p>
                  )}

                  {tier === 2 && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1 pt-2 border-t border-current/10 mt-1">
                      {p.stack.slice(0, 5).map((item) => (
                        <span
                          key={item}
                          className="text-[8px] font-bold uppercase tracking-widest opacity-50"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.button>
              ))}

              {filteredProjects.length === 0 && (
                <div className="py-20 text-center opacity-30 italic text-xs uppercase tracking-widest">
                  No projects in this category
                </div>
              )}
            </div>
          </div>
        </div>
        {renderControlColumn()}
      </div>
    );
  };

  const renderContact = () => (
    <div
      className={`space-y-6 ${theme.font} ${theme.text} text-[14px] md:text-[15px] leading-relaxed relative h-full pt-4 flex pl-4 md:pl-10`}
    >
      <div className="flex-1 flex flex-col pr-4">
        <NavigationHeader
          title="CONTACT"
          backLabel="Return to System"
          onBack={handleReturnToSystem}
          theme={theme}
        />

        <div className="space-y-6 py-4 pr-4 overflow-y-auto custom-scrollbar h-full pb-20">
          <div className="border-4 border-current/30 p-4 md:p-6 bg-current/5 space-y-4 shadow-[8px_8px_0_rgba(0,0,0,0.1)]">
            <p className="font-black text-center border-b border-current/20 pb-4 tracking-[0.2em] uppercase text-[10px] md:text-xs underline decoration-dotted">
              UPLINK_STABLE: AWAITING_INPUT
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div onMouseEnter={() => triggerNavSpike()}>
                  <p className="text-[9px] md:text-[10px] opacity-40 uppercase mb-1 font-black">
                    Email
                  </p>
                  <p className="font-bold underline decoration-dotted break-all">
                    jerod.a.hollen@gmail.com
                  </p>
                </div>
                <div onMouseEnter={() => triggerNavSpike()}>
                  <p className="text-[9px] md:text-[10px] opacity-40 uppercase mb-1 font-black">
                    GitHub
                  </p>
                  <p className="font-bold underline decoration-dotted">
                    github.com/jhollen
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div onMouseEnter={() => triggerNavSpike()}>
                  <p className="text-[9px] md:text-[10px] opacity-40 uppercase mb-1 font-black">
                    LinkedIn
                  </p>
                  <p className="font-bold underline decoration-dotted">
                    in/jerodhollen
                  </p>
                </div>
                <div className="pt-2 italic text-[11px] md:text-xs border-t border-current/10 opacity-60 font-medium">
                  &quot;Strategic high-impact engineering roles only.&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMainMenu = () => (
    <div
      className={`flex flex-col gap-2 w-full mt-2 ${theme.text} ${theme.font} px-4 md:px-0`}
    >
      <h3 className="font-black uppercase tracking-widest mb-4 opacity-50 text-[10px]">
        Main Menu:
      </h3>
      {menus.map((menu, idx) => {
        const friendlyNames = ["Bio", "Projects", "Stack", "Contact"];
        const name = friendlyNames[idx] || menu;
        return (
          <button
            key={menu}
            onMouseEnter={() => {
              setMenuIndex(idx);
              triggerNavSpike();
            }}
            onClick={() => {
              setActiveSelection(menu);
              setMenuIndex(0);
              triggerNavSpike();
              addLogMessage(`EXEC: [${name}]`);
            }}
            className={`p-3 md:p-3 transition-all duration-75 flex gap-3 cursor-pointer text-left w-full outline-none focus:ring-4 focus:ring-inset focus:ring-current/20 border-l-4 border-transparent ${idx === menuIndex ? `${theme.highlight} font-black border-current translate-x-2` : "opacity-60 hover:bg-black/5 hover:translate-x-1"}`}
          >
            {`${idx + 1}. ${name.toUpperCase()}`}
          </button>
        );
      })}
    </div>
  );

  const renderMainContent = () => {
    if (isBooting) return <BootScreen theme={theme} />;
    if (!activeSelection) return renderMainMenu();
    if (activeSelection === "BIO") return renderBio();
    if (activeSelection === "PROJECTS") return renderProjects();
    if (activeSelection === "STACK") return renderStack();
    if (activeSelection === "CONTACT") return renderContact();
    return null;
  };

  return (
    <div
      className={`w-full h-full md:aspect-[16/9] md:max-h-[400px] ${theme.bg} md:border-[25px] border-black p-3 md:p-6 relative md:shadow-[0_10px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col shrink-0 transition-colors duration-700`}
      onMouseLeave={handleResetActivity}
    >
      <div
        className={`absolute inset-0 pointer-events-none ${isKindle ? "shadow-[inset:0_0_100px_rgba(0,0,0,0.05)]" : "shadow-[inset:0_0_150px_rgba(0,0,0,0.3)]"} z-20`}
      />

      {!isBooting && !isKindle && (
        <div className="absolute inset-0 scanlines opacity-10 z-30 pointer-events-none" />
      )}

      <div
        className={`flex-1 h-full overflow-hidden leading-relaxed tracking-wide relative z-10`}
      >
        <div className="absolute inset-0 overflow-y-auto md:overflow-visible text-[14px]">
          {renderMainContent()}
        </div>
      </div>

      <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none opacity-10 text-[7px] tracking-[1.5em] font-mono uppercase z-40">
        {isHacker
          ? "Hollen OS // Neural Link"
          : isRetro
            ? "WA76 // ANALOG INTERFACE"
            : "Kindle Paperwhite"}
      </div>
    </div>
  );
};
