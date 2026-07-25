import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CornerScroll } from "./ornaments";

interface GildedFrameProps {
  children: ReactNode;
  variant?: "heavy" | "light";
  scrolls?: boolean;
  scrollDelay?: number;
  scrollsInView?: boolean;
  className?: string;
}

export const GildedFrame = ({
  children,
  variant = "heavy",
  scrolls = false,
  scrollDelay = 0,
  scrollsInView = true,
  className,
}: GildedFrameProps) => (
  <div
    className={cn(
      "relative",
      variant === "heavy"
        ? "border-[3px] border-accent/70 shadow-[0_0_0_2px_hsl(var(--background)),0_0_0_7px_hsl(var(--background)),0_0_0_8px_hsl(var(--accent)/0.45),0_24px_60px_-12px_rgba(0,0,0,0.75)]"
        : "border border-accent/40",
      className
    )}
  >
    {children}
    {scrolls && (
      <>
        <CornerScroll corner="tl" delay={scrollDelay} inView={scrollsInView} />
        <CornerScroll corner="tr" delay={scrollDelay + 0.08} inView={scrollsInView} />
        <CornerScroll corner="bl" delay={scrollDelay + 0.16} inView={scrollsInView} />
        <CornerScroll corner="br" delay={scrollDelay + 0.24} inView={scrollsInView} />
      </>
    )}
  </div>
);
