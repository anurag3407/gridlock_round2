"use client";

import type { Incident } from "@/lib/types";
import { Pill } from "@/components/ui/Pill";
import { cn, fmtMin, fmtTime } from "@/lib/utils";

const CAUSE_LABEL: Record<string, string> = {
  vehicle_breakdown: "Vehicle Breakdown",
  water_logging: "Water Logging",
  accident: "Accident",
  tree_fall: "Tree Fall",
  pot_holes: "Pot Holes",
  public_event: "Public Event",
};

export function IncidentCard({
  incident,
  active = false,
  onClick,
}: {
  incident: Incident;
  active?: boolean;
  onClick?: () => void;
}) {
  const pri = incident.predicted_priority;
  const pct = Math.round(incident.closure_probability * 100);
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full text-left p-5 rounded-xl border transition-all",
        active
          ? "bg-paper border-signal shadow-[0_18px_30px_-12px_rgba(230,74,25,0.25)]"
          : "bg-paper border-ink/10 hover:border-ink/25 hover:-translate-y-0.5"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: incident.color }}
          />
          <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
            {incident.id}
          </span>
        </div>
        <Pill tone={pri === "High" ? "high" : pri === "Low" ? "low" : "mid"}>
          {pri}
        </Pill>
      </div>

      <h3 className="font-serif text-2xl text-ink leading-tight">
        {CAUSE_LABEL[incident.cause] || incident.cause}
      </h3>
      <p className="mt-1 text-sm text-ink/65">{incident.corridor}</p>
      {incident.address && (
        <p className="mt-0.5 text-xs text-ink-mute leading-snug">
          {incident.address}
        </p>
      )}

      <div className="mt-4 grid grid-cols-3 gap-3">
        <Metric label="Closure" value={`${pct}%`} />
        <Metric label="Clears in" value={fmtMin(incident.predicted_clearance_min)} />
        <Metric label="Risk" value={String(incident.risk_score)} />
      </div>

      <div className="mt-4 flex items-center justify-between text-[0.65rem] font-mono tracking-[0.18em] uppercase text-ink-mute">
        <span>arrived {fmtTime(incident.arrived_at)}</span>
        <span>clears {fmtTime(incident.clears_at)}</span>
      </div>

      {/* Decorative side bar */}
      <span
        className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full"
        style={{ background: incident.color }}
      />
    </button>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-ink-mute">
        {label}
      </div>
      <div className="font-serif text-lg tabular-nums leading-snug">{value}</div>
    </div>
  );
}
