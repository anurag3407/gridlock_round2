import { NextResponse } from "next/server";
import mock from "@/mocks/sample_risk_map.json";

const API = process.env.ML_API_URL;
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "1" || !API;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const datetime = searchParams.get("datetime") ?? new Date().toISOString();

  if (USE_MOCK) {
    return NextResponse.json(mock);
  }

  try {
    const r = await fetch(
      `${API}/api/risk-map?datetime=${encodeURIComponent(datetime)}`,
      { cache: "no-store" }
    );
    return NextResponse.json(await r.json());
  } catch (e) {
    return NextResponse.json(mock);
  }
}
