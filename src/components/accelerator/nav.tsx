"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { COHORT, getStatusUi } from "@/lib/accelerator/config";
import { track } from "@/lib/accelerator/analytics";

const links = [
  { href: "/accelerator", label: "Overview" },
  { href: "/accelerator/program", label: "Program" },
  { href: "/accelerator/deal", label: "The Deal" },
  { href: "/accelerator/companies", label: "Companies" },
  { href: "/accelerator/faq", label: "FAQ" },
];

export function AcceleratorNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const status = getStatusUi();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-[var(--acc-line-ink)] bg-[color-mix(in_srgb,var(--acc-ink)_92%,transparent)] backdrop-blur"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            href="/"
            className="acc-label whitespace-nowrap font-semibold !tracking-[0.24em] text-[var(--acc-bone)] hover:text-[var(--acc-signal)] transition-colors"
          >
            INOVERS
          </Link>
          <span aria-hidden className="h-4 w-px bg-[var(--acc-line-ink-strong)]" />
          <Link
            href="/accelerator"
            className="acc-label whitespace-nowrap text-[var(--acc-signal)]"
          >
            ACCELERATOR
          </Link>
          <span
            aria-hidden
            className="acc-label hidden lg:inline opacity-40 whitespace-nowrap"
          >
            {COHORT.cohortCode}
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1" aria-label="Accelerator">
          {links.map((l) => {
            const active =
              l.href === "/accelerator"
                ? pathname === l.href
                : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "px-3 py-2 text-[13px] transition-colors",
                  active
                    ? "text-[var(--acc-signal)]"
                    : "text-[var(--acc-bone)]/65 hover:text-[var(--acc-bone)]"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={status.cta.href}
            onClick={() => track("apply_clicked", { placement: "acc_nav" })}
            className="acc-btn acc-btn-signal !h-9 !px-4 !text-[11px] hidden sm:inline-flex"
          >
            {status.cta.label}
          </Link>
          <button
            className="md:hidden flex h-10 w-10 items-center justify-center border border-[var(--acc-line-ink)] text-[var(--acc-bone)]"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle accelerator menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="md:hidden border-t border-[var(--acc-line-ink)] bg-[var(--acc-ink)] px-5 py-4 flex flex-col"
          aria-label="Accelerator mobile"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-[15px] text-[var(--acc-bone)]/80 border-b border-[var(--acc-line-ink)] last:border-0"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={status.cta.href}
            onClick={() => {
              setOpen(false);
              track("apply_clicked", { placement: "acc_nav_mobile" });
            }}
            className="acc-btn acc-btn-signal mt-4"
          >
            {status.cta.label}
          </Link>
        </nav>
      )}
    </header>
  );
}
