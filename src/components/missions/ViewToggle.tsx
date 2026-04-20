
import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

interface ViewToggleProps {
  viewType: 'grid' | 'list';
  onViewChange: (viewType: 'grid' | 'list') => void;
}

export function ViewToggle({ viewType, onViewChange }: ViewToggleProps) {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center gap-2 shrink-0">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onViewChange('grid')}
              className={cn(
                "h-10 w-10",
                viewType === 'grid' && "bg-green-500/10 text-green-500 hover:text-green-500 hover:bg-green-500/20"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("Grid view")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onViewChange('list')}
              className={cn(
                "h-10 w-10",
                viewType === 'list' && "bg-green-500/10 text-green-500 hover:text-green-500 hover:bg-green-500/20"
              )}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("List view")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
