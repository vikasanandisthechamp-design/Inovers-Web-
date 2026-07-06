import type { Metadata } from "next";
import { COHORT, getStatusUi } from "@/lib/accelerator/config";
import { PageView } from "@/components/accelerator/page-view";
import { AccButton, Frame, HandNote } from "@/components/accelerator/ui";

export const metadata: Metadata = {
  title: "Companies",
  description: `The companies of ${COHORT.cohortName} will appear here after selection. ${COHORT.numberOfCompanies} startups, ${COHORT.programDurationWeeks} weeks, ${COHORT.investmentAmountLabel} investment.`,
  alternates: { canonical: "/accelerator/companies" },
};

/**
 * Cohort company directory. Until the cohort is selected this renders a
 * deliberate placeholder — never fake logos or invented startups. Once
 * selection completes, startup profiles plug into the slots below (backed by
 * a `accelerator_companies` table or config extension).
 */
export default function CompaniesPage() {
  const slots = Array.from({ length: COHORT.numberOfCompanies });

  return (
    <>
      <PageView event="accelerator_page_view" page="/accelerator/companies" />

      <section className="acc-ink acc-grain relative">
        <div className="container-page py-16 md:py-24">
          <p className="acc-label text-[var(--acc-signal)]">
            {COHORT.cohortName} · COMPANIES
          </p>
          <h1 className="acc-display mt-5 max-w-4xl text-[clamp(2.4rem,6vw,4.2rem)] uppercase">
            Ten companies will
            <span className="text-[var(--acc-signal)]"> earn this page.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-[var(--acc-bone)]/65">
            The {COHORT.cohortName} cohort hasn&apos;t been selected yet. When
            it is, every company appears here — what they build, who builds
            it, and what happened in {COHORT.programDurationWeeks} weeks.
          </p>
        </div>
      </section>

      <section className="acc-paper acc-grain relative" aria-label="Cohort slots">
        <div className="container-page py-16 md:py-24">
          <ul className="grid gap-px border border-[var(--acc-line-paper)] bg-[var(--acc-line-paper)] sm:grid-cols-2 lg:grid-cols-5">
            {slots.map((_, i) => (
              <li
                key={i}
                className="flex aspect-square flex-col justify-between bg-[var(--acc-bone)] p-5"
              >
                <span className="acc-label opacity-40">
                  SLOT {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className="acc-display self-center text-5xl text-[var(--acc-line-paper-strong)]"
                >
                  ?
                </span>
                <span className="acc-label opacity-40">UNCLAIMED</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 text-center">
            <HandNote className="text-[var(--acc-graphite)]" rotate={-2}>
              one of these could be yours
            </HandNote>
            <div className="mt-6 flex justify-center">
              <AccButton href={getStatusUi().cta.href} variant="solid-ink" arrow>
                {getStatusUi().cta.label}
              </AccButton>
            </div>
          </div>

          <Frame className="on-paper mx-auto mt-16 max-w-2xl bg-[var(--acc-bone)] p-6 text-center">
            <p className="acc-label opacity-50">FOR THE RECORD</p>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--acc-graphite)]">
              Inovers never displays placeholder startups, borrowed logos, or
              implied portfolio companies. If a company appears on this page,
              it is real, selected, and building.
            </p>
          </Frame>
        </div>
      </section>
    </>
  );
}
