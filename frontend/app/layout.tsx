import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/chrome/Nav";
import { Footer } from "@/components/chrome/Footer";
import { Grain } from "@/components/chrome/Grain";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ASTRAM — The city's nervous system, in real time.",
  description:
    "A live operations console for Bengaluru's traffic. Detect, predict, divert — in seconds. Built on 8,173 real incidents.",
  authors: [{ name: "Team ASTRAM" }],
  openGraph: {
    title: "ASTRAM — The city's nervous system, in real time.",
    description:
      "Detect. Predict severity & clearance. Route around it — automatically.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}
    >
      <body className="relative min-h-screen bg-paper text-ink overflow-x-hidden">
        <Grain />
        <Nav />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
