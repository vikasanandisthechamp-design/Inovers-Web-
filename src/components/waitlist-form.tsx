"use client";

import { useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { ShineButton } from "@/components/ui/shine-button";

const schema = z.object({
  name: z.string().trim().min(2, "Tell us your name"),
  email: z.string().trim().toLowerCase().email("Use a real email"),
  city: z.string().trim().min(2, "Which city are you in?"),
  skills: z.string().trim().min(3, "Add a few skills or interests"),
  why: z.string().trim().max(500).optional().or(z.literal("")),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    setFieldErrors({});

    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      city: form.get("city"),
      skills: form.get("skills"),
      why: form.get("why") ?? "",
    });

    if (!parsed.success) {
      const errs: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (!errs[key]) errs[key] = issue.message;
      }
      setFieldErrors(errs);
      setStatus("idle");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus("error");
      setErrorMsg("Waitlist isn't connected yet. Check back shortly.");
      return;
    }

    const { error } = await supabase.from("waitlist").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      city: parsed.data.city,
      skills: parsed.data.skills,
      why: parsed.data.why || null,
    });

    if (error) {
      setStatus("error");
      setErrorMsg(
        error.code === "23505"
          ? "You're already on the list. Welcome back!"
          : "Something went wrong. Try again in a moment."
      );
      return;
    }
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <div className="mx-auto h-14 w-14 rounded-full border border-[var(--neon-cyan)]/40 bg-[var(--neon-cyan)]/10 flex items-center justify-center text-[var(--neon-cyan)]">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">
          You&apos;re in.
        </h3>
        <p className="mt-2 text-white/65 max-w-sm mx-auto">
          Welcome to Inovers. We&apos;ll reach out within a week with your
          Founding Innovator invite.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Your name" name="name" placeholder="Ravi Kumar" error={fieldErrors.name} />
      <Field label="Email" name="email" type="email" placeholder="you@example.com" error={fieldErrors.email} />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="City" name="city" placeholder="Bengaluru" error={fieldErrors.city} />
        <Field label="Skills" name="skills" placeholder="Design, Flutter, policy…" error={fieldErrors.skills} />
      </div>
      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-white/55 mb-2">
          Why do you want in? <span className="text-white/40 lowercase tracking-normal font-normal">(optional)</span>
        </label>
        <textarea
          name="why"
          rows={3}
          placeholder="A problem you want to solve, a skill you want to use…"
          className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30 focus:bg-white/[0.05] transition-colors"
        />
      </div>

      {errorMsg && (
        <div className="rounded-xl border border-[var(--neon-pink)]/30 bg-[var(--neon-pink)]/[0.06] px-4 py-3 text-sm text-[var(--neon-pink)]">
          {errorMsg}
        </div>
      )}

      <ShineButton
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "submitting"}
        className="w-full mt-2"
      >
        {status === "submitting" ? "Joining…" : "Claim my spot"}
      </ShineButton>
      <p className="text-[11px] uppercase tracking-wider text-white/40 text-center">
        No spam. No ads. Ever.
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
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wider text-white/55 mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full h-12 rounded-xl bg-white/[0.03] border border-white/10 px-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30 focus:bg-white/[0.05] transition-colors"
      />
      {error && <p className="mt-1.5 text-xs text-[var(--neon-pink)]">{error}</p>}
    </div>
  );
}
