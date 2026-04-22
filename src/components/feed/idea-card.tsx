import Link from "next/link";
import { MessageCircle, MapPin } from "lucide-react";
import { InterestedButton } from "./interested-button";

export type IdeaCardData = {
  id: string;
  created_at: string;
  title: string;
  problem: string;
  proposal: string;
  tags: string[] | null;
  skills_needed: string[] | null;
  interested_count: number;
  stage: string;
  author: { name: string | null; city: string | null } | null;
};

const stageStyles: Record<string, string> = {
  spark: "bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] border-[var(--neon-cyan)]/25",
  validate: "bg-[var(--neon-violet)]/10 text-[var(--neon-violet)] border-[var(--neon-violet)]/25",
  pod_form: "bg-[var(--neon-pink)]/10 text-[var(--neon-pink)] border-[var(--neon-pink)]/25",
  blueprint: "bg-[var(--neon-ember)]/10 text-[var(--neon-ember)] border-[var(--neon-ember)]/25",
  execute: "bg-emerald-400/10 text-emerald-300 border-emerald-400/25",
  impact: "bg-amber-400/10 text-amber-300 border-amber-400/25",
};

function initialsOf(name: string | null | undefined) {
  return (name ?? "??")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function timeAgo(iso: string) {
  const d = new Date(iso).getTime();
  const s = Math.max(1, Math.floor((Date.now() - d) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function IdeaCard({
  idea,
  currentUserId,
  isInterested,
}: {
  idea: IdeaCardData;
  currentUserId: string | null;
  isInterested: boolean;
}) {
  const name = idea.author?.name ?? "An innovator";
  const city = idea.author?.city;

  return (
    <article className="group relative rounded-2xl glass p-5 md:p-6 transition-colors hover:border-white/20">
      <header className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white bg-gradient-to-br from-[#5cd4ff] to-[#a78bfa]">
          {initialsOf(name)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-sm text-white truncate">
            {name}
            {city && (
              <span className="text-white/40 font-normal"> · {city}</span>
            )}
          </div>
          <div className="text-[11px] text-white/40">
            {timeAgo(idea.created_at)}
          </div>
        </div>
        <span
          className={`rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wider ${
            stageStyles[idea.stage] ?? stageStyles.spark
          }`}
        >
          {idea.stage.replace("_", " ")}
        </span>
      </header>

      <h3 className="mt-4 text-lg md:text-xl font-medium text-white tracking-tight leading-snug">
        {idea.title}
      </h3>

      <div className="mt-3 space-y-2 text-sm text-white/70 leading-relaxed">
        <p>
          <span className="text-white/40 uppercase tracking-wider text-[10px] mr-2">Problem</span>
          {idea.problem}
        </p>
        <p>
          <span className="text-white/40 uppercase tracking-wider text-[10px] mr-2">Proposal</span>
          {idea.proposal}
        </p>
      </div>

      {(idea.tags?.length || idea.skills_needed?.length) ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {idea.tags?.map((t) => (
            <span
              key={`t-${t}`}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/60"
            >
              #{t}
            </span>
          ))}
          {idea.skills_needed?.map((s) => (
            <span
              key={`s-${s}`}
              className="rounded-full border border-[var(--neon-violet)]/25 bg-[var(--neon-violet)]/10 px-2 py-0.5 text-[10px] text-[var(--neon-violet)]"
            >
              need: {s}
            </span>
          ))}
        </div>
      ) : null}

      <footer className="mt-5 flex items-center gap-3 pt-4 border-t border-white/[0.06]">
        <InterestedButton
          ideaId={idea.id}
          initialCount={idea.interested_count}
          initialInterested={isInterested}
          currentUserId={currentUserId}
        />
        <span className="inline-flex items-center gap-1.5 text-[12px] text-white/45">
          <MessageCircle className="h-3.5 w-3.5" />
          Discuss
        </span>
        {city && (
          <span className="ml-auto inline-flex items-center gap-1.5 text-[12px] text-white/45">
            <MapPin className="h-3.5 w-3.5" />
            {city}
          </span>
        )}
      </footer>
    </article>
  );
}
