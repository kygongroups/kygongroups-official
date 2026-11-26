import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import productsDevices from "../../assets/products-devices.png";
import { PRODUCTS } from "../../data/siteData";
import { useSiteFlow } from "../../context/SiteFlowContext";
import { ProductIcon } from "../ProductIcons";
import { AmbientFloat, KYGON_EASE, PulsingDot, ScrollReveal } from "../MotionPrimitives";

export function ProductsSection() {
  const { navigateToSection } = useSiteFlow();

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-20 sm:pb-24 border-t border-black/[0.04] scroll-mt-24"
    >
      {/* Bottom-right red subtle wave accent matching Reference 4 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -bottom-16 w-72 h-48 rounded-full bg-gradient-to-tl from-[#D90416]/90 via-[#D90416]/40 to-transparent blur-2xl opacity-45"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-8 sm:mb-10">
          <div className="lg:col-span-5 space-y-5 pb-2">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[#F7F7F8] border border-black/[0.06] px-4 py-1.5 text-[12.5px] font-bold tracking-wide uppercase text-[#0A0A0D]">
                <PulsingDot />
                <span>OUR PRODUCTS</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.07}>
              <h2 className="text-[38px] sm:text-[48px] xl:text-[54px] font-extrabold tracking-tight leading-[1.08] text-[#0A0A0D]">
                Real Products,
                <br />
                <span className="text-[#D90416]">Real Impact.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.14}>
              <p className="text-[16.5px] sm:text-[18px] leading-relaxed text-[#27272A] max-w-[480px]">
                Technology products and platforms built by Kygon Groups to solve real-world
                problems across industries.
              </p>
            </ScrollReveal>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.65, ease: KYGON_EASE }}
            className="lg:col-span-7 flex justify-center lg:justify-end"
          >
            <AmbientFloat amplitude={6} duration={5.8}>
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                src={productsDevices}
                alt="Kygon Groups platforms across desktop and mobile devices"
                className="w-full max-w-[660px] h-auto object-contain select-none"
              />
            </AmbientFloat>
          </motion.div>
        </div>

        {/* 6 Product Cards Grid matching Reference 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {PRODUCTS.map((product, idx) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: KYGON_EASE }}
              className="group kygon-card kygon-card-hover rounded-[20px] px-6 py-6 flex flex-col justify-between gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="shrink-0 pt-1 transition-transform duration-300 group-hover:scale-110">
                    <ProductIcon iconKey={product.iconKey} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[19px] font-bold text-[#0A0A0D] group-hover:text-[#D90416] transition-colors">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-[13.5px] leading-snug text-[#4B5563]">
                      {product.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigateToSection("contact", { subject: product.inquirySubject })
                  }
                  aria-label={`Request info about ${product.title}`}
                  title={`Inquire about ${product.title}`}
                  className="shrink-0 w-9 h-9 rounded-full bg-[#FDECEC] text-[#D90416] group-hover:bg-[#D90416] group-hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 pl-[60px]">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#FDECEC] group-hover:bg-[#FAD6D8] px-3 py-1 text-[11.5px] font-semibold text-[#5C1A20] transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

