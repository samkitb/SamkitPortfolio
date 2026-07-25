import { useEffect, useRef } from "react";

/* Sumi brush hero. The name paints itself in on mount so it is never hidden,
   then the visitor can lay down their own ink over the paper. Their strokes
   live on top of a saved "base" layer, so the name can never be scrubbed out. */
export const BrushName = ({ text, height = 340 }: { text: string; height?: number }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const wipeRef = useRef<() => void>(() => {});

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const PAPER = "#fbf9f4";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const font = getComputedStyle(cv).fontFamily;

    const mask = document.createElement("canvas");
    const base = document.createElement("canvas");
    const name = document.createElement("canvas");
    const tmp = document.createElement("canvas");
    let mctx!: CanvasRenderingContext2D, bctx!: CanvasRenderingContext2D;
    let nctx!: CanvasRenderingContext2D, tctx!: CanvasRenderingContext2D;

    let W = 0, H = height, SIZE = 0;
    let down = false, last: { x: number; y: number } | null = null, speed = 0;
    let intro: { q: (null | { x: number; y: number; r: number })[]; i: number; prev: null | { x: number; y: number } } | null = null;
    let raf = 0, dead = false;

    const dab = (x: number, y: number, r: number, a: number) => {
      const g = mctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(20,19,17,${a})`);
      g.addColorStop(0.55, `rgba(20,19,17,${(a * 0.62).toFixed(3)})`);
      g.addColorStop(1, "rgba(20,19,17,0)");
      mctx.fillStyle = g;
      mctx.beginPath();
      mctx.arc(x, y, r, 0, 6.283);
      mctx.fill();
    };

    const lay = (x0: number, y0: number, x1: number, y1: number, r: number) => {
      const dx = x1 - x0, dy = y1 - y0;
      const dist = Math.hypot(dx, dy) || 0.01;
      const steps = Math.max(1, Math.ceil(dist / (r * 0.22)));
      const nx = -dy / dist, ny = dx / dist;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps, px = x0 + dx * t, py = y0 + dy * t;
        const wob = (Math.random() - 0.5) * r * 0.14;
        dab(px + nx * wob, py + ny * wob, r * (0.92 + Math.random() * 0.16), 0.3);
        for (let b = 0; b < 2; b++) {
          const off = (Math.random() - 0.5) * r * 1.5;
          dab(px + nx * off, py + ny * off, r * 0.26, 0.16);
        }
        if (Math.random() < 0.1)
          dab(px + nx * (Math.random() - 0.5) * r * 2.4, py + ny * (Math.random() - 0.5) * r * 2.4, r * 0.14, 0.1);
      }
    };

    const startIntro = () => {
      const cy = H / 2, r = SIZE * 0.42;
      const q: (null | { x: number; y: number; r: number })[] = [];
      [cy - SIZE * 0.3, cy + SIZE * 0.05, cy + SIZE * 0.33].forEach((py, pi) => {
        const dir = pi % 2 === 0 ? 1 : -1;
        const from = dir > 0 ? W * 0.07 : W * 0.93;
        const to = dir > 0 ? W * 0.93 : W * 0.07;
        for (let t = 0; t <= 1.0001; t += 0.028) {
          const xx = from + (to - from) * t;
          q.push({ x: xx, y: py + Math.sin(xx * 0.021 + pi) * SIZE * 0.05, r: r * (0.86 + Math.sin(t * 3.1 + pi) * 0.16) });
        }
        q.push(null);
      });
      intro = { q, i: 0, prev: null };
    };

    const stepIntro = (n: number) => {
      if (!intro) return;
      for (let k = 0; k < n && intro.i < intro.q.length; k++) {
        const pt = intro.q[intro.i++];
        if (pt === null) { intro.prev = null; continue; }
        if (intro.prev) lay(intro.prev.x, intro.prev.y, pt.x, pt.y, pt.r);
        intro.prev = { x: pt.x, y: pt.y };
      }
      if (intro.i >= intro.q.length) {
        intro = null;
        bctx.clearRect(0, 0, W, H);
        bctx.drawImage(mask, 0, 0, W, H);
      }
    };

    const build = () => {
      W = cv.clientWidth || 800;
      [cv, mask, base, name, tmp].forEach((c) => { c.width = W * DPR; c.height = H * DPR; });
      cv.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      mctx = mask.getContext("2d")!; mctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      bctx = base.getContext("2d")!; bctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      nctx = name.getContext("2d")!; nctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      tctx = tmp.getContext("2d")!; tctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      SIZE = Math.min(W / 12, 66);
      nctx.clearRect(0, 0, W, H);
      nctx.font = `200 ${SIZE}px ${font}`;
      // @ts-expect-error letterSpacing is not in older TS lib defs
      if ("letterSpacing" in nctx) nctx.letterSpacing = "0.2em";
      nctx.textAlign = "center";
      nctx.textBaseline = "middle";
      nctx.fillStyle = "#12110f";
      nctx.fillText(text, W / 2, H / 2);

      mctx.clearRect(0, 0, W, H);
      bctx.clearRect(0, 0, W, H);
      startIntro();
      if (reduce) { while (intro) stepIntro(400); }
    };

    wipeRef.current = () => { mctx.clearRect(0, 0, W, H); mctx.drawImage(base, 0, 0, W, H); };

    const pos = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onDown = (e: PointerEvent) => {
      cv.setPointerCapture(e.pointerId);
      down = true; speed = 0;
      const p = pos(e); last = p;
      lay(p.x, p.y, p.x + 0.01, p.y, 18);
    };
    const onMove = (e: PointerEvent) => {
      if (!down || !last) return;
      const p = pos(e);
      const dist = Math.hypot(p.x - last.x, p.y - last.y);
      speed += (Math.min(dist, 42) - speed) * 0.35;
      lay(last.x, last.y, p.x, p.y, Math.max(6.5, 30 - Math.min(speed, 30) * 0.72));
      last = p;
    };
    const onUp = () => { down = false; last = null; };

    let rt: number;
    const onResize = () => { window.clearTimeout(rt); rt = window.setTimeout(build, 220); };

    build();
    cv.addEventListener("pointerdown", onDown);
    cv.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("resize", onResize);

    const loop = () => {
      if (dead) return;
      if (intro) stepIntro(3);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 0.05; ctx.drawImage(name, 0, 0, W, H); ctx.globalAlpha = 1;
      ctx.globalAlpha = 0.34; ctx.drawImage(mask, 0, 0, W, H); ctx.globalAlpha = 1;
      tctx.clearRect(0, 0, W, H);
      tctx.drawImage(name, 0, 0, W, H);
      tctx.globalCompositeOperation = "destination-in";
      tctx.drawImage(mask, 0, 0, W, H);
      tctx.globalCompositeOperation = "source-over";
      ctx.drawImage(tmp, 0, 0, W, H);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(rt);
      cv.removeEventListener("pointerdown", onDown);
      cv.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", onResize);
    };
  }, [text, height]);

  return (
    <div className="w-brush">
      <canvas ref={ref} aria-label={text} />
    </div>
  );
};
