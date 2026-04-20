
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SDGs } from "@/data/sdgs";
import { translateSdgName } from "@/utils/sdgI18n";

interface ProjectSDGSelectProps {
  selectedSDGs: number[];
  onSDGChange: (sdgs: number[]) => void;
}

export function ProjectSDGSelect({ selectedSDGs, onSDGChange }: ProjectSDGSelectProps) {
  const { t } = useTranslation();

  const handleSDGToggle = (sdgId: number) => {
    if (selectedSDGs.includes(sdgId)) {
      onSDGChange(selectedSDGs.filter(id => id !== sdgId));
    } else {
      onSDGChange([...selectedSDGs, sdgId]);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="sdgs">{t('Sustainable Development Goals')}</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto border rounded-md p-3">
        {SDGs.map((sdg) => (
          <div key={sdg.id} className="flex items-center space-x-2">
            <Checkbox
              id={`sdg-${sdg.id}`}
              checked={selectedSDGs.includes(sdg.id)}
              onCheckedChange={() => handleSDGToggle(sdg.id)}
            />
            <Label htmlFor={`sdg-${sdg.id}`} className="text-sm cursor-pointer">
              {sdg.id}. {translateSdgName(sdg, t)}
            </Label>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {t('Select the SDGs that this project contributes to')}
      </p>
    </div>
  );
}
