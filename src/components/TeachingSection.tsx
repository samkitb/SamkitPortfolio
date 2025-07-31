
import { Card } from "@/components/ui/card";
import { Book, User } from "lucide-react";

export const TeachingSection = () => {
  const roles = [
    {
      title: "FAU Research Peer Mentor",
      subjects: "Research Fields, Undergraduate Students",
      icon: "🔬",
      color: "from-blue-400 to-purple-400",
    },
    {
      title: "FAU Math Tutor",
      subjects: "College Algebra, Problem Solving",
      icon: "📊",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Kumon Assistant Instructor",
      subjects: "Reading, Math",
      icon: "📚",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "STAR Lab Instructor",
      subjects: "Lab safety, Experiment coaching, Young Students",
      icon: "🔬",
      color: "from-green-500 to-teal-500",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Teaching & Tutoring
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {roles.map((role, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-gray-700 p-6 text-center hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {role.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
              <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${role.color} text-white text-sm font-semibold mb-4`}>
                {role.subjects}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
