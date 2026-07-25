import { motion, useReducedMotion } from "framer-motion";
import { Mail, Linkedin, ArrowDown, FileText } from "lucide-react";
import { HeroScene } from "@/components/HeroScene";
import resume from "../assets/Bothra-CV-2025.pdf";

const EASE = [0.22, 1, 0.36, 1] as const;

export const SignalHero = () => {
  const reduce = useReducedMotion();
  const reveal = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 26 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay: 0.15 + i * 0.12 },
  });

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[90px]"
        style={{ background: "radial-gradient(circle, hsl(38 50% 45% / 0.5), transparent 70%)" }}
      />
      <HeroScene className="absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 55% 45% at 50% 50%, hsl(240 6% 7% / 0.62), transparent 72%)" }}
      />
      <div className="relative z-10">
        <motion.div {...reveal(1)} className="eyebrow mb-6">
          Researcher · Technologist · Mentor
        </motion.div>
        <motion.h1
          {...reveal(2)}
          className="font-display text-[3.4rem] font-semibold leading-[0.95] tracking-tight text-foreground sm:text-7xl md:text-[8rem]"
        >
          Samkit Bothra
        </motion.h1>
        <motion.p
          {...reveal(3)}
          className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl"
        >
          Building research at the intersection of <span className="text-foreground">AI</span>,{" "}
          <span className="text-foreground">sensing</span>, and <span className="text-foreground">human health</span>.
        </motion.p>
        <motion.div {...reveal(4)} className="mt-9 flex flex-wrap items-center justify-center gap-4">
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
            <a href="mailto:samkitbothra11@gmail.com" aria-label="Email" className="rounded-full p-2.5 text-muted-foreground transition-colors hover:text-accent">
              <Mail className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/samkit-bothra/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full p-2.5 text-muted-foreground transition-colors hover:text-accent">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <div className="eyebrow mb-3">Scroll</div>
        <div className="mx-auto h-10 w-px animate-pulse bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
};
