import { cn } from "@/lib/utils";

export function Pill({
  children,
  tone = "ink",
  className,
}: {
  children: React.ReactNode;
  tone?: "ink" | "paper" | "signal" | "sage" | "high" | "mid" | "low" | "outline";
  className?: string;
}) {
  const tones: Record<string, string> = {
    ink: "bg-ink text-paper",
    paper: "bg-paper-soft text-ink",
    signal: "bg-signal text-paper",
    sage: "bg-sage text-paper",
    high: "bg-risk-high/12 text-risk-high border border-risk-high/30",
    mid: "bg-risk-mid/12 text-[#B25A2E] border border-risk-mid/30",
    low: "bg-risk-calm/14 text-[#3A6B2E] border border-risk-calm/35",
    outline: "border border-ink/25 text-ink",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[0.6rem] tracking-[0.2em] uppercase",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
