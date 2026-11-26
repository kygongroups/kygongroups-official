import { useEffect } from "react";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { DivisionsSection } from "../components/sections/DivisionsSection";
import { ProductsSection } from "../components/sections/ProductsSection";
import { ContactSection } from "../components/sections/ContactSection";
import { SectionRail } from "../components/SectionRail";
import { PageMeta } from "../components/PageMeta";
import { SECTION_ORDER, useSiteFlow } from "../context/SiteFlowContext";

export function HomePage() {
  const { setActiveSection } = useSiteFlow();

  useEffect(() => {
    const updateActiveByScroll = () => {
      const triggerY = window.innerHeight * 0.35;
      let current = SECTION_ORDER[0];

      for (const id of SECTION_ORDER) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY) {
          current = id;
        }
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 40) {
        current = "contact";
      }

      setActiveSection(current);
    };

    updateActiveByScroll();
    window.addEventListener("scroll", updateActiveByScroll, { passive: true });
    window.addEventListener("resize", updateActiveByScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActiveByScroll);
      window.removeEventListener("resize", updateActiveByScroll);
    };
  }, [setActiveSection]);

  return (
    <>
      <PageMeta
        title="Kygon Groups | Building Tomorrow's Technology, Today."
        description="We build intelligent software, AI-powered products, digital platforms and innovative solutions."
      />
      <SectionRail />
      <HeroSection />
      <AboutSection />
      <DivisionsSection />
      <ProductsSection />
      <ContactSection />
    </>
  );
}
