// Geoapify — Geocoding & Place Autocomplete
// Free tier: 3,000 req/day
// Docs: https://apidocs.geoapify.com/

export interface GeoapifyFeature {
  type: "Feature";
  properties: {
    place_id: string;
    name?: string;
    city?: string;
    town?: string;
    village?: string;
    county?: string;
    state?: string;
    country?: string;
    country_code?: string;
    formatted: string;
    lat: number;
    lon: number;
    result_type: string;
    rank?: { importance?: number };
  };
  geometry: { type: string; coordinates: [number, number] };
}

export interface GeoapifyResponse {
  type: "FeatureCollection";
  features: GeoapifyFeature[];
}

const BASE = "https://api.geoapify.com/v1";

function getKey(): string {
  return process.env.NEXT_PUBLIC_GEOAPIFY_KEY ?? "";
}

export async function autocomplete(
  text: string,
  limit = 6,
  lang = "en"
): Promise<GeoapifyFeature[]> {
  const key = getKey();
  if (!key || text.length < 2) return [];

  const params = new URLSearchParams({
    text,
    limit: String(limit),
    lang,
    apiKey: key,
  });

  const res = await fetch(`${BASE}/geocode/autocomplete?${params}`);
  if (!res.ok) throw new Error(`Geoapify autocomplete failed: ${res.status}`);
  const data: GeoapifyResponse = await res.json();
  return data.features;
}

export async function geocode(
  text: string,
  limit = 1,
  lang = "en"
): Promise<GeoapifyFeature[]> {
  const key = getKey();
  if (!key || !text) return [];

  const params = new URLSearchParams({
    text,
    limit: String(limit),
    lang,
    apiKey: key,
  });

  const res = await fetch(`${BASE}/geocode/search?${params}`);
  if (!res.ok) throw new Error(`Geoapify geocode failed: ${res.status}`);
  const data: GeoapifyResponse = await res.json();
  return data.features;
}

export async function reverseGeocode(
  lat: number,
  lon: number,
  lang = "en"
): Promise<GeoapifyFeature | null> {
  const key = getKey();
  if (!key) return null;

  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    lang,
    apiKey: key,
  });

  const res = await fetch(`${BASE}/geocode/reverse?${params}`);
  if (!res.ok) return null;
  const data: GeoapifyResponse = await res.json();
  return data.features[0] ?? null;
}

export function getDisplayName(feature: GeoapifyFeature): string {
  const p = feature.properties;
  return p.city ?? p.town ?? p.village ?? p.name ?? p.formatted.split(",")[0];
}

export function getCoords(feature: GeoapifyFeature): [number, number] {
  return [feature.properties.lat, feature.properties.lon];
}
