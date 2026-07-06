import type { Metadata } from "next";
import { LogIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GridBackground } from "@/components/ui/grid-background";
import { Orbs } from "@/components/ui/orbs";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = {
  title: "Sign in — Inovers",
  description: "Sign in to Inovers with a one-time magic link.",
};

export default function SignInPage() {
  return (
    <section className="relative isolate overflow-hidden min-h-[calc(100svh-80px)] flex items-center pt-28 pb-16">
      <div aria-hidden className="absolute inset-0 bg-noise" />
      <GridBackground />
      <Orbs variant="cool" />

      <div className="container-page relative max-w-md mx-auto">
        <div className="text-center mb-8">
          <Badge icon={<LogIn className="h-3 w-3" />}>Sign in to Inovers</Badge>
          <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.05] text-white">
            Welcome back,
            <br />
            <span className="text-gradient">builder.</span>
          </h1>
          <p className="mt-4 text-white/60">
            We&apos;ll email you a magic link. No passwords, ever.
          </p>
        </div>

        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-2 rounded-[28px] bg-gradient-to-br from-[var(--neon-cyan)]/20 via-[var(--neon-violet)]/15 to-transparent blur-2xl"
          />
          <div className="relative glass-strong rounded-3xl p-7 md:p-8">
            <SignInForm />
          </div>
        </div>
      </div>
    </section>
  );
}
