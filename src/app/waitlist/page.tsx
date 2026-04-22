import type { Metadata } from "next";
import { Sparkles, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GridBackground } from "@/components/ui/grid-background";
import { Orbs } from "@/components/ui/orbs";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Join the Waitlist — Inovers",
  description:
    "Be one of the first 1,000 Founding Innovators. Lifetime badge. Governance rights. Priority access.",
};

const perks = [
  "Early access to the Idea Wall and Pods",
  "First access to government & institutional projects",
  "Founding Innovator badge — permanent, verifiable",
  "Invite to private builder community",
  "Governance rights on platform direction",
];

export default function WaitlistPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 pb-12 md:pt-44 md:pb-16">
        <div aria-hidden className="absolute inset-0 bg-noise" />
        <GridBackground />
        <Orbs variant="cool" />

        <div className="container-page relative max-w-5xl">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6">
              <Badge icon={<Sparkles className="h-3 w-3" />}>
                Founding Innovators · Limited to 1,000
              </Badge>
              <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.0] text-white">
                Be one of
                <br />
                <span className="text-gradient">the first 1,000.</span>
              </h1>
              <p className="mt-5 text-white/65 text-lg leading-relaxed max-w-md">
                Permanent Founding Innovator badge. Governance rights. Priority
                placement on Pods and government projects.
              </p>
              <ul className="mt-8 space-y-3">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-white/75">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--neon-cyan)]/40 bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)]">
                      <Check className="h-3 w-3" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <div className="relative">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-2 rounded-[28px] bg-gradient-to-br from-[var(--neon-cyan)]/20 via-[var(--neon-violet)]/15 to-transparent blur-2xl"
                />
                <div className="relative glass-strong rounded-3xl p-7 md:p-9">
                  <WaitlistForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
