# ASTRAM — Frontend

A live operations console for Bengaluru's traffic. Built for **Flipkart GRID 6.0 / Theme 2 (Event-Driven Congestion)** Round 2.

> "The city's nervous system, in real time."

Detect → predict severity & clearance → route around it. Three layers stacked on one map:
**Prevent** (historical risk + time slider) · **React** (live feed + diversions) · **Prepare** (planned-event forecast).

---

## Quick start

```bash
cd frontend
npm install
cp .env.example .env.local   # NEXT_PUBLIC_USE_MOCK=1 by default
npm run dev                  # → http://localhost:3000
```

That's it. The app runs entirely on the bundled sample JSONs (`mocks/`) so you can iterate without the backend.

## Wire up the live backend

```bash
# In another terminal — Person A's FastAPI:
cd backend
python -m pip install -r requirements.txt
python train.py
uvicorn app:app --reload --port 8000
```

Then in `frontend/.env.local`:

```
ML_API_URL=http://localhost:8000
NEXT_PUBLIC_USE_MOCK=0
```

The Next.js gateway routes (`app/api/*/route.ts`) proxy to FastAPI. No CORS, no client-side URL switching, one env var to deploy.

---

## Pages

| Route | What it is |
|-------|------------|
| `/` | Editorial landing — hero, problem, three layers, system, numbers, demo flow, CTA. |
| `/about` | The storytelling spread (5 chapters, scroll-driven narrative map, photo plates). |
| `/dashboard` | Live console: summary header, sim-clock, live feed cards, map, diversion panel. **D12–D18.** |
| `/risk-map` | Proactive heatmap + 24-hour time slider, corridor leaderboard. |
| `/methodology` | The four models, the road graph, the three algorithms, the JSON contract, the honesty rule. |

---

## Design system

| Token | Value |
|-------|-------|
| Paper (background) | `#F2EEE5` |
| Ink (text) | `#0E1116` |
| Signal (accent) | `#E64A19` |
| Sage (calm counter) | `#3D5A4A` |
| Risk colours | High `#D7191C` · Mid `#FC8D59` · Low `#FDAE61` · Calm `#A6D96A` |

**Type**: Fraunces (variable serif, display) · Inter (body sans) · JetBrains Mono (data + UI labels).

**Texture**: subtle SVG grain overlay (`<Grain />` component) gives the screen a paper feel.

---

## Mock toggle

`lib/api.ts` exports `getLiveFeed / getRiskMap / postForecast`. They read `NEXT_PUBLIC_USE_MOCK`:

- `1` → bundle mock from `mocks/*.json` (default).
- `0` → fetch from `/api/...` gateway, which proxies to `ML_API_URL`.

The gateway routes (`app/api/*/route.ts`) **fail-open to the mock** if the live API is unreachable — so the demo never breaks mid-judging.

---

## Mappls / MapmyIndia integration

The hero, dashboard, and risk-map currently render a hand-illustrated SVG city of Bengaluru (`components/viz/CityMap.tsx`). To swap in the real Mappls SDK:

1. Get a Mappls public key and REST key from [apis.mapmyindia.com](https://apis.mapmyindia.com).
2. Add to `.env.local`:
   ```
   NEXT_PUBLIC_MAPPLS_KEY=your-public-key
   MAPPLS_REST_KEY=your-rest-key
   ```
3. Replace the `<CityMap />` mount inside `components/live/LiveMap.tsx` with the Mappls map div. Keep the HUD overlays — they're absolutely positioned over whatever fills the box.

The marker projection (`project(lat, lng)` in `LiveMap.tsx`) is only used by the SVG fallback. The Mappls SDK plots `lat / lng` natively.

---

## Asset replacement

Every illustrated photo on the site is rendered as a `<PhotoPlate promptId="P01" .../>`. The catalogue lives in [`IMAGE_PROMPTS.md`](./IMAGE_PROMPTS.md) — paste the prompts into Midjourney / Ideogram / SDXL, save as `public/images/<promptId>.jpg`, and swap the `PhotoPlate` for `<Image src="/images/P01.jpg" ... />` (instructions at the bottom of `IMAGE_PROMPTS.md`).

---

## Folder structure

```
frontend/
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Fonts, grain, nav, footer
│   ├── globals.css          # Tailwind + design tokens
│   ├── page.tsx             # Landing
│   ├── about/page.tsx       # Storytelling
│   ├── dashboard/page.tsx   # Live console
│   ├── risk-map/page.tsx    # Heatmap + slider
│   ├── methodology/page.tsx # Architecture deep-dive
│   └── api/                 # Gateway routes → FastAPI
├── components/
│   ├── chrome/              # Nav, Footer, Marquee, Grain
│   ├── ui/                  # Eyebrow, ArrowLink, Stat, Pill, ChapterMark
│   ├── viz/                 # CityMap, RiskGauge, Sparkline, WaveDivider
│   ├── about/               # PhotoPlate, RevealOnView, ScrollMap
│   └── live/                # SummaryHeader, SimClock, IncidentCard,
│                              LiveMap, DiversionPanel, TimelineSlider,
│                              CorridorLeaderboard, AffectedJunctions
├── lib/                     # api.ts, types.ts, utils.ts
├── mocks/                   # Sample JSONs (Day-1 unblocker)
├── public/                  # Static assets (drop generated images here)
├── tailwind.config.ts
├── next.config.mjs
└── IMAGE_PROMPTS.md         # The asset catalogue
```

---

## Demo flow (the 2-min judging walk-through)

1. Open `/` — read the hero, note the editorial tone.
2. Click **Story** → scroll `/about`. The narrative map on the right lights up corridor by corridor as you read the chapters.
3. Click **Live Console** → hit play on the sim clock. Watch incidents pop. Click one. See diversion routes draw.
4. Click **Risk Map** → drag the time slider into tomorrow morning. Watch corridors recolour.
5. Click **Method** → walk through the four models, the JSON contract, the honesty rule.

Done.

---

## Credits

| | |
|---|---|
| ML & Backend | Person A |
| Frontend & Design | Person B |
| Mapping partner | Mappls (MapmyIndia) |
| Type | Fraunces · Inter · JetBrains Mono |
| Data | Bengaluru Police · Astram event log |
| Built for | Flipkart GRID 6.0 · Theme 2 |
