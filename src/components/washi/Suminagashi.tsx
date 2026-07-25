import { useEffect, useRef } from "react";

/* Suminagashi — the Japanese "floating ink" marbling technique. Ink dropped on
   still water spreads into concentric rings; fanning the surface drags them into
   the wood-grain curves the paper is known for.

   Click to drop ink, move to stir. Mechanically unlike anything else on the page:
   the brush paints along the pointer, the portrait repels from it, the skill tags
   are rigid bodies. Here the pointer is a current, and the ink only ever expands.

   Each ring is a real polygon of points, not a circle with a radius, so a
   distortion pushed into it persists and compounds as the ring grows. That is
   the whole reason it looks like ink instead of like ripples. */

type Pt = { x: number; y: number };
type Ring = { pts: Pt[]; cx: number; cy: number; life: number; red: boolean };

const N = 110; // points per ring
const MAX_RINGS = 96;
const TRAIL = 46; // px of pointer travel between trail rings

export const Suminagashi = ({ height = 300 }: { height?: number }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    const H = height;
    let raf = 0;
    let dead = false;
    let rings: Ring[] = [];

    // pointer acts as a current, so velocity matters more than position
    let px = -9999, py = -9999, pvx = 0, pvy = 0;
    let trail = 0; // px travelled since the last trail ring

    const size = () => {
      W = cv.clientWidth || 600;
      cv.width = W * DPR;
      cv.height = H * DPR;
      cv.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const drop = (cx: number, cy: number, big = true) => {
      const n = big ? 5 + Math.floor(Math.random() * 3) : 2;
      for (let k = 0; k < n; k++) {
        // trail rings start larger, or the current collapses them into slivers
        const r0 = (big ? 3 : 7) + k * 3.8;
        const pts: Pt[] = [];
        for (let i = 0; i < N; i++) {
          const a = (i / N) * Math.PI * 2;
          pts.push({ x: cx + Math.cos(a) * r0, y: cy + Math.sin(a) * r0 });
        }
        // one vermillion ring per drop at most, and only sometimes — the accent
        // stops being an accent if every drop has it
        rings.push({ pts, cx, cy, life: 1, red: k === (big ? 2 : 0) && Math.random() < 0.35 });
      }
      if (rings.length > MAX_RINGS) rings.splice(0, rings.length - MAX_RINGS);
    };

    const at = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onDown = (e: PointerEvent) => {
      const m = at(e);
      drop(m.x, m.y);
      if (reduce) draw(); // no loop is running to pick it up
    };
    const onMove = (e: PointerEvent) => {
      const m = at(e);
      if (px > -9000) {
        pvx = m.x - px;
        pvy = m.y - py;
        // Lay ink as the pointer travels. Without this, moving over a canvas
        // whose rings have already faded does literally nothing, which is
        // exactly how this read as broken.
        trail += Math.hypot(m.x - px, m.y - py);
        if (trail > TRAIL) { trail = 0; drop(m.x, m.y, false); if (reduce) draw(); }
      }
      px = m.x; py = m.y;
    };
    const onLeave = () => { px = -9999; py = -9999; pvx = 0; pvy = 0; trail = 0; };

    let rt: number;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(() => { size(); rings = []; seed(); }, 220);
    };

    const seed = () => {
      // never show an empty box — a couple of resting rings invite the click
      drop(W * 0.38, H * 0.44);
      window.setTimeout(() => !dead && drop(W * 0.63, H * 0.6), reduce ? 0 : 900);
    };

    const step = () => {
      rings.forEach((ring) => {
        // ~23s to fade at 60fps. The first pass used 0.0019, which wiped the
        // canvas clean 8.6s after the tab opened.
        ring.life -= 0.0007;
        for (const p of ring.pts) {
          const dx = p.x - ring.cx, dy = p.y - ring.cy;
          const d = Math.hypot(dx, dy) || 1;
          // dr ∝ 1/r keeps the ink's area roughly constant, so rings race
          // outward at first and then creep — how a real drop behaves. Capped,
          // because uncapped this opens at 12px/frame and reads as a flash
          // rather than as ink spreading.
          const g = Math.min(2.4, 16 / d);
          p.x += (dx / d) * g;
          p.y += (dy / d) * g;

          const ex = p.x - px, ey = p.y - py;
          const ed = Math.hypot(ex, ey);
          if (ed < 88) {
            // gentle, and clamped — at 0.6 unclamped this flung single points
            // clear of their neighbours and shredded rings into wire scribbles
            const inf = (1 - ed / 88) ** 2;
            p.x += Math.max(-3.5, Math.min(3.5, pvx * inf * 0.42));
            p.y += Math.max(-3.5, Math.min(3.5, pvy * inf * 0.42));
          }
        }

        // Surface tension. Each point is drawn toward the midpoint of its two
        // neighbours, which is what keeps real ink rings smooth as they deform.
        // Without it the current tears the polygon apart.
        const q = ring.pts, n = q.length, out: Pt[] = new Array(n);
        for (let i = 0; i < n; i++) {
          const a = q[(i - 1 + n) % n], b = q[i], c = q[(i + 1) % n];
          out[i] = {
            x: b.x + ((a.x + c.x) / 2 - b.x) * 0.16,
            y: b.y + ((a.y + c.y) / 2 - b.y) * 0.16,
          };
        }
        ring.pts = out;
      });
      rings = rings.filter((r) => r.life > 0.02);
      // never sit on a blank canvas — an empty box is what "nothing happens"
      // looks like from the outside
      if (!rings.length) drop(W * (0.3 + Math.random() * 0.4), H * (0.3 + Math.random() * 0.4));
      pvx *= 0.86;
      pvy *= 0.86;
    };

    const draw = () => {
      ctx.fillStyle = "#f7f4ed";
      ctx.fillRect(0, 0, W, H);
      for (const ring of rings) {
        const a = Math.min(1, ring.life) * 0.72;
        // quadratics through midpoints — straight lineTo segments made every
        // deformation read as an angular kink instead of a flowing curve
        const q = ring.pts, n = q.length;
        ctx.beginPath();
        ctx.moveTo((q[n - 1].x + q[0].x) / 2, (q[n - 1].y + q[0].y) / 2);
        for (let i = 0; i < n; i++) {
          const cur = q[i], nxt = q[(i + 1) % n];
          ctx.quadraticCurveTo(cur.x, cur.y, (cur.x + nxt.x) / 2, (cur.y + nxt.y) / 2);
        }
        ctx.closePath();
        ctx.strokeStyle = ring.red ? `rgba(192,57,43,${a})` : `rgba(27,26,23,${a})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const loop = () => {
      if (dead) return;
      step();
      draw();
      raf = requestAnimationFrame(loop);
    };

    size();
    seed();
    cv.addEventListener("pointerdown", onDown);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);

    if (reduce) draw();
    else loop();

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(rt);
      cv.removeEventListener("pointerdown", onDown);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [height]);

  return (
    <div className="w-sumi">
      <canvas ref={ref} aria-hidden />
      <span className="w-sumihint">move to draw ink · click to drop</span>
    </div>
  );
};
