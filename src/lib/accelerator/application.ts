/**
 * Application form model — step definitions, validation, and helpers.
 * Kept framework-free so it can be unit-tested and reused by a future
 * admin/review surface.
 */

import { z } from "zod";

export const APPLICATION_DRAFT_KEY = "inovers_application_draft_INV-01";

const optionalUrl = z
  .string()
  .trim()
  .url("That doesn't look like a URL")
  .max(300)
  .optional()
  .or(z.literal(""));

const shortText = (msg: string, min = 2, max = 200) =>
  z.string().trim().min(min, msg).max(max);

const longText = (msg: string, min = 20, max = 2000) =>
  z.string().trim().min(min, msg).max(max);

export const stepSchemas = {
  founder: z.object({
    fullName: shortText("Your full name"),
    email: z.string().trim().toLowerCase().email("Use a real email"),
    phone: z
      .string()
      .trim()
      .regex(/^[+\d][\d\s-]{7,15}$/, "Use a valid phone number"),
    city: shortText("Which city are you in?"),
    linkedin: optionalUrl,
    portfolio: optionalUrl,
    founderStatus: z.enum(["solo", "team"]),
    commitment: z.enum(["full_time_now", "full_time_if_selected", "not_full_time"]),
  }),

  company: z.object({
    startupName: shortText("What do you call it? A working name is fine."),
    website: optionalUrl,
    incorporated: z.enum(["yes", "no", "in_progress"]),
    location: shortText("Where is the team based?"),
    industry: shortText("Industry or sector"),
    stage: z.enum(["idea", "prototype", "launched", "revenue"]),
    previousFunding: z.enum(["none", "friends_family", "angel", "institutional"]),
    revenueStatus: z.enum(["pre_revenue", "early_revenue", "growing_revenue"]),
  }),

  building: z.object({
    description: longText("Describe the company — aim for ~50 words", 20, 600),
    problem: longText("What problem are you solving?"),
    who: longText("Who desperately needs this?", 10, 1000),
    alternatives: longText("What are people doing today instead?", 10, 1000),
    different: longText("Why is your approach different?", 10, 1000),
  }),

  evidence: z.object({
    built: longText("What have you built so far? 'Nothing yet' is a valid answer — say why.", 5, 2000),
    users: z.string().trim().max(300).optional().or(z.literal("")),
    revenue: z.string().trim().max(300).optional().or(z.literal("")),
    growth: z.string().trim().max(300).optional().or(z.literal("")),
    pilots: z.string().trim().max(600).optional().or(z.literal("")),
    prototypeUrl: optionalUrl,
    demoUrl: optionalUrl,
    deckUrl: optionalUrl,
  }),

  founders: z.object({
    knownDuration: z.string().trim().max(300).optional().or(z.literal("")),
    howMet: z.string().trim().max(600).optional().or(z.literal("")),
    whoBuilds: shortText("Who builds the product?", 2, 600),
    whoSells: shortText("Who talks to customers?", 2, 600),
    whyYou: longText("Why are you the right people to build this?"),
  }),

  insight: z.object({
    insight: longText(
      "What do you understand about this problem that most people do not?"
    ),
  }),

  speed: z.object({
    fastThing: longText(
      "What is the most impressive thing you have built or accomplished quickly?"
    ),
  }),

  whyNow: z.object({
    whyNow: longText("Why is now the right time for this company?"),
  }),

  inovers: z.object({
    whyInovers: longText("Why do you want to join Inovers?"),
    twelveWeekGoal: longText("What do you expect to accomplish in 12 weeks?"),
    fullTime: z.enum(["yes", "no"]),
    inPerson: z.enum(["yes", "depends", "no"]),
  }),

  video: z.object({
    videoUrl: optionalUrl,
  }),
} as const;

export type StepKey = keyof typeof stepSchemas;

export type ApplicationDraft = {
  [K in StepKey]?: Partial<z.infer<(typeof stepSchemas)[K]>>;
};

export const STEPS: {
  key: StepKey;
  code: string;
  title: string;
  intro?: string;
}[] = [
  { key: "founder", code: "01", title: "Founder", intro: "Who is applying." },
  { key: "company", code: "02", title: "Company", intro: "What exists today — a working name is enough." },
  { key: "building", code: "03", title: "What are you building?", intro: "Plain words beat pitch language." },
  { key: "evidence", code: "04", title: "Evidence", intro: "Whatever exists: numbers, links, learnings. Honesty reads well." },
  { key: "founders", code: "05", title: "Founders", intro: "Solo founders: answer for yourself." },
  { key: "insight", code: "06", title: "Insight", intro: "The thing you know that others overlook." },
  { key: "speed", code: "07", title: "Speed", intro: "Evidence you move fast." },
  { key: "whyNow", code: "08", title: "Why now?", intro: "Timing is a founder's edge." },
  { key: "inovers", code: "09", title: "Inovers", intro: "Why this program, and what you'll do with it." },
  { key: "video", code: "10", title: "Founder video", intro: "Optional. Max 60 seconds: introduce the founders and tell us what you are building." },
];

/** Zod's type-level defaults read poorly on a form — humanize them. */
function humanize(message: string): string {
  if (message.startsWith("Invalid input")) return "This field is required.";
  if (message.startsWith("Invalid option")) return "Select an option.";
  return message;
}

/** Validate one step; returns field errors keyed by field name (empty = valid). */
export function validateStep(
  key: StepKey,
  data: unknown
): Record<string, string> {
  const parsed = stepSchemas[key].safeParse(data ?? {});
  if (parsed.success) return {};
  const errs: Record<string, string> = {};
  for (const issue of parsed.error.issues) {
    const k = String(issue.path[0] ?? "");
    if (k && !errs[k]) errs[k] = humanize(issue.message);
  }
  return errs;
}

/** Validate the whole application; returns map of stepKey → errors. */
export function validateAll(draft: ApplicationDraft): Partial<Record<StepKey, Record<string, string>>> {
  const out: Partial<Record<StepKey, Record<string, string>>> = {};
  for (const s of STEPS) {
    const errs = validateStep(s.key, draft[s.key]);
    if (Object.keys(errs).length > 0) out[s.key] = errs;
  }
  return out;
}

/** Human-friendly unique application code, e.g. INV01-7K3M9Q. */
export function generateApplicationCode(random: () => number = Math.random): string {
  const alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"; // no 0/O/1/I/L
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += alphabet[Math.floor(random() * alphabet.length)];
  }
  return `INV01-${code}`;
}
