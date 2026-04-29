
import { FilterToggle } from "@/components/shared/FilterToggle";
import { SearchInput } from "@/components/shared/SearchInput";
import { FilterDropdown } from "@/components/shared/FilterDropdown";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface MissionsFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  showActiveMissionsOnly: boolean;
  onActiveToggle: (checked: boolean) => void;
  showInPersonOnly: boolean;
  onInPersonToggle: (checked: boolean) => void;
  showSuitableOnly?: boolean;
  onSuitableToggle?: (checked: boolean) => void;
  showSuitableToggle?: boolean;
  selectedCauses: string[];
  onCauseToggle: (cause: string) => void;
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
  districts: string[];
  onClearFilters: () => void;
  causeAreas: string[];
  skills: string[];
}

export function MissionsFilters({
  searchValue,
  onSearchChange,
  showActiveMissionsOnly,
  onActiveToggle,
  showInPersonOnly,
  onInPersonToggle,
  showSuitableOnly = false,
  onSuitableToggle,
  showSuitableToggle = false,
  selectedCauses,
  onCauseToggle,
  selectedSkills,
  onSkillToggle,
  selectedDistrict,
  onDistrictChange,
  districts,
  onClearFilters,
  causeAreas,
  skills
}: MissionsFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col xl:flex-row xl:items-center gap-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1 min-w-0">
        <SearchInput
          placeholder={t("Search by keyword...")}
          value={searchValue}
          onChange={onSearchChange}
        />
        
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <FilterToggle
            id="active-missions"
            label={t("Only Active Missions")}
            checked={showActiveMissionsOnly}
            onCheckedChange={onActiveToggle}
            labelClassName="text-xs font-medium"
          />

          <FilterToggle
            id="in-person"
            label={t("In-Person Only")}
            checked={showInPersonOnly}
            onCheckedChange={onInPersonToggle}
            labelClassName="text-xs font-medium"
          />

          {showSuitableToggle && onSuitableToggle && (
            <FilterToggle
              id="suitable-for-me"
              label={t("Adequadas a mim")}
              checked={showSuitableOnly}
              onCheckedChange={onSuitableToggle}
              labelClassName="text-xs font-medium"
            />
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <FilterDropdown
          label={t("Cause Areas")}
          options={causeAreas}
          selectedOptions={selectedCauses}
          onOptionToggle={onCauseToggle}
        />

        <FilterDropdown
          label={t("Skills")}
          options={skills}
          selectedOptions={selectedSkills}
          onOptionToggle={onSkillToggle}
        />

        <FilterDropdown
          label={t("District")}
          options={districts}
          selectedOptions={selectedDistrict ? [selectedDistrict] : []}
          onOptionToggle={(district) =>
            onDistrictChange(selectedDistrict === district ? "" : district)
          }
        />

        {(selectedCauses.length > 0 || selectedSkills.length > 0 || selectedDistrict.length > 0) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-red-500 hover:text-red-600"
          >
            <X className="h-4 w-4 mr-2" />
            {t("Clear Filters")}
          </Button>
        )}
      </div>
    </div>
  );
}
