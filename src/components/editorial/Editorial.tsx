import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import portrait from "@/assets/PIC.png";
import resume from "@/assets/Bothra-CV-2025.pdf";

/* ── data ─────────────────────────────────────────────────────────── */

const projects = [
  { num: "I", title: "Underwater Acoustic Sensing", meta: "2025 · Python · Linux · C", link: null as string | null },
  { num: "II", title: "Wearable IMU Rehab Sensors", meta: "First-author · Python", link: "https://wseas.com/journals/articles.php?id=11059" },
  { num: "III", title: "AI & Social-Media Polling", meta: "1st place · SPSS", link: null },
  { num: "IV", title: "ResearchConnectAI", meta: "Co-founder · React · Node", link: "https://researchconnectai.com" },
];

const awards = [
  { t: "1st Place, Research Symposium", m: "2025" },
  { t: "DECA International Qualifier", m: "District 1st" },
  { t: "Florida State Champion — Golf", m: "State" },
  { t: "Lincoln-Douglas Debate", m: "Award" },
];

const experience = [
  { t: "Student Mayor of Parkland", m: "2024–" },
  { t: "Jain Center Youth President", m: "500+ events" },
  { t: "FAU Research Peer Mentor", m: "STAR Lab" },
  { t: "Physics & Math Tutor", m: "FAU" },
];

const stats = [
  { fig: "3.8", lab: "GPA" },
  { fig: "80+", lab: "College credits" },
  { fig: "IV", lab: "Major projects" },
  { fig: "V", lab: "Presentations" },
];

const marquee = [
  ["Machine Learning", true], ["Acoustic Sensing", false], ["Wearable IMU", true],
  ["Undergraduate Research", false], ["First-Author Paper", true], ["NCUR · FURC", false],
] as const;

const GOLD = "hsl(var(--accent))";
const label = "font-baroque-label uppercase tracking-[0.28em]";

/* ── small ornament ───────────────────────────────────────────────── */

const GildRule = ({ className = "" }: { className?: string }) => (
  <div aria-hidden className={`flex items-center gap-3 text-accent ${className}`}>
    <span className="h-px max-w-[120px] flex-1" style={{ background: "linear-gradient(90deg,transparent,hsl(var(--accent)))" }} />
    <span className="h-[7px] w-[7px] rotate-45" style={{ background: GOLD, boxShadow: "0 0 12px hsl(var(--accent) / 0.5)" }} />
    <span className="h-px max-w-[120px] flex-1" style={{ background: "linear-gradient(90deg,hsl(var(--accent)),transparent)" }} />
  </div>
);

const SectionHead = ({ title, note, id }: { title: string; note: string; id?: string }) => (
  <div id={id} className="scroll-mt-24 pb-5 pt-16 md:pt-[70px]">
    <div className="mb-3.5 flex items-baseline justify-between">
      <h2 className="font-display text-[clamp(26px,4vw,46px)] font-bold tracking-[-0.01em] text-foreground">{title}</h2>
      <span className={`${label} text-[11px] text-accent`}>{note}</span>
    </div>
    <GildRule />
  </div>
);

/* ── page ─────────────────────────────────────────────────────────── */

