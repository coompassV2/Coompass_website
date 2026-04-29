
import { Organization } from "@/types/organization";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Heart, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { DonationDialog } from "@/components/organizations/DonationDialog";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface OrganizationProfileHeaderProps {
  organization: Organization;
}

export function OrganizationProfileHeader({ organization }: OrganizationProfileHeaderProps) {
  const { t } = useTranslation();
  const [donationDialogOpen, setDonationDialogOpen] = useState(false);
  
  const handleDonate = () => {
    setDonationDialogOpen(true);
  };
  
  return (
    <div className="glass-card p-6">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={`https://api.dicebear.com/7.x/shapes/svg?seed=${organization.id}`}
              alt={organization.name}
              className="h-16 w-16 rounded-lg"
            />
            {organization.isVerified && (
              <div className="absolute -top-2 -right-2 bg-background rounded-full p-1.5 shadow-md">
                <BadgeCheck className="h-5 w-5 text-green-500" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{organization.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">{organization.category || t('Non-profit Organization')}</p>
            {organization.foundedYear && (
              <p className="text-sm text-muted-foreground">
                {t('Founded in')} {organization.foundedYear}
              </p>
            )}
          </div>
        </div>

        {/* Organization Stats Section */}
        <div className="bg-card/50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3">{t('Organization Stats')}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">{t('Active Missions')}</p>
              <p className="text-lg font-bold">{organization.activeMissions}</p>
            </div>
            {organization.employees && (
              <div>
                <p className="text-sm text-muted-foreground">{t('Employees')}</p>
                <p className="text-lg font-bold">{organization.employees}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button className="flex-1" variant="default" onClick={handleDonate}>
            <Heart className="h-4 w-4 mr-2" />
            {t('Donate')}
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('Contact Organization')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Donation Dialog */}
      <DonationDialog 
        open={donationDialogOpen} 
        onOpenChange={setDonationDialogOpen}
      />
    </div>
  );
}
