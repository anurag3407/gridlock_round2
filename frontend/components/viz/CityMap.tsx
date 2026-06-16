"use client";

/**
 * Hand-drawn Bengaluru city map. Stylised — orbital rings, radial corridors, junctions.
 * Used as the hero illustration, the dashboard placeholder, and the about-page anchor.
 *
 * Coordinates are normalised to a 800x600 viewBox so the same paths can be reused.
 */

import { cn } from "@/lib/utils";

export type MapMarker = {
  id: string;
  cx: number;
  cy: number;
  color?: string;
  label?: string;
  radius?: number;
  intensity?: number; // 0..1, drives pulse opacity
};

export type MapRoute = {
  id: string;
  d: string; // SVG path d
  color?: string;
  dashed?: boolean;
  label?: string;
};

export function CityMap({
  markers = [],
  routes = [],
  variant = "paper",
  showLabels = true,
  className,
}: {
  markers?: MapMarker[];
  routes?: MapRoute[];
  variant?: "paper" | "dark" | "linen";
  showLabels?: boolean;
  className?: string;
}) {
  const bg =
    variant === "dark"
      ? "#0E1116"
      : variant === "linen"
      ? "#EAE4D5"
      : "#F2EEE5";
  const stroke = variant === "dark" ? "#3A4254" : "#1A1F2B";
  const muted = variant === "dark" ? "#262C39" : "#1A1F2B";
  const labelColor = variant === "dark" ? "#8A8F9A" : "#4A5160";

  return (
    <svg
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full select-none", className)}
      aria-label="Stylised map of Bengaluru showing corridors and incident pulses"
    >
      <defs>
        <radialGradient id="cm-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E64A19" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#E64A19" stopOpacity="0" />
        </radialGradient>
        <pattern
          id="cm-dots"
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.8" fill={muted} opacity="0.18" />
        </pattern>
        <filter id="cm-paper-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.08 0" />
        </filter>
      </defs>

      <rect width="800" height="600" fill={bg} />
      <rect width="800" height="600" fill="url(#cm-dots)" />
      <rect
        width="800"
        height="600"
        filter="url(#cm-paper-noise)"
        opacity="0.65"
      />

      {/* Soft city glow */}
      <circle cx="400" cy="300" r="280" fill="url(#cm-glow)" />

      {/* Outer Ring Road — outer */}
      <ellipse
        cx="400"
        cy="300"
        rx="280"
        ry="220"
        fill="none"
        stroke={stroke}
        strokeOpacity="0.42"
        strokeWidth="1.2"
        strokeDasharray="2 6"
      />
      {/* Inner Ring Road */}
      <ellipse
        cx="400"
        cy="300"
        rx="170"
        ry="135"
        fill="none"
        stroke={stroke}
        strokeOpacity="0.55"
        strokeWidth="1.4"
      />
      {/* City center cluster */}
      <ellipse
        cx="400"
        cy="300"
        rx="80"
        ry="62"
        fill="none"
        stroke={stroke}
        strokeOpacity="0.55"
        strokeWidth="1"
      />

      {/* Radial corridors */}
      {/* Tumkur Road (NW) */}
      <path
        d="M 400 300 L 130 110 Q 200 120 245 145"
        fill="none"
        stroke={stroke}
        strokeOpacity="0.7"
        strokeWidth="1.6"
      />
      {/* Bellary Road (N) */}
      <path
        d="M 400 300 L 410 40"
        fill="none"
        stroke={stroke}
        strokeOpacity="0.7"
        strokeWidth="1.6"
      />
      {/* Old Madras Road (NE) */}
      <path
        d="M 400 300 L 700 175 Q 660 180 615 195"
        fill="none"
        stroke={stroke}
        strokeOpacity="0.7"
        strokeWidth="1.6"
      />
      {/* ORR East / Whitefield */}
      <path
        d="M 400 300 L 730 320"
        fill="none"
        stroke={stroke}
        strokeOpacity="0.7"
        strokeWidth="1.6"
      />
      {/* Hosur Road (SE) */}
      <path
        d="M 400 300 L 660 540"
        fill="none"
        stroke={stroke}
        strokeOpacity="0.7"
        strokeWidth="1.6"
      />
      {/* Bannerghatta Road (S) */}
      <path
        d="M 400 300 L 380 580"
        fill="none"
        stroke={stroke}
        strokeOpacity="0.7"
        strokeWidth="1.6"
      />
      {/* Mysore Road (SW) */}
      <path
        d="M 400 300 L 90 480"
        fill="none"
        stroke={stroke}
        strokeOpacity="0.7"
        strokeWidth="1.6"
      />
      {/* Magadi Road (W) */}
      <path
        d="M 400 300 L 60 280"
        fill="none"
        stroke={stroke}
        strokeOpacity="0.7"
        strokeWidth="1.6"
      />

      {/* Inner cross-streets, jittery to feel hand drawn */}
      <g stroke={stroke} strokeOpacity="0.28" strokeWidth="0.7" fill="none">
        <path d="M 320 230 Q 355 245 400 250 T 480 235 Q 510 230 540 245" />
        <path d="M 280 320 Q 330 308 380 318 T 450 330 Q 500 340 520 360" />
        <path d="M 300 380 Q 345 372 390 380 T 460 392 Q 495 400 520 410" />
        <path d="M 350 260 L 360 340" />
        <path d="M 420 252 L 412 350" />
      </g>

      {/* Custom routes from props (diversion polylines) */}
      {routes.map((r) => (
        <g key={r.id}>
          <path
            d={r.d}
            fill="none"
            stroke={r.color || "#E64A19"}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={r.dashed ? "6 4" : undefined}
            opacity="0.9"
          />
        </g>
      ))}

      {/* Markers / risk pulses */}
      {markers.map((m) => (
        <Marker key={m.id} marker={m} />
      ))}

      {/* Corridor labels */}
      {showLabels && (
        <g
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill={labelColor}
          letterSpacing="2"
        >
          <text x="146" y="138" transform="rotate(-32 146 138)">
            TUMKUR RD
          </text>
          <text x="420" y="62">
            BELLARY RD
          </text>
          <text x="600" y="186" transform="rotate(-22 600 186)">
            OLD MADRAS RD
          </text>
          <text x="612" y="328">
            ORR EAST
          </text>
          <text x="570" y="490" transform="rotate(38 570 490)">
            HOSUR RD
          </text>
          <text x="362" y="572">
            BANNERGHATTA
          </text>
          <text x="86" y="488">
            MYSORE RD
          </text>
          <text x="62" y="276">
            MAGADI RD
          </text>
          <text x="396" y="316" textAnchor="middle" fill={stroke} fontWeight="600">
            CITY CENTRE
          </text>
        </g>
      )}

      {/* Compass + scale */}
      <g transform="translate(740 540)" opacity="0.6">
        <line x1="0" y1="-14" x2="0" y2="14" stroke={stroke} strokeWidth="1" />
        <line x1="-14" y1="0" x2="14" y2="0" stroke={stroke} strokeWidth="1" />
        <text
          x="0"
          y="-18"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="8"
          fill={stroke}
        >
          N
        </text>
      </g>
    </svg>
  );
}

