import { cn } from "@/lib/utils";
import { Reveal } from "./motion";
import { Flourish } from "./baroque/ornaments";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export const SectionHeading = ({
  index,
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) => (
  <Reveal className={cn("mb-12 md:mb-16", align === "center" && "mx-auto text-center", className)}>
    <div className={cn("mb-5 flex items-center gap-3", align === "center" && "justify-center")}>
      <span className="font-baroque-label text-sm tracking-wider text-accent">{index}</span>
      <Flourish width={72} className="shrink-0" />
      <span className="font-baroque-label text-[11px] uppercase tracking-[0.2em] text-accent">{eyebrow}</span>
    </div>
    <h2
      className={cn(
        "font-display text-[2rem] font-bold leading-[1.08] tracking-tight text-foreground md:text-5xl",
        align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
        "text-balance"
      )}
    >
      {title}
    </h2>
    {description && (
      <p
        className={cn(
          "mt-5 max-w-xl leading-relaxed text-muted-foreground text-pretty",
          align === "center" && "mx-auto"
        )}
      >
        {description}
      </p>
    )}
  </Reveal>
);
