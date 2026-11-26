export interface NavItem {
  label: string;
  path: string;
}

export interface DivisionItem {
  id: string;
  title: string;
  description: string;
  iconKey: "tech" | "ai" | "analytics" | "media" | "innovation" | "ventures";
  inquirySubject: string;
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  iconKey: "deepgenelens" | "cpi" | "bustrack" | "codeclash" | "haltcharge" | "solutions";
  inquirySubject: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Divisions", path: "/divisions" },
  { label: "Products", path: "/products" },
  { label: "Contact", path: "/contact" },
];

export const HOME_CATEGORIES = [
  { label: "Software Development", iconKey: "code" as const },
  { label: "AI & Machine Learning", iconKey: "ai" as const },
  { label: "Products", iconKey: "products" as const },
  { label: "Gaming & Entertainment", iconKey: "gaming" as const },
  { label: "Innovation", iconKey: "innovation" as const },
];

export const ABOUT_PILLARS = [
  {
    title: "Our Mission",
    description: "Solve real problems with technology",
    iconKey: "mission" as const,
  },
  {
    title: "Our Vision",
    description: "Be a global innovation group",
    iconKey: "vision" as const,
  },
  {
    title: "Our Values",
    description: "Innovation, Quality, and Impact",
    iconKey: "values" as const,
  },
  {
    title: "Our Team",
    description: "Young, skilled, and passionate",
    iconKey: "team" as const,
  },
];

export const COMPANY_STATS = [
  { value: "50+", label: "Clients", iconKey: "clients" as const },
  { value: "10+", label: "Products", iconKey: "products" as const },
  { value: "5+", label: "Divisions", iconKey: "divisions" as const },
  { value: "∞", label: "Possibilities", iconKey: "possibilities" as const },
];

export const DIVISIONS: DivisionItem[] = [
  {
    id: "kygon-tech",
    title: "Kygon Tech",
    description: "Software, web and mobile solutions for businesses and institutions.",
    iconKey: "tech",
    inquirySubject: "Kygon Tech — Software, Web & Mobile",
  },
  {
    id: "kygon-ai-labs",
    title: "Kygon AI Labs",
    description: "AI/ML, computer vision and intelligent automation solutions.",
    iconKey: "ai",
    inquirySubject: "Kygon AI Labs — AI/ML & Automation",
  },
  {
    id: "kygon-analytics",
    title: "Kygon Analytics",
    description: "Data, performance and insights across industries.",
    iconKey: "analytics",
    inquirySubject: "Kygon Analytics — Data & Insights",
  },
  {
    id: "kygon-media",
    title: "Kygon Media",
    description: "Digital media, branding and creative production.",
    iconKey: "media",
    inquirySubject: "Kygon Media — Branding & Creative",
  },
  {
    id: "kygon-innovation",
    title: "Kygon Innovation",
    description: "R&D, prototypes and next-gen product development.",
    iconKey: "innovation",
    inquirySubject: "Kygon Innovation — R&D & Prototypes",
  },
  {
    id: "kygon-ventures",
    title: "Kygon Ventures",
    description: "New ideas, partnerships and scalable business initiatives.",
    iconKey: "ventures",
    inquirySubject: "Kygon Ventures — Partnerships",
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: "deepgenelens",
    title: "DeepGeneLens",
    description: "AI-based disease prediction from DNA sequences.",
    tags: ["AI/ML", "Bioinformatics", "Healthcare"],
    iconKey: "deepgenelens",
    inquirySubject: "Product Inquiry — DeepGeneLens",
  },
  {
    id: "cpi-platform",
    title: "CPI Platform",
    description: "Cricket performance intelligence for individuals and teams.",
    tags: ["Analytics", "Sports Tech", "Performance"],
    iconKey: "cpi",
    inquirySubject: "Product Inquiry — CPI Platform",
  },
  {
    id: "kygon-bustrack",
    title: "Kygon BusTrack",
    description: "Real-time college bus tracking and route management.",
    tags: ["IoT", "Live Tracking", "Education"],
    iconKey: "bustrack",
    inquirySubject: "Product Inquiry — Kygon BusTrack",
  },
  {
    id: "codeclash",
    title: "CodeClash",
    description: "Gamified competitive coding platform for students and developers.",
    tags: ["Coding", "Battles", "Leaderboard"],
    iconKey: "codeclash",
    inquirySubject: "Product Inquiry — CodeClash",
  },
  {
    id: "halt-and-charge",
    title: "Halt and Charge",
    description: "QR-based EV charging and station management platform.",
    tags: ["EV", "Payments", "Smart Mobility"],
    iconKey: "haltcharge",
    inquirySubject: "Product Inquiry — Halt and Charge",
  },
  {
    id: "kygon-solutions",
    title: "Kygon Solutions",
    description: "Custom software and digital solutions for businesses.",
    tags: ["Web", "Mobile", "Enterprise"],
    iconKey: "solutions",
    inquirySubject: "Product Inquiry — Kygon Solutions",
  },
];

export const CONTACT_SUBJECT_OPTIONS = [
  "Kygon Tech — Software, Web & Mobile",
  "Kygon AI Labs — AI/ML & Automation",
  "Kygon Analytics — Data & Insights",
  "Kygon Media — Branding & Creative",
  "Kygon Innovation — R&D & Prototypes",
  "Kygon Ventures — Partnerships",
  "Product Inquiry — DeepGeneLens",
  "Product Inquiry — CPI Platform",
  "Product Inquiry — Kygon BusTrack",
  "Product Inquiry — CodeClash",
  "Product Inquiry — Halt and Charge",
  "Product Inquiry — Kygon Solutions",
  "General Inquiry",
];

export const CONTACT_HIGHLIGHTS = [
  {
    title: "Quick Response",
    description: "We get back within 24 hours.",
    iconKey: "response" as const,
  },
  {
    title: "Business & Partnerships",
    description: "Collaboration opportunities are always welcome.",
    iconKey: "partnerships" as const,
  },
  {
    title: "Project Support",
    description: "From idea to implementation, we're with you.",
    iconKey: "support" as const,
  },
];

export const COMPANY_CONTACT = {
  location: "Chennai, Tamil Nadu, India",
  email: "contact@kygongroups.com",
  phone: "+91 93636 24212",
  phoneHref: "tel:+919363624212",
  hours: "Mon – Sat  |  9:30 AM – 6:30 PM",
};

export const FOOTER_QUICK_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Our Divisions", path: "/divisions" },
  { label: "Products", path: "/products" },
  { label: "Contact", path: "/contact" },
];

