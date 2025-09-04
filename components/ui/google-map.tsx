'use client';

import { googleMapsLoader } from '@/lib/google-maps-loader';
import { useEffect, useRef, useState } from 'react';

interface GoogleMapProps {
  onLocationSelect?: (lat: number, lng: number, address: string) => void;
  initialCenter?: { lat: number; lng: number };
  center?: { lat: number; lng: number };
  className?: string;
}

// Use Google Maps types directly
type GeocoderResult = google.maps.GeocoderResult;
type GeocoderStatus = google.maps.GeocoderStatus;


export default function GoogleMap({
  onLocationSelect,
  initialCenter = { lat: 6.5244, lng: 3.3792 },
  center,
  className = "h-96 w-full"
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerInstanceRef = useRef<google.maps.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        // Use the global script loader to prevent duplicate loading
        await googleMapsLoader.loadGoogleMaps();

        // Initialize the map once Google Maps is loaded
        initializeMap();
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setIsLoading(false);
      }
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      const mapOptions: google.maps.MapOptions = {
        center: center || initialCenter,
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);

      // Create marker
      const marker = new window.google.maps.Marker({
        position: center || initialCenter,
        map: map,
        draggable: true,
        title: "Branch Location"
      });

      // Handle marker drag
      marker.addListener('dragend', () => {
        const position = marker.getPosition();
        if (position && onLocationSelect) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: position }, (results: GeocoderResult[] | null, status: GeocoderStatus) => {
            if (status === 'OK' && results && results[0]) {
              const address = results[0].formatted_address;
              onLocationSelect(position.lat(), position.lng(), address);
            }
          });
        }
      });

      // Handle map click
      map.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          marker.setPosition(event.latLng);
          if (onLocationSelect) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: event.latLng }, (results: GeocoderResult[] | null, status: GeocoderStatus) => {
              if (status === 'OK' && results && results[0] && event.latLng) {
                const address = results[0].formatted_address;
                onLocationSelect(event.latLng.lat(), event.latLng.lng(), address);
              }
            });
          }
        }
      });

      mapInstanceRef.current = map;
      markerInstanceRef.current = marker;
      setIsLoaded(true);
    };

    const useCurrentLocation = () => {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by this browser. Please search for your location manually.');
        return;
      }

      if (!mapInstanceRef.current || !markerInstanceRef.current) {
        alert('Map is not ready yet. Please wait a moment and try again.');
        return;
      }

      // Show loading state
      setIsLoading(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          mapInstanceRef.current?.setCenter(userLocation);
          markerInstanceRef.current?.setPosition(userLocation);

          // Geocode the location
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: userLocation }, (results: GeocoderResult[] | null, status: GeocoderStatus) => {
            setIsLoading(false);
            if (status === 'OK' && results && results[0] && onLocationSelect) {
              const address = results[0].formatted_address;
              onLocationSelect(userLocation.lat, userLocation.lng, address);
            }
          });
        },
        (error) => {
          setIsLoading(false);
          let errorMessage = 'Unable to get your current location. ';

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Please allow location access in your browser settings and try again.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information is unavailable. Please search for your location manually.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Location request timed out. Please try again.';
              break;
            default:
              errorMessage += 'An unknown error occurred. Please search for your location manually.';
              break;
          }

          alert(errorMessage);
          console.error('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    };

    // Make useCurrentLocation available globally for the button
    (window as typeof window & { useCurrentLocation?: () => void }).useCurrentLocation = useCurrentLocation;

    loadGoogleMaps();
  }, [initialCenter, onLocationSelect, center]);

  // Update map center when center prop changes
  useEffect(() => {
    if (center && mapInstanceRef.current && markerInstanceRef.current) {
      mapInstanceRef.current.setCenter(center);
      markerInstanceRef.current.setPosition(center);
    }
  }, [center]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-lg" />

      {/* Use Live Location Button */}
      {isLoaded && (
        <button
          type="button"
          onClick={() => (window as typeof window & { useCurrentLocation?: () => void }).useCurrentLocation?.()}
          disabled={isLoading}
          className="absolute bottom-4 right-4 bg-gray-800 text-white hover:bg-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium transition-colors"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          )}
          {isLoading ? 'Getting Location...' : 'Use Live Location'}
        </button>
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-2"></div>
            <p className="text-gray-500">Loading map...</p>
          </div>
        </div>
      )}

      {!isLoading && !isLoaded && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">Interactive Map</p>
            <p className="text-sm text-gray-400">Location selection available via search</p>
          </div>
        </div>
      )}
    </div>
  );
}