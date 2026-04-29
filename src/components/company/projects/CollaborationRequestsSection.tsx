
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Building2, Filter } from "lucide-react";
import { CollaborationCard } from "./CollaborationCard";
import { CollaborationFilters } from "./FilterCollaborationsDialog";

interface CollaborationRequestsSectionProps {
  collaborations: any[];
  filters: CollaborationFilters;
  hasActiveFilters: boolean;
  onFilterClick: () => void;
  onAcceptCollaboration: (id: number) => void;
  onDeclineCollaboration: (id: number) => void;
  onViewDetails: (collaboration: any) => void;
}

export function CollaborationRequestsSection({
  collaborations,
  filters,
  hasActiveFilters,
  onFilterClick,
  onAcceptCollaboration,
  onDeclineCollaboration,
  onViewDetails
}: CollaborationRequestsSectionProps) {
  const { t } = useTranslation();

  return (
    <div className="glass-card p-4 md:p-6 w-full">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-semibold break-words">{t('Nonprofit Collaboration Requests')}</h2>
          <p className="text-sm text-muted-foreground break-words">{t('Review and manage collaboration requests from nonprofit organizations')}</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className={`shrink-0 w-full lg:w-auto ${hasActiveFilters ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}`}
          onClick={onFilterClick}
        >
          <Filter className="h-4 w-4 mr-2" />
          {t('Filter')}
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2 bg-secondary text-secondary-foreground text-xs">
              {filters.status.length + filters.projectType.length + filters.sdgs.length}
            </Badge>
          )}
        </Button>
      </div>
      
      <div className="space-y-4 w-full">
        {collaborations.map((collab) => (
          <CollaborationCard
            key={collab.id}
            collaboration={collab}
            onAccept={onAcceptCollaboration}
            onDecline={onDeclineCollaboration}
            onViewDetails={onViewDetails}
          />
        ))}
        
        {collaborations.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>{t('No collaboration requests match your current filters')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
