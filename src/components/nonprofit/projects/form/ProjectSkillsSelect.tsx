
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ProjectSkillsSelectProps {
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
}

export function ProjectSkillsSelect({ skills, onSkillsChange }: ProjectSkillsSelectProps) {
  const { t } = useTranslation();
  const [newSkill, setNewSkill] = useState("");

  const commonSkills = [
    "Communication",
    "Leadership",
    "Project Management",
    "Teaching",
    "Marketing",
    "Social Media",
    "Event Planning",
    "Fundraising",
    "Data Analysis",
    "Writing",
    "Photography",
    "Design",
    "Web Development",
    "Translation",
    "Customer Service"
  ];

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onSkillsChange([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter(skill => skill !== skillToRemove));
  };

  const handleAddCommonSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      onSkillsChange([...skills, skill]);
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="skills">{t('Required Volunteer Skills')}</Label>
      
      {/* Selected Skills */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="px-2 py-1">
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Add Custom Skill */}
      <div className="flex gap-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder={t('Add a skill...')}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
        />
        <Button type="button" onClick={handleAddSkill} variant="outline">
          {t('Add')}
        </Button>
      </div>

      {/* Common Skills */}
      <div>
        <p className="text-sm text-muted-foreground mb-2">{t('Common skills:')}</p>
        <div className="flex flex-wrap gap-1">
          {commonSkills.filter(skill => !skills.includes(skill)).map((skill) => (
            <Button
              key={skill}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleAddCommonSkill(skill)}
              className="h-auto py-1 px-2 text-xs"
            >
              + {skill}
            </Button>
          ))}
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground">
        {t('Specify the skills volunteers need for this project')}
      </p>
    </div>
  );
}
