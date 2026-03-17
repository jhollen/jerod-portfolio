"use client";

import * as React from "react";
import { useConsoleStore } from "@/app/useConsoleStore";
import { BootScreen } from "./BootScreen";
import { motion, AnimatePresence } from "framer-motion";
import { TypewriterText } from "./TypewriterText";
import { PROJECTS } from "../constants";

interface LCDDisplayProps {
  menus: string[];
}

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
    setNavActivity,
    activePreset,
  } = useConsoleStore();

  React.useEffect(() => {
    if (isBooting) {
      const t = setTimeout(() => setBooting(false), 4800); 
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
    // Kindle Default
    return { 
      bg: "bg-[#e8e9e4]", 
      text: "text-[#1a1a1a]", 
      highlight: "bg-[#1a1a1a] text-[#e8e9e4]", 
      border: "border-[#1a1a1a]",
      font: "font-serif",
      led: "bg-[#1a1a1a]",
    };
  }, [isRetro, isHacker]);

  const tier = contentDepth < 34 ? 1 : contentDepth < 67 ? 2 : 3;

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

  const setTier = (t: number) => {
    if (t === 1) setContentDepth(0);
    if (t === 2) setContentDepth(50);
    if (t === 3) setContentDepth(100);
  };

  const renderReturnButton = () => (
    <button 
      onClick={handleReturnToSystem}
      className={`absolute bottom-4 left-4 z-50 px-3 py-1.5 border-2 ${theme.border} ${theme.font} text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[4px_4px_0_rgba(0,0,0,0.2)] bg-white/10 backdrop-blur-md`}
    >
      [ &lt; RETURN TO SYSTEM ]
    </button>
  );

  const renderTierControls = () => (
    <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
      <button 
        onClick={() => setTier(Math.max(1, tier - 1))}
        disabled={tier === 1}
        className={`p-2 bg-current text-white/90 shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-10 ${theme.led}`}
      >
        ↑
      </button>
      <div className="flex flex-col gap-2 opacity-40 text-[8px] font-bold uppercase tracking-widest pointer-events-none items-center">
        <div className={`transition-all duration-300 ${tier === 1 ? "opacity-100 scale-125 font-black" : ""}`}>T1</div>
        <div className={`transition-all duration-300 ${tier === 2 ? "opacity-100 scale-125 font-black" : ""}`}>T2</div>
        <div className={`transition-all duration-300 ${tier === 3 ? "opacity-100 scale-125 font-black" : ""}`}>T3</div>
      </div>
      <button 
        onClick={() => setTier(Math.min(3, tier + 1))}
        disabled={tier === 3}
        className={`p-2 bg-current text-white/90 shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-10 ${theme.led}`}
      >
        ↓
      </button>
    </div>
  );

  const renderBio = () => (
    <div className={`space-y-6 ${theme.font} ${theme.text} text-[16px] leading-relaxed relative h-full`}>
      {renderTierControls()}

      <h3 className="text-xl font-black border-b-2 border-current pb-2 flex justify-between items-end text-lg uppercase tracking-tighter">
        <TypewriterText text="01_BIO" speed={30} />
        <span className="text-[10px] opacity-40 uppercase tracking-[0.2em]">Zoom: Tier {tier}</span>
      </h3>
      
      <div className="flex-1 overflow-y-auto max-h-[220px] custom-scrollbar pr-10">
        {tier === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <p><TypewriterText text="Full Stack Engineer & Creative Technologist. Western Washington University CS Grad (Dec 2022). Former Culinary Professional turned Solutions Engineer." speed={10} /></p>
            <p><TypewriterText text="Passionate about bridging the gap between complex engineering systems and human-centered design." speed={10} delay={1500} /></p>
          </motion.div>
        )}

        {tier === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <p className="border-l-4 border-current pl-4 italic text-sm"><TypewriterText text="Timeline Expansion:" speed={10} /></p>
            <p><TypewriterText text="Started as a CSA Intern in July 2021 -> Full-Time Web/Content Developer Aug 2022 -> Oct 2025. Cross-departmental impact, attending SECtember and Skilljar 2023." speed={8} /></p>
            <p><TypewriterText text="The transition from high-pressure culinary environments to mission-critical cloud security engineering defined my approach to scale and reliability." speed={8} delay={2000} /></p>
          </motion.div>
        )}

        {tier === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <p className="font-bold uppercase tracking-widest text-xs opacity-50"><TypewriterText text="Operational Empathy & Current Status" speed={20} /></p>
            <p><TypewriterText text="I act as a de facto Solutions Engineer on a lean 5-person team, framing complex technical constraints into actionable roadmaps." speed={8} /></p>
            <p className="bg-current/5 p-4 border border-current/20 italic font-bold">
              <TypewriterText text="'Currently seeking a structured, enterprise-scale environment to leverage my fast-learning capabilities and high-empathy communication skills.'" speed={10} delay={1500} />
            </p>
          </motion.div>
        )}
      </div>

      {renderReturnButton()}

      <div className="sr-only">
        Full Stack Engineer, Creative Technologist, Western Washington University, Computer Science, Solutions Engineer, Web Developer, Content Developer, Cloud Security, React, TypeScript, Python, Ruby, Node.js, AWS.
      </div>
    </div>
  );

  const renderStack = () => (
    <div className={`space-y-6 ${theme.font} ${theme.text} text-[15px] leading-relaxed relative h-full`}>
      {renderTierControls()}

      <h3 className="text-xl font-black border-b-2 border-current pb-2 flex justify-between items-end text-lg uppercase tracking-tighter">
        <TypewriterText text="03_STACK" speed={30} />
        <span className="text-[10px] opacity-40 uppercase tracking-[0.2em]">Timeline: Tier {tier}</span>
      </h3>

      <div className="flex-1 overflow-y-auto max-h-[220px] custom-scrollbar pr-10">
        {tier === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-current p-3"><p className="text-[10px] opacity-50 font-black">THE CC ERA</p><p className="font-bold">C++ / Java</p></div>
              <div className="border border-current p-3"><p className="text-[10px] opacity-50 font-black">THE WWU ERA</p><p className="font-bold">Objective-C / Java</p></div>
              <div className="border border-current p-3"><p className="text-[10px] opacity-50 font-black">THE CSA ERA</p><p className="font-bold">Ruby / JS</p></div>
              <div className={`border border-current p-3 ${theme.highlight}`}><p className="text-[10px] opacity-50 font-black">CURRENT ERA</p><p className="font-bold">Next.js / React</p></div>
            </div>
          </motion.div>
        )}

        {tier === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <p className="text-xs uppercase tracking-widest font-black opacity-50 underline">Era Project Map:</p>
            <ul className="space-y-2 text-sm">
              <li><span className="font-black mr-2 opacity-60">[CC]</span> Mechanical Eng Path Simulation</li>
              <li><span className="font-black mr-2 opacity-60">[WWU]</span> Calendar App (React Native)</li>
              <li><span className="font-black mr-2 opacity-60">[CSA]</span> Skilljar CMS Overrides (Ruby)</li>
              <li><span className="font-black mr-2 opacity-60">[NOW]</span> Bogardt Band Platform (Next.js)</li>
            </ul>
          </motion.div>
        )}

        {tier === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-sm">
            <p className="text-xs uppercase tracking-widest font-black opacity-50 underline">The Grit (Challenges Overcome):</p>
            <div className="space-y-4">
              <div className="border-l-2 border-current pl-4">
                <p className="italic font-bold"><TypewriterText text="'Self-funded transition from Community College to WWU during COVID lockdowns.'" speed={10} /></p>
              </div>
              <div className="border-l-2 border-current pl-4">
                <p className="italic font-bold"><TypewriterText text="'Mastering Ruby on the job to deliver enterprise training systems with zero documentation.'" speed={10} delay={1000} /></p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {renderReturnButton()}

      <div className="sr-only">
        C++, Java, Objective-C, Ruby, JavaScript, React, Next.js, Node.js, AWS, PostgreSQL, Prisma, Tailwind CSS, Vercel.
      </div>
    </div>
  );

  const renderProjects = () => {
    if (!selectedProject) {
      const currentProjIdx = menuIndex % PROJECTS.length;
      const p = PROJECTS[currentProjIdx];
      
      return (
        <div className={`flex flex-col h-full w-full relative overflow-hidden ${theme.text} ${theme.font}`}>
          <h3 className="text-xl font-black border-b-2 border-current pb-2 mb-4 pl-12 text-lg uppercase tracking-tighter">
            <TypewriterText text="02_PROJECTS" speed={30} />
          </h3>
          <div className="flex-1 pl-12 pr-12 pb-10 flex items-center justify-center relative">
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
              <button 
                onClick={() => setMenuIndex(Math.max(0, currentProjIdx - 1))}
                disabled={currentProjIdx === 0}
                className={`p-2 bg-current text-white/90 shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-10 ${theme.led}`}
              >
                ↑
              </button>
              <button 
                onClick={() => setMenuIndex(Math.min(PROJECTS.length - 1, currentProjIdx + 1))}
                disabled={currentProjIdx === PROJECTS.length - 1}
                className={`p-2 bg-current text-white/90 shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-10 ${theme.led}`}
              >
                ↓
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.button 
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={() => { setSelectedProject(p.id); setTabIndex(0); triggerNavSpike(); addLogMessage(`MOUNT: ${p.id}`); }}
                className={`group border-4 ${theme.border} p-6 hover:bg-current/5 text-left w-full outline-none focus:ring-4 focus:ring-current/10 relative transition-all shadow-[8px_8px_0_rgba(0,0,0,0.15)] bg-white/5`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-black uppercase tracking-wide text-lg leading-tight w-2/3">
                    <TypewriterText key={`title-${p.id}`} text={p.title} speed={10} />
                  </h4>
                  <span className={`text-[10px] font-bold border ${theme.border} px-2 py-0.5 whitespace-nowrap ${theme.highlight} uppercase tracking-tighter shadow-sm`}>{p.category}</span>
                </div>
                <p className="text-[13px] leading-relaxed mb-6 italic opacity-80 border-l-2 border-current/20 pl-4 py-1">
                  <TypewriterText key={`desc-${p.id}`} text={p.description} speed={5} delay={500} />
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-current/10">
                  {p.stack.map((item) => (
                    <span key={item} className="text-[9px] font-bold uppercase tracking-widest opacity-60">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="absolute right-4 bottom-4 opacity-20 text-[8px] font-bold uppercase tracking-[0.5em]">Frame {currentProjIdx + 1}/{PROJECTS.length}</div>
              </motion.button>
            </AnimatePresence>
          </div>
          {renderReturnButton()}
        </div>
      );
    }

    const p = PROJECTS.find(proj => proj.id === selectedProject);
    if (!p) return null;
    
    const tabsCount = p.details.length + 1;
    const currentTabIdx = Math.min(tabIndex, tabsCount - 1);
    
    return (
      <div className={`flex flex-col h-full w-full relative ${theme.text} ${theme.font}`}>
        <div className="flex justify-between items-end border-b-2 border-current pb-2 mb-4 pl-12 pr-12">
          <h3 className="text-xl font-black truncate max-w-[70%] text-lg uppercase tracking-tighter">
            <TypewriterText text={p.title} speed={20} />
          </h3>
          <div className="flex gap-2 mb-0.5">
            {Array.from({ length: tabsCount }).map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 border border-current transition-colors ${i === currentTabIdx ? "bg-current" : "opacity-30"}`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex-1 pl-12 pr-12 pb-16 overflow-hidden relative">
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
            <button 
              onClick={() => setTabIndex(Math.max(0, currentTabIdx - 1))}
              disabled={currentTabIdx === 0}
              className={`p-2 bg-current text-white/90 shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-10 ${theme.led}`}
            >
              ↑
            </button>
            <button 
              onClick={() => setTabIndex(Math.min(tabsCount - 1, currentTabIdx + 1))}
              disabled={currentTabIdx === tabsCount - 1}
              className={`p-2 bg-current text-white/90 shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-10 ${theme.led}`}
            >
              ↓
            </button>
          </div>

          <AnimatePresence mode="wait">
            {currentTabIdx < p.details.length ? (
              <motion.div 
                key={`${selectedProject}-tab-${currentTabIdx}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col"
              >
                <div className="mb-2 text-[10px] font-bold opacity-50 tracking-[0.3em] uppercase">[ {p.details[currentTabIdx].label} ]</div>
                <h4 className="font-bold mb-4 border-b border-current/10 pb-1 italic text-xs tracking-widest">{p.details[currentTabIdx].title}</h4>
                <div className="text-[14px] leading-relaxed flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {p.details[currentTabIdx].content}
                </div>
                <div className="sr-only">{p.details[currentTabIdx].srText}</div>
              </motion.div>
            ) : (
              <motion.div 
                key={`${selectedProject}-assets`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col"
              >
                <div className="mb-2 text-[10px] font-bold opacity-50 tracking-[0.3em] uppercase">[ ASSETS_CAROUSEL ]</div>
                <div className="flex-1 relative overflow-hidden group">
                  {(() => {
                    const assetIdx = Math.min(Math.floor((panDepth / 100) * p.assets.length), p.assets.length - 1);
                    const currentAsset = p.assets[assetIdx];
                    
                    const handleAssetNext = (e: React.MouseEvent) => {
                      e.stopPropagation();
                      const nextIdx = Math.min(assetIdx + 1, p.assets.length - 1);
                      setPanDepth((nextIdx / Math.max(1, p.assets.length - 1)) * 100);
                    };
                    const handleAssetPrev = (e: React.MouseEvent) => {
                      e.stopPropagation();
                      const prevIdx = Math.max(assetIdx - 1, 0);
                      setPanDepth((prevIdx / Math.max(1, p.assets.length - 1)) * 100);
                    };

                    return (
                      <div className="h-full flex flex-col relative">
                        <div className="absolute inset-y-0 -left-2 -right-2 flex justify-between items-center z-50 pointer-events-none">
                          {assetIdx > 0 && (
                            <button 
                              onClick={handleAssetPrev}
                              className={`pointer-events-auto p-2 bg-current text-white/90 shadow-lg hover:scale-110 active:scale-95 transition-all ${theme.led}`}
                            >
                              &lt;
                            </button>
                          )}
                          {assetIdx < p.assets.length - 1 && (
                            <button 
                              onClick={handleAssetNext}
                              className={`pointer-events-auto p-2 bg-current text-white/90 shadow-lg hover:scale-110 active:scale-95 transition-all ${theme.led}`}
                            >
                              &gt;
                            </button>
                          )}
                        </div>

                        <div className="flex-1 bg-current/5 border-4 border-current/20 p-4 mb-2 relative min-h-[180px] flex flex-col justify-center">
                          <AnimatePresence mode="wait">
                            <motion.div 
                              key={`${selectedProject}-asset-${assetIdx}`}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="h-full w-full"
                            >
                              {currentAsset.content}
                            </motion.div>
                          </AnimatePresence>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-40">
                            {p.assets.map((_, i) => (
                              <div key={i} className={`w-1.5 h-1.5 rounded-full bg-current ${i === assetIdx ? "scale-125 opacity-100" : "opacity-30"}`} />
                            ))}
                          </div>
                        </div>
                        <div className="text-[9px] font-bold opacity-50 tracking-widest uppercase text-center">{currentAsset.label} ({assetIdx + 1}/{p.assets.length})</div>
                        <div className="sr-only">{currentAsset.srText}</div>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <button 
          onClick={handleProjectBack}
          className={`absolute bottom-4 left-4 z-50 px-3 py-1.5 border-2 ${theme.border} ${theme.font} text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all bg-white/10 shadow-[4px_4px_0_rgba(0,0,0,0.1)]`}
        >
          [ &lt; RETURN TO INDEX ]
        </button>
      </div>
    );
  };

  const renderContact = () => (
    <div className={`space-y-6 ${theme.font} ${theme.text} text-[15px] leading-relaxed relative h-full`}>
      <h3 className="text-xl font-black border-b-2 border-current pb-2 text-lg uppercase tracking-tighter"><TypewriterText text="04_CONTACT" speed={30} /></h3>
      <div className="space-y-6 py-4">
        <div className="border-4 border-current/30 p-6 bg-current/5 space-y-4 shadow-[8px_8px_0_rgba(0,0,0,0.1)]">
          <p className="font-black text-center border-b border-current/20 pb-4 tracking-[0.2em] uppercase text-xs">UPLINK_STABLE: AWAITING_INPUT</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div><p className="text-[10px] opacity-40 uppercase mb-1 font-black">Email</p><p className="font-bold underline decoration-dotted">jerod.a.hollen@gmail.com</p></div>
              <div><p className="text-[10px] opacity-40 uppercase mb-1 font-black">GitHub</p><p className="font-bold underline decoration-dotted">github.com/jhollen</p></div>
            </div>
            <div className="space-y-4">
              <div><p className="text-[10px] opacity-40 uppercase mb-1 font-black">LinkedIn</p><p className="font-bold underline decoration-dotted">in/jerodhollen</p></div>
              <div className="pt-2 italic text-xs border-t border-current/10 opacity-60 font-medium">&quot;Strategic high-impact engineering roles only.&quot;</div>
            </div>
          </div>
        </div>
        <div className="sr-only">Contact Jerod Hollen: jerod.a.hollen@gmail.com. Expertise in React, Node, Python, AWS, Cloud Security.</div>
      </div>
      {renderReturnButton()}
    </div>
  );

  const renderMainMenu = () => (
    <div className={`flex flex-col gap-2 w-full mt-2 ${theme.text} ${theme.font}`}>
      <h3 className="font-black uppercase tracking-widest mb-4 opacity-50 text-[10px] pl-12">SYSTEM_ROOT:</h3>
      {menus.map((menu, idx) => {
        const friendlyNames = ["Bio", "Projects", "Stack", "Contact"];
        const name = friendlyNames[idx] || menu;
        return (
          <button key={menu} 
            onMouseEnter={() => { setMenuIndex(idx); triggerNavDance(); }}
            onMouseLeave={() => setNavActivity(0)}
            onClick={() => { setActiveSelection(menu); setMenuIndex(0); triggerNavSpike(); addLogMessage(`EXEC: [${menu}]`); }}
            className={`p-3 transition-all duration-75 flex gap-3 cursor-pointer text-left w-full outline-none focus:ring-4 focus:ring-inset focus:ring-current/20 pl-12 border-l-4 border-transparent ${idx === menuIndex ? `${theme.highlight} font-black border-current translate-x-2` : "opacity-60 hover:bg-black/5 hover:translate-x-1"}`}>
            <TypewriterText key={`menu-${menu}`} text={`0${idx+1}_${name.toUpperCase()}`} speed={30} delay={idx * 50} />
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
    <div className={`w-full aspect-[16/9] max-h-[400px] ${theme.bg} border-[25px] border-[#1a1a1a] p-3 md:p-6 relative shadow-[0_10px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col shrink-0 transition-all duration-700`}>
      <div className={`absolute inset-0 pointer-events-none ${isKindle ? "shadow-[inset:0_0_100px_rgba(0,0,0,0.05)]" : "shadow-[inset:0_0_150px_rgba(0,0,0,0.3)]"} z-20`} />
      
      {!isBooting && !isKindle && <div className="absolute inset-0 scanlines opacity-10 z-30 pointer-events-none" />}

      <div className={`flex-1 h-full overflow-hidden leading-relaxed tracking-wide relative transition-colors duration-300 z-10`}>
        <div className="absolute inset-0 transition-transform duration-75 ease-linear">{renderMainContent()}</div>
      </div>
      
      <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none opacity-10 text-[7px] tracking-[1.5em] font-mono uppercase z-40">
        {isHacker ? "Hollen OS // Neural Link" : isRetro ? "WA76 // ANALOG INTERFACE" : "Kindle Paperwhite"}
      </div>
    </div>
  );
};
