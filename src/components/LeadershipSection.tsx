
import { Card } from "@/components/ui/card";

export const LeadershipSection = () => {
  const roles = [
    {
      title: "Student Mayor of Parkland",
      period: "2024–Present",
      description: "Advocate for youth, lead civic events, speak at public forums.",
      icon: "🏛️",
    },
    {
      title: "President, Jain Center of South Florida Youth Group",
      period: "Current",
      description: "Host cultural events for 500+ people, teach religious values.",
      icon: "👥",
    },
    {
      title: "FAU Peer Mentor & STAR Lab Instructor",
      period: "Current",
      description: "Mentoring undergraduate students as a high school and training young researchers.",
      icon: "🎓",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Leadership Experience
        </h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full hidden md:block"></div>

          <div className="space-y-12">
            {roles.map((role, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:gap-8`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-gray-900 z-10"></div>

                {/* Content Card */}
                <Card className="bg-gray-800/50 border-gray-700 p-6 max-w-md hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="text-4xl mb-4 text-center">{role.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
                  <div className="text-purple-400 font-semibold mb-3">{role.period}</div>
                  <p className="text-gray-300">{role.description}</p>
                </Card>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
