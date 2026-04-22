import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";

const base =
  "btn-shine inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30";

const variants: Record<Variant, string> = {
  primary:
    "bg-white text-[var(--bg-base)] hover:bg-white/90 shadow-[0_8px_40px_-12px_rgba(255,255,255,0.6)]",
  ghost:
    "text-white/85 hover:text-white hover:bg-white/[0.06] border border-transparent",
  outline:
    "border border-white/15 text-white hover:border-white/30 hover:bg-white/[0.04]",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-[15px]",
};

type Props = {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function ShineButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  type,
  disabled,
  onClick,
}: Props) {
  const cls = cn(base, variants[variant], sizes[size], disabled && "opacity-60 cursor-not-allowed", className);

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
