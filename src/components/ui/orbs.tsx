export function Orbs({ variant = "default" }: { variant?: "default" | "warm" | "cool" }) {
  const palette = {
    default: ["#5cd4ff", "#a78bfa", "#f472b6"],
    warm: ["#ff9257", "#f472b6", "#a78bfa"],
    cool: ["#5cd4ff", "#22d3ee", "#a78bfa"],
  }[variant];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-32 -left-24 h-[480px] w-[480px] rounded-full opacity-40 animate-pulse-glow"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${palette[0]}40, transparent 70%)`,
        }}
      />
      <div
        className="absolute top-40 right-[-120px] h-[520px] w-[520px] rounded-full opacity-35 animate-pulse-glow"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${palette[1]}40, transparent 70%)`,
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute bottom-[-180px] left-1/3 h-[440px] w-[440px] rounded-full opacity-25 animate-pulse-glow"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${palette[2]}40, transparent 70%)`,
          animationDelay: "4s",
        }}
      />
    </div>
  );
}
