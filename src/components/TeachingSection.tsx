import { Microscope, Atom, Calculator, FlaskConical } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion";

const roles = [
  {
    title: "FAU Research Peer Mentor",
    subjects: "Mentoring undergraduate students across research fields.",
    Icon: Microscope,
  },
  {
    title: "Physics Learning Assistant",
    subjects: "Tutoring college-level physics students.",
    Icon: Atom,
  },
  {
    title: "FAU Math Tutor",
    subjects: "Algebra tutoring for college-level students.",
    Icon: Calculator,
  },
  {
    title: "STAR Lab Instructor",
    subjects: "Mentoring elementary students in STEM fields.",
    Icon: FlaskConical,
  },
];

export const TeachingSection = () => {
  return (
    <section id="teaching" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05"
          eyebrow="Teaching"
          title="Mentoring the next cohort."
          description="From elementary STEM to college-level research."
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map(({ title, subjects, Icon }) => (
            <StaggerItem key={title} className="h-full">
              <div className="surface h-full p-6 hover:-translate-y-1">
                <Icon className="h-6 w-6 text-accent" />
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{subjects}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};
