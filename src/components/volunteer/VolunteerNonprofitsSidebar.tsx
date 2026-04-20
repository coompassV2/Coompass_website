import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { organizationsData } from "@/data/organizations";
import { Link } from "react-router-dom";
import { useSessionMode } from "@/hooks/useSessionMode";
import { Clock, ListChecks } from "lucide-react";

type OrgWithVolunteerStats = { id: number; name?: string; organization_name?: string; category?: string; organization_type?: string; hours: number; missions: number };

export function VolunteerNonprofitsSidebar() {
  const { t } = useTranslation();
  const { isDemo, userId } = useSessionMode();
  const [userNonprofits] = useState<OrgWithVolunteerStats[]>([]);
  const loading = false;

  // Demo orgs with mock hours and missions per org
  const demoOrganizations = React.useMemo((): OrgWithVolunteerStats[] => {
    return [...organizationsData]
      .sort(() => Math.random() - 0.5)
      .slice(0, 12)
      .map((org, i) => ({
        ...org,
        id: org.id,
        hours: [12, 8, 24, 6, 18, 4, 15, 9, 22, 7, 11, 3][i],
        missions: [2, 1, 4, 1, 3, 1, 2, 2, 5, 1, 2, 1][i],
      }));
  }, []);

  const organizations = isDemo ? demoOrganizations : userNonprofits;

  if (loading && !isDemo) {
    return (
      <div className="glass-card p-3">
        <h3 className="text-xs font-semibold mb-2">{t("Nonprofits I've volunteered for")}</h3>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-8 w-8 bg-muted rounded animate-pulse shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                <div className="h-2.5 bg-muted rounded w-1/2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-3">
      <h3 className="text-xs font-semibold mb-2">{t("Nonprofits I've volunteered for")}</h3>
      {organizations.length > 0 ? (
        <div className="max-h-[320px] overflow-y-auto space-y-1.5 pr-1">
          {organizations.map((org) => (
            <Link
              key={org.id}
              to={`/organizations/${org.id}`}
              className="flex items-center gap-2 p-1.5 rounded-md hover:bg-coompass-success/20 hover:text-coompass-success transition-colors group"
            >
              <img
                src={`https://api.dicebear.com/7.x/shapes/svg?seed=${org.id}`}
                alt={org.name || org.organization_name || ""}
                className="w-8 h-8 rounded shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-xs truncate">
                  {org.name || org.organization_name}
                </h4>
                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted-foreground">
                  <span className="inline-flex items-center gap-0.5">
                    <Clock className="h-3 w-3" />
                    {org.hours} hrs
                  </span>
                  <span className="inline-flex items-center gap-0.5">
                    <ListChecks className="h-3 w-3" />
                    {org.missions} {org.missions === 1 ? "mission" : "missions"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-xs text-muted-foreground">
            {t("No nonprofits yet. Start volunteering to see organizations here!")}
          </p>
        </div>
      )}
    </div>
  );
}
