import { useEffect, useRef } from "react";
import { LOGOS } from "./logos";

export type Skill = { t: string; icon?: string };

/* Skills with weight — they drop in, pile up, and can be grabbed and thrown.
   Brand marks are filled as Path2D from the 24x24 Simple Icons paths, in ink,
   so the logos never break the palette. */
export const PhysicsTags = ({ words, height = 280 }: { words: Skill[]; height?: number }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const font = getComputedStyle(cv).fontFamily;
    const ICON = 14, PADX = 12, GAP = 8;

    const paths = new Map<string, Path2D>();
    words.forEach((w) => {
      if (w.icon && LOGOS[w.icon] && !paths.has(w.icon)) paths.set(w.icon, new Path2D(LOGOS[w.icon]));
    });

    type B = { w: number; h: number; x: number; y: number; vx: number; vy: number; s: Skill };
    let box: B[] = [];
    let W = 0, H = height, raf = 0, dead = false;
    let drag: { b: B; dx: number; dy: number } | null = null;
    let last = { x: 0, y: 0 };

    const build = () => {
      W = cv.clientWidth || 700;
      cv.width = W * DPR; cv.height = H * DPR;
      cv.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.font = `300 12px ${font}`;
      box = words.map((s, i) => {
        const iconW = s.icon && paths.has(s.icon) ? ICON + GAP : 0;
        const tw = ctx.measureText(s.t).width + PADX * 2 + iconW;
        return {
          w: tw, h: 32,
          x: 16 + Math.random() * Math.max(40, W - tw - 32),
          y: reduce ? H - 44 - (i % 5) * 34 : -40 - i * 40,
          vx: reduce ? 0 : (Math.random() - 0.5) * 1.1,
          vy: 0, s,
        };
      });
    };

    const at = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onDown = (e: PointerEvent) => {
      const m = at(e);
      for (let i = box.length - 1; i >= 0; i--) {
        const b = box[i];
        if (m.x > b.x && m.x < b.x + b.w && m.y > b.y && m.y < b.y + b.h) {
          cv.setPointerCapture(e.pointerId);
          drag = { b, dx: m.x - b.x, dy: m.y - b.y };
          last = m;
          break;
        }
      }
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const m = at(e);
      drag.b.x = m.x - drag.dx; drag.b.y = m.y - drag.dy;
      drag.b.vx = (m.x - last.x) * 0.9; drag.b.vy = (m.y - last.y) * 0.9;
      last = m;
    };
    const onUp = () => { drag = null; };
    let rt: number;
    const onResize = () => { window.clearTimeout(rt); rt = window.setTimeout(build, 220); };

    build();
    cv.addEventListener("pointerdown", onDown);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("dblclick", build);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("resize", onResize);

    const loop = () => {
      if (dead) return;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#f7f4ed";
      ctx.fillRect(0, 0, W, H);

      box.forEach((b) => {
        if (drag && drag.b === b) return;
        b.vy += 0.4; b.x += b.vx; b.y += b.vy; b.vx *= 0.995;
        if (b.x < 0) { b.x = 0; b.vx *= -0.45; }
        if (b.x + b.w > W) { b.x = W - b.w; b.vx *= -0.45; }
        if (b.y + b.h > H) { b.y = H - b.h; b.vy *= -0.3; b.vx *= 0.86; if (Math.abs(b.vy) < 1) b.vy = 0; }
      });
      for (let i = 0; i < box.length; i++)
        for (let j = i + 1; j < box.length; j++) {
          const a = box[i], d = box[j];
          if (a.x < d.x + d.w && a.x + a.w > d.x && a.y < d.y + d.h && a.y + a.h > d.y) {
            const oy = Math.min(a.y + a.h - d.y, d.y + d.h - a.y);
            const ox = Math.min(a.x + a.w - d.x, d.x + d.w - a.x);
            if (oy < ox) {
              if (a.y < d.y) { a.y -= oy / 2; d.y += oy / 2; } else { a.y += oy / 2; d.y -= oy / 2; }
              a.vy *= 0.5; d.vy *= 0.5;
            } else {
              if (a.x < d.x) { a.x -= ox / 2; d.x += ox / 2; } else { a.x += ox / 2; d.x -= ox / 2; }
              a.vx *= 0.5; d.vx *= 0.5;
            }
          }
        }

      ctx.font = `300 12px ${font}`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      box.forEach((b) => {
        const held = !!drag && drag.b === b;
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = held ? "rgba(192,57,43,.85)" : "rgba(27,26,23,.16)";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.rect(b.x, b.y, b.w, b.h); ctx.fill(); ctx.stroke();

        const p = b.s.icon ? paths.get(b.s.icon) : undefined;
        let tx = b.x + PADX;
        if (p) {
          ctx.save();
          ctx.translate(tx, b.y + b.h / 2 - ICON / 2);
          ctx.scale(ICON / 24, ICON / 24);
          ctx.fillStyle = held ? "rgba(192,57,43,.95)" : "rgba(27,26,23,.72)";
          ctx.fill(p);
          ctx.restore();
          tx += ICON + GAP;
        }
        ctx.fillStyle = held ? "rgba(192,57,43,.95)" : "rgba(27,26,23,.78)";
        ctx.fillText(b.s.t, tx, b.y + b.h / 2 + 1);
      });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(rt);
      cv.removeEventListener("pointerdown", onDown);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("dblclick", build);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", onResize);
    };
  }, [words, height]);

  return (
    <div className="w-skills">
      <canvas ref={ref} aria-label={"Skills: " + words.map((w) => w.t).join(", ")} />
    </div>
  );
};
