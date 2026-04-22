"use client";

import { Section, Reveal } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { MockupFrame } from "@/components/ui/mockup-frame";
import {
  Heart,
  MessageCircle,
  Share2,
  Users,
  Zap,
  IndianRupee,
  Lightbulb,
} from "lucide-react";

/**
 * "What is Inovers" section — told through a product mockup of the actual
 * app feed, so the reader immediately understands: it's a social network
 * for innovators.
 */
export function ProductPreviewSection() {
  return (
    <Section id="product" className="py-28 md:py-36">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <Reveal>
            <Badge>What is Inovers</Badge>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-4xl md:text-5xl lg:text-[56px] font-semibold tracking-[-0.035em] leading-[1.04] text-white">
              A social network,
              <br />
              <span className="text-gradient">engineered for execution.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-white/60 leading-relaxed text-[17px] max-w-md">
              Think Twitter for ideas, LinkedIn for builders, GitHub for
              projects, AngelList for funding — collapsed into a single feed
              designed around one outcome: things shipping.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 space-y-3">
              {[
                { k: "Post an idea", v: "Like a tweet. No pitch decks." },
                { k: "Signal interest", v: "Join Pods with one tap." },
                { k: "Build in the open", v: "Weekly logs · shared credit." },
              ].map((r) => (
                <div key={r.k} className="flex items-baseline gap-4 text-sm">
                  <span className="text-white/85 font-medium w-28 shrink-0">{r.k}</span>
                  <span className="text-white/55">{r.v}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7" y={40}>
          <div className="relative">
            {/* Outer glow */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[32px] bg-gradient-to-br from-[#5cd4ff]/15 via-[#a78bfa]/15 to-transparent blur-3xl"
            />

            <MockupFrame label="inovers.in / feed" className="relative">
              {/* Feed */}
              <div className="grid grid-cols-12 gap-0">
                {/* Sidebar */}
                <aside className="col-span-3 hidden md:flex flex-col gap-1 border-r border-white/[0.05] p-3">
                  {[
                    { icon: <Zap className="h-3.5 w-3.5" />, label: "Feed", active: true },
                    { icon: <Lightbulb className="h-3.5 w-3.5" />, label: "Ideas" },
                    { icon: <Users className="h-3.5 w-3.5" />, label: "Pods" },
                    { icon: <IndianRupee className="h-3.5 w-3.5" />, label: "Funding" },
                  ].map((n) => (
                    <div
                      key={n.label}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] ${
                        n.active
                          ? "bg-white/[0.08] text-white"
                          : "text-white/55"
                      }`}
                    >
                      {n.icon}
                      {n.label}
                    </div>
                  ))}
                </aside>

                {/* Posts */}
                <div className="col-span-12 md:col-span-9 p-4 md:p-5 flex flex-col gap-3">
                  {posts.map((p, i) => (
                    <article
                      key={i}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                    >
                      <header className="flex items-center gap-3">
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold"
                          style={{ background: p.avatar }}
                        >
                          {p.initials}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12.5px] text-white font-medium truncate">
                            {p.name} <span className="text-white/40 font-normal">· {p.handle}</span>
                          </div>
                          <div className="text-[10px] text-white/40">{p.meta}</div>
                        </div>
                        <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/55">
                          {p.tag}
                        </span>
                      </header>
                      <p className="mt-3 text-[13px] text-white/80 leading-relaxed">
                        {p.body}
                      </p>
                      {p.skills && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.skills.map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/60"
                            >
                              #{s}
                            </span>
                          ))}
                        </div>
                      )}
                      <footer className="mt-4 flex items-center gap-5 text-white/50 text-[11px]">
                        <span className="inline-flex items-center gap-1.5">
                          <Heart className="h-3.5 w-3.5" /> {p.likes}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MessageCircle className="h-3.5 w-3.5" /> {p.comments}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" /> {p.interested} interested
                        </span>
                        <Share2 className="ml-auto h-3.5 w-3.5" />
                      </footer>
                    </article>
                  ))}
                </div>
              </div>
            </MockupFrame>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

const posts = [
  {
    name: "Priya R.",
    handle: "@priya_r",
    meta: "Indore · 12 min",
    avatar: "linear-gradient(135deg, #5cd4ff, #a78bfa)",
    initials: "PR",
    tag: "Climate",
    body: "Most smallholder farmers in MP can't afford drip irrigation. Idea: a ₹2,000 solar-pump kit paired with a WhatsApp bot for scheduling. Looking for a hardware hacker + someone with SHG contacts.",
    skills: ["hardware", "iot", "whatsapp-bot"],
    likes: 142,
    comments: 38,
    interested: 17,
  },
  {
    name: "Pod Surya",
    handle: "@pod_surya",
    meta: "Hyderabad · 2 hr",
    avatar: "linear-gradient(135deg, #f472b6, #ff9257)",
    initials: "PS",
    tag: "Civic Tech",
    body: "Stage 03 shipped: Municipal pothole reporting MVP is live in 3 wards. Next: DIVA-integrated validator + monthly heatmap export for commissioners.",
    skills: ["civic", "maps", "dashboard"],
    likes: 318,
    comments: 52,
    interested: 41,
  },
  {
    name: "Arjun V.",
    handle: "@arjun_v",
    meta: "Bengaluru · 6 hr",
    avatar: "linear-gradient(135deg, #a78bfa, #5cd4ff)",
    initials: "AV",
    tag: "AI · EdTech",
    body: "Open-sourced our AI Saturday-tutor prototype for Govt schools. Works on ₹6k Android phones offline. Need education-policy folks to help pilot in 2 states.",
    skills: ["on-device-ai", "education", "policy"],
    likes: 502,
    comments: 87,
    interested: 64,
  },
];
