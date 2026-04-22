"use client";

import { Section, Reveal } from "@/components/ui/section";
import { ShineButton } from "@/components/ui/shine-button";
import { ArrowRight } from "lucide-react";
import { ParticleNetwork } from "@/components/ui/particle-network";

export function CtaSection() {
  return (
    <Section id="cta" className="py-24 md:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 px-6 py-24 md:px-12 md:py-32 text-center">
          {/* Animated gradient backdrop */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 animate-gradient"
            style={{
              background:
                "linear-gradient(120deg, #0a0a14 0%, #1b1140 35%, #0d2a3a 65%, #0a0a14 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.35),transparent_60%)] blur-3xl"
          />
          <div className="absolute inset-0 opacity-60">
            <ParticleNetwork color="#5cd4ff" density={0.08} linkDistance={110} />
          </div>

          <div className="relative">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/50 mb-5">
              Final boarding call
            </p>
            <h2 className="text-[42px] sm:text-6xl md:text-7xl lg:text-[88px] font-semibold tracking-[-0.04em] leading-[0.95] text-white max-w-4xl mx-auto">
              Don&apos;t just scroll.
              <br />
              <span className="text-gradient-warm">Build.</span>
            </h2>
            <p className="mt-7 text-lg text-white/65 max-w-xl mx-auto leading-relaxed">
              Be one of the first 1,000 Founding Innovators. Permanent badge.
              Governance rights. Priority placement on every Pod and
              government sprint we open.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <ShineButton href="/waitlist" size="lg" variant="primary">
                Enter Inovers <ArrowRight className="h-4 w-4" />
              </ShineButton>
              <ShineButton href="/manifesto" size="lg" variant="ghost">
                Read the Manifesto
              </ShineButton>
            </div>
            <p className="mt-10 text-xs text-white/40 tracking-wide">
              अपनी सोच, अपना देश. · Built in Bharat, for the world.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
