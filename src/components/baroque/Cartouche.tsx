import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { OrnamentalRule } from "./OrnamentalRule";

interface CartoucheProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  size?: "default" | "large";
  titleAs?: ElementType;
  className?: string;
}

export const Cartouche = ({
  eyebrow,
  title,
  subtitle,
  size = "default",
  titleAs: TitleTag = "div",
  className,
}: CartoucheProps) => (
  <div
    className={cn(
      "relative mx-auto border border-accent/40 px-6 py-8 text-center sm:px-10",
      size === "large" ? "max-w-2xl py-10 sm:py-12" : "max-w-md",
      className
    )}
  >
    <span className="absolute -left-[3px] -top-[3px] h-[6px] w-[6px] rotate-45 bg-accent" />
    <span className="absolute -right-[3px] -top-[3px] h-[6px] w-[6px] rotate-45 bg-accent" />
    <span className="absolute -bottom-[3px] -left-[3px] h-[6px] w-[6px] rotate-45 bg-accent" />
    <span className="absolute -bottom-[3px] -right-[3px] h-[6px] w-[6px] rotate-45 bg-accent" />

    {eyebrow && (
      <div className="font-baroque-label mb-4 text-[11px] uppercase tracking-[0.2em] text-accent">{eyebrow}</div>
    )}
    <OrnamentalRule className="mb-4" />
    <TitleTag
      className={cn(
        "font-display font-bold leading-[1.05] tracking-tight text-foreground",
        size === "large" ? "text-4xl sm:text-6xl md:text-7xl" : "text-2xl sm:text-3xl"
      )}
    >
      {title}
    </TitleTag>
    {subtitle && (
      <>
        <OrnamentalRule className="mb-4 mt-4" />
        <div className="font-display italic text-base text-muted-foreground sm:text-lg">{subtitle}</div>
      </>
    )}
  </div>
);
