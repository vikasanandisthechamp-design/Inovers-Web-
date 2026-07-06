"use client";

/**
 * §03 — THE PROBLEM (ink)   §04 — THE OFFER (ink, framed inventory)
 */

import { Frame, SectionRail, HandNote } from "@/components/accelerator/ui";
import { Reveal } from "@/components/ui/section";
import { COHORT } from "@/lib/accelerator/config";
import { Check, FlaskConical, Minus } from "lucide-react";

const MISSING = [
  "Capital at the idea stage",
  "Access to exceptional peers",
  "Product and technology support",
  "Experienced founder guidance",
  "Customer discovery systems",
  "Distribution networks",
  "Fundraising preparation",
  "Investor access",
  "An environment with urgency and accountability",
];

export function ProblemSection() {
  return (
    <section className="acc-ink acc-grain relative" aria-labelledby="problem-h">
      <div className="container-page py-20 md:py-28">
        <SectionRail no="§ 03" label="THE PROBLEM" fig="OBSERVATION LOG" />

        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="problem-h" className="acc-display text-[clamp(2rem,5vw,3.4rem)] uppercase">
              Great founders are everywhere.
              <br />
              <span className="text-[var(--acc-signal)]">Opportunity is not.</span>
            </h2>
            <div className="mt-8 space-y-5 max-w-xl text-[15.5px] leading-relaxed text-[var(--acc-bone)]/70">
              <p>
                India has ambitious builders far beyond its established startup
                hubs — engineers, operators, students, researchers, and domain
                experts already working on real problems.
              </p>
              <p>
                What&apos;s unevenly distributed is not talent. It&apos;s
                concentration: of capital, of peers, of expertise, of networks,
                of urgency. The same founder moves at a different speed inside
                the right environment.
              </p>
              <p className="text-[var(--acc-bone)]">
                Inovers exists to compress years of wandering into{" "}
                {COHORT.programDurationWeeks} weeks of focused execution.
              </p>
            </div>
          </div>

          <Reveal>
            <Frame className="p-6 md:p-8">
              <p className="acc-label opacity-50">
                WHAT EARLY-STAGE FOUNDERS TYPICALLY LACK
              </p>
              <ul className="mt-5 space-y-3">
                {MISSING.map((m) => (
                  <li key={m} className="flex items-start gap-3 text-[15px] text-[var(--acc-bone)]/75">
                    <Minus aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--acc-signal)]" />
                    {m}
                  </li>
                ))}
              </ul>
              <HandNote className="mt-6 block" rotate={-1.5}>
                not talent. never talent.
              </HandNote>
            </Frame>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const INCLUDED = [
  `${COHORT.investmentAmountLabel} investment`,
  `${COHORT.numberOfCompanies} selected startups`,
  `${COHORT.programDurationWeeks}-week accelerator`,
  "Intensive founder environment",
  "Product & technology support",
  "AI building infrastructure",
  "Weekly founder reviews",
  "Customer discovery",
  "Go-to-market support",
  "Legal & financial readiness",
  "Fundraising preparation",
  "Demo Day",
  "Lifetime Inovers network",
];

export function OfferSection() {
  return (
    <section
      className="acc-ink relative border-t border-[var(--acc-line-ink)]"
      aria-labelledby="offer-h"
    >
      <div className="container-page py-20 md:py-28">
        <SectionRail no="§ 04" label="THE OFFER" fig="BILL OF MATERIALS" />

        <h2 id="offer-h" className="acc-display mt-10 max-w-4xl text-[clamp(2rem,5vw,3.4rem)] uppercase">
          {COHORT.programDurationWeeks} weeks to move faster than you
          <span className="text-[var(--acc-signal)]"> thought possible.</span>
        </h2>

        {/* headline numbers */}
        <div className="mt-12 grid gap-px border border-[var(--acc-line-ink)] bg-[var(--acc-line-ink)] sm:grid-cols-3">
          {[
            { v: "₹5L", k: "UP TO — INVESTMENT PER STARTUP" },
            { v: "10", k: "COMPANIES PER COHORT" },
            { v: "12", k: "WEEKS. RELENTLESS." },
          ].map((s) => (
            <div key={s.k} className="bg-[var(--acc-ink)] p-8 md:p-10">
              <p className="acc-mono text-5xl md:text-6xl font-semibold text-[var(--acc-signal)]">
                {s.v}
              </p>
              <p className="acc-label mt-3 opacity-50">{s.k}</p>
            </div>
          ))}
        </div>

        {/* inventory: included vs potential vs not guaranteed */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <Reveal className="lg:col-span-1">
            <p className="acc-label text-[var(--acc-signal)]">INCLUDED — CONFIRMED</p>
            <ul className="mt-4 space-y-2.5">
              {INCLUDED.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14.5px] text-[var(--acc-bone)]/80">
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[var(--acc-signal)]" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="acc-label opacity-70">POTENTIAL OPPORTUNITIES</p>
            <ul className="mt-4 space-y-2.5">
              {COHORT.potentialOpportunities.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14.5px] text-[var(--acc-bone)]/65">
                  <FlaskConical aria-hidden className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="acc-label opacity-70">NOT GUARANTEED — HONESTLY</p>
            <ul className="mt-4 space-y-2.5">
              {COHORT.nonGuarantees.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14.5px] text-[var(--acc-bone)]/55">
                  <Minus aria-hidden className="mt-0.5 h-4 w-4 shrink-0 opacity-50" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] leading-relaxed text-[var(--acc-bone)]/45">
              {COHORT.legal.investmentNote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
