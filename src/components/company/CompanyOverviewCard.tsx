
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Pencil } from "lucide-react";

interface CompanyData {
  name: string;
  description: string;
  industry: string;
  location: string;
  employeeCount: number;
  founded: number;
  headquarters: string;
  ceo: string;
  revenue: string;
}

interface CompanyOverviewCardProps {
  company: CompanyData;
  onEditAbout: () => void;
}

export function CompanyOverviewCard({ company, onEditAbout }: CompanyOverviewCardProps) {
  const { t } = useTranslation();

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{t('About')} {company.name}</h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onEditAbout}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-muted-foreground leading-relaxed mb-6">
        {company.description}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <Building className="h-4 w-4 mr-2" />
            {t('Company Information')}
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('Industry')}:</span>
              <span>{company.industry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('Founded')}:</span>
              <span>{company.founded}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('Employees')}:</span>
              <span>{company.employeeCount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('Revenue')}:</span>
              <span>{company.revenue}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">CEO:</span>
              <span>{company.ceo}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            {t('Location')}
          </h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">{t('Headquarters')}:</span>
              <p className="mt-1">{company.headquarters}</p>
              <p>{company.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
