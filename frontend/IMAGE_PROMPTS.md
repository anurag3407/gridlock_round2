# IMAGE_PROMPTS.md
### Asset catalogue for ASTRAM frontend → generate with Midjourney v6 / Ideogram / SDXL

> **One global style lock — paste this at the start of every prompt:**
>
> *"Editorial photography for a high-end civic-tech magazine. Warm cream paper background palette `#F2EEE5`, deep ink `#0E1116`, single accent in signal-orange `#E64A19`, with restrained sage `#3D5A4A` for calm. Cinematic, document-feel, soft film grain, muted but rich colors. Composition leaves negative space for editorial layout. No text in image. No watermarks. No people facing camera. 4K, photoreal. --ar [aspect] --style raw --v 6"*

Aspect ratios are noted per asset. Filenames suggested for each.

---

## How to wire the generated images back in

Each placeholder block in the UI carries a `promptId` like `P01`. The matching prompt below shares the same id. Replace the placeholder with the generated image:

1. Save the generated file as `public/images/<promptId>.jpg` (or `.webp`).
2. In the component, swap the `<PhotoPlate />` block for `<Image src="/images/P01.jpg" ... />` (the `PhotoPlate` component is in `components/about/PhotoPlate.tsx`).
3. Optional: keep the `figcaption` text from `PhotoPlate.caption`.

---

## Page: `/about` (the storytelling spread)

### P01 — Tumkur Road at dawn (cover lede)
- **Aspect:** `--ar 3:2`
- **Use:** Lede photo, opens the editorial.
- **Prompt:**
  > Aerial drone photograph of Tumkur Road on the outskirts of Bengaluru, India, at 06:42 AM. Soft golden hour light catching the elevated Namma Metro line. Sparse early traffic, two yellow auto-rickshaws and a city bus, long shadows. Mist hanging over the Peenya industrial buildings in the distance. Warm cream tones in the sky, deep ink shadows on tarmac, single accent of signal orange on a workers' tarpaulin. Cinematic editorial photography in the style of the New York Times Sunday magazine. Soft 35mm film grain. No text. No people facing camera.

### P02 — Junction plotted as ink-on-paper drawing
- **Aspect:** `--ar 16:9`
- **Use:** Chapter 02 "The Pattern" — illustrative diagram.
- **Prompt:**
  > Top-down architectural drawing of a complex traffic junction in Bengaluru, abstracted into elegant geometric paths in ink on cream textured paper. Hand-drawn pencil lines, isometric perspective, with tiny labels in serif type (no real text — illegible). A few delicate sage-green watercolour washes mark calm zones; muted signal-orange highlights two stress points. The composition recalls a Pentagram diagram or a vintage cartography plate. Subtle paper grain texture. --style raw --v 6

### P03 — Operations control room at night
- **Aspect:** `--ar 3:2`
- **Use:** Chapter 03 "The Break".
- **Prompt:**
  > Documentary photograph inside a traffic operations control room at 22:14 in Bengaluru. Low ambient lighting, two officers in uniform leaning over a long curved console of monitors, faces in shadow, only their hands and forearms lit. A large wall map of the city glowing softly. One warm desk lamp casting an amber pool. The mood is calm-but-vigilant — neither dramatic nor sleepy. Deep ink shadows, warm cream highlights, signal-orange glow from one alert marker on a screen. Editorial photojournalism style, ASTRAM-noir. No identifiable faces. 35mm film grain.

### P04 — A hand, a paper map, a red pencil
- **Aspect:** `--ar 16:9`
- **Use:** Chapter 05 "The Hand".
- **Prompt:**
  > Close-up overhead photograph of a traffic officer's hand resting on a paper map of central Bengaluru, holding a sharp red wax pencil that has just drawn a curved diversion line around a marked blockage. Warm wooden desk underneath, morning light coming from the left. Tiny details: a coffee mug ring, a metal ruler, a faded annotation in blue ink, a coil of khaki uniform cuff. The map is creased and well-used. Editorial still life in the spirit of Wabi-Sabi, but cleanly composed. Cream and ink palette, with the red pencil as the only signal-orange element.

### P05 — Bengaluru at dusk, brake lights as long exposure
- **Aspect:** `--ar 4:5`
- **Use:** Epilogue plate.
- **Prompt:**
  > Long-exposure photograph of the Outer Ring Road in Bengaluru at dusk, taken from a high vantage point. A thousand red brake lights trace flowing rivers of signal-orange and crimson light against deep ink-blue twilight sky. A few hazy yellow streetlamps. The composition has a painterly, almost watercolour quality — softened and atmospheric, not glittery. Negative space at the top for editorial text overlay. Cinematic. Saul Leiter–meets–Annie Leibovitz mood. No text. No watermarks.

---

## Page: `/` (Landing) — supplementary

