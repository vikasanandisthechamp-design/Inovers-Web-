"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Button — mono uppercase, technical, with a redrawing sketch arrow    */
/* ------------------------------------------------------------------ */

type AccButtonVariant = "signal" | "ink" | "paper" | "solid-ink";

export function AccButton({
  href,
  onClick,
  type,
  variant = "signal",
  className,
  children,
  arrow = false,
  disabled,
  ...rest
}: {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: AccButtonVariant;
  className?: string;
  children: React.ReactNode;
  arrow?: boolean;
  disabled?: boolean;
} & Record<`data-${string}`, string | undefined>) {
  const cls = cn(
    "acc-btn",
    {
      signal: "acc-btn-signal",
      ink: "acc-btn-ink",
      paper: "acc-btn-paper",
      "solid-ink": "acc-btn-solid-ink",
    }[variant],
    disabled && "opacity-50 pointer-events-none",
    className
  );

  const content = (
    <>
      {children}
      {arrow && <SketchArrow className="h-3.5 w-8 shrink-0" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      className={cls}
      {...rest}
    >
      {content}
    </button>
  );
}

/** Hand-sketched arrow — slightly imperfect on purpose. Redraws on hover. */
export function SketchArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 16"
      fill="none"
      aria-hidden
      className={cn("acc-cta-arrow", className)}
    >
      <path
        d="M1.5 8.6 C 12 7.2, 24 8.9, 36.5 7.9 M30 2.5 C 32.5 4.8, 35 6.7, 37.8 8 C 34.8 9.5, 32.2 11.6, 30.4 13.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        pathLength="40"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Technical framing                                                    */
/* ------------------------------------------------------------------ */

/** Thin technical border with corner ticks. */
export function Frame({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "article" | "section" | "li";
}) {
  return (
    <Tag className={cn("acc-frame", className)}>
      <span aria-hidden className="acc-ticks" />
      {children}
    </Tag>
  );
}

/** "§ 04 / THE OFFER" style section heading rail. */
export function SectionRail({
  no,
  label,
  className,
  fig,
}: {
  no: string;
  label: string;
  className?: string;
  fig?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline gap-4 border-b pb-3",
        "border-[var(--acc-line-ink)] [.acc-paper_&]:border-[var(--acc-line-paper)]",
        className
      )}
    >
      <span className="acc-label text-[var(--acc-signal)]">{no}</span>
      <span className="acc-label opacity-60">{label}</span>
      {fig && <span className="acc-label ml-auto opacity-40 hidden sm:inline">{fig}</span>}
    </div>
  );
}

/** Handwritten margin note. Decorative — hidden from screen readers. */
export function HandNote({
  children,
  className,
  rotate = -2,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      aria-hidden
      className={cn("acc-hand inline-block text-[var(--acc-signal)]", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

/** Live status pill driven by the status engine. */
export function StatusPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 border px-3.5 py-2 acc-label",
        "border-[var(--acc-line-ink-strong)] [.acc-paper_&]:border-[var(--acc-line-paper-strong)]",
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5" aria-hidden>
        <span className="absolute inset-0 animate-ping rounded-full bg-[var(--acc-signal)] opacity-70 motion-reduce:animate-none" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--acc-signal)]" />
      </span>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Draw-on-view wrapper for sketch SVGs                                 */
/* ------------------------------------------------------------------ */

export function DrawOnView({
  children,
  className,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setDrawn(true);
            if (once) io.disconnect();
          } else if (!once) {
            setDrawn(false);
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <div ref={ref} className={cn("acc-draw", drawn && "is-drawn", className)}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal — shared scroll reveal tuned for the accelerator             */
/* ------------------------------------------------------------------ */

export { Reveal } from "@/components/ui/section";
