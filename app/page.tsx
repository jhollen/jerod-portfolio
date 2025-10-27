import HeroSection from "../components/HeroSection";
import FeaturedProjectsSection from "../components/FeaturedProjectsSection";

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden">
      <HeroSection />
      <FeaturedProjectsSection />
    </div>
  );
}
