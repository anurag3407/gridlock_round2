import type {
  ForecastResponse,
  LiveFeedResponse,
  RiskMapResponse,
} from "./types";
import liveMock from "@/mocks/sample_response.json";
import riskMock from "@/mocks/sample_risk_map.json";
import forecastMock from "@/mocks/sample_forecast.json";

// Default to mock so the demo works out of the box. Set NEXT_PUBLIC_USE_MOCK=0
// (and ML_API_URL on the server) to switch to the live FastAPI.
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "0";

export async function getLiveFeed(since: string): Promise<LiveFeedResponse> {
  if (USE_MOCK) return liveMock as unknown as LiveFeedResponse;
  const r = await fetch(`/api/live-feed?since=${encodeURIComponent(since)}`, {
    cache: "no-store",
  });
  return (await r.json()) as LiveFeedResponse;
}

export async function getRiskMap(datetime: string): Promise<RiskMapResponse> {
  if (USE_MOCK) return riskMock as unknown as RiskMapResponse;
  const r = await fetch(`/api/risk-map?datetime=${encodeURIComponent(datetime)}`, {
    cache: "no-store",
  });
  return (await r.json()) as RiskMapResponse;
}

export async function postForecast(body: unknown): Promise<ForecastResponse> {
  if (USE_MOCK) return forecastMock as unknown as ForecastResponse;
  const r = await fetch(`/api/forecast`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  return (await r.json()) as ForecastResponse;
}

// Direct sync access for components that want the bundled mock without await
export const mocks = {
  live: liveMock as unknown as LiveFeedResponse,
  risk: riskMock as unknown as RiskMapResponse,
  forecast: forecastMock as unknown as ForecastResponse,
};
