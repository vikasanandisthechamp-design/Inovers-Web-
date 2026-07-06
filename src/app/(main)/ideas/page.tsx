import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lightbulb, LogIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ShineButton } from "@/components/ui/shine-button";
import { GridBackground } from "@/components/ui/grid-background";
import { Orbs } from "@/components/ui/orbs";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { IdeaComposer } from "@/components/feed/idea-composer";
import { IdeaCard, type IdeaCardData } from "@/components/feed/idea-card";

export const metadata: Metadata = {
  title: "Idea Wall — Inovers",
  description:
    "The live feed of ideas from the Inovers community. Post. Signal interest. Form a Pod.",
};

export const dynamic = "force-dynamic";

export default async function IdeasPage() {
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return <NotConfigured />;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: ideasRaw } = await supabase
    .from("ideas")
    .select(
      "id, created_at, title, problem, proposal, tags, skills_needed, stage, interested_count, author_id"
    )
    .order("created_at", { ascending: false })
    .limit(40);

  // Fetch author profiles in a single query (avoids typing gymnastics with embedded joins).
  const authorIds = Array.from(
    new Set((ideasRaw ?? []).map((i) => i.author_id).filter(Boolean))
  );
  let profileMap = new Map<string, { name: string | null; city: string | null }>();
  if (authorIds.length) {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, name, city")
      .in("id", authorIds);
    profileMap = new Map(
      (profiles ?? []).map((p) => [p.id, { name: p.name, city: p.city }])
    );
  }

  // Fetch the current user's interests so we know which buttons to pre-check.
  let myInterests = new Set<string>();
  let myProfile: { name: string | null; city: string | null } | null = null;
  if (user) {
    const { data: interests } = await supabase
      .from("idea_interests")
      .select("idea_id")
      .eq("user_id", user.id);
    myInterests = new Set((interests ?? []).map((r) => r.idea_id));

    const { data: me } = await supabase
      .from("profiles")
      .select("name, city")
      .eq("id", user.id)
      .maybeSingle();
    myProfile = me ?? {
      name: user.email?.split("@")[0] ?? "Innovator",
      city: null,
    };
  }

  const ideas: IdeaCardData[] = (ideasRaw ?? []).map((i) => ({
    id: i.id,
    created_at: i.created_at,
    title: i.title,
    problem: i.problem,
    proposal: i.proposal,
    tags: i.tags,
    skills_needed: i.skills_needed,
    interested_count: i.interested_count,
    stage: i.stage,
    author: profileMap.get(i.author_id) ?? null,
  }));

  return (
    <>
      {/* Top of page */}
      <section className="relative isolate overflow-hidden pt-32 pb-10 md:pt-40 md:pb-14">
        <div aria-hidden className="absolute inset-0 bg-noise" />
        <GridBackground />
        <Orbs />

        <div className="container-page relative max-w-3xl">
          <Badge icon={<Lightbulb className="h-3 w-3" />}>Idea Wall · Live</Badge>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.02] text-white">
            The feed where ideas
            <br />
            <span className="text-gradient">find their people.</span>
          </h1>
          <p className="mt-5 text-white/60 text-lg leading-relaxed max-w-xl">
            Drop a problem. Sketch a proposal. Tag the skills you need.
            Watch innovators from across Bharat signal in.
          </p>
        </div>
      </section>

      {/* Feed */}
      <section className="container-page max-w-3xl pb-24">
        {user && myProfile ? (
          <div className="mb-8">
            <IdeaComposer
              authorId={user.id}
              authorName={myProfile.name ?? "Innovator"}
            />
          </div>
        ) : (
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm text-white font-medium">
                Sign in to post an idea or signal interest
              </div>
              <div className="text-xs text-white/55 mt-0.5">
                Magic-link sign in. No passwords.
              </div>
            </div>
            <ShineButton href="/sign-in" variant="primary" size="md">
              <LogIn className="h-3.5 w-3.5" /> Sign in
            </ShineButton>
          </div>
        )}

        {ideas.length === 0 ? (
          <EmptyFeed authed={!!user} />
        ) : (
          <div className="flex flex-col gap-4">
            {ideas.map((idea) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                currentUserId={user?.id ?? null}
                isInterested={myInterests.has(idea.id)}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function EmptyFeed({ authed }: { authed: boolean }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center">
      <div className="mx-auto h-12 w-12 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-[var(--neon-cyan)]">
        <Lightbulb className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">
        The wall is quiet — for now.
      </h3>
      <p className="mt-2 text-white/60 max-w-sm mx-auto text-sm">
        {authed
          ? "Drop the first idea. Even one sentence is enough to start."
          : "Be the first to post. Sign in and drop an idea."}
      </p>
      {!authed && (
        <div className="mt-6 flex justify-center">
          <ShineButton href="/sign-in" variant="primary" size="md">
            Sign in to post <ArrowRight className="h-4 w-4" />
          </ShineButton>
        </div>
      )}
    </div>
  );
}

function NotConfigured() {
  return (
    <section className="relative isolate overflow-hidden min-h-[calc(100svh-80px)] flex items-center pt-32 pb-20">
      <div aria-hidden className="absolute inset-0 bg-noise" />
      <GridBackground />
      <Orbs />
      <div className="container-page relative max-w-2xl text-center">
        <Badge icon={<Lightbulb className="h-3 w-3" />}>Coming in Beta</Badge>
        <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.0] text-white">
          The Idea Wall
          <br />
          <span className="text-gradient">is almost live.</span>
        </h1>
        <p className="mt-6 text-white/65 text-lg leading-relaxed max-w-md mx-auto">
          Founding Innovators get the first invite. Drop your details and
          we&apos;ll open the gates the day we ship.
        </p>
        <div className="mt-9 flex justify-center">
          <Link
            href="/waitlist"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-white text-[var(--bg-base)] px-7 text-[15px] font-semibold"
          >
            Join the Waitlist <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
