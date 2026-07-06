"use client";

/**
 * Homepage accelerator campaign takeover — a full-width "notebook opens"
 * band directly after the platform hero. Visually announces the accelerator
 * in its own design language without replacing the master Inovers hero.
 * Controlled by HOMEPAGE_CAMPAIGN_ENABLED in the cohort config.
 */

import Link from "next/link";
import {
  HOMEPAGE_CAMPAIGN_ENABLED,
  COHORT,
  getStatusUi,
  formatCohortDate,
} from "@/lib/accelerator/config";
import { EngineOfProgress } from "@/components/accelerator/engine-of-progress";
import { AccButton, StatusPill } from "@/components/accelerator/ui";
import { Reveal } from "@/components/ui/section";
import { track } from "@/lib/accelerator/analytics";

export function AcceleratorTakeover() {
  if (!HOMEPAGE_CAMPAIGN_ENABLED) return null;
  const status = getStatusUi();

  return (
    <section
      aria-labelledby="acc-takeover-h"
      className="acc acc-ink acc-grain relative overflow-hidden border-y border-[var(--acc-line-ink)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 acc-grid-ink opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_40%,#000_15%,transparent_80%)]"
      />
      <div className="container-page relative grid items-center gap-10 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="acc-label text-[var(--acc-signal)]">
              INOVERS ACCELERATOR · COHORT 01
            </p>
            <h2
              id="acc-takeover-h"
              className="acc-display mt-5 text-[clamp(2.2rem,6vw,4.4rem)] uppercase"
            >
              Build what the future needs.
            </h2>
            <p className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-[var(--acc-bone)]/70">
              {COHORT.programDurationWeeks} weeks. {COHORT.numberOfCompanies}{" "}
              startups. {COHORT.investmentAmountLabel} investment for selected
              companies. An intensive environment designed to turn ambitious
              ideas into companies.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <StatusPill>{status.pill}</StatusPill>
              <span className="acc-label opacity-50">
                EXPECTED START — {formatCohortDate(COHORT.programStartDate)?.toUpperCase() ?? COHORT.programWindowLabel.toUpperCase()}
              </span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <AccButton
                href="/accelerator/apply"
                variant="signal"
                arrow
                onClick={() => track("apply_clicked", { placement: "homepage_takeover" })}
              >
                {status.cta.label}
              </AccButton>
              <AccButton href="/accelerator" variant="ink">
                Explore the program
              </AccButton>
            </div>
            <Link
              href="/accelerator/apply?as=investor"
              className="mt-5 inline-block text-[13px] text-[var(--acc-bone)]/50 underline decoration-[var(--acc-line-ink-strong)] underline-offset-4 hover:text-[var(--acc-signal)] transition-colors"
            >
              For investors, mentors &amp; partners →
            </Link>
          </Reveal>
        </div>

        <div className="hidden lg:block lg:col-span-5">
          <EngineOfProgress />
        </div>
      </div>

      {/* fact strip */}
      <div className="relative border-t border-[var(--acc-line-ink)]">
        <dl className="container-page grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--acc-line-ink)]">
          {[
            { k: "INVESTMENT", v: COHORT.investmentAmountLabel },
            { k: "DURATION", v: `${COHORT.programDurationWeeks} weeks` },
            { k: "COHORT", v: `${COHORT.numberOfCompanies} startups` },
            { k: "APPLICATION FEE", v: "None" },
          ].map((f) => (
            <div key={f.k} className="px-4 py-4 md:px-6">
              <dt className="acc-label opacity-45">{f.k}</dt>
              <dd className="acc-mono mt-1 text-[14px] md:text-[16px] font-medium">
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
