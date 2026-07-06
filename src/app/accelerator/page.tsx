import type { Metadata } from "next";
import { AccHero } from "@/components/accelerator/sections/hero";
import { ProgressTimeline } from "@/components/accelerator/sections/timeline";
import { ProblemSection, OfferSection } from "@/components/accelerator/sections/problem-offer";
import { ProgramRoadmap, WeekInside } from "@/components/accelerator/sections/program-week";
import {
  WhoShouldApply,
  SelectionSignal,
  SelectionProcess,
} from "@/components/accelerator/sections/selection";
import {
  StandardDeal,
  FounderEnvironment,
  NetworkSection,
  PeopleAndPartners,
} from "@/components/accelerator/sections/deal-network";
import { DemoDaySection, FaqPreview, FinalCta } from "@/components/accelerator/sections/finale";
import { PageView } from "@/components/accelerator/page-view";
import { COHORT } from "@/lib/accelerator/config";

export const metadata: Metadata = {
  title: `Build What the Future Needs — ${COHORT.cohortName}`,
  description: `A ${COHORT.programDurationWeeks}-week accelerator for ambitious founders building from India. ${COHORT.numberOfCompanies} startups. ${COHORT.investmentAmountLabel} investment. Applications opening soon.`,
  alternates: { canonical: "/accelerator" },
  openGraph: {
    title: `INOVERS ACCELERATOR — Build What the Future Needs`,
    description: `${COHORT.programDurationWeeks} weeks. ${COHORT.numberOfCompanies} startups. ${COHORT.investmentAmountLabel} investment for selected companies.`,
    url: "/accelerator",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Inovers Accelerator",
  url: "https://www.inovers.io/accelerator",
  parentOrganization: {
    "@type": "Organization",
    name: "Inovers",
    url: "https://www.inovers.io",
  },
  description:
    "A 12-week founder acceleration program for ambitious people building companies that matter.",
  areaServed: "IN",
};

export default function AcceleratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <PageView event="accelerator_page_view" page="/accelerator" />
      <AccHero />
      <ProgressTimeline />
      <ProblemSection />
      <OfferSection />
      <ProgramRoadmap />
      <WeekInside />
      <WhoShouldApply />
      <SelectionSignal />
      <SelectionProcess />
      <StandardDeal />
      <FounderEnvironment />
      <NetworkSection />
      <PeopleAndPartners />
      <DemoDaySection />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
