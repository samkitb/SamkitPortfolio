import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&@*+=/\\<>";

/* Heading that resolves out of noise, scrambling glyphs flashing vermillion. */
export const Decode = ({ text, className }: { text: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = text;
      prev.current = text;
      return;
    }
    const from = prev.current;
    const len = Math.max(from.length, text.length);
    const q = Array.from({ length: len }, (_, i) => ({
      from: from[i] || "",
      to: text[i] || "",
      s: (Math.random() * 20) | 0,
      e: ((Math.random() * 20) | 0) + 20,
      c: "",
    }));
    let f = 0, raf = 0, dead = false;
    const run = () => {
      if (dead) return;
      let out = "", done = 0;
      for (const t of q) {
        if (f >= t.e) { done++; out += t.to; }
        else if (f >= t.s) {
          if (!t.c || Math.random() < 0.28) t.c = GLYPHS[(Math.random() * GLYPHS.length) | 0];
          out += `<span style="color:#c0392b">${t.c}</span>`;
        } else out += t.from;
      }
      el.innerHTML = out;
      if (done < q.length) { f++; raf = requestAnimationFrame(run); }
      else prev.current = text;
    };
    run();
    return () => { dead = true; cancelAnimationFrame(raf); };
  }, [text]);

  return <span ref={ref} className={className} />;
};

/* Departure-board flap: each character cycles then lands, staggered. */
export const SplitFlap = ({ words, interval = 3600 }: { words: string[]; interval?: number }) => {
  const [idx, setIdx] = useState(0);
  const [cells, setCells] = useState<string[]>(() => Array(14).fill(" "));
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (words.length < 2) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words, interval]);

  useEffect(() => {
    const target = (words[idx] || "").toUpperCase();
    const N = 14;
    const pad = Math.max(0, Math.floor((N - target.length) / 2));
    timers.current.forEach((t) => window.clearInterval(t));
    timers.current = [];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCells(Array.from({ length: N }, (_, i) => target[i - pad] || " "));
      return;
    }
    for (let i = 0; i < N; i++) {
      const want = target[i - pad] || " ";
      let n = 0;
      const steps = 6 + i * 2;
      const t = window.setInterval(() => {
        n++;
        setCells((c) => {
          const next = [...c];
          next[i] = n >= steps ? want : GLYPHS[(Math.random() * 26) | 0];
          return next;
        });
        if (n >= steps) window.clearInterval(t);
      }, 44);
      timers.current.push(t);
    }
    return () => { timers.current.forEach((t) => window.clearInterval(t)); };
  }, [idx, words]);

  return (
    <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }} aria-label={words[idx]}>
      {cells.map((ch, i) => (
        <span
          key={i}
          style={{
            width: 17, height: 24, display: "grid", placeItems: "center",
            border: "1px solid var(--hair)", background: "var(--paper)",
            fontSize: 11, letterSpacing: 0, color: ch === " " ? "transparent" : "var(--ink)",
          }}
        >
          {ch}
        </span>
      ))}
    </div>
  );
};
