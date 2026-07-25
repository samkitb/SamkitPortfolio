import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const Cursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 1100, damping: 50 });
  const dotY = useSpring(y, { stiffness: 1100, damping: 50 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-ready");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setHovering(!!el?.closest?.('a, button, [data-cursor="hover"], input, textarea'));
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-ready");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-foreground mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hovering ? 60 : 30, height: hovering ? 60 : 30, opacity: hovering ? 0.9 : 0.6 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
};
