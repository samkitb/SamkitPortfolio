import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/* A "pool of light" scene. A baroque room sits full-bleed behind the content,
   darkened and vignetted so it emerges from the page's near-black at the top,
   glows warm where the content sits, and melts back into black at the bottom —
   the chiaroscuro reveal. The backdrop drifts with a slow parallax on scroll.

   `focus` is the "x% y%" center of the lit pool. `scrim` adds an extra dark
   wash for text-heavy scenes where legibility beats drama. */
export const Chiaroscuro = ({
  image,
  children,
  className,
  focus = "50% 42%",
  scrim = false,
}: {
  image: string;
  children: ReactNode;
  className?: string;
  focus?: string;
  scrim?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4.5%", "4.5%"]);

  return (
    <div ref={ref} className={cn("relative isolate overflow-hidden", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.img
          src={image}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute -inset-[8%] h-[116%] w-[116%] object-cover"
          style={{
            y: reduce ? 0 : y,
            filter: "brightness(0.5) saturate(0.9) contrast(1.05)",
          }}
        />
        {/* radial pool of light fading to the page background at the edges */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 70% at ${focus}, transparent 0%, hsl(var(--background) / 0.55) 50%, hsl(var(--background)) 86%)`,
          }}
        />
        {/* vertical blend so adjacent sections dissolve into this one */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--background)) 0%, transparent 20%, transparent 80%, hsl(var(--background)) 100%)",
          }}
        />
        {/* warm candlelight tint over the lit pool */}
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 48% 46% at ${focus}, hsl(38 46% 52% / 0.13), transparent 62%)` }}
        />
        {scrim && <div className="absolute inset-0" style={{ background: "hsl(var(--background) / 0.42)" }} />}
      </div>
      {children}
    </div>
  );
};
