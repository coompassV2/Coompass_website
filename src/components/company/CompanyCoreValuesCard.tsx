
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface CompanyCoreValuesCardProps {
  values: string[];
  onEditCoreValues: () => void;
}

export function CompanyCoreValuesCard({ values, onEditCoreValues }: CompanyCoreValuesCardProps) {
  const { t } = useTranslation();

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{t('Core Values')}</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onEditCoreValues}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {values.map((value, index) => (
          <Badge key={index} variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-300">
            {value}
          </Badge>
        ))}
      </div>
    </div>
  );
}
