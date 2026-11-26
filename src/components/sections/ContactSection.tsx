import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  Handshake,
  Headset,
  Layers,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  User,
  Zap,
} from "lucide-react";
import aboutBuilding from "../../assets/about-building.png";
import { CONTACT_HIGHLIGHTS, CONTACT_SUBJECT_OPTIONS } from "../../data/siteData";
import { useSiteFlow } from "../../context/SiteFlowContext";
import { KYGON_EASE, PulsingDot, ScrollReveal } from "../MotionPrimitives";

const highlightIcons = {
  response: Zap,
  partnerships: Handshake,
  support: Headset,
};

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactSection() {
  const [searchParams] = useSearchParams();
  const { selectedSubject } = useSiteFlow();
  const initialParam = searchParams.get("subject") || "";

  const resolvedInitial = CONTACT_SUBJECT_OPTIONS.includes(selectedSubject)
    ? selectedSubject
    : CONTACT_SUBJECT_OPTIONS.includes(initialParam)
      ? initialParam
      : "";

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: resolvedInitial,
    message: "",
  });

  useEffect(() => {
    if (selectedSubject && CONTACT_SUBJECT_OPTIONS.includes(selectedSubject)) {
      setForm((prev) => ({ ...prev, subject: selectedSubject }));
    }
  }, [selectedSubject]);

  useEffect(() => {
    const paramSubject = searchParams.get("subject");
    if (paramSubject && CONTACT_SUBJECT_OPTIONS.includes(paramSubject)) {
      setForm((prev) => ({ ...prev, subject: paramSubject }));
    }
  }, [searchParams]);

  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<{
    id: string;
    message: string;
    emailDelivered: boolean;
  } | null>(null);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (data.errors) setFieldErrors(data.errors);
        setSubmitError(data.error || "Please verify your details and try again.");
        return;
      }

      setSubmitSuccess({
        id: data.id,
        message: data.message,
        emailDelivered: Boolean(data.emailDelivered),
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitError(
        "Unable to connect to the contact server. Please ensure the server is running or email contact@kygongroups.com."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white pt-16 pb-16 sm:pt-20 sm:pb-20 border-t border-black/[0.04] scroll-mt-24"
    >
      {/* Left red swoosh accent matching Reference 5 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-16 w-48 h-48 rounded-full bg-gradient-to-tr from-[#D90416]/85 to-transparent blur-2xl opacity-35"
      />

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          {/* Left & Center Column */}
          <div className="lg:col-span-7 relative">
            {/* Building visual positioned cleanly right of the text column */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.65, ease: KYGON_EASE }}
              className="hidden lg:block pointer-events-none absolute left-[355px] xl:left-[380px] right-[-36px] top-6 h-[370px] z-0 overflow-hidden"
            >
              <div className="relative w-full h-full">
                <div className="absolute left-3 top-2 w-56 h-56 rounded-full bg-gradient-to-br from-[#D90416] to-[#FF4A55] opacity-90" />
                <img
                  src={aboutBuilding}
                  alt=""
                  className="relative z-10 w-full h-full object-cover object-left rounded-2xl"
                />
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/75 to-transparent z-20" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent z-20" />
              </div>
            </motion.div>

            <div className="relative z-10 space-y-5 max-w-[355px] xl:max-w-[375px]">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2.5 rounded-full bg-[#F7F7F8] border border-black/[0.06] px-4 py-1.5 text-[12.5px] font-bold tracking-wide uppercase text-[#0A0A0D]">
                  <PulsingDot />
                  <span>CONTACT US</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.07}>
                <h2 className="text-[38px] sm:text-[48px] xl:text-[52px] font-extrabold tracking-tight leading-[1.06] text-[#0A0A0D]">
                  Let’s Build
                  <br />
                  Something
                  <br />
                  <span className="text-[#D90416]">Extraordinary.</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.14}>
                <p className="text-[16px] sm:text-[17px] leading-relaxed text-[#27272A]">
                  Have a project, partnership or idea in mind? Get in touch with the Kygon
                  Groups team. We’d love to hear from you.
                </p>
              </ScrollReveal>
            </div>

            {/* 3 Highlight Cards */}
            <div className="relative z-20 mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {CONTACT_HIGHLIGHTS.map((item, idx) => {
                const Icon = highlightIcons[item.iconKey];
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: "some" }}
                    transition={{ duration: 0.45, delay: 0.1 + idx * 0.08, ease: KYGON_EASE }}
                    className="group kygon-card kygon-card-hover rounded-[18px] px-4 py-5 text-center flex flex-col items-center bg-white/95"
                  >
                    <Icon
                      className="w-8 h-8 text-[#D90416] mb-2.5 transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.9}
                    />
                    <h3 className="text-[14.5px] font-bold leading-snug text-[#0A0A0D]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[12px] leading-snug text-[#4B5563]">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Contact Form Card */}
          <motion.div
            initial={{ opacity: 1, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.55, delay: 0.08, ease: KYGON_EASE }}
            className="lg:col-span-5 relative z-30"
          >
            <div className="rounded-[24px] bg-white border border-black/[0.06] shadow-[0_22px_60px_rgba(10,10,13,0.1)] p-6 sm:p-8">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-11 h-11 rounded-xl bg-[#FDECEC] border border-[#D90416]/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#D90416]" />
                </div>
                <h3 className="text-[22px] sm:text-[24px] font-extrabold text-[#0A0A0D]">
                  Send Us a Message
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {submitSuccess && (
                  <motion.div
                    key="success-alert"
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mb-5 rounded-2xl border border-[#D90416]/25 bg-[#FDECEC]/60 p-4 text-[14px] text-[#0A0A0D]"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#D90416] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Message Received ({submitSuccess.id})</p>
                        <p className="mt-0.5 text-[#3F3F46]">{submitSuccess.message}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {submitError && (
                  <motion.div
                    key="error-alert"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    role="alert"
                    className="mb-5 rounded-xl border border-[#D90416]/40 bg-[#FDECEC] px-4 py-3 text-[13.5px] font-medium text-[#990310]"
                  >
                    {submitError}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[13.5px] font-bold text-[#0A0A0D] mb-1.5"
                    >
                      Your Name <span className="text-[#D90416]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#D90416] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Enter your name"
                        className={`w-full rounded-xl border bg-white pl-10 pr-3.5 py-2.5 text-[14px] text-[#0A0A0D] placeholder:text-[#71717A] focus:outline-none focus:ring-2 focus:ring-[#D90416]/20 focus:border-[#D90416] transition-all ${
                          fieldErrors.name ? "border-[#D90416]" : "border-black/15"
                        }`}
                      />
                    </div>
                    {fieldErrors.name && (
                      <p className="mt-1 text-[12px] text-[#D90416]">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[13.5px] font-bold text-[#0A0A0D] mb-1.5"
                    >
                      Your Email <span className="text-[#D90416]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#D90416] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Enter your email"
                        className={`w-full rounded-xl border bg-white pl-10 pr-3.5 py-2.5 text-[14px] text-[#0A0A0D] placeholder:text-[#71717A] focus:outline-none focus:ring-2 focus:ring-[#D90416]/20 focus:border-[#D90416] transition-all ${
                          fieldErrors.email ? "border-[#D90416]" : "border-black/15"
                        }`}
                      />
                    </div>
                    {fieldErrors.email && (
                      <p className="mt-1 text-[12px] text-[#D90416]">{fieldErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-[13.5px] font-bold text-[#0A0A0D] mb-1.5"
                  >
                    Subject <span className="text-[#D90416]">*</span>
                  </label>
                  <div className="relative">
                    <Layers className="w-4 h-4 text-[#D90416] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      id="contact-subject"
                      required
                      value={form.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      className={`w-full appearance-none rounded-xl border bg-white pl-10 pr-10 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#D90416]/20 focus:border-[#D90416] transition-all ${
                        form.subject ? "text-[#0A0A0D]" : "text-[#71717A]"
                      } ${fieldErrors.subject ? "border-[#D90416]" : "border-black/15"}`}
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      {CONTACT_SUBJECT_OPTIONS.map((option) => (
                        <option key={option} value={option} className="text-[#0A0A0D]">
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#52525B] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {fieldErrors.subject && (
                    <p className="mt-1 text-[12px] text-[#D90416]">{fieldErrors.subject}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[13.5px] font-bold text-[#0A0A0D] mb-1.5"
                  >
                    Message <span className="text-[#D90416]">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-[#D90416] absolute left-3.5 top-3.5 pointer-events-none" />
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell us about your requirement..."
                      className={`w-full rounded-xl border bg-white pl-10 pr-3.5 py-2.5 text-[14px] text-[#0A0A0D] placeholder:text-[#71717A] focus:outline-none focus:ring-2 focus:ring-[#D90416]/20 focus:border-[#D90416] transition-all resize-y min-h-[116px] ${
                        fieldErrors.message ? "border-[#D90416]" : "border-black/15"
                      }`}
                    />
                  </div>
                  {fieldErrors.message && (
                    <p className="mt-1 text-[12px] text-[#D90416]">{fieldErrors.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ y: -1, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#D90416] hover:bg-[#B80312] disabled:opacity-70 text-white px-6 py-3.5 text-[15.5px] font-bold shadow-[0_12px_28px_rgba(217,4,22,0.28)] transition-colors duration-200 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
