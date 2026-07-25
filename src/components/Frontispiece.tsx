import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Linkedin, ArrowDown, FileText } from "lucide-react";
import { GildedFrame } from "@/components/baroque/GildedFrame";
import { Flourish, Fleuron } from "@/components/baroque/ornaments";
import portrait from "../assets/PIC.png";
import resume from "../assets/Bothra-CV-2025.pdf";

gsap.registerPlugin(ScrollTrigger);
const EASE = [0.22, 1, 0.36, 1] as const;

export const Frontispiece = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [preloading, setPreloading] = useState(!reduce);

  useEffect(() => {
    if (!preloading) return;
    const t = window.setTimeout(() => setPreloading(false), 2600);
    return () => clearTimeout(t);
  }, [preloading]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(contentRef.current, { transformPerspective: 1200, transformOrigin: "50% 100%" });
        gsap.to(contentRef.current, {
          scale: 0.88,
          rotateX: 7,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + window.innerHeight * 1.1,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const base = reduce ? 0.1 : 1.35;
  const fadeUp = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section ref={sectionRef} className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <img
          src="/media/room-entrance.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "brightness(0.42) saturate(0.9) contrast(1.05)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 78% 74% at 50% 44%, transparent 0%, hsl(var(--background) / 0.6) 52%, hsl(var(--background)) 88%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 52%, hsl(var(--background)) 100%)" }}
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[38%] h-[62vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[110px]"
        style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.45), transparent 70%)" }}
      />

      <div ref={contentRef} className="relative z-10 flex w-full flex-col items-center">
        <motion.div {...fadeUp(base)}>
          <Fleuron width={96} inView={false} delay={base + 0.2} className="mx-auto mb-5" />
        </motion.div>

        <motion.div {...fadeUp(base + 0.1)}>
          <GildedFrame variant="heavy" scrolls scrollsInView={false} scrollDelay={base + 0.5} className="w-48 sm:w-56">
            <div className="relative aspect-[4/5] overflow-hidden bg-background">
              <img
                src={portrait}
                alt="Samkit Bothra"
                className="h-full w-full object-cover object-top"
                style={{ filter: "grayscale(1) contrast(1.08) brightness(0.9)" }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "hsl(36 48% 46%)", mixBlendMode: "color", opacity: 0.72 }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 88% 72% at 50% 30%, transparent 6%, hsl(var(--background) / 0.5) 60%, hsl(var(--background)) 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, hsl(40 60% 66% / 0.18), transparent 40%)" }}
              />
            </div>
          </GildedFrame>
        </motion.div>

        <div className="mt-9 text-center">
          <motion.div
            {...fadeUp(base + 0.25)}
            className="font-baroque-label text-[11px] uppercase tracking-[0.22em] text-accent"
          >
            a working retrospective
          </motion.div>
          <Flourish width={210} inView={false} delay={base + 0.5} className="mx-auto my-4" />
          <motion.h1
            {...fadeUp(base + 0.3)}
            className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-7xl md:text-8xl"
          >
            Samkit Bothra
          </motion.h1>
          <Flourish width={210} inView={false} delay={base + 0.7} flip className="mx-auto my-4" />
          <motion.div {...fadeUp(base + 0.4)} className="font-display text-lg italic text-muted-foreground sm:text-xl">
            researcher · technologist · mentor
          </motion.div>
        </div>

        <motion.div {...fadeUp(base + 0.55)} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
          >
            View work
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors duration-300 hover:border-accent/60 hover:text-accent"
          >
            <FileText className="h-4 w-4" />
            Résumé
          </a>
          <div className="ml-1 flex items-center gap-1">
            <a
              href="mailto:samkitbothra11@gmail.com"
              aria-label="Email"
              className="rounded-full p-2.5 text-muted-foreground transition-colors hover:text-accent"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/samkit-bothra/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full p-2.5 text-muted-foreground transition-colors hover:text-accent"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: base + 0.9, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <div className="font-baroque-label mb-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">scroll</div>
        <div className="mx-auto h-10 w-px bg-gradient-to-b from-accent to-transparent" />
      </motion.div>

      {preloading && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ clipPath: "circle(150% at 50% 40%)" }}
          animate={{ clipPath: "circle(0% at 50% 40%)" }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.85 }}
          onAnimationComplete={() => setPreloading(false)}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.span
              className="h-2 w-2 rounded-full bg-accent"
              style={{ boxShadow: "0 0 26px 7px hsl(var(--accent) / 0.6)" }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
            />
            <Fleuron width={110} inView={false} delay={0.35} />
          </div>
        </motion.div>
      )}
    </section>
  );
};
