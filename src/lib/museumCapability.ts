/* One-time device/preference check deciding whether to render the 3D museum
   or fall back straight to the 2D baroque site. Deliberately checked once on
   mount, not live-reactive — swapping experiences mid-session would be jarring. */
export function isMuseumCapable(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.innerWidth < 768) return false;

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return !!gl;
  } catch {
    return false;
  }
}
