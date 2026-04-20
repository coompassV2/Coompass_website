
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface CompanyMissionVisionCardsProps {
  mission: string;
  vision: string;
  onEditMission: () => void;
  onEditVision: () => void;
}

export function CompanyMissionVisionCards({ 
  mission, 
  vision, 
  onEditMission, 
  onEditVision 
}: CompanyMissionVisionCardsProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">{t('Our Mission')}</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onEditMission}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {mission}
        </p>
      </div>
      
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">{t('Our Vision')}</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onEditVision}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {vision}
        </p>
      </div>
    </div>
  );
}
