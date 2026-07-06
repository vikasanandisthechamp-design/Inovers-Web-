"use client";

import { useRef, useState } from "react";
import { z } from "zod";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { AccButton, HandNote } from "@/components/accelerator/ui";
import { track } from "@/lib/accelerator/analytics";
import { COHORT } from "@/lib/accelerator/config";

const ROLES = [
  { value: "founder", label: "Founder" },
  { value: "investor", label: "Investor" },
  { value: "mentor", label: "Mentor" },
  { value: "operator", label: "Operator" },
  { value: "corporate_partner", label: "Corporate partner" },
  { value: "student", label: "Student" },
  { value: "media", label: "Media" },
  { value: "other", label: "Other" },
] as const;

type Role = (typeof ROLES)[number]["value"];

const schema = z.object({
  name: z.string().trim().min(2, "Tell us your name"),
  email: z.string().trim().toLowerCase().email("Use a real email"),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  role: z.enum([
    "founder",
    "investor",
    "mentor",
    "operator",
    "corporate_partner",
    "student",
    "media",
    "other",
  ]),
  startup_url: z
    .string()
    .trim()
    .url("That doesn't look like a URL")
    .max(300)
    .optional()
    .or(z.literal("")),
  interest: z.string().trim().max(300).optional().or(z.literal("")),
  // honeypot — humans never see or fill this
  website: z.string().max(0).optional().or(z.literal("")),
});

type FieldErrors = Partial<Record<string, string>>;

const ROLE_EVENTS: Partial<
  Record<Role, "investor_interest_submitted" | "mentor_interest_submitted" | "partner_interest_submitted">
> = {
  investor: "investor_interest_submitted",
  mentor: "mentor_interest_submitted",
  corporate_partner: "partner_interest_submitted",
};

export function EarlyAccessForm({
  defaultRole = "founder",
  placement = "landing",
}: {
  defaultRole?: Role;
  placement?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [role, setRole] = useState<Role>(defaultRole);
  const started = useRef(false);
  const lastSubmit = useRef(0);

  function onFirstInteraction() {
    if (!started.current) {
      started.current = true;
      track("early_access_started", { placement });
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // client-side rate limit: one attempt per 3s
    const now = Date.now();
    if (now - lastSubmit.current < 3000) return;
    lastSubmit.current = now;

    setStatus("submitting");
    setErrorMsg("");
    setFieldErrors({});

    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      city: form.get("city") ?? "",
      role: form.get("role"),
      startup_url: form.get("startup_url") ?? "",
      interest: form.get("interest") ?? "",
      website: form.get("website") ?? "",
    });

    if (!parsed.success) {
      const errs: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!errs[key]) errs[key] = issue.message;
      }
      setFieldErrors(errs);
      setStatus("idle");
      return;
    }

    // honeypot tripped → silently succeed
    if (parsed.data.website && parsed.data.website.length > 0) {
      setStatus("success");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus("error");
      setErrorMsg("Early access isn't connected yet. Check back shortly.");
      return;
    }

    const { error } = await supabase.from("accelerator_leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      city: parsed.data.city || null,
      role: parsed.data.role,
      startup_url: parsed.data.startup_url || null,
      interest: parsed.data.interest || null,
      source: placement,
    });

    if (error) {
      if (error.code === "23505") {
        // duplicate → treat as success, they're already on the list
        setStatus("success");
        return;
      }
      setStatus("error");
      setErrorMsg("Something went wrong. Try again in a moment.");
      return;
    }

    track("early_access_submitted", { placement, role: parsed.data.role });
    const roleEvent = ROLE_EVENTS[parsed.data.role];
    if (roleEvent) track(roleEvent, { placement });
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="acc-frame p-8 text-center" role="status">
        <span aria-hidden className="acc-ticks" />
        <p className="acc-label text-[var(--acc-signal)]">SIGNAL RECEIVED.</p>
        <p className="mt-3 text-[15px] text-current/75 max-w-sm mx-auto leading-relaxed">
          You&apos;re on the {COHORT.cohortName} early-access list. You&apos;ll
          hear from us the moment applications open — before anyone else.
        </p>
        <HandNote className="mt-4 block">now go build something</HandNote>
      </div>
    );
  }

  const showFounderFields = role === "founder" || role === "student";

  return (
    <form onSubmit={onSubmit} className="space-y-4" onFocus={onFirstInteraction}>
      {/* honeypot */}
      <div className="absolute -left-[9999px] top-auto" aria-hidden>
        <label>
          Leave this field empty
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" name="name" placeholder="Your full name" error={fieldErrors.name} autoComplete="name" />
        <Field label="Email" name="email" type="email" placeholder="you@company.com" error={fieldErrors.email} autoComplete="email" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="City" name="city" placeholder="Patna, Pune, anywhere" optional autoComplete="address-level2" />
        <div>
          <label htmlFor="ea-role" className="acc-label block opacity-60 mb-2">
            I am a
          </label>
          <select
            id="ea-role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="acc-field appearance-none"
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showFounderFields && (
        <Field
          label="Startup URL"
          name="startup_url"
          type="url"
          placeholder="https:// — if you have one"
          error={fieldErrors.startup_url}
          optional
        />
      )}
      <Field
        label={role === "founder" || role === "student" ? "What are you building?" : "Interest area"}
        name="interest"
        placeholder={
          role === "investor"
            ? "Stage, sectors, cheque size…"
            : role === "mentor"
              ? "What you can help founders with…"
              : "One line is enough"
        }
        optional
      />

      {errorMsg && (
        <p className="border border-[#e5484d]/50 bg-[#e5484d]/10 px-4 py-3 text-sm text-[#ff8f8f]" role="alert">
          {errorMsg}
        </p>
      )}

      <AccButton
        type="submit"
        variant="signal"
        arrow
        disabled={status === "submitting"}
        className="w-full"
      >
        {status === "submitting" ? "Transmitting…" : "Get early access"}
      </AccButton>
      <p className="acc-label text-center opacity-40">
        No spam. No fee. First to know.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
  optional,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  optional?: boolean;
  autoComplete?: string;
}) {
  const id = `ea-${name}`;
  return (
    <div>
      <label htmlFor={id} className="acc-label block opacity-60 mb-2">
        {label}
        {optional && <span className="opacity-50 normal-case tracking-normal"> · optional</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className="acc-field"
      />
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-xs text-[#ff8f8f]">
          {error}
        </p>
      )}
    </div>
  );
}
