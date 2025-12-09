
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
      details: "Created precise motion tracking system for medical rehabilitation applications. First author published.",
      publication: "https://wseas.com/journals/articles.php?id=11059",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      title: "AI & Social Media Polling Research",
      description: "Survey-based study on gendered perceptions of AI's influence on misinformation and privacy.",
      tools: ["SPSS", "Statistical Analysis", "Survey Design"],
      details: "Comprehensive analysis of societal perceptions of AI technology. Placed 1st in oral presentation at university-wide symposium.",
      gradient: "from-teal-600 to-green-600",
    },
    {
      title: "ResearchConnectAI Co-Founder",
      description: "Co-founder of ResearchConnectAI, a platform to make research accessible to all students.",
      tools: ["Python", "React", "Node.js", "PostgreSQL"],
      details: "Created a platform for high school & college students to find and connect with professors for research opportunities.",
      gradient: "from-orange-600 to-red-600",
      website: "https://researchconnectai.com", // Update with your actual website URL
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
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                <p className="text-gray-300 flex-1">{project.description}</p>
                {project.website && (
                  <Button
                    asChild
                    size="sm"
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0 w-full sm:w-auto"
                  >
                    <a 
                      href={project.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit Website
                    </a>
                  </Button>
                )}
                {!project.website && project.publication && (
                  <Button
                    asChild
                    size="sm"
                    className={`bg-gradient-to-r ${project.gradient} hover:brightness-110 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0 w-full sm:w-auto`}
                  >
                    <a
                      href={project.publication}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Publication
                    </a>
                  </Button>
                )}
              </div>

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
