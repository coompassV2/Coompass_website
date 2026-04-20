
import { Organization } from "@/types/organization";
import { OrganizationsList } from "@/components/organizations/OrganizationsList";
import { useTranslation } from "react-i18next";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PartnershipsListProps {
  organizations: Organization[];
  isPartnersList: boolean;
  onDonate: () => void;
  onTogglePartnership: (orgId: string) => void;
}

export function PartnershipsList({
  organizations,
  isPartnersList,
  onDonate,
  onTogglePartnership
}: PartnershipsListProps) {
  const { t } = useTranslation();
  
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold">
          {isPartnersList ? t("Current Partnerships") : t("Available Organizations for Partnership")}
        </h2>
        {isPartnersList && (
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <span className="cursor-help">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{t("Adding nonprofits as partners will make them available for your employees to collaborate and do volunteering work with them")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="mb-8">
        <OrganizationsList
          organizations={organizations}
          isPartnersList={isPartnersList}
          onDonate={onDonate}
          onTogglePartnership={onTogglePartnership}
        />
      </div>
    </div>
  );
}
