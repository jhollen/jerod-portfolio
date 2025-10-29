import HeroSection from "../components/HeroSection";
import FeaturedProjectsSection from "../components/FeaturedProjectsSection";
import FooterCTA from "../components/FooterCTA";

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden">
      <HeroSection />
      <FeaturedProjectsSection />
      <FooterCTA />
    </div>
  );
}
