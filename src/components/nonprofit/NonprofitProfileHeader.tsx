
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Edit, Globe, Mail, Phone, MapPin } from "lucide-react";

export function NonprofitProfileHeader() {
  const { t } = useTranslation();
  
  // Mock nonprofit data
  const nonprofit = {
    name: "Community Environmental Alliance",
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=CEA",
    verified: true,
    category: "Environmental",
    website: "www.communityenvironment.org",
    contactEmail: "contact@communityenvironment.org",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    foundedYear: 2018
  };
  
  return (
    <div className="glass-card p-6">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="relative">
          <img 
            src={nonprofit.logo}
            alt={nonprofit.name}
            className="w-24 h-24 rounded-lg object-cover bg-muted"
          />
          {nonprofit.verified && (
            <div className="absolute -top-2 -right-2 bg-background rounded-full p-1 shadow-md">
              <BadgeCheck className="h-5 w-5 text-green-500" />
            </div>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold">{nonprofit.name}</h1>
              <p className="text-muted-foreground">{nonprofit.category} | {t('Founded in')} {nonprofit.foundedYear}</p>
            </div>
            <Button size="sm">
              <Edit className="h-4 w-4 mr-2" />
              {t('Edit Profile')}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a href={`https://${nonprofit.website}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                {nonprofit.website}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${nonprofit.contactEmail}`} className="text-sm hover:underline">
                {nonprofit.contactEmail}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{nonprofit.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{nonprofit.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
