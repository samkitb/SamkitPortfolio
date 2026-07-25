import { useEffect, useRef } from "react";

/* Ink particles that form a figure, scatter away from the cursor and settle
   back. Doubles as the profile image, so no headshot is required. */
export const ParticlePortrait = ({ height = 250 }: { height?: number }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    type P = { hx: number; hy: number; x: number; y: number; vx: number; vy: number };
    let pts: P[] = [];
    let W = 0, H = height, raf = 0, dead = false;
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      W = cv.clientWidth || 260;
      cv.width = W * DPR; cv.height = H * DPR;
      cv.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const oc = document.createElement("canvas");
      oc.width = W; oc.height = H;
      const o = oc.getContext("2d");
      if (!o) return;
      const s = Math.min(W, H) * 0.72;
      const cx = W / 2, cy = H / 2 + s * 0.08;
      o.fillStyle = "#000";
      o.beginPath(); o.arc(cx, cy - s * 0.28, s * 0.2, 0, 6.283); o.fill();
      o.beginPath();
      o.moveTo(cx - s * 0.42, cy + s * 0.46);
      o.quadraticCurveTo(cx, cy - s * 0.04, cx + s * 0.42, cy + s * 0.46);
      o.lineTo(cx - s * 0.42, cy + s * 0.46);
      o.closePath(); o.fill();

      const d = o.getImageData(0, 0, W, H).data;
      pts = [];
      const gap = 4;
      for (let y = 0; y < H; y += gap)
        for (let x = 0; x < W; x += gap)
          if (d[(y * W + x) * 4 + 3] > 128)
            pts.push({ hx: x, hy: y, x: reduce ? x : Math.random() * W, y: reduce ? y : Math.random() * H, vx: 0, vy: 0 });
    };

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    let rt: number;
    const onResize = () => { window.clearTimeout(rt); rt = window.setTimeout(build, 220); };

    build();
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);

    const loop = () => {
      if (dead) return;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#f7f4ed";
      ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 6000 && d2 > 0.01) {
          const f = (6000 - d2) / 6000, inv = 1 / Math.sqrt(d2);
          p.vx += dx * inv * f * 3.1; p.vy += dy * inv * f * 3.1;
        }
        p.vx += (p.hx - p.x) * 0.027; p.vy += (p.hy - p.y) * 0.027;
        p.vx *= 0.84; p.vy *= 0.84; p.x += p.vx; p.y += p.vy;
        const sp = Math.min(1, (Math.abs(p.vx) + Math.abs(p.vy)) / 7);
        ctx.fillStyle = sp > 0.06 ? `rgba(192,57,43,${(0.35 + sp * 0.6).toFixed(2)})` : "rgba(27,26,23,.6)";
        ctx.fillRect(p.x, p.y, 1.6, 1.6);
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(rt);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [height]);

  return (
    <div className="w-portrait">
      <canvas ref={ref} aria-label="Portrait, drawn in ink particles" />
    </div>
  );
};
