import { Calendar, Github, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { COMPANY_CONTACT, FOOTER_QUICK_LINKS } from "../data/siteData";
import { useSiteFlow, type SectionId } from "../context/SiteFlowContext";
import { KygonLogo } from "./KygonLogo";

function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com", icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com", icon: Youtube },
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "X", href: "https://x.com", icon: XIcon },
];

function pathToSection(path: string): SectionId {
  if (path === "/about") return "about";
  if (path === "/divisions") return "divisions";
  if (path === "/products") return "products";
  if (path === "/contact") return "contact";
  return "home";
}

export function Footer() {
  const { navigateToSection } = useSiteFlow();

  return (
    <footer className="bg-white pt-6 pb-8">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] bg-[#141417] text-white px-7 py-10 sm:px-10 lg:px-12 lg:py-11 shadow-[0_20px_50px_rgba(10,10,13,0.16)]">
          {/* Red abstract corner glow matching reference */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-14 -right-10 w-80 h-44 rounded-full bg-gradient-to-tl from-[#D90416] via-[#D90416]/55 to-transparent blur-2xl opacity-75"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-0 w-72 h-24 opacity-85"
            style={{
              background:
                "radial-gradient(ellipse at 90% 100%, rgba(217,4,22,0.75) 0%, rgba(217,4,22,0.18) 52%, transparent 75%)",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
            {/* Brand Column */}
            <div className="lg:col-span-4 lg:pr-6">
              <button
                type="button"
                onClick={() => navigateToSection("home")}
                className="inline-block mb-4 cursor-pointer"
                aria-label="Kygon Groups Home"
              >
                <KygonLogo variant="footerBadge" className="h-14 sm:h-16 w-auto" />
              </button>
              <p className="text-[14px] leading-relaxed text-white/80 max-w-xs">
                A technology and innovation group building intelligent products and digital
                solutions for a better tomorrow.
              </p>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 lg:border-l lg:border-white/15 lg:pl-7">
              <h3 className="text-[16px] font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2.5 text-[14px] text-white/80">
                {FOOTER_QUICK_LINKS.map((link) => (
                  <li key={link.path}>
                    <button
                      type="button"
                      onClick={() => navigateToSection(pathToSection(link.path))}
                      className="hover:text-[#FF4D5A] transition-colors inline-block cursor-pointer text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get in Touch */}
            <div className="lg:col-span-3 lg:pl-4">
              <h3 className="text-[16px] font-bold text-white mb-4">Get in Touch</h3>
              <ul className="space-y-3 text-[14px] text-white/85">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D90416] shrink-0 mt-0.5" />
                  <span>{COMPANY_CONTACT.location}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D90416] shrink-0" />
                  <a
                    href={`mailto:${COMPANY_CONTACT.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {COMPANY_CONTACT.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D90416] shrink-0" />
                  <a
                    href={COMPANY_CONTACT.phoneHref}
                    className="hover:text-white transition-colors"
                  >
                    {COMPANY_CONTACT.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#D90416] shrink-0" />
                  <span>{COMPANY_CONTACT.hours}</span>
                </li>
              </ul>
            </div>

            {/* Connect With Us */}
            <div className="lg:col-span-3 lg:border-l lg:border-white/15 lg:pl-7">
              <h3 className="text-[16px] font-bold text-white mb-4">Connect With Us</h3>
              <div className="flex flex-wrap items-center gap-2.5">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      whileHover={{ y: -2, scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-lg border border-white/15 bg-white/[0.04] hover:border-[#D90416] hover:bg-[#D90416] text-white flex items-center justify-center transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
