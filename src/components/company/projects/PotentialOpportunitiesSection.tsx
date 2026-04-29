
import { useTranslation } from "react-i18next";
import { OpportunityCard } from "./OpportunityCard";

interface PotentialOpportunitiesSectionProps {
  organizations: string[];
  onViewProfile: (orgName: string) => void;
  onInviteOrganization: (orgName: string) => void;
}

export function PotentialOpportunitiesSection({
  organizations,
  onViewProfile,
  onInviteOrganization
}: PotentialOpportunitiesSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="glass-card p-4 md:p-6 w-full">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-semibold break-words">{t('Potential Collaboration Opportunities')}</h2>
          <p className="text-sm text-muted-foreground break-words">{t('Explore nonprofits with aligned missions for potential partnerships')}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        {organizations.map((org) => (
          <OpportunityCard
            key={org}
            organizationName={org}
            onViewProfile={onViewProfile}
            onInvite={onInviteOrganization}
          />
        ))}
      </div>
    </div>
  );
}
