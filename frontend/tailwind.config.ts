import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", lg: "2.5rem" },
      screens: { "2xl": "1440px" },
    },
    extend: {
      opacity: {
        2: "0.02",
        3: "0.03",
        6: "0.06",
        7: "0.07",
        8: "0.08",
        12: "0.12",
        14: "0.14",
        15: "0.15",
        18: "0.18",
        22: "0.22",
        28: "0.28",
        32: "0.32",
        35: "0.35",
        38: "0.38",
        42: "0.42",
        45: "0.45",
        55: "0.55",
        62: "0.62",
        65: "0.65",
        68: "0.68",
        72: "0.72",
        78: "0.78",
        82: "0.82",
        85: "0.85",
        88: "0.88",
        92: "0.92",
        95: "0.95",
      },
      colors: {
        paper: "#F2EEE5",
        "paper-soft": "#EAE4D5",
        "paper-deep": "#DED5BF",
        ink: "#0E1116",
        "ink-soft": "#1A1F2B",
        "ink-mute": "#4A5160",
        "ink-faint": "#8A8F9A",
        signal: "#E64A19",
        "signal-deep": "#B23A14",
        amber: "#F5A623",
        sage: "#3D5A4A",
        "sage-soft": "#7A9180",
        clay: "#C3886F",
        "risk-high": "#D7191C",
        "risk-mid": "#FC8D59",
        "risk-low": "#FDAE61",
        "risk-calm": "#A6D96A",
        "risk-cool": "#1A9641",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 7.5rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.5rem, 5.5vw, 5rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(2rem, 3.5vw, 3.25rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        eyebrow: ["0.7rem", { lineHeight: "1.3", letterSpacing: "0.18em" }],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulse_ring: {
          "0%": { transform: "scale(0.5)", opacity: "0.9" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.92" },
          "50%": { transform: "scale(1.06)", opacity: "1" },
        },
        cursor_blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        fade_up: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        ticker: "ticker 60s linear infinite",
        "ticker-slow": "ticker 120s linear infinite",
        pulse_ring: "pulse_ring 2.4s ease-out infinite",
        breathe: "breathe 3.6s ease-in-out infinite",
        cursor_blink: "cursor_blink 1.1s steps(1) infinite",
        fade_up: "fade_up 0.8s ease-out forwards",
        sweep: "sweep 2.4s ease-in-out infinite",
      },
      backgroundImage: {
        "noise": "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.42 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
      },
    },
  },
  plugins: [],
};

export default config;
