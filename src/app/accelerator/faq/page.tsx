import type { Metadata } from "next";
import { FAQ_GROUPS, FAQ_FLAT } from "@/lib/accelerator/faq";
import { COHORT, getStatusUi } from "@/lib/accelerator/config";
import { PageView } from "@/components/accelerator/page-view";
import { AccButton, SectionRail } from "@/components/accelerator/ui";
import { FaqList } from "./faq-list";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Everything about ${COHORT.cohortName}: who can apply, the investment, the 12 weeks, Demo Day, and what's still being finalized. Honest answers only.`,
  alternates: { canonical: "/accelerator/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_FLAT.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageView event="accelerator_page_view" page="/accelerator/faq" />

      <section className="acc-ink acc-grain relative">
        <div className="container-page py-16 md:py-20">
          <p className="acc-label text-[var(--acc-signal)]">{COHORT.cohortName} · FAQ</p>
          <h1 className="acc-display mt-5 text-[clamp(2.4rem,6vw,4rem)] uppercase">
            Asked, <span className="text-[var(--acc-signal)]">answered.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-[var(--acc-bone)]/65">
            Where policy is still being finalized, the answer says so — we
            don&apos;t invent terms to sound finished.
          </p>
        </div>
      </section>

      <section className="acc-paper acc-grain relative">
        <div className="container-page py-16 md:py-24 space-y-16">
          {FAQ_GROUPS.map((g, gi) => (
            <div key={g.title}>
              <SectionRail no={`Q${gi + 1}`} label={g.title.toUpperCase()} />
              <FaqList items={g.items} group={g.title} />
            </div>
          ))}

          <div className="border-t border-[var(--acc-line-paper)] pt-10 text-center">
            <p className="acc-display text-2xl uppercase">
              Still curious? <span className="text-[var(--acc-signal)]">Good sign.</span>
            </p>
            <div className="mt-6 flex justify-center">
              <AccButton href={getStatusUi().cta.href} variant="solid-ink" arrow>
                {getStatusUi().cta.label}
              </AccButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
