"use client";

import { Section, Reveal } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import * as motion from "motion/react-client";
import {
  Brain,
  Rocket,
  Heart,
  Cpu,
  Leaf,
  Building2,
  GraduationCap,
  Activity,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  { icon: <Brain className="h-5 w-5" />,         name: "AI & Data",         count: "284 ideas",  tone: "#5cd4ff" },
  { icon: <Rocket className="h-5 w-5" />,        name: "Startup & Fintech", count: "192 ideas",  tone: "#a78bfa" },
  { icon: <Heart className="h-5 w-5" />,         name: "Social Impact",     count: "216 ideas",  tone: "#f472b6" },
  { icon: <Cpu className="h-5 w-5" />,           name: "Deep Tech",         count: "138 ideas",  tone: "#22d3ee" },
  { icon: <Leaf className="h-5 w-5" />,          name: "Agriculture",       count: "97 ideas",   tone: "#34d399" },
  { icon: <Building2 className="h-5 w-5" />,     name: "Civic & Gov Tech",  count: "164 ideas",  tone: "#ff9257" },
  { icon: <GraduationCap className="h-5 w-5" />, name: "EdTech",            count: "121 ideas",  tone: "#c4b5fd" },
  { icon: <Activity className="h-5 w-5" />,      name: "Health & Biotech",  count: "88 ideas",   tone: "#fb7185" },
];

export function CategoriesSection() {
  return (
    <Section id="categories">
      <div className="grid lg:grid-cols-12 gap-8 items-end mb-12">
        <div className="lg:col-span-7">
          <Reveal>
            <Badge>Innovation categories</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-[32px] sm:text-4xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.04] text-white">
              Every corner of the
              <br />
              <span className="text-gradient-warm">Bharat innovation map.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="lg:col-span-5">
          <p className="text-white/60 leading-relaxed">
            Pick a domain. Drop into the live feed. Ideas are already forming
            into Pods — jump in where your skills fit.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((c, i) => (
          <motion.a
            key={c.name}
            href="/waitlist"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: (i % 4) * 0.05 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl glass p-5 transition-colors hover:border-white/20"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `radial-gradient(circle, ${c.tone}33, transparent 70%)` }}
            />
            <div className="relative flex items-center justify-between">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-transform group-hover:-rotate-6"
                style={{ color: c.tone }}
              >
                {c.icon}
              </span>
              <ArrowUpRight className="h-4 w-4 text-white/25 transition-colors group-hover:text-white/70" />
            </div>
            <div className="relative mt-5 text-[15px] font-medium text-white tracking-tight">
              {c.name}
            </div>
            <div className="relative mt-0.5 text-[11px] text-white/45 uppercase tracking-wider">
              {c.count}
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
