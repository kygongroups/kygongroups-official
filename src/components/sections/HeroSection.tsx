import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Code2,
  Gamepad2,
  Layers,
  Rocket,
} from "lucide-react";
import homeLaptop from "../../assets/home-laptop.png";
import { HOME_CATEGORIES } from "../../data/siteData";
import { useSiteFlow } from "../../context/SiteFlowContext";
import { AmbientFloat, KYGON_EASE, PulsingDot } from "../MotionPrimitives";

const categoryIcons = {
  code: Code2,
  ai: BrainCircuit,
  products: Layers,
  gaming: Gamepad2,
  innovation: Rocket,
};

export function HeroSection() {
  const { navigateToSection } = useSiteFlow();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const laptopY = useTransform(scrollYProgress, [0, 1], [0, 42]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 18]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden bg-white pt-8 pb-20 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28 scroll-mt-20"
    >
      {/* Soft pink bottom wave transition matching Reference 1 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 opacity-75"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(253, 236, 236, 0.95) 0%, rgba(255,255,255,0) 75%)",
        }}
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* Left Copy */}
          <motion.div style={{ y: copyY }} className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: KYGON_EASE }}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#FDECEC] px-4 py-1.5 text-[13.5px] font-semibold text-[#D90416]"
            >
              <PulsingDot />
              <span>Technology &amp; Innovation Group</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: KYGON_EASE }}
              className="text-[40px] sm:text-[52px] xl:text-[58px] font-extrabold tracking-tight leading-[1.07] text-[#0A0A0D]"
            >
              Building Tomorrow’s{" "}
              <span className="text-[#D90416]">Technology</span>, Today.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: KYGON_EASE }}
              className="text-[17px] sm:text-[18.5px] leading-relaxed text-[#4B5563] max-w-[530px]"
            >
              We build intelligent software, AI-powered products, digital platforms and
              innovative solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: KYGON_EASE }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigateToSection("divisions")}
                className="group inline-flex items-center gap-3 rounded-full bg-[#D90416] hover:bg-[#B80312] text-white px-7 py-3.5 text-[15px] font-semibold shadow-[0_12px_28px_rgba(217,4,22,0.28)] transition-colors duration-200 cursor-pointer"
              >
                <span>Explore Our Divisions</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigateToSection("products")}
                className="group inline-flex items-center gap-3 rounded-full border border-[#D90416]/75 bg-white hover:bg-[#FDECEC]/70 text-[#0A0A0D] px-7 py-3.5 text-[15px] font-semibold transition-colors duration-200 cursor-pointer"
              >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#D90416] text-white transition-transform duration-200 group-hover:scale-110">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span>Our Products</span>
              </motion.button>
            </motion.div>

            {/* Staggered Category Strip */}
            <div className="pt-6 flex flex-wrap items-center gap-y-4 gap-x-5">
              {HOME_CATEGORIES.map((cat, idx) => {
                const Icon = categoryIcons[cat.iconKey];
                return (
                  <motion.div
                    key={cat.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + idx * 0.06,
                      ease: KYGON_EASE,
                    }}
                    whileHover={{ y: -2 }}
                    className={`group flex items-center gap-2.5 ${
                      idx < HOME_CATEGORIES.length - 1
                        ? "sm:pr-5 sm:border-r sm:border-black/10"
                        : ""
                    }`}
                  >
                    <Icon
                      className="w-5 h-5 text-[#D90416] shrink-0 transition-transform duration-200 group-hover:scale-110"
                      strokeWidth={2}
                    />
                    <span className="text-[13px] font-semibold leading-tight text-[#111113] max-w-[105px]">
                      {cat.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Hero Laptop Visual with entrance, parallax & ambient float */}
          <motion.div
            style={{ y: laptopY }}
            initial={{ opacity: 0, scale: 0.94, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: KYGON_EASE }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <AmbientFloat amplitude={8} duration={6}>
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                src={homeLaptop}
                alt="Kygon Groups Innovating Beyond Boundaries platform preview"
                className="w-full max-w-[630px] h-auto object-contain select-none"
              />
            </AmbientFloat>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

