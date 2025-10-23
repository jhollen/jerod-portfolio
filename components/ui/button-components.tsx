"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

/**
 * Reusable Button component with consistent styling
 *
 * Variants:
 * - primary: Primary color background with white text
 * - secondary: Secondary color background with white text
 * - outline: Transparent background with primary color text and border
 */
export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  // Base button classes
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

  // Variant-specific classes
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-opacity-90 focus:ring-primary",
    secondary:
      "bg-secondary text-white hover:bg-opacity-90 focus:ring-secondary",
    outline:
      "bg-transparent border border-border-accent text-primary hover:bg-primary hover:text-white focus:ring-primary",
  }[variant];

  // Size-specific classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }[size];

  // Full width class
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface BadgeProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable Badge component for tags and labels
 */
export function Badge({
  variant = "primary",
  children,
  className = "",
}: BadgeProps) {
  const variantClasses = {
    primary: "bg-primary bg-opacity-10 text-primary",
    secondary: "bg-secondary bg-opacity-10 text-secondary",
  }[variant];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}
