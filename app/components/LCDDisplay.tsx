"use client";

import * as React from "react";
import { useConsoleStore } from "@/app/useConsoleStore";
import { BootScreen } from "./BootScreen";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS_DATA, BIO_DATA, STACK_DATA } from "../constants";

interface LCDDisplayProps {
  menus: string[];
}

interface ThemeStyles {
  border: string;
  font: string;
  text: string;
  led: string;
}

const NavigationHeader = ({
  title,
  backLabel,
  onBack,
  theme,
}: {
  title: string;
  backLabel: string;
  onBack: () => void;
  theme: ThemeStyles;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="flex items-center gap-3 mb-6 relative z-50">
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onBack}
        className={`flex items-center gap-1.5 px-2.5 py-1 border-2 ${theme.border} ${theme.font} text-xs font-black hover:scale-105 active:scale-95 transition-all shadow-[2px_2px_0_rgba(0,0,0,0.1)] bg-white/10 backdrop-blur-md ${theme.text} shrink-0`}
      >
        <span className="text-sm">‹</span>
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="overflow-hidden whitespace-nowrap text-[10px] uppercase tracking-tighter pr-1"
            ></motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <motion.h3
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="text-xl font-black border-b-2 border-current flex-1 flex justify-between items-end text-lg uppercase tracking-tighter h-9"
      >
        {title}
      </motion.h3>
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
    triggerNavDance,
    triggerTabSpike,
    setNavActivity,
    activePreset,
  } = useConsoleStore();

  React.useEffect(() => {
    if (isBooting) {
      const t = setTimeout(() => setBooting(false), 6800);
      return () => clearTimeout(t);
    }
  }, [isBooting, setBooting]);

  const isRetro = activePreset === "RETRO";
  const isHacker = activePreset === "HACKER";
  const isKindle = !isRetro && !isHacker;

  const theme = React.useMemo(() => {
    if (isRetro) {
      return {
        bg: "bg-[#2a1a0a]",
        text: "text-black",
        highlight: "bg-[#ffb000] text-black",
        border: "border-black",
        font: "font-mono",
        led: "bg-black",
      };
    }
    if (isHacker) {
      return {
        bg: "bg-[#050a15]",
        text: "text-black",
        highlight: "bg-[#00f3ff] text-black",
        border: "border-black",
        font: "font-mono",
        led: "bg-black",
      };
    }
    // Kindle Default: Pure Black Text
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

  const renderControlColumn = () => (
    <div
      className={`w-24 border-l-2 ${theme.border} flex flex-col items-center justify-center gap-6 px-2 shrink-0`}
    >
      <button
        onClick={zoomIn}
        disabled={tier === 2}
        className={`w-full py-3 border-2 ${theme.border} ${theme.font} text-[9px] font-black uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all disabled:opacity-20 shadow-[2px_2px_0_rgba(0,0,0,0.1)] ${theme.text}`}
      >
        [ + ]<br />
        ZOOM IN
      </button>
      <div className="flex flex-col gap-2 opacity-40 text-[8px] font-black uppercase tracking-widest pointer-events-none items-center">
        <div
          className={`transition-all duration-300 ${tier === 0 ? "opacity-100 scale-125 font-black underline" : ""}`}
        >
          T0
        </div>
        <div
          className={`transition-all duration-300 ${tier === 1 ? "opacity-100 scale-125 font-black underline" : ""}`}
        >
          T1
        </div>
        <div
          className={`transition-all duration-300 ${tier === 2 ? "opacity-100 scale-125 font-black underline" : ""}`}
        >
          T2
        </div>
      </div>
      <button
        onClick={zoomOut}
        disabled={tier === 0}
        className={`w-full py-3 border-2 ${theme.border} ${theme.font} text-[9px] font-black uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all disabled:opacity-20 shadow-[2px_2px_0_rgba(0,0,0,0.1)] ${theme.text}`}
      >
        [ - ]<br />
        ZOOM OUT
      </button>
    </div>
  );

  const renderBottomNav = (
    currentIdx: number,
    total: number,
    onPrev: () => void,
    onNext: () => void,
  ) => (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-8 z-50">
      <button
        onClick={onPrev}
        disabled={currentIdx === 0}
        className={`p-3 -m-3 text-xl font-black transition-all disabled:opacity-5 hover:scale-150 active:scale-95 ${theme.text} flex items-center justify-center`}
        aria-label="Previous"
      >
        ‹
      </button>

      <div className="flex gap-2.5 items-center">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (activeSelection === "PROJECTS" && !selectedProject) {
                setPanDepth((i / (total - 1)) * 100);
              } else {
                setTabIndex(i);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIdx ? `scale-125 bg-current opacity-100 shadow-[0_0_8px_currentColor]` : "bg-current opacity-20 hover:opacity-40"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={currentIdx === total - 1}
        className={`p-3 -m-3 text-xl font-black transition-all disabled:opacity-5 hover:scale-150 active:scale-95 ${theme.text} flex items-center justify-center`}
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );

  const renderBio = () => (
    <div
      className={`space-y-6 ${theme.font} ${theme.text} text-[16px] leading-relaxed relative h-full pt-4 flex pl-10`}
    >
      <div className="flex-1 flex flex-col pr-4">
        <NavigationHeader
          title="BIO"
          backLabel="Return to System"
          onBack={handleReturnToSystem}
          theme={theme}
        />

        <div className="flex-1 overflow-y-auto  custom-scrollbar pr-4">
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
      className={`space-y-6 ${theme.font} ${theme.text} text-[15px] leading-relaxed relative h-full pt-4 flex pl-10`}
    >
      <div className="flex-1 flex flex-col pr-4">
        <NavigationHeader
          title="STACK"
          backLabel="Return to System"
          onBack={handleReturnToSystem}
          theme={theme}
        />

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
          {tier === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 py-4"
            >
              <div className="grid grid-cols-2 gap-4">
                {STACK_DATA.map((s) => (
                  <div
                    key={s.era}
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
                  <div key={s.era} className="border-b border-current/10 pb-2">
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
    if (!selectedProject) {
      const currentProjIdx = Math.min(
        Math.floor((panDepth / 100) * PROJECTS_DATA.length),
        PROJECTS_DATA.length - 1,
      );
      const p = PROJECTS_DATA[currentProjIdx];

      return (
        <div
          className={`flex flex-col h-full w-full relative overflow-hidden ${theme.text} ${theme.font} pt-2`}
        >
          <NavigationHeader
            title="PROJECTS"
            backLabel="Return to System"
            onBack={handleReturnToSystem}
            theme={theme}
          />

          <div className="flex-1 pr-4 pb-20 flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.button
                key={p.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                onClick={() => {
                  setSelectedProject(p.id);
                  setTabIndex(0);
                  triggerNavSpike();
                  addLogMessage(`MOUNT: ${p.id}`);
                }}
                className={`group border-4 ${theme.border} p-6 hover:bg-current/5 text-left w-full  flex flex-col justify-between outline-none focus:ring-4 focus:ring-current/10 relative transition-all shadow-[8px_8px_0_rgba(0,0,0,0.15)] bg-white/5`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-black uppercase tracking-wide text-lg leading-tight w-2/3">
                      {p.title}
                    </h4>
                    <span
                      className={`text-[10px] font-bold border ${theme.border} px-2 py-0.5 whitespace-nowrap ${theme.highlight} uppercase tracking-tighter shadow-sm`}
                    >
                      {p.category}
                    </span>
                  </div>
                  <p className="text-[13px] leading-relaxed mb-4 italic opacity-80 border-l-2 border-current/20 pl-4 py-1">
                    {p.overview}
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-3 border-t border-current/10">
                  {p.stack.map((item) => (
                    <span
                      key={item}
                      className="text-[9px] font-bold uppercase tracking-widest opacity-60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.button>
            </AnimatePresence>
          </div>

          {renderBottomNav(
            currentProjIdx,
            PROJECTS_DATA.length,
            () =>
              setPanDepth(
                (Math.max(0, currentProjIdx - 1) / (PROJECTS_DATA.length - 1)) *
                  100,
              ),
            () =>
              setPanDepth(
                (Math.min(PROJECTS_DATA.length - 1, currentProjIdx + 1) /
                  (PROJECTS_DATA.length - 1)) *
                  100,
              ),
          )}
        </div>
      );
    }

    const p = PROJECTS_DATA.find((proj) => proj.id === selectedProject);
    if (!p) return null;

    const tabs = ["OVERVIEW", "THE BREACH", "DEPLOYMENT", "RESULTS"];
    const currentTabIdx = Math.min(tabIndex, tabs.length - 1);

    return (
      <div
        className={`flex flex-col h-full w-full relative ${theme.text} ${theme.font} pt-4 pl-10`}
      >
        <NavigationHeader
          title={p.title}
          backLabel="Return to Index"
          onBack={handleProjectBack}
          theme={theme}
        />

        {/* Fixed Tab Header */}
        <div className="flex border-b border-current/20 mb-4 mr-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {tabs.map((label, i) => (
            <button
              key={label}
              onClick={() => {
                setTabIndex(i);
                triggerTabSpike();
              }}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap border-b-2 transition-all ${
                i === currentTabIdx
                  ? "border-current opacity-100 scale-105"
                  : "border-transparent opacity-40 hover:opacity-60"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 pr-4 pb-20 overflow-hidden relative">
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
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {renderBottomNav(
          currentTabIdx,
          4,
          () => setTabIndex(Math.max(0, currentTabIdx - 1)),
          () => setTabIndex(Math.min(3, currentTabIdx + 1)),
        )}
      </div>
    );
  };

  const renderContact = () => (
    <div
      className={`space-y-6 ${theme.font} ${theme.text} text-[15px] leading-relaxed relative h-full pt-4 pl-10`}
    >
      <NavigationHeader
        title="CONTACT"
        backLabel="Return to System"
        onBack={handleReturnToSystem}
        theme={theme}
      />

      <div className="space-y-6 py-4 pr-4">
        <div className="border-4 border-current/30 p-6 bg-current/5 space-y-4 shadow-[8px_8px_0_rgba(0,0,0,0.1)]">
          <p className="font-black text-center border-b border-current/20 pb-4 tracking-[0.2em] uppercase text-xs underline decoration-dotted">
            UPLINK_STABLE: AWAITING_INPUT
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] opacity-40 uppercase mb-1 font-black">
                  Email
                </p>
                <p className="font-bold underline decoration-dotted">
                  jerod.a.hollen@gmail.com
                </p>
              </div>
              <div>
                <p className="text-[10px] opacity-40 uppercase mb-1 font-black">
                  GitHub
                </p>
                <p className="font-bold underline decoration-dotted">
                  github.com/jhollen
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] opacity-40 uppercase mb-1 font-black">
                  LinkedIn
                </p>
                <p className="font-bold underline decoration-dotted">
                  in/jerodhollen
                </p>
              </div>
              <div className="pt-2 italic text-xs border-t border-current/10 opacity-60 font-medium">
                &quot;Strategic high-impact engineering roles only.&quot;
              </div>
            </div>
          </div>
        </div>
        <div className="sr-only">
          Contact Jerod Hollen: jerod.a.hollen@gmail.com. Expertise in React,
          Node, Python, AWS, Cloud Security.
        </div>
      </div>
    </div>
  );

  const renderMainMenu = () => (
    <div
      className={`flex flex-col gap-2 w-full mt-2 ${theme.text} ${theme.font}`}
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
              triggerNavDance();
            }}
            onMouseLeave={() => setNavActivity(0)}
            onClick={() => {
              setActiveSelection(menu);
              setMenuIndex(0);
              triggerNavSpike();
              addLogMessage(`EXEC: [${name}]`);
            }}
            className={`p-3 transition-all duration-75 flex gap-3 cursor-pointer text-left w-full outline-none focus:ring-4 focus:ring-inset focus:ring-current/20 border-l-4 border-transparent ${idx === menuIndex ? `${theme.highlight} font-black border-current translate-x-2` : "opacity-60 hover:bg-black/5 hover:translate-x-1"}`}
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
      className={`w-full aspect-[16/9] max-h-[400px] ${theme.bg} border-[25px] border-black p-3 md:p-6 relative shadow-[0_10px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col shrink-0 transition-all duration-700`}
    >
      <div
        className={`absolute inset-0 pointer-events-none ${isKindle ? "shadow-[inset:0_0_100px_rgba(0,0,0,0.05)]" : "shadow-[inset:0_0_150px_rgba(0,0,0,0.3)]"} z-20`}
      />

      {!isBooting && !isKindle && (
        <div className="absolute inset-0 scanlines opacity-10 z-30 pointer-events-none" />
      )}

      <div
        className={`flex-1 h-full overflow-hidden leading-relaxed tracking-wide relative transition-colors duration-300 z-10`}
      >
        <div className="absolute inset-0 transition-transform duration-75 ease-linear">
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
