"use client";

import { Section, Reveal } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Users2, Hammer, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Lightbulb className="h-5 w-5" />,
    n: "01",
    title: "Drop an idea",
    body: "Post a problem, a spark, a vision. The community tags, refines, and signals interest.",
    accent: "from-[#5cd4ff]/30 to-transparent",
  },
  {
    icon: <Users2 className="h-5 w-5" />,
    n: "02",
    title: "A Pod forms",
    body: "When 3+ innovators say 'I'm in', a Pod assembles. Roles get assigned. A blueprint is drafted.",
    accent: "from-[#a78bfa]/30 to-transparent",
  },
  {
    icon: <Hammer className="h-5 w-5" />,
    n: "03",
    title: "Build in the open",
    body: "Weekly build logs. Public Kanban. Every contribution recorded. Every blocker visible.",
    accent: "from-[#f472b6]/30 to-transparent",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    n: "04",
    title: "Ship + earn impact",
    body: "Outcome shipped. Story published. Innovator Score bumped. Pod moves on — together.",
    accent: "from-[#ff9257]/30 to-transparent",
  },
];

export function HowItWorksSection() {
  return (
    <Section id="how">
      <div className="text-center max-w-2xl mx-auto">
        <Reveal>
          <Badge>The Inovers Loop</Badge>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
            From spark to <span className="text-gradient">shipped</span>, in
            weeks.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-5 text-white/60 leading-relaxed">
            Four steps. Public throughout. Designed so a student in Bhopal and
            a designer in Bengaluru can ship the same project on Friday.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Connector line on desktop */}
        <div
          aria-hidden
          className="hidden lg:block absolute left-0 right-0 top-[44px] h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.12) 15%, rgba(255,255,255,0.12) 85%, transparent)",
          }}
        />

        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1} y={32}>
            <div className="relative group">
              <span
                aria-hidden
                className={`pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br ${s.accent} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
              />
              <div className="relative glass rounded-2xl p-7 h-full transition-colors hover:border-white/20">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/80">
                    {s.icon}
                  </span>
                  <span className="font-mono text-xs text-white/40">{s.n}</span>
                </div>
                <h3 className="mt-6 text-lg font-medium text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">
                  {s.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
