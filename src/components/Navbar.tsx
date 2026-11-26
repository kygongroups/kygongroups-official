import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { NAV_ITEMS } from "../data/siteData";
import { useSiteFlow, type SectionId } from "../context/SiteFlowContext";
import { KygonLogo } from "./KygonLogo";

function getSectionFromPath(path: string): SectionId {
  if (path === "/about") return "about";
  if (path === "/divisions") return "divisions";
  if (path === "/products") return "products";
  if (path === "/contact") return "contact";
  return "home";
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { activeSection, navigateToSection } = useSiteFlow();
  const { pathname } = useLocation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    restDelta: 0.001,
  });

  const currentActive: SectionId =
    pathname === "/" ? activeSection : getSectionFromPath(pathname);

  const handleNavClick = (path: string) => {
    const section = getSectionFromPath(path);
    setMobileOpen(false);
    navigateToSection(section);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/[0.05]">
      {/* Modern top scroll progress indicator */}
      <motion.div
        style={{ scaleX }}
        className="origin-left h-[2.5px] w-full bg-gradient-to-r from-[#D90416] via-[#FF2A3B] to-[#D90416]"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-[82px] sm:h-[92px] lg:h-[96px] flex items-center justify-between gap-3 sm:gap-4">
        {/* Original KYGON GROUPS Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("/")}
          className="flex items-center shrink-0 focus:outline-none cursor-pointer py-1"
          aria-label="Kygon Groups Home"
        >
          <KygonLogo className="h-14 min-[390px]:h-16 sm:h-20 lg:h-[76px] xl:h-[84px] w-auto" />
        </button>

        {/* Desktop Navigation with sliding layoutId active pill */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1 lg:gap-1.5 xl:gap-2.5"
        >
          {NAV_ITEMS.map((item) => {
            const section = getSectionFromPath(item.path);
            const isActive = currentActive === section;

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNavClick(item.path)}
                className={`relative px-4 xl:px-5 py-2 rounded-full text-[14.5px] xl:text-[15px] font-semibold transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-white"
                    : "text-[#0A0A0D] hover:text-[#D90416] hover:bg-[#FDECEC]/60"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[#D90416] shadow-[0_6px_18px_rgba(217,4,22,0.28)]"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Desktop Right CTA */}
        <div className="hidden lg:flex items-center shrink-0">
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigateToSection("contact")}
            className="inline-flex items-center gap-2 rounded-full border border-[#D90416] px-5 py-2 text-[14px] font-semibold text-[#D90416] hover:bg-[#D90416] hover:text-white transition-all duration-200 cursor-pointer"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/10 text-[#0A0A0D] hover:border-[#D90416] hover:text-[#D90416] transition-colors"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden bg-white border-t border-black/5 overflow-hidden"
          >
            <nav className="max-w-[1320px] mx-auto px-4 py-4 flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => {
                const section = getSectionFromPath(item.path);
                const isActive = currentActive === section;
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => handleNavClick(item.path)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-[15px] font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#D90416] text-white"
                        : "text-[#0A0A0D] hover:bg-[#FDECEC] hover:text-[#D90416]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => handleNavClick("/contact")}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#D90416] px-5 py-2.5 text-[15px] font-semibold text-[#D90416] hover:bg-[#D90416] hover:text-white transition-colors cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
