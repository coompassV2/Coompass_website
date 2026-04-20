
import { Organization } from "@/types/organization";
import { Card, CardContent } from "@/components/ui/card";
import { GoalBadge } from "./GoalBadge";
import { useTranslation } from "react-i18next";
import { SDGs } from "@/data/sdgs";

interface OrganizationGoalsProps {
  organization: Organization;
}

export function OrganizationGoals({ organization }: OrganizationGoalsProps) {
  const { t } = useTranslation();
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-lg font-medium mb-3">{t("Sustainable Development Goals")}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {organization.goals?.map((goalId) => {
            const goalDetails = SDGs.find(sdg => sdg.id === goalId);
            return (
              <div key={goalId} className="flex flex-col items-center text-center">
                <GoalBadge goal={goalId} size="md" />
                {goalDetails && (
                  <span className="text-xs mt-2">
                    {goalDetails.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
