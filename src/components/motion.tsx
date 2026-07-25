import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = [0.22, 1, 0.36, 1] as const;

/* Lenis smooth scroll driven by gsap.ticker (autoRaf:false — Lenis must not
   also run its own internal raf loop, or its scroll target gets double-driven
   and scrollTo() silently stalls). Bails to native scroll under reduced-motion. */
export const ScrollManager = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 400);
      return () => clearTimeout(refreshId);
    }

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    const onTick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -72 });
    };
    document.addEventListener("click", onClick);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      gsap.ticker.remove(onTick);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      clearTimeout(refreshId);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return <>{children}</>;
};

/* Thin brass progress bar pinned to the top of the viewport. */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-accent/80"
    />
  );
};

/* Single element that fades + rises into view once. */
export const Reveal = ({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};

/* Container that staggers its <StaggerItem> children as they enter. */
export const Stagger = ({
  children,
  className,
  gap = 0.09,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : gap } } }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({
  children,
  className,
  y = 26,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
        show: reduce ? { opacity: 1 } : { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
};
