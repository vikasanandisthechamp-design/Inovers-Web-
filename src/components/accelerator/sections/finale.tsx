"use client";

/**
 * §16 — DEMO DAY (ink, stage-lit)
 * §17 — FAQ preview (paper)
 * §18 — FINAL CTA (ink, full-screen; only the "?" remains)
 */

import { useState } from "react";
import Link from "next/link";
import { AccButton, SectionRail, HandNote, StatusPill } from "@/components/accelerator/ui";
import { SketchUnknown } from "@/components/accelerator/sketches";
import { DrawOnView } from "@/components/accelerator/ui";
import { Reveal } from "@/components/ui/section";
import { EarlyAccessForm } from "@/components/accelerator/early-access-form";
import { COHORT, getStatusUi } from "@/lib/accelerator/config";
import { FAQ_FLAT } from "@/lib/accelerator/faq";
import { track } from "@/lib/accelerator/analytics";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export function DemoDaySection() {
  return (
    <section className="acc-ink relative overflow-hidden" aria-labelledby="demoday-h">
      {/* stage spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 60% at 50% 0%, rgba(255,90,31,0.14), transparent 70%)",
        }}
      />
      <div className="container-page relative py-24 md:py-36 text-center">
        <SectionRail no="§ 16" label="DEMO DAY" fig="ONE ROOM" className="text-left" />

        <h2 id="demoday-h" className="acc-display mx-auto mt-14 max-w-4xl text-[clamp(2.2rem,6vw,4.2rem)] uppercase">
          12 weeks of building.
          <br />
          One room.
          <br />
          <span className="text-[var(--acc-signal)]">The next chapter begins.</span>
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-[15.5px] leading-relaxed text-[var(--acc-bone)]/65">
          Selected companies present their progress to invited investors,
          operators, ecosystem leaders, and potential partners. No promises of
          funding — just the strongest possible case, made by founders who
          spent {COHORT.programDurationWeeks} weeks earning it.
        </p>

        {/* audience rows */}
        <div aria-hidden className="mx-auto mt-14 max-w-2xl space-y-2 opacity-50">
          {[14, 18, 22].map((seats, r) => (
            <div key={r} className="flex justify-center gap-2">
              {Array.from({ length: seats }).map((_, i) => (
                <span key={i} className="h-1 w-3 bg-[var(--acc-bone)]/40" style={{ opacity: 1 - r * 0.25 }} />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <AccButton
            href="/accelerator/apply?as=investor"
            variant="ink"
            onClick={() => track("demo_day_interest", { placement: "demo_day_section" })}
          >
            Request Demo Day access
          </AccButton>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const PREVIEW_COUNT = 6;

export function FaqPreview() {
  const [open, setOpen] = useState<number | null>(0);
  const items = FAQ_FLAT.slice(0, PREVIEW_COUNT);

  return (
    <section
      className="acc-paper acc-grain relative border-t border-[var(--acc-line-paper)]"
      aria-labelledby="faq-h"
    >
      <div className="container-page py-20 md:py-28">
        <SectionRail no="§ 17" label="QUESTIONS" fig="MARGIN NOTES" />

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="faq-h" className="acc-display text-[clamp(1.9rem,4vw,2.9rem)] uppercase">
              Asked, <span className="text-[var(--acc-signal)]">answered.</span>
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[var(--acc-graphite)]">
              Straight answers — including &quot;final details will be published
              before applications open&quot; where that is the honest answer.
            </p>
            <AccButton href="/accelerator/faq" variant="paper" arrow className="mt-8">
              All questions
            </AccButton>
          </div>

          <div className="lg:col-span-8">
            <ul className="divide-y divide-[var(--acc-line-paper)] border-y border-[var(--acc-line-paper)]">
              {items.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={f.q}>
                    <button
                      onClick={() => {
                        setOpen(isOpen ? null : i);
                        if (!isOpen) track("faq_opened", { question: f.q, placement: "landing" });
                      }}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--acc-signal)]"
                    >
                      <span className="text-[16px] font-medium">{f.q}</span>
                      <Plus
                        aria-hidden
                        className={cn(
                          "h-4 w-4 shrink-0 text-[var(--acc-signal)] transition-transform duration-300",
                          isOpen && "rotate-45"
                        )}
                      />
                    </button>
                    {isOpen && (
                      <p className="pb-6 pr-10 text-[14.5px] leading-relaxed text-[var(--acc-graphite)]">
                        {f.a}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function FinalCta() {
  const status = getStatusUi();

  return (
    <section className="acc-ink acc-grain relative overflow-hidden" aria-labelledby="final-h">
      <div aria-hidden className="absolute inset-0 acc-grid-ink opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_45%,#000_10%,transparent_75%)]" />

      <div className="container-page relative flex min-h-svh flex-col items-center justify-center py-24 text-center">
        {/* only the "?" remains */}
        <DrawOnView className="text-[var(--acc-signal)]">
          <SketchUnknown className="h-28 w-28 md:h-36 md:w-36" />
        </DrawOnView>

        <h2 id="final-h" className="acc-display mt-10 max-w-4xl text-[clamp(2.4rem,7vw,5rem)] uppercase">
          The next great company
          <br />
          does not exist yet.
        </h2>

        <div className="mt-8 max-w-lg space-y-1 text-[16px] leading-relaxed text-[var(--acc-bone)]/65">
          <p>Maybe it is still an idea. Maybe it is sitting in a notebook.</p>
          <p>
            Maybe everyone around you thinks it is too early, too difficult, or
            impossible.
          </p>
        </div>

        <HandNote className="mt-6 !text-3xl" rotate={-3}>
          good.
        </HandNote>

        <p className="acc-display mt-6 text-3xl uppercase text-[var(--acc-signal)]">
          Build it.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <AccButton
            href="/accelerator/apply"
            variant="signal"
            arrow
            onClick={() => track("apply_clicked", { placement: "final_cta" })}
          >
            {status.applicationsOpen ? `Apply to ${COHORT.cohortName}` : status.cta.label}
          </AccButton>
          {!status.applicationsOpen && (
            <Link
              href="#early-access"
              className="acc-label text-[var(--acc-bone)]/50 underline decoration-[var(--acc-line-ink-strong)] underline-offset-4 hover:text-[var(--acc-signal)]"
            >
              GET NOTIFIED WHEN APPLICATIONS OPEN
            </Link>
          )}
        </div>

        <p className="acc-label mt-10 opacity-40">
          {COHORT.numberOfCompanies} STARTUPS · {COHORT.programDurationWeeks} WEEKS ·{" "}
          {COHORT.investmentAmountLabel.toUpperCase()} INVESTMENT
        </p>
      </div>

      {/* early access anchor */}
      <div id="early-access" className="relative border-t border-[var(--acc-line-ink)]">
        <div className="container-page grid gap-10 py-16 md:py-20 lg:grid-cols-2 items-center">
          <div>
            <StatusPill>{getStatusUi().pill}</StatusPill>
            <h3 className="acc-display mt-6 text-3xl md:text-4xl uppercase">
              First to know. <span className="text-[var(--acc-signal)]">First to apply.</span>
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--acc-bone)]/60">
              Early access means the application link, key dates, and cohort
              announcements reach you before they reach the public.
            </p>
          </div>
          <Reveal>
            <EarlyAccessForm placement="landing_final" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
