
import { useState, useMemo } from "react";
import { AppSidebar } from "@/components/app-sidebar/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { impactTrips } from "@/data/impactTrips";
import { ViewToggle } from "@/components/impact-trips/ViewToggle";
import { ImpactTripFilters } from "@/components/impact-trips/ImpactTripFilters";
import { ImpactTripsContent } from "@/components/impact-trips/ImpactTripsContent";
import { SelectedFilters } from "@/components/shared/SelectedFilters";
import { useImpactTripFilters } from "@/hooks/useImpactTripFilters";

export default function ImpactTrips() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  
  // Get all unique countries from impact trips
  const availableCountries = useMemo(() => {
    return [...new Set(impactTrips.map(trip => trip.country))].sort();
  }, []);
  
  const {
    searchValue,
    setSearchValue,
    selectedCountries,
    toggleCountry,
    selectedCategories,
    toggleCategory,
    selectedFocus,
    toggleFocus,
    clearFilters,
    filteredTrips
  } = useImpactTripFilters(impactTrips);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      <main className={cn(
        "transition-all duration-300 ease-in-out p-4 md:p-8",
        !isMobile && "responsive-layout"
      )}>
        <PageHeader 
          title={t("Impact Trips")}
          subtitle={t("Discover meaningful volunteering opportunities across Europe")}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
          <div className="w-full">
            <ImpactTripFilters
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              selectedCategories={selectedCategories}
              onCategoryToggle={toggleCategory}
              selectedFocus={selectedFocus}
              onFocusToggle={toggleFocus}
              selectedCountries={selectedCountries}
              onCountryToggle={toggleCountry}
              onClearFilters={clearFilters}
              availableCountries={availableCountries}
            />
          </div>

          <ViewToggle 
            viewType={viewType}
            onViewChange={setViewType}
          />
        </div>

        <SelectedFilters
          filters={[
            ...selectedCountries.map(country => `Country: ${country}`),
            ...selectedCategories,
            ...selectedFocus
          ]}
          onRemove={(filter) => {
            if (filter.startsWith('Country:')) {
              const country = filter.split(': ')[1];
              toggleCountry(country);
            } else if (selectedCategories.includes(filter)) {
              toggleCategory(filter);
            } else if (selectedFocus.includes(filter)) {
              toggleFocus(filter);
            }
          }}
        />

        <ImpactTripsContent 
          filteredTrips={filteredTrips}
          viewType={viewType}
        />
      </main>
    </div>
  );
}
