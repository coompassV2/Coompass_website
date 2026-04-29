import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CreateMissionDialog } from "@/components/missions/CreateMissionDialog";

export const CreateMissionButton = () => {
  const { theme } = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className={cn(
          "flex items-center gap-2",
          theme === "dark" 
            ? "bg-coompass-success hover:bg-coompass-success/90 text-white"
            : "bg-coompass-success/90 hover:bg-coompass-success text-white"
        )}
      >
        <Plus className="h-4 w-4" />
        Create a New Mission
      </Button>

      <CreateMissionDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};