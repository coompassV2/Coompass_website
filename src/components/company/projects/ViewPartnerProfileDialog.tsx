
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  Globe, 
  Users, 
  Calendar, 
  Mail, 
  Phone,
  Building2,
  Heart,
  Award,
  ExternalLink
} from "lucide-react";

interface PartnerOrganization {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
  website: string;
  contactEmail: string;
  phone: string;
  founded: string;
  employees: string;
  focusAreas: string[];
  sdgs: number[];
  achievements: string[];
  logo?: string;
}

interface ViewPartnerProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partner: string | null;
}

export function ViewPartnerProfileDialog({
  open,
  onOpenChange,
  partner
}: ViewPartnerProfileDialogProps) {
  const { t } = useTranslation();

  // Mock partner data - in real app this would come from API
  const getPartnerData = (partnerName: string | null): PartnerOrganization | null => {
    if (!partnerName) return null;

    const mockPartners: Record<string, PartnerOrganization> = {
      "Green Earth Foundation": {
        id: "1",
        name: "Green Earth Foundation",
        type: "Environmental NGO",
        description: "Dedicated to environmental conservation and sustainable development initiatives worldwide. We focus on climate action, biodiversity protection, and community-based conservation programs.",
        location: "San Francisco, CA",
        website: "https://greenearthfoundation.org",
        contactEmail: "contact@greenearthfoundation.org",
        phone: "+1 (555) 123-4567",
        founded: "2010",
        employees: "50-100",
        focusAreas: ["Climate Action", "Biodiversity", "Sustainable Development"],
        sdgs: [13, 14, 15, 6, 7],
        achievements: [
          "Planted over 1 million trees globally",
          "Protected 500,000 acres of critical habitat",
          "Reduced CO2 emissions by 2M tons annually"
        ]
      },
      "Education for All": {
        id: "2",
        name: "Education for All",
        type: "Education NGO",
        description: "Working to ensure quality education access for underserved communities. We develop innovative learning programs and educational infrastructure in developing regions.",
        location: "New York, NY",
        website: "https://educationforall.org",
        contactEmail: "hello@educationforall.org",
        phone: "+1 (555) 987-6543",
        founded: "2008",
        employees: "100-200",
        focusAreas: ["Quality Education", "Digital Literacy", "Teacher Training"],
        sdgs: [4, 5, 10, 1],
        achievements: [
          "Educated 100,000+ students",
          "Built 200 schools in rural areas",
          "Trained 5,000 teachers globally"
        ]
      }
    };

    return mockPartners[partnerName] || null;
  };

  const partnerData = getPartnerData(partner);

  if (!partnerData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12 rounded-lg">
              <AvatarImage src={partnerData.logo} className="object-contain" />
              <AvatarFallback>
                <Building2 className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{partnerData.name}</h2>
              <Badge variant="outline">{partnerData.type}</Badge>
            </div>
          </DialogTitle>
          <DialogDescription>
            {partnerData.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Organization Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t("Organization Details")}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{partnerData.location}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{t("Founded")}: {partnerData.founded}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{partnerData.employees} {t("employees")}</span>
              </div>
              
              <div className="flex items-start gap-2">
                <Globe className="h-4 w-4 text-muted-foreground mt-0.5" />
                <a 
                  href={partnerData.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  {partnerData.website}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a 
                  href={`mailto:${partnerData.contactEmail}`}
                  className="text-blue-600 hover:underline"
                >
                  {partnerData.contactEmail}
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{partnerData.phone}</span>
              </div>
            </div>
          </div>

          {/* Focus Areas & Impact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t("Focus Areas & Impact")}</h3>
            
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {t("Focus Areas")}
              </h4>
              <div className="flex flex-wrap gap-2">
                {partnerData.focusAreas.map((area, index) => (
                  <Badge key={index} variant="secondary">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">{t("UN SDGs")}</h4>
              <div className="flex flex-wrap gap-2">
                {partnerData.sdgs.map((sdg) => (
                  <Badge key={sdg} variant="outline" className="bg-blue-50 text-blue-700">
                    SDG {sdg}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 flex items-center gap-1">
                <Award className="h-4 w-4" />
                {t("Key Achievements")}
              </h4>
              <ul className="space-y-1">
                {partnerData.achievements.map((achievement, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("Close")}
          </Button>
          <Button>
            <Mail className="h-4 w-4 mr-2" />
            {t("Contact Partner")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
