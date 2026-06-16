import Link from "next/link";
import { CityMap } from "@/components/viz/CityMap";
import { CorridorMarquee } from "@/components/chrome/Marquee";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Stat } from "@/components/ui/Stat";
import { Pill } from "@/components/ui/Pill";
import { RiskGauge } from "@/components/viz/RiskGauge";
import { Sparkline } from "@/components/viz/Sparkline";
import { WaveDivider } from "@/components/viz/WaveDivider";

const HERO_MARKERS = [
  { id: "h1", cx: 240, cy: 165, color: "#D7191C", radius: 11, label: "TUMKUR" },
  { id: "h2", cx: 620, cy: 320, color: "#D7191C", radius: 12, label: "ORR EAST" },
  { id: "h3", cx: 555, cy: 470, color: "#FC8D59", radius: 10, label: "HOSUR" },
  { id: "h4", cx: 412, cy: 248, color: "#FDAE61", radius: 8 },
  { id: "h5", cx: 360, cy: 388, color: "#A6D96A", radius: 7 },
];

const HERO_ROUTES = [
  { id: "r1", d: "M 240 165 Q 300 230 380 260 Q 460 290 540 290", color: "#3D5A4A" },
  { id: "r2", d: "M 620 320 Q 550 360 480 380 Q 410 396 360 388", color: "#E64A19", dashed: true },
];

export default function Home() {
  return (
    <>
      <Hero />
      <CorridorMarquee />
      <ProblemSection />
      <ThreeLayers />
      <SystemSection />
      <NumbersBand />
      <DemoFlow />
      <CtaSection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden">
      {/* Editorial masthead */}
      <div className="container">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-10">
              <Pill tone="outline">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                Edition 01 · Bengaluru
              </Pill>
              <Pill tone="outline">Volume 24 · Theme 2</Pill>
            </div>

            <h1 className="font-serif font-light text-display-xl tracking-tightest text-ink text-balance">
              The city's
              <br />
              <span className="italic">nervous system,</span>
              <br />
              in real time.
            </h1>

            <p className="mt-10 max-w-[52ch] font-serif text-2xl md:text-[1.7rem] leading-[1.32] text-ink/85 font-light text-pretty">
              ASTRAM is a live operations console for Bengaluru's traffic — a
              system that <em>detects</em> a breakdown the moment it happens,
              <em> predicts</em> how long it will block the road, and
              <em> redraws</em> the route around it before the queue forms.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link href="/dashboard" className="btn-ink">
                Launch the live console
                <span aria-hidden>→</span>
              </Link>
              <Link href="/about" className="btn-ghost">
                Read the story
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl">
              <MicroFact value="8,173" label="real incidents" />
              <MicroFact value="5 months" label="of Bengaluru" />
              <MicroFact value="3 engines" label="prevent · react · prepare" />
            </div>
          </div>

          {/* Hero map */}
          <div className="col-span-12 lg:col-span-5 lg:pl-6 relative">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden bg-paper-soft border border-ink/10 shadow-[0_30px_60px_-20px_rgba(14,17,22,0.25)]">
              <CityMap
                markers={HERO_MARKERS}
                routes={HERO_ROUTES}
                variant="linen"
              />
              {/* Live HUD overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[0.6rem] tracking-[0.2em] uppercase text-ink/65">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                  live · t+00:00:14
                </span>
                <span>12.97°N · 77.59°E</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-ink/55 mb-1">
                    Active
                  </div>
                  <div className="font-serif text-3xl tabular-nums">
                    02
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-ink/55 mb-1">
                    Avg clearance
                  </div>
                  <div className="font-serif text-3xl tabular-nums">
                    2<span className="text-ink-mute">h</span>08
                  </div>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="absolute -bottom-12 left-2 right-2 flex items-center gap-3">
              <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
                Fig. 01 —
              </span>
              <p className="font-serif italic text-sm text-ink/70 leading-snug">
                Two unplanned incidents on Tumkur Rd and ORR East. The dashed
                line is a Yen's-K diversion around the closure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative side rail */}
      <div className="hidden lg:block absolute left-6 top-44 bottom-12 w-px bg-ink/10" />
      <div className="hidden lg:flex absolute left-2 top-44 flex-col gap-1 font-mono text-[0.6rem] tracking-[0.25em] uppercase text-ink-mute rotate-180 [writing-mode:vertical-rl]">
        <span>Flipkart GRID — Theme 2 — Round 02</span>
      </div>
    </section>
  );
}

