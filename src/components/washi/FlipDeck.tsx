import { useState } from "react";
import { useFlipHeight } from "./useFlipHeight";

/* Flip cards, one per entry. The card IS the content: the front is the
   who/where/when, and flipping it reveals what was actually done, with the
   hard numbers pulled out in vermillion.

   Built for a small, discrete set (2-3 entries) — you flip specific cards,
   there's no continuum to scrub. Same idea as the skill tags: manipulate the
   real content object, don't decorate around it. */

type Entry = {
  h: string;
  org: string;
  when: string;
  mark: string;
  logo: string;
  badge?: string;
  bullets: string[];
};

/* pull the resume's real metrics out of a bullet so they can be highlighted */
const METRIC = /(\$[\d,]+K?\+?|\d+(?:\.\d+)?%|\d+(?:\.\d+)?×|\b\d+K(?:-term)?\b|Top-\d+|Recall@\d+|\b\d+-fold\b|\b\d+-pt\b|\b\d{1,3}(?:,\d{3})+\b)/g;

const withMetrics = (s: string) =>
  s.split(METRIC).map((part, i) =>
    i % 2 === 1 ? (
      <span className="w-num" key={i}>
        {part}
      </span>
    ) : (
      part
    )
  );

const Card = ({ e }: { e: Entry }) => {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((v) => !v);
  const { frontRef, backRef, height } = useFlipHeight(flipped);

  return (
    <div
      className={flipped ? "w-fc flipped" : "w-fc"}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${e.h}, ${e.org}. ${flipped ? "Showing what I did" : "Flip to see what I did"}`}
      onClick={toggle}
      onKeyDown={(ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          toggle();
        }
      }}
    >
      <div className="w-flip" style={{ height }}>
        <div className="w-face w-back" ref={backRef}>
          <div className="w-fcap">What I did</div>
          {e.bullets.length > 0 ? (
            <ul>
              {e.bullets.map((b) => (
                <li key={b}>{withMetrics(b)}</li>
              ))}
            </ul>
          ) : (
            <p className="w-empty">{e.badge || "Starting Fall 2026."}</p>
          )}
          <div className="w-fliphint">← flip back</div>
        </div>

        <div className="w-face w-front" ref={frontRef}>
          <div className="w-fmark">{e.logo ? <img src={e.logo} alt="" aria-hidden /> : e.mark}</div>
          <div className="w-fbody">
            <h4>{e.h}</h4>
            <div className="org">{e.org}</div>
            <div className="when">{e.when}</div>
            {e.badge && <div className="w-badge">{e.badge}</div>}
          </div>
          <div className="w-fseal" aria-hidden>
            印
          </div>
          <div className="w-fliphint">click to see what I did →</div>
        </div>
      </div>
    </div>
  );
};

export const FlipDeck = ({ entries }: { entries: Entry[] }) => (
  <div className="w-deck">
    {entries.map((e) => (
      <Card e={e} key={e.h} />
    ))}
  </div>
);
