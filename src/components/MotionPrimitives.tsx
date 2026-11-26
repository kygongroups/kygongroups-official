import { motion, type HTMLMotionProps } from "framer-motion";

export const KYGON_EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  yOffset?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  yOffset = 22,
  className = "",
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.55, delay, ease: KYGON_EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface FloatingFrameProps {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}

export function AmbientFloat({
  children,
  className = "",
  amplitude = 7,
  duration = 5.5,
}: FloatingFrameProps) {
  return (
    <motion.div
      animate={{ y: [-amplitude / 2, amplitude / 2, -amplitude / 2] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PulsingDot() {
  return (
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D90416] opacity-65" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D90416]" />
    </span>
  );
}

