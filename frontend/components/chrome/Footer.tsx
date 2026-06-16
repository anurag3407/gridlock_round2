import Link from "next/link";
import { CorridorMarquee } from "./Marquee";

export function Footer() {
  return (
    <footer className="relative z-10 mt-32 bg-ink text-paper overflow-hidden">
      <div className="border-b border-paper/10">
        <CorridorMarquee variant="dark" />
      </div>

      <div className="container py-20 grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-5">
          <div className="font-serif text-5xl md:text-6xl leading-[1.02] tracking-tightest">
            The city breathes
            <br />
            on a rhythm.
            <br />
            <span className="italic text-paper/60">We listen for the break.</span>
          </div>
        </div>

        <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-10">
          <FooterCol
            title="The System"
            items={[
              { label: "Live Console", href: "/dashboard" },
              { label: "Risk Map", href: "/risk-map" },
              { label: "Methodology", href: "/methodology" },
            ]}
          />
          <FooterCol
            title="Story"
            items={[
              { label: "About", href: "/about" },
              { label: "The Data", href: "/about#data" },
              { label: "The Team", href: "/about#team" },
            ]}
          />
          <FooterCol
            title="Built on"
            items={[
              { label: "Mappls SDK", href: "https://apis.mapmyindia.com" },
              { label: "OSMnx + NetworkX", href: "#" },
              { label: "FastAPI", href: "#" },
            ]}
          />
          <FooterCol
            title="Context"
            items={[
              { label: "Flipkart GRID '26", href: "#" },
              { label: "Theme 2", href: "#" },
              { label: "Bengaluru, IN", href: "#" },
            ]}
          />
        </div>
      </div>

      <div className="container border-t border-paper/10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-6 font-mono text-[0.65rem] tracking-[0.22em] uppercase text-paper/55">
          <span>© 2026 Team ASTRAM</span>
          <span className="hidden md:inline">—</span>
          <span>Built for Flipkart GRID 6.0 / Theme 2</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[0.65rem] tracking-[0.22em] uppercase text-paper/55">
          <Link href="/dashboard" className="hover:text-signal transition-colors">
            Launch console →
          </Link>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute -bottom-32 left-0 right-0 h-72 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(230,74,25,0.18), transparent 60%)",
        }}
      />
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <div className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-paper/45 mb-4">
        {title}
      </div>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li key={i.label}>
            <Link
              href={i.href}
              className="font-serif text-lg text-paper/85 hover:text-signal transition-colors"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
