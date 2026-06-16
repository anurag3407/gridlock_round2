"use client";

import { riskLabel } from "@/lib/utils";

/** Circular ring gauge for overall risk (0–100). Hand-drawn arc style. */
export function RiskGauge({
  value,
  size = 220,
  label = "Overall Risk",
}: {
  value: number;
  size?: number;
  label?: string;
}) {
  const pct = Math.max(0, Math.min(100, value));
  const r = size / 2 - 16;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);

  const color =
    pct >= 80
      ? "#D7191C"
      : pct >= 60
      ? "#FC8D59"
      : pct >= 40
      ? "#F5A623"
      : pct >= 20
      ? "#A6D96A"
      : "#1A9641";

  return (
    <div
      className="relative inline-flex flex-col items-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="rg-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#0E1116"
          strokeOpacity="0.12"
          strokeWidth="1.5"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#rg-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
        {/* tick marks — round to 2 decimals so SSR & client agree byte-for-byte */}
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i / 36) * Math.PI * 2;
          const round = (n: number) => Math.round(n * 100) / 100;
          const x1 = round(size / 2 + (r - 18) * Math.cos(a));
          const y1 = round(size / 2 + (r - 18) * Math.sin(a));
          const x2 = round(size / 2 + (r - 22) * Math.cos(a));
          const y2 = round(size / 2 + (r - 22) * Math.sin(a));
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#0E1116"
              strokeOpacity={i % 3 === 0 ? 0.4 : 0.15}
              strokeWidth="1"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-[0.6rem] tracking-[0.24em] uppercase text-ink-mute mb-1">
          {label}
        </span>
        <span className="font-serif font-light text-6xl tabular-nums leading-none">
          {Math.round(pct)}
        </span>
        <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase mt-1.5" style={{ color }}>
          {riskLabel(pct)}
        </span>
      </div>
    </div>
  );
}
