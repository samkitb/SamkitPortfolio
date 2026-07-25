import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
attribute float a_alpha;
uniform vec2 u_res;
varying float v_alpha;
void main() {
  vec2 clip = (a_pos / u_res) * 2.0 - 1.0;
  clip.y *= -1.0;
  gl_Position = vec4(clip, 0.0, 1.0);
  gl_PointSize = 3.0;
  v_alpha = a_alpha;
}`;

const FRAG = `
precision mediump float;
varying float v_alpha;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d);
  if (r > 0.5) discard;
  float a = smoothstep(0.5, 0.0, r) * v_alpha;
  gl_FragColor = vec4(0.82, 0.69, 0.45, a);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return sh;
}

function hash(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}
function vnoise(x: number, y: number) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  const ux = xf * xf * (3 - 2 * xf), uy = yf * yf * (3 - 2 * yf);
  return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
}

export const ShaderBackground = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gl = canvas.getContext("webgl", { antialias: true, alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    let W = 0, H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const COUNT = 5500;
    const pos = new Float32Array(COUNT * 2);
    const vel = new Float32Array(COUNT * 2);
    const alpha = new Float32Array(COUNT);

    const seed = () => {
      for (let i = 0; i < COUNT; i++) {
        pos[i * 2] = Math.random() * (W || 1000);
        pos[i * 2 + 1] = Math.random() * (H || 800);
        vel[i * 2] = 0;
        vel[i * 2 + 1] = 0;
        alpha[i] = 0.3 + hash(i, i * 1.7) * 0.65;
      }
    };

    const resize = () => {
      W = canvas.clientWidth * dpr;
      H = canvas.clientHeight * dpr;
      canvas.width = W;
      canvas.height = H;
      gl.viewport(0, 0, W, H);
      gl.uniform2f(gl.getUniformLocation(prog, "u_res"), W, H);
    };
    resize();
    seed();
    window.addEventListener("resize", resize);

    const posBuf = gl.createBuffer();
    const aLoc = gl.getAttribLocation(prog, "a_pos");
    const alphaBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuf);
    gl.bufferData(gl.ARRAY_BUFFER, alpha, gl.STATIC_DRAW);
    const alLoc = gl.getAttribLocation(prog, "a_alpha");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
    };
    window.addEventListener("mousemove", onMove);

    const FORCE = 0.12 * dpr;
    const REPEL = 130 * dpr;

    const step = (t: number) => {
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 2, iy = ix + 1;
        let x = pos[ix], y = pos[iy];
        const ang = vnoise(x * 0.0016, y * 0.0016 + t * 0.04) * Math.PI * 4.0;
        vel[ix] += Math.cos(ang) * FORCE;
        vel[iy] += Math.sin(ang) * FORCE;
        const dx = x - mouse.x, dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL) {
          const f = (1 - dist / REPEL) * 2.2;
          vel[ix] += (dx / (dist + 0.001)) * f;
          vel[iy] += (dy / (dist + 0.001)) * f;
        }
        vel[ix] *= 0.93;
        vel[iy] *= 0.93;
        x += vel[ix];
        y += vel[iy];
        if (x < 0) x += W; else if (x > W) x -= W;
        if (y < 0) y += H; else if (y > H) y -= H;
        pos[ix] = x;
        pos[iy] = y;
      }
    };

    const draw = () => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf!);
      gl.bufferData(gl.ARRAY_BUFFER, pos, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(aLoc);
      gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuf!);
      gl.enableVertexAttribArray(alLoc);
      gl.vertexAttribPointer(alLoc, 1, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.POINTS, 0, COUNT);
    };

    for (let k = 0; k < 90; k++) step(k * 0.016);

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      step((now - start) / 1000);
      draw();
      raf = requestAnimationFrame(loop);
    };
    if (reduce) {
      step(0);
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
};
