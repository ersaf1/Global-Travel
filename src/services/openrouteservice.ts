// OpenRouteService — Free routing API
// Free tier: 2,000 req/day, 500 req/min
// Docs: https://openrouteservice.org/dev/#/api-docs

export type ORSProfile =
  | "driving-car"
  | "driving-hgv"
  | "cycling-regular"
  | "cycling-road"
  | "foot-walking"
  | "foot-hiking";

export interface ORSStep {
  distance: number;
  duration: number;
  type: number;
  instruction: string;
  name: string;
  way_points: [number, number];
}

export interface ORSSegment {
  distance: number;
  duration: number;
  steps: ORSStep[];
}

export interface ORSRoute {
  summary: { distance: number; duration: number };
  segments: ORSSegment[];
  geometry: string; // encoded polyline
  bbox: number[];
  way_points: number[];
}

export interface ORSResponse {
  routes: ORSRoute[];
  metadata: {
    attribution: string;
    service: string;
    timestamp: number;
    query: { coordinates: [number, number][] };
    engine: { version: string };
  };
}

export interface RouteInfo {
  distance: string;
  duration: string;
  estimatedCost: string;
  steps: { instruction: string; distance: string; duration: string }[];
  coordinates: [number, number][];
  alternatives: { label: string; distance: string; duration: string }[];
}

const BASE = "https://api.openrouteservice.org";

function getKey(): string {
  return process.env.NEXT_PUBLIC_ORS_KEY ?? "";
}

export function transportToProfile(mode: string): ORSProfile {
  switch (mode) {
    case "MOTORCYCLE": return "driving-car";
    case "CAR":        return "driving-car";
    case "TRAIN":      return "driving-car"; // ORS no train — proxy
    case "FLIGHT":     return "driving-car"; // fallback for long distances
    default:           return "driving-car";
  }
}

export async function getRoute(
  originLat: number, originLon: number,
  destLat: number,   destLon: number,
  profile: ORSProfile = "driving-car",
  alternatives = true
): Promise<ORSResponse> {
  const key = getKey();
  if (!key) throw new Error("ORS API key not configured. Set NEXT_PUBLIC_ORS_KEY in .env.local");

  const body = {
    coordinates: [
      [originLon, originLat],
      [destLon,   destLat],
    ],
    instructions: true,
    instructions_format: "text",
    language: "en",
    units: "km",
    geometry: true,
    alternative_routes: alternatives
      ? { target_count: 2, weight_factor: 1.4, share_factor: 0.6 }
      : undefined,
  };

  const res = await fetch(`${BASE}/v2/directions/${profile}/json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: key,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ORS routing failed (${res.status}): ${err}`);
  }

  return res.json();
}

// Decode ORS encoded polyline to [lat, lon][]
function decodePolyline(encoded: string): [number, number][] {
  const coords: [number, number][] = [];
  let index = 0, lat = 0, lng = 0;

  while (index < encoded.length) {
    let shift = 0, result = 0, byte: number;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;

    shift = 0; result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;

    coords.push([lat / 1e5, lng / 1e5]);
  }
  return coords;
}

function fmtDuration(seconds: number): string {
  const m = Math.round(seconds / 60);
  const h = Math.floor(m / 60);
  return h > 0 ? `${h}h ${m % 60}m` : `${m}m`;
}

function estimateCost(distanceKm: number, mode: string): string {
  switch (mode) {
    case "FLIGHT":     return `$${Math.round(distanceKm * 0.12 + 50)}–$${Math.round(distanceKm * 0.18 + 80)}`;
    case "TRAIN":      return `$${Math.round(distanceKm * 0.05 + 5)}–$${Math.round(distanceKm * 0.10 + 10)}`;
    case "CAR":        return `$${Math.round(distanceKm * 0.08)}–$${Math.round(distanceKm * 0.12)}`;
    case "MOTORCYCLE": return `$${Math.round(distanceKm * 0.04)}–$${Math.round(distanceKm * 0.07)}`;
    default:           return "N/A";
  }
}

export function formatRouteInfo(resp: ORSResponse, mode: string): RouteInfo {
  const primary = resp.routes[0];
  const distKm = (primary.summary.distance).toFixed(1);

  const steps = primary.segments[0]?.steps.slice(0, 10).map(s => ({
    instruction: s.instruction,
    distance:    `${s.distance.toFixed(1)} km`,
    duration:    fmtDuration(s.duration),
  })) ?? [];

  const coordinates = decodePolyline(primary.geometry);

  const alternatives = resp.routes.slice(1).map((r, i) => ({
    label:    `Alternative route ${i + 1}`,
    distance: `${r.summary.distance.toFixed(1)} km`,
    duration: fmtDuration(r.summary.duration),
  }));

  return {
    distance:      `${distKm} km`,
    duration:      fmtDuration(primary.summary.duration),
    estimatedCost: estimateCost(primary.summary.distance, mode),
    steps,
    coordinates,
    alternatives,
  };
}