function Marker({ marker }: { marker: MapMarker }) {
  const color = marker.color || "#D7191C";
  const r = marker.radius || 8;
  return (
    <g>
      {/* Pulse ring — SVG-native animation for reliable centring */}
      <circle cx={marker.cx} cy={marker.cy} r={r} fill={color} opacity="0">
        <animate
          attributeName="r"
          from={r * 0.5}
          to={r * 2.2}
          dur="2.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="0.6"
          to="0"
          dur="2.6s"
          repeatCount="indefinite"
        />
      </circle>
      {/* Soft glow */}
      <circle
        cx={marker.cx}
        cy={marker.cy}
        r={r * 1.1}
        fill={color}
        opacity="0.22"
      />
      {/* Core dot */}
      <circle
        cx={marker.cx}
        cy={marker.cy}
        r={r * 0.55}
        fill={color}
        stroke="#F2EEE5"
        strokeWidth="1.2"
      />
      {marker.label && (
        <g>
          <rect
            x={marker.cx + r + 4}
            y={marker.cy - r - 11}
            width={(marker.label.length + 1) * 6}
            height="13"
            fill="#0E1116"
            opacity="0.85"
            rx="2"
          />
          <text
            x={marker.cx + r + 8}
            y={marker.cy - r - 1}
            fontFamily="JetBrains Mono, monospace"
            fontSize="8"
            letterSpacing="1.5"
            fill="#F2EEE5"
          >
            {marker.label}
          </text>
        </g>
      )}
    </g>
  );
}
