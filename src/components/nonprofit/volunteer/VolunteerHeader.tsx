
import { useTranslation } from "react-i18next";
import { SearchInput } from "@/components/shared/SearchInput";

interface VolunteerHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function VolunteerHeader({ searchQuery, setSearchQuery }: VolunteerHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
      <div className="relative w-full md:w-80">
        <SearchInput
          placeholder={t("Search volunteers...")}
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>
    </div>
  );
}
