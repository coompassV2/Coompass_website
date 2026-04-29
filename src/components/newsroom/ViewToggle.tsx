
import React from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ViewToggleProps {
  viewType: 'grid' | 'list';
  setViewType: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewType, setViewType }) => {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewType('grid')}
              className={cn(
                "h-10 w-10",
                viewType === 'grid' && "bg-green-500/10 text-green-500 hover:text-green-500 hover:bg-green-500/20"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Grid view</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewType('list')}
              className={cn(
                "h-10 w-10",
                viewType === 'list' && "bg-green-500/10 text-green-500 hover:text-green-500 hover:bg-green-500/20"
              )}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>List view</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button variant="outline">View All News</Button>
    </div>
  );
};

export default ViewToggle;
