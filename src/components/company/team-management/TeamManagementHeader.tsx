
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TeamManagementHeaderProps {
  onCreateTeam: () => void;
}

export function TeamManagementHeader({ onCreateTeam }: TeamManagementHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-semibold">{t('Team Management')}</h2>
        <p className="text-muted-foreground text-sm">
          {t('Organize employees into volunteer teams')}
        </p>
      </div>
      
      <Button onClick={onCreateTeam}>
        <Plus className="h-4 w-4 mr-2" />
        {t('Create New Team')}
      </Button>
    </div>
  );
}
