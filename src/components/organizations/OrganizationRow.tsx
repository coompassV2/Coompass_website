
import { Organization } from "@/types/organization";
import { Button } from "@/components/ui/button";
import { HandHeart, Heart } from "lucide-react";

export interface OrganizationRowProps {
  organization: Organization;
  onDonate: () => void;
  onTogglePartnership: (orgId: string) => void;
  showPartnershipButton: boolean;
  onClick?: () => void;
}

export function OrganizationRow({ 
  organization, 
  onDonate, 
  onTogglePartnership, 
  showPartnershipButton,
  onClick 
}: OrganizationRowProps) {
  return (
    <div 
      className="flex items-center justify-between p-4 border-b border-border cursor-pointer hover:bg-secondary"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <img 
          src={organization.logo} 
          alt={organization.name} 
          className="w-10 h-10 rounded-full object-cover" 
        />
        <div>
          <h3 className="text-lg font-semibold">{organization.name}</h3>
          <p className="text-sm text-muted-foreground">{organization.description}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={(e) => {
          e.stopPropagation();
          onDonate();
        }}>
          Donate
        </Button>
        {showPartnershipButton && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onTogglePartnership(organization.id.toString());
            }}
          >
            {organization.isPartner ? (
              <>
                <HandHeart className="h-4 w-4 mr-2" />
                Unpartner
              </>
            ) : (
              <>
                <Heart className="h-4 w-4 mr-2" />
                Partner
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
