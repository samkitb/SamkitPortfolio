
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ConferencesSection = () => {
  const [expandedConference, setExpandedConference] = useState<number | null>(null);

  const conferences = [
    {
      name: "Young Scholars Program",
      location: "Florida State University",
      project: "Finding Drug Targeting Sites on COVID-19 Main Protease",
      type: "Poster Presentations",
      description: "Got selected into the highly selective YSP where I worked as a Molecular Biophysics Researcher at FSU.",
      achievements: "One of the 40 high school students from across Florida selected from a pool of hundreds",
    },
    {
      name: "BristleCon 2025",
      location: "San Francisco",
      project: "Underwater Acoustic Sensing",
      type: "Oral Presentation",
      description: "Presented cutting-edge research on underwater communication systems to industry leaders including CEOs of Sofar Ocean and Bristlemouth.",
      achievements: "Direct engagement with ocean technology executives",
    },
    {
      name: "NCUR 2025",
      location: "Pittsburgh",
      project: "AI & Social Media Research",
      type: "Oral Presentation",
      description: "Presented research on gendered perceptions of AI influence on misinformation and privacy at the National Conference on Undergraduate Research.",
      achievements: "Peer recognition for innovative methodology",
    },
    {
      name: "FURC 2025",
      location: "Tampa",
      project: "Multi-disciplinary Research",
      type: "Poster Presentation",
      description: "Showcased comprehensive research findings at the Florida Undergraduate Research Conference.",
      achievements: "Outstanding undergraduate researcher recognition",
    },
    {
      name: "FAU OURI Symposium",
      location: "Florida Atlantic University",
      project: "Various Research Projects",
      type: "Poster & Oral Presentation",
      description: "Regular presenter at Florida Atlantic University's Office of Undergraduate Research and Inquiry symposium.",
      achievements: "Won first place for oral presentation",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Excursions
        </h2>

        <div className="space-y-6">
          {conferences.map((conference, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-gray-700 p-6 cursor-pointer hover:bg-gray-700/50 transition-all duration-300 hover:shadow-xl"
              onClick={() => setExpandedConference(expandedConference === index ? null : index)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{conference.name}</h3>
                  <p className="text-cyan-400 font-semibold">{conference.location}</p>
                </div>
                <div className="flex flex-col md:items-end mt-2 md:mt-0">
                  <Badge className="bg-blue-600 text-white mb-2">{conference.type}</Badge>
                  <span className="text-gray-400 text-sm">{conference.project}</span>
                </div>
              </div>

              {expandedConference === index && (
                <div className="mt-6 space-y-4 animate-fade-in">
                  <div className="p-4 bg-gray-900/50 rounded-lg border-l-4 border-cyan-500">
                    <h4 className="text-white font-semibold mb-2">Presentation Details</h4>
                    <p className="text-gray-300 mb-3">{conference.description}</p>
                    <div className="border-t border-gray-700 pt-3">
                      <h5 className="text-cyan-400 font-semibold mb-1">Key Achievements</h5>
                      <p className="text-gray-300 text-sm">{conference.achievements}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-sm text-gray-500 mt-4">
                Click to {expandedConference === index ? "collapse" : "learn more"}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
