
import { Badge } from "@/components/ui/badge";
import { goalColors } from "@/components/organizations/GoalBadge";
import { useTaxonomyLists } from "@/hooks/useTaxonomyLists";
import { useTranslation } from "react-i18next";
import { translateSdgName } from "@/utils/sdgI18n";

interface EmployeeInterestsCardProps {
  employeeName: string;
}

export function EmployeeInterestsCard({ employeeName }: EmployeeInterestsCardProps) {
  const { t } = useTranslation();
  const { skills, causes, sdgs } = useTaxonomyLists();
  // Generate pseudo-random skills, causes, and SDGs based on the employee name
  const getRandomItems = (array: string[], count: number, seed: string): string[] => {
    // Simple hash function for the seed
    const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const shuffled = [...array].sort(() => (hash % 2 === 0 ? 0.5 : -0.5) - 0.5);
    return shuffled.slice(0, count);
  };

  const allSkills = skills.map((skill) => skill.name);
  const allCauses = causes.map((cause) => cause.name);

  // Get random selections based on employee name
  const selectedSkills = getRandomItems(allSkills, 6 + (employeeName.length % 5), employeeName);
  const selectedCauses = getRandomItems(allCauses, 2 + (employeeName.length % 4), employeeName);
  
  // Get random SDGs (1-17)
  const hashValue = employeeName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const selectedSDGIds = Array.from(new Set(
    Array(3 + (hashValue % 3))
      .fill(0)
      .map(() => (hashValue + Math.floor(Math.random() * 17)) % 17 + 1)
  ));

  const selectedSDGs = selectedSDGIds
    .map((id) => sdgs.find((sdg) => sdg.id === id))
    .filter((sdg): sdg is { id: number; name: string } => Boolean(sdg));

  return (
    <div className="glass-card p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Introduction</h3>
          <p className="text-muted-foreground">
            {employeeName} is passionate about making a positive impact through volunteering. 
            With expertise in various areas and a commitment to social causes, {employeeName.split(' ')[0]} 
            brings enthusiasm and dedication to every mission.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <Badge key={skill} variant="outline">{skill}</Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Cause Areas</h3>
          <div className="flex flex-wrap gap-2">
            {selectedCauses.map((area) => (
              <Badge key={area} variant="outline">{area}</Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">SDGs</h3>
          <div className="flex flex-wrap gap-2">
            {selectedSDGs.map((sdg) => (
              <Badge 
                key={sdg.id} 
                className="px-3 py-1 font-medium text-white"
                style={{ backgroundColor: goalColors[sdg.id] }}
              >
                {sdg.id}. {translateSdgName(sdg, t)}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
