
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, CalendarDays, Clock } from "lucide-react";
import { Application } from "./types";

interface ApplicationCardProps {
  application: Application;
  onViewDetails: (application: Application) => void;
  onEdit: (application: Application) => void;
  onWithdraw: (application: Application) => void;
}

export function ApplicationCard({ 
  application, 
  onViewDetails, 
  onEdit, 
  onWithdraw 
}: ApplicationCardProps) {
  const { t } = useTranslation();
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400">{t('Pending')}</Badge>;
      case 'shortlisted':
        return <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:bg-green-950 dark:text-green-400">{t('Shortlisted')}</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-500/10 text-red-700 dark:bg-red-950 dark:text-red-400">{t('Rejected')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={`https://api.dicebear.com/7.x/shapes/svg?seed=${application.organization}`}
              alt="Project"
              className="h-16 w-16 rounded-lg"
            />
            <div>
              <h3 className="text-lg font-medium">{application.projectTitle}</h3>
              <p className="text-sm text-coompass-primary">{application.organization}</p>
              <div className="flex flex-wrap gap-3 mt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {application.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="h-3 w-3 mr-1" />
                  {t('Submitted')}: {application.submittedDate}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  ~{application.estimatedHours} {t('hrs')}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            {getStatusBadge(application.status)}
            <p className="text-sm mt-2">{application.budget}</p>
            <div className="flex gap-2 mt-2">
              {application.status === 'pending' && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onEdit(application)}
                >
                  {t('Edit')}
                </Button>
              )}
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onViewDetails(application)}
              >
                {t('View')}
              </Button>
              {application.status === 'pending' && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onWithdraw(application)}
                  className="border-red-500 text-red-500 hover:bg-red-500/10"
                >
                  {t('Withdraw')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
