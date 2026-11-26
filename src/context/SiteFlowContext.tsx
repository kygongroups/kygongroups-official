import { createContext, useCallback, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type SectionId = "home" | "about" | "divisions" | "products" | "contact";

export const SECTION_ORDER: SectionId[] = [
  "home",
  "about",
  "divisions",
  "products",
  "contact",
];

interface SiteFlowContextValue {
  activeSection: SectionId;
  setActiveSection: (id: SectionId) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  navigateToSection: (id: SectionId, options?: { subject?: string }) => void;
}

const SiteFlowContext = createContext<SiteFlowContextValue | null>(null);

export function SiteFlowProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToElement = useCallback((id: SectionId) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const navigateToSection = useCallback(
    (id: SectionId, options?: { subject?: string }) => {
      if (options?.subject) {
        setSelectedSubject(options.subject);
      }

      if (location.pathname === "/") {
        setActiveSection(id);
        scrollToElement(id);
        return;
      }

      const routeMap: Record<SectionId, string> = {
        home: "/",
        about: "/about",
        divisions: "/divisions",
        products: "/products",
        contact: "/contact",
      };

      const target =
        id === "contact" && options?.subject
          ? `/contact?subject=${encodeURIComponent(options.subject)}`
          : routeMap[id];

      navigate(target);
    },
    [location.pathname, navigate, scrollToElement]
  );

  return (
    <SiteFlowContext.Provider
      value={{
        activeSection,
        setActiveSection,
        selectedSubject,
        setSelectedSubject,
        navigateToSection,
      }}
    >
      {children}
    </SiteFlowContext.Provider>
  );
}

export function useSiteFlow() {
  const ctx = useContext(SiteFlowContext);
  if (!ctx) {
    throw new Error("useSiteFlow must be used inside SiteFlowProvider");
  }
  return ctx;
}

