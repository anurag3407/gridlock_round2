// JSON contract — mirrors PROJECT_PLAN.md Section 7.

export type LatLng = { lat: number; lng: number };

export type ZoneSnapshot = {
  zone_id: string;
  name?: string;
  lat?: number;
  lng?: number;
  risk_score: number;
  color: string;
  radius_m: number;
};

export type TimelineStep = {
  datetime: string;
  overall_risk: number;
  zones: ZoneSnapshot[];
};

export type LegendItem = {
  color: string;
  label: string;
  min?: number;
  max?: number;
};

export type Junction = {
  name: string;
  lat: number;
  lng: number;
  risk: number;
  color: string;
};

export type Route = {
  rank: number;
  algorithm: string;
  distance_m: number;
  eta_min: number;
  summary: string;
  polyline: [number, number][];
};

export type Incident = {
  id: string;
  cause: string;
  lat: number;
  lng: number;
  corridor: string;
  address?: string;
  arrived_at: string;
  predicted_priority: "High" | "Low" | "Medium" | string;
  closure_probability: number;
  predicted_clearance_min: number;
  clears_at: string;
  risk_score: number;
  color: string;
  radius_m: number;
  affected_junctions: Junction[];
  recommendation: {
    officers: number;
    barricades: LatLng[];
    diversion: {
      blocked_segment: string;
      src: LatLng;
      dst: LatLng;
      routes: Route[];
    };
  };
};

export type LiveFeedResponse = {
  endpoint: string;
  sim_time: string;
  speed: string;
  summary: {
    active_incidents: number;
    high_priority: number;
    avg_clearance_min: number;
    headline: string;
  };
  new_incidents: Incident[];
  risk_map?: {
    baseline_zones: ZoneSnapshot[];
    risk_timeline: TimelineStep[];
  };
  legend?: LegendItem[];
  next_since?: string;
};

export type RiskMapResponse = {
  endpoint: string;
  requested_datetime: string;
  day_of_week: string;
  summary: {
    overall_risk: number;
    highest_zone: { name: string; risk_score: number };
    headline: string;
    based_on_events: number;
  };
  baseline_zones: ZoneSnapshot[];
  risk_timeline: TimelineStep[];
  legend?: LegendItem[];
};

export type ForecastResponse = {
  endpoint: string;
  request_echo: {
    event_cause: string;
    lat: number;
    lng: number;
    start_datetime: string;
    expected_crowd: number;
    forecast_days: number;
  };
  summary: {
    predicted_priority: string;
    road_closure_probability: number;
    peak_risk_score: number;
    peak_window: string;
    model_confidence: number;
    based_on_events: number;
    headline: string;
  };
  impact_zones: ZoneSnapshot[];
  timeline: TimelineStep[];
  recommendations?: unknown[];
  legend?: LegendItem[];
};