function MicroFact({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-4xl font-light tabular-nums leading-none">
        {value}
      </div>
      <div className="mt-2 font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
        {label}
      </div>
    </div>
  );
}

function ProblemSection() {
  return (
    <section className="relative py-32 border-y border-ink/10 bg-paper-soft/60">
      <div className="container grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 md:col-span-4">
          <Eyebrow number={1}>The Problem</Eyebrow>
          <h2 className="mt-6 h-large text-balance">
            The hard part isn't the
            <span className="italic"> jam.</span>
            <br />
            It's the one nobody saw
            <br />
            coming.
          </h2>
        </div>

        <div className="col-span-12 md:col-span-8 md:pl-12">
          <p className="lede">
            In five months of Bengaluru data, <span className="scribble">7,706 of 8,173 disruptions</span>{" "}
            were <em>unplanned</em> — breakdowns, waterlogging, accidents, tree
            falls. The other 467 had calendars; these had nothing.
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <RatioCard
              label="Unplanned"
              value="7,706"
              percent={94}
              tone="signal"
            />
            <RatioCard label="Planned" value="467" percent={6} tone="sage" />
            <RatioCard
              label="Median clearance"
              value="121"
              unit="min"
              percent={48}
              tone="ink"
            />
            <RatioCard
              label="Top 10 corridors carry"
              value="82%"
              percent={82}
              tone="amber"
            />
          </div>

          <div className="mt-16 grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-7">
              <p className="prose-body">
                Today the response is experience-led: an officer at Trinity
                Circle remembers Tumkur Road tightens at 9. ASTRAM gives that
                instinct a body. It learns which corridors fail, when, and what
                to do — and it does it the second the incident arrives.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <figure>
                <Sparkline
                  data={[
                    18, 22, 21, 28, 36, 45, 62, 71, 88, 76, 64, 58, 60, 65, 72,
                    81, 92, 88, 71, 60, 52, 40, 30, 24,
                  ]}
                  width={360}
                  height={70}
                />
                <figcaption className="mt-2">
                  Fig. 02 — Hourly incident density · weekday median
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RatioCard({
  label,
  value,
  unit,
  percent,
  tone,
}: {
  label: string;
  value: string;
  unit?: string;
  percent: number;
  tone: "signal" | "sage" | "ink" | "amber";
}) {
  const colors: Record<string, string> = {
    signal: "#E64A19",
    sage: "#3D5A4A",
    ink: "#0E1116",
    amber: "#F5A623",
  };
  return (
    <div className="flex flex-col gap-3 p-5 bg-paper rounded-lg border border-ink/8">
      <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
        {label}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-serif font-light text-5xl tabular-nums leading-none">
          {value}
        </span>
        {unit && (
          <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-ink-mute">
            {unit}
          </span>
        )}
      </div>
      <div className="relative h-1 w-full bg-ink/8 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${percent}%`,
            background: colors[tone],
          }}
        />
      </div>
    </div>
  );
}

