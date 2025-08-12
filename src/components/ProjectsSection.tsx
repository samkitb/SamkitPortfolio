
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ProjectsSection = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const projects = [
    {
      title: "Underwater Acoustic Sensing & Wireless Communications",
      description: "Real-time underwater data transmission using Raspberry Pi and Bristlemouth boards.",
      tools: ["Python", "Linux", "WinSCP", "C"],
      details: "Presented at BristleCon 2025 to CEOs of Sofar Ocean and Bristlemouth. Developed innovative solutions for underwater communication challenges.",
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      title: "Wearable IMU Sensors for Rehabilitation",
      description: "AI-powered 3D modeling of motion to track head/neck posture.",
      tools: ["Python", "Lenovo 3D Camera", "Excel", "First Principles"],
      details: "Validated against Optotrak motion capture gold standard. Created precise motion tracking system for medical rehabilitation applications.",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      title: "AI & Social Media Polling Research",
      description: "Survey-based study on gendered perceptions of AI's influence on misinformation and privacy.",
      tools: ["SPSS", "Statistical Analysis", "Survey Design"],
      details: "Presented at NCUR, FURC, and FAU OURI Symposium. Comprehensive analysis of societal perceptions of AI technology.",
      gradient: "from-teal-600 to-green-600",
    },
    {
      title: "Microplastics Field Research",
      description: "Led microplastic sampling team in Wahoo Bay.",
      tools: ["Field Research", "Data Collection", "Environmental Science"],
      details: "Collaborative research with college graduates. Conducted environmental impact studies on marine ecosystems.",
      gradient: "from-orange-600 to-red-600",
    },
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`bg-gray-800/50 border-gray-700 p-6 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                expandedCard === index ? "md:col-span-2" : ""
              }`}
              onClick={() => setExpandedCard(expandedCard === index ? null : index)}
            >
              <div className={`h-2 w-full bg-gradient-to-r ${project.gradient} rounded-full mb-4`}></div>
              
              <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tools.map((tool, toolIndex) => (
                  <Badge key={toolIndex} variant="secondary" className="bg-gray-700 text-gray-300">
                    {tool}
                  </Badge>
                ))}
              </div>

              {expandedCard === index && (
                <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border-l-4 border-blue-500 animate-fade-in">
                  <p className="text-gray-300 leading-relaxed">{project.details}</p>
                </div>
              )}

              <div className="text-sm text-gray-500 mt-4">
                Click to {expandedCard === index ? "collapse" : "expand"}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
