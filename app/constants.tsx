import * as React from "react";

// ==========================================
// HOLLEN OS v3.1 - CORE DATA STATE
// ==========================================

export const BIO_DATA = {
  tier1_base: "Full Stack Engineer & Creative Technologist. Western Washington University CS Grad (Dec 2022). Former Culinary Professional turned Solutions Engineer. Passionate about bridging the gap between complex engineering systems and human-centered design.",
  
  tier2_timeline: "My journey is non-traditional. I started in culinary arts before transitioning to Comp Sci. After self-funding my way through community college (C++ and Java) and earning my DTA, I gained entry to Western Washington University's rigorous CS program. Concurrently, I joined Cloud Security Alliance (CSA) as an intern in July 2021, eventually being hired full-time as a Web / Content Developer in August 2022. During my tenure, I attended industry conferences like SECtember and Skilljar '23, taking on the de facto role of a Solutions Engineer for our lean 5-person engineering team.",
  
  tier3_deepDive: "I pride myself on 'Operational Empathy.' Because I've built training content, fielded Tier-1 support tickets, and architected automated deployment pipelines, I know how to translate technical constraints into business value. I am a fast learner and a highly empathetic communicator who excels at bridging the engineering department with stakeholders. I am currently seeking a structured, enterprise-scale environment where cross-functional communication and systems thinking are core requirements."
};

export const PROJECTS_DATA = [
  {
    id: "SCORM_PIPELINE",
    title: "LXP AUTOMATION ENGINE",
    category: "FULL-STACK / AUTOMATION",
    overview: "Mission-critical pipeline automating the delivery of SCORM training packets.",
    breach: "Manual deployment of SCORM packets for the CCSK course was a literal 8-hour bottleneck per update, eating up massive amounts of engineering and training team time.",
    deploy: "Python, Playwright, Skilljar API, Google Drive API, GitHub Actions.",
    result: "Turned a full day of LEAi → Skilljar publishing into a 20-minute automated run. Saved roughly 160 hours of manual labor per quarter.",
    stack: ["Python", "Playwright", "Skilljar API", "Google Drive API", "GitHub Actions"]
  },
  {
    id: "OFF_GRID_MED",
    title: "BURMESE P2P MED APP",
    category: "MOBILE / FULL-STACK",
    overview: "Ruggedized Android medical reference application for soldiers in connectivity-dark zones.",
    breach: "Stakeholders required immediate access to critical drug guidelines in active conflict zones with zero internet access, no App Store availability, and extreme security censorship.",
    deploy: "Android Studio, Java, P2P (Peer-to-Peer) Sharing Architecture, Physical Encrypted Flash Drive Distribution.",
    result: "Successfully bypassed digital blockades to deliver life-saving data. Achieved 100% offline uptime and enabled rapid deployment across units via decentralized sharing.",
    stack: ["Android Studio", "Java", "P2P Architecture", "Encryption"]
  },
  {
    id: "CSA_TRAINING",
    title: "CCSK / CCZT COURSEWARE",
    category: "EDTECH / SOLUTIONS",
    overview: "Full-lifecycle development and deployment of enterprise cloud security certification training.",
    breach: "The organization needed to rapidly deploy massive, high-quality audio/visual training modules (CCSK v5 and CCZT) without a bloated production budget or timeline.",
    deploy: "Ruby on Rails, WellSaid Labs (AI Audio), Vimeo API, Canva, LEAi.",
    result: "Delivered all 12 modules of the CCSK v5 and Modules 3-7 of the CCZT in record time, operating as a full-fledged hybrid member of the training and engineering teams.",
    stack: ["Ruby on Rails", "AI Audio", "Vimeo API", "Canva", "LEAi"]
  },
  {
    id: "DYNAMIC_CONTRIBUTOR",
    title: "CMS CONTRIBUTOR MODEL",
    category: "BACK-END / ARCHITECTURE",
    overview: "Templated profile system empowering non-technical admins to manage platform content.",
    breach: "Adding new course authors required manual HTML edits by developers for every single page, creating a massive bottleneck for the Product team.",
    deploy: "Ruby on Rails, Rails Admin, Blaze UI.",
    result: "Engineered a dynamic data model and human-centered UI that removed the developer bottleneck. Time-to-publish for new contributors dropped from 2 days to 5 minutes.",
    stack: ["Ruby on Rails", "PostgreSQL", "Rails Admin", "Blaze UI"]
  },
  {
    id: "BOGARDT_PLATFORM",
    title: "BOGARDT BAND OS",
    category: "FULL-STACK / SaaS",
    overview: "Custom web platform and admin interface for a Cali-Reggae band.",
    breach: "Needed a centralized, highly-performant hub to manage media, upcoming shows, and provide band members with secure admin access and custom G-Suite integration.",
    deploy: "Next.js, Tailwind CSS, Vercel, Google Domains, React Server Components.",
    result: "Currently migrating from basic hosting to a full Next.js edge-deployed architecture to support scalable media delivery and custom member dashboards.",
    stack: ["Next.js", "React", "Tailwind CSS", "Vercel", "G-Suite API"]
  }
];

export const STACK_DATA = [
  {
    era: "FOUNDATION",
    title: "C++/Java CC Era",
    languages: ["C++", "Java"],
    telemetry: "> REPO: EVERETT_CC // WHATCOM_CC > STATUS: DTA_ACQUIRED",
    grit: "Self-funded my education and adapted to a mid-degree language pivot (C++ to Java) to secure my DTA and gain entry into Western Washington University's rigorous CS program."
  },
  {
    era: "ARCHITECTURE",
    title: "Objective-C WWU Era",
    languages: ["Objective-C", "React Native", "Java"],
    telemetry: "> REPO: WWU_CS_PROG // OFF_GRID_MED > STATUS: BS_CS_COMPLETED_2022",
    grit: "Overcame the intense shift to remote COVID learning and advanced Objective-C coursework. Collaborated with a lasting cohort to build a native Calendar App and the P2P Burmese Med App."
  },
  {
    era: "ENTERPRISE",
    title: "Ruby/JS CSA Era",
    languages: ["Ruby on Rails", "JavaScript", "Python", "HTML/CSS"],
    telemetry: "> REPO: CSA_MAIN // SKILLJAR_LXP > STATUS: AUTOMATION_DEPLOYED",
    grit: "Learned Ruby on Rails on the job. Executed full-stack architecture, built automated pipelines, managed hundreds of feature requests, and refactored the entire Skilljar UI to achieve 100% brand parity."
  },
  {
    era: "MODERN_EDGE",
    title: "Next.js Current Era",
    languages: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
    telemetry: "> REPO: HOLLEN_OS // BOGARDT_WEB > STATUS: LIVE_SYNC",
    grit: "Leveraging modern React frameworks and edge computing to build high-performance, creative technical solutions like this hardware-emulated state machine and the Bogardt band platform."
  }
];
