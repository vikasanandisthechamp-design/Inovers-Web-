export function GridBackground({
  fade = true,
  className = "",
}: {
  fade?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 bg-grid ${
        fade ? "bg-grid-fade" : ""
      } ${className}`}
    />
  );
}
