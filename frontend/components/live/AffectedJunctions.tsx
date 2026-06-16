import type { Incident } from "@/lib/types";

export function AffectedJunctions({ incident }: { incident: Incident }) {
  if (!incident.affected_junctions?.length) return null;
  return (
    <div className="p-5 rounded-xl border border-ink/10 bg-paper-soft/70">
      <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-signal mb-3">
        Affected junctions
      </div>
      <ul className="divide-y divide-ink/10">
        {incident.affected_junctions.map((j) => (
          <li key={j.name} className="py-2.5 flex items-center justify-between gap-3">
            <span className="font-serif text-base text-ink">{j.name}</span>
            <span className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: j.color }}
              />
              <span className="font-mono text-xs tabular-nums text-ink/70">
                {j.risk}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
