"use client";

/**
 * §02 — THE HUMAN PROGRESS TIMELINE
 * A notebook-paper scroll narrative: stone tools → AI → "?".
 * Each entry draws itself in as it enters the viewport.
 */

import { DrawOnView, AccButton, SectionRail, HandNote } from "@/components/accelerator/ui";
import { TIMELINE_SKETCHES, type SketchKey } from "@/components/accelerator/sketches";
import { Reveal } from "@/components/ui/section";
import { track } from "@/lib/accelerator/analytics";

const ENTRIES: {
  key: SketchKey;
  era: string;
  title: string;
  note: string;
}[] = [
  { key: "stone", era: "c. 2.6M BCE", title: "Stone tools", note: "the first founders shipped v1 in flint" },
  { key: "press", era: "1440", title: "Printing press", note: "knowledge, distributed" },
  { key: "steam", era: "1712", title: "Steam engine", note: "muscle becomes machine" },
  { key: "electric", era: "1879", title: "Electricity", note: "the night shift begins" },
  { key: "flight", era: "1903", title: "Flight", note: "12 seconds that changed everything" },
  { key: "chip", era: "1947", title: "Semiconductor", note: "sand learns to think" },
  { key: "internet", era: "1969", title: "Internet", note: "every mind, connected" },
  { key: "ai", era: "now", title: "Artificial intelligence", note: "tools that build tools" },
  { key: "unknown", era: "next", title: "?", note: "this line is yours to write" },
];

export function ProgressTimeline() {
  return (
    <section className="acc-paper acc-grain relative" aria-labelledby="timeline-h">
      <div aria-hidden className="absolute inset-0 acc-grid-paper opacity-70" />
      <div className="container-page relative py-20 md:py-28">
        <SectionRail no="§ 02" label="THE RECORD OF PROGRESS" fig="FIG. 02 — TIMELINE, INCOMPLETE" />

        <h2 id="timeline-h" className="acc-display mt-10 max-w-3xl text-[clamp(1.9rem,4.5vw,3.2rem)] uppercase">
          Humans observed. Experimented. Invented.
          <span className="text-[var(--acc-signal)]"> Then did it again.</span>
        </h2>

        <div className="relative mt-16 md:mt-20">
          {/* spine */}
          <span
            aria-hidden
            className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-[var(--acc-line-paper)] md:-translate-x-1/2"
          />

          <ol className="space-y-14 md:space-y-20">
            {ENTRIES.map((e, i) => {
              const Sketch = TIMELINE_SKETCHES[e.key];
              const right = i % 2 === 1;
              const last = i === ENTRIES.length - 1;
              return (
                <li key={e.key} className="relative">
                  <div
                    className={`flex items-start gap-6 md:gap-0 ${
                      right ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* sketch node */}
                    <DrawOnView
                      className={`relative z-10 shrink-0 border bg-[var(--acc-bone)] ${
                        last
                          ? "border-[var(--acc-signal)] text-[var(--acc-signal)]"
                          : "border-[var(--acc-line-paper)] text-[var(--acc-ink)]"
                      } h-14 w-14 md:h-24 md:w-24 md:absolute md:left-1/2 md:-translate-x-1/2 p-2 md:p-4`}
                    >
                      <Sketch className="h-full w-full" />
                    </DrawOnView>

                    {/* copy */}
                    <Reveal
                      className={`md:w-[calc(50%-4.5rem)] ${
                        right ? "md:mr-auto md:text-right" : "md:ml-auto"
                      }`}
                    >
                      <p className="acc-label text-[var(--acc-graphite)]/70">{e.era}</p>
                      <h3
                        className={`acc-display mt-1.5 text-2xl md:text-3xl uppercase ${
                          last ? "text-[var(--acc-signal)]" : ""
                        }`}
                      >
                        {e.title}
                      </h3>
                      <HandNote className="mt-2 block text-[var(--acc-graphite)]" rotate={right ? 1.5 : -1.5}>
                        {e.note}
                      </HandNote>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal className="mt-20 md:mt-28 text-center">
          <p className="acc-display text-[clamp(1.6rem,4vw,2.8rem)] uppercase">
            Every generation inherits a frontier.
            <br />
            <span className="text-[var(--acc-signal)]">This one is yours.</span>
          </p>
          <div className="mt-8 flex justify-center">
            <AccButton
              href="/accelerator/apply"
              variant="solid-ink"
              arrow
              onClick={() => track("apply_clicked", { placement: "timeline" })}
            >
              Build the next thing
            </AccButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
