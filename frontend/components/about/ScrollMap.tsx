"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CityMap, type MapMarker, type MapRoute } from "@/components/viz/CityMap";

/**
 * The narrative map. Sticks while the user scrolls past the chapters; markers
 * and routes light up at scroll milestones.
 */
export function ScrollMap() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Phase 1: just baseline (0..0.18) -> 0 markers
  // Phase 2: 7 risk markers (0.18..0.36)
  // Phase 3: 1 incident pulse (0.36..0.55)
  // Phase 4: junctions + diversion routes (0.55..0.75)
  // Phase 5: time-slider sweep (0.75..1)

  const opacityBaseline = useTransform(scrollYProgress, [0, 0.18, 0.95], [0.4, 1, 1]);
  const opacityRisk = useTransform(scrollYProgress, [0.16, 0.28, 0.95], [0, 1, 1]);
  const opacityIncident = useTransform(scrollYProgress, [0.32, 0.45, 0.95], [0, 1, 1]);
  const opacityRoutes = useTransform(scrollYProgress, [0.52, 0.65, 0.95], [0, 1, 1]);
  const opacitySweep = useTransform(scrollYProgress, [0.72, 0.86, 1], [0, 1, 1]);

  return (
    <div ref={ref} className="relative w-full h-full">
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-ink/15 bg-paper-soft shadow-[0_30px_80px_-30px_rgba(14,17,22,0.3)]">
        <CityMap variant="linen" />

        {/* Layer 1: Baseline risk pulses (chapter 02) */}
        <motion.div
          style={{ opacity: opacityRisk }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg viewBox="0 0 800 600" className="w-full h-full">
            {[
              { id: "z1", cx: 240, cy: 165, r: 22, c: "#FC8D59" },
              { id: "z2", cx: 620, cy: 320, r: 26, c: "#FC8D59" },
              { id: "z3", cx: 560, cy: 470, r: 20, c: "#FDAE61" },
              { id: "z4", cx: 380, cy: 110, r: 16, c: "#FDAE61" },
              { id: "z5", cx: 145, cy: 380, r: 18, c: "#A6D96A" },
              { id: "z6", cx: 110, cy: 245, r: 14, c: "#A6D96A" },
              { id: "z7", cx: 410, cy: 540, r: 14, c: "#A6D96A" },
            ].map((z) => (
              <g key={z.id}>
                <circle cx={z.cx} cy={z.cy} r={z.r} fill={z.c} opacity="0.32" />
                <circle cx={z.cx} cy={z.cy} r={z.r * 0.4} fill={z.c} />
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Layer 2: Incident pulse (chapter 03) */}
        <motion.div
          style={{ opacity: opacityIncident }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg viewBox="0 0 800 600" className="w-full h-full">
            <defs>
              <radialGradient id="sm-pulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D7191C" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#D7191C" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="240" cy="165" r="80" fill="url(#sm-pulse)">
              <animate attributeName="r" from="40" to="80" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="1" to="0" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="240" cy="165" r="12" fill="#D7191C" />
            <circle cx="240" cy="165" r="5" fill="#F2EEE5" />
            <g
              transform="translate(258 152)"
              fontFamily="JetBrains Mono, monospace"
              fontSize="9"
              letterSpacing="2"
              fill="#0E1116"
            >
              <text>FKID000000</text>
              <text y="12">VEHICLE BREAKDOWN</text>
              <text y="24" fill="#D7191C">HIGH · 71% CLOSURE</text>
            </g>
          </svg>
        </motion.div>

        {/* Layer 3: Affected junctions + diversion routes (chapter 04) */}
        <motion.div
          style={{ opacity: opacityRoutes }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg viewBox="0 0 800 600" className="w-full h-full">
            {/* Affected junctions ripple */}
            {[
              { cx: 285, cy: 230 },
              { cx: 350, cy: 290 },
              { cx: 200, cy: 280 },
            ].map((j, i) => (
              <g key={i}>
                <circle cx={j.cx} cy={j.cy} r="14" fill="#FC8D59" opacity="0.35" />
                <circle cx={j.cx} cy={j.cy} r="4" fill="#FC8D59" />
              </g>
            ))}
            {/* Diversion routes */}
            <path
              d="M 240 165 Q 300 200 350 230 Q 400 250 440 220"
              stroke="#1A9641"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 240 165 Q 200 240 220 310 Q 280 340 360 320"
              stroke="#F5A623"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="6 5"
            />
            <path
              d="M 240 165 Q 150 200 130 290 Q 180 360 320 360"
              stroke="#F5A623"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="4 5"
              opacity="0.7"
            />
            <g
              transform="translate(440 215)"
              fontFamily="JetBrains Mono, monospace"
              fontSize="9"
              fill="#1A9641"
              letterSpacing="2"
            >
              <text>ROUTE 1 · 7m30s · 2.4 km</text>
            </g>
          </svg>
        </motion.div>

        {/* Layer 4: Time sweep (chapter 05) */}
        <motion.div
          style={{ opacity: opacitySweep }}
          className="absolute inset-x-0 bottom-4 px-6"
        >
          <div className="flex items-center gap-3 bg-paper/85 backdrop-blur border border-ink/15 rounded-full px-4 py-2.5">
            <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
              09:00
            </span>
            <div className="relative flex-1 h-px bg-ink/20">
              <motion.span
                className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-signal border-2 border-paper shadow"
                animate={{ left: ["10%", "70%", "10%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink-mute">
              24:00
            </span>
          </div>
          <div className="mt-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-ink-mute text-center">
            Drag through tomorrow
          </div>
        </motion.div>

        {/* Baseline frame */}
        <motion.div
          style={{ opacity: opacityBaseline }}
          className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[0.6rem] tracking-[0.22em] uppercase text-ink/55"
        >
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
            ASTRAM · Bengaluru
          </span>
          <span>The narrative map</span>
        </motion.div>
      </div>
    </div>
  );
}
