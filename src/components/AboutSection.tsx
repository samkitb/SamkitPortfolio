import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import profilePic from "../assets/PIC.png";

const CountUp = ({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.3,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const stats = [
  { value: 3.8, decimals: 1, suffix: "", label: "GPA" },
  { value: 80, decimals: 0, suffix: "+", label: "College credits" },
  { value: 4, decimals: 0, suffix: "", label: "Major projects" },
  { value: 5, decimals: 0, suffix: "", label: "Presentations" },
];

export const AboutSection = () => {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="Turning curiosity into research that ships."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative mx-auto max-w-sm">
              <div className="overflow-hidden rounded-2xl border border-border">
                <img
                  src={profilePic}
                  alt="Samkit Bothra"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 hidden rounded-xl border border-border bg-card px-4 py-3 shadow-xl shadow-black/30 sm:block">
                <div className="font-display text-sm font-medium text-foreground">Parkland, Florida</div>
                <div className="text-xs text-muted-foreground">Student Mayor · FAU researcher</div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="space-y-5 text-lg leading-relaxed text-muted-foreground text-pretty">
                <p>
                  I'm a dual-enrolled high school student at{" "}
                  <span className="text-foreground">Florida Atlantic University</span>, pursuing a
                  B.S. in Computer Science with a minor in Financial Technology.
                </p>
                <p>
                  My work blends academic research with real-world applications across{" "}
                  <span className="text-foreground">AI, machine learning, software, and sensor integration</span>.
                  I've presented at state and national conferences like{" "}
                  <span className="text-foreground">NCUR and FURC</span>, placed first in
                  university-wide competitions, and mentored undergraduates and younger students in
                  research and STEM fundamentals.
                </p>
                <p>
                  Whether I'm surveying how people perceive AI or building models to detect fall risk
                  in patients, I'm driven by using technology to solve meaningful problems.
                </p>
              </div>
            </Reveal>

            <Stagger className="mt-10 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="surface h-full px-5 py-5">
                    <div className="font-display text-3xl font-semibold text-foreground md:text-4xl">
                      <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
};
