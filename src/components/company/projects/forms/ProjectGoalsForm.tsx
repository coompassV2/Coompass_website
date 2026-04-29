
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProjectGoalsFormProps {
  formData: {
    projectGoals: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export function ProjectGoalsForm({ formData, onInputChange }: ProjectGoalsFormProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="projectGoals">{t('Project objectives')}</Label>
        <Textarea
          id="projectGoals"
          placeholder={t('Describe project objectives...')}
          value={formData.projectGoals}
          onChange={(e) => onInputChange('projectGoals', e.target.value)}
          rows={4}
        />
      </div>
    </div>
  );
}
