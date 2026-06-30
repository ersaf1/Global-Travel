// Travix - Global Types

export type TransportMode = "FLIGHT" | "TRAIN" | "CAR" | "MOTORCYCLE";
export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
export type UserRole = "USER" | "ADMIN";

export interface Country {
  id: string;
  name: string;
  code: string;
  flag?: string;
  continent?: string;
}

export interface City {
  id: string;
  name: string;
  countryId: string;
  country?: Country;
  lat?: number;
  lng?: number;
  image?: string;
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  description?: string;
  countryId: string;
  cityId: string;
  categoryId?: string;
  images: string[];
  coverImage?: string;
  lat?: number;
  lng?: number;
  rating: number;
  reviewCount: number;
  priceFrom?: number;
  currency: string;
  featured: boolean;
  trending: boolean;
  country?: Country;
  city?: City;
  category?: Category;
}

export interface Booking {
  id: string;
  userId: string;
  destinationId: string;
  originCityId?: string;
  destCityId?: string;
  transportMode: TransportMode;
  departureDate: Date | string;
  returnDate?: Date | string;
  travelers: number;
  totalPrice?: number;
  currency: string;
  status: BookingStatus;
  notes?: string;
  destination?: Destination;
  originCity?: City;
  destCity?: City;
}

export interface Review {
  id: string;
  userId: string;
  destinationId: string;
  rating: number;
  title?: string;
  content?: string;
  images: string[];
  createdAt: Date | string;
  user?: {
    id: string;
    name?: string;
    image?: string;
  };
}

export interface RouteResult {
  distance: string;
  duration: string;
  estimatedCost?: string;
  estimatedFuel?: string;
  steps: RouteStep[];
  polyline?: string;
  alternatives?: RouteAlternative[];
}

export interface RouteStep {
  instruction: string;
  distance: string;
  duration: string;
}

export interface RouteAlternative {
  label: string;
  distance: string;
  duration: string;
  estimatedCost?: string;
}

export interface FlightResult {
  id: string;
  airline: string;
  airlineLogo?: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  price: number;
  currency: string;
}

export interface SearchParams {
  originCountry?: string;
  originCity?: string;
  destCountry?: string;
  destCity?: string;
  departureDate?: string;
  transportMode?: TransportMode;
  travelers?: number;
}

export interface WeatherData {
  temp: number;
  feels_like: number;
  description: string;
  icon: string;
  humidity: number;
  wind_speed: number;
  city: string;
  country: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
