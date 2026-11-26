import { AboutSection } from "../components/sections/AboutSection";
import { PageMeta } from "../components/PageMeta";

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="About Us | Kygon Groups"
        description="A technology and innovation group building intelligent software, digital platforms, and next-generation solutions that create real-world impact."
      />
      <AboutSection showJourneyDetails />
    </>
  );
}
