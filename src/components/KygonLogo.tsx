import kygonLogo from "../assets/kygon-logo.jpg";

interface KygonLogoProps {
  className?: string;
  variant?: "default" | "footerBadge";
}

export function KygonLogo({ className = "h-12 w-auto", variant = "default" }: KygonLogoProps) {
  if (variant === "footerBadge") {
    return (
      <span className="inline-flex items-center rounded-xl bg-white px-3 py-1.5 shadow-sm">
        <img
          src={kygonLogo}
          alt="KYGON GROUPS — Building Tomorrow's Technology, Today."
          className={`${className} object-contain brightness-[1.008] select-none`}
          decoding="async"
        />
      </span>
    );
  }

  return (
    <img
      src={kygonLogo}
      alt="KYGON GROUPS — Building Tomorrow's Technology, Today."
      className={`${className} object-contain brightness-[1.008] select-none`}
      decoding="async"
    />
  );
}

