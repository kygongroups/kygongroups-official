import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  Gem,
  Layers,
  Share2,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import aboutBuilding from "../../assets/about-building.png";
import { ABOUT_PILLARS, COMPANY_STATS } from "../../data/siteData";
import { useSiteFlow } from "../../context/SiteFlowContext";
import { AnimatedCounter } from "../AnimatedCounter";
import { KYGON_EASE, PulsingDot, ScrollReveal } from "../MotionPrimitives";

const pillarIcons = {
  mission: Target,
  vision: Eye,
  values: Gem,
  team: Users,
};

const statIcons = {
  clients: Users,
  products: Layers,
  divisions: Share2,
  possibilities: Trophy,
};

interface AboutSectionProps {
  showJourneyDetails?: boolean;
}

export function AboutSection({ showJourneyDetails = false }: AboutSectionProps) {
  const { navigateToSection } = useSiteFlow();

  const handleJourneyClick = () => {
    const journeyEl = document.getElementById("our-journey");
    if (journeyEl) {
      journeyEl.scrollIntoView({ behavior: "smooth" });
    } else {
      navigateToSection("divisions");
    }
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white pt-14 pb-16 sm:pt-18 sm:pb-20 border-t border-black/[0.04] scroll-mt-20"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left Copy & 4 Mini Cards */}
          <div className="lg:col-span-6 space-y-6 relative z-10 pb-4 lg:pb-12">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[#F7F7F8] border border-black/[0.06] px-4 py-1.5 text-[13.5px] font-semibold text-[#0A0A0D]">
                <PulsingDot />
                <span>About Us</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.06}>
              <h2 className="text-[38px] sm:text-[48px] xl:text-[54px] font-extrabold tracking-tight leading-[1.08] text-[#0A0A0D]">
                About <span className="text-[#D90416]">Kygon</span> Groups
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <p className="text-[16.5px] sm:text-[18px] leading-relaxed text-[#27272A] max-w-[530px]">
                A technology and innovation group building intelligent software, digital
                platforms, and next-generation solutions that create real-world impact.
              </p>
            </ScrollReveal>

            {/* Mission, Vision, Values, Team Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-1">
              {ABOUT_PILLARS.map((pillar, idx) => {
                const Icon = pillarIcons[pillar.iconKey];
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: "some" }}
                    transition={{ duration: 0.45, delay: 0.1 + idx * 0.07, ease: KYGON_EASE }}
                    whileHover={{ y: -4 }}
                    className="group kygon-card kygon-card-hover rounded-2xl px-3 py-4 text-center flex flex-col items-center"
                  >
                    <Icon
                      className="w-8 h-8 text-[#D90416] mb-2.5 transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.9}
                    />
                    <h3 className="text-[13.5px] font-bold text-[#0A0A0D]">{pillar.title}</h3>
                    <p className="mt-1.5 text-[11.5px] leading-snug text-[#4B5563]">
                      {pillar.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <ScrollReveal delay={0.22} className="pt-2">
              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleJourneyClick}
                className="group inline-flex items-center gap-3 rounded-full bg-[#D90416] hover:bg-[#B80312] text-white px-7 py-3.5 text-[15px] font-semibold shadow-[0_12px_28px_rgba(217,4,22,0.28)] transition-colors duration-200 cursor-pointer"
              >
                <span>{showJourneyDetails ? "Our Journey" : "Explore Our Journey"}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>
            </ScrollReveal>
          </div>

          {/* Right Office Building Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 24 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.65, ease: KYGON_EASE }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <img
              src={aboutBuilding}
              alt="Modern Kygon Groups corporate headquarters building"
              className="w-full max-w-[660px] h-auto rounded-2xl object-contain select-none"
            />
          </motion.div>
        </div>

        {/* Floating Statistics Bar overlapping bottom edge with Animated Count-Up */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: "some" }}
          transition={{ duration: 0.55, delay: 0.15, ease: KYGON_EASE }}
          className="relative z-20 -mt-2 lg:-mt-10 mx-auto max-w-[1160px] rounded-[24px] bg-white px-6 py-6 sm:px-10 sm:py-7 shadow-[0_18px_50px_rgba(10,10,13,0.1)] border border-black/[0.04]"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
            {COMPANY_STATS.map((stat, idx) => {
              const Icon = statIcons[stat.iconKey];
              return (
                <div
                  key={stat.label}
                  className={`group flex items-center justify-center gap-4 ${
                    idx < COMPANY_STATS.length - 1
                      ? "lg:border-r lg:border-black/10"
                      : ""
                  }`}
                >
                  <Icon
                    className="w-10 h-10 text-[#D90416] shrink-0 transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.8}
                  />
                  <div>
                    <div className="text-[28px] sm:text-[32px] font-extrabold leading-none text-[#0A0A0D]">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="mt-1 text-[14px] sm:text-[15px] font-medium text-[#27272A]">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {showJourneyDetails && (
          <div id="our-journey" className="mt-16 pt-12 border-t border-black/[0.05]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#FDECEC] px-3.5 py-1 text-[12.5px] font-bold uppercase tracking-wider text-[#D90416]">
                  Our Journey
                </div>
                <h3 className="text-[28px] sm:text-[36px] font-extrabold tracking-tight text-[#0A0A0D]">
                  Diverse Expertise,{" "}
                  <span className="text-[#D90416]">One Unified Purpose</span>
                </h3>
                <p className="text-[16px] leading-relaxed text-[#4B5563]">
                  Across software engineering, AI research, analytics, creative media, and
                  ventures, Kygon Groups brings specialized teams together to turn bold ideas
                  into dependable digital products.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => navigateToSection("divisions")}
                    className="inline-flex items-center gap-2 rounded-full bg-[#D90416] hover:bg-[#B80312] text-white px-6 py-3 text-[14px] font-semibold transition-colors cursor-pointer"
                  >
                    <span>Explore Our Divisions</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateToSection("products")}
                    className="inline-flex items-center gap-2 rounded-full border border-[#D90416] text-[#D90416] hover:bg-[#D90416] hover:text-white px-6 py-3 text-[14px] font-semibold transition-colors cursor-pointer"
                  >
                    <span>View Our Products</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {ABOUT_PILLARS.map((pillar) => {
                  const Icon = pillarIcons[pillar.iconKey];
                  return (
                    <div
                      key={pillar.title}
                      className="kygon-card kygon-card-hover rounded-[20px] p-6 flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#FDECEC] flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-[#D90416]" strokeWidth={2} />
                      </div>
                      <div>
                        <h4 className="text-[17px] font-bold text-[#0A0A0D]">
                          {pillar.title}
                        </h4>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-[#4B5563]">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

