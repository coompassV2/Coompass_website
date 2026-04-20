
import { Mail, Phone, Globe, Building, Calendar, Users, DollarSign } from "lucide-react";
import { PersonaType, personaLabels } from "@/utils/personaLabels";
import { CountryFlag } from "./CountryFlag";
import { TagList } from "./TagList";
import { ProfileImage } from "./ProfileImage";

interface RegistrationSummaryProps {
  selectedImage: string | null;
  formValues: any;
  personaType: PersonaType;
}

export const RegistrationSummary: React.FC<RegistrationSummaryProps> = ({ 
  selectedImage, 
  formValues, 
  personaType 
}) => {
  const imageAlt = personaType === 'volunteer' ? 'Profile Picture' : `${personaType} Logo`;
  
  return (
    <div className="flex items-start gap-6">
      <ProfileImage imageUrl={selectedImage} alt={imageAlt} />
      
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-white flex items-center">
          {formValues.location && <CountryFlag countryCode={formValues.location} />}
          {formValues.companyName}
        </h2>
        
        <div className="flex items-center gap-2 text-gray-400 mt-2">
          <Mail className="h-4 w-4 text-white" />
          {formValues.email}
        </div>

        {/* Contact Information */}
        {(formValues.contactEmail || formValues.contactPhone || formValues.website) && (
          <div className="space-y-2 mt-3">
            {formValues.contactEmail && (
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="h-4 w-4" />
                {formValues.contactEmail}
              </div>
            )}
            {formValues.contactPhone && (
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="h-4 w-4" />
                {formValues.contactPhone}
              </div>
            )}
            {formValues.website && (
              <div className="flex items-center gap-2 text-gray-400">
                <Globe className="h-4 w-4" />
                {formValues.website}
              </div>
            )}
          </div>
        )}

        {/* Description */}
        {formValues.description && (
          <p className="text-white mt-4">{formValues.description}</p>
        )}

        {/* Company-specific info */}
        {personaType === 'company' && (
          <div className="mt-4 space-y-2">
            {formValues.industry && (
              <div className="flex items-center gap-2 text-gray-400">
                <Building className="h-4 w-4" />
                {formValues.industry}
              </div>
            )}
            {formValues.employeesCount && (
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="h-4 w-4" />
                {formValues.employeesCount} employees
              </div>
            )}
            {formValues.foundedYear && (
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="h-4 w-4" />
                Founded in {formValues.foundedYear}
              </div>
            )}
          </div>
        )}

        {/* Organization-specific info */}
        {personaType === 'organization' && (
          <div className="mt-4 space-y-2">
            {formValues.organizationType && (
              <div className="flex items-center gap-2 text-gray-400">
                <Building className="h-4 w-4" />
                {formValues.organizationType}
              </div>
            )}
            {formValues.yearFounded && (
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="h-4 w-4" />
                Founded in {formValues.yearFounded}
              </div>
            )}
          </div>
        )}

        {/* Tags based on persona type */}
        {personaType === 'organization' && (
          <TagList title="Social Development Goals" tags={formValues.sdgs || []} />
        )}

        {personaType === 'volunteer' && (
          <>
            <TagList title="Skills" tags={formValues.skills || []} />
            <TagList title="SDGs of Interest" tags={formValues.sdgs || []} />
          </>
        )}

        {personaType === 'company' && (
          <>
            <TagList title="Sustainability Goals" tags={formValues.sustainabilityGoals || []} />
            <TagList title="ESG Priorities" tags={formValues.esgPriorities || []} />
          </>
        )}
      </div>
    </div>
  );
}
