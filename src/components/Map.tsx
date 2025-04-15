
import React, { useEffect, useRef, useState } from 'react';
import { useApiKeys } from './ApiKeyManager';
import { Loader2 } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';

// Declare Google Maps namespace
declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: any) => any;
        Marker: new (options: any) => any;
        SymbolPath: {
          CIRCLE: number;
        };
      };
    };
    initMap: () => void;
  }
}

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const { apiKeys } = useApiKeys();
  const { location } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!apiKeys.googlemaps || !mapRef.current) return;

    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKeys.googlemaps}&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        window.initMap = () => {
          if (!mapRef.current) return;

          const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Center of India
          const center = location?.coordinates ? 
            { lat: location.coordinates.latitude, lng: location.coordinates.longitude } : 
            defaultCenter;

          map.current = new window.google.maps.Map(mapRef.current, {
            zoom: location ? 8 : 5,
            center,
            styles: [
              {
                featureType: "administrative",
                elementType: "geometry",
                stylers: [{ visibility: "simplified" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#a1c4fd" }],
              },
            ],
          });

          setIsLoading(false);

          // Add markers for disaster zones (example)
          if (location?.state === 'Kerala') {
            new window.google.maps.Marker({
              position: { lat: 10.8505, lng: 76.2711 },
              map: map.current,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: '#ef4444',
                fillOpacity: 0.6,
                strokeWeight: 0,
                scale: 10,
              },
              title: 'Flood Risk Zone',
            });
          }

          // Add user's location marker if available
          if (location?.coordinates) {
            new window.google.maps.Marker({
              position: { 
                lat: location.coordinates.latitude, 
                lng: location.coordinates.longitude 
              },
              map: map.current,
              title: 'Your Location',
            });
          }
        };
      } else {
        window.initMap();
      }
    };

    loadGoogleMaps();

    return () => {
      // Cleanup
      const script = document.querySelector('script[src*="maps.googleapis.com"]');
      if (script) {
        script.remove();
      }
    };
  }, [apiKeys.googlemaps, location]);

  if (!apiKeys.googlemaps) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Please enter your Google Maps API key to view the map.</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
};

export default Map;
