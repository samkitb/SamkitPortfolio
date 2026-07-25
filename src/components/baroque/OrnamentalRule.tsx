import { cn } from "@/lib/utils";

export const OrnamentalRule = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center justify-center gap-2.5", className)}>
    <span className="h-px w-14 bg-accent/50" />
    <span className="h-[5px] w-[5px] rotate-45 bg-accent" />
    <span className="h-px w-14 bg-accent/50" />
  </div>
);
