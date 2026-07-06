/**
 * INOVERS ACCELERATOR — central cohort configuration.
 *
 * Every accelerator surface (homepage takeover, /accelerator/*, CTAs, SEO,
 * structured data) reads from this file. Update dates, status, and copy here
 * — never inline in components.
 *
 * Business/legal fields left `null` are intentionally unresolved. Components
 * must degrade gracefully (e.g. no countdown without a confirmed open date).
 */

export type ApplicationStatus =
  | "COMING_SOON"
  | "APPLICATIONS_OPEN"
  | "APPLICATIONS_CLOSED"
  | "REVIEWING"
  | "INTERVIEWS"
  | "COHORT_SELECTED"
  | "PROGRAM_LIVE"
  | "DEMO_DAY"
  | "ALUMNI";

export interface SelectionStage {
  code: string;
  title: string;
  detail: string;
}

export interface ProgramPhase {
  code: string;
  title: string;
  weeks: string;
  mandate: string;
  items: string[];
}

export interface CohortConfig {
  /** Master brand — do not change. */
  brand: "INOVERS";
  programName: string;
  cohortName: string;
  cohortCode: string;
  applicationStatus: ApplicationStatus;
  /** ISO dates. null = not yet confirmed → dependent UI (countdowns) stays off. */
  applicationOpenDate: string | null;
  applicationDeadline: string | null;
  programStartDate: string | null;
  programEndDate: string | null;
  demoDayDate: string | null;
  /** Human-readable window used while exact dates are unconfirmed. */
  programWindowLabel: string;
  investmentAmountLabel: string;
  investmentAmountINR: number;
  numberOfCompanies: number;
  programDurationWeeks: number;
  location: string;
  applicationFee: "none";
  /** Whether the founder residency/accommodation is confirmed. */
  residencyConfirmed: boolean;
  videoRequired: boolean;
  eligibility: string[];
  selectionStages: SelectionStage[];
  phases: ProgramPhase[];
  weeklyCadence: { day: string; focus: string }[];
  confirmedBenefits: string[];
  potentialOpportunities: string[];
  nonGuarantees: string[];
  legal: {
    dealDisclaimer: string;
    investmentNote: string;
    processNote: string;
  };
}

export const COHORT: CohortConfig = {
  brand: "INOVERS",
  programName: "Inovers Accelerator",
  cohortName: "INOVERS 01",
  cohortCode: "INV-01",

  applicationStatus: "COMING_SOON",
  applicationOpenDate: null,
  applicationDeadline: null,
  programStartDate: null,
  programEndDate: null,
  demoDayDate: null,
  programWindowLabel: "Winter 2026–27",

  investmentAmountLabel: "Up to ₹5,00,000",
  investmentAmountINR: 500000,
  numberOfCompanies: 10,
  programDurationWeeks: 12,
  location: "India",
  applicationFee: "none",
  residencyConfirmed: false,
  videoRequired: false,

  eligibility: [
    "Idea-stage and very early-stage startups",
    "Solo founders and founding teams",
    "Founders anywhere in India — Tier-2 and Tier-3 cities especially welcome",
    "Full-time commitment for the 12 weeks",
    "No revenue, connections, or incorporation required to apply",
  ],

  selectionStages: [
    {
      code: "S1",
      title: "Application",
      detail: "A focused written application. No deck required.",
    },
    {
      code: "S2",
      title: "Initial review",
      detail: "Every application is read. Strong ones move fast.",
    },
    {
      code: "S3",
      title: "Founder interview",
      detail: "A direct conversation about the problem, the insight, and you.",
    },
    {
      code: "S4",
      title: "Deep-dive & diligence",
      detail: "Evidence, references, and eligibility checks.",
    },
    {
      code: "S5",
      title: "Final selection",
      detail: "Ten companies are selected for the cohort.",
    },
    {
      code: "S6",
      title: "Standard investment documents",
      detail: "Full terms disclosed and signed before the program begins.",
    },
  ],

  phases: [
    {
      code: "PHASE 01",
      title: "Destroy assumptions",
      weeks: "Weeks 1–2",
      mandate: "Kill weak assumptions before they kill the company.",
      items: [
        "Founder diagnostic",
        "Problem validation",
        "Customer interviews",
        "Market mapping",
        "Competitor analysis",
        "Founder–market fit",
        "Define measurable 12-week outcomes",
      ],
    },
    {
      code: "PHASE 02",
      title: "Build what people need",
      weeks: "Weeks 3–5",
      mandate: "Ship weekly. Test with real users.",
      items: [
        "MVP architecture",
        "Rapid prototyping",
        "AI-enabled development",
        "Product design",
        "User testing",
        "Analytics",
        "Weekly shipping cadence",
      ],
    },
    {
      code: "PHASE 03",
      title: "Find the signal",
      weeks: "Weeks 6–8",
      mandate: "Evidence beats opinion.",
      items: [
        "Acquire first users",
        "Customer feedback loops",
        "Pricing experiments",
        "Distribution",
        "Sales systems",
        "Retention",
        "Unit economics",
        "Growth experiments",
      ],
    },
    {
      code: "PHASE 04",
      title: "Become a company",
      weeks: "Weeks 9–10",
      mandate: "A product becomes an institution.",
      items: [
        "Company structure",
        "Finance",
        "Compliance",
        "Hiring strategy",
        "Cap table",
        "Governance",
        "Metrics",
        "Data room",
      ],
    },
    {
      code: "PHASE 05",
      title: "Prepare to raise",
      weeks: "Weeks 11–12",
      mandate: "Walk into any room with evidence.",
      items: [
        "Fundraising strategy",
        "Investor narrative",
        "Pitch deck",
        "Financial model",
        "Due diligence preparation",
        "Pitch practice",
        "Investor meetings where appropriate",
        "Demo Day preparation",
      ],
    },
  ],

  weeklyCadence: [
    { day: "Monday", focus: "Metrics review + founder accountability" },
    { day: "Tuesday", focus: "Build sprint + product office hours" },
    { day: "Wednesday", focus: "Customers + sales + distribution" },
    { day: "Thursday", focus: "Mentor sessions + specialist clinics" },
    { day: "Friday", focus: "Ship day + weekly demo" },
    { day: "Saturday", focus: "Founder sessions / fireside conversations / community" },
    { day: "Sunday", focus: "Optional reset + independent building" },
  ],

  confirmedBenefits: [
    "Up to ₹5 lakh investment for selected startups",
    "12-week intensive accelerator",
    "Cohort of 10 selected companies",
    "Weekly founder reviews",
    "Product & technology support",
    "AI building infrastructure",
    "Customer discovery systems",
    "Go-to-market support",
    "Legal & financial readiness",
    "Fundraising preparation",
    "Demo Day",
    "Lifetime Inovers network",
  ],

  potentialOpportunities: [
    "Mentor office hours with experienced operators",
    "Investor exposure during and after the program",
    "Partner credits and infrastructure discounts",
    "Follow-on support for the strongest companies",
  ],

  nonGuarantees: [
    "Funding after Demo Day is not guaranteed",
    "Investor introductions are facilitated, not promised",
    "Specific mentors and partners are announced only once confirmed",
  ],

  legal: {
    dealDisclaimer:
      "The information on this page is for general program information and does not constitute an offer to invest, financial advice, legal advice, or a binding commitment to fund any applicant. Investment is subject to selection, due diligence, eligibility, approvals, definitive agreements, and applicable law.",
    investmentNote:
      "The final equity, security type, valuation, investment instrument, governance rights, and legal terms will be disclosed before founders accept an offer and will be governed by definitive legal documentation.",
    processNote:
      "The exact selection process may evolve for Cohort 01. Final details will be published before applications open.",
  },
};

