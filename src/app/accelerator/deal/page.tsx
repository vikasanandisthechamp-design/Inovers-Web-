import type { Metadata } from "next";
import { COHORT, getStatusUi } from "@/lib/accelerator/config";
import { PageView } from "@/components/accelerator/page-view";
import { AccButton, Frame, SectionRail } from "@/components/accelerator/ui";
import { Check, CircleDashed } from "lucide-react";

export const metadata: Metadata = {
  title: "The Standard Deal",
  description: `${COHORT.investmentAmountLabel} investment for selected startups. What's confirmed, what's being finalized, and when full legal terms are disclosed. No application fee.`,
  alternates: { canonical: "/accelerator/deal" },
};

const CONFIRMED = [
  `${COHORT.investmentAmountLabel} investment for selected startups`,
  `${COHORT.programDurationWeeks}-week accelerator participation`,
  "Access to the Inovers founder environment and program resources",
  "No application fee — and no hidden fees at any stage",
];

const FINALIZING = [
  "Equity percentage and valuation basis",
  "Investment instrument (security type)",
  "Governance and information rights",
  "Follow-on participation policy",
];

const PROCESS = [
  {
    k: "SELECTION FIRST",
    v: "Investment discussions begin only after a startup is selected for the cohort. Applying costs nothing and commits you to nothing.",
  },
  {
    k: "FULL DISCLOSURE BEFORE SIGNING",
    v: COHORT.legal.investmentNote,
  },
  {
    k: "DUE DILIGENCE",
    v: "Standard checks: founders, company status, cap table, and eligibility under applicable law. We help first-time founders through every step.",
  },
  {
    k: "CORPORATE ELIGIBILITY",
    v: "You can apply before incorporating. An eligible corporate structure will be required before funds are transferred; we guide selected founders through incorporation.",
  },
  {
    k: "CAP TABLE",
    v: "We look for clean, founder-controlled cap tables. Existing small angel rounds are fine — disclose them in the application.",
  },
  {
    k: "AFTER THE PROGRAM",
    v: "Potential follow-on support exists for the strongest companies. Fundraising outcomes are never guaranteed — by us or anyone honest.",
  },
];

export default function DealPage() {
  return (
    <>
      <PageView event="deal_page_viewed" page="/accelerator/deal" />

      <section className="acc-ink acc-grain relative">
        <div className="container-page py-16 md:py-24">
          <p className="acc-label text-[var(--acc-signal)]">
            {COHORT.cohortName} · THE STANDARD DEAL
          </p>
          <h1 className="acc-display mt-5 max-w-4xl text-[clamp(2.4rem,6vw,4.4rem)] uppercase">
            Simple terms. Aligned incentives.
            <span className="text-[var(--acc-signal)]"> Long-term partnership.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-[var(--acc-bone)]/65">
            Founders deserve to know exactly what is confirmed, what is still
            being finalized, and when they will see the full legal terms. This
            page is that record.
          </p>
        </div>
      </section>

      <section className="acc-paper acc-grain relative" aria-label="Deal status">
        <div className="container-page py-16 md:py-24">
          <SectionRail no="TERMS" label="CURRENT STATE OF THE DEAL" fig="DRAFT — HONEST" />

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Frame className="on-paper bg-[var(--acc-bone)] p-6 md:p-8">
              <p className="acc-label text-[var(--acc-signal)]">CONFIRMED</p>
              <ul className="mt-5 space-y-3.5">
                {CONFIRMED.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px]">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[var(--acc-signal)]" />
                    {t}
                  </li>
                ))}
              </ul>
            </Frame>

            <Frame className="on-paper bg-[var(--acc-bone)] p-6 md:p-8">
              <p className="acc-label opacity-60">BEING FINALIZED WITH COUNSEL</p>
              <ul className="mt-5 space-y-3.5">
                {FINALIZING.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-[var(--acc-graphite)]">
                    <CircleDashed aria-hidden className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-[var(--acc-line-paper)] pt-4 text-[13px] leading-relaxed text-[var(--acc-graphite)]">
                All of the above are disclosed in writing before any founder
                accepts an offer — never after.
              </p>
            </Frame>
          </div>

          <dl className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {PROCESS.map((p) => (
              <div key={p.k} className="border-t border-[var(--acc-line-paper)] pt-4">
                <dt className="acc-label text-[var(--acc-signal)]">{p.k}</dt>
                <dd className="mt-2 text-[14.5px] leading-relaxed text-[var(--acc-graphite)]">
                  {p.v}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 flex flex-wrap gap-3">
            <AccButton href={getStatusUi().cta.href} variant="solid-ink" arrow>
              {getStatusUi().cta.label}
            </AccButton>
            <AccButton href="/accelerator/faq" variant="paper">
              Questions, answered
            </AccButton>
          </div>
        </div>
      </section>

      {/* Legal disclaimer — centrally editable via config */}
      <section className="acc-ink border-t border-[var(--acc-line-ink)]" aria-label="Legal disclaimer">
        <div className="container-page py-10">
          <p className="acc-label opacity-40 mb-3">DISCLAIMER</p>
          <p className="max-w-3xl text-[13px] leading-relaxed text-[var(--acc-bone)]/50">
            {COHORT.legal.dealDisclaimer}
          </p>
        </div>
      </section>
    </>
  );
}
