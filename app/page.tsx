import HeroSection from "../components/HeroSection";
import FeaturedProjectsSection from "../components/FeaturedProjectsSection";

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      <div className="home-backdrop pointer-events-none absolute inset-0 -z-10" />
      <HeroSection />
      <FeaturedProjectsSection />
    </main>
  );
}
