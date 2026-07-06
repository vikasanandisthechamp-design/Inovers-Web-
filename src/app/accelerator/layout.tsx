import type { Metadata } from "next";
import { AcceleratorNav } from "@/components/accelerator/nav";
import { AcceleratorFooter } from "@/components/accelerator/footer";
import { COHORT } from "@/lib/accelerator/config";

export const metadata: Metadata = {
  title: {
    default: `Inovers Accelerator — ${COHORT.cohortName}`,
    template: `%s — Inovers Accelerator`,
  },
  description: `A 12-week accelerator for ambitious founders building from India. ${COHORT.numberOfCompanies} startups. ${COHORT.investmentAmountLabel} investment. Build what the future needs.`,
  openGraph: {
    siteName: "Inovers Accelerator",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function AcceleratorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="acc acc-ink flex min-h-svh flex-col">
      <AcceleratorNav />
      <div className="flex-1">{children}</div>
      <AcceleratorFooter />
    </div>
  );
}
