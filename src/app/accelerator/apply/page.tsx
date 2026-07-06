import type { Metadata } from "next";
import { COHORT, getStatusUi } from "@/lib/accelerator/config";
import { ApplyForm } from "@/components/accelerator/apply-form";
import { EarlyAccessForm } from "@/components/accelerator/early-access-form";
import { PageView } from "@/components/accelerator/page-view";
import { StatusPill } from "@/components/accelerator/ui";

export const metadata: Metadata = {
  title: "Apply",
  description: `Apply to ${COHORT.cohortName} — a ${COHORT.programDurationWeeks}-week accelerator with ${COHORT.investmentAmountLabel} investment for selected startups. No application fee.`,
  alternates: { canonical: "/accelerator/apply" },
};

const VALID_ROLES = [
  "founder",
  "investor",
  "mentor",
  "operator",
  "corporate_partner",
  "student",
  "media",
  "other",
] as const;

type Role = (typeof VALID_ROLES)[number];

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ as?: string }>;
}) {
  const { as } = await searchParams;
  const role: Role = VALID_ROLES.includes(as as Role) ? (as as Role) : "founder";
  const status = getStatusUi();

  return (
    <div className="acc-ink acc-grain relative">
      <PageView event="accelerator_page_view" page="/accelerator/apply" />
      <div className="container-page py-14 md:py-20">
        {status.applicationsOpen ? (
          <>
            <header className="mb-12 max-w-2xl">
              <p className="acc-label text-[var(--acc-signal)]">
                {COHORT.cohortName} · APPLICATION
              </p>
              <h1 className="acc-display mt-4 text-[clamp(2.2rem,5vw,3.6rem)] uppercase">
                Tell us what you&apos;re building.
              </h1>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--acc-bone)]/65">
                Eleven short steps. Autosaves on this device. Plain answers
                beat polished ones — we fund people before the world agrees
                with them.
              </p>
            </header>
            <ApplyForm />
          </>
        ) : (
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <header>
              <StatusPill>{status.pill}</StatusPill>
              <h1 className="acc-display mt-6 text-[clamp(2.2rem,5vw,3.6rem)] uppercase">
                Applications open
                <span className="text-[var(--acc-signal)]"> soon.</span>
              </h1>
              <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-[var(--acc-bone)]/65">
                The {COHORT.cohortName} application isn&apos;t live yet. Join
                early access and the application link, key dates, and cohort
                announcements will reach you before they reach the public.
              </p>
              <ul className="mt-8 space-y-2 acc-label opacity-50">
                <li>{COHORT.numberOfCompanies} STARTUPS</li>
                <li>{COHORT.programDurationWeeks} WEEKS</li>
                <li>{COHORT.investmentAmountLabel.toUpperCase()} INVESTMENT</li>
                <li>NO APPLICATION FEE</li>
              </ul>
            </header>
            <EarlyAccessForm defaultRole={role} placement="apply_page" />
          </div>
        )}
      </div>
    </div>
  );
}
