"use client";

import { Section, Reveal } from "@/components/ui/section";
import { ShineButton } from "@/components/ui/shine-button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <Section id="cta" className="py-24 md:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 px-6 py-20 md:px-12 md:py-28 text-center">
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
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.35),transparent_60%)] blur-3xl"
          />

          <h2 className="text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-[0.98] text-white max-w-4xl mx-auto">
            An idea is a spark.
            <br />
            <span className="text-gradient-warm">A community turns it into fire.</span>
          </h2>
          <p className="mt-7 text-lg text-white/65 max-w-xl mx-auto">
            Be one of the first 1,000 Founding Innovators. Permanent badge.
            Lifetime recognition. Governance rights.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <ShineButton href="/waitlist" size="lg" variant="primary">
              Become an Innovator <ArrowRight className="h-4 w-4" />
            </ShineButton>
            <ShineButton href="/manifesto" size="lg" variant="ghost">
              Read the Manifesto
            </ShineButton>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
