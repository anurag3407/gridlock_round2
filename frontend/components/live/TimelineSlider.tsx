"use client";

import { useEffect, useRef, useState } from "react";
import type { TimelineStep } from "@/lib/types";
import { cn, fmtWeekday } from "@/lib/utils";

export function TimelineSlider({
  timeline,
  index,
  onChange,
  autoplay = false,
}: {
  timeline: TimelineStep[];
  index: number;
  onChange: (i: number) => void;
  autoplay?: boolean;
}) {
  const [playing, setPlaying] = useState(autoplay);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) {
      if (timer.current) clearInterval(timer.current);
      return;
    }
    timer.current = setInterval(() => {
      onChange((index + 1) % timeline.length);
    }, 800);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, index, timeline.length, onChange]);

  const step = timeline[index];
  const iso = step ? step.datetime : new Date().toISOString();
  const d = new Date(iso);
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");

  return (
    <div className="p-5 rounded-2xl bg-ink text-paper">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-paper/55">
            Time Slider · 24 hours
          </div>
          <div className="font-serif text-3xl tabular-nums mt-1 leading-none">
            {hh}:{mm}
          </div>
          <div className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-paper/55 mt-1">
            {fmtWeekday(iso)}
          </div>
        </div>
        <button
          onClick={() => setPlaying((p) => !p)}
          className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center",
            playing ? "bg-signal text-paper" : "bg-paper/10 text-paper"
          )}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M7 5l12 7-12 7V5z" />
            </svg>
          )}
        </button>
      </div>

      {/* Risk bars across 24 hours */}
      <div className="relative h-16 mb-3 flex items-end gap-px">
        {timeline.map((s, i) => {
          const h = Math.max(6, (s.overall_risk / 100) * 100);
          const active = i === index;
          return (
            <button
              key={i}
              onClick={() => onChange(i)}
              className="group flex-1 flex flex-col items-center justify-end gap-1"
              aria-label={`Hour ${i}`}
            >
              <span
                style={{
                  height: `${h}%`,
                  background: active
                    ? "#E64A19"
                    : s.overall_risk >= 60
                    ? "#FC8D59"
                    : s.overall_risk >= 40
                    ? "#F5A623"
                    : "#3D5A4A",
                }}
                className={cn(
                  "w-full rounded-t transition-all",
                  active ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Tick row */}
      <div className="flex items-center justify-between font-mono text-[0.55rem] tracking-[0.22em] uppercase text-paper/50">
        <span>00</span>
        <span>06</span>
        <span>12</span>
        <span>18</span>
        <span>24</span>
      </div>

      <div className="mt-4 pt-4 border-t border-paper/10 flex items-center justify-between font-mono text-[0.6rem] tracking-[0.22em] uppercase text-paper/55">
        <span>step {index + 1} / {timeline.length}</span>
        <span>
          overall · <span className="text-paper">{step?.overall_risk ?? 0}</span>
        </span>
      </div>
    </div>
  );
}
