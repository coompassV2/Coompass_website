
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import { BadgeCheck, Mail, FileText, UserRound, Calendar, Clock } from "lucide-react";
import { useState } from "react";
import { ContactPartnerDialog } from "./ContactPartnerDialog";
import { PartnershipReportsDialog } from "./PartnershipReportsDialog";

interface PartnershipDetailsDialogProps {
  partnership: {
    id: number;
    organization: {
      name: string;
      logo: string;
      description: string;
      type: string;
    };
    partnershipStatus: string;
    partnershipType: string;
    activeMissions: number;
    totalHours: number;
    impactScore: number;
    since?: string;
    contactPerson?: string;
    nextReview?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PartnershipDetailsDialog({ partnership, isOpen, onClose }: PartnershipDetailsDialogProps) {
  const { t } = useTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  if (!partnership) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <img
                src={partnership.organization.logo}
                alt={partnership.organization.name}
                className="h-12 w-12 rounded-lg"
              />
              <DialogTitle className="text-xl">{partnership.organization.name}</DialogTitle>
              {partnership.partnershipStatus === "Active" && (
                <BadgeCheck className="h-5 w-5 text-green-500" />
              )}
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Partnership Overview */}
            <div>
              <h3 className="text-lg font-semibold mb-3">{t('Partnership Overview')}</h3>
              <p className="text-muted-foreground">{partnership.organization.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="bg-green-500/20 text-green-700 dark:bg-green-950 dark:text-green-400">
                  {partnership.partnershipStatus}
                </Badge>
                <Badge variant="outline">{partnership.partnershipType}</Badge>
                <Badge variant="outline">{partnership.organization.type}</Badge>
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
                  <span>{partnership.since || "6 months ago"}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{t('Contact Person')}:</span>
                  <span>{partnership.contactPerson || "Sarah Johnson"}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{t('Next Review')}:</span>
                  <span>{partnership.nextReview || "In 3 months"}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Activity Stats */}
            <div>
              <h3 className="text-lg font-semibold mb-3">{t('Activity Statistics')}</h3>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 border border-border rounded-lg">
                  <p className="text-muted-foreground text-sm">{t('Active Missions')}</p>
                  <p className="text-2xl font-semibold">{partnership.activeMissions}</p>
                </div>
                
                <div className="p-4 border border-border rounded-lg">
                  <p className="text-muted-foreground text-sm">{t('Volunteer Hours')}</p>
                  <p className="text-2xl font-semibold">{partnership.totalHours}</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-4">
              <Button variant="outline" onClick={() => setIsContactOpen(true)}>
                <Mail className="h-4 w-4 mr-2" />
                {t('Contact')}
              </Button>
              <Button variant="outline" onClick={() => setIsReportsOpen(true)}>
                <FileText className="h-4 w-4 mr-2" />
                {t('View Reports')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ContactPartnerDialog
        partnership={partnership}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <PartnershipReportsDialog
        partnership={partnership}
        isOpen={isReportsOpen}
        onClose={() => setIsReportsOpen(false)}
      />
    </>
  );
}
