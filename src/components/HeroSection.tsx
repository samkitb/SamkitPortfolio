import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Linkedin, ArrowDown, FileText } from "lucide-react";
import { ShaderBackground } from "@/components/ShaderBackground";
import { ScrambleText } from "@/components/ScrambleText";
import resume from "../assets/Bothra-CV-2025.pdf";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

export const HeroSection = () => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        tl.to(contentRef.current, { yPercent: -12, scale: 1.12, opacity: 0, ease: "none" }, 0)
          .to(bgRef.current, { yPercent: 18, opacity: 0.3, ease: "none" }, 0);
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const reveal = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 28 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay: 0.15 + i * 0.12 },
  });

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden">
      <div ref={bgRef} aria-hidden className="absolute inset-0">
        <ShaderBackground className="absolute inset-0 h-full w-full" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(40 18% 90% / 0.6) 1px, transparent 1px), linear-gradient(90deg, hsl(40 18% 90% / 0.6) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 42%, black, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 42%, black, transparent 75%)",
          }}
        />
      </div>

      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24">
        <div>
          <motion.div {...reveal(0)} className="mb-7 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <ScrambleText
              text="Researcher · Technologist · Mentor"
              trigger="mount"
              delay={700}
              duration={1100}
              className="eyebrow"
            />
          </motion.div>

          <motion.h1
            {...reveal(1)}
            className="font-display text-[3.4rem] font-semibold leading-[0.98] tracking-tight text-foreground sm:text-7xl md:text-[7.5rem]"
          >
            Samkit Bothra
          </motion.h1>

          <motion.p
            {...reveal(2)}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl"
          >
            Dual-enrolled at Florida Atlantic University, building research at the intersection of{" "}
            <span className="text-foreground">AI</span>, <span className="text-foreground">sensing</span>, and{" "}
            <span className="text-foreground">human health</span>.
          </motion.p>

          <motion.div {...reveal(3)} className="mt-10 flex flex-wrap items-center gap-4">
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
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-border p-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-muted-foreground" />
        </motion.div>
      </motion.a>
    </section>
  );
};
