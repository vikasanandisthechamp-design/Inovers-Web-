/**
 * Original line-art "patent sketch" icons for the human-progress timeline.
 * All strokes use currentColor; every path carries pathLength="1" so the
 * shared .acc-draw stroke-draw animation works uniformly.
 */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <svg viewBox="0 0 80 80" className={className} role="img" aria-label={title}>
      {children}
    </svg>
  );
}

export function SketchStoneTool({ className }: { className?: string }) {
  return (
    <Svg className={className} title="Stone hand-axe sketch">
      <path {...S} pathLength="1" d="M40 8 C 52 14, 58 30, 55 46 C 53 58, 47 68, 40 72 C 33 66, 27 56, 25 44 C 23 30, 30 13, 40 8 Z" />
      <path {...S} pathLength="1" strokeWidth={1} d="M40 14 C 46 22, 49 34, 47 48 M35 18 C 32 28, 31 42, 33 56" opacity="0.5" />
      <path {...S} pathLength="1" strokeWidth={0.8} d="M14 24 L 25 32 M14 24 l 3 -1 m -3 1 l 1 3" opacity="0.6" />
    </Svg>
  );
}

export function SketchPress({ className }: { className?: string }) {
  return (
    <Svg className={className} title="Printing press sketch">
      <path {...S} pathLength="1" d="M18 70 H 62 M22 70 V 22 H 58 V 70 M16 22 H 64" />
      <path {...S} pathLength="1" d="M34 22 V 14 H 46 V 22 M40 14 V 8" />
      <path {...S} pathLength="1" d="M28 34 H 52 M28 40 H 52 M28 46 H 44" strokeWidth={1} />
      <path {...S} pathLength="1" d="M26 56 H 54 V 64 H 26 Z" />
      <path {...S} pathLength="1" strokeWidth={0.8} d="M40 26 v 4 m -8 -4 v 4 m 16 -4 v 4" opacity="0.5" />
    </Svg>
  );
}

export function SketchSteam({ className }: { className?: string }) {
  return (
    <Svg className={className} title="Steam engine flywheel sketch">
      <circle {...S} pathLength="1" cx="32" cy="46" r="20" />
      <circle {...S} pathLength="1" cx="32" cy="46" r="4" />
      <path {...S} pathLength="1" strokeWidth={1} d="M32 26 v 8 M32 58 v 8 M12 46 h 8 M44 46 h 8 M18 32 l 6 6 M40 54 l 6 6 M46 32 l -6 6 M24 54 l -6 6" />
      <path {...S} pathLength="1" d="M36 44 L 62 36 L 66 44" />
      <path {...S} pathLength="1" strokeWidth={1} d="M58 26 c 2 -4, 8 -4, 8 -9 M64 30 c 2 -3, 6 -3, 6 -7" opacity="0.6" />
    </Svg>
  );
}

export function SketchElectric({ className }: { className?: string }) {
  return (
    <Svg className={className} title="Lightning and coil sketch">
      <path {...S} pathLength="1" d="M44 8 L 30 38 H 42 L 34 70 L 56 32 H 43 L 52 8 Z" />
      <path {...S} pathLength="1" strokeWidth={1} d="M14 58 c 4 0 4 -6 8 -6 s 4 6 8 6" opacity="0.6" />
      <path {...S} pathLength="1" strokeWidth={0.8} d="M60 56 l 8 -4 m -7 9 l 7 -2" opacity="0.5" />
    </Svg>
  );
}

export function SketchFlight({ className }: { className?: string }) {
  return (
    <Svg className={className} title="Early flying machine sketch">
      <path {...S} pathLength="1" d="M10 34 C 26 24, 54 24, 70 34 M10 42 C 26 32, 54 32, 70 42" />
      <path {...S} pathLength="1" strokeWidth={1} d="M18 35 V 41 M28 31.5 V 37.5 M40 30 V 36 M52 31.5 V 37.5 M62 35 V 41" />
      <path {...S} pathLength="1" d="M36 40 L 40 58 L 44 40" />
      <path {...S} pathLength="1" strokeWidth={1} d="M32 58 H 48" />
      <path {...S} pathLength="1" strokeWidth={0.8} d="M12 62 C 22 58, 30 60, 36 64 M48 64 c 6 -4, 14 -6, 22 -3" opacity="0.4" />
    </Svg>
  );
}

