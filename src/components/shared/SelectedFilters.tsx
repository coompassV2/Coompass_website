
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SelectedFiltersProps {
  filters: string[];
  onRemove: (filter: string) => void;
}

export function SelectedFilters({
  filters,
  onRemove
}: SelectedFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((filter) => (
        <Badge
          key={filter}
          variant="secondary"
          className="px-2 py-1 flex items-center"
        >
          {filter}
          <X
            className="h-3 w-3 ml-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(filter);
            }}
          />
        </Badge>
      ))}
    </div>
  );
}
