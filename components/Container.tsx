import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto px-6 md:px-8 lg:px-12 max-w-7xl ${className}`}>
      {children}
    </div>
  );
}
