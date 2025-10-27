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
      className={`glass-card-base relative overflow-hidden rounded-[34px] px-8 py-8 ${className}`}
      {...rest}
    >
      <div className="glass-card-base__shine pointer-events-none absolute inset-0" />
      <div className="glass-card-base__shadow pointer-events-none absolute inset-0" />
      <div className="glass-card-base__noise pointer-events-none absolute inset-0" />
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
