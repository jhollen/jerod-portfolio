"use client";
import React from "react";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "alt" | "muted";
  container?: boolean;
  as?: React.ElementType;
  id?: string;
};

/**
 * Reusable Section component that applies consistent styling based on variant
 *
 * Variants:
 * - default: White background
 * - alt: Light gray background
 * - muted: Antique white background
 *
 * Container: Wraps content in container-default if true
 */
export function Section({
  children,
  className = "",
  variant = "default",
  container = true,
  as: Component = "section",
  id,
}: SectionProps) {
  // Determine background class based on variant
  const bgClass =
    variant === "alt"
      ? "bg-section-alt"
      : variant === "muted"
      ? "bg-section-muted"
      : "bg-section";

  // Base section classes
  const sectionClasses = `${bgClass} ${className}`;

  return (
    <Component id={id} className={sectionClasses}>
      {container ? (
        <div className="container-default">{children}</div>
      ) : (
        children
      )}
    </Component>
  );
}

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

/**
 * Reusable Card component with consistent styling
 */
export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`
        bg-section rounded-lg border border-border p-6 
        shadow-card ${
          hover ? "hover:shadow-elevated transition-shadow" : ""
        } ${className}
      `}
    >
      {children}
    </div>
  );
}

type GridProps = {
  children: React.ReactNode;
  className?: string;
  cols?: number;
  gap?: "sm" | "md" | "lg";
};

/**
 * Reusable Grid component for consistent grid layouts
 */
export function Grid({
  children,
  className = "",
  cols = 3,
  gap = "md",
}: GridProps) {
  // Map gap values to Tailwind classes
  const gapClass = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  }[gap];

  // Map columns to responsive grid template
  const colsClass = `grid-cols-1 sm:grid-cols-2 ${
    cols === 3
      ? "lg:grid-cols-3"
      : cols === 4
      ? "lg:grid-cols-4"
      : cols === 1
      ? "sm:grid-cols-1"
      : "lg:grid-cols-2"
  }`;

  return (
    <div className={`grid ${colsClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
}

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "h1" | "h2" | "h3" | "h4";
  as?: React.ElementType;
};

/**
 * Reusable Heading component for consistent typography
 */
export function Heading({
  children,
  className = "",
  variant = "h2",
  as,
}: HeadingProps) {
  const Component = as || variant;

  // Apply appropriate heading styles
  const headingClasses = {
    h1: "text-4xl md:text-5xl font-bold tracking-tight",
    h2: "text-3xl md:text-4xl font-bold tracking-tight",
    h3: "text-2xl md:text-3xl font-bold tracking-tight",
    h4: "text-xl md:text-2xl font-bold tracking-tight",
  }[variant];

  return (
    <Component className={`${headingClasses} ${className}`}>
      {children}
    </Component>
  );
}
