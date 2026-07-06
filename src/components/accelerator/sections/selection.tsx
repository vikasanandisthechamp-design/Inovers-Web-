"use client";

/**
 * §07 — WHO SHOULD APPLY (ink)
 * §08 — WHAT WE LOOK FOR (ink, "Selection Signal" inspection cards)
 * §09 — SELECTION PROCESS (ink, staged flow)
 */

import { useState } from "react";
import { Frame, SectionRail, HandNote } from "@/components/accelerator/ui";
import { Reveal } from "@/components/ui/section";
import { COHORT } from "@/lib/accelerator/config";
import { cn } from "@/lib/utils";
import { ArrowDown, Check, X } from "lucide-react";

const APPLICANTS = [
  "Idea-stage founders",
  "Pre-product teams",
  "Pre-revenue startups",
  "Technical founders",
  "Non-technical founders with exceptional domain insight",
  "Students prepared to commit seriously",
  "Repeat founders",
  "Researchers commercializing technology",
  "Operators leaving careers to build",
  "Founders from Tier-2 and Tier-3 India",
  "Founders from major startup hubs",
  "Solo founders",
  "Co-founder teams",
];

const DONT_NEED = [
  "Revenue",
  "Connections",
  "A perfect pitch deck",
  "An IIT or IIM degree",
];

const DO_NEED = ["Ambition", "Speed", "Resilience", "Insight", "Integrity", "The will to build"];

