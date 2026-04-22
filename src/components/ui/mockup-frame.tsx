import { cn } from "@/lib/utils";

/**
 * Browser-window chrome for showing product-demo mockups.
 */
export function MockupFrame({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a14]",
        "shadow-[0_40px_120px_-40px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)_inset]",
        className
      )}
    >
      {/* titlebar */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        {label && (
          <span className="ml-3 text-[11px] uppercase tracking-[0.15em] text-white/40">
            {label}
          </span>
        )}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
