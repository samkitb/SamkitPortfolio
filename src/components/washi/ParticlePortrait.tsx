import { useEffect, useRef } from "react";
import portraitSrc from "@/assets/samkit-portrait.jpg";

/* The headshot, rasterised into ink particles: each cell of the photo becomes a
   grain that scatters away from the cursor, runs vermillion at speed, then
   springs back into the picture. Particles are composited into one ImageData
   per frame rather than thousands of fillRect calls — at ~10k grains the
   per-particle fillStyle parse is what drops frames. Everything below is in
   DEVICE pixels (cell size scales with DPR) so the grain reads the same size
   and the count stays constant on retina. */
export const ParticlePortrait = ({ height = 250 }: { height?: number }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const CELL = Math.max(2, Math.round(2.5 * DPR));
    const PAPER = { r: 247, g: 244, b: 237 }; // --paper
    const HOT = { r: 192, g: 57, b: 43 }; // --red
    const PAPER32 = ((255 << 24) | (PAPER.b << 16) | (PAPER.g << 8) | PAPER.r) >>> 0;

    type P = {
      hx: number; hy: number;
      x: number; y: number;
      vx: number; vy: number;
      r: number; g: number; b: number;
    };

    let pts: P[] = [];
    let cw = 0, ch = 0, raf = 0;
    let dead = false;
    let frame: ImageData | null = null;
    let px32: Uint32Array | null = null;
    let loaded = false;
    const mouse = { x: -9999, y: -9999 };

    const photo = new Image();

    const build = () => {
      cw = Math.max(1, Math.round((cv.clientWidth || 260) * DPR));
      ch = Math.max(1, Math.round(height * DPR));
      cv.width = cw;
      cv.height = ch;
      cv.style.height = height + "px";

      const oc = document.createElement("canvas");
      oc.width = cw;
      oc.height = ch;
      const o = oc.getContext("2d");
      if (!o) return;

      o.fillStyle = `rgb(${PAPER.r},${PAPER.g},${PAPER.b})`;
      o.fillRect(0, 0, cw, ch);

      if (loaded && photo.naturalWidth > 0) {
        /* Contain, not cover: the panel goes full-width below the 961px
           breakpoint, and cropping to fill would cut the top of the head off.
           Scaling by the smaller axis keeps the whole frame and matches how the
           silhouette this replaced was sized. */
        const s = Math.min(cw / photo.naturalWidth, ch / photo.naturalHeight);
        const dw = photo.naturalWidth * s;
        const dh = photo.naturalHeight * s;
        o.drawImage(photo, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      } else {
        /* Until the photo decodes (or if it 404s) fall back to the old ink
           silhouette, so the panel is never an empty rectangle. */
        const s = Math.min(cw, ch) * 0.72;
        const cx = cw / 2, cy = ch / 2 + s * 0.08;
        o.fillStyle = "#1b1a17";
        o.beginPath();
        o.arc(cx, cy - s * 0.28, s * 0.2, 0, 6.283);
        o.fill();
        o.beginPath();
        o.moveTo(cx - s * 0.42, cy + s * 0.46);
        o.quadraticCurveTo(cx, cy - s * 0.04, cx + s * 0.42, cy + s * 0.46);
        o.closePath();
        o.fill();
      }

      const d = o.getImageData(0, 0, cw, ch).data;
      const half = CELL >> 1;
      const fadeX = cw * 0.1, fadeY = ch * 0.1;
      pts = [];

      for (let y = 0; y + CELL <= ch; y += CELL) {
        for (let x = 0; x + CELL <= cw; x += CELL) {
          /* Soft edge so the grain dissolves into the paper instead of ending
             on a hard rectangle. Baked into the rest colour, which lets the
             draw loop write opaque pixels and skip per-grain alpha blending. */
          const a = Math.max(0, Math.min(1,
            Math.min((x + half) / fadeX, (cw - x - half) / fadeX,
                     (y + half) / fadeY, (ch - y - half) / fadeY)));
          if (a <= 0.02) continue;

          const i = ((y + half) * cw + x + half) * 4;
          const r = PAPER.r + (d[i] - PAPER.r) * a;
          const g = PAPER.g + (d[i + 1] - PAPER.g) * a;
          const b = PAPER.b + (d[i + 2] - PAPER.b) * a;
          /* Grains that landed on bare paper — the letterbox either side of a
             contained photo — would cost a physics step each to draw nothing. */
          if (Math.abs(r - PAPER.r) < 3 && Math.abs(g - PAPER.g) < 3 && Math.abs(b - PAPER.b) < 3) continue;

          pts.push({
            hx: x,
            hy: y,
            x: reduce ? x : Math.random() * cw,
            y: reduce ? y : Math.random() * ch,
            vx: 0,
            vy: 0,
            r,
            g,
            b,
          });
        }
      }

      frame = ctx.createImageData(cw, ch);
      px32 = new Uint32Array(frame.data.buffer);
    };

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * DPR;
      mouse.y = (e.clientY - r.top) * DPR;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    let rt: number;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(build, 220);
    };

    build();
    photo.onload = () => {
      loaded = true;
      build();
    };
    photo.src = portraitSrc;

    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);

    const R = 6000 * DPR * DPR;
    const PUSH = 3.1 * DPR;
    const FAST = 7 * DPR;

    const loop = () => {
      if (dead) return;
      const buf = px32;
      if (buf && frame) {
        buf.fill(PAPER32);
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R && d2 > 0.01) {
            const f = (R - d2) / R, inv = 1 / Math.sqrt(d2);
            p.vx += dx * inv * f * PUSH;
            p.vy += dy * inv * f * PUSH;
          }
          p.vx += (p.hx - p.x) * 0.027;
          p.vy += (p.hy - p.y) * 0.027;
          p.vx *= 0.84;
          p.vy *= 0.84;
          p.x += p.vx;
          p.y += p.vy;

          let r = p.r, g = p.g, b = p.b;
          const sp = Math.min(1, (Math.abs(p.vx) + Math.abs(p.vy)) / FAST);
          if (sp > 0.06) {
            r += (HOT.r - r) * sp;
            g += (HOT.g - g) * sp;
            b += (HOT.b - b) * sp;
          }
          const c = ((255 << 24) | ((b | 0) << 16) | ((g | 0) << 8) | (r | 0)) >>> 0;

          const sx = p.x | 0, sy = p.y | 0;
          for (let yy = 0; yy < CELL; yy++) {
            const row = sy + yy;
            if (row < 0 || row >= ch) continue;
            const base = row * cw;
            for (let xx = 0; xx < CELL; xx++) {
              const col = sx + xx;
              if (col >= 0 && col < cw) buf[base + col] = c;
            }
          }
        }
        ctx.putImageData(frame, 0, 0);
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(rt);
      photo.onload = null;
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [height]);

  return (
    <div className="w-portrait">
      <canvas ref={ref} aria-label="Portrait of Samkit Bothra, drawn in ink particles" />
    </div>
  );
};