export function SketchChip({ className }: { className?: string }) {
  return (
    <Svg className={className} title="Semiconductor sketch">
      <rect {...S} pathLength="1" x="24" y="24" width="32" height="32" />
      <rect {...S} pathLength="1" x="33" y="33" width="14" height="14" strokeWidth={1} />
      <path {...S} pathLength="1" strokeWidth={1} d="M30 24 V 14 M40 24 V 14 M50 24 V 14 M30 56 V 66 M40 56 V 66 M50 56 V 66 M24 30 H 14 M24 40 H 14 M24 50 H 14 M56 30 H 66 M56 40 H 66 M56 50 H 66" />
      <path {...S} pathLength="1" strokeWidth={0.8} d="M33 40 h -6 m 20 0 h 6" opacity="0.5" />
    </Svg>
  );
}

export function SketchInternet({ className }: { className?: string }) {
  return (
    <Svg className={className} title="Network graph sketch">
      <circle {...S} pathLength="1" cx="40" cy="16" r="5" />
      <circle {...S} pathLength="1" cx="14" cy="46" r="5" />
      <circle {...S} pathLength="1" cx="66" cy="46" r="5" />
      <circle {...S} pathLength="1" cx="40" cy="66" r="5" />
      <circle {...S} pathLength="1" cx="40" cy="42" r="3" />
      <path {...S} pathLength="1" strokeWidth={1} d="M40 21 V 39 M37 44 L 18 44 M43 44 L 61 45 M40 45 V 61 M36 19 L 17 42 M44 19 L 63 42" />
    </Svg>
  );
}

export function SketchAi({ className }: { className?: string }) {
  return (
    <Svg className={className} title="Neural network sketch">
      <circle {...S} pathLength="1" cx="16" cy="24" r="4" />
      <circle {...S} pathLength="1" cx="16" cy="40" r="4" />
      <circle {...S} pathLength="1" cx="16" cy="56" r="4" />
      <circle {...S} pathLength="1" cx="40" cy="30" r="4" />
      <circle {...S} pathLength="1" cx="40" cy="50" r="4" />
      <circle {...S} pathLength="1" cx="64" cy="40" r="5" />
      <path {...S} pathLength="1" strokeWidth={0.9} d="M20 24 L 36 29 M20 40 L 36 31 M20 40 L 36 49 M20 56 L 36 51 M20 24 L 36 48 M20 56 L 36 32 M44 30 L 59 38 M44 50 L 59 42" />
    </Svg>
  );
}

export function SketchUnknown({ className }: { className?: string }) {
  return (
    <Svg className={className} title="The unknown — your company">
      <path {...S} pathLength="1" d="M28 30 C 28 20, 40 16, 46 22 C 52 28, 48 36, 42 40 C 38 42.5, 38 46, 38 50" strokeWidth={2} />
      <path {...S} pathLength="1" d="M38 60 l 0.01 0" strokeWidth={3} />
      <path {...S} pathLength="1" strokeWidth={0.8} d="M14 14 h 8 M14 14 v 8 M66 14 h -8 M66 14 v 8 M14 66 h 8 M14 66 v -8 M66 66 h -8 M66 66 v -8" opacity="0.5" />
    </Svg>
  );
}

export const TIMELINE_SKETCHES = {
  stone: SketchStoneTool,
  press: SketchPress,
  steam: SketchSteam,
  electric: SketchElectric,
  flight: SketchFlight,
  chip: SketchChip,
  internet: SketchInternet,
  ai: SketchAi,
  unknown: SketchUnknown,
} as const;

export type SketchKey = keyof typeof TIMELINE_SKETCHES;
