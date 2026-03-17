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
    panDepth,
    addLogMessage,
    triggerNavSpike,
    triggerNavDance,
    setNavActivity,
    theme: globalTheme,
  } = useConsoleStore();

  React.useEffect(() => {
    if (isBooting) {
      const t = setTimeout(() => setBooting(false), 3000);
      return () => clearTimeout(t);
    }
  }, [isBooting, setBooting]);

  const isKindle = true;

  const theme = isKindle ? { 
    bg: "bg-[#e8e9e4]", 
    text: "text-[#1a1a1a]", 
    highlight: "bg-[#1a1a1a] text-[#e8e9e4]", 
    border: "border-[#1a1a1a]",
    font: "font-serif" 
  } : { bg: globalTheme === "DARK" ? "bg-[#0a0a0a]" : "bg-[#ffffff]", text: globalTheme === "DARK" ? "text-[#e8e9e4]" : "text-[#0a0a0a]", highlight: globalTheme === "DARK" ? "bg-[#e8e9e4] text-[#0a0a0a]" : "bg-[#0a0a0a] text-[#ffffff]", border: globalTheme === "DARK" ? "border-[#e8e9e4]" : "border-[#0a0a0a]", font: "font-mono" };

  const tier = contentDepth < 34 ? 1 : contentDepth < 67 ? 2 : 3;

  const handleBack = () => {
    if (selectedProject) {
      setSelectedProject(null);
      setTabIndex(0);
      addLogMessage("SYSTEM: Return to Index");
    } else {
      setActiveSelection(null);
      setMenuIndex(1); // Set to PROJECTS index in main menu
      addLogMessage("SYSTEM: Return to Root");
    }
  };

  const renderBio = () => (
    <div className={`space-y-6 ${theme.font} text-[15px] leading-relaxed relative`}>
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex flex-col gap-4 opacity-20 text-[8px] font-bold uppercase tracking-widest pointer-events-none">
        <div className={`transition-all duration-300 ${tier === 1 ? "opacity-100 scale-125" : ""}`}>↑ Tier 1</div>
        <div className={`transition-all duration-300 ${tier === 2 ? "opacity-100 scale-125" : ""}`}>• Tier 2</div>
        <div className={`transition-all duration-300 ${tier === 3 ? "opacity-100 scale-125" : ""}`}>↓ Tier 3</div>
      </div>

      <h3 className="text-xl font-black border-b-2 border-current pb-2 flex justify-between items-end text-lg">
        <TypewriterText text="Bio" speed={30} />
        <span className="text-[10px] opacity-40 uppercase tracking-[0.2em]">Zoom: Tier {tier}</span>
      </h3>
      
      {tier === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <p><TypewriterText text="Full Stack Engineer & Creative Technologist. Western Washington University CS Grad (Dec 2022). Former Culinary Professional turned Solutions Engineer." speed={10} /></p>
          <p><TypewriterText text="Passionate about bridging the gap between complex engineering systems and human-centered design." speed={10} delay={1500} /></p>
        </motion.div>
      )}

      {tier === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <p className="border-l-4 border-current pl-4 italic"><TypewriterText text="Timeline Expansion:" speed={10} /></p>
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

      {/* SEO Layer */}
      <div className="sr-only">
        Full Stack Engineer, Creative Technologist, Western Washington University, Computer Science, Solutions Engineer, Web Developer, Content Developer, Cloud Security, React, TypeScript, Python, Ruby, Node.js, AWS.
      </div>
    </div>
  );

  const renderStack = () => (
    <div className={`space-y-6 ${theme.font} text-[14px] leading-relaxed relative`}>
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex flex-col gap-4 opacity-20 text-[8px] font-bold uppercase tracking-widest pointer-events-none">
        <div className={`transition-all duration-300 ${tier === 1 ? "opacity-100 scale-125" : ""}`}>↑ Tier 1</div>
        <div className={`transition-all duration-300 ${tier === 2 ? "opacity-100 scale-125" : ""}`}>• Tier 2</div>
        <div className={`transition-all duration-300 ${tier === 3 ? "opacity-100 scale-125" : ""}`}>↓ Tier 3</div>
      </div>

      <h3 className="text-xl font-black border-b-2 border-current pb-2 flex justify-between items-end text-lg">
        <TypewriterText text="Stack" speed={30} />
        <span className="text-[10px] opacity-40 uppercase tracking-[0.2em]">Timeline: Tier {tier}</span>
      </h3>

      {tier === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-current p-3"><p className="text-[10px] opacity-50">THE CC ERA</p><p className="font-bold">C++ / Java</p></div>
            <div className="border border-current p-3"><p className="text-[10px] opacity-50">THE WWU ERA</p><p className="font-bold">Objective-C / Java</p></div>
            <div className="border border-current p-3"><p className="text-[10px] opacity-50">THE CSA ERA</p><p className="font-bold">Ruby / JS</p></div>
            <div className="border border-current p-3 bg-current text-white"><p className="text-[10px] opacity-50">CURRENT ERA</p><p className="font-bold">Next.js / React</p></div>
          </div>
        </motion.div>
      )}

      {tier === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <p className="text-xs uppercase tracking-widest font-bold opacity-50">Era Project Map:</p>
          <ul className="space-y-2">
            <li><span className="font-bold mr-2">[CC]</span> Mechanical Eng Path Simulation</li>
            <li><span className="font-bold mr-2">[WWU]</span> Calendar App (React Native)</li>
            <li><span className="font-bold mr-2">[CSA]</span> Skilljar CMS Overrides (Ruby)</li>
            <li><span className="font-bold mr-2">[NOW]</span> Bogardt Band Platform (Next.js)</li>
          </ul>
        </motion.div>
      )}

      {tier === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <p className="text-xs uppercase tracking-widest font-bold opacity-50">The Grit (Challenges Overcome):</p>
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
        <div className="flex flex-col h-full w-full relative overflow-hidden">
          <h3 className="text-xl font-black border-b-2 border-current pb-2 mb-4 pl-12 text-lg">
            <TypewriterText text="Projects" speed={30} />
          </h3>
          <div className="flex-1 pl-12 pr-4 pb-10 flex items-center justify-center relative">
            <div className="absolute left-1 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-20 text-[10px]">
              <div className="animate-bounce">↑</div>
              <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>↓</div>
            </div>

            <AnimatePresence mode="wait">
              <motion.button 
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={() => { setSelectedProject(p.id); setTabIndex(0); triggerNavSpike(); addLogMessage(`MOUNT: ${p.id}`); }}
                className="group border-2 border-current p-6 hover:bg-current/5 text-left w-full outline-none focus:ring-4 focus:ring-current/10 relative transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-black uppercase tracking-wide text-lg leading-tight w-2/3">
                    <TypewriterText key={`title-${p.id}`} text={p.title} speed={10} />
                  </h4>
                  <span className="text-[10px] font-bold border border-current px-2 py-0.5 whitespace-nowrap bg-current text-white uppercase tracking-tighter shadow-sm">{p.category}</span>
                </div>
                <p className="text-[13px] leading-relaxed mb-6 italic opacity-80 border-l-2 border-current/20 pl-4 py-1">
                  <TypewriterText key={`desc-${p.id}`} text={p.description} speed={5} delay={500} />
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-current/10">
                  {p.stack.map((item, i) => (
                    <span key={item} className="text-[9px] font-bold uppercase tracking-widest opacity-60">
                      {i > 0 && <span className="mr-2 opacity-30">•</span>}
                      {item}
                    </span>
                  ))}
                </div>
                {/* Visual context indicator for carousel */}
                <div className="absolute right-4 bottom-4 opacity-20 text-[8px] font-bold uppercase tracking-[0.5em]">Frame {currentProjIdx + 1}/{PROJECTS.length}</div>
              </motion.button>
            </AnimatePresence>
          </div>
        </div>
      );
    }

    const p = PROJECTS.find(proj => proj.id === selectedProject);
    if (!p) return null;
    
    // Total tabs: details length + 1 (for assets tab)
    const tabsCount = p.details.length + 1;
    const currentTabIdx = Math.min(tabIndex, tabsCount - 1);
    
    return (
      <div className="flex flex-col h-full w-full">
        <div className="flex justify-between items-end border-b-2 border-current pb-2 mb-4 pl-12">
          <h3 className="text-xl font-black truncate max-w-[70%] text-lg">
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
        
        <div className="flex-1 pl-12 pr-4 pb-10 overflow-hidden relative">
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
                <div className="flex-1 relative overflow-hidden">
                  {(() => {
                    const assetIdx = Math.min(Math.floor((panDepth / 100) * p.assets.length), p.assets.length - 1);
                    const currentAsset = p.assets[assetIdx];
                    return (
                      <div className="h-full flex flex-col relative">
                        <div className="absolute inset-y-0 -left-4 -right-4 flex justify-between items-center z-10 pointer-events-none opacity-20">
                          <div className="animate-pulse text-lg">←</div>
                          <div className="animate-pulse text-lg">→</div>
                        </div>

                        <div className="flex-1 bg-current/5 border border-current/20 p-4 mb-2 relative">
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
                              <div key={i} className={`w-1 h-1 rounded-full bg-current ${i === assetIdx ? "scale-125" : "opacity-30"}`} />
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
      </div>
    );
  };

  const renderContact = () => (
    <div className={`space-y-6 ${theme.font} text-[15px] leading-relaxed`}>
      <h3 className="text-xl font-black border-b-2 border-current pb-2 text-lg"><TypewriterText text="Contact" speed={30} /></h3>
      <div className="space-y-6 py-4">
        <div className="border border-current/30 p-6 bg-current/5 space-y-4">
          <p className="font-bold text-center border-b border-current/20 pb-4 tracking-[0.2em] uppercase">LINK_STABLE: AWAITING_INPUT</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div><p className="text-[10px] opacity-40 uppercase mb-1">Email</p><p className="font-bold">jerod.a.hollen@gmail.com</p></div>
              <div><p className="text-[10px] opacity-40 uppercase mb-1">GitHub</p><p className="font-bold">github.com/jhollen</p></div>
            </div>
            <div className="space-y-4">
              <div><p className="text-[10px] opacity-40 uppercase mb-1">LinkedIn</p><p className="font-bold">in/jerodhollen</p></div>
              <div className="pt-2 italic text-xs border-t border-current/10 opacity-60">&quot;Uplink ready for strategic high-impact engineering roles.&quot;</div>
            </div>
          </div>
        </div>
        <div className="sr-only">Contact Jerod Hollen: jerod.a.hollen@gmail.com. Expertise in React, Node, Python, AWS, Cloud Security.</div>
      </div>
    </div>
  );

  const renderMainContent = () => {
    if (isBooting) return <BootScreen theme={theme} />;
    if (!activeSelection) {
      return (
        <div className="flex flex-col gap-2 w-full mt-2">
          <h3 className="font-bold uppercase tracking-widest mb-4 opacity-50 text-[10px] pl-12">System Root:</h3>
          {menus.map((menu, idx) => {
            const friendlyNames = ["Bio", "Projects", "Stack", "Contact"];
            const name = friendlyNames[idx] || menu;
            return (
              <button key={menu} 
                onMouseEnter={() => { setMenuIndex(idx); triggerNavDance(); }}
                onMouseLeave={() => setNavActivity(0)}
                onClick={() => { setActiveSelection(menu); setMenuIndex(0); triggerNavSpike(); addLogMessage(`EXEC: [${menu}]`); }}
                className={`p-2 transition-colors duration-75 flex gap-3 cursor-pointer text-left w-full outline-none focus:ring-2 focus:ring-inset focus:ring-current/20 pl-12 ${idx === menuIndex ? `${theme.highlight} font-bold` : "opacity-60 hover:bg-black/5"}`}>
                <TypewriterText key={`menu-${menu}`} text={`0${idx+1} ${name}`} speed={30} delay={idx * 50} />
              </button>
            );
          })}
        </div>
      );
    }

    if (activeSelection === "BIO") return renderBio();
    if (activeSelection === "PROJECTS") return renderProjects();
    if (activeSelection === "STACK") return renderStack();
    if (activeSelection === "CONTACT") return renderContact();

    return null;
  };

  return (
    <div className={`w-full aspect-[16/9] max-h-[400px] ${theme.bg} border-[25px] border-[#1a1a1a] p-3 md:p-6 relative shadow-[0_10px_50px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col shrink-0 transition-all duration-700`}>
      <div className={`absolute inset-0 pointer-events-none ${isKindle ? "shadow-[inset:0_0_100px_rgba(0,0,0,0.05)]" : "shadow-[inset:0_0_40px_rgba(0,0,0,0.1)]"} z-20`} />
      
      {/* Global Back Indicator */}
      {activeSelection && (
        <button 
          onClick={handleBack}
          className="absolute top-2 left-2 z-50 flex items-center gap-1.5 px-2 py-1 border border-current/20 bg-current/5 hover:bg-current/10 transition-all opacity-40 hover:opacity-100 group"
        >
          <span className="text-[10px] font-bold">←</span>
          <span className="text-[8px] font-bold uppercase tracking-widest hidden group-hover:inline">Back</span>
        </button>
      )}

      <div className={`flex-1 h-full overflow-hidden ${theme.text} leading-relaxed tracking-wide relative transition-colors duration-300 z-10`}>
        <div className="absolute inset-0 transition-transform duration-75 ease-linear">{renderMainContent()}</div>
      </div>
      {isKindle && <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none opacity-20 text-[8px] tracking-[1em] font-serif uppercase">Kindle</div>}
    </div>
  );
};
