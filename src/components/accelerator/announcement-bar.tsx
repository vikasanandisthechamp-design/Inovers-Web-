"use client";

import Link from "next/link";
import { HOMEPAGE_CAMPAIGN_ENABLED, COHORT, getStatusUi } from "@/lib/accelerator/config";
import { track } from "@/lib/accelerator/analytics";

/**
 * Slim accelerator announcement bar pinned above the main-site navbar.
 * Controlled by HOMEPAGE_CAMPAIGN_ENABLED — flip one flag to retire it.
 */
export function AnnouncementBar() {
  if (!HOMEPAGE_CAMPAIGN_ENABLED) return null;
  const status = getStatusUi();

  return (
    <Link
      href="/accelerator"
      onClick={() => track("apply_clicked", { placement: "announcement_bar" })}
      className="fixed inset-x-0 top-0 z-[51] flex h-9 items-center justify-center gap-3 bg-[#141109] px-4 text-[#f0ead9] transition-colors hover:bg-[#1d1910]"
    >
      <span
        aria-hidden
        className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-[#ff5a1f] animate-pulse motion-reduce:animate-none"
      />
      <span className="font-[family-name:var(--font-plex-mono)] text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.18em] whitespace-nowrap overflow-hidden text-ellipsis">
        {COHORT.cohortName} — {status.pill}
      </span>
      <span className="hidden md:inline font-[family-name:var(--font-plex-mono)] text-[11px] uppercase tracking-[0.18em] text-[#ff5a1f]">
        {status.cta.label} →
      </span>
    </Link>
  );
}
