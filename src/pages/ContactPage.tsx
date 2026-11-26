import { ContactSection } from "../components/sections/ContactSection";
import { PageMeta } from "../components/PageMeta";

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact Us | Kygon Groups"
        description="Have a project, partnership or idea in mind? Get in touch with the Kygon Groups team."
      />
      <ContactSection />
    </>
  );
}