function ThreeLayers() {
  return (
    <section className="relative py-32">
      <div className="container">
        <div className="grid grid-cols-12 gap-8 items-end mb-16">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow number={2}>The Architecture</Eyebrow>
            <h2 className="mt-6 h-large text-balance">
              Three layers, one map.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <p className="prose-body text-lg max-w-[48ch]">
              A system that only reacts is half a solution. ASTRAM watches
              history to <em>prevent</em>, the live feed to <em>react</em>, and
              the planned-event forecast to <em>prepare</em>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <LayerCard
            num="01"
            title="Prevent"
            kicker="Historical risk map"
            body="A heatmap drawn from 7,706 events. Drag the time slider to any hour, any day-of-week. The map recolors to show what history says is risky — so patrols arrive before the call."
            accent="#3D5A4A"
            illo={<PreventIllo />}
          />
          <LayerCard
            num="02"
            title="React"
            kicker="Real-time engine"
            body="The moment an incident arrives, models predict its severity, closure probability, and minutes-to-clear. The road graph computes a top-3 diversion. Officers see a card; the map draws the route."
            accent="#E64A19"
            illo={<ReactIllo />}
            featured
          />
          <LayerCard
            num="03"
            title="Prepare"
            kicker="Planned-event forecast"
            body="A known concert, rally, or match. Submit it; the forecast engine paints the impact zones across the next three days, hour by hour, with confidence shaded."
            accent="#F5A623"
            illo={<PrepareIllo />}
          />
        </div>
      </div>
    </section>
  );
}

function LayerCard({
  num,
  title,
  kicker,
  body,
  accent,
  illo,
  featured = false,
}: {
  num: string;
  title: string;
  kicker: string;
  body: string;
  accent: string;
  illo: React.ReactNode;
  featured?: boolean;
}) {
  return (
    <article
      className={`group relative flex flex-col rounded-2xl overflow-hidden border ${
        featured
          ? "bg-ink text-paper border-ink"
          : "bg-paper-soft text-ink border-ink/10"
      } transition-transform duration-500 hover:-translate-y-1`}
    >
      <div
        className="aspect-[16/10] relative overflow-hidden"
        style={{ background: featured ? "#0E1116" : "#EAE4D5" }}
      >
        {illo}
      </div>

      <div className="flex-1 p-7 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span
            className={`font-mono text-[0.65rem] tracking-[0.22em] uppercase ${
              featured ? "text-paper/55" : "text-ink-mute"
            }`}
          >
            Layer {num}
          </span>
          <span
            className="font-mono text-[0.65rem] tracking-[0.22em] uppercase"
            style={{ color: accent }}
          >
            {kicker}
          </span>
        </div>
        <h3
          className={`font-serif font-light text-5xl tracking-tightest ${
            featured ? "text-paper" : "text-ink"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-base leading-relaxed ${
            featured ? "text-paper/75" : "text-ink/75"
          }`}
        >
          {body}
        </p>
        <div className="mt-auto pt-4 border-t border-current/15">
          <ArrowLink
            href={
              num === "01"
                ? "/risk-map"
                : num === "02"
                ? "/dashboard"
                : "/methodology#forecast"
            }
            variant={featured ? "paper" : "ink"}
          >
            See it →
          </ArrowLink>
        </div>
      </div>
    </article>
  );
}

function PreventIllo() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      <defs>
        <radialGradient id="pv-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3D5A4A" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#3D5A4A" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* horizon */}
      <line
        x1="0"
        y1="180"
        x2="400"
        y2="180"
        stroke="#0E1116"
        strokeOpacity="0.25"
      />
      {/* time tick row */}
      {Array.from({ length: 24 }).map((_, i) => {
        const x = 20 + (i / 23) * 360;
        const tall = [8, 12, 17, 21].includes(i);
        return (
          <line
            key={i}
            x1={x}
            y1="180"
            x2={x}
            y2={tall ? 170 : 176}
            stroke="#0E1116"
            strokeOpacity={tall ? 0.7 : 0.4}
          />
        );
      })}
      {/* risk curve */}
      <path
        d="M 20 160 Q 80 158 110 140 Q 140 110 170 95 Q 200 92 230 110 Q 260 132 290 80 Q 320 70 350 95 Q 370 110 380 130"
        fill="none"
        stroke="#3D5A4A"
        strokeWidth="2.4"
      />
      <path
        d="M 20 160 Q 80 158 110 140 Q 140 110 170 95 Q 200 92 230 110 Q 260 132 290 80 Q 320 70 350 95 Q 370 110 380 130 L 380 180 L 20 180 Z"
        fill="url(#pv-glow)"
      />
      {/* slider knob */}
      <circle cx="290" cy="80" r="6" fill="#3D5A4A" />
      <circle cx="290" cy="80" r="14" fill="#3D5A4A" fillOpacity="0.18" />
      <text
        x="20"
        y="210"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        letterSpacing="2"
        fill="#0E1116"
        opacity="0.65"
      >
        00:00 06:00 12:00 18:00 24:00
      </text>
    </svg>
  );
}

