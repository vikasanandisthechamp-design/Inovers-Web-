"use client";

import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";
import { useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  glow?: "cyan" | "violet" | "ember" | "none";
  tilt?: boolean;
};

const glowMap = {
  cyan:   "rgba(92, 212, 255, 0.45)",
  violet: "rgba(167, 139, 250, 0.45)",
  ember:  "rgba(255, 146, 87, 0.45)",
  none:   "transparent",
} as const;

export function GlowCard({
  children,
  className,
  glow = "violet",
  tilt = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setPos(null)}
      whileHover={tilt ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl glass p-6",
        "transition-colors duration-300 hover:border-white/20",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={
          pos
            ? {
                background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${glowMap[glow]}, transparent 60%)`,
              }
            : undefined
        }
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
