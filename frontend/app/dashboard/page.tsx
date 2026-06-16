"use client";

import { useEffect, useMemo, useState } from "react";
import { mocks } from "@/lib/api";
import type { Incident } from "@/lib/types";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Pill } from "@/components/ui/Pill";
import { SummaryHeader } from "@/components/live/SummaryHeader";
import { SimClock } from "@/components/live/SimClock";
import { IncidentCard } from "@/components/live/IncidentCard";
import { LiveMap } from "@/components/live/LiveMap";
import { DiversionPanel } from "@/components/live/DiversionPanel";
import { AffectedJunctions } from "@/components/live/AffectedJunctions";
import { ArrowLink } from "@/components/ui/ArrowLink";

export default function DashboardPage() {
  const live = mocks.live;
  const incidents = live.new_incidents;
  const zones = mocks.risk.baseline_zones;
  const [activeId, setActiveId] = useState<string>(incidents[0]?.id || "");
  const active = useMemo(
    () => incidents.find((i) => i.id === activeId) || incidents[0],
    [incidents, activeId]
  );

  // Mock "live tick" — cycles a fake clearance countdown
  const [now, setNow] = useState<number>(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="pt-24 pb-32">
      <div className="container">
        {/* Page chrome */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <Eyebrow>Live Console · D12–D18</Eyebrow>
            <h1 className="mt-4 font-serif font-light text-display-md tracking-tightest text-balance max-w-2xl">
              Bengaluru,
              <br />
              <em>at the moment of the break.</em>
            </h1>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Pill tone="signal">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-paper animate-pulse" />
              Live · Mocked
            </Pill>
            <Pill tone="outline">Theme 2 · Round 2</Pill>
            <ArrowLink href="/methodology">How it works →</ArrowLink>
          </div>
        </div>

        {/* Top metric row */}
        <SummaryHeader data={live} />

        <div className="mt-3 text-xs font-serif italic text-ink/75 max-w-3xl">
          “{live.summary.headline}”
        </div>

        {/* Main grid: feed + map + detail */}
        <div className="mt-8 grid grid-cols-12 gap-5">
          {/* Live feed column */}
          <aside className="col-span-12 lg:col-span-3 flex flex-col gap-4 order-2 lg:order-1">
            <SimClock initial={live.sim_time} speed={1} />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[0.6rem] tracking-[0.24em] uppercase text-ink-mute">
                  Live Feed
                </span>
                <span className="font-mono text-[0.6rem] tracking-[0.24em] uppercase text-signal">
                  {incidents.length} new
                </span>
              </div>
              <div className="flex flex-col gap-3 max-h-[680px] overflow-y-auto pr-1">
                {incidents.map((inc) => (
                  <IncidentCard
                    key={inc.id}
                    incident={inc}
                    active={inc.id === active?.id}
                    onClick={() => setActiveId(inc.id)}
                  />
                ))}
              </div>
            </div>

            <ConnectionCard now={now} />
          </aside>

          {/* Map */}
          <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
            <div className="relative h-[640px] md:h-[720px]">
              <LiveMap
                zones={zones}
                incidents={incidents}
                activeIncidentId={active?.id}
              />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
              <span>Fig. — Bengaluru drive graph · OSMnx</span>
              <span>Mappls SDK will mount here in prod</span>
            </div>
          </div>

          {/* Detail */}
          <aside className="col-span-12 lg:col-span-3 flex flex-col gap-4 order-3">
            {active && (
              <>
                <IncidentSnapshot inc={active} />
                <AffectedJunctions incident={active} />
                <DiversionPanel incident={active} />
              </>
            )}
          </aside>
        </div>

        <PipelineStrip />
      </div>
    </section>
  );
}

function IncidentSnapshot({ inc }: { inc: Incident }) {
  const incident = inc;
  return (
    <div className="p-5 rounded-xl bg-ink text-paper relative overflow-hidden">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-paper/55">
            Selected · {incident.id}
          </div>
          <div className="font-serif text-2xl mt-1 leading-tight">
            {incident.corridor}
          </div>
        </div>
        <span
          className="h-3 w-3 rounded-full animate-pulse"
          style={{ background: incident.color }}
        />
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
        <SnapMetric label="Priority" value={incident.predicted_priority} />
        <SnapMetric
          label="Closure"
          value={`${Math.round(incident.closure_probability * 100)}%`}
        />
        <SnapMetric
          label="Risk"
          value={String(incident.risk_score)}
        />
      </div>
      <div
        aria-hidden
        className="absolute -bottom-12 -right-12 w-44 h-44 rounded-full"
        style={{
          background: `radial-gradient(circle, ${incident.color}33, transparent 70%)`,
        }}
      />
    </div>
  );
}

function SnapMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-paper/55">
        {label}
      </div>
      <div className="font-serif text-xl tabular-nums">{value}</div>
    </div>
  );
}

function ConnectionCard({ now }: { now: number }) {
  const seconds = Math.floor(now / 1000) % 60;
  const dots = ".".repeat((seconds % 3) + 1);
  return (
    <div className="p-4 rounded-xl border border-ink/10 bg-paper-soft/70">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
          Connection
        </span>
        <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-sage">
          ● Healthy
        </span>
      </div>
      <div className="font-mono text-[0.65rem] text-ink/70 leading-relaxed">
        <div>GET /api/live-feed</div>
        <div className="text-ink-mute">since={"<sim_time>"}{dots}</div>
        <div className="mt-1.5 text-ink-mute">
          USE_MOCK = 1 · swap NEXT_PUBLIC_USE_MOCK=0 for live FastAPI
        </div>
      </div>
    </div>
  );
}

function PipelineStrip() {
  const stages = [
    { t: "01", k: "Detect", body: "Live feed receives an incident over the socket." },
    {
      t: "02",
      k: "Severity · Model B",
      body: "Predicts priority (High/Low) and closure probability.",
    },
    {
      t: "03",
      k: "Clearance · Model D",
      body: "Estimates minutes-to-clear from cause and context.",
    },
    {
      t: "04",
      k: "Spread",
      body: "Identifies the next 2–3 junctions that will choke.",
    },
    {
      t: "05",
      k: "Divert",
      body: "Yen's K-shortest paths on the cached OSMnx graph.",
    },
    {
      t: "06",
      k: "Render",
      body: "Card slides in, map redraws, the room moves.",
    },
  ];
  return (
    <div className="mt-16">
      <div className="flex items-end justify-between mb-6">
        <Eyebrow number={1}>Pipeline · per incident</Eyebrow>
        <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
          end-to-end &lt; 1s
        </span>
      </div>
      <ol className="grid grid-cols-2 md:grid-cols-6 border border-ink/15 rounded-xl overflow-hidden">
        {stages.map((s, i) => (
          <li
            key={s.t}
            className={`p-5 ${
              i < stages.length - 1 ? "md:border-r border-ink/10" : ""
            } ${i < stages.length - 2 ? "border-b md:border-b-0 border-ink/10" : ""}`}
          >
            <div className="font-mono text-[0.55rem] tracking-[0.22em] uppercase text-signal mb-2">
              · {s.t}
            </div>
            <div className="font-serif text-base text-ink mb-1.5">{s.k}</div>
            <p className="text-xs text-ink/65 leading-snug">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
