"use client";

import { useEffect, useMemo, useState } from "react";
import { Section, Reveal } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Activity, MapPin, Users, Lightbulb } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type Kind = "joined" | "idea" | "interest" | "pod";

type Item = {
  kind: Kind;
  who: string;
  city: string;
  what: string;
  ago: string;
};

const seed: Item[] = [
  { kind: "joined",   who: "Priya R.",    city: "Indore",    what: "joined as Founding Innovator", ago: "just now" },
  { kind: "idea",     who: "Ravi K.",     city: "Bengaluru", what: "posted: Solar irrigation for smallholder farmers", ago: "2 min" },
  { kind: "pod",      who: "Pod Surya",   city: "Hyderabad", what: "formed around Civic transport reporting", ago: "8 min" },
  { kind: "interest", who: "Pod Lakshya", city: "Bhopal",    what: "signalled interest in: Anganwadi nutrition tracker", ago: "21 min" },
  { kind: "joined",   who: "Aanya M.",    city: "Pune",      what: "joined as Founding Innovator", ago: "34 min" },
  { kind: "idea",     who: "Karthik V.",  city: "Chennai",   what: "posted: Open dataset for tier-3 city air quality", ago: "1 hr" },
  { kind: "pod",      who: "Pod Disha",   city: "Patna",     what: "added 2 mentors from IIT Patna", ago: "2 hr" },
  { kind: "joined",   who: "Meera S.",    city: "Surat",     what: "joined as Founding Innovator", ago: "3 hr" },
];

const kindMeta: Record<Kind, { icon: React.ReactNode; color: string }> = {
  joined:   { icon: <Users className="h-3.5 w-3.5" />,     color: "text-[var(--neon-cyan)]" },
  idea:     { icon: <Lightbulb className="h-3.5 w-3.5" />, color: "text-[var(--neon-violet)]" },
  interest: { icon: <Activity className="h-3.5 w-3.5" />,  color: "text-[var(--neon-pink)]" },
  pod:      { icon: <MapPin className="h-3.5 w-3.5" />,    color: "text-[var(--neon-ember)]" },
};

function timeAgo(iso: string) {
  const d = new Date(iso).getTime();
  const s = Math.max(1, Math.floor((Date.now() - d) / 1000));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hr`;
  const days = Math.floor(h / 24);
  return `${days} d`;
}

export function LiveActivitySection() {
  const [items, setItems] = useState<Item[]>(seed);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    let cancelled = false;

    async function load() {
      const { data, error } = await supabase!.rpc("recent_activity", { lim: 30 });
      if (cancelled) return;
      if (error || !data || data.length === 0) return;
      setIsLive(true);
      setItems(
        data.map((r) => ({
          kind: r.kind,
          who: r.who,
          city: r.city,
          what: r.what,
          ago: timeAgo(r.created_at),
        }))
      );
    }

    load();

    // Refresh when any underlying table changes (realtime).
    const channel = supabase
      .channel("public-activity")
      .on("postgres_changes", { event: "*", schema: "public", table: "waitlist" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "ideas" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "idea_interests" }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "pods" }, load)
      .subscribe();

    // Also refresh every 45s as a safety net.
    const iv = setInterval(load, 45_000);

    return () => {
      cancelled = true;
      clearInterval(iv);
      supabase.removeChannel(channel);
    };
  }, []);

  // Double up for seamless vertical marquee.
  const loop = useMemo(() => [...items, ...items], [items]);

  return (
    <Section id="live" className="py-24 md:py-32">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <Reveal>
            <Badge
              icon={
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
              }
            >
              {isLive ? "Live across Bharat" : "A simulated glimpse (real data soon)"}
            </Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-white">
              The ecosystem you can{" "}
              <span className="text-gradient">feel breathing</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-white/60 leading-relaxed">
              Every join, every idea, every shipped Pod — surfaced in public.
              Inovers is loud about momentum because momentum compounds.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-3xl glass p-2 h-[460px]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[var(--bg-base)] via-[var(--bg-base)]/80 to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/80 to-transparent"
            />
            <ul className="flex flex-col gap-2.5 px-2 py-3 animate-marquee-y">
              {loop.map((it, i) => {
                const meta = kindMeta[it.kind] ?? kindMeta.joined;
                return (
                  <li
                    key={`${it.who}-${i}`}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] ${meta.color}`}
                    >
                      {meta.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-white truncate">
                        <span className="font-medium">{it.who}</span>
                        <span className="text-white/40"> · {it.city}</span>
                      </div>
                      <div className="text-xs text-white/55 truncate">{it.what}</div>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-white/35 shrink-0">
                      {it.ago}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