export function WhoShouldApply() {
  return (
    <section className="acc-ink acc-grain relative" aria-labelledby="who-h">
      <div className="container-page py-20 md:py-28">
        <SectionRail no="§ 07" label="WHO SHOULD APPLY" fig="SPECIMEN LIST" />

        <h2 id="who-h" className="acc-display mt-10 max-w-4xl text-[clamp(2rem,5vw,3.4rem)] uppercase">
          We fund people before
          <span className="text-[var(--acc-signal)]"> the world agrees with them.</span>
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <ul className="columns-1 sm:columns-2 gap-8 space-y-2.5">
              {APPLICANTS.map((a) => (
                <li
                  key={a}
                  className="break-inside-avoid flex items-baseline gap-3 text-[15px] text-[var(--acc-bone)]/80"
                >
                  <span aria-hidden className="acc-mono text-[var(--acc-signal)]">+</span>
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="lg:col-span-6 grid gap-6 sm:grid-cols-2">
            <Reveal>
              <Frame className="h-full p-6">
                <p className="acc-label opacity-50">YOU DO NOT NEED</p>
                <ul className="mt-4 space-y-2.5">
                  {DONT_NEED.map((d) => (
                    <li key={d} className="flex items-center gap-3 text-[15px] text-[var(--acc-bone)]/60">
                      <X aria-hidden className="h-3.5 w-3.5 opacity-50" />
                      <s className="decoration-[var(--acc-signal)]/60">{d}</s>
                    </li>
                  ))}
                </ul>
              </Frame>
            </Reveal>
            <Reveal delay={0.1}>
              <Frame className="h-full p-6">
                <p className="acc-label text-[var(--acc-signal)]">YOU DO NEED</p>
                <ul className="mt-4 space-y-2.5">
                  {DO_NEED.map((d) => (
                    <li key={d} className="flex items-center gap-3 text-[15px] text-[var(--acc-bone)]/85">
                      <Check aria-hidden className="h-3.5 w-3.5 text-[var(--acc-signal)]" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Frame>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const SIGNALS: {
  code: string;
  title: string;
  questions: string[];
  note: string;
}[] = [
  {
    code: "SIG-A",
    title: "Founders",
    questions: [
      "Are they unusually determined?",
      "Do they move quickly?",
      "Can they learn?",
      "Can they attract exceptional people?",
    ],
    note: "formidable? or just fluent?",
  },
  {
    code: "SIG-B",
    title: "Insight",
    questions: ["Do they understand something others overlook?"],
    note: "the earned secret",
  },
  {
    code: "SIG-C",
    title: "Problem",
    questions: ["Is the problem real?", "Is it painful?", "Is it worth solving?"],
    note: "hair on fire, or mildly annoying?",
  },
  {
    code: "SIG-D",
    title: "Market",
    questions: ["Can this become large?", "Why now?"],
    note: "small door, big room?",
  },
  {
    code: "SIG-E",
    title: "Speed",
    questions: ["Can the team execute rapidly?"],
    note: "weeks, not quarters",
  },
  {
    code: "SIG-F",
    title: "Evidence",
    questions: ["What have they built, learned, tested, sold, or discovered?"],
    note: "show, don't tell",
  },
];

export function SelectionSignal() {
  const [inspected, setInspected] = useState<number | null>(null);

  return (
    <section
      className="acc-ink relative border-t border-[var(--acc-line-ink)]"
      aria-labelledby="signal-h"
    >
      <div className="container-page py-20 md:py-28">
        <SectionRail no="§ 08" label="WHAT WE LOOK FOR" fig="SELECTION SIGNAL" />

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2 id="signal-h" className="acc-display max-w-2xl text-[clamp(2rem,5vw,3.4rem)] uppercase">
            Six signals. <span className="text-[var(--acc-signal)]">No formula.</span>
          </h2>
          <p className="acc-label max-w-xs opacity-45 leading-relaxed">
            INSPECT EACH SIGNAL — EVALUATOR ANNOTATIONS INCLUDED. THERE IS NO
            ACCEPTANCE SCORE; THERE IS ONLY THE WORK.
          </p>
        </div>

        <ul className="mt-12 grid gap-px border border-[var(--acc-line-ink)] bg-[var(--acc-line-ink)] sm:grid-cols-2 lg:grid-cols-3">
          {SIGNALS.map((s, i) => {
            const open = inspected === i;
            return (
              <li key={s.code} className="bg-[var(--acc-ink)]">
                <button
                  onClick={() => setInspected(open ? null : i)}
                  onMouseEnter={() => setInspected(i)}
                  aria-expanded={open}
                  className={cn(
                    "block h-full w-full p-6 md:p-8 text-left transition-colors",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--acc-signal)] focus-visible:-outline-offset-2",
                    open && "bg-[var(--acc-ink-2)]"
                  )}
                >
                  <div className="flex items-baseline justify-between">
                    <span className={cn("acc-label", open ? "text-[var(--acc-signal)]" : "opacity-40")}>
                      {s.code}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "acc-mono text-lg leading-none transition-transform duration-300",
                        open && "rotate-45 text-[var(--acc-signal)]"
                      )}
                    >
                      +
                    </span>
                  </div>
                  <h3 className="acc-display mt-3 text-2xl uppercase">{s.title}</h3>
                  <ul
                    className={cn(
                      "mt-4 space-y-2 text-[14.5px] text-[var(--acc-bone)]/65 transition-opacity duration-300",
                      open ? "opacity-100" : "opacity-60"
                    )}
                  >
                    {s.questions.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                  <HandNote
                    className={cn(
                      "mt-4 block transition-opacity duration-300",
                      open ? "opacity-100" : "opacity-0"
                    )}
                    rotate={-2}
                  >
                    {s.note}
                  </HandNote>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function SelectionProcess() {
  return (
    <section
      className="acc-ink relative border-t border-[var(--acc-line-ink)]"
      aria-labelledby="process-h"
    >
      <div className="container-page py-20 md:py-28">
        <SectionRail no="§ 09" label="SELECTION PROCESS" fig="FLOW DIAGRAM" />

        <h2 id="process-h" className="acc-display mt-10 text-[clamp(2rem,5vw,3.4rem)] uppercase">
          From application to <span className="text-[var(--acc-signal)]">day one.</span>
        </h2>

        <ol className="mx-auto mt-14 max-w-2xl">
          {COHORT.selectionStages.map((s, i) => (
            <li key={s.code}>
              <Reveal delay={i * 0.05}>
                <Frame className="flex items-start gap-5 p-5 md:p-6">
                  <span className="acc-label mt-0.5 text-[var(--acc-signal)]">{s.code}</span>
                  <div>
                    <h3 className="acc-display text-xl uppercase">{s.title}</h3>
                    <p className="mt-1 text-[14.5px] text-[var(--acc-bone)]/60">{s.detail}</p>
                  </div>
                </Frame>
              </Reveal>
              {i < COHORT.selectionStages.length - 1 && (
                <div aria-hidden className="flex justify-center py-2">
                  <ArrowDown className="h-4 w-4 text-[var(--acc-signal)]/70" />
                </div>
              )}
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-10 max-w-2xl text-center text-[13px] text-[var(--acc-bone)]/45">
          {COHORT.legal.processNote}
        </p>
      </div>
    </section>
  );
}
