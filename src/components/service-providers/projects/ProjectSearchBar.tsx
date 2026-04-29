
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface ProjectSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFilter: () => void;
}

export function ProjectSearchBar({ searchQuery, setSearchQuery, onFilter }: ProjectSearchBarProps) {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={t('Search projects...')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button variant="outline" onClick={onFilter}>
        <Filter className="h-4 w-4 mr-2" />
        {t('Filter')}
      </Button>
    </div>
  );
}
