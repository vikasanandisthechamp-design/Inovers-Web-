"use client";

import { Section, Reveal } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/ui/glow-card";
import {
  Lightbulb,
  Users,
  Trophy,
  GraduationCap,
  Wrench,
  ArrowUpRight,
} from "lucide-react";

const modules = [
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Idea Wall",
    body:
      "Drop ideas as easily as a tweet. Tag skills needed. Watch the community refine, vote, and signal commitment.",
    glow: "cyan" as const,
    accent: "#5cd4ff",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Pods",
    body:
      "3–9 people. One mission. Public roles, public progress. Roles auto-suggested based on Innovator Score.",
    glow: "violet" as const,
    accent: "#a78bfa",
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    title: "Challenges & Hackathons",
    body:
      "Sponsored sprints — by governments, startups, foundations. Pods compete by shipping, not pitching.",
    glow: "ember" as const,
    accent: "#ff9257",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Learning Tracks",
    body:
      "Apprenticeships in public. Senior innovators mentor. Earn skill verifications attached to your profile.",
    glow: "cyan" as const,
    accent: "#22d3ee",
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: "Project Toolkit",
    body:
      "Build logs, public Kanban, milestone payouts, RAG-ready docs, AI co-builder for early-stage Pods.",
    glow: "violet" as const,
    accent: "#f472b6",
  },
];

export function EcosystemSection() {
  return (
    <Section id="ecosystem">
      <div className="grid lg:grid-cols-12 gap-10 items-end mb-16">
        <div className="lg:col-span-7">
          <Reveal>
            <Badge>The Ecosystem</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
              Five surfaces.
              <br />
              <span className="text-gradient">One operating system</span> for
              builders.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="lg:col-span-5">
          <p className="text-white/60 leading-relaxed text-[17px]">
            Inovers stitches together the workflows scattered across Notion,
            Discord, GitHub, Devfolio and LinkedIn — into one coherent loop
            optimized for shipping.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((m, i) => (
          <Reveal key={m.title} delay={i * 0.08} y={28}>
            <GlowCard glow={m.glow} className="h-full">
              <div className="flex items-start justify-between">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
                  style={{ color: m.accent }}
                >
                  {m.icon}
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/30 transition-transform group-hover:rotate-12 group-hover:text-white/70" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-white tracking-tight">
                {m.title}
              </h3>
              <p className="mt-2 text-sm text-white/55 leading-relaxed">
                {m.body}
              </p>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
