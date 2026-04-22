import { cn } from "@/lib/utils";

export function Badge({
  children,
  icon,
  className,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur",
        className
      )}
    >
      {icon && <span className="text-[var(--neon-cyan)]">{icon}</span>}
      {children}
    </span>
  );
}
