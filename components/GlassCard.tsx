import React from "react";

type GlassCardProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/**
 * GlassCard renders a reusable “liquid glass” panel inspired by macOS/iOS.
 * It relies on layered gradients, double hairlines, backdrop blur, and subtle noise.
 */
export default function GlassCard<T extends React.ElementType = "div">({
  as,
  className = "",
  children,
  ...rest
}: GlassCardProps<T>) {
  const Component = (as || "div") as React.ElementType;

  return (
    <Component
      className={`relative overflow-hidden rounded-[34px] px-8 py-8 bg-gradient-to-br from-white/70 via-white/40 to-blue-50/20 shadow-2xl shadow-blue-200/40 ring-1 ring-white/40 backdrop-blur-lg transition-all duration-200 hover:-translate-y-1 hover:scale-[1.015] hover:brightness-110 hover:shadow-3xl ${className}`}
      {...rest}
    >
      {/* Shine/highlight edge */}
      <div className="pointer-events-none absolute inset-0 rounded-[34px] ring-1 ring-white/30" />
      {/* Gentle vignette/radial overlay for premium focus */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,41,59,0.06)_0%,transparent_70%)]" />
      {/* Subtle noise texture */}
      <div className="pointer-events-none absolute inset-0 bg-noise-texture opacity-10" />
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
