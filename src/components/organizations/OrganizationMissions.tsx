
import { Organization, Mission } from "@/types/organization";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { missions } from "@/data/missions"; // This import stays the same
import { MissionCard } from "@/components/missions/MissionCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface OrganizationMissionsProps {
  organization: Organization;
}

export function OrganizationMissions({ 
  organization
}: OrganizationMissionsProps) {
  const { t } = useTranslation();
  
  // Filter missions by organization name - case insensitive matching
  const orgMissions = missions.filter(
    mission => mission.organization.toLowerCase() === organization.name.toLowerCase() && mission.isActive
  );

  // Show max 3 missions in the preview
  const previewMissions = orgMissions.slice(0, 3);
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            {t("Active Missions")}
            <Badge variant="outline" className="ml-2 text-xs">
              {orgMissions.length}
            </Badge>
          </h2>
          <Button variant="outline" asChild>
            <Link to={`/missions?organization=${encodeURIComponent(organization.name)}`}>
              {t("View All")}
            </Link>
          </Button>
        </div>
        
        {previewMissions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {previewMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={{
                  ...mission,
                  ...(organization.logo
                    ? { organizationLogoUrl: organization.logo }
                    : {}),
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            {t("No active missions at the moment.")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
