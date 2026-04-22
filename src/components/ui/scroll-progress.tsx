"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-px origin-left"
    >
      <span
        className="block h-full w-full"
        style={{
          background:
            "linear-gradient(90deg, #5cd4ff 0%, #a78bfa 50%, #f472b6 100%)",
          boxShadow: "0 0 12px rgba(167,139,250,0.6)",
        }}
      />
    </motion.div>
  );
}
