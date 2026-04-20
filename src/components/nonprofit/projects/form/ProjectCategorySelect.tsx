
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface ProjectCategorySelectProps {
  category: string;
  onCategoryChange: (value: string) => void;
}

export function ProjectCategorySelect({ category, onCategoryChange }: ProjectCategorySelectProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-2">
      <Label htmlFor="category">{t('Category')} *</Label>
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder={t('Select a category')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Environment">{t('Environment')}</SelectItem>
          <SelectItem value="Education">{t('Education')}</SelectItem>
          <SelectItem value="Humanitarian">{t('Humanitarian')}</SelectItem>
          <SelectItem value="Health">{t('Health')}</SelectItem>
          <SelectItem value="Community">{t('Community Development')}</SelectItem>
          <SelectItem value="Arts">{t('Arts & Culture')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
