import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Underwater Acoustic Sensing",
    description: "Real-time underwater data transmission using Raspberry Pi and Bristlemouth boards.",
    outcome: "Presented at BristleCon 2025 to the CEOs of Sofar Ocean and Bristlemouth.",
    tools: ["Python", "Linux", "WinSCP", "C"],
  },
  {
    title: "Wearable IMU Sensors for Rehab",
    description: "AI-powered 3D motion modeling to track head and neck posture.",
    outcome: "A precise motion-tracking system for medical rehab — first-author publication.",
    tools: ["Python", "Lenovo 3D Camera", "Excel"],
    link: "https://wseas.com/journals/articles.php?id=11059",
    linkLabel: "View publication",
  },
  {
    title: "AI & Social Media Polling",
    description: "Survey study on gendered perceptions of AI's influence on misinformation and privacy.",
    outcome: "Placed 1st in oral presentation at a university-wide symposium.",
    tools: ["SPSS", "Statistical Analysis", "Survey Design"],
  },
  {
    title: "ResearchConnectAI",
    description: "Co-founded a platform that makes research accessible to every student.",
    outcome: "Connects high-school and college students with professors for research opportunities.",
    tools: ["React", "Node.js", "PostgreSQL", "Python"],
    link: "https://researchconnectai.com",
    linkLabel: "Visit site",
  },
];

const SIGNALS = ["sonar", "imu", "data", "carrier"];

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        cardRefs.current.forEach((card, i) => {
          if (!card || i === projects.length - 1) return;
          gsap.to(card, {
            scale: 0.9,
            yPercent: -4,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 110px",
              end: "+=" + window.innerHeight,
              scrub: true,
            },
          });
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title="Research, built and shipped."
          description="Four projects spanning hardware, machine learning, and human-centered research. Keep scrolling — they stack."
        />

        <div className="relative">
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => (cardRefs.current[i] = el)}
              data-signal-mode={SIGNALS[i] ?? "carrier"}
              className="sticky"
              style={{ top: `${96 + i * 24}px`, marginBottom: "6vh" }}
            >
              <article className="relative flex min-h-[68vh] flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-12">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-16 select-none font-display text-[13rem] font-bold leading-none text-foreground/[0.04] md:text-[18rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex items-start justify-between">
                  <span className="eyebrow">
                    {String(i + 1).padStart(2, "0")} / {project.linkLabel ? "Live" : "Research"}
                  </span>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={project.linkLabel}
                      className="text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-accent"
                    >
                      <ArrowUpRight className="h-7 w-7" />
                    </a>
                  )}
                </div>

                <div className="relative max-w-3xl">
                  <h3 className="font-display text-4xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-6xl">
                    {project.title}
                  </h3>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
                    {project.description}
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground/70">{project.outcome}</p>
                </div>

                <div className="relative flex flex-wrap items-end justify-between gap-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
                    >
                      {project.linkLabel}
                      <ArrowUpRight className="h-4 w-4 text-accent" />
                    </a>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
