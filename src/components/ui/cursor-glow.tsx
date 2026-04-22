"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A soft, blurred radial glow that follows the cursor.
 * - Hidden on coarse pointers (touch devices)
 * - Slightly larger + brighter when hovering interactive elements
 * - Respects prefers-reduced-motion (becomes a static circle)
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.4 });
  const raf = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);

    let lastX = 0;
    let lastY = 0;
    const onMove = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!raf.current) {
        raf.current = requestAnimationFrame(() => {
          x.set(lastX);
          y.set(lastY);
          raf.current = 0;
        });
      }
    };

    const interactiveSel =
      'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';
    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.(interactiveSel)) setHovering(true);
    };
    const onOut = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.(interactiveSel)) setHovering(false);
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Big soft glow */}
      <motion.div
        aria-hidden
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hovering ? 0.85 : 0.55,
          scale: hovering ? 1.25 : 1,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[55] h-[420px] w-[420px] rounded-full blur-3xl transition-[opacity,transform] duration-300"
      >
        <span
          className="block h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(167,139,250,0.22), rgba(92,212,255,0.1) 40%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Crisp dot */}
      <motion.div
        aria-hidden
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          scale: hovering ? 2.2 : 1,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[56] h-2 w-2 rounded-full bg-white/90 mix-blend-difference transition-transform duration-200"
      />
    </>
  );
}