export const Editorial = () => (
  <div id="top" className="grain relative min-h-screen bg-background text-foreground">
    {/* top bar */}
    <div className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4 md:px-8">
        <a href="#top" className="font-display text-base font-bold tracking-wide text-foreground">
          <span className="text-accent">◆</span> Samkit Bothra
        </a>
        <div className={`${label} hidden text-[11px] text-accent sm:block`}>Portfolio · MMXXVI · Florida Atlantic</div>
      </div>
    </div>

    {/* hero */}
    <header className="px-6 pt-14 md:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_280px]">
          <div>
            <div className={`mb-6 ${label} text-[11px] text-accent`}>Index No. I — Researcher · Technologist · Mentor</div>
            <h1 className="font-display font-extrabold leading-[0.9] tracking-[-0.015em]">
              <span className="block text-[clamp(52px,13vw,180px)]">Samkit</span>
              <span className="block text-[clamp(52px,13vw,180px)] text-transparent" style={{ WebkitTextStroke: "1.3px hsl(var(--accent))" }}>
                Bothra
              </span>
            </h1>
          </div>
          <div className="relative hidden self-stretch border md:block" style={{ borderColor: "#9c8355" }}>
            <img
              src={portrait}
              alt="Samkit Bothra"
              className="h-full max-h-[430px] w-full object-cover object-top"
              style={{ filter: "grayscale(1) contrast(1.12) brightness(0.92)" }}
            />
            <div aria-hidden className="absolute inset-0" style={{ background: "hsl(36 48% 46%)", mixBlendMode: "color", opacity: 0.62 }} />
            <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent 55%,rgba(12,10,8,0.6))" }} />
          </div>
        </div>

        <GildRule className="mt-7" />

        <div className="flex flex-wrap items-baseline justify-between gap-6 pt-6">
          <p className="max-w-[620px] font-display text-[clamp(16px,1.9vw,22px)] italic text-foreground/85">
            Building at the intersection of AI, sensing and human health — from underwater acoustics to wearable rehabilitation sensors.
          </p>
          <div className={`${label} text-[11px] leading-[2] text-muted-foreground`}>
            Computer Science · Financial Technology<br />
            B.S. · Florida Atlantic · GPA 3.8
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <a href="#work" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03]">
            View work
          </a>
          <a href={resume} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent">
            Résumé
          </a>
        </div>
      </div>

      {/* marquee */}
      <div className="mt-8 overflow-hidden border-y border-border">
        <div className="inline-flex animate-marquee whitespace-nowrap py-3.5">
          {[0, 1].map((dup) => (
            <div key={dup} className="inline-flex" aria-hidden={dup === 1}>
              {marquee.map(([term, strong], i) => (
                <span key={`${dup}-${i}`} className="flex items-center">
                  <span className={`px-6 font-display text-base ${strong ? "font-bold text-foreground" : "text-muted-foreground"}`}>{term}</span>
                  <span className="px-6 font-display text-base text-accent">❦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>

    {/* selected work */}
    <section className="mx-auto max-w-[1180px] px-6 md:px-8">
      <SectionHead id="work" title="Selected Work" note="IV Entries" />
      <Reveal className="border-t-2 border-[#9c8355]">
        {projects.map((p) => (
          <div
            key={p.num}
            className={`group relative grid grid-cols-[52px_1fr] items-center gap-4 border-b border-border px-2 py-6 transition-[background,color,padding] duration-200 hover:bg-accent hover:pl-6 hover:text-[#12100a] md:grid-cols-[74px_1fr_auto] md:px-3.5 ${p.link ? "cursor-pointer" : ""}`}
          >
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer" aria-label={p.title} className="absolute inset-0 z-10" />
            )}
            <div className={`${label} text-sm tracking-[0.14em] text-accent group-hover:text-[#2a2312]`}>{p.num}</div>
            <div className="font-display text-[clamp(22px,3.3vw,38px)] font-bold leading-[1.02] tracking-[-0.01em]">{p.title}</div>
            <div className={`hidden items-center justify-end gap-2 text-right ${label} text-[10.5px] tracking-[0.16em] text-muted-foreground group-hover:text-[#2a2312] md:flex`}>
              {p.meta}
              {p.link && <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />}
            </div>
          </div>
        ))}
      </Reveal>
    </section>

    {/* statement */}
    <section className="relative mt-[78px] overflow-hidden py-20 md:py-[86px]" style={{ background: "#e9ddc2", color: "#211a10" }}>
      <span aria-hidden className="absolute left-[22px] top-[22px] h-20 w-20 border-l-2 border-t-2" style={{ borderColor: "#9c8355", opacity: 0.5 }} />
      <span aria-hidden className="absolute bottom-[22px] right-[22px] h-20 w-20 border-b-2 border-r-2" style={{ borderColor: "#9c8355", opacity: 0.5 }} />
      <div className="mx-auto max-w-[1180px] px-6 md:px-8">
        <Reveal>
          <div className={`${label} text-[11px]`} style={{ color: "#9c8355" }}>Statement</div>
          <p className="mt-5 max-w-[17ch] font-display text-[clamp(28px,4.8vw,60px)] font-normal leading-[1.04] tracking-[-0.01em]">
            I use technology to solve problems that <em className="italic" style={{ color: "#9c8355" }}>matter</em> — from the ocean floor to the clinic.
          </p>
          <div className={`mt-7 ${label} text-[11px]`} style={{ color: "#6a624b" }}>
            Presented at NCUR (Pittsburgh) · FURC (Tampa) · BristleCon (San Francisco)
          </div>
        </Reveal>
      </div>
    </section>

    {/* ledger */}
    <section className="mx-auto max-w-[1180px] px-6 pt-[74px] md:px-8">
      <Reveal className="grid grid-cols-2 border-b border-t-2 border-t-[#9c8355] md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.lab} className="border-r border-border px-5 py-9 [&:last-child]:border-r-0 max-md:[&:nth-child(2n)]:border-r-0 md:px-6">
            <div className="font-display text-[clamp(44px,6vw,80px)] font-bold leading-[0.9] tracking-[-0.02em]">{s.fig}</div>
            <div className={`mt-3.5 ${label} text-[11px] text-muted-foreground`}>{s.lab}</div>
          </div>
        ))}
      </Reveal>
    </section>

    {/* honors & service */}
    <section className="mx-auto max-w-[1180px] px-6 md:px-8">
      <SectionHead id="honors" title="Honors & Service" note="Index" />
      <div className="grid gap-x-12 pt-5 md:grid-cols-2">
        {[{ h: "Awards", rows: awards }, { h: "Experience", rows: experience }].map((col) => (
          <Reveal key={col.h}>
            <h3 className={`${label} border-b pb-3 text-[11px] tracking-[0.24em] text-accent`} style={{ borderColor: "#9c8355" }}>{col.h}</h3>
            {col.rows.map((r) => (
              <div key={r.t} className="flex items-center justify-between gap-4 border-b border-border py-4">
                <span className="font-display text-[17px] font-semibold text-foreground">{r.t}</span>
                <span className={`${label} shrink-0 text-[10px] tracking-[0.14em] text-muted-foreground`}>{r.m}</span>
              </div>
            ))}
          </Reveal>
        ))}
      </div>
    </section>

    {/* contact */}
    <section id="contact" className="mx-auto max-w-[1180px] scroll-mt-24 px-6 pb-9 pt-24 md:px-8">
      <Reveal>
        <div className={`mb-5 ${label} text-[11px] text-accent`}>Get in touch</div>
        <div className="font-display text-[clamp(56px,13vw,168px)] font-extrabold leading-[0.9] tracking-[-0.02em]">
          <a href="mailto:samkitbothra11@gmail.com" className="transition-colors hover:text-accent">
            Let’s<br />talk ↗
          </a>
        </div>
        <div className={`flex flex-wrap gap-7 pt-6 ${label} text-[11px] text-muted-foreground`}>
          <a href="mailto:samkitbothra11@gmail.com" className="transition-colors hover:text-accent">samkitbothra11@gmail.com</a>
          <a href="https://www.linkedin.com/in/samkit-bothra/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">LinkedIn</a>
          <a href="https://researchconnectai.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">ResearchConnectAI</a>
        </div>
      </Reveal>
    </section>

    <footer className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-2.5 border-t border-border px-6 py-6 md:px-8">
      <div className={`${label} text-[11px] text-muted-foreground`}>© MMXXVI Samkit Bothra</div>
      <div className={`${label} text-[11px] text-muted-foreground`}>Designed with intent</div>
    </footer>
  </div>
);
