import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Returns framer props that "draw" an SVG path on via pathLength.
   Under reduced-motion the path is simply shown fully, no animation. */
function useDraw(reduce: boolean, inView: boolean, delay: number) {
  return (extra = 0) => {
    if (reduce) return {} as const;
    const target = { pathLength: 1, opacity: 1 };
    return {
      initial: { pathLength: 0, opacity: 0 },
      transition: {
        pathLength: { duration: 1.3, ease: EASE, delay: delay + extra },
        opacity: { duration: 0.3, delay: delay + extra },
      },
      ...(inView
        ? { whileInView: target, viewport: { once: true, margin: "-10%" } }
        : { animate: target }),
    };
  };
}

function useFade(reduce: boolean, inView: boolean, delay: number) {
  if (reduce) return {} as const;
  const target = { opacity: 1, scale: 1 };
  return {
    initial: { opacity: 0, scale: 0.4 },
    transition: { duration: 0.5, ease: EASE, delay },
    ...(inView
      ? { whileInView: target, viewport: { once: true, margin: "-10%" } }
      : { animate: target }),
  };
}

const SCROLL = "M130 23 C 118 15 108 31 96 23 C 86 17 76 28 66 22 C 58 18 55 11 61 9 C 66 7 68 13 63 15";

interface FlourishProps {
  className?: string;
  width?: number;
  delay?: number;
  inView?: boolean;
  flip?: boolean;
}

export const Flourish = ({ className, width = 220, delay = 0, inView = true, flip = false }: FlourishProps) => {
  const reduce = useReducedMotion() ?? false;
  const draw = useDraw(reduce, inView, delay);
  const fade = useFade(reduce, inView, delay + 0.4);

  return (
    <svg
      aria-hidden
      width={width}
      height={Math.round(width * (46 / 260))}
      viewBox="0 0 260 46"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-accent", flip && "rotate-180", className)}
    >
      <motion.path d={SCROLL} {...draw()} />
      <g transform="translate(260 0) scale(-1 1)">
        <motion.path d={SCROLL} {...draw(0.06)} />
      </g>
      <motion.path
        d="M130 14 L138 23 L130 32 L122 23 Z"
        fill="currentColor"
        stroke="none"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        {...fade}
      />
      <motion.circle cx={130} cy={23} r={1.6} fill="hsl(var(--background))" stroke="none" {...fade} />
    </svg>
  );
};

interface CornerScrollProps {
  corner: "tl" | "tr" | "bl" | "br";
  size?: number;
  delay?: number;
  inView?: boolean;
  className?: string;
}

const CORNER_POS: Record<CornerScrollProps["corner"], string> = {
  tl: "-left-1.5 -top-1.5",
  tr: "-right-1.5 -top-1.5 -scale-x-100",
  bl: "-bottom-1.5 -left-1.5 -scale-y-100",
  br: "-bottom-1.5 -right-1.5 -scale-x-100 -scale-y-100",
};

export const CornerScroll = ({ corner, size = 44, delay = 0, inView = true, className }: CornerScrollProps) => {
  const reduce = useReducedMotion() ?? false;
  const draw = useDraw(reduce, inView, delay);
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 54 54"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("absolute text-accent", CORNER_POS[corner], className)}
    >
      <motion.path
        d="M3 34 C 3 17 17 3 34 3 M17 34 C 17 23 23 17 34 17 C 42 17 45 26 38 29 C 33 31 30 25 35 23"
        {...draw()}
      />
    </svg>
  );
};

const FLEURON_HALF = "M42 30 L42 12 M42 17 C 34 14 27 17 23 25 C 30 21 37 22 42 27";

interface FleuronProps {
  className?: string;
  width?: number;
  delay?: number;
  inView?: boolean;
}

export const Fleuron = ({ className, width = 84, delay = 0, inView = true }: FleuronProps) => {
  const reduce = useReducedMotion() ?? false;
  const draw = useDraw(reduce, inView, delay);
  const fade = useFade(reduce, inView, delay + 0.3);
  return (
    <svg
      aria-hidden
      width={width}
      height={Math.round(width * (34 / 84))}
      viewBox="0 0 84 34"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-accent", className)}
    >
      <motion.path d={FLEURON_HALF} {...draw()} />
      <g transform="translate(84 0) scale(-1 1)">
        <motion.path d={FLEURON_HALF} {...draw(0.05)} />
      </g>
      <motion.circle cx={42} cy={8} r={2.6} fill="currentColor" stroke="none" {...fade} />
    </svg>
  );
};
