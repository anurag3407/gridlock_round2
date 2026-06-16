import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Pill } from "@/components/ui/Pill";
import { Stat } from "@/components/ui/Stat";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { PhotoPlate } from "@/components/about/PhotoPlate";

export default function Methodology() {
  return (
    <section className="pt-24 pb-32">
      <div className="container">
        {/* Top */}
        <div className="grid grid-cols-12 gap-8 items-end mb-16 pt-8">
          <div className="col-span-12 md:col-span-8">
            <Eyebrow>Methodology · For the curious judge</Eyebrow>
            <h1 className="mt-6 font-serif font-light text-display-lg tracking-tightest text-balance">
              The architecture, drawn
              <br />
              <em>without the marketing.</em>
            </h1>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className="font-serif text-xl leading-snug text-ink/75 max-w-[36ch]">
              Four learned models, one cached road graph, three algorithms,
              one socket. The end-to-end pipeline runs in under a second per
              incident.
            </p>
          </div>
        </div>

        {/* Pipeline */}
        <PipelineDiagram />

        {/* The four models */}
        <div className="mt-24">
          <Eyebrow number={1}>The Four Models</Eyebrow>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            <ModelDeep
              tag="Model A"
              name="Baseline Risk"
              feature="corridor × hour × day-of-week → risk_score (0–100)"
              why="Powers the historical heatmap and the time slider. Trained on the 7,706 unplanned events, validated against held-out weeks."
              technique="Gradient boosted decision trees · grouped k-fold by week"
            />
            <ModelDeep
              tag="Model B"
              name="Severity Classifier"
              feature="cause + corridor + time → priority + closure_probability"
              why="Calls priority (High/Low) and the probability a closure will be required. Labels are 100% present in the dataset."
              technique="Calibrated logistic + isotonic on probability"
            />
            <ModelDeep
              tag="Model C"
              name="Response Rules"
              feature="incident features → officers + barricades"
              why="Less ML, more rules — but written down so they're tunable. Officer counts and barricade hints per cause × priority."
              technique="Domain rule-set, conditional on Model B output"
            />
            <ModelDeep
              tag="Model D"
              name="Clearance Regressor"
              feature="cause + priority + corridor + time → minutes-to-clear"
              why="Predicts the countdown shown on every live feed card."
              technique="Gradient boosted regressor · log-transformed target"
            />
          </div>
        </div>

        {/* The road graph */}
        <div className="mt-24 grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow number={2}>The Road Graph</Eyebrow>
            <h2 className="mt-6 h-large text-balance">
              One graph,
              <br />
              cached on disk,
              <br />
              <em>queried in milliseconds.</em>
            </h2>
            <p className="mt-8 prose-body max-w-[44ch]">
              OSMnx is asked once for the Bengaluru drive network. The graph
              becomes a pickle (~150k nodes), pulled into memory on FastAPI
              startup. Per incident we mutate a copy: closures remove edges,
              soft delays multiply travel-time on edges by{" "}
              <code className="font-mono text-sm bg-paper-soft px-1 py-0.5 rounded">
                (1 + risk / 100 × 3)
              </code>.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4">
              <Stat value="150k" label="nodes" size="md" />
              <Stat value="3" label="algorithms" size="md" />
              <Stat value="<1s" label="end-to-end" size="md" />
            </div>
          </div>
          <div className="col-span-12 md:col-span-7">
            <CodeBlock
              title="The diversion engine"
              code={`# Per incident:
u, v, k = ox.nearest_edges(G, lng, lat)  # snap to road

if closure_probability > 0.5:
    Gr = G.copy(); Gr.remove_edge(u, v, k)              # hard block
else:
    Gr[u][v][k]['travel_time'] *= (1 + risk / 100 * 3)  # soft avoid

# Routes (Dijkstra baseline, A* for real-time, Yen's K for alternates):
nx.shortest_path(Gr, src, dst, weight="travel_time")
nx.astar_path(Gr, src, dst, heuristic=hav, weight="travel_time")
list(islice(nx.shortest_simple_paths(Gr, src, dst, weight="travel_time"), 3))`}
            />
          </div>
        </div>

        {/* The three algorithms */}
        <div className="mt-24">
          <Eyebrow number={3}>Three Algorithms, Three Jobs</Eyebrow>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <AlgoCard
              k="Dijkstra"
              when="Baseline"
              why="The shortest-by-time path. Authoritative reference for what the network thinks the optimal route is."
              cost="O((V + E) log V)"
            />
            <AlgoCard
              k="A*"
              when="Real-time recompute"
              why="Same guarantee as Dijkstra, much faster in practice with a haversine heuristic. Recomputes on each tick."
              cost="O((V + E) log V), faster in expected case"
            />
            <AlgoCard
              k="Yen's K"
              when="Top-K alternates"
              why="Real diversions need distinct alternates — not three copies of the same path. Yen's K gives an officer real options, ranked."
              cost="O(K · V · (E + V log V))"
            />
          </div>
        </div>

        {/* JSON contract */}
        <div className="mt-24" id="contract">
          <Eyebrow number={4}>The JSON Contract</Eyebrow>
          <h2 className="mt-6 h-large text-balance max-w-[24ch]">
            Three endpoints. One canvas. Same shape, everywhere.
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            <ContractCard
              code="GET /api/live-feed"
              role="HERO"
              body="Returns new incidents since the last tick, each enriched with severity, closure, clearance, affected junctions, and diversion routes."
            />
            <ContractCard
              code="GET /api/risk-map"
              role="Prevent"
              body="The proactive heatmap and a 24-hour risk timeline. One snapshot at the requested datetime; one array for the slider."
            />
            <ContractCard
              code="POST /api/forecast"
              role="Prepare"
              body="A future planned event → forecast across the event day plus next days, with hourly impact zones and confidence."
            />
          </div>
          <div className="mt-10 max-w-[70ch] prose-body">
            <p>
              Every zone arrives as{" "}
              <code className="font-mono text-sm bg-paper-soft px-1 py-0.5 rounded">
                {`{ zone_id, risk_score, color, radius_m }`}
              </code>{" "}
              — coordinates live alongside in the baseline list. The colour map
              is computed on the model side, so the frontend never invents
              thresholds; every endpoint shares the same{" "}
              <code className="font-mono text-sm bg-paper-soft px-1 py-0.5 rounded">
                legend[]
              </code>
              . Diversion routes are arrays of{" "}
              <code className="font-mono text-sm bg-paper-soft px-1 py-0.5 rounded">
                [lat, lng]
              </code>{" "}
              — drawn directly as polylines.
            </p>
          </div>
        </div>

        {/* Scope guards */}
        <div className="mt-24 grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-5">
            <Eyebrow number={5}>Scope Guards</Eyebrow>
            <h2 className="mt-6 h-large text-balance">
              What we said{" "}
              <em>no</em> to.
            </h2>
            <p className="mt-6 prose-body max-w-[42ch]">
              A demo wins on the things it deliberately leaves out.
            </p>
          </div>
          <div className="col-span-12 md:col-span-7">
            <ul className="divide-y divide-ink/15">
              <Guard
                head="No minute-level delay claims"
                body="We have an event log, not a road-speed feed. We output a risk score (0–100) and a clearance ETA, not a delay number we can't honestly defend."
              />
              <Guard
                head="No nationwide coverage"
                body="Bengaluru only. The dataset is Bengaluru, the road graph is Bengaluru. Generalising is roadmap work."
              />
              <Guard
                head="No true live city feed"
                body="The 'live' demo replays five months of real incidents over a sim-clock. In production, the same socket reads 112 / FixMyStreet / camera streams."
              />
              <Guard
                head="No accounts, no admin"
                body="This is a console for an operations room, not a public app. Authentication is somebody else's day-1 problem."
              />
            </ul>
          </div>
        </div>

        {/* Honesty rule */}
        <div className="mt-24 p-12 rounded-3xl bg-ink text-paper relative overflow-hidden">
          <div className="font-mono text-[0.65rem] tracking-[0.24em] uppercase text-signal mb-4">
            The Honesty Rule
          </div>
          <p className="font-serif text-3xl md:text-4xl leading-[1.2] text-paper max-w-[42ch] text-balance">
            We don't claim a number we couldn't get from the data. We pitch the
            system the data can defend.
          </p>
          <div className="mt-8">
            <ArrowLink href="/dashboard" variant="paper">
              Launch the console
            </ArrowLink>
          </div>
          <div
            aria-hidden
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(230,74,25,0.32), transparent 60%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function PipelineDiagram() {
  const stages = [
    "Live feed",
    "Snap to graph",
    "Severity & Clearance",
    "Spread",
    "Diversion",
    "Render",
  ];
  return (
    <div className="p-8 rounded-3xl border border-ink/15 bg-paper-soft/60">
      <div className="flex items-center justify-between mb-6">
        <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
          End-to-end pipeline
        </div>
        <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-signal">
          &lt; 1s per incident
        </div>
      </div>
      <ol className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {stages.map((s, i) => (
          <li
            key={i}
            className="relative p-4 rounded-xl bg-paper border border-ink/10 flex flex-col gap-2"
          >
            <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-signal">
              · {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-serif text-base text-ink leading-tight">
              {s}
            </span>
            {i < stages.length - 1 && (
              <span
                aria-hidden
                className="hidden md:block absolute top-1/2 -right-2 w-3 h-px bg-ink/25"
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function ModelDeep({
  tag,
  name,
  feature,
  why,
  technique,
}: {
  tag: string;
  name: string;
  feature: string;
  why: string;
  technique: string;
}) {
  return (
    <article className="p-7 rounded-2xl border border-ink/10 bg-paper-soft/60 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-signal">
          {tag}
        </span>
        <span className="font-mono text-[0.55rem] tracking-[0.22em] uppercase text-ink-mute">
          {technique}
        </span>
      </div>
      <h3 className="font-serif text-3xl text-ink">{name}</h3>
      <code className="font-mono text-xs text-ink/70 bg-paper px-2 py-1 rounded">
        {feature}
      </code>
      <p className="text-sm leading-relaxed text-ink/72">{why}</p>
    </article>
  );
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="rounded-2xl bg-ink text-paper overflow-hidden border border-ink">
      <div className="px-5 py-3 flex items-center justify-between border-b border-paper/10">
        <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-paper/55">
          {title}
        </span>
        <span className="flex items-center gap-1.5">
          {[
            "#E64A19",
            "#F5A623",
            "#A6D96A",
          ].map((c) => (
            <span
              key={c}
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: c }}
            />
          ))}
        </span>
      </div>
      <pre className="p-5 overflow-auto font-mono text-[0.78rem] leading-relaxed text-paper/85">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function AlgoCard({
  k,
  when,
  why,
  cost,
}: {
  k: string;
  when: string;
  why: string;
  cost: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-ink/15 bg-paper-soft/60 flex flex-col gap-3">
      <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-signal">
        {when}
      </div>
      <div className="font-serif text-4xl text-ink">{k}</div>
      <p className="text-sm leading-relaxed text-ink/72">{why}</p>
      <div className="mt-auto pt-3 border-t border-ink/10 font-mono text-[0.65rem] tracking-[0.18em] text-ink-mute">
        Complexity · <span className="text-ink">{cost}</span>
      </div>
    </div>
  );
}

function ContractCard({
  code,
  role,
  body,
}: {
  code: string;
  role: string;
  body: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-ink/15 bg-paper-soft/60">
      <div className="flex items-center justify-between mb-3">
        <code className="font-mono text-sm text-ink">{code}</code>
        <Pill tone={role === "HERO" ? "signal" : "outline"}>{role}</Pill>
      </div>
      <p className="text-sm leading-relaxed text-ink/75">{body}</p>
    </div>
  );
}

function Guard({ head, body }: { head: string; body: string }) {
  return (
    <li className="py-5 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-signal">
          NO
        </span>
        <span className="font-serif text-xl text-ink">{head}</span>
      </div>
      <p className="text-sm leading-relaxed text-ink/72 pl-9">{body}</p>
    </li>
  );
}
