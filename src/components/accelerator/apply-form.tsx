"use client";

/**
 * The INOVERS 01 application — a multi-step flow that autosaves locally,
 * validates per step, and submits to Supabase (insert-only; applicant data
 * is never client-readable).
 *
 * Progress metaphor: an invention being assembled — the gear completes as
 * the founder completes the application.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  APPLICATION_DRAFT_KEY,
  STEPS,
  type ApplicationDraft,
  type StepKey,
  generateApplicationCode,
  validateAll,
  validateStep,
} from "@/lib/accelerator/application";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { AccButton, Frame, HandNote } from "@/components/accelerator/ui";
import { track } from "@/lib/accelerator/analytics";
import { COHORT } from "@/lib/accelerator/config";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Field definitions per step                                          */
/* ------------------------------------------------------------------ */

type FieldDef = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "textarea" | "select";
  placeholder?: string;
  optional?: boolean;
  hint?: string;
  rows?: number;
  options?: { value: string; label: string }[];
  autoComplete?: string;
  half?: boolean;
};

const FIELDS: Record<StepKey, FieldDef[]> = {
  founder: [
    { name: "fullName", label: "Full name", type: "text", autoComplete: "name", half: true },
    { name: "email", label: "Email", type: "email", autoComplete: "email", half: true },
    { name: "phone", label: "Phone", type: "tel", placeholder: "+91…", autoComplete: "tel", half: true },
    { name: "city", label: "Current city", type: "text", half: true },
    { name: "linkedin", label: "LinkedIn URL", type: "url", optional: true, half: true },
    { name: "portfolio", label: "Website / GitHub / portfolio", type: "url", optional: true, half: true },
    {
      name: "founderStatus", label: "Founder status", type: "select", half: true,
      options: [
        { value: "solo", label: "Solo founder" },
        { value: "team", label: "Founding team" },
      ],
    },
    {
      name: "commitment", label: "Time commitment", type: "select", half: true,
      options: [
        { value: "full_time_now", label: "Already full-time on this" },
        { value: "full_time_if_selected", label: "Full-time if selected" },
        { value: "not_full_time", label: "Cannot commit full-time" },
      ],
    },
  ],
  company: [
    { name: "startupName", label: "Startup name", type: "text", hint: "A working name is fine.", half: true },
    { name: "website", label: "Website", type: "url", optional: true, half: true },
    {
      name: "incorporated", label: "Incorporation status", type: "select", half: true,
      options: [
        { value: "no", label: "Not incorporated" },
        { value: "in_progress", label: "In progress" },
        { value: "yes", label: "Incorporated" },
      ],
    },
    { name: "location", label: "Location", type: "text", half: true },
    { name: "industry", label: "Industry", type: "text", placeholder: "Fintech, agri, health, AI…", half: true },
    {
      name: "stage", label: "Stage", type: "select", half: true,
      options: [
        { value: "idea", label: "Idea" },
        { value: "prototype", label: "Prototype" },
        { value: "launched", label: "Launched" },
        { value: "revenue", label: "Generating revenue" },
      ],
    },
    {
      name: "previousFunding", label: "Previous funding", type: "select", half: true,
      options: [
        { value: "none", label: "None" },
        { value: "friends_family", label: "Friends & family" },
        { value: "angel", label: "Angel" },
        { value: "institutional", label: "Institutional" },
      ],
    },
    {
      name: "revenueStatus", label: "Revenue status", type: "select", half: true,
      options: [
        { value: "pre_revenue", label: "Pre-revenue" },
        { value: "early_revenue", label: "Early revenue" },
        { value: "growing_revenue", label: "Growing revenue" },
      ],
    },
  ],
  building: [
    { name: "description", label: "Describe the company in ~50 words", type: "textarea", rows: 3 },
    { name: "problem", label: "What problem are you solving?", type: "textarea", rows: 3 },
    { name: "who", label: "Who desperately needs this?", type: "textarea", rows: 2 },
    { name: "alternatives", label: "What are people doing today instead?", type: "textarea", rows: 2 },
    { name: "different", label: "Why is your approach different?", type: "textarea", rows: 3 },
  ],
  evidence: [
    { name: "built", label: "What have you built?", type: "textarea", rows: 3, hint: "\"Nothing yet\" is a valid answer — say why." },
    { name: "users", label: "Users / customers", type: "text", optional: true, half: true },
    { name: "revenue", label: "Revenue, if any", type: "text", optional: true, half: true },
    { name: "growth", label: "Growth, if any", type: "text", optional: true, half: true },
    { name: "pilots", label: "Pilots / LOIs", type: "text", optional: true, half: true },
    { name: "prototypeUrl", label: "Prototype link", type: "url", optional: true, half: true },
    { name: "demoUrl", label: "Demo link", type: "url", optional: true, half: true },
    { name: "deckUrl", label: "Pitch deck link", type: "url", optional: true, hint: "Optional. A link (Drive, Notion, DocSend) works better than an attachment." },
  ],
  founders: [
    { name: "knownDuration", label: "How long have the founders known each other?", type: "text", optional: true, half: true },
    { name: "howMet", label: "How did you meet?", type: "text", optional: true, half: true },
    { name: "whoBuilds", label: "Who builds the product?", type: "text", half: true },
    { name: "whoSells", label: "Who talks to customers?", type: "text", half: true },
    { name: "whyYou", label: "Why are you the right people to build this?", type: "textarea", rows: 4 },
  ],
  insight: [
    { name: "insight", label: "What do you understand about this problem that most people do not?", type: "textarea", rows: 6 },
  ],
  speed: [
    { name: "fastThing", label: "What is the most impressive thing you have built or accomplished quickly?", type: "textarea", rows: 6 },
  ],
  whyNow: [
    { name: "whyNow", label: "Why is now the right time for this company?", type: "textarea", rows: 6 },
  ],
  inovers: [
    { name: "whyInovers", label: "Why do you want to join Inovers?", type: "textarea", rows: 3 },
    { name: "twelveWeekGoal", label: "What do you expect to accomplish in 12 weeks?", type: "textarea", rows: 3 },
    {
      name: "fullTime", label: "Can you commit full-time?", type: "select", half: true,
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      name: "inPerson", label: "Can you participate in person if required?", type: "select", half: true,
      options: [
        { value: "yes", label: "Yes" },
        { value: "depends", label: "Depends on location" },
        { value: "no", label: "No" },
      ],
    },
  ],
  video: [
    {
      name: "videoUrl", label: "Founder video link", type: "url",
      optional: !COHORT.videoRequired,
      hint: "Max 60 seconds: introduce the founders and tell us what you are building. YouTube (unlisted) or Drive link.",
    },
  ],
};

