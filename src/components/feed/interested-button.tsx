"use client";

import { useOptimistic, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Users, Check } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type Props = {
  ideaId: string;
  initialCount: number;
  initialInterested: boolean;
  currentUserId: string | null;
};

export function InterestedButton({
  ideaId,
  initialCount,
  initialInterested,
  currentUserId,
}: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [state, setState] = useState({
    count: initialCount,
    mine: initialInterested,
  });
  const [optimistic, applyOptimistic] = useOptimistic(
    state,
    (s, next: { count: number; mine: boolean }) => next
  );
  const [pending, setPending] = useState(false);

  async function toggle() {
    if (!currentUserId) {
      router.push("/sign-in");
      return;
    }
    if (pending) return;
    setPending(true);

    const next = {
      count: optimistic.mine ? Math.max(0, optimistic.count - 1) : optimistic.count + 1,
      mine: !optimistic.mine,
    };
    startTransition(() => applyOptimistic(next));

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setPending(false);
      return;
    }

    if (optimistic.mine) {
      await supabase
        .from("idea_interests")
        .delete()
        .eq("idea_id", ideaId)
        .eq("user_id", currentUserId);
    } else {
      await supabase
        .from("idea_interests")
        .insert({ idea_id: ideaId, user_id: currentUserId });
    }

    setState(next);
    setPending(false);
    router.refresh();
  }

  const mine = optimistic.mine;

  return (
    <button
      type="button"
      onClick={toggle}
      className={`group inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors ${
        mine
          ? "border-[var(--neon-cyan)]/40 bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)]"
          : "border-white/10 bg-white/[0.02] text-white/70 hover:text-white hover:border-white/25"
      }`}
    >
      {mine ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Users className="h-3.5 w-3.5" />
      )}
      {mine ? "Interested" : "I'm in"}
      <span className="ml-1 text-white/40">· {optimistic.count}</span>
    </button>
  );
}
