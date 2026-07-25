import { SectionHeading } from "@/components/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion";

const skillCategories = [
  {
    title: "Coursework",
    skills: ["Research Methods", "Data Structures", "Computer Logic", "Physics for Engineers", "Accounting"],
  },
  {
    title: "Programming Languages",
    skills: ["Python", "C", "C++"],
  },
  {
    title: "Technical Skills",
    skills: ["Raspberry Pi", "Linux", "SPSS", "Cellular Data Transmission"],
  },
  {
    title: "Languages",
    skills: ["English (Native)", "Hindi (Fluent)", "Spanish (50%)"],
  },
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="07" eyebrow="Capabilities" title="Skills & expertise." />

        <Stagger className="grid gap-5 md:grid-cols-2">
          {skillCategories.map((category) => (
            <StaggerItem key={category.title} className="h-full">
              <div className="surface h-full p-7">
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <h3 className="font-display text-lg font-semibold text-foreground">{category.title}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-300 hover:border-accent/50 hover:text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};
