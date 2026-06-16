import { cn } from "@/lib/utils";

export function ChapterMark({
  number,
  title,
  className,
}: {
  number: number;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-4">
        <span className="font-mono text-[0.7rem] tracking-[0.3em] uppercase text-signal">
          Ch. {String(number).padStart(2, "0")}
        </span>
        <span className="h-px flex-1 bg-ink/15" />
      </div>
      <h3 className="font-serif text-2xl md:text-3xl tracking-tightest text-ink leading-tight italic">
        {title}
      </h3>
    </div>
  );
}
