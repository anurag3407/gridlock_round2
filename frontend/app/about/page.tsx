import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ChapterMark } from "@/components/ui/ChapterMark";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Pill } from "@/components/ui/Pill";
import { RevealOnView } from "@/components/about/RevealOnView";
import { ScrollMap } from "@/components/about/ScrollMap";
import { PhotoPlate } from "@/components/about/PhotoPlate";
import { Sparkline } from "@/components/viz/Sparkline";

export default function AboutPage() {
  return (
    <>
      <Masthead />
      <Cover />
      <ByLine />
      <Lede />

      {/* The two-column scrolling narrative — sticky map on the right */}
      <div className="container relative mt-24">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-7">
            <Chapter01 />
            <Chapter02 />
            <Chapter03 />
            <Chapter04 />
            <Chapter05 />
          </div>
          <aside className="col-span-12 lg:col-span-5 hidden lg:block">
            <div className="sticky top-28">
              <div className="relative h-[560px]">
                <ScrollMap />
              </div>
              <div className="mt-4 flex items-center justify-between font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
                <span>Fig. — Narrative map</span>
                <span>Scroll to read</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Epilogue />
      <Team />
    </>
  );
}

function Masthead() {
  return (
    <section className="relative pt-32 pb-8">
      <div className="container">
        <div className="flex items-center justify-between hairline pb-3 mb-12">
          <div className="font-mono text-[0.65rem] tracking-[0.28em] uppercase text-ink-mute">
            The Story · Issue 01
          </div>
          <div className="hidden sm:flex items-center gap-6 font-mono text-[0.65rem] tracking-[0.22em] uppercase text-ink-mute">
            <span>Bengaluru</span>
            <span>·</span>
            <span>June 2026</span>
            <span>·</span>
            <span>Team ASTRAM</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cover() {
  return (
    <section className="relative">
      <div className="container">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div className="font-mono text-[0.7rem] tracking-[0.28em] uppercase text-signal mb-6">
              A feature in five chapters
            </div>
            <h1 className="font-serif font-light text-[clamp(3.2rem,8.5vw,8rem)] leading-[0.92] tracking-tightest text-ink text-balance">
              The city
              <br />
              that broke,
              <br />
              <em className="text-ink/55">and the system</em>
              <br />
              that learned it.
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:pl-6">
            <p className="font-serif text-xl md:text-2xl leading-snug text-ink/80 italic max-w-[34ch]">
              The story of building a console for a city that doesn't ask
              permission before it stops.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Pill tone="outline">15 min read</Pill>
              <Pill tone="outline">Theme 2 · Round 2</Pill>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ByLine() {
  return (
    <section className="mt-16">
      <div className="container">
        <div className="hairline pt-6 flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-8">
            <div>
              <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute mb-1">
                Written by
              </div>
              <div className="font-serif text-lg text-ink">Team ASTRAM</div>
            </div>
            <div>
              <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute mb-1">
                Photography
              </div>
              <div className="font-serif text-lg text-ink">Stock + originals</div>
            </div>
            <div>
              <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute mb-1">
                Built with
              </div>
              <div className="font-serif text-lg text-ink">Next.js · Mappls</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Pill tone="signal">Live</Pill>
            <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
              Replays 5 months of real Bengaluru data
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Lede() {
  return (
    <section className="mt-16 mb-16">
      <div className="container">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-1">
            <span className="font-serif font-light text-[5rem] leading-none text-signal">
              ¶
            </span>
          </div>
          <div className="col-span-12 md:col-span-10">
            <p className="font-serif text-3xl md:text-[2.4rem] leading-[1.28] tracking-tight text-ink font-light text-balance">
              At <span className="tabular-nums">9:02</span> on a Tuesday, a
              lorry leaks oil on Tumkur Road. By <span className="tabular-nums">9:07</span>, a
              breakdown on the same kilometre slows the inside lane to twelve.
              By <span className="tabular-nums">9:14</span>, the queue is on
              the Outer Ring and forty thousand commuters are late. This story
              is about the four minutes we'd like to give back.
            </p>
            <PhotoPlate
              className="mt-12"
              promptId="P01"
              variant="warm"
              aspect="3/2"
              alt="Aerial view of Tumkur Road at dawn, soft golden light catching the elevated metro line, traffic still sparse, mist hanging over Peenya industrial buildings"
              caption="Tumkur Road, 06:42 — before the city wakes."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Chapter01() {
  return (
    <article className="relative pb-32 pt-12 border-t border-ink/15">
      <RevealOnView>
        <ChapterMark number={1} title="The Honk" />
      </RevealOnView>
      <RevealOnView delay={0.1}>
        <h2 className="mt-10 font-serif text-5xl md:text-6xl tracking-tightest leading-[1.02] text-ink">
          Bengaluru does not have a rush hour.
          <br />
          <span className="italic text-ink/55">
            It has a rush century.
          </span>
        </h2>
      </RevealOnView>

      <RevealOnView delay={0.15}>
        <div className="mt-10 columns-1 md:columns-2 gap-10 prose-body [&_p]:mb-4">
          <p>
            Ask anyone here when the traffic is bad and they will give you a
            shrug — the answer is <em>always</em>, the question is{" "}
            <em>where</em>. The city has eleven million people and a road
            network designed for a smaller idea of itself. The result is a kind
            of slow chess played daily by patrol officers, dispatch radios, and
            the man at the tea stall who's been at this junction for a decade
            and knows what the morning sounds like.
          </p>
          <p>
            What we noticed, building this, was that the chess pieces were all
            there. <span className="scribble">Tumkur Road tightens at nine.</span>{" "}
            ORR East floods after the third heavy rain in October. A breakdown
            on Hosur Road on a Friday evening is a different animal than the
            same breakdown on a Sunday morning. The officers at the operations
            room know all of this. It lives in heads, in scrap notebooks, in
            the small choices someone makes about where to send the next
            patrol.
          </p>
          <p>
            We thought: <em>this is data.</em> Not the kind that needs
            sensors-everywhere or a billion in capex. The kind that's been
            written down, day after day, in the incident logs of the city's
            traffic authority. <span className="font-mono text-sm">Astram</span>{" "}
            — Actionable Situational Trends Analyzed across Multiple modes —
            is a real Bengaluru Police initiative. The dataset on our drive is
            the proof.
          </p>
        </div>
      </RevealOnView>

      <RevealOnView delay={0.2}>
        <PullQuote text="The instinct was already in the room. We wanted to give it a body." />
      </RevealOnView>
    </article>
  );
}

function Chapter02() {
  return (
    <article className="relative pb-32 pt-16 border-t border-ink/15" id="data">
      <RevealOnView>
        <ChapterMark number={2} title="The Pattern" />
      </RevealOnView>

      <RevealOnView delay={0.1}>
        <p className="mt-10 lede max-w-[44ch]">
          Five months. Eight thousand events. One city.
        </p>
      </RevealOnView>

      <RevealOnView delay={0.15}>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <BigStat value="8,173" label="recorded events" />
          <BigStat value="7,706" label="unplanned" accent />
          <BigStat value="467" label="planned" />
          <BigStat value="121" label="median min to clear" />
        </div>
      </RevealOnView>

      <RevealOnView delay={0.2}>
        <div className="mt-12 prose-body space-y-4 max-w-[64ch]">
          <p>
            We opened the file the way you'd open a notebook left at the back
            of a drawer. There are roughly fifty disruptive events a day in
            Bengaluru — a number low enough to be tractable and high enough to
            be honest. The median event takes two hours to clear. The longest
            we found took most of a day.
          </p>
          <p>
            And then the shape of the thing showed up: the{" "}
            <em>top ten corridors carry eighty-two percent of all events</em>.
            That number changes how you think about the problem. It says:
            risk is not spread across the city like fog. It pools. It pools on
            Tumkur Road, on the Outer Ring east of Mahadevapura, on Hosur near
            Silk Board. If you know where it pools, you can be there before it
            spills.
          </p>
        </div>
      </RevealOnView>

      <RevealOnView delay={0.25}>
        <figure className="mt-12">
          <div className="p-6 bg-paper-soft border border-ink/10 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
                Hourly disruption density
              </div>
              <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-signal">
                weekday median
              </div>
            </div>
            <Sparkline
              data={[
                18, 16, 14, 12, 14, 22, 38, 62, 88, 92, 78, 65, 60, 58, 65, 78,
                88, 95, 82, 64, 48, 36, 28, 22,
              ]}
              width={800}
              height={140}
              color="#E64A19"
            />
            <div className="mt-3 flex justify-between font-mono text-[0.55rem] tracking-[0.2em] uppercase text-ink-mute">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>24:00</span>
            </div>
          </div>
          <figcaption className="mt-3">
            Fig. — Two peaks, predictable as a heart-beat.
          </figcaption>
        </figure>
      </RevealOnView>

      <RevealOnView delay={0.3}>
        <PhotoPlate
          className="mt-12"
          promptId="P02"
          variant="cool"
          aspect="16/9"
          alt="Overhead architectural drawing of a Bengaluru junction, lines abstracted into geometric pattern, watermark on textured paper, pencil and ink illustration style"
          caption="Plotting the city, the same way an old cartographer would have."
        />
      </RevealOnView>
    </article>
  );
}

function Chapter03() {
  return (
    <article className="relative pb-32 pt-16 border-t border-ink/15">
      <RevealOnView>
        <ChapterMark number={3} title="The Break" />
      </RevealOnView>

      <RevealOnView delay={0.1}>
        <h2 className="mt-10 font-serif text-5xl md:text-6xl tracking-tightest leading-[1.02] text-ink">
          Then the radio
          <br />
          <em>crackles.</em>
        </h2>
      </RevealOnView>

      <RevealOnView delay={0.15}>
        <div className="mt-10 prose-body space-y-4 max-w-[64ch]">
          <p>
            <span className="font-mono text-sm tracking-wider">FKID000000</span>{" "}
            arrives at <span className="tabular-nums">17:01:48</span>. A
            vehicle breakdown on the Mumbai-Bengaluru Highway, near Jalahalli
            Cross. Just a row of fields in a feed, but in the room, it's a
            small avalanche. Three people pick up phones. Someone looks at the
            map. Someone else tries to remember whether the tow truck at Peenya
            is on shift.
          </p>
          <p>
            ASTRAM does five things in the second it takes someone to put down
            a phone. <em>One</em>, the severity classifier says: high
            priority, seventy-one percent chance this becomes a closure.{" "}
            <em>Two</em>, the clearance regressor says: ninety-five minutes,
            give or take. <em>Three</em>, the spread estimator lights up{" "}
            <span className="scribble">Jalahalli, Goraguntepalya, 8th Mile</span>{" "}
            — the next three junctions that will choke if you don't divert
            traffic now. <em>Four</em>, the road graph removes the closed edge
            and computes a top-three diversion using Yen's K-shortest paths.
            <em> Five</em>, a card slides into the live feed with a clearance
            countdown ticking down.
          </p>
          <p>
            The map does what the room would have done — only the map does it
            in milliseconds, and the map is right about which three junctions,
            and the map already has the diversion drawn.
          </p>
        </div>
      </RevealOnView>

      <RevealOnView delay={0.2}>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          <MicroBeat tag="Detect" t="T+00:00" body="Incident arrives on the live socket." />
          <MicroBeat tag="Predict" t="T+00:01" body="Models speak: severity, closure, clearance." />
          <MicroBeat tag="Divert" t="T+00:02" body="Road graph computes top-3 alternates." />
        </div>
      </RevealOnView>

      <RevealOnView delay={0.25}>
        <PullQuote
          text="A console doesn't need to be smarter than the officer at the desk. It needs to be faster, and never tired."
        />
      </RevealOnView>

      <RevealOnView delay={0.3}>
        <PhotoPlate
          className="mt-12"
          promptId="P03"
          variant="ink"
          aspect="3/2"
          alt="Inside a traffic operations control room at night, low lighting, two officers leaning over a console of screens, warm reading lamp, a city map glowing, documentary photography style"
          caption="The operations room. The only quiet place where a city's noise lives."
        />
      </RevealOnView>
    </article>
  );
}

function Chapter04() {
  return (
    <article className="relative pb-32 pt-16 border-t border-ink/15">
      <RevealOnView>
        <ChapterMark number={4} title="The Map" />
      </RevealOnView>

      <RevealOnView delay={0.1}>
        <p className="mt-10 lede max-w-[48ch]">
          Three layers stacked on one canvas: <em>prevent</em>,{" "}
          <em>react</em>, <em>prepare</em>.
        </p>
      </RevealOnView>

      <RevealOnView delay={0.15}>
        <div className="mt-10 prose-body space-y-4 max-w-[64ch]">
          <p>
            The risk map is the canvas. It is always on, built from the
            historical events alone. It is the answer to a question police ask
            every single day: <em>where do I put my fifty patrol officers so
            I'm already near trouble before anything is reported?</em> Drag
            the time slider into tomorrow afternoon; the map recolors to show
            what a Wednesday at four feels like, by hour, by corridor.
          </p>
          <p>
            The live feed lays incidents over the canvas. The forecast lays a
            planned event over it. Same map, three sources of meaning.
            Everything you draw is in the JSON — every zone arrives with its
            colour and radius pre-computed by the model. The frontend never
            reinvents thresholds. The interface is a viewer for a system that
            has already done the thinking.
          </p>
        </div>
      </RevealOnView>

      <RevealOnView delay={0.2}>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <CodeNote
            head="Why a cached OSMnx graph"
            body="We pickle the Bengaluru drive graph once. Per-incident, we snap to the nearest edge, mutate weights, and run Dijkstra or A*. No HTTP roundtrip to a routing service."
          />
          <CodeNote
            head="Why colour in the JSON"
            body="The risk-to-colour mapping is one threshold table. Putting it on the model side means the UI never disagrees with the model, even across endpoints."
          />
          <CodeNote
            head="Why Yen's K"
            body="Real diversions need distinct alternates — not three near-identical paths. Yen's K-shortest gives the officer real options, ranked by ETA."
          />
        </div>
      </RevealOnView>
    </article>
  );
}

function Chapter05() {
  return (
    <article className="relative pb-32 pt-16 border-t border-ink/15">
      <RevealOnView>
        <ChapterMark number={5} title="The Hand" />
      </RevealOnView>

      <RevealOnView delay={0.1}>
        <h2 className="mt-10 font-serif text-5xl md:text-6xl tracking-tightest leading-[1.02] text-ink">
          Built for the people
          <br />
          who keep the city
          <br />
          <em>moving.</em>
        </h2>
      </RevealOnView>

      <RevealOnView delay={0.15}>
        <div className="mt-10 prose-body space-y-4 max-w-[64ch]">
          <p>
            This is not a dashboard for everyone. It is a console for a
            specific room, in a specific city, with specific work. The
            typography is large because someone is reading it across a room.
            The colours are restrained because the only colour that needs to
            shout is the one the model used to mean <em>danger</em>. The map
            sits in the centre because the map is what gets pointed at.
          </p>
          <p>
            We made design choices that say: take this seriously. The
            wordmark is set in a serif because civic infrastructure deserves
            the dignity of a serif. The countdowns are monospaced because
            officers shouldn't have to squint at a sliding decimal. The grain
            on the page is a small affectation — but it makes the screen feel
            like paper, and paper feels like something you can trust.
          </p>
        </div>
      </RevealOnView>

      <RevealOnView delay={0.2}>
        <PhotoPlate
          className="mt-12"
          promptId="P04"
          variant="warm"
          aspect="16/9"
          alt="A traffic officer's hand on a paper map of Bengaluru, with a red pencil marking a route around a blockage, on a wooden desk with morning light"
          caption="The console is a paper map. The console is a phone. The console is a tab open in a browser. The console is whatever is closest to the work."
        />
      </RevealOnView>
    </article>
  );
}

function Epilogue() {
  return (
    <section className="relative mt-12 py-24 bg-ink text-paper overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-8">
            <Eyebrow variant="signal">Epilogue</Eyebrow>
            <h2 className="mt-6 font-serif font-light text-5xl md:text-7xl tracking-tightest leading-[1.05] text-paper">
              The city won't wait.
              <br />
              <em className="text-paper/55">Neither should the map.</em>
            </h2>
            <p className="mt-8 font-serif text-2xl text-paper/75 max-w-[42ch] leading-snug">
              Open the console, hit play, drag the time slider into tomorrow.
              The data is real. The system is live. The minutes are ours to
              give back.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/dashboard" className="btn-ink !bg-signal hover:!bg-paper hover:!text-ink">
                Launch the console
                <span aria-hidden>→</span>
              </Link>
              <Link href="/methodology" className="btn-ghost !border-paper/30 !text-paper hover:!bg-paper hover:!text-ink">
                Read the methodology
              </Link>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <PhotoPlate
              promptId="P05"
              variant="signal"
              aspect="4/5"
              alt="Bengaluru at dusk from above — a thousand red brake lights traced into a long exposure pattern, painterly, signal-orange dominant"
              caption="Dusk on the Outer Ring."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="relative py-24 border-t border-ink/15" id="team">
      <div className="container">
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-4">
            <Eyebrow>Colophon</Eyebrow>
            <h2 className="mt-6 h-medium text-balance">
              Two people. One weekend. A map of a city.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <dl className="grid grid-cols-2 gap-x-10 gap-y-8">
              <dt className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
                ML & Backend
              </dt>
              <dd className="font-serif text-2xl text-ink">Person A</dd>
              <dt className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
                Frontend & Design
              </dt>
              <dd className="font-serif text-2xl text-ink">Person B</dd>
              <dt className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
                Mapping partner
              </dt>
              <dd className="font-serif text-2xl text-ink">Mappls (MapmyIndia)</dd>
              <dt className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
                Type
              </dt>
              <dd className="font-serif text-2xl text-ink">
                Fraunces · Inter · JetBrains Mono
              </dd>
              <dt className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
                Data
              </dt>
              <dd className="font-serif text-2xl text-ink">
                Bengaluru Police · Astram event log
              </dd>
              <dt className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
                Built for
              </dt>
              <dd className="font-serif text-2xl text-ink">
                Flipkart GRID 6.0 · Theme 2
              </dd>
            </dl>
            <div className="mt-12">
              <ArrowLink href="/dashboard">Open the console</ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */
function BigStat({
  value,
  label,
  accent = false,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`font-serif font-light text-5xl md:text-6xl tabular-nums leading-none ${
          accent ? "text-signal" : "text-ink"
        }`}
      >
        {value}
      </div>
      <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
        {label}
      </div>
    </div>
  );
}

function PullQuote({ text }: { text: string }) {
  return (
    <blockquote className="mt-14 mb-2 relative pl-8 border-l-2 border-signal">
      <span className="absolute -top-3 -left-3 font-serif text-7xl text-signal/40 select-none leading-none">
        “
      </span>
      <p className="pull-quote text-balance">{text}</p>
    </blockquote>
  );
}

function MicroBeat({
  tag,
  t,
  body,
}: {
  tag: string;
  t: string;
  body: string;
}) {
  return (
    <div className="p-5 border border-ink/12 rounded-xl bg-paper-soft/70">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-signal">
          {tag}
        </span>
        <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
          {t}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-ink/80">{body}</p>
    </div>
  );
}

function CodeNote({ head, body }: { head: string; body: string }) {
  return (
    <div className="p-5 border border-ink/10 rounded-xl bg-paper-soft/70">
      <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-signal mb-3">
        Note
      </div>
      <div className="font-serif text-xl text-ink mb-2 leading-tight">
        {head}
      </div>
      <p className="text-[0.92rem] leading-relaxed text-ink/72">{body}</p>
    </div>
  );
}
