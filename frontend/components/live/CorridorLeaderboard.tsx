import type { ZoneSnapshot } from "@/lib/types";
import { riskLabel } from "@/lib/utils";

export function CorridorLeaderboard({
  zones,
  liveZones,
}: {
  zones: ZoneSnapshot[];
  liveZones?: ZoneSnapshot[];
}) {
  // Merge live overlay onto baseline
  const merged = zones
    .map((z) => {
      const live = liveZones?.find((l) => l.zone_id === z.zone_id);
      return {
        ...z,
        risk_score: live?.risk_score ?? z.risk_score,
        color: live?.color ?? z.color,
      };
    })
    .sort((a, b) => b.risk_score - a.risk_score);

  return (
    <div className="p-5 rounded-2xl border border-ink/10 bg-paper-soft/70">
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-signal">
          Corridor Leaderboard
        </div>
        <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
          Live, ranked
        </div>
      </div>
      <ol className="divide-y divide-ink/10">
        {merged.map((z, i) => (
          <li
            key={z.zone_id}
            className="py-3 flex items-center gap-3 group"
          >
            <span className="font-mono text-[0.6rem] tracking-[0.22em] text-ink-mute w-6">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="h-2.5 w-2.5 rounded-full flex-shrink-0"
              style={{ background: z.color }}
            />
            <span className="flex-1 font-serif text-base text-ink">
              {z.name || z.zone_id}
            </span>
            <span className="hidden sm:inline font-mono text-[0.55rem] tracking-[0.22em] uppercase text-ink-mute w-20 text-right">
              {riskLabel(z.risk_score)}
            </span>
            <span className="font-serif text-xl tabular-nums w-10 text-right">
              {z.risk_score}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
