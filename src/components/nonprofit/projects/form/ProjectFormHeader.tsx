
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProjectFormHeaderProps {
  title: string;
  description: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function ProjectFormHeader({ title, description, onInputChange }: ProjectFormHeaderProps) {
  const { t } = useTranslation();
  
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">{t('Project Title')} *</Label>
        <Input
          id="title"
          name="title"
          placeholder={t('Enter project title')}
          value={title}
          onChange={onInputChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">{t('Description')}</Label>
        <Textarea
          id="description"
          name="description"
          placeholder={t('Describe your project')}
          value={description}
          onChange={onInputChange}
          rows={3}
        />
      </div>
    </>
  );
}
