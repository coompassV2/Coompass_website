
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ImpactTrip } from "@/data/impactTrips";

export function useImpactTripFilters(trips: ImpactTrip[]) {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);
  const [minDuration, setMinDuration] = useState<number | null>(null);
  const [maxDuration, setMaxDuration] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  // Parse query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const countryParam = queryParams.get('country');
    
    if (countryParam) {
      setSelectedCountries([countryParam]);
    } else {
      setSelectedCountries([]);
    }
  }, [location.search]);

  const toggleCountry = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleFocus = (focus: string) => {
    setSelectedFocus(prev => 
      prev.includes(focus)
        ? prev.filter(f => f !== focus)
        : [...prev, focus]
    );
  };

  const clearFilters = () => {
    setSelectedCountries([]);
    setSelectedCategories([]);
    setSelectedFocus([]);
    setMinDuration(null);
    setMaxDuration(null);
    setMinPrice(null);
    setMaxPrice(null);
    setSearchValue("");
  };

  const filteredTrips = trips.filter(trip => {
    if (selectedCountries.length > 0 && !selectedCountries.includes(trip.country)) return false;
    if (selectedCategories.length > 0 && !trip.categories.some(category => selectedCategories.includes(category))) return false;
    if (selectedFocus.length > 0 && !trip.focus.some(focus => selectedFocus.includes(focus))) return false;
    if (minDuration !== null && trip.duration < minDuration) return false;
    if (maxDuration !== null && trip.duration > maxDuration) return false;
    if (minPrice !== null && trip.price < minPrice) return false;
    if (maxPrice !== null && trip.price > maxPrice) return false;
    
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      return (
        trip.title.toLowerCase().includes(searchLower) ||
        trip.organization.toLowerCase().includes(searchLower) ||
        trip.description.toLowerCase().includes(searchLower) ||
        trip.location.toLowerCase().includes(searchLower) ||
        trip.country.toLowerCase().includes(searchLower) ||
        trip.categories.some(category => category.toLowerCase().includes(searchLower)) ||
        trip.focus.some(focus => focus.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });

  return {
    searchValue,
    setSearchValue,
    selectedCountries,
    toggleCountry,
    selectedCategories,
    toggleCategory,
    selectedFocus,
    toggleFocus,
    minDuration,
    setMinDuration,
    maxDuration,
    setMaxDuration,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    clearFilters,
    filteredTrips
  };
}
