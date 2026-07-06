/**
 * Accelerator FAQ — single source for /accelerator/faq, the landing-page FAQ
 * section, and FAQPage structured data. Honest answers only: unresolved
 * policy says so explicitly instead of inventing terms.
 */

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

const PENDING = "Final details will be published before applications open.";

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "The program",
    items: [
      {
        q: "What is Inovers Accelerator?",
        a: "A 12-week founder acceleration program for ambitious people building companies that matter. Ten startups are selected per cohort and receive up to ₹5 lakh investment, an intensive building environment, weekly reviews, product and go-to-market support, and a Demo Day in front of invited investors and operators.",
      },
      {
        q: "How long is the program?",
        a: "12 weeks — roughly three months of focused, full-time execution.",
      },
      {
        q: "How many startups will be selected?",
        a: "The target for Cohort 01 is 10 startups.",
      },
      {
        q: "What happens during the 12 weeks?",
        a: "Five phases: destroy assumptions (weeks 1–2), build what people need (3–5), find the signal (6–8), become a company (9–10), and prepare to raise (11–12). Weekly cadence includes metrics reviews, build sprints, customer work, mentor sessions, and a Friday ship day. See the Program page for the full structure.",
      },
      {
        q: "Will Inovers build our product for us?",
        a: "No. Founders build. Inovers provides structure, reviews, technical and product support, AI building infrastructure, and people who have done it before — but the company is yours to build.",
      },
      {
        q: "What happens after the program?",
        a: "Demo Day, then the lifetime Inovers network: the cohort, alumni, mentors, and the wider community. The relationship doesn't end at week 12.",
      },
    ],
  },
  {
    title: "Who can apply",
    items: [
      {
        q: "Who can apply?",
        a: "Anyone seriously committed to building a company from India — idea-stage founders, pre-product teams, technical and non-technical founders, students, researchers, operators leaving careers, repeat founders, solo founders, and teams.",
      },
      {
        q: "Can idea-stage founders apply?",
        a: "Yes. The program is designed for idea-stage and very early-stage startups. You do not need a product, revenue, or a deck.",
      },
      {
        q: "Do I need an incorporated company to apply?",
        a: "No. You can apply before incorporating. Incorporation and related eligibility will matter at the investment stage, and we will guide selected founders through it.",
      },
      {
        q: "Can solo founders apply?",
        a: "Yes. Co-founder teams are common in accelerators, but exceptional solo founders are absolutely considered.",
      },
      {
        q: "Can students apply?",
        a: "Yes — if you can commit seriously to the program. Selected founders are expected to work on their company full-time during the 12 weeks.",
      },
      {
        q: "Can non-technical founders apply?",
        a: "Yes. Exceptional domain insight, customer obsession, and commitment matter as much as the ability to write code. Be honest in your application about who builds the product.",
      },
      {
        q: "Do I need to be from Bihar?",
        a: "No. Inovers Accelerator is national. Founders from anywhere in India can apply — founders from Tier-2 and Tier-3 cities are especially encouraged.",
      },
      {
        q: "Can startups that have already raised money apply?",
        a: "Yes. If you have raised a small angel or pre-seed round, you can still apply. Tell us about previous funding in the application.",
      },
      {
        q: "Can founders apply again in the future?",
        a: "Yes. Rejection from one cohort says nothing permanent. Some of the best companies come from founders who applied more than once.",
      },
    ],
  },
  {
    title: "Logistics",
    items: [
      {
        q: "Do I need to relocate? Is the program residential?",
        a: `Detailed participation, workspace, and accommodation arrangements will be communicated to selected startups. ${PENDING}`,
      },
      {
        q: "When will applications open?",
        a: `Applications for INOVERS 01 open soon. Join early access to be notified the moment they do. ${PENDING}`,
      },
      {
        q: "When will Cohort 01 begin?",
        a: `The program is targeted for Winter 2026–27. ${PENDING}`,
      },
    ],
  },
  {
    title: "Investment & terms",
    items: [
      {
        q: "Does Inovers invest ₹5 lakh in every selected company?",
        a: "Selected startups are eligible for up to ₹5,00,000 investment, subject to final eligibility, due diligence, legal documentation, the investment instrument, and Standard Deal terms.",
      },
      {
        q: "What equity does Inovers take?",
        a: `The final equity, security type, valuation, and investment instrument will be disclosed before founders accept an offer and will be governed by definitive legal documentation. ${PENDING}`,
      },
      {
        q: "What investment instrument will be used?",
        a: `The investment instrument is being finalized with counsel and will be disclosed before any founder signs. ${PENDING}`,
      },
      {
        q: "Is there an application fee?",
        a: "No. There is no application fee, and there never will be a fee to apply to Inovers Accelerator.",
      },
      {
        q: "Will Inovers introduce us to investors?",
        a: "The program includes fundraising preparation and investor exposure, including Demo Day. Introductions are facilitated where relevant — they are not guaranteed, and no accelerator can honestly guarantee them.",
      },
      {
        q: "Is funding after Demo Day guaranteed?",
        a: "No. Demo Day puts your progress in front of invited investors and operators. What happens next depends on what you built. We prepare you to make that case as strongly as possible.",
      },
    ],
  },
];

export const FAQ_FLAT: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.items);
