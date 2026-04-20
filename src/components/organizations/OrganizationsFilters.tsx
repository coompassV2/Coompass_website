import { ReactNode } from "react";
import { FilterToggle } from "@/components/shared/FilterToggle";
import { SearchInput } from "@/components/shared/SearchInput";
import { FilterDropdown } from "@/components/shared/FilterDropdown";
import { useTranslation } from "react-i18next";
import { translateSdgName } from "@/utils/sdgI18n";

interface SDG {
  id: number;
  name: string;
  key?: string;
}

const SDG_IMAGE_BASE =
  "https://e4k4c4x9.delivery.rocketcdn.me/en/wp-content/uploads/sites/15/2020/06/sustainable-development-goal";

function getSdgImageUrl(goalId: number): string {
  return `${SDG_IMAGE_BASE}-${goalId}.jpg`;
}

interface OrganizationsFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  showActiveMissionsOnly: boolean;
  onActiveToggle: (checked: boolean) => void;
  selectedSDGs: number[];
  onSDGToggle: (goalId: number) => void;
  SDGs: SDG[];
  rightActions?: ReactNode;
}

export function OrganizationsFilters({
  searchValue,
  onSearchChange,
  showActiveMissionsOnly,
  onActiveToggle,
  selectedSDGs,
  onSDGToggle,
  SDGs,
  rightActions,
}: OrganizationsFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
        <SearchInput
          placeholder={t("Search by keyword...")}
          value={searchValue}
          onChange={onSearchChange}
        />
        
        <div className="flex items-center gap-6">
          <FilterToggle
            id="active-missions"
            label={t("With Active Missions")}
            checked={showActiveMissionsOnly}
            onCheckedChange={onActiveToggle}
            labelClassName="text-xs font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <FilterDropdown
          label={t("SDG Filters")}
          options={SDGs.map((sdg) => ({
            value: `${sdg.id}. ${translateSdgName(sdg, t)}`,
            label: `${sdg.id}. ${translateSdgName(sdg, t)}`,
            iconUrl: getSdgImageUrl(sdg.id),
          }))}
          selectedOptions={selectedSDGs.map(id => {
            const sdg = SDGs.find(s => s.id === id);
            return sdg ? `${id}. ${translateSdgName(sdg, t)}` : "";
          }).filter(Boolean)}
          onOptionToggle={(option) => {
            const id = parseInt(option.split('.')[0]);
            onSDGToggle(id);
          }}
          buttonClassName="bg-[#1e3a5f] hover:bg-[#2d5a87] text-white border-[#1e3a5f]"
        />
        {rightActions}
      </div>
    </div>
  );
}