/* ---------------------------------------------------------------------- */
/* Application status engine                                               */
/* ---------------------------------------------------------------------- */

export interface StatusUi {
  /** Short machine-ish label shown in status pills. */
  pill: string;
  /** Primary call to action. */
  cta: { label: string; href: string };
  /** One-line status sentence for heroes and cards. */
  line: string;
  /** Whether the application form accepts submissions. */
  applicationsOpen: boolean;
}

const STATUS_UI: Record<ApplicationStatus, StatusUi> = {
  COMING_SOON: {
    pill: "APPLICATIONS OPENING SOON",
    cta: { label: "Get early access", href: "/accelerator/apply" },
    line: "Applications opening soon for the inaugural cohort.",
    applicationsOpen: false,
  },
  APPLICATIONS_OPEN: {
    pill: "APPLICATIONS OPEN",
    cta: { label: "Apply now", href: "/accelerator/apply" },
    line: "Applications are open for the inaugural cohort.",
    applicationsOpen: true,
  },
  APPLICATIONS_CLOSED: {
    pill: "APPLICATIONS CLOSED",
    cta: { label: "Get notified for the next cohort", href: "/accelerator/apply" },
    line: "Applications for this cohort have closed.",
    applicationsOpen: false,
  },
  REVIEWING: {
    pill: "APPLICATIONS UNDER REVIEW",
    cta: { label: "Get notified for the next cohort", href: "/accelerator/apply" },
    line: "Applications are under review.",
    applicationsOpen: false,
  },
  INTERVIEWS: {
    pill: "INTERVIEWS IN PROGRESS",
    cta: { label: "Get notified for the next cohort", href: "/accelerator/apply" },
    line: "Founder interviews are in progress.",
    applicationsOpen: false,
  },
  COHORT_SELECTED: {
    pill: "COHORT SELECTED",
    cta: { label: "Meet Cohort 01", href: "/accelerator/companies" },
    line: "The cohort has been selected.",
    applicationsOpen: false,
  },
  PROGRAM_LIVE: {
    pill: "PROGRAM LIVE",
    cta: { label: "Follow the cohort", href: "/accelerator/companies" },
    line: "The cohort is building. 12 weeks. No spectators.",
    applicationsOpen: false,
  },
  DEMO_DAY: {
    pill: "DEMO DAY",
    cta: { label: "Request Demo Day access", href: "/accelerator/apply" },
    line: "Demo Day is here.",
    applicationsOpen: false,
  },
  ALUMNI: {
    pill: "ALUMNI",
    cta: { label: "Explore the companies", href: "/accelerator/companies" },
    line: "The companies are out in the world.",
    applicationsOpen: false,
  },
};

export function getStatusUi(
  status: ApplicationStatus = COHORT.applicationStatus
): StatusUi {
  return STATUS_UI[status];
}

/** True only when a real, confirmed open date exists — never fake a countdown. */
export function hasConfirmedOpenDate(cohort: CohortConfig = COHORT): boolean {
  return Boolean(cohort.applicationOpenDate);
}

export function formatCohortDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Homepage campaign switch — set false to retire the takeover instantly. */
export const HOMEPAGE_CAMPAIGN_ENABLED = true;
