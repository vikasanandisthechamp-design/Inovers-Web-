"use client";

import { useEffect, useRef, useState } from "react";
import { EngineOfProgress } from "@/components/accelerator/engine-of-progress";
import { AccButton, HandNote, StatusPill } from "@/components/accelerator/ui";
import { COHORT, getStatusUi, formatCohortDate, hasConfirmedOpenDate } from "@/lib/accelerator/config";
import { track } from "@/lib/accelerator/analytics";
import Link from "next/link";

export function AccHero() {
  const status = getStatusUi();
  const seen = useRef(false);

  useEffect(() => {
    if (!seen.current) {
      seen.current = true;
      track("accelerator_hero_view", {});
    }
  }, []);

  const openDate = formatCohortDate(COHORT.applicationOpenDate);

  return (
    <section className="acc-ink acc-grain relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 acc-grid-ink opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_60%_40%,#000_20%,transparent_80%)]" />

      <div className="container-page relative grid items-center gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-8 min-h-[calc(100svh-4rem)]">
        {/* Copy */}
        <div className="lg:col-span-6 xl:col-span-5">
          <p className="acc-label text-[var(--acc-signal)]">
            INOVERS ACCELERATOR · COHORT 01
          </p>

          <h1 className="acc-display mt-6 text-[clamp(2.6rem,7.5vw,5.2rem)] uppercase">
            Build what
            <br />
            the future
            <br />
            <span className="relative inline-block">
              needs.
              <svg
                aria-hidden
                viewBox="0 0 220 14"
                className="absolute -bottom-2 left-0 w-full text-[var(--acc-signal)]"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 9 C 60 4, 150 12, 217 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-8 max-w-md text-[16px] leading-relaxed text-[var(--acc-bone)]/70">
            {COHORT.programDurationWeeks} weeks. {COHORT.numberOfCompanies}{" "}
            startups. {COHORT.investmentAmountLabel} investment for selected
            companies. An intensive environment designed to turn ambitious
            ideas into companies.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <StatusPill>{status.pill}</StatusPill>
            {openDate && (
              <span className="acc-label opacity-50">OPENS {openDate}</span>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <AccButton
              href={status.cta.href}
              variant="signal"
              arrow
              onClick={() => track("apply_clicked", { placement: "acc_hero" })}
            >
              {status.cta.label}
            </AccButton>
            <AccButton href="/accelerator/program" variant="ink">
              Explore the program
            </AccButton>
          </div>

          <Link
            href="/accelerator/apply?as=investor"
            className="mt-5 inline-block text-[13px] text-[var(--acc-bone)]/50 underline decoration-[var(--acc-line-ink-strong)] underline-offset-4 hover:text-[var(--acc-signal)] transition-colors"
          >
            For investors, mentors &amp; partners →
          </Link>
        </div>

        {/* The Engine */}
        <div className="relative lg:col-span-6 xl:col-span-7">
          <HandNote className="absolute -top-2 right-4 z-10 hidden md:block" rotate={-4}>
            iteration 07 — why not?
          </HandNote>
          <EngineOfProgress className="mx-auto max-w-[640px]" />
        </div>
      </div>

      {/* Key facts strip */}
      <div className="relative border-t border-[var(--acc-line-ink)]">
        <dl className="container-page grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--acc-line-ink)]">
          {[
            { k: "INVESTMENT", v: COHORT.investmentAmountLabel },
            { k: "DURATION", v: `${COHORT.programDurationWeeks} weeks` },
            { k: "COHORT", v: `${COHORT.numberOfCompanies} startups` },
            {
              k: "PROGRAM START",
              v: formatCohortDate(COHORT.programStartDate) ?? `${COHORT.programWindowLabel} (expected)`,
            },
          ].map((f) => (
            <div key={f.k} className="px-4 py-5 md:px-6">
              <dt className="acc-label opacity-45">{f.k}</dt>
              <dd className="acc-mono mt-1.5 text-[15px] md:text-[17px] font-medium text-[var(--acc-bone)]">
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Countdown renders only when a confirmed date exists — never faked */}
      {hasConfirmedOpenDate() && <OpenCountdown />}
    </section>
  );
}

/** Rendered only when COHORT.applicationOpenDate is confirmed. */
function OpenCountdown() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const target = COHORT.applicationOpenDate;
    if (!target) return;
    const compute = () =>
      setDays(
        Math.max(0, Math.ceil((new Date(target).getTime() - Date.now()) / 86400000))
      );
    const raf = requestAnimationFrame(compute);
    const id = setInterval(compute, 60_000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  if (days === null) return null;
  return (
    <div className="border-t border-[var(--acc-line-ink)]">
      <p className="container-page py-3 acc-label text-[var(--acc-signal)]">
        APPLICATIONS OPEN IN {days} DAYS
      </p>
    </div>
  );
}
