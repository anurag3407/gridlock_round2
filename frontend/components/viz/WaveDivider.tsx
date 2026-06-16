/** A subtle hand-drawn wavy divider used between editorial sections. */
export function WaveDivider({
  variant = "ink",
  amplitude = 6,
}: {
  variant?: "ink" | "paper" | "signal";
  amplitude?: number;
}) {
  const color =
    variant === "ink" ? "#0E1116" : variant === "paper" ? "#F2EEE5" : "#E64A19";
  // Build a sine-y path
  const w = 1200;
  const h = 24;
  const segs = 30;
  let d = `M 0 ${h / 2}`;
  for (let i = 1; i <= segs; i++) {
    const x = (i / segs) * w;
    const y = h / 2 + Math.sin(i * 0.9) * amplitude;
    const cx = x - w / segs / 2;
    const cy = h / 2 - Math.sin((i - 0.5) * 0.9) * amplitude;
    d += ` Q ${cx} ${cy}, ${x} ${y}`;
  }

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="w-full h-6 opacity-50"
      aria-hidden
    >
      <path d={d} fill="none" stroke={color} strokeWidth="1" />
    </svg>
  );
}
