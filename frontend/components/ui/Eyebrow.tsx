import { cn } from "@/lib/utils";

export function Eyebrow({
  number,
  children,
  className,
  variant = "dark",
}: {
  number?: string | number;
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light" | "signal";
}) {
  const color =
    variant === "dark"
      ? "text-ink-mute"
      : variant === "light"
      ? "text-paper/60"
      : "text-signal";
  return (
    <div
      className={cn(
        "flex items-center gap-4 font-mono text-[0.7rem] tracking-[0.24em] uppercase",
        color,
        className
      )}
    >
      {number !== undefined && (
        <span className={cn("opacity-70", variant === "signal" && "opacity-100")}>
          {String(number).padStart(2, "0")} /
        </span>
      )}
      <span className="inline-block h-px w-8 bg-current opacity-50" />
      <span>{children}</span>
    </div>
  );
}