const REVIEW_INDEX = STEPS.length; // final pseudo-step

/* ------------------------------------------------------------------ */

export function ApplyForm() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<ApplicationDraft>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [submitError, setSubmitError] = useState("");
  const [appCode, setAppCode] = useState("");
  const [restored, setRestored] = useState(false);
  const started = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  /* restore draft (async so hydration completes first) ---------------- */
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(APPLICATION_DRAFT_KEY);
        if (raw) {
          setDraft(JSON.parse(raw) as ApplicationDraft);
          setRestored(true);
        }
      } catch {
        /* corrupted draft — start clean */
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  /* autosave (debounced) ---------------------------------------------- */
  const persist = useCallback((d: ApplicationDraft, stepKey: string) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(APPLICATION_DRAFT_KEY, JSON.stringify(d));
        track("application_saved", { step: stepKey });
      } catch {
        /* storage full/blocked — non-fatal */
      }
    }, 700);
  }, []);

  function setField(stepKey: StepKey, name: string, value: string) {
    if (!started.current) {
      started.current = true;
      track("application_started", {});
    }
    setDraft((d) => {
      const next = { ...d, [stepKey]: { ...d[stepKey], [name]: value } };
      persist(next, stepKey);
      return next;
    });
    setErrors((e) => {
      if (!e[name]) return e;
      const rest = { ...e };
      delete rest[name];
      return rest;
    });
  }

  /* navigation --------------------------------------------------------- */
  function goNext() {
    const s = STEPS[step];
    const errs = validateStep(s.key, draft[s.key]);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    track("application_step_completed", { step: s.key, index: step + 1 });
    setStep((n) => Math.min(n + 1, REVIEW_INDEX));
    headingRef.current?.focus();
  }

  function goBack() {
    setErrors({});
    setStep((n) => Math.max(n - 1, 0));
    headingRef.current?.focus();
  }

  /* submit -------------------------------------------------------------- */
  async function submit() {
    if (!consent) {
      setSubmitError("Please acknowledge the privacy notice to submit.");
      return;
    }
    const allErrs = validateAll(draft);
    const firstBad = STEPS.findIndex((s) => allErrs[s.key]);
    if (firstBad >= 0) {
      setStep(firstBad);
      setErrors(allErrs[STEPS[firstBad].key] ?? {});
      setSubmitError("A few answers still need attention.");
      return;
    }

    setSubmitState("submitting");
    setSubmitError("");

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setSubmitState("error");
      setSubmitError("Applications aren't connected yet. Your draft is saved on this device — try again shortly.");
      return;
    }

    const code = generateApplicationCode();
    const founder = draft.founder as { fullName?: string; email?: string; city?: string };
    const company = draft.company as { startupName?: string };

    const { error } = await supabase.from("accelerator_applications").insert({
      application_code: code,
      email: founder?.email ?? "",
      founder_name: founder?.fullName ?? "",
      startup_name: company?.startupName ?? null,
      city: founder?.city ?? null,
      answers: draft as Record<string, unknown>,
    });

    if (error) {
      setSubmitState("error");
      setSubmitError(
        error.code === "23505"
          ? "An application with this email already exists for this cohort. If you need to update it, contact us."
          : "Transmission failed. Your draft is safe on this device — try again in a moment."
      );
      return;
    }

    track("application_submitted", { code });
    try {
      localStorage.removeItem(APPLICATION_DRAFT_KEY);
    } catch {
      /* non-fatal */
    }
    setAppCode(code);
    setSubmitState("done");
  }

  /* assembled-gear progress -------------------------------------------- */
  const progress = useMemo(
    () => Math.min(1, step / REVIEW_INDEX),
    [step]
  );

  if (submitState === "done") {
    return (
      <Frame className="mx-auto max-w-xl p-8 md:p-12 text-center" as="section">
        <p className="acc-label text-[var(--acc-signal)]">APPLICATION TRANSMITTED.</p>
        <h2 className="acc-display mt-4 text-3xl uppercase">
          We read everything.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-current/70">
          Your application to {COHORT.cohortName} has been received. Keep your
          application ID — you&apos;ll use it in any correspondence with us.
        </p>
        <p className="acc-mono mt-6 inline-block border border-[var(--acc-line-ink-strong)] px-6 py-3 text-xl tracking-[0.2em] text-[var(--acc-signal)]">
          {appCode}
        </p>
        <HandNote className="mt-6 block" rotate={-2}>
          now keep building — it&apos;s the best thing you can do while you wait
        </HandNote>
      </Frame>
    );
  }

  const onReview = step === REVIEW_INDEX;
  const current = onReview ? null : STEPS[step];

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      {/* Rail: assembly progress */}
      <aside className="lg:col-span-4">
        <div className="lg:sticky lg:top-24">
          <AssemblyGear progress={progress} />
          <ol className="mt-8 space-y-1" aria-label="Application steps">
            {STEPS.map((s, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <li key={s.key}>
                  <button
                    onClick={() => i <= step && setStep(i)}
                    disabled={i > step}
                    className={cn(
                      "flex w-full items-baseline gap-3 px-2 py-1.5 text-left transition-colors",
                      active && "text-[var(--acc-signal)]",
                      done && "text-current/70 hover:text-current",
                      !done && !active && "text-current/30"
                    )}
                  >
                    <span className="acc-mono text-[11px]">{s.code}</span>
                    <span className="text-[13.5px]">{s.title}</span>
                    {done && <span aria-hidden className="acc-mono ml-auto text-[11px] text-[var(--acc-signal)]">✓</span>}
                  </button>
                </li>
              );
            })}
            <li>
              <span
                className={cn(
                  "flex items-baseline gap-3 px-2 py-1.5",
                  onReview ? "text-[var(--acc-signal)]" : "text-current/30"
                )}
              >
                <span className="acc-mono text-[11px]">11</span>
                <span className="text-[13.5px]">Review &amp; submit</span>
              </span>
            </li>
          </ol>
          {restored && (
            <p className="acc-label mt-6 px-2 opacity-45">
              DRAFT RESTORED — AUTOSAVES ON THIS DEVICE
            </p>
          )}
        </div>
      </aside>

      {/* Step panel */}
      <div className="lg:col-span-8">
        {!onReview && current && (
          <section aria-labelledby="step-h">
            <p className="acc-label text-[var(--acc-signal)]">
              STEP {current.code} / {String(REVIEW_INDEX + 1).padStart(2, "0")}
            </p>
            <h2
              id="step-h"
              ref={headingRef}
              tabIndex={-1}
              className="acc-display mt-3 text-3xl md:text-4xl uppercase outline-none"
            >
              {current.title}
            </h2>
            {current.intro && (
              <p className="mt-3 text-[14.5px] text-current/60">{current.intro}</p>
            )}

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {FIELDS[current.key].map((f) => (
                <FormField
                  key={f.name}
                  def={f}
                  value={String((draft[current.key] as Record<string, unknown>)?.[f.name] ?? "")}
                  error={errors[f.name]}
                  onChange={(v) => setField(current.key, f.name, v)}
                />
              ))}
            </div>

            <div className="mt-10 flex items-center gap-3">
              {step > 0 && (
                <AccButton variant="ink" onClick={goBack}>
                  Back
                </AccButton>
              )}
              <AccButton variant="signal" arrow onClick={goNext}>
                {step === STEPS.length - 1 ? "Review application" : "Continue"}
              </AccButton>
            </div>
          </section>
        )}

        {onReview && (
          <section aria-labelledby="review-h">
            <p className="acc-label text-[var(--acc-signal)]">STEP 11 / 11</p>
            <h2
              id="review-h"
              ref={headingRef}
              tabIndex={-1}
              className="acc-display mt-3 text-3xl md:text-4xl uppercase outline-none"
            >
              Review &amp; submit
            </h2>

            <div className="mt-8 space-y-4">
              {STEPS.map((s, i) => {
                const data = (draft[s.key] ?? {}) as Record<string, string>;
                const answered = Object.values(data).filter((v) => v && String(v).trim()).length;
                return (
                  <Frame key={s.key} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div className="flex items-baseline gap-3 min-w-0">
                      <span className="acc-mono text-[11px] opacity-50">{s.code}</span>
                      <span className="text-[15px] truncate">{s.title}</span>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="acc-label opacity-45">{answered} ANSWERED</span>
                      <button
                        onClick={() => setStep(i)}
                        className="acc-label text-[var(--acc-signal)] hover:underline underline-offset-4"
                      >
                        EDIT
                      </button>
                    </div>
                  </Frame>
                );
              })}
            </div>

            <label className="mt-8 flex items-start gap-3 text-[13.5px] leading-relaxed text-current/70 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[var(--acc-signal)]"
              />
              <span>
                I confirm the information above is accurate, and I consent to
                Inovers storing and processing it to evaluate this application.
                Applicant data is never made public and is only accessible to
                the Inovers selection team.
              </span>
            </label>

            {submitError && (
              <p className="mt-4 border border-[#e5484d]/50 bg-[#e5484d]/10 px-4 py-3 text-sm text-[#ff8f8f]" role="alert">
                {submitError}
              </p>
            )}

            <div className="mt-8 flex items-center gap-3">
              <AccButton variant="ink" onClick={goBack}>
                Back
              </AccButton>
              <AccButton
                variant="signal"
                arrow
                onClick={submit}
                disabled={submitState === "submitting"}
              >
                {submitState === "submitting" ? "Transmitting…" : `Submit to ${COHORT.cohortName}`}
              </AccButton>
            </div>
            <p className="acc-label mt-5 opacity-40">NO APPLICATION FEE. WE READ EVERYTHING.</p>
          </section>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function FormField({
  def,
  value,
  error,
  onChange,
}: {
  def: FieldDef;
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  const id = `app-${def.name}`;
  const errId = `${id}-err`;
  const base = (
    <>
      <label htmlFor={id} className="acc-label block opacity-60 mb-2">
        {def.label}
        {def.optional && <span className="opacity-50 normal-case tracking-normal"> · optional</span>}
      </label>
      {def.hint && <p className="mb-2 -mt-1 text-[12px] text-current/45">{def.hint}</p>}
    </>
  );

  const common = {
    id,
    value,
    "aria-invalid": error ? ("true" as const) : undefined,
    "aria-describedby": error ? errId : undefined,
    className: "acc-field",
  };

  return (
    <div className={def.half ? "" : "sm:col-span-2"}>
      {base}
      {def.type === "textarea" ? (
        <textarea
          {...common}
          rows={def.rows ?? 3}
          placeholder={def.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : def.type === "select" ? (
        <select
          {...common}
          className="acc-field appearance-none"
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select…</option>
          {def.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...common}
          type={def.type}
          placeholder={def.placeholder}
          autoComplete={def.autoComplete}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {error && (
        <p id={errId} className="mt-1.5 text-xs text-[#ff8f8f]">
          {error}
        </p>
      )}
    </div>
  );
}

/** The invention assembles as the application completes. */
function AssemblyGear({ progress }: { progress: number }) {
  const pct = Math.round(progress * 100);
  return (
    <div className="acc-frame p-6">
      <span aria-hidden className="acc-ticks" />
      <svg viewBox="0 0 120 120" className="mx-auto h-32 w-32" role="img" aria-label={`Application ${pct}% assembled`}>
        {/* teeth appear with progress */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const visible = i / 12 <= progress;
          return (
            <line
              key={i}
              x1={60 + 38 * Math.cos(a)}
              y1={60 + 38 * Math.sin(a)}
              x2={60 + 48 * Math.cos(a)}
              y2={60 + 48 * Math.sin(a)}
              stroke={visible ? "var(--acc-signal)" : "currentColor"}
              strokeWidth="3"
              strokeLinecap="round"
              opacity={visible ? 1 : 0.15}
              style={{ transition: "opacity 0.4s ease, stroke 0.4s ease" }}
            />
          );
        })}
        <circle cx="60" cy="60" r="38" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
        <circle
          cx="60" cy="60" r="38" fill="none"
          stroke="var(--acc-signal)" strokeWidth="1.6"
          strokeDasharray={`${progress * 238.8} 238.8`}
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dasharray 0.5s ease" }}
        />
        <circle cx="60" cy="60" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <text
          x="60" y="90" textAnchor="middle"
          style={{ fontFamily: "var(--font-mono-tech)", fontSize: "11px", fill: "currentColor", opacity: 0.7 }}
        >
          {pct}%
        </text>
      </svg>
      <p className="acc-label mt-3 text-center opacity-50">ASSEMBLING…</p>
    </div>
  );
}
