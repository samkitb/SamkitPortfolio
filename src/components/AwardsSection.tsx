
import { Card } from "@/components/ui/card";
import { Award } from "lucide-react";

export const AwardsSection = () => {
  const awards = [
    {
      title: "Research Symposium First Place Winner",
      year: "2025",
      description: "1st Place in oral presentation against undergrad and grad students as high schooler.",
      color: "from-pink-400 to-purple-400"
    },
    {
      title: "DECA International Qualifier",
      year: "2025",
      description: "1st Place District, 3rd Place State, 98/100 in roleplay as financial advisor.",
      color: "from-yellow-400 to-orange-400",
    },
    {
      title: "State Champion in Golf",
      year: "Multiple Years",
      description: "2× Qualifier, won several individual tournaments in South Florida.",
      color: "from-green-400 to-teal-400",
    },
    {
      title: "Lincoln-Douglas Debate Awards",
      year: "Multiple Years",
      description: "Multiple awards in competitive debate tournaments.",
      color: "from-blue-400 to-purple-400",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Awards & Honors
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {awards.map((award, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-gray-700 p-6 text-center hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${award.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{award.title}</h3>
              <div className={`text-transparent bg-gradient-to-r ${award.color} bg-clip-text font-semibold mb-3`}>
                {award.year}
              </div>
              <p className="text-gray-300 text-sm">{award.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
