"use client";

import { Section, Reveal } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { ShineButton } from "@/components/ui/shine-button";
import { Building2, ShieldCheck, FileCheck, ArrowRight } from "lucide-react";

const benefits = [
  "Atal Innovation Mission aligned",
  "Public Build Logs for every Pod",
  "Section 8 ready entity",
  "DPDP Act compliant by design",
  "Milestone-based payouts to Pods",
  "Verified Innovator profiles",
];

export function InstitutionsSection() {
  return (
    <Section id="institutions" className="py-28 md:py-36">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0d0d1c] via-[#10102a] to-[#1a1340] p-8 md:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#a78bfa]/30 to-transparent blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-[#5cd4ff]/25 to-transparent blur-3xl"
          />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge icon={<Building2 className="h-3 w-3" />}>
                For Government, Universities & Foundations
              </Badge>
              <h2 className="mt-6 text-4xl md:text-5xl lg:text-[56px] font-semibold tracking-[-0.03em] leading-[1.05] text-white">
                Mobilize 10,000 builders
                <br />
                for one initiative.
              </h2>
              <p className="mt-5 text-white/65 leading-relaxed max-w-lg">
                Post a public challenge — climate, civic-tech, MSME tooling,
                Anganwadi, Skill India. Pods apply. Execution happens
                transparently, milestone by milestone, India-first.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ShineButton href="/waitlist" size="lg" variant="primary">
                  Partner with Inovers <ArrowRight className="h-4 w-4" />
                </ShineButton>
                <ShineButton href="/manifesto" size="lg" variant="outline">
                  Read the Manifesto
                </ShineButton>
              </div>
              <div className="mt-7 flex items-center gap-5 text-xs text-white/55">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[var(--neon-cyan)]"/> DPDP Ready</span>
                <span className="inline-flex items-center gap-1.5"><FileCheck className="h-3.5 w-3.5 text-[var(--neon-cyan)]"/> India Hosted</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {benefits.map((b) => (
                <div
                  key={b}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur px-4 py-4 text-sm text-white/85 hover:border-white/20 hover:bg-white/[0.05] transition-colors"
                >
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
