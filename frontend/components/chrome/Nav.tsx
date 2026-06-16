"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/about", label: "Story" },
  { href: "/methodology", label: "Method" },
  { href: "/risk-map", label: "Risk Map" },
  { href: "/dashboard", label: "Live Console" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss} IST`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-md bg-paper/85 border-b border-ink/10"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-baseline gap-3 group">
          <Wordmark />
          <span className="hidden md:inline font-mono text-[0.65rem] tracking-[0.25em] uppercase text-ink-mute group-hover:text-signal transition-colors">
            Bengaluru / live
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative px-4 py-2 font-mono text-[0.7rem] tracking-[0.22em] uppercase transition-colors",
                  active ? "text-ink" : "text-ink-mute hover:text-ink"
                )}
              >
                {l.label}
                {active && (
                  <span className="absolute left-4 right-4 -bottom-0.5 h-px bg-signal" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.18em] text-ink-mute">
            <LiveDot />
            <span suppressHydrationWarning>{time || "--:--:-- IST"}</span>
          </span>
          <Link
            href="/dashboard"
            className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ink text-paper font-mono text-[0.65rem] tracking-[0.2em] uppercase hover:bg-signal transition-colors"
          >
            Open Console
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Wordmark() {
  return (
    <span className="font-serif text-2xl tracking-tighter font-normal text-ink">
      ASTRAM<span className="text-signal">.</span>
    </span>
  );
}

function LiveDot() {
  return (
    <span className="relative inline-flex h-1.5 w-1.5">
      <span className="absolute inset-0 rounded-full bg-signal animate-pulse_ring" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
    </span>
  );
}
