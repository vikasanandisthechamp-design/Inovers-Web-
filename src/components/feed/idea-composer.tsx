"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Send, Sparkles } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { ShineButton } from "@/components/ui/shine-button";

const schema = z.object({
  title: z.string().trim().min(6, "A crisp one-liner helps").max(120),
  problem: z.string().trim().min(20, "What's the problem you're solving?").max(2000),
  proposal: z.string().trim().min(20, "Sketch your proposal — even a paragraph").max(2000),
  tags: z.string().trim().max(120).optional().or(z.literal("")),
  skills: z.string().trim().max(120).optional().or(z.literal("")),
});

export function IdeaComposer({ authorId, authorName }: { authorId: string; authorName: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setSending(true);

    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      title: form.get("title"),
      problem: form.get("problem"),
      proposal: form.get("proposal"),
      tags: form.get("tags") ?? "",
      skills: form.get("skills") ?? "",
    });

    if (!parsed.success) {
      setErr(parsed.error.issues[0]?.message ?? "Check your inputs");
      setSending(false);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setErr("Not configured yet.");
      setSending(false);
      return;
    }

    const toArray = (s?: string) =>
      (s ?? "")
        .split(/[,\s]+/)
        .map((t) => t.trim().replace(/^#/, ""))
        .filter(Boolean)
        .slice(0, 8);

    const { error } = await supabase.from("ideas").insert({
      author_id: authorId,
      title: parsed.data.title,
      problem: parsed.data.problem,
      proposal: parsed.data.proposal,
      tags: toArray(parsed.data.tags),
      skills_needed: toArray(parsed.data.skills),
    });

    setSending(false);
    if (error) {
      setErr(error.message);
      return;
    }

    (e.target as HTMLFormElement).reset();
    setOpen(false);
    startTransition(() => router.refresh());
  }

  const initials = authorName
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-3 rounded-2xl glass p-4 text-left transition-colors hover:border-white/20"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white bg-gradient-to-br from-[#5cd4ff] to-[#a78bfa]">
          {initials || "??"}
        </span>
        <span className="flex-1 text-white/55 group-hover:text-white/80">
          Drop an idea — problem, proposal, skills needed…
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/50">
          <Sparkles className="h-3 w-3 text-[var(--neon-cyan)]" /> Post
        </span>
      </button>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl glass p-5 md:p-6 space-y-3">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white bg-gradient-to-br from-[#5cd4ff] to-[#a78bfa]">
          {initials || "??"}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-sm text-white">{authorName}</div>
          <div className="text-[11px] text-white/45">Posting publicly to the Idea Wall</div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs text-white/45 hover:text-white/80"
        >
          Cancel
        </button>
      </div>

      <input
        name="title"
        placeholder="One-line idea (e.g. Solar irrigation for smallholder farmers)"
        className="w-full h-12 rounded-xl bg-white/[0.03] border border-white/10 px-4 text-[15px] text-white placeholder:text-white/30 outline-none focus:border-white/30"
      />
      <textarea
        name="problem"
        rows={3}
        placeholder="The problem — who hurts, why now?"
        className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30"
      />
      <textarea
        name="proposal"
        rows={3}
        placeholder="Your proposal — how would you solve it?"
        className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30"
      />
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          name="tags"
          placeholder="#tags (e.g. climate, agri)"
          className="h-11 rounded-xl bg-white/[0.03] border border-white/10 px-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30"
        />
        <input
          name="skills"
          placeholder="skills needed (e.g. iot, policy)"
          className="h-11 rounded-xl bg-white/[0.03] border border-white/10 px-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30"
        />
      </div>

      {err && (
        <div className="rounded-xl border border-[var(--neon-pink)]/30 bg-[var(--neon-pink)]/[0.06] px-4 py-2.5 text-sm text-[var(--neon-pink)]">
          {err}
        </div>
      )}

      <div className="flex items-center justify-end gap-2 pt-1">
        <ShineButton
          type="submit"
          variant="primary"
          size="md"
          disabled={sending || pending}
        >
          {sending ? "Posting…" : "Post idea"}
          <Send className="h-3.5 w-3.5" />
        </ShineButton>
      </div>
    </form>
  );
}
