import { NextResponse } from "next/server";
import mock from "@/mocks/sample_response.json";

const API = process.env.ML_API_URL;
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "1" || !API;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const since = searchParams.get("since") ?? new Date().toISOString();

  if (USE_MOCK) {
    return NextResponse.json(mock);
  }

  try {
    const r = await fetch(
      `${API}/api/live-feed?since=${encodeURIComponent(since)}`,
      { cache: "no-store" }
    );
    return NextResponse.json(await r.json());
  } catch (e) {
    return NextResponse.json(mock); // fail-open to mock so demo never breaks
  }
}
