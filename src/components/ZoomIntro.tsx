import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Linkedin, ArrowDown, FileText } from "lucide-react";
import { ShaderBackground } from "@/components/ShaderBackground";
import resume from "../assets/Bothra-CV-2025.pdf";

gsap.registerPlugin(ScrollTrigger);

export const ZoomIntro = () => {
  const pinRef = useRef<HTMLDivElement>(null);
  const atomRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(atomRef.current, { scale: 9, opacity: 1 });
        gsap.set(nameRef.current, { scale: 0.4, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "+=260%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (!hudRef.current) return;
              const p = self.progress;
              const exp = Math.round(-9 + p * 9);
              hudRef.current.textContent = `10${superscript(exp)} m`;
            },
          },
        });

        tl.to(hintRef.current, { opacity: 0, duration: 0.18 }, 0)
          .to(atomRef.current, { scale: 1, ease: "power2.inOut", duration: 1 }, 0)
          .to(nameRef.current, { scale: 1, opacity: 1, ease: "power2.out", duration: 0.8 }, 0.42)
          .to(atomRef.current, { opacity: 0, duration: 0.5 }, 0.7);
      });
    }, pinRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={pinRef} className="relative h-screen overflow-hidden">
      <ShaderBackground className="absolute inset-0 h-full w-full" />

      <div ref={atomRef} className="pointer-events-none absolute inset-0 grid place-items-center">
        <div
          className="h-3 w-3 rounded-full bg-accent"
          style={{ boxShadow: "0 0 50px 16px hsl(38 62% 62% / 0.55)" }}
        />
      </div>

      <div ref={nameRef} className="absolute inset-0 grid place-items-center px-6 text-center">
        <div>
          <div className="eyebrow mb-6">Researcher · Technologist · Mentor</div>
          <h1 className="font-display text-[3.4rem] font-semibold leading-[0.96] tracking-tight text-foreground sm:text-7xl md:text-[8rem]">
            Samkit Bothra
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
            Building research at the intersection of <span className="text-foreground">AI</span>,{" "}
            <span className="text-foreground">sensing</span>, and <span className="text-foreground">human health</span>.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
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
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 items-center gap-3 md:flex">
        <span className="h-16 w-px bg-border" />
        <span ref={hudRef} className="font-display text-sm tabular-nums text-accent">
          10⁻⁹ m
        </span>
      </div>

      <div ref={hintRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
        <div className="eyebrow mb-3">Scroll to begin</div>
        <div className="mx-auto h-10 w-px animate-pulse bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
};

function superscript(n: number) {
  const map: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
  return String(n)
    .split("")
    .map((c) => map[c] ?? c)
    .join("");
}
