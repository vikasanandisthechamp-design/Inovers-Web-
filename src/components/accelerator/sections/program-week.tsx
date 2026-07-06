"use client";

/**
 * §05 — THE 12-WEEK PROGRAM (paper, interactive phase roadmap)
 * §06 — A WEEK INSIDE INOVERS (paper, editorial schedule)
 */

import { useState } from "react";
import { AccButton, Frame, SectionRail, HandNote } from "@/components/accelerator/ui";
import { Reveal } from "@/components/ui/section";
import { COHORT } from "@/lib/accelerator/config";
import { cn } from "@/lib/utils";

export function ProgramRoadmap() {
  const [active, setActive] = useState(0);
  const phase = COHORT.phases[active];

  return (
    <section className="acc-paper acc-grain relative" aria-labelledby="program-h">
      <div className="container-page py-20 md:py-28">
        <SectionRail no="§ 05" label="THE 12-WEEK PROGRAM" fig="FIG. 05 — ASSEMBLY SEQUENCE" />

        <h2 id="program-h" className="acc-display mt-10 text-[clamp(2rem,5vw,3.4rem)] uppercase max-w-3xl">
          Five phases. One direction:
          <span className="text-[var(--acc-signal)]"> forward.</span>
        </h2>

        {/* phase tabs */}
        <div
          role="tablist"
          aria-label="Program phases"
          className="mt-12 grid grid-cols-2 gap-px border border-[var(--acc-line-paper)] bg-[var(--acc-line-paper)] sm:grid-cols-5"
        >
          {COHORT.phases.map((p, i) => (
            <button
              key={p.code}
              role="tab"
              id={`phase-tab-${i}`}
              aria-selected={active === i}
              aria-controls="phase-panel"
              onClick={() => setActive(i)}
              className={cn(
                "px-3 py-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--acc-signal)] focus-visible:-outline-offset-2",
                active === i
                  ? "bg-[var(--acc-ink)] text-[var(--acc-bone)]"
                  : "bg-[var(--acc-bone)] text-[var(--acc-ink)] hover:bg-[var(--acc-paper-2)]"
              )}
            >
              <span
                className={cn(
                  "acc-label block",
                  active === i ? "text-[var(--acc-signal)]" : "opacity-50"
                )}
              >
                {p.code}
              </span>
              <span className="acc-label mt-1 block !text-[10px] opacity-60">
                {p.weeks}
              </span>
            </button>
          ))}
        </div>

        {/* phase panel */}
        <div
          id="phase-panel"
          role="tabpanel"
          aria-labelledby={`phase-tab-${active}`}
          className="border border-t-0 border-[var(--acc-line-paper)] bg-[var(--acc-bone)] p-6 md:p-10"
        >
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="acc-label text-[var(--acc-signal)]">{phase.weeks}</p>
              <h3 className="acc-display mt-2 text-3xl md:text-4xl uppercase">
                {phase.title}
              </h3>
              <HandNote className="mt-4 block text-[var(--acc-graphite)]" rotate={-1.5}>
                {phase.mandate}
              </HandNote>
            </div>
            <ul className="md:col-span-7 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {phase.items.map((item, i) => (
                <li key={item} className="flex items-baseline gap-3 text-[15px]">
                  <span className="acc-mono text-[11px] text-[var(--acc-graphite)]/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <AccButton href="/accelerator/program" variant="paper" arrow>
            See the complete program
          </AccButton>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function WeekInside() {
  return (
    <section
      className="acc-paper relative border-t border-[var(--acc-line-paper)]"
      aria-labelledby="week-h"
    >
      <div className="container-page py-20 md:py-28">
        <SectionRail no="§ 06" label="A WEEK INSIDE INOVERS" fig="OPERATING CADENCE" />

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="week-h" className="acc-display text-[clamp(1.9rem,4vw,2.9rem)] uppercase">
              The unit of progress is what you
              <span className="text-[var(--acc-signal)]"> ship.</span>
            </h2>
            <div className="mt-6 space-y-1.5 text-[15px] text-[var(--acc-graphite)]">
              <p>No attendance certificates.</p>
              <p>No motivational workshops.</p>
              <p>No startup theatre.</p>
            </div>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed">
              The unit of progress is what founders build, ship, learn, sell,
              and improve — every single week.
            </p>
          </div>

          <div className="lg:col-span-8">
            <Frame className="on-paper divide-y divide-[var(--acc-line-paper)]">
              {COHORT.weeklyCadence.map((d, i) => (
                <Reveal key={d.day} delay={i * 0.04}>
                  <div className="grid grid-cols-[7.5rem_1fr] md:grid-cols-[10rem_1fr] items-baseline gap-4 px-5 py-4 md:px-7">
                    <span className="acc-label text-[var(--acc-signal)]">
                      {d.day.toUpperCase()}
                    </span>
                    <span className="text-[15px]">{d.focus}</span>
                  </div>
                </Reveal>
              ))}
            </Frame>
          </div>
        </div>
      </div>
    </section>
  );
}
