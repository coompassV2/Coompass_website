
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { 
  Building2, 
  Check, 
  Clock, 
  X, 
  ChevronRight,
  Calendar
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface CollaborationCardProps {
  collaboration: {
    id: number;
    organizationName: string;
    projectTitle: string;
    requestDate: string;
    status: string;
    description: string;
    projectType: string;
    sdgs: string[];
  };
  onAccept: (id: number) => void;
  onDecline: (id: number) => void;
  onViewDetails: (collaboration: any) => void;
}

export function CollaborationCard({ 
  collaboration, 
  onAccept, 
  onDecline, 
  onViewDetails 
}: CollaborationCardProps) {
  const { t } = useTranslation();

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending":
        return <Badge className="bg-amber-500/20 text-amber-700 flex items-center gap-1 shrink-0">
          <Clock className="h-3 w-3" />
          {t('Pending')}
        </Badge>;
      case "accepted":
        return <Badge className="bg-green-500/20 text-green-700 flex items-center gap-1 shrink-0">
          <Check className="h-3 w-3" />
          {t('Accepted')}
        </Badge>;
      case "declined":
        return <Badge className="bg-red-500/20 text-red-700 flex items-center gap-1 shrink-0">
          <X className="h-3 w-3" />
          {t('Declined')}
        </Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="p-4 w-full overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-4 items-start w-full">
        <Avatar className="w-12 h-12 rounded-md shrink-0">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <Building2 className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-2 min-w-0 w-full">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2 w-full">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-semibold break-words">{collaboration.organizationName}</h3>
                <Badge variant="outline" className="shrink-0">{collaboration.projectType}</Badge>
              </div>
              <p className="text-sm font-medium break-words">{collaboration.projectTitle}</p>
            </div>
            <div className="shrink-0">
              {getStatusBadge(collaboration.status)}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground break-words">{collaboration.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {collaboration.sdgs.map((sdg) => (
              <Badge key={sdg} className="bg-blue-500/10 text-blue-700 border-blue-200 text-xs">
                {sdg}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1 shrink-0" />
            <span className="break-words">{t('Requested on')}: {collaboration.requestDate}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 w-full lg:w-auto shrink-0">
          {collaboration.status === "pending" ? (
            <>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 w-full"
                onClick={() => onAccept(collaboration.id)}
              >
                {t('Accept')}
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={() => onDecline(collaboration.id)}
              >
                {t('Decline')}
              </Button>
            </>
          ) : (
            <Button 
              size="sm" 
              variant="outline" 
              className="flex items-center w-full"
              onClick={() => onViewDetails(collaboration)}
            >
              {t('View Details')}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
