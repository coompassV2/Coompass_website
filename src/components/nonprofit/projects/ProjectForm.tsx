
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { ProjectFormData, initialFormState } from "./types";
import { ProjectFormHeader } from "./form/ProjectFormHeader";
import { ProjectCategorySelect } from "./form/ProjectCategorySelect";
import { ProjectDateFields } from "./form/ProjectDateFields";
import { ProjectGoalField } from "./form/ProjectGoalField";
import { ProjectSkillsSelect } from "./form/ProjectSkillsSelect";
import { ProjectFormFooter } from "./form/ProjectFormFooter";
import { MultiSelectDropdown } from "./form/MultiSelectDropdown";
import { SDGs } from "@/data/sdgs";
import { CAUSE_AREAS } from "@/data/causeAreas";

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
}

export function ProjectForm({ onSubmit, onCancel }: ProjectFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ProjectFormData>(initialFormState);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };
  
  const handleStartDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, startDate: date }));
  };
  
  const handleEndDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, endDate: date }));
  };

  const handleSDGChange = (sdgs: (number | string)[]) => {
    setFormData((prev) => ({ ...prev, sdgs: sdgs as number[] }));
  };

  const handleCauseAreasChange = (causeAreas: (number | string)[]) => {
    setFormData((prev) => ({ ...prev, causeAreas: causeAreas as string[] }));
  };

  const handleSkillsChange = (skills: string[]) => {
    setFormData((prev) => ({ ...prev, skills }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.title) {
      toast.error(t("Project title is required"));
      return;
    }
    
    if (!formData.category) {
      toast.error(t("Project category is required"));
      return;
    }
    
    if (!formData.startDate) {
      toast.error(t("Start date is required"));
      return;
    }
    
    if (!formData.endDate) {
      toast.error(t("End date is required"));
      return;
    }
    
    if (formData.startDate > formData.endDate) {
      toast.error(t("End date must be after start date"));
      return;
    }
    
    onSubmit(formData);
    setFormData(initialFormState);
  };
  
  return (
    <div className="max-h-[70vh] overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-4 pr-2">
        <ProjectFormHeader 
          title={formData.title}
          description={formData.description}
          onInputChange={handleInputChange}
        />
        
        <ProjectCategorySelect
          category={formData.category}
          onCategoryChange={handleCategoryChange}
        />
        
        <ProjectDateFields
          startDate={formData.startDate}
          endDate={formData.endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
        
        <ProjectGoalField
          goal={formData.goal}
          onInputChange={handleInputChange}
        />

        <MultiSelectDropdown
          label={t('Sustainable Development Goals')}
          placeholder={t('Select SDGs...')}
          options={SDGs}
          selectedValues={formData.sdgs}
          onSelectionChange={handleSDGChange}
          helpText={t('Select the SDGs that this project contributes to')}
        />

        <MultiSelectDropdown
          label={t('Cause Areas')}
          placeholder={t('Select cause areas...')}
          options={CAUSE_AREAS}
          selectedValues={formData.causeAreas}
          onSelectionChange={handleCauseAreasChange}
          helpText={t('Select the cause areas this project focuses on')}
        />

        <ProjectSkillsSelect
          skills={formData.skills}
          onSkillsChange={handleSkillsChange}
        />
        
        <ProjectFormFooter onCancel={onCancel} />
      </form>
    </div>
  );
}
