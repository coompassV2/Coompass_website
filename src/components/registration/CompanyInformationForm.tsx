
import { UseFormReturn } from "react-hook-form";
import { ProfileNameInput } from "./ProfileNameInput";
import { ImageUploader } from "./ImageUploader";
import { DescriptionInput } from "./DescriptionInput";
import { CountrySelector } from "./CountrySelector";
import { PersonaSpecificFields } from "./PersonaSpecificFields";
import { ContactInformationFields } from "./ContactInformationFields";
import { PersonaType } from "@/utils/personaLabels";

interface CompanyInformationFormProps {
  form: UseFormReturn<any>;
  selectedImage: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  personaType: PersonaType;
}

const personaLabels: Record<PersonaType, {
  nameLabel: string;
  logoLabel: string;
  descriptionLabel: string;
}> = {
  company: {
    nameLabel: "Company Name",
    logoLabel: "Company Logo",
    descriptionLabel: "Company Description"
  },
  organization: {
    nameLabel: "Organization Name",
    logoLabel: "Organization Logo",
    descriptionLabel: "Organization Description"
  },
  volunteer: {
    nameLabel: "Name and Last Name",
    logoLabel: "Profile Picture",
    descriptionLabel: "Bio"
  },
  stakeholder: {
    nameLabel: "Organization Name",
    logoLabel: "Organization Logo",
    descriptionLabel: "Organization Description"
  }
};

export function CompanyInformationForm({ form, selectedImage, onImageChange, personaType }: CompanyInformationFormProps) {
  const labels = personaLabels[personaType];

  if (!labels) {
    console.error(`Invalid persona type: ${personaType}`);
    return null;
  }

  const descriptionPlaceholder = `Describe your ${personaType === 'volunteer' ? 'interests and experience' : 'organization'}...`;

  return (
    <div className="bg-black/30 backdrop-blur-lg border border-white/10 p-4 space-y-4 rounded-xl">
      <h3 className="text-sm font-semibold text-white mb-3">Profile Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <ProfileNameInput form={form} label={labels.nameLabel} />
          <DescriptionInput 
            form={form}
            label={labels.descriptionLabel}
            placeholder={descriptionPlaceholder}
          />
        </div>
        
        <div className="space-y-4">
          <ImageUploader 
            label={labels.logoLabel}
            selectedImage={selectedImage}
            onImageChange={onImageChange}
          />
          <CountrySelector form={form} />
        </div>
      </div>
      
      <ContactInformationFields form={form} personaType={personaType} />
      <PersonaSpecificFields form={form} personaType={personaType} />
    </div>
  );
}
