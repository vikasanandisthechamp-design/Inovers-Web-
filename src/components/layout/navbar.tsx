"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ShineButton } from "@/components/ui/shine-button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#ecosystem", label: "Ecosystem" },
  { href: "/#how", label: "How it works" },
  { href: "/#institutions", label: "Institutions" },
  { href: "/manifesto", label: "Manifesto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container-page">
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-4 py-2 transition-all duration-300",
            scrolled
              ? "glass-strong shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)]"
              : "border border-transparent"
          )}
        >
          <Link href="/" className="flex items-center gap-2.5 pl-1.5">
            <Logo />
            <span className="font-semibold tracking-tight text-[15px]">
              Inovers
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3.5 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <ShineButton href="/waitlist" variant="ghost" size="md">
              Sign in
            </ShineButton>
            <ShineButton href="/waitlist" variant="primary" size="md">
              Join the Movement
            </ShineButton>
          </div>

          <button
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-2 glass-strong rounded-3xl p-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-2xl text-white/80 hover:bg-white/[0.06]"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-2">
              <ShineButton href="/waitlist" variant="outline" size="md">
                Sign in
              </ShineButton>
              <ShineButton href="/waitlist" variant="primary" size="md">
                Join the Movement
              </ShineButton>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span
      aria-hidden
      className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl"
      style={{
        background:
          "conic-gradient(from 220deg at 50% 50%, #5cd4ff, #a78bfa, #f472b6, #ff9257, #5cd4ff)",
      }}
    >
      <span className="absolute inset-[2px] rounded-[10px] bg-[var(--bg-base)]" />
      <span className="relative font-bold text-[13px] text-gradient">i</span>
    </span>
  );
}
