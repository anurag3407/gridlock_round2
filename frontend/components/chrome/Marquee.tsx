"use client";

import { cn } from "@/lib/utils";

const CORRIDORS = [
  "Tumkur Road",
  "ORR East",
  "ORR North",
  "Hosur Road",
  "Mysore Road",
  "Old Madras Road",
  "Bellary Road",
  "Magadi Road",
  "Bannerghatta Road",
  "Sarjapur Road",
  "Whitefield Main Rd",
  "Marathahalli Bridge",
  "Silk Board Junction",
  "Trinity Circle",
  "Jalahalli Cross",
  "Hebbal Flyover",
  "KR Puram",
  "Indiranagar 100ft",
  "Mahadevapura",
  "Electronic City",
];

const STATS = [
  "8,173 events",
  "5 months",
  "7,706 unplanned",
  "467 planned",
  "1 city",
  "82% on 10 corridors",
];

export function CorridorMarquee({
  variant = "paper",
  speed = "normal",
}: {
  variant?: "paper" | "dark";
  speed?: "slow" | "normal";
}) {
  const items = [...CORRIDORS, ...STATS];
  const repeated = [...items, ...items];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden py-4 mask-fade-edges",
        variant === "dark" ? "bg-ink text-paper/80" : "bg-paper text-ink/75"
      )}
    >
      <div
        className={cn(
          "flex gap-12 whitespace-nowrap",
          speed === "slow" ? "animate-ticker-slow" : "animate-ticker"
        )}
      >
        {repeated.map((c, i) => (
          <span
            key={i}
            className="font-mono text-[0.72rem] tracking-[0.22em] uppercase flex items-center gap-12"
          >
            {c}
            <span
              aria-hidden
              className={cn(
                "inline-block w-1 h-1 rounded-full",
                variant === "dark" ? "bg-signal" : "bg-signal"
              )}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
