import { NextResponse } from "next/server";
import mock from "@/mocks/sample_forecast.json";

const API = process.env.ML_API_URL;
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "1" || !API;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  if (USE_MOCK) {
    return NextResponse.json(mock);
  }

  try {
    const r = await fetch(`${API}/api/forecast`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    return NextResponse.json(await r.json());
  } catch (e) {
    return NextResponse.json(mock);
  }
}
