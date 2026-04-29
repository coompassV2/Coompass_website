
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

interface ViewToggleProps {
  viewType: 'grid' | 'list';
  onViewChange: (viewType: 'grid' | 'list') => void;
}

export function ViewToggle({ viewType, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center bg-muted/50 rounded-md p-1 gap-1 self-start">
      <Button
        variant={viewType === 'grid' ? "default" : "ghost"}
        size="sm"
        className="h-8 px-2"
        onClick={() => onViewChange('grid')}
      >
        <LayoutGrid className="h-4 w-4 mr-1" />
        Grid
      </Button>
      <Button
        variant={viewType === 'list' ? "default" : "ghost"}
        size="sm"
        className="h-8 px-2"
        onClick={() => onViewChange('list')}
      >
        <List className="h-4 w-4 mr-1" />
        List
      </Button>
    </div>
  );
}
