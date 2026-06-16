"use client";

import type { Incident, Route } from "@/lib/types";
import { Pill } from "@/components/ui/Pill";
import { fmtMin } from "@/lib/utils";
import { useState } from "react";

const ROUTE_COLORS = ["#1A9641", "#F5A623", "#E64A19"];

export function DiversionPanel({ incident }: { incident: Incident }) {
  const [selected, setSelected] = useState(1);
  const routes = incident.recommendation.diversion.routes;

  return (
    <div className="p-5 rounded-xl border border-ink/10 bg-paper-soft/70">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-signal">
            Diversion
          </div>
          <div className="font-serif text-xl text-ink mt-1">
            {incident.recommendation.diversion.blocked_segment}
          </div>
        </div>
        <Pill tone="ink">
          {incident.recommendation.officers} officers ·{" "}
          {incident.recommendation.barricades.length} barricades
        </Pill>
      </div>

      <div className="space-y-2.5">
        {routes.map((r, i) => (
          <RouteRow
            key={r.rank}
            route={r}
            color={ROUTE_COLORS[i] || "#3D5A4A"}
            selected={selected === r.rank}
            onClick={() => setSelected(r.rank)}
          />
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-ink/10 flex items-center justify-between font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
        <span>algo · dijkstra + yen's k=3</span>
        <span>graph · osmnx · cached</span>
      </div>
    </div>
  );
}

function RouteRow({
  route,
  color,
  selected,
  onClick,
}: {
  route: Route;
  color: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group w-full text-left p-3 rounded-lg flex items-center gap-4 transition-all border ${
        selected
          ? "bg-paper border-ink/25"
          : "bg-paper/50 border-transparent hover:border-ink/10"
      }`}
    >
      <div
        className="h-9 w-9 rounded-full flex items-center justify-center font-mono text-xs"
        style={{ background: color + "22", color: color }}
      >
        {String(route.rank).padStart(2, "0")}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-serif text-sm text-ink truncate">
          {route.summary}
        </div>
        <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-ink-mute">
          {route.algorithm}
        </div>
      </div>
      <div className="text-right">
        <div className="font-serif text-lg tabular-nums leading-none">
          {fmtMin(route.eta_min)}
        </div>
        <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-ink-mute mt-1">
          {(route.distance_m / 1000).toFixed(1)} km
        </div>
      </div>
    </button>
  );
}
