import resume from '../assets/Bothra-CV-2025.pdf'; // adjust the path as needed
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, FileText } from "lucide-react";

export const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const particles = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
      }}
    />
  ));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {particles}
        <div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
            transition: "all 0.3s ease-out",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
            Samkit Bothra
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-slide-in-right">
            Researcher | Student Mayor | Mentor | Student
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-scale-in">
          <Button
            onClick={scrollToProjects}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Explore My Projects
          </Button>
          <Button
            variant="outline"
            className="border-gray-400 text-gray-300 hover:bg-gray-800 px-8 py-3 rounded-full text-lg transition-all duration-300 hover:scale-105"
          >
            <a href={resume} target="_blank" rel="noopener noreferrer">
              View Resume
            </a>
          </Button>
        </div>

        <div className="flex justify-center gap-6 animate-fade-in">
          <a
            href="mailto:samkitbothra11@gmail.com"
            className="p-3 rounded-full bg-gray-800/50 hover:bg-blue-600/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <Mail className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/samkit-bothra/"
            className="p-3 rounded-full bg-gray-800/50 hover:bg-blue-600/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
