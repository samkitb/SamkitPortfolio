import { Landmark, Users, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion";

const roles = [
  {
    title: "Student Mayor of Parkland",
    period: "2024 – Present",
    description: "Advocate for youth, lead civic events, and speak at public forums.",
    Icon: Landmark,
  },
  {
    title: "President — Jain Center of South Florida Youth Group",
    period: "Current",
    description: "Host cultural events for 500+ people and teach community values.",
    Icon: Users,
  },
  {
    title: "FAU Peer Mentor & STAR Lab Instructor",
    period: "Current",
    description: "Mentor undergraduates as a high schooler and train young researchers.",
    Icon: GraduationCap,
  },
];

export const LeadershipSection = () => {
  return (
    <section id="leadership" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow="Leadership"
          title="Leading where it counts."
        />

        <Stagger className="relative ml-2 border-l border-border">
          {roles.map(({ title, period, description, Icon }) => (
            <StaggerItem key={title}>
              <div className="relative pb-12 pl-8 last:pb-0 md:pl-10">
                <span className="absolute left-0 top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-accent ring-4 ring-background" />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-display text-xl font-semibold text-foreground">{title}</h3>
                  <span className="text-sm text-accent">{period}</span>
                </div>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground text-pretty">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};
