"use client";

import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Mail } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { ShineButton } from "@/components/ui/shine-button";

const schema = z.string().trim().toLowerCase().email("Use a real email");

export function SignInForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const parsed = schema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid email");
      setStatus("idle");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus("error");
      setError("Auth isn't configured yet. Check back shortly.");
      return;
    }

    const { error: err } = await supabase.auth.signInWithOtp({
      email: parsed.data,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (err) {
      setStatus("error");
      setError(err.message);
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="text-center py-6">
        <div className="mx-auto h-14 w-14 rounded-full border border-[var(--neon-cyan)]/40 bg-[var(--neon-cyan)]/10 flex items-center justify-center text-[var(--neon-cyan)]">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">
          Check your inbox
        </h3>
        <p className="mt-2 text-white/65 text-sm">
          We sent a sign-in link to{" "}
          <span className="text-white font-medium">{email}</span>. It&apos;s
          good for the next 10 minutes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium uppercase tracking-wider text-white/55 mb-2">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/35" />
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full h-12 rounded-xl bg-white/[0.03] border border-white/10 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30 focus:bg-white/[0.05] transition-colors"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-[var(--neon-pink)]/30 bg-[var(--neon-pink)]/[0.06] px-4 py-3 text-sm text-[var(--neon-pink)]">
          {error}
        </div>
      )}

      <ShineButton
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === "sending"}
        className="w-full"
      >
        {status === "sending" ? "Sending link…" : "Email me a magic link"}
      </ShineButton>

      <p className="text-[11px] uppercase tracking-wider text-white/40 text-center pt-2">
        No spam. No passwords.
      </p>
    </form>
  );
}
