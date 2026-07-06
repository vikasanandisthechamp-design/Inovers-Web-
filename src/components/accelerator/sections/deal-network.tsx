"use client";

/**
 * §10 — THE STANDARD DEAL (paper)
 * §11 — FOUNDER ENVIRONMENT (paper)
 * §12 — THE INOVERS NETWORK (paper, expanding ecosystem viz)
 * §13 — MENTORS (paper)   §14 — INVESTORS (paper)   §15 — PARTNERS (paper)
 */

import * as motion from "motion/react-client";
import { AccButton, Frame, SectionRail, HandNote } from "@/components/accelerator/ui";
import { Reveal } from "@/components/ui/section";
import { COHORT } from "@/lib/accelerator/config";
import { track } from "@/lib/accelerator/analytics";
import { Check } from "lucide-react";

export function StandardDeal() {
  return (
    <section className="acc-paper acc-grain relative" aria-labelledby="deal-h">
      <div className="container-page py-20 md:py-28">
        <SectionRail no="§ 10" label="THE STANDARD DEAL" fig="TERMS SHEET — DRAFT 01" />

        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="deal-h" className="acc-display text-[clamp(2rem,5vw,3.2rem)] uppercase">
              Simple terms.
              <br />
              Aligned incentives.
              <br />
              <span className="text-[var(--acc-signal)]">Long-term partnership.</span>
            </h2>
            <p className="mt-8 max-w-md text-[15.5px] leading-relaxed text-[var(--acc-graphite)]">
              {COHORT.legal.investmentNote}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <AccButton href="/accelerator/deal" variant="solid-ink" arrow>
                Explore the Standard Deal
              </AccButton>
            </div>
          </div>

          <Reveal>
            <Frame className="on-paper bg-[var(--acc-bone)] p-6 md:p-8">
              <p className="acc-label opacity-50">CONFIRMED — {COHORT.cohortCode}</p>
              <ul className="mt-5 space-y-4">
                {[
                  `${COHORT.investmentAmountLabel} investment for selected startups`,
                  `${COHORT.programDurationWeeks}-week accelerator participation`,
                  "Access to the Inovers founder environment and program resources",
                  "No application fee — ever",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px]">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[var(--acc-signal)]" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="acc-label mt-8 border-t border-[var(--acc-line-paper)] pt-4 !normal-case !tracking-normal text-[12px] leading-relaxed opacity-60">
                Full legal terms are disclosed before any founder accepts an
                offer. Nothing on this page is a binding commitment to invest.
              </p>
            </Frame>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const ENVIRONMENT = [
  "Founders building alongside one another, all twelve weeks",
  "Late-night product debates",
  "Peer accountability that outperforms any deadline",
  "Founder dinners and visiting operators",
  "Investor office hours",
  "Spontaneous collaboration between companies",
];

export function FounderEnvironment() {
  return (
    <section
      className="acc-paper relative border-t border-[var(--acc-line-paper)]"
      aria-labelledby="env-h"
    >
      <div className="container-page py-20 md:py-28">
        <SectionRail
          no="§ 11"
          label={COHORT.residencyConfirmed ? "RESIDENTIAL EXPERIENCE" : "FOUNDER ENVIRONMENT"}
          fig="CONCENTRATION CHAMBER"
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-2 items-start">
          <div>
            <h2 id="env-h" className="acc-display text-[clamp(2rem,5vw,3.2rem)] uppercase">
              {COHORT.residencyConfirmed ? (
                <>
                  Build together.
                  <br />
                  <span className="text-[var(--acc-signal)]">Live among builders.</span>
                </>
              ) : (
                <>
                  An environment built for
                  <span className="text-[var(--acc-signal)]"> one thing.</span>
                </>
              )}
            </h2>
            <p className="mt-8 max-w-md text-[15.5px] leading-relaxed text-[var(--acc-graphite)]">
              A concentrated environment built around company creation. The
              fastest founders we know were made faster by the people around
              them.
            </p>
            {!COHORT.residencyConfirmed && (
              <p className="mt-5 max-w-md text-[13.5px] leading-relaxed text-[var(--acc-graphite)]/75">
                Detailed participation, workspace, and accommodation
                arrangements will be communicated to selected startups.
              </p>
            )}
          </div>

          <ul className="grid gap-3">
            {ENVIRONMENT.map((e, i) => (
              <Reveal key={e} delay={i * 0.05}>
                <li className="flex items-baseline gap-4 border-b border-[var(--acc-line-paper)] pb-3 text-[15.5px]">
                  <span className="acc-mono text-[11px] text-[var(--acc-signal)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {e}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const NETWORK_NODES = [
  "FOUNDERS",
  "OPERATORS",
  "ENGINEERS",
  "DESIGNERS",
  "RESEARCHERS",
  "MENTORS",
  "CUSTOMERS",
  "CORPORATIONS",
  "ANGELS",
  "VENTURE FUNDS",
  "INSTITUTIONS",
  "GOVT ECOSYSTEM",
];

export function NetworkSection() {
  return (
    <section
      className="acc-paper relative border-t border-[var(--acc-line-paper)] overflow-hidden"
      aria-labelledby="network-h"
    >
      <div className="container-page py-20 md:py-28">
        <SectionRail no="§ 12" label="THE INOVERS NETWORK" fig="FIG. 12 — EXPANSION DIAGRAM" />

        <h2 id="network-h" className="acc-display mt-10 max-w-3xl text-[clamp(2rem,5vw,3.2rem)] uppercase">
          You join a cohort.
          <span className="text-[var(--acc-signal)]"> You inherit a network.</span>
        </h2>

        {/* expanding radial ecosystem */}
        <div className="relative mx-auto mt-14 max-w-3xl">
          <svg viewBox="0 0 720 520" className="w-full" role="img" aria-label="The Inovers network: founders at the center, surrounded by operators, engineers, designers, researchers, mentors, customers, corporations, angels, venture funds, institutions, and the government ecosystem.">
            {NETWORK_NODES.map((n, i) => {
              const a = (i / NETWORK_NODES.length) * Math.PI * 2 - Math.PI / 2;
              const rx = 300;
              const ry = 205;
              const x = 360 + rx * Math.cos(a);
              const y = 260 + ry * Math.sin(a);
              return (
                <g key={n}>
                  <motion.line
                    x1={360}
                    y1={260}
                    x2={x}
                    y2={y}
                    stroke="var(--acc-line-paper-strong)"
                    strokeWidth="0.8"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.06 }}
                  />
                  <motion.g
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  >
                    <circle cx={x} cy={y} r="3" fill="var(--acc-signal)" />
                    <text
                      x={x}
                      y={y + (y > 260 ? 20 : -12)}
                      textAnchor="middle"
                      style={{
                        fontFamily: "var(--font-mono-tech)",
                        fontSize: "11px",
                        letterSpacing: "0.12em",
                        fill: "var(--acc-ink)",
                        opacity: 0.75,
                      }}
                    >
                      {n}
                    </text>
                  </motion.g>
                </g>
              );
            })}
            <motion.circle
              cx={360}
              cy={260}
              r="46"
              fill="var(--acc-bone)"
              stroke="var(--acc-ink)"
              strokeWidth="1.2"
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              style={{ transformOrigin: "360px 260px" }}
            />
            <text
              x={360}
              y={264}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-mono-tech)",
                fontSize: "12px",
                letterSpacing: "0.14em",
                fill: "var(--acc-ink)",
                fontWeight: 600,
              }}
            >
              YOU
            </text>
          </svg>
          <HandNote className="absolute -bottom-2 right-0 hidden md:block text-[var(--acc-graphite)]" rotate={-2}>
            the network compounds. so should you.
          </HandNote>
        </div>

        <p className="mx-auto mt-12 max-w-xl text-center text-[13px] text-[var(--acc-graphite)]/70">
          Verified partners, mentors, and investors are announced only once
          confirmed. No borrowed logos. No implied endorsements.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const PARTNER_CATEGORIES = [
  "FOUNDING PARTNER",
  "TECHNOLOGY PARTNER",
  "CLOUD PARTNER",
  "BANKING PARTNER",
  "LEGAL PARTNER",
  "KNOWLEDGE PARTNER",
  "FOUNDER RESIDENCY PARTNER",
  "DEMO DAY PARTNER",
  "CORPORATE INNOVATION PARTNER",
];

export function PeopleAndPartners() {
  return (
    <section
      className="acc-paper relative border-t border-[var(--acc-line-paper)]"
      aria-labelledby="people-h"
    >
      <div className="container-page py-20 md:py-28">
        <h2 id="people-h" className="sr-only">
          Mentors, investors, and partners
        </h2>
        <div className="grid gap-10 lg:grid-cols-3">
          {/* §13 Mentors */}
          <Reveal>
            <Frame className="on-paper flex h-full flex-col bg-[var(--acc-bone)] p-6 md:p-8">
              <p className="acc-label text-[var(--acc-signal)]">§ 13 — MENTORS</p>
              <h3 className="acc-display mt-4 text-2xl uppercase">
                The people building the network will be announced soon.
              </h3>
              <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-[var(--acc-graphite)]">
                Operators and founders who have built, scaled, and shipped —
                joining as mentors, visiting founders, and specialist
                clinicians. Real names only, once confirmed.
              </p>
              <AccButton
                href="/accelerator/apply?as=mentor"
                variant="paper"
                className="mt-6"
                onClick={() => track("apply_clicked", { placement: "mentor_card" })}
              >
                Become a mentor
              </AccButton>
            </Frame>
          </Reveal>

          {/* §14 Investors */}
          <Reveal delay={0.08}>
            <Frame className="on-paper flex h-full flex-col bg-[var(--acc-bone)] p-6 md:p-8">
              <p className="acc-label text-[var(--acc-signal)]">§ 14 — INVESTORS</p>
              <h3 className="acc-display mt-4 text-2xl uppercase">Meet companies earlier.</h3>
              <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-[var(--acc-graphite)]">
                Verified investors join the Inovers investor network: curated
                company updates (with founder consent), relevant founder
                sessions, office hours, and application to attend Demo Day.
              </p>
              <AccButton
                href="/accelerator/apply?as=investor"
                variant="paper"
                className="mt-6"
                onClick={() => track("apply_clicked", { placement: "investor_card" })}
              >
                Join the investor network
              </AccButton>
            </Frame>
          </Reveal>

          {/* §15 Partners */}
          <Reveal delay={0.16}>
            <Frame className="on-paper flex h-full flex-col bg-[var(--acc-bone)] p-6 md:p-8">
              <p className="acc-label text-[var(--acc-signal)]">§ 15 — PARTNERS</p>
              <h3 className="acc-display mt-4 text-2xl uppercase">
                Work with the next generation of companies.
              </h3>
              <ul className="mt-4 flex-1 space-y-1.5">
                {PARTNER_CATEGORIES.map((c) => (
                  <li key={c} className="acc-label !text-[10.5px] opacity-60">
                    {c}
                  </li>
                ))}
              </ul>
              <AccButton
                href="/accelerator/apply?as=corporate_partner"
                variant="paper"
                className="mt-6"
                onClick={() => track("apply_clicked", { placement: "partner_card" })}
              >
                Partner with Inovers
              </AccButton>
            </Frame>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
