import { useEffect, useRef, useState, type ElementType } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}=+*#%@";

interface ScrambleTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  trigger?: "mount" | "inView";
  duration?: number;
  delay?: number;
}

export const ScrambleText = ({
  text,
  as: Tag = "span",
  className,
  trigger = "inView",
  duration = 900,
  delay = 0,
}: ScrambleTextProps) => {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(text);
  const done = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }

    let raf = 0;
    let startTime = 0;

    const run = () => {
      if (done.current) return;
      done.current = true;
      const animate = (now: number) => {
        if (!startTime) startTime = now;
        const elapsed = now - startTime - delay;
        if (elapsed < 0) {
          raf = requestAnimationFrame(animate);
          return;
        }
        const progress = Math.min(elapsed / duration, 1);
        const revealCount = Math.floor(progress * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") out += " ";
          else if (i < revealCount) out += text[i];
          else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setDisplay(out);
        if (progress < 1) raf = requestAnimationFrame(animate);
        else setDisplay(text);
      };
      raf = requestAnimationFrame(animate);
    };

    if (trigger === "mount") {
      run();
    } else {
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && run()),
        { threshold: 0.4 }
      );
      obs.observe(el);
      return () => {
        obs.disconnect();
        cancelAnimationFrame(raf);
      };
    }

    return () => cancelAnimationFrame(raf);
  }, [text, trigger, duration, delay]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {display}
    </Tag>
  );
};
