
import { useTranslation } from "react-i18next";
import { PartnershipCard } from "./PartnershipCard";
import { Partnership } from "@/types/partnerships";

interface PartnershipsListProps {
  partnerships: Partnership[];
  onViewDetails: (partnership: Partnership) => void;
  onManagePartnership: (partnership: Partnership) => void;
  onAddPartnershipFromExplorer?: (orgId: number) => void;
}

export function PartnershipsList({ 
  partnerships, 
  onViewDetails, 
  onManagePartnership,
  onAddPartnershipFromExplorer
}: PartnershipsListProps) {
  const { t } = useTranslation();

  if (partnerships.length === 0) {
    return (
      <div className="p-12 text-center text-muted-foreground">
        {t('No partnerships found. Add your first partnership to get started.')}
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {partnerships.map((partnership) => (
        <PartnershipCard
          key={partnership.id}
          partnership={partnership}
          onViewDetails={onViewDetails}
          onManagePartnership={onManagePartnership}
        />
      ))}
    </div>
  );
}
