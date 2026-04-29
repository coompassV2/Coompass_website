
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProjectGoalFieldProps {
  goal: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProjectGoalField({ goal, onInputChange }: ProjectGoalFieldProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-2">
      <Label htmlFor="goal">{t('Project Goal')}</Label>
      <Input
        id="goal"
        name="goal"
        placeholder={t('What do you aim to achieve with this project?')}
        value={goal}
        onChange={onInputChange}
      />
    </div>
  );
}
