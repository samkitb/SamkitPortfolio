import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const WORDS = ["AI", "Sensing", "Human health", "Research", "Robotics", "Mentorship"];

const Row = () => (
  <span className="flex flex-shrink-0 items-center">
    {WORDS.map((w) => (
      <span key={w} className="flex items-center">
        <span className="px-8 font-display text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
          {w}
        </span>
        <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-accent" />
      </span>
    ))}
  </span>
);

export const VelocityMarquee = ({ baseVelocity = 3 }: { baseVelocity?: number }) => {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-2000, 0, 2000], [-7, 0, 7], { clamp: true });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section aria-hidden className="relative overflow-hidden border-y border-border py-8 md:py-12">
      <motion.div style={{ skewX: reduce ? 0 : skewX }}>
        <motion.div className="flex flex-nowrap whitespace-nowrap" style={{ x: reduce ? "-25%" : x }}>
          <Row />
          <Row />
          <Row />
          <Row />
        </motion.div>
      </motion.div>
    </section>
  );
};
