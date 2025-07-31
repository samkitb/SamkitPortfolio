
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Coursework",
      skills: ["Research Methods", "Data Structures", "Computer Logic", "Physics for Engineers", "Accounting"],
      color: "bg-blue-600",
    },
    {
      title: "Programming Languages",
      skills: ["Python", "C", "C++"],
      color: "bg-purple-600",
    },
    {
      title: "Technical Skills",
      skills: ["Raspberry Pi", "Linux", "SPSS", "Cellular Data Transmission"],
      color: "bg-teal-600",
    },
    {
      title: "Languages",
      skills: ["English (Native)", "Hindi (Fluent)", "Spanish (50%)"],
      color: "bg-orange-600",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
          Skills & Expertise
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-gray-700 p-6 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <div className={`w-3 h-3 ${category.color} rounded-full mr-3`}></div>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    className={`${category.color} text-white hover:scale-105 transition-transform duration-200`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
