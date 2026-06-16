import Link from "next/link";
import { cn } from "@/lib/utils";

export function ArrowLink({
  href,
  children,
  variant = "ink",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "ink" | "paper" | "signal";
  className?: string;
}) {
  const color =
    variant === "ink"
      ? "text-ink"
      : variant === "paper"
      ? "text-paper"
      : "text-signal";
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.22em] uppercase",
        color,
        className
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute left-0 right-0 -bottom-1 h-px bg-current opacity-30 group-hover:opacity-100 transition-opacity" />
      </span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-500 group-hover:translate-x-1.5"
      >
        →
      </span>
    </Link>
  );
}
