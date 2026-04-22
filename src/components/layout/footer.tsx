import Link from "next/link";

const socials = [
  {
    name: "GitHub",
    href: "#",
    path:
      "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.84c.85 0 1.71.11 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z",
  },
  {
    name: "X",
    href: "#",
    path:
      "M18.244 2H21l-6.52 7.452L22 22h-6.857l-4.36-5.69L5.6 22H2.84l6.99-7.99L2 2h7.029l3.94 5.213L18.244 2Zm-1.198 18.4h1.534L7.05 3.49H5.404l11.642 16.91Z",
  },
  {
    name: "LinkedIn",
    href: "#",
    path:
      "M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5V9h3v10ZM6.5 7.7A1.7 1.7 0 1 1 8.2 6 1.7 1.7 0 0 1 6.5 7.7ZM19 19h-3v-5.4c0-1.3-.5-2.1-1.6-2.1A1.8 1.8 0 0 0 12.7 13c-.1.2-.1.5-.1.8V19h-3V9h3v1.3a3 3 0 0 1 2.7-1.5c2 0 3.5 1.3 3.5 4.1V19Z",
  },
  {
    name: "Instagram",
    href: "#",
    path:
      "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.32 4.14.6c-.79.3-1.46.71-2.13 1.38C1.34 2.65.93 3.32.63 4.11.35 4.87.16 5.75.1 7.02.04 8.3.03 8.71.03 12s.01 3.7.07 4.98c.06 1.27.25 2.15.53 2.91.3.79.71 1.46 1.38 2.13.67.67 1.34 1.08 2.13 1.38.76.28 1.64.47 2.91.53C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.25 2.91-.53a5.85 5.85 0 0 0 2.13-1.38c.67-.67 1.08-1.34 1.38-2.13.28-.76.47-1.64.53-2.91.06-1.28.07-1.69.07-4.98s-.01-3.7-.07-4.98c-.06-1.27-.25-2.15-.53-2.91a5.85 5.85 0 0 0-1.38-2.13A5.85 5.85 0 0 0 19.86.6c-.76-.28-1.64-.47-2.91-.53C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.84a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88Z",
  },
];

const cols = [
  {
    title: "Platform",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#how", label: "How it works" },
      { href: "/#categories", label: "Categories" },
      { href: "/ideas", label: "Idea Wall" },
    ],
  },
  {
    title: "For Builders",
    links: [
      { href: "/waitlist", label: "Join a Pod" },
      { href: "/#stories", label: "Showcase" },
      { href: "/manifesto", label: "Manifesto" },
      { href: "/#live", label: "Live activity" },
    ],
  },
  {
    title: "For Institutions",
    links: [
      { href: "/#institutions", label: "Government" },
      { href: "/#institutions", label: "Universities" },
      { href: "/#institutions", label: "Partners" },
      { href: "/waitlist", label: "Talk to us" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/manifesto", label: "Manifesto" },
      { href: "#", label: "Privacy" },
      { href: "#", label: "Terms" },
      { href: "#", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(167,139,250,0.55), rgba(92,212,255,0.55), transparent)",
        }}
      />
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5 mb-5">
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
              <span className="font-semibold tracking-tight text-lg">Inovers</span>
            </div>
            <p className="text-sm text-white/60 max-w-sm leading-relaxed">
              The community-powered innovation ecosystem. Built in Bharat,
              for the world. Every idea credited. Every Pod public. Every
              outcome real.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
                  {c.title}
                </h4>
                <ul className="space-y-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-white/75 hover:text-white transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} Inovers. Built by the community, for the community.
          </p>
          <p className="text-xs text-white/45 font-medium tracking-wide">
            अपनी सोच, अपना देश.
          </p>
        </div>
      </div>
    </footer>
  );
}