function ReactIllo() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      <defs>
        <radialGradient id="rt-pulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E64A19" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#E64A19" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* abstract roads */}
      <path
        d="M 30 200 Q 120 180 200 140 T 380 60"
        stroke="#F2EEE5"
        strokeOpacity="0.2"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M 30 60 Q 120 90 200 110 T 380 200"
        stroke="#F2EEE5"
        strokeOpacity="0.2"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M 60 30 L 60 220"
        stroke="#F2EEE5"
        strokeOpacity="0.12"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M 340 30 L 340 220"
        stroke="#F2EEE5"
        strokeOpacity="0.12"
        strokeWidth="1"
        fill="none"
      />
      {/* main route in signal */}
      <path
        d="M 60 200 L 200 125 L 340 60"
        stroke="#E64A19"
        strokeWidth="2.6"
        fill="none"
      />
      <path
        d="M 60 200 Q 130 220 200 200 Q 270 175 340 60"
        stroke="#A6D96A"
        strokeWidth="2"
        strokeDasharray="5 4"
        fill="none"
      />
      {/* incident pulse */}
      <circle cx="200" cy="125" r="60" fill="url(#rt-pulse)" />
      <circle cx="200" cy="125" r="8" fill="#E64A19" />
      <circle
        cx="200"
        cy="125"
        r="3"
        fill="#F2EEE5"
      />
      <text
        x="210"
        y="120"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        letterSpacing="2"
        fill="#F2EEE5"
        opacity="0.85"
      >
        T+00:00:14
      </text>
    </svg>
  );
}

function PrepareIllo() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full">
      <defs>
        <linearGradient id="pp-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5A623" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F5A623" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* calendar grid */}
      {Array.from({ length: 7 }).map((_, i) => (
        <line
          key={i}
          x1={40 + i * 50}
          y1="40"
          x2={40 + i * 50}
          y2="200"
          stroke="#0E1116"
          strokeOpacity="0.1"
        />
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <line
          key={i}
          x1="40"
          y1={40 + i * 53}
          x2="340"
          y2={40 + i * 53}
          stroke="#0E1116"
          strokeOpacity="0.1"
        />
      ))}
      {/* highlighted day */}
      <rect
        x="140"
        y="40"
        width="50"
        height="160"
        fill="#F5A623"
        opacity="0.2"
      />
      <circle cx="165" cy="65" r="6" fill="#F5A623" />
      <text
        x="165"
        y="220"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        letterSpacing="2"
        fill="#0E1116"
        opacity="0.65"
      >
        EVENT
      </text>
      {/* curve */}
      <path
        d="M 40 170 Q 90 160 140 145 Q 180 125 200 80 Q 230 70 260 95 Q 300 130 340 165"
        stroke="#F5A623"
        strokeWidth="2.4"
        fill="none"
      />
      <path
        d="M 40 170 Q 90 160 140 145 Q 180 125 200 80 Q 230 70 260 95 Q 300 130 340 165 L 340 200 L 40 200 Z"
        fill="url(#pp-grad)"
      />
    </svg>
  );
}

