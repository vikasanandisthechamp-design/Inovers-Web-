"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, LogOut, Lightbulb } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { ShineButton } from "@/components/ui/shine-button";
import { cn } from "@/lib/utils";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const links = [
  { href: "/#features", label: "Platform" },
  { href: "/#how", label: "How it works" },
  { href: "/ideas", label: "Idea Wall" },
  { href: "/#community", label: "Community" },
  { href: "/manifesto", label: "Manifesto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      sub.subscription.unsubscribe();
    };
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
            {user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <ShineButton href="/sign-in" variant="ghost" size="md">
                  Sign in
                </ShineButton>
                <ShineButton href="/waitlist" variant="primary" size="md">
                  Join the Movement
                </ShineButton>
              </>
            )}
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
              {user ? (
                <>
                  <ShineButton href="/ideas" variant="outline" size="md">
                    <Lightbulb className="h-3.5 w-3.5" /> Idea Wall
                  </ShineButton>
                  <form action="/auth/signout" method="post">
                    <button
                      type="submit"
                      className="w-full inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/[0.06]"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Sign out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <ShineButton href="/sign-in" variant="outline" size="md">
                    Sign in
                  </ShineButton>
                  <ShineButton href="/waitlist" variant="primary" size="md">
                    Join the Movement
                  </ShineButton>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function UserMenu({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const label =
    (user.user_metadata?.name as string | undefined) ?? user.email ?? "You";
  const initials = label
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] pl-1.5 pr-3 py-1 text-sm hover:bg-white/[0.06] transition-colors"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold text-white bg-gradient-to-br from-[#5cd4ff] to-[#a78bfa]">
          {initials}
        </span>
        <span className="max-w-[140px] truncate text-white/80">{label}</span>
      </button>

      {open && (
        <>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-strong p-2 z-20">
            <Link
              href="/ideas"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/[0.06]"
            >
              <Lightbulb className="h-4 w-4" /> Idea Wall
            </Link>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="w-full text-left flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/[0.06]"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </form>
          </div>
        </>
      )}
    </div>
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
