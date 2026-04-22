"use client";

import { useRef } from "react";
import * as motion from "motion/react-client";
import { useScroll, useTransform } from "motion/react";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { ParticleNetwork } from "@/components/ui/particle-network";
import { GridBackground } from "@/components/ui/grid-background";
import { Orbs } from "@/components/ui/orbs";
import { FloatingUiCards } from "@/components/ui/floating-ui-cards";
import { Badge } from "@/components/ui/badge";
import { ShineButton } from "@/components/ui/shine-button";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const stats = [
  { value: 1240, suffix: "+", label: "Ideas posted" },
  { value: 3180, suffix: "+", label: "Builders active" },
  { value: 74,   suffix: "",  label: "Projects launched" },
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden min-h-[100svh] flex flex-col justify-center"
    >
      {/* layered background */}
      <div aria-hidden className="absolute inset-0 bg-noise" />
      <GridBackground />
      <motion.div
        aria-hidden
        style={{ y: bgY, opacity: bgOpacity }}
        className="absolute inset-0"
      >
        <Orbs />
      </motion.div>
      <motion.div style={{ y: midY, opacity: bgOpacity }} className="absolute inset-0">
        <ParticleNetwork color="#a78bfa" density={0.14} linkDistance={130} />
      </motion.div>
      <motion.div style={{ y: midY }} className="absolute inset-0">
        <FloatingUiCards />
      </motion.div>

      {/* vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 35%, rgba(5,5,11,0.65) 80%, rgba(5,5,11,0.95) 100%)",
        }}
      />

      <motion.div
        style={{ y: contentY }}
        className="container-page relative pt-28 pb-20 md:pt-44 md:pb-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Badge icon={<Sparkles className="h-3 w-3" />}>
            The social platform for innovators · Now forming
          </Badge>
        </motion.div>

        <h1 className="mt-6 md:mt-8 text-center text-[36px] sm:text-5xl md:text-7xl lg:text-[96px] font-semibold tracking-[-0.04em] md:tracking-[-0.045em] leading-[0.98] md:leading-[0.95] text-white">
          <span className="block">
            <RisingWord delay={0.1}>Where</RisingWord>
            <RisingWord delay={0.18}>ideas</RisingWord>
          </span>
          <span className="block mt-1 md:mt-2">
            <RisingWord delay={0.28}>become</RisingWord>
            <RisingWord delay={0.36} className="text-gradient animate-gradient">
              reality.
            </RisingWord>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-6 md:mt-8 mx-auto max-w-2xl text-center text-[14px] md:text-[17px] text-white/60 leading-relaxed tracking-wide px-2"
        >
          <span className="text-white/85 font-medium">Post. Collaborate. Build. Fund. Launch.</span>
          <br />
          Inovers is the control center for a generation of builders who refuse
          to wait for permission. Post an idea as easily as a tweet. Watch a
          team form around it. Ship.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <ShineButton href="/waitlist" size="lg" variant="primary">
            Enter Inovers <ArrowRight className="h-4 w-4" />
          </ShineButton>
          <ShineButton href="/#features" size="lg" variant="outline">
            <Play className="h-3.5 w-3.5 fill-current" /> Explore ideas
          </ShineButton>
        </motion.div>

        {/* Live stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-14 md:mt-20 mx-auto w-full max-w-3xl"
        >
          <div className="glass rounded-2xl md:rounded-3xl p-4 md:p-8 relative overflow-hidden">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-px h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(167,139,250,0.6), rgba(92,212,255,0.6), transparent)",
              }}
            />
            <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
              {stats.map((s, i) => (
                <div key={i} className="px-2 md:px-4 text-center">
                  <div className="text-2xl md:text-4xl font-semibold tracking-tight text-white font-[family-name:var(--font-space-grotesk)]">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1.5 text-[10px] md:text-[11px] uppercase tracking-wider text-white/50 leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/45">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live across 28 states · 12 builders joined this week
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/30 text-[10px] uppercase tracking-[0.22em]"
        >
          Scroll
          <span className="h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function RisingWord({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0 pb-[0.04em]">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}
