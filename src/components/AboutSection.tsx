
import { Card } from "@/components/ui/card";
import profilePic from '../assets/PIC.png'; // adjust the path as needed


export const AboutSection = () => {
  const stats = [
    { label: "GPA", value: "4.0" },
    { label: "College Credits", value: "80+" },
    { label: "Presentations", value: "6" },
    { label: "Research Projects", value: "4" },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image Placeholder */}
          <div className="relative">
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-gray-700/50">
              <div className="text-gray-400 text-center">
                <div className="w-80 h-80 mx-auto mb-4 bg-gray-600 rounded-full flex items-center justify-center">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                
              </div>
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-xl rounded-2xl -z-10"></div>
          </div>

          {/* About Text */}
          <div className="text-gray-300 space-y-6">
            <p className="text-lg leading-relaxed">
              I am a dual-enrolled high school student at{" "}
              <span className="text-blue-400 font-semibold">Florida Atlantic University</span>{" "}
              pursuing a Bachelor's in Computer Science and a minor in Financial Technology.
            </p>
            <p className="text-lg leading-relaxed">
              My work blends academic research with real world applications in fields such as{" "}
              <span className="text-purple-400 font-semibold">AI, ML, Software Development, and sensor integration</span>
              (See projects below for more information). I've presented my work in this fields at state and national conferences such as{" "}
              <span className="text-purple-400 font-semibold">NCUR and FURC</span>
              , won first place in university-wide competitions, and mentored younger students and undergrads in both research and STEM fundamentals. Whether its surveying populations on AI or creating ML models to detect fall risk in patients, I am passionate about using tech to solve meaningful problems.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700 p-4 text-center hover:bg-gray-700/50 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
