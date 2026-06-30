"use client";

import { useEffect, useRef } from "react";

interface MapClientProps {
  center?: [number, number];
  zoom?: number;
  routeCoords?: [number, number][];
  originMarker?: { lat: number; lon: number; label: string };
  destMarker?: { lat: number; lon: number; label: string };
  height?: string;
}

export function MapClient({
  center = [20, 0],
  zoom = 2,
  routeCoords = [],
  originMarker,
  destMarker,
  height = "100%",
}: MapClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<any>(null);
  const routeRef     = useRef<any>(null);
  const markersRef   = useRef<any[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Dynamic import — Leaflet needs browser env
    Promise.all([
      import("leaflet"),
      import("leaflet/dist/leaflet.css" as any),
    ]).then(([L]) => {
      // Fix default marker icons (Leaflet webpack issue)
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current!, {
        center,
        zoom,
        zoomControl: true,
        scrollWheelZoom: true,
        attributionControl: true,
      });

      const mtKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;
      if (mtKey) {
        // MapTiler Streets — clean, modern, premium look
        L.tileLayer(
          `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${mtKey}`,
          {
            attribution: '© <a href="https://www.maptiler.com/">MapTiler</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 20,
            tileSize: 256,
          }
        ).addTo(map);
      } else {
        // Fallback to OSM
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);
      }

      mapRef.current = map;

      // Custom icon factory
      const makeIcon = (color: string) => L.divIcon({
        html: `
          <div style="
            width:28px; height:28px;
            background:${color};
            border:3px solid white;
            border-radius:50% 50% 50% 0;
            transform:rotate(-45deg);
            box-shadow:0 4px 12px rgba(0,0,0,0.2);
          "></div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        className: "",
      });

      if (originMarker) {
        const m = L.marker([originMarker.lat, originMarker.lon], { icon: makeIcon("#60A5FA") })
          .addTo(map)
          .bindPopup(`<strong>Origin:</strong> ${originMarker.label}`);
        markersRef.current.push(m);
      }

      if (destMarker) {
        const m = L.marker([destMarker.lat, destMarker.lon], { icon: makeIcon("#6EE7B7") })
          .addTo(map)
          .bindPopup(`<strong>Destination:</strong> ${destMarker.label}`);
        markersRef.current.push(m);
      }

      if (routeCoords.length > 1) {
        routeRef.current = L.polyline(routeCoords, {
          color: "#60A5FA",
          weight: 4,
          opacity: 0.85,
          smoothFactor: 1,
          dashArray: undefined,
        }).addTo(map);
        map.fitBounds(routeRef.current.getBounds(), { padding: [40, 40] });
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update route + markers when props change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    import("leaflet").then((L) => {
      // Clear old markers
      markersRef.current.forEach(m => map.removeLayer(m));
      markersRef.current = [];

      // Clear old route
      if (routeRef.current) {
        map.removeLayer(routeRef.current);
        routeRef.current = null;
      }

      const makeIcon = (color: string) => L.divIcon({
        html: `
          <div style="
            width:28px; height:28px;
            background:${color};
            border:3px solid white;
            border-radius:50% 50% 50% 0;
            transform:rotate(-45deg);
            box-shadow:0 4px 12px rgba(0,0,0,0.2);
          "></div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        className: "",
      });

      if (originMarker) {
        const m = L.marker([originMarker.lat, originMarker.lon], { icon: makeIcon("#60A5FA") })
          .addTo(map)
          .bindPopup(`<strong>Origin:</strong> ${originMarker.label}`);
        markersRef.current.push(m);
      }

      if (destMarker) {
        const m = L.marker([destMarker.lat, destMarker.lon], { icon: makeIcon("#6EE7B7") })
          .addTo(map)
          .bindPopup(`<strong>Destination:</strong> ${destMarker.label}`);
        markersRef.current.push(m);
      }

      if (routeCoords.length > 1) {
        routeRef.current = L.polyline(routeCoords, {
          color: "#60A5FA",
          weight: 4,
          opacity: 0.85,
          smoothFactor: 1,
        }).addTo(map);
        map.fitBounds(routeRef.current.getBounds(), { padding: [40, 40] });
      } else if (originMarker) {
        map.setView([originMarker.lat, originMarker.lon], 6);
      }
    });
  }, [routeCoords, originMarker, destMarker]);

  return (
    <div
      ref={containerRef}
      style={{ height, width: "100%" }}
      className="rounded-2xl overflow-hidden z-0"
      role="application"
      aria-label="Interactive route map"
    />
  );
}
