import { cn } from "@/lib/utils";

export function Stat({
  value,
  label,
  caption,
  unit,
  size = "lg",
  align = "left",
  variant = "dark",
}: {
  value: string;
  label?: string;
  caption?: string;
  unit?: string;
  size?: "sm" | "md" | "lg" | "xl";
  align?: "left" | "right" | "center";
  variant?: "dark" | "light";
}) {
  const sizeClass =
    size === "sm"
      ? "text-3xl md:text-4xl"
      : size === "md"
      ? "text-5xl md:text-6xl"
      : size === "lg"
      ? "text-6xl md:text-7xl"
      : "text-7xl md:text-[8.5rem]";

  const color = variant === "dark" ? "text-ink" : "text-paper";
  const sub = variant === "dark" ? "text-ink-mute" : "text-paper/55";
  const alignCls =
    align === "right"
      ? "text-right items-end"
      : align === "center"
      ? "text-center items-center"
      : "text-left items-start";

  return (
    <div className={cn("flex flex-col gap-2", alignCls)}>
      {label && (
        <span
          className={cn(
            "font-mono text-[0.65rem] tracking-[0.22em] uppercase",
            sub
          )}
        >
          {label}
        </span>
      )}
      <div className="flex items-baseline gap-2">
        <span className={cn("stat-num font-serif font-light", sizeClass, color)}>
          {value}
        </span>
        {unit && (
          <span
            className={cn(
              "font-mono text-xs tracking-[0.2em] uppercase",
              sub
            )}
          >
            {unit}
          </span>
        )}
      </div>
      {caption && (
        <p className={cn("font-sans text-sm leading-snug max-w-[28ch]", sub)}>
          {caption}
        </p>
      )}
    </div>
  );
}
