"use client";

import { Section, Reveal } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import * as motion from "motion/react-client";
import {
  Lightbulb,
  Users2,
  GitBranch,
  GraduationCap,
  Hammer,
  Rocket,
} from "lucide-react";

const steps = [
  {
    icon: <Lightbulb className="h-5 w-5" />,
    n: "01",
    title: "Post an idea",
    body: "Type it like a tweet. Tag the skills needed. The community reacts, refines, and signals interest.",
    color: "#5cd4ff",
  },
  {
    icon: <Users2 className="h-5 w-5" />,
    n: "02",
    title: "Find your people",
    body: "Skill-match suggests teammates. City, interests, track record — all visible. No cold DMs needed.",
    color: "#a78bfa",
  },
  {
    icon: <GitBranch className="h-5 w-5" />,
    n: "03",
    title: "Collaborate",
    body: "A Pod forms. Threaded discussions, shared docs, a public Kanban. Build the plan together.",
    color: "#f472b6",
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    n: "04",
    title: "Get guidance",
    body: "Senior innovators, domain mentors and AI co-builders plug in exactly when you're stuck.",
    color: "#ff9257",
  },
  {
    icon: <Hammer className="h-5 w-5" />,
    n: "05",
    title: "Build the project",
    body: "Weekly build logs. Milestones visible. Toolkit hooks into GitHub, Figma, Notion, calendars.",
    color: "#22d3ee",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    n: "06",
    title: "Get funded. Launch.",
    body: "Grants, sponsor challenges, angel introductions — triggered by shipped milestones, not decks.",
    color: "#34d399",
  },
];

export function HowItWorksSection() {
  return (
    <Section id="how">
      <div className="max-w-2xl">
        <Reveal>
          <Badge>Inside the flow</Badge>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.04] text-white">
            From spark to shipped,
            <br />
            <span className="text-gradient">in six moves.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-5 text-white/60 leading-relaxed max-w-lg">
            Every stage is public. Every contribution is credited. No
            permission required — just skills, intent, and a Pod.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 relative">
        {/* Vertical spine */}
        <div
          aria-hidden
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(167,139,250,0.35) 10%, rgba(92,212,255,0.35) 90%, transparent)",
          }}
        />

        <ul className="flex flex-col gap-10 md:gap-16">
          {steps.map((s, i) => (
            <Step key={s.n} step={s} index={i} />
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Step({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const side = index % 2 === 0 ? "left" : "right";

  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-16 md:pl-0"
    >
      {/* Node (mobile: left; desktop: centered on spine) */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-6 top-1 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2 h-16 w-16 rounded-2xl"
        style={{
          background: `radial-gradient(circle, ${step.color}44, transparent 70%)`,
          filter: "blur(14px)",
        }}
      />
      <span
        className="absolute left-6 top-1 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#0a0a14] z-10"
        style={{
          color: step.color,
          boxShadow: `0 0 0 1px ${step.color}22 inset, 0 0 30px ${step.color}33`,
        }}
      >
        {step.icon}
      </span>

      {/* Content */}
      <div
        className={`md:grid md:grid-cols-2 md:gap-16 items-center ${
          side === "right" ? "md:[&>div]:first:order-2" : ""
        }`}
      >
        <div className={side === "left" ? "md:text-right md:pr-14" : "md:pl-14"}>
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white/55 ${
              side === "left" ? "md:ml-auto" : ""
            }`}
          >
            Step {step.n}
          </div>
          <h3 className="mt-3 text-2xl md:text-3xl font-medium tracking-tight text-white">
            {step.title}
          </h3>
          <p
            className={`mt-3 text-white/60 leading-relaxed max-w-md ${
              side === "left" ? "md:ml-auto" : ""
            }`}
          >
            {step.body}
          </p>
        </div>
        <div className="hidden md:block" />
      </div>
    </motion.li>
  );
}
