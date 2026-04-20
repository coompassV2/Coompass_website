
import { Organization } from "@/types/organization";
import { OrganizationCard } from "./OrganizationCard";
import { OrganizationRow } from "./OrganizationRow";

interface OrganizationsListProps {
  organizations: Organization[];
  isPartnersList?: boolean;
  onDonate: () => void;
  onTogglePartnership: (orgId: string) => void;
  showPartnershipButton?: boolean;
  viewType?: 'grid' | 'list';
}

export const OrganizationsList = ({
  organizations,
  isPartnersList = false,
  onDonate,
  onTogglePartnership,
  showPartnershipButton = true,
  viewType = 'grid',
}: OrganizationsListProps) => {
  const filteredOrganizations = organizations.filter(
    (org) => org.isPartner === isPartnersList
  );

  if (viewType === 'list') {
    return (
      <div className="space-y-4">
        {filteredOrganizations.map((org) => (
          <OrganizationRow
            key={org.id}
            organization={org}
            onDonate={onDonate}
            onTogglePartnership={onTogglePartnership}
            showPartnershipButton={showPartnershipButton}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {filteredOrganizations.map((org) => (
        <OrganizationCard
          key={org.id}
          organization={org}
          onDonate={onDonate}
          onTogglePartnership={onTogglePartnership}
          showPartnershipButton={showPartnershipButton}
        />
      ))}
    </div>
  );
};
