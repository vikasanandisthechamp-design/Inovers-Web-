"use client";

/**
 * THE ENGINE OF HUMAN PROGRESS — signature hero of Inovers Accelerator.
 *
 * An exploded blueprint: nine inventions arranged radially around an unknown
 * core ("?"). Built as layered SVG with CSS-variable parallax — no WebGL, no
 * three.js, fast on every device.
 *
 * - Fine pointers: subtle depth tilt + inspection highlight on hover
 * - All devices: stroke-draw assembly on first view, slow label cycle
 * - Reduced motion / coarse pointers: static, fully drawn
 * - Decorative: the same facts live in the surrounding copy
 */

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const STAGES = [
  "FIRE",
  "LANGUAGE",
  "TOOLS",
  "ENGINE",
  "ELECTRICITY",
  "FLIGHT",
  "COMPUTING",
  "INTERNET",
  "AI",
] as const;

const CX = 320;
const CY = 320;
const R_GLYPH = 196;
const R_LABEL = 262;

function polar(i: number, r: number): { x: number; y: number } {
  // start at top (-90°), advance clockwise, 40° apart (9 stages)
  const a = ((i * 40 - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Small glyphs, each drawn inside a 44×44 box centered on (0,0). */
const GLYPHS: Record<(typeof STAGES)[number], React.ReactNode> = {
  FIRE: (
    <>
      <path {...S} pathLength="1" d="M0 -18 C 10 -8, 12 2, 8 10 C 5 16, -5 18, -9 11 C -13 4, -9 -2, -4 -6 C -7 1, -2 6, 2 3 C 6 0, 4 -8, 0 -18 Z" />
    </>
  ),
  LANGUAGE: (
    <>
      <path {...S} pathLength="1" d="M-14 -8 C -4 -14, 8 -12, 14 -6 M-14 0 C -2 -4, 6 -2, 12 2 M-12 8 C -4 6, 2 8, 8 12" />
      <path {...S} pathLength="1" strokeWidth={1} d="M-16 14 l 4 -3" opacity="0.6" />
    </>
  ),
  TOOLS: (
    <>
      <path {...S} pathLength="1" d="M0 -16 C 8 -12, 11 -2, 9 6 C 8 12, 4 16, 0 18 C -4 15, -8 10, -9 3 C -10 -5, -6 -13, 0 -16 Z" />
      <path {...S} pathLength="1" strokeWidth={0.9} d="M0 -11 C 4 -5, 5 3, 4 11" opacity="0.5" />
    </>
  ),
  ENGINE: (
    <>
      <circle {...S} pathLength="1" r="11" />
      <circle {...S} pathLength="1" r="3.5" />
      <path {...S} pathLength="1" strokeWidth={1.1} d="M0 -11 v -5 M0 11 v 5 M-11 0 h -5 M11 0 h 5 M-8 -8 l -3.5 -3.5 M8 8 l 3.5 3.5 M8 -8 l 3.5 -3.5 M-8 8 l -3.5 3.5" />
    </>
  ),
  ELECTRICITY: (
    <>
      <path {...S} pathLength="1" d="M3 -18 L -7 2 H 1 L -4 18 L 10 -4 H 2 L 8 -18 Z" />
    </>
  ),
  FLIGHT: (
    <>
      <path {...S} pathLength="1" d="M-18 -2 C -6 -9, 8 -9, 18 -2 M-18 4 C -6 -3, 8 -3, 18 4" />
      <path {...S} pathLength="1" strokeWidth={1} d="M-10 -1.5 V 2.5 M0 -4 V 0 M10 -1.5 V 2.5 M-3 3 L 0 12 L 3 3" />
    </>
  ),
  COMPUTING: (
    <>
      <rect {...S} pathLength="1" x="-10" y="-10" width="20" height="20" />
      <rect {...S} pathLength="1" x="-4" y="-4" width="8" height="8" strokeWidth={1} />
      <path {...S} pathLength="1" strokeWidth={1} d="M-5 -10 v -5 M5 -10 v -5 M-5 10 v 5 M5 10 v 5 M-10 -5 h -5 M-10 5 h -5 M10 -5 h 5 M10 5 h 5" />
    </>
  ),
  INTERNET: (
    <>
      <circle {...S} pathLength="1" cx="0" cy="-12" r="3.5" />
      <circle {...S} pathLength="1" cx="-12" cy="8" r="3.5" />
      <circle {...S} pathLength="1" cx="12" cy="8" r="3.5" />
      <path {...S} pathLength="1" strokeWidth={1} d="M-2 -9 L -10 5 M2 -9 L 10 5 M-8.5 8 H 8.5" />
    </>
  ),
  AI: (
    <>
      <circle {...S} pathLength="1" cx="-12" cy="-8" r="3" />
      <circle {...S} pathLength="1" cx="-12" cy="8" r="3" />
      <circle {...S} pathLength="1" cx="2" cy="0" r="3" />
      <circle {...S} pathLength="1" cx="14" cy="0" r="4" />
      <path {...S} pathLength="1" strokeWidth={0.9} d="M-9 -7 L -1 -1 M-9 7 L -1 1 M5 0 H 10" />
    </>
  ),
};

export function EngineOfProgress({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(-1); // -1 = core "?"
  const [hovered, setHovered] = useState<number | null>(null);
  const [coreHover, setCoreHover] = useState(false);
  const [drawn, setDrawn] = useState(false);
  // reduced-motion only gates behaviors (parallax, cycle), never markup —
  // safe to read lazily; SSR falls back to false.
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // draw-in on mount
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 60);
    return () => clearTimeout(t);
  }, []);

  // slow auto-cycle through the stages (paused while inspecting)
  useEffect(() => {
    if (reduced || hovered !== null) return;
    const id = setInterval(() => {
      setActive((a) => (a >= STAGES.length - 1 ? -1 : a + 1));
    }, 2400);
    return () => clearInterval(id);
  }, [reduced, hovered]);

  // pointer-driven depth tilt (fine pointers only)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const my = ((e.clientY - r.top) / r.height - 0.5) * 2;
        el.style.setProperty("--mx", String(mx.toFixed(3)));
        el.style.setProperty("--my", String(my.toFixed(3)));
      });
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const current = hovered ?? active;

  const layer = (depth: number): React.CSSProperties => ({
    transform: `translate(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth}px))`,
    transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
  });

  return (
    <div
      ref={wrapRef}
      className={cn("relative select-none", className)}
      style={{ "--mx": 0, "--my": 0 } as React.CSSProperties}
    >
      <svg
        viewBox="0 0 640 640"
        className={cn("h-auto w-full acc-draw", drawn && "is-drawn")}
        role="img"
        aria-label="The Engine of Human Progress — a blueprint of nine inventions, from fire to artificial intelligence, arranged around an unknown ninth invention marked with a question mark: the company you may build."
      >
        {/* construction geometry (deepest layer) */}
        <g style={layer(-8)} opacity="0.5">
          <circle {...S} pathLength="1" cx={CX} cy={CY} r={R_GLYPH} strokeWidth={0.7} strokeDasharray="3 7" opacity="0.55" />
          <circle {...S} pathLength="1" cx={CX} cy={CY} r={R_LABEL + 22} strokeWidth={0.6} opacity="0.3" />
          <circle {...S} pathLength="1" cx={CX} cy={CY} r={104} strokeWidth={0.7} strokeDasharray="2 6" opacity="0.45" />
          <path {...S} pathLength="1" strokeWidth={0.6} d={`M${CX} 26 V 76 M${CX} 564 V 614 M26 ${CY} H 76 M564 ${CY} H 614`} opacity="0.5" />
          {/* angle ticks */}
          {STAGES.map((_, i) => {
            const p1 = polar(i, R_LABEL + 16);
            const p2 = polar(i, R_LABEL + 26);
            return (
              <path
                key={i}
                {...S}
                pathLength="1"
                strokeWidth={0.7}
                d={`M${p1.x.toFixed(1)} ${p1.y.toFixed(1)} L ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`}
                opacity="0.5"
              />
            );
          })}
          {/* vitruvian arcs */}
          <path {...S} pathLength="1" strokeWidth={0.7} d={`M${CX - 150} ${CY + 120} A 190 190 0 0 1 ${CX + 150} ${CY + 120}`} opacity="0.35" />
          <path {...S} pathLength="1" strokeWidth={0.7} d={`M${CX - 120} ${CY - 150} A 190 190 0 0 1 ${CX + 120} ${CY - 150}`} opacity="0.35" />
        </g>

        {/* leader lines (mid layer) */}
        <g style={layer(-3)}>
          {STAGES.map((_, i) => {
            const a = polar(i, R_GLYPH + 34);
            const b = polar(i, R_LABEL - 12);
            const isActive = current === i;
            return (
              <path
                key={i}
                {...S}
                pathLength="1"
                strokeWidth={0.8}
                d={`M${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`}
                opacity={isActive ? 0.9 : 0.25}
                style={{
                  stroke: isActive ? "var(--acc-signal)" : "currentColor",
                  transition: "opacity 0.4s ease, stroke 0.4s ease",
                }}
              />
            );
          })}
        </g>

        {/* invention glyphs (mid layer) */}
        <g style={layer(4)}>
          {STAGES.map((stage, i) => {
            const p = polar(i, R_GLYPH);
            const isActive = current === i;
            return (
              <g
                key={stage}
                transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}
                onPointerEnter={() => setHovered(i)}
                onPointerLeave={() => setHovered(null)}
                opacity={isActive ? 1 : 0.5}
                style={{
                  color: isActive ? "var(--acc-signal)" : "currentColor",
                  transition: "opacity 0.4s ease, color 0.4s ease",
                  cursor: "crosshair",
                }}
              >
                <circle
                  r="30"
                  fill="transparent"
                  stroke={isActive ? "var(--acc-signal)" : "currentColor"}
                  strokeWidth="0.7"
                  strokeDasharray="2 5"
                  opacity={isActive ? 0.7 : 0.25}
                  pathLength="1"
                  style={{ transition: "opacity 0.4s ease, stroke 0.4s ease" }}
                />
                {GLYPHS[stage]}
              </g>
            );
          })}
        </g>

        {/* labels (outer layer) */}
        <g style={layer(7)}>
          {STAGES.map((stage, i) => {
            const p = polar(i, R_LABEL);
            const isActive = current === i;
            return (
              <text
                key={stage}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                onPointerEnter={() => setHovered(i)}
                onPointerLeave={() => setHovered(null)}
                style={{
                  fontFamily: "var(--font-mono-tech)",
                  fontSize: "12.5px",
                  letterSpacing: "0.16em",
                  fill: isActive ? "var(--acc-signal)" : "currentColor",
                  opacity: isActive ? 1 : 0.45,
                  transition: "opacity 0.4s ease, fill 0.4s ease",
                  cursor: "crosshair",
                }}
              >
                {stage}
              </text>
            );
          })}
        </g>

        {/* the unknown core (front layer) */}
        <g
          style={layer(12)}
          onPointerEnter={() => {
            setCoreHover(true);
            setHovered(-1);
          }}
          onPointerLeave={() => {
            setCoreHover(false);
            setHovered(null);
          }}
        >
          <g
            transform={`translate(${CX} ${CY})`}
            style={{
              color: current === -1 ? "var(--acc-signal)" : "currentColor",
              transition: "color 0.4s ease",
              cursor: "crosshair",
            }}
          >
            <circle {...S} pathLength="1" r="64" strokeWidth={1.2} />
            <circle {...S} pathLength="1" r="72" strokeWidth={0.7} strokeDasharray="2 6" opacity="0.6" />
            <path {...S} pathLength="1" strokeWidth={1} d="M0 -64 v -12 M0 64 v 12 M-64 0 h -12 M64 0 h 12" opacity="0.8" />
            <path
              {...S}
              pathLength="1"
              strokeWidth={3}
              d="M-14 -14 C -14 -30, 6 -35, 14 -24 C 21 -14, 14 -4, 4 1 C 0 3.5, 0 8, 0 13"
            />
            <path {...S} pathLength="1" strokeWidth={4} d="M0 26 l 0.01 0" />
          </g>
          {/* YOUR MOVE. — revealed on hover */}
          <text
            x={CX}
            y={CY + 106}
            textAnchor="middle"
            style={{
              fontFamily: "var(--font-hand)",
              fontSize: "26px",
              fill: "var(--acc-signal)",
              opacity: coreHover ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
            aria-hidden
          >
            your move.
          </text>
        </g>
      </svg>

      {/* figure caption */}
      <div className="mt-3 flex items-center justify-between acc-label opacity-50">
        <span>FIG. 01 — ENGINE OF HUMAN PROGRESS</span>
        <span className="hidden sm:inline">SCALE — NONE. AMBITION — FULL.</span>
      </div>
    </div>
  );
}
