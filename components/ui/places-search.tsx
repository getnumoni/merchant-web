"use client"

import { usePlacesSearch } from "@/hooks/use-places-search"
import { MapPin, Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Input } from "./input"

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

interface PlacesSearchProps {
  onPlaceSelect?: (place: PlaceDetails) => void
  placeholder?: string
  className?: string
  selectedAddress?: string
}

export function PlacesSearch({
  onPlaceSelect,
  placeholder = "E.G 45 Sunny Plaza, Victoria Island Road",
  className = "",
  selectedAddress
}: PlacesSearchProps) {
  const [inputValue, setInputValue] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isUserEditing, setIsUserEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { predictions, isLoading, searchPlaces, getPlaceDetails, clearPredictions } = usePlacesSearch()

  // Update input when selectedAddress changes (from current location)
  // Only update if user is not actively editing
  useEffect(() => {
    if (selectedAddress && selectedAddress !== inputValue && !isUserEditing) {
      setInputValue(selectedAddress)
    }
  }, [selectedAddress, inputValue, isUserEditing])

  // Search when input changes
  useEffect(() => {
    if (inputValue.trim() && inputValue.length > 2) {
      searchPlaces(inputValue)
      setShowSuggestions(true)
    } else {
      clearPredictions()
      setShowSuggestions(false)
    }
  }, [inputValue, searchPlaces, clearPredictions])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setIsUserEditing(true) // User is actively editing
  }

  const handlePlaceSelect = async (prediction: { place_id: string; description: string }) => {
    setInputValue(prediction.description)
    setShowSuggestions(false)
    setIsUserEditing(false) // Reset editing state when place is selected
    clearPredictions() // Clear predictions after selection

    const placeDetails = await getPlaceDetails(prediction.place_id)
    if (placeDetails && onPlaceSelect) {
      onPlaceSelect(placeDetails)
    }
  }

  const handleInputFocus = () => {
    if (predictions.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setShowSuggestions(false)
      setIsUserEditing(false) // Reset editing state when input loses focus
      clearPredictions() // Clear predictions when input loses focus
    }, 200)
  }

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        className="pl-10"
      />

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
        </div>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && predictions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {predictions.map((prediction) => (
            <button
              key={prediction.place_id}
              type="button"
              onClick={() => handlePlaceSelect(prediction)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
            >
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">
                  {prediction.structured_formatting.main_text}
                </div>
                <div className="text-sm text-gray-500">
                  {prediction.structured_formatting.secondary_text}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
