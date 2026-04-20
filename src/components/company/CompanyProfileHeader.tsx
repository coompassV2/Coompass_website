
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, MapPin, Pencil, Users } from "lucide-react";
import { useState } from "react";
import { EditCompanyProfileDialog } from "./EditCompanyProfileDialog";
import { EditCoverImageDialog } from "./EditCoverImageDialog";

export function CompanyProfileHeader() {
  const { t } = useTranslation();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditCoverOpen, setIsEditCoverOpen] = useState(false);
  
  // Mock company data - updated to Grupo BRISA
  const [company, setCompany] = useState({
    name: "Grupo BRISA",
    logo: "/lovable-uploads/9ed0978a-fd24-41df-8164-d7ec2192b414.png",
    coverImage: "https://grupobrisa.pt/media/qjelzoo5/hero-banner-principal.jpg",
    tagline: "Mobilidade sustentável e conectividade para o futuro",
    industry: "Infrastructure & Mobility",
    location: "Lisbon, Portugal",
    website: "https://grupobrisa.pt",
    employeeCount: 3200,
    founded: 1972
  });

  const handleEditCover = () => {
    setIsEditCoverOpen(true);
  };
  
  const handleEditProfile = () => {
    setIsEditProfileOpen(true);
  };

  const handleSaveProfile = (updatedData: any) => {
    setCompany(prev => ({
      ...prev,
      ...updatedData
    }));
  };

  const handleSaveCoverImage = (newImageUrl: string) => {
    setCompany(prev => ({
      ...prev,
      coverImage: newImageUrl
    }));
  };

  return (
    <>
      <div className="glass-card overflow-hidden">
        <div 
          className="h-48 bg-center bg-cover relative"
          style={{ backgroundImage: `url(${company.coverImage})` }}
        >
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full"
            onClick={handleEditCover}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          
          <div className="absolute -bottom-12 left-6 w-24 h-24 bg-background rounded-xl border-4 border-background shadow-lg flex items-center justify-center p-1">
            <img 
              src={company.logo}
              alt={company.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
        
        <div className="p-6 pt-16 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{company.name}</h2>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-300">
                {company.industry}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">{company.tagline}</p>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {company.location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Globe className="h-4 w-4 mr-1" />
                <a 
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {company.website}
                </a>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                {company.employeeCount.toLocaleString()} {t('employees')}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button onClick={handleEditProfile}>
              <Pencil className="h-4 w-4 mr-2" />
              {t('Edit Profile')}
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <EditCompanyProfileDialog
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        companyData={company}
        onSave={handleSaveProfile}
      />

      {/* Edit Cover Image Dialog */}
      <EditCoverImageDialog
        isOpen={isEditCoverOpen}
        onClose={() => setIsEditCoverOpen(false)}
        currentImage={company.coverImage}
        onSave={handleSaveCoverImage}
      />
    </>
  );
}
