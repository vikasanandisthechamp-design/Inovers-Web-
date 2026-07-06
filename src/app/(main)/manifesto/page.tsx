import type { Metadata } from "next";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ShineButton } from "@/components/ui/shine-button";
import { GridBackground } from "@/components/ui/grid-background";
import { Orbs } from "@/components/ui/orbs";

export const metadata: Metadata = {
  title: "The Inovers Manifesto",
  description:
    "Why Inovers exists, what we believe, and how Bharat will innovate from the ground up.",
};

const beliefs = [
  { n: "01", t: "Execution is the real test of an idea.", b: "Anyone can talk. Inovers rewards those who ship." },
  { n: "02", t: "Transparency creates trust.",            b: "Every Pod, every build log, every milestone is public by default." },
  { n: "03", t: "Collaboration beats competition.",       b: "We win when Pods ship. Not when individuals hoard credit." },
  { n: "04", t: "Bharat-first, always.",                  b: "Hosted in India. Designed for Bharat. Compliant with DPDP." },
  { n: "05", t: "No permission required.",                b: "If you have a skill and an idea, you are already an Innovator." },
];

export default function ManifestoPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 pb-20 md:pt-44 md:pb-24">
        <div aria-hidden className="absolute inset-0 bg-noise" />
        <GridBackground />
        <Orbs variant="warm" />

        <div className="container-page relative max-w-4xl">
          <Badge icon={<Sparkles className="h-3 w-3" />}>Manifesto</Badge>
          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-[-0.04em] leading-[1.0] text-white">
            Ideas don&apos;t wait for
            <br />
            <span className="text-gradient-warm">permission anymore.</span>
          </h1>
        </div>
      </section>

      <section className="container-page max-w-3xl pb-12">
        <div className="space-y-7 text-[17px] md:text-[19px] leading-[1.7] text-white/75">
          <p>
            We believe India&apos;s greatest resource isn&apos;t its capital. It
            isn&apos;t even its technology. It&apos;s the{" "}
            <strong className="text-white">billion minds</strong> that wake up
            every morning carrying solutions to problems no boardroom will ever
            name.
          </p>
          <p>
            For too long, those ideas have lived in notebooks, in WhatsApp
            drafts, in conversations that faded at midnight. For too long,
            innovation belonged to the few who had access — to capital, to
            networks, to permission.
          </p>

          <blockquote className="my-10 relative pl-6 border-l-2 border-[var(--neon-violet)]">
            <p className="text-2xl md:text-3xl font-medium tracking-tight text-gradient leading-snug">
              Inovers is the end of that era.
            </p>
          </blockquote>

          <p>
            We are building a platform where an idea posted by a student in
            Hyderabad can be picked up by a designer in Indore, shaped by a
            developer in Pune, and executed as a government project for a
            school in Bhopal. In weeks, not years.
          </p>
          <p>
            We are not a company that delivers services. We are an{" "}
            <strong className="text-white">ecosystem</strong> where the
            community is the service. Every Pod is a mini-startup. Every build
            log is a public commitment. Every contribution is credited.
          </p>
        </div>

        <hr className="my-16 border-white/10" />

        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-8">
          What we believe
        </h2>
        <div className="space-y-4">
          {beliefs.map((b) => (
            <div
              key={b.n}
              className="glass rounded-2xl p-6 md:p-7 transition-colors hover:border-white/20"
            >
              <div className="flex items-start gap-5">
                <span className="font-mono text-xs text-white/40 mt-1 shrink-0">{b.n}</span>
                <div>
                  <h3 className="text-lg md:text-xl font-medium text-white tracking-tight">
                    {b.t}
                  </h3>
                  <p className="mt-1.5 text-white/60 leading-relaxed">{b.b}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 glass-strong rounded-3xl p-10 text-center">
          <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Ready to build Bharat with us?
          </h3>
          <p className="mt-3 text-white/65">
            The first 1,000 innovators get a permanent Founding Innovator badge.
          </p>
          <div className="mt-7 flex justify-center">
            <ShineButton href="/waitlist" size="lg" variant="primary">
              Join the Movement <ArrowRight className="h-4 w-4" />
            </ShineButton>
          </div>
        </div>
      </section>
    </>
  );
}
