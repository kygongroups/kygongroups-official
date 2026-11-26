import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import divisionsCards from "../../assets/divisions-cards.png";
import { DIVISIONS } from "../../data/siteData";
import { useSiteFlow } from "../../context/SiteFlowContext";
import { DivisionIcon } from "../ProductIcons";
import { AmbientFloat, KYGON_EASE, PulsingDot, ScrollReveal } from "../MotionPrimitives";

export function DivisionsSection() {
  const { navigateToSection } = useSiteFlow();

  return (
    <section
      id="divisions"
      className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-20 sm:pb-24 border-t border-black/[0.04] scroll-mt-24"
    >
      {/* Subtle decorative red corner waves matching Reference 3 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-24 w-56 h-56 rounded-full bg-gradient-to-tr from-[#D90416]/85 via-[#D90416]/35 to-transparent blur-xl opacity-35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -bottom-16 w-72 h-48 rounded-full bg-gradient-to-tl from-[#D90416]/90 via-[#D90416]/40 to-transparent blur-2xl opacity-45"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10 sm:mb-12">
          <div className="lg:col-span-6 space-y-5">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[#F7F7F8] border border-black/[0.06] px-4 py-1.5 text-[12.5px] font-bold tracking-wide uppercase text-[#0A0A0D]">
                <PulsingDot />
                <span>OUR DIVISIONS</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.07}>
              <h2 className="text-[38px] sm:text-[48px] xl:text-[54px] font-extrabold tracking-tight leading-[1.08] text-[#0A0A0D]">
                Multiple Divisions,
                <br />A <span className="text-[#D90416]">Unified Vision.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.14}>
              <p className="text-[16.5px] sm:text-[18px] leading-relaxed text-[#27272A] max-w-[540px]">
                Specialized teams working across technology, innovation, media and
                real-world solutions to create lasting impact.
              </p>
            </ScrollReveal>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.65, ease: KYGON_EASE }}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <AmbientFloat amplitude={7} duration={5.2}>
              <motion.img
                whileHover={{ scale: 1.03, rotate: -0.5 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                src={divisionsCards}
                alt="Kygon Groups layered division glass panels"
                className="w-full max-w-[540px] h-auto object-contain select-none"
              />
            </AmbientFloat>
          </motion.div>
        </div>

        {/* 6 Division Cards Grid matching Reference 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIVISIONS.map((division, idx) => (
            <motion.article
              key={division.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: KYGON_EASE }}
              className="group kygon-card kygon-card-hover rounded-[20px] px-6 py-6 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-5 min-w-0">
                <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <DivisionIcon iconKey={division.iconKey} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[19px] font-bold text-[#0A0A0D] group-hover:text-[#D90416] transition-colors">
                    {division.title}
                  </h3>
                  <p className="mt-1 text-[13.5px] leading-snug text-[#4B5563]">
                    {division.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigateToSection("contact", { subject: division.inquirySubject })
                }
                aria-label={`Inquire about ${division.title}`}
                title={`Inquire about ${division.title}`}
                className="shrink-0 w-10 h-10 rounded-full bg-[#FDECEC] text-[#D90416] group-hover:bg-[#D90416] group-hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

