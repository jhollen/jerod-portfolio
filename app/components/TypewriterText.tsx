"use client";

import React, { useState, useEffect, useRef } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  highlightKeywords?: boolean;
  className?: string;
  onComplete?: () => void;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 15, 
  delay = 0, 
  highlightKeywords = true,
  className = "",
  onComplete 
}) => {
  const [index, setIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    setIndex(0);
    let intervalId: NodeJS.Timeout;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setIndex((prev) => {
          if (prev >= text.length) {
            clearInterval(intervalId);
            onCompleteRef.current?.();
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  const displayedText = text.slice(0, index);
  const isComplete = index >= text.length;

  const keywords = [
    "React Native", "Expo", "React", "Next.js", "Tailwind CSS", "TypeScript", 
    "Node.js", "Ruby on Rails", "PostgreSQL", "AWS", "Skilljar API", "Playwright", 
    "Python", "Git", "Heroku", "Rails Admin", "image-optim", "SCORM", "AST parsing"
  ];
  
  if (!highlightKeywords || !isComplete) {
    return <span className={className}>{displayedText}</span>;
  }

  const regex = new RegExp(`\\b(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`, "gi");

  return (
    <span className={className}>
      {text.split(regex).map((part, i) => {
        if (!part) return null;
        if (keywords.some((k) => k.toLowerCase() === part.toLowerCase())) {
          return (
            <span key={i} className="font-bold underline decoration-current/30 underline-offset-2">
              {part}
            </span>
          );
        }
        return part;
      })}
    </span>
  );
};
