
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";
import { tripCategories, tripFocus } from "@/data/impactTrips";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";

interface ImpactTripFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  selectedFocus: string[];
  onFocusToggle: (focus: string) => void;
  selectedCountries: string[];
  onCountryToggle: (country: string) => void;
  onClearFilters: () => void;
  availableCountries: string[];
}

export function ImpactTripFilters({
  searchValue,
  onSearchChange,
  selectedCategories,
  onCategoryToggle,
  selectedFocus,
  onFocusToggle,
  selectedCountries,
  onCountryToggle,
  onClearFilters,
  availableCountries
}: ImpactTripFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Input
            placeholder={t("Search impact trips...")}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <FilterIcon className="h-4 w-4" />
              <span className="sr-only">Open filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{t("Filter Impact Trips")}</SheetTitle>
              <SheetDescription>
                {t("Apply filters to find the perfect impact trip for you.")}
              </SheetDescription>
            </SheetHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t("Categories")}</h3>
                <div className="flex flex-wrap gap-2">
                  {tripCategories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategories.includes(category) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => onCategoryToggle(category)}
                    >
                      {t(category)}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t("Focus Areas")}</h3>
                <div className="flex flex-wrap gap-2">
                  {tripFocus.map((focus) => (
                    <Badge
                      key={focus}
                      variant={selectedFocus.includes(focus) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => onFocusToggle(focus)}
                    >
                      {t(focus)}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t("Countries")}</h3>
                <div className="flex flex-wrap gap-2">
                  {availableCountries.map((country) => (
                    <Badge
                      key={country}
                      variant={selectedCountries.includes(country) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => onCountryToggle(country)}
                    >
                      {country}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline" onClick={onClearFilters}>{t("Clear Filters")}</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
