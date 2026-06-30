// Openverse API — Free, open source media (WordPress Foundation)
// No API key required for basic usage
// Docs: https://api.openverse.org/v1/

export interface OpenverseImage {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  creator?: string;
  creator_url?: string;
  license: string;
  license_url: string;
  foreign_landing_url: string;
  width?: number;
  height?: number;
  source: string;
}

export interface OpenverseResponse {
  count: number;
  next?: string;
  previous?: string;
  results: OpenverseImage[];
}

const BASE = "https://api.openverse.org/v1";

export async function searchImages(
  query: string,
  page = 1,
  pageSize = 12
): Promise<OpenverseResponse> {
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    page_size: String(pageSize),
    license_type: "commercial,modification",
    media_type: "image",
  });

  const res = await fetch(`${BASE}/images/?${params}`, {
    headers: { "Accept": "application/json" },
  });

  if (!res.ok) throw new Error(`Openverse search failed: ${res.status}`);
  return res.json();
}

export async function getRandomImage(query: string): Promise<OpenverseImage | null> {
  try {
    const data = await searchImages(query, 1, 5);
    if (!data.results.length) return null;
    const idx = Math.floor(Math.random() * data.results.length);
    return data.results[idx];
  } catch {
    return null;
  }
}

export async function getDestinationImage(destination: string): Promise<string> {
  const img = await getRandomImage(`${destination} travel landscape`);
  return img?.url ?? getFallbackImage(destination);
}

// Unsplash source fallback — no auth needed
export function getFallbackImage(query: string): string {
  return `https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80`;
}

// Build attribution per CC license requirements
export function buildAttribution(img: OpenverseImage): string {
  const creator = img.creator ? ` by ${img.creator}` : "";
  return `"${img.title}"${creator} — ${img.license.toUpperCase()} via Openverse`;
}
