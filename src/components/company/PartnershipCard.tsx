
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Partnership } from "@/types/partnerships";

interface PartnershipCardProps {
  partnership: Partnership;
  onViewDetails: (partnership: Partnership) => void;
  onManagePartnership: (partnership: Partnership) => void;
}

export function PartnershipCard({ 
  partnership, 
  onViewDetails, 
  onManagePartnership 
}: PartnershipCardProps) {
  const { t } = useTranslation();
  
  const handleManageClick = () => {
    // Always open the management sheet, regardless of partnership status
    onManagePartnership(partnership);
  };
  
  return (
    <div className="p-6 hover:bg-foreground/5 transition-colors">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-foreground/5 flex items-center justify-center p-2">
            <img 
              src={partnership.organization.logo}
              alt={partnership.organization.name}
              className="w-full h-full object-contain"
            />
          </div>
          
          <div>
            <h3 className="font-semibold text-base">{partnership.organization.name}</h3>
            <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-foreground/10 text-muted-foreground mt-1">
              {partnership.organization.type}
            </span>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
              {partnership.organization.description}
            </p>
          </div>
        </div>

        <div className="flex-grow" />
        
        <div className="flex items-center justify-end gap-6">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{t('Status')}</p>
              <span className={cn(
                "inline-block px-2 py-0.5 rounded-full text-xs mt-1",
                partnership.partnershipStatus === "Active" 
                  ? "bg-green-500/20 text-green-500" 
                  : "bg-amber-500/20 text-amber-500"
              )}>
                {partnership.partnershipStatus}
              </span>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{t('Active Missions')}</p>
              <p className="font-semibold">{partnership.activeMissions}</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{t('Volunteer Hours')}</p>
              <p className="font-semibold">{partnership.totalHours}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4 justify-end">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewDetails(partnership)}
        >
          {t('View Details')}
        </Button>
        <Button 
          size="sm"
          onClick={handleManageClick}
        >
          {t('Manage Partnership')}
        </Button>
      </div>
    </div>
  );
}
