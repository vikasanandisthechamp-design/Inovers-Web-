import Link from "next/link";
import { COHORT } from "@/lib/accelerator/config";

const cols = [
  {
    title: "Accelerator",
    links: [
      { href: "/accelerator", label: "Overview" },
      { href: "/accelerator/program", label: "12-week program" },
      { href: "/accelerator/deal", label: "The Standard Deal" },
      { href: "/accelerator/companies", label: "Companies" },
      { href: "/accelerator/faq", label: "FAQ" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { href: "/accelerator/apply", label: "Apply / early access" },
      { href: "/accelerator/apply?as=mentor", label: "Become a mentor" },
      { href: "/accelerator/apply?as=investor", label: "Investor network" },
      { href: "/accelerator/apply?as=corporate_partner", label: "Partner with Inovers" },
    ],
  },
  {
    title: "Inovers",
    links: [
      { href: "/", label: "Inovers platform" },
      { href: "/ideas", label: "Idea Wall" },
      { href: "/manifesto", label: "Manifesto" },
      { href: "/waitlist", label: "Join the movement" },
    ],
  },
];

export function AcceleratorFooter() {
  return (
    <footer className="acc-ink border-t border-[var(--acc-line-ink)]">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="acc-label font-semibold !tracking-[0.24em]">
              INOVERS <span className="text-[var(--acc-signal)]">ACCELERATOR</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--acc-bone)]/55">
              A 12-week founder acceleration program for ambitious people
              building companies that matter. {COHORT.numberOfCompanies}{" "}
              startups. {COHORT.investmentAmountLabel} investment.
            </p>
            <p className="acc-label mt-6 opacity-40">
              {COHORT.cohortCode} · {COHORT.programWindowLabel} · {COHORT.location}
            </p>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="acc-label opacity-45 mb-4">{c.title}</h4>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-[var(--acc-bone)]/70 hover:text-[var(--acc-signal)] transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--acc-line-ink)] pt-6 flex flex-col md:flex-row justify-between gap-3">
          <p className="text-xs text-[var(--acc-bone)]/40">
            © {new Date().getFullYear()} Inovers. No application fee — ever.
          </p>
          <p className="acc-label opacity-30">
            build → measure → learn
          </p>
        </div>
      </div>
    </footer>
  );
}
