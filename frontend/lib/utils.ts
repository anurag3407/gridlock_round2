import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fmtNumber(n: number) {
  // Deterministic comma grouping — no Intl locale dependency
  const s = String(Math.trunc(n));
  const sign = s.startsWith("-") ? "-" : "";
  const digits = sign ? s.slice(1) : s;
  return sign + digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function fmtWeekday(iso: string): string {
  const d = new Date(iso);
  const wk = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  return `${wk[d.getUTCDay()]}, ${pad(d.getUTCDate())} ${MONTHS[d.getUTCMonth()]}`;
}

export function fmtTimeSeconds(iso: string) {
  const d = new Date(iso);
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
}

const pad = (n: number) => String(n).padStart(2, "0");
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// Deterministic — never reads Node/browser locale, so SSR & CSR strings match.
export function fmtTime(iso: string) {
  const d = new Date(iso);
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
}

export function fmtDate(iso: string) {
  const d = new Date(iso);
  return `${pad(d.getUTCDate())} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function fmtMin(min: number) {
  if (min < 60) return `${Math.round(min)} min`;
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/** Map a 0-100 risk score to a label */
export function riskLabel(n: number): "Calm" | "Watch" | "Elevated" | "High" | "Critical" {
  if (n >= 80) return "Critical";
  if (n >= 65) return "High";
  if (n >= 45) return "Elevated";
  if (n >= 25) return "Watch";
  return "Calm";
}
