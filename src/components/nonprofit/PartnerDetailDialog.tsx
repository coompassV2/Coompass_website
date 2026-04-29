
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import { Calendar, Mail, FileSpreadsheet, Building2, Clock } from "lucide-react";
import { useState } from "react";

interface Partner {
  id: number;
  name: string;
  industry: string;
  partnershipType: string;
  status: string;
  collaborations: number;
  location: string;
  logo: string;
  description?: string;
  since?: string;
  contactPerson?: string;
  nextReview?: string;
}

interface PartnerDetailDialogProps {
  partner: Partner | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PartnerDetailDialog({ partner, open, onOpenChange }: PartnerDetailDialogProps) {
  const { t } = useTranslation();

  if (!partner) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-12 w-12 rounded-lg"
            />
            <DialogTitle className="text-xl">{partner.name}</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Partnership Overview */}
          <div>
            <h3 className="text-lg font-semibold mb-3">{t('Partnership Overview')}</h3>
            <p className="text-muted-foreground">
              {partner.description || 
                `${partner.name} is a valued corporate partner that has been working with our organization
                to create positive social impact through various collaboration initiatives.`}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge className="bg-green-500/20 text-green-700 dark:bg-green-950 dark:text-green-400">
                {partner.status}
              </Badge>
              <Badge variant="outline">{partner.partnershipType}</Badge>
              <Badge variant="outline">{partner.industry}</Badge>
            </div>
          </div>

          <Separator />

          {/* Partnership Details */}
          <div>
            <h3 className="text-lg font-semibold mb-3">{t('Partnership Details')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t('Partnership Since')}:</span>
                <span>{partner.since || "6 months ago"}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t('Location')}:</span>
                <span>{partner.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t('Contact Person')}:</span>
                <span>{partner.contactPerson || "Sarah Johnson"}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t('Next Review')}:</span>
                <span>{partner.nextReview || "In 3 months"}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Impact Stats */}
          <div>
            <h3 className="text-lg font-semibold mb-3">{t('Impact Statistics')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 border border-border rounded-lg">
                <p className="text-muted-foreground text-sm">{t('Collaborations')}</p>
                <p className="text-2xl font-semibold">{partner.collaborations}</p>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <p className="text-muted-foreground text-sm">{t('Projects Completed')}</p>
                <p className="text-2xl font-semibold">{Math.floor(partner.collaborations * 0.7)}</p>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <p className="text-muted-foreground text-sm">{t('Volunteer Hours')}</p>
                <p className="text-2xl font-semibold">{Math.floor(partner.collaborations * 15)}</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              {t('Contact')}
            </Button>
            <Button variant="outline">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              {t('Generate Report')}
            </Button>
            <Button>
              {t('Manage Partnership')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
