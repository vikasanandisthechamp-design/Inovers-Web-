"use client";

import * as motion from "motion/react-client";
import { Lightbulb, MessageCircle, IndianRupee, Sparkles } from "lucide-react";

type Card = {
  id: string;
  className: string; // absolute positioning + rotation
  delay: number;
  float: number; // seconds per float cycle
  tone: "violet" | "cyan" | "ember" | "pink";
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  meta?: string;
};

const tones = {
  violet: { ring: "#a78bfa", soft: "rgba(167,139,250,0.14)" },
  cyan:   { ring: "#5cd4ff", soft: "rgba(92,212,255,0.14)" },
  ember:  { ring: "#ff9257", soft: "rgba(255,146,87,0.14)" },
  pink:   { ring: "#f472b6", soft: "rgba(244,114,182,0.14)" },
} as const;

const cards: Card[] = [
  {
    id: "idea",
    className: "left-[2%] top-[22%] -rotate-[6deg] hidden md:flex",
    delay: 1.1,
    float: 7,
    tone: "cyan",
    icon: <Lightbulb className="h-4 w-4" />,
    title: "New Idea · Priya R.",
    subtitle: "Solar irrigation kit for smallholder farmers",
    meta: "42 likes · 6 interested",
  },
  {
    id: "chat",
    className: "right-[3%] top-[18%] rotate-[5deg] hidden md:flex",
    delay: 1.35,
    float: 8,
    tone: "violet",
    icon: <MessageCircle className="h-4 w-4" />,
    title: "Pod Surya · 12 online",
    subtitle: "@ravi just joined. Welcome 🚀",
    meta: "3 new messages",
  },
  {
    id: "fund",
    className: "left-[5%] bottom-[15%] rotate-[4deg] hidden lg:flex",
    delay: 1.6,
    float: 9,
    tone: "ember",
    icon: <IndianRupee className="h-4 w-4" />,
    title: "Milestone funded",
    subtitle: "+ ₹50,000 by UP Innovation Mission",
    meta: "Stage 03 released",
  },
  {
    id: "mentor",
    className: "right-[4%] bottom-[18%] -rotate-[6deg] hidden lg:flex",
    delay: 1.85,
    float: 10,
    tone: "pink",
    icon: <Sparkles className="h-4 w-4" />,
    title: "Mentor request",
    subtitle: "Dr. Arjun (AIIMS) offered to mentor",
    meta: "Climate Health",
  },
];

export function FloatingUiCards() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {cards.map((c) => {
        const tone = tones[c.tone];
        return (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
              scale: 1,
            }}
            transition={{
              opacity: { duration: 0.8, delay: c.delay },
              scale: { duration: 0.8, delay: c.delay, ease: [0.2, 0.9, 0.3, 1.2] },
              y: {
                duration: c.float,
                repeat: Infinity,
                ease: "easeInOut",
                delay: c.delay + 0.5,
              },
            }}
            className={`absolute w-[260px] items-start gap-3 rounded-2xl p-4 ${c.className}`}
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
              border: `1px solid ${tone.soft}`,
              backdropFilter: "blur(18px)",
              boxShadow: `0 24px 60px -30px ${tone.soft}, 0 0 0 1px rgba(255,255,255,0.02) inset`,
            }}
          >
            <span
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]"
              style={{ color: tone.ring }}
            >
              {c.icon}
            </span>
            <div className="min-w-0">
              <div className="text-[13px] font-medium text-white truncate">
                {c.title}
              </div>
              <div className="text-[12px] text-white/65 leading-snug mt-0.5 line-clamp-2">
                {c.subtitle}
              </div>
              {c.meta && (
                <div className="mt-2 text-[10px] uppercase tracking-wider text-white/40">
                  {c.meta}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
