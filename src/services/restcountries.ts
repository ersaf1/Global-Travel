// REST Countries API — Free, no API key required
// Docs: https://restcountries.com/

export interface Country {
  name: { common: string; official: string };
  cca2: string;   // ISO 3166-1 alpha-2
  cca3: string;   // ISO 3166-1 alpha-3
  flag: string;   // emoji flag
  flags: { png: string; svg: string; alt?: string };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
  timezones: string[];
  continents: string[];
  latlng: [number, number];
  area: number;
}

const BASE = "https://restcountries.com/v3.1";

const FIELDS = "name,cca2,cca3,flag,flags,capital,region,subregion,population,languages,currencies,timezones,continents,latlng,area";

export async function getAllCountries(): Promise<Country[]> {
  const res = await fetch(`${BASE}/all?fields=${FIELDS}`);
  if (!res.ok) throw new Error(`REST Countries failed: ${res.status}`);
  return res.json();
}

export async function getCountryByCode(code: string): Promise<Country | null> {
  const res = await fetch(`${BASE}/alpha/${code}?fields=${FIELDS}`);
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data;
}

export async function searchCountries(name: string): Promise<Country[]> {
  const res = await fetch(`${BASE}/name/${encodeURIComponent(name)}?fields=${FIELDS}`);
  if (!res.ok) return [];
  return res.json();
}

export async function getCountriesByRegion(region: string): Promise<Country[]> {
  const res = await fetch(`${BASE}/region/${region}?fields=${FIELDS}`);
  if (!res.ok) return [];
  return res.json();
}

// Get top N countries sorted by population (for trending section)
export async function getPopularCountries(limit = 8): Promise<Country[]> {
  const all = await getAllCountries();
  return all
    .sort((a, b) => b.population - a.population)
    .slice(0, limit);
}

// Helper — get currency symbol
export function getCurrency(country: Country): string {
  const currencies = country.currencies;
  if (!currencies) return "USD";
  const first = Object.values(currencies)[0];
  return first?.symbol ?? Object.keys(currencies)[0];
}
