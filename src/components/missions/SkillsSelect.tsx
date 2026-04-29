import { MultiSelect } from "./MultiSelect";
import { useTaxonomyLists } from "@/hooks/useTaxonomyLists";
import { useTranslation } from "react-i18next";
import { translateSkillName } from "@/utils/taxonomyI18n";

export function SkillsSelect({ form }: { form: any }) {
  const { t } = useTranslation();
  const { skills } = useTaxonomyLists();
  const skillsOptions = skills.map((skill) => skill.name);
  const skillOptionLabels = Object.fromEntries(
    skills.map((skill) => [skill.name, translateSkillName(skill, t)])
  );

  return (
    <MultiSelect
      form={form}
      name="skills"
      label="Required Skills"
      placeholder="Select skills"
      options={skillsOptions}
      optionLabels={skillOptionLabels}
    />
  );
}