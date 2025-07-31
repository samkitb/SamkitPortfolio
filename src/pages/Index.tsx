
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { LeadershipSection } from "@/components/LeadershipSection";
import { AwardsSection } from "@/components/AwardsSection";
import { TeachingSection } from "@/components/TeachingSection";
import { ConferencesSection } from "@/components/ConferencesSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <LeadershipSection />
      <AwardsSection />
      <TeachingSection />
      <ConferencesSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
