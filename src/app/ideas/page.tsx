import type { Metadata } from "next";
import { ArrowRight, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ShineButton } from "@/components/ui/shine-button";
import { GridBackground } from "@/components/ui/grid-background";
import { Orbs } from "@/components/ui/orbs";

export const metadata: Metadata = {
  title: "Idea Wall — Inovers",
  description: "The live feed of ideas from the Inovers community. Coming soon.",
};

export default function IdeasPage() {
  return (
    <section className="relative isolate overflow-hidden min-h-[calc(100svh-80px)] flex items-center pt-32 pb-20">
      <div aria-hidden className="absolute inset-0 bg-noise" />
      <GridBackground />
      <Orbs />

      <div className="container-page relative max-w-2xl text-center">
        <Badge icon={<Lightbulb className="h-3 w-3" />}>Coming in Beta</Badge>
        <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-[-0.04em] leading-[1.0] text-white">
          The Idea Wall
          <br />
          <span className="text-gradient">is almost live.</span>
        </h1>
        <p className="mt-6 text-white/65 text-lg leading-relaxed max-w-md mx-auto">
          Founding Innovators get the first invite. Drop your details and
          we&apos;ll open the gates to you the day we ship.
        </p>
        <div className="mt-9 flex justify-center">
          <ShineButton href="/waitlist" size="lg" variant="primary">
            Join the Waitlist <ArrowRight className="h-4 w-4" />
          </ShineButton>
        </div>
      </div>
    </section>
  );
}
