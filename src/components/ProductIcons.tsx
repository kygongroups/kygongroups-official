import {
  Briefcase,
  BusFront,
  Code2,
  Cpu,
  Dna,
  Layers,
  Play,
  Rocket,
} from "lucide-react";
import type { DivisionItem, ProductItem } from "../data/siteData";

export function DivisionIcon({ iconKey }: { iconKey: DivisionItem["iconKey"] }) {
  switch (iconKey) {
    case "tech":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-11 w-11 text-[#D90416]"
          aria-hidden="true"
        >
          <rect
            x="7"
            y="10"
            width="34"
            height="22"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="2.4"
          />
          <path
            d="M4 35.5H44"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M19 18L15 21L19 24M29 18L33 21L29 24M25.5 16.5L22.5 25.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "ai":
      return <Cpu className="h-11 w-11 text-[#D90416]" strokeWidth={1.9} />;
    case "analytics":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-11 w-11 text-[#D90416]"
          aria-hidden="true"
        >
          <path
            d="M9 22L19 15L26 20L38 10"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32 10H38V16"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="9" y="31" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="2.3" />
          <rect x="20" y="25" width="6" height="14" rx="1" stroke="currentColor" strokeWidth="2.3" />
          <rect x="31" y="20" width="6" height="19" rx="1" stroke="currentColor" strokeWidth="2.3" />
        </svg>
      );
    case "media":
      return <Play className="h-11 w-11 text-[#D90416]" strokeWidth={2} />;
    case "innovation":
      return <Rocket className="h-11 w-11 text-[#D90416]" strokeWidth={1.9} />;
    case "ventures":
      return <Briefcase className="h-11 w-11 text-[#D90416]" strokeWidth={1.9} />;
  }
}

export function ProductIcon({ iconKey }: { iconKey: ProductItem["iconKey"] }) {
  switch (iconKey) {
    case "deepgenelens":
      return <Dna className="h-11 w-11 text-[#D90416]" strokeWidth={1.9} />;
    case "cpi":
      return (
        <svg
          viewBox="0 0 64 56"
          fill="none"
          className="h-12 w-14"
          aria-hidden="true"
        >
          <path
            d="M11 21C16 10 34 6 48 15"
            stroke="#111113"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="31" cy="18" r="7.5" fill="#D90416" />
          <path
            d="M26 13.5C29 17 29.5 19 26.5 22.5M35.5 13.5C32.5 17 32 19 35 22.5"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="1.5 1.8"
          />
          <path
            d="M14 27C25 22 41 22 54 31"
            stroke="#D90416"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <text
            x="10"
            y="47"
            fill="#111113"
            fontFamily="Plus Jakarta Sans, Inter, sans-serif"
            fontWeight="800"
            fontStyle="italic"
            fontSize="18"
            letterSpacing="0.5"
          >
            CPI
          </text>
          <path
            d="M14 50.5C26 54 44 51 54 41"
            stroke="#111113"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "bustrack":
      return <BusFront className="h-11 w-11 text-[#D90416]" strokeWidth={1.9} />;
    case "codeclash":
      return <Code2 className="h-11 w-11 text-[#D90416]" strokeWidth={2.1} />;
    case "haltcharge":
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-11 w-11 text-[#D90416]"
          aria-hidden="true"
        >
          <rect
            x="10"
            y="8"
            width="20"
            height="31"
            rx="3"
            stroke="currentColor"
            strokeWidth="2.3"
          />
          <rect
            x="14"
            y="12"
            width="12"
            height="8"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M21 24L17 30H21L19.5 35L24.5 28.5H20.5L21 24Z"
            fill="currentColor"
          />
          <path
            d="M7 39H33"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
          <path
            d="M30 16H35C36.6569 16 38 17.3431 38 19V32C38 33.6569 36.6569 35 35 35H30"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <rect x="35.5" y="11" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "solutions":
      return <Layers className="h-11 w-11 text-[#D90416]" strokeWidth={1.9} />;
  }
}

