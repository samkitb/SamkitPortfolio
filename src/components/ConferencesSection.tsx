import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion";

const conferences = [
  {
    name: "Young Scholars Program",
    location: "Florida State University",
    project: "Drug-Targeting Sites on COVID-19 Main Protease",
    type: "Poster Presentation",
    description:
      "Selected into the highly competitive YSP, where I worked as a molecular biophysics researcher at FSU and presented my research to professors and staff across the university.",
    achievement: "One of 40 high schoolers selected from across Florida out of hundreds.",
  },
  {
    name: "BristleCon 2025",
    location: "San Francisco",
    project: "Underwater Acoustic Sensing",
    type: "Oral Presentation",
    description:
      "Presented research on underwater communication systems to industry leaders, including the CEOs of Sofar Ocean and Bristlemouth.",
    achievement: "Direct engagement with ocean-technology executives.",
  },
  {
    name: "NCUR 2025",
    location: "Pittsburgh",
    project: "AI & Social Media Research",
    type: "Oral Presentation",
    description:
      "Presented research on gendered perceptions of AI's influence on misinformation and privacy at the National Conference on Undergraduate Research.",
    achievement: "Peer recognition for innovative methodology.",
  },
  {
    name: "FURC 2025",
    location: "Tampa",
    project: "Multi-disciplinary Research",
    type: "Poster Presentation",
    description:
      "Presented research on gendered perceptions of AI's influence on misinformation and privacy at the Florida Undergraduate Research Conference.",
    achievement: "Outstanding undergraduate researcher recognition.",
  },
  {
    name: "FAU OURI Symposium",
    location: "Florida Atlantic University",
    project: "Various Research Projects",
    type: "Poster & Oral",
    description:
      "Regular presenter at Florida Atlantic University's Office of Undergraduate Research and Inquiry symposium.",
    achievement: "Won first place for oral presentation.",
  },
];

export const ConferencesSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="talks" className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="06" eyebrow="Talks & conferences" title="On stage and in the field." />

        <Stagger className="space-y-4">
          {conferences.map((c, i) => {
            const isOpen = openIndex === i;
            return (
              <StaggerItem key={c.name}>
                <div className="surface overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-display text-lg font-semibold text-foreground md:text-xl">{c.name}</h3>
                        <span className="text-sm text-muted-foreground">{c.location}</span>
                      </div>
                      <div className="mt-1 text-sm text-accent">{c.project}</div>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-4">
                      <span className="hidden rounded-full border border-border px-3 py-1 text-xs text-muted-foreground sm:inline">
                        {c.type}
                      </span>
                      <ChevronDown
                        className={cn("h-5 w-5 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border px-6 py-5">
                          <p className="leading-relaxed text-muted-foreground text-pretty">{c.description}</p>
                          <p className="mt-4 text-sm text-muted-foreground/80">
                            <span className="text-accent">Highlight — </span>
                            {c.achievement}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};