function SystemSection() {
  return (
    <section className="relative py-32 bg-ink text-paper overflow-hidden">
      <div className="container grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-5">
          <Eyebrow number={3} variant="signal">
            The System
          </Eyebrow>
          <h2 className="mt-6 h-large text-paper text-balance">
            Four models.
            <br />
            One graph.
            <br />
            <em className="text-paper/55">Live in seconds.</em>
          </h2>

          <p className="mt-10 prose-body text-paper/75 max-w-[42ch]">
            ASTRAM is a small constellation of well-aimed models, wired to a
            cached road graph of greater Bengaluru. Each incident lights up the
            pipeline end-to-end in under a second.
          </p>

          <div className="mt-10">
            <ArrowLink href="/methodology" variant="paper">
              Read the methodology
            </ArrowLink>
          </div>
        </div>

        <div className="col-span-12 md:col-span-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ModelCard
              tag="Model A"
              name="Baseline Risk"
              detail="Risk per corridor × hour × day-of-week. Drives the historical heatmap and the time slider."
            />
            <ModelCard
              tag="Model B"
              name="Severity Classifier"
              detail="Predicts priority (High/Low) and closure probability for any incident as it arrives."
              accent
            />
            <ModelCard
              tag="Model C"
              name="Response Rules"
              detail="Recommends officer count and barricade placements per incident type."
            />
            <ModelCard
              tag="Model D"
              name="Clearance Regressor"
              detail="Minutes-to-clear, conditioned on cause, priority, corridor, and time of day."
            />
            <div className="md:col-span-2">
              <ModelCard
                tag="Engine"
                name="Diversion Service"
                detail="OSMnx + NetworkX: Dijkstra baseline, A* for real-time recompute, Yen's K for top-3 alternates. Real road polylines, not synthetic."
                wide
              />
            </div>
          </div>
        </div>
      </div>

      {/* Side label */}
      <div className="hidden lg:block absolute right-4 top-32 bottom-12 w-px bg-paper/15" />
    </section>
  );
}

function ModelCard({
  tag,
  name,
  detail,
  accent = false,
  wide = false,
}: {
  tag: string;
  name: string;
  detail: string;
  accent?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className={`relative p-6 rounded-xl border ${
        accent
          ? "bg-signal/8 border-signal/30"
          : "bg-paper/[0.03] border-paper/12"
      } overflow-hidden`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`font-mono text-[0.6rem] tracking-[0.22em] uppercase ${
            accent ? "text-signal" : "text-paper/55"
          }`}
        >
          {tag}
        </span>
        <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-paper/35">
          {wide ? "Real-time" : "Trained"}
        </span>
      </div>
      <h4 className="font-serif text-3xl text-paper mb-2.5">{name}</h4>
      <p className="text-sm leading-relaxed text-paper/65 max-w-[44ch]">
        {detail}
      </p>
    </div>
  );
}

