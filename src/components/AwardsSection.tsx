import { Trophy, Medal, Flag, Gavel } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion";

const awards = [
  {
    title: "Research Symposium — 1st Place",
    year: "2025",
    description: "First place in oral presentation against undergraduate and graduate students, as a high schooler.",
    Icon: Trophy,
  },
  {
    title: "DECA International Qualifier",
    year: "2025",
    description: "1st place district, 3rd place state, and 98/100 in roleplay as a financial advisor.",
    Icon: Medal,
  },
  {
    title: "State Champion in Golf",
    year: "Multiple years",
    description: "Two-time state qualifier with several individual tournament wins across South Florida.",
    Icon: Flag,
  },
  {
    title: "Lincoln-Douglas Debate",
    year: "Multiple years",
    description: "Multiple awards across competitive debate tournaments.",
    Icon: Gavel,
  },
];

export const AwardsSection = () => {
  return (
    <section id="awards" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="04" eyebrow="Recognition" title="Awards & honors." />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map(({ title, year, description, Icon }) => (
            <StaggerItem key={title} className="h-full">
              <div className="surface h-full p-6 hover:-translate-y-1">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{title}</h3>
                <div className="mt-1 text-sm text-accent">{year}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};
