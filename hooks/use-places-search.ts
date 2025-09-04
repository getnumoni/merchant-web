import { useCallback, useRef, useState } from 'react';

interface PlacePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface PlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export const usePlacesSearch = () => {
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const searchPlaces = useCallback(async (input: string) => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!input.trim()) {
      setPredictions([]);
      return;
    }

    // Set new timeout for debounced search
    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/places/autocomplete?input=${encodeURIComponent(input)}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to search places');
        }

        setPredictions(data.predictions || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setPredictions([]);
      } finally {
        setIsLoading(false);
      }
    }, 500); // 500ms delay
  }, []);

  const getPlaceDetails = useCallback(async (placeId: string): Promise<PlaceDetails | null> => {
    try {
      const response = await fetch(`/api/places/details?place_id=${placeId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get place details');
      }

      return data.result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  }, []);

  const clearPredictions = useCallback(() => {
    setPredictions([]);
  }, []);

  return {
    predictions,
    isLoading,
    error,
    searchPlaces,
    getPlaceDetails,
    clearPredictions
  };
};
