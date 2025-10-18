// Main page for the site
// This page renders the hero section and some example sections
import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <main className="mx-auto">
      {/* Hero section at the top of the page */}
      <HeroSection />

      {/* Under Maintenance message in a green gradient section below the hero */}
      <section
        className="w-full flex justify-center items-center py-16"
        style={{ background: "linear-gradient(135deg, #7a9c7d 0%, #222 100%)" }}
      >
        <div className="bg-yellow-200 text-yellow-900 font-semibold px-6 py-3 rounded shadow-lg text-xl border-2 border-yellow-300">
          Under Maintenance
        </div>
      </section>
    </main>
  );
}
