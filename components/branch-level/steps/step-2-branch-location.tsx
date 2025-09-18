"use client"

import { BranchFormData } from "@/lib/schemas/branch-schema";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import GoogleMap from "@/components/ui/google-map";
import { PlacesSearch } from "../../ui/places-search";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Step2Props {
  // No props needed as we use useFormContext
}

interface GooglePlaceResult {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  formatted_address: string;
  address_components?: Array<{
    long_name: string;
    types: string[];
  }>;
}

export default function Step2BranchLocation({ }: Step2Props) {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const { setValue } = useFormContext<BranchFormData>();

  const handlePlaceSelect = (place: GooglePlaceResult) => {
    const { lat, lng } = place.geometry.location
    const address = place.formatted_address

    console.log("Selected place:", { lat, lng, address })

    // Update the map center to the selected location
    setSelectedLocation({ lat, lng })
    setSelectedAddress(address)

    // Update form fields with the selected location data
    setValue('address', address, { shouldValidate: true });
    setValue('city', place.address_components?.find((comp) => comp.types.includes('locality'))?.long_name || '', { shouldValidate: true });
    setValue('state', place.address_components?.find((comp) => comp.types.includes('administrative_area_level_1'))?.long_name || '', { shouldValidate: true });
    setValue('zipCode', place.address_components?.find((comp) => comp.types.includes('postal_code'))?.long_name || '', { shouldValidate: true });
    setValue('latitude', lat, { shouldValidate: true });
    setValue('longitude', lng, { shouldValidate: true });
  }

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    console.log("Selected location:", { lat, lng, address })

    // Update the selected location state
    setSelectedLocation({ lat, lng })
    setSelectedAddress(address)

    // Update form fields with the selected location data
    setValue('address', address, { shouldValidate: true });
    setValue('latitude', lat, { shouldValidate: true });
    setValue('longitude', lng, { shouldValidate: true });

    // Extract city, state, and zipCode from the address string
    // This is a simple parsing approach - you might want to use a more robust geocoding service
    const addressParts = address.split(', ');
    if (addressParts.length >= 2) {
      setValue('city', addressParts[addressParts.length - 2] ?? '', { shouldValidate: true });
      setValue('state', addressParts[addressParts.length - 1] ?? '', { shouldValidate: true });
    } else {
      setValue('city', 'Lagos', { shouldValidate: true });
      setValue('state', 'Lagos', { shouldValidate: true });
    }

    // Try to extract ZIP code from the address
    const zipMatch = address.match(/\b\d{6}\b/); // Nigerian postal codes are typically 6 digits
    setValue('zipCode', zipMatch ? zipMatch[0] : '100001', { shouldValidate: true });
  }

  return (
    <div className="space-y-4">
      {/* Places Search */}
      <PlacesSearch
        onPlaceSelect={handlePlaceSelect}
        placeholder="E.G 45 Sunny Plaza, Victoria Island Road"
        selectedAddress={selectedAddress}
      />

      {/* Google Map */}
      <GoogleMap
        onLocationSelect={handleLocationSelect}
        initialCenter={{ lat: 6.5244, lng: 3.3792 }} // Lagos, Nigeria
        center={selectedLocation || undefined}
        className="h-96 w-full"
      />
    </div>
  );
}
