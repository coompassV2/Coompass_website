
import { Organization } from "@/types/organization";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { goalColors } from "./GoalBadge";
import { SDGs } from "@/data/sdgs";

interface OrganizationAboutProps {
  organization: Organization;
}

export function OrganizationAbout({ organization }: OrganizationAboutProps) {
  const { t } = useTranslation();
  
  return (
    <div className="glass-card p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">{t('About')}</h3>
          <p className="text-muted-foreground">
            {organization.description}
          </p>
          {organization.mission && (
            <div className="mt-4">
              <h4 className="font-medium mb-1">{t('Mission')}</h4>
              <p className="text-muted-foreground">{organization.mission}</p>
            </div>
          )}
          {organization.vision && (
            <div className="mt-4">
              <h4 className="font-medium mb-1">{t('Vision')}</h4>
              <p className="text-muted-foreground">{organization.vision}</p>
            </div>
          )}
        </div>

        {organization.goals && organization.goals.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">{t('Sustainable Development Goals')}</h3>
            <div className="flex flex-wrap gap-2">
              {organization.goals.map((goal) => {
                const sdgInfo = SDGs.find(sdg => sdg.id === goal);
                return (
                  <Badge 
                    key={goal} 
                    className="px-3 py-1 font-medium text-white"
                    style={{ backgroundColor: goalColors[goal] || "#000000" }}
                  >
                    {goal}. {sdgInfo?.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
