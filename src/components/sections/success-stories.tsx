"use client";

import { Section, Reveal } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/ui/glow-card";
import { Quote, Sparkle } from "lucide-react";

const stories = [
  {
    tag: "Civic Tech",
    title: "Pothole Reporting → Municipal Action",
    body:
      "A Pod of 6 in Bhopal turned a WhatsApp idea into a working civic reporting tool — adopted in pilot by the local ward office. End-to-end in 9 weeks.",
    pod: "Pod Saarthi",
    members: 6,
    weeks: 9,
  },
  {
    tag: "Climate",
    title: "Open Air-Quality Sensor Mesh",
    body:
      "Hardware students from 4 colleges shipped a low-cost AQI sensor + dashboard. Two state pollution boards now contributing data.",
    pod: "Pod Vayu",
    members: 11,
    weeks: 14,
  },
  {
    tag: "Education",
    title: "AI Co-tutor for Government Schools",
    body:
      "A teacher's idea, prototyped by 4 builders, deployed across 12 schools as a Saturday-only AI tutor. 1,200+ active learners.",
    pod: "Pod Vidya",
    members: 4,
    weeks: 11,
  },
];

export function SuccessStoriesSection() {
  return (
    <Section id="stories">
      <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
        <div className="lg:col-span-7">
          <Reveal>
            <Badge icon={<Sparkle className="h-3 w-3" />}>Vision Stories</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
              The kind of work
              <br />
              <span className="text-gradient-warm">we&apos;re here to ship.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="lg:col-span-5">
          <p className="text-white/55 leading-relaxed text-sm md:text-base">
            We&apos;re pre-launch, so these are the kinds of outcomes Inovers
            Pods are designed to produce. Within 12 months we&apos;ll be
            replacing this section with real shipped projects from real Pods.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {stories.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1} y={28}>
            <GlowCard glow={i === 0 ? "cyan" : i === 1 ? "violet" : "ember"} className="h-full">
              <Quote className="h-6 w-6 text-white/20" />
              <span className="mt-5 inline-block rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] uppercase tracking-wider text-white/55">
                {s.tag}
              </span>
              <h3 className="mt-4 text-xl font-medium text-white tracking-tight leading-snug">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-white/55 leading-relaxed">{s.body}</p>
              <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs text-white/45">
                <span className="font-medium text-white/75">{s.pod}</span>
                <span>{s.members} builders · {s.weeks} weeks</span>
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