### P06 — Stylised Bengaluru city skyline silhouette (hero supporting plate, optional)
- **Aspect:** `--ar 16:6`
- **Use:** Wide background band, very low opacity.
- **Prompt:**
  > Long horizontal silhouette of Bengaluru's skyline at sunset — Vidhana Soudha dome, UB City tower, Bagmane Tech Park, the IT corridor — drawn as an abstract ink-on-cream illustration with hand-drawn line work. Subtle traffic light specks of signal-orange in the foreground. Wide aspect, lots of cream sky for type overlay. Editorial woodcut feel. No text.

### P07 — Risk heatmap illustrative still
- **Aspect:** `--ar 4:5`
- **Use:** Could replace the SVG `<CityMap>` in the "Prevent" layer card.
- **Prompt:**
  > A top-down stylised illustration of Bengaluru's road network rendered as an editorial heatmap. Orbital rings and radial corridors in fine ink lines on cream paper, with soft Risley-Green, amber, and signal-orange glow pools clustering on Tumkur Road, ORR East, and Hosur Road. Composition reads like a vintage transit-authority poster meets a contemporary data illustration. Subtle paper grain.

### P08 — A single incident pulse macro
- **Aspect:** `--ar 1:1`
- **Use:** Could replace the SVG in the "React" layer card.
- **Prompt:**
  > Macro photograph of a single bright signal-orange droplet spreading concentric ripples across a dark wet surface, with deep ink-blue surroundings. The droplet feels like a heartbeat or pulse. Symbolic of an incident landing on a city map. Minimal, geometric, scientific photography aesthetic. Soft motion blur on the outer rings.

### P09 — Calendar-style forecast composition
- **Aspect:** `--ar 4:3`
- **Use:** Could replace the SVG in the "Prepare" layer card.
- **Prompt:**
  > Editorial still life of an open paper desk planner, the right-hand page showing a soft amber wash over one date — symbolising a future planned event. A thin signal-orange pen rests across the spine. Cream paper, ink lines, sage-green sticker tab. Top-down photograph, soft window light from above-left. Calm, organised, civic-administrator mood.

---

## Page: `/dashboard`

### P10 — A bird's-eye photograph for blank-state empty-feed (optional)
- **Aspect:** `--ar 1:1`
- **Use:** When the live feed is empty — placeholder behind the "no incidents" message.
- **Prompt:**
  > Aerial photograph of an empty Bengaluru junction in soft morning light, no traffic, hand-painted zebra crossing slightly faded, a single auto-rickshaw waiting. Cream tarmac, deep ink-blue shadows, signal-orange traffic light glow. Documentary photography style, calm and patient mood.

---

## Sectional textures / illustration plates (anywhere)

### T01 — Hand-drawn corridor wave divider
- **Aspect:** `--ar 21:9`
- **Use:** Could replace the SVG `<WaveDivider>` for an even richer feel.
- **Prompt:**
  > A single, hand-drawn ink wave line running across a wide cream paper background. The wave has irregular, organic amplitude — almost like a heartbeat trace. One dot of signal-orange interrupts the line mid-way. Editorial illustration in the spirit of Saul Bass or Paul Rand. Subtle paper grain.

### T02 — Tactile city paper texture
- **Aspect:** `--ar 16:9`
- **Use:** Section background for the SystemSection (if you want to break the solid ink).
- **Prompt:**
  > Macro photograph of textured cream cotton paper, faintly impressed with a city map pattern visible only under raking light. Subtle deep-ink ghost of orbital rings and radial corridors. The texture is meditative and analog. Top-down. Soft single light from upper-left.

### T03 — Studio portrait of the team (Colophon)
- **Aspect:** `--ar 3:2`
- **Use:** Replace the colophon block illustration on the About page.
- **Prompt:**
  > Editorial double portrait of two young engineers in their early twenties standing in front of a chalkboard scribbled with a city map. Soft natural light. One in a faded khadi shirt holding a laptop, the other in a black tee with a half-coffee. Mood is competent, calm, slightly amused. Cream wall background, ink-blue clothes, signal-orange book or mug as the colour anchor. Editorial, magazine-cover quality.

---

## Notes for the generator

- **Style anchor:** Bloomberg Businessweek illustrations × Pentagram identity work × New York Times feature photography.
- **Avoid:** Glossy "AI render" look, neon cyberpunk, hyper-saturated colors, futuristic blue/purple gradients, generic "city" stock-imagery.
- **People:** No identifiable faces in any photo. Hands, silhouettes, backs are fine.
- **Type in image:** None. Always.
- **Colour discipline:** If you use signal-orange, it must be the only saturated colour in the frame.

---

## After generation — code substitutions

Each `<PhotoPlate promptId="P0X" ... />` block becomes:

```tsx
import Image from "next/image";

<figure className="…">
  <Image
    src="/images/P01.jpg"
    width={1600}
    height={1067}
    alt="…the alt prop from PhotoPlate"
    className="rounded-lg object-cover"
  />
  <figcaption className="…">P01 — …the caption</figcaption>
</figure>
```

That's it. The placeholder blocks are designed so you can hot-swap them without re-laying-out the page.
