import { useEffect, useRef } from "react";

type Mode = "carrier" | "sonar" | "imu" | "data" | "pulse";

const TAU = Math.PI * 2;

/* normalized waveform value in roughly [-1, 1] for a given mode */
function wave(mode: Mode, xn: number, t: number, pulsePos: number): number {
  switch (mode) {
    case "sonar": {
      const env = Math.exp(-Math.pow(xn - pulsePos, 2) / 0.0045);
      return Math.sin((xn - pulsePos) * TAU * 26) * env;
    }
    case "imu":
      return (
        Math.sin(xn * TAU * 4 + t * 3) * 0.5 +
        Math.sin(xn * TAU * 9 - t * 2) * 0.3 +
        Math.sin(xn * TAU * 2 + t) * 0.25
      );
    case "data": {
      const bins = 24;
      const b = Math.floor(xn * bins);
      const seed = Math.sin(b * 12.9898 + Math.floor(t * 1.4) * 7.13) * 43758.5453;
      const v = (seed - Math.floor(seed)) * 2 - 1;
      return v * 0.7;
    }
    case "pulse": {
      const beat = (xn * 2.2 - t * 0.35) % 1;
      const d = Math.abs(((beat % 1) + 1) % 1 - 0.5);
      if (d < 0.018) return ((0.018 - d) / 0.018) * (beat < 0.5 ? 1 : -0.55);
      return Math.sin(xn * TAU * 2 + t) * 0.04;
    }
    case "carrier":
    default:
      return Math.sin(xn * TAU * 3 + t * 2) * 0.6 + Math.sin(xn * TAU * 1.5 - t) * 0.12;
  }
}

export const SignalCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: -9999, vx: 0, last: -9999, influence: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.influence = 1;
    };
    window.addEventListener("mousemove", onMove);

    let nodes: HTMLElement[] = [];
    const collect = () => (nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-signal-mode]")));
    collect();
    const recollect = window.setTimeout(collect, 800);

    let mode: Mode = "carrier";
    let targetMode: Mode = "carrier";
    let noiseBurst = 0;
    let pulsePos = 0;
    let raf = 0;

    const pickMode = () => {
      const mid = window.innerHeight / 2;
      let best = Infinity;
      let found: Mode | null = null;
      for (const n of nodes) {
        const r = n.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        const dist = Math.abs((r.top + r.bottom) / 2 - mid);
        if (dist < best) {
          best = dist;
          found = (n.dataset.signalMode as Mode) || "carrier";
        }
      }
      if (found && found !== targetMode) {
        targetMode = found;
        noiseBurst = 1; // resolve-from-noise on each change
      }
    };

    const draw = (t: number) => {
      // phosphor persistence
      ctx.fillStyle = "rgba(16,16,19,0.16)";
      ctx.fillRect(0, 0, W, H);

      pickMode();
      if (mode !== targetMode && noiseBurst > 0.6) mode = targetMode; // switch at peak noise
      noiseBurst += (0 - noiseBurst) * 0.04;
      mouse.influence += (0 - mouse.influence) * 0.05;
      pulsePos = (pulsePos + 0.0065) % 1.2;

      const cy = H / 2;
      const amp = H * 0.16;
      const N = Math.min(260, Math.floor(W / 5));
      const sigma = W * 0.05;

      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        const xn = i / N;
        const px = xn * W;
        let v = wave(mode, xn, t, pulsePos);
        // resolve-from-noise burst on mode change
        if (noiseBurst > 0.01) v += (Math.random() * 2 - 1) * noiseBurst * 0.9;
        // cursor perturbation — the line reacts to you
        if (mouse.influence > 0.01) {
          const g = Math.exp(-Math.pow(px - mouse.x, 2) / (2 * sigma * sigma));
          v += g * mouse.influence * 1.1 * Math.sin(t * 6 + xn * 10);
        }
        const y = cy + v * amp;
        if (i === 0) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);
      }

      // glow pass
      ctx.lineJoin = "round";
      ctx.strokeStyle = "rgba(194,165,114,0.22)";
      ctx.lineWidth = 6;
      ctx.shadowColor = "rgba(194,165,114,0.5)";
      ctx.shadowBlur = 18;
      ctx.stroke();
      // core line
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(225,205,160,0.95)";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };

    if (reduce) {
      ctx.fillStyle = "#101013";
      ctx.fillRect(0, 0, W, H);
      const cy = H / 2;
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const xn = i / 200;
        const y = cy + wave("carrier", xn, 0, 0) * H * 0.1;
        i === 0 ? ctx.moveTo(xn * W, y) : ctx.lineTo(xn * W, y);
      }
      ctx.strokeStyle = "rgba(194,165,114,0.6)";
      ctx.lineWidth = 1.6;
      ctx.stroke();
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(recollect);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-0" />;
};
