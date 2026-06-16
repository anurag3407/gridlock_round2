/**
 * Editorial photo plate. Renders a placeholder block with caption + image-prompt key.
 * Replace the placeholder when illustrations are generated.
 */
import { cn } from "@/lib/utils";

export function PhotoPlate({
  promptId,
  caption,
  alt,
  aspect = "4/5",
  variant = "warm",
  className,
}: {
  promptId: string;
  caption: string;
  alt: string;
  aspect?: "4/5" | "3/2" | "16/9" | "1/1" | "9/16";
  variant?: "warm" | "cool" | "ink" | "signal";
  className?: string;
}) {
  const palettes: Record<string, string> = {
    warm:
      "linear-gradient(135deg, #C3886F 0%, #DED5BF 45%, #F2EEE5 100%)",
    cool:
      "linear-gradient(135deg, #3D5A4A 0%, #6F8A78 50%, #DED5BF 100%)",
    ink: "linear-gradient(135deg, #0E1116 0%, #1A1F2B 60%, #4A5160 100%)",
    signal:
      "linear-gradient(135deg, #B23A14 0%, #E64A19 55%, #F5A623 100%)",
  };
  const aspectCls =
    aspect === "4/5"
      ? "aspect-[4/5]"
      : aspect === "3/2"
      ? "aspect-[3/2]"
      : aspect === "16/9"
      ? "aspect-[16/9]"
      : aspect === "9/16"
      ? "aspect-[9/16]"
      : "aspect-square";

  return (
    <figure className={cn("group", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-ink/15",
          aspectCls
        )}
        style={{ background: palettes[variant] }}
        role="img"
        aria-label={alt}
      >
        {/* Grain */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />
        {/* Placeholder watermark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-paper/70 mb-3">
            Placeholder · {promptId}
          </div>
          <div className="font-serif text-paper/80 text-lg italic leading-snug max-w-[24ch]">
            {alt}
          </div>
        </div>
        {/* corner ticks */}
        <Tick className="top-2 left-2 rotate-0" />
        <Tick className="top-2 right-2 rotate-90" />
        <Tick className="bottom-2 left-2 -rotate-90" />
        <Tick className="bottom-2 right-2 rotate-180" />
      </div>
      <figcaption className="mt-3 flex items-center gap-3">
        <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-signal">
          {promptId}
        </span>
        <span className="font-serif italic text-sm text-ink/65 leading-snug">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}

function Tick({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("absolute h-4 w-4", className)}
      style={{
        borderTop: "1px solid rgba(242,238,229,0.7)",
        borderLeft: "1px solid rgba(242,238,229,0.7)",
      }}
    />
  );
}
