
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TagSelector } from "./TagSelector";
import { PersonaType } from "@/utils/personaLabels";
import { useTaxonomyLists } from "@/hooks/useTaxonomyLists";
import { useTranslation } from "react-i18next";
import { translateSdgName } from "@/utils/sdgI18n";
import { translateSkillName } from "@/utils/taxonomyI18n";

interface PersonaSpecificFieldsProps {
  form: UseFormReturn<any>;
  personaType: PersonaType;
}

const serviceOptions = [
  "ESG Consulting", "Sustainability Reporting", "Impact Measurement", "Carbon Footprint Assessment",
  "Social Impact Strategy", "Environmental Consulting", "Community Engagement", "Stakeholder Mapping",
  "Volunteer Program Management", "Corporate Social Responsibility", "Grant Writing", "Fundraising Strategy",
  "Digital Marketing", "Web Development", "Legal Advisory", "Financial Planning"
];

const industryOptions = [
  "Technology", "Finance", "Healthcare", "Education", "Manufacturing", "Retail",
  "Energy", "Transportation", "Real Estate", "Agriculture", "Entertainment", "Consulting"
];

const organizationTypeOptions = [
  "Nonprofit", "NGO", "Foundation", "Charity", "Social Enterprise", "Community Organization",
  "Religious Organization", "Educational Institution", "Research Institute"
];

const sustainabilityGoalOptions = [
  "Carbon Neutrality", "Waste Reduction", "Water Conservation", "Employee Wellbeing",
  "Community Investment", "Ethical Sourcing", "Renewable Energy", "Biodiversity Protection"
];

const esgPriorityOptions = [
  "Environmental Impact", "Social Responsibility", "Corporate Governance", "Diversity & Inclusion",
  "Data Privacy", "Supply Chain Ethics", "Stakeholder Engagement", "Risk Management"
];

export function PersonaSpecificFields({ form, personaType }: PersonaSpecificFieldsProps) {
  const { t } = useTranslation();
  const { skills, sdgs } = useTaxonomyLists();
  const skillOptions = skills.map((skill) => skill.name);
  const skillOptionLabels = Object.fromEntries(
    skills.map((skill) => [skill.name, translateSkillName(skill, t)])
  );
  const sdgOptions = sdgs.map((sdg) => sdg.name);
  const sdgOptionLabels = Object.fromEntries(sdgs.map((sdg) => [sdg.name, translateSdgName(sdg, t)]));

  if (personaType === "company") {
    return (
      <>
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Industry</FormLabel>
              <FormControl>
                <TagSelector
                  options={industryOptions}
                  selectedTags={field.value ? [field.value] : []}
                  onTagsChange={(tags) => field.onChange(tags[0] || "")}
                  placeholder="Select your industry..."
                  maxTags={1}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="employeesCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Number of Employees</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="50"
                    className="bg-black/30 border-white/10 text-white"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="foundedYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Founded Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="2020"
                    className="bg-black/30 border-white/10 text-white"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="sustainabilityGoals"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Sustainability Goals</FormLabel>
              <FormControl>
                <TagSelector
                  options={sustainabilityGoalOptions}
                  selectedTags={field.value || []}
                  onTagsChange={field.onChange}
                  placeholder="Select sustainability goals..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="esgPriorities"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">ESG Priorities</FormLabel>
              <FormControl>
                <TagSelector
                  options={esgPriorityOptions}
                  selectedTags={field.value || []}
                  onTagsChange={field.onChange}
                  placeholder="Select ESG priorities..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  }

  if (personaType === "organization") {
    return (
      <>
        <FormField
          control={form.control}
          name="organizationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Organization Type</FormLabel>
              <FormControl>
                <TagSelector
                  options={organizationTypeOptions}
                  selectedTags={field.value ? [field.value] : []}
                  onTagsChange={(tags) => field.onChange(tags[0] || "")}
                  placeholder="Select organization type..."
                  maxTags={1}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearFounded"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Year Founded</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="2015"
                  className="bg-black/30 border-white/10 text-white"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sdgs"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Sustainable Development Goals</FormLabel>
              <FormControl>
                <TagSelector
                  options={sdgOptions}
                  optionLabels={sdgOptionLabels}
                  selectedTags={field.value || []}
                  onTagsChange={field.onChange}
                  placeholder="Select SDGs you work on..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  }

  if (personaType === "volunteer") {
    return (
      <>
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Skills & Interests</FormLabel>
              <FormControl>
                <TagSelector
                  options={skillOptions}
                  optionLabels={skillOptionLabels}
                  selectedTags={field.value || []}
                  onTagsChange={field.onChange}
                  placeholder="Select your skills..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="sdgs"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Sustainable Development Goals</FormLabel>
              <FormControl>
                <TagSelector
                  options={sdgOptions}
                  optionLabels={sdgOptionLabels}
                  selectedTags={field.value || []}
                  onTagsChange={field.onChange}
                  placeholder="Select SDGs you care about..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  }

  return null;
}
