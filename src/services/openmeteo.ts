// Open-Meteo — Free weather API, no API key required
// Docs: https://open-meteo.com/en/docs

export interface WeatherCurrent {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  description: string;
  icon: string;
  isDay: boolean;
}

export interface WeatherForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
  description: string;
  icon: string;
}

export interface WeatherData {
  current: WeatherCurrent;
  forecast: WeatherForecastDay[];
  timezone: string;
}

const BASE = "https://api.open-meteo.com/v1/forecast";

// WMO weather interpretation codes
const WMO_CODES: Record<number, { description: string; icon: string }> = {
  0:  { description: "Clear sky",             icon: "☀️" },
  1:  { description: "Mainly clear",          icon: "🌤️" },
  2:  { description: "Partly cloudy",         icon: "⛅" },
  3:  { description: "Overcast",              icon: "☁️" },
  45: { description: "Foggy",                 icon: "🌫️" },
  48: { description: "Icy fog",               icon: "🌫️" },
  51: { description: "Light drizzle",         icon: "🌦️" },
  53: { description: "Drizzle",               icon: "🌦️" },
  55: { description: "Heavy drizzle",         icon: "🌧️" },
  61: { description: "Slight rain",           icon: "🌧️" },
  63: { description: "Rain",                  icon: "🌧️" },
  65: { description: "Heavy rain",            icon: "🌧️" },
  71: { description: "Slight snow",           icon: "🌨️" },
  73: { description: "Snow",                  icon: "❄️" },
  75: { description: "Heavy snow",            icon: "❄️" },
  80: { description: "Slight showers",        icon: "🌦️" },
  81: { description: "Showers",               icon: "🌧️" },
  82: { description: "Heavy showers",         icon: "⛈️" },
  85: { description: "Snow showers",          icon: "🌨️" },
  95: { description: "Thunderstorm",          icon: "⛈️" },
  96: { description: "Thunderstorm w/ hail",  icon: "⛈️" },
  99: { description: "Heavy thunderstorm",    icon: "⛈️" },
};

function decodeWmo(code: number): { description: string; icon: string } {
  return WMO_CODES[code] ?? { description: "Unknown", icon: "🌡️" };
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude:            String(lat),
    longitude:           String(lon),
    current:             "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day",
    daily:               "temperature_2m_max,temperature_2m_min,weather_code",
    timezone:            "auto",
    forecast_days:       "5",
    temperature_unit:    "celsius",
    wind_speed_unit:     "kmh",
  });

  const res = await fetch(`${BASE}?${params}`);
  if (!res.ok) throw new Error(`Open-Meteo failed: ${res.status}`);
  const data = await res.json();

  const cur = data.current;
  const curWmo = decodeWmo(cur.weather_code);

  const current: WeatherCurrent = {
    temp:        Math.round(cur.temperature_2m),
    feelsLike:   Math.round(cur.apparent_temperature),
    humidity:    cur.relative_humidity_2m,
    windSpeed:   Math.round(cur.wind_speed_10m),
    weatherCode: cur.weather_code,
    description: curWmo.description,
    icon:        curWmo.icon,
    isDay:       cur.is_day === 1,
  };

  const forecast: WeatherForecastDay[] = (data.daily.time as string[]).map((date, i) => {
    const wmo = decodeWmo(data.daily.weather_code[i]);
    return {
      date,
      tempMax:     Math.round(data.daily.temperature_2m_max[i]),
      tempMin:     Math.round(data.daily.temperature_2m_min[i]),
      weatherCode: data.daily.weather_code[i],
      description: wmo.description,
      icon:        wmo.icon,
    };
  });

  return { current, forecast, timezone: data.timezone };
}
