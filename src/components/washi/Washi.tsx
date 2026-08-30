import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./washi.css";
import { BrushName } from "./BrushName";
import { ParticlePortrait } from "./ParticlePortrait";
import { PhysicsTags } from "./PhysicsTags";
import { Suminagashi } from "./Suminagashi";
import { FlipDeck } from "./FlipDeck";
import { PubCard } from "./PubCard";
import { Awards } from "./Awards";
import { Decode, SplitFlap } from "./TextFx";
import { LOGOS } from "./logos";
import { ABOUT, EDUCATION, EXPERIENCE, PROFILE, SKILLS, WORKS } from "./data";

const TABS = [
  { id: "about", label: "About", title: "About me" },
  { id: "education", label: "Education", title: "Education" },
  { id: "experience", label: "Experience", title: "Experience" },
  { id: "works", label: "Projects", title: "Projects" },
  { id: "honors", label: "Honours", title: "Honours" },
  { id: "contact", label: "Contact", title: "Contact" },
] as const;

/* **bold** → <strong> */
const rich = (s: string) =>
  s.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part
  );

export const Washi = () => {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("about");
  const [open, setOpen] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  /* `top` too, not just left/width — with six tabs the bar can wrap, and an
     indicator pinned to the container's bottom edge would sit under the wrong row. */
  const [ind, setInd] = useState({ left: 0, width: 0, top: 0 });

  const active = TABS.find((t) => t.id === tab)!;

  const measure = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;
    const btn = bar.querySelector<HTMLButtonElement>(`button[data-id="${tab}"]`);
    if (btn) setInd({ left: btn.offsetLeft, width: btn.offsetWidth, top: btn.offsetTop + btn.offsetHeight - 1 });
  }, [tab]);

  useLayoutEffect(measure, [measure]);
  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    if (open === null) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <div className="washi">
      <div className="w-wrap">
        {/* ── hero ───────────────────────────── */}
        <header className="w-hero">
          <BrushName text={PROFILE.name} />
          <div className="w-herofoot">
            <SplitFlap words={PROFILE.roles} />
            <span className="w-hint">click and drag to paint</span>
          </div>
        </header>

        {/* ── card ───────────────────────────── */}
        <div className="w-shell">
          <aside className="w-side">
            <ParticlePortrait />
            <div className="w-sname">{PROFILE.name}</div>
            <div className="w-role w-cap">{PROFILE.reading}</div>
            <div className="w-rule" />
            <div className="w-info">
              <div>
                <div className="k">Email</div>
                <div className="v"><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></div>
                <div className="v"><a href={`mailto:${PROFILE.emailEdu}`}>{PROFILE.emailEdu}</a></div>
              </div>
              <div>
                <div className="k">Phone</div>
                <div className="v">{PROFILE.phone}</div>
              </div>
              <div>
                <div className="k">Location</div>
                <div className="v">{PROFILE.location}</div>
              </div>
              <div>
                <div className="k">Focus</div>
                <div className="v">
                  <span className="w-nb">Software Development</span> ·{" "}
                  <span className="w-nb">Quantitative Finance</span> ·{" "}
                  <span className="w-nb">Biotechnology</span>
                </div>
              </div>
            </div>
            <div className="w-socials">
              <a href={`mailto:${PROFILE.email}`} title="Email" aria-label="Email">
                <svg viewBox="0 0 24 24" aria-hidden focusable="false">
                  <path d="M2.25 5.25h19.5v13.5H2.25z" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M3 6.5l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden focusable="false"><path d={LOGOS.linkedin} /></svg>
              </a>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">
                <svg viewBox="0 0 24 24" aria-hidden focusable="false"><path d={LOGOS.github} /></svg>
              </a>
            </div>
            <div className="w-seal" style={{ marginTop: 24 }}>印</div>
          </aside>

          <main>
            <div className="w-tabs" ref={barRef}>
              <span className="w-ind" style={{ width: ind.width, transform: `translate(${ind.left}px, ${ind.top}px)` }} />
              {TABS.map((t) => (
                <button key={t.id} data-id={t.id} className={t.id === tab ? "on" : ""} onClick={() => setTab(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>

            <section className="w-panel">
              <div className="w-phead">
                <h2 className="w-ptitle"><Decode text={active.title} /></h2>
                {tab === "works" && (
                  <a
                    className="w-gh"
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="All projects on GitHub"
                    title="All projects on GitHub"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden focusable="false"><path d={LOGOS.github} /></svg>
                  </a>
                )}
              </div>
              <div className="w-psub"><span className="l" /></div>

              {tab === "about" && (
                <>
                  {ABOUT.map((p, i) => (
                    <p className="w-body" key={i}>{rich(p)}</p>
                  ))}
                  <div className="w-h3">Skills (drag them around)</div>
                  <PhysicsTags words={SKILLS} />
                </>
              )}

              {tab === "education" && <FlipDeck entries={EDUCATION} />}

              {tab === "experience" && <FlipDeck entries={EXPERIENCE} />}

              {tab === "works" && (
                <div className="w-works">
                  {WORKS.map((w, i) => (
                    <div className="w-work" key={w.n} onClick={() => setOpen(i)} role="button" tabIndex={0}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(i)}>
                      <div className="n">{w.n}</div>
                      <div>
                        <h4>{w.h}</h4>
                        <div className="st">{w.st}</div>
                        <div className="tk">{w.tech.join(" · ")}</div>
                        {(w.live || w.repo) && (
                          <div className="w-workmeta">
                            {w.live && <span className="w-livetag">Live site</span>}
                            {w.repo && (
                              <a
                                className="w-workgh"
                                href={w.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${w.h} repository on GitHub`}
                                title="View repository on GitHub"
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={(e) => e.stopPropagation()}
                              >
                                <svg viewBox="0 0 24 24" aria-hidden focusable="false"><path d={LOGOS.github} /></svg>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                      {w.shot && (
                        <div className="w-shot">
                          <img src={w.shot} alt={`${w.h} screenshot`} loading="lazy" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {tab === "honors" && (
                <>
                  <Awards />

                  <div className="w-h3">Publication</div>
                  <PubCard />
                </>
              )}

              {tab === "contact" && (
                <>
                  <p className="w-body">
                    Open to research collaboration, internships and speaking. Email reaches me fastest.
                  </p>
                  <div className="w-ct">
                    <div className="w-cell">
                      <div className="w-cap">Email</div>
                      <div className="v"><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></div>
                      <div className="v"><a href={`mailto:${PROFILE.emailEdu}`}>{PROFILE.emailEdu}</a></div>
                    </div>
                    <div className="w-cell">
                      <div className="w-cap">Phone</div>
                      <div className="v">{PROFILE.phone}</div>
                    </div>
                    <div className="w-cell">
                      <div className="w-cap">LinkedIn</div>
                      <div className="v"><a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">/in/samkit-bothra</a></div>
                    </div>
                    <div className="w-cell">
                      <div className="w-cap">GitHub</div>
                      <div className="v"><a href={PROFILE.github} target="_blank" rel="noopener noreferrer">/samkitb</a></div>
                    </div>
                  </div>
                  <Suminagashi />
                </>
              )}
            </section>
          </main>
        </div>

        <footer className="w-foot">
          <span className="w-cap">© {new Date().getFullYear()} {PROFILE.name}</span>
          <span className="w-cap">{PROFILE.site}</span>
        </footer>
      </div>

      {open !== null && (
        <div className="w-mask" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
          <div className="w-card">
            <button className="x" aria-label="Close" onClick={() => setOpen(null)}>×</button>
            <div className="w-cap">{WORKS[open].when}</div>
            <h3>{WORKS[open].h}</h3>
            {WORKS[open].shot && (
              <a
                className="w-shotbig"
                href={WORKS[open].live || undefined}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={WORKS[open].shot} alt={`${WORKS[open].h} screenshot`} />
              </a>
            )}
            <ul>{WORKS[open].bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            <div className="w-tags">{WORKS[open].tech.map((t) => <span key={t}>{t}</span>)}</div>
            <div className="w-links">
              {WORKS[open].live && (
                <a className="w-link primary" href={WORKS[open].live} target="_blank" rel="noopener noreferrer">
                  Visit live site ↗
                </a>
              )}
              {WORKS[open].repo && (
                <a className="w-link" href={WORKS[open].repo} target="_blank" rel="noopener noreferrer">
                  Source on GitHub ↗
                </a>
              )}
              {WORKS[open].demo && (
                <a className="w-link" href={WORKS[open].demo} target="_blank" rel="noopener noreferrer">
                  Watch demo ↗
                </a>
              )}
            </div>
            {WORKS[open].note && <div className="w-note">{WORKS[open].note}</div>}
          </div>
        </div>
      )}
    </div>
  );
};
