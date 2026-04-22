"use client";

import * as motion from "motion/react-client";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { GridBackground } from "@/components/ui/grid-background";
import { Orbs } from "@/components/ui/orbs";
import { Badge } from "@/components/ui/badge";
import { ShineButton } from "@/components/ui/shine-button";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const stats = [
  { value: 1000, suffix: "+", label: "Founding Innovators" },
  { value: 250, suffix: "+", label: "Ideas waiting to ship" },
  { value: 28, suffix: "", label: "States represented" },
];

const headlineWords = ["Build", "the", "Future.", "Together."];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-noise" />
      <GridBackground />
      <Orbs />

      <div className="container-page relative pt-36 pb-28 md:pt-44 md:pb-36 min-h-[100svh] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Badge icon={<Sparkles className="h-3 w-3" />}>
            Bharat&apos;s Innovation Ecosystem · Now Forming
          </Badge>
        </motion.div>

        <h1 className="mt-7 text-center text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-semibold tracking-[-0.04em] leading-[0.95] text-white">
          <span className="block">
            {headlineWords.slice(0, 2).map((w, i) => (
              <RisingWord key={i} delay={0.05 + i * 0.08}>
                {w}
              </RisingWord>
            ))}
            <RisingWord delay={0.05 + 2 * 0.08} className="text-gradient">
              {headlineWords[2]}
            </RisingWord>
          </span>
          <span className="block mt-2">
            <RisingWord delay={0.5} className="text-gradient-warm">
              {headlineWords[3]}
            </RisingWord>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-7 mx-auto max-w-2xl text-center text-base md:text-lg text-white/65 leading-relaxed"
        >
          Inovers is where ideas meet builders, builders form Pods, and Pods
          ship real-world projects — for citizens, for startups, for
          governments. A movement engineered to turn intent into outcome.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <ShineButton href="/waitlist" size="lg" variant="primary">
            Join the Ecosystem <ArrowRight className="h-4 w-4" />
          </ShineButton>
          <ShineButton href="/#ecosystem" size="lg" variant="outline">
            <Play className="h-3.5 w-3.5 fill-current" /> Explore Ideas
          </ShineButton>
        </motion.div>

        {/* Live stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 mx-auto w-full max-w-3xl"
        >
          <div className="glass rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
              {stats.map((s, i) => (
                <div key={i} className="px-4 text-center">
                  <div className="text-3xl md:text-4xl font-semibold tracking-tight text-white font-[family-name:var(--font-space-grotesk)]">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1.5 text-[11px] uppercase tracking-wider text-white/50">
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
            12 builders joined this week
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/30 text-[10px] uppercase tracking-[0.2em]"
        >
          Scroll
          <span className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </div>
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
    <span className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}
