
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Building2, Handshake } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface OpportunityCardProps {
  organizationName: string;
  onViewProfile: (orgName: string) => void;
  onInvite: (orgName: string) => void;
}

export function OpportunityCard({ 
  organizationName, 
  onViewProfile, 
  onInvite 
}: OpportunityCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="p-4 flex flex-col w-full">
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="w-10 h-10 rounded-md shrink-0">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <Building2 className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-sm break-words">{organizationName}</h3>
          <p className="text-xs text-muted-foreground">{t('Nonprofit Organization')}</p>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3 break-words">
        {t('Organization with aligned mission values and impact goals that matches your company profile')}
      </p>
      
      <div className="flex items-center gap-2 mt-auto">
        <Button 
          className="flex-1" 
          variant="outline" 
          size="sm"
          onClick={() => onViewProfile(organizationName)}
        >
          {t('View Profile')}
        </Button>
        <Button 
          className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700" 
          size="sm"
          onClick={() => onInvite(organizationName)}
        >
          <Handshake className="h-3.5 w-3.5 mr-1.5" />
          {t('Invite')}
        </Button>
      </div>
    </Card>
  );
}
