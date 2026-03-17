"use client";

import * as React from "react";
import Image from "next/image";
import { useConsoleStore } from "@/app/useConsoleStore";
import { BootScreen } from "./BootScreen";
import { motion, AnimatePresence } from "framer-motion";
import { TypewriterText } from "./TypewriterText";
import { PROJECTS } from "../constants";

const AvatarLoop = ({ isKindle }: { isKindle: boolean }) => {
  const [isWinking, setIsWinking] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsWinking(true);
      setTimeout(() => setIsWinking(false), 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      className={`absolute top-4 right-4 w-12 h-12 border border-current p-0.5 ${isKindle ? "bg-transparent" : "bg-black/5"} z-50 overflow-hidden`}
    >
      {!isKindle && <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />}
      <Image
        src={isWinking ? "images/avatar-winking.png" : "images/avatar-static.png"}
        alt="Jerod Hollen"
        width={48}
        height={48}
        className={`object-cover ${isKindle ? "grayscale contrast-125" : ""}`}
        unoptimized
      />
    </motion.div>
  );
};

interface LCDDisplayProps {
  menus: string[];
}

export const LCDDisplay: React.FC<LCDDisplayProps> = ({ menus }) => {
  const {
    isBooting,
    setBooting,
    menuIndex,
    setMenuIndex,
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

  const handleBack = () => {
    if (selectedProject) {
      setSelectedProject(null);
      addLogMessage("SYSTEM: Return to Index");
    } else {
      setActiveSelection(null);
      addLogMessage("SYSTEM: Return to Root");
    }
  };

  const tier = contentDepth < 34 ? 1 : contentDepth < 67 ? 2 : 3;

  const renderBio = () => (
    <div className={`space-y-6 ${theme.font} text-[15px] leading-relaxed relative`}>
      <h3 className="text-xl font-black border-b-2 border-current pb-2 flex justify-between items-end">
        <TypewriterText text="01_BIO" speed={30} />
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
    <div className={`space-y-6 ${theme.font} text-[14px] leading-relaxed`}>
      <h3 className="text-xl font-black border-b-2 border-current pb-2 flex justify-between items-end">
        <TypewriterText text="03_STACK" speed={30} />
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
      return (
        <div className="flex flex-col h-full w-full">
          <h3 className="text-xl font-black border-b-2 border-current pb-2 mb-4 pl-12"><TypewriterText text="02_PROJECTS" speed={30} /></h3>
          <div className="flex-1 overflow-y-auto pl-12 pb-10 pr-4 space-y-4">
            {PROJECTS.map((p, idx) => (
              <button key={p.id} 
                onMouseEnter={() => { setMenuIndex(idx % 5); triggerNavDance(); }}
                onMouseLeave={() => setNavActivity(0)}
                onClick={() => { setSelectedProject(p.id); setMenuIndex(0); triggerNavSpike(); addLogMessage(`MOUNT: ${p.id}`); }}
                className="group border border-current/20 p-3 hover:bg-current/5 text-left w-full outline-none focus:ring-2 focus:ring-current/10">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold uppercase tracking-wide text-xs"><TypewriterText key={`title-${p.id}`} text={p.title} speed={10} delay={idx * 100} /></h4>
                  <span className="text-[8px] opacity-50 border border-current px-1">{p.category}</span>
                </div>
                <p className="text-[11px] opacity-70 italic"><TypewriterText key={`desc-${p.id}`} text={p.description} speed={5} delay={idx * 100 + 200} /></p>
              </button>
            ))}
          </div>
        </div>
      );
    }

    const p = PROJECTS.find(proj => proj.id === selectedProject);
    if (!p) return null;
    const slideIdx = Math.min(Math.floor((panDepth / 100) * p.slides.length), p.slides.length - 1);
    const currentSlide = p.slides[slideIdx];

    return (
      <div className="flex flex-col h-full w-full">
        <h3 className="text-xl font-black border-b-2 border-current pb-2 mb-4 pl-12 flex justify-between items-end">
          <TypewriterText text={p.title} speed={20} />
          <span className="text-[10px] opacity-40 uppercase tracking-[0.2em]">PAN: Slide {slideIdx + 1}/{p.slides.length}</span>
        </h3>
        <div className="flex-1 pl-12 pr-4 pb-10 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${selectedProject}-${slideIdx}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <div className="mb-2 text-[10px] font-bold opacity-50 tracking-[0.3em] uppercase">[ {currentSlide.label} ]</div>
              <div className="text-[14px] leading-relaxed">{currentSlide.content}</div>
              <div className="sr-only">{currentSlide.srText}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  };

  const renderContact = () => (
    <div className={`space-y-6 ${theme.font} text-[15px] leading-relaxed`}>
      <h3 className="text-xl font-black border-b-2 border-current pb-2"><TypewriterText text="04_CONTACT" speed={30} /></h3>
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
          <h3 className="font-bold uppercase tracking-widest mb-4 opacity-50 text-[10px] pl-12">SYSTEM_ROOT:</h3>
          {menus.map((menu, idx) => (
            <button key={menu} 
              onMouseEnter={() => { setMenuIndex(idx); triggerNavDance(); }}
              onMouseLeave={() => setNavActivity(0)}
              onClick={() => { setActiveSelection(menu); setMenuIndex(0); triggerNavSpike(); addLogMessage(`EXEC: [${menu}]`); }}
              className={`p-2 transition-colors duration-75 flex gap-3 cursor-pointer text-left w-full outline-none focus:ring-2 focus:ring-inset focus:ring-current/20 pl-12 ${idx === menuIndex ? `${theme.highlight} font-bold` : "opacity-60 hover:bg-black/5"}`}>
              <TypewriterText key={`menu-${menu}`} text={`0${idx+1}_${menu}`} speed={30} delay={idx * 50} />
            </button>
          ))}
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
      {activeSelection && (
        <button onClick={handleBack} className={`absolute top-4 left-4 z-40 p-2 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center gap-2 group cursor-pointer ${theme.text}`} aria-label="Back">
          <div className={`p-1 border-2 ${theme.border} group-hover:bg-black/10`}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg></div>
        </button>
      )}
      {!isBooting && <AvatarLoop isKindle={isKindle} />}
      <div className={`absolute inset-0 pointer-events-none ${isKindle ? "shadow-[inset:0_0_100px_rgba(0,0,0,0.05)]" : "shadow-[inset:0_0_40px_rgba(0,0,0,0.1)]"} z-20`} />
      <div className={`flex-1 h-full overflow-hidden ${theme.text} leading-relaxed tracking-wide relative transition-colors duration-300 z-10`}>
        <div className="absolute inset-0 transition-transform duration-75 ease-linear">{renderMainContent()}</div>
      </div>
      {isKindle && <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none opacity-20 text-[8px] tracking-[1em] font-serif uppercase">Kindle</div>}
    </div>
  );
};
