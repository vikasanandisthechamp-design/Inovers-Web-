"use client";

import { Section, Reveal } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/ui/glow-card";
import {
  GraduationCap,
  Hammer,
  Landmark,
  Sparkle,
  CheckCircle2,
} from "lucide-react";

const pillars = [
  {
    icon: <GraduationCap className="h-5 w-5" />,
    tone: "cyan" as const,
    accent: "#5cd4ff",
    tag: "Mentors",
    title: "Domain experts who actually respond",
    body:
      "Operators, academics, clinicians, policy folks. They plug into Pods for 1–4 hours a week. You see their calendars and past mentees.",
    people: [
      { n: "Dr. Arjun · AIIMS",      t: "Public health" },
      { n: "Ananya · YC S21",         t: "Early stage" },
      { n: "Ravi · IIT Madras",       t: "Climate-tech" },
    ],
  },
  {
    icon: <Hammer className="h-5 w-5" />,
    tone: "violet" as const,
    accent: "#a78bfa",
    tag: "Builders",
    title: "Designers, devs, researchers, policy nerds",
    body:
      "Bharat's builders — students, second-time founders, senior engineers moonlighting. Verified skills. Transparent track record.",
    people: [
      { n: "Priya R. · Indore",       t: "Hardware + IoT" },
      { n: "Karthik V. · Chennai",    t: "ML + policy" },
      { n: "Aanya M. · Pune",         t: "Product + brand" },
    ],
  },
  {
    icon: <Landmark className="h-5 w-5" />,
    tone: "ember" as const,
    accent: "#ff9257",
    tag: "Investors & Partners",
    title: "Funding triggered by shipping, not decks",
    body:
      "Angels, VCs, government missions, corporate CSRs — all visible inside Pods. Milestone-based disbursal. Transparent terms.",
    people: [
      { n: "UP Innovation Mission",   t: "Civic-tech sprint" },
      { n: "Titan SEED · Tier-2",     t: "Angel group" },
      { n: "Atal Innovation Mission", t: "Grants" },
    ],
  },
];

export function CommunitySection() {
  return (
    <Section id="community">
      <div className="max-w-2xl mb-14">
        <Reveal>
          <Badge icon={<Sparkle className="h-3 w-3" />}>
            The Inovers network
          </Badge>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-[34px] sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.04] text-white">
            Three tribes.
            <br />
            <span className="text-gradient">One feed.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-5 text-white/60 leading-relaxed max-w-lg">
            Inovers was built on a simple bet: if builders, mentors and
            funders see each other in the same feed, velocity compounds.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal key={p.tag} delay={i * 0.1} y={28}>
            <GlowCard glow={p.tone} className="h-full">
              <div className="flex items-center justify-between">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
                  style={{ color: p.accent }}
                >
                  {p.icon}
                </span>
                <span
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium"
                  style={{ color: p.accent }}
                >
                  {p.tag}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-medium text-white tracking-tight leading-snug">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-white/55 leading-relaxed">
                {p.body}
              </p>
              <ul className="mt-6 space-y-2">
                {p.people.map((person) => (
                  <li
                    key={person.n}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
                  >
                    <span
                      className="h-7 w-7 shrink-0 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${p.accent}, rgba(255,255,255,0.2))`,
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] text-white truncate">{person.n}</div>
                      <div className="text-[10px] text-white/45">{person.t}</div>
                    </div>
                    <CheckCircle2 className="h-3.5 w-3.5 text-white/40" />
                  </li>
                ))}
              </ul>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
