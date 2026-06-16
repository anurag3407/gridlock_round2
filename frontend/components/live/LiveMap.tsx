"use client";

import { CityMap, type MapMarker, type MapRoute } from "@/components/viz/CityMap";
import type { Incident, ZoneSnapshot } from "@/lib/types";

/**
 * Geographic envelope used to map (lat, lng) → SVG viewBox coords (800 × 600).
 * Roughly the Bengaluru drive graph bounds.
 */
const BBOX = {
  minLat: 12.85,
  maxLat: 13.13,
  minLng: 77.45,
  maxLng: 77.78,
};

function project(lat: number, lng: number): [number, number] {
  const x =
    ((lng - BBOX.minLng) / (BBOX.maxLng - BBOX.minLng)) * 760 + 20;
  const y =
    600 - (((lat - BBOX.minLat) / (BBOX.maxLat - BBOX.minLat)) * 560 + 20);
  return [x, y];
}

export function LiveMap({
  zones = [],
  incidents = [],
  activeIncidentId,
}: {
  zones?: ZoneSnapshot[];
  incidents?: Incident[];
  activeIncidentId?: string;
}) {
  const markers: MapMarker[] = [];
  const routes: MapRoute[] = [];

  // Zones first (background risk)
  for (const z of zones) {
    if (z.lat == null || z.lng == null) continue;
    const [cx, cy] = project(z.lat, z.lng);
    markers.push({
      id: `z-${z.zone_id}`,
      cx,
      cy,
      color: z.color,
      radius: Math.max(5, Math.min(24, z.radius_m / 30)),
    });
  }

  // Incidents (overlay)
  for (const inc of incidents) {
    const [cx, cy] = project(inc.lat, inc.lng);
    markers.push({
      id: inc.id,
      cx,
      cy,
      color: inc.color,
      radius: Math.max(7, Math.min(20, inc.radius_m / 35)),
      label: inc.id === activeIncidentId ? inc.corridor : undefined,
    });

    // Affected junctions
    for (const j of inc.affected_junctions) {
      const [jx, jy] = project(j.lat, j.lng);
      markers.push({
        id: `${inc.id}-j-${j.name}`,
        cx: jx,
        cy: jy,
        color: j.color,
        radius: 4,
      });
    }

    // Diversion routes if this is the active one
    if (inc.id === activeIncidentId) {
      const ROUTE_COLORS = ["#1A9641", "#F5A623", "#E64A19"];
      inc.recommendation.diversion.routes.forEach((r, i) => {
        const d = r.polyline
          .map((p, k) => {
            const [x, y] = project(p[0], p[1]);
            return `${k === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
          })
          .join(" ");
        routes.push({
          id: `${inc.id}-r-${r.rank}`,
          d,
          color: ROUTE_COLORS[i] || "#3D5A4A",
          dashed: i > 0,
        });
      });
    }
  }

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden border border-ink/15 bg-paper-soft shadow-[0_30px_60px_-30px_rgba(14,17,22,0.3)]">
      <CityMap markers={markers} routes={routes} variant="linen" />

      {/* HUD overlays */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[0.6rem] tracking-[0.2em] uppercase text-ink/65">
        <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-paper/80 backdrop-blur border border-ink/10">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
          live · mappls
        </span>
        <span className="px-2 py-1 rounded-full bg-paper/80 backdrop-blur border border-ink/10">
          12.97°N · 77.59°E
        </span>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
        <Legend />
        <div className="px-3 py-1.5 rounded-full bg-paper/80 backdrop-blur border border-ink/10 font-mono text-[0.55rem] tracking-[0.2em] uppercase text-ink/65">
          {incidents.length} incidents · {zones.length} zones
        </div>
      </div>

      {/* Sweeping radar arc (decorative) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-multiply"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(230,74,25,0.06) 30deg, transparent 60deg)",
          animation: "sweep 16s linear infinite",
        }}
      />
    </div>
  );
}

function Legend() {
  const items = [
    { c: "#1A9641", l: "Calm" },
    { c: "#A6D96A", l: "Watch" },
    { c: "#FDAE61", l: "Elevated" },
    { c: "#FC8D59", l: "High" },
    { c: "#D7191C", l: "Critical" },
  ];
  return (
    <div className="px-3 py-2 rounded-lg bg-paper/85 backdrop-blur border border-ink/10 flex items-center gap-3">
      <span className="font-mono text-[0.55rem] tracking-[0.22em] uppercase text-ink-mute">
        Risk
      </span>
      {items.map((i) => (
        <div key={i.l} className="flex items-center gap-1.5">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: i.c }}
          />
          <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-ink/65">
            {i.l}
          </span>
        </div>
      ))}
    </div>
  );
}
