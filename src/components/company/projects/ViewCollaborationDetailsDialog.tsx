
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Building2, Calendar, Target, Users, MapPin, Mail, Phone } from "lucide-react";

interface ViewCollaborationDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  collaboration: any | null;
}

export function ViewCollaborationDetailsDialog({ 
  isOpen, 
  onClose, 
  collaboration 
}: ViewCollaborationDetailsDialogProps) {
  const { t } = useTranslation();

  if (!collaboration) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {collaboration.organizationName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              {collaboration.projectType}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {t('Requested on')}: {collaboration.requestDate}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2">{collaboration.projectTitle}</h4>
            <p className="text-muted-foreground">{collaboration.description}</p>
          </div>

          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              {t('SDG Goals')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {collaboration.sdgs.map((sdg: string) => (
                <Badge key={sdg} className="bg-blue-500/10 text-blue-700 border-blue-200">
                  {sdg}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">{t('Organization Details')}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Porto, Portugal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>50-100 {t('volunteers')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>contact@{collaboration.organizationName.toLowerCase().replace(/\s+/g, '')}.org</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">{t('Project Scope')}</h4>
              <div className="space-y-2 text-sm">
                <div><strong>{t('Duration')}:</strong> 6 months</div>
                <div><strong>{t('Expected Impact')}:</strong> 500+ {t('beneficiaries')}</div>
                <div><strong>{t('Resources Needed')}:</strong> {t('Funding & Volunteers')}</div>
                <div><strong>{t('Timeline')}:</strong> {t('Starting in')} Q2 2025</div>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">{t('Partnership Benefits')}</h4>
            <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
              <li>{t('Enhanced corporate social responsibility profile')}</li>
              <li>{t('Employee volunteer engagement opportunities')}</li>
              <li>{t('Measurable social impact metrics')}</li>
              <li>{t('Local community recognition')}</li>
            </ul>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                // Handle contact action
                onClose();
              }}
            >
              <Mail className="h-4 w-4 mr-2" />
              {t('Contact Organization')}
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
              onClick={onClose}
            >
              {t('Close')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
