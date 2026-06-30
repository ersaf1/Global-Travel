// OSRM — Open Source Routing Machine (free, no API key)
// Public demo server: router.project-osrm.org
// Supports: driving, cycling, walking

export type OSRMProfile = "driving" | "cycling" | "foot";

export interface OSRMRoute {
  distance: number;       // meters
  duration: number;       // seconds
  geometry: string;       // encoded polyline
  legs: OSRMLeg[];
}

export interface OSRMLeg {
  distance: number;
  duration: number;
  steps: OSRMStep[];
  summary: string;
}

export interface OSRMStep {
  distance: number;
  duration: number;
  name: string;
  maneuver: {
    type: string;
    modifier?: string;
    instruction?: string;
  };
}

export interface OSRMResponse {
  code: string;
  routes: OSRMRoute[];
  waypoints: { name: string; location: [number, number] }[];
}

export interface RouteInfo {
  distance: string;
  duration: string;
  estimatedCost: string;
  steps: { instruction: string; distance: string; duration: string }[];
  coordinates: [number, number][];
  alternatives: { label: string; distance: string; duration: string }[];
}

const BASE = "https://router.project-osrm.org/route/v1";

export function transportToProfile(mode: string): OSRMProfile {
  switch (mode) {
    case "MOTORCYCLE":
    case "CAR":      return "driving";
    case "TRAIN":    return "driving"; // OSRM has no train — use driving as proxy
    default:         return "driving";
  }
}

export async function getRoute(
  originLat: number, originLon: number,
  destLat: number, destLon: number,
  profile: OSRMProfile = "driving",
  alternatives = true
): Promise<OSRMResponse> {
  const coords = `${originLon},${originLat};${destLon},${destLat}`;
  const params = new URLSearchParams({
    overview: "full",
    geometries: "geojson",
    steps: "true",
    alternatives: String(alternatives),
  });
  const res = await fetch(`${BASE}/${profile}/${coords}?${params}`);
  if (!res.ok) throw new Error(`OSRM routing failed: ${res.status}`);
  return res.json();
}

export function formatRouteInfo(resp: OSRMResponse, mode: string): RouteInfo {
  const primary = resp.routes[0];

  const distanceKm = (primary.distance / 1000).toFixed(1);
  const durationMin = Math.round(primary.duration / 60);
  const hours = Math.floor(durationMin / 60);
  const mins = durationMin % 60;
  const durationStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  // Estimate cost based on mode
  const cost = estimateCost(primary.distance, mode);

  // Extract steps from first leg
  const steps = primary.legs[0]?.steps.slice(0, 8).map(s => ({
    instruction: formatInstruction(s),
    distance: `${(s.distance / 1000).toFixed(1)} km`,
    duration: `${Math.round(s.duration / 60)} min`,
  })) ?? [];

  // GeoJSON coordinates
  const coords: [number, number][] = (primary.geometry as any).coordinates?.map(
    ([lon, lat]: [number, number]) => [lat, lon] as [number, number]
  ) ?? [];

  // Alternatives
  const alternatives = resp.routes.slice(1).map((r, i) => ({
    label: `Alternative route ${i + 1}`,
    distance: `${(r.distance / 1000).toFixed(1)} km`,
    duration: (() => {
      const m = Math.round(r.duration / 60);
      const h = Math.floor(m / 60);
      return h > 0 ? `${h}h ${m % 60}m` : `${m}m`;
    })(),
  }));

  return {
    distance: `${distanceKm} km`,
    duration: durationStr,
    estimatedCost: cost,
    steps,
    coordinates: coords,
    alternatives,
  };
}

function formatInstruction(step: OSRMStep): string {
  const type = step.maneuver.type;
  const mod  = step.maneuver.modifier ?? "";
  const name = step.name || "unnamed road";

  const map: Record<string, string> = {
    "depart":         `Start on ${name}`,
    "arrive":         `Arrive at destination`,
    "turn":           `Turn ${mod} onto ${name}`,
    "new name":       `Continue onto ${name}`,
    "merge":          `Merge ${mod} onto ${name}`,
    "on ramp":        `Take the ramp ${mod}`,
    "off ramp":       `Take the exit ${mod}`,
    "fork":           `Keep ${mod} at the fork`,
    "end of road":    `Turn ${mod} at the end of ${name}`,
    "roundabout":     `Enter the roundabout`,
    "rotary":         `Enter the rotary`,
    "roundabout turn":`Take the exit on the roundabout`,
    "use lane":       `Use lane ${mod}`,
    "continue":       `Continue on ${name}`,
  };

  return map[type] ?? `${type} ${mod} on ${name}`.trim();
}

function estimateCost(distanceMeters: number, mode: string): string {
  const km = distanceMeters / 1000;
  switch (mode) {
    case "FLIGHT":     return `$${Math.round(km * 0.12 + 50)}–$${Math.round(km * 0.18 + 80)}`;
    case "TRAIN":      return `$${Math.round(km * 0.05 + 5)}–$${Math.round(km * 0.10 + 10)}`;
    case "CAR":        return `$${Math.round(km * 0.08)}–$${Math.round(km * 0.12)}`;
    case "MOTORCYCLE": return `$${Math.round(km * 0.04)}–$${Math.round(km * 0.07)}`;
    default:           return "N/A";
  }
}
