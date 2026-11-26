import { motion } from "framer-motion";
import { useSiteFlow, type SectionId } from "../context/SiteFlowContext";

const RAIL_ITEMS: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "divisions", label: "Our Divisions" },
  { id: "products", label: "Our Products" },
  { id: "contact", label: "Contact Us" },
];

export function SectionRail() {
  const { activeSection, navigateToSection } = useSiteFlow();

  return (
    <aside
      aria-label="Page section quick navigation"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col items-center gap-2.5 rounded-full bg-white/90 backdrop-blur-md border border-black/[0.06] px-2 py-3 shadow-[0_10px_30px_rgba(10,10,13,0.08)]"
    >
      {RAIL_ITEMS.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => navigateToSection(item.id)}
            aria-label={`Jump to ${item.label}`}
            className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
          >
            {/* Hover tooltip */}
            <span className="pointer-events-none absolute right-8 whitespace-nowrap rounded-full bg-[#0A0A0D] px-3 py-1 text-[11.5px] font-semibold text-white opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-md">
              {item.label}
            </span>

            <motion.span
              layout
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className={`block rounded-full transition-colors duration-200 ${
                isActive
                  ? "w-2.5 h-6 bg-[#D90416] shadow-[0_0_10px_rgba(217,4,22,0.45)]"
                  : "w-2 h-2 bg-black/20 group-hover:bg-[#D90416]/70"
              }`}
            />
          </button>
        );
      })}
    </aside>
  );
}

