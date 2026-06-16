"use client";

import { useEffect, useState } from "react";
import { cn, fmtTimeSeconds, fmtWeekday } from "@/lib/utils";

export function SimClock({
  initial,
  speed = 1,
  onTick,
}: {
  initial: string;
  speed?: number;
  onTick?: (iso: string) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [s, setS] = useState(speed);
  const [t, setT] = useState(() => new Date(initial).getTime());

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setT((prev) => {
        // 1 second of wall time = 1 hour of sim time × s
        const next = prev + 1000 * 60 * 60 * s;
        if (onTick) onTick(new Date(next).toISOString());
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, s, onTick]);

  const iso = new Date(t).toISOString();
  const date = fmtWeekday(iso);
  const time = fmtTimeSeconds(iso);

  return (
    <div className="flex items-center gap-3 p-3 bg-ink text-paper rounded-xl border border-ink">
      <button
        onClick={() => setPlaying((p) => !p)}
        className={cn(
          "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
          playing ? "bg-signal text-paper" : "bg-paper/10 hover:bg-paper/20 text-paper"
        )}
        aria-label={playing ? "Pause sim clock" : "Play sim clock"}
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

      <div className="flex-1 flex flex-col">
        <span className="font-mono text-[0.55rem] tracking-[0.22em] uppercase text-paper/55">
          Sim Clock · 1s = 1h × {s}
        </span>
        <span className="font-serif text-2xl tabular-nums tracking-tight">
          {time}
        </span>
        <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-paper/60">
          {date}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {[1, 4, 12].map((v) => (
          <button
            key={v}
            onClick={() => setS(v)}
            className={cn(
              "px-2.5 py-0.5 rounded font-mono text-[0.6rem] tracking-[0.2em] uppercase",
              s === v
                ? "bg-paper text-ink"
                : "bg-paper/8 text-paper/70 hover:bg-paper/15"
            )}
          >
            {v}×
          </button>
        ))}
      </div>
    </div>
  );
}
