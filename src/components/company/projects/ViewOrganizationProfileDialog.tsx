
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Building2, Calendar, Target, Users, MapPin, Mail, Phone, Globe, Handshake } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ViewOrganizationProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  organization: any | null;
  onInvite?: (orgName: string) => void;
}

export function ViewOrganizationProfileDialog({ 
  isOpen, 
  onClose, 
  organization,
  onInvite
}: ViewOrganizationProfileDialogProps) {
  const { t } = useTranslation();

  if (!organization) return null;

  // Mock detailed organization data
  const orgDetails = {
    name: organization,
    description: "A leading nonprofit organization focused on creating sustainable impact through innovative programs and community partnerships.",
    location: "Porto, Portugal",
    founded: "2018",
    teamSize: "25-50",
    contactEmail: `contact@${organization.toLowerCase().replace(/\s+/g, '')}.org`,
    phone: "+351 220 123 456",
    website: `www.${organization.toLowerCase().replace(/\s+/g, '')}.org`,
    mission: "To create lasting positive change in communities through education, empowerment, and sustainable development initiatives.",
    focuses: ["Education", "Community Development", "Youth Empowerment"],
    sdgs: ["Quality Education", "Reduced Inequalities", "Sustainable Communities"],
    achievements: [
      "Served over 2,000 beneficiaries in 2024",
      "Established 5 community centers",
      "Partnered with 15+ local organizations",
      "Recognized as 'Nonprofit of the Year' 2023"
    ],
    currentProjects: [
      "Digital Literacy Program",
      "Youth Leadership Initiative", 
      "Community Garden Project"
    ]
  };

  const handleInviteClick = () => {
    if (onInvite) {
      onInvite(organization);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="w-12 h-12 rounded-md">
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                <Building2 className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{orgDetails.name}</h2>
              <p className="text-sm text-muted-foreground">{t('Nonprofit Organization')}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{orgDetails.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{t('Founded in')} {orgDetails.founded}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{orgDetails.teamSize} {t('team members')}</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">{t('About')}</h4>
            <p className="text-muted-foreground">{orgDetails.description}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">{t('Mission')}</h4>
            <p className="text-muted-foreground">{orgDetails.mission}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                {t('Focus Areas')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {orgDetails.focuses.map((focus) => (
                  <Badge key={focus} variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-200">
                    {focus}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                {t('SDG Goals')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {orgDetails.sdgs.map((sdg) => (
                  <Badge key={sdg} className="bg-green-500/10 text-green-700 border-green-200">
                    {sdg}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">{t('Current Projects')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {orgDetails.currentProjects.map((project, index) => (
                <div key={index} className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm font-medium">{project}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">{t('Key Achievements')}</h4>
            <ul className="space-y-2">
              {orgDetails.achievements.map((achievement, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">{t('Contact Information')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{orgDetails.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{orgDetails.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>{orgDetails.website}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => {
                // Handle contact action
                window.open(`mailto:${orgDetails.contactEmail}`, '_blank');
              }}
            >
              <Mail className="h-4 w-4 mr-2" />
              {t('Contact Organization')}
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
              onClick={handleInviteClick}
            >
              <Handshake className="h-4 w-4 mr-2" />
              {t('Send Collaboration Invite')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
