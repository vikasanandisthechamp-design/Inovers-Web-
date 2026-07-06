import type { Metadata } from "next";
import { COHORT, getStatusUi } from "@/lib/accelerator/config";
import { PageView } from "@/components/accelerator/page-view";
import { WeekInside } from "@/components/accelerator/sections/program-week";
import { AccButton, Frame, HandNote, SectionRail } from "@/components/accelerator/ui";
import { Reveal } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "The 12-Week Program",
  description: `The complete ${COHORT.programDurationWeeks}-week structure of ${COHORT.cohortName}: five phases, weekly cadence, deliverables, mentor involvement, and Demo Day.`,
  alternates: { canonical: "/accelerator/program" },
};

const EXPECTATIONS = [
  "Full-time commitment for all 12 weeks",
  "Weekly measurable outcomes, reviewed every Monday",
  "Ship something real every Friday",
  "Talk to customers every single week",
  "Radical honesty in metrics — no vanity numbers",
  "Show up for the cohort: peer reviews and founder sessions",
];

const SUPPORT = [
  { k: "MENTORS", v: "Thursday mentor sessions and specialist clinics: product, growth, legal, finance, hiring." },
  { k: "OFFICE HOURS", v: "Product and technology office hours every build sprint; investor office hours in later phases." },
  { k: "PRODUCT", v: "Architecture reviews, AI-enabled development infrastructure, design critique, analytics setup." },
  { k: "CUSTOMERS", v: "Interview systems, discovery scripts, early-adopter sourcing, pricing experiments." },
  { k: "GTM", v: "Distribution strategy, sales systems, retention loops, unit economics." },
  { k: "FUNDRAISING", v: "Narrative, deck, financial model, data room, diligence prep, pitch practice." },
];

export default function ProgramPage() {
  return (
    <>
      <PageView event="program_page_viewed" page="/accelerator/program" />

      {/* Hero */}
      <section className="acc-ink acc-grain relative">
        <div className="container-page py-16 md:py-24">
          <p className="acc-label text-[var(--acc-signal)]">
            {COHORT.cohortName} · PROGRAM SPECIFICATION
          </p>
          <h1 className="acc-display mt-5 max-w-4xl text-[clamp(2.4rem,6vw,4.4rem)] uppercase">
            {COHORT.programDurationWeeks} weeks, specified
            <span className="text-[var(--acc-signal)]"> to the day.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-[var(--acc-bone)]/65">
            Five phases with explicit objectives, weekly milestones, and
            deliverables. The structure is fixed; what you build inside it is
            yours.
          </p>
        </div>
      </section>

      {/* Full phase breakdown */}
      <section className="acc-paper acc-grain relative" aria-label="Program phases in full">
        <div className="container-page py-16 md:py-24">
          <SectionRail no="SPEC" label="PHASE-BY-PHASE" fig="FIG. P — FULL SEQUENCE" />
          <div className="mt-12 space-y-8">
            {COHORT.phases.map((p, i) => (
              <Reveal key={p.code} delay={i * 0.04}>
                <Frame className="on-paper grid gap-6 bg-[var(--acc-bone)] p-6 md:grid-cols-12 md:p-10">
                  <div className="md:col-span-4">
                    <p className="acc-label text-[var(--acc-signal)]">{p.code}</p>
                    <h2 className="acc-display mt-2 text-2xl md:text-3xl uppercase">{p.title}</h2>
                    <p className="acc-label mt-3 opacity-50">{p.weeks.toUpperCase()}</p>
                    <HandNote className="mt-4 block text-[var(--acc-graphite)]" rotate={-2}>
                      {p.mandate}
                    </HandNote>
                  </div>
                  <div className="md:col-span-8">
                    <p className="acc-label opacity-50 mb-4">OBJECTIVES &amp; DELIVERABLES</p>
                    <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {p.items.map((item, j) => (
                        <li key={item} className="flex items-baseline gap-3 text-[15px]">
                          <span className="acc-mono text-[11px] text-[var(--acc-graphite)]/60">
                            {String(j + 1).padStart(2, "0")}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Frame>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly cadence (shared section) */}
      <WeekInside />

      {/* Expectations + support */}
      <section className="acc-ink relative" aria-label="Founder expectations and support">
        <div className="container-page py-16 md:py-24">
          <SectionRail no="TERMS" label="EXPECTATIONS ↔ SUPPORT" fig="TWO-WAY CONTRACT" />
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="acc-display text-2xl md:text-3xl uppercase">
                What we expect <span className="text-[var(--acc-signal)]">from founders</span>
              </h2>
              <ul className="mt-6 space-y-3">
                {EXPECTATIONS.map((e, i) => (
                  <li key={e} className="flex items-baseline gap-3 text-[15px] text-[var(--acc-bone)]/75">
                    <span className="acc-mono text-[11px] text-[var(--acc-signal)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="acc-display text-2xl md:text-3xl uppercase">
                What founders get <span className="text-[var(--acc-signal)]">from Inovers</span>
              </h2>
              <dl className="mt-6 space-y-4">
                {SUPPORT.map((s) => (
                  <div key={s.k} className="border-b border-[var(--acc-line-ink)] pb-4">
                    <dt className="acc-label text-[var(--acc-signal)]">{s.k}</dt>
                    <dd className="mt-1.5 text-[14.5px] text-[var(--acc-bone)]/70">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Demo Day + after */}
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <Frame className="p-6 md:p-8">
              <p className="acc-label text-[var(--acc-signal)]">WEEK 12 — DEMO DAY</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--acc-bone)]/70">
                Selected companies present progress to invited investors,
                operators, and partners. Funding afterwards is never promised —
                a strong case, honestly made, is.
              </p>
            </Frame>
            <Frame className="p-6 md:p-8">
              <p className="acc-label text-[var(--acc-signal)]">WEEK 13 → FOREVER</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--acc-bone)]/70">
                The lifetime Inovers network: your cohort, alumni, mentors, and
                the wider community. A downloadable program calendar will be
                published with confirmed dates before the cohort begins.
              </p>
            </Frame>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <AccButton href={getStatusUi().cta.href} variant="signal" arrow>
              {getStatusUi().cta.label}
            </AccButton>
            <AccButton href="/accelerator/deal" variant="ink">
              The Standard Deal
            </AccButton>
          </div>
        </div>
      </section>
    </>
  );
}
