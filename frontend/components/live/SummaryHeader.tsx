import type { LiveFeedResponse } from "@/lib/types";
import { fmtMin, fmtTime } from "@/lib/utils";

export function SummaryHeader({ data }: { data: LiveFeedResponse }) {
  const s = data.summary;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/10 border border-ink/10 rounded-xl overflow-hidden">
      <Cell
        label="Active"
        value={String(s.active_incidents).padStart(2, "0")}
        tone="ink"
      />
      <Cell
        label="High Priority"
        value={String(s.high_priority).padStart(2, "0")}
        tone="signal"
      />
      <Cell
        label="Avg Clearance"
        value={fmtMin(s.avg_clearance_min)}
        tone="ink"
      />
      <Cell
        label="Sim Time"
        value={fmtTime(data.sim_time)}
        tone="ink"
        small
      />
    </div>
  );
}

function Cell({
  label,
  value,
  tone,
  small = false,
}: {
  label: string;
  value: string;
  tone: "ink" | "signal";
  small?: boolean;
}) {
  return (
    <div className="bg-paper p-5 md:p-6 relative">
      <div className="font-mono text-[0.6rem] tracking-[0.24em] uppercase text-ink-mute">
        {label}
      </div>
      <div
        className={`mt-2 font-serif font-light tabular-nums leading-none ${
          small ? "text-3xl md:text-4xl" : "text-4xl md:text-6xl"
        } ${tone === "signal" ? "text-signal" : "text-ink"}`}
      >
        {value}
      </div>
      <div className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
    </div>
  );
}
