"use client";

import { useMemo, useState } from "react";
import { mocks } from "@/lib/api";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Pill } from "@/components/ui/Pill";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { RiskGauge } from "@/components/viz/RiskGauge";
import { LiveMap } from "@/components/live/LiveMap";
import { TimelineSlider } from "@/components/live/TimelineSlider";
import { CorridorLeaderboard } from "@/components/live/CorridorLeaderboard";
import { fmtNumber } from "@/lib/utils";
import type { ZoneSnapshot } from "@/lib/types";

export default function RiskMapPage() {
  const data = mocks.risk;
  const [idx, setIdx] = useState(9); // morning peak as default

  const step = data.risk_timeline[idx];

  // Merge the time-slider snapshot onto the baseline coords
  const overlay: ZoneSnapshot[] = useMemo(() => {
    return data.baseline_zones.map((b) => {
      const live = step?.zones.find((z) => z.zone_id === b.zone_id);
      return {
        ...b,
        risk_score: live?.risk_score ?? b.risk_score,
        color: live?.color ?? b.color,
        radius_m: live?.radius_m ?? b.radius_m,
      };
    });
  }, [data.baseline_zones, step]);

  return (
    <section className="pt-24 pb-32">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <Eyebrow>Risk Map · Prevent</Eyebrow>
            <h1 className="mt-4 font-serif font-light text-display-md tracking-tightest text-balance max-w-3xl">
              Where the city
              <br />
              <em>is going to hurt.</em>
            </h1>
            <p className="mt-6 lede max-w-[48ch]">
              The proactive layer: a heatmap drawn purely from 7,706 historical
              events. Drag the time slider into tomorrow.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Pill tone="sage">Layer 01 · Prevent</Pill>
            <ArrowLink href="/dashboard">Open the live console →</ArrowLink>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5">
          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-3 flex flex-col gap-4 order-2 lg:order-1">
            <div className="p-5 rounded-2xl border border-ink/10 bg-paper-soft/70 flex flex-col items-center">
              <RiskGauge
                value={step?.overall_risk ?? data.summary.overall_risk}
                size={210}
                label="Overall · current step"
              />
              <p className="mt-4 font-serif italic text-sm text-ink/70 text-center max-w-[28ch] leading-snug">
                {data.summary.headline}
              </p>
            </div>

            <CorridorLeaderboard
              zones={data.baseline_zones}
              liveZones={overlay}
            />
          </aside>

          {/* Map */}
          <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
            <div className="relative h-[620px] md:h-[700px]">
              <LiveMap zones={overlay} />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
              <span>Fig. — Historical risk · per corridor × hour</span>
              <span>Based on {fmtNumber(data.summary.based_on_events)} events</span>
            </div>
          </div>

          {/* Right rail */}
          <aside className="col-span-12 lg:col-span-3 flex flex-col gap-4 order-3">
            <TimelineSlider timeline={data.risk_timeline} index={idx} onChange={setIdx} />

            <div className="p-5 rounded-2xl border border-ink/10 bg-paper-soft/70">
              <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-signal mb-3">
                Reading the map
              </div>
              <ol className="space-y-3 text-sm leading-relaxed text-ink/72 list-decimal pl-4">
                <li>
                  The map opens on whatever <em>now</em> looks like.
                </li>
                <li>
                  Drag the slider — bars are the city-wide risk score, by hour.
                </li>
                <li>
                  Tap a bar to jump. Tap play to scrub the full 24-hour arc.
                </li>
                <li>
                  Each corridor recolors by its predicted risk at that hour.
                </li>
              </ol>
            </div>

            <div className="p-5 rounded-2xl bg-ink text-paper">
              <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-paper/55 mb-2">
                The Question Police Ask
              </div>
              <p className="font-serif italic text-lg text-paper leading-snug">
                "It's a normal Tuesday morning. I have 50 patrol officers.
                Where do I put them so I'm already near trouble before anything
                is even reported?"
              </p>
              <div className="mt-3 font-mono text-[0.6rem] tracking-[0.22em] uppercase text-paper/55">
                ← This map is the answer.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