function NumbersBand() {
  return (
    <section className="relative py-32 bg-paper-soft/70 border-y border-ink/10">
      <div className="container">
        <div className="mb-16">
          <Eyebrow number={4}>By the Numbers</Eyebrow>
          <h2 className="mt-6 h-large text-balance max-w-[18ch]">
            What five months
            <br />
            of Bengaluru taught us.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <Stat
            value="8,173"
            label="recorded events"
            caption="Across 5 months of operational logs."
            size="xl"
          />
          <Stat
            value="50"
            unit="/ day"
            label="median frequency"
            caption="The pipeline replays this rhythm in real time."
            size="xl"
          />
          <Stat
            value="121"
            unit="min"
            label="median clearance"
            caption="Long enough that diversions actually matter."
            size="xl"
          />
          <Stat
            value="82%"
            label="on 10 corridors"
            caption="Risk is concentrated — and therefore learnable."
            size="xl"
          />
        </div>

        <div className="mt-20 grid grid-cols-12 gap-6 items-center">
          <figure className="col-span-12 md:col-span-7">
            <div className="aspect-[16/9] rounded-2xl bg-paper border border-ink/10 p-6 flex items-end gap-1">
              {/* Bar chart of corridor share */}
              {[
                { l: "Tumkur Rd", v: 82 },
                { l: "ORR E", v: 72 },
                { l: "Hosur", v: 68 },
                { l: "Mysore", v: 60 },
                { l: "Old Madras", v: 56 },
                { l: "Magadi", v: 50 },
                { l: "Bellary", v: 48 },
                { l: "Bann.ghatta", v: 44 },
                { l: "Sarjapur", v: 40 },
                { l: "ORR N", v: 38 },
              ].map((b, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col justify-end h-full">
                    <div
                      style={{
                        height: `${b.v}%`,
                        background:
                          b.v >= 70
                            ? "#E64A19"
                            : b.v >= 55
                            ? "#F5A623"
                            : "#3D5A4A",
                      }}
                      className="rounded-t"
                    />
                  </div>
                  <span className="font-mono text-[0.55rem] tracking-[0.18em] uppercase text-ink-mute rotate-[-45deg] origin-top-left whitespace-nowrap pl-2">
                    {b.l}
                  </span>
                </div>
              ))}
            </div>
            <figcaption className="mt-3">
              Fig. 03 — Share of disruptive events by corridor · top 10 = 82%
            </figcaption>
          </figure>

          <div className="col-span-12 md:col-span-5 md:pl-8">
            <p className="pull-quote">
              "Eighty-two percent of the city's traffic pain lives on ten
              streets. The math of where to look was already there. We just
              hadn't written it down."
            </p>
            <div className="mt-6 font-mono text-[0.7rem] tracking-[0.22em] uppercase text-ink-mute">
              — From the field notes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoFlow() {
  const steps = [
    {
      t: "00:00:00",
      title: "Baseline is on.",
      body:
        "The map opens with the historical risk layer already glowing on hotspot corridors.",
    },
    {
      t: "00:00:14",
      title: "An incident lands.",
      body:
        "Breakdown at Jalahalli Cross. The map drops a pulse; a card slides into the feed.",
    },
    {
      t: "00:00:14",
      title: "Models speak in milliseconds.",
      body:
        "High priority · 71% closure · clears in ~95 minutes · risk-score 82.",
    },
    {
      t: "00:00:15",
      title: "The route redraws.",
      body:
        "Three diversions appear, ranked by ETA. The officer picks one, dispatch follows.",
    },
    {
      t: "00:00:18",
      title: "Tomorrow, at a glance.",
      body:
        "Drag the time slider to 09:00 tomorrow — the map shows what history says will hurt.",
    },
  ];
  return (
    <section className="relative py-32">
      <div className="container">
        <div className="grid grid-cols-12 gap-8 mb-16 items-end">
          <div className="col-span-12 md:col-span-6">
            <Eyebrow number={5}>The Demo</Eyebrow>
            <h2 className="mt-6 h-large text-balance">
              A two minute walk-through.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <p className="prose-body">
              We replay 5 months of real Bengaluru incidents as a live stream.
              In production, the same socket reads the city's 112 / FixMyStreet
              / camera feeds. Same code, different source.
            </p>
          </div>
        </div>

        <ol className="relative grid grid-cols-1 md:grid-cols-5 gap-0 border-t border-ink/15">
          {steps.map((s, i) => (
            <li
              key={i}
              className="relative p-6 md:p-7 border-b md:border-b-0 md:border-r border-ink/10 last:border-r-0 group"
            >
              <div className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-signal mb-3">
                T+{s.t}
              </div>
              <h3 className="font-serif text-2xl text-ink leading-tight mb-3">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink/72">{s.body}</p>
              <div className="absolute -top-px left-0 h-1 w-0 bg-signal transition-all duration-700 group-hover:w-full" />
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-end">
          <ArrowLink href="/dashboard" variant="signal">
            Open the console
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="relative py-40 overflow-hidden">
      <div className="container relative">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-7">
            <Eyebrow>Try it →</Eyebrow>
            <h2 className="mt-6 h-display text-balance">
              See the
              <br />
              city move.
            </h2>
            <p className="mt-8 lede max-w-[40ch]">
              The console is hot. Mock data is wired. Hit play, watch the city
              breathe, and divert a road in real time.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/dashboard" className="btn-ink">
                Launch the live console
                <span aria-hidden>→</span>
              </Link>
              <Link href="/risk-map" className="btn-ghost">
                Open the risk map
              </Link>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5">
            <div className="relative flex flex-col items-center gap-6">
              <RiskGauge value={68} label="City risk · now" />
              <div className="grid grid-cols-3 gap-6 w-full max-w-sm">
                <MicroFact value="02" label="active" />
                <MicroFact value="02" label="high" />
                <MicroFact value="2h08" label="avg ETA" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute -top-32 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(230,74,25,0.16), transparent 60%)",
        }}
      />
    </section>
  );
}
