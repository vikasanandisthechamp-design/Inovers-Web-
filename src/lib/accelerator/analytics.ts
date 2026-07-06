/**
 * Lightweight analytics dispatcher for the accelerator funnel.
 *
 * No analytics vendor is wired into this repo yet, so this adapter:
 *  1. pushes to `window.dataLayer` (GTM-compatible) if present
 *  2. calls `window.va` (Vercel Analytics) if present
 *  3. dispatches a `inovers:track` CustomEvent for anything else
 *  4. logs in development
 *
 * When a vendor is chosen, implement it here — call sites stay unchanged.
 */

export type AcceleratorEvent =
  | "accelerator_hero_view"
  | "accelerator_page_view"
  | "early_access_started"
  | "early_access_submitted"
  | "apply_clicked"
  | "application_started"
  | "application_step_completed"
  | "application_saved"
  | "application_submitted"
  | "deal_page_viewed"
  | "program_page_viewed"
  | "investor_interest_submitted"
  | "mentor_interest_submitted"
  | "partner_interest_submitted"
  | "faq_opened"
  | "demo_day_interest";

type Props = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    va?: (event: "event", name: string, props?: Record<string, unknown>) => void;
  }
}

export function track(event: AcceleratorEvent, props: Props = {}): void {
  if (typeof window === "undefined") return;

  const payload = { ...props, cohort: "INV-01" };

  try {
    window.dataLayer?.push({ event, ...payload });
    window.va?.("event", event, payload);
    window.dispatchEvent(
      new CustomEvent("inovers:track", { detail: { event, ...payload } })
    );
    if (process.env.NODE_ENV === "development") {
      console.debug(`[track] ${event}`, payload);
    }
  } catch {
    // analytics must never break the product
  }
}
