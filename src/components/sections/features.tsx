"use client";

import { Section, Reveal } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import * as motion from "motion/react-client";
import {
  Zap,
  Users,
  GraduationCap,
  IndianRupee,
  Wrench,
  Heart,
  MessageCircle,
  ArrowUpRight,
  Check,
  Hash,
} from "lucide-react";

/**
 * Five "surfaces" of Inovers, each with its own miniature product demo.
 */
export function FeaturesSection() {
  return (
    <Section id="features">
      <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
        <div className="lg:col-span-7">
          <Reveal>
            <Badge icon={<Zap className="h-3 w-3" />}>Platform surfaces</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-[34px] sm:text-5xl md:text-6xl font-semibold tracking-[-0.035em] leading-[1.04] text-white">
              Five surfaces.
              <br />
              <span className="text-gradient">One operating system</span>{" "}
              for builders.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="lg:col-span-5">
          <p className="text-white/60 leading-relaxed text-[17px]">
            Inovers stitches together the workflows scattered across Notion,
            Discord, GitHub, Devfolio and LinkedIn — into one coherent loop
            optimised for shipping.
          </p>
        </Reveal>
      </div>

      <div className="grid gap-4 md:gap-5 lg:grid-cols-6">
        {/* 1. Idea Feed — wide */}
        <FeatureCard className="lg:col-span-4" tone="#5cd4ff">
          <FeatureHead
            icon={<Hash className="h-4 w-4" />}
            title="Idea Feed"
            subtitle="A social-first feed built for problems, not posturing"
          />
          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            {[
              {
                head: "Solar irrigation for SHGs",
                meta: "Priya · Indore · 142 likes",
              },
              {
                head: "Open AQI sensor mesh",
                meta: "Pod Vayu · 318 likes",
              },
            ].map((p) => (
              <div
                key={p.head}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <div className="flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-gradient-to-br from-[#5cd4ff] to-[#a78bfa]" />
                  <span className="text-[11px] text-white/50">{p.meta}</span>
                </div>
                <div className="mt-2 text-[13px] text-white/85">{p.head}</div>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-white/40">
                  <span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" />142</span>
                  <span className="inline-flex items-center gap-1"><MessageCircle className="h-3 w-3" />38</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-[var(--neon-cyan)]"><ArrowUpRight className="h-3 w-3" /> I&apos;m in</span>
                </div>
              </div>
            ))}
          </div>
        </FeatureCard>

        {/* 2. Pods / Collaboration */}
        <FeatureCard className="lg:col-span-2" tone="#a78bfa">
          <FeatureHead
            icon={<Users className="h-4 w-4" />}
            title="Pods"
            subtitle="Small. Fast. Public."
          />
          <div className="mt-5">
            <div className="flex -space-x-2">
              {["PR", "AV", "SK", "NM", "+3"].map((t, i) => (
                <span
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0a0a14] text-[11px] font-semibold text-white"
                  style={{
                    background:
                      i === 4
                        ? "rgba(255,255,255,0.06)"
                        : `hsl(${200 + i * 40} 80% 65%)`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="text-[11px] uppercase tracking-wider text-white/40">Pod Surya</div>
              <div className="mt-1 text-[13px] text-white/85">Civic pothole reporting · Stage 03</div>
              <div className="mt-2 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "62%",
                    background: "linear-gradient(90deg, #a78bfa, #5cd4ff)",
                  }}
                />
              </div>
            </div>
          </div>
        </FeatureCard>

        {/* 3. Mentorship */}
        <FeatureCard className="lg:col-span-2" tone="#ff9257">
          <FeatureHead
            icon={<GraduationCap className="h-4 w-4" />}
            title="Mentors on demand"
            subtitle="Domain experts, exactly when stuck"
          />
          <ul className="mt-5 space-y-2.5">
            {[
              { name: "Dr. Arjun · AIIMS", tag: "Public health" },
              { name: "Ananya · YC S21", tag: "Early stage" },
              { name: "Ravi · IIT Madras", tag: "Climate-tech" },
            ].map((m) => (
              <li
                key={m.name}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
              >
                <span className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-[#ff9257] to-[#f472b6]" />
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] text-white truncate">{m.name}</div>
                  <div className="text-[10px] text-white/45">{m.tag}</div>
                </div>
                <Check className="h-3.5 w-3.5 text-[var(--neon-cyan)]" />
              </li>
            ))}
          </ul>
        </FeatureCard>

        {/* 4. Funding layer */}
        <FeatureCard className="lg:col-span-3" tone="#34d399">
          <FeatureHead
            icon={<IndianRupee className="h-4 w-4" />}
            title="Funding layer"
            subtitle="Grants, sponsor prizes, angel intros — milestone-triggered"
          />
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { k: "₹50k", v: "Milestone unlocked", hue: "#34d399" },
              { k: "₹2L", v: "Sponsor prize shortlisted", hue: "#5cd4ff" },
              { k: "—", v: "Angel intro pending", hue: "#a78bfa" },
            ].map((c, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <div
                  className="text-xl font-semibold tracking-tight"
                  style={{ color: c.hue }}
                >
                  {c.k}
                </div>
                <div className="mt-1 text-[11px] text-white/50 leading-snug">{c.v}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-white/40">UP Innovation Mission</div>
              <div className="text-[13px] text-white/85">Civic-tech sprint · 12 Pods applied</div>
            </div>
            <span className="rounded-full bg-[#34d399]/10 text-[#34d399] px-2.5 py-1 text-[10px] font-medium border border-[#34d399]/20">
              Stage 03 → 04
            </span>
          </div>
        </FeatureCard>

        {/* 5. Project Builder */}
        <FeatureCard className="lg:col-span-3" tone="#f472b6">
          <FeatureHead
            icon={<Wrench className="h-4 w-4" />}
            title="Project Builder"
            subtitle="From idea to shipped product — build logs, Kanban, AI co-builder"
          />
          <div className="mt-5 grid grid-cols-3 gap-2">
            {["Todo", "Doing", "Shipped"].map((col, ci) => (
              <div key={col}>
                <div className="text-[10px] uppercase tracking-wider text-white/45 mb-2">{col}</div>
                <div className="space-y-2">
                  {(ci === 0
                    ? ["WhatsApp bot", "Hardware BOM"]
                    : ci === 1
                    ? ["Dashboard v2", "SHG pilot"]
                    : ["MVP v1", "3-ward rollout"]
                  ).map((t) => (
                    <div
                      key={t}
                      className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2 text-[11px] text-white/80"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-white/[0.08] bg-gradient-to-r from-[#f472b6]/10 to-[#a78bfa]/10 px-3 py-2.5 text-[11px] text-white/75">
            ✦ AI co-builder suggested: “Use Twilio WhatsApp Business API for OTP-less login.”
          </div>
        </FeatureCard>
      </div>
    </Section>
  );
}

function FeatureHead({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/50">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/[0.04]">
          {icon}
        </span>
        Feature
      </div>
      <h3 className="mt-3 text-2xl font-medium tracking-tight text-white">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-white/55 leading-relaxed">{subtitle}</p>
    </div>
  );
}

function FeatureCard({
  children,
  className = "",
  tone,
}: {
  children: React.ReactNode;
  className?: string;
  tone: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-2xl glass p-5 md:p-7 transition-colors hover:border-white/20 ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, ${tone}26, transparent 70%)` }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
