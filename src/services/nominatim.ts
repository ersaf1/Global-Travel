// Nominatim — OpenStreetMap geocoding (free, no API key)
// Rate limit: 1 req/s — respect this in production

export interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    country?: string;
    country_code?: string;
  };
  type: string;
  importance: number;
}

const BASE = "https://nominatim.openstreetmap.org";
const HEADERS = {
  "Accept-Language": "en",
  "User-Agent": "Travix/1.0 (iseng project)",
};

export async function searchPlaces(query: string, limit = 6): Promise<NominatimResult[]> {
  if (!query || query.length < 2) return [];
  const params = new URLSearchParams({
    q: query,
    format: "json",
    addressdetails: "1",
    limit: String(limit),
  });
  const res = await fetch(`${BASE}/search?${params}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`Nominatim search failed: ${res.status}`);
  return res.json();
}

export async function reverseGeocode(lat: number, lon: number): Promise<NominatimResult | null> {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    format: "json",
    addressdetails: "1",
  });
  const res = await fetch(`${BASE}/reverse?${params}`, { headers: HEADERS });
  if (!res.ok) return null;
  return res.json();
}

export function getDisplayCity(result: NominatimResult): string {
  const a = result.address;
  return a.city ?? a.town ?? a.village ?? result.display_name.split(",")[0];
}
