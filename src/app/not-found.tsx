import Link from "next/link";

export default function NotFound() {
  return (
    <div className="acc acc-ink acc-grain relative flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <div
        aria-hidden
        className="absolute inset-0 acc-grid-ink opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_45%,#000_10%,transparent_75%)]"
      />
      <p className="acc-label relative text-[var(--acc-signal)]">ERROR 404 — BLANK PAGE IN THE NOTEBOOK</p>
      <h1 className="acc-display relative mt-6 max-w-2xl text-[clamp(2.2rem,7vw,4.5rem)] uppercase">
        This idea doesn&apos;t exist yet.
      </h1>
      <p className="relative mt-5 max-w-md text-[15px] leading-relaxed text-[var(--acc-bone)]/60">
        The page you&apos;re looking for was never built — or hasn&apos;t been
        built <em>yet</em>. Sounds like an opportunity.
      </p>
      <div className="relative mt-9 flex flex-col sm:flex-row gap-3">
        <Link href="/" className="acc-btn acc-btn-ink">
          Back to Inovers
        </Link>
        <Link href="/accelerator" className="acc-btn acc-btn-signal">
          Build it — the accelerator
        </Link>
      </div>
    </div>
  );
}
