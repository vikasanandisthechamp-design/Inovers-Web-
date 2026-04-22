"use client";

import { Section, Reveal } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Layers, GitBranch, Trophy } from "lucide-react";

const pillars = [
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Open by default",
    body: "Every idea, every Pod, every milestone is public — searchable, forkable, credit-able.",
  },
  {
    icon: <GitBranch className="h-5 w-5" />,
    title: "Collaboration over competition",
    body: "Pods of 3–9 people execute together. Skills compound. Ego doesn't compound.",
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    title: "Credit where due",
    body: "Innovator Score tracks contribution across ideas, Pods and shipped projects.",
  },
];

export function WhatIsSection() {
  return (
    <Section id="what-is" className="py-32 md:py-40">
      <div className="grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <Reveal>
            <Badge>What is Inovers</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-4xl md:text-5xl lg:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-white">
              Not a marketplace.
              <br />
              <span className="text-gradient">An execution engine.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-white/60 leading-relaxed text-[17px] max-w-md">
              Most platforms collect ideas. Inovers compiles them into Pods —
              small, fast, accountable units that ship real outcomes for
              citizens, startups and institutions across Bharat.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-5">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12} y={32}>
              <article className="group glass rounded-2xl p-7 md:p-9 transition-colors hover:border-white/20">
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[var(--neon-cyan)] transition-transform group-hover:-rotate-6">
                    {p.icon}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-white/60 leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
